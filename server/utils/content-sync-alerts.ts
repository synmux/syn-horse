/**
 * Paging for content-sync failures, sent through the `NOTIFICATIONS` queue: a red page when an
 * outage starts, and a green all-clear when it ends.
 *
 * The consumer (`syn-horse-notifications`, on this repo's `notifications` branch) delivers red
 * pages through Pushover at emergency priority, which re-alerts until acknowledged, and green
 * ones through ntfy. So paging is deliberately conservative:
 * - each isolate tracks its own run of failures in memory, and only a run that has lasted
 *   `alertAfterFailingForMs` with no success in between is worth a red page, so a failure that
 *   heals on the next request never pages;
 * - the time of the last red page is kept in KV, shared by every isolate, so an outage pages
 *   once per repeat window rather than once per isolate. If KV itself fails, the red page goes
 *   out anyway: noise beats a missed outage;
 * - after a sync succeeds, whichever isolate finds that stored time removes it and sends the
 *   all-clear. That does not depend on the isolate that paged still being alive. If KV fails
 *   here, no all-clear is sent, so a KV outage cannot turn into an all-clear every minute.
 *
 * KV is eventually consistent, so two data centres can occasionally both send a page, or both
 * an all-clear, within about a minute of each other.
 *
 * The consumer's AI moderation is told to drop unclear red pages, so each message opens with a
 * plain sentence before any detail.
 */
import type { QueueMessage } from "./queue-message"

/** The `source` of every content-sync message, which gives them their own rate limits. */
export const CONTENT_SYNC_ALERT_SOURCE = "content-sync.syn.horse"

const CONTENT_SYNC_ALERT_CONTACT = "syn.horse content-sync"
const LAST_ALERT_KEY_PREFIX = "content-sync:last-alert:"
const MAX_ERROR_LENGTH = 300
const MILLISECONDS_PER_SECOND = 1000
const MILLISECONDS_PER_MINUTE = 60_000
// Expiry only cleans up; the repeat decision compares the stored time itself.
const LAST_ALERT_EXPIRY_MARGIN_SECONDS = 300

/** The subset of a KV namespace used here. `KVNamespace` satisfies it. */
export interface LastAlertStore {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>
  delete(key: string): Promise<void>
}

export interface FailureRun {
  failingForMs: number
  /** Whether the run has lasted long enough to be worth a page. */
  alertWorthy: boolean
}

export type AlertClaim = { send: false } | { send: true; storeError?: string }

export type RecoveryCheck = { announce: false; storeError?: string } | { announce: true; lastAlertAt?: number }

/** The KV key holding the time of the last red page for a collection. */
export const lastAlertKey = (collection: string): string => `${LAST_ALERT_KEY_PREFIX}${collection}`

/**
 * Tracks runs of failures per key, in memory, for one isolate.
 *
 * - `recordFailure` extends (or starts) the run and reports how long it has lasted.
 * - `recordSuccess` ends the run.
 */
export const createFailureTracker = ({
  alertAfterFailingForMs,
  now = Date.now,
}: {
  alertAfterFailingForMs: number
  now?: () => number
}) => {
  const failingSince = new Map<string, number>()

  return {
    recordFailure: (key: string): FailureRun => {
      const current = now()
      const since = failingSince.get(key) ?? current
      failingSince.set(key, since)
      const failingForMs = current - since
      return { failingForMs, alertWorthy: failingForMs >= alertAfterFailingForMs }
    },
    recordSuccess: (key: string): void => {
      failingSince.delete(key)
    },
  }
}

const describeError = (error: unknown): string => (error instanceof Error ? error.message : String(error))

/**
 * Decides whether this caller should send the red page, using the last page time in `store`,
 * and records the new time when it should. Fails open: if the store errors, the page is sent.
 */
export const claimAlert = async ({
  store,
  key,
  repeatAfterMs,
  now = Date.now,
}: {
  store: LastAlertStore
  key: string
  repeatAfterMs: number
  now?: () => number
}): Promise<AlertClaim> => {
  const current = now()
  try {
    const lastAlertAt = Date.parse((await store.get(key)) ?? "")
    if (Number.isFinite(lastAlertAt) && current - lastAlertAt < repeatAfterMs) {
      return { send: false }
    }
    await store.put(key, new Date(current).toISOString(), {
      expirationTtl: Math.ceil(repeatAfterMs / MILLISECONDS_PER_SECOND) + LAST_ALERT_EXPIRY_MARGIN_SECONDS,
    })
    return { send: true }
  } catch (error) {
    return { send: true, storeError: describeError(error) }
  }
}

/**
 * After a successful sync: if a red page is outstanding, removes its stored time and says to
 * announce the recovery. Fails closed: if the store errors, nothing is announced.
 */
export const releaseAlert = async ({ store, key }: { store: LastAlertStore; key: string }): Promise<RecoveryCheck> => {
  try {
    const stored = await store.get(key)
    if (stored === null) {
      return { announce: false }
    }
    await store.delete(key)
    const lastAlertAt = Date.parse(stored)
    return Number.isFinite(lastAlertAt) ? { announce: true, lastAlertAt } : { announce: true }
  } catch (error) {
    return { announce: false, storeError: describeError(error) }
  }
}

const truncate = (text: string): string =>
  text.length > MAX_ERROR_LENGTH ? `${text.slice(0, MAX_ERROR_LENGTH)}…` : text

const describeDuration = (milliseconds: number): string => {
  const minutes = Math.max(1, Math.round(milliseconds / MILLISECONDS_PER_MINUTE))
  return `${minutes} minute${minutes === 1 ? "" : "s"}`
}

/** The red page for a collection whose content database has been failing to sync. */
export const buildContentSyncAlert = ({
  collection,
  error,
  failingForMs,
  location,
}: {
  collection: string
  error: unknown
  failingForMs: number
  /** The Cloudflare data centre that saw the failures, when known. */
  location?: string
}): QueueMessage => {
  const where = location ? ` in ${location}` : ""
  return {
    channel: "red",
    contact: CONTENT_SYNC_ALERT_CONTACT,
    source: CONTENT_SYNC_ALERT_SOURCE,
    message:
      `syn.horse ${collection} pages are down. ` +
      `The server has been unable to sync the "${collection}" content database (D1)${where} ` +
      `for ${describeDuration(failingForMs)}. ` +
      `Those pages return 503 errors until it recovers. Last error: ${truncate(describeError(error))}`,
  }
}

/** The green all-clear once a collection that paged is syncing again. */
export const buildContentSyncRecovery = ({
  collection,
  lastAlertAt,
  location,
  now = Date.now,
}: {
  collection: string
  /** When the red page went out, when known. */
  lastAlertAt?: number
  /** The Cloudflare data centre that saw the recovery, when known. */
  location?: string
  now?: () => number
}): QueueMessage => {
  const where = location ? ` in ${location}` : ""
  const since = lastAlertAt === undefined ? "" : ` The red page went out ${describeDuration(now() - lastAlertAt)} ago.`
  return {
    channel: "green",
    contact: CONTENT_SYNC_ALERT_CONTACT,
    source: CONTENT_SYNC_ALERT_SOURCE,
    message:
      `All clear: syn.horse ${collection} pages are working again. ` +
      `The "${collection}" content database (D1) is syncing normally${where}.${since}`,
  }
}

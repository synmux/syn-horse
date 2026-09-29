/**
 * Paging for content-sync failures, sent through the `NOTIFICATIONS` queue on the red channel.
 *
 * The consumer (`syn-horse-notifications`, on this repo's `notifications` branch) delivers red
 * pages through Pushover at emergency priority, which re-alerts until acknowledged, so paging is
 * deliberately conservative:
 * - each isolate tracks its own run of failures in memory, and only a run that has lasted
 *   `alertAfterFailingForMs` with no success in between is worth a page, so a failure that
 *   heals on the next request never pages;
 * - the time of the last page is kept in KV, shared by every isolate, so an outage pages once
 *   per repeat window rather than once per isolate. KV is eventually consistent, so two data
 *   centres can occasionally both page within the first minute. If KV itself fails, the page
 *   goes out anyway: noise beats a missed outage;
 * - when a run that was worth a page ends, the stored time is cleared, so the next outage pages
 *   straight away.
 *
 * The consumer's AI moderation is told to drop unclear red pages, so the message opens with a
 * plain sentence before any error detail.
 */
import type { QueueMessage } from "./queue-message"

/** The `source` of every content-sync page, which gives these pages their own rate limits. */
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

/** The KV key holding the time of the last page for a collection. */
export const lastAlertKey = (collection: string): string => `${LAST_ALERT_KEY_PREFIX}${collection}`

/**
 * Tracks runs of failures per key, in memory, for one isolate.
 *
 * - `recordFailure` extends (or starts) the run and reports how long it has lasted.
 * - `recordSuccess` ends the run, returning `true` if it had become worth a page.
 */
export const createFailureTracker = ({
  alertAfterFailingForMs,
  now = Date.now,
}: {
  alertAfterFailingForMs: number
  now?: () => number
}) => {
  const failingSince = new Map<string, number>()
  const alertWorthyRuns = new Set<string>()

  return {
    recordFailure: (key: string): FailureRun => {
      const current = now()
      const since = failingSince.get(key) ?? current
      failingSince.set(key, since)
      const failingForMs = current - since
      const alertWorthy = failingForMs >= alertAfterFailingForMs
      if (alertWorthy) {
        alertWorthyRuns.add(key)
      }
      return { failingForMs, alertWorthy }
    },
    recordSuccess: (key: string): boolean => {
      failingSince.delete(key)
      return alertWorthyRuns.delete(key)
    },
  }
}

const describeError = (error: unknown): string => (error instanceof Error ? error.message : String(error))

/**
 * Decides whether this caller should send the page, using the last page time in `store`, and
 * records the new time when it should. Fails open: if the store errors, the page is sent.
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

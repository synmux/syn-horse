import { checksums, checksumsStructure, tables } from "#content/manifest"
import type { H3Event } from "h3"
import { createError, defineEventHandler, getRequestURL } from "h3"

import type { ContentCollectionTarget, ContentManifest } from "~~/server/utils/content-sync"
import {
  createRevalidationGate,
  decodeContentDump,
  matchContentQueryCollection,
  resolveContentTarget,
  synchroniseContentCollection,
} from "~~/server/utils/content-sync"
import {
  buildContentSyncAlert,
  buildContentSyncRecovery,
  claimAlert,
  createFailureTracker,
  lastAlertKey,
  releaseAlert,
} from "~~/server/utils/content-sync-alerts"
import { usePager } from "~~/server/utils/pager"

// How often each isolate re-checks D1 against its bundled dump. Bounds how long any drift
// (another deployed version sharing the database, a manual edit, a Time Travel restore) can
// be served before it is repaired.
const REVALIDATE_AFTER_MS = 60_000

// A run of sync failures must last this long, with no success in between, before it pages, so a
// failure that heals on the next request never does.
const ALERT_AFTER_FAILING_FOR_MS = 60_000

// While the sync keeps failing, page again at most this often. The last page time is kept in KV,
// so this holds across isolates.
const ALERT_REPEAT_AFTER_MS = 60 * 60_000

const runWithRevalidation = createRevalidationGate({ revalidateAfterMs: REVALIDATE_AFTER_MS })
const failureTracker = createFailureTracker({ alertAfterFailingForMs: ALERT_AFTER_FAILING_FOR_MS })

// The generated manifest is typed from whatever `nuxt prepare` last wrote (empty objects), so
// widen it to what it holds at build time.
const manifest: ContentManifest = { checksums, checksumsStructure, tables }

// Decoded dumps, per collection. The dump is fixed for the life of a deployment and this holds
// plain data only, so sharing it across requests is safe.
const decodedDumps = new Map<string, readonly string[]>()

const loadDumpLines = async (event: H3Event, collection: string): Promise<readonly string[]> => {
  const cached = decodedDumps.get(collection)
  if (cached) {
    return cached
  }
  const encodedDump = await event.$fetch<string>(`/__nuxt_content/${collection}/sql_dump.txt`, {
    responseType: "text",
  })
  const dumpLines = await decodeContentDump(encodedDump)
  decodedDumps.set(collection, dumpLines)
  return dumpLines
}

const synchronise = async (event: H3Event, target: ContentCollectionTarget): Promise<void> => {
  const outcome = await synchroniseContentCollection({
    // Must match `content.database.bindingName` in `nuxt.config.ts`.
    database: event.context.cloudflare.env.DB_CONTENT,
    dumpLines: await loadDumpLines(event, target.collection),
    target,
  })
  if (outcome.rebuilt) {
    console.warn(`[content-sync] rebuilt "${target.collection}" in D1: ${outcome.drift.join("; ")}`)
  }
}

/** The Cloudflare data centre handling the request, when the runtime reports one. */
const requestColo = (event: H3Event): string | undefined => {
  const cf: unknown = event.context.cloudflare?.request?.cf
  return typeof cf === "object" && cf !== null && "colo" in cf && typeof cf.colo === "string" ? cf.colo : undefined
}

/** Sends the red page for an outage, unless another isolate paged within the repeat window. */
const pageForOutage = async (event: H3Event, collection: string, error: unknown, failingForMs: number) => {
  const claim = await claimAlert({
    store: event.context.cloudflare.env.KV,
    key: lastAlertKey(collection),
    repeatAfterMs: ALERT_REPEAT_AFTER_MS,
  })
  if (!claim.send) {
    return
  }
  if (claim.storeError) {
    console.warn(`[content-sync] could not check the last page time in KV, so paging anyway: ${claim.storeError}`)
  }
  const alert = buildContentSyncAlert({ collection, error, failingForMs, location: requestColo(event) })
  const result = await usePager(event).send(alert)
  if (result.ok) {
    console.warn(`[content-sync] paged on the red channel: ${alert.message}`)
  } else {
    console.error(`[content-sync] could not queue the red page: ${result.error}`)
  }
}

/**
 * After a successful sync, sends the green all-clear if a red page is outstanding. Clearing the
 * stored page time also means the next outage pages at once.
 */
const announceRecovery = async (event: H3Event, collection: string) => {
  const check = await releaseAlert({ store: event.context.cloudflare.env.KV, key: lastAlertKey(collection) })
  if (!check.announce) {
    if (check.storeError) {
      console.error(`[content-sync] could not check KV for an outstanding page: ${check.storeError}`)
    }
    return
  }
  const recovery = buildContentSyncRecovery({
    collection,
    lastAlertAt: check.lastAlertAt,
    location: requestColo(event),
  })
  const result = await usePager(event).send(recovery)
  if (result.ok) {
    console.warn(`[content-sync] sent the all-clear on the green channel: ${recovery.message}`)
  } else {
    console.error(`[content-sync] could not queue the green all-clear: ${result.error}`)
  }
}

export default defineEventHandler(async (event) => {
  // In dev and during prerender, @nuxt/content reads a local SQLite database it maintains itself.
  if (import.meta.dev || import.meta.prerender) {
    return
  }
  const collection = matchContentQueryCollection(event.method, getRequestURL(event).pathname)
  if (!collection) {
    return
  }
  const target = resolveContentTarget(collection, manifest)
  if (!target) {
    // Not a collection we know; let @nuxt/content reject the query.
    return
  }

  try {
    await runWithRevalidation(collection, async () => {
      await synchronise(event, target)
      // Runs only when the sync itself ran (at most once a minute per isolate), after the response.
      event.waitUntil(announceRecovery(event, collection))
    })
  } catch (error) {
    console.error(`[content-sync] could not synchronise "${collection}" in D1`, error)
    const run = failureTracker.recordFailure(collection)
    if (run.alertWorthy) {
      // Queued after the response, so the page never delays the 503.
      event.waitUntil(pageForOutage(event, collection, error, run.failingForMs))
    }
    throw createError({
      statusCode: 503,
      statusMessage: "content database unavailable",
      cause: error,
    })
  }

  failureTracker.recordSuccess(collection)
})

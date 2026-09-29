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

// How often each isolate re-checks D1 against its bundled dump. Bounds how long any drift
// (another deployed version sharing the database, a manual edit, a Time Travel restore) can
// be served before it is repaired.
const REVALIDATE_AFTER_MS = 60_000

const runWithRevalidation = createRevalidationGate({ revalidateAfterMs: REVALIDATE_AFTER_MS })

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
    await runWithRevalidation(collection, () => synchronise(event, target))
  } catch (error) {
    console.error(`[content-sync] could not synchronise "${collection}" in D1`, error)
    throw createError({
      statusCode: 503,
      statusMessage: "content database unavailable",
      cause: error,
    })
  }
})

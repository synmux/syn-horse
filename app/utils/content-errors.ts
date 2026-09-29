import type { NuxtError } from "#app"

const FIRST_SERVER_ERROR_STATUS = 500
const INTERNAL_SERVER_ERROR_STATUS = 500

/**
 * The status to report for a failed content query: a server error keeps its own status (such
 * as the 503 from `server/middleware/content-sync.ts`); anything else means the query itself is
 * broken, which is a bug on our side, so 500.
 */
export const contentFailureStatusCode = (statusCode: number | undefined): number =>
  statusCode !== undefined && statusCode >= FIRST_SERVER_ERROR_STATUS ? statusCode : INTERNAL_SERVER_ERROR_STATUS

/**
 * Rethrows a failed `queryCollection()` from `useAsyncData` as a fatal server error.
 *
 * `useAsyncData` resolves a failed query to `data: undefined` plus `error`. Without this, a
 * database outage renders as an empty blog, or as a "post not found" 404 for a post that
 * exists - which search engines then drop.
 */
export const throwIfContentFailed = (error: NuxtError | null | undefined): void => {
  if (!error) {
    return
  }
  throw createError({
    status: contentFailureStatusCode(error.status),
    statusText: "content temporarily unavailable",
    fatal: true,
    cause: error,
  })
}

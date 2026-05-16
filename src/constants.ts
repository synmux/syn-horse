/**
 * Per-source caps on how many pages may pass the rate-limit stage in each
 * rolling window.
 *
 * Values are inclusive: a counter reaching `hour: 10` means the 10th hourly
 * page was accepted and the 11th will be dropped.
 */
export const RATE_LIMITS = {
  hour: 10,
  day: 100,
  lifetime: 1000,
} as const

/** Named rate-limit windows, derived from the keys of {@link RATE_LIMITS}. */
export type RateLimitPeriod = keyof typeof RATE_LIMITS

/**
 * Iteration order for rate-limit windows.
 *
 * Tightest window first ensures the most specific violation is reported
 * when several caps are breached at once (e.g. an attacker bursting through
 * the hourly cap will be logged as `"hour"` rather than `"lifetime"`).
 */
export const RATE_LIMIT_PERIODS: readonly RateLimitPeriod[] = ["hour", "day", "lifetime"] as const

/**
 * KV TTL (in seconds) applied when a counter is first written for a given
 * window.
 *
 * `null` means the counter never expires — used for the lifetime cap, which
 * must persist for the lifetime of the source.
 */
export const RATE_LIMIT_TTL_SECONDS: Record<RateLimitPeriod, number | null> = {
  hour: 3600,
  day: 86400,
  lifetime: null,
}

/** KV key prefix that namespaces all rate-limit counters. */
export const RATE_LIMIT_NAMESPACE = "rate-limits"

/**
 * Build the KV key used to store the counter for a given source and window.
 *
 * @param source - Page source (hostname or IP) as parsed from the message.
 *   `undefined` falls back to the `"unknown"` bucket so unattributed pages
 *   share a single counter and cannot bypass the cap by omitting `source`.
 * @param period - The rate-limit window the counter applies to.
 * @returns The fully-qualified KV key.
 */
export function rateLimitKey(source: string | undefined, period: RateLimitPeriod): string {
  return `${RATE_LIMIT_NAMESPACE}:${source ?? "unknown"}:${period}`
}

import { RATE_LIMIT_PERIODS, RATE_LIMIT_TTL_SECONDS, rateLimitKey, type RateLimitPeriod } from "./constants.ts"

/**
 * In-memory view of a single counter read from KV.
 *
 * `existed` distinguishes "the key was present with value 0" from "the key
 * was absent". This matters for TTL handling: a counter being incremented
 * for the first time must be created with a fresh expiry, whereas a
 * subsequent increment must preserve the original window.
 */
export type CounterState = { value: number; existed: boolean }

/** The complete set of per-period counters for a single source. */
export type Counters = Record<RateLimitPeriod, CounterState>

/**
 * Metadata persisted alongside each KV entry.
 *
 * KV does not expose the remaining TTL on a `get`, so we store the absolute
 * `expiresAt` ourselves and use it to anchor subsequent `put` calls to the
 * window's original end.
 */
type ExpirationMetadata = { expiresAt: number }

/**
 * Fetch all rate-limit counters for `source` from KV in parallel.
 *
 * Missing keys are reported as `{ value: 0, existed: false }` rather than
 * throwing, so a fresh source can be onboarded without a separate `init`
 * step.
 *
 * @param env - Worker environment exposing the `KV` binding.
 * @param source - Page source (hostname or IP), or `undefined` to use the
 *   shared `"unknown"` bucket.
 * @returns A {@link Counters} object covering every {@link RateLimitPeriod}.
 * @throws If a KV value is present but cannot be parsed as a base-10 integer
 *   — indicates corruption that should not be silently masked.
 */
export async function readCounters(env: Env, source: string | undefined): Promise<Counters> {
  const entries = await Promise.all(
    RATE_LIMIT_PERIODS.map(async (period) => {
      const key = rateLimitKey(source, period)
      const raw = await env.KV.get(key)
      if (raw === null) {
        return [period, { value: 0, existed: false }] as const
      }
      const value = Number.parseInt(raw, 10)
      if (Number.isNaN(value)) {
        throw new Error(`KV value for ${key} is not an integer: ${raw}`)
      }
      return [period, { value, existed: true }] as const
    }),
  )
  return Object.fromEntries(entries) as Counters
}

/**
 * Increment every rate-limit counter for `source` by one.
 *
 * For windows that already had a counter, the existing `expiresAt`
 * metadata is reused so the window does not slide forward on every page.
 * For first-time writes, a fresh expiry is computed from `now + ttl`.
 *
 * The `lifetime` window has `ttl === null` and is written without any
 * expiry.
 *
 * @param env - Worker environment exposing the `KV` binding.
 * @param source - Page source whose counters should be incremented.
 * @param current - The counter values previously read by
 *   {@link readCounters}. Used to compute the next value and to decide
 *   whether each counter needs a fresh TTL.
 * @param now - Current Unix timestamp in seconds. Defaults to the wall clock;
 *   override for deterministic tests.
 */
export async function incrementCounters(
  env: Env,
  source: string | undefined,
  current: Counters,
  now: number = Math.floor(Date.now() / 1000),
): Promise<void> {
  await Promise.all(
    RATE_LIMIT_PERIODS.map(async (period) => {
      const next = String(current[period].value + 1)
      const key = rateLimitKey(source, period)
      const ttl = RATE_LIMIT_TTL_SECONDS[period]
      if (ttl === null) {
        await env.KV.put(key, next)
        return
      }
      if (!current[period].existed) {
        const expiresAt = now + ttl
        await env.KV.put(key, next, { expiration: expiresAt, metadata: { expiresAt } })
        return
      }
      const { metadata } = await env.KV.getWithMetadata<ExpirationMetadata>(key)
      const expiresAt = metadata?.expiresAt ?? now + ttl
      await env.KV.put(key, next, { expiration: expiresAt, metadata: { expiresAt } })
    }),
  )
}

import { RATE_LIMIT_PERIODS, RATE_LIMIT_TTL_SECONDS, rateLimitKey, type RateLimitPeriod } from "./constants.ts"

export type CounterState = { value: number; existed: boolean }
export type Counters = Record<RateLimitPeriod, CounterState>

type ExpirationMetadata = { expiresAt: number }

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

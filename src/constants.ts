export const RATE_LIMITS = {
  hour: 10,
  day: 100,
  lifetime: 1000,
} as const

export type RateLimitPeriod = keyof typeof RATE_LIMITS

export const RATE_LIMIT_PERIODS: readonly RateLimitPeriod[] = ["hour", "day", "lifetime"] as const

export const RATE_LIMIT_TTL_SECONDS: Record<RateLimitPeriod, number | null> = {
  hour: 3600,
  day: 86400,
  lifetime: null,
}

export const RATE_LIMIT_NAMESPACE = "rate-limits"

export function rateLimitKey(source: string | undefined, period: RateLimitPeriod): string {
  return `${RATE_LIMIT_NAMESPACE}:${source ?? "unknown"}:${period}`
}

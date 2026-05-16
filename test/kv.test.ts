import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { rateLimitKey } from "../src/constants.ts"
import { incrementCounters, readCounters } from "../src/kv.ts"

describe("kv counters", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("readCounters returns zeros for missing keys with existed=false", async () => {
    const counters = await readCounters(env, "10.0.0.1")
    expect(counters.hour).toEqual({ value: 0, existed: false })
    expect(counters.day).toEqual({ value: 0, existed: false })
    expect(counters.lifetime).toEqual({ value: 0, existed: false })
  })

  it("readCounters parses existing values", async () => {
    await env.KV.put(rateLimitKey("10.0.0.1", "hour"), "7", { expirationTtl: 3600 })
    await env.KV.put(rateLimitKey("10.0.0.1", "lifetime"), "42")
    const counters = await readCounters(env, "10.0.0.1")
    expect(counters.hour.value).toBe(7)
    expect(counters.hour.existed).toBe(true)
    expect(counters.lifetime.value).toBe(42)
    expect(counters.lifetime.existed).toBe(true)
    expect(counters.day.existed).toBe(false)
  })

  it("readCounters throws on non-numeric value", async () => {
    await env.KV.put(rateLimitKey("10.0.0.1", "hour"), "not-a-number")
    await expect(readCounters(env, "10.0.0.1")).rejects.toThrow()
  })

  it("incrementCounters first write sets absolute expiration and stores expiresAt in metadata for hour/day", async () => {
    const putSpy = vi.spyOn(env.KV, "put")
    const now = Math.floor(Date.now() / 1000)
    const counters = await readCounters(env, "10.0.0.1")
    await incrementCounters(env, "10.0.0.1", counters, now)

    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "hour"), "1", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "day"), "1", {
      expiration: now + 86400,
      metadata: { expiresAt: now + 86400 },
    })
    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "lifetime"), "1")
  })

  it("incrementCounters subsequent write re-applies the stored expiresAt for hour/day, no expiration for lifetime", async () => {
    const now = Math.floor(Date.now() / 1000)
    await env.KV.put(rateLimitKey("10.0.0.1", "hour"), "5", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    await env.KV.put(rateLimitKey("10.0.0.1", "day"), "50", {
      expiration: now + 86400,
      metadata: { expiresAt: now + 86400 },
    })
    await env.KV.put(rateLimitKey("10.0.0.1", "lifetime"), "500")

    const counters = await readCounters(env, "10.0.0.1")
    const putSpy = vi.spyOn(env.KV, "put")
    await incrementCounters(env, "10.0.0.1", counters, now + 100)

    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "hour"), "6", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "day"), "51", {
      expiration: now + 86400,
      metadata: { expiresAt: now + 86400 },
    })
    expect(putSpy).toHaveBeenCalledWith(rateLimitKey("10.0.0.1", "lifetime"), "501")
  })

  it("readCounters uses 'unknown' bucket when source is undefined", async () => {
    await env.KV.put(rateLimitKey(undefined, "hour"), "3", { expirationTtl: 3600 })
    const counters = await readCounters(env, undefined)
    expect(counters.hour.value).toBe(3)
  })
})

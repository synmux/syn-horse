import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { rateLimitKey } from "../../src/constants.ts"
import { insertLogRow } from "../../src/db.ts"
import { runRateLimits } from "../../src/stages/rate-limits.ts"
import { migrate } from "../setup.ts"
import { makeMessage, makeMessageId, queryLog } from "../helpers.ts"

async function seedRow(id: string, source: string | undefined = "10.0.0.1"): Promise<void> {
  await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source })
}

describe("Stage 2 — rate limits", () => {
  beforeEach(async () => {
    await migrate()
    vi.restoreAllMocks()
  })

  it("accepts when all counters are empty, increments to 1, writes accept/none", async () => {
    const id = makeMessageId()
    await seedRow(id)
    const result = await runRateLimits(env, id, makeMessage({ source: "10.0.0.1" }))
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.rate_limit_decision).toBe("accept")
    expect(row!.rate_limit_violation).toBe("none")
    expect(row!.result).toBeNull()
    expect(await env.KV.get(rateLimitKey("10.0.0.1", "hour"))).toBe("1")
    expect(await env.KV.get(rateLimitKey("10.0.0.1", "day"))).toBe("1")
    expect(await env.KV.get(rateLimitKey("10.0.0.1", "lifetime"))).toBe("1")
  })

  it("drops with violation='hour' when hour is at limit, does not increment any counter", async () => {
    const now = Math.floor(Date.now() / 1000)
    await env.KV.put(rateLimitKey("a", "hour"), "10", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    await env.KV.put(rateLimitKey("a", "day"), "10", {
      expiration: now + 86400,
      metadata: { expiresAt: now + 86400 },
    })
    await env.KV.put(rateLimitKey("a", "lifetime"), "10")
    const id = makeMessageId()
    await seedRow(id, "a")
    const result = await runRateLimits(env, id, makeMessage({ source: "a" }))
    expect(result.kind).toBe("stop")
    const row = await queryLog(id)
    expect(row!.rate_limit_decision).toBe("drop")
    expect(row!.rate_limit_violation).toBe("hour")
    expect(row!.result).toBe("dropped")
    expect(await env.KV.get(rateLimitKey("a", "hour"))).toBe("10")
    expect(await env.KV.get(rateLimitKey("a", "day"))).toBe("10")
    expect(await env.KV.get(rateLimitKey("a", "lifetime"))).toBe("10")
  })

  it("drops with violation='day' when day is at limit but hour is not", async () => {
    const now = Math.floor(Date.now() / 1000)
    await env.KV.put(rateLimitKey("b", "hour"), "0", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    await env.KV.put(rateLimitKey("b", "day"), "100", {
      expiration: now + 86400,
      metadata: { expiresAt: now + 86400 },
    })
    const id = makeMessageId()
    await seedRow(id, "b")
    const result = await runRateLimits(env, id, makeMessage({ source: "b" }))
    expect(result.kind).toBe("stop")
    const row = await queryLog(id)
    expect(row!.rate_limit_violation).toBe("day")
  })

  it("drops with violation='lifetime' when only lifetime is at limit", async () => {
    await env.KV.put(rateLimitKey("c", "lifetime"), "1000")
    const id = makeMessageId()
    await seedRow(id, "c")
    const result = await runRateLimits(env, id, makeMessage({ source: "c" }))
    expect(result.kind).toBe("stop")
    const row = await queryLog(id)
    expect(row!.rate_limit_violation).toBe("lifetime")
  })

  it("sourceless messages share the 'unknown' bucket", async () => {
    const now = Math.floor(Date.now() / 1000)
    await env.KV.put(rateLimitKey(undefined, "hour"), "10", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    const id = makeMessageId()
    await insertLogRow(env, {
      id,
      contact: "c",
      message: "m",
      channel: "red",
      source: undefined,
    })
    const result = await runRateLimits(env, id, makeMessage({ source: undefined }))
    expect(result.kind).toBe("stop")
    const row = await queryLog(id)
    expect(row!.rate_limit_violation).toBe("hour")
  })

  it("treats KV read errors as kv_error and continues", async () => {
    vi.spyOn(env.KV, "get").mockRejectedValue(new Error("KV down"))
    const id = makeMessageId()
    await seedRow(id)
    const result = await runRateLimits(env, id, makeMessage({ source: "10.0.0.1" }))
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.rate_limit_decision).toBe("accept")
    expect(row!.rate_limit_violation).toBe("kv_error")
    expect(row!.result).toBeNull()
  })

  it("treats KV write errors as kv_error and continues", async () => {
    vi.spyOn(env.KV, "put").mockRejectedValue(new Error("KV write down"))
    const id = makeMessageId()
    await seedRow(id)
    const result = await runRateLimits(env, id, makeMessage({ source: "10.0.0.1" }))
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.rate_limit_violation).toBe("kv_error")
  })
})

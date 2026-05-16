import { createExecutionContext, createMessageBatch, env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { rateLimitKey } from "../src/constants.ts"
import worker from "../src/index.ts"
import { makeMessage, makeMessageId, queryLog } from "./helpers.ts"
import { migrate } from "./setup.ts"

async function deliver(body: unknown, id: string = makeMessageId()): Promise<string> {
  const batch = createMessageBatch("syn-horse-notifications", [{ id, body, timestamp: new Date(), attempts: 1 }])
  await worker.queue!(batch, env, createExecutionContext())
  return id
}

describe("pipeline", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("happy path: all four stages run, row reflects delivered", async () => {
    const id = await deliver(makeMessage({ source: "1.1.1.1" }))
    const row = await queryLog(id)
    expect(row!.rate_limit_decision).toBe("accept")
    expect(row!.rate_limit_violation).toBe("none")
    expect(row!.ai_decision).toBe("accept")
    expect(row!.ai_violation).toBe("none")
    expect(row!.adapter).toBe("stub")
    expect(row!.result).toBe("delivered")
    expect(await env.KV.get(rateLimitKey("1.1.1.1", "hour"))).toBe("1")
  })

  it("rate-limit drop: ai_decision and adapter remain NULL", async () => {
    const now = Math.floor(Date.now() / 1000)
    await env.KV.put(rateLimitKey("2.2.2.2", "hour"), "10", {
      expiration: now + 3600,
      metadata: { expiresAt: now + 3600 },
    })
    const id = await deliver(makeMessage({ source: "2.2.2.2" }))
    const row = await queryLog(id)
    expect(row!.rate_limit_decision).toBe("drop")
    expect(row!.rate_limit_violation).toBe("hour")
    expect(row!.result).toBe("dropped")
    expect(row!.ai_decision).toBeNull()
    expect(row!.adapter).toBeNull()
  })

  it("invalid schema is acked without inserting a row", async () => {
    const id = await deliver({ channel: "purple", contact: "x", message: "y" })
    const row = await queryLog(id)
    expect(row).toBeNull()
  })
})

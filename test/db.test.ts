import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { insertLogRow, updateAi, updateDelivery, updateRateLimit } from "../src/db.ts"
import { migrate } from "./setup.ts"
import { makeMessageId } from "./helpers.ts"

describe("db helpers", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("insertLogRow writes message fields and leaves state columns NULL", async () => {
    const id = makeMessageId()
    await insertLogRow(env, {
      id,
      contact: "x@y.z",
      message: "hello",
      channel: "green",
      source: "10.0.0.1",
    })
    const row = (await env.DB.prepare("SELECT * FROM log WHERE id = ?").bind(id).first()) as Record<string, unknown>
    expect(row.contact).toBe("x@y.z")
    expect(row.channel).toBe("green")
    expect(row.source).toBe("10.0.0.1")
    expect(row.rate_limit_decision).toBeNull()
    expect(row.ai_decision).toBeNull()
    expect(row.adapter).toBeNull()
  })

  it("insertLogRow stores NULL when source is undefined", async () => {
    const id = makeMessageId()
    await insertLogRow(env, {
      id,
      contact: "c",
      message: "m",
      channel: "red",
      source: undefined,
    })
    const row = (await env.DB.prepare("SELECT source FROM log WHERE id = ?").bind(id).first()) as { source: unknown }
    expect(row.source).toBeNull()
  })

  it("updateRateLimit sets decision and violation, leaves result NULL by default", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "a" })
    await updateRateLimit(env, id, "accept", "none")
    const row = (await env.DB.prepare("SELECT rate_limit_decision, rate_limit_violation, result FROM log WHERE id = ?")
      .bind(id)
      .first()) as Record<string, unknown>
    expect(row.rate_limit_decision).toBe("accept")
    expect(row.rate_limit_violation).toBe("none")
    expect(row.result).toBeNull()
  })

  it("updateRateLimit can set result='dropped'", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "a" })
    await updateRateLimit(env, id, "drop", "hour", "dropped")
    const row = (await env.DB.prepare("SELECT result FROM log WHERE id = ?").bind(id).first()) as { result: unknown }
    expect(row.result).toBe("dropped")
  })

  it("updateAi sets ai_decision and ai_violation", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "a" })
    await updateAi(env, id, "accept", "none")
    const row = (await env.DB.prepare("SELECT ai_decision, ai_violation FROM log WHERE id = ?").bind(id).first()) as Record<string, unknown>
    expect(row.ai_decision).toBe("accept")
    expect(row.ai_violation).toBe("none")
  })

  it("updateDelivery sets adapter, result, and an optional reason", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "a" })
    await updateDelivery(env, id, "stub", "delivered")
    const delivered = (await env.DB.prepare("SELECT adapter, result, result_reason FROM log WHERE id = ?").bind(id).first()) as Record<
      string,
      unknown
    >
    expect(delivered.adapter).toBe("stub")
    expect(delivered.result).toBe("delivered")
    expect(delivered.result_reason).toBeNull()

    const failedId = makeMessageId()
    await insertLogRow(env, {
      id: failedId,
      contact: "c",
      message: "m",
      channel: "red",
      source: "a",
    })
    await updateDelivery(env, failedId, "ntfy", "failed", "connection timed out")
    const failed = (await env.DB.prepare("SELECT result, result_reason FROM log WHERE id = ?").bind(failedId).first()) as Record<
      string,
      unknown
    >
    expect(failed.result).toBe("failed")
    expect(failed.result_reason).toBe("connection timed out")
  })
})

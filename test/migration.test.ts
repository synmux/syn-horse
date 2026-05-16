import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { migrate } from "./setup.ts"

describe("migration 0001", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("creates the log table with required columns", async () => {
    const cols = await env.DB.prepare("PRAGMA table_info(log)").all()
    const names = (cols.results as { name: string }[]).map((column) => column.name).sort()
    expect(names).toEqual(
      [
        "adapter",
        "ai_decision",
        "ai_violation",
        "channel",
        "contact",
        "created_at",
        "id",
        "message",
        "rate_limit_decision",
        "rate_limit_violation",
        "result",
        "result_reason",
        "source",
      ].sort(),
    )
  })

  it("enforces channel CHECK constraint", async () => {
    await expect(
      env.DB.prepare("INSERT INTO log (id, contact, message, channel) VALUES (?,?,?,?)").bind("aaa", "x", "y", "blue").run(),
    ).rejects.toThrow()
  })

  it("accepts a valid minimal row with NULL state columns", async () => {
    await env.DB.prepare("INSERT INTO log (id, contact, message, channel) VALUES (?,?,?,?)").bind("bbb", "x", "y", "red").run()
    const row = (await env.DB.prepare("SELECT * FROM log WHERE id = ?").bind("bbb").first()) as Record<string, unknown>
    expect(row.rate_limit_decision).toBeNull()
    expect(row.ai_decision).toBeNull()
    expect(row.created_at).toBeTypeOf("number")
  })
})

import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { runLogging } from "../../src/stages/logging.ts"
import { migrate } from "../setup.ts"
import { makeMessage, makeMessageId, queryLog } from "../helpers.ts"

describe("Stage 1 — logging", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("inserts a row with message fields and NULL state columns, returns continue", async () => {
    const id = makeMessageId()
    const msg = makeMessage({ source: "10.0.0.1" })
    const result = await runLogging(env, id, msg)
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row).not.toBeNull()
    expect(row!.contact).toBe(msg.contact)
    expect(row!.channel).toBe(msg.channel)
    expect(row!.rate_limit_decision).toBeNull()
    expect(row!.ai_decision).toBeNull()
    expect(row!.adapter).toBeNull()
  })

  it("stores NULL source when source is undefined", async () => {
    const id = makeMessageId()
    const result = await runLogging(env, id, makeMessage({ source: undefined }))
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.source).toBeNull()
  })
})

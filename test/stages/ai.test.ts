import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { insertLogRow } from "../../src/db.ts"
import { runAi } from "../../src/stages/ai.ts"
import { migrate } from "../setup.ts"
import { makeMessage, makeMessageId, queryLog } from "../helpers.ts"

describe("Stage 3 — AI (stub)", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("sets ai_decision='accept', ai_violation='none', returns continue", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "x" })
    const result = await runAi(env, id, makeMessage())
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.ai_decision).toBe("accept")
    expect(row!.ai_violation).toBe("none")
    expect(row!.result).toBeNull()
  })
})

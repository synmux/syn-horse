import { env } from "cloudflare:test"
import { beforeEach, describe, expect, it } from "vitest"
import { insertLogRow } from "../../src/db.ts"
import { runDelivery } from "../../src/stages/delivery.ts"
import { migrate } from "../setup.ts"
import { makeMessage, makeMessageId, queryLog } from "../helpers.ts"

describe("Stage 4 — delivery (stub)", () => {
  beforeEach(async () => {
    await migrate()
  })

  it("sets adapter='stub' and result='delivered', returns continue", async () => {
    const id = makeMessageId()
    await insertLogRow(env, { id, contact: "c", message: "m", channel: "red", source: "x" })
    const result = await runDelivery(env, id, makeMessage())
    expect(result.kind).toBe("continue")
    const row = await queryLog(id)
    expect(row!.adapter).toBe("stub")
    expect(row!.result).toBe("delivered")
    expect(row!.result_reason).toBeNull()
  })
})

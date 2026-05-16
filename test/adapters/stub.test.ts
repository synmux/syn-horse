import { describe, expect, it } from "vitest"
import getAdapter from "../../src/adapters/index.ts"

describe("stub adapter", () => {
  it("getAdapter('stub') returns the stub Adapter", () => {
    const adapter = getAdapter("stub")
    expect(adapter.name).toBe("stub")
  })

  it("send() resolves true and ignores its argument", async () => {
    const adapter = getAdapter("stub")
    const ok = await adapter.send({ channel: "red", content: "anything" })
    expect(ok).toBe(true)
  })
})

import type { NuxtError } from "#app"
import { afterEach, beforeEach, expect, it, vi } from "vitest"

import { contentFailureStatusCode, throwIfContentFailed } from "../../app/utils/content-errors"

// `throwIfContentFailed` calls Nuxt's auto-imported `createError`, which plain vitest does not
// provide; a stand-in that keeps the options it was given is enough to check what is thrown.
class StubNuxtError extends Error {
  constructor(readonly options: Record<string, unknown>) {
    super(String(options.statusText))
  }
}

beforeEach(() => {
  vi.stubGlobal("createError", (options: Record<string, unknown>) => new StubNuxtError(options))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const failedQuery = (status: number): NuxtError =>
  Object.assign(new Error("query failed"), {
    status,
    fatal: false,
    unhandled: false,
    toJSON: () => ({ message: "query failed", statusCode: status }),
  })

it("keeps a server error's own status, such as the 503 from content-sync", () => {
  expect(contentFailureStatusCode(503)).toBe(503)
  expect(contentFailureStatusCode(500)).toBe(500)
})

it("reports a client error from the query endpoint as a 500, never as a 404", () => {
  expect(contentFailureStatusCode(400)).toBe(500)
  expect(contentFailureStatusCode(404)).toBe(500)
})

it("reports an error without a status as a 500", () => {
  expect(contentFailureStatusCode(undefined)).toBe(500)
})

it("does nothing when the query succeeded", () => {
  expect(() => throwIfContentFailed(undefined)).not.toThrow()
  expect(() => throwIfContentFailed(null)).not.toThrow()
})

it("rethrows a failed query as a fatal error that keeps the cause", () => {
  const queryError = failedQuery(503)

  let thrown: unknown
  try {
    throwIfContentFailed(queryError)
  } catch (error) {
    thrown = error
  }

  expect(thrown).toBeInstanceOf(StubNuxtError)
  expect((thrown as StubNuxtError).options).toEqual({
    status: 503,
    statusText: "content temporarily unavailable",
    fatal: true,
    cause: queryError,
  })
})

import { describe, expect, it } from "vitest"

import type { LastAlertStore } from "../../server/utils/content-sync-alerts"
import {
  buildContentSyncAlert,
  buildContentSyncRecovery,
  claimAlert,
  CONTENT_SYNC_ALERT_SOURCE,
  createFailureTracker,
  lastAlertKey,
  releaseAlert,
} from "../../server/utils/content-sync-alerts"
import { isValidSource } from "../../server/utils/queue-message"

const MINUTE = 60_000
const HOUR = 60 * MINUTE

const createClock = (start = Date.parse("2026-09-29T20:00:00Z")) => {
  let current = start
  return {
    now: () => current,
    advance: (milliseconds: number) => {
      current += milliseconds
    },
  }
}

/** A KV stand-in that records what was written, including the expiry. */
class MemoryLastAlertStore implements LastAlertStore {
  readonly entries = new Map<string, { value: string; expirationTtl: number }>()

  async get(key: string): Promise<string | null> {
    return this.entries.get(key)?.value ?? null
  }

  async put(key: string, value: string, options: { expirationTtl: number }): Promise<void> {
    this.entries.set(key, { value, expirationTtl: options.expirationTtl })
  }

  async delete(key: string): Promise<void> {
    this.entries.delete(key)
  }
}

class FailingLastAlertStore implements LastAlertStore {
  async get(): Promise<string | null> {
    throw new Error("KV unavailable")
  }

  async put(): Promise<void> {
    throw new Error("KV unavailable")
  }

  async delete(): Promise<void> {
    throw new Error("KV unavailable")
  }
}

describe("createFailureTracker", () => {
  const createTracker = () => {
    const clock = createClock()
    return { clock, tracker: createFailureTracker({ alertAfterFailingForMs: MINUTE, now: clock.now }) }
  }

  it("does not treat a failure as worth a page until the run has lasted the threshold", () => {
    const { clock, tracker } = createTracker()

    expect(tracker.recordFailure("blog")).toEqual({ failingForMs: 0, alertWorthy: false })
    clock.advance(MINUTE - 1)
    expect(tracker.recordFailure("blog").alertWorthy).toBe(false)
    clock.advance(1)
    expect(tracker.recordFailure("blog")).toEqual({ failingForMs: MINUTE, alertWorthy: true })
  })

  it("starts again after a success, so a failure that heals never becomes worth a page", () => {
    const { clock, tracker } = createTracker()
    tracker.recordFailure("blog")
    clock.advance(MINUTE / 2)

    tracker.recordSuccess("blog")
    clock.advance(MINUTE)
    expect(tracker.recordFailure("blog").alertWorthy).toBe(false)
  })

  it("tracks each key separately", () => {
    const { clock, tracker } = createTracker()
    tracker.recordFailure("blog")
    clock.advance(MINUTE)

    expect(tracker.recordFailure("notes").alertWorthy).toBe(false)
    expect(tracker.recordFailure("blog").alertWorthy).toBe(true)
  })
})

describe("claimAlert", () => {
  const key = lastAlertKey("blog")

  it("sends the first page and stores its time, with an expiry beyond the repeat window", async () => {
    const clock = createClock()
    const store = new MemoryLastAlertStore()

    await expect(claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })).resolves.toEqual({ send: true })

    const stored = store.entries.get(key)
    expect(stored?.value).toBe(new Date(clock.now()).toISOString())
    expect(stored?.expirationTtl).toBeGreaterThan(HOUR / 1000)
  })

  it("stays quiet while the last page is within the repeat window, then pages again", async () => {
    const clock = createClock()
    const store = new MemoryLastAlertStore()
    await claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })

    clock.advance(HOUR - 1)
    await expect(claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })).resolves.toEqual({ send: false })

    clock.advance(1)
    await expect(claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })).resolves.toEqual({ send: true })
  })

  it("pages again straight away once the stored time is cleared after a recovery", async () => {
    const clock = createClock()
    const store = new MemoryLastAlertStore()
    await claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })

    await store.delete(key)
    clock.advance(MINUTE)

    await expect(claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })).resolves.toEqual({ send: true })
  })

  it("treats an unreadable stored value as no previous page", async () => {
    const clock = createClock()
    const store = new MemoryLastAlertStore()
    await store.put(key, "not a timestamp", { expirationTtl: 60 })

    await expect(claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })).resolves.toEqual({ send: true })
  })

  it("fails open, so a KV outage never swallows a page", async () => {
    await expect(claimAlert({ store: new FailingLastAlertStore(), key, repeatAfterMs: HOUR })).resolves.toEqual({
      send: true,
      storeError: "KV unavailable",
    })
  })
})

describe("releaseAlert", () => {
  const key = lastAlertKey("blog")

  it("announces a recovery when a red page is outstanding, and clears it so only one announces", async () => {
    const clock = createClock()
    const store = new MemoryLastAlertStore()
    await claimAlert({ store, key, repeatAfterMs: HOUR, now: clock.now })

    await expect(releaseAlert({ store, key })).resolves.toEqual({ announce: true, lastAlertAt: clock.now() })
    expect(store.entries.has(key)).toBe(false)
    await expect(releaseAlert({ store, key })).resolves.toEqual({ announce: false })
  })

  it("stays quiet when no red page went out", async () => {
    await expect(releaseAlert({ store: new MemoryLastAlertStore(), key })).resolves.toEqual({ announce: false })
  })

  it("still announces, without a time, when the stored value is unreadable", async () => {
    const store = new MemoryLastAlertStore()
    await store.put(key, "not a timestamp", { expirationTtl: 60 })

    await expect(releaseAlert({ store, key })).resolves.toEqual({ announce: true })
  })

  it("fails closed, so a KV outage cannot send an all-clear on every sync", async () => {
    await expect(releaseAlert({ store: new FailingLastAlertStore(), key })).resolves.toEqual({
      announce: false,
      storeError: "KV unavailable",
    })
  })
})

describe("buildContentSyncRecovery", () => {
  it("sends an all-clear on the green channel from a source the consumer accepts", () => {
    const recovery = buildContentSyncRecovery({ collection: "blog" })

    expect(recovery.channel).toBe("green")
    expect(recovery.source).toBe(CONTENT_SYNC_ALERT_SOURCE)
    expect(recovery.message).toMatch(/^All clear: syn\.horse blog pages are working again\./)
  })

  it("says where it recovered and how long ago the red page went out", () => {
    const clock = createClock()
    const lastAlertAt = clock.now()
    clock.advance(12 * MINUTE)

    const recovery = buildContentSyncRecovery({ collection: "blog", lastAlertAt, location: "LHR", now: clock.now })

    expect(recovery.message).toContain("syncing normally in LHR.")
    expect(recovery.message).toContain("The red page went out 12 minutes ago.")
  })

  it("leaves out what it does not know", () => {
    const recovery = buildContentSyncRecovery({ collection: "blog" })

    expect(recovery.message).not.toContain(" in ")
    expect(recovery.message).not.toContain("red page went out")
    expect(recovery.message).toMatch(/syncing normally\.$/)
  })
})

describe("buildContentSyncAlert", () => {
  const alert = buildContentSyncAlert({
    collection: "blog",
    error: new Error("D1_ERROR: internal error; reference = e_Gz3hrU_bbe867cd"),
    failingForMs: 3 * MINUTE,
    location: "LHR",
  })

  it("pages on the red channel from a source the consumer accepts", () => {
    expect(alert.channel).toBe("red")
    expect(alert.source).toBe(CONTENT_SYNC_ALERT_SOURCE)
    expect(isValidSource(CONTENT_SYNC_ALERT_SOURCE)).toBe(true)
    expect(alert.contact.length).toBeGreaterThan(0)
  })

  it("opens with a plain sentence, then gives the collection, duration, location and error", () => {
    expect(alert.message).toMatch(/^syn\.horse blog pages are down\./)
    expect(alert.message).toContain('"blog"')
    expect(alert.message).toContain("in LHR for 3 minutes.")
    expect(alert.message).toContain("D1_ERROR: internal error")
  })

  it("omits the location when it is unknown", () => {
    const withoutLocation = buildContentSyncAlert({ collection: "blog", error: "boom", failingForMs: MINUTE })

    expect(withoutLocation.message).not.toContain(" in ")
    expect(withoutLocation.message).toContain("(D1) for 1 minute.")
  })

  it("truncates a long error so the message stays well within the consumer's limit", () => {
    const long = buildContentSyncAlert({ collection: "blog", error: "x".repeat(5000), failingForMs: MINUTE })

    expect(long.message.length).toBeLessThan(1000)
    expect(long.message).toContain("…")
  })
})

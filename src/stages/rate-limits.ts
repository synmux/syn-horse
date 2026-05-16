import { RATE_LIMITS, RATE_LIMIT_PERIODS } from "../constants.ts"
import { updateRateLimit } from "../db.ts"
import { incrementCounters, readCounters } from "../kv.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, STOP, type StageResult } from "./types.ts"

export async function runRateLimits(env: Env, id: string, msg: Message): Promise<StageResult> {
  try {
    const counters = await readCounters(env, msg.source)
    for (const period of RATE_LIMIT_PERIODS) {
      if (counters[period].value >= RATE_LIMITS[period]) {
        await updateRateLimit(env, id, "drop", period, "dropped")
        return STOP
      }
    }
    await incrementCounters(env, msg.source, counters)
    await updateRateLimit(env, id, "accept", "none")
    return CONTINUE
  } catch (err) {
    console.error({
      messageId: id,
      message: "rate-limit KV error",
      error: err instanceof Error ? err.message : String(err),
    })
    await updateRateLimit(env, id, "accept", "kv_error")
    return CONTINUE
  }
}

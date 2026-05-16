import { RATE_LIMITS, RATE_LIMIT_PERIODS } from "../constants.ts"
import { updateRateLimit } from "../db.ts"
import { incrementCounters, readCounters } from "../kv.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, STOP, type StageResult } from "./types.ts"

/**
 * Run the rate-limit stage.
 *
 * Reads the per-source counters from KV in parallel, compares each to the
 * cap in {@link RATE_LIMITS}, and either drops the message (recording the
 * triggering window via {@link updateRateLimit}) or increments the
 * counters and continues.
 *
 * A KV error is treated as **fail-open**: the message is allowed through
 * and the log row is annotated with `"kv_error"` so the outage is visible
 * in the audit table without dropping legitimate pages. This is
 * deliberate — the operator would rather see noise during a KV incident
 * than miss a genuine page.
 *
 * @param env - Worker environment exposing the `KV` and `DB` bindings.
 * @param id - Message id (the log row primary key).
 * @param msg - The validated message; `msg.source` selects the counter set.
 * @returns {@link STOP} when the message was rate-limited and the
 *   `result = "dropped"` row has been written; otherwise {@link CONTINUE},
 *   including the KV-error fail-open path.
 */
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

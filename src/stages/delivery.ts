import getAdapter from "../adapters/index.ts"
import { updateDelivery } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"

/**
 * Run the delivery stage: hand the message to an {@link Adapter} and record
 * the outcome on the log row.
 *
 * NOTE: the adapter is currently hard-wired to `"stub"`, which always
 * succeeds without performing network I/O. The production version will
 * choose the adapter based on the channel or per-source configuration, and
 * map adapter failures to `result = "failed"` with a `result_reason`.
 *
 * @param env - Worker environment used to update the log row.
 * @param id - Message id (the log row primary key).
 * @param msg - The validated message to deliver.
 * @returns A {@link StageResult}. Always {@link CONTINUE} — there is no
 *   stage after delivery, but returning a uniform result keeps the stage
 *   signature consistent for the queue handler.
 */
export async function runDelivery(env: Env, id: string, msg: Message): Promise<StageResult> {
  const adapter = getAdapter("stub")
  await adapter.send({ channel: msg.channel, content: msg.message })
  await updateDelivery(env, id, adapter.name, "delivered")
  return CONTINUE
}

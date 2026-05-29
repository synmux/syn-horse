import { insertLogRow } from "../db.ts";
import type { Payload } from "../schema.ts";
import { CONTINUE, type StageResult } from "./types.ts";

/**
 * Run the logging stage: insert the initial audit row for this message.
 *
 * Always returns {@link CONTINUE}; a D1 failure propagates as a thrown
 * exception so the queue handler can retry the message rather than
 * silently losing the audit trail.
 *
 * @param env - Worker environment exposing the `DB` binding.
 * @param id - Queue message id, also used as the log row primary key.
 * @param msg - The validated message to record.
 * @returns A {@link StageResult} — always {@link CONTINUE}.
 */
export async function runLogging(
  env: Env,
  id: string,
  payload: Payload
): Promise<StageResult> {
  await insertLogRow(env, {
    id,
    contact: payload.contact,
    message: payload.message,
    channel: payload.channel,
    source: payload.source,
  });
  return CONTINUE;
}

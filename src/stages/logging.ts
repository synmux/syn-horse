import { insertLogRow } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"

export async function runLogging(env: Env, id: string, msg: Message): Promise<StageResult> {
  await insertLogRow(env, {
    id,
    contact: msg.contact,
    message: msg.message,
    channel: msg.channel,
    source: msg.source,
  })
  return CONTINUE
}

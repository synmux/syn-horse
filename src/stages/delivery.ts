import getAdapter from "../adapters/index.ts"
import { updateDelivery } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"

export async function runDelivery(env: Env, id: string, msg: Message): Promise<StageResult> {
  const adapter = getAdapter("stub")
  await adapter.send({ channel: msg.channel, content: msg.message })
  await updateDelivery(env, id, adapter.name, "delivered")
  return CONTINUE
}

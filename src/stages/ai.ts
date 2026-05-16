import { updateAi } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"

export async function runAi(env: Env, id: string, _msg: Message): Promise<StageResult> {
  await updateAi(env, id, "accept", "none")
  return CONTINUE
}

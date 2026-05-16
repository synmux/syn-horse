import type { Message } from "./schema.ts"

export type RateLimitDecision = "accept" | "drop"
export type RateLimitViolation = "none" | "hour" | "day" | "lifetime" | "kv_error"
export type AiDecision = "accept" | "drop"
export type AiViolation = "none" | "fun" | "nonsense" | "spam"
export type Result = "dropped" | "delivered" | "failed"

export type InsertLogRow = Pick<Message, "contact" | "message" | "channel"> & {
  id: string
  source: string | undefined
}

export async function insertLogRow(env: Env, row: InsertLogRow): Promise<void> {
  await env.DB.prepare("INSERT INTO log (id, contact, message, channel, source) VALUES (?, ?, ?, ?, ?)")
    .bind(row.id, row.contact, row.message, row.channel, row.source ?? null)
    .run()
}

export async function updateRateLimit(
  env: Env,
  id: string,
  decision: RateLimitDecision,
  violation: RateLimitViolation,
  result?: "dropped",
): Promise<void> {
  if (result !== undefined) {
    await env.DB.prepare("UPDATE log SET rate_limit_decision = ?, rate_limit_violation = ?, result = ? WHERE id = ?")
      .bind(decision, violation, result, id)
      .run()
    return
  }
  await env.DB.prepare("UPDATE log SET rate_limit_decision = ?, rate_limit_violation = ? WHERE id = ?").bind(decision, violation, id).run()
}

export async function updateAi(env: Env, id: string, decision: AiDecision, violation: AiViolation, result?: "dropped"): Promise<void> {
  if (result !== undefined) {
    await env.DB.prepare("UPDATE log SET ai_decision = ?, ai_violation = ?, result = ? WHERE id = ?")
      .bind(decision, violation, result, id)
      .run()
    return
  }
  await env.DB.prepare("UPDATE log SET ai_decision = ?, ai_violation = ? WHERE id = ?").bind(decision, violation, id).run()
}

export async function updateDelivery(env: Env, id: string, adapter: string, result: Result, reason?: string): Promise<void> {
  await env.DB.prepare("UPDATE log SET adapter = ?, result = ?, result_reason = ? WHERE id = ?")
    .bind(adapter, result, reason ?? null, id)
    .run()
}

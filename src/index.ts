import { safeParseMessage } from "./schema.ts"
import { runAi } from "./stages/ai.ts"
import { runDelivery } from "./stages/delivery.ts"
import { runLogging } from "./stages/logging.ts"
import { runRateLimits } from "./stages/rate-limits.ts"

export default {
  // https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
  async queue(batch, env): Promise<void> {
    for (const message of batch.messages) {
      const parsed = safeParseMessage(message.body)
      if (!parsed.success) {
        console.error({
          messageId: message.id,
          message: "invalid page message",
          issues: parsed.error.issues,
          body: message.body,
        })
        message.ack()
        continue
      }
      const msg = parsed.data
      try {
        if ((await runLogging(env, message.id, msg)).kind === "stop") {
          message.ack()
          continue
        }
        if ((await runRateLimits(env, message.id, msg)).kind === "stop") {
          message.ack()
          continue
        }
        if ((await runAi(env, message.id, msg)).kind === "stop") {
          message.ack()
          continue
        }
        await runDelivery(env, message.id, msg)
        message.ack()
      } catch (err) {
        console.error({
          messageId: message.id,
          message: "pipeline failure",
          error: err instanceof Error ? err.message : String(err),
        })
        message.retry()
      }
    }
  },
} satisfies ExportedHandler<Env, unknown>

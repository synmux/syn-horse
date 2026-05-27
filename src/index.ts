import { safeParseMessage } from "./schema.ts"
import { runAi } from "./stages/ai.ts"
import { runDelivery } from "./stages/delivery.ts"
import { runLogging } from "./stages/logging.ts"
import { runRateLimits } from "./stages/rate-limits.ts"

const STOP = "stop"
const CONTINUE = "continue"
const FINISHED = "finished"

/**
 * Cloudflare Workers queue consumer for paging messages.
 *
 * Each batch message is validated with {@link safeParseMessage} and then
 * dispatched through the four-stage pipeline:
 *
 * 1. **logging** — insert the audit row.
 * 2. **rate limits** — enforce per-source caps.
 * 3. **AI moderation** — classify the message.
 * 4. **delivery** — hand off to an {@link Adapter}.
 *
 * Stages 2 and 3 can short-circuit by returning `STOP`, in which case the
 * message is `ack()`'d and the pipeline does not proceed. Any thrown
 * exception causes the message to be `retry()`'d so transient failures
 * (e.g. D1 unavailability) are eventually replayed.
 *
 * Malformed payloads are logged and `ack()`'d rather than retried, since
 * no amount of retrying will make a bad schema valid.
 *
 * @see https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
 */
export default {
  // http for message acks
  async fetch(_req, _env, _ctx): Promise<Response> {
    return new Response("Ping? Pong!")
  },

  // queue logic
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
      const payload = parsed.data
      try {
        if ((await runLogging(env, message.id, payload)).kind === STOP) {
          console.info({ stage: "logging", action: STOP, payload, message: `logging stopped for message ${message.id}` })
          message.ack()
          continue
        }
        console.info({ stage: "logging", action: CONTINUE, payload, message: `logging passed for message ${message.id}` })
        if ((await runRateLimits(env, message.id, payload)).kind === STOP) {
          console.info({ stage: "rate-limiting", action: STOP, payload, message: `rate limiting stopped for message ${message.id}` })
          message.ack()
          continue
        }
        console.info({ stage: "rate-limiting", action: CONTINUE, payload, message: `rate limiting passed for message ${message.id}` })
        if ((await runAi(env, message.id, payload)).kind === STOP) {
          console.info({ stage: "ai", action: STOP, payload, message: `ai stopped for message ${message.id}` })
          message.ack()
          continue
        }
        console.info({ stage: "ai", action: CONTINUE, payload, message: `ai passed for message ${message.id}` })
        await runDelivery(env, message.id, payload)
        console.info({ stage: "delivery", action: FINISHED, payload, message: `delivery finished for message ${message.id}` })
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

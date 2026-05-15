import { formatMessageSummary, safeParseMessage, type Message } from "./schema.ts"
import getAdapter from "./adapters/index.ts"

/* http get ability

async fetch(req, env, ctx): Promise<Response> {
  return new Response('Hello!');
}

*/

export default {
  // https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
  async queue(batch, _env): Promise<void> {
    for (const message of batch.messages) {
      const result = safeParseMessage(message.body)
      if (!result.success) {
        console.error({
          messageId: message.id,
          message: "invalid page message",
          issues: result.error.issues,
          body: message.body,
        })
        message.ack()
        continue
      }
      const adapter = getAdapter("ntfy")
      console.info({
        messageId: message.id,
        message: formatMessageSummary(result.data),
        adapter: adapter.name,
      })
      // TODO: implement database logging for all messages (DB binding available)
      // TODO: validate rate limits; then pass to next stage if ok (KV binding available)
      // TODO: validate with AI; then pass to next stage if ok (AI binding available)
      // TODO: dispatch to adapter(s)
      message.ack()
    }
  },
} satisfies ExportedHandler<Env, Message>

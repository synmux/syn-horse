import adapters from "./adapters/index.ts"
import { formatMessageSummary, safeParseMessage, type Message } from "./schema.ts"

export default {
  // async fetch(req, env, ctx): Promise<Response> {
  // 	return new Response('Hello!');
  // },
  // https://developers.cloudflare.com/queues/platform/javascript-apis/#messagebatch
  async queue(batch, _env): Promise<void> {
    for (const message of batch.messages) {
      const result = safeParseMessage(message.body)
      if (!result.success) {
        console.error({
          messageId: message.id,
          msg: "invalid page message",
          issues: result.error.issues,
          body: message.body,
        })
        message.ack()
        continue
      }
      console.info({
        messageId: message.id,
        summary: formatMessageSummary(result.data),
        adapters: Object.keys(adapters),
      })
      // TODO: dispatch to adapters[adapterName].send(result.data)
    }
  },
} satisfies ExportedHandler<Env, Message>

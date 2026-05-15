import { z } from "zod"

/* example message

{
  "contact": "alerts@example.com",
  "message": "Disk usage has exceeded 85% on server node-12. Please investigate.",
  "source": "monitoring.example.com",
  "counter": {
    "day": 3,
    "hour": 42,
    "lifetime": 127
  }
}

*/

const HOSTNAME_RE = /^(?=.{1,253}$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const counterSchema = z.strictObject({
  day: z.int().min(0).optional(),
  hour: z.int().min(0).optional(),
  lifetime: z.int().min(0).optional(),
})

export const messageSchema = z.strictObject({
  contact: z.string().trim().min(1).max(256),
  message: z.string().trim().min(1).max(8192),
  source: z.union([z.ipv4(), z.ipv6(), z.string().regex(HOSTNAME_RE)]).optional(),
  counter: counterSchema.optional(),
})

export type Counter = z.infer<typeof counterSchema>
export type Message = z.infer<typeof messageSchema>

export function parseMessage(input: unknown): Message {
  return messageSchema.parse(input)
}

export function safeParseMessage(input: unknown) {
  return messageSchema.safeParse(input)
}

export function isMessage(input: unknown): input is Message {
  return messageSchema.safeParse(input).success
}

export function formatMessageSummary(message: Message): string {
  const truncated = message.message.length > 60 ? `${message.message.slice(0, 57)}...` : message.message
  const via = message.source ? ` via ${message.source}` : ""
  return `page from ${message.contact}${via}: ${truncated}`
}

export default {
  messageSchema,
  counterSchema,
  parseMessage,
  safeParseMessage,
  isMessage,
  formatMessageSummary,
}

import type { H3Event } from "h3"
import { getHeader } from "h3"

import type { QueueMessage } from "~~/server/utils/queue-message"
import { isValidSource } from "~~/server/utils/queue-message"

export type PageResult = { ok: true } | { ok: false; error: string }

export interface Pager {
  send(payload: QueueMessage): Promise<PageResult>
}

/**
 * Extract a `source` from request headers, preferring the leftmost
 * `X-Forwarded-For` entry, falling back to `CF-Connecting-IP`. Each candidate
 * is validated against the consumer's accepted shapes; if none pass, returns
 * `undefined` so the field is omitted from the wire payload.
 */
export const extractSource = (event: H3Event): string | undefined => {
  const candidates: string[] = []
  const forwarded = getHeader(event, "x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) {
      candidates.push(first)
    }
  }
  const connecting = getHeader(event, "cf-connecting-ip")?.trim()
  if (connecting) {
    candidates.push(connecting)
  }
  for (const candidate of candidates) {
    if (isValidSource(candidate)) {
      return candidate
    }
  }
  return
}

export const queuePager = (queue: Queue<QueueMessage>): Pager => ({
  async send(payload) {
    try {
      await queue.send(payload, { contentType: "json" })
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },
})

export const usePager = (event: H3Event): Pager => {
  const queue = event.context.cloudflare.env.NOTIFICATIONS as Queue<QueueMessage>
  return queuePager(queue)
}

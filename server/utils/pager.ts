import type { H3Event } from "h3"
import { getHeader } from "h3"

import type { Channel } from "~~/server/db/schema"

// RFC-1123 hostname matcher. Kept byte-for-byte identical to the consumer
// Worker's `HOSTNAME_RE` (syn-horse.notifications/src/schema.ts) so the
// producer never puts a `source` on the wire that the consumer will reject.
const HOSTNAME_RE =
  /^(?=.{1,253}$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const IPV4_RE = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

const IPV6_RE =
  /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:)|::(?:ffff(?::0{1,4})?:)?(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))$/

/** Wire format accepted by the `syn-horse-notifications` consumer (strict). */
export type QueueMessage = {
  channel: Channel
  contact: string
  message: string
  source?: string
}

export type PageResult = { ok: true } | { ok: false; error: string }

export interface Pager {
  send(payload: QueueMessage): Promise<PageResult>
}

const isValidSource = (candidate: string): boolean =>
  IPV4_RE.test(candidate) || IPV6_RE.test(candidate) || HOSTNAME_RE.test(candidate)

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
    if (first) candidates.push(first)
  }
  const connecting = getHeader(event, "cf-connecting-ip")?.trim()
  if (connecting) candidates.push(connecting)
  for (const candidate of candidates) {
    if (isValidSource(candidate)) return candidate
  }
  return undefined
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

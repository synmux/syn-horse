import { publish, type MessagePriority } from "ntfy"

export type PageNotification = {
  title: string
  body: string
  priority: 1 | 2 | 3 | 4 | 5
  tags?: string[]
}

export type PageResult = { ok: true; messageId: string } | { ok: false; error: string }

export interface Pager {
  send(notification: PageNotification): Promise<PageResult>
}

const NTFY_SERVER = "https://ntfy.sh"
const NTFY_TOPIC = "syn.horse"

export const ntfyPager = (): Pager => ({
  async send(notification) {
    try {
      const response = await publish({
        server: NTFY_SERVER,
        topic: NTFY_TOPIC,
        title: notification.title,
        message: notification.body,
        priority: notification.priority as MessagePriority,
        tags: notification.tags,
      })
      return { ok: true, messageId: String(response.id) }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },
})

// When the Workers Queue lands, swap to a queuePager() whose send() enqueues;
// the consumer Worker will instantiate ntfyPager() directly and call .send()
// with the same PageNotification shape.
export const usePager = (): Pager => ntfyPager()

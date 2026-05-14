import type { H3Event } from "h3"

export type PageNotification = {
  title: string
  body: string
  priority: 1 | 2 | 3 | 4 | 5
  tags?: string[]
}

export type PageResult = { ok: true } | { ok: false; error: string }

export interface Pager {
  send(notification: PageNotification): Promise<PageResult>
}

export type NotificationQueueMessage = {
  panicId: string
  notification: PageNotification
}

export const queuePager = (queue: Queue<NotificationQueueMessage>, panicId: string): Pager => ({
  async send(notification) {
    try {
      await queue.send({ panicId, notification }, { contentType: "json" })
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },
})

export const usePager = (event: H3Event, panicId: string): Pager => {
  const queue = event.context.cloudflare.env.NOTIFICATIONS as Queue<NotificationQueueMessage>
  return queuePager(queue, panicId)
}

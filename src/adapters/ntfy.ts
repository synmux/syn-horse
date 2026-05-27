import { MessagePriority, publish } from "ntfy"
import { Adapter, Notification } from "../types.ts"
import type { Config } from "ntfy"

const DEFAULT_NTFY_INSTANCE = "https://ntfy.sh"

/**
 * Resolve the ntfy topic for a notification.
 *
 * When `NTFY_TOPIC` is set, every message is published to that topic and the
 * paging channel is carried in tags/title instead. Otherwise the channel name
 * (`red` / `green`) is used as the topic directly.
 */
function resolveTopic(env: Env, channel: string): string {
  if (!env.NTFY_TOPIC) {
    throw new Error("NTFY_TOPIC is required")
  }
  const configuredTopic = env.NTFY_TOPIC.trim()
  return configuredTopic && configuredTopic.length > 0 ? configuredTopic : channel
}

/**
 * ntfy.sh delivery adapter.
 *
 * Publishes the notification body to ntfy using the `ntfy` package. The paging
 * channel is reflected in the notification title and tags; the topic is either
 * the channel name or a shared topic from `NTFY_TOPIC`.
 *
 * Optional environment variables:
 *
 * - `NTFY_SERVER` — ntfy server base URL (default `https://ntfy.sh`)
 * - `NTFY_TOPIC` — shared topic for all channels (default: channel name)
 * - `NTFY_TOKEN` — bearer token for authenticated topics
 *
 * Returns `false` when ntfy responds with a non-2xx status. Network and
 * configuration errors are thrown so the queue handler can retry.
 */
const ntfy: Adapter = {
  name: "ntfy",
  send: async (env: Env, message: Notification): Promise<boolean> => {
    if (!env.NTFY_TOKEN) {
      throw new Error("NTFY_TOKEN is required")
    }

    const server = env.NTFY_SERVER?.trim() || DEFAULT_NTFY_INSTANCE
    const token = env.NTFY_TOKEN.trim()

    try {
      const body = JSON.stringify({
        message: message.content,
        channel: message.channel,
        id: message.id,
      })

      const publishable: Config = {
        message: message.content,
        topic: resolveTopic(env, message.channel),
        server,
        ...(token ? { authorization: token } : {}),
        priority: message.channel === "green" ? MessagePriority.DEFAULT : MessagePriority.MAX,
        tags: [message.channel],
        title: message.channel,
        actions: [
          {
            label: "ack",
            type: "http",
            url: "https://syn-horse-notifications.synmux.workers.dev/ack",
          },
        ],
      }
      console.info({
        message: "Preparing to publish",
        body,
        publishable,
      })
      const res = await publish(publishable)
      console.info({
        message: "Notification published",
        res,
        body,
        publishable,
      })
      return true
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Error while publishing message:")) {
        console.error({
          message: "Error while publishing message",
          error,
        })
        return false
      }
      console.error({
        message: "Error publishing notification",
        error,
      })
      throw error
    }
  },
}

export default ntfy

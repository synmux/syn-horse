import { Pushover } from "pushover-js"
import { PUSHOVER_EMERGENCY_EXPIRE_SECONDS, PUSHOVER_EMERGENCY_RETRY_SECONDS, PUSHOVER_MESSAGE_MAX_LENGTH } from "../constants.ts"
import type { Adapter, Notification } from "../types.ts"

type Channel = "red" | "green"
type PushoverPriority = -2 | -1 | 0 | 1 | 2

/**
 * Subset of the `pushover-js` `Sound` union that this adapter uses. The
 * library declares the full set of Pushover-supported sounds as an
 * unexported internal type, so we re-declare the narrow subset we map
 * channels to. Add new literals here when wiring up new channels.
 */
type Sound = "siren" | "pushover"

interface ChannelConfig {
  priority: PushoverPriority
  sound: Sound
}

const TRUNCATION_SUFFIX = "…[truncated]"

const CHANNEL_CONFIG: Record<Channel, ChannelConfig> = {
  red: { priority: 2, sound: "siren" },
  green: { priority: 0, sound: "pushover" },
}

const FALLBACK_CONFIG: ChannelConfig = CHANNEL_CONFIG.green

/**
 * Trim `content` to Pushover's per-message character limit and append a
 * trailing marker when truncation happens so the receiver knows the body
 * was cut.
 */
function truncateMessage(content: string): string {
  if (content.length <= PUSHOVER_MESSAGE_MAX_LENGTH) {
    return content
  }
  const head = content.slice(0, PUSHOVER_MESSAGE_MAX_LENGTH - TRUNCATION_SUFFIX.length)
  return `${head}${TRUNCATION_SUFFIX}`
}

function configFor(channel: string): ChannelConfig {
  return (CHANNEL_CONFIG as Record<string, ChannelConfig | undefined>)[channel] ?? FALLBACK_CONFIG
}

/**
 * Pushover delivery adapter.
 *
 * Publishes the notification via the Pushover Messages API using the
 * `pushover-js` package. The paging channel determines both the alert
 * priority and the device sound:
 *
 * - `red` is emergency-priority (priority `2`) and uses the `siren` sound.
 *   Pushover re-alerts the device every {@link PUSHOVER_EMERGENCY_RETRY_SECONDS}
 *   seconds for up to {@link PUSHOVER_EMERGENCY_EXPIRE_SECONDS} seconds, until
 *   the user acknowledges the notification on-device.
 * - `green` (and any unrecognised channel) uses the default priority (`0`)
 *   and the default Pushover sound.
 *
 * Required secrets:
 *
 * - `PUSHOVER_APP_TOKEN` — Pushover application API token
 * - `PUSHOVER_USER_TOKEN` — Pushover user or group key
 *
 * Message bodies longer than {@link PUSHOVER_MESSAGE_MAX_LENGTH} characters
 * are truncated with a trailing marker, because the Pushover API caps the
 * body at 1024 characters while the queue schema accepts up to 8192.
 *
 * Unlike `ntfy`, this adapter does not attach an HTTP-action ack button —
 * Pushover's `url` field opens a plain link and cannot send the
 * `X-Self-Token` header the `/ack` endpoint expects.
 *
 * Returns `false` when Pushover refuses the message (the `pushover-js`
 * package throws a `ResponseError` with a `statusCode` property for any
 * non-2xx response). Network and configuration errors are rethrown so the
 * queue handler retries the message.
 */
const pushover: Adapter = {
  name: "pushover",
  send: async (env: Env, message: Notification): Promise<boolean> => {
    if (!env.PUSHOVER_APP_TOKEN) {
      throw new Error("PUSHOVER_APP_TOKEN is required")
    }
    if (!env.PUSHOVER_USER_TOKEN) {
      throw new Error("PUSHOVER_USER_TOKEN is required")
    }

    const config = configFor(message.channel)

    const client = new Pushover(env.PUSHOVER_USER_TOKEN.trim(), env.PUSHOVER_APP_TOKEN.trim())
      .setTitle(message.channel)
      .setMessage(truncateMessage(message.content))
      .setSound(config.sound)
      .setPriority(config.priority, PUSHOVER_EMERGENCY_EXPIRE_SECONDS, PUSHOVER_EMERGENCY_RETRY_SECONDS)

    try {
      await client.send()
      return true
    } catch (error) {
      if (error && typeof error === "object" && "statusCode" in error) {
        console.error({
          message: "Pushover refused the notification",
          error,
        })
        return false
      }
      console.error({
        message: "Undefined error publishing Pushover notification",
        error,
      })
      throw error
    }
  },
}

export default pushover

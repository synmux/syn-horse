import { Adapter, Notification } from "../types.ts"

/**
 * ntfy.sh delivery adapter.
 *
 * NOTE: not yet implemented — `send` currently returns `true` without
 * contacting ntfy. The production version will POST to a configured topic
 * with the channel folded into the message title or tags, and will surface
 * non-2xx responses as a `false` return so the delivery stage can record a
 * failure.
 */
const ntfy: Adapter = {
  name: "ntfy",
  send: async (_message: Notification): Promise<boolean> => {
    return true
  },
}

export default ntfy

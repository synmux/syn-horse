import { Adapter, Notification } from "../types.ts"

/**
 * Pushover delivery adapter.
 *
 * NOTE: not yet implemented — `send` currently returns `true` without
 * contacting Pushover. The production version will call the Pushover
 * messages API with the configured user/app keys and map the response's
 * `status` field to the boolean return.
 */
const pushover: Adapter = {
  name: "pushover",
  send: async (_env: Env, _message: Notification): Promise<boolean> => {
    return true
  },
}

export default pushover

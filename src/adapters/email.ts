import { Adapter, Notification } from "../types.ts"

/**
 * Email delivery adapter.
 *
 * NOTE: not yet implemented — `send` currently returns `true` without
 * sending any email. The production version will send email with the
 * notification information, returning `true` unless the call to
 * Cloudflare's EMAIL binding fails.
 *
 */
const email: Adapter = {
  name: "email",
  send: async (_env: Env, _message: Notification): Promise<boolean> => {
    return true
  },
}

export default email

import type { Adapter, Notification } from "../types.ts";

/**
 * Twilio adapter.
 *
 * NOTE: not yet implemented — `send` currently returns `true` without
 * sending any notifications. The production version will send SMS and
 * make phone calls with the notification information, returning `true`
 * unless the call to the Twilio API fails.
 *
 */
const twilio: Adapter = {
  name: "twilio",
  send: async (_env: Env, _message: Notification): Promise<boolean> => true,
};

export default twilio;

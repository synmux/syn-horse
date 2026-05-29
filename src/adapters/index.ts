import type { Adapter } from "../types.ts";
import email from "./email.ts";
import ntfy from "./ntfy.ts";
import pushover from "./pushover.ts";
import stub from "./stub.ts";
import twilio from "./twilio.ts";

/**
 * Look up a notification {@link Adapter} by name.
 *
 * Uses an exhaustive `switch` rather than a dynamic registry so adding an
 * adapter is a deliberate code change rather than a runtime side-effect of
 * an import.
 *
 * @param name - Stable adapter identifier; must match one of the
 *   `case` labels in the switch below. Add a new adapter by adding both
 *   an import at the top of this file and a matching `case` here.
 * @returns The matching adapter instance.
 * @throws If `name` does not correspond to a registered adapter.
 */
const getAdapter = (name: string): Adapter => {
  switch (name) {
    case "email":
      return email;
    case "ntfy":
      return ntfy;
    case "pushover":
      return pushover;
    case "stub":
      return stub;
    case "twilio":
      return twilio;
    default:
      throw new Error(`Unknown adapter: ${name}`);
  }
};

export default getAdapter;

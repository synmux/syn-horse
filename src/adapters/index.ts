import { Adapter } from "../types.ts"
import ntfy from "./ntfy.ts"
import pushover from "./pushover.ts"
import stub from "./stub.ts"

/**
 * Look up a notification {@link Adapter} by name.
 *
 * Uses an exhaustive `switch` rather than a dynamic registry so adding an
 * adapter is a deliberate code change rather than a runtime side-effect of
 * an import.
 *
 * @param name - Stable adapter identifier (`"ntfy"`, `"pushover"`,
 *   `"stub"`).
 * @returns The matching adapter instance.
 * @throws If `name` does not correspond to a registered adapter.
 */
const getAdapter = (name: string): Adapter => {
  switch (name) {
    case "ntfy":
      return ntfy
    case "pushover":
      return pushover
    case "stub":
      return stub
    default:
      throw new Error(`Unknown adapter: ${name}`)
  }
}

export default getAdapter

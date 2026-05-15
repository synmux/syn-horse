import { Adapter } from "../types.ts"
import ntfy from "./ntfy.ts"
import pushover from "./pushover.ts"

const getAdapter = (name: string): Adapter => {
  switch (name) {
    case "ntfy":
      return ntfy
    case "pushover":
      return pushover
    default:
      throw new Error(`Unknown adapter: ${name}`)
  }
}

export default getAdapter

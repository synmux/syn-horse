import { Adapter, Notification } from "../types.ts"

const pushover: Adapter = {
  name: "pushover",
  send: async (_message: Notification): Promise<boolean> => {
    return true
  },
}

export default pushover

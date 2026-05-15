import { Adapter, Notification } from "../types.ts"

const ntfy: Adapter = {
  name: "ntfy",
  send: async (_message: Notification): Promise<boolean> => {
    return true
  },
}

export default ntfy

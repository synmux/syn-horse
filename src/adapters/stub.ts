import { Adapter, Notification } from "../types.ts"

const stub: Adapter = {
  name: "stub",
  send: async (_message: Notification): Promise<boolean> => true,
}

export default stub

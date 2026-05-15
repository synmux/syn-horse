import { Adapter } from "../types.ts"

const pushover: Adapter = {
  name: "pushover",
  send: async (_message: Message): Promise<boolean> => {
    return true
  },
}

export default pushover

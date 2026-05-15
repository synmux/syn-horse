import { Adapter } from "../types.ts"

const ntfy: Adapter = {
  name: "ntfy",
  send: async (_message: Message): Promise<boolean> => {
    return true
  },
}

export default ntfy

import { updateAi } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"
import ejs from "ejs"

export const PROMPT = `
- You are an AI assistant responsible for determining the nature of a message.
- The message is being sent through a paging system.
- You will be told the content of the message, and the channel.
  - You should be more strict with messages on the \`red\` channel, which will come through even if I am asleep.
  - You can be more lenient with messages on the \`green\` channel, which will only come through if I am awake.
- Your task is to analyze the content of the message, and decide if it is a violation.
- Remember to base your classification solely on the content of the message and not on any external factors.
- Your response should be concise and directly address the nature of the message.
- Respond ONLY with the classification of the message, which should be one of the following:
  - \`none\`: The message is appropriate and does not violate any rules.
  - \`fun\`: The message is not serious and is likely intended for amusement.
  - \`nonsense\`: The message does not make sense or is incoherent.
  - \`spam\`: The message is advertising something or is a clear abuse of the system.

---

Channel: \`<%= channel %>\`

Message:

\`\`\`
<%= content %>
\`\`\`

`

export const rendered_prompt = ejs.render(PROMPT, { channel: "CHANNEL", content: "CONTENT" })

export async function runAi(env: Env, id: string, _msg: Message): Promise<StageResult> {
  await updateAi(env, id, "accept", "none")
  return CONTINUE
}

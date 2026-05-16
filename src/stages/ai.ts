import { updateAi } from "../db.ts"
import type { Message } from "../schema.ts"
import { CONTINUE, type StageResult } from "./types.ts"
import ejs from "ejs"

/**
 * Prompt template fed to the moderation LLM.
 *
 * Tuned for small open-weight models (Llama-class 7–8B served via an
 * OpenAI-compatible endpoint). The structure deliberately optimises for
 * the failure modes of less capable models:
 *
 * - Task and output format stated up front so they survive any
 *   recency-bias context loss.
 * - Flat single-level bullets only — nested hierarchies confuse small
 *   models token-by-token.
 * - Few-shot examples in the **exact** format of the live query.
 *   Format consistency between examples and query matters more than
 *   example coverage, because the model is pattern-matching.
 * - The four valid labels are restated immediately before the
 *   `Output:` anchor, so they stay in recent context regardless of
 *   message length.
 * - Channel guidance is tied to consequence (drop vs deliver) rather
 *   than the abstract "strict / lenient" framing, which smaller models
 *   tend to ignore.
 * - The prompt ends with `Output:` and no trailing whitespace so the
 *   model continues from that token rather than emitting commentary.
 *
 * Variables (EJS-rendered, HTML-escaped via `<%= %>`):
 *
 * - `channel` — the message's channel (`"red"` or `"green"`).
 * - `content` — the raw message body. Wrapped in triple-backtick code
 *   fences as a soft defence against prompt injection: instructions
 *   embedded in the message body are visibly inside a code block, which
 *   most instruction-tuned models treat as data rather than continuation
 *   of the prompt.
 *
 * @see {@link rendered_prompt} for a placeholder-rendered version used
 *   in development to sanity-check the template.
 */
export const PROMPT = `You are a content classifier for a paging system. Read the message below and respond with exactly one label.

Labels:
- \`none\` — a legitimate page. Will be delivered.
- \`fun\` — a joke, prank, or non-serious message. Will be delivered.
- \`nonsense\` — incoherent, garbled, or meaningless content. Will be dropped.
- \`spam\` — advertising, abuse, or clear misuse of the paging system. Will be dropped.

Channels:
- \`red\` — the operator may be asleep. When in doubt, prefer \`nonsense\` or \`spam\` to avoid waking on garbage.
- \`green\` — the operator is awake. When in doubt, prefer \`none\` or \`fun\`.

Respond with only the label. No explanation, no punctuation, no quoting.

Examples:

Channel: \`red\`
Message: \`\`\`
Production DB is down, on-call please ack
\`\`\`
Output: none

Channel: \`green\`
Message: \`\`\`
lol my cat just walked on the keyboard
\`\`\`
Output: fun

Channel: \`red\`
Message: \`\`\`
asdjkfhq weruioxc vbnm,./
\`\`\`
Output: nonsense

Channel: \`green\`
Message: \`\`\`
Buy cheap pills now at deals.example, limited time!!!
\`\`\`
Output: spam

Channel: \`red\`
Message: \`\`\`
Server CPU 98% for 10 minutes, on-call needs to investigate
\`\`\`
Output: none

---

Valid labels: \`none\`, \`fun\`, \`nonsense\`, \`spam\`.

Channel: \`<%= channel %>\`

Message:

\`\`\`
<%= content %>
\`\`\`

Output:`

/**
 * {@link PROMPT} pre-rendered with literal placeholder strings.
 *
 * Useful as a quick development sanity check that the template parses
 * without runtime data; not used by the production code path.
 */
export const rendered_prompt = ejs.render(PROMPT, { channel: "CHANNEL", content: "CONTENT" })

/**
 * Run the AI moderation stage.
 *
 * NOTE: the moderation call itself is not yet wired up — this currently
 * records an `accept` / `none` verdict for every message and returns
 * {@link CONTINUE}. The production version will render {@link PROMPT}
 * with the message body, call the OpenAI-compatible client, parse the
 * first whitespace-delimited token of the response, and map it to an
 * `AiViolation` (rejecting any token outside the four valid labels as a
 * model-misbehaviour failure rather than silently passing it through).
 *
 * @param env - Worker environment used to update the log row.
 * @param id - Message id (the log row primary key).
 * @param _msg - The validated message. Unused until the LLM call is
 *   wired up; renamed with a leading underscore to suppress the
 *   unused-parameter warning until then.
 * @returns A {@link StageResult}. Currently always {@link CONTINUE}.
 */
export async function runAi(env: Env, id: string, _msg: Message): Promise<StageResult> {
  await updateAi(env, id, "accept", "none")
  return CONTINUE
}

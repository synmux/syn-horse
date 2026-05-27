import { updateAi } from "../db.ts"
import type { AiDecision, AiViolation } from "../db.ts"
import type { Payload } from "../schema.ts"
import { CONTINUE, STOP, type StageResult } from "./types.ts"
import { z } from "zod"

/** Workers AI model used for paging-message moderation. */
const MODERATION_MODEL = "@cf/google/gemma-4-26b-a4b-it" as const

/**
 * Parsed shape of the moderation LLM's structured JSON response.
 *
 * Kept in sync with {@link MODERATION_RESPONSE_JSON_SCHEMA} via
 * {@link z.toJSONSchema}; {@link moderationResultSchema} validates the
 * parsed payload after the Workers AI call returns.
 */
export const moderationResultSchema = z.object({
  label: z.enum(["none", "fun", "nonsense", "spam"]),
})

/** A validated moderation label returned by the LLM. */
export type ModerationResult = z.infer<typeof moderationResultSchema>

/** JSON Schema passed to Workers AI `response_format.type = "json_schema"`. */
const MODERATION_RESPONSE_JSON_SCHEMA = z.toJSONSchema(moderationResultSchema)

/**
 * Prompt template fed to the moderation LLM as the system message.
 *
 * Tuned for small open-weight models (Llama-class 7–8B served via
 * Cloudflare Workers AI). The structure deliberately optimises for
 * the failure modes of less capable models:
 *
 * - Task and label definitions stated up front so they survive any
 *   recency-bias context loss.
 * - Flat single-level bullets only — nested hierarchies confuse small
 *   models token-by-token.
 * - Few-shot examples describe classification intent; the response shape
 *   is enforced separately via {@link MODERATION_RESPONSE_JSON_SCHEMA}.
 * - Channel guidance is tied to consequence (drop vs deliver) rather
 *   than the abstract "strict / lenient" framing, which smaller models
 *   tend to ignore.
 *
 * The per-message user turn is built inline in {@link runAi} from the
 * channel and message body, with the body wrapped in triple-backtick
 * fences as a soft defence against prompt injection.
 */
export const PROMPT = `You are a content classifier for a paging system. Read the message below and classify it with exactly one label.

Labels:
- \`none\` — a legitimate page. Will be delivered.
- \`fun\` — a joke, prank, or non-serious message. Will be delivered.
- \`nonsense\` — incoherent, garbled, or meaningless content. Will be dropped.
- \`spam\` — advertising, abuse, or clear misuse of the paging system. Will be dropped.

Channels:
- \`red\` — the operator may be asleep. When in doubt, prefer \`nonsense\` or \`spam\` to avoid waking on garbage.
- \`green\` — the operator is awake. When in doubt, prefer \`none\` or \`fun\`.

Respond with a JSON object containing a single \`label\` field set to one of the four labels above.

Examples:

Channel: \`red\`
Message: \`\`\`
Production DB is down, on-call please ack
\`\`\`
Label: none

Channel: \`green\`
Message: \`\`\`
lol my cat just walked on the keyboard
\`\`\`
Label: fun

Channel: \`red\`
Message: \`\`\`
asdjkfhq weruioxc vbnm,./
\`\`\`
Label: nonsense

Channel: \`green\`
Message: \`\`\`
Buy cheap pills now at deals.example, limited time!!!
\`\`\`
Label: spam

Channel: \`red\`
Message: \`\`\`
Server CPU 98% for 10 minutes, on-call needs to investigate
\`\`\`
Label: none

Valid labels: \`none\`, \`fun\`, \`nonsense\`, \`spam\`.
`

/**
 * Map a moderation label to the D1 log columns written by {@link updateAi}.
 *
 * @param label - One of the four valid moderation labels.
 * @returns The decision/violation pair to persist.
 */
function mapLabelToVerdict(label: ModerationResult["label"]): {
  decision: AiDecision
  violation: AiViolation
} {
  switch (label) {
    case "none":
    case "fun":
      return { decision: "accept", violation: label }
    case "nonsense":
    case "spam":
      return { decision: "drop", violation: label }
  }
}

/**
 * Run the AI moderation stage.
 *
 * Builds the user turn from the message channel and body, calls
 * Workers AI with {@link MODERATION_RESPONSE_JSON_SCHEMA} via
 * `response_format.type = "json_schema"`, validates the returned JSON
 * with {@link moderationResultSchema}, and maps the label to an
 * {@link AiDecision}. Nonsense and spam are terminal drops
 * ({@link STOP}); legitimate pages and jokes continue to delivery.
 *
 * Malformed JSON or schema violations throw so the queue handler can
 * {@link Message.retry} the message rather than silently passing bad
 * model output through.
 *
 * @param env - Worker environment exposing the `AI` and `DB` bindings.
 * @param id - Message id (the log row primary key).
 * @param payload - The validated message to classify.
 * @returns {@link STOP} when the message was dropped; otherwise
 *   {@link CONTINUE}.
 * @throws When Workers AI returns empty content, non-JSON, or JSON that
 *   fails {@link moderationResultSchema}.
 */
export async function runAi(env: Env, id: string, payload: Payload): Promise<StageResult> {
  const userContent = `Channel: \`${payload.channel}\`

Message:

\`\`\`
${payload.message}
\`\`\`
`
  const response = await env.AI.run(MODERATION_MODEL, {
    messages: [
      { role: "system", content: PROMPT },
      { role: "user", content: userContent },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "moderation_result",
        description: "Classification label for a paging message",
        schema: MODERATION_RESPONSE_JSON_SCHEMA,
        strict: true,
      },
    },
  })

  const rawContent = response.choices[0]?.message?.content
  if (rawContent === null || rawContent === undefined) {
    throw new Error("AI moderation returned empty content")
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawContent)
  } catch (error) {
    throw new Error(`AI moderation returned non-JSON content: ${rawContent}`, { cause: error })
  }

  const result = moderationResultSchema.parse(parsed)
  const { decision, violation } = mapLabelToVerdict(result.label)

  console.info({ stage: "ai", action: decision, payload, result, message: `ai processed for message ${id}` })

  if (decision === "drop") {
    await updateAi(env, id, decision, violation, "dropped")
    return STOP
  }

  await updateAi(env, id, decision, violation)
  return CONTINUE
}

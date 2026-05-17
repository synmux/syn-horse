import { z } from "zod"

import { panicPages } from "~~/server/db/schema"
import { extractSource, usePager, type QueueMessage } from "~~/server/utils/pager"

const PanicBody = z.object({
  channel: z.enum(panicPages.channel.enumValues),
  message: z
    .string({ error: "tell me what's broken" })
    .min(10, { error: "say a bit more — at least 10 characters" })
    .max(2000, { error: "less than 2000 characters, please" }),
  contact: z
    .string({ error: "leave a way to reach you" })
    .min(3, { error: "we need at least 3 characters of contact info" })
    .max(200, { error: "less than 200 characters, please" }),
  // Empty/undefined allowed at the schema level; we enforce non-empty in prod
  // immediately after parse. In dev the value is ignored entirely.
  turnstileToken: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = PanicBody.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "validation failed",
      data: {
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
    })
  }

  const { channel, message, contact, turnstileToken } = parsed.data

  // Dev bypass: the page hides the widget and the server skips verify entirely.
  // Avoids a `missing-input-secret` 400 when the 1Password .env FIFO has already
  // been consumed and `runtimeConfig.turnstile.secretKey` is empty after a restart.
  if (!import.meta.dev) {
    if (!turnstileToken) {
      throw createError({
        statusCode: 422,
        statusMessage: "captcha token missing",
      })
    }
    const turnstileResult = await verifyTurnstileToken(turnstileToken)
    if (!turnstileResult.success) {
      throw createError({
        statusCode: 403,
        statusMessage: "turnstile verification failed",
        data: { errorCodes: turnstileResult["error-codes"] ?? [] },
      })
    }
  }

  const id = crypto.randomUUID()
  const db = useDb(event)

  const source = extractSource(event)
  const payload: QueueMessage = source ? { channel, contact, message, source } : { channel, contact, message }

  const result = await usePager(event).send(payload)
  const now = new Date()

  await db.insert(panicPages).values({
    id,
    channel,
    message,
    contact,
    createdAt: now,
    status: result.ok ? "queued" : "send_failed",
    queueError: result.ok ? null : result.error,
    queuedAt: result.ok ? now : null,
  })

  console.log("[panic]", {
    id,
    channel,
    status: result.ok ? "queued" : "send_failed",
    error: result.ok ? undefined : result.error,
  })

  return { ok: true, id }
})

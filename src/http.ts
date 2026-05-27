/**
 * Header names on the ntfy HTTP ack action (`src/adapters/ntfy.ts`).
 *
 * - `X-Message-Id` — queue message id for the notification being acknowledged.
 * - `X-Self-Token` — shared secret (`env.SELF_TOKEN`) so only our ntfy actions can call `/ack`.
 */
const HEADER_MESSAGE_ID = "X-Message-Id"
const HEADER_SELF_TOKEN = "X-Self-Token"

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Expose-Headers": "*",
  "Access-Control-Max-Age": "86400",
}

function ackResponse(body: string, status: number): Response {
  return new Response(body, { status, headers: CORS_HEADERS })
}

export const handleAck = (req: Request, env: Env, _ctx: ExecutionContext): Response => {
  const { pathname } = new URL(req.url)
  if (pathname !== "/ack") {
    return ackResponse("Not found", 404)
  }

  const messageId = req.headers.get(HEADER_MESSAGE_ID)?.trim()
  const selfToken = req.headers.get(HEADER_SELF_TOKEN)

  if (!messageId || !selfToken) {
    console.info({
      message: "ack rejected: missing headers",
      method: req.method,
      pathname,
      headers: Object.fromEntries(req.headers),
    })
    return ackResponse("Missing required headers", 400)
  }

  if (selfToken !== env.SELF_TOKEN) {
    console.info({
      message: "ack rejected: invalid token",
      messageId,
      method: req.method,
      pathname,
    })
    return ackResponse("Unauthorized", 401)
  }

  console.info({
    message: "ack received",
    messageId,
    method: req.method,
    pathname,
    headers: Object.fromEntries(req.headers),
  })

  return ackResponse(`Acknowledged message ${messageId}`, 200)
}

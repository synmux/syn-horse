/**
 * Header names on the ntfy HTTP ack action (`src/adapters/ntfy.ts`).
 *
 * - `X-Message-Id` — queue message id for the notification being acknowledged.
 * - `X-Self-Token` — shared secret (`env.SELF_TOKEN`) so only our ntfy actions can call `/ack`.
 */
const HEADER_MESSAGE_ID = "X-Message-Id";
const HEADER_SELF_TOKEN = "X-Self-Token";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "*",
  "Access-Control-Max-Age": "86400",
};

function ackResponse(body: string, status: number): Response {
  return new Response(body, { headers: CORS_HEADERS, status });
}

function corsPreflightResponse(): Response {
  return new Response(null, { headers: CORS_HEADERS, status: 204 });
}

export const handleAck = (
  req: Request,
  env: Env,
  _ctx: ExecutionContext
): Response => {
  const { pathname } = new URL(req.url);
  if (pathname !== "/ack") {
    return ackResponse("Not found", 404);
  }

  if (req.method === "OPTIONS") {
    return corsPreflightResponse();
  }

  const messageId = req.headers.get(HEADER_MESSAGE_ID)?.trim();
  const selfToken = req.headers.get(HEADER_SELF_TOKEN);

  if (!(messageId && selfToken)) {
    console.error({
      headers: Object.fromEntries(req.headers),
      message: "ack rejected: missing headers",
      method: req.method,
      pathname,
    });
    return ackResponse("Missing required headers", 400);
  }

  if (selfToken !== env.SELF_TOKEN) {
    console.error({
      message: `ack rejected: invalid token for ${messageId}`,
      messageId,
      method: req.method,
      pathname,
    });
    return ackResponse("Unauthorized", 401);
  }
  return ackResponse(`Acknowledged message ${messageId}`, 200);
};

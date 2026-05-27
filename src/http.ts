export const handleAck = (req: Request, _env: Env, ctx: ExecutionContext): Response => {
  const message = "HTTP request received"
  console.info({
    req,
    ctx,
    message,
    headers: req.headers,
  })
  return new Response(message, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Expose-Headers": "*",
      "Access-Control-Max-Age": "86400",
    },
  })
}

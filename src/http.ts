export const handleAck = (req: Request, _env: Env, ctx: ExecutionContext): Response => {
  const text = "Ping? Pong!"
  console.info({
    req,
    ctx,
    message: "HTTP request received",
  })
  return new Response(text)
}

export const handleAck = (req: Request, env: Env, ctx: ExecutionContext): Response => {
  const text = "Ping? Pong!"
  console.info({
    req,
    env,
    ctx,
    message: "HTTP request received",
  })
  return new Response(text)
}

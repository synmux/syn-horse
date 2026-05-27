export const handleAck = (req: Request, _env: Env, ctx: ExecutionContext): Response => {
  const message = "HTTP request received"
  console.info({
    req,
    ctx,
    message,
  })
  return new Response(message)
}

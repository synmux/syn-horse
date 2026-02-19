# Cloudflare Bindings Reference

## Accessing Bindings in Nuxt/Nitro

In server routes, access bindings via the H3 event context:

```typescript
export default defineEventHandler(async (event) => {
  const { env, context } = event.context.cloudflare

  // AI
  const aiResult = await env.AI.run("@cf/meta/llama-3-8b-instruct", { prompt: "..." })

  // Email
  await env.EMAIL.send(emailMessage)

  // Browser
  const browser = await env.BROWSER.fetch("https://example.com")

  // Images
  const image = await env.IMAGES.transform(imageData, options)

  // Media
  const media = await env.MEDIA.process(mediaData)

  // Assets
  const asset = await env.ASSETS.fetch(new Request("https://host/path"))

  // Version metadata
  const version = env.CF_VERSION_METADATA

  // Secrets
  const adminToken = env.ADMIN_TOKEN
  const accountId = env.CLOUDFLARE_ACCOUNT_ID
})
```

## Types

All bindings are typed in `worker-configuration.d.ts` (auto-generated, DO NOT EDIT).
The `Cloudflare.Env` namespace contains all binding types.
Environment types are extended in `env.d.ts` for H3 context.

## Regenerating Types

```bash
bun run types   # runs: wrangler types
```

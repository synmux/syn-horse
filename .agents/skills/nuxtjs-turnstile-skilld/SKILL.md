---
name: nuxtjs-turnstile-skilld
description: 'Cloudflare Turnstile integration for Nuxt. ALWAYS use when writing code importing "@nuxtjs/turnstile". Consult for debugging, best practices, or modifying @nuxtjs/turnstile, nuxtjs/turnstile, nuxtjs turnstile, turnstile.'
metadata:
  version: 1.1.3
  generated_by: cached
  generated_at: 2026-05-29
---

# nuxt-modules/turnstile `@nuxtjs/turnstile@1.1.3`

**Tags:** beta: 0.9.11-beta.1, latest: 1.1.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/turnstile` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/turnstile` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `verifyTurnstileToken(token, event, signal)` — v1.1.0 added optional third parameter `signal?: AbortSignal` for request cancellation support [source](./.skilld/releases/v1.1.0.md)

- BREAKING: CJS module removed — v1.0.0 removed `.cjs` entry point and updated to latest module builder, ESM-only from v1.0.0+ [source](./.skilld/releases/v1.0.0.md)

**Also changed:** Component `.vue` extension added v1.1.1 (module resolution fix)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices — @nuxtjs/turnstile

## Configuration & Setup

- Store `siteKey` and `secretKey` in environment variables (`NUXT_PUBLIC_TURNSTILE_SITE_KEY` and `NUXT_TURNSTILE_SECRET_KEY`) rather than hardcoding them in `nuxt.config.ts` — this keeps production secrets out of version control and allows runtime overrides across environments source.

- Enable the generated validation endpoint with `addValidateEndpoint: true` in your `turnstile` config to get a free `POST /_turnstile/validate` endpoint instead of writing a custom server route — this reduces boilerplate when you need token verification source.

- Optionally set `secretKeyPath` to a file path containing your secret key, which will be read at build-time and override explicit `secretKey` — useful for CI/CD pipelines that stage secrets as files source.

## Client-Side Usage

- Always manually call `turnstile.reset()` on your template ref after server-side token verification via `verifyTurnstileToken` — the token is consumed by Cloudflare once verified and the widget cannot issue a new token without reset source.

- Type your template refs as `ref<{ reset: () => void }>()` when the full Vue component type cannot be inferred — this ensures type safety for calling the reset method without depending on complex component type exports source.

- Use the `appearance` prop to optimize widget visibility for your UX: `'always'` (default, visible immediately), `'execute'` (invisible, runs in background), or `'interaction-only'` (appears only when user interaction is needed) — choose based on whether your form context needs explicit user confirmation source.

- Set the `language` prop to an ISO 639-1 code (e.g. `'en'`, `'fr'`, `'de'`) or language-country code (e.g. `'en-US'`) for the widget UI; use `'auto'` (default) to respect the visitor's browser language source.

- Prefer the `v-model` binding over manually setting an `options.callback` — the callback option is deliberately omitted from the component's options prop to prevent overriding the internal token synchronization logic source.

## Server-Side Verification

- Pass an `AbortSignal` as the third parameter to `verifyTurnstileToken(token, event, signal)` when calling from request handlers that may be cancelled — this enables proper cleanup if the client disconnects or a timeout fires before verification completes source.

- Handle all error codes from `verifyTurnstileToken` including `'timeout-or-duplicate'` (token already validated), `'invalid-input-response'` (expired or malformed), and `'internal-error'` (transient Cloudflare failure) — each indicates a different remediation path source.

## Token Lifecycle & Refresh

- Configure `resetInterval` (milliseconds, default 250,000 = 250 seconds) on the `<NuxtTurnstile>` component to match your token expiry buffer — tokens expire after 300 seconds and auto-reset 50 seconds before expiry to keep the widget fresh during extended form interactions source.

## Analytics & Customization

- Use the `action` prop to differentiate multiple Turnstile widgets under the same sitekey in Cloudflare analytics and validation responses — pass a unique string for each form context (e.g. `action="contact-form"`) so you can track challenge patterns per use-case source.

- Attach customer metadata via the `cData` prop (any serializable value) to pass context through the validation flow — it will be returned in the `verifyTurnstileToken` response, enabling post-processing logic that depends on form origin or user segment source.

## Deployment & Security

- Ignore 401 errors from `https://challenges.cloudflare.com` in your browser console — these are an expected part of Turnstile's underlying Challenge Platform flow and do not indicate a configuration error; if the widget resolves successfully and you receive a token, no action is required source.

- Ensure your Content-Security-Policy (CSP) includes `https://challenges.cloudflare.com` and `https://cdn-cgi.com` in `script-src` (or inherit from `default-src`) — if using `strict-dynamic` or other CSP3 directives, the widget may fail because it cannot nonce injected scripts source.

- For local development, use Cloudflare's test sitekey `'1x00000000000000000000AA'` in your dev environment to bypass real challenge requests — if testing on a hostname like `localhost:3000` that cannot be added to Cloudflare, create a local tunnel or use a `.test` domain bound to localhost source.
<!-- /skilld:best-practices -->

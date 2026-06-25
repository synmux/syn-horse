---
name: nuxt-security-skilld
description: ' Security Module for Nuxt based on HTTP Headers and Middleware. ALWAYS use when writing code importing "nuxt-security". Consult for debugging, best practices, or modifying nuxt-security, nuxt security.'
metadata:
  version: 2.6.0
  generated_by: cached
  generated_at: 2026-05-29
---

# Baroshem/nuxt-security `nuxt-security@2.6.0`

**Tags:** latest: 2.6.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxt-security` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxt-security` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in nuxt-security v2.x — prioritize recent major/minor releases and breaking changes.

### Configuration & Hooks

- NEW: `strict` mode (boolean option in ModuleOptions) — v2.0.0 introduced strict configuration for A+ security by default, enable gradually with `strict: true` to enforce stricter CSP/headers policies [source](./.skilld/releases/v2.0.0.md#new-features)

- NEW: `nuxt-security:prerenderedHeaders` hook (Nuxt buildtime) — v2.0.0 added ability to export calculated security headers for static sites deployed on CDNs, exposes headers per route for server configuration [source](./.skilld/docs/content/5.advanced/4.hooks.md#prerendered-headers-hook)

- BREAKING: OWASP default values — v2.0.0 updated all default CSP directives to match OWASP recommendations, defaults now use `'strict-dynamic'`, `'nonce-{{nonce}}'` instead of previous values, and new directives added (connect-src, default-src) [source](./.skilld/releases/v2.0.0.md#owasp-compliance)

### Rate Limiter Middleware

- NEW: `whiteList` property (string[]) — v2.2.0 allows specific IP addresses to bypass rate limiting, configured as array of IP strings [source](./.skilld/releases/v2.2.0.md#new-feature-whitelist-option-for-rate-limiter)

- NEW: `ipHeader` property (string, optional) — v2.4.0 enables custom IP header detection for rate limiter, defaults to `x-forwarded-for`, useful when behind proxies with alternative headers like `cf-connecting-ip` [source](./.skilld/releases/v2.4.0.md#what's-changed)

### Content Security Policy

- NEW: `script-src-elem` and `style-src-elem` CSP directives with SSG hash support — v2.5.0 added Subresource Integrity hashing support for element-specific script/style directives, automatically hashes inline scripts/styles during SSG build [source](./.skilld/releases/v2.5.0.md#what's-changed)

- BREAKING: `navigate-to` CSP directive removed — v2.0.0 removed non-standard navigate-to directive from default CSP configuration, no longer available as a policy option [source](./.skilld/releases/v2.0.0.md#what's-changed)

- NEW: explicit directives configuration — v2.0.0 introduced ability to define CSP directives explicitly without fallback to default-src, allows fine-grained control per directive [source](./.skilld/releases/v2.0.0.md#what's-changed)

### CORS & Origin Handling

- NEW: RegExp support for CORS origin — v2.0.0 allows passing regular expressions in corsHandler origin configuration alongside string origins, enables pattern-based origin matching [source](./.skilld/releases/v2.0.0.md#what's-changed)

### Features & Runtime APIs

- NEW: nonce support in development (style nonce) — v2.0.0 added automatic style nonce generation for development builds, pairs with existing script nonce functionality [source](./.skilld/releases/v2.0.0.md#what's-changed)

- NEW: NuxtIsland (server-only components) support — v2.0.0 enabled security headers delivery for server-only components, headers properly applied to island responses [source](./.skilld/releases/v2.0.0.md#what's-changed)

- NEW: Vite-native logger removal — v2.1.0 introduced native Vite method for removing console loggers as alternative to regex-based approach, set `removeLoggers: true` or use `RemoveOptions` object for configuration (deprecated, use boolean instead) [source](./.skilld/releases/v2.1.0.md#what's-changed)

- NEW: Trusted Types CSP support — v2.1.0 added CSP trusted types directive configuration to defend against DOM-based XSS in applications using Trusted Types API [source](./.skilld/releases/v2.1.0.md#what's-changed)

- NEW: Cloudflare Workers crypto compatibility — v2.1.0 added support for crypto APIs in Cloudflare Workers runtime, enables SRI and nonce generation in edge computing environments [source](./.skilld/releases/v2.1.0.md#what's-changed)

- NEW: SRI virtual file system — v2.0.0 replaced cheerio with regex-based HTML parsing for Subresource Integrity calculation, dramatically reduces bundle size for edge runtimes [source](./.skilld/releases/v2.0.0.md#performance-optimization)

### Pre-rendered & Static Support

- NEW: Security Headers for Pre-rendered Routes — v2.0.0 enables headers on all Nuxt rendering modes (Universal, Client-only, Hybrid), prerendered routes now receive calculated security headers [source](./.skilld/releases/v2.0.0.md#all-nuxt-modes)

### Types & Tooling

- BREAKING: Module builder v1 upgrade — v2.3.0 updated to @nuxt/module-builder v1, requires recompilation of type definitions, `wrangler types` command updates `worker-configuration.d.ts` [source](./.skilld/releases/v2.3.0.md#what's-changed)

- Node.js v20 requirement — v2.3.0 upgraded minimum Node.js version to v20 (from v18), development and build environments must use v20+ [source](./.skilld/releases/v2.3.0.md#what's-changed)

- Kit v4 type templates — v2.5.0 upgraded Nuxt Kit to v4 for improved type inference and schema augmentation, affects TypeScript definitions for nuxt-security configuration [source](./.skilld/releases/v2.5.0.md#what's-changed)

Also changed: `nuxt-security:routeRules` runtime hook · `defineRouteRules` macro for inline route config · `defuReplaceArray` utility for array-replacing merge · SRI configuration (sri: boolean) · Pre-rendered header exports hook · CORS route rules support

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Start with default configuration (`strict: false`) and only add restrictions as needed. Nuxt Security's defaults provide an A+ Mozilla Observatory score without breaking typical applications — gradually migrate to strict mode once your app is stable [source](./.skilld/docs/content/5.advanced/7.improve-security.md#introduction)

- Use `defuReplaceArray` (not `defu`) when merging CSP directives in runtime hooks — it replaces array values entirely, whereas `defu` appends to them, which can cause unintended directives to persist [source](./.skilld/docs/content/1.getting-started/3.usage.md#merging-with-replacement)

- Prefer the `useScript` composable over `useHead` for loading external scripts under Strict CSP — it's isomorphic, automatically loaded under `'strict-dynamic'`, handles async loading, and avoids inline event handlers that CSP can block [source](./.skilld/docs/content/5.advanced/3.strict-csp.md#the-usescript-composable)

- Use `useState` in composables instead of global `ref` declarations to prevent Cross-Request State Pollution in SSR — each request gets isolated state, preventing unintended data leaks between users [source](./.skilld/docs/content/5.advanced/1.good-practices.md#handling-state-with-care-in-nuxt-ssr)

- Restrict API response payloads using `pick` in `useFetch`/`useAsyncData` to return only required fields — avoids leaking sensitive data like email addresses or payment info to the client [source](./.skilld/docs/content/5.advanced/1.good-practices.md#only-return-what-is-necessary)

- Recognize that the built-in rate limiter is unsuitable for complex production applications — use infrastructure-layer solutions like Cloudflare DDoS protection or fail2ban instead [source](./.skilld/docs/content/3.middleware/1.rate-limiter.md#usage)

- Configure rate limiter drivers with camelCase names (`vercelKv`, not `vercel-kv`) when switching from the default `lruCache` to unstorage backends — the naming convention is critical for unstorage driver resolution [source](./.skilld/docs/content/3.middleware/1.rate-limiter.md#driver)

- Use the `nuxt-security:routeRules` Nitro hook to fetch security configuration at runtime from external secret managers — enables multi-tenant deployments and keeps secrets out of build artifacts [source](./.skilld/docs/content/5.advanced/4.hooks.md#route-rules-hook)

- Enable `contentSecurityPolicyReportOnly: true` during development to monitor CSP violations without blocking content — switch to enforcing mode in production after validating all legitimate resources [source](./.skilld/docs/content/5.advanced/2.faq.md#set-content-security-policy-report-only)

- Disable specific security headers for third-party services (e.g., `crossOriginOpenerPolicy: false` for Firebase Auth, `crossOriginEmbedderPolicy: 'unsafe-none'` for Cloudflare) — most integration issues stem from COEP/COOP incompatibility with external APIs [source](./.skilld/docs/content/5.advanced/2.faq.md#quick-reference)

- Force a full page reload when navigating to routes with different headers using `<NuxtLink :external="true">` or a route middleware — client-side navigation skips server header calculation, so CSP policies won't update unless you reload [source](./.skilld/docs/content/5.advanced/2.faq.md#updating-headers-on-a-specific-route)

- In SSG Strict CSP deployments, load external scripts via `useScript` in client-only mode rather than injecting them at build time — prevents integrity hash mismatches when static hosting providers modify assets [source](./.skilld/docs/content/5.advanced/3.strict-csp.md#are-you-deploying-with-ssg)

- Place security configuration in the `security` property of `routeRules`, not the standard `headers` property — the `security` property is namespaced to avoid conflicts and takes precedence when both are defined [source](./.skilld/docs/content/1.getting-started/3.usage.md#per-route-configuration)

- Never combine nonces or hashes with `'unsafe-inline'` for the same directive — they cancel each other out, reverting to unrestricted inline execution [source](./.skilld/docs/content/5.advanced/3.strict-csp.md#nonces-and-hashes-csp-level-2)
<!-- /skilld:best-practices -->

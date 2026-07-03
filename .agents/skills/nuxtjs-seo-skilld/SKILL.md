---
name: nuxtjs-seo-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/seo\". Consult for debugging, best practices, or modifying @nuxtjs/seo, nuxtjs/seo, nuxtjs seo, nuxt-seo, nuxt seo."
metadata:
  version: 5.3.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-03
---

# harlan-zw/nuxt-seo `@nuxtjs/seo@5.3.2`
**Tags:** latest: 5.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/seo` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/seo` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @nuxtjs/seo v5.x — prioritizing recent major/minor releases and breaking changes that commonly trap users upgrading from v4.

### Breaking Changes (v5.0.0)

- BREAKING: `site.name` must be set explicitly in `nuxt.config` — Site Config v4 no longer infers site name from `package.json` or directory name [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L31:41)

- BREAKING: Legacy runtime config keys removed — `siteUrl`, `siteName`, `siteDescription` are no longer supported in `runtimeConfig.public`; migrate to `site.url` and `site.name` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L44:60)

- BREAKING: Server-side Site Config API renamed — `useSiteConfig()` → `getSiteConfig(event)`, `getSiteIndexable()` → `getSiteConfig(event).indexable`, and `SiteConfig` type → `SiteConfigResolved` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L63:67)

- BREAKING: Content v3 collection wrappers removed — `asSeoCollection()`, `asRobotsCollection()`, `asSitemapCollection()`, `asOgImageCollection()`, `asSchemaOrgCollection()` are all deprecated; instead import and compose individual `defineXxxSchema()` functions directly [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L73:113)

- BREAKING: Module load order for Content v3 — `@nuxtjs/seo` must load before `@nuxt/content` in modules array, or collection schemas will not resolve [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L149:160)

### New APIs (v5.0.0)

- NEW: `useShareLinks()` composable — generates social sharing URLs (Twitter/X, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Email) with built-in UTM tracking support [source](./.skilld/releases/v5.0.0.md:L56:77)

- NEW: `nuxt-seo-utils icons` CLI — `npx nuxt-seo-utils icons --source logo.svg` generates favicon variants (favicon.ico, apple-touch-icon.png, PNG at 16/32/192/512px) from a single source image, requires `sharp` dev dependency [source](./.skilld/releases/v5.0.0.md:L78:86)

- NEW: `definePageMeta` sitemap configuration — set per-page sitemap options (`changefreq`, `priority`) directly in `definePageMeta()` without route rules [source](./.skilld/releases/v5.0.0.md:L129:140)

- NEW: Automatic inline script/style minification — `useHead()` now automatically minifies `script[innerHTML]` and `style[innerHTML]` content in production [source](./.skilld/releases/v5.0.0.md:L88:125)

- NEW: Debug production endpoints — three new JSON endpoints for troubleshooting in production: `/__robots__/debug-production.json`, `/__sitemap__/debug-production.json`, `/__nuxt-seo-utils` [source](./.skilld/releases/v5.0.0.md:L146:153)

- NEW: `SiteConfigPriority` named constants — use `SiteConfigPriority.runtime` and similar instead of magic strings for priority configuration [source](./.skilld/releases/v5.0.0.md:L155:156)

- NEW: Shared DevTools layer — all Nuxt SEO modules now use a unified DevTools foundation (`nuxtseo-layer-devtools`) with consistent navigation, setup checklist validation, and module switcher [source](./.skilld/releases/v5.0.0.md:L13:28)

- NEW: ESLint Link Checker integration — Nuxt Link Checker v5 ships `link-checker/valid-route` (error, validates relative URLs match known routes with "did you mean?" suggestions) and `link-checker/valid-sitemap-link` (warn, checks URLs exist in sitemap), auto-registered with `@nuxt/eslint` [source](./.skilld/releases/v5.0.0.md:L32:48)

- NEW: i18n multi-sitemap auto-expansion — custom sitemaps with `includeAppSources: true` are automatically expanded per locale; no need to manually define per-locale sitemaps [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L179:192)

**Also changed:** Skew protection + AI-ready standalone features new in v5.1.0 · Zod version conflict handling graceful in v5.1.1 · DevTools fixes and OG Image checklist in v5.1.3 and v5.1.4 · Content re-exports from sub-modules in v5.1.4
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices for @nuxtjs/seo v5.3.2

## Best Practices

- Set `site.name` explicitly in `nuxt.config.ts` instead of relying on inference — Site Config v5 removed automatic name detection from `package.json` and directory names [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L31:40)

- Use `defineXxxSchema()` functions for Nuxt Content v3 collections instead of deprecated wrapper functions — compose only the schemas for modules you actively use [source](./.skilld/docs/content/2.guides/2.nuxt-content.md:L29:84)

- Load `@nuxtjs/seo` before `@nuxt/content` in your modules array — Content v3 requires this order to properly register SEO schemas [source](./.skilld/docs/content/2.guides/2.nuxt-content.md:L108:118)

- Configure per-page sitemap options via `definePageMeta()` instead of route rules — simplifies sitemap management for individual pages [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L164:177)

- Custom sitemaps with `includeAppSources: true` automatically expand per locale — no need to manually define separate sitemaps for each i18n locale [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L179:192)

- Use `getSiteConfig(event)` on server and `useSiteConfig()` on client after migrating to v5 — the server-side API changed from `useSiteConfig()` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L62:67)

- Translate site name and description per locale using `nuxtSiteConfig` in your i18n locale files — SEO modules automatically use locale-specific values for all outputs [source](./.skilld/docs/content/2.guides/3.i18n.md:L35:63)

- Set `NUXT_SITE_URL` environment variable for staging and preview environments — non-production URLs are automatically blocked from indexing without manual configuration [source](./.skilld/docs/content/2.guides/5.site-config.md:L43:62)

- Use `useShareLinks()` composable for social sharing links instead of manually constructing URLs — automatically resolves the canonical URL and applies per-platform UTM parameters [source](./.skilld/docs/content/7.releases/1.v5.md:L56:78)

- Add ESLint link-checker rules to catch route typos at development time — the `link-checker/valid-route` rule provides "did you mean?" suggestions for unmatched links [source](./.skilld/docs/content/7.releases/1.v5.md:L32:54)

- Disable unused modules with `enabled: false` in their config to reduce per-request overhead — each module has its own config key (`sitemap`, `robots`, `ogImage`, `schemaOrg`, `linkChecker`, `seo`) [source](./.skilld/docs/content/2.guides/6.debugging-modules.md:L11:46)

- Favicon ICO format should pack icons to at least 256px resolution — this is preferred over individual PNG icon files for best browser compatibility and fallback support [source](./.skilld/discussions/discussion-233.md:L41:49)

- For i18n dynamic sitemap entries, use the `_sitemap` property to route content to locale-specific sitemaps — set `_sitemap: localeCode` on each entry [source](./.skilld/discussions/discussion-167.md:L20:30)
<!-- /skilld:best-practices -->

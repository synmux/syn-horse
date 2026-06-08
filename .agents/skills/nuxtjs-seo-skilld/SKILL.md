---
name: nuxtjs-seo-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/seo\". Consult for debugging, best practices, or modifying @nuxtjs/seo, nuxtjs/seo, nuxtjs seo, nuxt-seo, nuxt seo."
metadata:
  version: 5.1.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# harlan-zw/nuxt-seo `@nuxtjs/seo@5.1.4`
**Tags:** latest: 5.1.4

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/seo` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/seo` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes (v5.0.0)

- BREAKING: `useSiteConfig()` → `getSiteConfig(event)` — server-side API replaced for consistent site configuration access [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:66)

- BREAKING: `getSiteIndexable()` → `getSiteConfig(event).indexable` — property moved to returned object structure [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:66)

- BREAKING: `asSeoCollection()` → compose individual schema functions — no longer a single wrapper, must use `defineRobotsSchema()`, `defineSitemapSchema()`, `defineOgImageSchema()`, `defineSchemaOrgSchema()` directly in Zod schema [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L73:105)

- BREAKING: `asRobotsCollection()` → `defineRobotsSchema()` — Content v3 collection API renamed [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L141:147)

- BREAKING: `asSitemapCollection()` → `defineSitemapSchema()` — Content v3 collection API renamed [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L141:147)

- BREAKING: `asOgImageCollection()` → `defineOgImageSchema()` — Content v3 collection API renamed [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L141:147)

- BREAKING: `asSchemaOrgCollection()` → `defineSchemaOrgSchema()` — Content v3 collection API renamed [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L141:147)

- BREAKING: `site.name` now required — no longer inferred from `package.json` or directory name; must be explicitly set in `nuxt.config.ts` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L31:41)

- BREAKING: `runtimeConfig.public.siteUrl/siteName/siteDescription` removed — migrate to `site: { url, name }` in `nuxt.config.ts` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L43:60)

- BREAKING: `#internal/nuxt-site-config` virtual module removed — use named imports from `nuxt-site-config` instead [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L62:67)

- BREAKING: `SiteConfig` type → `SiteConfigResolved` — type renamed for clarity on return values [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L62:67)

### New APIs (v5.0.0)

- NEW: `useShareLinks()` composable — generates social share URLs for Twitter, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Email with UTM tracking support [source](./.skilld/releases/v5.0.0.md:L56:76)

- NEW: `nuxt-seo-utils icons` CLI command — generates favicon and icon variants (16, 32, 192, 512px, apple-touch-icon) from source image using sharp [source](./.skilld/releases/v5.0.0.md:L78:87)

- NEW: ESLint Link Checking rules — `link-checker/valid-route` (validates relative URLs match routes) and `link-checker/valid-sitemap-link` (warns if URLs missing from sitemap) with zero-config `@nuxt/eslint` integration [source](./.skilld/releases/v5.0.0.md:L32:54)

- NEW: `definePageMeta({ sitemap: { changefreq, priority } })` — per-page sitemap configuration via page metadata replaces route rules workarounds [source](./.skilld/releases/v5.0.0.md:L128:141)

- NEW: Inline script/style minification — automatically minifies innerHTML in `useHead()` script/style arrays without extra configuration [source](./.skilld/releases/v5.0.0.md:L88:126)

- NEW: Debug production endpoints — three endpoints for validating configuration: `/__robots__/debug-production.json`, `/__sitemap__/debug-production.json`, `/__nuxt-seo-utils` [source](./.skilld/releases/v5.0.0.md:L148:154)

- NEW: `SiteConfigPriority` named constants — replaces magic numbers for priority configuration (e.g. `SiteConfigPriority.runtime`) [source](./.skilld/releases/v5.0.0.md:L155:157)

@nuxtjs/seo v5.0.0 bumps all major dependencies: `nuxt-site-config` (v3 → v4), `nuxt-seo-utils` (v7 → v8), `@nuxtjs/sitemap` (v7 → v8), `@nuxtjs/robots` (v5 → v6), `nuxt-schema-org` (v5 → v6), `nuxt-link-checker` (v4 → v5). `nuxt-og-image` remains at v6 (no major change). [source](./.skilld/releases/v5.0.0.md:L203:213)

The `@nuxtjs/seo/content` export provides re-exports of all `defineXxxSchema()` functions for convenience in Content v3 integration scenarios. [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L107:113)

**Also changed:** i18n multi-sitemap auto-expansion (custom sitemaps with `includeAppSources: true` now expand per locale) · DevTools shared layer with setup checklist and module switcher · Consistent layout across all SEO module DevTools clients
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Set `site.url`, `site.name`, and `site.description` explicitly in `nuxt.config.ts` — site name is no longer inferred from package.json or directory name in v5. All modules share these values, eliminating duplication across configurations [source](./.skilld/docs/content/2.guides/5.site-config.md#quick-setup)

- Use environment-specific site URLs via `NUXT_SITE_URL` for staging and preview environments — non-production environments are automatically blocked from search engine indexing via the robots module without manual configuration [source](./.skilld/docs/content/2.guides/5.site-config.md#environment-specific-config)

- Always load `@nuxtjs/seo` before `@nuxt/content` in the modules array — a content.config.ts setup limitation in Nuxt Content v3 requires this load order to function correctly [source](./.skilld/docs/content/2.guides/2.nuxt-content.md#setup-nuxt-content-v3)

- Disable unused SEO modules using `enabled: false` on the module's config key to reduce production bundle size — the OG Image module contributes the most (~2-5MB); serverless environments may need to target zero runtime or disable it entirely [source](./.skilld/docs/content/1.getting-started/3.troubleshooting.md#why-does-my-production-build-go-up-so-much)

- Import all Nuxt Content collection schemas via `@nuxtjs/seo/content` rather than individual module imports — this single import provides all four `defineXxxSchema()` functions (robots, sitemap, og-image, schema-org) and reduces dependency complexity [source](./.skilld/docs/content/2.guides/2.nuxt-content.md#setup-nuxt-content-v3)

- Use `definePageMeta({ sitemap: { ... } })` to configure per-page sitemap metadata instead of route rules — this is the new idiomatic approach in Sitemap v8 and keeps configuration colocated with the page [source](./.skilld/docs/content/7.releases/1.v5.md#definepagemeta-sitemap-config)

- Set translated site name and description through a `nuxtSiteConfig` key in locale files — this allows the i18n integration to automatically apply locale-specific metadata across all modules without per-module configuration [source](./.skilld/docs/content/2.guides/3.i18n.md#translated-site-name--description)

- Use `useSeoMeta()` for reactive per-page meta tags and `useServerSeoMeta()` for non-reactive server-rendered metadata — choose based on whether the values need to update reactively or are static at render time [source](./.skilld/docs/discussions/discussion-322.md#accepted-answer)

- Favour favicon.ico at 256px or higher resolution over multiple individual favicon files — a single well-sized favicon.ico handles most use cases; generate via the `nuxt-seo-utils icons` CLI command from a source image [source](./.skilld/docs/content/7.releases/1.v5.md#favicon-generation-cli)

- Use `useShareLinks()` composable for generating social share URLs instead of constructing them manually — the composable automatically resolves the canonical URL and appends per-platform UTM parameters, including Twitter, LinkedIn, Reddit, and email [source](./.skilld/docs/content/7.releases/1.v5.md#social-share-links)

- Enable ESLint link checking via `nuxt-link-checker/eslint` to catch broken relative routes at lint time — registers two rules (`link-checker/valid-route` for relative links, `link-checker/valid-sitemap-link` for sitemap coverage) that work in Vue templates and TypeScript [source](./.skilld/docs/content/7.releases/1.v5.md#eslint-link-checking)

- Use multi-sitemap auto-expansion for i18n by setting `includeAppSources: true` on custom sitemaps — sitemaps are now automatically expanded per locale without manual per-locale definition [source](./.skilld/docs/content/7.releases/1.v5.md#i18n-multi-sitemap-improvements)

- Migrate from deprecated `asSeoCollection()` and individual `asXxxCollection()` wrappers by composing separate `defineXxxSchema()` functions — the new pattern is more explicit and works with the Zod schema system in Nuxt Content v3 [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md#step-2-update-content-v3-collections)

- Use `useSiteConfig()` in client components and `getSiteConfig(event)` in server utilities to access shared site configuration — this pattern ensures both contexts access the same centralized values, eliminating duplicated config [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md#update-server-side-apis)
<!-- /skilld:best-practices -->

---
name: nuxtjs-seo-skilld
description: 'ALWAYS use when writing code importing "@nuxtjs/seo". Consult for debugging, best practices, or modifying @nuxtjs/seo, nuxtjs/seo, nuxtjs seo, nuxt-seo, nuxt seo.'
metadata:
  version: 5.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# harlan-zw/nuxt-seo `@nuxtjs/seo@5.3.0`

**Tags:** latest: 5.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/seo` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/seo` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### v5.0.0 Major Release (2026-03-26)

- BREAKING: `site.name` is now required and no longer inferred from `package.json` or directory name. Add `site: { name: 'My Site' }` to `nuxt.config.ts` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L31:41)

- BREAKING: Server-side `useSiteConfig()` → `getSiteConfig(event)`. Client-side `useSiteConfig()` still works in components/composables [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:66)

- BREAKING: `getSiteIndexable()` removed; use `getSiteConfig(event).indexable` instead [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:66)

- BREAKING: `SiteConfig` type renamed to `SiteConfigResolved` on server APIs [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:66)

- BREAKING: Legacy runtime config keys `siteUrl`, `siteName`, `siteDescription` removed. Migrate to the `site` object in `nuxt.config.ts` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L43:60)

- BREAKING: Content v3 collection wrapper `asSeoCollection()` deprecated. Replace with per-module schema functions: `defineRobotsSchema()`, `defineSitemapSchema()`, `defineOgImageSchema()`, `defineSchemaOrgSchema()` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L69:114)

- BREAKING: Individual module collection wrappers removed: `asRobotsCollection()` → `defineRobotsSchema()`, `asSitemapCollection()` → `defineSitemapSchema()`, `asOgImageCollection()` → `defineOgImageSchema()`, `asSchemaOrgCollection()` → `defineSchemaOrgSchema()` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L137:147)

- NEW: `useShareLinks()` composable generates social sharing URLs for Twitter, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, and Email with built-in UTM tracking support [source](./.skilld/releases/v5.0.0.md:L57:76)

- NEW: `nuxt-seo-utils icons` CLI command auto-generates favicon and icon variants (favicon.ico, apple-touch-icon.png, PNG at 16/32/192/512px) from a single source image [source](./.skilld/releases/v5.0.0.md:L79:86)

- NEW: Inline script and style minification via `useHead()` — `innerHTML` content is automatically minified in rendered HTML [source](./.skilld/releases/v5.0.0.md:L88:125)

- NEW: `definePageMeta` sitemap configuration — set `changefreq` and `priority` per-page without route rules [source](./.skilld/releases/v5.0.0.md:L129:141)

- NEW: ESLint Link Checking integration with rules `link-checker/valid-route` (error) and `link-checker/valid-sitemap-link` (warn); auto-registered with `@nuxt/eslint`, otherwise add to `eslint.config.ts` [source](./.skilld/releases/v5.0.0.md:L32:54)

- NEW: Shared DevTools foundation (`nuxtseo-layer-devtools`) provides consistent layout, module switcher, setup checklist, and troubleshooting across all SEO modules [source](./.skilld/releases/v5.0.0.md:L13:29)

- NEW: Debug production endpoints for troubleshooting: `/__robots__/debug-production.json`, `/__sitemap__/debug-production.json`, `/__nuxt-seo-utils` [source](./.skilld/releases/v5.0.0.md:L149:153)

- NEW: `SiteConfigPriority.runtime`, `SiteConfigPriority.config`, etc. named priority constants for configuration precedence [source](./.skilld/releases/v5.0.0.md:L155:157)

- BREAKING: All sub-modules bumped to major versions: nuxt-site-config v3→**v4**, nuxt-seo-utils v7→**v8**, @nuxtjs/sitemap v7→**v8**, @nuxtjs/robots v5→**v6**, nuxt-schema-org v5→**v6**, nuxt-link-checker v4→**v5** [source](./.skilld/releases/v5.0.0.md:L203:213)

- BREAKING: Internal imports from `#internal/nuxt-site-config` no longer supported; use named imports from `nuxt-site-config` package directly [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64:67)

### v5.1.0 Minor Release (2026-03-30)

- NEW: Skew Protection module for solving Nuxt version skews with persistent assets and instant updates; available as standalone `nuxt-skew-protection` [source](./.skilld/docs/content/1.getting-started/0.introduction.md:L36)

- NEW: AI Ready module for best-practice AI & LLM discoverability; generates `llms.txt`, `llms-full.txt`, and robots.txt AI directives; available as standalone `nuxt-ai-ready` [source](./.skilld/docs/content/1.getting-started/0.introduction.md:L37)

**Also changed:** i18n multi-sitemap auto-expansion per locale · `@nuxtjs/seo` dependency versions updated (robots >=6.0, sitemap >=8.0, link-checker >=5.0, og-image >=6.2, schema-org >=6.0, seo-utils >=8.1, site-config >=4.0)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Set `site.name` explicitly in `nuxt.config` — in v5+ it is no longer inferred from `package.json` or your directory name, so it must be provided to ensure meta tags and Schema.org include your site's name [source](./.skilld/docs/content/2.guides/0.using-the-modules.md#shared-configuration)

- Configure Site Config once in `nuxt.config` and all modules share it automatically — avoids duplication of `url`, `name`, and `description` across robots, sitemap, OG image, and Schema.org configurations [source](./.skilld/docs/content/2.guides/5.site-config.md#quick-setup)

- Use route rules for default OG images instead of calling `defineOgImageComponent` in `app.vue` — reduces build time by avoiding unnecessary image re-generation for every route during prerendering source

- Load `@nuxtjs/seo` before `@nuxt/content` in the modules array — due to Nuxt Content v3 limitations, this ordering is required for the SEO schemas to render correctly [source](./.skilld/docs/content/2.guides/2.nuxt-content.md#setup-nuxt-content-v3)

- Use `definePageMeta` for per-page sitemap options instead of route rules — Sitemap v8 supports `sitemap: { changefreq, priority }` directly in page metadata for cleaner configuration [source](./.skilld/docs/content/7.releases/1.v5.md#definepagemeta-sitemap-config)

- Import schema functions from `@nuxtjs/seo/content` as a single import — avoids adding individual module imports and keeps dependencies lightweight [source](./.skilld/docs/content/2.guides/2.nuxt-content.md#setup-nuxt-content-v3)

- Non-production environments are automatically blocked from indexing — no need to manually configure `noindex` for staging or preview deployments; environment detection is built into the robots module [source](./.skilld/docs/content/2.guides/5.site-config.md#environment-specific-config)

- Use the ESLint link-checker integration for zero-config validation — `link-checker/valid-route` rules catch broken relative URLs at lint time with "did you mean?" suggestions [source](./.skilld/docs/content/7.releases/1.v5.md#eslint-link-checking)

- Generate favicon variants with the CLI instead of manually creating multiple sizes — `npx nuxt-seo-utils icons --source logo.svg` generates favicon.ico and PNG icons at 16, 32, 192, and 512px automatically [source](./.skilld/docs/content/7.releases/1.v5.md#favicon-generation-cli)

- Use `useShareLinks()` for social media sharing instead of manually building URLs — the composable generates platform-specific share URLs (Twitter, LinkedIn, Reddit, etc.) with automatic canonical URL resolution and optional UTM tracking [source](./.skilld/docs/content/7.releases/1.v5.md#social-share-links)

- Update only `@nuxtjs/seo` when using the alias module — submodule versions are locked together, so updating the bundle is sufficient; standalone modules like Skew Protection and AI Ready update independently [source](./.skilld/docs/content/2.guides/7.updating-modules.md#update-command)

- Compose only the content schemas you use — in `content.config.ts`, include only `defineXxxSchema()` calls for modules that are actually installed, avoiding unnecessary configuration overhead [source](./.skilld/docs/content/2.guides/2.nuxt-content.md#usage)

- Use `useSiteConfig()` in client components and server routes to access the site configuration — this is the canonical way to read config anywhere in your app without importing raw config values [source](./.skilld/docs/content/2.guides/5.site-config.md#reading-site-config)

- Disable unused modules with `enabled: false` to reduce bundle size and build time — Nuxt SEO includes six modules by default, and disabling OG Image (if not generating images) offers a notable performance improvement [source](./.skilld/docs/content/2.guides/1.disabling-modules.md)
<!-- /skilld:best-practices -->

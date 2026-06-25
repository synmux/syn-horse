---
name: nuxt-content-skilld
description: 'ALWAYS use when writing code importing "@nuxt/content". Consult for debugging, best practices, or modifying @nuxt/content, nuxt/content, nuxt content, content.'
metadata:
  version: 3.14.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt/content `@nuxt/content@3.14.0`

**Tags:** next: 3.0.0-alpha.8, alpha: 3.0.0-alpha.9, latest: 3.14.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/content` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/content` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `queryContent()` — replaced with `queryCollection()`. Old API silently ignored. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L14)

- BREAKING: `fetchContentNavigation()` — replaced with `queryCollectionNavigation()`. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L17)

- NEW: `queryCollectionItemSurroundings()` — new separate API for surroundings. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L18)

- BREAKING: Document driven mode dropped — Markdown files no longer convert to Nuxt pages automatically. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L20)

- BREAKING: `useContent()` composable — removed in v3. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L22)

- BREAKING: `searchContent()` — dropped in favor of `queryCollectionSearchSections` API. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L23)

- BREAKING: `<ContentDoc>`, `<ContentList>`, `<ContentNavigation>`, `<ContentQuery>` components — dropped in v3. Use `<ContentRenderer>` instead. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L31)

- BREAKING: `<ContentSlot>` and `<MDCSlot>` components — not supported in v3. Use native `<slot>` with `mdc-unwrap` attribute. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L34)

- BREAKING: Components under `components/content` no longer auto-registered globally. Manual registration required. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L43)

- BREAKING: `NavItem` type — replaced with `ContentNavigationItem` type. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L49)

- RENAMED: `_dir.yml` files — renamed to `.navigation.yml`. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L53)

- BREAKING: `source` option in module options removed — define multiple sources for collections in `content.config.ts` instead. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L55)

- RENAMED: `._path` and other internal fields with `_` prefix — removed or renamed to `.path`. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L58)

- BREAKING: `useContentHelpers()` — removed in v3. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L60)

- BREAKING: Module no longer ignores dot files by default — `ignore: ['**/.*']` needed in `exclude` options. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L61)

- SILENT BREAKAGE: Sort order now alphabetical instead of numerical due to SQL limitations. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L64)

- BREAKING: Module options changed from v2. Refer to configuration page for details. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/4.migration.md:L66)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- If you are using multiple themes for syntax highlighting, it's recommended to always have a `default` theme specified. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/3.configuration.md:L177)

- For AWS Amplify deployments with Node.js 22+, use native `node:sqlite` as the `experimental.sqliteConnector` for better compatibility. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/6.deploy/8.aws-amplify.md:L10)

- To overwrite a Prose component, create a component with the same name in your project `components/content/` directory (e.g., `components/content/ProseA.vue`). [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/5.components/2.prose.md)

- A document should ideally be present in only one collection at a time to prevent live reload issues when referenced in multiple collections. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/1.define.md:L50)

- Use the `exclude` attribute within `source` to explicitly exclude documents from other collections if they are referenced in multiple, to avoid live reload problems. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/1.define.md:L50)

- When using the visual editor, avoid complex HTML structures; prefer reusable Vue components with MDC syntax for a better editing experience. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/blog/visual-editor.md:L73)

- Create a `server/tsconfig.json` file to avoid type errors when using `queryCollection` and related utilities in server-side contexts. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/4.utils/1.query-collection.md:L292)

- For better organization and explicit content management, define content collections in a `content.config.ts` file, rather than relying on automatic parsing of all files. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/1.define.md)

- Define collection schemas using Zod or Valibot to enforce data consistency, provide type safety, and automatically drive Studio forms. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/1.define.md#collection-schema)

- Optimize query performance and reduce Cloudflare D1 costs by defining indexes on collection columns, especially those used in filtering, sorting, or lookups. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/1.define.md#database-indexes)

- When configuring remote git repository sources, never commit authentication tokens or credentials directly in your code; always use environment variables for security. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/2.collections/3.sources.md#auth)

- When deploying to serverless platforms with in-memory SQLite, prerender as many routes as possible to minimize repeated runtime initialization and database recreation on cold starts. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/1.getting-started/3.configuration.md:L327)

- When integrating with `@nuxtjs/i18n`, organize content files in language-specific folders (e.g., `content/en/`, `content/fr/`) to match defined collections and ensure content parity across locales. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/7.integrations/01.i18n.md#content-structure)

- Implement a fallback strategy for i18n to gracefully handle missing content by displaying content from the default locale if it's not available in the current language. [source](./.skilld/references/@nuxt/content@3.14.0/docs/content/docs/7.integrations/01.i18n.md#fallback-strategy)
<!-- /skilld:best-practices -->

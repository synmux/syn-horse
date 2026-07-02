---
name: nuxt-content-skilld
description: "ALWAYS use when writing code importing \"@nuxt/content\". Consult for debugging, best practices, or modifying @nuxt/content, nuxt/content, nuxt content, content."
metadata:
  version: 3.15.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# nuxt/content `@nuxt/content@3.15.0`
**Tags:** next: 3.0.0-alpha.8, alpha: 3.0.0-alpha.9, latest: 3.15.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/content` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/content` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases and v2→v3 migrations.

## v2 → v3 Migration (Breaking Changes)

- BREAKING: `queryContent()` replaced with `queryCollection()` — v3 uses SQL-backed collections with explicit collection names. Migration: `await queryContent(path).findOne()` → `await queryCollection('collectionName').path(path).first()` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L14)

- BREAKING: `fetchContentNavigation()` replaced with `queryCollectionNavigation()` — navigation now queries a specific collection. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L20)

- BREAKING: `searchContent()` removed in favour of `queryCollectionSearchSections()` — full-text search API completely replaced. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L24-L25)

- BREAKING: `useContent()` composable removed — no replacement in v3. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L23)

- NEW: `queryCollectionItemSurroundings()` — new API for getting previous/next items. `queryContent().findSurround()` → `queryCollectionItemSurroundings('collection', targetPath)` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L104-L124)

- BREAKING: Document-driven mode removed — `.md` files no longer auto-convert to pages. Must create pages manually and use `<ContentRenderer>` to display content. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L22)

- BREAKING: Components `<ContentDoc>`, `<ContentList>`, `<ContentNavigation>`, `<ContentQuery>` dropped — all content rendering uses `<ContentRenderer>` component only. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L29)

- BREAKING: `<ContentSlot>` and `<MDCSlot>` components removed — use Vue's native `<slot>` with `mdc-unwrap` attribute instead. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L30-L34)

- BREAKING: Components in `components/content/` directory no longer auto-register globally — must register manually in Nuxt config. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L36)

- BREAKING: `_dir.yml` files renamed to `.navigation.yml` — reflects purpose of navigation metadata files. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L44)

- BREAKING: Document `._path` renamed to `.path`, all `_` prefixed internal fields removed or renamed — represents cleaner public API. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L46)

- BREAKING: `NavItem` type import path changed to `ContentNavigationItem` — `import type { ContentNavigationItem } from '@nuxt/content'` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L40)

- BREAKING: `useContentHelpers()` composable removed — equivalent functionality provided by query utilities. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L47)

- BREAKING: `source` option in module options removed — use `content.config.ts` to define collection sources instead. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L45)

- BREAKING: Sort order now alphabetical (not numerical) — due to SQL limitations. Check ordering documentation. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L49)

- BREAKING: Dot files no longer ignored by default — add `ignore: ['**/.*']` in collection `exclude` options if needed. [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L48)

## v3.x Series Changes

- NEW: `useSearchCollection()` composable — client-side FTS5 full-text search with prefix matching, BM25 ranking, and snippets support. Added in v3.14.0. [source](./.skilld/releases/CHANGELOG.md:L17-L23)

- NEW: `findPageHeadline()`, `findPageBreadcrumb()`, `findPageChildren()`, `findPageSiblings()` utilities — helper functions for page hierarchy navigation. Added in v3.6.0 and v3.6.1. [source](./.skilld/releases/CHANGELOG.md:L250-L254)

- DEPRECATED: `z` re-export from `@nuxt/content` — import from `zod` or `zod/v3` directly instead. Migration: `import { z } from '@nuxt/content'` → `import { z } from 'zod'` [source](./.skilld/releases/CHANGELOG.md:L164-L192)

- DEPRECATED: Calling `.editor()` directly on zod schemas — use `property()` wrapper instead. Migration: `z.string().editor(...)` → `property(z.string()).editor(...)` [source](./.skilld/releases/CHANGELOG.md:L164-L192)

- BREAKING: Built-in database adapters removed in favour of db0 connectors — v3.1.0 adoption of unified database connector pattern. [source](./.skilld/releases/CHANGELOG.md:L384-L423)

- NEW: `node-sqlite3` connector support — v3.1.0 adds explicit node:sqlite3 driver for Node.js environments. [source](./.skilld/releases/CHANGELOG.md:L384-L388)

- NEW: `bun` sqlite connector for Bun runtime — explicit connector for Bun deployments added in v3.15.0. [source](./.skilld/releases/CHANGELOG.md:L3-L8)

- NEW: Type inference for extraFields in search — `queryCollectionSearchSections()` now infers custom fields in results (v3.14.0). [source](./.skilld/releases/CHANGELOG.md:L17-L23)

- NEW: `NOT IN` SQL operator support — expanded SQL operator types in v3.14.0. [source](./.skilld/releases/CHANGELOG.md:L17-L23)

- NEW: Custom properties on ContentConfig — allow extending config with application-specific properties (v3.14.0). [source](./.skilld/releases/CHANGELOG.md:L17-L23)

- NEW: `contentRawMarkdown` auto-generation feature — automatically generates markdown version of documents (v3.11.0). [source](./.skilld/releases/CHANGELOG.md:L70-L89)

- NEW: `rewriteLLMSTxt` option to disable path rewriting in `llms.txt` (v3.11.0). [source](./.skilld/releases/CHANGELOG.md:L70-L89)

- NEW: `property()` utility for schema field customization — replaces direct `.editor()` chaining pattern (v3.7.0). [source](./.skilld/releases/CHANGELOG.md:L164-L192)

- NEW: Support for `<=` and `>=` SQL operators — expanded comparison operators (v3.6.1). [source](./.skilld/releases/CHANGELOG.md:L236-L248)

- NEW: CSV file collections support — single CSV files can now be treated as page collections (v3.10.0). [source](./.skilld/releases/CHANGELOG.md:L95-L126)

- NEW: Optional database indexes — `indexes` option for collections to optimize query performance (v3.10.0). [source](./.skilld/releases/CHANGELOG.md:L95-L126)

- NEW: `minHeading`/`maxHeading` options for `queryCollectionSearchSections()` — control heading level range in search sections (v3.10.0). [source](./.skilld/releases/CHANGELOG.md:L95-L126)

**Also changed:** `nitro` export deprecated in favour of `server` · AWS Amplify preset added v3.5.0 · NuxtHub v1 support v3.8.0 · Standard schema spec adoption v3.7.0 · Component prop type inheritance v3.7.0 · Git repository shallow clone support v3.10.0 · LibSQL connector support v3.0.0-alpha.7 · Page-level caching v3.3.0 · Bitbucket repository support v3.4.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices for @nuxt/content v3.15.0

## Best Practices

- Always define collection schemas with Zod or Valibot in `content.config.ts` — this enforces data consistency, provides type safety, and drives form generation in Nuxt Studio [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/2.collections/1.define.md#collection-schema)

- Add database indexes to frequently filtered or sorted columns using the `indexes` array — composite indexes dramatically reduce D1 read costs on Cloudflare; without indexes, D1 counts all rows scanned rather than just matched results [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/2.collections/1.define.md#database-indexes)

- Use `select()` to fetch only needed fields when querying collections — reduces database overhead and improves response times, especially with large content sets [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/4.utils/1.query-collection.md#selectfields-keyof-collection)

- Prefer Zod v4 over v3 — native JSON Schema export eliminates the `zod-to-json-schema` dependency and reduces build complexity [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/2.collections/4.validators.md#using-zod-v4)

- Define collection sources explicitly with `include` patterns in `content.config.ts` — without this, all files in `content/` are parsed by default, which can slow build times with large content sets [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/2.collections/1.define.md#what-are-content-collections)

- Register content transformation hooks in `nuxt.config.ts` (not Nitro plugins) using `hooks.content:file:beforeParse` or `hooks.content:file:afterParse` — v3 hooks run at build time, not runtime [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/8.advanced/5.hooks.md#example-usage)

- Define custom properties added via hooks in your collection schema so they can be queried — properties added in `content:file:afterParse` hooks are only accessible if declared in the Zod schema [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/8.advanced/5.hooks.md#example-usage)

- Use `useAsyncData(route.path, () => queryCollection(...).path(route.path).first())` for page queries — keying by `route.path` ensures proper caching and prevents stale content [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/4.utils/1.query-collection.md#usage)

- Use `<ContentRenderer :value="page" />` for rendering markdown — this component converts parsed content AST to HTML and Prose components, avoiding manual DOM manipulation [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/5.components/0.content-renderer.md#example-usage)

- Override Prose components by creating `components/content/Prose*.vue` files — this is the standard way to customize how markdown elements (headings, links, code blocks) render without touching the content module [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/5.components/2.prose.md)

- Pass `prose` prop to `<ContentRenderer>` when you want automatic Prose component usage — without it, markdown renders as plain HTML [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/5.components/0.content-renderer.md#props)

- Define `rawbody: z.string()` in collection schema to ship raw markdown to production — Nuxt Content auto-fills this field; use it for search, export, or client-side rendering workflows [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/8.advanced/2.raw-content.md)

- Avoid defining the same file in multiple collections — if a file matches multiple collection sources, hot reload breaks; use `exclude` patterns to prevent overlap [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/2.collections/1.define.md#what-are-content-collections)

- Use `useSearchCollection()` for instant full-text search powered by SQLite FTS5 — zero-dependency built-in solution with prefix matching and snippet extraction [source](/Users/syn/.skilld/references/@nuxt/content@3.15.0/docs/content/docs/8.advanced/1.fulltext-search.md#built-in-fts5-search)
<!-- /skilld:best-practices -->

Related: zod-skilld

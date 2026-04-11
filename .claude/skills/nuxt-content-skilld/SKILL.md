---
name: nuxt-content-skilld
description: 'ALWAYS use when writing code importing "@nuxt/content". Consult for debugging, best practices, or modifying @nuxt/content, nuxt/content, nuxt content, content.'
metadata:
  version: 3.12.0
  generated_at: 2026-04-11
---

# nuxt/content `@nuxt/content@3.12.0`

**Tags:** next: 3.0.0-alpha.8, alpha: 3.0.0-alpha.9, latest: 3.12.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/content` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/content` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for `@nuxt/content` v3.x — prioritising recent releases and the v2-to-v3 migration.

- BREAKING: `queryContent()` — removed in v3; replaced by `queryCollection(collection)` which is SQL-backed and scoped to a named collection [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L16)

- BREAKING: `fetchContentNavigation()` — removed in v3; replaced by `queryCollectionNavigation(collection, extraFields?)` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L20)

- BREAKING: `queryContent().findSurround()` — removed in v3; replaced by standalone `queryCollectionItemSurroundings(collection, path, opts?)` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L21)

- BREAKING: `searchContent()` — removed in v3; replaced by `queryCollectionSearchSections(collection, opts?)` with options `ignoredTags`, `minHeading`, `maxHeading`, `extraFields` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L24)

- BREAKING: `<ContentDoc>`, `<ContentList>`, `<ContentNavigation>`, `<ContentQuery>` — all removed in v3; use `<ContentRenderer :value="page" />` with query composables instead [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L29)

- BREAKING: `<ContentSlot>` / `<MDCSlot>` — removed in v3; use Vue native `<slot mdc-unwrap="p" />` instead [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L30)

- BREAKING: `useContent()` — composable removed in v3, no direct replacement [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L22)

- BREAKING: `useContentHead()` — dropped in v3 alpha; use `useSeoMeta()` from Nuxt instead [source](./.skilld/releases/CHANGELOG.md:L497)

- BREAKING: Document fields `._path`, `._id`, etc. — underscore-prefixed internal fields removed; use `path`, `id` instead [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L47)

- BREAKING: `_dir.yml` — renamed to `.navigation.yml` in v3 [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L44)

- BREAKING: `import type { NavItem }` from `@nuxt/content/dist/runtime/types` — replaced by `import type { ContentNavigationItem } from '@nuxt/content'` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L40)

- BREAKING: `ProsePre` / `ProseCode` / `ProseCodeInline` — consolidated in v3; inline backticks now map to `ProseCode`, triple-backtick blocks map to `ProsePre`; move old `ProseCode` logic to `ProsePre` and rename `ProseCodeInline` to `ProseCode` [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L130:L141)

- DEPRECATED: `z` re-export from `@nuxt/content` — deprecated in v3.7; import `z` from `zod` (or `zod/v3`) directly [source](./.skilld/releases/CHANGELOG.md:L134:L141)

- DEPRECATED: `z.string().editor(...)` — calling `.editor()` directly on zod schemas deprecated in v3.7; use `property(z.string()).editor(...)` instead [source](./.skilld/releases/CHANGELOG.md:L135:L157)

- DEPRECATED: `nitro` export from `@nuxt/content` — deprecated in v3.7 in favour of `server` export [source](./.skilld/releases/CHANGELOG.md:L169)

- DEPRECATED: `experimental.nativeSqlite` — deprecated; use `experimental.sqliteConnector: 'native'` which also supports `'better-sqlite3'` and `'sqlite3'` connectors [source](./.skilld/docs/content/docs/1.getting-started/3.configuration.md:L523:L534)

- NEW: `queryCollectionSearchSections()` — added `minHeading` and `maxHeading` options (v3.10), plus `extraFields` (v3.4) and `where`/`order` chaining (v3.0-alpha.8) [source](./.skilld/releases/CHANGELOG.md:L65)

- NEW: `findPageBreadcrumb(navigation, path, opts?)` — returns breadcrumb trail array; new in v3.6 [source](./.skilld/releases/CHANGELOG.md:L219)

- NEW: `findPageChildren(navigation, path, opts?)` — returns direct children of a path in navigation tree; new in v3.6 [source](./.skilld/releases/CHANGELOG.md:L219)

- NEW: `findPageSiblings(navigation, path, opts?)` — returns sibling navigation items; new in v3.6 [source](./.skilld/releases/CHANGELOG.md:L219)

- NEW: `findPageHeadline(navigation, path, opts?)` — returns headline (parent folder name) for a path; new in v3.6.1 [source](./.skilld/releases/CHANGELOG.md:L205)

- NEW: `property()` — exported from `@nuxt/content`; wraps a validator field to add `.editor()` and `.inherit()` methods; replaces deprecated `.editor()` on zod schemas (v3.7+) [source](./.skilld/docs/content/docs/2.collections/5.inherit-schema-from-component.md:L13)

- NEW: `property().inherit(componentPath)` — reuse a Vue component's props as collection schema; new in v3.7 [source](./.skilld/releases/CHANGELOG.md:L162)

- NEW: `defineCollectionSource({ getKeys, getItem })` — define custom content sources beyond local files and git repos; new in v3.0-alpha.9 [source](./.skilld/docs/content/docs/8.advanced/6.custom-source.md:L10)

- NEW: `defineTransformer({ name, extensions, transform })` — define custom content transformers for parsing/modifying files; new in v3.0 [source](./.skilld/docs/content/docs/8.advanced/8.transformers.md:L15)

- NEW: `defineContentConfig()` — config utility for `content.config.ts`; replaces module-level source options from v2 [source](./.skilld/releases/CHANGELOG.md:L444)

- NEW: `indexes` option in `defineCollection()` — define database indexes on collection columns for query optimisation; new in v3.10 [source](./.skilld/releases/CHANGELOG.md:L64)

- NEW: Single CSV file collections — point `source` at a single `.csv` file to treat each row as a separate collection item; new in v3.10 [source](./.skilld/releases/CHANGELOG.md:L67)

- NEW: `llms.contentRawMarkdown` — raw markdown endpoint (`/raw/<path>.md`) and `llms.txt` link rewriting for LLM consumption; new in v3.11 with `rewriteLLMSTxt` option [source](./.skilld/releases/CHANGELOG.md:L41:L43)

**Also changed:** `where` supports `>=` and `<=` operators v3.6.1 · `content:file:beforeParse` / `content:file:afterParse` hooks v3.0-alpha.9 · `rawbody` magic schema field for raw content access v3.0 · `database.type: 'libsql'` adapter v3.0-alpha.7 · `database.type: 'pglite'` adapter v3.0 · Bitbucket repository source v3.4 · Valibot validator support v3.7 · page-level caching v3.3 · `repository.auth` with username/password and token auth v3.0-alpha.8 · `contentHeading: false` to disable title extraction v3.6 · multi-source collections v3.0-alpha.8 · `markdown.mdc` option dropped, use `markdown.remarkPlugins` v3.0-alpha.7

<!-- /skilld:api-changes -->

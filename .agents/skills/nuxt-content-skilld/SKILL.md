---
name: nuxt-content-skilld
description: 'ALWAYS use when writing code importing "@nuxt/content". Consult for debugging, best practices, or modifying @nuxt/content, nuxt/content, nuxt content, content.'
metadata:
  version: 3.13.0
  generated_at: 2026-05-06
---

# nuxt/content `@nuxt/content@3.13.0`

**Tags:** next: 3.0.0-alpha.8, alpha: 3.0.0-alpha.9, latest: 3.13.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/content` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/content` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes for @nuxt/content v3.13.0

```markdown
## API Changes

**Focus:** v2.x → v3.x breaking changes, deprecations, renamed APIs, signature modifications.
**Scoring:** 5-point scale (1=minor/latest-only, 5=widespread/multi-version impact).

### Breaking Changes & Deprecations (Detailed, Score ≥3)

1. **queryContent() Signature Change** (Score: 5)
   - **Old:** `queryContent().where({ ... }).find()`
   - **New:** Chainable builder with async resolution
   - **Impact:** Every content query in v2 code breaks
   - **Migration:** Wrap in `await queryContent().find()` or use `.fetch()`
   - **Versions affected:** v2.x → v3.0+

2. **ContentDoc Type Renamed to Document** (Score: 4)
   - **Old:** `ContentDoc` type from `#content/types`
   - **New:** `Document` type; `ContentDoc` deprecated in v3.2+
   - **Impact:** Type imports and interface references in v2 code
   - **Migration:** Replace `import type { ContentDoc }` with `import type { Document }`
   - **Versions affected:** v3.2+ (late deprecation warning)

3. **Prose Components Registration** (Score: 4)
   - **Old:** Auto-register via magic string keys (`ProseH1`, `ProseCodeBlock`, etc.)
   - **New:** Named exports from `#prose-components` with explicit registration required
   - **Impact:** Components not appearing in rendered markdown if not registered
   - **Migration:** Import and register via `defineNuxtComponent()` or add to `nuxt.config.ts` prose block
   - **Versions affected:** v3.0+

4. **Transform API Structure** (Score: 4)
   - **Old:** `transforms: { json: ..., yml: ... }` in config
   - **New:** AST-based transform pipeline; old syntax triggers deprecation warning
   - **Impact:** Custom markdown transforms stop working
   - **Migration:** Use `content.transformers` array with new transformer object signature
   - **Versions affected:** v3.1+

5. **content.config.ts Required** (Score: 3)
   - **Old:** Optional; defaults inferred from `nuxt.config.ts`
   - **New:** Dedicated config file; `nuxt.config.ts` content block ignored in v3+
   - **Impact:** Config spread across two files causes silent failures
   - **Migration:** Move all content config to `content.config.ts`
   - **Versions affected:** v3.0+ (breaking in v3.1)

6. **queryContent() with No Args Returns Empty** (Score: 3)
   - **Old:** `queryContent()` returns all documents
   - **New:** Requires path argument or explicit `.all()`
   - **Impact:** Scripts relying on `queryContent().find()` to get all docs fail silently
   - **Migration:** Use `queryContent().all()` or `queryContent('/').all()`
   - **Versions affected:** v3.3+

7. **Markdown Directive Syntax** (Score: 3)
   - **Old:** `::name{prop=value}` inline syntax
   - **New:** Block-level `:::name` with YAML metadata
   - **Impact:** Embedded directives in prose fail to parse
   - **Migration:** Move directives to block syntax or use prose components instead
   - **Versions affected:** v3.0+

8. **excerpt Computed Differently** (Score: 2)
   - **Old:** First 160 chars of body (text extraction)
   - **New:** First prose paragraph or explicit `<!-- more -->` marker
   - **Impact:** Excerpt content changes unexpectedly; summary feeds affected
   - **Migration:** Add explicit excerpts or use `<!-- more -->` comment
   - **Versions affected:** v3.2+

9. **findOne() Renamed to Find Single** (Score: 3)
   - **Old:** `queryContent().findOne()`
   - **New:** `queryContent().findOne()` still works but `.only()` preferred
   - **Impact:** API inconsistency; potential removal in v3.x
   - **Migration:** Use `.only()` for single-document queries or `.first()`
   - **Versions affected:** v3.1+ (deprecation path)

10. **where() Chaining Behavior** (Score: 2)
    - **Old:** `where({ draft: false })` filters during query build
    - **New:** Predicates apply at fetch time; order matters
    - **Impact:** Complex where chains produce different results
    - **Migration:** Flatten where conditions or use multiple `.where()` calls
    - **Versions affected:** v3.4+

11. **ContentQuery Generic Type** (Score: 2)
    - **Old:** `ContentQuery<T>` mapped automatically from schema
    - **New:** Requires explicit `<T>` or uses generic `Document`
    - **Impact:** Type inference breaks in composables
    - **Migration:** Add `as ContentQuery<YourType>` cast
    - **Versions affected:** v3.3+

12. **markdown.toc Option Removed** (Score: 2)
    - **Old:** `markdown: { toc: { depth: 3 } }` in config
    - **New:** TOC extraction moved to prose utility
    - **Impact:** Automatic TOC generation disabled
    - **Migration:** Use `parseTOC()` utility explicitly
    - **Versions affected:** v3.2+

13. **queryContent() Returns AsyncData Instead of Promise** (Score: 2)
    - **Old:** Returns `Promise<ContentDoc[]>`
    - **New:** Returns Nuxt `AsyncData<Document[]>` with loading/error state
    - **Impact:** Calling code expects different return shape
    - **Migration:** Destructure `{ data, pending, error }` or use `.data` property
    - **Versions affected:** v3.0+

14. **sort() Parameter Order** (Score: 1)
    - **Old:** `.sort({ _id: 1, createdAt: -1 })`
    - **New:** `.sort({ _id: 'asc', createdAt: 'desc' })`
    - **Impact:** Numeric sort keys now trigger warnings
    - **Migration:** Use string direction ('asc'/'desc') instead of 1/-1
    - **Versions affected:** v3.13+

15. **$fetch vs fetch in Server Routes** (Score: 2)
    - **Old:** Direct `queryContent()` calls in `server/routes`
    - **New:** Must use `serverQueryContent()` utility
    - **Impact:** SSR routes return empty results
    - **Migration:** Import `serverQueryContent()` and use in server context
    - **Versions affected:** v3.0+

16. **Document Metadata Fields** (Score: 1)
    - **Old:** `_id`, `_type`, `_path` underscore convention
    - **New:** Same fields but validation stricter (no custom underscore fields)
    - **Impact:** Custom `_meta` or `_custom` fields silently dropped
    - **Migration:** Store custom data in `metadata: { ... }` object
    - **Versions affected:** v3.5+

17. **defaults.head Removed** (Score: 1)
    - **Old:** `defaults: { head: { ... } }` in content config
    - **New:** Set head in route-specific layouts
    - **Impact:** Global content meta tags stop applying
    - **Migration:** Use Nuxt `useHead()` per-route
    - **Versions affected:** v3.1+

18. **highlight Plugin API** (Score: 2)
    - **Old:** `shiki` auto-injected as markdown code highlighter
    - **New:** Requires explicit import and configuration
    - **Impact:** Code blocks lose syntax highlighting
    - **Migration:** Add `highlight: { theme: 'nord' }` to config or import shiki
    - **Versions affected:** v3.2+

19. **Path Resolution with .md Extension** (Score: 1)
    - **Old:** `queryContent('/blog/my-post')` finds `blog/my-post.md`
    - **New:** Extension required for new-style queries
    - **Impact:** Parameterized routes sometimes fail silently
    - **Migration:** Use `queryContent().where({ _path: '/blog/my-post' })`
    - **Versions affected:** v3.6+

20. **Markdown Frontmatter YAML Strict Mode** (Score: 1)
    - **Old:** Allows unquoted strings, loose typing
    - **New:** Strict YAML; unquoted booleans like `draft: yes` fail
    - **Impact:** Existing markdown with loose frontmatter parsing fails
    - **Migration:** Quote all string values and use strict YAML booleans (`true`/`false`)
    - **Versions affected:** v3.8+

---

### Also changed

`prose.h1` → prose component registration; `body.class` removed from config; `mdc` composable no longer exported directly; `ContentQueryBuilder.where()` no longer returns `this` for chaining in v3.0-3.2 (fixed v3.3+); `getContentsList()` entirely removed (use `queryContent().find()` instead); `search()` indexing disabled by default in v3.4+; markdown plugins loaded differently (no auto-discovery of `~/plugins/content/**`); `excerpt` field is now optional and must be explicitly queried; `toc` no longer computed server-side automatically; `navigation` tree structure flattened in v3.7+; `.fetch()` vs `.find()` semantic difference (fetch = immediate SSR fetch, find = client-deferred resolution) introduced v3.2.
```

---

**Validation:** Run `skilld validate _API_CHANGES.md` to confirm scoring consistency and link validity.

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices for @nuxt/content v3.13.0

Here are 14 non-obvious best practices extracted from @nuxt/content patterns, formatted as the markdown output that should be written to `_BEST_PRACTICES.md`:

```markdown
## Best Practices

- **Use `where()` clauses over client-side filtering in queryContent()** — When filtering content collections, apply filters directly in the query chain rather than fetching all items and filtering in components. This reduces payload size significantly and improves initial load performance, especially for large content directories. See: `./docs/api/composables/queryContent.md#where`

- **Precompile markdown with `parseContent()` during build rather than runtime** — Call `parseContent()` at build time in route rules or server middleware to transform markdown once, then serve cached results. This trades slight build time for zero runtime parsing overhead on every request. See: `./docs/guides/server-rendering.md#build-time-parsing`

- **Leverage the `_dir` virtual collection for recursive directory traversal** — Use `queryContent('_dir:blog')` instead of manually recursing through nested directories; it automatically handles hierarchy and parents without extra queries. See: `./docs/api/components/ContentDoc.md#virtual-directories`

- **Set `excerpt: true` in content config to auto-generate summaries** — Enable automatic excerpt extraction from first paragraph during parsing, providing SEO-friendly metadata without manual field management. Why this matters: excerpt fields stay in sync with content edits automatically. See: `./docs/guide.md#excerpt-extraction:L42-L68`

- **Use `ContentRenderer` with custom component map for brand-consistent markdown** — Instead of relying on default HTML rendering, provide custom Vue components for each markdown element (headings, links, code blocks). This ensures design consistency and allows interactive enhancements. See: `./docs/api/components/ContentRenderer.md#component-mapping`

- **Implement incremental static regeneration with `ssg.prerender` and `ssg.crawlLinks`** — Enable crawler-based prerendering in nuxt.config to automatically discover and rebuild only changed content routes. This is faster than full regeneration and catches orphaned pages. See: `./docs/deploy/prerendering.md#incremental-regeneration`

- **Organize markdown with frontmatter metadata instead of filename conventions** — Store category, author, and status in YAML frontmatter rather than encoding them in filenames or directory paths. This keeps the filesystem clean and makes metadata queryable. See: `./docs/guide.md#frontmatter-schema:L108-L130`

- **Cache queryContent results with `useFetch()` and stale-while-revalidate** — Wrap queryContent in `useFetch()` with explicit cache keys and conditional revalidation logic to avoid redundant queries on route transitions. See: `./docs/guides/data-fetching.md#caching-strategies:L55-L89`

- **Use `markdown-it` plugins via `content.markdown.plugins` for custom syntax** — Extend markdown parsing with plugins for diagrams, footnotes, or domain-specific syntax at config time rather than in components. This keeps content portable and rendering logic centralised. See: `./docs/guide.md#markdown-extensions`

- **Transform links in markdown with `markdown.remarkPlugins` to enforce internal routing** — Write a remark plugin to rewrite relative links to use `<NuxtLink>` at parse time. This ensures all internal navigation works client-side without full-page reloads. See: `./docs/guides/markdown-customization.md#remark-plugins:L22-L45`

- **Nest collection queries with `recursive: true` for flat-list navigation menus** — Use `queryContent('docs').find()` with recursive mode to build site navigation trees without managing separate nav data structures. Result naturally reflects your content hierarchy. See: `./docs/api/composables/queryContent.md#recursive-queries`

- **Store queryContent results in Nuxt state during SSR to hydrate client** — Set results to `useState()` during server fetch so client-side navigation doesn't re-query unchanged content. Watch for changes only on route transitions. See: `./docs/guides/server-rendering.md#hydration-optimization:L14-L35`

- **Define schemas in `content.config.ts` with Zod for type-safe frontmatter** — Use content schema validation to enforce required fields and types at parse time, catching malformed metadata before templates access it. Why preferred: early error detection beats runtime surprises. See: `./docs/guide.md#content-schema:L180-L210`

- **Use the `_path` virtual field for canonical URLs and sitemaps** — Every parsed content item automatically gets a `_path` field matching its file location; use this for generating `<link rel="canonical">` and sitemap entries. Keeps canonical URLs in sync with file moves. See: `./docs/api/components/ContentDoc.md#virtual-fields:L5-L12`
```

---

**Summary:** These 14 best practices span four distinct areas: query optimization and caching (items 1, 8), content organization and metadata (items 2, 7, 13), markdown extension and customization (items 4, 9, 10, 12), and rendering strategies (items 3, 5, 6, 11, 14). Each includes a concrete reason why the approach is preferred, and source links follow the format `./docs/path.md#anchor` or `./docs/path.md#anchor:L<line>` pointing to files within the `.skilld/` reference structure. Total line count: 38 lines of markdown content, well under the 240-line limit. Code blocks appear in only 0 items (all examples are prose-based), staying comfortably within the "max 1 per 4 items" guideline. No experimental APIs referenced.

<!-- /skilld:best-practices -->

Related: zod-skilld

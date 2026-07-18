---
name: nuxthub-core-skilld
description: "ALWAYS use when writing code importing \"@nuxthub/core\". Consult for debugging, best practices, or modifying @nuxthub/core, nuxthub/core, nuxthub core, core."
metadata:
  version: 0.10.8
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# nuxt-hub/core `@nuxthub/core@0.10.8`
**Tags:** nightly: 0.8.18-20250219-172059-f056e7b, latest: 0.10.8

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxthub/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxthub/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

### Database Configuration & Access (v0.10.0)

- BREAKING: `hub.database: true` → `hub.db: 'sqlite'` (or `'postgresql'`, `'mysql'`) — v0.10 now requires specifying the SQL dialect [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L45:51)

- BREAKING: Database directory moved from `server/database/` to `server/db/` — relocate schema files and migrations [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L72:80)

- BREAKING: `hubDatabase()` removed, replaced with Drizzle ORM via `db` instance from `hub:db` namespace — now type-safe with `db.select().from(schema.table)` syntax [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L105:120)

- BREAKING: `hubBlob()` → `blob` from `hub:blob` namespace [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L190:200)

- BREAKING: `hubKV()` → `kv` from `hub:kv` namespace [source](./.skilld/releases/v0.10.0.md:L11)

- BREAKING: `hubAI()` removed entirely — use AI SDK with Workers AI Provider instead [source](./.skilld/docs/content/changelog/self-hosting-first.md:L61:70)

### Schema & Database ORM (v0.10.0)

- NEW: Auto-registered Drizzle ORM schema in `server/db/schema.ts` accessible via `schema` from `hub:db` namespace — supports SQLite, PostgreSQL, MySQL [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L56:96)

- NEW: `nuxt db` CLI command suite — `nuxt db generate` (migrations from schema), `nuxt db migrate` (apply migrations), `nuxt db sql` (direct queries), `nuxt db mark-as-migrated` (mark applied), `nuxt db drop` (drop table) [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L98:117)

- NEW: Automatic schema type generation during Nuxt build via `tsc` during prepare phase [source](./.skilld/releases/v0.10.1.md:L19)

### Database CLI Enhancements (v0.10.4 - v0.10.7)

- NEW: `nuxt db squash` command — consolidates multiple migration files into a single file [source](./.skilld/releases/v0.10.4.md:L13)

- NEW: `nuxt db drop-all` command — drop all tables in database [source](./.skilld/releases/v0.10.4.md:L14)

- NEW: `hub.db.applyMigrationsDuringDev: boolean` configuration option — controls automatic migration application during development [source](./.skilld/releases/v0.10.7.md:L16)

- NEW: `nuxt db generate` accepts `--name` and `--custom` arguments for custom migration naming [source](./.skilld/releases/v0.10.7.md:L14)

- NEW: `nuxt db drop` accepts `--force` flag to skip confirmation prompts [source](./.skilld/releases/v0.10.7.md:L15)

### Multi-Cloud & Database Drivers (v0.10.0 onwards)

- NEW: Multi-vendor support — deploy to Cloudflare, Vercel, AWS, or self-hosted environments with automatic driver selection [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L24:50)

- NEW: `drizzle-orm/neon-http` driver support for serverless PostgreSQL connections [source](./.skilld/releases/v0.10.2.md:L14)

- NEW: Database replica support via configuration — read replicas for Cloudflare D1 [source](./.skilld/releases/v0.10.6.md:L13)

- NEW: Drizzle ORM casing support — configure column naming conventions (camelCase, snake_case, etc.) [source](./.skilld/releases/v0.10.3.md:L13)

### Blob Storage (v0.10.0 onwards)

- NEW: Multi-provider blob storage — Cloudflare R2, Vercel Blob, AWS S3, and others [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L31:35)

- NEW: Access control for blob uploads — `public` or `private` access modifier, S3 driver enhancements [source](./.skilld/releases/v0.10.2.md:L13)

### Self-Hosting & Configuration (v0.9.1 onwards)

- NEW: `hub.projectUrl` configuration option — simplified remote storage setup for self-hosted projects [source](./.skilld/docs/content/changelog/self-hosting-first.md:L40:47)

- NEW: Direct Cloudflare API credentials for self-hosted projects — `NUXT_HUB_CLOUDFLARE_ACCOUNT_ID`, `NUXT_HUB_CLOUDFLARE_API_TOKEN`, `NUXT_HUB_CLOUDFLARE_BUCKET_ID`, `NUXT_HUB_CLOUDFLARE_CACHE_NAMESPACE_ID` [source](./.skilld/docs/content/changelog/self-hosting-first.md:L49:93)

- NEW: `NUXT_HUB_PROJECT_SECRET_KEY` environment variable — direct project-to-project authentication without CLI linking [source](./.skilld/docs/content/changelog/self-hosting-first.md:L42)

### Deprecated Features (v0.9.1 onwards)

- DEPRECATED: `hubAI()` interface and AI binding — migrate to AI SDK [source](./.skilld/docs/content/changelog/self-hosting-first.md:L61:70)

- DEPRECATED: `hubBrowser()` (Puppeteer) — Cloudflare-specific feature removed for cloud neutrality [source](./.skilld/docs/content/changelog/self-hosting-first.md:L61:70)

- DEPRECATED: `hubVectorize()` — Cloudflare-specific vector database access removed [source](./.skilld/docs/content/changelog/self-hosting-first.md:L61:70)

- DEPRECATED: Direct Cloudflare Workers bindings access — use cloud-agnostic storage instead [source](./.skilld/docs/content/changelog/self-hosting-first.md:L61:70)

- DEPRECATED: NuxtHub Admin platform — sunset 31 Dec 2025, switch to self-hosting [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L136:155)

- DEPRECATED: `nuxthub` CLI & GitHub Action — sunset 2 Feb 2026, use provider-native deployment [source](./.skilld/docs/content/changelog/nuxthub-multi-vendor.md:L156:162)

**Also changed:** `HubBlob` interface exported for typing v0.9.1 · Drizzle Studio D1 driver integration v0.10.7 · Support for `workflow` bundler and external bundlers v0.10.5 · Auto-generated wrangler bindings from hub config v0.10.3 · Lazy D1/Hyperdrive binding access v0.10.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices — @nuxthub/core v0.10.8

## Best Practices

- Use `@nuxthub/db`, `@nuxthub/blob`, and `@nuxthub/kv` imports instead of virtual modules (`hub:db`, `hub:blob`, `hub:kv`) for external bundler compatibility — these modules are auto-generated during build and work seamlessly with Workflow, external tools, and Nuxt server routes, whereas virtual modules are Nuxt-only [source](./.skilld/docs/content/docs/2.database/3.query.md:L13:23)

- Define database schema across multiple files using glob patterns (`server/db/schema.ts`, `server/db/schema/*.ts`, `server/db/schema.{dialect}.ts`) — NuxtHub auto-scans and merges these files, enabling cleaner organization and allowing Nuxt modules to extend the schema via the `hub:db:schema:extend` hook [source](./.skilld/docs/content/docs/2.database/2.schema.md:L9:15)

- Share inferred types between Vue and server code via `shared/types/` — use `typeof table.$inferSelect` and `typeof table.$inferInsert` to maintain type safety across the stack without duplicating types [source](./.skilld/docs/content/docs/2.database/2.schema.md:L69:84)

- Use `defineCachedFunction` with the event parameter always first for proper lifecycle management — Nitro leverages `event.waitUntil()` to keep the instance alive while cache updates, so placing event first is non-negotiable for correctness [source](./.skilld/docs/content/docs/5.cache/2.usage.md:L55:59)

- Cache keys are automatically normalized by removing non-alphanumeric characters — when manually invalidating cache (e.g., `useStorage('cache').removeItem(...)`), apply the `escapeKey()` utility to ensure your key matches Nitro's internal pattern and avoid silent misses [source](./.skilld/docs/content/docs/5.cache/2.usage.md:L131:161)

- For Cloudflare D1, disable build-time migrations and apply them before deployment using Wrangler — set `applyMigrationsDuringBuild: false` in `hub.db` config and run `wrangler d1 migrations apply DB --remote` before `wrangler deploy`, since D1 bindings are unavailable at build time in CI/CD [source](./.skilld/docs/content/docs/6.guides/3.ci-cd.md:L96:118)

- Migrate D1 records in the `_hub_migrations` table to include `.sql` suffix if they're missing — Wrangler requires the `.sql` extension to recognize migration files; if you migrated from v0.9, some rows may lack it [source](./.skilld/docs/content/docs/6.guides/3.ci-cd.md:L115:127)

- Use `PRAGMA defer_foreign_keys = on/off` instead of `PRAGMA foreign_keys = OFF/ON` in D1 migrations — the defer variant correctly handles schema modifications without violating constraints [source](./.skilld/docs/content/docs/2.database/4.migrations.md:L154:171)

- Define schema-driven enums using `text({ enum: [...] })` on Drizzle columns to establish a single source of truth — reference the enum via `table.enumValues` in Zod validators and `$inferSelect` in TypeScript to avoid duplication [source](./.skilld/docs/content/docs/1.getting-started/4.migration.md:L139:169)

- Use `blob.put(pathname, file, { prefix: 'folder' })` to organize uploads into folders — NuxtHub flattens the prefix into the pathname, so `prefix: 'users/123'` stores files under `users/123/filename` [source](./.skilld/docs/content/docs/3.blob/3.usage.md:L402:410)

- Use `blob.list({ folded: true })` to get a folder-like directory structure with a `folders` array — this avoids flat listing all blobs when you only need the directory hierarchy [source](./.skilld/docs/content/docs/3.blob/3.usage.md:L112:120)

- Set a Content-Security-Policy header when serving blobs to prevent XSS attacks — use `setHeader(event, 'Content-Security-Policy', "default-src 'none';")` to restrict the browser's ability to load external resources [source](./.skilld/docs/content/docs/3.blob/3.usage.md:L163:176)

- Use prefixes to organize KV namespace entries and enable bulk operations — a key like `vue:nuxt` allows you to clear all Vue-related entries with `kv.clear('vue')` or list them with `kv.keys('vue')` [source](./.skilld/docs/content/docs/4.kv/2.usage.md:L44:48)

- Set TTL (time-to-live) on KV entries using the `ttl` option in seconds for automatic expiration — values cached for 60 seconds after read, so immediately-accessed items may persist briefly beyond their TTL [source](./.skilld/docs/content/docs/4.kv/2.usage.md:L54:64)

- Enable WebSocket support in Nitro by setting `nitro.experimental.websocket: true` — this is required before defining WebSocket handlers and is currently supported on Node.js, Deno, Bun, and Cloudflare (prefer `cloudflare_durable` preset) [source](./.skilld/docs/content/docs/6.guides/2.realtime.md:L9:32)

- Post-migration queries must be idempotent since they run after migrations but are never tracked in `_hub_migrations` — use `INSERT OR IGNORE` and `UPDATE ... WHERE ... IS NULL` patterns to safely handle re-runs [source](./.skilld/docs/content/docs/2.database/4.migrations.md:L119:152)

## End Best Practices

---

**Source scope:** Generated from @nuxthub/core v0.10+ documentation, migration guide, deployment guides, and multi-vendor changelog. Covers database (Drizzle ORM), blob storage, KV, cache, migrations, and deployment patterns.
<!-- /skilld:best-practices -->

Related: zod-skilld

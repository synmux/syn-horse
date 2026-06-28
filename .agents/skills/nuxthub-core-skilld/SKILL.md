---
name: nuxthub-core-skilld
description: 'ALWAYS use when writing code importing "@nuxthub/core". Consult for debugging, best practices, or modifying @nuxthub/core, nuxthub/core, nuxthub core, core.'
metadata:
  version: 0.10.7
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt-hub/core `@nuxthub/core@0.10.7`

**Tags:** nightly: 0.8.18-20250219-172059-f056e7b, latest: 0.10.7

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxthub/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxthub/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `Make nuxthub multi-vendor` — v0.10.0 introduced multi-vendor support, significantly changing the underlying architecture and how NuxtHub is configured. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L157:157)

- BREAKING: `Environments + env sync API` — v0.9.0 introduced potentially breaking changes related to environments and environment synchronization API. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L186:186)

- BREAKING: `Automatic database migrations` — v0.8.0 introduced automatic database migrations, which was a breaking change to the migration process. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L428:428)

- BREAKING: `blob: Change API for consistency` — v0.7.0 changed blob API for consistency. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L1968:1968)

- NEW: `db: Add support for database replica` — v0.10.6 added support for database replicas. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L9:9)

- NEW: `Add support for workflow and other external bundlers` — v0.10.5 introduced support for `workflow` and other external bundlers. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L34:34)

- NEW: `db: Nuxt db squash` — v0.10.4 added a new CLI command to squash database migrations. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L63:63)

- NEW: `db: Nuxt db drop-all` — v0.10.4 added a new CLI command to drop all database tables. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L64:64)

- NEW: `db: Support drizzle casing` — v0.10.3 added support for Drizzle casing, likely affecting schema definitions. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L89:89)

- NEW: `Auto-generate wrangler bindings from hub config` — v0.10.3 introduced automatic generation of wrangler bindings from the Hub configuration. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L90:90)

- NEW: `blob: Add support for access and improve s3 driver` — v0.10.2 enhanced the blob API to support access and improve the S3 driver. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L107:107)

- NEW: `db: Add drizzle-orm/neon-http support` — v0.10.2 added support for `drizzle-orm/neon-http`. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L108:108)

- FIX: `types: Properly export ModuleHooks` — v0.10.4 fixed the export of `ModuleHooks`. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L67:67)

- NEW: `db: Add ts declaration for hub:db:schema` — v0.10.4 added TypeScript declarations for `hub:db:schema`. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L68:68)

- NEW: `types: Export HubBlob interface for external use` — v0.9.1 explicitly exported the `HubBlob` interface for external use. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L172:172)

- NEW: `db: Support Nitro useDatabase()` — v0.8.16 added support for Nitro's `useDatabase()` API. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L493:493)

- NEW: `database: Add support for multiple database migrations directories` — v0.8.12 added support for multiple database migrations directories. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L617:617)

- NEW: `Add Open API tab in Nuxt Devtools with Scalar` — v0.8.11 added an Open API tab in Nuxt Devtools. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L632:632)

- NEW: `cache: Add support for swr detection` — v0.8.7 added support for SWR (Stale-While-Revalidate) detection in cache. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L724:724)

- NEW: `blob: Add createCredentials() to support presigned URLs` — v0.7.32 added `createCredentials()` for presigned URLs in blob storage. [source](./.skilld/repos/nuxt-hub/core/releases/CHANGELOG.md:L347:347)

**Also changed:** `db: Generate schema types during prepare` v0.10.6 · `db: Create package.json during prepare` v0.10.6 · `db: Resolve Nuxt aliases in schema bundling` v0.10.6 · `db: Use libsql in dev mode when cloudflare preset is set` v0.10.5 · `db: Use dynamic import for migrations plugin` v0.10.5 · `db: Update neon-http connection string format in setup.ts` v0.10.4 · `db: Pass mode to drizzle for mysql` v0.10.3 · `db: Lazy D1/Hyperdrive binding access` v0.10.1 · `db: Setup config relative path on windows` v0.10.1 · `Add no_bundle mode` v0.10.1 · `types: Add missing type definition for databaseMigrationsDirs` v0.9.1 · `migrations: Do not return after first successful migrate` v0.9.1 · `types: Add exports in package.json` v0.8.23 · `migrations: Respect for loop for remote db migrations` v0.8.13 · `api: Disable cache and prerender on /api/_hub/**` v0.8.11 · `vectorize: Return undefined instead of throwing in dev with no remote` v0.8.10 · `blob: Handle pdf type correctly in ensureBlob` v0.8.9 · `migration: Invalid behavior while using -- or /* */ inside column string` v0.8.9 · `blob: Missing content type on complete for multipart upload` v0.8.19 · `ai: Properly handle error data on streams` v0.8.19 · `Support upcoming nitro version` v0.8.17 · `blob: Return null for get() with remote enabled` v0.8.16 · `Fixes: Split sql trigger statements as a single query` v0.8.16 · `blob: Expose more data` v0.7.36 · `cache: Support batch delete` v0.7.35 · `blob: Support customMetadata in proxy on put()` v0.7.3 · `Add hubAI()` v0.7.2

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Prefer NuxtHub v0.10's multi-cloud and self-hosting approach over Cloudflare-exclusive deployments — provides greater flexibility and control [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#philosophy-shift)
- Configure database by specifying the SQL dialect in `hub.db` in `nuxt.config.ts` (e.g., `'sqlite'`, `'postgresql'`, `'mysql'`) for proper initialization [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#database)
- Organize database schema and migration files in `server/db/` — ensures compatibility with v0.10's directory structure [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#directory-structure)
- Access the database using the auto-imported `db` instance from `hub:db` with Drizzle ORM syntax for type safety and modern querying [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#database-access)
- Define database schemas using Drizzle ORM syntax within `server/db/schema.ts` and generate migrations with `npx nuxt db generate` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#schema-definition)
- Access Blob storage using the auto-imported `blob` instance from `hub:blob` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#blob-access)
- Access KV storage using the auto-imported `kv` instance from `hub:kv` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#kv-access)
- For Cloudflare deployments, use auto-configuration by specifying resource IDs in `nuxt.config.ts` (`hub.db.connection`, `hub.kv.namespaceId`, `hub.blob.bucketName`) — this auto-generates `wrangler.json` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#option-a-auto-configuration-recommended)
- Migrate AI/AutoRAG functionality from `hubAI()` to the AI SDK with the Workers AI Provider for broader compatibility [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#ai-autorag)
- Replace `npx nuxthub deploy` with provider-specific deployment methods (e.g., `wrangler deploy` for Cloudflare, `vercel deploy` for Vercel) for self-hosting [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/1.getting-started/4.migration.md#nuxthub-cli)
- Leverage multiple schema files and Nuxt layers to organize and extend database schemas, especially for modules [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/2.database/2.schema.md#schema-files)
- Share Drizzle ORM-inferred types with the Vue application by creating type files in `shared/types/` (e.g., `db.ts`) using `$inferSelect` and `$inferInsert` for client-side type safety [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/2.database/2.schema.md#sharing-types-with-vue)
- Populate the database with initial data using Nitro Tasks by enabling `experimental.tasks` in `nitro` config and defining a seed task in `server/tasks/` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/2.database/2.schema.md#database-seed)
- Always import the database client using `@nuxthub/db` instead of `hub:db` (legacy virtual module) to ensure compatibility with both Nuxt server routes and external bundlers like Workflow [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/2.database/3.query.md#recommended-nuxthubdb)
- Rely on the auto-generated `@nuxthub/db` package for database client and schema, which provides universal compatibility, type-safety, and automatic synchronization during development and build, without needing to add it to `package.json` [source](./.skilld/references/@nuxthub/core@0.10.7/docs/content/docs/2.database/3.query.md#how-it-works)

<!-- /skilld:best-practices -->

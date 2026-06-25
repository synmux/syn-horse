---
name: drizzle-kit-skilld
description: 'ALWAYS use when writing code importing "drizzle-kit". Consult for debugging, best practices, or modifying drizzle-kit, drizzle kit, drizzle-orm, drizzle orm.'
metadata:
  version: 0.31.10
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# drizzle-team/drizzle-orm `drizzle-kit@0.31.10`

**Tags:** mysql-fixes: 0.16.9-dae8c3d, introspect-fixes: 0.17.0-7c10593, dan: 0.17.1-609a4f0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p drizzle-kit` instead of grepping `.skilld/` directories. Run `skilld search --guide -p drizzle-kit` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: PostgreSQL DDL generation (`drizzle-kit`) - Starting from v0.30.0, the PostgreSQL dialect no longer includes `IF NOT EXISTS`, `$DO`, or similar statements in generated DDL, aligning its behavior with other dialects. This may cause previously ignored incorrect DDL statements to fail. [source](./.skilld/repos/drizzle-team/drizzle-orm/releases/drizzle-kit@0.30.0.md#drizzle-kit@0.30.0)

- NEW: `dialect: 'singlestore'` in `defineConfig` - Added support for SingleStore dialect in v0.29.0. Users can now specify `'singlestore'` as a dialect option. [source](./.skilld/repos/drizzle-team/drizzle-orm/releases/drizzle-kit@0.29.0.md#new-dialects)

- NEW: `driver: 'durable-sqlite'` for `sqlite` dialect in `defineConfig` - Added support for SQLite Durable Objects driver in v0.29.0. This new driver can be used with the `sqlite` dialect. [source](./.skilld/repos/drizzle-team/drizzle-orm/releases/drizzle-kit@0.29.0.md#new-drivers)

**Also changed:** Enum DDL generation improvements in v0.31.0 · `esbuild` upgraded to `0.25.2` in v0.31.0

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Initialize Drizzle with your full schema object (or spread multiple schema files) when using relational queries to ensure all tables and relations are available. [source](./.skilld/docs/docs/rqb.md:L132-L135)

- When using relational queries with PlanetScale, explicitly set the `mode` to `'planetscale'` during Drizzle initialization due to its lack of lateral join support. [source](./.skilld/docs/docs/rqb.md:L229-L246)

- For the Drizzle relational query API, ensure all table and relation definitions are provided during `drizzle()` initialization using the `schema` option. [source](./.skilld/docs/docs/rqb.md:L251-L255)

- To change a generated column's expression in MySQL/PostgreSQL, you must drop the column, push the changes, and then re-add the column with the new expression. Drizzle-kit ignores direct modifications due to database-side complexities. [source](./.skilld/docs/docs/generated-columns.md:L367-L370)

- For SQLite, changing a generated column's expression requires dropping and recreating the entire table, due to SQLite limitations. [source](./.skilld/docs/docs/generated-columns.md:L504-L509)

- When using `SELECT` statements within an `upsert` clause, always include a `WHERE` clause, even if it's `WHERE true`, to avoid parsing ambiguities. [source](./.skilld/docs/docs/insert.md:L424-L427)

- Always define Drizzle Kit configurations in `drizzle.config.ts` to centralize settings for commands like `push`, `generate`, and `migrate`, enabling consistent and type-safe configurations. [source](./.skilld/docs/docs/drizzle-kit-push.md:L165-L174)

- Always wrap your Drizzle Kit configuration object with `defineConfig` (imported from `drizzle-kit`) to enable type inference and ensure valid configuration options. [source](./.skilld/docs/docs/drizzle-config-file.md:L82-L86)

- Organize your Drizzle schema into multiple files (e.g., by feature or entity) and use a glob pattern (`./src/schema/*` or `./src/**/schema.ts`) in the `schema` config option to allow for better modularity and maintainability. [source](./.skilld/docs/docs/drizzle-config-file.md:L495-L511)

- Use the `out` parameter in `drizzle.config.ts` to define a specific output folder for migration files, especially in projects with multiple database schemas, to maintain clear separation. [source](./.skilld/docs/docs/drizzle-config-file.md:L348-L352)

- Leverage multiple `drizzle-kit` configuration files (e.g., `drizzle-dev.config.ts`, `drizzle-prod.config.ts`) and specify them with `--config` flag when running commands, to manage different database stages or multiple databases within the same project. [source](./.skilld/docs/docs/drizzle-config-file.md:L268-L271)

- For vendor-specific databases like AWS Data API, PGLite, or Cloudflare D1, explicitly declare the `driver` in `drizzle.config.ts` even if Drizzle Kit attempts to auto-detect, to ensure correct connection parameters are used. [source](./.skilld/docs/docs/drizzle-config-file.md:L669-L672)

- Enable `strict: true` in your `drizzle.config.ts` for `drizzle-kit push` commands in production or shared environments. This prompts for confirmation before applying SQL changes, preventing accidental modifications. [source](./.skilld/docs/docs/drizzle-config-file.md:L975-L977)

- Utilize `tablesFilter`, `schemaFilter`, and `extensionsFilters` in `drizzle.config.ts` to precisely control which database entities Drizzle Kit manages, especially in multi-project, multi-schema, or multi-tenant environments. This helps avoid unintended modifications and ignores external/system tables. [source](./.skilld/docs/docs/drizzle-config-file.md:L1040-L1044)
<!-- /skilld:best-practices -->

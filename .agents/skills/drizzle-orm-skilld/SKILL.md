---
name: drizzle-orm-skilld
description: 'ALWAYS use when writing code importing "drizzle-orm". Consult for debugging, best practices, or modifying drizzle-orm, drizzle orm.'
metadata:
  version: 0.45.2
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# drizzle-team/drizzle-orm `drizzle-orm@0.45.2`

**Tags:** docs-1: 0.14.2-c7344a5, feature/pg-aws-dataapi: 0.15.1-2b4d90d, 174/merge: 0.19.0-ac3f325

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p drizzle-orm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p drizzle-orm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `drizzle-kit` migrations folder structure changed — `journal.json` removed, SQL files and snapshots grouped into separate migration folders, and `drizzle-kit drop` command removed. This affects migration workflow. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/upgrade-v1.md#step-1---run-drizzle-kit-up)

- BREAKING: Validator packages imports changed — `drizzle-zod`, `drizzle-valibot`, `drizzle-typebox`, `drizzle-arktype` are no longer separate packages. They are now imported directly from `drizzle-orm` (e.g., `drizzle-orm/zod`). [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/upgrade-v1.md#step-2---update-validator-packages-imports)

- BREAKING: Relational Queries V1 to V2 migration — significant changes in how relations are defined and queried. This includes the introduction of `defineRelations` and changes to `where` and `orderBy` syntax. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/upgrade-v1.md#step-3---update-relational-queries-to-v2)

- BREAKING: Relations Schema Definition changed — previously, relations were specified per table; now `defineRelations` allows defining all relations in one place. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#what-is-working-differently-from-v1)

- BREAKING: `drizzle()` `mode` option removed — `mode: "planetscale"` or `mode: "default"` are no longer needed for MySQL dialects. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#no-modes-in-drizzle)

- BREAKING: `fields` and `references` renamed to `from` and `to` — in `one` and `many` relation definitions. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#from-and-to-upgrades)

- BREAKING: `relationName` renamed to `alias` — in `one` relation definitions. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#relationname---alias)

- BREAKING: `where` statements in queries changed from function to object syntax (e.g., `where: { id: 1 }`). [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#where-is-now-object)

- BREAKING: `orderBy` statements in queries changed from function to object syntax (e.g., `orderBy: { id: "asc" }`). [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#orderby-is-now-object)

- BREAKING: `db.query` now refers to RQBv2 syntax, RQBv1 syntax moved to `db._query`. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#step-2-replace-your-queries-to-_query)

- BREAKING: Internal type signature changes — `migrator`, `session`, `transaction`, `driver`, and `DrizzleConfig` now include `TRelations` and `TTablesConfig` generic arguments. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#internal-changes)

- BREAKING: Entities like `Relation`, `Relations`, `One`, `Many` moved from `drizzle-orm` to `drizzle-orm/_relations`. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#internal-changes)

- BREAKING: `dialect-core/query-builders/query` files moved to `dialect-core/query-builders/_query` (e.g., `RelationalQueryBuilder` to `_RelationalQueryBuilder`). [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#internal-changes)

- NEW: `defineRelations` and `defineRelationsPart` functions introduced for defining relations. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#one-place-for-all-your-relations)

- NEW: Simplified `many` relation definition without requiring a `one` on the other side. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#define-many-without-one)

- NEW: `optional` option in relation definitions to make related entities required at the type level. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#new-optional-option)

- NEW: `fromJson` and `forJsonSelect` functions for custom types to control data mapping in relational queries. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#custom-types-new-functions)

- NEW: `through` for many-to-many relations for simplified definition of complex relationships. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#through-for-many-to-many-relations)

- NEW: Predefined filters in relations for adding `where` clauses directly in relation definitions. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#predefined-filters)

- NEW: Filtering by relations allows filtering main query results based on related object conditions. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#filtering-by-relations)

- NEW: Using `offset` on related objects for applying `offset` to `with` clauses in queries. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#using-offset-on-related-objects)

- NEW: `drizzle-kit pull` now supports generating `relations.ts` in the new v2 syntax. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/relations-v1-v2.md#option-1-using-drizzle-kit-pull)

- NEW: Export of additional types from SQLite package, like `AnySQLiteUpdate`. [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/latest-releases/drizzle-orm-v0322.md:L114)

**Also changed:** `useLiveQuery` now forwards dependencies (fixes #2651) [source](./.skilld/references/drizzle-orm@0.45.2/docs/docs/latest-releases/drizzle-orm-v0322.md:L113)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use relational queries for efficient querying of nested relational data, avoiding multiple joins and complex data mappings. [source](./.skilld/docs/docs/rqb-v2.md:L163)

- Leverage the ESLint plugin for recommended rules to assist developers in handling crucial scenarios where type checks are impossible or error messages are challenging to understand. [source](./.skilld/docs/docs/eslint-plugin.md:L113)

- Configure `drizzleObjectName` in the ESLint plugin options to prevent false positives when other objects or classes have methods named `delete` or `update`. [source](./.skilld/docs/docs/eslint-plugin.md:L211)

- Prefer PostgreSQL Identity columns over the deprecated `serial` type for specifying sequences in your schema. [source](./.skilld/docs/docs/latest-releases/drizzle-orm-v0320.md:L189)

- Utilize nested select object syntax in joins to avoid a plethora of nullable fields and ensure smart type inference makes the whole object nullable, not individual fields. [source](./.skilld/docs/docs/joins.md:L448)

- For JSON data in SQLite, use `text('', { mode: 'json' })` instead of `blob('', { mode: 'json' })` as it supports JSON functions. [source](./.skilld/docs/docs/column-types/sqlite.md:L227)

- When dealing with many simultaneous connections to PlanetScale Postgres, route connections via PgBouncer on port `6432` for efficient connection pooling. [source](./.skilld/docs/docs/connect-planetscale-postgres.md:L322)

- Implement recommended indexing strategies for relations to optimize database performance in applications with significant data or complex queries. [source](./.skilld/docs/docs/relations-v2.md:L772)

- For many-to-many relationships, create indexes on each foreign key column individually within the junction table to optimize queries based on a single side of the relationship. [source](./.skilld/docs/docs/relations-v2.md:L936)

- Avoid using the `datetime` data type in MSSQL for new work; instead, use `time`, `date`, `datetime2`, and `datetimeoffset` for better portability, precision, and time zone support. [source](./.skilld/docs/docs/column-types/mssql.md:L809)

- In larger Effect applications, create a reusable DB layer for dependency injection, adhering to Effect’s recommended pattern. [source](./.skilld/docs/docs/connect-effect-postgres.md:L207)

- Avoid the undefined `drizzle({} as any)` API for mocking; use the proper `drizzle.mock()` API instead. [source](./.skilld/docs/docs/goodies.md:L923)

- When using upsert clauses in a SELECT statement, always include a `WHERE` clause (even `WHERE true`) to avoid parsing ambiguities. [source](./.skilld/docs/docs/insert.md:L424)

- Employ stored (or persistent) generated columns to improve query performance, as their values are stored and indexed, eliminating the need for recomputation on each query. [source](./.skilld/docs/docs/generated-columns.md:L114)

<!-- /skilld:best-practices -->

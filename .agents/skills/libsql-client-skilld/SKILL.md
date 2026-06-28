---
name: libsql-client-skilld
description: 'ALWAYS use when writing code importing "@libsql/client". Consult for debugging, best practices, or modifying @libsql/client, libsql/client, libsql client, libsql-client-ts, libsql client ts.'
metadata:
  version: 0.17.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-15
---

# tursodatabase/libsql-client-ts `@libsql/client@0.17.4`

**Tags:** next: 0.17.3-pre.2, latest: 0.17.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @libsql/client` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @libsql/client` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases. **Note:** Local documentation covers v0.14.0; v0.17.4 release notes are unavailable locally.

- NEW: `migrate()` API — v0.10.0 added dedicated migration function for both schema and regular databases [source](./.skilld/releases/CHANGELOG.md:L13:14)

- NEW: `execute(sql, args)` overload — v0.8.0-pre.1 added overload to match other SQLite SDK patterns [source](./.skilld/releases/CHANGELOG.md:L28)

- NEW: Concurrency limit option — v0.7.0 added configurable concurrency limit for parallel queries (defaults to 20) to prevent socket hangup errors [source](./.skilld/releases/CHANGELOG.md:L32:33)

- NEW: `syncInterval` config option — v0.5.3 added periodic sync support for embedded replicas [source](./.skilld/releases/CHANGELOG.md:L63:64)

- NEW: `encryptionKey` config option — v0.5.0 added encryption at rest for local database files [source](./.skilld/releases/CHANGELOG.md:L77)

- NEW: `encryptionCipher` option — v0.5.1 added cipher selection, changed default to SQLCipher [source](./.skilld/releases/CHANGELOG.md:L72:73)

- BREAKING: `batch()` parameter order — v0.3.0 moved transaction mode to second parameter; v0.2.1 introduced TransactionMode argument [source](./.skilld/releases/CHANGELOG.md:L121:122)

- BREAKING: Default transaction mode — v0.3.0 changed default from "immediate" to "deferred"; v0.2.1 had previously changed it to "immediate" [source](./.skilld/releases/CHANGELOG.md:L122:123,L134)

- BREAKING: `./hrana` import removed — v0.2.0 removed `./hrana` import path, added `./ws` for WebSocket-only client [source](./.skilld/releases/CHANGELOG.md:L142)

- NEW: `@libsql/client/web` conditional export — v0.3.2 added conditional exports redirecting to web module on edge platforms [source](./.skilld/releases/CHANGELOG.md:L116)

- NEW: `Config.fetch` option — v0.3.2 (and refined in v0.3.1) added support for overriding fetch implementation [source](./.skilld/releases/CHANGELOG.md:L117)

- NEW: `ResultSet.toJSON()` method — v0.3.1 added JSON serialization support [source](./.skilld/releases/CHANGELOG.md:L115)

- NEW: `intMode` config field — v0.2.2 added choice between numbers, bigints, or strings for SQLite integers [source](./.skilld/releases/CHANGELOG.md:L127)

- BREAKING: `Value` type includes `bigint` — v0.2.0 changed Value type to support bigint for future integer handling [source](./.skilld/releases/CHANGELOG.md:L141)

- NEW: Interactive transactions over HTTP — v0.2.0 added support via hrana-client 0.4 [source](./.skilld/releases/CHANGELOG.md:L138)

- BREAKING: `libsql:` URL protocol changed — v0.2.0 switched from WebSockets to HTTP [source](./.skilld/releases/CHANGELOG.md:L140)

- NEW: `?tls=0` query parameter — v0.2.0 added option to disable TLS for local `libsql:` URLs [source](./.skilld/releases/CHANGELOG.md:L139)

- BREAKING: Node requirement — v0.6.0 bumped hrana client and now requires Node 18+ [source](./.skilld/releases/CHANGELOG.md:L45:46)

- NEW: `@libsql/client/node` explicit import — v0.3.2 added explicit Node.js-specific module export [source](./.skilld/releases/CHANGELOG.md:L111)

- NEW: `Client.protocol` property — v0.3.0 added property to identify which protocol the client uses [source](./.skilld/releases/CHANGELOG.md:L123)

**Also changed:** `batch()` schema change wait option v0.6.1 · `embedded replica sync WAL path fix v0.8.1 · wasm transaction fix v0.8.0-pre.1 · `cache=private|shared`parameter v0.8.0-pre.1 · hrana 0.5 Hrana 3 support v0.3.2 · libsql package replacement for better-sqlite3 v0.3.3 · Bun support v0.3.3 · Hrana 2 default v0.3.4 · column introspection`ResultSet.columnTypes` v0.3.5 · connection reuse optimization v0.3.5`

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use batch operations for multiple statements rather than individual `execute()` calls to ensure atomicity and simplify transaction handling — the backend commits all changes on success or rolls back entirely on any failure [source](./.skilld/docs/sdk/ts/reference.md#batch-transactions)

- Prefer batch transactions over interactive transactions for atomic operations — interactive transactions lock the database for writing (with a 5-second timeout) which can degrade performance on high-latency databases [source](./.skilld/docs/sdk/ts/reference.md#interactive-transactions)

- Use transaction mode `"read"` for read-only workloads to enable parallel execution; use `"write"` for any writes (which cannot operate in parallel on replicas) [source](./.skilld/docs/sdk/ts/reference.md#transaction-modes)

- Paginate large result sets with `LIMIT` and `OFFSET` to avoid `RESPONSE_TOO_LARGE` errors — do not attempt to fetch millions of rows in a single query [source](./.skilld/issues/issue-191.md)

- Create a new client instance per application runtime (serverless function, server instance, etc.) rather than reusing a long-lived global client, which can cause stale connection issues and "invalid baton" errors [source](./.skilld/issues/issue-119.md)

- Configure the `concurrency` option to match your workload — defaults to 20 concurrent requests, which may need tuning for high-throughput or resource-constrained environments [source](./.skilld/docs/sdk/ts/reference.md#concurrency)

- Use `@libsql/client/web` subpath for edge runtime deployments (Cloudflare Workers, Vercel Edge, Deno Deploy), and use the main `@libsql/client` import for Node.js and server environments [source](./.skilld/docs/sdk/ts/reference.md#local-development)

- For new projects requiring local-first sync with bidirectional changes, use `@tursodatabase/sync` instead of embedded replicas — it provides explicit `push()` / `pull()`, lower bandwidth, and better multi-writer convergence [source](./.skilld/docs/features/embedded-replicas/introduction.md#how-it-works)

- Call `client.sync()` explicitly or configure `syncInterval` for periodic syncing with embedded replicas; never open the local database file externally during sync to avoid data corruption [source](./.skilld/docs/features/embedded-replicas/introduction.md#periodic-sync)

- Use Drizzle ORM with `drizzle-orm/libsql` as the primary ORM integration — it provides the best developer experience and is officially supported, whereas Prisma requires additional adapter setup [source](./.skilld/docs/sdk/ts/orm/drizzle.md)

- Store database credentials in Nuxt's `runtimeConfig` and access them via `useRuntimeConfig()` in server routes to keep secrets out of client-side code [source](./.skilld/docs/sdk/ts/guides/nuxt.md#configure-variables-inside-nuxts-runtime-config)

- Use named placeholders (`:name`, `@name`, or `$name`) instead of positional (`?`) placeholders in hand-written SQL to improve readability and reduce parameter order errors [source](./.skilld/docs/sdk/ts/reference.md#placeholders)

- Do not use interactive transactions for high-concurrency workloads — they serialize write access and timeout after 5 seconds, making them unsuitable for busy applications where `batch()` is preferable [source](./.skilld/docs/sdk/ts/reference.md#interactive-transactions)

- For embedded replicas, ensure periodic sync runs in the background on application startup or at regular intervals (e.g., every 5 minutes) rather than on-demand in request handlers, to maintain consistency without blocking user requests [source](./.skilld/docs/features/embedded-replicas/introduction.md#things-to-know)

<!-- /skilld:best-practices -->

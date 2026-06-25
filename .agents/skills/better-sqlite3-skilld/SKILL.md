---
name: better-sqlite3-skilld
description: 'ALWAYS use when writing code importing "better-sqlite3". Consult for debugging, best practices, or modifying better-sqlite3, better sqlite3.'
metadata:
  version: 12.11.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-15
---

# WiseLibs/better-sqlite3 `better-sqlite3@12.11.1`

**Tags:** latest: 12.11.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p better-sqlite3` instead of grepping `.skilld/` directories. Run `skilld search --guide -p better-sqlite3` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

better-sqlite3 v12.11.1 maintains API stability. No breaking, deprecated, or renamed APIs were found in the v12.x release history. Recent releases focus on infrastructure updates: bundled SQLite version upgrades (v3.50.2 → v3.53.2), prebuilt binary support for new Node.js and Electron versions, and internal V8 compatibility fixes.

**SQLite capability update:** v12.10.0+ includes SQLite compiled with `SQLITE_ENABLE_PERCENTILE`, enabling window aggregate functions (PERCENT_RANK, CUME_DIST, NTILE) for analytical queries [source](./.skilld/docs/compilation.md:L72).

**Node.js support:** v12.8.0+ requires Node.js v20 or later [source](./.skilld/releases/v12.8.0.md:L10).

No user-facing API migrations required for upgrading within v12.x.

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `.transaction()` for grouped operations rather than manual `BEGIN`/`COMMIT` — automatic rollback on error, nested savepoint support, and deferred/immediate/exclusive variants prevent deadlocks under concurrent load [source](./.skilld/docs/api.md:L55:96)

- Enable WAL mode on database open to dramatically improve concurrent read/write performance in multi-process or multi-thread scenarios — default journal mode has poor concurrent throughput [source](./.skilld/docs/performance.md#checkpoint-starvation)

- Create a single prepared statement per distinct dynamic column/table and reuse it — SQLite only binds data values, not identifiers, so prepared statements with dynamic columns must be predetermined and selected at runtime [source](./.skilld/discussions/discussion-1132.md)

- Prefer `.iterate()` when processing large result sets to stream results one row at a time, avoiding memory bloat from loading entire result arrays into RAM [source](./.skilld/docs/api.md:L478:497)

- Use `json_each()` for dynamic `IN` clauses instead of generating parameter placeholders — avoids SQLite's hardcoded parameter limits and allows reusing prepared statements across variable-length lists [source](./.skilld/discussions/discussion-1256.md)

- Apply `INTEGER PRIMARY KEY AUTOINCREMENT` to ID columns to reuse SQLite's native `rowid` and prevent ID reuse after deletion [source](./.skilld/docs/tips.md:L5:12)

- Call `.safeIntegers()` on statements that return 64-bit integers to receive `BigInt` instead of lossy JavaScript numbers — database state is corrupted silently if large IDs overflow [source](./.skilld/docs/integer.md:L24:42)

- Use `.raw()` mode with `.columns()` when retrieving very high row counts for performance — arrays are faster to construct than objects, and column metadata is recovered separately [source](./.skilld/docs/api.md:L531:578)

- Register user-defined functions deterministically where possible — set `options.deterministic = true` to let SQLite cache results and optimise execution [source](./.skilld/docs/api.md:L176:201)

- Store dates as millisecond timestamps (JavaScript convention) or ISO-8601 strings, not seconds — SQLite has no native date type and its date functions favour string formats; choose consistency with your application's time representation [source](./.skilld/discussions/discussion-1129.md)

- Enable `PRAGMA foreign_keys = ON` explicitly — foreign key constraints are disabled by default in SQLite for backwards compatibility, even after declaration [source](./.skilld/docs/tips.md:L20:35)

- Avoid mixing manual transactions with `.transaction()` — never run raw `COMMIT` or `ROLLBACK` inside a transaction function, as SQLite can rollback silently on `ON CONFLICT` or certain errors and subsequent statements will execute outside the transaction [source](./.skilld/docs/api.md:L97:112)

- Use `.bind()` to permanently bind parameters when executing the same statement many times with identical values — improves performance by skipping parameter rebinding on each execution [source](./.skilld/docs/api.md:L582:595)

- Configure `timeout` appropriately (default 5000ms) when opening the database in multi-process scenarios — prevents long hangs on `SQLITE_BUSY` errors when other processes hold locks [source](./.skilld/docs/api.md:L24:45)

- Use virtual tables (`.table()`) for computed, read-only result sets like filesystem views or regex matches — computed dynamically without storing, and support table-valued functions with parameters [source](./.skilld/docs/api.md:L256:365)

- Defer long-running queries to worker threads to avoid blocking the main event loop — use the pool pattern from the docs with message-passing to SQLite instances in dedicated threads [source](./.skilld/docs/threads.md:L1:97)

- Call `.close()` on database handles before process exit to flush WAL checkpoints and release file locks — prevents data loss and allows clean reconnection on restart [source](./.skilld/docs/api.md:L386:395)
<!-- /skilld:best-practices -->

---
name: better-sqlite3-skilld
description: 'ALWAYS use when writing code importing "better-sqlite3". Consult for debugging, best practices, or modifying better-sqlite3, better sqlite3.'
metadata:
  version: 12.10.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# WiseLibs/better-sqlite3 `better-sqlite3@12.10.0`

**Tags:** latest: 12.10.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p better-sqlite3` instead of grepping `.skilld/` directories. Run `skilld search --guide -p better-sqlite3` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

better-sqlite3 v12.x maintains exceptional API stability. The library's core API surface (`.run()`, `.all()`, `.get()`, `.iterate()`, `.prepare()`, `.transaction()`, etc.) is unchanged from v11.x. Recent versions focus on platform compatibility, bundled SQLite updates, and Node.js/Electron version support changes rather than user-facing API modifications.

### Breaking Changes from v11 → v12

- BREAKING: `Database#transaction()` — now explicitly rejects functions that return Promises, including `async` functions. Transactions must be synchronous; attempting to use async code will throw an error. This was enforced in v11.10.0 and remains in effect in v12.x [source](./.skilld/releases/v11.10.0.md:L11)

### Runtime / Platform Changes (v12.x)

These are not API changes but affect which Node.js and Electron versions can use the library:

- BREAKING: Node.js v18 no longer supported — dropped in v12.0.0, further restricted to v20+ in v12.8.0 [source](./.skilld/releases/v12.0.0.md:L10) [source](./.skilld/releases/v12.8.0.md:L10)

- BREAKING: Electron v26, v27, v28 no longer supported in v12.0.0 [source](./.skilld/releases/v12.0.0.md:L10)

**Also unchanged:** `.backup()` · `.serialize()` · `.pragma()` · `.function()` · `.aggregate()` · `.table()` · `.loadExtension()` · `.bind()` · `.pluck()` · `.expand()` · `.raw()` · `.columns()` · Statement methods · Database properties (`.open`, `.inTransaction`, `.readonly`, `.memory`, `.name`)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## better-sqlite3 Best Practices

## Best Practices

- Enable WAL mode immediately in production applications to dramatically improve concurrent read/write performance — without WAL, concurrent access can be extremely slow due to SQLite's locking behaviour [source](./.skilld/docs/performance.md#a-note-about-durability)

- Monitor and manage WAL file size using `wal_checkpoint(RESTART)` when accessed from multiple processes or threads — otherwise the WAL file grows unbounded, causing disk bloat and degraded performance [source](./.skilld/docs/performance.md#checkpoint-starvation)

- Wrap multi-statement operations in `.transaction()` functions rather than manual `BEGIN`/`COMMIT` for automatic ACID guarantees and automatic rollback on exceptions [source](./.skilld/docs/api.md#transactionfunction---function)

- Nest transaction functions to create savepoints automatically — inner transactions become savepoints that roll back independently without affecting the outer transaction [source](./.skilld/docs/api.md#transactionfunction---function)

- Use `.pragma()` method instead of raw prepared statements for PRAGMA execution — this normalizes odd behaviour and returns consistent results [source](./.skilld/docs/api.md#pragmastring-options---results)

- Call `.bind()` permanently on statements executed repeatedly with identical parameters — this is faster than binding at execution time and simplifies code [source](./.skilld/docs/api.md#bindbindparameters---this)

- Use `.iterate()` instead of `.all()` when processing large result sets — this streams rows one-by-one instead of materialising the entire result set in memory [source](./.skilld/docs/api.md#iteratebindparameters---iterator)

- Use `.raw().iterate()` for extremely high-row-count queries — raw mode returns arrays instead of objects, reducing memory overhead and improving performance [source](./.skilld/docs/api.md#rawtogglestate---this)

- Use `INTEGER PRIMARY KEY AUTOINCREMENT` as the primary key — this reuses SQLite's built-in `rowid` for performance and ensures deleted row IDs are never reused [source](./.skilld/docs/tips.md#creating-good-tables)

- Remember that `DEFAULT` values only apply when no value is specified — explicitly passing `NULL` bypasses the default, which is often unexpected [source](./.skilld/docs/tips.md#default-values)

- Add `NOT NULL` to foreign key columns to enforce referential constraints — without it, the foreign key constraint is silently bypassed when the child column is `NULL` [source](./.skilld/docs/tips.md#foreign-keys)

- Use worker threads for very slow CPU-bound queries to avoid blocking the main thread — spawn a thread pool and queue queries asynchronously for background execution [source](./.skilld/docs/threads.md)

- Enable `.safeIntegers()` on the database or individual statements when handling 64-bit integers — by default integers are returned as JavaScript numbers, which lose precision beyond `2^53 - 1` [source](./.skilld/docs/integer.md#getting-bigints-from-the-database)

- Use millisecond timestamps (JavaScript's native `Date.now()` format) as the canonical timestamp storage — if mixing timezones, adopt an "\_ms" suffix convention to distinguish millisecond values from other timestamp formats [source](./.skilld/repos/WiseLibs/better-sqlite3/discussions/discussion-1129.md)
<!-- /skilld:best-practices -->

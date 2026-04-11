---
name: libsql-client-skilld
description: 'ALWAYS use when writing code importing "@libsql/client". Consult for debugging, best practices, or modifying @libsql/client, libsql/client, libsql client, libsql-client-ts, libsql client ts.'
metadata:
  version: 0.17.2
  generated_at: 2026-04-11
---

# tursodatabase/libsql-client-ts `@libsql/client@0.17.2`

**Tags:** next: 0.15.0-pre.3, latest: 0.17.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @libsql/client` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @libsql/client` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## Plan: Generate \_API_CHANGES.md for @libsql/client v0.17.2

## Context

The `@libsql/client` CHANGELOG only covers up to v0.12.0, and GitHub releases only list v0.14.0 (with empty notes). Issue #340 confirms v0.16/v0.17 release notes are missing entirely. Many recent APIs are only discoverable by diffing the `@libsql/core/api.d.ts` type definitions against the CHANGELOG.

## Research Complete

All relevant files have been read:

- `releases/_INDEX.md` — only 1 release (v0.14.0, empty)
- `releases/CHANGELOG.md` — covers v0.2.0 through v0.12.0
- `@libsql/core/lib-esm/api.d.ts` — full current API surface (v0.17.2)
- `@libsql/core/lib-esm/config.d.ts` — expanded config internals
- `pkg/lib-esm/*.d.ts` — all client implementations (node, web, http, ws, sqlite3, hrana)
- `issues/issue-339.md` — v0.17.0 XMLHttpRequest regression
- `issues/issue-340.md` — missing v0.16/v0.17 changelogs
- `docs/sdk/ts/reference.md` — current documentation

## Identified API Changes (20 items)

### NEW APIs (LLMs won't know about these)

1. `client.migrate(stmts)` — v0.10.0, schema migrations with FK disabled
2. `execute(sql, args)` overload — v0.8.0, convenience shorthand
3. `Config.concurrency` — v0.7.0, parallel request limit
4. `Config.syncInterval` — v0.5.3, periodic embedded replica sync
5. `Config.encryptionKey` — v0.5.0, encryption at rest
6. `Config.offline` — undocumented, enables offline writes
7. `Config.readYourWrites` — undocumented, consistency option
8. `Config.remoteEncryptionKey` — undocumented, Turso Cloud encryption
9. `client.reconnect()` — undocumented, reconnect after close
10. `LibsqlBatchError` — undocumented, batch-specific error with `statementIndex`
11. `batch()` tuple syntax `[string, InArgs?]` — undocumented shorthand
12. `LibsqlError.extendedCode` and `.rawCode` — extended error codes

### BREAKING changes

13. `batch()` parameter order — v0.3.0, mode is 2nd param not 1st
14. Default transaction mode — v0.3.0 changed to "deferred"
15. `./hrana` import removed — v0.2.0, replaced with `./ws`
16. Node 18+ required — v0.6.0
17. v0.17.0 XMLHttpRequest regression on Cloudflare Pages

### DEPRECATED

18. `transaction()` without mode — deprecated per type definition JSDoc
19. `encryptionCipher` option — was in v0.5.1 CHANGELOG, absent from current types

### Other

20. `Replicated` return type from `sync()` — `{ frame_no, frames_synced } | undefined`

## Output

Write to: `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/libsql-client-skilld/.skilld/_API_CHANGES.md`

Then validate with: `skilld validate <path>`

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Plan: Generate \_BEST_PRACTICES.md for @libsql/client v0.17.2

## Context

Generating a SKILL.md best practices section for the `@libsql/client` TypeScript package. The goal is to extract 14 non-obvious, documented patterns that an LLM wouldn't already know, sourced from local `.skilld/` reference files.

## Research Summary

Read and verified:

- `@libsql/core/api.d.ts` — Config, Client, Transaction, ResultSet, TransactionMode, LibsqlError, LibsqlBatchError types
- `@libsql/core/config.d.ts` — ExpandedConfig, expandConfig
- `.skilld/pkg/lib-esm/node.d.ts` and `web.d.ts` — confirmed exports
- `.skilld/docs/sdk/ts/reference.md` — full TypeScript SDK reference
- `.skilld/docs/features/embedded-replicas/introduction.md` — sync, offline, encryption, read-your-writes
- `.skilld/docs/features/ai-and-embeddings.md` — vector types and DiskANN indexing
- `.skilld/docs/local-development.md` — file: URLs, turso dev
- `.skilld/docs/sync/usage.md` — push/pull/checkpoint sync model
- `.skilld/docs/sync/conflict-resolution.md` — last push wins
- `.skilld/docs/sync/checkpoint.md` — WAL compaction
- `.skilld/releases/CHANGELOG.md` — version history with breaking changes
- `.skilld/issues/` — #119 (baton errors), #140/#229 (:memory: transactions), #191 (RESPONSE_TOO_LARGE), #195 (WHERE IN), #288 (busy_timeout), #290 (web file: URLs), #339 (v0.17 XMLHttpRequest regression)

## 14 Best Practice Items (planned)

Covering 5+ distinct areas: connection config, transactions/batches, embedded replicas/sync, error handling, query patterns, edge/serverless runtime.

1. Always specify `"write"` or `"read"` mode for `batch()` and `transaction()` — default `"deferred"` can fail on upgrade
2. Prefer `batch()` over interactive `transaction()` for atomic multi-statement ops — lower latency, avoids 5s timeout
3. Always call `transaction.close()` in a `finally` block
4. `syncInterval` is in seconds, not milliseconds
5. Import from `@libsql/client/web` for edge runtimes (Cloudflare Workers, Vercel Edge)
6. `@libsql/client/web` does not support `file:` URLs
7. Set `intMode: "bigint"` if integer columns may exceed 2^53-1
8. Use `migrate()` instead of `batch()` for schema DDL — auto-wraps with foreign_keys=off
9. `LibsqlBatchError.statementIndex` identifies which statement failed
10. For in-memory databases with transactions, use `file::memory:?cache=shared`
11. Set `offline: true` for embedded replicas that need local writes without connectivity
12. Tune `concurrency` from default 20 based on workload
13. Use `LIMIT`/pagination for large remote result sets to avoid `RESPONSE_TOO_LARGE`
14. `readYourWrites` (default true) auto-syncs the local replica after writes

## Verification

- All source paths confirmed via Read tool
- All exports confirmed in `.d.ts` files
- Issue citations only where patterns have broad adoption or workaround is confirmed

## Output

Write to: `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/libsql-client-skilld/.skilld/_BEST_PRACTICES.md`
Then validate with `skilld validate`.

<!-- /skilld:best-practices -->

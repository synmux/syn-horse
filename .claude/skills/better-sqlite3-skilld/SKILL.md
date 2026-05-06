---
name: better-sqlite3-skilld
description: 'ALWAYS use when writing code importing "better-sqlite3". Consult for debugging, best practices, or modifying better-sqlite3, better sqlite3.'
metadata:
  version: 12.9.0
  generated_at: 2026-05-06
---

# WiseLibs/better-sqlite3 `better-sqlite3@12.9.0`

**Tags:** latest: 12.9.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p better-sqlite3` instead of grepping `.skilld/` directories. Run `skilld search --guide -p better-sqlite3` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## \_API_CHANGES.md

## better-sqlite3 v12.8.0

Latest version: **12.8.0** (2026-03-13) — [MINOR release]

### Runtime Requirements

**Changed: Node.js minimum version increased to v20**

- Previous: No explicit minimum documented in v12.0.0 (dropped v18 support)
- Current: v12.8.0 requires Node.js v20 or later
- Source: `./.skilld/releases/v12.8.0.md:L10` — "Readme: requires Node.js v20 or later"
- Impact: Code targeting Node.js v18 will fail at runtime; requires environment upgrade
- Score: 3 (deprecated/version requirement change)

### Dependency Updates

**Updated: SQLite embedded version to 3.51.3**

- From: 3.51.2 (v12.6.0)
- To: 3.51.3
- Source: `./.skilld/releases/v12.8.0.md:L11-L26` — SQLite release note regarding WAL-reset bug fixes
- Impact: Bug fixes in SQLite engine; may affect query behavior in edge cases
- Score: 2 (dependency patch, not user-facing API)

### Internal Changes

**Fixed: V8 PropertyCallbackInfo compatibility for V8 >= 12.5**

- Change: Use `HolderV2()` API instead of deprecated pattern
- Source: `././.skilld/releases/v12.8.0.md:L12` — "fix: use HolderV2() for PropertyCallbackInfo on V8 >= 12.5"
- Impact: Internal implementation detail; ensures build compatibility with newer V8 versions
- Score: 1 (internal, no user-facing API change)

---

### Major Version Changes (v12.0.0 context)

**Breaking: Node.js v18 support dropped**

- Dropped: Node.js v18, Electron v26, v27, v28
- Added: Node.js v24 support to build matrix
- Source: `./.skilld/releases/v12.0.0.md:L10` — "BREAKING CHANGE: drop EOL Node.js v18 and Electron v26, v27, and v28"
- Released: 2025-06-21 [MAJOR]
- Score: 5 (breaking runtime requirement change)

---

### Summary

Current release (v12.8.0) contains **no new user-facing APIs** or API deprecations. Changes are primarily:

- Runtime environment constraint (Node.js v20+)
- Dependency updates (SQLite 3.51.3)
- Internal V8 compatibility fixes

The most significant breaking change remains from **v12.0.0** (Node.js v18 EOL enforcement).

**Note:** This summary is based on release notes only. For complete API surface changes, internal refactoring, or behavioral modifications, use `skilld search` with full documentation access.

<!-- /skilld:api-changes -->

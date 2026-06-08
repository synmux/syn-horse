---
name: types-node-skilld
description: "ALWAYS use when writing code importing \"@types/node\". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped."
metadata:
  version: 25.9.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# DefinitelyTyped/DefinitelyTyped `@types/node@25.9.2`
**Tags:** ts2.1: 12.12.6, ts2.6: 12.12.6, ts2.0: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `AsyncLocalStorage.withScope()` — v25.9.0, returns an `AsyncLocalStorageScope` for Explicit Resource Management (using syntax support) [source](./../../../node_modules/@types/node/async_hooks.d.ts:L25)

- NEW: `crypto.argon2()` — v24.7.0 (experimental), async password hashing function using Argon2 [source](./../../../node_modules/@types/node/crypto.d.ts:L3672)

- NEW: `crypto.argon2Sync()` — v24.7.0 (experimental), synchronous password hashing using Argon2 [source](./../../../node_modules/@types/node/crypto.d.ts:L3712)

- NEW: `crypto.encapsulate()` — v24.7.0, KEM encapsulation for key exchange (supports RSA, EC, X25519, X448, ML-KEM algorithms) [source](./../../../node_modules/@types/node/crypto.d.ts:L2923)

- NEW: `crypto.decapsulate()` — v24.7.0, KEM decapsulation for shared secret recovery [source](./../../../node_modules/@types/node/crypto.d.ts:L2882)

- NEW: `fs.Utf8StreamWriter` — v24.6.0, optimized UTF-8 stream writer for efficient buffered writes [source](./../../../node_modules/@types/node/fs.d.ts:L24)

- NEW: `fs.open()` with `using` syntax support — v24.4.0, explicit resource management for file handles [source](./../../../node_modules/@types/node/fs.d.ts:L24)

- NEW: `fs.Dir[Symbol.asyncDispose]` — v24.1.0, async disposal protocol for directory handles [source](./../../../node_modules/@types/node/fs.d.ts:L24)

- NEW: `SQLiteDatabase.prepare()` options `readBigInts`, `returnArrays`, `allowBareNamedParameters` — v25.5.0, control result formatting and parameter binding [source](./../../../node_modules/@types/node/sqlite.d.ts:L25)

- NEW: `SQLiteDatabase` options `defensive` flag — v25.1.0, enable defensive SQL mode to prevent database corruption [source](./../../../node_modules/@types/node/sqlite.d.ts:L25)

- NEW: SQLite limits configuration — v25.8.0, `limits` option on database creation to control resource consumption [source](./../../../node_modules/@types/node/sqlite.d.ts:L25)

- NEW: `http.globalAgent` reset function — v25.4.0, proxy configuration management for HTTP requests [source](./../../../node_modules/@types/node/http.d.ts:L25)

- NEW: HTTP request `rejectNonStandardBodyWrites` option — v25.1.0, requests without Content-Length/Transfer-Encoding initialize with ended body stream [source](./../../../node_modules/@types/node/http.d.ts:L25)

- NEW: `test()` option `skip` as value for test isolation — v25.5.0, allows skipping nested tests with isolation control [source](./../../../node_modules/@types/node/test.d.ts:L25)

- NEW: `test()` option `todo` for expected failures — v25.5.0, flag test as expected to fail with optional reason and match validation [source](./../../../node_modules/@types/node/test.d.ts:L25)

- NEW: test environment variable `NODE_TEST_WORKER_ID` — v25.8.0, exposes worker ID for parallel test coordination [source](./../../../node_modules/@types/node/test.d.ts:L25)

- DEPRECATED: `util.types.isNativeError()` — use `Error.isError()` instead (replacement is in global scope) [source](./../../../node_modules/@types/node/util/types.d.ts:L25)

- DEPRECATED: `BlobOptions` interface — renamed to `BlobPropertyBag`, old alias will be removed in future major version [source](./../../../node_modules/@types/node/buffer.d.ts:L25)

- DEPRECATED: `FileOptions` interface — renamed to `FilePropertyBag`, old alias will be removed in future major version [source](./../../../node_modules/@types/node/buffer.d.ts:L25)

**Also changed:** `crypto.fips` deprecated · `crypto.createCipher()` deprecated (SPKAC functions) · `TransferListItem` type deprecated for `Transferable` · `assert` options `skipProtoAndConstructor` new v24.9.0 · `process.signal()` alias new v25.4.0 · `util.isDeepStrictEqual()` new options v25.2.0 · `module.enableCompileCache()` constants new v25.x
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- **Enable appropriate TypeScript libs for modern Node.js features** — Use `"lib": ["ESNext"]` or specific lib entries like `"es2025.iterator"` to access async iterators and modern builtins; @types/node does not provide ES builtin definitions, TypeScript does [source](./.skilld/discussions/discussion-74504.md)

- **Use `node:` module prefix for explicit Node.js core modules** — Always import from `node:fs`, `node:path`, `node:stream` rather than bare names to ensure clarity and avoid shadowing from node_modules packages [source](./.skilld/pkg/index.d.ts:L1)

- **Prefer `Readable.from()` for converting iterables to streams** — Use `Readable.from(iterable)` to create streams from async iterables or arrays; this handles both sync and async iteration automatically [source](./.skilld/pkg/stream.d.ts:L76:85)

- **Handle callback-style errors with discriminated unions** — Node.js callback patterns often use `(error: Error | null, result?: T)` signature; check `error === null` first before accessing the result to ensure type safety [source](./.skilld/discussions/discussion-74823.md)

- **Check for null streams in child_process** — Properties like `subprocess.stdin`, `subprocess.stdout`, and `subprocess.stderr` may be `null` if the process was spawned without `stdio: 'pipe'`; always guard with null checks before using [source](./.skilld/pkg/child_process.d.ts:L42:78)

- **Use `Error.captureStackTrace()` only when hiding implementation details** — Call it inside error-handling utilities to exclude internal frames from the stack trace; set `Error.stackTraceLimit` before throwing to control stack depth [source](./.skilld/pkg/globals.d.ts:L51:68)

- **Validate encoding compatibility with execSync/spawn** — Functions like `execSync` with `{ encoding: 'utf8' }` return strings, but the error's `stdout`/`stderr` property types may not reflect this; cast or use type guards for safety [source](./.skilld/discussions/discussion-75040.md)

- **Leverage Web API stream converters in modern Node.js** — Use `Readable.toWeb()` and `Readable.fromWeb()` to bridge Node streams with Web Streams API for better interoperability [source](./.skilld/pkg/stream.d.ts:L91:102)

- **Use `buffer.isUtf8()` and `buffer.isAscii()` for safe encoding validation** — Before assuming a buffer is valid UTF-8 or ASCII, call these validators (available since v19.4.0) to prevent downstream decoding errors [source](./.skilld/pkg/buffer.d.ts:L11:20)

- **Set `end: false` in `pipe()` options only when chaining streams** — By default `pipe()` ends the destination when the source ends; set `{ end: false }` when the destination will receive data from multiple sources [source](./.skilld/pkg/stream.d.ts:L23:27)

- **Reference lib entries in tsconfig for Node.js compatibility** — @types/node uses `/// <reference lib="...">` directives; ensure your tsconfig includes at least `"lib": ["es2020"]` to pull in required DOM/Web APIs used by Node.js globals [source](./.skilld/pkg/index.d.ts:L28:32)

- **Use `NodeJS.ErrnoException` for file system error types** — Catch blocks from fs operations throw errors with `errno`, `code`, `path`, and `syscall` properties; type as `ErrnoException` to access these safely [source](./.skilld/pkg/globals.d.ts:L100:105)

- **Constrain signal types with `NodeJS.Signals`** — When handling process signals or spawning with specific signals, use the `NodeJS.Signals` union type instead of raw strings to catch typos at compile time [source](./.skilld/pkg/globals.d.ts:L1:10)

- **Prefer promise-based APIs for async operations** — Use `fs/promises`, `readline/promises`, `stream/promises` modules instead of callback variants; they integrate better with modern async/await code and provide clearer type inference [source](./.skilld/pkg/index.d.ts:L61:71)
<!-- /skilld:best-practices -->

---
name: types-node-skilld
description: "ALWAYS use when writing code importing \"@types/node\". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped."
metadata:
  version: 26.1.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# DefinitelyTyped/DefinitelyTyped `@types/node@26.1.1`
**Tags:** ts2.5: 12.12.6, ts2.6: 12.12.6, ts2.0: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @types/node v26.1.1.

### New APIs in v26.1.0

- NEW: `node:ffi` module — new Foreign Function Interface support with `dlopen()`, `dlsym()`, and `dlclose()` for dynamic library loading [source](./.skilld/pkg/ffi.d.ts:L89)

- NEW: `http.IncomingMessage.signal` — AbortSignal property for cancelling downstream work (fetch, database queries) when client disconnects [source](./.skilld/pkg/http.d.ts:L1350)

- NEW: `node:sqlite` database methods — `Database.serialize()` and `Database.deserialize()` for snapshot operations and database cloning [source](./.skilld/pkg/sqlite.d.ts:L26)

- NEW: `diagnostics_channel.Channel.store()` and `.scope()` — context-local storage for async tracing with automatic cleanup [source](./.skilld/pkg/diagnostics_channel.d.ts:L26)

- NEW: `stream/iter` iterator improvements — additional async iterator utilities for stream processing [source](./.skilld/pkg/stream/iter.d.ts)

- NEW: `node:quic` stream management — stream destruction and state tracking for QUIC protocol endpoints [source](./.skilld/pkg/quic.d.ts:L26)

- NEW: `test` module enhancements — additional test runner APIs and context support in v26.1.0 [source](./.skilld/pkg/test.d.ts)

- NEW: `v8` profiling — `SyncHeapProfileHandle` interface for synchronous heap profiling operations [source](./.skilld/pkg/v8.d.ts)

- NEW: `crypto` module HKDF API — new HKDF (HMAC-based Key Derivation Function) support in crypto operations [source](./.skilld/pkg/crypto.d.ts:L26)

### Deprecated APIs (Still Supported)

- DEPRECATED: `Buffer.new()` — since v10.0.0, use `Buffer.from()` instead [source](./.skilld/pkg/buffer.buffer.d.ts:L45)

- DEPRECATED: `Buffer.allocUnsafe()` — since v10.0.0, use `Buffer.alloc()` with secure initialization [source](./.skilld/pkg/buffer.buffer.d.ts:L50)

- DEPRECATED: `Buffer.slice()` — use `Buffer.subarray()` instead for consistent array-like semantics [source](./.skilld/pkg/buffer.buffer.d.ts:L100)

- DEPRECATED: `cluster.isMaster` — since v16.0.0, use `cluster.isPrimary` instead [source](./.skilld/pkg/cluster.d.ts:L45)

- DEPRECATED: `cluster.setupMaster()` — since v16.0.0, use `cluster.setupPrimary()` instead [source](./.skilld/pkg/cluster.d.ts:L50)

- DEPRECATED: `child_process.ExecFileOptions` — replaced with `ExecException` type union for error handling [source](./.skilld/pkg/child_process.d.ts:L120)

- DEPRECATED: `crypto.Encoding` types — will be removed, use `BufferEncoding` instead for consistent type checking [source](./.skilld/pkg/crypto.d.ts:L250)

**Also changed:** `Buffer.from()` encodings · `crypto.setFips()`/`getFips()` migration · `AsyncLocalStorage` context restoration · Stream `.iterator()` options · QUIC transport parameter validation
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Prefer `AsyncLocalStorage` over `AsyncResource` for managing execution context in async flows — the former is performant and memory-efficient, while the latter is for embedders needing fine-grained lifecycle hooks [source](./.skilld/discussions/discussion-74956.md)

- Configure TypeScript's `lib` in tsconfig.json to include ES built-in features (e.g., `"es2025.iterator"` for iterator helpers, `"ESNext"` for `Array.fromAsync`) — @types/node does not ship built-in definitions; TypeScript's compiler libs provide them [source](./.skilld/discussions/discussion-74504.md)

- Use `fs/promises` module for file operations in async contexts rather than callback-based APIs — it integrates cleanly with async/await and avoids callback nesting [source](./.skilld/pkg/index.d.ts:L38)

- Prefer `execFile()` over `exec()` in child_process — execFile is more secure by default, does not spawn a shell, and prevents command injection vulnerabilities [source](./.skilld/pkg/index.d.ts:L58)

- Set `cleanup: true` in `stream/promises` `finished()` when you need to remove dangling event listeners automatically; without it, error/end/finish/close listeners persist after the promise resolves [source](./.skilld/pkg/index.d.ts:L98)

- Type child_process encoding explicitly using `ExecFileOptionsWithStringEncoding` or `ExecFileOptionsWithBufferEncoding` — TypeScript narrows stdout/stderr to string or Buffer respectively, preventing type mismatches at runtime [source](./.skilld/pkg/index.d.ts:L58)

- Use `Error.captureStackTrace(err, Function)` to hide implementation frames from stack traces — the second parameter removes frames at and above that function, making stack traces more readable for library errors [source](./.skilld/pkg/index.d.ts:L1)

- Pass `AbortController` signal into `stream/promises` `pipeline()` to cancel processing gracefully — when aborted, the underlying pipeline is destroyed with an AbortError [source](./.skilld/pkg/index.d.ts:L98)

- Enable `captureRejections` on EventEmitter subclasses to handle promise rejections emitted during event dispatch — without it, unhandled rejections can crash the process [source](./.skilld/pkg/index.d.ts:L68)

- Use typed event maps in EventEmitter subclasses for type-safe event names and listener signatures — extend `EventMap<T>` to provide intellisense and compile-time validation [source](./.skilld/pkg/index.d.ts:L68)

- Avoid calling methods directly on objects returned by `executionAsyncResource()` — they are Node.js internal handles with undocumented APIs that may crash your application [source](./.skilld/pkg/index.d.ts:L56)

- Use promise-based APIs from `dns/promises` and `readline/promises` over callback versions when building modern async code — they integrate natively with async/await patterns [source](./.skilld/pkg/index.d.ts:L66)

- Mark callback-based APIs with `@deprecated` annotations in your TypeScript definitions if migrating a library to async patterns — this signals users to adopt promise-based alternatives [source](./.skilld/pkg/index.d.ts:L1)
<!-- /skilld:best-practices -->

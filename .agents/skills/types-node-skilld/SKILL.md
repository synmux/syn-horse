---
name: types-node-skilld
description: 'ALWAYS use when writing code importing "@types/node". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped.'
metadata:
  version: 25.9.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# DefinitelyTyped/DefinitelyTyped `@types/node@25.9.3`

**Tags:** ts2.6: 12.12.6, ts2.2: 12.12.6, ts2.4: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in @types/node v25.9.3, prioritizing recent major/minor releases.

### New APIs Added in v25.x

- NEW: `AsyncLocalStorage.withScope(store)` — experimental method added in v25.9.0 enabling automatic restoration of previous store value when disposed [source](./.skilld/pkg/async_hooks.d.ts:L562)

- NEW: `RunScope` interface (experimental) — added in v25.9.0 as the return type from `AsyncLocalStorage.withScope()`, extends `Disposable` [source](./.skilld/pkg/async_hooks.d.ts:L616)

- NEW: `RunScope.dispose()` — experimental method added in v25.9.0, explicitly ends scope and restores previous store value, idempotent [source](./.skilld/pkg/async_hooks.d.ts:L642)

- NEW: `http.setGlobalProxyFromEnv(proxyEnv?)` — function added in v25.4.0 to configure proxy settings from environment, returns restore function [source](./.skilld/pkg/http.d.ts:L2111)

- NEW: `Socket.getTypeOfService()` — method added in v25.6.0 to retrieve TOS value for IPv4 or Traffic Class for IPv6 [source](./.skilld/pkg/net.d.ts:L3134)

- NEW: `Socket.setTypeOfService(tos)` — method added in v25.6.0 to set Type of Service field for packet prioritization [source](./.skilld/pkg/net.d.ts:L3149)

- NEW: `perf_hooks.eventLoopUtilization(utilization1?, utilization2?)` — new overload added in v25.2.0 supporting difference calculation between two measurements [source](./.skilld/pkg/perf_hooks.d.ts:L4372)

- NEW: `perf_hooks.timerify(fn, options?)` — enhanced in v25.2.0 with new `TimerifyOptions` parameter for wrapping functions [source](./.skilld/pkg/perf_hooks.d.ts:L4451)

- NEW: `http.ServerOptions.optimizeEmptyRequests` — boolean option added in v25.1.0 to optimize handling of empty requests [source](./.skilld/pkg/http.d.ts:L324)

- NEW: `DatabaseLimits` interface — added in v25.8.0 for SQLite database limit configuration [source](./.skilld/pkg/sqlite.d.ts:L97)

- NEW: `Database.limits` property — readonly property added in v25.8.0 providing access to database limits [source](./.skilld/pkg/sqlite.d.ts:L439)

- NEW: module compile cache options `directory` and `portable` — added in v25.0.0 for `module.enableCompileCache()` [source](./.skilld/pkg/module.d.ts:L2215)

- NEW: `v8.SyncCPUProfileHandle` interface — added in v25.0.0 for synchronous CPU profiling [source](./.skilld/pkg/v8.d.ts:L4)

- NEW: inspector `DOMStorage` namespace functions — `domStorageItemAdded()`, `domStorageItemRemoved()`, `domStorageItemUpdated()`, `domStorageItemsCleared()` added in v25.5.0 [source](./.skilld/pkg/inspector.d.ts:L25)

### Deprecated APIs

- DEPRECATED: `util.types.isNativeError()` — use `Error.isError()` instead (native Node.js API, not @types/node specific) [source](./.skilld/pkg/util/types.d.ts:L4)

- DEPRECATED: `worker_threads.TransferListItem` type alias — prefer direct import of `Transferable` from `"node:worker_threads"` instead (removal planned in future major version) [source](./.skilld/pkg/worker_threads.d.ts:L24)

- DEPRECATED: TLS options `clientCertEngine`, `privateKeyEngine`, `privateKeyIdentifier` — engine-based certificate handling is deprecated, no replacement documented [source](./.skilld/pkg/tls.d.ts:L1)

- DEPRECATED: `punycode` module — deprecated since Node.js v7.0.0, all exported functions marked for removal [source](./.skilld/pkg/punycode.d.ts:L4)

- DEPRECATED: buffer constructor functions — `Buffer.from(string[, encoding])` replaces earlier patterns (deprecated since v10.0.0) [source](./.skilld/pkg/buffer.buffer.d.ts:L4)

- DEPRECATED: `dns.lookup()` `sort` option — use `order` option instead [source](./.skilld/pkg/dns.d.ts:L4)

- DEPRECATED: `BlobPropertyBag` and `FilePropertyBag` aliases — use canonical class-based definitions instead, removal planned for future versions [source](./.skilld/pkg/buffer.d.ts:L4)

**Also changed:** `util.deprecate()` options parameter added v25.2.0 · v25.5.0 SQLite PrepareOptions enhancements · v25.5.0 test coverage APIs · v25.9.0 process and REPL APIs · DOMStorage debugger protocol v25.5.0

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Avoid checking file existence before operations like `fs.open()` or `fs.readFile()` — handle errors directly instead, or use `fs.access()` to check existence without manipulation [source](./.skilld/pkg/fs.d.ts:L1066)

- Use the `KeyObject` API for cryptographic operations instead of passing keys as strings or buffers — provides improved security features and handles key management properly [source](./.skilld/pkg/crypto.d.ts:L2480)

- Use `pipe()` for stream data transfer instead of calling `write()` directly — respect backpressure by handling the `'drain'` event to avoid memory issues [source](./.skilld/pkg/stream.d.ts:L425)

- Configure appropriate TypeScript lib settings in `tsconfig.json` (e.g., `ESNext`, `es2025.iterator`) to enable type definitions for modern ES APIs — @types/node doesn't define these, they come from TypeScript [source](./.skilld/discussions/discussion-74956.md:L34)

- Keep HMAC key size within the block size of the underlying hash function — oversized keys reduce security and increase computation [source](./.skilld/pkg/crypto.d.ts:L2682)

- Generate initialization vectors (IVs) as unpredictable, unique, and cryptographically random values — they don't need to be secret, but their uniqueness is critical for cipher security [source](./.skilld/pkg/crypto.d.ts:L2635)

- Use `Buffer.byteLength()` to calculate `Content-Length` header values for HTTP responses — header must reflect byte count, not character count [source](./.skilld/pkg/http.d.ts:L1170)

- Call global agent setup functions like `setGlobalDispatcher()` before making HTTP requests — invoking them during active requests can cause unexpected behavior [source](./.skilld/pkg/http.d.ts:L1605)

- Use cryptographically random, unique salt values of at least 16 bytes for key derivation functions — follows NIST SP 800-132 recommendations for password-based encryption [source](./.skilld/pkg/crypto.d.ts:L2771)

- Set `process.exitCode` instead of calling `process.exit()` directly — allows graceful shutdown and proper cleanup of pending event loop work [source](./.skilld/pkg/process.d.ts:L665)

- Prefer `require()` over `process.dlopen()` for loading native modules — use `dlopen()` only when custom flags or ES module loading is specifically required [source](./.skilld/pkg/process.d.ts:L584)

- Avoid enabling the insecure HTTP parser — the flag bypasses RFC compliance checks and should only be used for legacy system compatibility [source](./.skilld/pkg/http.d.ts:L231)

- Use `EventEmitter.prototype.setMaxListeners()` to manage listener limits and prevent spurious memory leak warnings — configure appropriate limits per instance [source](./.skilld/pkg/events.d.ts:L475)

- Be aware of type-runtime mismatches when catching exceptions from `child_process.execSync()` — the `ExecException` type signature may not exactly reflect runtime error properties like `stdout` [source](./.skilld/discussions/discussion-75040.md:L16)
<!-- /skilld:best-practices -->

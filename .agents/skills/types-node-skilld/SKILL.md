---
name: types-node-skilld
description: "ALWAYS use when writing code importing \"@types/node\". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped."
metadata:
  version: 26.1.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# DefinitelyTyped/DefinitelyTyped `@types/node@26.1.0`
**Tags:** ts2.6: 12.12.6, ts2.2: 12.12.6, ts2.4: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `randomUUIDv7()` — new in v26.1.0 for generating time-based UUIDs with improved sorting properties, accepts `options?: RandomUUIDV7Options` [source](./.skilld/pkg/crypto.d.ts:L1)

- NEW: `boundedChannel()` — new in v26.1.0 in diagnostics_channel module for creating bounded tracing channels with context stores, simplifies `TracingChannel` API [source](./.skilld/pkg/diagnostics_channel.d.ts:L1)

- NEW: FFI module (`node:ffi`) — new in v26.1.0 for native library binding with functions `dlopen()`, `dlclose()`, `dlsym()`, and helper functions `toBuffer()`, `toArrayBuffer()`, `toString()` for pointer manipulation [source](./.skilld/pkg/ffi.d.ts:L1)

- NEW: `suffix` property in FFI module — v26.1.0 exports platform-specific library suffix ('dylib' on macOS, 'so' on Unix) for dynamic library paths [source](./.skilld/pkg/ffi.d.ts:L1)

- NEW: Stream iteration methods — v26.1.0 adds async iterator helpers to `stream.Readable` including `filter()`, `map()`, `take()`, `drop()`, `flatMap()` for composable stream operations [source](./.skilld/pkg/stream/iter.d.ts:L1)

- NEW: QUIC protocol support — v26.1.0 stabilizes the `node:quic` module with full APIs for QUIC sockets, sessions, streams, and connection management [source](./.skilld/pkg/quic.d.ts:L1)

- NEW: SQLite support — v26.1.0 adds `node:sqlite` module for native SQLite database operations with prepared statements and transaction support [source](./.skilld/pkg/sqlite.d.ts:L1)

- NEW: Test context enhancements — v26.1.0 adds `getTestContext()` function to retrieve current test or suite context for better test introspection [source](./.skilld/pkg/test.d.ts:L1)

- NEW: V8 heap profiling enhancements — v26.1.0 adds `SyncHeapProfileHandle` interface and synchronous heap profiling APIs for low-overhead memory profiling [source](./.skilld/pkg/v8.d.ts:L1)

- DEPRECATED: Punycode module — deprecated since v7.0.0, the bundled punycode implementation is being removed in favour of web standard `TextEncoder`/`TextDecoder` APIs [source](./.skilld/pkg/punycode.d.ts:L1)

- DEPRECATED: Readline `Interface` alias — deprecated, use direct import `import { Interface } from 'node:readline'` instead of the export alias [source](./.skilld/pkg/readline.d.ts:L1)

- DEPRECATED: TLS engine properties (`privateKeyEngine`, `privateKeyIdentifier`, `clientCertEngine`) — deprecated without explicit version marker, use modern certificate handling instead [source](./.skilld/pkg/tls.d.ts:L1)

- DEPRECATED: Crypto `FIPS` property — deprecated in favour of `crypto.setFips()` and `crypto.getFips()` functions for explicit FIPS mode control [source](./.skilld/pkg/crypto.d.ts:L1)

**Also changed:** `BoundedChannel` interface new v26.1.0 · `RunStoresScope` class new v26.1.0 · `BoundedChannelCollection` interface new v26.1.0 · FFI `exportArrayBuffer()` new v26.1.0 · FFI `exportBuffer()` new v26.1.0 · FFI `getRawPointer()` new v26.1.0 · Stream iterator `reduce()` new v26.1.0 · Stream iterator `every()` new v26.1.0 · Stream iterator `some()` new v26.1.0 · HTTP response trailer methods enhanced v26.1.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Configure `lib` in `tsconfig.json` to include `ESNext` or specific ES-level libs (`es2025.iterator`) for ES builtin types like `Array.fromAsync` and async iterator methods—@types/node does not provide these definitions, TypeScript does via lib configuration [source](./.skilld/discussions/discussion-74504.md), [source](./.skilld/discussions/discussion-74956.md)

- Prefer the `node:module/promises` variants for async operations (`fs/promises`, `timers/promises`, `dns/promises`) which return promises from the start instead of callback APIs, reducing wrapper boilerplate [source](./.skilld/pkg/fs/promises.d.ts:L1:40), [source](./.skilld/pkg/timers/promises.d.ts:L1:50)

- Use `setInterval()` from `node:timers/promises` for async iteration over intervals—it returns an async iterator instead of a raw timer ID, enabling `for await` loops without manual interval management [source](./.skilld/pkg/timers/promises.d.ts:L34:50)

- Parametrize `EventEmitter` with an event map type to enable type-safe event names and listener arguments—the generic type system validates both emit calls and listener registrations at compile time [source](./.skilld/pkg/events.d.ts:L4:56)

- Enable `captureRejections: true` in `EventEmitterOptions` to automatically handle promise rejections thrown by event listeners, preventing unhandled promise rejection crashes [source](./.skilld/pkg/events.d.ts:L33:39)

- Use `AbortController` and `Abortable` options across file system, stream, and network APIs for consistent cancellation semantics—pass `signal` from an `AbortController` to abort long-running operations [source](./.skilld/pkg/fs/promises.d.ts:L70)

- Import from `node:module` prefix instead of bare module names for explicit ESM compatibility and to work reliably in both CommonJS and ESM environments [source](./.skilld/pkg/child_process.d.ts:L1:6)

- Access Web Crypto APIs like `crypto.randomUUID()` through the Web Globals definitions included with @types/node—these are not Node-specific and appear alongside `crypto` module bindings [source](./.skilld/discussions/discussion-75082.md)

- Verify `child_process` stdio is not `null` before using `subprocess.stdin`, `subprocess.stdout`, or `subprocess.stderr`—these are conditional based on the `stdio` configuration passed at spawn time [source](./.skilld/pkg/child_process.d.ts:L42:78)

- Use `stream/promises` utilities for promise-based stream consumption instead of manual event listening—these utilities provide cleaner abstractions for reading, writing, and piping [source](./.skilld/pkg/stream/promises.d.ts)

- Use `node:util/types` runtime type guards like `isPromise()`, `isBuffer()`, and `isDate()` when runtime type discrimination is needed and TypeScript type narrowing is not sufficient [source](./.skilld/pkg/util/types.d.ts)

- Be aware that exception types from child process methods may not precisely match their declared types in all cases (e.g., `execSync` may return Buffer instead of string even when encoding is specified)—add explicit type casts when needed [source](./.skilld/discussions/discussion-75040.md)

- Use `ConstructorParameters<typeof Constructor>[0]` as a workaround to extract and type init objects when explicit type definitions are missing (e.g., `HeadersInit` from `Headers` constructor)—this pattern ensures portability across JavaScript environments [source](./.skilld/discussions/discussion-74411.md)
<!-- /skilld:best-practices -->

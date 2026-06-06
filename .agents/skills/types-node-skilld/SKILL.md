---
name: types-node-skilld
description: "ALWAYS use when writing code importing \"@types/node\". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped."
metadata:
  version: 25.9.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# DefinitelyTyped/DefinitelyTyped `@types/node@25.9.2`
**Tags:** ts2.1: 12.12.6, ts2.6: 12.12.6, ts2.0: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for @types/node v25.9.2, focusing on recent major/minor releases and breaking changes from v24.x.

- NEW: `AsyncLocalStorage.withScope()` — v25.9.0, returns `RunScope` for context management with explicit resource management (experimental) [source](./async_hooks.d.ts#L259)

- NEW: `Broadcast.from()`, `Share.from()`, `SyncShare.from()` — v25.9.0 static methods for stream/iter module to create broadcast/share instances from existing sources [source](./stream/iter.d.ts:L246:264)

- NEW: Compression transforms in zlib/iter — v25.9.0 adds `compressBrotli()`, `compressDeflate()`, `compressGzip()`, `compressZstd()` and their `Sync` variants plus corresponding decompression transforms [source](./zlib/iter.d.ts:L34:131)

- NEW: `FileHandle.pull()` and `FileHandle.writer()` methods — v25.9.0 experimental stream-based file I/O for fs/promises (experimental) [source](./fs/promises.d.ts:L287:291)

- NEW: `process.addUncaughtExceptionCaptureCallback()` — v25.9.0 function to capture uncaught exceptions at process level [source](./process.d.ts:L844)

- NEW: `expectFailure()` function and option in test module — v25.5.0 allows inverting pass/fail reporting; test must throw to pass [source](./test.d.ts:L118)

- NEW: Inspector DOMStorage events — v25.5.0 adds `domStorageItemAdded()`, `domStorageItemRemoved()`, `domStorageItemUpdated()`, `domStorageItemsCleared()`, `registerStorage()` for `--experimental-storage-inspection` flag [source](./inspector.d.ts:L223:257)

- NEW: SQLite statement options — v25.5.0 adds `readBigInts`, `returnArrays`, `allowBareNamedParameters`, `allowUnknownNamedParameters` to statement options [source](./sqlite.d.ts:L218:233)

- NEW: `http.setGlobalProxyFromEnv()` — v25.4.0 configures global HTTP/HTTPS proxy from environment variables with built-in `NO_PROXY` support [source](./http.d.ts:L2111)

- NEW: `util.convertProcessSignalToExitCode()` — v25.4.0 converts process signal names to corresponding exit codes [source](./util.d.ts:L763)

- NEW: `Socket.getTypeOfService()` and `Socket.setTypeOfService()` — v25.6.0 for IPv4 TOS/IPv6 Traffic Class management [source](./net.d.ts:L232:247)

- NEW: `perf_hooks.eventLoopUtilization()` overloads — v25.2.0 adds support for comparing multiple utilization measurements [source](./perf_hooks.d.ts:L500)

- NEW: SQLite defensive mode — v25.1.0 adds `defensive` option to Database and `enableDefensive()` method to prevent deliberate SQL-based database corruption [source](./sqlite.d.ts:L86)

- NEW: `http.ServerOptions.optimizeEmptyRequests` — v25.1.0 optimises handling of empty request bodies [source](./http.d.ts:L324)

- NEW: V8 CPU profiling API — v25.0.0 adds `SyncCPUProfileHandle` interface and `startCpuProfile()` function for synchronous CPU profiling [source](./v8.d.ts:L399:456)

- NEW: Module compile cache portability — v25.0.0 adds `directory` and `portable` options to compile cache configuration [source](./module.d.ts:L68:76)

- DEPRECATED: `util.types.isNativeError()` — use `Error.isError()` instead (native error checking) [source](./util/types.d.ts:L115)

**Also changed:** `env` option in test.RunOptions v25.6.0 · `workerId` property in test context v25.8.0 · `limits` option in SQLite Database v25.8.0 · `handleError` option in REPLServer options v25.9.0 · `timerify()` function accepts options parameter v25.2.0 · `modifyPrototype` option in util.DeprecationOptions v25.2.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use the `node:` prefix when importing Node.js built-in modules — ensures compatibility with package resolution and prevents conflicts with npm packages of the same name [source](./.skilld/pkg/fs.d.ts:L1)

- Prefer promise-based APIs like `fs/promises`, `dns/promises`, and `timers/promises` over callback-based versions for cleaner async/await code — eliminates callback nesting and simplifies error handling [source](./.skilld/pkg/index.d.ts:L73)

- Use streams with `fs.createReadStream()` for large files instead of `fs.readFile()` — minimizes memory usage by processing data in chunks rather than loading entire file into memory [source](./.skilld/pkg/fs.d.ts:L3088)

- Provide `AbortSignal` to cancellable operations for proper cleanup support — allows operations like file reads and writes to be interrupted mid-flight without hanging resources [source](./.skilld/pkg/fs.d.ts:L3080:L3090)

- Pass `bigint: true` to file stat operations when nanosecond precision is required — returns nanosecond-precision timestamps in properties suffixed with `Ns` instead of millisecond values [source](./.skilld/pkg/fs.d.ts:L53:L109)

- Use `for await...of` loops with async iterables like `fs.Dir` — automatically closes the underlying resource when iteration completes, errors, or breaks early without explicit cleanup calls [source](./.skilld/pkg/fs.d.ts:L241)

- Use the `using` statement with `Symbol.asyncDispose` for file handles from `fs.promises.open()` — ensures automatic resource cleanup even if an error is thrown, following JavaScript's resource management pattern [source](./.skilld/pkg/fs.d.ts:L310)

- Configure `captureRejections: true` when creating EventEmitters that handle promise rejections — enables automatic capturing of unhandled promise rejections emitted from event handlers [source](./.skilld/pkg/events.d.ts:L38)

- Use `crypto.timingSafeEqual()` for comparing authentication tokens and secrets — prevents timing-based attacks by comparing values in constant time regardless of where they differ [source](./.skilld/pkg/crypto.d.ts:L2483)

- Prefer `child_process.execFile()` or `child_process.spawn()` over `exec()` when executing untrusted input — neither spawns a shell by default, preventing shell injection attacks; use `exec()` only when shell features are explicitly required [source](./.skilld/pkg/child_process.d.ts:L965)

- Configure `keepAliveTimeout` and `keepAliveInitialDelay` on HTTP servers for production workloads — enables connection reuse and reduces latency for keep-alive clients while safely closing stale connections [source](./.skilld/pkg/http.d.ts:L230)

- Type error objects as `NodeJS.ErrnoException` when catching file system or OS-level errors — provides access to error codes, paths, and syscall information for proper error recovery and debugging [source](./.skilld/pkg/globals.d.ts:L100)

- Use `Buffer.from()` for explicit buffer creation with known data — safer than the deprecated `Buffer()` constructor and clearly signals intentional buffer allocation from existing data [source](./.skilld/pkg/buffer.d.ts:L191)

- Use `util.callbackify()` when integrating modern async code with legacy callback-expecting libraries — converts promise-based functions to callback style with proper error handling for both synchronous throws and promise rejections [source](./.skilld/pkg/util.d.ts:L962:L1006)
<!-- /skilld:best-practices -->

---
name: types-node-skilld
description: "ALWAYS use when writing code importing \"@types/node\". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped."
metadata:
  version: 25.9.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# DefinitelyTyped/DefinitelyTyped `@types/node@25.9.4`
**Tags:** ts2.5: 12.12.6, ts2.6: 12.12.6, ts2.0: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @types/node v25.9.4 — focusing on recent major/minor releases from v25.0 onwards.

- NEW: `AsyncLocalStorage.withScope()` — new in v25.9.0 (experimental), returns a `RunScope` that implements explicit resource management with the `using` syntax to automatically restore previous store values [source](./.skilld/pkg/async_hooks.d.ts:L562)

- NEW: `RunScope` interface — new in v25.9.0 (experimental), extends `Disposable` and returned by `withScope()`, includes `dispose()` method to manually restore prior store value [source](./.skilld/pkg/async_hooks.d.ts:L608)

- NEW: `process.addUncaughtExceptionCaptureCallback()` — new in v25.9.0, allows callback function returning boolean to indicate whether exception was handled, preventing propagation to process-wide handlers [source](./.skilld/pkg/process.d.ts:L848)

- NEW: `REPLOptions.handleError` callback — new in v25.9.0, allows custom error handling in REPL by returning `'print'`, `'ignore'`, or `'unhandled'` to control exception reporting [source](./.skilld/pkg/repl.d.ts:L104)

- NEW: `test.expectFailure()` — new in v25.5.0, inverts pass/fail semantics so flagged tests must throw to pass [source](./.skilld/pkg/test.d.ts:L121)

- NEW: `http.setGlobalProxyFromEnv()` — new in v25.4.0, dynamically resets proxy configuration at runtime as alternative to `--use-env-proxy` flag, returns function to restore prior settings [source](./.skilld/pkg/http.d.ts:L2113)

- NEW: `Socket.getTypeOfService()` and `Socket.setTypeOfService()` — new in v25.6.0, get/set Type of Service (TOS) field for IPv4 or Traffic Class for IPv6 to prioritise network traffic, cached before connection [source](./.skilld/pkg/net.d.ts:L232:L247)

- NEW: `util.convertProcessSignalToExitCode()` — new in v25.4.0, converts signal name (e.g. `'SIGTERM'`) to corresponding exit code (128 + signal number) for process exit code determination [source](./.skilld/pkg/util.d.ts:L763)

- NEW: `perf_hooks.timerify()` — new in v25.2.0, wraps function to track execution duration, handles promise-returning functions via finally handler [source](./.skilld/pkg/perf_hooks.d.ts:L582)

- NEW: `http` `optimizeEmptyRequests` option — new in v25.1.0, when true initialises requests without `Content-Length`/`Transfer-Encoding` with already-ended body stream, eliminating stream events [source](./.skilld/pkg/http.d.ts:L324)

- NEW: `sqlite` `defensive` option — new in v25.1.0 (default true), enables defensive flag to disable language features that can corrupt database file [source](./.skilld/pkg/sqlite.d.ts:L86)

- NEW: `sqlite` `limits` option — new in v25.8.0, object containing configurable SQLite run-time limits (length, sqlLength, column, exprDepth) to prevent resource exhaustion from malicious input [source](./.skilld/pkg/sqlite.d.ts:L97)

- NEW: `v8.SyncCPUProfileHandle` interface — new in v25.0.0, returned by synchronous CPU profile collection with `stop()` method returning profile data and `[Symbol.dispose]()` for resource cleanup [source](./.skilld/pkg/v8.d.ts:L401:L411)

- NEW: `module.EnableCompileCacheOptions` interface — new in v25.0.0, options for compile cache with `directory` property (overrides `NODE_COMPILE_CACHE` env var) and `portable` property (for cache reusability across project moves) [source](./.skilld/pkg/module.d.ts:L68:L76)

- NEW: `test` `env` option — new in v25.6.0, pass environment variables to test process (not compatible with `isolation='none'`), overrides process.env and not merged [source](./.skilld/pkg/test.d.ts:L341)

- NEW: `test.Context.workerId` property — new in v25.8.0 (readonly), identifies worker thread ID for resource allocation per worker in multi-threaded test execution [source](./.skilld/pkg/test.d.ts:L1025)

- NEW: `inspector.DOMStorage` broadcast methods — new in v25.5.0 (experimental, requires `--experimental-storage-inspection` flag), includes `domStorageItemAdded()`, `domStorageItemRemoved()`, `domStorageItemUpdated()`, `domStorageItemsCleared()`, and `registerStorage()` [source](./.skilld/pkg/inspector.d.ts:L223:L257)

- NEW: `util.deprecate()` `modifyPrototype` option — new in v25.2.0 (default true), controls whether to modify object prototype when emitting deprecation warning [source](./.skilld/pkg/util.d.ts:L860)

- NEW: `perf_hooks.eventLoopUtilization()` overload — new in v25.2.0, additional signature accepting two prior utilisation values to compute relative utilisation (comparing blocks measured by processes like `child_process.spawnSync()`) [source](./.skilld/pkg/perf_hooks.d.ts:L500)

**Also changed:** `sqlite` SQL length/column/expression depth limits · `test` subtests with worker allocation · `inspector` DOM storage inspection protocol (experimental)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Prefer promise-based APIs from `fs/promises` and `stream/promises` modules over callback-based versions — enables async/await and avoids callback nesting [source](./.skilld/pkg/fs/promises.d.ts:L1) [source](./.skilld/pkg/stream/promises.d.ts:L1)

- Use the `Abortable` interface (`{ signal?: AbortSignal }`) consistently across async operations — provides a standardised cancellation mechanism compatible with `AbortController` [source](./.skilld/pkg/events.d.ts:L1)

- Use `node:` protocol prefix when importing modules (`import fs from 'node:fs'` not `import fs from 'fs'`) — makes module resolution explicit and works consistently across runtime environments [source](./.skilld/pkg/index.d.ts:L1)

- Use `EventMap<T>` pattern to create strongly typed EventEmitters — allows TypeScript to infer correct event arguments and prevent typos in event names [source](./.skilld/pkg/events.d.ts:L4)

- Enable `captureRejections` option on EventEmitters when emitting events that return Promises — prevents unhandled promise rejections from being silently dropped [source](./.skilld/pkg/events.d.ts:L36:L40)

- Use encoding type unions (`BufferEncodingOption`, `ObjectEncodingOptions`) for APIs that accept different encoding modes — preserves type safety when switching between string and Buffer returns [source](./.skilld/pkg/fs.d.ts:L14:L25)

- Use `AsyncResource` from `node:async_hooks` in custom async operations — properly maintains async context propagation for debugging, profiling, and context-local storage [source](./.skilld/pkg/async_hooks.d.ts:L150)

- Use `stream/web` APIs when targeting web-compatible streaming (`ReadableStream`, `WritableStream`) — ensures code portability across Node.js and browser environments [source](./.skilld/pkg/index.d.ts:L100)

- Leverage bigint variants (`BigIntStats`, `bigint` option in stat operations) when handling large values that exceed 32-bit integer range — preserves precision without numeric overflow [source](./.skilld/pkg/fs.d.ts:L70:L110)

- Structure custom event-emitting types with module-level `declare module` to avoid global namespace pollution — keeps type definitions clean and avoids conflicts with other libraries [source](./.skilld/pkg/index.d.ts:L32)

- Check `@since` version tags in JSDoc when using APIs — ensures compatibility with target Node.js version and avoids using features not yet available [source](./.skilld/pkg/async_hooks.d.ts:L32)

- Use AbortSignal-based cancellation for HTTP requests and streams — provides a standard way to cancel operations that composes well with Promise.race and other control-flow patterns [source](./.skilld/pkg/http.d.ts:L1)

- Use proper exception interfaces and error types from modules (`ExecException`, `ErrnoException`) rather than generic `Error` — enables precise error handling and access to platform-specific error details [source](./.skilld/pkg/child_process.d.ts:L1)

- Import submodule types explicitly (`import type { FileHandle } from 'node:fs/promises'`) rather than from parent module — reduces bundle size and makes dependencies clear in code [source](./.skilld/pkg/fs/promises.d.ts:L1:L40)
<!-- /skilld:best-practices -->

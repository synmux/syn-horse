---
name: types-node-skilld
description: 'TypeScript definitions for node. ALWAYS use when writing code importing "@types/node". Consult for debugging, best practices, or modifying @types/node, types/node, types node, DefinitelyTyped.'
metadata:
  version: 25.9.1
  generated_by: cached
  generated_at: 2026-05-27
---

# DefinitelyTyped/DefinitelyTyped `@types/node@25.9.1`

**Tags:** ts2.6: 12.12.6, ts2.2: 12.12.6, ts2.4: 12.12.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/node` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/node` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `util.Style` type, use `InspectStyle` instead. [source](./.skilld/pkg/util.d.ts:L142)
- DEPRECATED: `util.CustomInspectFunction` type, use `Inspectable` interface instead. [source](./.skilld/pkg/util.d.ts:L144)
- DEPRECATED: `util.InspectOptionsStylized` interface, use `InspectContext` instead. [source](./.skilld/pkg/util.d.ts:L146)
- DEPRECATED: `util.Modifiers` type, use `InspectColorModifier` instead. [source](./.skilld/pkg/util.d.ts:L148)
- DEPRECATED: `util.ForegroundColors` type, use `InspectColorForeground` instead. [source](./.skilld/pkg/util.d.ts:L150)
- DEPRECATED: `util.BackgroundColors` type, use `InspectColorBackground` instead. [source](./.skilld/pkg/util.d.ts:L152)
- DEPRECATED: `util.EncodeIntoResult` interface, use `TextEncoderEncodeIntoResult` instead. [source](./.skilld/pkg/util.d.ts:L784)
- DEPRECATED: `ServerResponse.finished` property, use `writableEnded` instead. [source](./.skilld/pkg/http.d.ts:L908)
- DEPRECATED: `fs.truncate()` when passing a file descriptor. [source](./.skilld/pkg/fs.d.ts:L3151)
- DEPRECATED: `fs.truncateSync()` when passing a file descriptor. [source](./.skilld/pkg/fs.d.ts:L3187)
- DEPRECATED: `fs.RmDirOptions` interface for `rmdir()`, no longer provides options. [source](./.skilld/pkg/fs.d.ts:L3417)
- DEPRECATED: `fs.ReadSyncOptions` interface, use `ReadOptions` instead. [source](./.skilld/pkg/fs.d.ts:L4282)
- DEPRECATED: `fs.ReadAsyncOptions` interface, use `ReadOptionsWithBuffer` instead. [source](./.skilld/pkg/fs.d.ts:L4285)
- DEPRECATED: `fs.StatSyncOptions` interface, use `StatOptions` instead. [source](./.skilld/pkg/fs.d.ts:L4736)
- NEW: `zlib.compressBrotli()` - Create a Brotli compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L37)
- NEW: `zlib.compressBrotliSync()` - Create a Brotli compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L44)
- NEW: `zlib.compressDeflate()` - Create a deflate compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L51)
- NEW: `zlib.compressDeflateSync()` - Create a deflate compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L58)
- NEW: `zlib.compressGzip()` - Create a gzip compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L65)
- NEW: `zlib.compressGzipSync()` - Create a gzip compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L71)
- NEW: `zlib.compressZstd()` - Create a Zstandard compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L78)
- NEW: `zlib.compressZstdSync()` - Create a Zstandard compression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L85)
- NEW: `zlib.decompressBrotli()` - Create a Brotli decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L92)
- NEW: `zlib.decompressBrotliSync()` - Create a Brotli decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L98)
- NEW: `zlib.decompressDeflate()` - Create a deflate decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L104)
- NEW: `zlib.decompressDeflateSync()` - Create a deflate decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L110)
- NEW: `zlib.decompressGzip()` - Create a gzip decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L116)
- NEW: `zlib.decompressGzipSync()` - Create a gzip decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L122)
- NEW: `zlib.decompressZstd()` - Create a Zstandard decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L128)
- NEW: `zlib.decompressZstdSync()` - Create a Zstandard decompression transform. [source](./.skilld/pkg/zlib/iter.d.ts:L134)
- NEW: `stream.Broadcast.from()` - Create a `Broadcast` from an existing source. [source](./.skilld/pkg/stream/iter.d.ts:L330)
- NEW: `stream.Share.from()` - Create a `Share` from an existing source. [source](./.skilld/pkg/stream/iter.d.ts:L339)
- NEW: `stream.SyncShare.from()` - Create a `SyncShare` from an existing source. [source](./.skilld/pkg/stream/iter.d.ts:L347)
- NEW: `AsyncLocalStorage.snapshot()` - Captures the current execution context. (experimental) [source](./.skilld/pkg/async_hooks.d.ts:L390)
- NEW: `AsyncLocalStorage.withScope()` - Creates a disposable scope that enters the given store. (experimental) [source](./.skilld/pkg/async_hooks.d.ts:L490)
- NEW: `RunScope` interface - A disposable scope returned by `asyncLocalStorage.withScope()`. (experimental) [source](./.skilld/pkg/async_hooks.d.ts:L545)
- NEW: `RunScope.dispose()` - Explicitly ends the scope and restores the previous store value. (experimental) [source](./.skilld/pkg/async_hooks.d.ts:L561)
- NEW: `IncomingMessage.readableEnded` - Property to detect if the request body stream is already ended. [source](./.skilld/pkg/http.d.ts:L1637)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Avoid `fs.stat()` for existence checks: Instead, user code should open/read/write the file directly and handle the error raised if the file is not available. [source](./.skilld/pkg/fs.d.ts:L4768-4774)

- For general use cases, it's recommended to call `module.enableCompileCache()` without specifying the `options.directory`, so that the directory can be overridden by the `NODE_COMPILE_CACHE` environment variable when necessary. [source](./.skilld/pkg/module.d.ts:L330-333)

- It is recommended to enable foreign key constraints by default in `node:sqlite` but can be disabled for compatibility with legacy database schemas. [source](./.skilld/pkg/sqlite.d.ts:L3)

- Avoid insecure HTTP parser: Using `http.ServerOptions.insecureHTTPParser` is discouraged due to security risks. [source](./.skilld/pkg/http.d.ts:L782-785)

- Avoid calling `readable.unshift()` while in the process of performing a read from a stream, as it can cause unexpected results. [source](./.skilld/pkg/stream.d.ts:L1756-1763)

- Avoid using `v8.queryObjects()` on constructors whose implementation you don't control, or on constructors that can be invoked by other parties, to prevent surprising results. [source](./.skilld/pkg/v8.d.ts:L896-900)

- Ensure `Array.fromAsync` types are available by including `"lib": ["ESNext"]` in your `tsconfig.json`. [source](./.skilld/discussions/discussion-74504.md#accepted-answer)

- For `Intl.Locale['weekInfo']` types, ensure your TypeScript version is 6.0 or higher. [source](./.skilld/discussions/discussion-74497.md#accepted-answer)

- Prefer `AsyncLocalStorage` over custom `node:async_hooks` module implementations, as it offers a performant and memory-safe approach with significant internal optimizations. [source](./.skilld/pkg/async_hooks.d.ts:L543-546)

- It is good practice to `destroy()` an `Agent` instance when it is no longer in use, because unused sockets consume OS resources. [source](./.skilld/pkg/http.d.ts:L1972-1974]

- Take caution when setting `events.defaultMaxListeners` because the change affects _all_ `EventEmitter` instances, including those created before the change is made. [source](./.skilld/pkg/events.d.ts:L938-941)

- Avoid using functions or properties directly on resource objects returned by `executionAsyncResource()`, as these are internal Node.js handle objects with undocumented APIs that can lead to application crashes. [source](./.skilld/pkg/async_hooks.d.ts:L106-108)

- Using `fsPromises.access()` to check for file accessibility before calling `fsPromises.open()` is not recommended due to race conditions; instead, open/read/write directly and handle errors. [source](./.skilld/pkg/fs/promises.d.ts:L446-451)

- For performance-sensitive file writes, consider using `fs.createWriteStream()` or `filehandle.createWriteStream()` instead of `fsPromises.writeFile()`, as the latter performs multiple internal write calls. [source](./.skilld/pkg/fs.d.ts:L3452-3454)
<!-- /skilld:best-practices -->

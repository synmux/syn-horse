---
name: types-ejs-skilld
description: 'ALWAYS use when writing code importing "@types/ejs". Consult for debugging, best practices, or modifying @types/ejs, types/ejs, types ejs, DefinitelyTyped.'
metadata:
  version: 3.1.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# DefinitelyTyped/DefinitelyTyped `@types/ejs@3.1.5`

**Tags:** ts2.3: 2.3.33, ts2.0: 2.3.33, ts2.1: 2.3.33

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @types/ejs` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @types/ejs` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents the TypeScript interface surface for @types/ejs v3.1.5. Complete historical API change data from earlier versions is not available in local reference sources.

### Exported Functions

The following functions form the primary public API of EJS v3.1.5:

- `compile(template, opts?)` — compiles an EJS template string into a function, with overloads for async/sync and client-side compilation. [source](./.skilld/pkg/index.d.ts:L26:L36)

- `render(template, data?, opts?)` — renders an EJS template string with provided data, supporting both sync and async rendering. [source](./.skilld/pkg/index.d.ts:L44:L47)

- `renderFile(path, cb?)` — renders an EJS file from disk with callback or promise-based interface. [source](./.skilld/pkg/index.d.ts:L63:L66)

- `clearCache()` — clears the compiled template cache, delegates to {@link Cache#reset}. [source](./.skilld/pkg/index.d.ts:L71)

- `escapeXML(markup?)` — escapes XML/HTML reserved characters, returns empty string for null/undefined input. [source](./.skilld/pkg/index.d.ts:L142)

### Key Option Types

- `Options.destructuredLocals` — new in v3, array of variable names always destructured from `localsName`, available even in strict mode. [source](./.skilld/pkg/index.d.ts:L330)

- `Options.includer` — custom callback for handling includes, replaces older file resolution with more control. [source](./.skilld/pkg/index.d.ts:L451)

### Template Function Types

- `ClientFunction` — function signature for client-side compiled templates, requires explicit `escape`, `include`, and `rethrow` callbacks. [source](./.skilld/pkg/index.d.ts:L211:L216)

- `AsyncClientFunction` — async variant of `ClientFunction` returning Promise<string>. [source](./.skilld/pkg/index.d.ts:L233:L238)

- `IncluderResult` — union type for include resolution, accepts either `filename` or `template` property, not both. [source](./.skilld/pkg/index.d.ts:L281)

### Configuration Exports

- `cache` — module-level cache object, replaceable with LRU-cache compatible object. [source](./.skilld/pkg/index.d.ts:L78)

- `fileLoader` — module-level file loader function, default is `fs.readFileSync`, can be customised. [source](./.skilld/pkg/index.d.ts:L90)

- `localsName`, `openDelimiter`, `closeDelimiter`, `delimiter` — global template defaults overridable per-render via Options. [source](./.skilld/pkg/index.d.ts:L100:L125)

- `promiseImpl` — Promise constructor override for testability. [source](./.skilld/pkg/index.d.ts:L133)

### Template Class

The `Template` class provides lower-level access to template compilation and source inspection. [source](./.skilld/pkg/index.d.ts:L144:L162)

**Note:** Release notes for @types/ejs v3.1.5 and detailed migration guides from v2.x to v3.x are not available in local skilld references. For breaking changes between EJS versions, consult the EJS GitHub repository release notes directly.

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Choose `compile()` overloads carefully: use `{ async: true }` when rendering within async contexts (Promises, Workers) to avoid blocking; only use synchronous `{ async: false | undefined }` for blocking contexts or when the renderer explicitly requires sync execution [source](./.skilld/pkg/index.d.ts:L26:36)

- Use client-side compilation (`{ client: true }`) to bundle pre-compiled templates for browser delivery, reducing runtime parsing and avoiding EJS library dependency in the browser; this produces a `ClientFunction` accepting inline escape and include callbacks [source](./.skilld/pkg/index.d.ts:L30,L35)

- Leverage `cache` option with `filename` to enable template function memoization: set both `cache: true` and `filename` to persist compiled templates in the in-process cache and avoid re-parsing identical template text [source](./.skilld/pkg/index.d.ts:L401:409)

- Use `clearCache()` after bulk template updates in long-running processes to prevent unbounded memory growth from accumulating cached templates; the default in-process cache grows continuously without explicit pruning [source](./.skilld/pkg/index.d.ts:L68:71)

- Default to HTML escaping with `<%= %>` for all user-provided content; only use raw output `<%- %>` when intentionally rendering safe markup, and always validate the source first to prevent injection attacks [source](./.skilld/pkg/index.d.ts:L248)

- Customize the `escape` callback to adjust escaping rules: replace the default `escapeXML` with a custom function if stricter (e.g., JavaScript escaping for attribute content) or looser rules are needed, but ensure the callback is `.toString()`-able for client compilation [source](./.skilld/pkg/index.d.ts:L357)

- Enable `strict: true` to ban the `with()` construct and require all variables to flow through the `localsName` object, reducing accidental global-scope leakage and improving type safety when combined with `destructuredLocals` [source](./.skilld/pkg/index.d.ts:L322)

- Use `destructuredLocals` array to whitelist variables that bypass the locals object in strict mode: pass `destructuredLocals: ["user", "config"]` to make named variables available without `locals.user` prefix, improving template readability while staying safe in strict mode [source](./.skilld/pkg/index.d.ts:L330)

- Provide a custom `fileLoader` to intercept template file reads for security (restrict filesystem paths) or preprocessing (e.g., variable substitution, compression); the default is `fs.readFileSync`, which allows unrestricted file access [source](./.skilld/pkg/index.d.ts:L89:90)

- Set `filename` when compiling to enable proper error reporting with line numbers and to support caching; omitting it degrades error messages and disables cache persistence [source](./.skilld/pkg/index.d.ts:L365)

- Use `renderFile()` for file-based templates instead of manual `fs.readFile()` → `render()`: it handles file loading, caching, and error reporting automatically, and supports `root` option for template directory resolution [source](./.skilld/pkg/index.d.ts:L63:66)

- Configure `includer` callback to customize how includes are resolved at runtime: return either `{ filename: string }` for on-disk files or `{ template: string }` for dynamic template content, allowing virtual filesystems or preprocessed templates [source](./.skilld/pkg/index.d.ts:L289)

- Enable `compileDebug: true` (the default) in development and `compileDebug: false` in production to reduce generated code size; when enabled, errors are re-thrown with line mapping via `rethrow` callback, revealing the original template line number instead of compiled JavaScript line [source](./.skilld/pkg/index.d.ts:L305)
<!-- /skilld:best-practices -->

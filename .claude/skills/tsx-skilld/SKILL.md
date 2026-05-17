---
name: tsx-skilld
description: 'ALWAYS use when writing code importing "tsx". Consult for debugging, best practices, or modifying tsx.'
metadata:
  version: 4.22.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-17
---

# privatenumber/tsx `tsx@4.22.1`

**Tags:** latest: 4.22.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

**Note:** This document covers API changes through v4.21.0 (2025-11-30). v4.22.1 and later may not be fully documented here.

### Watch Mode CLI

- NEW: `--include` flag — v4.18.0 added the ability to include specific files or glob patterns in watch monitoring. Use `tsx watch --include "./other-dep.txt" ./file.ts` to watch files outside the default dependency graph [source](./.skilld/releases/v4.18.0.md#features)

- DEPRECATED: `--ignore` flag — v4.19.0 deprecated `--ignore` in favour of `--exclude`. The `--ignore` flag still functions but will not receive new features. Use `tsx watch --exclude "./data/**/*" ./file.ts` instead [source](./.skilld/releases/v4.19.0.md#features)

### Node.js CLI Integration

- DEPRECATED: `node --loader tsx` — Deprecated for Node.js v20.6+. The `--loader` flag uses the legacy custom loader API. Use `node --import tsx ./file.ts` instead, which supports Node.js v20.6 and later with the modern loader API [source](./.skilld/docs/dev-api/node-cli.md)

- NEW: `node --import tsx` — The modern way to run TypeScript with Node directly. Replaces the deprecated `--loader` approach and works with Node.js v20.6+ [source](./.skilld/docs/dev-api/node-cli.md)

### ESM/CommonJS Module Registration

- STABLE: `register()` API from `tsx/esm/api` — Allows runtime registration of TypeScript enhancement for ESM modules. Accepts optional `namespace` parameter for scoped registration and `onImport` hook for tracking loaded files [source](./.skilld/docs/dev-api/register-esm.md)

- STABLE: `tsx/cjs` entrypoint — CommonJS-only registration available via `node --require tsx/cjs ./file.ts` for projects that only need CommonJS support [source](./.skilld/docs/dev-api/node-cli.md#commonjs-mode-only)

- STABLE: `tsx/esm` entrypoint — ESM-only registration available via `node --import tsx/esm ./file.ts` for projects that only need ESM support [source](./.skilld/docs/dev-api/node-cli.md#module-mode-only)

### Developer APIs (Stable across v4.x)

- STABLE: `tsImport()` — Load TypeScript files without module caching. Requires passing the caller's `import.meta.url` for proper resolution context. Useful for one-time imports where caching is not desired [source](./.skilld/docs/dev-api/ts-import.md)

- STABLE: `tsx.require()` — CommonJS require variant for loading TypeScript files. Part of the stable CJS developer API [source](./.skilld/docs/dev-api/tsx-require.md)

### JSON & ESM Attributes

- FIXED: ESM JSON attribute handling — v4.20.0 fixed a bug where the JSON `import attribute` was not automatically set when missing. Ensures `import config from "./config.json" assert { type: "json" }` works correctly [source](./.skilld/releases/v4.20.0.md#bug-fixes)

- IMPROVED: JSON key handling — v4.20.1 fixed handling of JSON keys with special characters, improving compatibility with complex JSON structures [source](./.skilld/releases/v4.20.1.md#bug-fixes)

### esbuild Integration

- ENHANCED: esbuild upgraded to v0.25.0+ — v4.19.3 upgraded esbuild to address vulnerability reports. v4.21.0 further upgraded esbuild for latest language support and performance improvements [source](./.skilld/releases/v4.19.3.md#bug-fixes)

- ENHANCED: Latest Node versions support — v4.20.0 adds support for the latest Node.js versions, ensuring compatibility with recent Node releases [source](./.skilld/releases/v4.20.0.md#features)

**Also changed:** Process signal relay improved v4.20.6 · TypeScript configuration path override via `TSX_TSCONFIG_PATH` env var · Watch mode glob pattern support · debugger sourceMap generation · CommonJS/ESM interop improvements

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Separate type checking from execution using `tsc --noEmit` in pre-commit hooks or CI — tsx does not type check on its own, treating type errors as linting concerns rather than compilation blockers [source](./.skilld/docs/typescript.md#development-workflow)

- Configure `tsconfig.json` with recommended settings (`moduleDetection: "force"`, `module: "Preserve"`, `esModuleInterop: true`, `isolatedModules: true`, `resolveJsonModule: true`, `allowJs: true`) — enables correct ESM behaviour and sensible defaults that match tsx's capabilities [source](./.skilld/docs/typescript.md#recommendation)

- Use CLI approach (`node --import tsx` or `tsx` command) over `import 'tsx'` in source code — inline tsx registration is unexpected for collaborators and less visible than explicit command-line usage [source](./.skilld/docs/dev-api/entry-point.md#advanced-usage)

- Use scoped registration with namespace in the register API — prevents affecting the entire runtime environment when only specific code paths need TypeScript support [source](./.skilld/docs/dev-api/register-cjs.md#scoped-registration)

- Use `tsImport()` for third-party packages loading TypeScript files — designed specifically for one-time loads without caching or adding TypeScript support to the entire runtime [source](./.skilld/docs/dev-api/ts-import.md)

- Never publish uncompiled TypeScript to npm packages — use pkgroll or similar bundlers to compile source files, as tsx's tsconfig requirements apply to development, not to package consumers [source](./.skilld/docs/compilation.md#should-i-publish-typescript-files)

- Use watch mode for development iteration — tsx's watch mode is more robust than Node's `--watch` flag (introduced in v18.11.0) and predates Node's implementation [source](./.skilld/docs/watch-mode.md#overview)

- Enable `verbatimModuleSyntax` in `tsconfig.json` — requires explicit `import type` / `export type` syntax to avoid surprising behaviour and reduce refactoring [source](./.skilld/docs/typescript.md#recommendation)

- Use the register API's `onImport` hook to track loaded files for custom watchers — `register({ onImport: file => { ... } })` collects dependencies for custom file watching implementations [source](./.skilld/docs/dev-api/register-esm.md#tracking-loaded-files)

- Exclude large directories from watch mode using `--exclude` — tsx watches all imported files except `node_modules`, `bower_components`, `vendor`, `dist`, and hidden directories by default; exclude additional directories to improve performance [source](./.skilld/docs/watch-mode.md#watch-behavior)

- Position tsx flags before the script path when running — correct syntax: `tsx [tsx flags] ./file.ts [flags & arguments for file.ts]`; flags after the script path are passed to the script, not tsx [source](./.skilld/docs/node-enhancement.md#flag--arguments-positioning)

- Use `allowJs: true` in `tsconfig.json` for seamless JavaScript/TypeScript interop — eliminates `ERR_REQUIRE_ESM` errors when mixing CommonJS and ESM modules [source](./.skilld/docs/faq.md#seamless-cjs-esm-imports)

- Use shell script hashbang `#!/usr/bin/env -S npx tsx` for project-local scripts — the `-S` flag allows npx to correctly invoke tsx with the script arguments [source](./.skilld/docs/shell-scripts.md#project-scripts)

- Use `tsx --test` for running TypeScript test files — automatically recognises test patterns (`**/*.test.ts`, `**/*-test.ts`, `**/test-*.ts`, `**/test.ts`, `**/test/**/*.ts`) without configuration [source](./.skilld/docs/node-enhancement.md#test-runner)
<!-- /skilld:best-practices -->

---
name: tsx-skilld
description: "ALWAYS use when writing code importing \"tsx\". Consult for debugging, best practices, or modifying tsx."
metadata:
  version: 4.23.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-03
---

# privatenumber/tsx `tsx@4.23.0`
**Tags:** latest: 4.23.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in tsx v4.x — focusing on recent minor releases and runtime API updates that have changed since earlier v4 versions.

## Node.js CLI

- DEPRECATED: `node --loader tsx` — deprecated in favor of `node --import tsx` since Node.js v20.6.0. The `--loader` flag is legacy and no longer recommended for new code [source](./.skilld/docs/dev-api/node-cli.md:L9:16)

- NEW: `node --import tsx` — stable API for enhancing Node.js with tsx support. Replaces the deprecated `--loader` flag and is the recommended way to use tsx with the `node` command directly [source](./.skilld/docs/dev-api/node-cli.md:L3:7)

- NEW: `node --require tsx/cjs` — CommonJS-only enhancement, available as an alternative to full-runtime registration [source](./.skilld/docs/dev-api/node-cli.md:L35:42)

- NEW: `node --import tsx/esm` — ES Module-only enhancement for registering tsx on ESM modules only [source](./.skilld/docs/dev-api/node-cli.md:L44:50)

## Watch Mode API

- DEPRECATED: `tsx watch --ignore` flag — removed in v4.19.0 in favour of `--exclude` flag. Old `--ignore` patterns no longer work [source](./.skilld/releases/v4.19.0.md:L12:14)

- NEW: `tsx watch --exclude` flag — replaces the deprecated `--ignore` flag. Use glob patterns to exclude specific files or directories from being watched [source](./.skilld/docs/watch-mode.md:L35:40)

- NEW: `tsx watch --include` flag — explicitly include specific files or directories to watch beyond the default watched dependencies [source](./.skilld/docs/watch-mode.md:L27:32)

## ESM Register API (`tsx/esm/api`)

- NEW: `register({ namespace })` — scoped registration for ESM. When a namespace is provided, returns a private `import()` method and does not affect global state [source](./.skilld/docs/dev-api/register-esm.md:L18:39)

- NEW: `api.import(file, parentURL)` — namespace-scoped import function. Each namespace maintains independent module cache [source](./.skilld/docs/dev-api/register-esm.md:L33:34)

- NEW: `onImport` hook — callback hook for tracking loaded files during registration. Receives file URL as argument [source](./.skilld/docs/dev-api/register-esm.md:L42:51)

## CommonJS Register API (`tsx/cjs/api`)

- NEW: `register({ namespace })` — scoped registration for CommonJS. Returns private `require()` method without affecting global state [source](./.skilld/docs/dev-api/register-cjs.md:L24:40)

- NEW: `api.require(file, __filename)` — namespace-scoped require function for isolated CommonJS module loading [source](./.skilld/docs/dev-api/register-cjs.md:L38)

## Developer APIs

- NEW: `tsImport(file, { parentURL, tsconfig })` — `tsconfig` option added to support custom `tsconfig.json` paths or disabling lookup entirely. Accepts string path or `false` to disable [source](./.skilld/docs/dev-api/ts-import.md:L35:51)

- NEW: `tsImport(file, { parentURL, onImport })` — `onImport` hook for tracking file loads during dynamic imports [source](./.skilld/docs/dev-api/ts-import.md:L53:64)

- NEW: `tsx.require.cache` — CommonJS require.cache integration for dependency tracking. Useful for implementing watchers [source](./.skilld/docs/dev-api/tsx-require.md:L35:49)

## Environment & Runtime

- NEW: `TSX_TSCONFIG_PATH` environment variable — set custom `tsconfig.json` path when using `node --import tsx`. Works with both `--import` and legacy `--loader` [source](./.skilld/docs/dev-api/node-cli.md:L18:23)

- NEW: Node.js version support expanded — v4.21.1 added explicit support for Node.js 24.15.0, 26.1.0, 25.9.0, 20.11, and 21.2 [source](./.skilld/releases/v4.21.1.md:L12:16)

**Also changed:** ESM JSON attribute handling (v4.20.1) · sourcesContent in debugging (v4.19.2) · esbuild upgrades (v4.22.0, v4.21.0) · async module.register() hook state isolation (v4.22.5)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Separate type checking from execution — run tsx for quick development iteration and use `tsc --noEmit` in pre-commit hooks or CI pipelines to catch type errors independently [source](./.skilld/docs/typescript.md#development-workflow)

- Configure `tsconfig.json` with `moduleDetection: "force"`, `module: "Preserve"`, `allowJs: true`, `esModuleInterop: true`, and `isolatedModules: true` for consistent, predictable type-checking behaviour across tools [source](./.skilld/docs/typescript.md#recommendation)

- Never publish uncompiled TypeScript to npm — always compile source files using pkgroll (the recommended bundler maintained by tsx's author) to ensure correct configuration and avoid runtime performance degradation [source](./.skilld/docs/compilation.md#should-i-publish-typescript-files)

- Use tsx as a direct drop-in replacement for `node` with identical CLI flag support, enabling seamless switching between the two commands without syntax changes [source](./.skilld/docs/node-enhancement.md#swap-node-for-tsx)

- Position tsx command flags immediately after the command, and script flags/arguments after the script path — correct ordering is essential for proper argument parsing [source](./.skilld/docs/node-enhancement.md#flag--arguments-positioning)

- Use `tsx watch` for development workflows to automatically re-run your script whenever any watched dependency changes, accelerating iteration speed without manual restarts [source](./.skilld/docs/watch-mode.md#overview)

- Prefer `node --import tsx` over runtime `import 'tsx'` in source code for better transparency and because it's visible in the command-line invocation [source](./.skilld/docs/dev-api/entry-point.md#advanced-usage)

- Use scoped registration with `register({ namespace: ... })` when third-party packages need to load TypeScript files without affecting the entire runtime environment [source](./.skilld/docs/dev-api/register-esm.md#scoped-registration)

- Use `tsImport()` API for one-time, non-cached TypeScript file imports without adding global TypeScript support to the runtime [source](./.skilld/docs/dev-api/ts-import.md)

- Use `tsx --test` to automatically run Node.js built-in test runner with TypeScript support — it recognises test files with patterns like `*.test.ts`, `*-test.ts`, and files in `test/` directories [source](./.skilld/docs/node-enhancement.md#test-runner)

- Track module dependencies using `tsx.require.cache` when implementing custom watchers or dependency analysis in CommonJS environments [source](./.skilld/docs/dev-api/tsx-require.md#tracking-loaded-files)

- Use `#!/usr/bin/env -S npx tsx` as the shebang for executable TypeScript scripts in projects with locally installed tsx, enabling direct file execution [source](./.skilld/docs/shell-scripts.md#project-scripts)

- Understand module-type limitations: CommonJS registration doesn't enhance `import()` calls, and ESM registration doesn't affect static imports — choose the registration API that matches your module type [source](./.skilld/docs/dev-api/register-cjs.md#caveats)

- Use environment variable `TSX_TSCONFIG_PATH` when running tsx through Node.js CLI to specify a custom tsconfig.json path, especially when integrating with tools that call `node` directly [source](./.skilld/docs/dev-api/node-cli.md#custom-tsconfig-path)
<!-- /skilld:best-practices -->

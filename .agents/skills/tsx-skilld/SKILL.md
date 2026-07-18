---
name: tsx-skilld
description: "ALWAYS use when writing code importing \"tsx\". Consult for debugging, best practices, or modifying tsx."
metadata:
  version: 4.23.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# privatenumber/tsx `tsx@4.23.1`
**Tags:** latest: 4.23.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for tsx — prioritising recent major/minor releases and highlighting breaking changes, deprecated APIs, and new features that LLMs trained on older data may not know about.

## Deprecated APIs

- DEPRECATED: `tsx watch --ignore <pattern>` — since v4.19.0, use `--exclude` instead [source](./.skilld/releases/v4.19.0.md#features)
  - The `exclude` flag uses glob patterns to specify files to exclude from watching
  - Example migration: `tsx watch --ignore "./data/**/*"` → `tsx watch --exclude "./data/**/*"`

- DEPRECATED: `node --loader tsx` — for Node.js v20.5.1 and below, use `node --import tsx` instead [source](./.skilld/docs/dev-api/node-cli.md:L9:16)
  - Node.js v20.6.0+ requires the `--import` flag (the `--loader` API was replaced)
  - The `--import` flag is the modern standard for loading TypeScript with tsx
  - Both CommonJS and ESM modes support the newer `--import` syntax

## Notable Changes

- esbuild dependency upgraded to 0.28.x in v4.22.0 [source](./.skilld/releases/v4.22.0.md#features)
  - Enables latest esbuild features and performance improvements
  - May impact compilation output for edge cases involving decorators, constants, and complex type narrowing

- Watch mode stability improvements: hook state is now isolated per async `module.register()` registration in v4.22.5 [source](./.skilld/releases/v4.22.5.md#bug-fixes)
  - Fixes issues when using tsx in multiple concurrent contexts
  - CommonJS/ESM interop enhancements in v4.22.2 for preserving JSON requires and named exports [source](./.skilld/releases/v4.22.2.md#bug-fixes)

**Also changed:** Node version support expanded in v4.20.0 · CommonJS JSON import handling (v4.20.1) · TypeScript path alias resolution with colons (v4.22.1)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Separate type checking from execution — tsx intentionally skips type checking for performance. Use a separate `tsc --noEmit` step in pre-commit hooks or CI pipelines, letting your IDE provide real-time feedback during development [source](./.skilld/docs/typescript.md#development-workflow)

- Understand esbuild compilation constraints — tsx uses esbuild, which does not support `eval()` compatibility or the `emitDecoratorMetadata` tsconfig option. Review esbuild's caveats before relying on these features [source](./.skilld/docs/typescript.md#compiler-limitations)

- Use tsx as a drop-in `node` replacement — tsx supports all Node.js CLI flags and arguments identically. Substitute `tsx` for `node` directly without relearning command syntax [source](./.skilld/docs/node-enhancement.md#swap-node-for-tsx)

- Leverage tsx watch mode for development iteration — tsx's watch mode (introduced before Node 18.11.0) is more robust than Node's `--watch` flag and better suited to re-running scripts on file changes [source](./.skilld/docs/watch-mode.md#overview)

- Use namespace-scoped ESM registration for third-party packages — When a library needs to load TypeScript files (e.g., config files) without affecting the entire runtime, pass a unique namespace to `register()` to isolate the enhancement [source](./.skilld/docs/dev-api/register-esm.md#scoped-registration)

- Track file dependencies via `onImport` hook — Implement file watchers and build integrations by registering an `onImport` callback to collect all loaded dependencies and set up watches accordingly [source](./.skilld/docs/dev-api/register-esm.md#tracking-loaded-files)

- Use `tsImport()` for one-time uncached TypeScript imports — For loading config files or other TypeScript that may change between calls, `tsImport()` is preferable to cached imports because it re-evaluates on every call [source](./.skilld/docs/dev-api/ts-import.md#usage)

- Walk `require.cache` to collect dependency trees — In CommonJS environments, traverse the `require.cache` to identify all loaded modules and their transitive dependencies for build tools and watchers [source](./.skilld/docs/dev-api/tsx-require.md#tracking-loaded-files)

- Always compile TypeScript to JavaScript before publishing — Never publish uncompiled TypeScript to npm; it degrades performance and may not read the correct `tsconfig.json`. Use `pkgroll` (authored by tsx's maintainer) for bundling [source](./.skilld/docs/compilation.md)

- Write CLI tools and shell scripts in pure TypeScript — Use tsx shebangs to execute entire shell scripts as TypeScript without separate compilation steps [source](./.skilld/docs/shell-scripts.md#project-scripts)

- Remember CommonJS `tsx.require()` does not support top-level await — When using the CommonJS API to load TypeScript, any dynamic imports with top-level await in the loaded module will fail [source](./.skilld/docs/dev-api/tsx-require.md#caveats)

- Configure `tsconfig.json` with tsx-recommended compiler options — Enable `moduleDetection: "force"`, `module: "Preserve"`, `esModuleInterop: true`, and `isolatedModules: true` for consistent type-checking behaviour with tsx's runtime [source](./.skilld/docs/typescript.md#recommendation)

- Install tsx globally for one-off standalone scripts — Global installation avoids the need for `npx` when running TypeScript scripts independently, improving convenience for command-line tooling [source](./.skilld/docs/getting-started.md#global-installation)

- Prefer visible Node.js enhancement methods over runtime imports — When enhancing Node.js, use CLI flags like `node --import tsx` instead of `import 'tsx'` in source code, as hidden runtime registration is unexpected for collaborators [source](./.skilld/docs/dev-api/entry-point.md#advanced-usage)
<!-- /skilld:best-practices -->

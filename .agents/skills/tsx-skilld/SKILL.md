---
name: tsx-skilld
description: "TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM files. ALWAYS use when writing code importing \"tsx\". Consult for debugging, best practices, or modifying tsx."
metadata:
  version: 4.22.4
  generated_by: cached
  generated_at: 2026-06-05
---

# privatenumber/tsx `tsx@4.22.4`
**Tags:** latest: 4.22.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents API changes and deprecations for tsx v4.22.4. Note: The available documentation covers the current version's API without detailed version history. The following change reflects Node.js runtime compatibility:

- DEPRECATED: `--loader` Node.js CLI flag — deprecated in Node.js v20.6.0 in favour of `--import` flag for loading tsx enhancement. Legacy support remains available for Node.js v20.5.1 and below [source](./.skilld/docs/dev-api/node-cli.md:L9:16)

### Core Developer APIs (v4.22.4)

The following APIs are part of the current tsx Developer API:

- `import 'tsx'` — Entry-point for ESM module enhancement, only affects dynamic imports after registration [source](./.skilld/docs/dev-api/entry-point.md:L1:12)

- `require('tsx/cjs')` — CommonJS-only enhancement API for loading TypeScript files in CommonJS context [source](./.skilld/docs/dev-api/entry-point.md:L21:32)

- `import 'tsx/esm'` — ESM-only enhancement API for loading TypeScript files in module context [source](./.skilld/docs/dev-api/entry-point.md:L34:43)

- `tsImport()` — Native dynamic import function for TypeScript files with optional module caching and file tracking, accessible via `tsx/esm/api` [source](./.skilld/docs/dev-api/ts-import.md:L1:23)

- `tsx.require()` and `tsx.require.resolve()` — Enhanced CommonJS require function with TypeScript support, tracks loaded modules in `require.cache` for dependency tracking [source](./.skilld/docs/dev-api/tsx-require.md:L1:33)

- `tsx.register()` — Registers tsx enhancement at runtime with optional namespace for scoped enhancement; returns unregister function [source](./.skilld/docs/dev-api/register-cjs.md:L11:22)

- `register()` — ESM equivalent of register API with namespace support and `onImport` hook for tracking loaded files [source](./.skilld/docs/dev-api/register-esm.md:L5:52)

- `node --import tsx` — Node.js CLI flag integration (replaces deprecated `--loader` in Node.js v20.6.0+) for adding tsx enhancement to node command directly [source](./.skilld/docs/dev-api/node-cli.md:L1:7)

**Note:** Documentation for tsx v4.22.4 is current, but historical API changes from previous versions (v3.x → v4.x or within v4.x minor releases) are not available in the local reference materials. For comprehensive breaking changes and feature introductions across versions, consult the project's GitHub releases page or changelog.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use recommended `tsconfig.json` settings with `moduleDetection: "force"` and `module: "Preserve"` — these enable consistent type-checking behaviour for tsx's esbuild-based transpilation, ensuring JSX and module detection work as expected [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/typescript.md:L40-L64)

- Keep type checking separate from tsx execution — run `tsc --noEmit` in pre-commit hooks or CI rather than relying on tsx to enforce types, since tsx prioritises fast iteration over type validation [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/typescript.md:L6-L12)

- Enable `verbatimModuleSyntax` in `tsconfig.json` for safer type-only imports — this requires explicit `import type` syntax, preventing subtle issues with transpilers that may not properly handle type erasure [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/typescript.md:L67-L71)

- Substitute `tsx` directly for `node` in commands — tsx is a drop-in replacement supporting all Node.js flags, making it ideal for gradual TypeScript adoption without restructuring workflows [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/node-enhancement.md:L3-L16)

- Use `node --import tsx` when integrating with tools that invoke node directly — this method provides more explicit control over the Node.js environment compared to the tsx CLI, useful for CI/CD and tool integration [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/dev-api/index.md:L8-L10)

- Optimise watch mode with glob patterns to exclude unnecessary directories — use `--exclude "./dist/**/*" --exclude "./node_modules/**/*"` to reduce file-system overhead and improve iteration speed on large projects [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/watch-mode.md:L24-L48)

- Use `tsImport()` for one-time TypeScript loads that should skip caching — the API is designed for packages that need to load configuration files without side effects on the entire runtime [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/dev-api/ts-import.md:L1-L22)

- Use scoped ESM registration with `namespace` to isolate tsx enhancements from the global runtime — this prevents unintended interactions when multiple independent modules need TypeScript support [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/dev-api/register-esm.md:L18-L39)

- Track loaded files with the `onImport` hook to implement dependency tracking for custom watchers — this is essential when building watcher integrations that need to know which files were loaded [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/dev-api/register-esm.md:L44-L52)

- Use `tsx.require.cache` to collect dependencies for dependency tracking and custom watcher implementations — this leverages CommonJS's built-in module cache to traverse the dependency graph without re-executing code [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/dev-api/tsx-require.md:L36-L48)

- Never publish uncompiled TypeScript files in npm packages — always compile to JavaScript with a bundler like pkgroll to avoid TypeScript compilation overhead and ensure consistent behaviour across consumer environments [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/compilation.md:L5-L16)

- Use proper `package.json#exports` structure with dual ESM and CommonJS entry-points for wide compatibility — explicit exports guide tooling and ensure only intended files are available to consumers [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/compilation.md:L32-L54)

- Use `#!/usr/bin/env -S npx tsx` in hashbang for project-local shell scripts — this approach ensures the script uses the project's installed tsx version and works across package managers (npm, pnpm, yarn) [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/shell-scripts.md:L7-L27)

- Configure VS Code's launch configuration with `runtimeExecutable: "tsx"` to enable native TypeScript debugging — this provides a seamless debugging experience without needing a separate build step [source](#/Users/syn/.skilld/references/tsx@4.22.4/docs/vscode.md:L13-L64)
<!-- /skilld:best-practices -->

---
name: tsx-skilld
description: 'ALWAYS use when writing code importing "tsx". Consult for debugging, best practices, or modifying tsx.'
metadata:
  version: 4.22.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# privatenumber/tsx `tsx@4.22.5`

**Tags:** latest: 4.22.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `tsx watch --ignore` flag — deprecated in v4.19.0 in favour of `--exclude` flag. The ignore flag still works but should be replaced with exclude for consistency with other tools. [source](./.skilld/releases/v4.19.0.md)

- DEPRECATED: `node --loader tsx` flag — deprecated in Node.js v20.5.2 in favour of `node --import tsx`. The newer `--import` flag is the standardised Node.js way to load modules and should be used for all new code. [source](./.skilld/docs/dev-api/node-cli.md:L9-L16)

**Also changed:** esbuild upgraded to 0.28 in v4.22.0 · esbuild upgraded in v4.21.0 · Node.js v24/v26 support added in v4.21.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## tsx Best Practices

## Best Practices

- Separate type checking from execution in your workflow — run `tsc --noEmit` in pre-commit hooks or CI while letting tsx focus on fast execution without type verification [source](./.skilld/docs/typescript.md#development-workflow)

- Configure `tsconfig.json` with sensible defaults: `moduleDetection: "force"`, `module: "Preserve"`, `allowJs: true`, `esModuleInterop: true`, `isolatedModules: true` for consistent type-checking behaviour [source](./.skilld/docs/typescript.md#recommendation)

- Replace the `tsx` CLI with `node --import tsx` (v20.6+) when you need direct node control, are integrating with tools that call `node`, or prefer the `node` command [source](./.skilld/docs/dev-api/node-cli.md)

- Use `tsImport()` to load isolated TypeScript files (like config files) without registering runtime enhancements across your entire environment [source](./.skilld/docs/dev-api/ts-import.md)

- Use scoped `register({ namespace: Date.now().toString() })` to isolate hook state when multiple independent tsx registrations coexist [source](./.skilld/docs/dev-api/register-esm.md#scoped-registration)

- Never publish uncompiled TypeScript to npm, even in monorepos where tsx can execute it — use pkgroll to compile to JavaScript first [source](./.skilld/docs/compilation.md)

- Prefer ESM `register()` over CommonJS `register()` for better module caching and alignment with modern JavaScript standards [source](./.skilld/docs/dev-api/register-cjs.md#caveats)

- Track file dependencies with the `onImport` hook when calling `register()` to gather data for implementing custom file watchers [source](./.skilld/docs/dev-api/register-esm.md#tracking-loaded-files)

- Avoid `tsx.require()` when loaded files contain `dynamic import()` statements — use `tsImport()` or the ESM `register()` API instead [source](./.skilld/docs/dev-api/tsx-require.md#caveats)

- Use the `NODE_OPTIONS='--import tsx'` environment variable to enhance node when you cannot modify the command directly (e.g., in tools that invoke binaries) [source](./.skilld/docs/dev-api/node-cli.md#binaries)

- Use `#!/usr/bin/env -S npx tsx` in script shebangs for project-local scripts to ensure the installed project version of tsx is invoked [source](./.skilld/docs/shell-scripts.md#project-scripts)

- Customise watch mode with `--exclude` glob patterns to prevent re-triggering on generated files, vendor directories, or build outputs [source](./.skilld/docs/watch-mode.md#excluding-files-from-watch)

- Attach the VS Code debugger to a running tsx process via `--inspect-brk` rather than launching tsx as the debug runtime to avoid configuration overhead [source](./.skilld/docs/vscode.md#method-2-attach-the-vs-code-debugger-to-a-running-nodejs-process)

- Install `@types/node` alongside TypeScript for full IDE type hints and editor support, even though tsx does not require TypeScript to be installed [source](./.skilld/docs/typescript.md#installation)

<!-- /skilld:best-practices -->

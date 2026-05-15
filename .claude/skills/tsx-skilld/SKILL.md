---
name: tsx-skilld
description: 'ALWAYS use when writing code importing "tsx". Consult for debugging, best practices, or modifying tsx.'
metadata:
  version: 4.22.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# privatenumber/tsx `tsx@4.22.0`

**Tags:** latest: 4.22.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

**Note:** v4.22.0 is not yet released. The latest stable version is v4.21.0. This document covers API changes through v4.21.0.

### Watch Mode

- NEW: `--include` CLI flag to watch additional files — v4.18.0 added the ability to specify files or patterns to include in watch monitoring, complementing the exclusion mechanism [source](./.skilld/releases/v4.18.0.md#features)

- DEPRECATED: `--ignore` flag — v4.19.0 deprecated the `--ignore` flag in favour of the `--exclude` flag for consistency and clarity. The `--ignore` flag still functions but users should migrate to `--exclude` [source](./.skilld/releases/v4.19.0.md#features)

### Node.js CLI Integration

- DEPRECATED: `node --loader tsx` — For Node.js v20.5.1 and older, the `--loader` flag is deprecated. Use `--import` instead for newer Node versions [source](./.skilld/docs/dev-api/node-cli.md#deprecated-nodejs-v2051-and-below)

### ESM / CommonJS APIs

Current stable Developer APIs (`tsImport()`, `tsx.require()`, `register()`) remain stable across v4.x releases with consistent signatures for scoped registration and callback hooks.

**Also changed:** esbuild upgraded to v0.25.0+ · support for Node's `--jitless` flag · Node's native TS format overrides · ESM JSON attribute handling

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## tsx Best Practices

## Best Practices

- Separate type checking from execution — tsx doesn't type-check code on its own. Use `tsc --noEmit` in a separate step, treating type errors like linting rather than blocking compilation. This enables fast iteration during development while maintaining correctness through CI checks [source](./.skilld/docs/typescript.md#type-checking)

- Configure `tsconfig.json` with recommended compiler options — Use `moduleDetection: force`, `module: Preserve`, `resolveJsonModule: true`, `allowJs: true`, `esModuleInterop: true`, and `isolatedModules: true` to ensure consistent behaviour between tsx and TypeScript tooling [source](./.skilld/docs/typescript.md#recommendation)

- Add type checking to pre-commit hooks — Integrate `tsc --noEmit` into git pre-commit hooks using simple-git-hooks, catching type errors before code is committed while allowing fast local execution with tsx [source](./.skilld/docs/typescript.md#pre-commit-hook)

- Use `--exclude` flag in watch mode instead of `--ignore` — The `--ignore` flag was deprecated in v4.19.0. Prefer `--exclude` for consistent glob pattern support and clarity of intent [source](./.skilld/docs/watch-mode.md#excluding-files-from-watch)

- Never publish uncompiled TypeScript in npm packages — Always compile TypeScript to JavaScript before publishing to npm. Source files require specific `tsconfig.json` configuration and cause performance degradation at runtime [source](./.skilld/docs/compilation.md#should-i-publish-typescript-files)

- Use pkgroll for npm package bundling — Recommended bundler for tsx projects, developed by the same author. Automatically infers build output based on `package.json` entry points, supporting CJS, ESM, and dual packages [source](./.skilld/docs/compilation.md#compiling-an-npm-package)

- Use `--import` flag or `node --import tsx` for TypeScript with node — More visible than importing tsx within source code. Use `node --import tsx ./file.ts` when needing direct node invocation or integrating with tools that specifically call node [source](./.skilld/docs/dev-api/index.md#directly-running-node)

- Use scoped registration with namespace for isolated TypeScript loading — When third-party code needs to load TypeScript files without affecting the entire runtime, use `register({ namespace: ... })` to return a private `import()` function with no cache interactions [source](./.skilld/docs/dev-api/register-esm.md#scoped-registration)

- Use `tsImport()` for one-time TypeScript file imports — Load TypeScript files without module caching when the same file won't be imported multiple times. Requires passing the caller's `import.meta.url` for proper resolution context [source](./.skilld/docs/dev-api/ts-import.md#usage)

- Position tsx flags and script arguments correctly — Place tsx flags immediately after `tsx`, and place script flags and arguments after the script path: `tsx [tsx flags] ./file.ts [script flags & arguments]`. Incorrect positioning can cause unexpected behaviour [source](./.skilld/docs/node-enhancement.md#flag--arguments-positioning)

- Treat tsx as a drop-in replacement for node with full feature parity — All Node.js command-line flags are supported without modification. You can swap `node` for `tsx` directly in package.json scripts, shell commands, or CI/CD pipelines [source](./.skilld/docs/node-enhancement.md#swap-node-for-tsx)

- Use tsx with Node's built-in test runner for TypeScript test support — Run `tsx --test` to execute tests with automatic detection of TypeScript test files matching standard patterns (`*.test.ts`, `*-test.ts`, `test/*.ts`, etc.) [source](./.skilld/docs/node-enhancement.md#test-runner)

- Use shell script hashbang with `-S` flag for package-managed tsx — Write executable TypeScript shell scripts using `#!/usr/bin/env -S npx tsx` (or pnpm/yarn equivalent), ensuring tsx is invoked through your package manager and resolving correctly across environments [source](./.skilld/docs/shell-scripts.md#project-scripts)

- Use `tsx/cli` as a workaround for worker threads — When using worker threads with TypeScript, load `tsx/cli` instead of the TypeScript file directly, passing the actual script as an `argv` entry. This works around Node's module resolution limitation with tsx-enhanced code [source](./.skilld/issues/issue-354.md)
<!-- /skilld:best-practices -->

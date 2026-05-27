---
name: tsx-skilld
description: 'TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM files. ALWAYS use when writing code importing "tsx". Consult for debugging, best practices, or modifying tsx.'
metadata:
  version: 4.22.3
  generated_by: cached
  generated_at: 2026-05-27
---

# privatenumber/tsx `tsx@4.22.3`

**Tags:** latest: 4.22.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tsx` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tsx` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `watch` command's `ignore` flag — v4.19.0 deprecated in favor of `exclude` flag [source](./.skilld/repos/privatenumber/tsx/releases/v4.19.0.md#features)

- NEW: `watch` command's `--include` CLI flag — new in v4.18.0 to watch additional files [source](./.skilld/repos/privatenumber/tsx/releases/v4.18.0.md#features)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Avoid publishing uncompiled TypeScript for npm packages: Uncompiled TypeScript is discouraged in published packages due to specific compilation configurations and performance overhead. [source](./.skilld/docs/compilation.md#should-i-publish-typescript-files)

- Use `pkgroll` for bundling npm packages with `tsx`: `pkgroll` is the recommended bundler for `tsx` projects due to its alignment with `tsx`'s development and automatic build configuration inference. [source](./.skilld/docs/compilation.md#compiling-an-npm-package)

- Frame general questions for Node.js/TypeScript, not `tsx`: When seeking solutions for general problems, consider them as Node.js or TypeScript questions rather than `tsx`-specific, as `tsx` is largely a `node` alias. [source](./.skilld/docs/faq.md#how-can-i-do-______-in-tsx)

- Position `tsx` flags immediately after the `tsx` command: Always place `tsx` specific flags directly after `tsx`, and any flags or arguments for your script should follow the script path. [source](./.skilld/docs/node-enhancement.md#flag-arguments-positioning)

- Separate type checking from `tsx` execution in development: `tsx` does not perform type checking. Integrate type checking into pre-commit hooks or CI checks to enable faster development iteration while maintaining type safety. [source](./.skilld/docs/typescript.md#development-workflow)

- Explicitly install `typescript` and `@types/node` for type checking: For robust type checking in `tsx` projects, ensure `typescript` and `@types/node` are installed as dev dependencies. [source](./.skilld/docs/typescript.md#installation)

- Use `moduleDetection: "force"` in `tsconfig.json` for consistent module treatment: Set `moduleDetection: "force"` in your `tsconfig.json` to ensure files are consistently treated as modules, even without explicit import/export. [source](./.skilld/docs/typescript.md#recommendation)

- Enable `isolatedModules` in `tsconfig.json` to avoid cross-file awareness issues: Configure `isolatedModules: true` in your `tsconfig.json` to disallow features that require cross-file awareness, which aligns with `tsx`'s compilation model. [source](./.skilld/docs/typescript.md#recommendation)

- Use `tsc --noEmit` for dedicated type checking in scripts: Implement a `package.json` script, such as `"type-check": "tsc --noEmit"`, to perform type checks without generating JavaScript output. [source](./.skilld/docs/typescript.md#type-checking)

- Customize `tsx watch` with `--include` and `--exclude` flags: Fine-tune watch mode behavior by using `--include` to add specific paths and `--exclude` to ignore others, remembering to quote glob patterns. [source](./.skilld/docs/watch-mode.md#customizing-watched-files)

- Prefer `node --import tsx` for enhanced Node.js execution: When direct `node` command control is needed while retaining `tsx` enhancements, use `node --import tsx ./file.ts`. [source](./.skilld/docs/dev-api/index.md#directly-running-node)

- Specify custom `tsconfig.json` for `node --import tsx` via `TSX_TSCONFIG_PATH`: When using `node --import tsx`, define a custom `tsconfig.json` path using the `TSX_TSCONFIG_PATH` environment variable. [source](./.skilld/docs/dev-api/node-cli.md#custom-tsconfigjson-path)

- Enhance binaries using `NODE_OPTIONS='--import tsx'`: To apply `tsx` enhancements to executables that internally invoke `node`, set the `NODE_OPTIONS` environment variable to `'--import tsx'`. [source](./.skilld/docs/dev-api/node-cli.md#binaries)

- Use `node --require tsx/cjs` or `node --import tsx/esm` for module-specific enhancements: For precise control over module types, use `tsx/cjs` with `--require` for CommonJS or `tsx/esm` with `--import` for ESM. [source](./.skilld/docs/dev-api/node-cli.md#commonjs-mode-only)
<!-- /skilld:best-practices -->

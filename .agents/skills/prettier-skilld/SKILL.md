---
name: prettier-skilld
description: "ALWAYS use when writing code importing \"prettier\". Consult for debugging, best practices, or modifying prettier."
metadata:
  version: 3.9.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# prettier/prettier `prettier@3.9.5`
**Tags:** next: 4.0.0-alpha.13, latest: 3.9.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p prettier` instead of grepping `.skilld/` directories. Run `skilld search --guide -p prettier` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Prettier API Changes

## Version Coverage

 **Note:** Installed version is v3.9.5, but local `.skilld` reference data extends only to v3.8.0. This documentation covers v3.4.0–v3.8.0. For v3.9.0+ changes, consult the official Prettier release notes.

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Custom Parser API `parse` function option removed in v3.0.0, superseded by the Plugin API — use `plugins` option with parser/printer objects instead [source](./.skilld/docs/api.md:L141:195)

- NEW: async `preprocess` function in parser objects — first added in v3.7.0, allows asynchronous preprocessing of input text before parsing [source](./.skilld/docs/plugins.md:L175)

- NEW: `printers` export with type declarations in plugin modules — v3.8.1 added proper TypeScript typing for `printers` property on plugin exports, e.g. `prettierPluginEstree.printers.estree` now typed as `Printer` [source](./.skilld/releases/CHANGELOG.md:L107:121)

- BREAKING: `module-sync` condition removed from `package.json` — v3.5.2 reverted v3.5.0 change, so `require("prettier")` uses CommonJS version, not ESM [source](./.skilld/releases/CHANGELOG.md:L367:369)

- NEW: `jsonc` parser introduced in v3.2.0 for JSON with Comments — parses files like `tsconfig.json` as JSONC (with trailing commas) by default [source](./.skilld/releases/CHANGELOG.md:L695:798)

- NEW: TypeScript 5.2 `using` and `await using` declarations supported in v3.0.3 — Explicit Resource Management syntax now formats correctly [source](./.skilld/releases/CHANGELOG.md:L1130:1140)

- NEW: Angular `@let` declaration syntax support added in v3.3.3 — Angular v18 template variable declarations now format and parse correctly [source](./.skilld/releases/CHANGELOG.md:L571:587)

- BREAKING: `tsconfig.json` inferred parser changed from `jsonc` to `json` in v3.2.5 — avoids third-party tool compatibility issues with `.json` extension, override in `.prettierrc` if needed [source](./.skilld/releases/CHANGELOG.md:L763:797)

- NEW: `getVisitorKeys` method on `Printer` type — v3.0.1 added missing method definition for custom AST node traversal in plugins [source](./.skilld/releases/CHANGELOG.md:L1323:1332)

- NEW: `preprocess` method on `Printer` type — v3.0.1 added missing type definition for printer preprocessing [source](./.skilld/releases/CHANGELOG.md:L1314:1320)

**Also changed:** Support for decorator expressions v3.3.3 · Angular v21.1 in v3.8.0 · Import Attributes in v3.1.1 · TypeScript 5.0 features in v2.8.5 · auto-accessor syntax in v2.8.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `resolveConfig()` to load and merge project configuration before formatting — ensures the formatter respects local settings and `.editorconfig` if enabled [source](./.skilld/docs/api.md#prettierresolveconfigfileurlOrPath--options)

- Pass `filepath` to `format()` to let Prettier infer the parser from file extension — avoids needing to explicitly set `parser` and makes code more portable [source](./.skilld/docs/api.md#prettierformatsource-options)

- Use `formatWithCursor()` for editor integrations instead of `format()` — preserves cursor position and prevents jarring UI behaviour when formatting on save [source](./.skilld/docs/api.md#prettierformatwithcursorsource--options)

- Use `check()` instead of `format()` in CI pipelines — verifies files are properly formatted without modifying them, enabling fail-on-format-issues workflows [source](./.skilld/docs/api.md#prettiercheckfiles--options)

- Always create a `.prettierignore` file in your project root — lets you safely run `prettier --write .` without mangling generated code or build artefacts [source](./.skilld/docs/ignore.md#ignoring-files-prettierignore)

- Use `overrides` in configuration for file-specific formatting rules — allows different settings per file pattern without duplicating configuration [source](./.skilld/docs/configuration.md#configuration-overrides)

- Never place the `parser` option at configuration root level — only use it inside `overrides` to preserve Prettier's automatic parser inference for all file types [source](./.skilld/docs/configuration.md#setting-the-parser-option)

- Define configuration in `.prettierrc.ts` or `prettier.config.ts` with explicit `Config` type annotation — enables IDE autocomplete and TypeScript type safety [source](./.skilld/docs/configuration.md#typescript-configuration-files)

- Use `lint-staged` with pre-commit hooks instead of ESLint plugins for formatting — avoids the performance cost and indirection of running Prettier as a linter rule [source](./.skilld/docs/integrating-with-linters.md#notes)

- Use `--debug-check` when first integrating Prettier into a codebase — detects if formatting might accidentally change code correctness [source](./.skilld/docs/cli.md#--debug-check)

- Call `prettier --find-config-path` once and reuse the result with `--config` in batch operations — eliminates repeated configuration file lookups for performance [source](./.skilld/docs/cli.md#--find-config-path-and---config)

- Use `getFileInfo()` to check if a file needs formatting before calling `format()` — determines ignored status and inferred parser in a single call [source](./.skilld/docs/api.md#prettiergetfileinfourlOrPath--options)

- Pass `--stdin-filepath` when piping code to Prettier — lets Prettier infer the correct parser and respect `.prettierignore` rules based on the filename [source](./.skilld/docs/cli.md#--stdin-filepath)

- Load plugins via the configuration file instead of CLI flags — ensures all tooling (editors, scripts, CI) uses the same consistent plugin set [source](./.skilld/docs/plugins.md#using-plugins)
<!-- /skilld:best-practices -->

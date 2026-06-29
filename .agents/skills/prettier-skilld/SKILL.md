---
name: prettier-skilld
description: 'ALWAYS use when writing code importing "prettier". Consult for debugging, best practices, or modifying prettier.'
metadata:
  version: 3.9.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# prettier/prettier `prettier@3.9.3`

**Tags:** next: 4.0.0-alpha.13, latest: 3.9.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p prettier` instead of grepping `.skilld/` directories. Run `skilld search --guide -p prettier` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

**Note:** The local skill documentation covers up to v3.8.0 (latest available). For v3.9.3, refer to the official Prettier releases.

- BREAKING: `module-sync` condition removed from `package.json` in v3.5.2 — `require("prettier")` now uses CommonJS version only, not ESM [source](./.skilld/releases/CHANGELOG.md:L367)

- NEW (type): `printers` now included in plugin type declarations (v3.8.1) — enables type-safe access to `prettier/plugins/estree` printers [source](./.skilld/releases/CHANGELOG.md:L107:L121)

- BREAKING (type): Plugin `Printer` interface expanded in v3.0.1 — added `preprocess?` method signature and `getVisitorKeys(node, nonTraversableKeys)` method with full typing [source](./.skilld/releases/CHANGELOG.md:L1312:L1332)

- NEW (type): `AstPath.map()` now accepts `readonly` array property keys (v3.0.1) — fixes TypeScript errors when mapping readonly AST properties [source](./.skilld/releases/CHANGELOG.md:L1334:L1365)

- BREAKING: Custom Parser API removed in v3.0.0 — use Plugin API instead; `--parser` no longer accepts module paths [source](./.skilld/docs/api.md:L141:L195)

- FIXED: `prettier.getFileInfo()` regression in v3.7.2–3.7.3 — VSCode extensions required fix to plugin loading compatibility [source](./.skilld/releases/CHANGELOG.md:L193)

**Also changed:** CLI `--debug-print-ast` added v2.4.0 · `prettier.getSupportInfo()` now reports correct parser names v1.16+ · `@types/node` typing for `readonly` arrays on AST nodes v3.0.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Always use asynchronous API methods (`format`, `check`, `resolveConfig`) — the synchronous `@prettier/sync` wrapper exists only for special cases where async code is impossible [source](./.skilld/docs/api.md#prettiformatsouce-options)

- Use `resolveConfig()` paired with `filepath` when formatting programmatically — this respects per-file configuration and editor overrides, ensuring consistency across your tools [source](./.skilld/docs/api.md#L38:L56)

- Infer parser from file extension via `filepath` option rather than setting explicit `parser` — lets Prettier auto-detect and prevents accidentally parsing incompatible filetypes [source](./.skilld/docs/api.md#L16)

- **Never** place `parser` option at root level of config file — put it only inside `overrides` to preserve automatic file-type detection based on extensions [source](./.skilld/docs/configuration.md#L206)

- Use configuration files (`.prettierrc`, `prettier.config.js`, etc.) instead of CLI flags — ensures consistency across the CLI, editor integrations, and other tooling that consume the same config [source](./.skilld/docs/cli.md#L42:L46)

- Define `overrides` for files with unusual extensions — allows teaching Prettier how to parse unrecognized filetypes without disabling auto-detection for the rest [source](./.skilld/docs/configuration.md#L131:L204)

- Leverage `.editorconfig` to share settings with non-Prettier tools — Prettier respects properties like `end_of_line`, `indent_style`, and `indent_size`, bridging configuration across your toolchain [source](./.skilld/docs/configuration.md#L212:L253)

- Create a `.prettierignore` file in your project root — enables safe `prettier --write .` runs that skip only the files you intend, and signals to editors which files should not be formatted [source](./.skilld/docs/ignore.md#L5:L25)

- Use `eslint-config-prettier` instead of `eslint-plugin-prettier` — running Prettier as a linting rule is slower, creates visual noise, and adds unnecessary indirection when Prettier can run standalone [source](./.skilld/docs/integrating-with-linters.md#L15:L30)

- Use `--check` flag in CI pipelines for clarity — returns helpful exit codes (0 = formatted, 1 = unformatted) and prints human-friendly messages about which files need formatting [source](./.skilld/docs/cli.md#L64:L102)

- Use `lint-staged` with Prettier for pre-commit hooks — especially effective when combining Prettier with other code-quality tools (ESLint, Stylelint); supports partial staging via `git add --patch` [source](./.skilld/docs/precommit.md#L11:L24)

- Use the Plugin API for language extensions, not custom parsers — custom parsers were removed in v3.0.0; plugins provide a more powerful, standardized interface with access to printers, options, and utilities [source](./.skilld/docs/api.md#L139:L194)

- Share Prettier config as a scoped npm package for teams — publish `@username/prettier-config` with peerDependencies on Prettier itself, enabling effortless config distribution and updates [source](./.skilld/docs/sharing-configurations.md#L13:L70)

- Always quote glob patterns in the CLI to ensure cross-platform compatibility — unquoted globs expand at the shell level, which varies between platforms; quoted globs let Prettier expand them consistently [source](./.skilld/docs/cli.md#L36:L40)

<!-- /skilld:best-practices -->

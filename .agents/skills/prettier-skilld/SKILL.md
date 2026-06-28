---
name: prettier-skilld
description: 'ALWAYS use when writing code importing "prettier". Consult for debugging, best practices, or modifying prettier.'
metadata:
  version: 3.9.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-28
---

# prettier/prettier `prettier@3.9.1`

**Tags:** next: 4.0.0-alpha.13, latest: 3.9.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p prettier` instead of grepping `.skilld/` directories. Run `skilld search --guide -p prettier` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Custom parser API removed in v3.0.0 — replaced by Plugin API. Old signature `parser(text, { babel })` is no longer supported; use `parsers` and `printers` objects in plugin exports instead [source](./.skilld/docs/api.md:L141:L195)

- NEW: `printers` property type declarations — v3.8.1 added type safety for plugin printer exports, `prettierPluginEstree.printers.estree` now correctly types as `Printer` instead of `any` [source](./.skilld/releases/CHANGELOG.md:L106:L120)

- BREAKING: `prettier.getFileInfo()` — v3.7.0 introduced breaking change, v3.7.3 fixed regression where VSCode extension plugin loading broke due to internal refactor [source](./.skilld/releases/CHANGELOG.md:L192:L194)

- NEW: Async `preprocess` support in parsers — v3.7.0 added support for async preprocessing in parser `preprocess` functions, allowing async transformation of source text before parsing [source](./.skilld/docs/plugins.md:L172)

- NEW: `objectWrap` option — v3.5.0 introduced option to control how object literals wrap when they could fit on one line or span multiple lines; valid options are `"preserve"` (default, keeps multi-line if newline before first property) or `"collapse"` (fits to single line when possible) [source](./.skilld/docs/options.md:L169:L184)

- DEPRECATED: `FastPath<T>` type — replaced by `AstPath<T>` as the primary path type in plugins; `FastPath` is maintained as a deprecated alias for backward compatibility [source](./node_modules/prettier/index.d.ts:L273:L274)

- DEPRECATED: `jsxBracketSameLine` option — deprecated in v2.4.0, use `bracketSameLine` instead for controlling whether the `>` of multi-line JSX elements appears at end of last line or alone on next line [source](./.skilld/docs/options.md:L221:L260)

**Also changed:** Parser `hasPragma()` and `hasIgnorePragma()` support in plugin parser definitions · `canAttachComment()` method in printer API · `massageAstNode()` method for custom AST transformation
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Prettier v3.9.1 Best Practices

## Best Practices

- Resolve configuration once and reuse it across multiple format operations when formatting many files programmatically — the `useCache: false` option bypasses config caching to force fresh resolution if file system changes occur between operations [source](./.skilld/docs/api.md#prettierresolveconfigfileUrlOrPath--options)

- Use configuration files over CLI options to ensure consistency — editor integrations, pre-commit hooks, and other tooling automatically discover and respect configuration files, making the build reproducible across environments [source](./.skilld/docs/configuration.md#basic-configuration)

- Always create and maintain a `.prettierignore` file — it's recommended to prevent formatting of generated files, build artifacts, and node_modules, enabling safe use of `prettier --write .` to format entire projects without risk [source](./.skilld/docs/ignore.md)

- Define parser options only inside `overrides` blocks, never at the top level of configuration — top-level parser declarations disable automatic parser inference by file extension, breaking formatting for unrelated file types [source](./.skilld/docs/configuration.md#setting-the-parser-option)

- Use configuration overrides with glob patterns to apply different formatting rules to specific files or directories — this avoids duplicating entire config blocks and scales better than project-wide settings [source](./.skilld/docs/configuration.md#configuration-overrides)

- Understand `printWidth` as a formatting target, not a hard limit — Prettier strives to meet the target but does not enforce it strictly, unlike linters' `max-len` rules which block code at the boundary [source](./.skilld/docs/options.md#print-width)

- Pair `.editorconfig` files with Prettier configuration for IDE-independent formatting — EditorConfig properties override Prettier's internal defaults but are themselves overridden by `.prettierrc` and other Prettier config files [source](./.skilld/docs/configuration.md#editorconfig)

- Use `eslint-config-prettier` when combining with ESLint, not `eslint-plugin-prettier` — running Prettier as a linter rule is slower, adds editor noise, and introduces unnecessary indirection compared to running Prettier directly [source](./.skilld/docs/integrating-with-linters.md#notes)

- Use `prettier.check()` or `prettier --check` in CI pipelines instead of `--write` — it returns proper exit codes and provides human-friendly output for CI workflows without modifying files [source](./.skilld/docs/cli.md#--check)

- Always pass the `plugins` option when using Prettier's browser standalone version — unlike the Node API which auto-loads plugins, the browser version requires explicit plugin imports because all parsers (including JavaScript) are distributed as plugins to reduce bundle size [source](./.skilld/docs/browser.md#usage)

- Load all related parser plugins when formatting embedded languages in the browser — formatting JavaScript templates with embedded HTML requires both the `babel` parser and the `html` parser plugins to format the embedded code blocks [source](./.skilld/docs/browser.md#parser-plugins-for-embedded-code)

- Use `prettier.formatWithCursor()` in editor integrations to preserve cursor position — translates the unformatted cursor offset to the formatted code offset, preventing jarring cursor movement when code is auto-formatted [source](./.skilld/docs/api.md#prettierformatwithcursorsource--options)

- Create shareable config packages with `peerDependencies` rather than `dependencies` for Prettier — peer dependencies signal that Prettier is a shared platform dependency and prevent version conflicts when multiple configs are combined in a project [source](./.skilld/docs/sharing-configurations.md#creating-a-shareable-config)

- Combine Prettier with other linters via `lint-staged` pre-commit hooks rather than running Prettier as a linter plugin — lint-staged allows multiple formatters and linters to cooperate without performance penalties, and properly handles partially staged files via `git add --patch` [source](./.skilld/docs/precommit.md#option-1-lint-staged)

<!-- /skilld:best-practices -->

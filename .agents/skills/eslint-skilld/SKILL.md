---
name: eslint-skilld
description: 'ALWAYS use when writing code importing "eslint". Consult for debugging, best practices, or modifying eslint.'
metadata:
  version: 10.6.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-28
---

# eslint/eslint `eslint@10.6.0`

**Tags:** es6jsx: 0.11.0-alpha.0, next: 10.0.0-rc.2, maintenance: 9.39.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes from v9 → v10

- BREAKING: `chalk` removed from `stylish` formatter, replaced with Node.js `styleText` API in v10.0.0 — output behavior changes with environment variables (`NO_COLOR`, `NODE_DISABLE_COLORS`, `FORCE_COLOR`) and `--color`/`--no-color` flags now take precedence [source](./.skilld/releases/v10.0.0.md:L11) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L172)

- BREAKING: JSX references are now tracked — `<Card>` is treated as a variable reference, affecting `no-unused-vars` and `no-undef` rules; custom rules relying on scope analysis may encounter `JSXIdentifier` references [source](./.skilld/releases/v10.0.0.md:L12) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L109)

- BREAKING: `eslint:recommended` configuration updated — three new rules enabled: `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error` [source](./.skilld/releases/v10.0.0.md:L28) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L69)

- BREAKING: Config file lookup algorithm changed — `eslint.config.js` is now located starting from each linted file's directory, not the cwd; `v10_config_lookup_from_file` flag removed [source](./.skilld/releases/v10.0.0.md:L19) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L81)

- BREAKING: ESLintrc format (`.eslintrc`, `.eslintrc.json`) no longer supported — only flat config (`eslint.config.js`) is supported; `FlatESLint` and `LegacyESLint` exports removed, use `ESLint` only [source](./.skilld/releases/v10.0.0.md:L18) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L95)

- BREAKING: `eslint-env` comments reported as errors — `/* eslint-env node */` style comments no longer supported [source](./.skilld/releases/v10.0.0.md:L25) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L134)

- BREAKING: `SourceCode` deprecated methods removed (#20137) — use alternatives from current API [source](./.skilld/releases/v10.0.0.md:L14)

- BREAKING: Rule context deprecated methods removed (#20086) — update custom rules to use non-deprecated equivalents [source](./.skilld/releases/v10.0.0.md:L17)

- BREAKING: `LintMessage#nodeType` property removed (#20096) — do not access this field [source](./.skilld/releases/v10.0.0.md:L26)

- BREAKING: `TestCaseError#type` property removed (#20096) — replaced with `RuleTester` location estimation [source](./.skilld/releases/v10.0.0.md:L26)

- BREAKING: `Program` AST node range now spans entire source text (#20133) — affects node boundary calculations [source](./.skilld/releases/v10.0.0.md:L21)

- BREAKING: `RuleFixer` methods require string `text` arguments (#20082) — all fixer methods must receive string values, not other types [source](./.skilld/releases/v10.0.0.md:L22)

- BREAKING: `ScopeManager` implementations must support `addGlobals()` method (#20132) — custom parser implementations need to implement this [source](./.skilld/releases/v10.0.0.md:L19)

- BREAKING: Minimatch v10 with POSIX character classes in glob patterns — bracket expressions now support `[[:upper:]]`, `[[:lower:]]` etc., existing glob patterns may match differently [source](./.skilld/releases/v10.0.0.md:L15) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L156)

- BREAKING: `no-shadow-restricted-names` now reports `globalThis` by default (#20027) — may produce new linting errors in existing codebases [source](./.skilld/releases/v10.0.0.md:L30)

- BREAKING: `func-names` schema stricter (#20119) — validation rules tightened [source](./.skilld/releases/v10.0.0.md:L24)

- BREAKING: `no-invalid-regexp` `allowConstructorFlags` option requires `uniqueItems: true` (#20155) — duplicates in this array are now rejected [source](./.skilld/releases/v10.0.0.md:L20)

### New APIs in v10.x

- NEW: `meta.languages` support in rules (#20571, v10.2.0) — rules can now declare supported languages via `meta.languages` array [source](./.skilld/releases/v10.2.0.md:L10)

- NEW: `includeIgnoreFile()` function in `eslint/config` (#20735, v10.4.0) — enables programmatic inclusion of `.eslintignore`-style files in flat config [source](./.skilld/releases/v10.4.0.md:L11)

- NEW: `name` property on configuration objects (v10.0.0) — configs can now be named for debugging and reporting [source](./.skilld/releases/v10.0.0.md:L13)

- NEW: Bulk-suppressions API (v10.1.0) — `ESLint` API now supports bulk suppression operations for multiple files [source](./.skilld/releases/v10.1.0.md:L11)

- NEW: `RuleTester` `requireData` assertion option (#20409, v10.0.0) — allows tests to require specific data from rule context [source](./.skilld/releases/v10.0.0.md:L37)

- NEW: `RuleTester` error assertion options (#20247, v10.0.0) — enhanced error validation in test cases [source](./.skilld/releases/v10.0.0.md:L40)

### Deprecated APIs

- DEPRECATED: `radix` rule options `"always"` and `"as-needed"` (v10.0.0) — rule now always enforces providing radix; remove explicit option or leave as default [source](./.skilld/releases/v10.0.0.md:L23) · [migration](./.skilld/docs/src/use/migrate-to-10.0.0.md:L191)

**Also changed:** `Temporal` added to ES2026 globals (v10.2.0) · `Temporal` added to `no-obj-calls` rule (v10.2.0) · `Array.fromAsync` handling in `array-callback-return` (v10.0.0) · `self` parameter in `no-implied-eval` (v10.0.0) · Rule tester failure location estimation improved (v10.0.0) · Error location reporting for `require-yield` and `no-useless-constructor` (v10.0.0) · `no-var` autofix improvements (v10.1.0) · Node.js v20.19.0+, v22.13.0+, v24+ required (v10.0.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `defineConfig()` helper when creating configuration arrays — enables type inference, plugin namespace resolution, and makes composition more explicit [source](./.skilld/docs/src/use/getting-started.md:L59:68)

- Apply rules to specific file patterns with `files` and `ignores` keys in configuration objects — files without these keys apply globally, which may be unintended [source](./.skilld/docs/src/use/configure/configuration-files.md:L89:119)

- Set `name` property on configuration objects for clarity in debugging output and config inspector — helps identify which config object is applying rules to a file [source](./.skilld/docs/src/use/configure/configuration-files.md:L67:68)

- Use configuration objects without `files` or `ignores` to define global rule configuration — they automatically apply to any file matched by other config objects [source](./.skilld/docs/src/use/configure/configuration-files.md:L121:135)

- Combine configurations with `extends` to merge predefined and shareable configs — preferred over manual property merging [source](./.skilld/docs/src/use/configure/combine-configs.md:L12:34)

- Enable `reportUnusedDisableDirectives` to catch stale `eslint disable` comments that no longer affect rules [source](./.skilld/docs/src/use/configure/configuration-files.md:L81:82)

- Declare `languages` property in custom rules to restrict execution to specific language types — prevents errors when rules are applied to unsupported languages [source](./.skilld/docs/src/extend/custom-rule-tutorial.md:L95:107)

- Use `messageId`s in `context.report()` instead of hardcoded message strings — enables maintainability, i18n, and consistency across rule variants [source](./.skilld/docs/src/extend/custom-rules.md:L58)

- Specify `meta.fixable` property when rule can modify code and `meta.hasSuggestions` when rule provides alternatives — ESLint throws if these are missing when attempting fixes or suggestions [source](./.skilld/docs/src/extend/custom-rules.md:L59:65)

- Use AST selectors in rule visitors for targeted node matching instead of broad visitor patterns — enables more concise rules and filters nodes before callback execution [source](./.skilld/docs/src/extend/selectors.md:L55:83)

- Provide `meta.namespace` in plugins to enable ESLint to resolve the plugin even if users register it under a different name — recommended for better plugin discovery [source](./.skilld/docs/src/extend/plugins.md:L42:64)

- Run config inspector with `--inspect-config` flag during setup to verify which configuration objects match target files — crucial for diagnosing unexpected rule application [source](./.skilld/docs/src/use/configure/debug.md:L68:83)

- Separate JavaScript-specific configuration into its own config object with `files: ["**/*.js", "**/*.cjs", "**/*.mjs"]` rather than relying on defaults — ensures rules don't unexpectedly apply to non-JS files [source](./.skilld/docs/src/use/configure/configuration-files.md:L139:144)

- Use `baseConfig` and `overrideConfig` in the Node.js API when linting text in tests — allows full control over configuration without relying on config file discovery [source](./.skilld/docs/src/integrate/nodejs-api.md:L143:147)

<!-- /skilld:best-practices -->

---
name: eslint-js-skilld
description: 'ESLint JavaScript language implementation. ALWAYS use when writing code importing "@eslint/js". Consult for debugging, best practices, or modifying @eslint/js, eslint/js, eslint js, eslint.'
metadata:
  version: 10.0.1
  generated_by: cached
  generated_at: 2026-05-27
---

# eslint/eslint `@eslint/js@10.0.1`

**Tags:** next: 10.0.0-rc.0, latest: 10.0.1, maintenance: 9.39.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @eslint/js` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @eslint/js` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Deprecated `SourceCode` methods removed — v10 eliminates methods marked deprecated in v9, code using `SourceCode#getCommentsBefore()`, `SourceCode#getCommentsAfter()`, `SourceCode#getCommentsInside()`, or `SourceCode#getJSDocComment()` will fail [source](./.skilld/releases/v10.0.0.md:L14)

- BREAKING: Rule context methods removed — v10 deletes `context.getFilename()`, `context.getPhysicalFilename()`, `context.getCwd()`, and `context.getSourceCode()` that were deprecated; use rule metadata instead [source](./.skilld/releases/v10.0.0.md:L17)

- BREAKING: ESLintRC configuration format no longer supported — `.eslintrc*` files are no longer parsed; only flat config (`eslint.config.js`) works in v10 [source](./.skilld/releases/v10.0.0.md:L18)

- BREAKING: `chalk` replaced with `styleText` in console output — formatters and logging no longer use the `chalk` library; `color` property added to `ResultsMeta` for colour information [source](./.skilld/releases/v10.0.0.md:L11)

- BREAKING: `LintMessage#nodeType` and `TestCaseError#type` properties removed — type definitions no longer expose these fields; use `LintMessage#node` for AST node access [source](./.skilld/releases/v10.0.0.md:L26)

- BREAKING: JSX reference tracking enabled by default — JSX components are now tracked in scope analysis; existing rules may report different results for JSX code [source](./.skilld/releases/v10.0.0.md:L12)

- BREAKING: `eslint-env` comments now error — comments like `/* eslint-env node */` cause linting failures instead of being silently ignored [source](./.skilld/releases/v10.0.0.md:L25)

- BREAKING: Node.js requirement raised — v10 requires Node.js `^20.19.0 || ^22.13.0 || >=24`; v18 and early v20 are unsupported [source](./.skilld/releases/v10.0.0.md:L31)

- NEW: `meta.name` added to configuration objects — configs now include a `name` property for identification in config chains [source](./.skilld/releases/v10.0.0.md:L13)

- DEPRECATED: `"always"` and `"as-needed"` options for `radix` rule — these options are deprecated in v10 but still functional; use the numeric base directly instead [source](./.skilld/releases/v10.0.0.md:L23)

- NEW: `Array.fromAsync` support in `array-callback-return` rule — rule now recognises async callback semantics in `Array.fromAsync()` [source](./.skilld/releases/v10.0.0.md:L34)

- NEW: `countThis` option for `max-params` rule — new boolean option to count `this` binding as a parameter [source](./.skilld/releases/v10.0.0.md:L39)

- NEW: `requireData` assertion option for `RuleTester` — allows rules to assert that rule data was provided during violation reporting [source](./.skilld/releases/v10.0.0.md:L37)

- NEW: Error assertion options for `RuleTester` — enhanced error validation in tests with new assertion options [source](./.skilld/releases/v10.0.0.md:L40)

- NEW: Test case failure index output — `RuleTester` now outputs which test case failed (numbered index) in error messages [source](./.skilld/releases/v10.0.0.md:L38)

- BREAKING: Rule context `getFilename()` and related methods removed — `RuleTester` assertions for valid test cases are stricter [source](./.skilld/releases/v10.0.0.md:L16)

- NEW: `no-var` autofix in `TSModuleBlock` — v10.1.0 extends `no-var` autofix to TypeScript module blocks [source](./.skilld/releases/v10.1.0.md:L10)

- NEW: Bulk-suppressions API support — v10.1.0 implements API support for bulk inline suppressions [source](./.skilld/releases/v10.1.0.md:L11)

- NEW: `meta.languages` support in rules — v10.2.0 rules can declare supported languages via `meta.languages` property [source](./.skilld/releases/v10.2.0.md:L10)

**Also changed:** `no-shadow` improved for expression names · `no-invalid-regexp` schema requires unique items · `func-names` schema tightened · Program range spans entire source · `RuleTester` text assertion validation · `no-shadow-restricted-names` reports globalThis · Temporal added to `no-obj-calls` and ES2026 globals · `self` added to `no-implied-eval` · `require-yield` and `no-useless-constructor` error location improved

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Always include a `files` property when extending `js.configs` in a config object — prevents unintended configuration spreading to files it was never meant to apply to [source](./.skilld/issues/issue-20075.md)

- Use `js.configs.recommended` as the safe default over `js.configs.all` — recommended is curated by the ESLint team for production use, while all enables every rule including experimental ones [source](./.skilld/pkg/README.md:L23:26)

- Include a `name` property on every config object — enables clear debugging and rule origin tracking when configurations interact [source](./.skilld/releases/v10.0.0.md:L13)

- Scope language-specific configs separately after `js.configs` — the v10 flat config model requires explicit file matching to prevent rule application beyond intended targets [source](./.skilld/issues/issue-20075.md)

- Reassign duplicate plugins when combining multiple shareable configs — redefining the same plugin causes errors unless the plugin instance is manually set to the preferred version [source](./.skilld/discussions/discussion-19981.md:L39:45)

- Review v10 recommended config additions before upgrading — v10 added `no-unassigned-vars`, `no-useless-assignment`, and `preserve-caught-error` to the recommended set [source](./.skilld/releases/v10.0.0.md:L454)

- Expect cache invalidation on first `--fix` run after config changes — autofix invalidates cache entries because file content changes, requiring re-linting and multiple passes [source](./.skilld/discussions/discussion-20292.md:L23:36)

- Use `defineConfig()` wrapper when extending `js.configs` in shareable configurations — the helper returns an array automatically, adds type-checking, and supports the `extends` key [source](./.skilld/discussions/discussion-20367.md:L23:31)

- When using ESLint v10 with TypeScript, ensure the parser is v10-compatible — older parsers like `@babel/eslint-parser` v7 raise `scopeManager.addGlobals is not a function` errors [source](./.skilld/discussions/discussion-20587.md:L20:23)

- The `js.configs.all` configuration is intentionally strict — only use when you genuinely want every ESLint rule enforced, as it includes rules designed for specific coding patterns [source](./.skilld/pkg/README.md:L23:26)

- Avoid config layering without explicit file boundaries — configurations without `files` flatten across the entire array, making later rules affect all previous configs [source](./.skilld/discussions/discussion-20369.md)

- Know that error suppression control is now available at scale through bulk-suppressions API — v10.1+ provides programmatic control over error suppression handling [source](./.skilld/releases/v10.1.0.md:L11)

- Combine `js.configs.recommended` with plugin-specific configs using override blocks — this pattern isolates JavaScript rules to `.js` files and plugin rules to their respective file types [source](./.skilld/pkg/README.md:L62:98)

- Prettier configuration can disable or override ESLint rules — when combining with `eslint-config-prettier`, be aware that shared rules like `curly` may be silently disabled [source](./.skilld/discussions/discussion-20383.md:L29:31)
<!-- /skilld:best-practices -->

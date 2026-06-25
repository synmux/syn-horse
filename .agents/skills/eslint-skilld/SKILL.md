---
name: eslint-skilld
description: "ALWAYS use when writing code importing \"eslint\". Consult for debugging, best practices, or modifying eslint."
metadata:
  version: 10.5.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# eslint/eslint `eslint@10.5.0`
**Tags:** es6jsx: 0.11.0-alpha.0, next: 10.0.0-rc.2, maintenance: 9.39.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

### Breaking Changes (v10.0.0)

- BREAKING: Deprecated `SourceCode` methods removed — `getTokenOrCommentBefore()`, `getTokenOrCommentAfter()`, `isSpaceBetweenTokens()`, and `getJSDocComment()` no longer exist; use `getTokenBefore()/getTokenAfter()` with `includeComments: true` or `isSpaceBetween()` instead [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#sourcecode-methods-removed)

- BREAKING: Rule context methods removed — `context.getCwd()`, `context.getFilename()`, `context.getPhysicalFilename()`, `context.getSourceCode()`, `context.parserOptions`, and `context.parserPath` have been removed; use `context.cwd`, `context.filename`, `context.physicalFilename`, `context.sourceCode`, `context.languageOptions` instead [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#rule-context)

- BREAKING: `LintMessage#nodeType` property removed — the `nodeType` property no longer exists on lint message objects [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#lintmessage-nodetype-removed)

- BREAKING: RuleTester `TestCaseError#type` property removed — the `type` property in error objects of invalid test cases has been removed; remove it from test cases [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#ruletester-type-removed)

- BREAKING: `chalk` replaced with `styleText` — the stylish formatter no longer uses `chalk`; `ResultsMeta` now has an optional `color` property instead of relying on chalk's logic [source](./.skilld/releases/v10.0.0.md:L11)

- BREAKING: JSX references now tracked — `<ComponentName>` is now treated as a reference to the variable; custom rules must handle `JSXIdentifier` references in scope analysis [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#jsx-reference-tracking)

- BREAKING: `Program` AST node range spans entire source text — `Program.range` now covers all leading/trailing comments and whitespace `[0, code.length]`; rules reporting on `Program` should report on `node.body[0] ?? node` instead [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#program-node-range)

- BREAKING: Fixer methods require string `text` arguments — `insertTextBefore()`, `insertTextAfter()`, `replaceText()` and other fixer methods now throw `TypeError` if `text` is not a string [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#fixer-text-must-be-string)

- BREAKING: ESLintrc configuration format removed entirely — `.eslintrc`/`.eslintrc.json` files, legacy APIs `FlatESLint`/`LegacyESLint`, and `Linter({ configType: "eslintrc" })` no longer work [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#remove-eslintrc)

- BREAKING: `eslint-env` comments now reported as errors — `/* eslint-env */` comments trigger lint errors; migrate to flat config using `languageOptions.globals` [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#eslint-env-comments)

- BREAKING: Stricter RuleTester for valid test cases — valid test cases (expecting zero errors) can no longer include `errors` or `output` properties; remove them [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#stricter-rule-tester)

- BREAKING: `ScopeManager#addGlobals()` now required — custom `ScopeManager` implementations must provide this method to resolve global variable declarations [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#scope-manager)

- BREAKING: `radix` rule options deprecated — string options `"always"` and `"as-needed"` no longer change behavior (rule always enforces radix); remove these options from config [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#radix)

- BREAKING: `no-shadow-restricted-names` reports `globalThis` by default — the rule now treats `globalThis` as restricted (`reportGlobalThis: true`); rename local variables or explicitly set `reportGlobalThis: false` [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md#no-shadow-restricted-names)

### New APIs and Features

- NEW: `meta.languages` support for rules (v10.2.0) — rules can now declare language support via `meta.languages` array to control which languages the rule applies to [source](./.skilld/releases/v10.2.0.md:L10)

- NEW: `includeIgnoreFile()` function in `eslint/config` (v10.4.0) — load ignore patterns from a file into flat config; exported from `eslint/config` module [source](./.skilld/releases/v10.4.0.md:L11)

- NEW: `meta.docs.frozen` property (v10.0.0) — rules can now mark their documentation as frozen to indicate it should not be modified [source](./.skilld/references/eslint@10.5.0/docs/src/use/migrate-to-10.0.0.md)

- NEW: RuleTester assertion options (v10.0.0) — `assertionOptions` parameter on `RuleTester.run()` now supports `requireMessage`, `requireLocation`, and `requireData` to enforce consistency in test error assertions [source](./.skilld/releases/v10.0.0.md:L40)

- NEW: `countThis` option for `max-params` rule (v10.0.0) — rule now accepts `countThis` option to control whether `this` binding counts toward the parameter limit [source](./.skilld/releases/v10.0.0.md:L39)

- NEW: Bulk-suppressions API support (v10.1.0) — ESLint now supports bulk suppressions for managing multiple suppressed violations at once [source](./.skilld/releases/v10.1.0.md:L11)

**Also changed:** `name` property added to core configs (v10.0.0) · Configuration lookup algorithm changed from cwd-based to file-based (v10.0.0) · Node.js v20.19+/v22.13+/v24+ required (v10.0.0) · `eslint:recommended` updated with new rules (v10.0.0) · Temporal global added (v10.2.0) · Stricter `func-names` schema (v10.0.0) · Stricter `no-invalid-regexp` schema (v10.0.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## ESLint v10.5.0 Best Practices

## Best Practices

- Use `defineConfig()` helper when exporting configuration arrays — provides better IDE support, type inference, and helps ESLint tooling identify your configuration format [source](./.skilld/docs/src/use/configure/configuration-files.md:L34)

- Use `messageId` instead of inline message strings in rule implementations — allows central message management, simplifies testing, and reduces duplication across rule and test files [source](./.skilld/docs/src/extend/custom-rules.md:L246:L250)

- Mark rules with `meta.fixable` for fixable rules and `meta.hasSuggestions` for rules providing suggestions — ESLint throws errors if these required metadata is missing when attempting to produce fixes or suggestions [source](./.skilld/docs/src/extend/custom-rules.md:L59:L65)

- Always use structured error reporting via `context.report()` with `node` or `loc` — simplifies location detection and enables consistent error formatting across rules [source](./.skilld/docs/src/extend/custom-rules.md:L194:L222)

- Set `concurrency: "auto"` when using the ESLint class for programmatic linting — automatically selects optimal worker threads for file processing performance [source](./.skilld/docs/src/integrate/nodejs-api.md:L181:L182)

- Use `ESLint.getErrorResults()` to filter results before processing — removes warnings while keeping errors, useful for CI pipelines that only care about violations [source](./.skilld/docs/src/integrate/nodejs-api.md:L434:L453)

- Call `ESLint.outputFixes()` after autofix instead of manually writing results — handles file creation and avoids race conditions in concurrent scenarios [source](./.skilld/docs/src/integrate/nodejs-api.md:L414:L432)

- Use `Linter.verifyAndFix()` for single-pass autofix with remaining issues — combines linting and autofix in one call, returning both fixed code and remaining messages [source](./.skilld/docs/src/integrate/nodejs-api.md:L794:L823)

- Include `meta.name`, `meta.version`, and `meta.namespace` in plugin exports — enables effective caching, debugging, and allows `defineConfig()` to locate plugins even when users assign different namespaces [source](./.skilld/docs/src/extend/plugins.md:L40:L64)

- Use `extends` with configuration objects for config composition rather than copying — allows shared configs to be updated centrally without duplicating rules across projects [source](./.skilld/docs/src/use/configure/combine-configs.md:L12:L35)

- Specify rule `meta.languages` array to restrict rules to applicable languages — prevents rule execution errors when rules are applied to incompatible languages like TypeScript rules on Markdown [source](./.skilld/docs/src/extend/custom-rules.md:L71:L106)

- Use `RuleTester.setDefaultConfig()` before creating RuleTester instances — applies default configuration (like `ecmaVersion`) to all subsequent tests without repeating in every test case [source](./.skilld/docs/src/integrate/nodejs-api.md:L917:L937)

- Use `ruleFilter` predicate in ESLint constructor options to selectively enable rules — allows filtering rules by ID and severity at runtime, useful for custom linting pipelines [source](./.skilld/docs/src/integrate/nodejs-api.md:L151:L152)

- Set `errorOnUnmatchedPattern: false` when linting with dynamic glob patterns — prevents errors when expected files don't exist, useful for optional file globs in plugin scenarios [source](./.skilld/docs/src/integrate/nodejs-api.md:L126:L127)
<!-- /skilld:best-practices -->

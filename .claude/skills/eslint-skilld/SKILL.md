---
name: eslint-skilld
description: 'An AST-based pattern checker for JavaScript. ALWAYS use when writing code importing "eslint". Consult for debugging, best practices, or modifying eslint.'
metadata:
  version: 10.4.0
  generated_by: cached
  generated_at: 2026-05-27
---

# eslint/eslint `eslint@10.4.0`

**Tags:** es6jsx: 0.11.0-alpha.0, next: 10.0.0-rc.2, maintenance: 9.39.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in ESLint v10.x — prioritize these when using the library, as they represent changes from v9 that LLMs trained on older data will get wrong.

### Breaking Changes (v9 → v10)

- BREAKING: Deprecated `SourceCode` methods removed — `getTokenOrCommentBefore()`, `getTokenOrCommentAfter()`, `isSpaceBetweenTokens()`, `getJSDocComment()` no longer exist; use `getTokenBefore/After({ includeComments: true })` and `isSpaceBetween()` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#sourcecode-methods-removed)

- BREAKING: Rule context deprecated methods removed — `context.getCwd()`, `context.getFilename()`, `context.getPhysicalFilename()`, `context.getSourceCode()`, `context.parserOptions`, `context.parserPath` have been deleted; use `context.cwd`, `context.filename`, `context.physicalFilename`, `context.sourceCode`, `context.languageOptions` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#rule-context)

- BREAKING: ESLint configuration format — old `.eslintrc`/`.eslintrc.json` format completely removed; only `eslint.config.js` (flat config) is supported; `FlatESLint` and `LegacyESLint` exports removed [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#remove-eslintrc)

- BREAKING: `Program` AST node range now spans entire source text including leading/trailing comments/whitespace (was previously limited to code only); rules reporting on `Program` node should report on `node.body[0] ?? node` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#program-node-range)

- BREAKING: RuleFixer text must be string — all fixer methods (`insertTextBefore()`, `replaceText()`, etc.) now throw `TypeError` if `text` argument is not a string [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#fixer-text-must-be-string)

- BREAKING: `LintMessage#nodeType` property removed — accessing `message.nodeType` on lint results will be `undefined`; use `message.node.type` if available [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#lintmessage-nodetype-removed)

- BREAKING: RuleTester no longer accepts `errors` or `output` on valid test cases — valid cases must have only `code` property; previously these were silently ignored but now throw an error [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#stricter-rule-tester)

- BREAKING: RuleTester `type` property in error objects removed — using `type` in invalid test case errors now throws an error; remove this property from test cases [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#ruletester-type-removed)

- BREAKING: Stylish formatter uses native `styleText` not `chalk` — colour output now respects `NO_COLOR`, `NODE_DISABLE_COLORS` environment variables; CLI flags `--color`/`--no-color` now take precedence over environment variables [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#stylish-formatter)

### Behavioural Changes (v10.0.0)

- BREAKING: JSX reference tracking enabled by default — JSX identifiers like `<Card>` are now tracked as references in scope analysis, enabling correct `no-unused-vars` and `no-undef` checks for JSX; may produce new linting errors in JSX code [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#jsx-reference-tracking)

- BREAKING: `radix` rule options `"always"` and `"as-needed"` deprecated — these options are now ignored; remove them from configuration [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#radix)

- BREAKING: `no-shadow-restricted-names` reports `globalThis` by default — `reportGlobalThis` option now defaults to `true`; disable with `{ reportGlobalThis: false }` to preserve v9 behaviour [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#no-shadow-restricted-names)

- BREAKING: `eslint-env` comments now reported as errors — legacy `/* eslint-env */` directives are no longer supported and will cause linting errors; remove these comments from code [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#eslint-env-comments)

### New APIs (v10.0.0 and later)

- NEW: `meta.languages` rule property (v10.2.0) — rules can now specify which languages they support using `meta.languages: ["js/js"]` (specific language), `meta.languages: ["markdown/*"]` (plugin wildcard), or `meta.languages: ["*"]` (all languages); when specified and no match found, ESLint throws an error; language matching follows: wildcard `"*"` > direct match > `"plugin/*"` wildcard > namespace match [source](./.skilld/docs/src/extend/custom-rules.md:L71:L106)

- NEW: `context.sourceCode` property (v10.0.0) — replacement for deprecated `context.getSourceCode()` method [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L344)

- NEW: RuleTester `requireData` assertion option (v10.0.0) — allows marking test cases that require `context.sharedData` [source](./.skilld/releases/v10.0.0.md#features)

- NEW: `max-params` rule `countThis` option (v10.0.0) — new boolean option to count/exclude `this` parameter in function signatures [source](./.skilld/releases/v10.0.0.md#features)

- NEW: `no-implied-eval` rule `self` option (v10.0.0) — new option to include `self` in the rule's reporting [source](./.skilld/releases/v10.0.0.md#features)

- NEW: Temporal object support (v10.2.0) — `Temporal` is now included in ES2026 globals and recognized by `no-obj-calls` rule [source](./.skilld/releases/v10.2.0.md#features)

- NEW: Bulk-suppressions API support (v10.1.0) — framework for managing rule suppressions in bulk operations [source](./.skilld/releases/v10.1.0.md#features)

**Also changed:** ScopeManager requires `addGlobals()` method (v10.0.0) · `func-names` schema stricter rejects extra array items (v10.0.0) · `no-invalid-regexp` disallows duplicate flags in `allowConstructorFlags` (v10.0.0) · Configuration `name` property restored to `@eslint/js` core configs (v10.0.0) · `eslint:recommended` updated with three new rules (v10.0.0) · Node.js version requirement `^20.19.0 || ^22.13.0 || >=24` (v10.0.0) · `Array.fromAsync` support in `array-callback-return` (v10.0.0) · Minimatch upgraded to v10 with POSIX character class support (v10.0.0)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `defineConfig()` helper when creating ESLint configurations — provides type checking, enables the `extends` key, and ensures the return value is always an array [source](./.skilld/docs/src/extend/shareable-configs.md#use-a-shareable-config)

- Prefer `messageId` over `message` in `context.report()` calls — centralizes violation messages in the `meta.messages` object, simplifies testing, and lowers the barrier for message improvements [source](./.skilld/docs/src/extend/custom-rules.md#messageids)

- Always declare `meta.fixable: "code"` or `meta.fixable: "whitespace"` when a rule provides fixes — ESLint throws an error at runtime if the rule attempts to fix without declaring this property [source](./.skilld/docs/src/extend/custom-rules.md#rule-structure)

- Always declare `meta.hasSuggestions: true` when a rule provides suggestions — ESLint throws an error at runtime if the rule attempts to suggest without declaring this property [source](./.skilld/docs/src/extend/custom-rules.md#rule-structure)

- Always specify `meta.schema` for rules with options; avoid `schema: false` — schema validation prevents user configuration errors before they reach the rule, and `false` is discouraged [source](./.skilld/docs/src/extend/custom-rules.md#options-schemas)

- Use generators in the `fix()` function when applying multiple fixes — yields multiple fixing objects that won't conflict and extends the fix range to prevent other rules from interfering in the same pass [source](./.skilld/docs/src/extend/custom-rules.md#applying-fixes)

- Structure plugins with `meta`, `configs`, `rules`, and `processors` keys — provides flexibility for flat config and allows plugins to work with caching and `--print-config` [source](./.skilld/docs/src/extend/plugin-migration-flat-config.md#recommended-plugin-structure)

- Include `meta.name` and `meta.version` in plugins — without this metadata, plugins fail with `--cache` and `--print-config` command-line options [source](./.skilld/docs/src/extend/plugin-migration-flat-config.md#adding-plugin-meta-information)

- Rename file-extension-based processors to valid identifiers in flat config — processors like `.md` are no longer supported; use `markdown` instead and explicitly specify them in the config [source](./.skilld/docs/src/extend/plugin-migration-flat-config.md#migrating-processors-for-flat-config)

- When combining shareable configs that define the same plugin, explicitly reassign the plugin to resolve conflicts — use `alpha.plugins["@typescript-eslint"] = beta.plugins["@typescript-eslint"]` to deduplicate [source](./.skilld/discussions/discussion-19981.md)

- Use `sourceCode.markVariableAsUsed()` to declare custom variable access patterns — ESLint only recognises standard variable access, so non-standard patterns must be explicitly marked as used [source](./.skilld/docs/src/extend/custom-rules.md#marking-variables-as-used)

- Don't extend or build on top of core rules — they are not part of the public API and will break in future releases; copy the rule into your project instead [source](./.skilld/docs/src/extend/custom-rules.md#rule-structure)

- Use `options.concurrency: "auto"` when programmatically linting large codebases — enables multi-threaded linting (requires all options to be cloneable) [source](./.skilld/docs/src/integrate/nodejs-api.md#eslint-class)

- Understand that `--fix` with `--cache` still requires multiple passes on fixed files — fixed files are re-linted to verify the fix, so subsequent runs are faster only after the initial cleanup [source](./.skilld/discussions/discussion-20292.md)
<!-- /skilld:best-practices -->

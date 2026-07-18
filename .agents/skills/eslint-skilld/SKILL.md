---
name: eslint-skilld
description: "ALWAYS use when writing code importing \"eslint\". Consult for debugging, best practices, or modifying eslint."
metadata:
  version: 10.7.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# eslint/eslint `eslint@10.7.0`
**Tags:** es6jsx: 0.11.0-alpha.0, next: 10.0.0-rc.2, latest: 10.7.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes — ESLint v10.5.0

**Note:** v10.7.0 does not exist. The latest stable release is v10.5.0 (2026-06-12).

## API Changes

This section documents version-specific API changes from ESLint v10.x and the v9→v10 migration.

### Removed APIs (v10.0.0)

- BREAKING: `context.getCwd()` — removed, use `context.cwd` property instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L351:L376)

- BREAKING: `context.getFilename()` — removed, use `context.filename` property instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L351:L376)

- BREAKING: `context.getPhysicalFilename()` — removed, use `context.physicalFilename` property instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L351:L376)

- BREAKING: `context.getSourceCode()` — removed, use `context.sourceCode` property instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L351:L376)

- BREAKING: `context.parserOptions` — removed, use `context.languageOptions` or `context.languageOptions.parserOptions` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L351:L376)

- BREAKING: `SourceCode.getTokenOrCommentBefore(nodeOrToken, skip)` — removed, use `getTokenBefore(nodeOrToken, { includeComments: true, skip })` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L407:L415)

- BREAKING: `SourceCode.getTokenOrCommentAfter(nodeOrToken, skip)` — removed, use `getTokenAfter(nodeOrToken, { includeComments: true, skip })` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L407:L415)

- BREAKING: `SourceCode.isSpaceBetweenTokens(first, second)` — removed, use `isSpaceBetween(first, second)` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L407:L415)

- BREAKING: `SourceCode.getJSDocComment(node)` — removed with no replacement [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L407:L415)

- BREAKING: `FlatESLint` and `LegacyESLint` classes removed — always use `ESLint` class instead [source](./.skilld/releases/v10.0.0.md:L47)

- BREAKING: `LintMessage#nodeType` property removed from linting results [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L450:L459)

- BREAKING: RuleTester error `type` property removed — invalid test cases no longer accept `type` field [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L289:L298)

- BREAKING: `.eslintrc` and `.eslintrc.json` config formats no longer supported — must migrate to `eslint.config.js` format [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L116:L131)

- BREAKING: Old config format flag `ESLINT_USE_FLAT_CONFIG` removed [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L116:L131)

- BREAKING: v10_* and unstable_* feature flags removed — `v10_config_lookup_from_file` flag no longer exists [source](./.skilld/releases/v10.0.0.md:L29)

- BREAKING: `chalk` dependency removed from stylish formatter — now uses Node.js native `styleText` API; color detection follows Node.js rules for `NO_COLOR` and `NODE_DISABLE_COLORS` environment variables [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L195:L212)

- BREAKING: `Program` AST node `range` now spans entire source text including leading/trailing comments and whitespace (previously excluded them) [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L299:L320)

- BREAKING: Fixer methods `text` argument now strictly requires string type — `insertTextBefore()`, `insertTextAfter()`, `replaceText()` and other fixer methods throw `TypeError` on non-string values [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L322:L337)

- BREAKING: `.eslintignore` support removed — use `ignores` in config object instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L116:L131)

### New APIs

- NEW: `ScopeManager#addGlobals(names: ReadonlyArray<string>)` — required method on custom ScopeManager implementations to resolve global variable references [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L339:L350)

- NEW: `ResultsMeta.color` property added to result objects [source](./.skilld/releases/v10.0.0.md:L11)

- NEW: Error assertion options added to RuleTester — `requireData` option allows stricter test case assertions [source](./.skilld/releases/v10.0.0.md:L37)

- NEW: JSX reference tracking enabled by default — `<Component>` now tracked as reference to imported component, resolving false positives in `no-unused-vars` and `no-undef` [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L132:L155)

- NEW: `meta.languages` support for rules in v10.2.0 — allows rules to declare language compatibility [source](./.skilld/releases/v10.2.0.md:L10)

- NEW: `includeIgnoreFile()` function added to `eslint/config` module in v10.4.0 — enables loading ignore files programmatically [source](./.skilld/releases/v10.4.0.md:L11)

- NEW: Bulk suppressions API support implemented in v10.1.0 [source](./.skilld/releases/v10.1.0.md:L11)

### Deprecated APIs

- DEPRECATED: `radix` rule options `"always"` and `"as-needed"` — deprecated in v10.0.0, rule now always enforces radix argument [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L214:L226)

### Behavior Changes

- `eslint-env` comments now reported as errors instead of being silently ignored [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L157:L169)

- `no-shadow-restricted-names` rule now reports `globalThis` by default (changed default for `reportGlobalThis` option from `false` to `true`) [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L228:L245)

- Configuration file lookup algorithm changed — searches from each linted file's directory upward (previously cwd-based); `v10_config_lookup_from_file` flag removed [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L100:L114)

- Node.js version requirements increased — now requires Node.js v20.19.0+, v22.13.0+, or v24+ [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L76:L87)

- RuleTester now rejects valid test cases with `errors` or `output` properties (previously ignored them) [source](./.skilld/docs/src/use/migrate-to-10.0.0.md:L420:L448)

**Also changed:** `context.parserPath` removed · minimatch v10 with POSIX character class support · jiti < v2.2.0 no longer supported · `func-names` schema now stricter (disallows extra items) · `no-invalid-regexp` `allowConstructorFlags` now requires unique items · ESLint core configs restored `name` property · `Temporal` added to global objects and no-obj-calls rule
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `defineConfig()` helper when writing configuration files — provides type inference and ensures the configuration array format is correct [source](./.skilld/docs/src/use/configure/configuration-files.md:L34:L44)

- Use `globalIgnores()` helper to explicitly mark global ignore patterns — clearly distinguishes them from non-global ignores and improves configuration readability [source](./.skilld/docs/src/use/configure/configuration-files.md:L326:L350)

- Always include a `files` key when using `extends` to ensure the extended configuration applies only to the intended file patterns — prevents unintended configuration spread to all files [source](./.skilld/docs/src/use/configure/configuration-files.md:L650:L652)

- Add a `name` property to each configuration object in your configuration array — helps identify which configuration object is being used in error messages and config inspector output [source](./.skilld/docs/src/use/configure/configuration-files.md:L731:L756)

- Use `messageId` instead of direct message strings when reporting violations in custom rules — centralises message management in `meta.messages`, reduces repetition across rule and test files, and lowers the barrier for message updates [source](./.skilld/docs/src/extend/custom-rules.md:L244:L281)

- Keep fixes as small as possible to avoid conflicts with fixes from other rules — unnecessarily large fixes prevent other fixable problems from being applied [source](./.skilld/docs/src/extend/custom-rules.md:L356:L376)

- Use the `fix()` function with generators to return multiple fixing objects when you need to control the range of other rules' fixes — prevents unintended modifications to surrounding code in the same pass [source](./.skilld/docs/src/extend/custom-rules.md:L378:L392)

- Add descriptive comments after `--` in disable directives to document why the rule is being disabled — clarifies intention and helps team members understand exceptions [source](./.skilld/docs/src/use/configure/rules.md:L54:L74)

- Prefer configuration files over inline disable comments whenever possible — allows consistent project-wide rule handling and makes enforcement easier [source](./.skilld/docs/src/use/configure/rules.md:L202:L211)

- Set `reportUnusedDisableDirectives: "error"` in `linterOptions` to enforce configuration hygiene — prevents disable comments from accumulating as code changes [source](./.skilld/docs/src/use/configure/configuration-files.md:L481:L502)

- Specify the `languages` array in custom rule metadata to document which languages the rule supports — ensures the rule only runs on intended languages and prevents errors on unsupported language contexts [source](./.skilld/docs/src/extend/custom-rules.md:L71:L106)

- Declare `peerDependencies` with `">="` range syntax in shareable config packages for forward compatibility — allows projects with newer ESLint versions to adopt your config without conflicts [source](./.skilld/docs/src/extend/shareable-configs.md:L55:L64)

- Use `eslint.hasFlag()` when accessing unstable or experimental features in the Node.js API — guards your code against feature flag changes and indicates which features are production-ready [source](./.skilld/docs/src/integrate/nodejs-api.md:L330:L348)

- Set `concurrency: "auto"` in the ESLint class constructor for production linting tools — automatically selects an optimal number of worker threads to lint files faster without manual tuning [source](./.skilld/docs/src/integrate/nodejs-api.md:L181:L183)
<!-- /skilld:best-practices -->

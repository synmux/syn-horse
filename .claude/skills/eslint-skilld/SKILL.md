---
name: eslint-skilld
description: 'ALWAYS use when writing code importing "eslint". Consult for debugging, best practices, or modifying eslint.'
metadata:
  version: 10.4.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# eslint/eslint `eslint@10.4.0`

**Tags:** es6jsx: 0.11.0-alpha.0, next: 10.0.0-rc.2, maintenance: 9.39.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes (v10.x)

- BREAKING: Deprecated `context` members removed — `context.getCwd()`, `context.getFilename()`, `context.getPhysicalFilename()`, `context.getSourceCode()`, `context.parserOptions`, `context.parserPath` no longer exist; use `context.cwd`, `context.filename`, `context.physicalFilename`, `context.sourceCode`, `context.languageOptions` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#rule-context)

- BREAKING: Deprecated `SourceCode` methods removed — `getTokenOrCommentBefore()`, `getTokenOrCommentAfter()`, `isSpaceBetweenTokens()`, `getJSDocComment()` no longer exist; use `getTokenBefore(nodeOrToken, { includeComments: true })`, `getTokenAfter(nodeOrToken, { includeComments: true })`, `isSpaceBetween()` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#sourcecode-methods-removed)

- BREAKING: Old eslintrc config format no longer supported — `FlatESLint` and `LegacyESLint` exports removed, `eslint.config.js` is now the only supported format; `ESLINT_USE_FLAT_CONFIG` environment variable no longer works [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#remove-eslintrc)

- BREAKING: `LintMessage.nodeType` property removed — integration developers must update code that relied on `message.nodeType` [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#lintmessage-nodetype-removed)

- BREAKING: `Program` AST node range now spans entire source text — previously excluded leading/trailing comments and whitespace; rules reporting on `Program` should use `node.body[0] ?? node` instead [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#program-node-range)

- BREAKING: RuleTester `type` property removed from error objects — custom rules must remove `type` property from invalid test case errors [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#ruletester-type-removed)

- BREAKING: Fixer methods now require string `text` — `insertTextBefore()`, `insertTextAfter()`, `replaceText()`, `replaceTextRange()` throw `TypeError` if text is not a string [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#fixer-text-must-be-string)

- BREAKING: RuleTester strict about test case structure — valid test cases no longer allowed to have `errors` or `output` properties [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#stricter-rule-tester)

- BREAKING: Configuration lookup algorithm changed — `v10_config_lookup_from_file` flag is now default behavior; using the flag results in error; provides explicit `--config` path to use old cwd-based lookup [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#config-lookup-from-file)

- BREAKING: Node.js < v20.19, v21 (except v22.13+), v23 no longer supported — requires Node.js ^20.19.0 || ^22.13.0 || >=24 [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#drop-old-node)

- BREAKING: `radix` rule options deprecated — `"always"` and `"as-needed"` string options have no effect and are deprecated; remove option or always provide radix to `parseInt()` [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#radix)

- NEW: JSX references now tracked — `<Card>` expressions create references; `no-unused-vars` and `no-undef` now work correctly with JSX elements [source](./.skilld/releases/v10.0.0.md:L109)

- NEW: `color` property in `ResultsMeta` — replaces chalk-based coloring with native `styleText` API [source](./.skilld/releases/v10.0.0.md:L11)

- NEW: `name` property added to ESLint core configs — `@eslint/js` exports now include `name` property [source](./.skilld/docs/src/use/migrate-to-10.0.0.md#eslint-config-name)

- NEW: API support for bulk suppressions — enables rule suppressions across multiple violations [source](./.skilld/releases/v10.1.0.md:L11)

- NEW: `meta.languages` support for rules (v10.2.0) — rules can now specify supported languages; enables language-specific rule validation [source](./.skilld/releases/v10.2.0.md:L10)

- NEW: `meta.docs.frozen` property (v10.0.0) — marks rules as frozen/immutable in documentation [source](./.skilld/releases/v10.0.0.md:L70)

**Also changed:** `no-shadow-restricted-names` now reports `globalThis` by default (set `reportGlobalThis: false` to restore old behavior) · `func-names` schema stricter — no extra array elements allowed · `no-invalid-regexp` `allowConstructorFlags` requires unique items · `styleText` replaces chalk for colors (respects `NO_COLOR`, `NODE_DISABLE_COLORS`) · `eslint-env` comments now reported as errors · Jiti < v2.2.0 no longer supported · POSIX character classes in glob patterns now supported · `ScopeManager` requires `addGlobals(names)` method for custom implementations · Temporal object added to ES2026 globals (v10.2.0)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `defineConfig()` to define configuration arrays — enables TypeScript type checking, supports the `extends` key for config composition, and always returns an array (single override doesn't need wrapping) [source](./.skilld/docs/src/use/configure/configuration-files.md:L34:45)

- Always include `meta.name`, `meta.version`, and `meta.namespace` in plugin definitions — improves debugging and enables effective plugin caching, especially when plugins are distributed across packages [source](./.skilld/docs/src/extend/plugins.md:L45:65)

- Use `extends` to compose configurations from other config objects or arrays — replaces manual merging and simplifies overrides while maintaining order of operations [source](./.skilld/docs/src/use/configure/combine-configs.md:L12:35)

- Follow plugin naming conventions (unscoped: `eslint-plugin-*`, scoped: `@scope/eslint-plugin-*`) — makes plugins discoverable on npm and allows other tools to automatically resolve them [source](./.skilld/docs/src/extend/plugins.md:L90:115)

- When combining shareable configs with conflicting plugins, redefine the plugin explicitly — manually assign one version to override duplicates and avoid "Cannot redefine plugin" errors [source](./.skilld/discussions/discussion-19981.md:L40:45)

- Declare `languages: ["js/js"]` in custom rule metadata when the rule is JavaScript-specific — prevents runtime errors when ESLint attempts to run the rule against non-JavaScript languages [source](./.skilld/docs/src/extend/custom-rules.md:L75:92)

- Use `suppressions-location` flag and commit the suppressions file to version control — allows teams to track and gradually address existing rule violations across the codebase [source](./.skilld/docs/src/use/suppressions.md:L38:57)

- Set `applySuppressions: true` in the ESLint Node.js API constructor and provide `filePath` option to `lintText()` — enables suppressions from external files when linting programmatically [source](./.skilld/docs/src/use/suppressions.md:L70:80)

- Use the `ruleFilter` option to selectively enable/disable rules at runtime — filters which rules execute based on `ruleId` and `severity` without modifying configuration [source](./.skilld/docs/src/integrate/nodejs-api.md:L151:152)

- Run `eslint --print-config <filePath>` to inspect the computed configuration for a specific file — shows exactly which rules, languageOptions, and plugins apply before troubleshooting why a rule isn't behaving as expected [source](./.skilld/docs/src/use/configure/debug.md:L34:62)

- Launch `eslint --inspect-config` to visually debug which configuration objects match a given filename — interactive tool to verify config patterns match files correctly when you have complex `files`/`ignores` patterns [source](./.skilld/docs/src/use/configure/debug.md:L68:79)

- Segment files and create separate ESLint instances when linting thousands of files to avoid memory overhead — `lintFiles()` returns all results at once, which can exhaust memory on large codebases [source](./.skilld/discussions/discussion-20195.md:L18:23)

- Set `concurrency: "auto"` in the ESLint constructor for multi-threaded linting on large file sets — enables worker threads for parallel processing, though all options must be cloneable when concurrency is enabled [source](./.skilld/docs/src/integrate/nodejs-api.md:L180:183)

- Use `ESLint.fromOptionsModule(optionsURL)` to load options from a module instead of passing a cloneable options object — allows `concurrency` without cloneable constraints since module URL is passed to workers instead of serializing options [source](./.skilld/docs/src/integrate/nodejs-api.md:L370:401)
<!-- /skilld:best-practices -->

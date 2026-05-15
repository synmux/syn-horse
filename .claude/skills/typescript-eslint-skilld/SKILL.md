---
name: typescript-eslint-skilld
description: "ALWAYS use when writing code importing \"typescript-eslint\". Consult for debugging, best practices, or modifying typescript-eslint, typescript eslint."
metadata:
  version: 8.59.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# typescript-eslint/typescript-eslint `typescript-eslint@8.59.3`
**Tags:** rc-v8: 8.0.0-alpha.62, canary: 8.59.4-alpha.0, latest: 8.59.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p typescript-eslint` instead of grepping `.skilld/` directories. Run `skilld search --guide -p typescript-eslint` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `defaultOptions` option in rule configuration — use `meta.defaultOptions` instead as of v8.55.0, old property no longer supported in new rules [source](./.skilld/releases/v8.55.0.md#features)

- NEW: `ParserServicesWithTypeInformation` now includes shortcut methods for type introspection as of v8.54.0 — replaces verbose helper function calls [source](./.skilld/releases/v8.54.0.md#features)

- NEW: `ScopeManager#addGlobals()` method added in v8.54.0 — enables dynamic global variable registration without parser recreation [source](./.skilld/releases/v8.54.0.md#features)

- NEW: Rule module `namespace` property added to plugin meta in v8.51.0 — allows organizing rules into semantic groups [source](./.skilld/releases/v8.51.0.md#features)

- NEW: `RuleModule` interface now exposes `name` property in v8.51.0 — provides programmatic access to rule identifier [source](./.skilld/releases/v8.51.0.md#features)

- NEW: `strict-void-return` rule added in v8.53.0 — enforces proper handling of functions returning void in contexts expecting values [source](./.skilld/releases/v8.53.0.md#features)

- NEW: `no-useless-default-assignment` rule added in v8.50.0 — detects redundant default assignments for function parameters [source](./.skilld/releases/v8.50.0.md#features)

- NEW: `no-unnecessary-type-assertion` rule enhanced in v8.59.0 and v8.59.1 — now reports more cases based on assignability, fixes crashes with generic type arguments [source](./.skilld/releases/v8.59.0.md#features), [source](./.skilld/releases/v8.59.1.md#fixes)

- NEW: `no-unused-vars` rule now includes automatic fixer in v8.53.0 — removes unused imports with single action [source](./.skilld/releases/v8.53.0.md#features)

- FEATURE: TypeScript 6 support added in v8.58.0 — parser and rules compatible with TypeScript 6 APIs and diagnostics [source](./.skilld/releases/v8.58.0.md#features)

- FEATURE: ESLint v10 compatibility enabled in v8.56.0 — plugin and parser work with ESLint 10.x configuration system [source](./.skilld/releases/v8.56.0.md#features)

- FEATURE: `no-unnecessary-condition` rule enhanced in v8.57.0 — allows literal loop conditions in for/do loops to reduce false positives [source](./.skilld/releases/v8.57.0.md#features)

- FEATURE: `prefer-promise-reject-errors` rule enhanced in v8.57.0 — now supports `TypeOrValueSpecifier` configuration [source](./.skilld/releases/v8.57.0.md#fixes)

- FEATURE: Project service now accepts `Partial<ts.server.ServerHost>` in v8.53.0 — simplifies custom host configuration [source](./.skilld/releases/v8.53.0.md#features)

**Also changed:** `no-multiple-lines-of-errors` new rule v8.52.0 · `tsconfig-utils` improved error messages v8.51.0 · `prefer-optional-chain` handle MemberExpression v8.51.0 · `no-base-to-string` detect @@toPrimitive and valueOf v8.52.0 · `no-base-to-string` fix false positive for toString overloads v8.57.0 · `typescript-estree` use ts.getModifiers() v8.57.0 · `typescript-estree` template literal tagged cooked null handling v8.57.0 · template literal invalid escape sequences now return null cooked value in v8.57.0 · `RuleModule` interface changes in v8.51.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## typescript-eslint Best Practices (v8.59.3)

## Best Practices

- Use ESLint's `defineConfig()` from `'eslint/config'` instead of `tseslint.config()` — the canonical, forward-compatible solution for flat configs that ensures type compatibility across the ecosystem [source](./.skilld/issues/issue-10935.md#top-comments)

- Adopt `parserOptions.projectService` over `parserOptions.project` for better performance and simpler configuration — stabilized in v8 and designed to work with modern TypeScript tooling [source](./.skilld/discussions/discussion-8766.md#timeline)

- Always explicitly set `parserOptions.tsconfigRootDir` when using `projectService`, especially on Windows — prevents path normalization errors and nondeterministic behaviour across different environments [source](./.skilld/issues/issue-11530.md#top-comments)

- Use `import.meta.dirname` for dynamic `tsconfigRootDir` paths in ES modules — handles both forward and backslash separators correctly across platforms [source](./.skilld/issues/issue-11530.md:L59:76)

- Spread config arrays with the spread operator when composing configs: `...tseslint.configs.recommended` — required syntax for flat config composition that correctly applies rules to matched files [source](./.skilld/issues/issue-9993.md#suggested-changes)

- Enable `strictNullChecks: true` in your TypeScript compiler options — required for accurate type-aware linting; many rules exhibit unexpected behaviour when this is disabled [source](./.skilld/releases/v8.55.0.md:L18)

- Use `consistent-type-imports` to enforce `import type` for type-only imports, but disable it if you already enable `verbatimModuleSyntax` in TypeScript — both serve overlapping purposes and can conflict, causing false positives [source](./.skilld/issues/issue-11681.md#suggested-changes)

- Layer configs from least strict to most strict: ESLint recommended, then typescript-eslint `recommended`, then `strict` or `stylistic` — ensures baseline safety before adding project-specific constraints [source](./.skilld/discussions/discussion-8914.md:L23:62)

- Use type-checked config variants (`recommendedTypeChecked`, `strictTypeChecked`, `stylisticTypeChecked`) only when `parserOptions.project` or `projectService` is configured — type checking requires parser options to be set [source](./.skilld/pkg/./dist/index.d.ts:L36:45)

- Use `configs.disableTypeChecked` to turn off type-aware rules for specific files when type information is unavailable — keeps type-checked configs applicable whilst allowing fallback for files outside your TypeScript project [source](./.skilld/pkg/./dist/index.d.ts:L20:23)

- Specify `allowDefaultProject` in `projectService` configuration for files that aren't part of your tsconfig — prevents "not found by the project service" errors for config files and edge-case TypeScript files [source](./.skilld/issues/issue-11530.md:L39:41)

- Configure file-specific linting with multiple config objects, each with distinct `files` patterns — enables different parser options and rules per file type without config duplication [source](./.skilld/issues/issue-10159.md:L33:54)

- Avoid relying on private TypeScript APIs like `checker.isTypeAssignableTo()` in rule implementations — while community projects use them, they're not officially supported and can break between TypeScript versions [source](./.skilld/discussions/discussion-7936.md#overview)

- Use `parserServices` shortcut methods for accessing type information in custom rules — cleaner and less error-prone than direct type checker access [source](./.skilld/releases/v8.54.0.md:L15)

- Keep `parserOptions` consistent or intentionally different across config objects — order-dependent behaviour can cause linting results to vary based on which config object matches first [source](./.skilld/issues/issue-10159.md#issue-description)

- Don't expect multithread linting to improve performance with type-checked rules — type information requires cross-file, stateful analysis that can't be parallelised; single-threaded type checking will bottleneck worker threads [source](./.skilld/discussions/discussion-11568.md#top-comments)

- Prefer `no-require-imports` over the deprecated `no-var-requires` rule — the latter was removed from recommended configs in v8 in favour of the more specific, modern alternative [source](./.skilld/discussions/discussion-8766.md:L43)
<!-- /skilld:best-practices -->

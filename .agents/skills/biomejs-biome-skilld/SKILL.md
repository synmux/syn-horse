---
name: biomejs-biome-skilld
description: "Biome is a toolchain for the web: formatter, linter and more. ALWAYS use when writing code importing \"@biomejs/biome\". Consult for debugging, best practices, or modifying @biomejs/biome, biomejs/biome, biomejs biome, biome."
metadata:
  version: 2.4.15
  generated_by: cached
  generated_at: 2026-05-29
---

# biomejs/biome `@biomejs/biome@2.4.15`
**Tags:** nightly: 1.9.5-nightly.81fdedb, beta: 2.0.0-beta.6, latest: 2.4.16

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @biomejs/biome` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @biomejs/biome` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: HTML formatter overhaul — in v2.4.0, the experimental HTML formatter was completely overhauled to resemble Prettier's formatting, potentially causing large diffs in HTML, Vue, Svelte, and Astro files [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L602)

- BREAKING: Promoted 21 nursery rules to stable groups — in v2.4.0, several rules (e.g., `noUnresolvedImports`, `noImportCycles`, `noUselessUndefined`) were promoted to stable groups like `correctness`, `suspicious`, `complexity`, and `style`, changing default behavior or severity [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L268)

- NEW: `useTestHooksInOrder()` — new nursery rule in v2.4.15 for `test` domain, enforcing correct order of Jest/Vitest lifecycle hooks [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L11)

- NEW: `useVueNextTickPromise()` — new nursery rule in v2.4.15, enforcing Promise syntax for Vue `nextTick` [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L16)

- NEW: `noVueVOnNumberValues()` — new nursery rule in v2.4.15, disallowing deprecated number modifiers on Vue `v-on` directives [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L22)

- NEW: `useVueValidVFor()` — new nursery rule in v2.4.15, validating Vue `v-for` directives [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L28)

- NEW: `noVueImportCompilerMacros()` — new recommended nursery rule in v2.4.15, disallowing importing Vue compiler macros from `vue` [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L31)

- NEW: `useThisInClassMethods()` — new nursery rule in v2.4.15, reporting instance methods, getters, setters, and function-valued instance fields that do not use `this` [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L59)

- NEW: `noBaseToString()` — new nursery rule in v2.4.15, reporting stringification sites that fall back to Object's default `"[object Object]"` formatting [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L77)

- BREAKING: `organizeImports` now errors on unknown predefined groups — in v2.4.15, `organizeImports` now reports an error for unknown predefined groups in configuration, which previously might have been ignored [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L42)

- BREAKING: `noMisleadingReturnType` improved — in v2.4.15, it now flags union annotations whose extra variants are never returned, leading to new diagnostics [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L49)

- BREAKING: `noUselessTypeConversion` improved — in v2.4.15, it now detects redundant conversions on `as const` object literal properties, leading to new diagnostics [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L66)

- BREAKING: `useExhaustiveSwitchCases` improved — in v2.4.15, it now checks switch statements over object literal properties initialized with `as const`, leading to new diagnostics [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L79)

- BREAKING: `useStringStartsEndsWith` improved — in v2.4.15, it now detects string index comparisons on `as const` object literal properties, leading to new diagnostics [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L86)

- NEW: `ignore` option to `useHookAtTopLevel` — new in v2.4.0, allows specifying function names not treated as hooks [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L11)

- NEW: `useAnchorContent` rule — new in v2.4.0 for HTML, enforcing accessible content for anchor elements [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L23)

- NEW: Multiple reporters and `--reporter-file` CLI option — new in v2.4.0, allowing multiple reporters and saving output to a file [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L31)

- NEW: JSON as GritQL target language — new in v2.4.0, enabling GritQL patterns for JSON files [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L59)

- NEW: `ignore` option to `noUnknownProperty` — new in v2.4.0, preventing diagnostics for specified unknown properties [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L80)

- NEW: `sarif` reporter — new in v2.4.0, emitting diagnostics using the SARIF format [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L84)

- BREAKING: `useHookAtTopLevel` updated — in v2.4.0, the rule was updated to better catch invalid hook usage, leading to new diagnostics for previously passing code [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.0.md:L207)

- NEW: `noDuplicateAttributes` — new nursery rule in v2.3.12, forbidding duplicate attributes in HTML elements [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.3.12.md:L11)

- NEW: `noVueOptionsApi` — new nursery rule in v2.3.12, reporting Vue Options API usage incompatible with Vue 3.6's Vapor Mode [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.3.12.md:L14)

- BREAKING: GraphQL nursery rules renamed — in v2.3.12, rules like `useUniqueArgumentNames` were renamed to `noDuplicateArgumentNames` (and similar), requiring `biome migrate --write` to update [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.3.12.md:L50)

- BREAKING: `useExhaustiveDependencies` fixes — in v2.3.12, multiple fixes were applied to correctly handle nested destructuring, transparent expression wrappers, and variable references, which may introduce new diagnostics for previously unflagged issues [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.3.12.md:L123)

**Also changed:** `useMediaCaption` rule for HTML v2.4.0 · `useIframeTitle` lint rule for HTML v2.4.0 · `useSortedInterfaceMembers` assist action v2.4.0 · Stacktrace for fatal errors v2.4.0 · `useIterableCallbackReturn` with `checkForEach` option v2.4.0 · `useValidLang` rule for HTML v2.4.0 · Support for `jsxFactory` and `jsxFragmentFactory` v2.4.0 · New CLI options for file watcher v2.4.0 · `useHtmlLang` lint rule for HTML v2.4.0 · Support for embedded GraphQL snippets in JS (experimental) v2.4.0 · `groupByNesting` option to `useSortedKeys` assist v2.4.0 · `noAutofocus` lint rule for HTML v2.4.0 · `noPositiveTabindex` to HTML v2.4.0 · `useAltText` lint rule for HTML v2.4.0 · `useValidAriaRole` lint rule for HTML v2.4.0 · `ignore` option to `noUnknownFunction` v2.4.0 · `ignore` option to `noUnknownPseudoClass` v2.4.0 · `noDuplicateClasses` assist action v2.4.0 · `noRedundantAlt` to HTML v2.4.0 · `noDistractingElements` lint rule for HTML v2.4.0 · New linter domain `types` v2.4.0 · Ability to load hidden files `.biome.json` and `.biome.jsonc` v2.4.0 · Formatter option `trailingNewline` v2.4.0 · `noSvgWithoutTitle` lint rule to HTML v2.4.0 · `useButtonType` lint rule for HTML v2.4.0 · `extensionMappings` option to `useImportExtensions` v2.4.0 · `--only` and `--skip` options to `biome check` and `biome ci` v2.4.0 · `ignore` option to `noUnknownPseudoElement` v2.4.0 · Ability to load configuration from new known paths (config home) v2.4.0 · Support for embedded CSS snippets in JS (experimental) v2.4.0 · `useAriaPropsForRole` lint rule for HTML v2.4.0 · `noAccessKey` lint rule for HTML v2.4.0 · Inlined configuration for LSP v2.4.0 · Options from `typescript-eslint` to `useUnifiedTypeSignatures` v2.4.0 · Rule profiler v2.4.0 · CSS properties ordering updated v2.4.0 · Support for CSS `@function` at-rule v2.4.0 · Revamped logging options v2.4.0 · Added e18e ESLint plugin as a recognized rule source v2.4.0 · `noRootType` for GraphQL v2.3.12 · `useErrorCause` lint rule v2.3.12 · `useLoneAnonymousOperation` for GraphQL v2.3.12 · `useInlineScriptId` for Next.js v2.3.12 · `noDivRegex` v2.3.12 · `noDuplicateEnumValueNames` for GraphQL v2.3.12 · `useLoneExecutableDefinition` for GraphQL v2.3.12 · `noExcessiveLinesPerFile` for CSS and GraphQL v2.3.12 · `noDuplicateEnumValues` v2.3.12 · `noExcessiveLinesPerFile` general v2.3.12 · `noExcessiveClassesPerFile` v2.3.12 · `noFloatingClasses` v2.3.12
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Enforce correct order of Jest/Vitest lifecycle hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) using `useTestHooksInOrder` for predictable test setup and teardown. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L11-L12)
- Use Promise syntax for Vue's `nextTick` via `useVueNextTickPromise` to leverage modern asynchronous handling. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L14-L20)
- Avoid deprecated number modifiers on Vue `v-on` directives by enabling `noVueVOnNumberValues` for future compatibility. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L22-L26)
- Validate Vue `v-for` directives with `useVueValidVFor` to catch invalid aliases, missing keys, and incorrect key usage, improving performance and correctness of lists. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L28-L30)
- Disallow importing Vue compiler macros (e.g., `defineProps`) with `noVueImportCompilerMacros` since they are automatically available, reducing boilerplate. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L32-L33)
- Leverage `organizeImports` for detailed and precise diagnostics, ensuring all predefined groups in configuration are valid to prevent import errors. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L39-L49)
- Improve type accuracy and code clarity by using `noMisleadingReturnType` to flag union annotations with never-returned variants and suggesting narrower types. This also applies to `as const` initializations. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L51-L57,L63-L66)
- Preserve child line breaks in HTML and Vue element formatting when an element contains another element child on its own line for consistent and readable code. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L61-L62)
- Remove redundant type conversions on `as const` initialized object literal properties using `noUselessTypeConversion` for cleaner code. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L68-L72)
- Identify and refactor instance methods, getters, setters, and function-valued fields that don't use `this` using `useThisInClassMethods`, promoting static methods or simpler functions where appropriate. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L74-L83)
- Prevent unexpected string representations by using `noBaseToString` to report stringification sites falling back to `"[object Object]"` formatting. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L91-L92)
- Ensure exhaustive handling of `as const` initialized object literal properties in switch statements with `useExhaustiveSwitchCases`. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L94-L99)
- Use `useStringStartsEndsWith` to detect string index comparisons on `as const` initialized object literal properties, encouraging `startsWith`/`endsWith` for better readability. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L101-L104)
- (experimental) Use Biome's new YAML parser for improved linting and formatting of YAML properties, leveraging `yaml_parser` capabilities. [source](./.skilld/repos/biomejs/biome/releases/@biomejs/biome@2.4.15.md:L142,L161)
<!-- /skilld:best-practices -->

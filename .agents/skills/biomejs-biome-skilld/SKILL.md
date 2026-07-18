---
name: biomejs-biome-skilld
description: "ALWAYS use when writing code importing \"@biomejs/biome\". Consult for debugging, best practices, or modifying @biomejs/biome, biomejs/biome, biomejs biome, biome."
metadata:
  version: 2.5.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# biomejs/biome `@biomejs/biome@2.5.3`
**Tags:** nightly: 1.9.5-nightly.81fdedb, beta: 2.0.0-beta.6, latest: 2.5.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @biomejs/biome` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @biomejs/biome` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Biome v2.4.x API Changes

This document captures version-specific API changes in the v2.4.x series that would confuse LLMs trained on older Biome versions. Focus on changes introduced in v2.4.0 (MINOR release) and subsequent patch versions.

## API Changes

This section documents breaking changes, new APIs, and significant behaviour shifts.

- BREAKING: HTML formatter completely overhauled in v2.4.0 — now matches Prettier formatting more closely; existing HTML, Vue, Svelte, and Astro files will see significant formatting diffs if using the HTML formatter [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L821:825)

- BREAKING: `biome check` with `organizeImports` now errors if configuration references unknown predefined groups (e.g., `:INEXISTENT:`) instead of silently ignoring them — update `groups` configuration in `organizeImports` options [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L45:59)

- NEW: CLI flag `--reporter` now accepts multiple values to run multiple reporters simultaneously; combine with `--reporter-file` to save each to separate files — e.g. `biome ci --reporter=default --reporter=github --reporter=rdjson --reporter-file=/tmp/report.json` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L41:67)

- NEW: `--reporter-file` CLI flag saves reporter output to a file; `--reporter` and `--reporter-file` flags must appear next to each other [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L51:67)

- NEW: SARIF reporter (`--reporter=sarif`) for standardized diagnostic output format — unknown to models trained before v2.4.0 [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L110)

- NEW: `useDestructuring` rule now exposes `variableDeclarator` and `assignmentExpression` options (each with `{array: true, object: true}` defaults) matching ESLint's `prefer-destructuring` — applies both at declaration and assignment sites [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L50)

- NEW: Formatter option `trailingNewline` (default `true`) controls whether files end with newline; available globally and per-language; CLI flags `--formatter-trailing-newline`, `--javascript-formatter-trailing-newline`, `--json-formatter-trailing-newline`, `--graphql-formatter-trailing-newline`, `--css-formatter-trailing-newline`, `--html-formatter-trailing-newline` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L672:697)

- NEW: `--watcher-kind` option for file watching strategy (`recommended`, `polling`, `none`); `--watcher-polling-interval` (milliseconds, default 2000) for polling mode — environment variables `BIOME_WATCHER_KIND` and `BIOME_WATCHER_POLLING_INTERVAL` as aliases [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L187:205)

- NEW: Biome LSP now accepts `inlineConfig` setting from editors to inject configuration without affecting project config — e.g. Zed editor can set indent style via `.zed/settings.json` lsp.biome.settings.inline_config [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L490:512)

- NEW: Config file discovery from system config directories after project folders: `$XDG_CONFIG_HOME/biome` (Linux), `~/Library/Application Support/biome` (macOS), `C:\Users\$USER\AppData\Roaming\biome\config` (Windows) [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L554:567)

- NEW: `biome-ignore-all format: <explanation>` suppression comment at document start disables formatting for entire file — works across all languages [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L446:460)

- NEW: CLI `--only` and `--skip` options for `biome check` and `biome ci` to include/exclude specific rules, groups, or domains; e.g. `biome check --only=suspicious/noDebugger src/**/*.js` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L636:644)

- NEW: `types` linter domain for rules requiring type inference engine (distinct from `project` domain for module graph); moved 7 nursery rules here: `useArraySortCompare`, `useAwaitThenable`, `useFind`, `useRegexpExec`, `noUnnecessaryConditions`, `noMisusedPromises`, `noFloatingPromises` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L649:661)

- NEW: `--profile-rules` CLI flag outputs performance report of which lint rules took longest to execute [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L536)

- NEW: `useImportExtensions` rule now has `extensionMappings` option to specify custom file extensions for different module types — e.g. ban `.ts` imports in favour of `.js` imports [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L622:634)

- NEW: 21 nursery rules promoted to stable groups (v2.4.0): `noUnresolvedImports`, `noVueReservedProps`, `noVueReservedKeys`, `noVueDataObjectDeclaration`, `noNextAsyncClientComponent`, `noVueDuplicateKeys`, `noVueSetupPropsReactivityLoss` (correctness); `noImportCycles`, `noDeprecatedImports`, `noReactForwardRef`, `noUnusedExpressions`, `noEmptySource`, `useDeprecatedDate`, `noDuplicateDependencies` (suspicious); `noUselessUndefined`, `useMaxParams`, `noUselessCatchBinding` (complexity); `useConsistentArrowReturn`, `noJsxLiterals` (style) [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L386:445)

- NEW: HTML lint rules added in v2.4.0 (unknown to older LLMs): `useAnchorContent`, `useMediaCaption`, `useIframeTitle`, `useHtmlLang`, `noDistractingElements`, `useValidAriaRole`, `useAriaPropsForRole`, `noPositiveTabindex`, `useAltText`, `noAccessKey`, `noRedundantAlt`, `noSvgWithoutTitle`, `noAutofocus`, `useButtonType`, `useValidLang` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L37:488)

- NEW: CSS embedded snippet formatting in JavaScript for `styled-components`, `@emotion/styled`, `@emotion/react` — feature must be enabled with `javascript.experimentalEmbeddedSnippetsEnabled: true` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L568:618)

- NEW: GraphQL embedded snippet formatting in JavaScript for `gql` and `graphql` tagged templates — feature must be enabled with `javascript.experimentalEmbeddedSnippetsEnabled: true` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L223:259)

- NEW: JSON as target language for GritQL pattern matching (alongside JS) — enables JSON config file transformations [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L79:106)

- NEW: Cursor application configuration files now auto-parse with comments and trailing commas enabled (files in `.cursor/`, `%APPDATA%\Cursor\User\`, `~/Library/Application Support/Cursor/User/`, `~/.config/Cursor/User/`) [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L73:77)

- NEW: CSS modules detected automatically for `*.module.css` files — can remove explicit `cssModules: true` parser config if only using that pattern [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L368:379)

- NEW: CSS parser supports `:global` and `:local` in `.astro`, `.svelte`, `.vue` `<style>` blocks — requires `experimentalFullHtmlSupportedEnabled: true` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L382:384)

- NEW: CSS supports Vue `v-bind()` function in module declarations [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L861)

- NEW: CSS parser supports typed `attr()` function — e.g. `width: attr(data-size type(<length> | <percentage>), 0px)` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L462:470)

- NEW: CSS formatter supports `@function` at-rule from CSS Mixins Module Level 1 [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L703:710)

- NEW: `ignore` option added to multiple CSS rules (v2.4.0) — `noUnknownProperty`, `noUnknownFunction`, `noUnknownPseudoClass`, `noUnknownPseudoElement` can now suppress diagnostics for matching identifiers [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L108:352)

- NEW: `useHookAtTopLevel` now supports `ignore` option to exclude function names from hook detection even if they follow `use*` convention [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L15:35)

- NEW: `useSortedKeys` assist now has `groupByNesting` option — simple values sorted first, then nested values [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L261:307)

- NEW: `useIterableCallbackReturn` has `checkForEach` option (default true) to optionally skip `forEach` callbacks [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L160)

- NEW: `useUnifiedTypeSignatures` added options from typescript-eslint: `ignoreDifferentlyNamedParameters` and `ignoreDifferentJsDoc` to ignore overload signatures with parameter name or JSDoc differences [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L514:534)

- NEW: JavaScript now respects `jsxFactory` and `jsxFragmentFactory` from `tsconfig.json` for classic JSX runtime, preventing false positive `noUnusedImports` errors for custom JSX libraries like Preact [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L164:184)

- IMPROVED: `noMisleadingReturnType` (v2.4.15) now flags union annotations with unused variants (e.g., `string | null` when `null` never returned) and suggests narrower type [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L61:72)

- IMPROVED: `noMisleadingReturnType` (v2.4.15) detects misleading return types when object literal properties use `as const` [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L78:86)

- IMPROVED: `useOptionalChain` (v2.4.16) now detects negated guard inequality chains like `!foo || foo.bar !== "x"` [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L52)

**Also changed:** `noDuplicateClasses` assist for JSX/HTML · `useSortedInterfaceMembers` assist · `noUnusedImports` adds `export {}` in TypeScript · HTML element line break preservation · Vue and Svelte inline element interpolation · SCSS/CSS parser enhancements (interpolations, keyframes, selectors, at-rules) · Markdown parser support · New nursery Vue rules (`useVueNextTickPromise`, `noVueVOnNumberValues`, `useVueValidVFor`, `noVueImportCompilerMacros`) · New nursery test rules (`useTestHooksInOrder`) · New nursery general rules (`useThisInClassMethods`, `noNestedPromises`, `noUselessReturn`) · CSS properties order updated to match stylelint-config-recess-order@7.4.0 · Svelte function bindings parsing improved · HTML formatter spacing fixes · Improved Vue/Svelte variable binding detection
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Verify Biome's output against the official playground before relying on formatting compatibility — the playground displays side-by-side Prettier output to confirm exact parity [source](./.skilld/discussions/discussion-9536.md#accepted-answer)

- Use multiple reporters to balance developer visibility and CI integration — combine `--reporter=default` for terminal output with `--reporter=github` or `--reporter=rdjson` for CI systems without duplicating output [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L41-67)

- Save reporter output to files with `--reporter-file` when collecting multiple report formats — this enables archiving diagnostics separately from console output without pipe complexity [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L51-65)

- Order `organizeImports` groups strategically — matchers are evaluated sequentially, so exclude matched categories from earlier groups using boolean flags like `"type": false` if later groups need to match those same imports [source](./.skilld/discussions/discussion-9401.md:L14-36)

- Prefer built-in type-aware rule resolution over manual type checking — type-aware rules correctly handle re-exported imports and aliased re-exports without additional configuration [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L140-177)

- Enable LSP file watcher to automatically reload on configuration changes — Biome watches `.biome.json` and `.biome.jsonc` by default, so editing configuration during a session applies changes without restart [source](./.skilld/releases/@biomejs/biome@2.4.14.md:L78)

- Use rule options with explicit `level` and `options` separately to avoid panic errors — don't provide `level` alone; structure rule config as `{ "level": "warn", "options": { /* settings */ } }` when options are required [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L195)

- Add `ignore` options to rules for framework-specific false positives — rules like `useHookAtTopLevel` accept an `ignore` array to exclude functions that follow naming conventions but aren't hooks [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L15-35)

- Enable Vue SFC `<style scoped>` enforcement with `useVueScopedStyles` in nursery rules — this rule prevents CSS leakage between components, a common source of subtle styling bugs [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L15)

- Preserve blank lines between object properties — Biome intentionally preserves existing blank lines inside object literals to respect developer-intended grouping, matching Prettier [source](./.skilld/discussions/discussion-9536.md:L17-43)

- Recognize additional test assertion libraries beyond `expect()` — Biome's test rules now acknowledge `assert`, `expectTypeOf`, and `assertType` as valid assertions in test files [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L25-46)

- Batch plugins into single syntax visitor for performance gains (experimental) — Biome v2.4.5+ reduced per-node plugin dispatch overhead from O(N) to O(1) by batching, improving performance on large codebases [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L17-18)

- Respect `jsxFactory` and `jsxFragmentFactory` from `tsconfig.json` — Biome now reads these settings to prevent false `noUnusedImports` errors when using custom JSX libraries like Preact [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L164-185)

- Enable CSS Vue-specific pseudo-functions only with `experimentalFullHtmlSupportedEnabled` — the Vue SFC CSS parser (`:slotted`, `:deep`) requires explicit opt-in to avoid parsing errors in standard CSS [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L69-72)
<!-- /skilld:best-practices -->

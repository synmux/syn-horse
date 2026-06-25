---
name: biomejs-biome-skilld
description: 'ALWAYS use when writing code importing "@biomejs/biome". Consult for debugging, best practices, or modifying @biomejs/biome, biomejs/biome, biomejs biome, biome.'
metadata:
  version: 2.5.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-16
---

# biomejs/biome `@biomejs/biome@2.5.0`

**Tags:** nightly: 1.9.5-nightly.81fdedb, beta: 2.0.0-beta.6, latest: 2.5.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @biomejs/biome` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @biomejs/biome` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for Biome v2.4.x (MINOR v2.4.0 released 2026-02-15; latest patch v2.4.16 released 2026-05-27). Note: v2.5.0 does not yet exist.

## Breaking Changes (v2.4.0+)

- BREAKING: HTML formatter completely overhauled — code will format very differently. The formatter was rewritten from scratch to more closely resemble Prettier formatting, fixing whitespace sensitivity issues (#5150, #6625, #8437). This is a silent breakage: old code still parses but produces different output. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#breaking-changes)

## CLI Changes

- NEW: `--reporter` can now be used multiple times — combine reporters like `biome ci --reporter=default --reporter=github` to emit both simultaneously. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--reporter-file` option saves reporter output to a file (relative or absolute path). Must appear immediately after `--reporter` flag. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--reporter=sarif` — emits diagnostics in SARIF format for CI/CD integration. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--watcher-kind` controls file watcher strategy (`recommended`, `polling`, `none`). Use environment variable `BIOME_WATCHER_KIND` as alias. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--watcher-polling-interval` sets polling interval in milliseconds (default 2000ms). Alias: `BIOME_WATCHER_POLLING_INTERVAL`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--profile-rules` CLI flag enables rule profiler to see which lint rules took longest to execute. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `--only` and `--skip` options for `biome check` and `biome ci` to run or exclude specific lint rules, rule groups, domains, or assist actions (e.g., `biome check --only=suspicious/noDebugger`). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

## Formatter Configuration

- NEW: `formatter.trailingNewline` option controls whether formatter adds/removes trailing newline at end of file (default `true`). Language-specific overrides available (e.g., `javascript.formatter.trailingNewline`). CLI flags: `--formatter-trailing-newline`, `--javascript-formatter-trailing-newline`, etc. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `formatter.trailingCommas` now supported in formatter overrides (was missing in v2.4.0). [source](./.skilld/releases/@biomejs/biome@2.4.16.md#patch-changes)

- NEW: Top-level suppression comment `biome-ignore-all format: <explanation>` prevents formatting of entire file — works for all supported languages. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

## Lint Rules & Options

- NEW: 21 nursery rules promoted to stable groups in v2.4.0. **Correctness**: `noUnresolvedImports` (error), `noVueReservedProps` (error), `noVueReservedKeys` (error), `noVueDataObjectDeclaration` (warn), `noNextAsyncClientComponent` (warn), `noVueDuplicateKeys` (error), `noVueSetupPropsReactivityLoss` (error), `useQwikMethodUsage` (error), `useQwikValidLexicalScope` (error). **Suspicious**: `noImportCycles` (warn), `noDeprecatedImports` (warn), `noReactForwardRef` (warn), `noUnusedExpressions` (warn), `noEmptySource` (warn), `useDeprecatedDate` (warn), `noDuplicateDependencies` (warn). **Complexity**: `noUselessUndefined` (info), `useMaxParams` (warn), `noUselessCatchBinding` (info). **Style**: `useConsistentArrowReturn` (info), `noJsxLiterals` (info). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useHookAtTopLevel` now has `ignore` option to specify function names that should not be treated as hooks despite `use*` naming convention. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noUnknownProperty`, `noUnknownFunction`, `noUnknownPseudoClass`, `noUnknownPseudoElement` rules now support `ignore` option to suppress diagnostics for matching identifiers. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useIterableCallbackReturn` rule now has `checkForEach` option (default `true`). Set to `false` to skip checking `forEach()` callbacks for returning values. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useImportExtensions` rule now has `extensionMappings` option to specify custom file extension mappings (e.g., `{"ts": "js"}`). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useSortedKeys` assist now has `groupByNesting` option — when enabled, object keys are grouped by nesting depth (simple values first, then nested values) before sorting alphabetically. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useUnifiedTypeSignatures` rule added two options: `ignoreDifferentlyNamedParameters` and `ignoreDifferentJsDoc` to match ESLint's `typescript-eslint` configuration. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useDestructuring` rule now has `variableDeclarator` and `assignmentExpression` options (both default `{array: true, object: true}`) to control which contexts enforce destructuring. Diagnostic for bare object assignments now instructs wrapping in parentheses. [source](./.skilld/releases/@biomejs/biome@2.4.16.md#patch-changes)

- NEW: `useOptionalChain` rule now detects negated guard inequality chains like `!foo || foo.bar !== "x"`. [source](./.skilld/releases/@biomejs/biome@2.4.16.md#patch-changes)

- IMPROVED: `useHookAtTopLevel` better detects invalid hook usage in more locations — now catches hooks called at module level and in non-hook functions (except function expressions used in tests). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

## HTML Rules

- NEW: `useAnchorContent` — enforces anchor elements have accessible content for screen readers. Flags empty anchors, anchors with only whitespace, or anchors where all content is hidden with `aria-hidden`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useMediaCaption` — enforces `audio` and `video` elements have `track` element with `kind="captions"` for accessibility. Muted videos exempt. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useIframeTitle` — enforces `iframe` elements have non-empty `title` attribute. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useValidAriaRole` — enforces elements with ARIA roles use valid, non-abstract ARIA role values. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useAriaPropsForRole` — enforces elements with ARIA roles have all required ARIA attributes for that role. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useAltText` — enforces elements requiring alt text (`img`, `area`, `input type="image"`, `object`) provide alt, title, aria-label, or aria-labelledby. Elements with `aria-hidden="true"` exempt. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useValidLang` — HTML language rule (specifics in v2.4.0). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useHtmlLang` — enforces `html` element has non-empty `lang` attribute. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noAutofocus` — prevents use of `autofocus` attribute (causes accessibility issues). Allows `autofocus` in `dialog` elements or elements with `popover` attribute. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noPositiveTabindex` — prevents positive integers on `tabindex` attribute (disrupts keyboard navigation). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noAccessKey` — prevents `accesskey` attribute (conflicts with screen reader/keyboard-only user commands). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noSvgWithoutTitle` — enforces `svg` elements have `title` element. Supports `graphics-document` and `graphics-symbol` roles and multiple role specifications. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `useButtonType` — enforces `button` elements have non-empty, valid `type` attribute (button|reset|submit). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noDistractingElements` — prevents use of `marquee` and `blink` elements. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noRedundantAlt` — enforces `img` alt attribute doesn't contain "image", "picture", or "photo". [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `noDuplicateClasses` assist action — detects and removes duplicate CSS classes in JSX `class`/`className` attributes and HTML `class` attributes. Supports utility functions like `clsx`, `cn`, `cva`. First HTML assist action. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- BREAKING: HTML formatter overhauled; whitespace handling and line breaks will differ from v2.3 (see Breaking Changes section above).

## Language Support & Parser

- NEW: JSON is now a target language for GritQL pattern matching (supports both native Biome AST names like `JsonMember` and TreeSitter-compatible names like `pair`, `object`). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: Cursor files automatically parsed with comments and trailing commas enabled (`$PROJECT/.cursor/`, `%APPDATA%\Cursor\User\` on Windows, `~/Library/Application Support/Cursor/User/` on macOS, `~/.config/Cursor/User/` on Linux). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: CSS parser now parses Vue SFC syntax (`:slotted` and `:deep` pseudo functions) when `experimentalFullHtmlSupportedEnabled` is `true`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: CSS modules auto-detected for `*.module.css` files — no need to set `cssModules: true` in parser config if only using `*.module.css`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: CSS parser supports `:global` and `:local` inside `.astro`, `.svelte`, `.vue` file `<style>` blocks when `experimentalFullHtmlSupportedEnabled` is `true`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: Support for formatting/linting embedded CSS in JavaScript (styled-components, @emotion/styled, @emotion/react `css` template literals). Feature experimental; enable with `experimentalEmbeddedSnippetsEnabled: true`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: Support for formatting/linting embedded GraphQL in JavaScript (`gql` tag from graphql-tag and `graphql` from ./graphql imports). Feature experimental; enable with `experimentalEmbeddedSnippetsEnabled: true`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: `jsxFactory` and `jsxFragmentFactory` settings from `tsconfig.json` are now respected for classic JSX runtime, preventing false positive `noUnusedImports` errors with custom JSX libraries (e.g., Preact). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: Biome now loads hidden config files (`.biome.json` and `.biome.jsonc`) alongside standard names. Priority: `biome.json` → `biome.jsonc` → `.biome.json` → `.biome.jsonc`. Also loads from system config directories (`$XDG_CONFIG_HOME`/`~/.config/biome` on Linux, `~/Library/Application Support/biome` on macOS, `C:\Users\$USER\AppData\Roaming\biome\config` on Windows). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: CSS parser supports typed `attr()` CSS function (e.g., `width: attr(data-size type(<length> | <percentage>), 0px);`). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: CSS parser supports `@function` at-rule from CSS Mixins Module Level 1 (e.g., `@function --transparent(...) returns <color> { ... }`). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

## LSP & Language Server

- NEW: LSP now supports `inlineConfig` setting to inject Biome configuration without affecting project config — useful for editor extensions. Example (Zed): `lsp.biome.settings.inline_config.formatter.indentWidth: 4`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: LSP reports progress while scanning files and dependencies in project. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

## Miscellaneous

- NEW: Formatting is now applied when using `--fix` flag with safe/unsafe fixes (previously only linting fixes were formatted). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- NEW: Linter domains — new `types` domain for rules requiring type inference engine (as opposed to `project` domain for module graph rules). Moved to `types` domain: `useArraySortCompare`, `useAwaitThenable`, `useFind`, `useRegexpExec`, `noUnnecessaryConditions`, `noMisusedPromises`, `noFloatingPromises`. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- IMPROVED: CSS properties order updated to align with stylelint-config-recess-order v7.4.0 (added containment, font synthesis, ruby, color adjustment, view transitions, shapes, motion path properties). [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- IMPROVED: `noUnusedVariables` in Svelte files now correctly detects variables defined in JavaScript blocks and used in templates. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

- IMPROVED: `noVueDuplicateKeys` rule now correctly handles `toRefs(props)` patterns without false positives (v2.4.16). [source](./.skilld/releases/@biomejs/biome@2.4.16.md#patch-changes)

- NEW: Fatal errors can now include stacktrace when `RUST_BACKTRACE=1` environment variable is set. [source](./.skilld/releases/@biomejs/biome@2.4.0.md#minor-changes)

**Also changed:** Support for formatting standalone interpolations in Vue/Svelte inline elements · Fixed Vue dynamic slot shorthand with template literals · Fixed Tailwind `@utility` parsing · Added `useConsistentEnumValueType` nursery rule · SCSS interpolation support in selectors, properties, attributes · Fixed `useComponentExportOnlyModules` TanStack Router patterns · Improved `useVueValidVOn` keyboard event handling · Improved `noSvgWithoutTitle` role support

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `ignore` option in rules like `useHookAtTopLevel`, `noUnknownProperty`, `noUnknownFunction`, and `noUnknownPseudoClass` to customize which items don't trigger diagnostics — avoids disabling entire rules when only specific patterns should be exempt [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L15:35)

- Configure framework-specific settings from `tsconfig.json` like `jsxFactory` and `jsxFragmentFactory` in Biome's configuration to prevent false positives in custom JSX/TSX libraries like Preact — Biome respects these settings automatically [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L164:184)

- Set `--watcher-kind` to `polling` on network-mounted filesystems or when folder-locking issues occur; use `recommended` (the default) for best performance on local drives — watcher strategy directly affects LSP responsiveness [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L188:206)

- Use multiple reporters together in CI (e.g., `--reporter=default --reporter=github`) and save structured output to files with `--reporter-file` — enables both human-readable logs and machine-parseable formats in a single run [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L41:67)

- Enable `experimentalEmbeddedSnippetsEnabled` in JavaScript configuration to format and lint CSS-in-JS (styled-components, Emotion) and GraphQL template strings — embedded snippets with interpolations are not yet supported [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L251:259)

- Configure rule overrides for file patterns rather than disabling rules globally — use `overrides` with `includes`/`excludes` to apply different rule strictness per language or file type [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L836:857)

- Run `biome ci --profile-rules` to identify performance bottlenecks and see which lint rules consume the most execution time — use this when linting feels slow to find rules to optimize or disable [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L536:538)

- Set `formatter.trailingNewline: false` when Biome-formatted code must match tools that strip final newlines — the global option can be overridden per language for fine-grained control [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L672:698)

- Use `biome-ignore-all format: <reason>` at the start of generated or auto-formatted files to skip formatting entirely — this top-level suppression comment preserves file as-is without per-line annotations [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L446:460)

- Configure Biome to load from standard config directories (`$XDG_CONFIG_HOME`, `~/Library/Application Support/`, `%APPDATA%`) when you want project-agnostic defaults — Biome searches project folder, then parent folders, then system config homes in order [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L554:567)

- Use `--only` and `--skip` flags in `biome check` and `biome ci` to run a subset of rules or domains — this is faster than disabling rules in configuration for temporary checks or debugging [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L636:644)

- Enable type-inference domain rules (like `useArraySortCompare`, `useAwaitThenable`, `noMisusedPromises`) only when type information is available, separate from the `project` domain which requires module graph — type inference is expensive and can slow linting [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L649:661)

- Use CSS modules parsing automatically by naming files `*.module.css` — explicit `cssModules: true` configuration is no longer needed and can be removed [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L368:380)

- Use `groupByNesting: true` option in `useSortedKeys` assist to group simple values before nested values in object literals — improves readability by visual separation without sacrificing alphabetical sort within groups [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L261:307)
<!-- /skilld:best-practices -->

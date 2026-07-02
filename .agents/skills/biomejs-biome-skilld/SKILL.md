---
name: biomejs-biome-skilld
description: "ALWAYS use when writing code importing \"@biomejs/biome\". Consult for debugging, best practices, or modifying @biomejs/biome, biomejs/biome, biomejs biome, biome."
metadata:
  version: 2.5.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# biomejs/biome `@biomejs/biome@2.5.2`
**Tags:** nightly: 1.9.5-nightly.81fdedb, beta: 2.0.0-beta.6, latest: 2.5.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @biomejs/biome` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @biomejs/biome` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in Biome v2.4.x — prioritising recent minor and patch releases where breaking changes and new APIs may not be known to LLMs trained on older data.

### CLI Flags & Configuration

- NEW: `--reporter=` now accepts multiple values and supports chaining with `--reporter-file` to save output to different files. Use `--reporter=default --reporter=github` to output to both console and GitHub Actions format [source](./.skilld/releases/@biomejs/biome@2.4.0.md#reporter-changes)

- NEW: `--reporter-file <path>` option saves reporter output to a file (relative or absolute path). Must appear immediately after its corresponding `--reporter` flag [source](./.skilld/releases/@biomejs/biome@2.4.0.md#reporter-file-support)

- NEW: `--reporter=sarif` emits diagnostics in SARIF (Static Analysis Results Format) for tool integration [source](./.skilld/releases/@biomejs/biome@2.4.0.md#sarif-reporter)

- NEW: `--watcher-kind` controls file watcher behaviour. Accepts `recommended` (default), `polling`, or `none`. Environment variable `BIOME_WATCHER_KIND` also available [source](./.skilld/releases/@biomejs/biome@2.4.0.md#watcher-kind)

- NEW: `--watcher-polling-interval <ms>` sets polling interval in milliseconds when using `--watcher-kind=polling`. Defaults to 2000ms. Environment variable `BIOME_WATCHER_POLLING_INTERVAL` also available [source](./.skilld/releases/@biomejs/biome@2.4.0.md#watcher-polling-interval)

### Configuration & Parser Features

- NEW: `*.module.css` files automatically enable CSS modules parsing without explicit configuration. The `css.parser.cssModules` config option is now redundant for `*.module.css` files [source](./.skilld/releases/@biomejs/biome@2.4.0.md#css-modules-auto-detection)

- NEW: CSS parser now supports Vue SFC syntax (`:slotted`, `:deep` pseudo-functions) inside `.vue` file `<style>` blocks when `experimentalFullHtmlSupportedEnabled: true` is set [source](./.skilld/releases/@biomejs/biome@2.4.0.md#css-vue-sfc-support)

- NEW: CSS parser supports `:global` and `:local` pseudo-selectors inside `.astro`, `.svelte`, and `.vue` `<style>` blocks when `experimentalFullHtmlSupportedEnabled: true` [source](./.skilld/releases/@biomejs/biome@2.4.0.md#css-scoping-selectors)

- NEW: Biome now parses Cursor JSON configuration files with comments and trailing commas enabled (paths: `$PROJECT/.cursor/`, `%APPDATA%\Cursor\User\` on Windows, `~/Library/Application Support/Cursor/User/` on macOS, `~/.config/Cursor/User/` on Linux) [source](./.skilld/releases/@biomejs/biome@2.4.0.md#cursor-files)

- NEW: `formatter.trailingCommas` option is now supported in formatter overrides (previously only available at top level) [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L56)

### Lint Rules — Promoted from Nursery

- NEW: `noUnresolvedImports` promoted to `correctness` group with default severity `error`. Reports imports that cannot be resolved [source](./.skilld/releases/@biomejs/biome@2.4.0.md#promoted-rules)

- NEW: `noVueReservedProps` promoted to `correctness` group with default severity `error`. Reports Vue reserved props usage [source](./.skilld/releases/@biomejs/biome@2.4.0.md#promoted-rules)

- NEW: `noVueReservedKeys` promoted to `correctness` group with default severity `error`. Reports Vue reserved keys usage [source](./.skilld/releases/@biomejs/biome@2.4.0.md#promoted-rules)

### Lint Rules — New Rules Added

- NEW: `useHookAtTopLevel` now has an `ignore` option to specify function names that should not be treated as hooks [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usehookattoplevel-ignore)

- NEW: `useAnchorContent` (HTML) enforces anchor elements have accessible content for screen readers. Flags empty anchors, whitespace-only anchors, and anchors with only `aria-hidden` content [source](./.skilld/releases/@biomejs/biome@2.4.0.md#useanchorcontent)

- NEW: `useMediaCaption` (HTML) enforces `audio` and `video` elements have `<track kind="captions">` for accessibility. Muted videos are exempted [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usemediacaption)

- NEW: `noAutofocus` (HTML) disallows the `autofocus` attribute on elements, with exceptions for `<dialog>` and elements with `popover` attribute [source](./.skilld/releases/@biomejs/biome@2.4.0.md#noautofocus)

- NEW: `noPositiveTabindex` (HTML) prevents positive integers on the `tabindex` attribute to preserve natural keyboard navigation order [source](./.skilld/releases/@biomejs/biome@2.4.0.md#nopositibetabindex)

- NEW: `useAltText` (HTML) enforces alternative text on images, areas, input images, and objects via `alt`, `title`, `aria-label`, or `aria-labelledby` [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usealtsrc)

- NEW: `useValidAriaRole` (HTML) enforces elements with ARIA roles use valid, non-abstract ARIA roles [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usevalidariarole)

- NEW: `useHtmlLang` (HTML) enforces the `html` element has a non-empty `lang` attribute [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usehtmllang)

- NEW: `useIframeTitle` (HTML) enforces `iframe` elements have a `title` attribute with non-empty value [source](./.skilld/releases/@biomejs/biome@2.4.0.md#useiframetitle)

- NEW: `useSortedInterfaceMembers` (TypeScript assist action) sorts TypeScript interface members alphabetically with an autofix [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usesortedinterfacemembers)

- NEW: `noDuplicateClasses` (assist action) detects and removes duplicate CSS classes in JSX and HTML. For JSX, supports `class`, `className`, and utility functions like `clsx`, `cn`, `cva` [source](./.skilld/releases/@biomejs/biome@2.4.0.md#noduplicateclasses)

- NEW: `noReactStringRefs` (nursery) disallows legacy React string refs (`ref="name"` and `this.refs.name`) and template-literal refs [source](./.skilld/releases/@biomejs/biome@2.4.14.md:L74)

- NEW: `useMathMinMax` (nursery) prefers `Math.min()` and `Math.max()` over equivalent ternary comparisons [source](./.skilld/releases/@biomejs/biome@2.4.14.md#usemathminmax)

- NEW: `useNullishCoalescing` (nursery) suggests using the nullish coalescing operator (`??`) instead of logical OR (`||`) to prevent falsy values being incorrectly treated as missing [source](./.skilld/releases/@biomejs/biome@2.4.5.md:L64)

- NEW: `useDisposables` detects disposable objects assigned to variables without `using` or `await using` syntax. Applies to objects implementing `Disposable` or `AsyncDisposable` interface [source](./.skilld/releases/@biomejs/biome@2.4.11.md:L56)

- NEW: `noMisleadingReturnType` detects when a function's return type annotation is wider than what the implementation actually returns [source](./.skilld/releases/@biomejs/biome@2.4.11.md:L42)

### Lint Rule Options — Enhanced

- BREAKING: `noUnknownProperty` now has an `ignore` option to suppress diagnostics for matching property names [source](./.skilld/releases/@biomejs/biome@2.4.0.md#nounknownproperty-ignore)

- BREAKING: `noUnknownFunction` now has an `ignore` option to suppress diagnostics for matching function names [source](./.skilld/releases/@biomejs/biome@2.4.0.md#nounknownfunction-ignore)

- BREAKING: `noUnknownPseudoClass` now has an `ignore` option to suppress diagnostics for matching pseudo-class names [source](./.skilld/releases/@biomejs/biome@2.4.0.md#nounknownpseudoclass-ignore)

- BREAKING: `useIterableCallbackReturn` now has a `checkForEach` option (default `true`). Set to `false` to skip checking `forEach()` callbacks for returning values [source](./.skilld/releases/@biomejs/biome@2.4.0.md#useiterablecallbackreturn-checkforeach)

- BREAKING: `useDestructuring` now provides `variableDeclarator` and `assignmentExpression` options (both default to `{array: true, object: true}`) to control which contexts enforce destructuring. This matches ESLint's `prefer-destructuring` configuration [source](./.skilld/releases/@biomejs/biome@2.4.16.md#usedestructuring-options)

- BREAKING: `useExplicitType` now allows omitting type annotations for trivially inferrable types: binary expressions, comparisons, logical operations, class instantiation, array/conditional literals, function calls, and parameter defaults [source](./.skilld/releases/@biomejs/biome@2.4.11.md#useexplicittype-relaxed)

- CHANGED: `useSortedKeys` assist now accepts a `groupByNesting` option that groups simple values (primitives, single-line structures) before nested values (multi-line structures) [source](./.skilld/releases/@biomejs/biome@2.4.0.md#usesortedkeys-groupbynesting)

### Pattern Matching

- NEW: JSON is now a target language for GritQL pattern matching. Enables GritQL plugins to search and transform JSON configuration files, `package.json`, and other JSON configs [source](./.skilld/releases/@biomejs/biome@2.4.0.md#gritql-json)

### Known Limitations & Future Changes

- NOTE: The `html.parser.vue` configuration option is referenced in v2.4.11 parser diagnostics as "will become available in 2.5", indicating it is not yet available for separate Vue parser configuration [source](./.skilld/releases/@biomejs/biome@2.4.11.md:L107)

**Also changed:** `organizeImports` improved for bare exports · `useValidLang` added (HTML) · `useConsistentTestIt` added (test domain, nursery) · `useExplicitReturnType` added (nursery) · `useTestHooksOnTop` added (test domain, nursery) · `useBaseline` added (CSS, nursery) · `useImportsFirst` added (nursery) · `useVueScopedStyles` added (Vue, nursery) · `noVueRefAsOperand` added (Vue, nursery) · `useQwikLoaderLocation` added (Qwik, nursery) · `noTopLevelLiterals` added (JSON, nursery) · `noEmptyObjectKeys` added (JSON, nursery) · improved HTML formatter for non-text children · improved Astro/Vue/Svelte variable detection · fixed false positives in `noShadow`, `noUndeclaredVariables`, `noUnusedImports` across multiple file types
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use Biome's zero-configuration defaults for new projects — the built-in configuration provides sensible rules and formatting behaviour without requiring setup [source](./.skilld/docs/README.md:L76-L85)

- Enable VCS integration with `vcs.useIgnoreFile` in your `biome.json` to respect `.gitignore` patterns automatically, avoiding manual file exclusions in your configuration [source](./.skilld/issues/issue-4822.md)

- Apply overrides for language-specific linting rules using the `overrides` array in configuration — Biome v2.4.15+ supports `formatter.trailingCommas` in overrides to adjust formatting per file pattern [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L56)

- Configure `organizeImports` with ordered groups to control import sorting behaviour — remember that group matching is sequential, so place more specific patterns before general ones, and use `{ type: false }` to exclude type imports from broader groups [source](./.skilld/discussions/discussion-9401.md:L14-L35)

- Validate `organizeImports` predefined groups (`:PACKAGE:`, `:NODE:`, `:PATH:`, `:BLANK_LINE:`) in your configuration — Biome v2.4.15+ errors on unknown predefined groups to catch configuration typos early [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L44-L59)

- Ensure test lifecycle hooks (`beforeEach`, `beforeAll`, `afterEach`, `afterAll`) are declared in execution order using the nursery rule `useTestHooksOnTop` (v2.4.14+) and `useTestHooksInOrder` (v2.4.15+) to make test setup reasoning clearer [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L15) [source](./.skilld/releases/@biomejs/biome@2.4.14.md:L15)

- Rely on Biome's 97% Prettier compatibility for formatter output — Biome intentionally preserves blank lines between object properties exactly as Prettier does, including in shorthand property contexts [source](./.skilld/docs/README.md:L37) [source](./.skilld/discussions/discussion-9536.md:L50-L52)

- Use `biome ci` command with `--reporter github` in CI pipelines for GitHub PR annotations — lint diagnostics produce precise line/column annotations, while formatting diagnostics are file-level only due to how formatters work [source](./.skilld/discussions/discussion-10286.md:L29-L37)

- Enable LSP file watching so the editor reloads configuration when `.biome.json` or `.biome.jsonc` changes — Biome v2.4.14+ watches configuration files automatically and reloads workspace settings without requiring a restart [source](./.skilld/releases/@biomejs/biome@2.4.14.md:L78)

- Leverage the `reactCompiler` option for `useExhaustiveDependencies` when your project uses React Compiler — this option suppresses misleading diagnostics about functions changing on every re-render because React Compiler automatically wraps them [source](./.skilld/issues/issue-5293.md:L16-L23)

- Use `useExhaustiveDependencies` with framework-specific configurations for Vue (`nextTick` as a promise-returning function via nursery rule `useVueNextTickPromise`) and React (handling edge cases with proper option scoping) [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L17-L19)

- Structure monorepo configurations with nested `biome.json` files in sub-projects — Biome automatically discovers and applies nested configuration, allowing per-package linting rules without duplicating the full configuration in each directory [source](./.skilld/discussions/discussion-9559.md:L26-L31)

- Enable `extends` in your `biome.json` to inherit from a shared base configuration and override specific rules — this pattern is especially useful for monorepos or teams that want consistent defaults with per-project customisation [source](./.skilld/issues/issue-6945.md)

- Combine linter rules from multiple domains (javascript, test, style, nursery) by enabling them per language when needed — for example, enable test-specific rules only in test files using file overrides to avoid false positives in production code [source](./.skilld/releases/@biomejs/biome@2.4.15.md:L15) [source](./.skilld/releases/@biomejs/biome@2.4.14.md:L15)
<!-- /skilld:best-practices -->

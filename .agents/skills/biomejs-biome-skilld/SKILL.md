---
name: biomejs-biome-skilld
description: "ALWAYS use when writing code importing \"@biomejs/biome\". Consult for debugging, best practices, or modifying @biomejs/biome, biomejs/biome, biomejs biome, biome."
metadata:
  version: 2.4.16
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# biomejs/biome `@biomejs/biome@2.4.16`
**Tags:** nightly: 1.9.5-nightly.81fdedb, beta: 2.0.0-beta.6, latest: 2.4.16

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @biomejs/biome` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @biomejs/biome` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Major Breaking Changes

- BREAKING: HTML formatter completely overhauled in v2.4.0 — if you've opted in to experimental HTML formatting, expect large formatting diffs for HTML, Vue, Svelte, and Astro files due to improved whitespace sensitivity handling [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L821:830)

### New Rules — v2.4.0

- NEW: `useAnchorContent` (HTML) — enforces that anchor elements have accessible content for screen readers; flags empty anchors and anchors with only whitespace or hidden content [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L37:38)

- NEW: `useMediaCaption` (HTML) — enforces that `audio` and `video` elements have a `track` element with `kind="captions"` for accessibility; muted videos allowed without captions [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L39:40)

- NEW: `useAltText` (HTML) — enforces that elements requiring alternative text (`<img>`, `<area>`, `<input type="image">`, `<object>`) provide meaningful information via `alt`, `title`, `aria-label`, or `aria-labelledby` attributes [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L313:314)

- NEW: `useValidAriaRole` (HTML) — enforces that elements with ARIA roles use a valid, non-abstract ARIA role [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L348:349)

- NEW: `useAriaPropsForRole` (HTML) — enforces that elements with ARIA roles have all required ARIA attributes for that role [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L620:621)

- NEW: `useValidLang` (HTML) — enforces that the `html` element has a `lang` attribute with a valid language code [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L162:163)

- NEW: `useHtmlLang` (HTML) — enforces that the `html` element has a `lang` attribute [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L207:222)

- NEW: `useIframeTitle` (HTML) — enforces the usage of the `title` attribute on `iframe` elements [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L112:124)

- NEW: `noAccessKey` (HTML) — enforces that the `accesskey` attribute is not used, as it conflicts with keyboard commands used by screen readers [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L472:488)

- NEW: `noAutofocus` (HTML) — enforces that the `autofocus` attribute is not used on elements; allows it inside `dialog` elements or elements with `popover` attribute [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L309:310)

- NEW: `noPositiveTabindex` (HTML) — prevents usage of positive integers on the `tabindex` attribute to avoid disrupting natural keyboard navigation [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L311:312)

- NEW: `noRedundantAlt` (HTML) — enforces that the `img` element `alt` attribute does not contain redundant words "image", "picture", or "photo" [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L645:646)

- NEW: `noSvgWithoutTitle` (HTML) — enforces the usage of the `title` element for the `svg` element for accessibility [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L712:713)

- NEW: `noDistractingElements` (HTML) — enforces that distracting elements like `<marquee>` or `<blink>` are not used [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L287:288)

- NEW: `useButtonType` (HTML) — enforces that the `type` attribute is present and valid on all button elements [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L714:731)

### New Configuration Options — v2.4.0

- NEW: `trailingNewline` formatter option — controls whether the formatter adds/removes trailing newline at end of files; defaults to `true`; available globally and per-language [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L672:698)

- NEW: `useHookAtTopLevel` — `ignore` option to specify function names that should not be treated as hooks even if they follow the `use*` naming convention [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L15:35)

- NEW: `useSortedKeys` — `groupByNesting` option to group object keys by value nesting depth before sorting; simple values first, nested values after [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L261:307)

- NEW: `useIterableCallbackReturn` — `checkForEach` option to skip checking `forEach()` callbacks for returning values when set to `false` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L160:161)

- NEW: `useUnifiedTypeSignatures` — `ignoreDifferentlyNamedParameters` and `ignoreDifferentJsDoc` options from `typescript-eslint` to ignore overload signatures with different parameter names or JSDoc comments [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L514:534)

- NEW: `useImportExtensions` — `extensionMappings` option to specify custom file extensions for different module types; e.g., ban `.ts` imports in favour of `.js` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L622:634)

- NEW: `noUnknownProperty`, `noUnknownFunction`, `noUnknownPseudoClass`, `noUnknownPseudoElement` — `ignore` option to prevent diagnostics for unknown properties/functions/pseudo-selectors matching provided patterns [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L108:109, L350:352)

### New CLI Features — v2.4.0

- NEW: Multiple reporters support — run `biome ci --reporter=default --reporter=github` to use multiple reporters simultaneously [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L41:65)

- NEW: `--reporter-file` option — save reporter output to a file; can combine with multiple reporters [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L51:68)

- NEW: `--skip` and `--only` options for `biome check` and `biome ci` — run or exclude specific lint rules, assist actions, groups, or domains [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L636:644)

- NEW: `--watcher-kind` option — controls file watcher behaviour (`recommended`, `polling`, `none`); has `BIOME_WATCHER_KIND` env alias [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L187:198)

- NEW: `--watcher-polling-interval` option — polling interval in milliseconds for polling watcher; defaults to 2000ms; has `BIOME_WATCHER_POLLING_INTERVAL` env alias [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L201:205)

- NEW: `--profile-rules` flag — shows a report of which lint rules took the longest to execute [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L536:537)

- NEW: `--reporter=sarif` — emit diagnostics using the SARIF format [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L110:111)

### New Experimental Features — v2.4.0

- NEW: Embedded CSS snippets in JavaScript (experimental) — format and lint CSS inside `styled-components`, `@emotion/styled`, `@emotion/react` template literals when `experimentalEmbeddedSnippetsEnabled` is enabled; **excludes snippets with interpolations** [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L568:618)

- NEW: Embedded GraphQL snippets in JavaScript (experimental) — format GraphQL inside `gql` and `graphql` template literals when `experimentalEmbeddedSnippetsEnabled` is enabled [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L223:259)

### New Assist Actions — v2.4.0

- NEW: `noDuplicateClasses` assist action — detect and remove duplicate CSS classes from `class`/`className` attributes and utility functions like `clsx`, `cn`, `cva` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L354:366)

- NEW: `useSortedInterfaceMembers` assist action — sorts TypeScript interface members for readability; includes autofix [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L126:150)

### Configuration and Auto-Detection — v2.4.0

- NEW: CSS modules auto-detection — Biome automatically enables CSS modules parsing for `*.module.css` files; remove explicit `cssModules: true` parser configuration if only using module files [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L368:380)

- NEW: Vue CSS syntax support — Biome parses `:global` and `:local` inside `.vue`, `.svelte`, `.astro` files' `<style>` when `experimentalFullHtmlSupportedEnabled` is enabled [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L382:384)

- NEW: Hidden config file support — Biome now loads `.biome.json` and `.biome.jsonc` in addition to `biome.json` and `biome.jsonc` [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L666:670)

- NEW: Global config paths — Biome attempts to load configuration from `$XDG_CONFIG_HOME`, `$HOME/.config/biome`, `%APPDATA%\biome\config`, or `/Users/$USER/Library/Application Support/biome` when not found in project [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L554:567)

- NEW: Cursor JSON files support — Biome parses Cursor JSON config files with comments and trailing commas enabled [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L73:77)

### TypeScript and JSX — v2.4.0

- NEW: `jsxFactory` and `jsxFragmentFactory` support — Biome respects these settings from `tsconfig.json` when using classic JSX runtime, preventing false `noUnusedImports` errors for custom JSX libraries like Preact [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L164:184)

### Parser Enhancements — v2.4.0

- NEW: Typed `attr` function support (CSS) — parse CSS `attr()` function with type parameters [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L462:469)

- NEW: CSS `@function` at-rule support — parse and format CSS Mixins Module Level 1 `@function` at-rule [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L703:710)

- NEW: SCSS improvements — support for `@include ... using`, interpolated selectors, interpolated properties, parent selectors, custom functions, semicolonless at-rules [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L85:159)

- NEW: GritQL JSON support — write Grit plugins for JSON files using native Biome AST names or TreeSitter-compatible names [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L79:106)

- NEW: Markdown parser implementation (experimental) — basic parsing support for Markdown files [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L921)

### Suppress Comments — v2.4.0

- NEW: `biome-ignore-all format` — top-level suppression comment to prevent formatting of entire file [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L446:460)

### Promoted Rules — v2.4.0

21 nursery rules promoted to stable groups with assigned severities:

**Correctness group:** `noUnresolvedImports` (error), `noVueReservedProps` (error), `noVueReservedKeys` (error), `noVueDataObjectDeclaration` (warn), `noNextAsyncClientComponent` (warn), `noVueDuplicateKeys` (error), `noVueSetupPropsReactivityLoss` (error), `useQwikMethodUsage` (error), `useQwikValidLexicalScope` (error)

**Suspicious group:** `noImportCycles` (warn), `noDeprecatedImports` (warn), `noReactForwardRef` (warn), `noUnusedExpressions` (warn), `noEmptySource` (warn), `useDeprecatedDate` (warn), `noDuplicateDependencies` (warn)

**Complexity group:** `noUselessUndefined` (info), `useMaxParams` (warn), `noUselessCatchBinding` (info)

**Style group:** `useConsistentArrowReturn` (info), `noJsxLiterals` (info)

[source](./.skilld/releases/@biomejs/biome@2.4.0.md:L386:445)

### LSP and Inline Config — v2.4.0

- NEW: Inline LSP configuration — editors can inject Biome configuration to the Language Server via `lsp.biome.settings.inline_config` without affecting project configuration [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L490:512)

- NEW: LSP progress reporting — Language Server reports progress while scanning files and dependencies [source](./.skilld/releases/@biomejs/biome@2.4.0.md:L158)

### Patch Changes — v2.4.16

- NEW: `useDestructuring` rule — added `variableDeclarator` and `assignmentExpression` options to control which contexts enforce destructuring, matching ESLint's `prefer-destructuring` [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L50)

- NEW: `formatter.trailingCommas` in overrides — trailing commas option now available in formatter overrides, not just top-level configuration [source](./.skilld/releases/@biomejs/biome@2.4.16.md:L56)

**Also changed:** v2.3.15 `noNestedPromises` rule (detects nested promise chains) · v2.4.0 CSS properties ordering updated to align with `stylelint-config-recess-order` v7.4.0 · v2.4.0 `noUnusedVariables` improved for Svelte files · v2.4.0 Formatting now applied when applying safe/unsafe fixes · v2.4.0 Vue CSS directives parsing support
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## @biomejs/biome Best Practices

## Best Practices

- Verify Prettier compatibility using the Biome playground before assuming formatting behaviour — Biome maintains 97% compatibility with Prettier, but the playground is the authoritative reference for any given code snippet [source](../../releases/@biomejs/biome@2.4.15.md:L45)

- Structure `organizeImports` groups with ordered matchers from most specific to least specific, explicitly excluding matched imports from subsequent groups — the matching system is ordered by design, and earlier matches prevent later groups from catching imports [source](../discussions/discussion-9401.md:L14-35)

- Use the new `projects` configuration option to control nested file discovery in monorepos — provides fine-grained control over project locations and tags instead of relying solely on automatic discovery [source](../discussions/discussion-9559.md:L26-33)

- Enable `formatter.trailingCommas` in configuration overrides to apply trailing comma rules consistently across different file types — this option was previously missing from overrides despite being available at the top level [source](../../releases/@biomejs/biome@2.4.16.md:L56)

- Configure `useExhaustiveDependencies` with the `reactCompiler` option when using React Compiler, as it automatically wraps functions and eliminates false positives — avoids incorrect warnings about functions changing on every re-render [source](../issues/issue-5293.md:L17-23)

- Use the `variableDeclarator` and `assignmentExpression` options on `useDestructuring` to control destructuring enforcement per context — allows separate configuration for declarations versus assignments, matching ESLint's `prefer-destructuring` [source](../../releases/@biomejs/biome@2.4.16.md:L50)

- Enable the `noVueImportCompilerMacros` rule to prevent importing Vue compiler macros like `defineProps` from the `vue` package — these are automatically available in `<script setup>` blocks and explicit imports are unnecessary [source](../../releases/@biomejs/biome@2.4.15.md:L38-39)

- Use `useVueValidVFor` to validate Vue `v-for` directives for missing keys, invalid aliases, and key variables — ensures template iteration patterns match iteration scope [source](../../releases/@biomejs/biome@2.4.15.md:L37)

- Expect enhanced Svelte function binding precision that prevents false positives in rules like `noCommaOperator` — Biome now parses `bind:value={get, set}` syntax more accurately [source](../../releases/@biomejs/biome@2.4.16.md:L48)

- Leverage SCSS interpolation support in selectors, properties, and parent selectors for advanced styling patterns — Biome v2.4.16+ handles SCSS interpolated selectors (`@include ... using`), dashed identifiers, and parent selectors correctly [source](../../releases/@biomejs/biome@2.4.16.md:L107-108)

- Trust `useOptionalChain` to detect negated guard inequality chains like `!foo || foo.bar !== "x"` and suggest optional chaining — the rule now handles inverted conditionals in guard patterns [source](../../releases/@biomejs/biome@2.4.16.md:L52)

- Rely on `noMisleadingReturnType` to flag return annotations that include unused union variants and suggest narrower types — works with both plain annotations and `as const` assertions on object properties [source](../../releases/@biomejs/biome@2.4.15.md:L61-62)

- Enforce test hook declaration order with `useTestHooksInOrder` — Jest/Vitest lifecycle hooks must be declared in execution order (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) to maintain readable test structure [source](../../releases/@biomejs/biome@2.4.15.md:L15)

- Validate `organizeImports` configuration against known predefined groups — unknown groups like `:INEXISTENT:` will now produce configuration errors instead of silent failures [source](../../releases/@biomejs/biome@2.4.15.md:L50-59)
<!-- /skilld:best-practices -->

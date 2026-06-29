---
name: tailwindcss-vite-skilld
description: "ALWAYS use when writing code importing \"@tailwindcss/vite\". Consult for debugging, best practices, or modifying @tailwindcss/vite, tailwindcss/vite, tailwindcss vite, tailwindcss."
metadata:
  version: 4.3.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# tailwindlabs/tailwindcss `@tailwindcss/vite@4.3.2`
**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/vite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/vite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for @tailwindcss/vite v4.3.2 — prioritising recent major/minor releases and vite-specific fixes.

### Vite Plugin Fixes (Critical)

- BREAKING: `@plugin` now resolves to package JavaScript entries instead of browser CSS entries when using `@tailwindcss/vite` — existing plugins that exported CSS files will fail or behave incorrectly [source](./.skilld/releases/v4.3.0.md#fixed)

- BREAKING: Relative `@import` and `@plugin` paths now resolve from the correct directory when using `@tailwindcss/vite` — paths that worked before may now resolve differently or fail [source](./.skilld/releases/v4.3.0.md#fixed)

- BREAKING: CSS files containing `@variant` are now processed by `@tailwindcss/vite` — previously they may have been skipped, causing variant definitions to be missing [source](./.skilld/releases/v4.3.0.md#fixed)

- FIXED: `@source` external files now correctly trigger a full page reload when using `@tailwindcss/vite` — previously changes to external tracked files did not reload the page [source](./.skilld/releases/v4.2.0.md#fixed)

- FIXED: Vite aliases in `@import` and `@plugin` now resolve correctly when using `@tailwindcss/vite` — previously queries with query params were not treated as unique resources [source](./.skilld/releases/v4.2.4.md#fixed)

- FIXED: 'Sourcemap is likely to be incorrect' warnings are now suppressed when using `@tailwindcss/vite` [source](./.skilld/releases/v4.3.1.md#fixed)

### Spacing Utilities Output Change

- BREAKING: Spacing utilities (e.g., `m-0`, `left-1`) now generate `0` and `var(--spacing)` respectively instead of `calc(var(--spacing) * 0)` and `calc(var(--spacing) * 1)` — the CSS output has changed, which may affect specificity or CSS variable calculation in custom code that relies on the formula representation [source](./.skilld/releases/v4.3.1.md#changed)

### New Utilities (v4.3.0+)

- NEW: `@container-size` utility for container queries [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-{auto,thin,none}` utilities for `scrollbar-width` CSS property, plus `scrollbar-thumb-*` and `scrollbar-track-*` color utilities for `scrollbar-color` [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-gutter-*` utilities for `scrollbar-gutter` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `zoom-*` utilities for `zoom` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `tab-*` utilities for `tab-size` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `font-features-*` utility for `font-feature-settings` CSS property [source](./.skilld/releases/v4.2.0.md#added)

### Variant and Custom Utility Enhancements

- NEW: `@variant` now supports stacked variants (e.g., `@variant hover:focus { … }`) — enables compound pseudo-class selectors [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `@variant` now supports compound variants (e.g., `@variant hover, focus { … }`) — single variant rule can match multiple selectors [source](./.skilld/releases/v4.3.0.md#added)

- NEW: Functional `@utility` definitions now support `--default(…)` in `--value(…)` and `--modifier(…)` clauses for defining default values [source](./.skilld/releases/v4.3.0.md#added)

- FIXED: `@apply` can now be used with CSS mixins — previously attempting to use `@apply` with mixin syntax would fail [source](./.skilld/releases/v4.3.1.md#fixed)

- FIXED: `@variant` can now be used inside `addBase()` plugin function — previously this would cause errors [source](./.skilld/releases/v4.3.1.md#fixed)

### Negation and Container Query Fixes

- FIXED: `not-*` variants now correctly negate `@container` queries, including `style(…)` queries — previously negation did not work for container queries [source](./.skilld/releases/v4.3.1.md#fixed)

- FIXED: `drop-shadow-*` color utilities now work correctly with custom shadow values containing `calc(…)` expressions [source](./.skilld/releases/v4.3.1.md#fixed)

### Plugin Type Export

- NEW: `PluginWithConfig` type is now exported from `tailwindcss/plugin` — previously inferring plugin config types would fail [source](./.skilld/releases/v4.3.0.md#fixed)

### Deprecated APIs

- DEPRECATED: `start-*` and `end-*` utilities are deprecated in favour of `inset-s-*` and `inset-e-*` utilities [source](./.skilld/releases/v4.2.0.md#deprecated)

### Runtime Compatibility

- FIXED: Node 26+ compatibility — now uses `Module#registerHooks` instead of deprecated `Module#register` to avoid deprecation warnings [source](./.skilld/releases/v4.3.1.md#fixed)

**Also changed:** `--silent` option added to `@tailwindcss/cli` · Canonicalization improvements for spacing values, `calc()` expressions, and arbitrary values · Support for multiple `@utility` definitions with same name but different value types · Mauve, olive, mist, taupe color palettes added (v4.2.0+) · Logical spacing utilities (`pbs-*`, `pbe-*`, `mbs-*`, `mbe-*`, `scroll-pbs-*`, `scroll-pbe-*`, etc.) added (v4.2.0+) · Block-size utilities (`block-*`, `min-block-*`, `max-block-*`) and inline-size utilities (`inline-*`, `min-inline-*`, `max-inline-*`) added (v4.2.0+) · Inset logical utilities (`inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*`) added (v4.2.0+)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Initialize a git repository in your project root — Tailwind uses git ignore rules internally for automatic source detection, and a `.gitignore` higher in the directory tree may cause files to be ignored [source](./.skilld/discussions/discussion-20135.md:L35)

- Avoid string concatenation or interpolation when building class names — Tailwind scans static strings only, so dynamic class names like `'p-' + size` will not be detected and CSS will not be generated [source](./.skilld/discussions/discussion-20135.md:L38)

- Use the `@utility` directive instead of `@layer utilities` for custom utility definitions in v4 — `@apply` only works with utilities registered via `@utility`, not with nested CSS inside `@layer utilities` blocks [source](./.skilld/discussions/discussion-20211.md:L41-L57)

- Control Lightning CSS optimisation via the `optimize` option — by default it activates in production (NODE_ENV=production), but you can disable it entirely or selectively disable minification with `optimize: { minify: false }` to keep Lightning CSS enabled [source](./.skilld/pkg/README.md:L46-L76)

- Ensure `@plugin` directives resolve to package JavaScript entries, not browser CSS entries — from v4.3.0, the vite plugin correctly targets JS entries; plugins exporting CSS files may fail [source](./.skilld/releases/v4.3.0.md:L22)

- Relative `@import` and `@plugin` paths now resolve from the correct directory when using `@tailwindcss/vite` — from v4.3.0, paths are resolved correctly; if you see "Cannot find module" errors, upgrade to v4.3.0 or later [source](./.skilld/releases/v4.3.0.md:L23)

- Ensure CSS files containing `@variant` definitions are processed by the vite plugin — from v4.3.0, files with `@variant` are no longer skipped during vite processing [source](./.skilld/releases/v4.3.0.md:L24)

- Use `@apply` with CSS mixins without fear of breakage — from v4.3.1, `@apply` works correctly with mixin syntax, allowing direct use of mixin declarations [source](./.skilld/releases/v4.3.1.md:L17)

- Declare `@variant` rules inside plugin `addBase()` calls — from v4.3.1, custom variants defined within `addBase()` work without errors, enabling modular variant registration [source](./.skilld/releases/v4.3.1.md:L28)

- Support Vite versions 5.2, 6, 7, or 8 — from v4.3.0 (or v4.2.1 insiders), the plugin supports Vite 8; check your `package.json` peer dependency range (`"vite": "^5.2.0 || ^6 || ^7 || ^8"`) and upgrade if needed [source](./.skilld/pkg/package.json:L36)

- Set `@source` directives on external CSS files to trigger full page reloads when dependencies change — this ensures changes to tracked external source files properly invalidate and reload the page in development [source](./.skilld/releases/v4.2.0.md#fixed)

- Define multiple `@utility` rules with the same name but different value types — from v4.3.0, multiple definitions with different value shapes on the same utility name no longer conflict or fail [source](./.skilld/releases/v4.3.0.md:L31)

- Avoid passing query parameters in vite `resolve.alias` for `@import` and `@plugin` paths — query params were not treated as unique resources in earlier versions, causing resolution failures with plugins and imports [source](./.skilld/releases/v4.2.4.md#fixed)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

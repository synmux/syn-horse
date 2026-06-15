---
name: tailwindcss-vite-skilld
description: "ALWAYS use when writing code importing \"@tailwindcss/vite\". Consult for debugging, best practices, or modifying @tailwindcss/vite, tailwindcss/vite, tailwindcss vite, tailwindcss."
metadata:
  version: 4.3.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# tailwindlabs/tailwindcss `@tailwindcss/vite@4.3.1`
**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/vite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/vite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

## Module Resolution Changes

- BREAKING: `@plugin` now resolves package JavaScript entries instead of browser CSS entries when using `@tailwindcss/vite` — previously resolved to browser entry points, causing import errors in Vite environments [source](./.skilld/releases/v4.3.0.md:L63)

- BREAKING: Relative `@import` and `@plugin` paths now resolve correctly when using `@tailwindcss/vite` — relative imports were previously resolved from the wrong directory, breaking file references [source](./.skilld/releases/v4.3.0.md:L64)

## New Utility Families (v4.3.0)

- NEW: `@container-size` utility — CSS `container-size` shorthand utility for defining container query sizing [source](./.skilld/releases/v4.3.0.md:L52)

- NEW: Scrollbar utilities — `scrollbar-{auto,thin,none}` for `scrollbar-width`, `scrollbar-thumb-*` and `scrollbar-track-*` for `scrollbar-color` styling, plus `scrollbar-gutter-*` utilities [source](./.skilld/releases/v4.3.0.md:L53-L54)

- NEW: `zoom-*` utilities — CSS `zoom` property utilities for scaling elements [source](./.skilld/releases/v4.3.0.md:L55)

- NEW: `tab-*` utilities — CSS `tab-size` property utilities for controlling tab character width [source](./.skilld/releases/v4.3.0.md:L56)

## Variant Enhancements (v4.3.0)

- NEW: `@variant` supports stacked variants — can now define compound stacked variants like `@variant hover:focus { … }` for combining pseudo-classes [source](./.skilld/releases/v4.3.0.md:L57)

- NEW: `@variant` supports compound variants — can define multiple variants in one block with comma syntax like `@variant hover, focus { … }` [source](./.skilld/releases/v4.3.0.md:L58)

## Functional Utility Definitions (v4.3.0)

- NEW: `--default(…)` support in `--value(…)` and `--modifier(…)` — functional `@utility` definitions can now specify default values using `--default()` syntax [source](./.skilld/releases/v4.3.0.md:L59)

- NEW: `PluginWithConfig` type exported from `tailwindcss/plugin` — fixes TypeScript errors when inferring plugin config types in type-safe plugin definitions [source](./.skilld/releases/v4.3.0.md:L73)

## Logical Property Utilities (v4.2.0)

- NEW: Logical padding utilities — `pbs-*` (padding-block-start) and `pbe-*` (padding-block-end) for logical directional padding [source](./.skilld/releases/v4.2.0.md:L13)

- NEW: Logical margin utilities — `mbs-*` (margin-block-start) and `mbe-*` (margin-block-end), plus scroll variants `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` [source](./.skilld/releases/v4.2.0.md:L14-L16)

- NEW: Logical border utilities — `border-bs-*` (border-block-start) and `border-be-*` (border-block-end) for block-axis borders [source](./.skilld/releases/v4.2.0.md:L17)

- NEW: Logical size utilities — `inline-*`, `min-inline-*`, `max-inline-*` for `inline-size` property, and `block-*`, `min-block-*`, `max-block-*` for `block-size` [source](./.skilld/releases/v4.2.0.md:L18-L19)

- NEW: Logical inset utilities — `inset-s-*` (inset-inline-start), `inset-e-*` (inset-inline-end), `inset-bs-*` (inset-block-start), `inset-be-*` (inset-block-end) [source](./.skilld/releases/v4.2.0.md:L20)

## Other New Utilities

- NEW: `font-features-*` utility — `font-feature-settings` property utility for controlling OpenType features [source](./.skilld/releases/v4.2.0.md:L21)

## Deprecations

- DEPRECATED: `start-*` and `end-*` utilities — use `inset-s-*` and `inset-e-*` logical property utilities instead (v4.2.0 and later) [source](./.skilld/releases/v4.2.0.md:L42)

**Also changed:** Spacing utility generation optimised for smaller CSS (v4.3.1, #20196)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Initialize a git repository in your project root — Tailwind uses `.gitignore` rules internally for automatic source detection, and absence of a git boundary can cause files to be ignored [source](./.skilld/discussions/discussion-20135.md:L35)

- Use only static class names; never concatenate or interpolate strings to build utility classes — dynamic class names are not detected during scanning [source](./.skilld/discussions/discussion-20135.md:L38)

- Control Lightning CSS optimisation explicitly via the `optimize` option: set to `false` for development, or `{ minify: false }` to keep optimisation enabled but skip minification [source](./.skilld/pkg/README.md:L42:76)

- Ensure CSS files containing `@variant` are included in your `@source` declarations — they are processed by `@tailwindcss/vite` and require explicit file inclusion [source](./.skilld/releases/CHANGELOG.md:L65)

- Use correct `@import` and `@plugin` path resolution with Vite — relative paths resolve from the directory where the `@import` or `@plugin` statement appears, and Vite aliases (e.g. `@/path`) are resolved when configured in `vite.config.ts` [source](./.skilld/releases/CHANGELOG.md:L64,L82)

- Declare `@source` directories that must be scanned even if they're ignored by git — prefix with `@source "path"` without negation to ensure those files are included [source](./.skilld/releases/CHANGELOG.md:L38)

- Use glob patterns in `@source` ending with `**/*` thoughtfully — dynamic path segments are preserved to avoid unnecessary file system walks that slow incremental builds [source](./.skilld/releases/CHANGELOG.md:L34)

- Resolve TypeScript path aliases like `@/` in CSS `@import` statements — configure `tsconfig.json` paths and they will be resolved automatically by the Vite plugin [source](./.skilld/releases/CHANGELOG.md:L121)

- Track external file changes with `@source` — modifications to files listed in `@source` declarations trigger a full page reload in development, not just CSS re-compilation [source](./.skilld/releases/CHANGELOG.md:L156)

- Expect sourcemap generation in development — v4.3.1 fixed incorrect sourcemap warnings, so HMR and debugging are now reliable [source](./.skilld/releases/v4.3.1.md:L20)

- Import JavaScript entries for packages in `@plugin` directives — when resolving package names, `@tailwindcss/vite` uses JavaScript entry points, not CSS entries, for correct plugin loading [source](./.skilld/releases/CHANGELOG.md:L63)

- Scan raw file contents in templates before transforms — the Vite plugin scans unprocessed files to detect utilities, preventing false negatives from framework transforms [source](./.skilld/releases/CHANGELOG.md:L630)

- Accept that Astro production builds may re-include classes from client-only components — the Vite plugin doesn't rely on the module graph for client-only component detection to ensure completeness [source](./.skilld/releases/CHANGELOG.md:L629)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

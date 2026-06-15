---
name: tailwindcss-skilld
description: "ALWAYS use when writing code importing \"tailwindcss\". Consult for debugging, best practices, or modifying tailwindcss."
metadata:
  version: 4.3.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# tailwindlabs/tailwindcss `tailwindcss@4.3.1`
**Tags:** next: 4.0.0, v3-lts: 3.4.19, latest: 4.3.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `@container-size` utility — added in v4.3.0 for container size queries [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-*` utilities — `scrollbar-{auto,thin,none}` for `scrollbar-width`, `scrollbar-thumb-*` and `scrollbar-track-*` for `scrollbar-color` added in v4.3.0 [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-gutter-*` utilities — added in v4.3.0 for `scrollbar-gutter` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `zoom-*` utilities — added in v4.3.0 [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `tab-*` utilities — added in v4.3.0 for `tab-size` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: Stacked `@variant` syntax — `@variant hover:focus { … }` now supported in v4.3.0, enabling composition of multiple variant states [source](./.skilld/releases/v4.3.0.md#added)

- NEW: Compound `@variant` syntax — `@variant hover, focus { … }` now supported in v4.3.0, applying same rules to multiple selectors [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `--default(…)` in functional utilities — functional `@utility` definitions can now use `--default(…)` in `--value(…)` and `--modifier(…)` expressions in v4.3.0 [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `@tailwindcss/webpack` package — webpack plugin for Tailwind CSS added in v4.2.0 [source](./.skilld/releases/v4.2.0.md#added)

- NEW: Logical property utilities — v4.2.0 added `pbs-*`, `pbe-*`, `mbs-*`, `mbe-*`, `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*`, `border-bs-*`, `border-be-*`, `inline-*`, `min-inline-*`, `max-inline-*`, `block-*`, `min-block-*`, `max-block-*`, `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for CSS logical properties [source](./.skilld/releases/v4.2.0.md#added)

- DEPRECATED: `start-*` and `end-*` utilities — deprecated in v4.2.0, replaced by `inset-s-*` and `inset-e-*` utilities [source](./.skilld/releases/v4.2.0.md#deprecated)

- BREAKING: Spacing utility CSS generation — v4.3.1 changed spacing utilities to generate `0` instead of `calc(var(--spacing) * 0)` for zero values (e.g. `m-0`), and `var(--spacing)` instead of `calc(var(--spacing) * 1)` for single-unit values (e.g. `m-1`), affecting CSS output [source](./.skilld/releases/v4.3.1.md#changed)

- NEW: `--silent` CLI option — `@tailwindcss/cli` gained `--silent` flag in v4.3.1 to suppress output [source](./.skilld/releases/v4.3.1.md#added)

- NEW: Color palettes — mauve, olive, mist, and taupe color palettes added to default theme in v4.2.0 [source](./.skilld/releases/v4.2.0.md#added)

**Also changed:** `font-features-*` utility v4.2.0 · `PluginWithConfig` type export v4.3.0 · `@apply` with CSS mixins v4.3.1 · `@variant` in `addBase` v4.3.1 · `@source` symlink handling v4.3.1 · `@source` re-inclusion rules v4.3.1
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use type hints with arbitrary values when the prefix maps to multiple CSS properties — disambiguate `text-`, `font-`, and similar ambiguous prefixes by adding a data type like `text-(length:--my-var)` for font-size or `text-(color:--my-var)` for color [source](./.skilld/docs/adding-custom-styles.mdx#resolving-ambiguities)

- Always use complete, statically detectable class names instead of dynamically building them — avoid string interpolation or template literals to construct class names, and instead map props to predefined static strings so Tailwind's content scanner finds all required classes [source](./.skilld/docs/detecting-classes-in-source-files.mdx#dynamic-class-names)

- Use arbitrary values when design specifications require breaking out of the theme scale — `w-[123px]` is sometimes more practical than fitting values to the scale, particularly when matching exact pixel specifications or when introducing a custom theme token would add unnecessary complexity [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20142.md)

- Support theme, bare integer, and arbitrary values together in functional `@utility` definitions — use multiple `--value()` declarations in a single property to accept all three input types, optionally with different transformations for each [source](./.skilld/docs/adding-custom-styles.mdx#supporting-theme-bare-and-arbitrary-values-together)

- Use `@reference` instead of `@import` in component scoped styles to access theme variables and custom utilities without duplicating CSS in the output [source](./.skilld/docs/functions-and-directives.mdx#reference-directive)

- Explicitly scan external UI libraries with `@source` since `node_modules` is skipped by default — this ensures classes from third-party Tailwind-based libraries are discovered and CSS is generated [source](./.skilld/docs/detecting-classes-in-source-files.mdx#explicitly-registering-sources)

- Define component classes in `@layer components` rather than via plugins to ensure utilities can still override them — when `addComponents` adds to utilities layer instead of components, use `@layer components` in your main CSS file [source](./.skilld/repos/tailwindlabs/tailwindcss/issues/issue-15045.md)

- Stack and combine variants using `@variant` with stacked syntax (`hover:focus`) and comma-separated compound variants — Tailwind v4.3.0+ supports these patterns for more expressive custom styling [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md)

- Use `--default()` inside `--value()` for functional utilities that work with or without explicit values — enables utilities like `tab` (using default) and `tab-2` (using explicit value) from a single definition [source](./.skilld/docs/adding-custom-styles.mdx#default-values)

- Override the `dark` variant with `@custom-variant` to switch from `prefers-color-scheme` to class or data-attribute-based dark mode — supports both class-based (`dark` class) and data-attribute (`data-theme="dark"`) implementations [source](./.skilld/docs/dark-mode.mdx#toggling-dark-mode-manually)

- Use `--spacing(--value(…))` in custom utilities to accept spacing scale values by default while supporting arbitrary length and percentage values — this pattern enables utilities to work with both theme tokens and arbitrary values in a single declaration [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20218.md)

- Register the same `@utility` name multiple times with different value types to support theme values, bare integers, and arbitrary values independently — v4.3.0+ allows this without conflicts, letting you handle each input type separately if needed [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md)
<!-- /skilld:best-practices -->

---
name: tailwindcss-skilld
description: "ALWAYS use when writing code importing \"tailwindcss\". Consult for debugging, best practices, or modifying tailwindcss."
metadata:
  version: 4.3.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# tailwindlabs/tailwindcss `tailwindcss@4.3.3`
**Tags:** next: 4.0.0, v3-lts: 3.4.19, insiders: 0.0.0-insiders.094bf62

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for Tailwind CSS v4.x — prioritizing recent major/minor releases where APIs were introduced, deprecated, or changed.

### Deprecated APIs

- DEPRECATED: `start-*` and `end-*` utilities — replaced by `inset-s-*` (inline-start) and `inset-e-*` (inline-end) utilities for logical properties support. The `start-*`/`end-*` names still function but should not be used in new code [source](./.skilld/releases/v4.2.0.md:L42)

- DEPRECATED: `order-none` — replaced by `order-0`. The upgrade tool automatically migrates this when converting v3 projects to v4 [source](./.skilld/releases/v4.1.8.md:L18)

- DEPRECATED: `break-words` — replaced by `wrap-break-word` to align with CSS property names. The upgrade tool automatically converts this in migrations [source](./.skilld/releases/v4.1.15.md:L19)

### New Utilities (v4.3.0)

- NEW: `@container-size` — query utility for CSS container queries with size information [source](./.skilld/releases/v4.3.0.md:L11)

- NEW: `scrollbar-*` utility family — `scrollbar-{auto,thin,none}` for `scrollbar-width`, plus `scrollbar-thumb-*` and `scrollbar-track-*` color utilities for `scrollbar-color`, and `scrollbar-gutter-*` utilities for `scrollbar-gutter` [source](./.skilld/releases/v4.3.0.md:L12:L13)

- NEW: `zoom-*` utilities — for CSS `zoom` property [source](./.skilld/releases/v4.3.0.md:L14)

- NEW: `tab-*` utilities — for CSS `tab-size` property [source](./.skilld/releases/v4.3.0.md:L15)

### New Utilities (v4.2.0)

- NEW: Logical spacing utilities — `pbs-*` (padding-block-start), `pbe-*` (padding-block-end), `mbs-*` (margin-block-start), `mbe-*` (margin-block-end) for block-axis spacing; `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` for scroll-padding and scroll-margin on block axis [source](./.skilld/releases/v4.2.0.md:L13:L16)

- NEW: Logical sizing utilities — `inline-*`, `min-inline-*`, `max-inline-*` for inline-size properties; `block-*`, `min-block-*`, `max-block-*` for block-size properties [source](./.skilld/releases/v4.2.0.md:L18:L19)

- NEW: Logical inset utilities — `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for logical positioning (inline-start, inline-end, block-start, block-end) [source](./.skilld/releases/v4.2.0.md:L20)

- NEW: Logical border utilities — `border-bs-*` (border-block-start) and `border-be-*` (border-block-end) for block-axis borders [source](./.skilld/releases/v4.2.0.md:L17)

- NEW: `font-features-*` utility — for `font-feature-settings` CSS property [source](./.skilld/releases/v4.2.0.md:L21)

### New Framework Integrations & Exports

- NEW: `@tailwindcss/webpack` package — run Tailwind CSS as a webpack plugin alongside the existing `@tailwindcss/cli`, `@tailwindcss/postcss`, and `@tailwindcss/vite` integrations [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: `PluginWithConfig` type export — export from `tailwindcss/plugin` for inferring plugin config types in TypeScript [source](./.skilld/releases/v4.3.0.md:L32)

### New Plugin & Variant Syntax

- NEW: `@variant` with stacked variants — use `@variant hover:focus { … }` to create variants that combine multiple selectors; enables `hover:focus:*` utilities [source](./.skilld/releases/v4.3.0.md:L16)

- NEW: `@variant` with compound variants — use `@variant hover, focus { … }` to define variants that match multiple conditions; enables `hover:*` and `focus:*` utilities from a single definition [source](./.skilld/releases/v4.3.0.md:L17)

- NEW: `--default(…)` in functional `@utility` definitions — support `--default(…)` inside `--value(…)` and `--modifier(…)` for providing default fallback values in custom utility functions [source](./.skilld/releases/v4.3.0.md:L18)

**Also changed:** Support Vite 8 in `@tailwindcss/vite` (v4.2.2) · Allow multiple `@utility` definitions with the same name but different value types (v4.3.0) · Export missing `PluginWithConfig` type from `tailwindcss/plugin` (v4.3.0) · Add `.env` and `.env.*` to default ignored content files (v4.2.3) · Add `.jj` to default ignored content directories (v4.2.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `@utility` directive for custom utilities that must work with `@apply` — utilities nested in `@layer utilities` are not registered with Tailwind's oxide compiler and cannot be applied with `@apply` [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20211.md:L41:45)

- Avoid CSS preprocessors (Less, SCSS) in favour of native CSS — v4 is built on a native CSS compiler in Rust and preprocessors interfere with Tailwind directives like `@apply` by attempting to parse them as their own syntax [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20210.md:L44:50)

- Use type hints with arbitrary values when using ambiguous prefixes like `text-*` or `font-*` — the compiler cannot infer which CSS property you intend without disambiguation like `text-[length:inherit]` for font-size or `text-[color:--my-var]` for color [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20141.md:L49:54)

- Preserve original units in arbitrary values rather than normalizing to pixels — write `-mt-[20in]` for inches and expect them preserved, not converted to pixels [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L28)

- Use arbitrary values when design specifications require breaking out of the theme scale — `w-[123px]` is a valid and practical choice when the value falls outside the spacing scale or design spec demands exactness [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20142.md:L21:33)

- Typography defaults to margin collapsing rather than padding — adjacent margins collapse to a single gap, preventing doubled spacing; override by halving values when switching to padding in `tailwindcss-typography` config [source](./.skilld/repos/tailwindlabs/tailwindcss/discussions/discussion-20009.md:L31:46)

- Prefer logical property utilities (`pbs-*`, `pbe-*`, `mbs-*`, `mbe-*`, `inset-s-*`, `inset-e-*`) over absolute directions for better internationalization support — v4.2.0 added these block-start/block-end and inline-start/inline-end variants [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L13:20)

- `@apply` now works with CSS mixins in v4.3.1+ — you can compose utility classes into mixins and apply them without the limitations of earlier v4 versions [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.1.md:L19)

- Functional `@utility` definitions require the `--value(…)` placeholder function — omitting it causes a build error; use `@utility name-* { property: --value(type); }` [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L34)

- Use `--silent` in CLI for automated builds and CI/CD to suppress standard output — helpful for keeping build logs clean in continuous integration environments [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.1.md:L11)

- Stacked and compound `@variant` definitions enable variant composition — v4.3.0 added support for `@variant hover:focus { … }` (stacked) and `@variant hover, focus { … }` (compound) [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L16:17)

- Plugin components with fewer properties override those with more properties in v4 due to specificity-based sorting — if you need component overrides, ensure the base component has more properties than the override class or use direct CSS in the components layer [source](./.skilld/repos/tailwindlabs/tailwindcss/issues/issue-15045.md:L51:57)

- Always use complete, statically detectable class names instead of dynamically building them — avoid string interpolation or template literals to construct class names so Tailwind's content scanner finds all required classes [source](./.skilld/docs/detecting-classes-in-source-files.mdx)
<!-- /skilld:best-practices -->

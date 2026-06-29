---
name: tailwindcss-skilld
description: 'ALWAYS use when writing code importing "tailwindcss". Consult for debugging, best practices, or modifying tailwindcss.'
metadata:
  version: 4.3.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# tailwindlabs/tailwindcss `tailwindcss@4.3.2`

**Tags:** next: 4.0.0, v3-lts: 3.4.19, latest: 4.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases. Tailwind CSS v4.3.2 inherits all changes from v4.1.0 through v4.3.1.

- NEW: `@container-size` utility for container size queries [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-{auto,thin,none}` utilities for `scrollbar-width` CSS property, plus `scrollbar-thumb-*` and `scrollbar-track-*` color utilities for `scrollbar-color` [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `scrollbar-gutter-*` utilities for `scrollbar-gutter` CSS property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `zoom-*` utilities for CSS `zoom` property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `tab-*` utilities for CSS `tab-size` property [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `@variant` with stacked variants — allows syntax like `@variant hover:focus { … }` to define compound variant combinations [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `@variant` with compound variants — allows syntax like `@variant hover, focus { … }` to define multiple variants in one declaration [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `--default(…)` support in `--value(…)` and `--modifier(…)` for functional `@utility` definitions to provide default values [source](./.skilld/releases/v4.3.0.md#added)

- NEW: `pbs-*` and `pbe-*` utilities for `padding-block-start` and `padding-block-end` CSS logical properties [source](./.skilld/releases/v4.2.0.md#added)

- NEW: `mbs-*` and `mbe-*` utilities for `margin-block-start` and `margin-block-end` CSS logical properties [source](./.skilld/releases/v4.2.0.md#added)

- NEW: `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` utilities for logical inset positioning — replaces `start-*` and `end-*` [source](./.skilld/releases/v4.2.0.md#added)

- DEPRECATED: `start-*` and `end-*` utilities since v4.2.0 — use `inset-s-*` and `inset-e-*` instead [source](./.skilld/releases/v4.2.0.md#deprecated)

- NEW: `text-shadow-*` utilities for text shadow effects [source](./.skilld/releases/v4.1.0.md#added)

- NEW: `mask-*` utilities for CSS mask properties [source](./.skilld/releases/v4.1.0.md#added)

- NEW: `shadow-*/<alpha>`, `inset-shadow-*/<alpha>`, `drop-shadow-*/<alpha>`, `text-shadow-*/<alpha>` utilities to control shadow opacity [source](./.skilld/releases/v4.1.0.md#added)

- CHANGED: Spacing utilities in v4.3.1 generate simplified CSS — `m-0` and `left-0` now generate `0` instead of `calc(var(--spacing) * 0)`, and `m-1` generates `var(--spacing)` instead of `calc(var(--spacing) * 1)` [source](./.skilld/releases/v4.3.1.md#changed)

**Also changed:** `@tailwindcss/webpack` package new in v4.2.0 · `inline-*`, `min-inline-*`, `max-inline-*` utilities for inline-size new in v4.2.0 · `block-*`, `min-block-*`, `max-block-*` utilities for block-size new in v4.2.0 · `font-features-*` utility for font-feature-settings new in v4.2.0 · `drop-shadow-<color>` utilities new in v4.1.0 · `details-content` variant new in v4.1.0 · `user-valid` and `user-invalid` variants new in v4.1.0 · `wrap-anywhere`, `wrap-break-word`, `wrap-normal` utilities new in v4.1.0 · `@source inline(…)` and `@source not` directives new in v4.1.0 · `items-baseline-last` and `self-baseline-last` utilities new in v4.1.0 · `pointer-none`, `pointer-coarse`, `pointer-fine` variants new in v4.1.0 · deprecated `bg-{left,right}-{top,bottom}` in favor of `bg-{top,bottom}-{left,right}` since v4.1.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `@utility` directive for custom utilities that must work with `@apply` — v4 processes CSS in a single pass and only recognizes utilities defined with `@utility`, not those nested inside `@layer utilities` [source](./.skilld/discussions/discussion-20211.md:L41:45)

- Use type hints with arbitrary values when using ambiguous prefixes like `text-*` or `font-*` — the compiler cannot infer which CSS property you intend without disambiguation like `text-[length:inherit]` [source](./.skilld/discussions/discussion-20141.md:L49:54)

- Avoid CSS preprocessors (Less, SCSS) in favour of native CSS — v4 is built on a native CSS compiler in Rust and preprocessors interfere with Tailwind directives like `@apply` by attempting to parse them as their own syntax [source](./.skilld/discussions/discussion-20210.md:L44:50)

- Use the `--spacing()` function to reference the spacing scale inside custom `@utility` definitions — bare integers require `--spacing(--value(integer))` rather than attempting theme token lookup [source](./.skilld/discussions/discussion-20218.md:L43:49)

- Tailwind preserves original units in arbitrary values rather than normalizing to pixels — write `-mt-[20in]` for inches and expect them preserved, not converted to pixels [source](./.skilld/releases/v4.3.0.md:L28)

- Use arbitrary values when design values don't map cleanly to Tailwind's scale — `w-[123px]` is a valid and practical choice when the value falls outside the spacing scale or design spec demands exactness [source](./.skilld/discussions/discussion-20142.md:L21:33)

- Typography defaults to margin collapsing rather than padding — adjacent margins collapse to a single gap, preventing doubled spacing; override by halving values when switching to padding in `tailwindcss-typography` config [source](./.skilld/discussions/discussion-20009.md:L31:46)

- Prefer logical property utilities (`pbs-*`, `pbe-*`, `mbs-*`, `mbe-*`, `inset-s-*`, `inset-e-*`) over absolute directions for better internationalization support — v4.2.0 added these block-start/block-end and inline-start/inline-end variants [source](./.skilld/releases/v4.2.0.md:L13:20)

- `@apply` now works with CSS mixins in v4.3.1+ — you can compose utility classes into mixins and apply them without the limitations of earlier v4 versions [source](./.skilld/releases/v4.3.1.md:L19)

- Functional `@utility` definitions require the `--value(…)` placeholder function — omitting it causes a build error; use `@utility name-* { property: --value(type); }` [source](./.skilld/releases/v4.3.0.md:L34)

- Use `--silent` in CLI for automated builds and CI/CD to suppress standard output — helpful for keeping build logs clean in continuous integration environments [source](./.skilld/releases/v4.3.1.md:L11)

- Stacked and compound `@variant` definitions enable variant composition — v4.3.0 added support for `@variant hover:focus { … }` (stacked) and `@variant hover, focus { … }` (compound) [source](./.skilld/releases/v4.3.0.md:L16:17)

- Plugin components with fewer properties override those with more properties in v4 due to specificity-based sorting — if you need component overrides, ensure the base component has more properties than the override class or use direct CSS in the components layer [source](./.skilld/issues/issue-15045.md:L51:57)

<!-- /skilld:best-practices -->

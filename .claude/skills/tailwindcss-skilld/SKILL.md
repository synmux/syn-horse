---
name: tailwindcss-skilld
description: 'ALWAYS use when writing code importing "tailwindcss". Consult for debugging, best practices, or modifying tailwindcss.'
metadata:
  version: 4.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# tailwindlabs/tailwindcss `tailwindcss@4.3.0`

**Tags:** next: 4.0.0, v3-lts: 3.4.19, latest: 4.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `@tailwindcss/webpack` package — adds webpack plugin support in v4.2.0 [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: Logical property utilities for writing-modes — v4.2.0 adds `pbs-*`, `pbe-*` for padding-block, `mbs-*`, `mbe-*` for margin-block [source](./.skilld/releases/v4.2.0.md:L13:16)

- NEW: Scroll padding/margin block utilities — `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` for logical scroll spacing in v4.2.0 [source](./.skilld/releases/v4.2.0.md:L15:16)

- NEW: Border block utilities — `border-bs-*`, `border-be-*` for logical border properties in v4.2.0 [source](./.skilld/releases/v4.2.0.md:L17)

- NEW: Inline/block size utilities — v4.2.0 adds `inline-*`, `min-inline-*`, `max-inline-*` and `block-*`, `min-block-*`, `max-block-*` for logical sizing [source](./.skilld/releases/v4.2.0.md:L18:19)

- NEW: Inset utilities — v4.2.0 adds `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for logical positioning [source](./.skilld/releases/v4.2.0.md:L20)

- NEW: `font-features-*` utility — v4.2.0 adds font-feature-settings support [source](./.skilld/releases/v4.2.0.md:L21)

- DEPRECATED: `start-*` and `end-*` utilities — deprecated in v4.2.0 in favor of `inset-s-*` and `inset-e-*` [source](./.skilld/releases/v4.2.0.md:L42)

- NEW: Theme color palettes — v4.2.0 adds `mauve`, `olive`, `mist`, `taupe` to default theme for improved colour consistency [source](./.skilld/releases/v4.2.0.md:L11)

- BREAKING: `aria`, `data`, `supports` theme keys replaced with `@custom-variant` — v4.1.13+ migrates these to custom variants instead of theme keys for better performance [source](./.skilld/releases/v4.1.13.md:L25:27)

- BREAKING: `sr-only` utility updated — v4.1.13 replaces deprecated `clip` property with `clip-path` [source](./.skilld/releases/v4.1.13.md:L20)

- NEW: Line-height sizing utilities — v4.1.5 adds `h-lh`, `min-h-lh`, `max-h-lh` utilities for line height-based sizing [source](./.skilld/releases/v4.1.5.md:L12)

- NEW: `@tailwindcss/upgrade` package — v4.1.5 adds tool for automated upgrades between v4 versions [source](./.skilld/releases/v4.1.5.md:L11)

- NEW: Automatic `transition` property generation — v4.1.5 expands `transition` to include `display`, `visibility`, `content-visibility`, `overlay`, `pointer-events` automatically [source](./.skilld/releases/v4.1.5.md:L13)

- NEW: `@container-size` utility (experimental) — unreleased, adds container size query support [source](./CHANGELOG.md:L12)

**Also changed:** `h-[1lh]` → `h-lh` canonicalisation in v4.1.6 · Theme key resolution fixed in v4.1.15 for keys starting with other key names · Custom variants now restricted from starting/ending with `-` or `_` in v4.1.13

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Tailwind CSS v4.3.0 Best Practices

## Best Practices

- Use `@theme` to define design tokens instead of `:root` — theme variables drive utility class generation, while `:root` CSS variables don't trigger class creation [source](./.skilld/docs/theme.mdx#L54:L60)

- Reference CSS variables in custom CSS instead of the `theme()` function — simpler, more performant, and leverages modern CSS features [source](./.skilld/docs/upgrade-guide.mdx#L805:L827)

- Use `@reference` to import shared theme context in Vue, Svelte, Astro `<style>` blocks, and CSS modules — enables `@apply` and prevents theme variable duplication without bloating CSS [source](./.skilld/docs/upgrade-guide.mdx#L863:L901)

- Always use complete class names instead of dynamically constructing them — Tailwind scans source files as plain text, so constructed strings like `text-${color}-500` are never detected at build time [source](./.skilld/docs/detecting-classes-in-source-files.mdx#L69:L99)

- Use `@utility` directive instead of `@layer utilities` for custom utilities — works correctly with variants and respects the cascade hierarchy in v4 [source](./.skilld/docs/upgrade-guide.mdx#L646:L686)

- Apply the `inline` option when theme variables reference other theme variables — ensures utilities resolve to the correct value instead of becoming nested variable lookups that fail [source](./.skilld/docs/theme.mdx#L480:L516)

- Use the `static` theme option to always emit all CSS variables — necessary if you need to access theme values via `getComputedStyle()` at runtime [source](./.skilld/docs/theme.mdx#L520:L531)

- Use `getComputedStyle()` to retrieve resolved CSS variable values in JavaScript — recommended approach to access theme values at runtime without bundle bloat [source](./.skilld/docs/theme.mdx#L659:L665)

- Prefer `flex` or `grid` layouts with `gap` utility instead of `space-x-*` and `space-y-*` utilities for large pages — the selector change in v4 fixes performance issues with `:not([hidden])` [source](./.skilld/docs/upgrade-guide.mdx#L402:L413)

- Use custom property shorthand syntax `fill-(--my-var)` in arbitrary values instead of `fill-[var(--my-var)]` — Tailwind automatically adds the `var()` wrapper for cleaner markup [source](./.skilld/docs/adding-custom-styles.mdx#L73:L83)

- Use `@import` to bundle external CSS files — Tailwind handles file inlining and vendor prefixing automatically, eliminating the need for `postcss-import` or preprocessor imports [source](./.skilld/docs/compatibility.mdx#L26:L36)

- Use `color-mix()` for runtime color adjustments instead of preprocessor functions — modern CSS alternative that works with CSS variables and `currentcolor` keyword [source](./.skilld/docs/compatibility.mdx#L104:L106)

- Use `@custom-variant` with attribute selectors for theme-aware styling — cleaner and more maintainable than writing custom CSS classes for `data-theme` or similar patterns [source](./.skilld/docs/adding-custom-styles.mdx#L674:L709)
<!-- /skilld:best-practices -->

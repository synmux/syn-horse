---
name: tailwindcss-cli-skilld
description: 'ALWAYS use when writing code importing "@tailwindcss/cli". Consult for debugging, best practices, or modifying @tailwindcss/cli, tailwindcss/cli, tailwindcss cli, tailwindcss.'
metadata:
  version: 4.2.4
  generated_at: 2026-05-06
---

# tailwindlabs/tailwindcss `@tailwindcss/cli@4.2.4`

**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.2.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/cli` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/cli` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes for @tailwindcss/cli

## New APIs & Features (Score: 3)

1. **Logical block property utilities** — `pbs-*`, `pbe-*`, `mbs-*`, `mbe-*` for padding/margin-block-start/end; `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` for scroll variants (v4.2.0, #19601)

2. **Border logical block utilities** — `border-bs-*` and `border-be-*` for border-block-start/end (v4.2.0, #19601)

3. **Logical inline sizing utilities** — `inline-*`, `min-inline-*`, `max-inline-*` utilities for inline-size, min-inline-size, max-inline-size properties (v4.2.0, #19612)

4. **Logical block sizing utilities** — `block-*`, `min-block-*`, `max-block-*` utilities for block-size, min-block-size, max-block-size properties (v4.2.0, #19612)

5. **Logical inset utilities** — `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for inset-inline-start/end and inset-block-start/end positioning (v4.2.0, #19613)

6. **Font features utility** — `font-features-*` utility for font-feature-settings CSS property (v4.2.0, #19623)

7. **New color palettes** — `mauve`, `olive`, `mist`, and `taupe` added to default theme (v4.2.0, #19627)

8. **@tailwindcss/webpack plugin** — New webpack plugin package for running Tailwind CSS as webpack plugin (v4.2.0, #19610)

9. **Vite 8 support** — Support for Vite 8 in @tailwindcss/vite plugin (v4.2.2, #19790)

## Deprecated APIs (Score: 2)

10. **start-_ and end-_ utilities deprecated** — Use `inset-s-*` and `inset-e-*` instead for logical inline positioning (v4.2.0, #19613)

11. **Trailing dash support in functional utilities** — Now allowed for backwards compatibility; utilities like `func-name-` no longer error (v4.2.1, #19696)

12. **MDX class detection with dots** — Properly detect classes containing `.` characters within curly braces in MDX files (v4.2.1, #19711)

## Bug Fixes & Improvements (Score: 1-2)

13. **Canonicalization improvements** — Fixed double `@supports` wrapping for `color-mix` values; improved canonicalization for `calc(var(...))` expressions (v4.2.0, #19450; v4.2.2, #19769)

14. **Whitespace handling in @source** — Allow whitespace around `@source inline()` arguments (v4.2.0, #19461)

15. **Performance optimization** — Reduced file system walks in Oxide scanner for better performance in larger projects (v4.2.0, #19632)

Also changed: Fixed capital letter detection in utilities (#19465), Rails strict locals support (#19525), @utility name validation alignment (#19524), @variant in @custom-variant infinite loop (#19633), aspect ratio fractions (#19688), external file change detection in Vite (#19670), Astro v5 import aliases (#19677), escape characters in @utility names (#19626), canonicalization multi-pass results (#19675), jj directory ignoring (#19687), prototype property crash prevention (#19725), empty canonicalization list fix (#19812), server-only module reload (#19745).

<!-- /skilld:api-changes -->

Related: tailwindcss-skilld

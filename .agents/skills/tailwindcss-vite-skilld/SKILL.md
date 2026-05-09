---
name: tailwindcss-vite-skilld
description: 'ALWAYS use when writing code importing "@tailwindcss/vite". Consult for debugging, best practices, or modifying @tailwindcss/vite, tailwindcss/vite, tailwindcss vite, tailwindcss.'
metadata:
  version: 4.2.4
  generated_at: 2026-05-06
---

# tailwindlabs/tailwindcss `@tailwindcss/vite@4.2.4`

**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.2.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/vite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/vite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes in @tailwindcss/vite v4.2.4

## New APIs

1. **Logical sizing utilities** — `inline-*`, `min-inline-*`, `max-inline-*`, `block-*`, `min-block-*`, `max-block-*` provide CSS logical properties for `inline-size` and `block-size`, essential for bidirectional text and layout flexibility (v4.2.0 #19612). Score: 4/4.

2. **Logical inset positioning** — `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` utilities for `inset-inline-start`, `inset-inline-end`, `inset-block-start`, and `inset-block-end` (v4.2.0 #19613). Score: 4/4.

3. **Block-direction spacing utilities** — `mbs-*`, `mbe-*` for `margin-block-start/end` and `pbs-*`, `pbe-*` for `padding-block-start/end` (v4.2.0 #19601). Score: 4/4.

4. **Block scroll utilities** — `scroll-mbs-*`, `scroll-mbe-*`, `scroll-pbs-*`, `scroll-pbe-*` utilities for scroll-margin/padding in block direction (v4.2.0 #19601). Score: 3/4.

5. **Border block utilities** — `border-bs-*`, `border-be-*` for `border-block-start/end` (v4.2.0 #19601). Score: 3/4.

6. **Font features utility** — `font-features-*` for `font-feature-settings` CSS property (v4.2.0 #19623). Score: 3/4.

7. **Extended colour palettes** — mauve, olive, mist, and taupe colour palettes now available in default theme (v4.2.0 #19627). Score: 3/4.

8. **Webpack plugin** — `@tailwindcss/webpack` package provides Tailwind CSS as webpack plugin for alternative build systems (v4.2.0 #19610). Score: 4/4.

9. **Vite 8 compatibility** — `@tailwindcss/vite` now supports Vite 8 with improved integration and compatibility (v4.2.2 #19790). Score: 3/4.

## Deprecated APIs

10. **Legacy positioning utilities** — `start-*` and `end-*` utilities deprecated in favour of `inset-s-*` and `inset-e-*` logical properties (v4.2.0 #19613). Migrate before v5. Score: 4/4.

## Breaking Changes

11. **Strict validation of @utility names** — `@utility` name validation now aligns with Oxide scanner rules, rejecting previously accepted patterns (v4.2.0 #19524). Score: 3/4.

12. **MDX class extraction** — Classes containing `.` characters within curly braces in MDX files now properly detected; previously ignored patterns may now be included (v4.2.1 #19711). Score: 3/4.

13. **Canonicalization strictness** — `calc(var(--spacing)*…)` expressions now canonicalized into `--spacing(…)` form; multiple canonicalization passes produce different results (v4.2.2 #19769, #19675). Score: 3/4.

14. **Bare value spacing suggestions** — Canonicalization improved for bare values exceeding default spacing scale; utilities like `w-1234 h-1234` now canonicalize to `size-1234` (v4.2.2 #19809). Score: 3/4.

15. **Full reload triggers** — Changes to external files listed via `@source` now trigger full page reload when using `@tailwindcss/vite`; previous behaviour was cache-only (v4.2.0 #19670). Score: 3/4.

Also changed: trailing dashes now permitted in functional utility names for backwards compatibility (v4.2.1 #19696); prototype pollution crash prevention when candidates contain prototype properties (v4.2.2 #19725); empty list canonicalization fixed (v4.2.2 #19812); Oxide scanner performance optimized via reduced file system walks (v4.2.0 #19632); Astro v5 import aliases supported without crashes (v4.2.0 #19677); escape characters in @utility names supported for formatter compatibility (v4.2.0 #19626); `.jj` added to default ignored content directories (v4.2.0 #19687).

<!-- /skilld:api-changes -->

Related: tailwindcss-skilld

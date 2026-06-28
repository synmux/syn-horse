---
name: tailwindcss-cli-skilld
description: 'ALWAYS use when writing code importing "@tailwindcss/cli". Consult for debugging, best practices, or modifying @tailwindcss/cli, tailwindcss/cli, tailwindcss cli, tailwindcss.'
metadata:
  version: 4.3.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# tailwindlabs/tailwindcss `@tailwindcss/cli@4.3.1`

**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/cli` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/cli` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `--silent` option — suppress output in `@tailwindcss/cli` to enable quiet mode for build pipelines [source](./.skilld/releases/v4.3.1.md:L11)

- NEW: `@container-size` utility — measure and apply styles based on container size queries [source](./.skilld/releases/v4.3.0.md:L11)

- NEW: Scrollbar utilities — `scrollbar-auto`, `scrollbar-thin`, `scrollbar-none` for `scrollbar-width`, plus `scrollbar-thumb-*` and `scrollbar-track-*` color variants [source](./.skilld/releases/v4.3.0.md:L12)

- NEW: `scrollbar-gutter-*` utilities — reserve space for scrollbars to prevent layout shift [source](./.skilld/releases/v4.3.0.md:L13)

- NEW: `zoom-*` utilities — control CSS zoom property for magnification effects [source](./.skilld/releases/v4.3.0.md:L14)

- NEW: `tab-*` utilities — control tab display and size behaviour [source](./.skilld/releases/v4.3.0.md:L15)

- BREAKING: `start-*` and `end-*` utilities deprecated in favour of `inset-s-*` and `inset-e-*` — update code using `start-4` / `end-4` to `inset-s-4` / `inset-e-4` [source](./.skilld/releases/v4.2.0.md:L42)

- NEW: Logical spacing utilities — `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for logical property positioning [source](./.skilld/releases/v4.2.0.md:L20)

- NEW: `@variant` enhanced — now supports stacked variants (e.g. `@variant hover:focus { … }`) and compound variants (e.g. `@variant hover, focus { … }`) [source](./.skilld/releases/v4.3.0.md:L16-17)

- NEW: `--default(…)` in functional `@utility` — set default values in `--value(…)` and `--modifier(…)` for functional utility definitions [source](./.skilld/releases/v4.3.0.md:L18)

- NEW: `PluginWithConfig` type exported — allows proper TypeScript inference of plugin config types in `tailwindcss/plugin` [source](./.skilld/releases/v4.3.0.md:L32)

- NEW: `@tailwindcss/webpack` package — run Tailwind CSS as a webpack plugin for integrated build workflows [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: Block logical utilities — `block-*`, `min-block-*`, `max-block-*`, `inline-*`, `min-inline-*`, `max-inline-*` for CSS logical properties [source](./.skilld/releases/v4.2.0.md:L18-19)

- NEW: Logical margin and padding utilities — `mbs-*`, `mbe-*`, `pbs-*`, `pbe-*` for block-axis margins and padding [source](./.skilld/releases/v4.2.0.md:L13-16)

- NEW: `font-features-*` utility — control `font-feature-settings` for typography fine-tuning [source](./.skilld/releases/v4.2.0.md:L21)

**Also changed:** `scroll-mbs-*`, `scroll-pbs-*` logical scroll utilities v4.2.0 · `border-bs-*`, `border-be-*` logical border utilities v4.2.0 · `clip` → `clip-path` deprecated v4.1.13 · `break-words` → `wrap-break-word` v4.1.15 · `order-none` → `order-0` deprecated v4.1.8 · arbitrary `:has()` variants migration v4.3.0 · source maps generation support v4.1.x

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `@utility` directive instead of `@layer utilities` for custom classes requiring `@apply` — Tailwind v4 only applies `@apply` to utilities registered via `@utility`, not those in standard layer blocks [source](./.skilld/discussions/discussion-20211.md)

- Define git boundaries via `git init` to prevent Tailwind from scanning parent directories — Tailwind respects `.gitignore` rules for source discovery; missing `.git` causes it to traverse upward and ignore potentially unintended files [source](./.skilld/discussions/discussion-20135.md)

- Scope file scanning with `@source` directives to improve performance in large projects — Explicit `@source` globs prevent file system walks into unneeded directories like node_modules or large data folders [source](./.skilld/issues/issue-15750.md)

- Use theme tokens like `--spacing()` and `--value()` in functional `@utility` definitions — Proper scaling semantics across arbitrary integers and named scales requires function-based value resolution [source](./.skilld/discussions/discussion-20218.md)

- Add type hints to disambiguate arbitrary values with multiple matching properties — Use syntax like `text-[length:inherit]` when a value could map to multiple properties (e.g., `font-size` vs `font-family`) [source](./.skilld/discussions/discussion-20141.md)

- Prefer canonical classes from the built-in scale over arbitrary values where applicable — Arbitrary values like `w-[16px]` should only be used when no canonical equivalent exists or the value genuinely falls outside the design scale [source](./.skilld/discussions/discussion-20142.md)

- Leverage stacked and compound variants for richer custom variant definitions — Tailwind v4.3.0+ allows `@variant hover:focus` (stacked) and `@variant hover, focus` (compound) syntax for complex selector combinations [source](./.skilld/releases/v4.3.0.md#added)

- Use `@plugin` directive in CSS-first workflows instead of JavaScript requires — When using `@tailwindcss/vite`, `@plugin` resolves package entries correctly and avoids import path resolution issues [source](./.skilld/releases/v4.3.0.md#fixed)

- Understand margin collapsing rationale in typography plugin configuration — The typography plugin uses vertical margins for prose spacing to collapse adjacent margins; switch to padding only if you disable collapsing and halve values accordingly [source](./.skilld/discussions/discussion-20009.md)

- Use multiple `@utility` definitions with the same name for different value types — Define one `@utility button-*` accepting spacing scales and a separate `@utility button-*` for color values to support mixed semantics [source](./.skilld/releases/v4.3.0.md#fixed)

- Use `--default()` in functional `@utility` fallbacks for optional modifiers — Functional utilities can now use `--default(…)` within `--value()` and `--modifier()` to provide fallback values when a modifier is omitted [source](./.skilld/releases/v4.3.0.md#added)

- Preserve arbitrary value units and whitespace in canonical suggestions — Tailwind's canonicalization respects original units (e.g., `in`, `mm`) and significant whitespace in expressions; it will not normalize `20in` to pixels [source](./.skilld/releases/v4.3.0.md#fixed)

- Use `--silent` flag in CI pipelines to suppress Tailwind CLI output — The `--silent` option added in v4.3.1 silences standard output, keeping logs clean in automated environments [source](./.skilld/releases/v4.3.1.md#added)

<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

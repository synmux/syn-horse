---
name: tailwindcss-cli-skilld
description: "ALWAYS use when writing code importing \"@tailwindcss/cli\". Consult for debugging, best practices, or modifying @tailwindcss/cli, tailwindcss/cli, tailwindcss cli, tailwindcss."
metadata:
  version: 4.3.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# tailwindlabs/tailwindcss `@tailwindcss/cli@4.3.3`
**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, insiders: 0.0.0-insiders.094bf62

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/cli` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/cli` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @tailwindcss/cli v4.x. The latest published version is v4.3.1 (not v4.3.3). Focus on recent major/minor releases.

- CHANGED: Spacing utilities (`m-0`, `left-0`, etc.) generate `0` instead of `calc(var(--spacing) * 0)`, and `m-1`, `left-1` generate `var(--spacing)` instead of `calc(var(--spacing) * 1)`. This is a silent output change affecting generated CSS — layouts may appear different if you relied on the previous calculation [source](./.skilld/releases/v4.3.1.md:L45:46)

- NEW: `--silent` option for @tailwindcss/cli to suppress build output [source](./.skilld/releases/v4.3.1.md:L16)

- DEPRECATED: `start-*` and `end-*` utilities — use `inset-s-*` (inset-inline-start) and `inset-e-*` (inset-inline-end) instead [source](./.skilld/releases/v4.2.0.md:L42)

- NEW: `@tailwindcss/webpack` package — run Tailwind CSS as a webpack plugin alongside the existing CLI and PostCSS/Vite integrations [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: `@container-size` utility for CSS container queries; also new `@variant` support for stacked (e.g. `@variant hover:focus { … }`) and compound (e.g. `@variant hover, focus { … }`) variants [source](./.skilld/releases/v4.3.0.md:L11)

- NEW: `scrollbar-*` family — `scrollbar-{auto,thin,none}` for `scrollbar-width`, `scrollbar-thumb-*` and `scrollbar-track-*` color utilities for `scrollbar-color`, and `scrollbar-gutter-*` utilities [source](./.skilld/releases/v4.3.0.md:L12:14)

- NEW: Logical property utilities (v4.2.0) — `pbs-*` / `pbe-*` (padding-block), `mbs-*` / `mbe-*` (margin-block), `scroll-pbs-*` / `scroll-pbe-*`, `scroll-mbs-*` / `scroll-mbe-*`, `border-bs-*` / `border-be-*`, `inline-*` / `min-inline-*` / `max-inline-*`, `block-*` / `min-block-*` / `max-block-*`, and `inset-s-*` / `inset-e-*` / `inset-bs-*` / `inset-be-*` [source](./.skilld/releases/v4.2.0.md:L13:20)

**Also changed:** `zoom-*` utilities · `tab-*` utilities · `font-features-*` utility for `font-feature-settings` · Support `--default(…)` in functional `@utility` definitions · Export missing `PluginWithConfig` type from `tailwindcss/plugin`
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use the `--silent` flag to suppress non-error output when running the CLI in automated pipelines or CI/CD environments — reduces log noise without losing error information [source](./.skilld/releases/v4.3.1.md:L10)

- Use `--watch=always` to keep the CLI watching for changes even when stdin is closed — necessary for development servers and long-running processes that expect continuous rebuilds [source](./.skilld/releases/v4.1.11.md:L13)

- Always use `--map` to generate source maps in development environments — critical for debugging CSS output and tracing issues back to source files [source](./.skilld/releases/CHANGELOG.md:L19373)

- Specify the `--cwd` option explicitly when running the CLI from different directories or in containerised environments — ensures paths are resolved correctly relative to your project structure [source](./.skilld/docs/index.md:L1)

- Use narrow `@source` patterns (e.g. `@source "../*.php"` not `@source "../**/*"`) to improve watch mode performance — overly broad patterns cause the CLI to scan unnecessary directories, especially with large directory structures [source](./.skilld/issues/issue-15750.md:L50)

- When using Docker bind mounts that don't forward filesystem events, use `chokidar-cli` as a workaround since the `--poll` option was removed — run `npx chokidar` with `--initial --polling` flags to detect changes in containerised environments [source](./.skilld/issues/issue-18540.md:L102)

- Apply `--minify` (or `--optimize` without minification) at build time for production — reduces CSS bundle size significantly; most Tailwind projects ship under 10kB minified [source](./.skilld/releases/CHANGELOG.md)

- Generate output to a named file rather than piping to stdout in scripts — output to `/dev/stdout` is supported but can cause hangs in certain environments; explicit file output is more reliable [source](./.skilld/releases/v4.1.18.md:L25)

- Use the `canonicalize` subcommand to audit and suggest optimised class names — automatically converts verbose arbitrary utilities to Tailwind's built-in equivalents, respecting original units and operator spacing [source](./.skilld/releases/v4.3.0.md:L26)

- Type-hint arbitrary values when using utilities with ambiguous prefixes — when font-size and text-color utilities share the same prefix (e.g. `text-*`), use type hints to specify which CSS property is intended [source](./.skilld/discussions/discussion-20141.md:L53)

- When defining custom `@utility` rules that accept spacing values, use `--spacing(--value(integer))` instead of trying to directly reference `--value(--spacing-*)` — spacing tokens are resolved through the function, not as theme variables [source](./.skilld/discussions/discussion-20218.md:L48)

- Preserve arbitrary values during canonicalization rather than expanding to theme scale when the value doesn't map cleanly — use arbitrary values like `w-[123px]` when they exactly match a design specification or when introducing a custom theme token would add unnecessary complexity [source](./.skilld/discussions/discussion-20142.md:L31)

- Ensure tracked dependencies remain available in `--watch` mode — the CLI now recovers gracefully if a tracked file is deleted and restored, but total removal can interrupt watching; structure your source globs to be resilient to temporary file deletions [source](./.skilld/releases/v4.3.1.md:L24)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

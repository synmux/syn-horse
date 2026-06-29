---
name: tailwindcss-cli-skilld
description: "ALWAYS use when writing code importing \"@tailwindcss/cli\". Consult for debugging, best practices, or modifying @tailwindcss/cli, tailwindcss/cli, tailwindcss cli, tailwindcss."
metadata:
  version: 4.3.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# tailwindlabs/tailwindcss `@tailwindcss/cli@4.3.2`
**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/cli` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/cli` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @tailwindcss/cli v4.3.2 — prioritizing recent major/minor releases and significant deprecations.

- NEW: `@container-size` utility — new in v4.3.0, generates CSS for container query size features [source](./.skilld/releases/v4.3.0.md:L11)

- NEW: `scrollbar-{auto,thin,none}` utilities for `scrollbar-width`, plus `scrollbar-thumb-*` / `scrollbar-track-*` color utilities for `scrollbar-color` — added v4.3.0 [source](./.skilld/releases/v4.3.0.md:L12)

- NEW: `scrollbar-gutter-*` utilities — added v4.3.0, controls scrollbar gutter reservation [source](./.skilld/releases/v4.3.0.md:L13)

- NEW: `zoom-*` utilities — added v4.3.0, generates CSS zoom values [source](./.skilld/releases/v4.3.0.md:L14)

- NEW: `tab-*` utilities — added v4.3.0, generates CSS for tab sizing and alignment [source](./.skilld/releases/v4.3.0.md:L15)

- NEW: `@variant` with stacked and compound variants — v4.3.0 allows `@variant hover:focus { … }` and `@variant hover, focus { … }` syntax [source](./.skilld/releases/v4.3.0.md:L16:L17)

- NEW: `--default(…)` in functional `@utility` definitions — v4.3.0 adds support for default value fallbacks in `--value(…)` and `--modifier(…)` [source](./.skilld/releases/v4.3.0.md:L18)

- DEPRECATED: `start-*` and `end-*` utilities — deprecated v4.2.0, migrate to `inset-s-*` and `inset-e-*` utilities which use logical properties [source](./.skilld/releases/v4.2.0.md:L42)

- NEW: Logical property utilities — v4.2.0 adds complete set: `pbs-*` / `pbe-*` (padding-block), `mbs-*` / `mbe-*` (margin-block), `scroll-pbs-*` / `scroll-pbe-*`, `scroll-mbs-*` / `scroll-mbe-*`, `border-bs-*` / `border-be-*`, `inline-*` / `block-*` with min/max variants, and `inset-s-*` / `inset-e-*` / `inset-bs-*` / `inset-be-*` [source](./.skilld/releases/v4.2.0.md:L13:L20)

- NEW: `font-features-*` utility — v4.2.0 adds utility for `font-feature-settings` CSS property [source](./.skilld/releases/v4.2.0.md:L21)

- NEW: `@tailwindcss/webpack` package — v4.2.0 introduces webpack plugin support for running Tailwind as a webpack plugin [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: `--silent` option for @tailwindcss/cli — v4.3.1 adds CLI flag to suppress output [source](./.skilld/releases/v4.3.1.md:L16)

- BREAKING: Spacing CSS generation changed — v4.3.1 generates `0` instead of `calc(var(--spacing) * 0)` for zero-value utilities, and `var(--spacing)` instead of `calc(var(--spacing) * 1)` for single-unit utilities [source](./.skilld/releases/v4.3.1.md:L45:L46)

- NEW: Arbitrary value unit preservation in canonicalization — v4.3.0+ preserves original units in arbitrary values instead of normalizing to base units (e.g. `-mt-[20in]` stays as `mt-[-20in]`, not `mt-[-1920px]`) [source](./.skilld/releases/v4.3.0.md:L28)

- NEW: `h-lh` / `min-h-lh` / `max-h-lh` utilities — v4.1.5 adds line-height-based sizing utilities [source](./.skilld/releases/CHANGELOG.md:L391)

- NEW: `@tailwindcss/upgrade` tool for v4.* — v4.1.5 enables upgrading between v4.x versions and includes automatic arbitrary-to-named-value conversion (e.g. `h-[1lh]` → `h-lh`) [source](./.skilld/releases/v4.1.6.md:L11)

**Also changed:** DEPRECATED `bg-{left,right}-{top,bottom}` in favor of `bg-{top,bottom}-{left,right}` · DEPRECATED `object-{left,right}-{top,bottom}` in favor of `object-{top,bottom}-{left,right}` · DEPRECATED `break-words` replaced by `wrap-break-word` · DEPRECATED `clip` utility, use `clip-path` · DEPRECATED `order-none`, use `order-0` · DEPRECATED `shadow-inner` · DEPRECATED `decoration-slice` and `decoration-clone`, use `box-decoration-slice` and `box-decoration-break` · NEW arbitrary `:has()` variants migrate from `[&:has(…)]` to `has-[…]` syntax · BREAKING spacing-scale logic — utilities now use division instead of multiplication in calc expressions for better semantics
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use the `--silent` flag to suppress non-error output when running the CLI in automated pipelines or CI/CD environments — reduces log noise without losing error information [source](./.skilld/releases/v4.3.1.md:L11)

- Use `--watch=always` to keep the CLI watching for changes even when stdin is closed — necessary for development servers and long-running processes that expect continuous rebuilds [source](./.skilld/releases/v4.1.11.md:L13)

- Always use `--map` to generate source maps in development environments — critical for debugging CSS output and tracing issues back to source files [source](./.skilld/releases/CHANGELOG.md:L19373)

- Specify the `--cwd` option explicitly when running the CLI from different directories or in containerised environments — ensures paths are resolved correctly relative to your project structure [source](./.skilld/docs/index.md:L1)

- Generate output to a named file rather than piping to stdout in scripts — output to `/dev/stdout` is supported but can cause hangs in certain environments; explicit file output is more reliable [source](./.skilld/releases/v4.1.18.md:L25)

- Use the `canonicalize` subcommand to audit and suggest optimised class names — automatically converts verbose arbitrary utilities to Tailwind's built-in equivalents [source](./.skilld/releases/CHANGELOG.md)

- Be aware that `--watch` mode scans more directories than strictly necessary based on `@source` directives — use narrow `@source` patterns (e.g. `@source "../*.php"` not `@source "../**/*"`) to improve watch mode performance, especially with large directory structures [source](./.skilld/issues/issue-15750.md:L50)

- Apply `--minify` (or `--optimize` without minification) at build time for production — reduces CSS bundle size significantly; most Tailwind projects ship under 10kB minified [source](./.skilld/releases/CHANGELOG.md)

- When using Docker bind mounts that don't forward filesystem events, use `chokidar-cli` as a workaround since the `--poll` option was removed and `@parcel/watcher` doesn't support polling — run `npx chokidar` with `--initial --polling` flags [source](./.skilld/issues/issue-18540.md:L102)

- Verify that duplicate CLI arguments are handled correctly in your build scripts — the CLI normalises duplicate flags, so ordering matters for overrides [source](./.skilld/releases/v4.1.18.md:L23)

- Use `NODE_PATH` environment variable with standalone CLI binaries when you need to resolve external modules — necessary for isolated/offline environments using pre-built executables [source](./.skilld/releases/CHANGELOG.md:L19617)

- Ensure tracked dependencies remain available when using `--watch` mode — the CLI now recovers gracefully if a tracked file is deleted and restored, but total removal can still interrupt watching [source](./.skilld/releases/v4.3.1.md:L24)

- Prefer explicit `--input` and `--output` flags over relying on defaults to avoid ambiguity in scripts — while defaults exist (`-` for stdout output), explicit paths are clearer for maintainability and reduce surprises in CI environments [source](./.skilld/docs/index.md:L1)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

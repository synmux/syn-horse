---
name: tailwindcss-cli-skilld
description: 'ALWAYS use when writing code importing "@tailwindcss/cli". Consult for debugging, best practices, or modifying @tailwindcss/cli, tailwindcss/cli, tailwindcss cli, tailwindcss.'
metadata:
  version: 4.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# tailwindlabs/tailwindcss `@tailwindcss/cli@4.3.0`

**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/cli` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/cli` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Deprecated & Removed

- DEPRECATED: `start-*` and `end-*` utilities — v4.2.0 deprecated these in favor of `inset-s-*` and `inset-e-*` for logical inset positioning [source](./.skilld/releases/v4.2.0.md#deprecated)

- DEPRECATED: `break-words` utility — migrated to `wrap-break-word` in v4.1.15 [source](./.skilld/releases/v4.1.15.md:L19)

- DEPRECATED: `order-none` utility — migrated to `order-0` in v4.1.8 [source](./.skilld/releases/v4.1.8.md:L18)

### New Utilities (v4.2.0)

- NEW: Logical block spacing utilities — `pbs-*`, `pbe-*` for `padding-block-start` and `padding-block-end` [source](./.skilld/releases/v4.2.0.md:L13)

- NEW: Logical margin spacing utilities — `mbs-*`, `mbe-*` for `margin-block-start` and `margin-block-end` [source](./.skilld/releases/v4.2.0.md:L14)

- NEW: Logical scroll spacing utilities — `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` for logical scroll padding and margin [source](./.skilld/releases/v4.2.0.md:L15-L16)

- NEW: Logical border spacing utilities — `border-bs-*`, `border-be-*` for `border-block-start` and `border-block-end` [source](./.skilld/releases/v4.2.0.md:L17)

- NEW: Logical sizing utilities — `inline-*`, `min-inline-*`, `max-inline-*` for `inline-size`, `min-inline-size`, `max-inline-size` [source](./.skilld/releases/v4.2.0.md:L18)

- NEW: Block sizing utilities — `block-*`, `min-block-*`, `max-block-*` for `block-size`, `min-block-size`, `max-block-size` [source](./.skilld/releases/v4.2.0.md:L19)

- NEW: Logical inset utilities — `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*` for logical inset positioning (recommended replacement for `start-*`/`end-*`) [source](./.skilld/releases/v4.2.0.md:L20)

- NEW: Font feature utilities — `font-features-*` for `font-feature-settings` CSS property [source](./.skilld/releases/v4.2.0.md:L21)

### New Packages & Features

- NEW: `@tailwindcss/webpack` package — v4.2.0 added webpack plugin support for running Tailwind CSS as a webpack plugin [source](./.skilld/releases/v4.2.0.md:L12)

- NEW: Color palettes — v4.2.0 added `mauve`, `olive`, `mist`, and `taupe` color palettes to the default theme [source](./.skilld/releases/v4.2.0.md:L11)

- NEW: Source maps support — v4.1.6 added source map generation in development [source](./.skilld/releases/v4.1.6.md:L14)

### Experimental Features

- NEW: `@container-size` utility (experimental) — upcoming feature for container queries (unreleased) [source](./.skilld/releases/CHANGELOG.md:L12)

### Breaking Changes in v4.1.x

- BREAKING: `aria`, `data`, `supports` theme keys migrated to `@custom-variant` — v4.1.13 moved these theme keys to the `@custom-variant` at-rule system [source](./.skilld/releases/v4.1.13.md:L25-L27)

**Also changed:** `@source inline()` whitespace handling · `@apply` global important state behaviour · Canonicalization of arbitrary values to named values · Color-mix fallback generation · Arbitrary modifier shorthand fixes (`bg-red-500/(--my-opacity)`)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `source(none)` when importing Tailwind core to prevent double-scanning — avoids redundant file watche and improves performance [source](./.skilld/releases/v4.2.0.md:L25)

- Validate `@source` paths relative to the CSS file location, not the working directory — relative path resolution depends on file context [source](./.skilld/releases/v4.1.18.md:L11)

- Enable source maps in watch mode by using the CLI with `--watch` flag; source map generation is now correctly handled during file changes [source](./.skilld/releases/v4.1.18.md:L16)

- Avoid outputting to `/dev/stdout` with the CLI — the process will hang; use a file path instead [source](./.skilld/releases/v4.1.18.md:L25)

- Ensure `.gitignore` does not ignore all files with broad patterns like `*` — the CLI file watcher relies on `.gitignore` for change detection and will fail to process CSS if all content is ignored [source](./.skilld/discussions/discussion-19765.md:L34-45)

- Prevent duplicate CLI arguments by using distinct values — duplicate arguments (e.g., `-i input.css -i input.css`) are now validated and correctly deduplicated [source](./.skilld/releases/v4.1.18.md:L23)

- Include filename and line numbers in error messages by using recent CLI versions (v4.1.18+) — parse errors now reference source location for faster debugging [source](./.skilld/releases/v4.1.18.md:L12)

- For Docker bind mounts on macOS, use `fswatch` as a polling alternative since the CLI removed `--poll` support — `@parcel/watcher` does not support polling natively [source](./.skilld/issues/issue-18540.md:L80-121)

- Specify explicit `@source` paths instead of relying on implicit scanning — reduces unnecessary directory watching and improves performance in large projects with many directories [source](./.skilld/issues/issue-15750.md:L38-61)

- Use `--watch=always` to enable continuous file watching mode — ensures the CLI remains active and processes all changes without exiting [source](./.skilld/releases/CHANGELOG.md:L211)

- Ensure input and output file paths are different — using the same file for both input and output will cause the CLI to error [source](./.skilld/releases/CHANGELOG.md:L417)

- Allow sufficient time for file system watcher initialization — cleanup of watchers is guaranteed, but watchers created during watch mode may take time to fully establish before detecting changes [source](./.skilld/releases/CHANGELOG.md:L137)

- Use PostCSS config with ESM and TypeScript support via `postcss-load-config` v4.0+ — older versions lack proper ES module and TypeScript config support required by the CLI [source](./.skilld/releases/CHANGELOG.md:L159)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

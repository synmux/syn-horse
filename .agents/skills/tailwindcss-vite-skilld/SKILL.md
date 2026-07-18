---
name: tailwindcss-vite-skilld
description: "ALWAYS use when writing code importing \"@tailwindcss/vite\". Consult for debugging, best practices, or modifying @tailwindcss/vite, tailwindcss/vite, tailwindcss vite, tailwindcss."
metadata:
  version: 4.3.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# tailwindlabs/tailwindcss `@tailwindcss/vite@4.3.3`
**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, insiders: 0.0.0-insiders.094bf62

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/vite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/vite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for @tailwindcss/vite — prioritize recent major/minor releases.

- DEPRECATED: `start-*` and `end-*` logical property utilities (e.g. `start-4`, `end-auto`) — replaced with `inset-s-*` and `inset-e-*` in v4.2.0 [source](./.skilld/releases/v4.2.0.md#deprecated)

- NEW: `PluginWithConfig` type export — enables proper type inference for plugins extending Tailwind config in v4.3.0 [source](./.skilld/releases/v4.3.0.md:L32)

- PEER DEPENDENCY: Vite 8 support added in v4.2.2 — `@tailwindcss/vite` now accepts `vite@^5.2.0 || ^6 || ^7 || ^8` [source](./.skilld/releases/v4.2.2.md:L118)

**Also changed:** `PluginOptions.optimize` accepts `{ minify?: boolean }` object form · Vite alias resolution in `@import` and `@plugin` fixed · tsconfig path aliases supported for CSS imports · source map warnings eliminated in production builds
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Disable Lightning CSS minification only when needed using `optimize: { minify: false }` — production builds enable Lightning CSS by default for performance, so disable minification only to debug CSS output or work around specific CSS syntax issues [source](./../../node_modules/@tailwindcss/vite/README.md#enabling-or-disabling-lightning-css)

- Initialize a git repository in your project root before running Tailwind — the scanner uses git ignore rules for automatic source detection, and missing git init causes Tailwind to skip content files even if classes are present [source](./.skilld/discussions/discussion-20135.md#accepted-answer)

- Declare external content files via `@source` directives instead of relying on auto-discovery when using monorepos or external packages — changes to files listed in `@source` triggers full page reload in dev mode and ensures consistent builds [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.2.0.md:L33)

- Enable debug logging with `DEBUG=*` environment variable during development to inspect `@source` directives, discovered files, and scanned files — essential for troubleshooting missing utilities or unexpected content scanning behaviour [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.1.6.md:L13)

- Avoid using `@apply` on CSS pseudo-elements (`:before`, `:after`, `::-webkit-scrollbar`, etc.) when using dark mode or custom variants — Lightning CSS can generate invalid empty `:where()` selectors that cause minification warnings [source](./.skilld/repos/tailwindlabs/tailwindcss/issues/issue-16582.md:L84-L129)

- Use deterministic class names only — never construct class names via string concatenation or interpolation because Tailwind scans static class strings during build time and cannot detect dynamic names [source](./.skilld/discussions/discussion-20135.md#accepted-answer)

- Selectively import only the CSS layers you need (theme, utilities, preflight) when using web components or custom elements — the preflight layer's global `* { margin: 0; padding: 0 }` reset can conflict with `:host` styles from shadow DOM [source](./.skilld/repos/tailwindlabs/tailwindcss/issues/issue-15864.md:L64-L87)

- Ensure Vite version compatibility before upgrading — @tailwindcss/vite requires Vite 5.2.0 or later, with support for 6.x, 7.x, and 8.x major versions [source](./../../node_modules/@tailwindcss/vite/package.json:L36)

- Disable Lightning CSS entirely (`optimize: false`) only for development if you suspect CSS output differences between unoptimized and optimized builds — keep it enabled in production for size reduction [source](./../../node_modules/@tailwindcss/vite/README.md#enabling-or-disabling-lightning-css)

- Use relative `@import` and `@plugin` paths from the project base directory rather than relying on auto-resolution — the vite plugin resolves imports relative to the configured base to avoid path resolution errors [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L23)

- Verify that plugin package entries resolve correctly — `@plugin` statements should reference JavaScript entry points, not CSS entry points, which the vite plugin handles automatically [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.0.md:L22)

- Enable source maps in development with the vite config to aid debugging of compiled Tailwind utilities — v4.1.6+ supports generating source maps automatically [source](./.skilld/repos/tailwindcss/releases/v4.1.6.md:L14)

- Configure `@source` globs carefully to avoid scanning too many files — globs ending in `**/*` should preserve dynamic path segments to prevent unnecessary filesystem traversal in large projects [source](./.skilld/repos/tailwindlabs/tailwindcss/releases/v4.3.1.md:L34)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

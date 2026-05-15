---
name: tailwindcss-vite-skilld
description: 'ALWAYS use when writing code importing "@tailwindcss/vite". Consult for debugging, best practices, or modifying @tailwindcss/vite, tailwindcss/vite, tailwindcss vite, tailwindcss.'
metadata:
  version: 4.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# tailwindlabs/tailwindcss `@tailwindcss/vite@4.3.0`

**Tags:** internal: 0.0.0-internal.b2586d4e, next: 4.0.0, latest: 4.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @tailwindcss/vite` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @tailwindcss/vite` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API and utility changes in @tailwindcss/vite v4.2.x through unreleased features.

### New utilities and CSS properties (v4.2.0)

- NEW: Block-level logical property utilities — `pbs-*`, `pbe-*` for `padding-block-start` and `padding-block-end`; `mbs-*`, `mbe-*` for `margin-block-start` and `margin-block-end`; `scroll-pbs-*`, `scroll-pbe-*`, `scroll-mbs-*`, `scroll-mbe-*` for scroll variants; `border-bs-*`, `border-be-*` for border logical properties [source](./.skilld/releases/v4.2.0.md#added)

- NEW: Inline-size logical utilities — `inline-*`, `min-inline-*`, `max-inline-*` for `inline-size`, `min-inline-size`, and `max-inline-size`; `block-*`, `min-block-*`, `max-block-*` for `block-size`, `min-block-size`, and `max-block-size` [source](./.skilld/releases/v4.2.0.md#added)

- NEW: Inset logical property utilities — `inset-s-*`, `inset-e-*` for `inset-inline-start` and `inset-inline-end`; `inset-bs-*`, `inset-be-*` for `inset-block-start` and `inset-block-end` [source](./.skilld/releases/v4.2.0.md#added)

- NEW: `font-features-*` utility for `font-feature-settings` CSS property [source](./.skilld/releases/v4.2.0.md#added)

- NEW: Default theme color palettes — `mauve`, `olive`, `mist`, and `taupe` added to theme configuration [source](./.skilld/releases/v4.2.0.md#added)

### Deprecated and removed

- DEPRECATED: `start-*` and `end-*` utilities — use `inset-s-*` and `inset-e-*` instead for `inset-inline-start` and `inset-inline-end` properties [source](./.skilld/releases/v4.2.0.md#deprecated)

### Plugin compatibility (v4.2.2)

- NEW: Vite 8 support — `@tailwindcss/vite` now supports Vite 8 alongside existing versions [source](./.skilld/releases/v4.2.2.md#added)

**Also changed:** Experimental `@container-size` utility (unreleased) · Various canonicalization and crash fixes in v4.2.x · Import alias support for Astro v5 · Improved Oxide scanner performance for larger projects

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Spread the plugin array in frameworks with type mismatch issues — @tailwindcss/vite returns a `Plugin[]` which can cause TypeScript errors in Nuxt and some other frameworks; spread it in the plugins array or cast to `any` [source](./.skilld/discussions/discussion-19753.md)

- Use `optimize: false` to disable Lightning CSS when it causes minification warnings — particularly with `@apply` on pseudo-elements like `::before`, `::after`, or `::-webkit-scrollbar`, which generate invalid empty `:where()` selectors [source](./.skilld/issues/issue-16582.md)

- Configure `optimize: { minify: false }` to keep Lightning CSS active but skip minification — useful when Lightning CSS itself works but minification creates CSS syntax errors [source](./.skilld/pkg/README.md#enabling-or-disabling-lightning-css)

- Explicitly set `css.transformer: 'postcss'` and `build.cssMinify: 'esbuild'` in Vite config if you encounter color space issues with Lightning CSS — some projects require this fallback to traditional CSS processing [source](./.skilld/issues/issue-19789.md:L76:91)

- Verify your Vite version is compatible — @tailwindcss/vite 4.3.0 supports `^5.2.0 || ^6 || ^7 || ^8`, and versions <5.2.0 will cause peer dependency warnings [source](./.skilld/discussions/discussion-19791.md:L24:37)

- Avoid `@apply` directives directly on pseudo-elements in dark mode — they compile to invalid CSS with empty `:where()` when minified; refactor to wrapper elements or custom variants instead [source](./.skilld/issues/issue-16582.md:L85:131)

- Use `...tailwindcss()` spread syntax in Nuxt `vite.plugins` array to match Vite's `PluginOption[]` type — Nuxt's type system requires this until the framework upgrades its Vite typings [source](./.skilld/discussions/discussion-19753.md:L76:86)

- Ensure `type: "module"` is set in package.json when using @tailwindcss/vite with CommonJS-aware tools like Storybook — without it, module resolution fails with export path errors [source](./.skilld/issues/issue-16751.md:L44:46)

- Pin @tailwindcss/vite to exact version when Vite major releases rapidly — the plugin's peer dependency range updates slowly relative to new Vite versions, so use `overrides` in package.json to force compatible pairs [source](./.skilld/discussions/discussion-19791.md:L24:37)

- Hot reload works automatically for CSS files tracked by the Oxide scanner — no manual `addWatchFile` calls needed; ensure your content globs in `@source` directives are correct [source](./.skilld/.skilld/dist/index.mjs:L1)

- The plugin supports Vite's multi-environment API (ssr, client, etc.) in v4.3+ — if using custom environments, ensure the environment name is accessible via `this.environment` in the plugin hooks [source](./.skilld/issues/issue-18002.md)

- Keep `cssMinify` unset (default `'lightningcss'`) unless you specifically need esbuild — Lightning CSS is faster and handles modern CSS features better; override only if you hit a known incompatibility [source](./.skilld/issues/issue-19789.md:L75:90)

- Configure module exports correctly when publishing packages using @tailwindcss/vite — ensure your `package.json` includes both `"import"` and `"default"` exports to avoid "No exports main defined" errors in tools like Storybook [source](./.skilld/issues/issue-16751.md:L73:86)
<!-- /skilld:best-practices -->

Related: tailwindcss-skilld

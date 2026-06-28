---
name: vite-plugin-eslint2-skilld
description: 'ALWAYS use when writing code importing "vite-plugin-eslint2". Consult for debugging, best practices, or modifying vite-plugin-eslint2, vite plugin eslint2.'
metadata:
  version: 5.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# ModyQyW/vite-plugin-eslint2 `vite-plugin-eslint2@5.3.0`

**Tags:** latest: 5.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vite-plugin-eslint2` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vite-plugin-eslint2` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- NEW: `customOverlay` option — v5.3.0 adds native browser overlay for ESLint results. Type: `false | true | CustomOverlayOptions`. Pass `true` for default styling or an object with `position`, `initialIsOpen`, `zIndex`, and `theme` keys for customisation. Works in both dev and worker modes (unlike Vite's native overlay). [source](./.skilld/docs/guide/options.md:L113:L181)

- BREAKING: `chokidar` option removed — v5.0.0 no longer accepts the `chokidar` option; the plugin uses Vite's built-in file watching. Remove from your config. [source](./.skilld/releases/v5.0.0.md#breaking-changes)

- BREAKING: `formatter` option signature changed — v5.0.0 no longer accepts a function; only string paths or formatter names are accepted (e.g. `"stylish"`, `"json"`, `"./my-formatter.js"`). Remove custom formatter functions and migrate to an external formatter package. [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md:L53:L59)

- Version support: Vite 8 support added in v5.1.0; ESLint 10 support added in v5.0.5; Vite 7 supported since v5.0.4. Minimum Node version is `>=18`. [source](./.skilld/docs/guide/getting-started.md:L5:L6)

- Default value change: `cache` defaults to `true` (not `false` as in ESLint). `include` now defaults to `'src/**/*.{js,jsx,ts,tsx,vue,svelte}'` (scoped to `src/`) instead of all source files. `exclude` defaults to `['node_modules', 'virtual:']`. Override `include` if your source files are outside `src/`. [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md:L22:L27)

- Plugin apply hook changes: `dev` option defaults to `true` (runs in `vite dev`), `build` defaults to `false` (does not run in `vite build` unless explicitly enabled), `test` defaults to `false` (does not run in Vitest unless explicitly enabled). This differs from the legacy behaviour where the plugin ran unconditionally. Set `build: true` to lint during build. [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md:L68:L81)

- Virtual module handling is automatic — virtual modules (`virtual:` prefix, `\0`-prefixed, and module IDs without `/`) are force-ignored by the plugin; no manual exclusion needed. [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md:L84:L85)

**Also changed:** Support Vite 8 (v5.1.0) · Support ESLint v10 (v5.0.5) · Support Vite 7 (v5.0.4)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Enable caching by default for consistent performance — vite-plugin-eslint2 sets `cache: true` as the default (unlike ESLint v7's default of `false`), avoiding unnecessary re-linting of unchanged files [source](./.skilld/docs/guide/options.md#cache)

- Use `lintInWorker: true` to prevent blocking Vite's build pipeline during development — the synchronous linting blocks module transforms, so worker mode keeps Vite fast and prints lint results to console [source](./.skilld/docs/guide/options.md#lintinworker)

- Adopt the recommended development configuration for best developer experience — combine `fix: true`, `lintInWorker: true`, and `lintOnStart: true` to auto-fix issues, maintain Vite speed, and catch errors early [source](./.skilld/docs/guide/faq.md#recommended-configuration)

- Set `build: false` (the default) unless you specifically need ESLint during production builds — vite-plugin-eslint2 changed the default from the original plugin's always-on behaviour to opt-in, keeping builds faster [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#apply-hook)

- Use `customOverlay: true` in dev mode for better error visualization in the browser — the native Vite overlay loses colour when displaying ESLint's ANSI-coloured output; the custom overlay preserves formatting and works with `lintInWorker` [source](./.skilld/docs/guide/options.md#customoverlay)

- Do not combine `lintOnStart: true` with disabled caching when caches are empty — it will block Vite startup for a long time; use `lintInWorker: true` instead for fast startup [source](./.skilld/docs/guide/options.md#lintinworker)

- Avoid disabling `lintDirtyOnly` in development — it reduces unnecessary checks by only linting modified files; disable it only if you need to catch errors that appeared in unmodified files [source](./.skilld/docs/guide/options.md#lintdirtyonly)

- Restrict `include` to `src/` by default rather than scanning the entire project — vite-plugin-eslint2 defaults to `src/**/*.{js,jsx,ts,tsx,vue,svelte}` to avoid linting config files, node_modules, and other output directories unnecessarily [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#default-value-changes)

- Virtual modules are automatically force-ignored — do not manually add `virtual:` or module IDs without `/` to the `exclude` option, as the plugin handles this internally [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#virtual-module-handling)

- Use `emitErrorAsWarning: true` during prototyping to avoid blocking Vite's build while fixing issues — this downgrades ESLint errors to warnings and replaces the removed `failOnError` option [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#removed-options)

- Set `dev: true` explicitly only when you need to override the default — the plugin runs during `vite dev` by default but not during `vite build` or Vitest, so most projects need no configuration [source](./.skilld/docs/guide/options.md#dev)

- Cache location defaults to `.eslintcache` in the project root, not Vite's `cacheDir` — if you migrate from the original plugin and relied on Vite's cache location, update your `.gitignore` and build workflows accordingly [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#cachelocation-behavior)

- Use `eslintPath: 'eslint/use-at-your-own-risk'` only for ESLint v8 with flat config — ESLint v10 enforces flat config by default and no longer supports this override; for v8, set the `ESLINT_USE_FLAT_CONFIG` environment variable instead [source](./.skilld/docs/guide/options.md#eslintpath)

- When fixing is slow, check if you have custom formatters — the `formatter` option no longer accepts functions (only string paths) as of vite-plugin-eslint2; custom formatting is now handled by ESLint's built-in formatter registry [source](./.skilld/docs/guide/migrate-from-vite-plugin-eslint.md#type-changes)

<!-- /skilld:best-practices -->

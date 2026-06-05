---
name: nuxt-icon-skilld
description: "ALWAYS use when writing code importing \"@nuxt/icon\". Consult for debugging, best practices, or modifying @nuxt/icon, nuxt/icon, nuxt icon, icon."
metadata:
  version: 2.2.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# nuxt/icon `@nuxt/icon@2.2.3`
**Tags:** latest: 2.2.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/icon` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/icon` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Nuxt 4 required — v2.0.0 upgraded the module to support Nuxt 4 exclusively; Nuxt 3 projects must remain on v1.x source

- NEW: `recursive` option in `customCollections` — v2.1.0 added support for scanning nested subfolders in custom icon directories. When enabled, icons at `path/to/icon.svg` are named `path-to-icon` source

- NEW: `fallbackToApi` refined — can now be `boolean | 'server-only' | 'client-only'` to provide granular control over server vs. client-side fallback behaviour for missing collections [source](./.skilld/pkg/dist/module.d.mts:L119)

- NEW: `attrs` option in runtime config — default attributes applied to all Icon components, with `{ "aria-hidden": true }` as the default value for accessibility [source](./.skilld/pkg/dist/module.d.mts:L29)

- NEW: `cssSelectorPrefix` option — customisable CSS class prefix (default: `i-`), allowing changes to the icon CSS selector convention [source](./.skilld/pkg/dist/module.d.mts:L56)

- NEW: `cssWherePseudo` option — uses CSS `:where()` pseudo-selector to reduce specificity, enabled by default in v2.x [source](./.skilld/pkg/dist/module.d.mts:L71)

**Also changed:** `customize` callback per-instance scoping (v2.2.3 fix: now scoped to unique CSS selector) · 44 new icon collections (v2.2.0 feature) · `normalizeIconName` default true, flipped to false in future major · `serverBundle.disabled` option added for explicit control
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## @nuxt/icon v2.2.3 — Best Practices

## Best Practices

- Install icon collections locally with `@iconify-json/*` packages rather than the full `@iconify/json` — local installation enables faster SSR rendering, serverless function compatibility, and avoids bloating server bundle size and build time [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L102:L122)

- Use `createResolver` from `nuxt/kit` when configuring custom collections in `nuxt.config.ts` — ensures paths resolve correctly whether your project is a standalone app or an extendable layer consumed by other Nuxt projects [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L160:L182)

- Set server bundle mode to `auto` (default) to automatically choose between local and remote delivery based on deployment target — local mode bundles collections for standard servers, remote mode uses CDN for serverless environments like Cloudflare Workers or Vercel Edge [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L409:L411)

- Configure `icon.cssLayer` in `app.config.ts` when using TailwindCSS v4 with CSS mode — sets the cascade layer where icon styles are injected, preventing unintended precedence conflicts [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L78:L90)

- Define icon aliases in `app.config.ts` (`icon.aliases`) to swap icon implementations globally without changing component templates — enables theme switching or provider changes across your entire application with a single config update [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L285:L309)

- Use the `customize` prop or function to modify SVG attributes (stroke width, colours, opacity, animation duration) — avoids manual string parsing and ensures modifications apply consistently to both server and client rendering [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L313:L363)

- Enable client bundle prefetching with `clientBundle.icons` for icons you know will appear on first render — eliminates network requests for frequently used icons and improves perceived performance on initial page load [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L468:L494)

- Use ternary operators instead of template literals when constructing dynamic icon names — static scanning relies on literal icon name detection, and template literals prevent the build-time scanner from identifying which icons to bundle [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L554:L565)

- Enable `scan: true` in `clientBundle` to automatically bundle icons referenced literally in your source files — reduces network requests by pre-bundling statically detectable icon usages alongside explicit icon entries [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L478:L494)

- Set `icon.customCollections[].normalizeIconName: false` to support case-sensitive custom icon names (v1.10+) — allows you to use icons like `my-icon:FooBar` directly matching SVG filenames without forcing `kebab-case` normalization [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L254:L277)

- Configure component tests with `provider: 'none'` and `clientBundle` scan targeting both your app and `node_modules/@nuxt/ui/dist/**` — internal server routes are unavailable in browser test environments, so pre-bundled icons are required for rendering to work [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L605:L635)

- Set `icon.serverBundle.externalizeIconsJson: true` when bundling large numbers of icons to improve build performance — externalizes collection JSON files using Node.js dynamic imports (`import(…, { with: { type: 'json' } })`) instead of inlining them, reducing bundler memory pressure [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L414:L434)

- Use `provider: 'none'` with explicit `clientBundle.icons` to disable all runtime icon fetching and enforce a static build-time constraint — prevents network requests for missing icons and ensures all icons your application needs are explicitly declared and bundled [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@nuxt/icon/README.md:L240:L252)
<!-- /skilld:best-practices -->

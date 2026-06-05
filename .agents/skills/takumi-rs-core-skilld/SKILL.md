---
name: takumi-rs-core-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/core\". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi."
metadata:
  version: 1.7.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# kane50613/takumi `@takumi-rs/core@1.7.0`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.7.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents API changes in @takumi-rs/core v1.x — focusing on breaking changes from the v0 → v1 migration that established the stable public API.

## Major Breaking Changes (v0 → v1)

Since v1.0 is the first stable release with a locked API, all v1.x versions maintain backward compatibility. However, breaking changes from v0 remain significant for anyone upgrading or learning the API.

- BREAKING: `display` property defaults to `inline` instead of `flex` — verify your templates and explicitly add `display: flex` (or the `flex` Tailwind class) to containers where flexbox layout is intended [source](./.skilld/docs/upgrade/v1.mdx#display-defaults-to-inline)

- BREAKING: Image format strings must be lowercase — changed from `"WebP"` to `"webp"`, `"PNG"` to `"png"`, etc. to align with CSS ecosystem conventions [source](./.skilld/docs/upgrade/v1.mdx#lowercase-image-formats)

- BREAKING: `renderer.putPersistentImage()` signature changed — no longer accepts raw `Buffer` as the second argument; now requires an `ImageSource` object with `{ src, data }` structure [source](./.skilld/docs/upgrade/v1.mdx#putPersistentImage-now-takes-ImageSource)

- BREAKING: Runtime detection unified — `takumi-js` now automatically detects bindings for your environment (Node.js, Workers, Browser); import from `takumi-js/response` or `takumi-js/node` instead of manually choosing NAPI vs WASM [source](./.skilld/docs/upgrade/v1.mdx#unified-runtime-dectection--fallback)

- BREAKING: Deprecated types and functions removed — all previously deprecated exports in `@takumi-rs/core` have been removed; no migration path for old APIs, must switch to non-deprecated alternatives [source](./.skilld/docs/upgrade/v1.mdx#deprecated-types--functions-removed-takumi-rs-core)

**Also changed:** `emoji` option added (defaults to `twemoji`, can be set to `"from-font"` for custom emoji fonts) · Lowercase runtime imports (use `takumi-js/response` not old package paths)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use Nuxt OG Image as the integration layer for Nuxt apps — it handles Takumi renderer setup and Vue component rendering automatically, eliminating boilerplate [source](./.skilld/docs/content/docs/integration/nuxt.mdx:L6:22)

- Reuse a single `Renderer` instance across multiple render calls — the renderer manages internal resource caches and avoiding re-instantiation prevents redundant font loading and initialization overhead [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11:19)

- For Cloudflare Workers, initialize the WASM module and Renderer instance outside the `fetch()` handler — prevents re-running initialization on every request, which is a severe performance bottleneck in edge environments [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L21:49)

- Preload frequently used images via the `persistentImages` option — registers images so they're cached in the renderer's store rather than fetched and decoded on every render, especially important for logos and backgrounds [source](./.skilld/docs/content/docs/load-images.mdx:L27:64)

- Stack filters and blur effects into a single container node rather than multiple nodes — compositing layers are created per-effect, and consolidating reduces memory usage and rendering passes [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L60:64)

- Choose TTF fonts over WOFF2 for production rendering — WOFF2 requires decompression before use, while TTF can be used directly; only use WOFF2 if minimizing font file size is more critical than render performance [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L66:73)

- For pnpm or yarn users with native binding errors, add `public-hoist-pattern[]` to `.npmrc` to allow hoisting of Takumi's native binaries — without this, the package manager's virtual store prevents the native binding from being discovered [source](./.skilld/docs/content/docs/troubleshooting.mdx:L37:41)

- Use `stylesheets` + `?inline` query for Tailwind CSS in Vite-powered frameworks — bring your bundler-compiled stylesheet rather than relying on the native parser, which cannot cover all Tailwind features [source](./.skilld/docs/content/docs/tailwind-css.mdx:L9:44)

- Enable `drawDebugBorder` to visually diagnose layout issues — this option draws borders around nodes to help identify spacing, alignment, or sizing problems before filing issues [source](./.skilld/docs/content/docs/troubleshooting.mdx:L10:24)

- Use `resourcesOptions.cache` to add a custom caching layer for external images — pass a `Map<string, ArrayBuffer>` to avoid re-fetching and re-decoding the same image across multiple renders [source](./.skilld/docs/content/docs/load-images.mdx:L10:25)

- Call `renderer.measure(node, options)` to calculate node dimensions without rendering — useful for dynamic layout decisions or text size estimation before committing to a full render [source](./.skilld/docs/content/docs/measure-api.mdx:L7:29)

- Omit the `height` parameter in `ImageResponse` to enable auto-sizing — Takumi can calculate the final image height based on content flow, reducing the need for manual dimension guessing [source](./.skilld/docs/content/docs/layout-engine.mdx:L14:37)

- Use the `emoji: "twemoji"` option in `ImageResponse` for dynamic emoji rendering — this automatically extracts emoji segments from text and uses Twemoji glyphs instead of fallback fonts [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L51:65)
<!-- /skilld:best-practices -->

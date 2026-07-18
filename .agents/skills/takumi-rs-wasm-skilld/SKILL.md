---
name: takumi-rs-wasm-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/wasm\". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi."
metadata:
  version: 2.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# kane50613/takumi `@takumi-rs/wasm@2.3.0`
**Tags:** beta: 2.0.0-beta.14, rc: 2.0.0-rc.16, latest: 2.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents breaking changes and new APIs in @takumi-rs/wasm v2.x — prioritize recent major/minor releases.

### v1 → v2 Breaking Changes (Major Refactor)

- BREAKING: `render()`, `renderSvg()`, `renderAnimation()` are now async — callers must `await` them [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L61:L68)

- BREAKING: `new Renderer(options)` no longer accepts fonts or context — construct bare, pass fonts per-render [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L72:L80)

- BREAKING: `loadFont()`, `loadFonts()`, `loadFontSync()` removed — replaced by single `registerFont()` function [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L82:L98)

- BREAKING: `fetchedResources` option renamed to `images`, now keyed by `src` with optional `fetch`/`timeout`/`fetchCache` fields [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L112:L139)

- BREAKING: `createImageResponse()` removed — use `new ImageResponse()` constructor directly [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L145:L155)

- BREAKING: `@takumi-rs/image-response/wasm` export path removed — import from `@takumi-rs/image-response` directly [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L180:L187)

- NEW: `renderSvg()` top-level function produces vector SVG output alongside raster `render()` [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L157:L168)

- NEW: `prepareImages()` helper from `takumi-js/helpers` — replaces `extractResourceUrls()` + `fetchResources()` [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L28)

- BREAKING: `position` CSS default changed from `relative` to `static` — set `position: relative` where relied on old default [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L199:L236)

- BREAKING: `border-width` / `outline-width` default changed from `0` to `medium` (3px) when omitted [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L238:L244)

- BREAKING: `transform-origin` and `object-position` default changed from `top-left` to `center` (50% 50%) [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L199:L206)

- BREAKING: SVG `currentColor` no longer inherits host element's color — SVG images are now isolated documents [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L209:L221)

**Rust changes:** `GlobalContext` → `Fonts` · `raster` feature → `raster-backend` · `measure_layout()` → `measure()` · `render_sequence_animation()` → `render_animation()` · `Length`/`ColorInput` drop type parameter · `BackgroundPosition` → `PositionValue` · core enums now `#[non_exhaustive]` with wildcard match arms · CSS value lists are plain type aliases not newtypes · `max-width`/`max-height` use `MaxSize` enum · `gap` uses `Gap` enum · `svg` feature → `svg-source` · `write_animation()` streams frames to encoder · `from_html()` via new `takumi-html` crate [source](../references/@takumi-rs/wasm@2.3.0/docs/content/docs/upgrade/v2.mdx:L262:L444)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## @takumi-rs/wasm v2.3.0 Best Practices

## Best Practices

- Reuse a single `Renderer` instance across multiple render calls — the renderer holds Takumi's caches and avoids re-decoding fonts and images on every render. Pass your own renderer to `ImageResponse` through the `renderer` option [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11:L15)

- Pass a `fetchCache` (a `Map<string, Promise<ArrayBuffer>>` or anything with `Map`-like `get`/`set`/`delete`) to deduplicate concurrent image fetches and reuse bytes across renders. Concurrent requests for the same URL share one fetch, cutting redundant network work [source](./.skilld/docs/content/docs/load-images.mdx:L11:L25)

- Prefer TTF fonts over WOFF2 for decode speed — TTF is used directly while WOFF2 requires decompression before use. Use WOFF2 only when file size is more critical than decode latency [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L32:L38)

- Stack multiple filters on a single node instead of spreading them across separate nodes. Each filtered node allocates its own offscreen composition layer; stacking them reuses a single layer and saves memory [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L27:L29)

- Use `images.cache: "none"` for one-off images that won't be rendered again, preventing them from displacing frequently-used images in the bounded 64 MiB decode cache. The cache evicts least-recently-used entries when full [source](./.skilld/docs/content/docs/load-images.mdx:L121:L140)

- Provide images by key (pre-fetched) rather than relying on the renderer to fetch them — each key works in any `src` field or in `background-image`/`mask-image` CSS. This avoids network I/O during the render pass [source](./.skilld/docs/content/docs/load-images.mdx:L56:L90)

- Register fonts on a `Renderer` via `registerFont()` once at startup, outside the request path, when you have frequently-used fonts — reuse that renderer instance across renders to decode each file once [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L147:L158)

- Use `googleFonts()` with weight ranges (e.g., `weight: "600..700"`) to fetch variable fonts and keep their axes live, instead of pinning to a single weight. The subsetting pass automatically trims unused coverage [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L92:L113)

- Pass `persistedImages` to the `Renderer` constructor (not to individual render calls) when using `renderAnimation()` — the renderer applies them to every scene and makes them available to keyframe-driven animations [source](./.skilld/repos/kane50613/takumi/discussions/discussion-375.md:L25:L27)

- Apply the same [fetch limits](/docs/load-images#fetch-limits) (`timeout`, `maxBytes`, `allowUrl`) to both `googleFonts` and `prepareImages` calls for consistency — both accept the same options and default to 5-second timeouts and 32 MiB max per fetch [source](./.skilld/docs/content/docs/helpers.mdx:L17)

- Bring your own compiled Tailwind stylesheet via the `?inline` query in Vite when you need theme config or features the built-in `tw` parser doesn't support. The parser covers most utilities but lacks theme configuration and Tailwind Preflight [source](./.skilld/docs/content/docs/styling.mdx:L48:L72)

- Use `from` and `to` keyframe selectors in structured `keyframes` objects when rendering individual animation frames with `render()` + `timeMs`; use CSS stylesheet `@keyframes` when rendering with `renderAnimation()` — each path is optimized for its use case [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L20:L96)

- Extract emoji with `extractEmojis()` and `prepareImages()` separately to fetch emoji bytes alongside other images in one pass, preventing an extra fetch round-trip. COLR font emoji (like Twemoji-COLR) avoid network requests entirely if the font is already loaded [source](./.skilld/docs/content/docs/load-images.mdx:L186:L217)
<!-- /skilld:best-practices -->

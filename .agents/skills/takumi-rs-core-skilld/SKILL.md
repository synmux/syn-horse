---
name: takumi-rs-core-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/core\". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi."
metadata:
  version: 2.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# kane50613/takumi `@takumi-rs/core@2.3.0`
**Tags:** beta: 2.0.0-beta.14, rc: 2.0.0-rc.16, latest: 2.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `new Renderer({ fonts })` → `new Renderer()` — v2 removed fonts from constructor; pass fonts to each render call via `render(node, { fonts: [...] })` instead [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L72:L80)

- BREAKING: `render()`, `renderSvg()`, `renderAnimation()` are now async — top-level functions and napi Renderer methods await resource loading, callers must `await` them [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L61:L70)

- BREAKING: Font loading API changed — `loadFont()`, `loadFonts()`, `loadFontSync()` replaced with single `registerFont()` method; pass fonts per render via `render(node, { fonts: [...] })` option [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L82:L98)

- BREAKING: Image resource option renamed — `fetchedResources` → `images` (keyed by `src`); `resourcesOptions` → `images.fetch` / `images.timeout` [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L110:L139)

- BREAKING: `createImageResponse()` removed — construct `ImageResponse` directly with `new ImageResponse(jsx, opts)` and pass options inline [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L145:L155)

- BREAKING: `position` property default changed — `relative` → `static`; set `position: relative` where you relied on the old containing block behavior [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L223:L236)

- BREAKING: `border-width` and `outline-width` default changed — omitted width now resolves to `medium` (3px) instead of `0`; `border: solid red` now draws a visible line [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L238:L244)

- NEW: `renderSvg()` top-level function — renders node tree to SVG document string; takes same inputs as `render()` and same resource pipeline [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L157:L168)

- NEW: `fontFamilies` option added to all render calls — ordered array of family names for the fallback chain; defaults to all registered families in registration order [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L100:L108)

- NEW: `images` accepts bare URL strings — `fonts` entries can be fetched on demand and cached automatically [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L170:L178)

- BREAKING: `GlobalContext` → `Fonts` (Rust only) — image store removed; pass fonts via `RenderOptions::builder().fonts(&fonts)` [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L283:L299)

- BREAKING: `measure_layout()` renamed to `measure()` (Rust) — returns `MeasuredNode` instead of `LayoutNode` [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L326:L340)

- BREAKING: `OutputFormat::Jpeg` and `OutputFormat::WebP` now carry `Quality` — `write_image()` signature changed to `write_image(&image, &mut output, format)` [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L310:L324)

- BREAKING: `line-clamp` is now a CSS shorthand — expands to `max-lines`, `block-ellipsis`, `continue`; only `block-ellipsis` inherits [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L246:L248)

- BREAKING: `currentColor` in SVG images no longer tinted by host `color` — SVG images are now isolated documents; set color in SVG markup directly if needed [source](./.skilld/docs/content/docs/upgrade/v2.mdx:L209:L221)

**Also changed:** `@takumi-rs/image-response/wasm` subpath removed — import from `@takumi-rs/image-response` · `transform-origin` / `object-position` default changed to center instead of top-left · `scale()` with negative values now reflects instead of collapsing · relative font keywords (`bolder`, `lighter`, `larger`, `smaller`) now resolve · wider default element styles added (lists, forms, details) · `background` shorthand no longer parses blend-mode · `registerFont()` signature changed · `renderAnimation()` frame rate cap added (90 fps WebP/APNG, 50 fps GIF) · Rust enums marked `#[non_exhaustive]` (match arms need wildcard) · CSS value lists now plain type aliases instead of newtypes · `max-width` / `max-height` use `MaxSize` enum · `gap` uses `Gap` enum · `svg` Cargo feature renamed to `svg-source` · `write_animation()` now streams frames to encoder · `takumi-html` crate added for HTML parsing
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices for @takumi-rs/core

## Best Practices

- Reuse the `Renderer` instance across multiple renders instead of creating a new one each time — the renderer holds font and image caches that decode each file only once, dramatically improving throughput when processing high volumes [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#the-renderer)

- Use `googleFonts()` to load font families from Google Fonts in a single request with automatic script subsetting — unused weights and language coverage never download, and each family expands to its subscripts so multilingual content routes to the right file [source](./.skilld/docs/content/docs/typography-and-fonts.mdx#from-google-fonts)

- Preload frequently used fonts by calling `registerFont()` on a renderer instance before the request path, then reuse that renderer — fonts are decoded once and live in the renderer's cache [source](./.skilld/docs/content/docs/typography-and-fonts.mdx#preloading-with-registerFont)

- Prefer TTF over WOFF2 for better decode performance unless file size is critical — WOFF2 requires decompression before use, adding latency to the first render, while TTF is used directly [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#fonts)

- Provide a `fetchCache` (a `Map` or LRU cache) when rendering multiple images with shared URLs — concurrent renders needing the same image URL will reuse the in-flight fetch promise [source](./.skilld/docs/content/docs/load-images.mdx#external-images)

- Set `imageTimeout` and `allowUrl` on the `images` option to enforce SSRF protection and prevent hanging on slow hosts — `timeout` defaults to 5 seconds and `allowUrl` filters by hostname [source](./.skilld/docs/content/docs/load-images.mdx#fetch-limits)

- Use `renderAnimation()` to produce animated WebP, APNG, or GIF files from scene arrays — each scene's JSX is automatically transformed and its `<style>` tags are extracted, with images fetched once across all frames [source](./.skilld/docs/content/docs/keyframe-animation.mdx#how-to-define-animations)

- Use structured `keyframes` objects with `render()` and `timeMs` when sampling individual animation frames for external encoding (e.g., with ffmpeg) — `keyframes` is the only API that accepts the `keyframes` option, not `renderAnimation()` [source](./.skilld/docs/content/docs/keyframe-animation.mdx#structured-keyframes-objects)

- Load international text fonts explicitly via `fonts` or `registerFont()` with the `lang` attribute set on the root element — Takumi never reads system fonts, so Bengali, Japanese, Simplified Chinese, and other scripts require a font that covers them [source](./.skilld/discussions/discussion-642.md#accepted-answer)

- Pass `signal: request.signal` to abort a render that is still fetching fonts or images — this enables proper timeout and request cancellation in serverless environments [source](./.skilld/docs/content/docs/output-formats.mdx#cancellation)

- Stack multiple CSS filters on a single node instead of nested filtered nodes — each filtered node allocates its own offscreen composition layer; stacking them on one node reuses a single layer and reduces memory overhead [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#component-design)

- Await `ImageResponse.ready` before returning the response to handle render failures with a fallback — `ready` is a promise that resolves on success and rejects on failure; use `onError` only for logging [source](./.skilld/docs/content/docs/image-response.mdx#error-handling)

- Bring your compiled Tailwind stylesheet via `stylesheets` using `?inline` query instead of relying on the `tw` prop alone — the `tw` prop has no theme config, no Preflight normalization (so elements keep UA margins), and cannot use Tailwind v4 custom properties [source](./.skilld/docs/content/docs/styling.mdx#bring-your-stylesheet)
<!-- /skilld:best-practices -->

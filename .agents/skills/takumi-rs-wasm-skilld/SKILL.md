---
name: takumi-rs-wasm-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/wasm\". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi."
metadata:
  version: 1.7.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# kane50613/takumi `@takumi-rs/wasm@1.7.0`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.7.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes — @takumi-rs/wasm v1.7.0

## API Changes

This section documents the API surface and breaking changes in @takumi-rs/wasm v1.7.0.

- DEPRECATED: `initSync(SyncInitInput)` — passing `SyncInitInput` directly is deprecated. Pass `{module: SyncInitInput}` instead [source](./.skilld/pkg/dist/export.d.mts:L248)

- NEW: `Renderer.loadFonts()` — batch load multiple fonts asynchronously with a single call, returns the count of successfully loaded fonts [source](./.skilld/pkg/dist/export.d.mts:L286)

- NEW: `FontLoaderSync` type — synchronous font loader variant for blocking font loading without promises [source](./.skilld/pkg/dist/export.d.mts:L274-277)

- NEW: `ImageSourceLoaderSync` type — synchronous image loader variant supporting both direct data and callback functions [source](./.skilld/pkg/dist/export.d.mts:L271-273)

- NEW: Overloaded `Renderer.loadFont()` — now supports both synchronous and asynchronous font loading with optional abort signal [source](./.skilld/pkg/dist/export.d.mts:L287-288)

- NEW: Overloaded `Renderer.putPersistentImage()` — now supports both synchronous and asynchronous image loading with optional abort signal [source](./.skilld/pkg/dist/export.d.mts:L283-284)

- ENHANCEMENT: `FontLoader` type — extended to include `key?: string` property for font identification and deduplication [source](./.skilld/pkg/dist/export.d.mts:L267-270)

- ENHANCEMENT: `RenderOptions.dithering` — new optional dithering algorithm selection with "none" (default), "ordered-bayer", or "floyd-steinberg" [source](./.skilld/pkg/dist/export.d.mts:L62)

- ENHANCEMENT: `RenderAnimationOptions.fps` — frames per second parameter now required for proper timeline sampling [source](./.skilld/pkg/dist/export.d.mts:L90)

**Also changed:** `Symbol.dispose()` support on Renderer · `clearImageStore()` persistent image management · `renderAsDataUrl()` data URL generation · `measure()` layout information retrieval
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices for @takumi-rs/wasm

## Performance & Rendering

- Initialize the WASM module and renderer instance outside of the request handler in Cloudflare Workers to avoid re-initialization on every request — enables connection pooling and memory reuse across invocations [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L21:48)

- Reuse the `Renderer` instance across multiple render calls rather than creating a new instance for each operation — the renderer manages font caches and resource pools internally [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11:19)

- Preload frequently used images with the `persistentImages` array (logos, backgrounds, etc.) to avoid redundant image fetching and decoding on every render — referenced by key in `src` or CSS `background-image` properties [source](./.skilld/docs/content/docs/load-images.mdx:L27:64)

- Prefer TTF font files over WOFF2 — WOFF2 requires decompression before use, while TTF loads directly; only use WOFF2 if file size is more critical than render performance [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L68:72)

- Stack multiple filters and blur effects in a single container node rather than applying them to separate layers — Takumi creates a composition layer equal to the viewport size for each filtered element, multiplying memory overhead [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L62:64)

## Styling & Tailwind

- Bring your bundler-compiled Tailwind stylesheet via the `?inline` query parameter instead of relying on the native Tailwind parser — the parser cannot cover all Tailwind features and arbitrary values; bundled stylesheets provide full support [source](./.skilld/docs/content/docs/tailwind-css.mdx:L14:30)

- Use dynamic classes with `clsx()` or template literals in the `tw` prop for conditional styling instead of attempting runtime class construction — the native parser evaluates classes at render time [source](./.skilld/docs/content/docs/tailwind-css.mdx:L69:79)

## Image Loading

- Add a custom cache layer with `resourcesOptions.cache` when rendering multiple images to avoid redundant fetches and decodings — pass a `Map<string, ArrayBuffer>` to persist decoded image data across render calls [source](./.skilld/docs/content/docs/load-images.mdx:L13:25)

## Typography

- Use `fontWeight` property for variable font weight control instead of `fontVariationSettings: "wght"`— Takumi maps `font-weight` directly to the `wght` axis for cleaner, more idiomatic code [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L37:48)

- Use `text-overflow: ellipsis` with `line-clamp` without requiring `white-space: nowrap` — Takumi's Parley engine automatically handles multiline ellipsis when line-clamp is set [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L96:111)

## Debugging

- Use the `drawDebugBorder: true` option in `ImageResponse` to draw borders around all nodes when debugging layout issues — helps visualize flex layout, grid layout, and spacing problems [source](./.skilld/docs/content/docs/troubleshooting.mdx:L10:28)

## Layout & Measurement

- Use the `renderer.measure()` API to calculate node dimensions without rendering when you only need layout information for further calculations — avoids the cost of rasterization and compositing [source](./.skilld/docs/content/docs/measure-api.mdx:L7:29)

## Animation

- Use structured `keyframes` objects with `render()` and `timeMs` when you need frame-level control over animations — this pattern is ideal for integrating with external tools like ffmpeg or creating programmatic frame sequences [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L22:50)

- Use stylesheet `@keyframes` definitions (in `<style>` tags or via `stylesheets`) when animations should travel with the JSX tree and be rendered with `renderAnimation()` — keeps animation logic colocated with component structure [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L52:93)
<!-- /skilld:best-practices -->

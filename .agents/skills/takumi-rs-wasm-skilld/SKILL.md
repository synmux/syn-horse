---
name: takumi-rs-wasm-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/wasm\". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi."
metadata:
  version: 1.8.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# kane50613/takumi `@takumi-rs/wasm@1.8.4`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.8.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

**BREAKING: `display` property defaults to `inline` instead of `flex`** — v1 changed default to align with CSS spec; explicitly add `display: flex` or `flex` Tailwind class to containers requiring flexbox [source](./.skilld/docs/upgrade/v1.mdx:L18:36)

**BREAKING: Import path for `ImageResponse` changed to `takumi-js/response`** — v1 unified runtime detection and fallback; no longer import from `@takumi-rs/image-response` [source](./.skilld/docs/upgrade/v1.mdx:L40:48)

**NEW: `emoji` option added to `ImageResponse` and render options** — v1 introduces `emoji` option supporting `"twemoji"` (default) or `"from-font"` for dynamic emoji loading; when using `"from-font"`, ensure emoji font is included in `fonts` array [source](./.skilld/docs/upgrade/v1.mdx:L50:72)

**BREAKING: Image format strings must be lowercase** — v1 changed format options to lowercase only (`"png"`, `"jpeg"`, `"webp"`, `"ico"`, `"raw"`); uppercase formats like `"WebP"` no longer work [source](./.skilld/docs/upgrade/v1.mdx:L74:83)

**BREAKING: `putPersistentImage()` signature changed** — v1 changed second argument from raw `Buffer` to `ImageSource` object with shape `{ src: string, data: Buffer }` [source](./.skilld/docs/upgrade/v1.mdx:L85:94)

**BREAKING (Rust): `RenderOptionsBuilder` removed, use `RenderOptions::builder()`** — v1 switched to typed-builder for compile-time validation without `.unwrap()` calls [source](./.skilld/docs/upgrade/v1.mdx:L102:109)

**BREAKING (Rust): `FetchTaskCollection` removed** — v1 removed automatic task collection; use `Node::resource_urls` and `Style::resource_urls` directly to retrieve URLs, then fetch and pass resources to renderer [source](./.skilld/docs/upgrade/v1.mdx:L111:113)

**BREAKING (Rust): `parse_svg_str()` free function removed, use `SvgSource::from_str()`** — v1 consolidated SVG parsing to associated method [source](./.skilld/docs/upgrade/v1.mdx:L115:122)

**BREAKING (Rust): `SpacePair::from_reversed_pair()` constructor removed** — v1 removed; construct `SpacePair` directly with values in correct order [source](./.skilld/docs/upgrade/v1.mdx:L124:126)

**BREAKING (Rust): `TakumiError` type alias removed, use `takumi::error::Error`** — v1 removed re-export; import directly from `takumi::error` module [source](./.skilld/docs/upgrade/v1.mdx:L128:135)

**BREAKING (Rust): `Viewport` constructor signature changed** — v1 removed `From<(u32, u32)>` impl; use explicit `Viewport::new((width, height))` instead of tuple conversion [source](./.skilld/docs/upgrade/v1.mdx:L137:144)

**BREAKING (Rust): `ImageSource::size()` made private** — v1 made this internal helper private; it was not intended as public API [source](./.skilld/docs/upgrade/v1.mdx:L146:148)

**BREAKING (Rust): `detailed_css_error` Cargo feature removed** — v1 removed feature gate; detailed CSS error reporting is now always enabled [source](./.skilld/docs/upgrade/v1.mdx:L150:152)

**Also changed:** `extractResourceUrls` helper moved to `@takumi-rs/helpers` · deprecated exports in `@takumi-rs/core` removed
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Reuse the `Renderer` instance across multiple renderings instead of creating a new instance per render — the renderer manages fonts, image caches, and other resources that should be amortized across calls [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#the-renderer)

- Preload frequently used images via `persistentImages` to avoid redundant image decoding on each render — register logos, backgrounds, and other assets used across multiple renders [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#preload-frequently-used-images)

- Initialize the WASM module and `Renderer` instance outside the `fetch()` handler in Cloudflare Workers to avoid re-initialization overhead on every request [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#for-cloudflare-workers)

```tsx
import { initSync, Renderer } from "takumi-js/wasm";
import module from "takumi-js/wasm/takumi_wasm_bg.wasm";

initSync(module);
const renderer = new Renderer();

export default {
  fetch(request) {
    // renderer and WASM are already initialized
  },
};
```

- Prefer TTF font files over WOFF2 for rendering performance — WOFF2 requires decompression before use, while TTF can be used directly; only use WOFF2 if file size is critical [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#prefer-ttf-over-woff2)

- Stack filters and blur effects on a single node rather than splitting across multiple elements — applying filters creates composition layers that consume additional memory [source](./.skilld/docs/content/docs/performance-and-optimization.mdx#stack-filters-in-a-single-node)

- Use `@takumi-rs/core` (napi-rs) for Node.js environments where multithreading is available; use `@takumi-rs/wasm` only for edge runtimes or browser environments [source](./.skilld/docs/content/docs/architecture.mdx#for-edge-runtime--browser)

- Import compiled stylesheets with the `?inline` query parameter and pass to `stylesheets` option in `ImageResponse` for full Tailwind CSS support — the native `tw` prop parser has limitations compared to compiled CSS [source](./.skilld/docs/content/docs/tailwind-css.mdx#bring-your-stylesheet)

```tsx
import stylesheet from "~/styles/global.css?inline";

return new ImageResponse(<div className="bg-background" />, {
  stylesheets: [stylesheet],
});
```

- Use static imports instead of dynamic `import()` calls for WASM modules to avoid duplicate symbol declarations in the middleware manifest — dynamic imports can cause the bundler to include the same WASM file multiple times [source](./.skilld/issues/issue-332.md)

- Use the `measure()` API to calculate node dimensions before rendering — this allows you to get layout information without generating an image, useful for sizing dynamic content [source](./.skilld/docs/content/docs/measure-api.mdx)

```tsx
const { width, height } = await renderer.measure(node, { stylesheets });
```

- Pass `persistentImages` to the `Renderer` constructor when using `renderAnimation()` to make preloaded images available to the animation renderer [source](./.skilld/discussions/discussion-375.md)

```tsx
const renderer = new Renderer({
  persistentImages: [
    { src: "logo", data: () => fetch("/logo.png").then(r => r.arrayBuffer()) },
  ],
});
```

- Download custom fonts and store them locally instead of using `next/font` for proper Unicode character rendering — frameworks like `next/font` provide CSS sheets which don't work for image rendering [source](./.skilld/discussions/discussion-642.md)

- Use `renderAnimation()` for straightforward animated output formats (GIF, WebP, APNG) with a single scene; use `render()` with `timeMs` for frame-by-frame control or when composing multiple scenes [source](./.skilld/docs/content/docs/keyframe-animation.mdx#ways-to-render)

- Define animations in JSX with stylesheet `@keyframes` for workflows that support both `renderAnimation()` and `render()` — this approach keeps the animation definition portable with the component [source](./.skilld/docs/content/docs/keyframe-animation.mdx#css-stylesheets)

- Control font variations (weight, width, optical sizing) using `font-variation-settings` CSS property for variable fonts — `font-weight` automatically maps to the `wght` axis, but custom axes require the explicit property [source](./.skilld/docs/content/docs/typography-and-fonts.mdx#variations--features)

```tsx
<div
  style={{
    fontVariationSettings: "'wght' 700, 'wdth' 150",
  }}
>
  Customized font axes
</div>
```
<!-- /skilld:best-practices -->

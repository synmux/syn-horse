---
name: takumi-rs-wasm-skilld
description: 'ALWAYS use when writing code importing "@takumi-rs/wasm". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi.'
metadata:
  version: 1.8.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-15
---

# kane50613/takumi `@takumi-rs/wasm@1.8.5`

**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.8.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for @takumi-rs/wasm — prioritise recent major/minor releases.

- INTERNAL: `Renderer` — v1.8.1 holds renderer state behind a lock so all methods take `&self`, preventing a panic from permanently breaking the wasm-bindgen borrow flag [source](./.skilld/releases/@takumi-rs/wasm@1.8.1.md:L13)

- OPTIMIZATION: Binary size reduction — v1.8.0 built with nightly Rust toolchain with `panic=immediate-abort` to reduce WASM binary size [source](./.skilld/releases/@takumi-rs/wasm@1.8.0.md:L11)

**Also changed:** SIMD configuration fixes (v1.8.2)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices for @takumi-rs/wasm v1.8.5

## Performance & Optimization

- Reuse the Renderer instance across multiple render calls rather than creating a new instance for each rendering operation. The Renderer is the heart of Takumi's resource management — creating multiple instances wastes memory and CPU cycles. For Cloudflare Workers, initialize the WASM module and Renderer instance outside the `fetch()` handler so they are only instantiated once per Worker activation, not on every request [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11:50)

- Preload frequently used images like logos and backgrounds using `persistentImages` to avoid redundant image decoding during rendering. Register images at Renderer or ImageResponse initialization time; the key can then be used in any `src` attribute or CSS properties like `background-image` and `mask-image` [source](./.skilld/docs/content/docs/load-images.mdx:L27:64)

- Prefer TTF font format over WOFF2 for performance — WOFF2 is compressed and requires decompression before use, while TTF is raw and can be used directly. Use WOFF2 only if file size is a critical concern [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L67:73)

- Stack multiple filters (blur, drop-shadow, etc.) in a single node to reduce composition layers. Applying filters on separate nodes creates additional composition layers equal to the viewport size, incurring memory overhead [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L60:65)

- Always prefer `@takumi-rs/core` (Node.js bindings) over `@takumi-rs/wasm` when parallel rendering and multithreading are available. The Node.js runtime with Rayon multithreading significantly outperforms WASM for CPU-intensive rendering tasks [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L56:58)

## Animation & Rendering

- Choose between `renderAnimation()` and `render()` with `timeMs` based on animation complexity. Use `renderAnimation()` for simple animated WebP, APNG, or GIF output; use `render()` with `timeMs` and structured `keyframes` when you need full control over frame rendering or external encoding tools like ffmpeg [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L7:10)

- Define animations as CSS stylesheets with `@keyframes` when the animation should travel with the JSX tree and be reusable. This approach pairs well with `renderAnimation()` — parse the JSX component to get `stylesheets`, then pass them to `renderAnimation()` with your scenes [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L51:93)

- Use structured `keyframes` objects when rendering specific animation frames with `render()` and `timeMs`, giving you precise control over animation timing and progress calculation without requiring a stylesheet [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L21:50)

## Typography & Text Rendering

- Understand font availability differences between runtimes — `@takumi-rs/core` (Node.js) includes full Geist and Geist Mono by default; `@takumi-rs/wasm` only includes Manrope as a single variable Latin font. In WASM, WOFF font loading is not supported; always provide TTF or other natively-supported formats [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L7:13)

- Use `extractEmojis()` helper for dynamic emoji rendering when the emoji content is only known at runtime. The helper separates emoji segments from text nodes and fetches emoji images on demand, then pass the modified node to the renderer [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L69:86)

- Combine `text-overflow: ellipsis` with `lineClamp` to handle multiline text truncation without requiring `white-space: nowrap`, allowing proper multiline ellipsis handling [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L94:111)

## Integration & Setup

- In Nuxt projects, use Nuxt OG Image module with Takumi as the renderer instead of calling Takumi directly. Set `ogImage.defaults.renderer: "takumi"` in `nuxt.config.ts` and create `.takumi.vue` templates — this is the recommended and simplest integration path [source](./.skilld/docs/content/docs/integration/nuxt.mdx:L1:83)

- In Next.js, always add `@takumi-rs/core` to `serverExternalPackages` in your Next.js config to prevent bundling issues and ensure the native binding is correctly resolved at runtime [source](./.skilld/docs/content/docs/integration/nextjs.mdx:L16:28)

- Use the `measure()` API to calculate node layout without rendering when you need dimensions for further calculations — pass a node and optional stylesheets, and get back `{ width, height }` for layout-dependent operations [source](./.skilld/docs/content/docs/measure-api.mdx:L9:29)

- Import stylesheet assets with the `?inline` query parameter (e.g. `import stylesheet from "~/styles/global.css?inline"`) in Vite-powered frameworks and pass via the `stylesheets` option to ImageResponse. This is the recommended approach for bringing compiled Tailwind and custom stylesheets into Takumi rendering [source](./.skilld/docs/content/docs/tailwind-css.mdx:L13:34)

## Debugging & Troubleshooting

- When layout appears incorrect, enable `drawDebugBorder: true` in `ImageResponse` options to visualize borders around all nodes and diagnose layout problems before filing an issue [source](./.skilld/docs/content/docs/troubleshooting.mdx:L10:27)
<!-- /skilld:best-practices -->

---
name: takumi-rs-wasm-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/wasm\". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi."
metadata:
  version: 1.6.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# kane50613/takumi `@takumi-rs/wasm@1.6.0`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.6.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `AnyNode` — replaced with strict `Node` type [source](./.skilld/repos/kane50613/takumi/releases/@takumi-rs/wasm@0.73.0.md:L9)

- BREAKING: `renderAnimation` — now takes "scenes" with keyframe animations instead of frames; original frame-by-frame encoding renamed to `encodeFrames` [source](./.skilld/repos/kane50613/takumi/releases/@takumi-rs/wasm@0.71.0.md:L9)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Avoid the native Tailwind parser for complex use cases; it won't cover all features. Use it only for simple, quick solutions. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/tailwind-css.mdx:L50)

- For Nuxt applications, prefer the Nuxt OG Image integration with its Takumi renderer, as it is the easiest way to use Takumi. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/integration/nuxt.mdx:L6)

- Avoid loading images from URLs or bytes during the rendering pass; instead, register persistent images to prevent re-decoding and improve performance. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx:L54)

- Preload frequently used images like logos and backgrounds to eliminate redundant image decoding and enhance performance. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/load-images.mdx:L29)

- Reuse the Renderer instance across multiple renderings to optimize resource management. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx#reuse-the-renderer-instance)

- When using Takumi with Cloudflare Workers, initialize the WASM module and renderer instance outside the `fetch()` handler to avoid repeated initialization on each request. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx#for-cloudflare-workers)

- Prefer `@takumi-rs/core` over `@takumi-rs/wasm` for applications requiring multithreading. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx#parallel-rendering)

- Stack filters in a single node to minimize memory usage, as applying filters to separate nodes creates additional composition layers. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx#stack-filters-in-a-single-node)

- Prefer TTF over WOFF2 for fonts in performance-critical scenarios, as TTF is a raw format that can be used directly without decompression. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/performance-and-optimization.mdx#prefer-ttf-over-woff2)

- Use the `fromJsx` helper function to map JSX elements to Takumi nodes, which handles React-specific features and simplifies the process. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/architecture.mdx#fromjsx-helper)

- Avoid using Tailwind's `animate-(--custom-property)` form for animations, as Takumi does not currently support CSS custom property resolution for the `animation` property. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/keyframe-animation.mdx#tailwind-animation-utilities)

- When animating with images, pass `persistedImages` to the renderer constructor to make them available to `renderer.renderAnimation()`. [source](./.skilld/repos/kane50613/takumi/discussions/discussion-375.md#accepted-answer)

- For troubleshooting layout issues, enable the `drawDebugBorder` option in `ImageResponse` to visualize node boundaries. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/troubleshooting.mdx#layout-is-not-correct)

- If encountering "Cannot find native binding" errors with `pnpm` or `yarn`, add `public-hoist-pattern[]=@takumi-rs/core-*` to your `.npmrc` file to ensure proper hoisting of native binaries. [source](./.skilld/references/@takumi-rs/wasm@1.6.0/docs/content/docs/troubleshooting.mdx#cannot-find-native-binding)
<!-- /skilld:best-practices -->

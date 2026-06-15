---
name: takumi-rs-core-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/core\". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi."
metadata:
  version: 1.8.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# kane50613/takumi `@takumi-rs/core@1.8.4`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.8.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

@takumi-rs/core v1.8.4 maintains a stable API with no documented breaking changes, deprecations, or removals in recent releases. The v1.x line has focused on implementation improvements and bug fixes rather than API surface changes.

### Implementation Changes

- INTERNAL: v1.8.3 — fixed Windows crash when Node exits after rendering due to rayon worker thread management in N-API teardown [source](./.skilld/releases/@takumi-rs/core@1.8.3.md:L11)

- INTERNAL: v1.8.0 — compiler optimization using nightly Rust toolchain with `panic=immediate-abort` to reduce binary size [source](./.skilld/releases/@takumi-rs/core@1.8.0.md:L11)

### Stable APIs (v1.0+)

The current stable API includes:

- `Renderer` class: core image rendering with `render()`, `measure()`, `renderAnimation()`, and `encodeFrames()` methods
- Font management: `loadFont()`, `loadFontSync()`, `loadFonts()` for font registration
- Image handling: `putPersistentImage()`, `clearImageStore()` for persistent asset storage
- Animation support: `renderAnimation()` for scene-based animations, `encodeFrames()` for precomputed frame sequences
- Output formats: WebP, PNG, JPEG, ICO, raw pixels for static images; WebP, APNG, GIF for animated images

### Future v2 Planned Changes (Not Yet Released)

Issue #728 outlines planned breaking changes for v2.0.0, including:

- Return type for `render()` — will return a `Uint8Array` subclass with `.toResponse()` / `.toBuffer()` methods instead of plain `Buffer`
- Direct JSX/HTML input support — `Renderer.render()` will accept React elements or HTML strings directly
- Unified Renderer contract — consistent async/sync behavior and method signatures across platforms

Note: These are planned changes not yet released. Code written for v1.x will continue to work without modification.

---

## Source Notes

- Release notes: minimal API change documentation in v1.0.13 through v1.8.4 releases
- Type definitions: `/Users/syn/src/github.com/synmux/syn-horse/node_modules/@takumi-rs/core/index.d.ts` (stable since v1.0.13)
- External documentation: https://takumi.kane.tw/docs/ (not indexed locally; see package README)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Reuse Renderer instances across multiple rendering operations to avoid repeated initialization overhead — the Renderer is the core resource management component, and reinitializing it for each render call wastes performance [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/performance-and-optimization.mdx#the-renderer)

- Preload frequently used images like logos and backgrounds as persistent images to avoid redundant decoding — use `putPersistentImage()` during initialization and reference them by key in `src` or CSS properties [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/load-images.mdx#persistent-images)

- Pass your own Renderer instance to ImageResponse via the `renderer` option rather than relying on auto-managed instances — enables renderer reuse and consistent resource management across requests [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/performance-and-optimization.mdx#for-imagresponse)

- Prefer TTF font files over WOFF2 — TTF is a raw format that can be used directly without decompression, while WOFF2 requires decompression overhead; only use WOFF2 if file size is the primary concern [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/performance-and-optimization.mdx#prefer-ttf-over-woff2)

- Use `ImageSourceLoader` and `FontLoader` types with async functions for lazy-loading resources — avoid loading large assets until render time, improving application startup performance [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@takumi-rs/core/dist/export.d.ts:L5-L17)

- Bring compiled Tailwind stylesheets via the `?inline` query parameter instead of relying on the native Tailwind parser — the native parser has limitations and won't cover advanced Tailwind features; paired stylesheets support the full Tailwind v4 syntax including @theme blocks [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/tailwind-css.mdx#bring-your-stylesheet)

- Stack all filters and blur effects in a single node to minimize composition layers — each filter creates a full-viewport-sized composition layer which incurs memory overhead; grouping them reduces this cost [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/performance-and-optimization.mdx#stack-filters-in-a-single-node)

- Set `loadDefaultFonts: false` explicitly when providing custom fonts to avoid embedding unused default fonts — defaults to false when `fonts` are provided, but be explicit for clarity [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@takumi-rs/core/index.d.ts:L98)

- Use the `measure()` API before rendering to calculate node dimensions for layout decisions — enables responsive OG image generation based on content size without full rendering overhead [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/measure-api.mdx)

- Use `renderAnimation()` for animated image output (WebP, APNG, GIF) with simple scene timelines — provides minimal configuration for common use cases; only use `render()` + `timeMs` when you need full frame-by-frame control or external encoding [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/keyframe-animation.mdx#renderanimation)

- Use COLR/bitmap font formats for emoji rendering instead of rasterized fonts like Noto Color Emoji — COLR fonts (e.g., Twemoji-COLR) significantly reduce file size while maintaining quality [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/typography-and-fonts.mdx#colrbitmap-font-file)

- Pass `AbortSignal` to async Renderer methods (`loadFont`, `loadFonts`, `putPersistentImage`, `render`, `measure`, `renderAnimation`) to enable cancellation — useful for request timeouts or cleanup on request abort in serverless environments [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@takumi-rs/core/index.d.ts:L44-L61)

- Use structured `keyframes` objects with `render()` and `timeMs` for complex sequential animations with ffmpeg integration — enables frame-by-frame control and compatibility with external video encoding pipelines [source](/Users/syn/.skilld/references/@takumi-rs/core@1.8.4/docs/content/docs/keyframe-animation.mdx#structured-keyframes-objects)

- Call `clearImageStore()` after rendering when persistent images are no longer needed — prevents memory accumulation in long-running processes or when switching to different image sets [source](/Users/syn/src/github.com/synmux/syn-horse/node_modules/@takumi-rs/core/index.d.ts:L52)
<!-- /skilld:best-practices -->

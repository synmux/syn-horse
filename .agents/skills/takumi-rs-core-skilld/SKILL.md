---
name: takumi-rs-core-skilld
description: 'ALWAYS use when writing code importing "@takumi-rs/core". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi.'
metadata:
  version: 1.8.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-15
---

# kane50613/takumi `@takumi-rs/core@1.8.5`

**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.8.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — v1.8.x is a stable minor release line with no breaking changes or API renames from v1.0.

- NEW: `loadFonts()` — async bulk font loading with optional `AbortSignal` cancellation [source](./.skilld/pkg/./dist/export.d.ts#L25)

- NEW: `loadFontSync()` — synchronous font loading variant for blocking contexts [source](./.skilld/pkg/./dist/export.d.ts#L27)

- NEW: `putPersistentImage()` — persistent image storage with async loader support and cancellation [source](./.skilld/pkg/./dist/export.d.ts#L24)

- NEW: `clearImageStore()` — clears the persistent image storage [source](./.skilld/pkg/./dist/export.d.ts#L28)

- NEW: `ImageSourceLoader` type — async-capable variant allowing `data` to be a function returning a promise [source](./.skilld/pkg/./dist/export.d.ts#L5)

- NEW: `FontLoader` type — async-capable font definition with optional `key` property for font deduplication [source](./.skilld/pkg/./dist/export.d.ts#L8)

**Build improvements:** v1.8.0 built with nightly Rust toolchain and `panic=immediate-abort` to reduce binary size [source](./.skilld/releases/@takumi-rs/core@1.8.0.md#L11)

**Stable APIs (unchanged since v1.0):** `Renderer` class, core `render()` method, font/image handling

**Also changed:** `extractResourceUrls()` re-exported from `@takumi-rs/helpers` [source](./.skilld/pkg/./dist/export.d.ts#L4)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices for @takumi-rs/core v1.8.5

- Reuse the Renderer instance across multiple renderings — creating a new Renderer for each render call incurs unnecessary initialization overhead and resource allocation [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11)

- Initialize the WASM module and Renderer instance **outside** the fetch() handler in Cloudflare Workers — this prevents re-initialization on every request [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L21:49)

```tsx
import { initSync, Renderer } from "takumi-js/wasm"
import module from "takumi-js/wasm/takumi_wasm_bg.wasm"

initSync(module)
const renderer = new Renderer()

export default {
  fetch(request) {
    // Use renderer here, not inside fetch
  }
}
```

- Preload frequently used images like logos and backgrounds via `persistentImages` to avoid redundant image decoding during rendering [source](./.skilld/docs/content/docs/load-images.mdx:L27:64)

- Prefer TTF fonts over WOFF2 when possible — TTF is a raw format usable directly, while WOFF2 requires decompression before use [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L68:72)

- Stack filters (blur, drop-shadow) in a single node rather than splitting them across multiple nodes — composition layers created for filters consume additional memory [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L62:64)

- Add a custom `resourcesOptions.cache` Map when rendering multiple images with the same URLs to avoid re-fetching and re-decoding [source](./.skilld/docs/content/docs/load-images.mdx:L10:25)

- Always prefer `@takumi-rs/core` over `@takumi-rs/wasm` for rendering tasks that benefit from multiple threads — the native N-API binary uses Rayon multithreading [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L56:58)

- Add `@takumi-rs/core` to `serverExternalPackages` in Next.js config to prevent bundling the native binding and ensure correct module resolution [source](./.skilld/docs/content/docs/integration/nextjs.mdx:L16:28)

- In pnpm or yarn, add `public-hoist-pattern[]=@takumi-rs/core-*` to `.npmrc` when encountering "Cannot find native binding" errors — this enables hoisting of the native binary [source](./.skilld/docs/content/docs/troubleshooting.mdx:L37:42)

- Pass `persistedImages` to the Renderer **constructor**, not just to ImageResponse — this makes them available to `renderAnimation()` [source](./.skilld/discussions/discussion-375.md)

- Use structured `keyframes` objects with `render()` and `timeMs` for frame-by-frame control, or `renderAnimation()` for simple animated output — choose based on whether you need per-frame control or simple encoding [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L7:10)

- Use `render()` with ffmpeg when targeting video output or requiring complete control over the rendering pipeline — pipe raw RGBA frames directly instead of relying on built-in GIF/APNG encoding [source](./.skilld/docs/content/docs/keyframe-animation.mdx:L208:266)

- Set `text-overflow: ellipsis` with `line-clamp` to automatically handle multiline text truncation — `white-space: nowrap` is not required and would prevent multiline handling [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L96:111)

- Use compiled Tailwind stylesheets via the `?inline` query in Vite-powered frameworks rather than the native `tw` prop parser — the parser has limitations and does not support all Tailwind features [source](./.skilld/docs/content/docs/tailwind-css.mdx:L10:44)
<!-- /skilld:best-practices -->

---
name: takumi-rs-wasm-skilld
description: 'ALWAYS use when writing code importing "@takumi-rs/wasm". Consult for debugging, best practices, or modifying @takumi-rs/wasm, takumi-rs/wasm, takumi-rs wasm, takumi rs wasm, takumi.'
metadata:
  version: 1.2.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-17
---

# kane50613/takumi `@takumi-rs/wasm@1.2.1`

**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.2.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/wasm` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/wasm` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents breaking changes and new APIs in @takumi-rs/wasm v1.x compared to v0.x.

### Breaking Changes

- BREAKING: `display` property defaults to `inline` instead of `flex` — v1 changed the default to align with CSS specification. Existing flexbox layouts will render as inline unless explicitly set to `display: flex` or `flex` class [source](./../docs/content/docs/upgrade/v1.mdx:L18:36)

- BREAKING: Image format options now use lowercase strings only — v1 standardised format parameters to lowercase for consistency with CSS ecosystem. Code using `"WebP"`, `"JPEG"`, `"PNG"` will compile but produce unexpected results [source](./../docs/content/docs/upgrade/v1.mdx:L75:83)

- BREAKING: Import path changed from `@takumi-rs/image-response` to `takumi-js/response` — v1 unified runtime detection to automatically use the best bindings for your environment (Node.js, Workers, etc.) without manual binding selection [source](./../docs/content/docs/upgrade/v1.mdx:L40:48)

- BREAKING: `putPersistentImage()` signature changed — second argument must now be an `ImageSource` object `{ src, data }` instead of raw `Buffer`. Code passing raw buffers will not compile [source](./../docs/content/docs/upgrade/v1.mdx:L85:94)

- BREAKING: All previously deprecated types and functions removed — v1 removed deprecated exports from `@takumi-rs/core`. Using removed APIs will fail at compile time [source](./../docs/content/docs/upgrade/v1.mdx:L96:98)

### New APIs and Options

- NEW: `emoji` option for `ImageResponse` — allows specifying custom emoji providers (`"twemoji"` default or `"from-font"` to use an emoji font loaded in the fonts option) [source](./../docs/content/docs/upgrade/v1.mdx:L50:72)

**Also changed:** Unified runtime detection now handles Node.js, Workers, and other environments automatically

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## @takumi-rs/wasm Best Practices

## Best Practices

- Use the bundler-specific entry points (`./auto`, `./vite`, `./node`, `./next`) instead of the default export — each handles WASM instantiation optimally for its target environment, with vite's export automatically falling back to filesystem reads during SSR and fetch requests in browsers [source](./.skilld/pkg-wasm/package.json:L31:71)

- Call `extractResourceUrls()` on your JSX tree first, then fetch those resources externally before rendering — this prevents the renderer from blocking on network requests and allows parallel fetching of multiple images [source](./dist/export.d.mts:L1)

- Pass external image data via `fetchedResources` in render options, not inline URLs — the renderer can only use pre-fetched `ImageSource` objects with `{ src: string; data: ByteBuf }` tuples, making external fetching a prerequisite for any remote image [source](./dist/export.d.mts:L34:37)

- For animations with persisted images, pass `persistentImages` to the `Renderer` constructor, not to the animation render call — the renderer maintains a persistent image store across renders, and images registered at construction time are available to all subsequent `renderAnimation()` calls without re-registration [source](./.skilld/discussions/discussion-375.md:L14:18)

- Structure keyframes using `KeyframesRuleList` (array of `{ name, keyframes }` objects) rather than simple object notation for complex animations — the array format allows multiple keyframes for the same property and clearer semantics [source](./dist/export.d.mts:L6:14)

- Load fonts before rendering, either via the constructor's `fonts` option or the `loadFont()` method — the renderer requires fonts to be registered before attempting to render text that uses them, and missing fonts cause render failures rather than fallbacks [source](./dist/export.d.mts:L142:143)

- Enable `loadDefaultFonts: true` in `ConstructRendererOptions` if you're not providing custom fonts — the renderer has sensible defaults that prevent crashes when fonts are unavailable, avoiding the need to manually register a fallback font [source](./dist/export.d.mts:L144:147)

- Import Tailwind v4 stylesheets with `?raw` query parameter after generating them with the Tailwind CLI, then pass as a string in the `stylesheets` array — Takumi now parses Tailwind v4's `@theme` and custom variables directly from the generated CSS file [source](./.skilld/issues/issue-566.md:L36:39)

- Use `shiki-image` library for syntax-highlighted code blocks in generated images — it's the recommended solution for rendering code with language-specific highlighting, as raw `<code>` tags produce unformatted text [source](./.skilld/discussions/discussion-369.md:L26:27)

- Call the `measure()` method on your node tree before rendering to inspect layout dimensions and text runs — this returns detailed bounding box and transform information useful for debugging layout issues or conditionally adjusting content based on measured sizes [source](./dist/export.d.mts:L192)

- Leverage the built-in Unicode support for RTL languages and complex scripts like Thai diacritics — Takumi handles sunken vowels and right-to-left text better than Satori due to its HarfBuzz-backed text shaping, making it suitable for multilingual OG image generation [source](./.skilld/discussions/discussion-235.md:L16:17)

- Use the `measure()` method with `devicePixelRatio` matching your render settings to verify layout is correct before committing pixels — pixel-perfect layout depends on consistent DPI scaling between measurement and rendering, preventing off-by-one crops or misaligned text [source](./dist/export.d.mts:L53)

- Call `clearImageStore()` between distinct render operations to prevent image cache bloat — persistent images remain in memory across renders; manual cleanup is required if you're rendering many different images in a single worker invocation to avoid memory pressure [source](./dist/export.d.mts:L180)
<!-- /skilld:best-practices -->

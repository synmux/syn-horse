---
name: takumi-rs-core-skilld
description: 'ALWAYS use when writing code importing "@takumi-rs/core". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi.'
metadata:
  version: 1.2.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-17
---

# kane50613/takumi `@takumi-rs/core@1.2.1`

**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.2.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for @takumi-rs/core — prioritizing the major v0.x → v1.x migration.

## Breaking Changes in v1.0.0

- BREAKING: `display` CSS default changed from `flex` to `inline` — silent breakage where container layouts no longer flexbox without explicit `display: flex` source

- BREAKING: `ImageResponse` import moved from `@takumi-rs/image-response` to `takumi-js/response` — code importing from old path will error source

- BREAKING: `TakumiError` type alias removed (Rust) — replaced with `takumi::error::Error`; existing error type references will not compile source

- BREAKING: `Viewport` constructor tuple-based conversion removed (Rust) — must use explicit constructor instead of tuple shorthand source

- BREAKING: All previously deprecated exports removed from core package — migration to non-deprecated alternatives required before upgrading source

- BREAKING: Rust API `RenderOptions` now uses typed-builder pattern — compile-time validation; legacy option construction will not work source

## Removed APIs (v1.0.0)

- BREAKING: `FetchTaskCollection` removed (Rust) — use direct alternatives instead source

- BREAKING: `parse_svg_str()` removed (Rust) — use direct parsing alternatives source

- BREAKING: `SpacePair::from_reversed_pair()` removed (Rust) — construct directly instead source

## New APIs (v1.0.0+)

- NEW: `Renderer.measure(node, options)` — calculates layout dimensions of a node tree without rendering pixels; useful for dynamic layout calculations before final render source

## Also changed

Tailwind v4 @theme and custom variables now supported via stylesheets (fixed in v1.0.0) · Default display property alignment with CSS specifications

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices for @takumi-rs/core

## Best Practices

- Reuse the same `Renderer` instance across multiple rendering calls instead of creating new instances each time — renderer initialization carries overhead, and reusing avoids repeated setup costs [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L11:L20)

- Initialize the WASM module and renderer instance outside of request/fetch handlers — this prevents re-initialization on every request, which is a common bottleneck in serverless environments [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L21:L50)

- Preload frequently used images like logos or backgrounds using the `persistentImages` API instead of fetching during render — avoids redundant image decoding and lookup overhead [source](./.skilld/docs/content/docs/load-images.mdx:L27:L50)

- For Cloudflare Workers and edge runtimes, use `@takumi-rs/wasm` instead of `@takumi-rs/core` — the core package requires Node.js process APIs that aren't available in edge environments [source](./.skilld/discussions/discussion-282.md:L16:L24)

- Fonts must be explicitly loaded; Takumi does not use system fonts and will fail if no fonts are provided [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L7:L8)

- Prefer TTF fonts over WOFF2 for rendering performance — WOFF2 requires decompression before use, while TTF can be used directly. Only use WOFF2 if file size is a critical concern [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L68:L73)

- In Vite-powered frameworks (Nuxt, SvelteKit), import stylesheets with the `?inline` query parameter and pass via `stylesheets` option rather than relying on Takumi's native Tailwind parser — the native parser has limited feature coverage [source](./.skilld/docs/content/docs/tailwind-css.mdx:L14:L34)

- Pass `persistentImages` to the `Renderer` constructor, not just the `render()` method, when using animations — this ensures images are available during animation frame rendering [source](./.skilld/discussions/discussion-375.md:L26:L27)

- In Next.js projects, declare `@takumi-rs/core` in `serverExternalPackages` to prevent bundler conflicts and duplicate WASM symbol errors [source](./.skilld/docs/content/docs/integration/nextjs.mdx:L16:L28)

- Use static `import` statements for WASM modules rather than dynamic `import()` calls to avoid duplicate symbol definitions during bundling — bundlers can properly deduplicate static imports [source](./.skilld/issues/issue-332.md:L30:L34)

- Stack multiple filters (blur, shadow, etc.) on a single container node rather than nesting them — each filter requires a composition layer the size of the viewport, so combining them reduces memory overhead [source](./.skilld/docs/content/docs/performance-and-optimization.mdx:L62:L64)

- Use the `measure()` API to calculate node dimensions before rendering when you need layout information for subsequent logic — this is cheaper than full rendering [source](./.skilld/docs/content/docs/measure-api.mdx:L5:L30)

- Supply both `font-weight` and `font-variation-settings` for variable fonts — Takumi treats `font-weight` as a shorthand for the `wght` axis variation, making it more ergonomic than raw variation settings alone [source](./.skilld/docs/content/docs/typography-and-fonts.mdx:L34:L49)
<!-- /skilld:best-practices -->

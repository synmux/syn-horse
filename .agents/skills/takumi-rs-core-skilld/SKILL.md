---
name: takumi-rs-core-skilld
description: "ALWAYS use when writing code importing \"@takumi-rs/core\". Consult for debugging, best practices, or modifying @takumi-rs/core, takumi-rs/core, takumi-rs core, takumi rs core, takumi."
metadata:
  version: 1.6.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# kane50613/takumi `@takumi-rs/core@1.6.0`
**Tags:** beta: 1.0.0-beta.20, rc: 1.0.0-rc.17, latest: 1.6.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @takumi-rs/core` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @takumi-rs/core` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

**Note on Version Discrepancy:** The request was to generate API changes for `@takumi-rs/core` v1.6.0. However, the available release history in the `.skilld/releases/` directory only contains versions up to `0.73.1`. The following API changes are documented based on the latest available minor releases in the `0.x.x` range.

- DEPRECATED: `AnyNode` — replaced with strict `Node` type [source](./@takumi-rs/core@0.73.0.md:L8)

- BREAKING: `renderAnimation` — now takes "scenes" with keyframe animations instead of frames; original frame-by-frame encoding renamed to `encodeFrames` [source](./@takumi-rs/core@0.71.0.md:L8-L11)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- When animating with images, pass `persistedImages` to the `Renderer` constructor to make them available to `renderer.renderAnimation()` for optimized image handling during animation. [source](./.skilld/discussions/discussion-375.md#accepted-answer)

- For Next.js projects on Cloudflare Workers, refer to the official documentation for Edge Runtime / Browser usage to correctly configure `@takumi-rs/core` or consider using `@takumi-rs/wasm`. [source](./.skilld/discussions/discussion-282.md#accepted-answer)

- To prevent Vercel deployment failures with Next.js due to WASM module duplication, ensure your build process avoids declaring the same WASM symbol multiple times. [source](./.skilld/issues/issue-332.md#top-comments)

- When integrating Tailwind CSS v4 custom themes and variables, generate the CSS file using the Tailwind CLI and import it with `?raw` for proper parsing. [source](./.skilld/issues/issue-566.md#top-comments)

- Use the strict `Node` type instead of the deprecated `AnyNode` for improved type safety and adherence to modern API standards. [source](./.skilld/releases/@takumi-rs/core@0.73.0.md#takumi-rs/core@0.73.0)

- `renderAnimation` now uses a "scenes" approach with keyframe animations; for frame-by-frame rendering, use `encodeFrames`. [source](./.skilld/releases/@takumi-rs/core@0.71.0.md#takumi-rs/core@0.71.0)

- Utilize lossy WebP animation rendering to optimize file sizes for animated outputs. [source](./.skilld/releases/@takumi-rs/core@0.71.0.md#takumi-rs/core@0.71.0)

- Be aware that secure `ArrayBuffer` memory accessing was implemented in v0.70.0, suggesting more robust memory handling for data operations. [source](./.skilld/releases/@takumi-rs/core@0.70.0.md#takumi-rs/core@0.70.0)

- For advanced code block highlighting within generated images, `shiki-image` is a recommended integration tool. [source](./.skilld/discussions/discussion-369.md#accepted-answer)

- To correctly display Unicode characters (e.g., Bengali), explicitly load a font that contains the required glyphs. [source](./.skilld/discussions/discussion-642.md#top-comments)

- Thoroughly test `mix-blend-mode` effects, especially `plus-lighter`, `plus-darker`, and text rendering with blending, due to potential rendering inconsistencies and bugs. [source](./.skilld/issues/issue-644.md#text-glyphs-become-cut-off-when-mix-blend-mode-is-applied)

- When deploying to Cloudflare Workers, keep `@takumi-rs/core` up-to-date and be mindful of WebAssembly errors (e.g., "Wasm code generation disallowed by embedder") that can arise from version incompatibilities. [source](./.skilld/issues/issue-169.md#cloudflare-workers-webassembly-error-with-0.29)

- When using `@takumi-rs/core` in a Next.js project, explicitly add `@takumi-rs/core` to `serverExternalPackages` in `next.config.ts` for proper server-side rendering. [source](./.skilld/references/@takumi-rs/core@1.6.0/docs/content/docs/integration/nextjs.mdx#mark-takumi-core-as-a-server-external-package)

- For optimal performance when loading images and fonts, leverage the `Renderer` constructor for persistent images and `loadFonts` for bulk font loading, and `loadFontSync` when synchronous loading is feasible. [source](./.skilld/pkg/./dist/export.d.ts:L24:L27)
<!-- /skilld:best-practices -->

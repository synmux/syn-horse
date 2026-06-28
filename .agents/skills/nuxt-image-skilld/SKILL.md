---
name: nuxt-image-skilld
description: 'ALWAYS use when writing code importing "@nuxt/image". Consult for debugging, best practices, or modifying @nuxt/image, nuxt/image, nuxt image, image.'
metadata:
  version: 2.0.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt/image `@nuxt/image@2.0.0`

**Tags:** rc: 1.0.0-rc.3, alpha: 2.0.0-alpha.1, latest: 2.0.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/image` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/image` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Provider API — All providers now require `defineProvider` wrapper for type-safe configuration [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#provider-api)

- BREAKING: `layer0` and `edgio` providers — These deprecated providers have been removed [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#removed-providers)

- BREAKING: URL formatters — Custom providers using `joinWith` must now use `formatter` function with `createOperationsGenerator` [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#url-formatters)

- BREAKING: Screen sizes — Default screen sizes now match Tailwind CSS; `xs` (320px) and `xxl` (2560px) have been removed [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#screen-sizes)

- BREAKING: Removed utilities — Several unused runtime utilities have been removed; check direct imports [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#removed-utilities)

- NEW: `defineProvider` — Use `defineProvider` for type-safe image provider configuration [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#typed-providers)

- NEW: Typed composables — `$img` helper and `useImage()` composable now have full type inference [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#typed-composables)

- NEW: Server-side utilities — Image helpers can now be used directly in Nitro server endpoints [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#server-side-utilities)

- NEW: `<NuxtImg>` template refs — Exposes underlying `<img>` element via `useTemplateRef()` [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#template-refs)

- NEW: Typed slots — `<NuxtImg>` and `<NuxtPicture>` now have properly typed default slots [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#typed-slots)

- NEW: Shopify provider — Added new image provider for Shopify stores [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#new-providers)

- NEW: GitHub provider — Added new image provider for GitHub avatars and user content [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#new-providers)

- NEW: Custom image directories in layers — Support for organizing images in modular projects [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#better-layer-support)

- NEW: IPX v3 — Upgraded to IPX v3 for better performance and `sharp` binary handling [source](./.skilld/repos/nuxt/image/releases/v2.0.0.md#ipx-v3)

**Also changed:** `ipx`: Pass all options changed in v1.0.0 [source](./.skilld/repos/nuxt/image/releases/CHANGELOG.md#v100) · `ipx` migrate to v2 in v1.0.0-rc.3 [source](./.skilld/repos/nuxt/image/releases/CHANGELOG.md#v100-rc3) · `sizes` default changed to responsive-first in v1.0.0-rc.2 [source](./.skilld/repos/nuxt/image/releases/CHANGELOG.md#v100-rc2)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Avoid new Netlify Large Media configuration for `nuxt/image` as it is deprecated; existing configurations will continue to work but new setups are not recommended. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/netlify.md:L62)

- Prefer explicitly providing the `url` property for the Cloudimage provider over using a `token` when needing a custom CDN hostname or to bypass dynamic URL building. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/cloudimage.md:L96)

- Whitelist external hostnames in your Nuxt configuration when using external URLs with Vercel or AWS Amplify providers to ensure images outside the `public/` directory can be optimized and to prevent abuse. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/vercel.md:L21)

- Utilize Imgix's `auto` parameter to automatically apply the best image format and compression, enhancing performance and optimizing image delivery. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/imgix.md:L42)

- Avoid explicitly setting the `quality` attribute when using the ImageEngine provider; ImageEngine automatically adapts image quality based on the visitor's device, browser, and network conditions for optimal delivery. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/imageengine.md:L49)

- To completely disable ImageEngine optimizations for a specific image, use `:modifiers="{ passThrough: 'true' }"` instead of manually setting format and quality to ensure the unaltered image is served. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/imageengine.md:L49)

- Employ Gumlet's `format=auto` parameter to enable automatic format selection and compression, which helps deliver optimized images tailored to user devices. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/3.providers/gumlet.md:L37)

- Always register custom image providers within the `nuxt.config` under `image.provider` after their creation to ensure they are properly integrated into the Nuxt Image module. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/4.advanced/1.custom-provider.md:L50)

- Store static images intended for use with the default provider in the `public/` directory of your project, and reference them using an absolute path in the `src` attribute. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/1.get-started/3.providers.md:L22)

- Provide the `alt` attribute for all `<NuxtImg>` and `<NuxtPicture>` components; the text should describe the image content or its link destination for accessibility. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/2.usage/1.nuxt-img.md:L102)

- Leverage the `custom` prop on `<NuxtImg>` when implementing custom functionalities, such as placeholders, as it disables default rendering and allows full control over image display. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/2.usage/1.nuxt-img.md:L41)

- Configure `image.domains` to whitelist external hostnames if you intend to optimize images from external websites; this security measure prevents potential abuse of external URLs. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/1.get-started/2.configuration.md:L85)

- Utilize the `nonce` prop on `NuxtImg` to enhance Content Security Policy (CSP) without resorting to the less secure `unsafe-inline` directive. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/2.usage/1.nuxt-img.md:L386)

- For Nuxt 3, ensure that `/nuxt-icon.png` is placed inside the `public/` directory to make the `<NuxtImg src="/nuxt-icon.png" />` example work correctly with the default provider. [source](./.skilld/references/@nuxt/image@2.0.0/docs/content/2.usage/1.nuxt-img.md:L34)

<!-- /skilld:best-practices -->

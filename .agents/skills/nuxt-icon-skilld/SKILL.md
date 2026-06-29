---
name: nuxt-icon-skilld
description: "ALWAYS use when writing code importing \"@nuxt/icon\". Consult for debugging, best practices, or modifying @nuxt/icon, nuxt/icon, nuxt icon, icon."
metadata:
  version: 2.2.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# nuxt/icon `@nuxt/icon@2.2.5`
**Tags:** latest: 2.2.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/icon` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/icon` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- BREAKING: Nuxt v4 requirement in v2.0.0 — module no longer supports Nuxt 3, requires `nuxt@^4.4.8` [source](./.skilld/releases/v2.0.0.md)

- NEW: `customCollections[].scan` option (v2.1.0) — scans nested subfolders recursively for custom icon collections without needing to manually specify each folder [source](./.skilld/releases/v2.1.0.md)

- NEW: `customCollections[].recursive` option (v1.10.0+) — enables scanning of nested subdirectories within custom collection directories; off by default, requires explicit enablement in config [source](./.skilld/releases/v1.10.0.md)

- NEW: `customCollections[].normalizeIconName` option (v1.10.0) — controls whether custom icon names are auto-normalized to kebab-case; defaults to `true` for backwards compatibility but will flip to `false` in next major version [source](./.skilld/releases/v1.10.0.md)

- NEW: `:customize="false"` prop (v1.12.0) — allows disabling global customization function on per-icon basis when using `<Icon :customize="false" />` [source](./.skilld/releases/v1.12.0.md)

- NEW: IconifyJSON custom collections (v1.12.0) — custom collections can now accept a full `IconifyJSON` object with `{ icons, width, height }` instead of requiring filesystem paths [source](./.skilld/releases/v1.12.0.md)

- NEW: `provider: 'none'` mode (v1.13.0) — disables all runtime icon fetching and only uses icons from client bundle; useful for completely static icon scenarios [source](./.skilld/releases/v1.13.0.md)

- BREAKING: CSS `cssLayer` configuration for Tailwind v4 (v2.0.0+) — when using Tailwind CSS v4 with `css` mode, must explicitly set `icon.cssLayer` in `app.config.ts` to specify which CSS layer icons inject into [source](./.skilld/releases/v2.0.0.md)

- NEW: `serverBundle.remote` option — v1.2.0+ added ability to fetch icons from remote CDN (`jsdelivr`, `unpkg`, `github-raw`) instead of bundling locally; set `icon.serverBundle: { remote: 'jsdelivr' }` to enable [source](./.skilld/releases/v1.2.0.md)

- NEW: Test environment icon bundling — v2.0.0+ supports conditional bundling for component tests via `NODE_ENV === 'test'` to enable client bundle while disabling network fetching [source](./.skilld/releases/v2.0.0.md)

**Also changed:** `app.config.ts` required for icon config (not `nuxt.config.ts`) · `Icon` component auto-imports · `@iconify/json` not recommended for large icon sets · Hydration mismatch fixes in v1.12.0 for SSR/CSR drift
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Prefer CSS mode over SVG mode as the default rendering strategy — it's the recommended approach and works best with Tailwind CSS for fine-grained styling control [source](../../../../../../node_modules/@nuxt/icon/README.md#usage-)

- Install specific icon collections locally using `@iconify-json/collection-name` instead of the monolithic `@iconify/json` package — this avoids unnecessary bundle bloat and improves build performance [source](../../../../../../node_modules/@nuxt/icon/README.md#iconify-dataset)

- Configure `serverBundle` to `'auto'` or `'remote'` when deploying to serverless/worker environments like Cloudflare Workers — the auto mode intelligently selects local bundling for traditional Node servers and remote CDN fetching for memory-constrained environments [source](../../../../../../node_modules/@nuxt/icon/README.md#server-bundle-mode-auto)

- Use `createResolver()` from `nuxt/kit` when defining custom collection paths to ensure icons resolve correctly in extendable layers and monorepos — relative path resolution depends on this helper [source](../../../../../../node_modules/@nuxt/icon/README.md#custom-local-collections)

- Avoid dynamically constructing icon names with template literals like `` `prefix:${value}` ``; use ternary expressions instead to enable static icon detection during the build — static analysis cannot detect dynamic names [source](../../../../../../node_modules/@nuxt/icon/README.md#scan-components)

- Set `normalizeIconName: false` in custom collections when using case-sensitive icon names (e.g., `FooBar.svg`) — the default true enforces kebab-case normalization for backward compatibility [source](../../../../../../node_modules/@nuxt/icon/README.md#case-sensitive-custom-collections)

- Include `fill="currentColor"` in custom SVG icon definitions to enable CSS-based colorization in CSS mode — this attribute generates the mask-image CSS rules needed for color inheritance [source](./.skilld/repos/nuxt/icon/issues/issue-402.md#top-comments)

- Configure `cssLayer` in `app.config.ts` when using Tailwind CSS v4 to prevent CSS cascade conflicts — ensures icon styles load into the correct cascade layer [source](../../../../../../node_modules/@nuxt/icon/README.md#tailwindcss-v4)

- Use `provider: 'server'` with explicit `serverBundle: false` when building single-page applications (SPA) that need custom icon collections served from server endpoints — this ensures custom icons remain available in SPA deployments where the default API provider cannot serve them [source](./.skilld/repos/nuxt/icon/issues/issue-492.md)

- Define icon aliases in `app.config.ts` instead of hardcoding full icon names throughout your components — aliases centralise icon definitions and make swapping implementations easier [source](../../../../../../node_modules/@nuxt/icon/README.md#icon-customization)

- Install icon collections locally before configuring them in `clientBundle.icons` or enabling `clientBundle.scan` — the build process requires the collection packages present to extract icon data; network fetching is not performed during build [source](./.skilld/repos/nuxt/icon/issues/issue-245.md#top-comments)

- Switch to `mode: 'svg'` when you require full SVG manipulation capabilities or need fine-grained colour control on custom icons without fill attribute constraints — CSS mode enforces certain SVG processing that can strip custom attributes [source](./.skilld/repos/nuxt/icon/issues/issue-402.md#top-comments)

- Use `serverBundle: { remote: 'jsdelivr' }` (or `unpkg` / `github-raw`) when bundle size is critical in serverless deployments — remote CDN fetching trades initial request latency for smaller server bundle size [source](../../../../../../node_modules/@nuxt/icon/README.md#server-bundle-mode-remote)

- Enable `clientBundle.scan: true` in combination with explicit `clientBundle.icons: [...]` to bundle statically-detected icons plus manually specified dynamic icons — scanning alone misses runtime-constructed names, so combine both for complete coverage [source](../../../../../../node_modules/@nuxt/icon/README.md#available-options)
<!-- /skilld:best-practices -->

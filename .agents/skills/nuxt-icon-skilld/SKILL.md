---
name: nuxt-icon-skilld
description: "ALWAYS use when writing code importing \"@nuxt/icon\". Consult for debugging, best practices, or modifying @nuxt/icon, nuxt/icon, nuxt icon, icon."
metadata:
  version: 2.3.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# nuxt/icon `@nuxt/icon@2.3.1`
**Tags:** latest: 2.3.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/icon` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/icon` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Requires Nuxt v4 — v2.0.0 upgraded the module to Nuxt v4, dropping support for Nuxt v3 [source](./.skilld/releases/v2.0.0.md)

- NEW: Custom collections can now use nested subfolders — v2.1.0 added support for scanning icon collections in nested subdirectories when using local custom collections [source](./.skilld/releases/v2.1.0.md)

**Also changed:** Icon collections library expanded with 44 new collections in v2.2.0 · CSS selector scoping fix for customize callback in v2.2.3 · h3 v2 compatibility fix in v2.2.3 · Client bundle discovery from rootDir/workspaceDir in v2.2.4
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `createResolver(import.meta.url)` with `resolve()` for custom collection directories — ensures paths work correctly in regular projects and when used as extendable layers by other Nuxt projects [source](./.skilld/pkg/README.md:L159:182)

- Install icon collections locally via `@iconify-json/*` packages — significantly faster than remote fetching and more reliable for both SSR and client-side [source](./.skilld/pkg/README.md:L102:108)

- Set `serverBundle: 'auto'` (default) for automatic environment detection — uses `local` bundling in standard environments and switches to `remote` for serverless/worker deployments like Cloudflare Workers [source](./.skilld/pkg/README.md:L409:411)

- Enable `cssLayer: 'base'` in app config for TailwindCSS v4 compatibility — prevents CSS layer conflicts and ensures proper style priority [source](./.skilld/pkg/README.md:L78:89)

- Use static icon names in templates for client bundle scanning to work — avoid dynamic construction like `` `carbon:${dark ? 'moon' : 'sun'}` ``, prefer ternary with literal values instead [source](./.skilld/pkg/README.md:L554:564)

- Set `normalizeIconName: false` to support case-sensitive custom collections — enables using `FooBar.svg` as `my-icon:FooBar` and is the planned default for future major versions [source](./.skilld/pkg/README.md:L254:277)

- Apply `fill="currentColor"` in custom SVG icons for CSS mode — generates the required `mask-*` CSS rules needed for icon colorization via Tailwind utilities [source](./.skilld/issues/issue-402.md:L59:63)

- Set `provider: 'server'` when building SPAs with `ssr: false` — ensures custom collections remain available client-side without needing server endpoints [source](./.skilld/pkg/README.md:L218:235)

- Combine `provider: 'none'` with client bundle and `scan: true` to disable all runtime icon fetching — useful for offline-first apps or when server endpoints are unavailable [source](./.skilld/pkg/README.md:L238:252)

- Configure `serverBundle.externalizeIconsJson: true` for slow/memory-intensive builds with large icon sets — moves JSON imports outside the bundle but requires Node.js support for JSON modules [source](./.skilld/pkg/README.md:L413:434)

- Use `clientBundle: { scan: true }` for SSR and component testing environments — automatic detection in client bundle is safer than relying on server endpoints [source](./.skilld/pkg/README.md:L649:680)

- Define icon customization functions in `app.config.ts` rather than components when applying consistent transforms — centralises SVG modifications (stroke width, colours, opacity) across the application [source](./.skilld/pkg/README.md:L350:362)

- Set `clientBundle.sizeLimitKb` to guard against unexpected bundle growth — fails the build if client bundle exceeds the threshold and catches over-bundling mistakes [source](./.skilld/pkg/README.md:L522:524)

- Use `mode: 'svg'` for custom icons requiring fine-grained colour control — enables direct `fill="currentColor"` rendering instead of CSS mask-based rendering [source](./.skilld/issues/issue-402.md:L68:77)

- Create icon aliases in `app.config.ts` to decouple component usage from collection names — makes it easier to swap icon sources without touching component code [source](./.skilld/pkg/README.md:L295:302)
<!-- /skilld:best-practices -->

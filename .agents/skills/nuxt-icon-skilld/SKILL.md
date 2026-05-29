---
name: nuxt-icon-skilld
description: "ALWAYS use when writing code importing \"@nuxt/icon\". Consult for debugging, best practices, or modifying @nuxt/icon, nuxt/icon, nuxt icon, icon."
metadata:
  version: 2.2.2
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt/icon `@nuxt/icon@2.2.2`
**Tags:** latest: 2.2.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/icon` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/icon` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Upgrade to nuxt v4 — This major upgrade in v2.0.0 requires updating Nuxt.js to version 4, which could introduce breaking changes across the application. [source](./.skilld/repos/nuxt/icon/releases/v2.0.0.md:L9)

- NEW: `Scan nested subfolders for custom collections` — New feature in v2.1.0 allows the module to scan nested subfolders within custom icon collection directories. This expands the flexibility of organizing custom icon assets. [source](./.skilld/repos/nuxt/icon/releases/v2.1.0.md#features)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `fill="currentColor"` in SVG to generate `mask-*` rules, ensuring proper CSS functionality for SVG icons [source](./.skilld/issues/issue-402.md:L63)

- Install specific `@iconify-json/*` packages for only the icon collections you require, rather than the full `@iconify/json` package, to avoid unnecessary bundle size increase [source](./.skilld/issues/issue-245.md:L43:55)

- Avoid relying on `@iconify/vue` for internal icon rendering; the Iconify author recommends `iconify-icon` for better hydration and overall stability. This suggests a more robust internal approach for the library [source](./.skilld/issues/issue-101.md:L24)

Note: Due to limited relevant documentation found within the specified paths (`./.skilld/docs/`, `./.skilld/issues/`, `./.skilld/releases/`), only 3 best practice items could be confidently sourced and included, rather than the requested 14. The `index.md` file in the docs path contained unrelated content.
<!-- /skilld:best-practices -->

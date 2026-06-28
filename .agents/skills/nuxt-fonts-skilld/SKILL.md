---
name: nuxt-fonts-skilld
description: 'ALWAYS use when writing code importing "@nuxt/fonts". Consult for debugging, best practices, or modifying @nuxt/fonts, nuxt/fonts, nuxt fonts, fonts.'
metadata:
  version: 0.14.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# nuxt/fonts `@nuxt/fonts@0.14.0`

**Tags:** latest: 0.14.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxt/fonts` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxt/fonts` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `defaults.formats` — v0.14.0 default font format is now `woff2` only. To restore previous behavior, explicitly set `formats: ['woff2', 'woff', 'ttf']`. [source](./.skilld/repos/nuxt/fonts/releases/v0.14.0.md:L13-L20)

- NEW: `npm` provider — new built-in provider in v0.14.0 to resolve fonts from `node_modules`. [source](./.skilld/repos/nuxt/fonts/releases/v0.14.0.md#resolve-fonts-from-node_modules)

- NEW: `defaults.formats` option — v0.14.0 introduces explicit control over resolved font formats via `defaults.formats`. [source](./.skilld/repos/nuxt/fonts/releases/v0.14.0.md#font-format-resolution)

- NEW: `families[].providerOptions` — v0.14.0 allows passing provider-specific options when configuring individual font families. [source](./.skilld/repos/nuxt/fonts/releases/v0.14.0.md#provider-specific-font-family-options)

- NEW: `throwOnError` option — v0.14.0 adds `throwOnError` option to configure whether font resolution errors should throw or warn. [source](./.skilld/repos/nuxt/fonts/releases/v0.14.0.md#throwonerror-option)

- NEW: `fonts:public-asset-context` hook — new hook added in v0.13.0. [source](./.skilld/repos/nuxt/fonts/releases/v0.13.0.md:L11)

- BREAKING: Default font weight — v0.12.0 changed default font weight to `400 700`. [source](./.skilld/repos/nuxt/fonts/releases/v0.12.0.md:L110)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Prioritize `woff2` format by default, as it's universally supported and reduces CSS size, making it the default resolution format for `@nuxt/fonts`. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/5.upgrade.md#default-font-format-is-now-woff2-only`]

- Leverage automatic `@font-face` generation by simply declaring `font-family` in your CSS, allowing Nuxt Fonts to handle source paths, `font-display`, `unicode-range`, `font-weight`, and `font-style` automatically. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/2.advanced.md#how-it-works`]

- Utilize font fallback metrics to minimize Cumulative Layout Shift (CLS) by allowing Nuxt Fonts to 'morph' local system fonts to match web font sizes. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/2.advanced.md#creates-font-fallback-metrics`]

- Provide generic font families (e.g., `serif`, `sans-serif`) in your `font-family` declarations to enable Nuxt Fonts to generate more effective fallback metrics using appropriate system fonts. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/2.advanced.md#creates-font-fallback-metrics`]

- Rely on build-time font inclusion, as Nuxt Fonts automatically copies all used fonts into the build, serves them with long-lived cache headers, and eliminates external requests for improved performance. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/2.advanced.md#include-fonts-in-build`]

- Configure global font options efficiently using `fonts.defaults` in `nuxt.config.ts` to set common `weights`, `styles`, and `subsets` for all fonts project-wide. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#defaults`]

- Use the `100 900` range (e.g., `'100 900'`) for `weights` when defining variable fonts, ensuring proper resolution and full variability within the specified range. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#weights`]

- Define specific font options with `fonts.families` for fine-grained control over individual font families, allowing overrides of global defaults and specifying `provider`, `src`, or `global` settings. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#families`]

- Set `global: true` within a font's `families` configuration to ensure its `@font-face` declaration is injected regardless of direct usage in project CSS, useful for critical system fonts. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#global`]

- Explicitly disable unused font providers (e.g., `google: false` in `fonts.providers`) to improve build performance and reduce unnecessary network requests or bundle size. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#providers`]

- Prioritize font resolution by customizing the `fonts.priority` array in `nuxt.config.ts` to ensure preferred providers (e.g., local assets or specific CDNs) are checked first. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#priority`]

- Avoid setting `processCSSVariables: true` for Tailwind v4 support after `@nuxt/fonts` v0.11.0, as it's no longer needed or recommended and can introduce performance overhead. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/2.configuration.md#processcssvariables`]

- Do not use inline styles with `font-family` in your Vue `<template>` for font optimization, as Nuxt Fonts primarily processes CSS stylesheets. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/3.usage.md#pure-css`]

- Use the `npm` provider for self-hosting fonts from npm packages, allowing `@nuxt/fonts` to automatically resolve and include them locally from `node_modules` during the build process. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/4.providers.md#npm`]

- Name local font files descriptively (e.g., `font-name-700-italic-cyrillic.woff2`) to allow the `local` provider to automatically detect and apply correct weight, style, and subset properties. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/4.providers.md#local`]

- Control font format resolution with `defaults.formats` in `nuxt.config.ts` if you need to support legacy browsers that require formats other than the default `woff2` (e.g., `['woff2', 'woff', 'ttf']`). [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/5.upgrade.md#font-format-resolution`]

- Consider enabling `throwOnError: true` (experimental) in `nuxt.config.ts` to convert font resolution warnings into errors, which can be beneficial for strict CI/CD environments. [source: `./.skilld/references/@nuxt/fonts@0.14.0/docs/content/1.get-started/5.upgrade.md#throwonerror-option`]

<!-- /skilld:best-practices -->

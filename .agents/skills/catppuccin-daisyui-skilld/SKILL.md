---
name: catppuccin-daisyui-skilld
description: "ALWAYS use when writing code importing \"@catppuccin/daisyui\". Consult for debugging, best practices, or modifying @catppuccin/daisyui, catppuccin/daisyui, catppuccin daisyui, daisyui."
metadata:
  version: 2.1.1
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# catppuccin/daisyui `@catppuccin/daisyui@2.1.1`
**Tags:** latest: 2.1.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @catppuccin/daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @catppuccin/daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `Upgrade to DaisyUI v5` — v2.0.0 upgraded the underlying DaisyUI dependency to v5, which may cause silent breakage or require migration steps if existing DaisyUI components are used directly [source](./.skilld/repos/catppuccin/daisyui/releases/v2.0.0.md:L10)

- NEW: `CDN Usage` — v2.1.0 introduced support for CDN usage, allowing direct linking of CSS files [source](./.skilld/repos/catppuccin/daisyui/releases/v2.1.0.md:L9)

**Also changed:** `customizable semantic colors` new v1.1.0 · `pick accent color` new v1.0.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `createCatppuccinPlugin()` for integrating Catppuccin themes with DaisyUI, exporting it as the default plugin in a dedicated configuration file [source](./node_modules/@catppuccin/daisyui/README.md#configuration)

- Create separate theme configuration files (e.g., `catppuccinTheme.latte.ts`) for each Catppuccin flavor to promote modularity and easier management of multiple themes [source](./node_modules/@catppuccin/daisyui/README.md#configuration)

- Leverage `AccentName`, `MonochromaticName`, and `FlavorName` types from `@catppuccin/palette` when defining theme options to ensure type safety and restrict choices to valid Catppuccin palette names [source](./node_modules/@catppuccin/daisyui/dist/index.d.ts:L3-L4)

- Customize specific component colors using `CustomThemeOptions` within `createCatppuccinPlugin()` for fine-grained control while maintaining the overall Catppuccin aesthetic [source](./node_modules/@catppuccin/daisyui/dist/index.d.ts:L32-L33)

- Configure `daisyOptions` (e.g., `default`, `prefersdark`, `root`) when calling `createCatppuccinPlugin()` to control default theme behavior, dark mode preference, and CSS variable scope [source](./node_modules/@catppuccin/daisyui/dist/index.d.ts:L37-L41)

- Add the `data-theme` attribute to the `html` tag to ensure themes are correctly applied by Daisy UI's theme system, especially when themes are not applying as expected [source](./.skilld/repos/catppuccin/daisyui/issues/issue-80.md#missing-step-on-the-documentation)

- Upgrade to `@catppuccin/daisyui` v2.x to ensure full compatibility and leverage features designed for DaisyUI v5 [source](./.skilld/repos/catppuccin/daisyui/issues/issue-59.md#feat-support-for-daisyui-5)

- Utilize `themes.css` for CDN usage when dynamic theme switching is required, as it includes all Catppuccin flavors without needing to combine multiple links manually [source](./.skilld/repos/catppuccin/daisyui/releases/CHANGELOG.md#211-2025-04-21)

- When targeting Daisy UI v4, import required functions from `@catppuccin/daisyui/legacy` to maintain compatibility [source](./node_modules/@catppuccin/daisyui/README.md:L72)

- Prefer explicitly setting an `accent` color in `createCatppuccinPlugin()` to gain precise control over the primary accent color of your chosen theme [source](./node_modules/@catppuccin/daisyui/dist/index.d.ts:L42)

- Implement `prefersdark: true` within `daisyOptions` to automatically apply the dark theme based on the user's system preference, enhancing user experience [source](./node_modules/@catppuccin/daisyui/dist/index.d.ts:L37-L41)

- For CDN usage, consider combining specific themes using the `cdn.jsdelivr.net/combine` syntax to optimize requests if only a subset of themes is needed [source](./node_modules/@catppuccin/daisyui/README.md#for-cdn)

- After installation, ensure both Tailwind CSS and Daisy UI are properly configured before importing `@catppuccin/daisyui` themes, as this package builds upon their setup [source](./node_modules/@catppuccin/daisyui/README.md#configuration)
<!-- /skilld:best-practices -->

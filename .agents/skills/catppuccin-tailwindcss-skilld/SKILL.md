---
name: catppuccin-tailwindcss-skilld
description: "ALWAYS use when writing code importing \"@catppuccin/tailwindcss\". Consult for debugging, best practices, or modifying @catppuccin/tailwindcss, catppuccin/tailwindcss, catppuccin tailwindcss, tailwindcss."
metadata:
  version: 1.0.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# catppuccin/tailwindcss `@catppuccin/tailwindcss@1.0.0`
**Tags:** latest: 1.0.0, beta: 1.0.0-beta.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @catppuccin/tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @catppuccin/tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `support Tailwind v4` — `@catppuccin/tailwindcss` now requires Tailwind CSS v4, which may introduce breaking changes for projects using older Tailwind versions. [source](./.skilld/repos/catppuccin/tailwindcss/releases/v1.0.0.md:L12)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Migrate to direct CSS import for Tailwind v4 compatibility: With the release of `@catppuccin/tailwindcss` v1.0.0, which supports Tailwind CSS v4, the recommended approach is to directly `@import` the desired Catppuccin flavour CSS files in your main stylesheet, as the traditional `tailwind.config.js` plugin configuration is no longer applicable. [source](./.skilld/releases/v1.0.0.md#v1.0.0-2025-07-26)

- Always use a custom prefix to prevent class name collisions: To avoid conflicts with default Tailwind utility classes (e.g., `text-base` changing from font-size to a Catppuccin color), configure `@catppuccin/tailwindcss` with a unique prefix, such as `ctp-`. This ensures Catppuccin styles are distinct and do not unintentionally override core Tailwind functionalities. [source](./.skilld/issues/issue-16.md#conflicting-text-base-class-when-no-prefix)

- Understand IDE limitations with Catppuccin color previews: Be aware that integrated development environment (IDE) color previews or IntelliSense might not accurately display Catppuccin colors. This is because these colors are often dynamically determined by CSS variables based on the active "flavour" class (e.g., `mocha`, `latte`) on parent elements, rather than being static, pre-defined hex values. [source](./.skilld/issues/issue-2.md#top-comments)

- Carefully manage custom dark mode variants with Catppuccin flavours: When defining custom dark mode variants or themes, ensure they are structured to allow `@catppuccin/tailwindcss` to correctly apply its flavour-specific CSS variables. Conflicts can arise if custom variants interfere with the `:root` element where Catppuccin sets its theme variables, potentially preventing the intended dark mode (e.g., Mocha) from activating. [source](./.skilld/issues/issue-37.md#the-dark-variant-is-not-correctly-applied-when-setting-a-custom-variant)

- Manually configure Catppuccin colors for `@tailwindcss/typography` integration: Catppuccin colors are not automatically injected into `@tailwindcss/typography` styles. For consistent theming within `prose` content, manually extend your Tailwind configuration's `theme` section to map Catppuccin colors to the typography plugin's customizable properties. [source](./.skilld/issues/issue-13.md#styles-break-when-using-with-tailwind-typography-plugin)

- Refer to the latest official documentation for installation instructions: Due to ongoing updates in Tailwind CSS and the `@catppuccin/tailwindcss` plugin, always consult the most current `README.md` or official documentation for up-to-date installation and usage instructions, especially when migrating between major Tailwind versions. [source](./.skilld/issues/issue-24.md#installation-instructions-update)

- Use "flavour" consistently when referring to Catppuccin themes: To maintain consistency with the official terminology of the Catppuccin project, always use the term "flavour" (e.g., `latte` flavour, `mocha` flavour) rather than "flavor" in your code, comments, and documentation. [source](./.skilld/issues/issue-21.md#about-england-english)

- Prefer the `mocha` flavour for optimal dark mode aesthetics and contrast: When choosing a dark mode theme, the `mocha` flavour is explicitly recommended for `@catppuccin/tailwindcss` due to its balanced color palette and excellent readability, although `frappe` or `macchiato` are also available options. [source](./.skilld/pkg/README.md#L16:19)

- Leverage Catppuccin-prefixed colors for seamless gradient creation: Utilize the full range of `ctp-` prefixed colors with Tailwind's gradient utilities. This allows for visually consistent and themed gradients throughout your application, such as `from-ctp-red-400 to-ctp-mauve-400`. [source](./.skilld/pkg/README.md#L30:33)

- Force specific Catppuccin flavours using parent classes for localized theming: For fine-grained control over theming or to implement a theme switcher, apply the desired flavour class (e.g., `latte`, `mocha`) directly to a parent HTML element. All nested elements using `ctp-` prefixed colors will then adopt that specific flavour's palette. [source](./.skilld/pkg/README.md#L37:40)

- Adhere to the four core Catppuccin flavours; custom palettes are not officially supported: The `@catppuccin/tailwindcss` plugin is designed to work exclusively with the four predefined Catppuccin flavours (`Latte`, `Frappé`, `Macchiato`, `Mocha`). Attempting to integrate or create custom palette variants is not a supported feature and goes against the plugin's core design. [source](./.skilld/issues/issue-17.md#custom-palette-hear-me-out)

- Ensure `tailwindcss` version compatibility with `v1.0.0` for Tailwind v4 projects: The `@catppuccin/tailwindcss` v1.0.0 release is specifically tailored for Tailwind CSS v4. When upgrading to v1.0.0, confirm that your project is also migrating to or already using Tailwind CSS v4 to ensure full compatibility and prevent unexpected styling issues. [source](./.skilld/releases/v1.0.0.md#v1.0.0-2025-07-26)

- Import flavour stylesheets individually for precise control over theme application: Explicitly import the desired Catppuccin flavour stylesheet (e.g., `@import "@catppuccin/tailwindcss/mocha.css";`) into your main CSS. This provides granular control over which theme is active and simplifies dynamic theme switching, rather than relying on a single entry point for all flavours. [source](./.skilld/pkg/README.md#L16:19)
<!-- /skilld:best-practices -->

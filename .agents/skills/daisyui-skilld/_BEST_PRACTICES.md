# Best Practices — daisyUI 5.6.10

- Declare themes in the main `@plugin "daisyui"` block before customizing them with `@plugin "daisyui/theme"` — this ensures theme names are registered and customizations apply correctly [source](./skilld/discussions/discussion-4365.md#accepted-answer)

- Use `--default` and `--prefersdark` flags when declaring themes to establish the default theme and dark mode auto-detection — omit `default: true` from individual theme blocks [source](./skilld/issues/issue-4488.md#top-comments)

- Customize font families with `--font-sans`, `--font-mono` in `@plugin "daisyui/theme"` blocks rather than using Tailwind's theme config directly — DaisyUI theme system ensures inheritance across all components [source](./skilld/discussions/discussion-4401.md#accepted-answer)

- Create custom color variables using `@plugin "daisyui/theme"` with `--color-*` naming convention — avoid duplicating the entire theme when adding just one or two custom colors [source](./skilld/discussions/discussion-4438.md#accepted-answer)

- Set custom CSS selectors for theme root with the `root` option if not using `:root` — useful for scoped component libraries or multiple theme systems on one page [source](./skilld/functions/pluginOptionsHandler.js:L9)

- Use `include` or `exclude` plugin options to load only needed components and reduce CSS bundle size — daisyUI generates CSS for ~70 components by default [source](./skilld/index.js:L17)

- Disable startup logs in production with `logs: false` option to reduce console noise in builds — logs are helpful during development only [source](./skilld/functions/pluginOptionsHandler.js:L14)

- Avoid using `<ol>` (ordered lists) in `.menu` components — Tailwind CSS preflight resets list styling, so numbered lists have no visual indicator; use `<ul>` instead [source](./skilld/discussions/discussion-4473.md#accepted-answer)

- Use `data-theme="theme-name"` attribute on any element to switch themes dynamically at runtime without data attributes on `:root` — provides flexible theme switching for nested components [source](./skilld/functions/pluginOptionsHandler.js:L29)

- Prefix daisyUI classes carefully — known issue exists where `rootcolor` CSS variable fallback is not prefixed, causing problems in production builds with Vite 8 [source](./skilld/issues/issue-4372.md)

- Apply CSS variable fallbacks in theme definitions using the pattern `var(--custom-var, var(--fallback-var))` — allows graceful degradation when a variable is not defined [source](./skilld/functions/pluginOptionsHandler.js:L30)

- Keep theme customizations in the `@plugin "daisyui/theme"` block instead of overriding in Tailwind's theme config — prevents conflicts and ensures daisyUI components inherit custom values [source](./skilld/discussions/discussion-4401.md)

- Use semantic HTML elements (`<button>`, `<dialog>`, `<details>`) for daisyUI components — they come with built-in accessibility features and proper focus handling [source](./skilld/releases/CHANGELOG.md:L44)

- Leverage `theme-controller` element pattern with input elements and theme switching — daisyUI automatically detects input values matching theme names for dynamic theme selection [source](./skilld/functions/pluginOptionsHandler.js:L25)

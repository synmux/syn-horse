---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.6.10
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# saadeghi/daisyui `daisyui@5.6.10`
**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.10

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## daisyUI v5 API Changes

This section documents version-specific API changes—prioritize recent major/minor releases.

## Breaking Changes (v4 → v5)

- BREAKING: `artboard` and `phone-*` classes removed — use Tailwind CSS `w-*` and `h-*` utilities instead (e.g., `w-[320px] h-[568px]` replaces `artboard phone-1`) [source](./.skilld/releases/CHANGELOG.md#artboard)

- BREAKING: `bottom-nav` component removed — use `dock` component instead, with `dock-xs/sm/md/lg` replacing `btm-nav-xs/sm/md/lg` and `dock-active` replacing `btm-nav-active` [source](./.skilld/releases/CHANGELOG.md#bottom-navigation)

- BREAKING: `card-bordered` renamed to `card-border` [source](./.skilld/releases/CHANGELOG.md#card)

- BREAKING: `form-control`, `label-text`, `label-text-alt` classes removed — use semantic `<fieldset>` with `class="fieldset"` and `<legend>` instead for better accessibility [source](./.skilld/releases/CHANGELOG.md#label)

- BREAKING: `btn-group` and `input-group` components removed — use `join` component with `join-item` class instead [source](./.skilld/releases/CHANGELOG.md#other-removals)

- BREAKING: `input-bordered` class removed — input now has border by default; use `input-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md#input)

- BREAKING: `select-bordered` class removed — select now has border by default (20rem default width); use `select-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md#select)

- BREAKING: `file-input-bordered` removed — file input has border by default now; use `file-input-ghost` to remove [source](./.skilld/releases/CHANGELOG.md#fileinput)

- BREAKING: `textarea-bordered` removed — textarea has border by default; use `textarea-ghost` to remove [source](./.skilld/releases/CHANGELOG.md#textarea)

- BREAKING: Avatar state classes renamed — `online` → `avatar-online`, `offline` → `avatar-offline`, `placeholder` → `avatar-placeholder` [source](./.skilld/releases/CHANGELOG.md#avatar)

- BREAKING: Menu item state classes renamed — `disabled` → `menu-disabled`, `active` → `menu-active`, `focus` → `menu-focus`; vertical menu no longer `w-full` by default [source](./.skilld/releases/CHANGELOG.md#menu)

- BREAKING: `tabs-lifted` renamed to `tabs-lift` [source](./.skilld/releases/CHANGELOG.md#tab)

- BREAKING: `table` hover class removed — use utility classes like `hover:bg-base-300` instead [source](./.skilld/releases/CHANGELOG.md#table)

- BREAKING: Button default height reduced; customizable via `--size-field` CSS variable [source](./.skilld/releases/CHANGELOG.md#button)

- BREAKING: Footer now vertical by default — add `footer-horizontal` for horizontal layout [source](./.skilld/releases/CHANGELOG.md#footer)

- BREAKING: `mockup-phone` classes renamed — `camera` → `mockup-phone-camera`, `display` → `mockup-phone-display` [source](./.skilld/releases/CHANGELOG.md#mockup)

- BREAKING: Stack sizing changed — set width/height on `.stack` container, not individual items [source](./.skilld/releases/CHANGELOG.md#stack)

- BREAKING: `stats` background now transparent — add `bg-base-100` if background colour needed [source](./.skilld/releases/CHANGELOG.md#stat)

- BREAKING: Chat bubble default colour changed from `neutral` to `base-300` — add `chat-bubble-neutral` to restore old colour [source](./.skilld/releases/CHANGELOG.md#chat)

- BREAKING: Label component refactored for form compatibility — now works directly with form elements in `<fieldset>` structure [source](./.skilld/releases/CHANGELOG.md#label)

- BREAKING: `mask-parallelogram` variants removed (`mask-parallelogram-2`, `mask-parallelogram-3`, `mask-parallelogram-4`) [source](./.skilld/releases/CHANGELOG.md#mask)

## New Components & Features

- NEW: `hover-3d` component for 3D card effects (v5.5.0) [source](./.skilld/releases/CHANGELOG.md#550)

- NEW: `text-rotate` component to rotate between multiple words (v5.5.0) [source](./.skilld/releases/CHANGELOG.md#550)

- NEW: Hover Gallery component (v5.1.0) [source](./.skilld/releases/CHANGELOG.md#510)

- NEW: FAB / Speed Dial component (v5.1.0) [source](./.skilld/releases/CHANGELOG.md#510)

- NEW: Styled native HTML `<select>` element (v5.1.0) — works in Chromium; other browsers use OS default [source](./.skilld/releases/CHANGELOG.md#510)

- NEW: `skeleton-text` variant for animated gradient text skeletons (v5.5.0) [source](./.skilld/releases/CHANGELOG.md#550)

## Modifiers & Variants

- NEW: `dropdown-close` modifier to force close a dropdown (v5.5.0) [source](./.skilld/releases/CHANGELOG.md#550)

- NEW: `is-drawer-open` and `is-drawer-close` variants to style elements based on drawer state; enables icon-only drawer sidebar (v5.2.0, enhanced v5.5.0) [source](./.skilld/releases/CHANGELOG.md#520)

- NEW: `tabs-top` and `tabs-bottom` positioning options (v5.1.0) [source](./.skilld/releases/CHANGELOG.md#510)

- NEW: `modal-start` and `modal-end` positioning options (v5.0.0) [source](./.skilld/releases/CHANGELOG.md#modal)

- NEW: `stack-bottom`, `stack-top`, `stack-start`, `stack-end` directional variants (v5.0.0) [source](./.skilld/releases/CHANGELOG.md#stack)

**Also changed:** Support for `prefers-reduced-motion` · CSS `@starting-style` for modal/dropdown · `popover` attribute support · CSS Anchor positioning for dropdowns (Chromium only) · `display` property instead of `visibility` · `form-control` replaced with `fieldset`/`legend` · Button `btn-soft` and `btn-dash` styles · Badge `badge-soft`, `badge-dash`, and `badge-xl` · `card-border`, `card-dash`, and card sizing (`card-xs/sm/md/lg/xl`) · `alert-outline`, `alert-dash`, `alert-soft`, `alert-vertical`, `alert-horizontal` · Collapse smooth transitions · Rating animation improvements · Print-friendly components (Divider, Steps, Timeline, Toggle, Radio, Checkbox) · New size tiers (`*-xl`, `*-lg`, `*-sm`, `*-xs`) across most components · Diff keyboard navigation · Radial Progress animation · Tooltip smooth transitions and `tooltip-content` class
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices — daisyUI 5.6.10

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
<!-- /skilld:best-practices -->

---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.5.23
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# saadeghi/daisyui `daisyui@5.5.23`
**Tags:** alpha: 5.0.0-alpha.61, beta: 5.5.1-beta.2, latest: 5.5.23

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `artboard` and `phone-*` classes removed (v5.0.0) — replaced by Tailwind `w-*` and `h-*` utilities. Use `w-[320px] h-[568px]` instead of `artboard phone-1` [source](./.skilld/releases/CHANGELOG.md#artboard)

- BREAKING: `bottom-nav` component removed (v5.0.0) — use `dock` component instead. Migrate `btm-nav-sm` to `dock-sm`, `btm-nav-active` to `dock-active` [source](./.skilld/releases/CHANGELOG.md#bottom-navigation)

- BREAKING: `avatar online` / `avatar offline` / `avatar placeholder` renamed (v5.0.0) — use `avatar-online`, `avatar-offline`, `avatar-placeholder` classes [source](./.skilld/releases/CHANGELOG.md#avatar)

- BREAKING: `card-bordered` renamed to `card-border` (v5.0.0) — update markup from `class="card card-bordered"` to `class="card card-border"` [source](./.skilld/releases/CHANGELOG.md#card)

- BREAKING: `input-bordered` class removed (v5.0.0) — input now has a border by default with 20rem width. Use `input-ghost` to remove the border [source](./.skilld/releases/CHANGELOG.md#input)

- BREAKING: `select-bordered` class removed (v5.0.0) — select now has a border by default with 20rem width. Use `select-ghost` to remove the border [source](./.skilld/releases/CHANGELOG.md#select)

- BREAKING: `file-input-bordered` removed (v5.0.0) — file input now has border by default. Use `file-input-ghost` if you want to remove the border [source](./.skilld/releases/CHANGELOG.md#fileinput)

- BREAKING: `menu disabled` / `active` / `focus` classes renamed (v5.0.0) — use `menu-disabled`, `menu-active`, `menu-focus` instead. Menu is no longer `w-full` by default [source](./.skilld/releases/CHANGELOG.md#menu)

- BREAKING: `textarea-border` removed (v5.0.0) — textarea now has a border by default. Use `textarea-ghost` if you want to remove the border [source](./.skilld/releases/CHANGELOG.md#textarea)

- BREAKING: `table` hover class removed (v5.0.0) — use `hover:bg-base-300` or other Tailwind hover utilities instead [source](./.skilld/releases/CHANGELOG.md#table)

- BREAKING: `tabs-lifted` renamed to `tabs-lift` (v5.0.0) — update from `class="tabs tabs-lifted"` to `class="tabs tabs-lift"` [source](./.skilld/releases/CHANGELOG.md#tab)

- BREAKING: `btn-ghost` hover style changed (v5.0.0) — no longer applies primary color by default. Use `btn-ghost btn-primary` and check hover state behaves as expected (shows original color on hover) [source](./.skilld/releases/CHANGELOG.md#button)

- BREAKING: Button default height reduced (v5.0.0) — height now customizable via `--size-field` CSS variable instead of hardcoded [source](./.skilld/releases/CHANGELOG.md#button)

- BREAKING: `footer` is now vertical by default (v5.0.0) — use `footer-horizontal` to make it horizontal. Migrate `<footer class="footer">` to `<footer class="footer md:footer-horizontal">` [source](./.skilld/releases/CHANGELOG.md#footer)

- BREAKING: `chat-bubble` default color changed (v5.0.0) — changed from `neutral` to `base-300`. Add `chat-bubble-neutral` to restore neutral color [source](./.skilld/releases/CHANGELOG.md#chat)

- BREAKING: `mockup-phone` classes renamed (v5.0.0) — `camera` becomes `mockup-phone-camera`, `display` becomes `mockup-phone-display` [source](./.skilld/releases/CHANGELOG.md#mockup)

- BREAKING: `stats` background color is now transparent (v5.0.0) — add `bg-base-100` if you need a background color [source](./.skilld/releases/CHANGELOG.md#stat)

- NEW: `hover-3d` component (v5.5.0) — creates a 3D card effect on hover [source](./.skilld/releases/CHANGELOG.md#550-2025-11-11)

- NEW: `text-rotate` component (v5.5.0) — rotates between multiple words with animation [source](./.skilld/releases/CHANGELOG.md#550-2025-11-11)

- NEW: `hover-gallery` component (v5.1.0) — displays a gallery that reveals on hover [source](./.skilld/releases/CHANGELOG.md#510-2025-09-01)

- NEW: `FAB` / Speed Dial component (v5.1.0) — floating action button with expanded menu [source](./.skilld/releases/CHANGELOG.md#510-2025-09-01)

**Also changed:** `skeleton-text` new variant · `dropdown-close` new modifier · `is-drawer-open` and `is-drawer-close` variants · native HTML `<select>` styled element (v5.1.0) · `prefers-reduced-motion` support for all animations · `alert-outline`, `alert-dash`, `alert-soft` · `alert-vertical`, `alert-horizontal` · `btn-dash`, `btn-soft`, `btn-xl` · `badge-dash`, `badge-soft`, `badge-xl` · `card-dash`, `card-xs/sm/md/lg/xl` · `card-compact` removed use `card-sm` · `card-bordered` renamed `card-border` · `file-input-xl` · `input-xl` · `kbd-xl` · `label` refactored for form compatibility · `loading-xl` · `mask-parallelogram*` removed · `menu-xl` · `modal-start`, `modal-end` · `radio-xl` · `range-xl` · `select-xl` · `stack` uses CSS grid with `stack-bottom/top/start/end` · `step-icon` class · `tab-xl`, `tabs-top`, `tabs-bottom` · `table-xl` · `toggle-xl`, `toggle-neutral` · `tooltip-content` class for HTML content · `dropdown` now uses CSS `@starting-style` and `display` instead of `visibility` · `modal` uses CSS `@starting-style` · `diff` requires `tabindex="0"` for iOS and keyboard navigation
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use semantic color names (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`, `base`) instead of Tailwind's raw color names for all components and utilities—this ensures theme changes propagate automatically across your entire site without element-by-element overrides [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/daisyui-colors-and-themes/+page.md#solution-semantic-color-names-and-css-variables)

- Apply theme customisation via `@plugin "daisyui/theme"` blocks to define variables per theme—enables switching between multiple complete design systems (light, dark, branded) without adding class names to any HTML elements [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md:L40:L70)

```css
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: #0d6efd;
  --color-primary-content: white;
}
```

- Define custom colour names in a `@theme` block before using them in daisyUI theme plugins—ensures Tailwind generates the utility classes and daisyUI can override them per theme [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md:L20:L35)

- Never use dynamic class name templates like `btn-{{ type }}` in HTML—Tailwind scans for literal class strings during the build, so computed class names generate no CSS, even if they worked in dev [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/most-common-mistake-when-using-tailwind-css/+page.md#the-mistake)

- Switch themes by setting `data-theme` on a parent element instead of changing classes—daisyUI uses CSS variable cascading to apply theme colours to all descendants without rebuilding the DOM [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md:L95:L110)

- Use the `theme-controller` class on checkbox or radio inputs for CSS-only theme toggling—pairs with `value` attribute to match a theme name; persist the choice in localStorage or a server session if needed [source](./.skilld/docs/src/routes/(routes)/components/theme-controller/+page.md#description)

- Customize component appearance via CSS variable overrides (e.g., `--color-primary`, `--radius-field`, `--size-selector`) rather than rebuilding utility classes—variables are the intent and maintainers ensure all components respond to them [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md:L40:L70)

- Guard dynamic Tailwind class names with a safelist in `tailwind.config.js`—lists literal classes or regex patterns that must survive purging when you can't hardcode them as strings [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/most-common-mistake-when-using-tailwind-css/+page.md#solution-2-a-safelist-file)

```js
module.exports = {
  safelist: [
    "btn-primary",
    { pattern: /bg-(red|green|blue)-(400|500|600)/ },
  ],
}
```

- Use logical margin and padding utilities (e.g., `ml`, `mr`) instead of `left`, `right` on daisyUI components—newer versions leverage logical properties for bidirectional (LTR/RTL) layout support [source](./.skilld/releases/v5.5.19.md)

- Apply `btn-disabled` class (not `disabled` attribute alone) when you need styled disabled buttons—the attribute disables interaction, the class ensures consistent visual feedback [source](./.skilld/issues/issue-3622.md)

- Define font families in theme plugins using `--font-*` variables rather than utility class overrides—ensures all text elements respect the theme's typography system [source](./.skilld/repos/saadeghi/daisyui/discussions/discussion-4401.md)

- Avoid arbitrary colour utilities like `bg-[#ff00ff]` for semantic state colours—use theme variables instead so theme switching actually changes the colour, not just the token name [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/daisyui-colors-and-themes/+page.md#semantic-color-names-make-more-sense)

- Read the official blog guides for framework-specific patterns (React, Vue, Svelte, etc.)—each framework has unique considerations for theme persistence, server-side rendering, and state management [source](./.skilld/docs/_INDEX.md)
<!-- /skilld:best-practices -->

---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.6.6
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-29
---

# saadeghi/daisyui `daisyui@5.6.6`
**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in daisyUI v5 — prioritizing recent major/minor releases and v4→v5 migration breaking changes that LLMs trained on v4 data will encounter.

### v5.6 New Components & Features

- NEW: `aura` component — wrapper for animated border glow effects with variants `aura-dual`, `aura-rainbow`, `aura-holo`, `aura-gold`, `aura-silver`, `aura-glow`, and sizes `xs` to `xl` [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#aura)

- NEW: `megamenu` component — navigation for large menus using Popover API with modifiers `megamenu-vertical`, sizes `xs` to `xl`, and support for wide/full-width layouts [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#megamenu)

- NEW: `otp` component — one-time password input with joined style, semantic colors, and sizes `xs` to `xl` [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#otp)

- NEW: `range-vertical` modifier — vertical range slider mode [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#better-sliders)

- NEW: `tooltip` alignment modifiers — `tooltip-start`, `tooltip-center`, `tooltip-end` for placement control on all tooltip directions [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#better-tooltips)

- NEW: `modal` Popover API support — use `[popover]`, `:popover-open`, `::backdrop` as alternative to dialog method [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#better-modals)

- NEW: `card` selectable states — support for `aria-checked`, nested checkbox/radio focus, pointer cursor, and checked outline [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#better-cards)

- NEW: `[aria-disabled="true"]` support for buttons — allows disabling elements that can't use native `disabled` attribute [source](./.skilld/references/daisyui@5.6.6/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md#improvements)

### v5.5 New Components & Features

- NEW: `hover-3d` component — creates a 3D card effect [source](./.skilld/releases/CHANGELOG.md#l150)

- NEW: `text-rotate` component — rotates between multiple words [source](./.skilld/releases/CHANGELOG.md#l150)

- NEW: `skeleton-text` variant — animated gradient text skeleton [source](./.skilld/releases/CHANGELOG.md#l151)

- NEW: `dropdown-close` modifier — forces dropdown to close on click [source](./.skilld/releases/CHANGELOG.md#l154)

### v5.1 New Components & Features

- NEW: `hover-gallery` component — interactive hover gallery [source](./.skilld/releases/CHANGELOG.md:L569)

- NEW: `fab` component (Speed Dial) — floating action button with multiple action buttons [source](./.skilld/releases/CHANGELOG.md:L570)

- NEW: `base-select` class — styled native HTML `<select>` element (Chromium-based browsers only; other browsers use OS default) [source](./.skilld/releases/CHANGELOG.md:L571)

- NEW: `prefers-reduced-motion` support — all animations now respect user motion preferences, showing static fallbacks [source](./.skilld/releases/CHANGELOG.md:L572)

- NEW: `is-drawer-open` and `is-drawer-close` variants — style elements based on drawer state; enables icon-only drawer sidebars [source](./.skilld/releases/CHANGELOG.md:L345)

### v5.0 Breaking Changes (v4 → v5 Migration)

- BREAKING: `artboard` and `phone-*` classes removed — use Tailwind `w-*` and `h-*` utilities instead (`artboard phone-1` becomes `w-[320px] h-[568px]`) [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#artboard)

- BREAKING: `avatar` state classes renamed — `online` → `avatar-online`, `offline` → `avatar-offline`, `placeholder` → `avatar-placeholder` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#avatar)

- BREAKING: `bottom-nav` component removed — replace with `dock` component; `btm-nav-*` → `dock-*`, `btm-nav-active` → `dock-active`, use `aria-disabled="true"` instead of `disabled` class [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#bottom-navigation)

- BREAKING: `card-bordered` renamed to `card-border` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#card)

- BREAKING: `card-compact` removed — use `card-sm` size instead [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#card)

- BREAKING: `btn` default height reduced — customizable via `--size-field` CSS variable [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#button)

- BREAKING: `btn-ghost` hover style changed — v4 forced primary color regardless of modifiers; v5 shows original color on hover, allowing customization like `btn btn-ghost btn-primary` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#button)

- BREAKING: `chat-bubble` default color changed from `neutral` to `base-300` — add `chat-bubble-neutral` class to restore v4 appearance [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#chat)

- BREAKING: `file-input-bordered` removed — file input has border by default; use `file-input-ghost` to remove border [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#fileinput)

- BREAKING: `input-bordered` removed — input has border by default; use `input-ghost` to remove border [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#input)

- BREAKING: `input` now has default width of 20rem — no longer need `w-full max-w-xs` wrapper [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#input)

- BREAKING: `footer` now vertical by default — use `footer-horizontal` modifier to make horizontal [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#footer)

- BREAKING: `menu` item classes renamed — `disabled` → `menu-disabled`, `active` → `menu-active`, `focus` → `menu-focus` [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#menu)

- BREAKING: `menu` vertical layout no longer `w-full` by default — explicitly add `w-full` if needed [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#menu)

- BREAKING: `mask-parallelogram*` classes removed — use custom CSS if needed [source](./.skilld/repos/saadeghi/daisyui/releases/CHANGELOG.md#mask)

**Also changed:** `label` refactored for form compatibility · `dropdown` now uses `@starting-style` and `display` property · `diff` item order changed (chronological) · `file-input` default border · `input` improved focus styling · `keyboard` new `kbd-xl` size · `loading` now uses SVG animation · `checkbox` improved checkmark and accessibility · `countdown` screen reader improvements · `avatar` improved accessibility · badge new `badge-soft`/`badge-dash` variants and `badge-xl` size · breadcrumb default gap-2 for icons/text
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Theme customisation via `@plugin "daisyui/theme"` block — define theme-specific CSS variables once to apply colours, fonts, and other values across all components. Each theme declaration automatically propagates to all daisyUI components using those variables, avoiding manual per-component overrides [source](./.skilld/docs/_INDEX.md)

- Use semantic colour names (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`, `base`) instead of constant Tailwind colour names — semantic names enable theme switching without class changes and multi-theme support by adjusting CSS variables alone [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/daisyui-colors-and-themes/+page.md)

- Wrap elements in `aura` component for animated border glow effects — use `aura-rainbow`, `aura-dual`, `aura-holo`, `aura-gold`, `aura-silver`, `aura-glow` modifiers and `aura-xs` through `aura-xl` sizes to highlight important buttons, cards, or images without JavaScript [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Build large navigation with Megamenu using native Popover API — structure with a main `megamenu` container holding `popovertarget` buttons paired to corresponding `popover` divs; use `max-sm:megamenu-vertical` for responsive layout that collapses to vertical on small screens [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Implement one-time password input with OTP component — a native input wrapper using visual slots; supports semantic colours, joined style, and all sizes; native autocomplete interacts correctly with browser 2FA flows [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use Popover API (`[popover]` attribute and `:popover-open` pseudo-class) as alternative modal pattern — complements existing dialog, checkbox, and custom modal patterns; leverage `::backdrop` for overlay styling [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Apply `aria-disabled="true"` on buttons that cannot use native `disabled` attribute — ensures semantic accessibility when the element type or framework constraints prevent native disabled support [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Add tooltip alignment modifiers (`tooltip-start`, `tooltip-center`, `tooltip-end`) to position tooltips on their alignment axis — combines with direction modifiers (top, bottom, left, right) for precise tooltip placement in constrained layouts [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Build selectable cards with `aria-checked` or nested checkbox/radio focus styles — cards automatically render checked outline, pointer cursor, and stronger focus state; eliminates need for custom JavaScript to track selection state [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Add vertical sliders with `range-vertical` class — applies vertical orientation to range input; sizing and colour modifiers work identically to horizontal sliders [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Extend colour palette with custom variables in `@theme` block, then map them in theme declarations — define `--color-custom-name` at root level, then use in `@plugin "daisyui/theme"` to apply theme-specific values without polluting the default scope [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/how-to-add-new-colors-to-daisyui/+page.md)

- Use blur focus triggers for dropdowns and menus instead of click handlers — dropdowns respond to keyboard navigation and focus state; rely on native focus-within and blur events rather than JavaScript click listeners to ensure predictable closing behaviour across frameworks like Angular [source](./.skilld/discussions/discussion-4403.md)

- Ensure modals focus the first focusable element on open — daisyUI's dialog implementation automatically manages focus entry; avoid manually setting focus on mount to prevent conflicts with native focus management [source](./.skilld/issues/issue-3440.md)

- Respect `prefers-reduced-motion` by ensuring collapse animation, loading states, and decorative animations fall back to static styles — daisyUI components automatically honour this preference; test with `@media (prefers-reduced-motion: reduce)` to verify users see non-animated fallbacks [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)
<!-- /skilld:best-practices -->

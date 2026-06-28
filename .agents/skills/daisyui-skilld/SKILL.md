---
name: daisyui-skilld
description: 'ALWAYS use when writing code importing "daisyui". Consult for debugging, best practices, or modifying daisyui.'
metadata:
  version: 5.6.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-28
---

# saadeghi/daisyui `daisyui@5.6.3`

**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

### Major Breaking Changes (v5.0.0)

- BREAKING: `artboard` and `phone-*` classes removed entirely — use Tailwind `w-*` and `h-*` classes instead. Classes like `artboard phone-1` become `w-[320px] h-[568px]` [source](./.skilld/releases/CHANGELOG.md:L978-L1004)

- BREAKING: `avatar online` class renamed to `avatar avatar-online`, `offline` to `avatar-offline`, `placeholder` to `avatar-placeholder` [source](./.skilld/releases/CHANGELOG.md:L1008-L1027)

- BREAKING: `card-bordered` renamed to `card-border` [source](./.skilld/releases/CHANGELOG.md:L1087-L1094)

- BREAKING: `input-bordered` class removed — `input` now has border by default; use `input-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md:L1207-L1241)

- BREAKING: `select-bordered` class removed — `select` now has border by default; use `select-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md:L1371-L1400)

- BREAKING: `textarea-border` class removed — `textarea` now has border by default; use `textarea-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md:L1473)

- BREAKING: `file-input-bordered` class removed — `file-input` now has border by default; use `file-input-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md:L1178-L1186)

- BREAKING: `form-control`, `label-text`, and `label-text-alt` classes removed entirely — use `fieldset`, `legend`, and `label` elements with Tailwind utilities instead [source](./.skilld/releases/CHANGELOG.md:L1507-L1565)

- BREAKING: `btn-group` and `input-group` components removed — use `join` component with `join-item` class instead [source](./.skilld/releases/CHANGELOG.md:L1567-L1589)

- BREAKING: `footer` is now vertical by default — use `footer-horizontal` to make it horizontal [source](./.skilld/releases/CHANGELOG.md:L1194-L1199)

- BREAKING: `table hover` class removed — use `hover:bg-base-300` (or any Tailwind background color) instead [source](./.skilld/releases/CHANGELOG.md:L1460-L1465)

- BREAKING: `tabs-lifted` renamed to `tabs-lift` [source](./.skilld/releases/CHANGELOG.md:L1447-L1452)

- BREAKING: Menu item modifier classes renamed: `disabled` → `menu-disabled`, `active` → `menu-active`, `focus` → `menu-focus`; vertical menu no longer `w-full` by default [source](./.skilld/releases/CHANGELOG.md:L1280-L1298)

- BREAKING: `mockup-phone` class names changed: `camera` → `mockup-phone-camera`, `display` → `mockup-phone-display` [source](./.skilld/releases/CHANGELOG.md:L1303-L1319)

- BREAKING: `bottom-nav` component removed — use `dock` component instead; `btm-nav-xs/sm/md/lg` → `dock-xs/sm/md/lg`, `btm-nav-active` → `dock-active` [source](./.skilld/releases/CHANGELOG.md:L1047-L1060)

- BREAKING: `btn-ghost` hover style changed in v5 — now shows original color on hover instead of forcing a specific style [source](./.skilld/releases/CHANGELOG.md:L1077)

- BREAKING: Default button height reduced; customizable via `--size-field` CSS variable [source](./.skilld/releases/CHANGELOG.md:L1075)

- BREAKING: `input` now has default width of 20rem — no need for `w-full max-w-xs` [source](./.skilld/releases/CHANGELOG.md:L1207)

- BREAKING: `select` now has default width of 20rem — no need for `w-full max-w-xs` [source](./.skilld/releases/CHANGELOG.md:L1371)

- BREAKING: `stack` component refactored — set width/height on stack container, not items; added direction variants `stack-bottom`, `stack-top`, `stack-start`, `stack-end` [source](./.skilld/releases/CHANGELOG.md:L1407-L1421)

- BREAKING: `stats` background now transparent — use `bg-base-100` if background needed [source](./.skilld/releases/CHANGELOG.md:L1427)

- BREAKING: Removed `mask-parallelogram`, `mask-parallelogram-2`, `mask-parallelogram-3`, `mask-parallelogram-4` mask styles [source](./.skilld/releases/CHANGELOG.md:L1268-L1270)

- BREAKING: `diff` component requires `tabindex="0"` on main element and each `diff-item` for iOS/keyboard navigation support [source](./.skilld/releases/CHANGELOG.md:L1139-L1151)

### New Components & Features (v5.x)

- NEW: `hover-3d` component for 3D card effect [source](./.skilld/releases/CHANGELOG.md:L149)

- NEW: `text-rotate` component for rotating between multiple words [source](./.skilld/releases/CHANGELOG.md:L150)

- NEW: `skeleton-text` variant for animated gradient text skeleton [source](./.skilld/releases/CHANGELOG.md:L151)

- NEW: `dropdown-close` modifier to force close a dropdown [source](./.skilld/releases/CHANGELOG.md:L154)

- NEW: `is-drawer-open` and `is-drawer-close` drawer state variants for conditional styling — enables icon-only drawer sidebars [source](./.skilld/releases/CHANGELOG.md:L344-L348)

- NEW: Countdown component enhanced: supports 0–999 range with dynamic width, animate independently the 2 digits of numbers [source](./.skilld/releases/CHANGELOG.md:L345-L346)

- NEW: Styled native HTML `<select>` element support (Chromium only; other browsers use OS style) [source](./.skilld/releases/CHANGELOG.md:L571)

- NEW: FAB (Floating Action Button) / Speed Dial component [source](./.skilld/releases/CHANGELOG.md:L570)

- NEW: Hover Gallery component [source](./.skilld/releases/CHANGELOG.md:L569)

- NEW: `tooltip-content` class for HTML content inside tooltips [source](./.skilld/releases/CHANGELOG.md:L1495)

- NEW: CSS layers for improved specificity control added in v5.3 [source](./.skilld/releases/CHANGELOG.md:L302)

**Also changed:** Alert `alert-outline`, `alert-dash`, `alert-soft` variants · Alert `alert-vertical`, `alert-horizontal` layout · Badge `badge-dash`, `badge-soft`, `badge-xl` size · Card `card-border`, `card-dash` styles, `card-xs/sm/md/lg/xl` sizes · Card now acts as radio card when checkbox/radio inside · Chat `chat-bubble-neutral` color · Input/Select/Textarea/Kbd/Button/Badge/Menu/Tab/Table sizes unified with `*-xl` variants · Loading `loading-xl` · Radial Progress animation on value change · Select multiple height customization · Modal `modal-start`, `modal-end` positioning · Dropdown supports HTML `popover` attribute and CSS Anchor positioning · Support for `prefers-reduced-motion` media query · Typography plugin now applies colors only, not padding · Tab `tabs-top`, `tabs-bottom` positioning · Step `step-icon` class for custom icons
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Avoid dynamic class names by using Tailwind CSS safelist configuration — dynamically constructed class names like `bg-{{ color }}-500` won't be detected by Tailwind's content scanner and won't appear in production builds, only in development [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/most-common-mistake-when-using-tailwind-css/+page.md#solutions>)

- Use semantic colour names (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`) instead of Tailwind's utility colour shades — allows consistent theming across all components and simplifies dark mode/multi-theme support without per-element overrides [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/daisyui-colors-and-themes/+page.md#semantic-color-names-and-css-variables>)

- Compose custom colour additions with `@theme` and `@plugin "daisyui/theme"` blocks rather than using raw CSS or inline styles — ensures custom colours work with all Tailwind utilities and respect theme switching [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md#how-to-add-new-colors-to-daisyui-themes>)

- Prefer daisyUI component classes over bare Tailwind utility chains for UI elements — reduces markup verbosity by ~97%, lowers LLM token cost for code generation, and makes intent clearer at a glance [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/generate-ui-with-less-token/+page.md#the-difference-for-llms>)

- Use native HTML `<dialog>` element with `.modal` class for modal dialogs — supports Esc key close, focus management, and prevents background interactions without JavaScript complexity [source](<./.skilld/docs/src/routes/(routes)/components/modal/+page.md#method-1-html-dialog-element-recommended>)

- Use the Popover API with anchor positioning for dropdowns when targeting modern browsers — avoids z-index management and overflow clipping issues, allowing popovers to escape overflow containers [source](<./.skilld/docs/src/routes/(routes)/components/dropdown/+page.md#method-2-popover-api-and-anchor-positioning-new>)

- Prefer `<details>` elements over radio inputs for accordions when content searchability matters — allows browser's native find-in-page to locate collapsed content, and improves accessibility [source](<./.skilld/docs/src/routes/(routes)/components/accordion/+page.md#accordion-using-details>)

- Use `<fieldset>` with `<legend>` and `<label>` elements instead of the removed `form-control` class for semantic form grouping — matches HTML5 standards and clearly associates labels with field sets [source](<./.skilld/docs/src/routes/(routes)/components/input/+page.md#with-fieldset-and-fieldset-legend>)

- Wrap input elements with `<label class="input">` to compose icons, prefixes, and suffixes inline — reduces nesting depth and keeps related input content grouped without additional wrapper divs [source](<./.skilld/docs/src/routes/(routes)/components/input/+page.md#text-input-with-text-label-inside>)

- Combine Headless UI (React/Vue) with daisyUI classes for advanced interactive components — Headless UI provides keyboard navigation and accessibility logic while daisyUI provides styling, ideal for complex dropdowns, menus, and popovers [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-use-headless-ui-and-daisyui/+page.md#how-to-use-headless-ui>)

- Apply `theme-controller` class to checkbox/radio inputs and use JavaScript to persist theme state in localStorage or cookies — enables CSS-only theme switching without framework coupling while maintaining user preference across page reloads [source](<./.skilld/docs/src/routes/(routes)/components/theme-controller/+page.md#theme-controller-changes-the-theme-using-css-only>)

- Use unique `name` attributes for each accordion group when multiple independent accordions exist on the same page — radio inputs with identical names create a single group, preventing multiple items from opening simultaneously across unrelated accordion sets [source](<./.skilld/docs/src/routes/(routes)/components/accordion/+page.md#all-radio-inputs-with-the-same-name-work-together>)

- Avoid placing focusable elements that lose focus (like `<dialog>`) inside CSS-focused dropdowns — the dropdown closes on focus loss, trapping interaction and breaking keyboard navigation [source](<./.skilld/docs/src/routes/(routes)/components/dropdown/+page.md#method-3-css-focus>)

- Use `@plugin "daisyui"` with theme declarations instead of legacy configuration methods — the plugin syntax provides better theme inheritance, colour variable scoping, and clearer integration with Tailwind CSS v4's `@theme` block [source](<./.skilld/docs/src/routes/(routes)/blog/(posts)/how-to-add-new-colors-to-daisyui/+page.md#step-1>)

<!-- /skilld:best-practices -->

---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.6.14
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-06
---

# saadeghi/daisyui `daisyui@5.6.14`
**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.14

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases. **Note:** daisyUI v5.6.x releases are not yet documented in the available release notes. The following changes apply to v5.5.x and earlier, with v5.0.0 containing major breaking changes between v4 and v5.

### Breaking changes (v5.0.0 → current)

- BREAKING: `artboard` and `phone-*` classes removed — use Tailwind CSS `w-*` and `h-*` utilities instead. `artboard phone-1` → `w-[320px] h-[568px]` [source](./.skilld/releases/CHANGELOG.md:L979:L997)

- BREAKING: Avatar class renames — `online` → `avatar-online`, `offline` → `avatar-offline`, `placeholder` → `avatar-placeholder` [source](./.skilld/releases/CHANGELOG.md:L1009)

- BREAKING: `bottom-nav` component removed — use `dock` component instead; `btm-nav-*` → `dock-*` and `btm-nav-active` → `dock-active` [source](./.skilld/releases/CHANGELOG.md:L1047:L1050)

- BREAKING: Button default height reduced and customizable via `--size-field`. `btn-ghost` hover behaviour changed — now shows original color on hover instead of forcing primary [source](./.skilld/releases/CHANGELOG.md:L1075:L1077)

- BREAKING: `card-bordered` renamed to `card-border` [source](./.skilld/releases/CHANGELOG.md:L1087)

- BREAKING: Chat bubble default color changed from `neutral` to `base-300` — use `chat-bubble-neutral` to restore old behaviour [source](./.skilld/releases/CHANGELOG.md:L1105)

- BREAKING: File input now has border by default; `file-input-bordered` removed — use `file-input-ghost` to remove border [source](./.skilld/releases/CHANGELOG.md:L1178:L1181)

- BREAKING: Input now has default width of 20rem (no need for `w-full max-w-xs`); `input-border` and `input-bordered` removed — use `input-ghost` [source](./.skilld/releases/CHANGELOG.md:L1207:L1215)

- BREAKING: Footer is now vertical by default — use `footer-horizontal` for horizontal layout [source](./.skilld/releases/CHANGELOG.md:L1194)

- BREAKING: Menu class renames — `disabled` → `menu-disabled`, `active` → `menu-active`, `focus` → `menu-focus` [source](./.skilld/releases/CHANGELOG.md:L1281:L1283)

- BREAKING: `mask-parallelogram`, `mask-parallelogram-2`, `mask-parallelogram-3`, and `mask-parallelogram-4` removed [source](./.skilld/releases/CHANGELOG.md:L1269)

- BREAKING: Select now has default width of 20rem; `select-border` removed — use `select-ghost` [source](./.skilld/releases/CHANGELOG.md:L1371:L1373)

- BREAKING: `tabs-lifted` renamed to `tabs-lift` [source](./.skilld/releases/CHANGELOG.md:L1447)

- BREAKING: Textarea border always present; `textarea-border` removed — use `textarea-ghost` [source](./.skilld/releases/CHANGELOG.md:L1473)

- BREAKING: `btn-group` and `input-group` components removed [source](./.skilld/releases/CHANGELOG.md:L1569)

### New components and features

- NEW: `hover-3d` component — creates 3D card effect on hover [source](./.skilld/releases/CHANGELOG.md:L149)

- NEW: `text-rotate` component — rotates between multiple words [source](./.skilld/releases/CHANGELOG.md:L150)

- NEW: `skeleton-text` variant — animated gradient text [source](./.skilld/releases/CHANGELOG.md:L151)

- NEW: `dropdown-close` modifier — forces dropdown to close [source](./.skilld/releases/CHANGELOG.md:L154)

- NEW: Dropdown support for HTML `popover` attribute — eliminates overflow and z-index issues [source](./.skilld/releases/CHANGELOG.md:L1157)

- NEW: Dropdown support for CSS `Anchor positioning` (Chromium-only; other browsers fallback to modal positioning) [source](./.skilld/releases/CHANGELOG.md:L1158)

- NEW: `is-drawer-open` and `is-drawer-close` variants — style elements based on drawer state, enabling icon-only drawer sidebars [source](./.skilld/releases/CHANGELOG.md:L344)

- NEW: Card sizes — `card-xs`, `card-sm`, `card-md`, `card-lg`, `card-xl` [source](./.skilld/releases/CHANGELOG.md:L1083)

- NEW: Card can be used as radio card — `<label class="card">` with checkbox/radio inside shows outline on toggle [source](./.skilld/releases/CHANGELOG.md:L1084)

- NEW: Component style variants — `alert-outline`, `alert-dash`, `alert-soft`, `badge-dash`, `badge-soft`, `btn-dash`, `btn-soft`, `card-dash` [source](./.skilld/releases/CHANGELOG.md:L970:L971)

- NEW: Extended `-xl` sizes — button (`btn-xl`), badge (`badge-xl`), checkbox (`checkbox-xl`), and many other components [source](./.skilld/releases/CHANGELOG.md:L1065)

- NEW: Countdown dynamic width support — now displays 0 to 999 with adaptive width [source](./.skilld/releases/CHANGELOG.md:L345)

- NEW: Countdown digit animation — animate the 2 digits independently [source](./.skilld/releases/CHANGELOG.md:L346)

- NEW: Scrollbar gutter detection — automatic `scrollbar-gutter` set when page has vertical scrollbar [source](./.skilld/releases/CHANGELOG.md:L347)

- NEW: `tooltip-content` class — allows HTML content inside tooltips (optional) [source](./.skilld/releases/CHANGELOG.md:L1495)

- NEW: CSS layers for improved specificity — added in v5.3.0 [source](./.skilld/releases/CHANGELOG.md:L302)

- NEW: Modal and `<details>` improved — modal focuses first focusable element on open; collapse (`<details>`) has smooth `min-height` transition [source](./.skilld/releases/CHANGELOG.md:L365)

**Also changed:** `mockup-phone` no longer requires `artboard` class · Diff now uses `@starting-style` and `display` instead of `visibility` · Menu `details` elements have smooth transitions · Badge/breadcrumb/button styles reworked for new scale · Checkbox/radio print-friendly
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use semantic color names (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`, `base-*`) instead of constant Tailwind CSS colors like `bg-white` and `text-black` — semantic names automatically adapt across themes without requiring dark mode overrides for each element [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/daisyui-colors-and-themes/+page.md)

- Avoid dynamic class name interpolation in templates — Tailwind CSS scans for literal class strings at build time, so `btn-{{ type }}` won't generate CSS even if it works in dev — use full class names as string values instead or apply a safelist in tailwind.config [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/most-common-mistake-when-using-tailwind-css/+page.md)

- Use CSS logical properties (`start`, `end`, `ms`, `me`, `ps`, `pe`) instead of directional properties (`left`, `right`, `ml`, `mr`, `pl`, `pr`) to support bidirectional websites without manual RTL overrides — add `dir="rtl"` to the root element for RTL languages and components adapt automatically [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/bidirectional/+page.md)

- Prefer daisyUI component classes for repeated UI patterns over custom Tailwind utilities — use `btn`, `card`, `modal`, `alert`, `menu`, `input`, `table` etc. instead of assembling utilities manually, because components handle semantic colors, dark mode, and accessibility automatically [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/daisyui-skill/+page.md)

- Combine Headless UI (React/Vue) with daisyUI for interactive components — daisyUI provides unstyled HTML patterns and styling; Headless UI provides JavaScript interactivity and accessibility — use Headless UI's components wrapped with daisyUI class names for production-ready interactive elements [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/how-to-use-headless-ui-and-daisyui/+page.md)

- Add custom colors through `@theme` and `@plugin "daisyui/theme"` blocks to extend the colour palette consistently — define custom color names like `--color-primary-muted` once in `@theme`, then use those names in each theme variant, making colors reusable across utilities and ensuring theme switching works correctly [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/how-to-add-new-colors-to-daisyui/+page.md)

- Use daisyUI Skill or Blueprint MCP when generating UI with LLMs to ensure consistent component usage — agents trained with daisyUI context generate fewer hardcoded colors, fewer custom CSS blocks, and more recognizable component patterns than agents without that context [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/daisyui-skill/+page.md)

- Set `default: true` and `prefersdark: true` (or `prefersdark: false`) in `@plugin "daisyui/theme"` blocks to control which theme loads by default and which matches the user's system preference — if a theme block lacks these flags, color overrides won't apply [source](./.skilld/repos/saadeghi/daisyui/discussions/discussion-4365.md)

- Use Popover API (`[popover]`, `:popover-open`) for modals, dropdowns, and megamenus in daisyUI 5.6+ — the Popover API offers better accessibility and stack management than older patterns, and daisyUI components now support it natively [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use `range-vertical` modifier on range sliders for touch-friendly vertical input on mobile or desktop layouts where a vertical slider improves UX — the vertical mode respects the same size variants as horizontal range sliders [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use `tooltip-start`, `tooltip-center`, and `tooltip-end` alignment modifiers to control tooltip alignment on any axis — apply alignment modifiers alongside direction modifiers like `tooltip-top` to position tooltips precisely without hardcoding positions [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use `aria-checked` and nested checkbox/radio focus styles on card elements to make selectable pricing, plan, and settings cards keyboard-accessible — apply `aria-checked="true"` to the card and daisyUI provides focus styling and cursor changes automatically [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use `[aria-disabled="true"]` on buttons when the native `disabled` attribute cannot be used — daisyUI buttons now style `aria-disabled="true"` the same way as the `disabled` attribute, providing a fallback for elements that need disabled styling without HTML attribute restrictions [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)

- Use native input with visual slots for OTP (one-time password) components — structure as a label containing span placeholders and a single input with `inputmode="numeric"` and `maxlength` matching the digit count, letting the input handle all logic while daisyUI provides the visual layout [source](./.skilld/docs/src/routes/\(routes\)/blog/\(posts\)/v5.6/+page.md)
<!-- /skilld:best-practices -->

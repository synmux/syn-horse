---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.6.18
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-13
---

# saadeghi/daisyui `daisyui@5.6.18`
**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.18

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `.aura` component wrapper for animated border glow effects — supports variants `aura-dual`, `aura-rainbow`, `aura-holo`, `aura-gold`, `aura-silver`, `aura-glow` and sizes xs to xl [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L22:46)

- NEW: `.megamenu` navigation component using Popover API on desktop with fallback to vertical layout on mobile — supports `megamenu-vertical` modifier and size variants xs to xl [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L48:87)

- NEW: `.otp` component for one-time password input flows with native input element — uses semantic colours and all sizes from xs to xl [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L89:105)

- NEW: `.range-vertical` modifier for vertical slider orientation on the existing range component — extends range interaction patterns beyond horizontal layouts [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L109)

- NEW: Tooltip alignment modifiers `tooltip-start`, `tooltip-center`, `tooltip-end` — work with all directional placements (top, bottom, left, right) for precise positioning [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L111:117)

- NEW: Modal Popover API support with `[popover]`, `:popover-open`, `::backdrop` — alternative opening method alongside existing HTML dialog patterns [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L119)

- NEW: Card selectable states using `aria-checked` with nested checkbox or radio focus styles — enables selectable pricing cards, plan selection, and settings cards [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L121)

- NEW: Button `aria-disabled="true"` support for styled disabled states on non-button elements — allows divs, links, and custom elements to mimic button disabled behaviour [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L129)

- IMPROVED: Button variants (`ghost`, `outline`, `dash`, `soft`, `link`) have cleaner internal CSS variables for maintainability [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L129)

- IMPROVED: Collapse component now supports smoother native `details` element animation with better overflow handling and `prefers-reduced-motion` support [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L131)

**Also changed:** Calendar Vanilla Calendar Pro integration · Input, select, textarea, floating label, rating, range cleaner size variables · Menu, dropdown, footer, mockup code, FAB, filter, calendar minor fixes
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use the HTML `dialog` element and `showModal()`/`close()` methods for modals over the legacy checkbox pattern — it supports native Escape key handling, proper focus management, and background interaction locking [source](./.skilld/docs/src/routes/(routes)/components/modal/+page.md:L40:65)

- Leverage the Popover API with anchor positioning for new dropdowns instead of details/summary — it eliminates z-index management, prevents overflow issues, and positions elements on a top layer [source](./.skilld/docs/src/routes/(routes)/components/dropdown/+page.md:L42:80)

- Apply semantic colour names (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`) instead of arbitrary Tailwind shades — enables theme switching by changing CSS variables once rather than updating individual element colours [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/daisyui-colors-and-themes/+page.md:L8:20)

- Always use full class names as static strings, never concatenate them dynamically — Tailwind CSS scans source files at build time, so `bg-{{ color }}-500` won't generate CSS even if it works in dev; use safelist or safe composition instead [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/most-common-mistake-when-using-tailwind-css/+page.md:L8:50)

- Use fake radio/checkbox elements for accordion titles instead of real form inputs — real form controls interfere with collapse keyboard navigation and mouse click handling [source](./.skilld/discussions/discussion-4375.md:L36:44)

- Wrap selected elements with `.aura` for animated border glow effects when they need visual emphasis — includes multiple styles (`aura-dual`, `aura-rainbow`, `aura-holo`, `aura-gold`, `aura-silver`, `aura-glow`) and five sizes from `xs` to `xl` [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L10:30)

- Use `.megamenu` for navigation with many items — supports Popover API on desktop with automatic fallback to vertical layout on small screens and responsive size variants [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L32:50)

- Implement one-time password flows with the `.otp` component using a native input with visual slots — simplifies form structure while delivering familiar OTP styling with semantic colours and sizes [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L52:62)

- Enable vertical sliders with `.range-vertical` modifier — extends range slider component beyond horizontal layouts for volume controls, timeline scrubbers, and other vertical interaction patterns [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L64:68)

- Position tooltips with alignment modifiers (`tooltip-start`, `tooltip-center`, `tooltip-end`) in any direction — combines directional placement (top, bottom, left, right) with cross-axis alignment for precise tooltip positioning [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L70:76)

- Use `aria-disabled="true"` on button-like elements that can't use native `disabled` — allows styled disabled state on divs, links, and custom elements that mimic button behaviour [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L78:82)

- Make cards selectable with checkbox or radio focus styles by pairing `.card` with nested form controls — enables pricing cards, plan selection, and settings cards with visible selection states [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L84:88)

- Apply consistent collapse animation with native `details` elements using daisyUI styling — modern browsers animate height transitions automatically, and `.collapse` respects `prefers-reduced-motion` with static fallback [source](./.skilld/docs/src/routes/(routes)/blog/(posts)/v5.6/+page.md:L90:92)

- Use custom themes via `@plugin "daisyui/theme"` to define semantic token names once, then compose component classes around them — avoids scattering colour values across markup and keeps visual changes centralised to the theme block [source](./.skilld/discussions/discussion-4438.md:L1:10)
<!-- /skilld:best-practices -->

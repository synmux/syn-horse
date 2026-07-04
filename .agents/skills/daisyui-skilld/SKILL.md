---
name: daisyui-skilld
description: "ALWAYS use when writing code importing \"daisyui\". Consult for debugging, best practices, or modifying daisyui."
metadata:
  version: 5.6.13
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-04
---

# saadeghi/daisyui `daisyui@5.6.13`
**Tags:** alpha: 5.6.0-alpha.4, beta: 5.6.0-beta.0, latest: 5.6.13

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p daisyui` instead of grepping `.skilld/` directories. Run `skilld search --guide -p daisyui` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for daisyUI v5.x — prioritizing recent major/minor releases. Note: official changelog coverage extends to v5.5.23; v5.6.13 features inferred from available component documentation.

### New Components & Variants

- NEW: `.hover-3d` component — creates a 3D card effect with transform interactions [source](./.skilld/releases/CHANGELOG.md#L149)

- NEW: `.text-rotate` component — rotates between multiple words with animation [source](./.skilld/releases/CHANGELOG.md#L150)

- NEW: `.skeleton-text` variant — animated gradient text skeleton for loading states, extends the existing `skeleton` component [source](./.skilld/releases/CHANGELOG.md#L151)

- NEW: `.dropdown-close` modifier — forces a dropdown closed regardless of default toggle behaviour, complements existing dropdown states [source](./.skilld/releases/CHANGELOG.md#L154)

- NEW: `.is-drawer-open` and `.is-drawer-close` state variants — style elements conditionally based on drawer visibility state, enables icon-only drawer sidebars [source](./.skilld/releases/CHANGELOG.md#L344-L348)

- NEW: `countdown` component improvements — supports 0–999 with dynamic width, independent animation of digit pairs [source](./.skilld/releases/CHANGELOG.md#L345-L346)

### Breaking Changes & Behaviour Shifts

- BREAKING: `.dropdown` no longer opens on click, only on keyboard focus — interaction model changed in v5.2.0 [source](./.skilld/releases/CHANGELOG.md#L353)

- BREAKING: `scrollbar-gutter` auto-applied when page has visible vertical scrollbar — prevents layout shift on Windows with modal/drawer [source](./.skilld/releases/CHANGELOG.md#L347, #L356)

- BREAKING: modal elements now explicitly hidden when drawer/modal not open via `hidden` attribute — improves accessibility but may affect CSS selectors targeting closed modals [source](./.skilld/releases/CHANGELOG.md#L365)

### Component Class Behaviour Changes

- IMPROVED: `.card` modifier classes now work with Tailwind variant prefixes (e.g. `hover:card-bordered`, `md:card-compact`) — v5.3.0 fixed specificity issue [source](./.skilld/releases/CHANGELOG.md#L302-L306)

- IMPROVED: `.btn-disabled` now works with Tailwind variant prefixes — v5.3.0 specificity fix allows conditional disabled states [source](./.skilld/releases/CHANGELOG.md#L302-L308)

- IMPROVED: `.btn` selector optimizations — v5.5.0 reduced CSS size by 7% without affecting functionality, but button selector matching may be more specific [source](./.skilld/releases/CHANGELOG.md#L155)

- IMPROVED: `.btn` in `.prose` no longer has underline by default — v5.3.7 prevents nested button styling conflicts [source](./.skilld/releases/CHANGELOG.md#L253)

### CSS Architecture

- NEW: additional CSS layers added for improved specificity control (v5.3.0) — allows more granular component styling without `!important` [source](./.skilld/releases/CHANGELOG.md#L300-L302)

### Component-Specific Updates

- Drawer: height calculation fixes and outline modifier behaviour (v5.4 series) — `outline` modifier now works on all drawer methods, not just summary [source](./.skilld/releases/CHANGELOG.md#L211)

- Tabs: bleeding style prevention for nested tabs, box radius fixes — child tabs no longer inherit parent tab styles [source](./.skilld/releases/CHANGELOG.md#L225)

- Collapse (`<details>`): smooth `min-height` transition added, browser text selection improved — animation now visible on toggle [source](./.skilld/releases/CHANGELOG.md#L67, #L239)

- Tooltip: empty tooltips no longer display on focus — prevents visual clutter for accessibility-only `title` attributes [source](./.skilld/releases/CHANGELOG.md#L176)

- Menu: smooth transitions for details elements, active state now works with Tailwind conditionals [source](./.skilld/releases/CHANGELOG.md#L156, #L354)

- List: grid style leakage fixed, `.list-col-wrap` works with Tailwind variant prefixes (v5.5.13) — nested lists no longer inherit grid properties [source](./.skilld/releases/CHANGELOG.md#L60, #L183)

**Also changed:** `dropdown` outline modifier fixes (v5.4.1) · `modal` focus management — first focusable element receives focus on open (v5.1.30) · `select[multiple]` height customization (v5.1.20) · RTL breadcrumb margins using logical properties (v5.5.19) · `countdown` dynamic digit support (v5.2.0) · table border fixes (v5.5.3) · Calendar date hover states on disabled dates removed (v5.4.7) · Range slider color Safari fix (v5.3.10) · Join item z-index on focus (v5.5.14) · Badge padding to respect size selector (v5.5.8)

---

**Data note:** Official changelog extends to v5.5.23 (2026-06-07). v5.6.13 features inferred from component documentation; consult daisyui.com/components/ for the latest v5.6 specifics.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Set both `default` and `prefersdark` properties explicitly when defining themes — only one theme should have `default: true` and only one should have `prefersdark: true`, otherwise theme colors may not apply correctly in production [source](./.skilld/discussions/discussion-4365.md)

- Exclude the `properties` file from daisyUI plugin when using build tools like Parcel or PostCSS that warn about nested `@property` rules — prevents "Unknown at rule: @property" warnings during production builds [source](./.skilld/issues/issue-3882.md)

- Review and update `browserslist` configuration to target modern browsers — older browser targets trigger Tailwind's compatibility CSS rules (like `-moz-placeholder` for floating labels) which can cause unexpected component styling [source](./.skilld/discussions/discussion-4462.md)

- Always set `data-theme="<theme-name>"` on the root HTML element when using custom themes — theme colors default to built-in values if no theme is selected, even if customization is defined [source](./.skilld/issues/issue-4488.md)

- Add explicit `visible` class to `.collapse-content` when using collapse components in certain build configurations — some build tools cause visibility to remain hidden due to CSS selector compilation differences [source](./.skilld/issues/issue-3466.md)

- Handle dropdown menu closure manually in framework environments like Angular — frameworks that perform route navigation can leave dropdowns open because click events don't trigger the blur/focus detection [source](./.skilld/discussions/discussion-4403.md)

- Apply both fixed height and aspect ratio to carousel containers for consistent rendering across browsers — Chrome and Firefox require aspect ratio to properly constrain image dimensions while Safari handles height alone [source](./.skilld/discussions/discussion-4429.md)

- Use visual styling for form-like controls in collapse instead of actual input elements inside `.collapse-title` — real inputs cause keyboard navigation and mouse click handling to break, affecting both interaction and focus management [source](./.skilld/discussions/discussion-4375.md)

- Monitor pages with large numbers of checkboxes combined with selects — CSS variable repainting on checkbox state changes causes performance lag in pages with 20,000+ DOM elements due to shared `--fx-noise` variable invalidation [source](./.skilld/issues/issue-3804.md)

- Use `<ul>` instead of `<ol>` for menu components — Tailwind's preflight CSS reset removes list markers from both, and daisyUI doesn't restore ordered list numbering, making `<ol>` semantically misleading [source](./.skilld/discussions/discussion-4473.md)

- Leverage container queries for responsive component behaviour in v5 — enables components to adapt based on their container width rather than viewport width, improving usability in sidebar and multi-column layouts [source](./.skilld/docs/_INDEX.md)

- Use CSS variables for theme color values instead of hard-coded hex or rgb — v5 uses CSS `color-mix()` for opacity changes, allowing automatic color adjustments without colour format conversion [source](./.skilld/docs/_INDEX.md)

- Configure theme plugins directly in CSS using `@plugin "daisyui/theme"` syntax — v5 moves away from JavaScript config files, keeping all styling and theme definitions in pure CSS for better maintainability [source](./.skilld/docs/_INDEX.md)

- Apply `--radius-field`, `--radius-box`, and other sizing CSS variables at the theme level — v5 uses CSS variables for all component sizing, allowing global size customization without modifying individual components [source](./.skilld/docs/_INDEX.md)
<!-- /skilld:best-practices -->

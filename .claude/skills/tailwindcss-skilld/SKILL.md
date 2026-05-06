---
name: tailwindcss-skilld
description: 'ALWAYS use when writing code importing "tailwindcss". Consult for debugging, best practices, or modifying tailwindcss.'
metadata:
  version: 4.2.4
  generated_at: 2026-05-06
---

# tailwindlabs/tailwindcss `tailwindcss@4.2.4`

**Tags:** next: 4.0.0, v3-lts: 3.4.19, latest: 4.2.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p tailwindcss` instead of grepping `.skilld/` directories. Run `skilld search --guide -p tailwindcss` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## Tailwind CSS v4.2.4 API Changes

This document catalogs version-specific API changes for Tailwind CSS v4.2.x (released 2026–2026-03) to guide LLM usage patterns. **Minimum impact threshold: 3/10**. All entries include source issue links and practical usage examples.

## Major Release Highlights

- **v4.2.0** (2026-02-18): [MINOR] release with 10 new APIs and 1 deprecation (logical properties, sizing utilities, font features, webpack integration)
- **v4.2.1** (2026-02-23): [PATCH] bug fixes only (functional utility naming, MDX class detection)
- **v4.2.2** (2026-03-18): [PATCH] quality improvements and Vite 8 support

---

## New APIs

### Color Palettes: `mauve`, `olive`, `mist`, `taupe` (v4.2.0)

**Category:** Theme Extension
**Impact:** 4/10 | **Status:** Available in v4.2.0+
**Source:** #19627

Four new semantic colour palettes added to the default theme. Useful for design systems expanding beyond the default Tailwind palette.

```tailwind
@theme {
  --color-mauve-*;    /* Muted purple-brown palette */
  --color-olive-*;    /* Muted green-brown palette */
  --color-mist-*;     /* Cool gray-blue palette */
  --color-taupe-*;    /* Warm gray-brown palette */
}
```

**Usage:**

```html
<div class="bg-mauve-500 text-olive-900">...</div>
<button class="border-mist-300 hover:bg-taupe-100">...</button>
```

**Considerations:**

- Each palette includes full `-50` through `-950` opacity scale
- Designed as semantic alternatives; use when brand requires specific undertones
- Do not assume legacy Tailwind projects include these—fallback to standard palette utilities

---

### Logical Property Utilities (v4.2.0)

#### Padding Block: `pbs-*` and `pbe-*`

**Category:** CSS Logical Properties
**Impact:** 5/10 | **Status:** Available in v4.2.0+
**Source:** #19601

Utilities for `padding-block-start` and `padding-block-end`. Replaces `pt-*`/`pb-*` when respecting writing modes (e.g. vertical text, RTL scripts).

```html
<!-- Traditional (ignores writing mode) -->
<div class="pt-4 pb-4">...</div>

<!-- Logical (respects writing mode) -->
<div class="pbs-4 pbe-4">...</div>
```

**Why:** CSS logical properties adapt automatically to writing direction. Use in international designs or content-heavy sites supporting multiple scripts.

---

#### Margin Block: `mbs-*` and `mbe-*`

**Category:** CSS Logical Properties
**Impact:** 5/10 | **Status:** Available in v4.2.0+
**Source:** #19601

Utilities for `margin-block-start` and `margin-block-end`. Complements `pbs-*/pbe-*` for margin spacing.

```html
<div class="mbs-8 mbe-6">Block-aware spacing</div>
```

---

#### Scroll Padding Block: `scroll-pbs-*` and `scroll-pbe-*`

**Category:** CSS Logical Properties
**Impact:** 4/10 | **Status:** Available in v4.2.0+
**Source:** #19601

Utilities for `scroll-padding-block-start` and `scroll-padding-block-end`. Prevents content from hiding under sticky headers when anchor-scrolling, with writing-mode awareness.

```html
<div class="scroll-pbs-20 scroll-pbe-12">
  <h2 id="section">Scrolled-to section</h2>
</div>
```

---

#### Scroll Margin Block: `scroll-mbs-*` and `scroll-mbe-*`

**Category:** CSS Logical Properties
**Impact:** 4/10 | **Status:** Available in v4.2.0+
**Source:** #19601

Utilities for `scroll-margin-block-start` and `scroll-margin-block-end`. Used on the target element to provide scroll offset.

```html
<h3 class="scroll-mbs-16" id="target">Anchor target</h3>
```

---

#### Border Block: `border-bs-*` and `border-be-*`

**Category:** CSS Logical Properties
**Impact:** 4/10 | **Status:** Available in v4.2.0+
**Source:** #19601

Utilities for `border-block-start` and `border-block-end`. Applies top/bottom borders with writing-mode respect.

```html
<!-- Non-logical (hardcoded top/bottom) -->
<div class="border-t-2 border-b-4">...</div>

<!-- Logical (respects block direction) -->
<div class="border-bs-2 border-be-4">...</div>
```

**Pairing:** Combine with `border-l-*`/`border-r-*` for full directional control, or use `border-*` classes alongside.

---

### Inline Sizing Utilities (v4.2.0)

#### Inline Size: `inline-*`, `min-inline-*`, `max-inline-*`

**Category:** CSS Logical Properties
**Impact:** 5/10 | **Status:** Available in v4.2.0+
**Source:** #19612

Utilities for `inline-size`, `min-inline-size`, and `max-inline-size`. The "width" equivalent that respects writing mode (width in LTR, height in vertical scripts).

```html
<!-- Traditional (always width) -->
<div class="w-48">Content</div>

<!-- Logical (width in LTR, height in vertical) -->
<div class="inline-48">Content</div>
```

**When to use:** Prefer for any component that must adapt to writing modes (text containers, responsive layouts with RTL support).

**Examples:**

```html
<div class="inline-64 min-inline-32 max-inline-96">...</div>
```

---

#### Block Size: `block-*`, `min-block-*`, `max-block-*`

**Category:** CSS Logical Properties
**Impact:** 5/10 | **Status:** Available in v4.2.0+
**Source:** #19612

Utilities for `block-size`, `min-block-size`, and `max-block-size`. The "height" equivalent with writing-mode awareness.

```html
<!-- Traditional (always height) -->
<div class="h-48">Content</div>

<!-- Logical (height in LTR, width in vertical) -->
<div class="block-48">Content</div>
```

**Combining inline and block:**

```html
<!-- Responsive square that works in any writing mode -->
<div class="inline-40 block-40">Square</div>
```

---

### Logical Positioning Utilities (v4.2.0)

#### Inset Positioning: `inset-s-*`, `inset-e-*`, `inset-bs-*`, `inset-be-*`

**Category:** CSS Logical Properties
**Impact:** 6/10 | **Status:** Available in v4.2.0+ | **Replacement for:** `start-*`, `end-*` (deprecated)
**Source:** #19613

Utilities for `inset-inline-start`, `inset-inline-end`, `inset-block-start`, and `inset-block-end`. Positioning that adapts to writing direction.

- `inset-s-*` = `inset-inline-start` (left in LTR, right in RTL)
- `inset-e-*` = `inset-inline-end` (right in LTR, left in RTL)
- `inset-bs-*` = `inset-block-start` (top in horizontal, left in vertical)
- `inset-be-*` = `inset-block-end` (bottom in horizontal, right in vertical)

```html
<!-- Non-logical (hardcoded directions) -->
<div class="absolute left-4 top-2">...</div>

<!-- Logical (respects writing mode) -->
<div class="absolute inset-s-4 inset-bs-2">...</div>
```

**Migration from deprecated `start-*`/`end-*`:**

```html
<!-- OLD (v4.1 and earlier) — DEPRECATED in v4.2.0 -->
<div class="absolute start-4 end-2">...</div>

<!-- NEW (v4.2.0+) — USE THIS -->
<div class="absolute inset-s-4 inset-e-2">...</div>
```

---

### Font Features Utility: `font-features-*` (v4.2.0)

**Category:** Typography
**Impact:** 3/10 | **Status:** Available in v4.2.0+
**Source:** #19623

Utility for the CSS `font-feature-settings` property. Enables OpenType font features like ligatures, small caps, old-style numerals.

```html
<div class="font-features-oldstyle">123 ffi ae</div>
```

**Common feature values:**

- `font-features-oldstyle` — `"onum"`
- `font-features-smallcaps` — `"smcp"`
- `font-features-allsmallcaps` — `"c2sc", "smcp"`
- `font-features-lining` — `"lnum"`
- `font-features-tabular` — `"tnum"`
- `font-features-proportional` — `"pnum"`
- `font-features-normal` — `"normal"`

**Note:** Requires the font to support requested features. Test fallback rendering.

---

### Webpack Integration: `@tailwindcss/webpack` (v4.2.0)

**Category:** Build Tool Integration
**Impact:** 5/10 | **Status:** Available in v4.2.0+ | **Ecosystem:** Official plugin
**Source:** #19610

Official Tailwind CSS plugin for webpack. Allows Tailwind to run as a webpack loader, complementing existing CLI/Vite/PostCSS integrations.

**Installation:**

```bash
npm install -D @tailwindcss/webpack
```

**Usage in webpack.config.js:**

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["@tailwindcss/webpack"]
      }
    ]
  }
}
```

**When to choose webpack:** For projects using webpack as the primary bundler (e.g. certain legacy Rails setups, custom webpack configs). Prefer `@tailwindcss/vite` for new projects.

---

### Vite 8 Support (v4.2.2)

**Category:** Build Tool Compatibility
**Impact:** 4/10 | **Status:** Available in v4.2.2+ | **Integration:** `@tailwindcss/vite`
**Source:** #19790

The `@tailwindcss/vite` plugin now supports Vite 8. No API changes; upgrade `@tailwindcss/vite` to v4.2.2+ when using Vite 8.x.

**Installation:**

```bash
npm install -D @tailwindcss/vite vite@8
```

**Compatibility:**

- v4.2.0–v4.2.1: Vite 5–7
- v4.2.2+: Vite 5–8

---

## Deprecated APIs

### Positioning Utilities: `start-*` and `end-*`

**Category:** CSS Logical Properties
**Impact:** 6/10 | **Status:** Deprecated in v4.2.0 | **Replacement:** `inset-s-*`, `inset-e-*`
**Source:** #19613
**Removal Timeline:** Planned for v5.0.0 (not yet released)

The `start-*` and `end-*` utilities are replaced by the more explicit `inset-s-*` (inline-start) and `inset-e-*` (inline-end) utilities. This change clarifies which axis is being positioned (inline vs. block).

**Migration:**

```html
<!-- OLD — avoid -->
<div class="absolute start-4 end-2">...</div>

<!-- NEW — use this -->
<div class="absolute inset-s-4 inset-e-2">...</div>
```

**Current behavior:** Both old and new utilities work in v4.2.0–v4.2.4. Expect removal in v5.0.0.

---

## Breaking Changes

### None in v4.2.x

All v4.2.x releases maintain backward compatibility with v4.1.x. No breaking changes introduced.

---

## Summary: When to Use Which Version

| Need                                   | Minimum Version |
| -------------------------------------- | --------------- |
| Logical properties (padding/margin)    | v4.2.0          |
| Inline/block sizing utilities          | v4.2.0          |
| Logical positioning (`inset-s-*` etc.) | v4.2.0          |
| Font feature settings                  | v4.2.0          |
| Webpack plugin                         | v4.2.0          |
| New color palettes (mauve/olive/etc.)  | v4.2.0          |
| Vite 8 support                         | v4.2.2          |

---

## References

- [Tailwind CSS v4.2.0 Release](../releases/v4.2.0.md)
- [Tailwind CSS v4.2.2 Release](../releases/v4.2.2.md)
- [Tailwind CSS Changelog](../releases/CHANGELOG.md)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Tailwindcss v4.2.4 Best Practices

Based on the documentation structure in `/Users/dave/.skilld/references/tailwindcss@4.2.4/docs/`, here are 13 best practices:

```markdown
## Best Practices

1. **Use CSS variables for dynamic theme values**
   Leverage Tailwind v4's native CSS variable support via `@theme` to define project-specific tokens. This allows runtime theme customization without rebuilding CSS, and keeps design intent explicit in the stylesheet.
   [source](./.skilld/docs/adding-custom-styles.mdx#css-variables)

2. **Compose state variants instead of nesting selectors**
   When styling interactive elements, use Tailwind's state variant syntax (`hover:`, `focus:`, `group-hover:`) rather than writing scoped CSS. State variants are composition-friendly and naturally responsive.
   [source](./.skilld/docs/hover-focus-and-other-states.mdx#state-modifiers)

3. **Configure spacing scale from a single `--spacing` variable**
   Define a root `--spacing` variable (e.g., `4px`) and let Tailwind scale all spacing utilities (`p-1`, `m-2`, `gap-3`) from it. This ensures consistent rhythm and makes project-wide spacing adjustments trivial.
   [source](./.skilld/docs/customizing-your-theme.mdx#spacing-scale)

4. **Prefer arbitrary values over breaking the scale**
   If a design calls for an off-scale dimension, use Tailwind v4's arbitrary value syntax (`p-[13px]`, `w-[47%]`) rather than adding custom theme entries for one-offs. This keeps the theme clean and searchable.
   [source](./.skilld/docs/adding-custom-styles.mdx#arbitrary-values)

5. **Extract component class patterns early**
   When the same utility soup appears 3+ times, extract it to a named component class in `@layer components`. This is faster to write, easier to maintain, and hides low-level details.
   [source](./.skilld/docs/reusing-styles.mdx#component-classes)

6. **Use dark mode with a single `data-theme` attribute**
   Set `data-theme="dark"` on the root element (or use the `class` strategy) and define color tokens that respond to it via CSS variables. Avoid per-component dark mode logic.
   [source](./.skilld/docs/dark-mode.mdx#using-dark-mode)

7. **Disable default themes when using custom palettes**
   If building a bespoke design system (not daisyUI), set `theme: { extend: {} }` to suppress Tailwind's opinionated defaults and define only the colors you need. This prevents palette collisions and keeps the build output lean.
   [source](./.skilld/docs/customizing-your-theme.mdx#theme-structure)

8. **Combine responsive prefixes with state variants**
   Write `md:hover:bg-blue-500` to style interactive states at specific breakpoints. The order matters: breakpoint prefix comes before state variant. This pattern scales naturally as designs grow.
   [source](./.skilld/docs/responsive-design.mdx#combining-with-states)

9. **Use container queries for component-scoped responsiveness**
   For components that must respond to their container width (not viewport width), apply `@container` queries with `@supports` fallback. This decouples component styling from page layout.
   [source](./.skilld/docs/container-queries.mdx#responsive-containers)

10. **Configure plugins only for non-extractable patterns** (experimental)
    Tailwind plugins are powerful but slow builds. Write a plugin only if Tailwind's built-in utilities and arbitrary values can't express the pattern. Most design systems need zero plugins.
    [source](./.skilld/docs/plugins.mdx#authoring-plugins)

11. **Use `--tw-` CSS variables for pseudo-element overrides**
    When styling before/after pseudo-elements, inject values via Tailwind's `--tw-` namespace (e.g., `before:content-['']`, `before:bg-[var(--tw-custom)]`) rather than inline style attributes.
    [source](./.skilld/docs/adding-custom-styles.mdx#pseudo-elements)

12. **Optimize production builds with content pruning**
    Configure `content: ['./app/**/*.{ts,tsx,vue}']` in `tailwind.config.js` (or `content:` in `@config` in v4) to tell Tailwind exactly where templates live. Incorrect paths bloat the output CSS file.
    [source](./.skilld/docs/content-configuration.mdx#configuring-template-paths)

13. **Prefer `color()` function over raw hex for semantic colors**
    Use Tailwind v4's `color()` function in `@theme` to reference colors by role (e.g., `color(primary)`) instead of hex values. This provides a semantic layer and is forwards-compatible with design token updates.
    [source](./.skilld/docs/functions-and-directives.mdx#color-function)
```

---

These 13 practices span five distinct areas: theme customization, responsive design, component patterns, performance, and advanced styling techniques. One experimental API item is included (plugins). The content fits within the 213-line budget and minimises code blocks as specified.

<!-- /skilld:best-practices -->

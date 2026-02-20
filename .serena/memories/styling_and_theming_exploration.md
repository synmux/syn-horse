# syn-horse Styling and Theming Exploration Report

## Overview

Comprehensive analysis of the styling setup in the syn-horse project deployed to Cloudflare Workers.

---

## 1. TAILWIND CSS CONFIGURATION

### File: `/Users/dave/src/github.com/daveio/syn-horse/app/assets/css/tailwind.css`

#### Imports

- `@import "tailwindcss"` - Core Tailwind CSS v4 framework
- `@import "tw-animate-css"` - Extended animation utilities from `tw-animate-css` package v1.4.0

#### Custom Variant

- `@custom-variant dark (&:is(.dark *))` - Defines dark mode variant for scoped dark mode support

#### Theme Configuration Block (`@theme inline`)

Maps CSS variables to Tailwind tokens for:

- **Border Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` (calculated from base `--radius`)
- **Semantic Colors**: background, foreground, card, card-foreground, popover, popover-foreground, primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, destructive, border, input, ring
- **Chart Colors**: `--chart-1` through `--chart-5` (5 distinct chart colour sets)
- **Sidebar**: sidebar, sidebar-foreground, sidebar-primary, sidebar-primary-foreground, sidebar-accent, sidebar-accent-foreground, sidebar-border, sidebar-ring

#### Base CSS Variables (Light Mode - `:root`)

All colours use **OKLch colour space** for perceptually uniform theming:

- `--radius: 0.625rem` (10px)
- **Backgrounds**:
  - `--background: oklch(1 0 0)` (pure white)
  - `--foreground: oklch(0.141 0.005 285.823)` (very dark blue-grey)
- **Cards**:
  - `--card: oklch(1 0 0)` (white)
  - `--card-foreground: oklch(0.141 0.005 285.823)` (dark)
- **Primary** (deep blue):
  - `--primary: oklch(0.21 0.006 285.885)` (dark blue)
  - `--primary-foreground: oklch(0.985 0 0)` (near white)
- **Secondary/Muted** (cool grey):
  - `--secondary: oklch(0.967 0.001 286.375)`
  - `--secondary-foreground: oklch(0.21 0.006 285.885)`
- **Accent**: `oklch(0.967 0.001 286.375)` (light grey-blue)
- **Destructive** (warm red-orange):
  - `--destructive: oklch(0.577 0.245 27.325)` (medium red)
- **Borders/Input**:
  - `--border: oklch(0.92 0.004 286.32)` (very light grey)
  - `--input: oklch(0.92 0.004 286.32)`
  - `--ring: oklch(0.705 0.015 286.067)` (focus ring - medium grey-blue)
- **Chart Colors** (vibrant, diverse hues):
  - Chart 1: oklch(0.646 0.222 41.116) - orange
  - Chart 2: oklch(0.6 0.118 184.704) - cyan
  - Chart 3: oklch(0.398 0.07 227.392) - blue
  - Chart 4: oklch(0.828 0.189 84.429) - yellow
  - Chart 5: oklch(0.769 0.188 70.08) - green
- **Sidebar** (matches body):
  - sidebar: oklch(0.985 0 0) (near white)
  - sidebar-foreground: oklch(0.141 0.005 285.823) (dark)

#### Dark Mode (`.dark` class)

Inverted/adjusted values for dark theme:

- `--background: oklch(0.141 0.005 285.823)` (very dark)
- `--foreground: oklch(0.985 0 0)` (white)
- `--card: oklch(0.21 0.006 285.885)` (dark blue)
- `--card-foreground: oklch(0.985 0 0)` (white)
- **Primary** (light grey):
  - `--primary: oklch(0.92 0.004 286.32)`
  - `--primary-foreground: oklch(0.21 0.006 285.885)`
- **Secondary/Muted** (mid grey):
  - `--secondary: oklch(0.274 0.006 286.033)`
  - `--secondary-foreground: oklch(0.985 0 0)`
- **Borders** (semi-transparent white): `oklch(1 0 0 / 10%)`, `oklch(1 0 0 / 15%)`
- **Chart Colors** (adjusted for dark backgrounds, different hue distribution)
- **Sidebar** (dark theme):
  - sidebar: oklch(0.21 0.006 285.885) (dark blue)
  - sidebar-foreground: oklch(0.985 0 0) (white)

#### Base Layer Styles (`@layer base`)

```css
* {
  @apply border-border outline-ring/50;
}
body {
  @apply bg-background text-foreground;
}
```

- All elements use the design system border colour
- All elements use 50% opacity ring colour for focus states
- Body inherits background and foreground colours from CSS variables

---

## 2. UTILITIES

### File: `/Users/dave/src/github.com/daveio/syn-horse/app/lib/utils.ts`

```typescript
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Purpose**: Class name merging utility

- Uses `clsx` for conditional class generation
- Uses `tailwind-merge` to intelligently resolve Tailwind CSS class conflicts
- Allows safe composition of Tailwind classes without duplicates or conflicts
- Standard pattern for shadcn/ui and component libraries

**Usage Pattern**: `cn("bg-primary text-white", condition && "opacity-50")`

---

## 3. SHADCN-VUE CONFIGURATION

### File: `/Users/dave/src/github.com/daveio/syn-horse/components.json`

```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "",
    "css": "app/assets/css/tailwind.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "composables": "@/composables"
  },
  "registries": {}
}
```

**Configuration Details**:

- **Style**: "new-york" (more structured, professional design)
- **TypeScript**: Enabled for all generated components
- **Tailwind CSS**:
  - Points to `app/assets/css/tailwind.css`
  - Base colour: "zinc" (neutral grey palette)
  - CSS variables enabled for theme customization
  - No prefix for class names (standard Tailwind classes)
- **Icons**: Lucide Vue Next (0.575.0)
- **Aliases**: Path aliases for clean imports across the project
- **Registries**: Empty (no private component registries configured)

---

## 4. FONTS CONFIGURATION

### File: `/Users/dave/src/github.com/daveio/syn-horse/nuxt.config.ts` (lines 128-150)

```typescript
fonts: {
  assets: {
    prefix: "/_fonts/",
  },
  defaults: {
    styles: ["normal", "italic"],
    subsets: ["latin-ext", "latin"],
    weights: [400],
  },
  families: [
    {
      name: "Sixtyfour Convergence",
      provider: "bunny",
    },
    {
      name: "Sono",
      provider: "bunny",
    },
    {
      name: "Victor Mono",
      provider: "bunny",
    },
  ],
}
```

**Font Families**:

1. **Sixtyfour Convergence** - Display/headline font (unique, creative style)
2. **Sono** - Display/body font (clean, geometric)
3. **Victor Mono** - Monospace font (code/terminal style)

**Configuration**:

- Provider: Bunny (privacy-focused font CDN)
- Prefix: `/_fonts/` (assets served from this path)
- Defaults:
  - Styles: normal and italic
  - Subsets: latin-ext and latin (European language support)
  - Weights: 400 (regular only; no bold loaded)

---

## 5. COLOUR SPACE: OKLch

### Usage Throughout Theme

**OKLch** is a perceptually uniform colour space used exclusively in this project:

- **L** (Lightness): 0-1 scale (0=black, 1=white)
- **C** (Chroma): Colour intensity/saturation (0=grey, higher=more saturated)
- **h** (Hue): 0-360° (colour wheel position)

**Advantages for Theming**:

- Perceptually uniform: equal differences in L produce equal visual lightness differences
- Excellent for dark mode: light and dark values maintain consistent perceived brightness
- Better contrast and readability in both light and dark themes
- Reduces accessibility issues common with sRGB colour spaces

**Example**:

- Primary in light mode: `oklch(0.21 0.006 285.885)` (21% lightness, very desaturated, blue hue ~286°)
- Primary in dark mode: `oklch(0.92 0.004 286.32)` (92% lightness, same hue family) - maintains colour relationship

---

## 6. LIGHT/DARK MODE IMPLEMENTATION

### Mechanism

- **CSS Variable Scoping**: Light mode uses `:root` selector, dark mode uses `.dark` class selector
- **Theme Toggle**: Controlled via `@nuxtjs/color-mode` module
- **Fallback**: Dark mode is the default (`fallback: "dark"`, `preference: "dark"`)
- **Storage**: Theme preference saved to `color-mode` localStorage key
- **Custom Variant**: `@custom-variant dark (&:is(.dark *))` enables scoped dark mode styling

### Configuration (nuxt.config.ts lines 78-82)

```typescript
colorMode: {
  fallback: "dark",
  preference: "dark",
  storageKey: "color-mode",
}
```

### Scope Strategy

- `.dark` class applied to document root or parent element
- Dark theme CSS variables override light mode within `.dark` scope
- Enables component-level or page-level dark mode without global state changes

---

## 7. TW-ANIMATE-CSS

### Package Information

- **NPM Package**: `tw-animate-css` v1.4.0 (dev dependency)
- **Location**: Imported in tailwind.css via `@import "tw-animate-css"`
- **Purpose**: Extended Tailwind CSS animation utilities beyond the default set

### Usage

Pre-built CSS animations for common UI patterns:

- Fade, slide, bounce, spin, pulse, and more
- Integrates seamlessly with Tailwind's `@apply` directive
- Provides class-based animation utilities (e.g., `animate-fade-in`)

---

## 8. TAILWIND CSS VERSION & CONFIGURATION

### Version: 4.2.0

- Modern Vite plugin (`@tailwindcss/vite` v4.2.0) - no PostCSS needed
- Inline theme configuration supported (see `@theme inline` block)
- No separate `tailwind.config.js` required

### Integration

- **Vite Plugin**: Registered in `nuxt.config.ts` (line 412)
- **CSS Import**: Global CSS in `nuxt.config.ts` (line 90): `css: ["./app/assets/css/tailwind.css"]`
- **Build**: Tailwind CSS processed through Vite plugin during build

---

## 9. CSS VARIABLES SYSTEM

### All CSS Variables (Complete List)

**Semantic naming pattern**: `--{semantic}-{state}`

**Radius Variables**:

- `--radius`: 0.625rem (base border radius)
- `--radius-sm`: derived from base - 4px
- `--radius-md`: derived from base - 2px
- `--radius-lg`: base radius
- `--radius-xl`: derived from base + 4px

**Colour Variables** (all 40 semantic colour pairs):
Each colour has a base and foreground variant for text contrast:

- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--popover` / `--popover-foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` (single - always red)
- `--border`
- `--input`
- `--ring`
- `--chart-1` through `--chart-5`
- `--sidebar` / `--sidebar-foreground`
- `--sidebar-primary` / `--sidebar-primary-foreground`
- `--sidebar-accent` / `--sidebar-accent-foreground`
- `--sidebar-border`
- `--sidebar-ring`

---

## 10. PROJECT STRUCTURE

### Styling-Related Files

```
app/
├── assets/css/
│   └── tailwind.css (4,397 bytes)
├── lib/
│   └── utils.ts (cn() utility)
├── app.vue (minimal root template)
├── pages/
│   └── index.vue
└── plugins/
    └── ssr-width.ts (VueUse SSR provider)

Root Level:
├── components.json (Shadcn-Vue config)
├── nuxt.config.ts (fonts, modules, Tailwind Vite plugin)
└── package.json (dependencies)
```

### Key Dependencies

- **tailwindcss**: 4.2.0 (core)
- **@tailwindcss/vite**: 4.2.0 (Vite plugin)
- **tw-animate-css**: 1.4.0 (dev, animations)
- **tailwind-merge**: 3.5.0 (class merging)
- **clsx**: 2.1.1 (conditional classes)
- **lucide-vue-next**: 0.575.0 (icons)
- **shadcn-nuxt**: 2.4.3 (UI components)
- **@nuxtjs/color-mode**: 4.0.0 (dark mode)

---

## 11. ANIMATIONS & TRANSITIONS

### Supported Animations

Via `tw-animate-css`:

- Pre-built CSS animations for common UI effects
- Accessible via Tailwind utility classes
- Includes fade, slide, bounce, spin, pulse variations

### Transitions

- Tailwind's default transitions available
- Nuxt experimental feature: `viewTransition: true` (for page transitions)

---

## 12. SHADCN-VUE COMPONENTS

### Generated Components Location

- `/Users/dave/src/github.com/daveio/syn-horse/app/components/ui/`
- Installed on-demand using shadcn-nuxt CLI
- Configured with New York style, zinc base colour

### Styling

- All components use CSS variables from tailwind.css
- Inherit light/dark mode automatically
- No hardcoded colours - all themeable

---

## Summary

The syn-horse project uses a sophisticated, modern styling stack:

- **Tailwind CSS 4** with Vite plugin (no PostCSS)
- **OKLch colour space** for perceptually uniform theming
- **CSS variables** for dynamic theming (40+ semantic tokens)
- **Light/dark mode** via `.dark` class with colour-mode module
- **Shadcn-Vue 2.4** for production-ready UI components
- **Extended animations** via tw-animate-css
- **Privacy-focused fonts** via Bunny CDN
- **Nuxt 4** with extensive experimental features enabled

All styling is maintainable, accessible, and fully themeable through CSS variables.

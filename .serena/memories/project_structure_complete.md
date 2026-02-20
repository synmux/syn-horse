# syn-horse: Complete Project Structure & Codebase Inventory

**Last Updated:** 2026-02-20  
**Project Root:** `/Users/dave/src/github.com/daveio/syn-horse`

## Directory Structure (Complete Inventory)

```
syn-horse/
├── app/                          # Nuxt application source (FULLY CREATED)
│   ├── app.vue                   # Root Vue component
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css      # Tailwind CSS v4 theme with OKLch variables
│   │   └── icons/
│   │       └── .keep             # Empty placeholder
│   ├── components/
│   │   └── ui/                   # Shadcn-Vue components directory (empty)
│   ├── lib/
│   │   └── utils.ts              # cn() class merging utility
│   ├── pages/                    # File-based routing (CREATED)
│   │   └── index.vue             # Home page with content rendering
│   └── plugins/
│       └── ssr-width.ts          # SSR viewport width provider for VueUse
├── content/                      # Markdown content (CREATED)
│   └── index.md                  # Home page content with metadata
├── public/                       # Static assets (CREATED)
│   ├── _robots.txt               # Robots meta file
│   ├── favicons/                 # Various favicon formats
│   ├── images/                   # AVIF images
│   └── site.webmanifest          # PWA manifest
├── scripts/
│   └── ensure-trunk.ts           # Pre-flight check for Trunk.io
├── .claude-devtools/
│   └── history.json              # DevTools history (settings.json missing)
├── server/                       # NOT CREATED - Nitro routes not implemented
├── composables/                  # NOT CREATED - No composables yet
├── middleware/                   # NOT CREATED - No middleware yet
├── layouts/                      # NOT CREATED - No custom layouts
├── tests/                        # NOT CREATED - Test suite configured but empty
└── [config files - see below]
```

## Core Vue/TypeScript Files Analysis

### app/app.vue

- **Type:** Root component
- **Purpose:** Application root with NuxtLayout and NuxtPage
- **Content:** Simple wrapper using Nuxt built-in components

### app/pages/index.vue

- **Type:** Page component
- **Purpose:** Home page
- **Functionality:**
  - Fetches content from "content" collection at path "/"
  - Uses ContentRenderer to display markdown
  - Sets SEO meta from content metadata
  - Shows fallback "Home not found" if content missing
- **Dependencies:** useAsyncData, useSeoMeta, ContentRenderer

### app/lib/utils.ts

- **Type:** Utility module
- **Purpose:** CSS class merging utility
- **Content:** `cn()` function combining clsx + tailwind-merge for Shadcn-Vue
- **Exports:** cn function

### app/plugins/ssr-width.ts

- **Type:** Nuxt plugin
- **Purpose:** SSR viewport width configuration
- **Content:** Sets default SSR width to 1024px using VueUse's provideSSRWidth
- **Executes:** Automatically on app initialization

### app/assets/css/tailwind.css

- **Type:** CSS configuration
- **Framework:** Tailwind CSS v4 (via Vite plugin)
- **Theme:**
  - OKLch color space (perceptually uniform)
  - Light mode: light backgrounds, dark text
  - Dark mode: dark backgrounds, light text
  - Semantic colors: primary, secondary, muted, accent, destructive
  - Sidebar colors for future UI use
  - Chart colors (5 variants)
- **Includes:** Tailwind base layer, tw-animate-css plugin

## Configuration Files

### Build & Framework

- **nuxt.config.ts** - Comprehensive Nuxt 4 configuration with 30+ modules
- **wrangler.jsonc** - Cloudflare Workers deployment config with AI/Browser/Images bindings
- **content.config.ts** - Content collection configuration
- **vitest.config.mts** - Test framework config (3 projects: unit, e2e, nuxt)
- **tsconfig.json** - TypeScript config with project references

### Code Quality

- **eslint.config.mjs** - ESLint config extending Nuxt defaults
- **prettier.config.mjs** - Prettier formatting config
- **.nuxtrc** - Nuxt runtime config (Nuxt test-utils setup)

### Component & Form Configuration

- **components.json** - Shadcn-Vue configuration (New York, zinc colors)
- **formkit.config.ts** - FormKit Vue form framework config
- **formkit.theme.ts** - Extensive FormKit theme (39,671 tokens)

### Data & Services

- **colada.options.ts** - Pinia Colada query plugin (empty, needs implementation)
- **env.d.ts** - TypeScript H3/Cloudflare type extensions

### Other

- **package.json** - Dependencies and scripts (Bun 1.3.9)
- **LICENSE** - License file
- **mise.toml** - Runtime/tool version management
- **.tool-versions** - Tool versions (similar to mise.toml)
- **worker-configuration.d.ts** - Auto-generated Wrangler types (DON'T EDIT)

## Project Documentation

### AGENTS.md / CLAUDE.md (symlink)

- Complete project documentation for AI agents
- Tech stack table with versions
- Command reference
- Task completion protocol
- Code conventions (British English, no single-letter vars, no React)
- Cloudflare bindings reference
- Critical file modification protocol

### README.md

- Project overview
- Setup instructions
- Development/deployment commands
- Tech stack summary
- Cloudflare platform bindings overview
- Project structure overview

## Package Dependencies (Key Selections)

### UI & Components

- Vue 3.5.28
- Nuxt 4.3.1
- Shadcn-Vue 2.4.3 (New York, zinc)
- Lucide Vue Next 0.575.0
- Tailwind CSS 4.2.0 (Vite plugin)
- Reka-UI 2.8.0

### Forms & Validation

- FormKit + FormKit Pro
- Vee-Validate 4.15.1
- Zod 4.3.6 & Valibot

### Data & State

- Pinia 0.11.3 + Colada
- Drizzle ORM 0.45.1
- Better-SQLite3 12.6.2
- SQLite3 5.1.7
- LibSQL client 0.17.0

### 3D & Animation

- Three.js 0.183.0
- FormKit Auto-Animate

### Utilities

- VueUse 14.2.1
- Magic Regexp 0.10.0
- Nanoid 5.1.6
- Class Variance Authority 0.7.1

### Content & SEO

- @nuxt/content 3.11.2
- @nuxtjs/seo 3.4.0
- Nuxt OG Image

### Deployment & Dev Tools

- Wrangler 4.66.0 (Cloudflare Workers)
- @nuxthub/core 0.10.6
- Vitest 4.0.18
- Playwright Core 1.58.2

## Status Summary: [CREATE] Directories

From AGENTS.md, marked as [CREATE] (needs creation):

| Directory      | Status        | Notes                                              |
| -------------- | ------------- | -------------------------------------------------- |
| `server/`      | ✗ NOT CREATED | No Nitro routes or API endpoints yet               |
| `pages/`       | ✓ EXISTS      | index.vue exists for home page                     |
| `composables/` | ✗ NOT CREATED | No Vue composables yet                             |
| `layouts/`     | ✗ NOT CREATED | Using default Nuxt layout                          |
| `tests/`       | ✗ NOT CREATED | Test infrastructure configured but no actual tests |

## Key Observations

1. **Minimal but complete base:** Project has essential files but no actual content
2. **Extensive module ecosystem:** 30+ Nuxt modules configured but many may be unused
3. **Content-driven:** Uses @nuxt/content for markdown-based pages
4. **No custom layouts/middleware:** Relies on Nuxt defaults
5. **FormKit configured but empty:** formkit.theme.ts is very large (39KB) but content not reviewed
6. **Components empty:** Shadcn-Vue UI directory ready but no components installed
7. **No server routes:** Despite Cloudflare bindings configured, no actual API endpoints
8. **Rich devtool support:** Includes Claude DevTools, Nuxt DevTools, Dev Skims
9. **Security-first:** Nuxt Security module enabled, SRI enabled
10. **Testing configured:** Vitest + Playwright set up but no tests written
11. **Assets present:** SVG icons, AVIF images, favicons all in place

## Critical Configuration Flags

- `.claude-devtools/settings.json` - NOT FOUND (would contain autoConfirm flag)
- **autoConfirm status:** Unknown - manual check required before modifying critical files
- **Critical files that trigger restart:** nuxt.config.ts, tsconfig.json, .nuxtrc, app.config.ts

## Cloudflare Bindings Available

| Binding             | Type   | Status                          |
| ------------------- | ------ | ------------------------------- |
| AI                  | Remote | Configured                      |
| BROWSER             | Remote | Configured                      |
| IMAGES              | Remote | Configured                      |
| MEDIA               | Remote | Not yet configured              |
| EMAIL               | Remote | Configured (ponygirl@syn.horse) |
| ASSETS              | Local  | Configured (.output/public/)    |
| CF_VERSION_METADATA | Local  | Configured                      |

## Git Configuration

- Root: `/Users/dave/src/github.com/daveio/syn-horse`
- Current branch: main
- Status: Clean (no uncommitted changes)
- Recent: 5 commits (CI/workflow updates, build config, SEO, setup)
- CODEOWNERS: @daveio
- Commit command: `git add -A . && oco --fgm --yes`

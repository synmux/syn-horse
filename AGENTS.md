# syn-horse — AI Agent Context

## Project Overview

**syn.horse** is a creative web application deployed to Cloudflare Workers. It serves the custom domains `syn.horse` and `www.syn.horse`. Built with Nuxt 4 (Vue 3) and TypeScript, it uses a content-driven architecture powered by `@nuxt/content` with markdown files rendered via `ContentRenderer`. The project has extensive infrastructure and tooling configured but minimal application code — it is primed for rapid feature development.

**Current state:** Infrastructure-heavy, code-light. 32 Nuxt modules loaded, 64+ dependencies installed, but the application consists of a single content page (`pages/index.vue`) rendering markdown from `content/index.md`.

## Tech Stack

| Layer       | Technology                       | Version / Notes                              |
| ----------- | -------------------------------- | -------------------------------------------- |
| Framework   | Nuxt.js                          | ^4.3.1                                       |
| UI Library  | Vue                              | ^3.5.28                                      |
| Language    | TypeScript                       | Strict mode, ES modules                      |
| CSS         | Tailwind CSS                     | ^4.2.0 (Vite plugin, not PostCSS)            |
| Components  | Shadcn-Vue + Reka UI             | ^2.4.3 (New York, zinc) + ^2.8.0             |
| Icons       | Lucide Vue Next + Solar Icons    | ^0.575.0 + 1.2.0                             |
| Forms       | FormKit + FormKit Pro            | 1.7.2 + ^0.127.24                            |
| Validation  | Vee-Validate + Zod + Valibot     | ^4.15.1 + ^4.3.6 + ^4.15.1                   |
| State       | Pinia + Pinia Colada + Pinia ORM | 0.11.3 + ^0.21.4 + ^1.10.2                   |
| Database    | Drizzle ORM + SQLite clients     | ^0.45.1 (better-sqlite3, libsql)             |
| Content     | @nuxt/content                    | ^3.11.2 (native SQLite)                      |
| 3D          | Three.js + TresJS                | ^0.183.0 + ^5.3.0                            |
| Composables | VueUse                           | ^14.2.1                                      |
| SEO         | @nuxtjs/seo + nuxt-og-image      | ^3.4.0 + ^6.0.0-beta.34                      |
| Security    | nuxt-security                    | 2.5.1                                        |
| Analytics   | nuxt-gtag + Partytown            | 4.1.0 + 2.0.0                                |
| Platform    | NuxtHub (blob, cache, db, kv)    | 0.10.6                                       |
| Deployment  | Cloudflare Workers via Wrangler  | ^4.66.0                                      |
| Runtime     | Bun                              | 1.3.9 (pinned via .bun-version)              |
| Node        | Node.js                          | 24.13.1 (pinned via .node-version)           |
| Linting     | Trunk.io + ESLint + Prettier     | See Linting Stack section                    |
| Testing     | Vitest + Playwright              | ^4.0.18 + ^1.58.2 (configured, no tests yet) |

## Commands

```bash
# Development
bun run dev                   # Nuxt dev server on localhost:3000
bun run preview               # Build + Wrangler local preview

# Build & Deploy
bun run build                 # Build for production
bun run deploy                # Build + deploy to production (syn.horse)
bun run deploy:nonprod        # Build + upload version (staging)

# Lint & Format
bun run lint                  # ESLint + Trunk + tsc --noEmit (sequential)
bun run lint:fix              # Auto-fix lint issues
bun run format                # Prettier + Trunk formatting (sequential)
bun run lint:types            # TypeScript type checking only

# Testing
bun run test                  # Vitest (all projects)
bun run test:unit             # Vitest unit tests only
bun run test:nuxt             # Vitest Nuxt environment tests only
bun run test:watch            # Vitest watch mode
bun run test:coverage         # Vitest with coverage
bun run test:e2e              # Playwright E2E tests
bun run test:e2e:ui           # Playwright E2E with UI

# Types
bun run types                 # Regenerate worker-configuration.d.ts
```

## Task Completion Protocol

After every feature, fix, or refactor:

1. `bun run lint` — fix all errors
2. `bun run format` — ensure formatting
3. `bun run test` — all tests pass (when tests exist)
4. `bun run build` — verify build succeeds
5. `git add -A . && oco --fgm --yes` — commit with AI-generated message

## Code Conventions

- **British English** spelling and grammar throughout
- **No single-letter variables** — use descriptive names everywhere, including inner loops
- **No React** — always use Vue/Nuxt alternatives
- **Finish all code** or mark `TODO: [description]`; fail explicitly, never silently
- **Ship breaking changes** freely; no migration code unless asked
- **Extract duplicated logic** to shared utilities immediately with docs, tests, and types

### TypeScript

- Strict mode with `noEmit` type checking
- ES modules (`"type": "module"`)
- Nuxt auto-imports for Vue composables, components, and utilities
- `bundlerResolution` enabled via `future.typescriptBundlerResolution`

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not PostCSS)
- OKLch colour space for perceptually uniform theming
- `cn()` utility in `app/lib/utils.ts` (clsx + tailwind-merge)
- Shadcn-Vue: New York style, zinc base, CSS variables, Lucide icons
- `tw-animate-css` for animation utilities
- Dark mode via `@nuxtjs/color-mode` (class-based `.dark`, default preference: dark)
- Fonts via Bunny CDN: Sixtyfour Convergence (display), Sono (body), Victor Mono (monospace)

### Git

- Emoji-prefixed commit messages
- Commit command: `git add -A . && oco --fgm --yes`
- All files owned by `@daveio` (CODEOWNERS)

## Directory Structure

```plaintext
app/                            # Nuxt application source
  app.vue                       # Root component (NuxtLayout + NuxtPage wrapper)
  assets/
    css/tailwind.css            # Tailwind v4 theme (OKLch light/dark, 40+ tokens)
    icons/                      # Custom SVG icons (empty, .keep)
  components/
    ui/                         # Shadcn-Vue components (install on demand, empty)
  lib/
    utils.ts                    # cn() class merging utility
  pages/
    index.vue                   # Home page (content-driven via @nuxt/content)
  plugins/
    ssr-width.ts                # SSR viewport width provider for VueUse (1024px)
content/                        # Nuxt Content markdown files
  index.md                      # Home page content (title, description, body)
public/                         # Static assets
  images/                       # AVIF images (logotype, favicon, ambio, pendant)
  site.webmanifest              # PWA manifest
  android-chrome-*.png          # PWA icons
  apple-touch-icon.png          # iOS icon
  favicon-*.png, favicon.ico    # Browser favicons
  _robots.txt                   # Robots meta file
scripts/
  ensure-trunk.ts               # Trunk.io availability check (used in postinstall)
server/                         # Nitro server routes and middleware [NOT YET CREATED]
composables/                    # Shared Vue composables [NOT YET CREATED]
layouts/                        # Nuxt layout components [NOT YET CREATED]
tests/                          # Vitest and Playwright tests [NOT YET CREATED]
  test/unit/                    # Unit tests (configured in vitest.config.mts)
  test/e2e/                     # E2E tests (configured in vitest.config.mts)
  test/nuxt/                    # Nuxt environment tests (configured in vitest.config.mts)
```

## Cloudflare Bindings

Access bindings in Nitro server routes via `event.context.cloudflare.env`:

### Service Bindings

| Binding               | Type                    | Purpose                                  |
| --------------------- | ----------------------- | ---------------------------------------- |
| `AI`                  | `Ai`                    | Cloudflare Workers AI (remote)           |
| `BROWSER`             | `Fetcher`               | Browser Rendering (remote)               |
| `IMAGES`              | `ImagesBinding`         | Image processing (remote)                |
| `EMAIL`               | `SendEmail`             | Email from `ponygirl@syn.horse` (remote) |
| `ASSETS`              | `Fetcher`               | Static assets from `.output/public/`     |
| `CF_VERSION_METADATA` | `WorkerVersionMetadata` | Worker version info                      |

### Environment Variables (strings)

| Variable                | Purpose                         |
| ----------------------- | ------------------------------- |
| `ADMIN_TOKEN`           | Admin authentication secret     |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier   |
| `NUXT_FORMKIT_PRO_KEY`  | FormKit Pro licence key         |
| `NUXT_PUBLIC_GTAG_ID`   | Google Analytics measurement ID |

### NuxtHub Platform Bindings

NuxtHub (`@nuxthub/core`) provides additional Cloudflare bindings managed automatically:

| Feature | Configuration | Purpose                 |
| ------- | ------------- | ----------------------- |
| `blob`  | `true`        | R2 object/blob storage  |
| `cache` | `true`        | KV-backed caching layer |
| `db`    | `"sqlite"`    | D1 SQLite database      |
| `kv`    | `true`        | Key-value store         |

Local development data is stored in `.data/` directory.

```typescript
// Example: server/api/example.ts
export default defineEventHandler(async (event) => {
  const { env } = event.context.cloudflare
  const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt: "Hello"
  })
  return result
})
```

## Nuxt Modules (32 active)

| Module                         | Category      | Purpose                                      |
| ------------------------------ | ------------- | -------------------------------------------- |
| `@formkit/auto-animate/nuxt`   | Animation     | Auto-animate FormKit transitions             |
| `@formkit/nuxt`                | Forms         | FormKit form framework (Pro enabled)         |
| `@nuxt/a11y`                   | Accessibility | Accessibility auditing (alpha)               |
| `@nuxt/content`                | Content       | Markdown CMS with SQLite collections         |
| `@nuxt/devtools`               | Development   | Nuxt DevTools with VS Code integration       |
| `@nuxt/eslint`                 | Code Quality  | ESLint integration with checker              |
| `@nuxt/fonts`                  | Typography    | Font management via Bunny CDN                |
| `@nuxt/hints`                  | Development   | Performance hints (alpha)                    |
| `@nuxt/icon`                   | Icons         | Icon framework (CSS mode)                    |
| `@nuxt/image`                  | Media         | Image optimisation (Cloudflare, AVIF/WebP)   |
| `@nuxt/scripts`                | Performance   | Third-party script management                |
| `@nuxt/test-utils/module`      | Testing       | Vitest + Nuxt environment integration        |
| `@nuxtjs/color-mode`           | Theming       | Light/dark mode (dark default)               |
| `@nuxtjs/html-validator`       | Quality       | HTML validation in development               |
| `@nuxtjs/partytown`            | Performance   | Move heavy scripts to web workers            |
| `@nuxtjs/seo`                  | SEO           | Comprehensive SEO (robots, sitemap, etc.)    |
| `@oro.ad/nuxt-claude-devtools` | Development   | Claude AI DevTools integration               |
| `@pinia/colada-nuxt`           | Data Fetching | Async query caching for Pinia                |
| `@pinia/nuxt`                  | State         | Pinia state management                       |
| `@solar-icons/nuxt`            | Icons         | Solar icon set (auto-import, `Solar` prefix) |
| `@tresjs/nuxt`                 | 3D            | Three.js for Vue (TresJS)                    |
| `@unlazy/nuxt`                 | Performance   | Lazy image loading                           |
| `@vee-validate/nuxt`           | Validation    | Form validation (Zod + Valibot adapters)     |
| `@vueuse/nuxt`                 | Composables   | VueUse reactive utilities                    |
| `magic-regexp/nuxt`            | Utilities     | Type-safe regular expressions                |
| `nitro-cloudflare-dev`         | Development   | Cloudflare dev environment bindings          |
| `nuxt-gtag`                    | Analytics     | Google Analytics (production only)           |
| `nuxt-svgo`                    | Media         | SVG optimisation                             |
| `reka-ui/nuxt`                 | UI            | Headless UI component primitives             |
| `shadcn-nuxt`                  | UI            | Shadcn-Vue component system                  |
| `@nuxthub/core`                | Platform      | NuxtHub (blob, cache, db, kv)                |
| `nuxt-security`                | Security      | Security headers, SRI, CSP                   |

**Note:** `@nuxtjs/i18n` (10.2.3) is installed but commented out in the modules array.

## Experimental Features (16 active)

The following experimental Nuxt features are enabled in `nuxt.config.ts`:

- `browserDevtoolsTiming` — Browser DevTools performance timing
- `buildCache` — Build output caching
- `chromeDevtoolsProjectSettings` — Chrome DevTools project integration
- `clientFallback` — Client-side fallback rendering
- `clientNodeCompat` — Node.js API compatibility on client
- `componentIslands` — Island architecture for components
- `crossOriginPrefetch` — Cross-origin resource prefetching
- `decorators` — TypeScript decorator support
- `emitRouteChunkError: "automatic"` — Automatic chunk error handling
- `headNext` — Next-generation head management
- `inlineRouteRules` — Inline route rules in pages
- `lazyHydration` — Deferred component hydration
- `localLayerAliases` — Local layer path aliases
- `payloadExtraction` — Payload extraction for static sites
- `typedPages` — Type-safe page routing
- `viewTransition` — View Transitions API support
- `viteEnvironmentApi` — Vite Environment API
- `watcher: "parcel"` — Parcel file watcher (faster than default)
- `writeEarlyHints` — HTTP 103 Early Hints

## Key Files

| File                        | Purpose                             | Editable                                 |
| --------------------------- | ----------------------------------- | ---------------------------------------- |
| `nuxt.config.ts`            | Nuxt configuration (417 lines)      | Yes (see Critical Files section)         |
| `wrangler.jsonc`            | Cloudflare Worker config            | Yes                                      |
| `tsconfig.json`             | TypeScript project references       | Yes (see Critical Files section)         |
| `components.json`           | Shadcn-Vue component config         | Yes                                      |
| `env.d.ts`                  | H3/Cloudflare type extensions       | Yes                                      |
| `content.config.ts`         | Nuxt Content collection definitions | Yes                                      |
| `formkit.config.ts`         | FormKit + Pro plugin setup          | Yes                                      |
| `formkit.theme.ts`          | FormKit Regenesis theme (generated) | Regenerate via FormKit CLI               |
| `colada.options.ts`         | Pinia Colada query options          | Yes                                      |
| `vitest.config.mts`         | Vitest test project configuration   | Yes                                      |
| `eslint.config.mjs`         | ESLint config (extends Nuxt)        | Yes                                      |
| `prettier.config.mjs`       | Prettier formatting rules           | Yes                                      |
| `worker-configuration.d.ts` | Auto-generated Wrangler types       | **No** — regenerate with `bun run types` |

## Wrangler Configuration

| Setting             | Value                        |
| ------------------- | ---------------------------- |
| Compatibility Date  | 2026-02-17                   |
| Compatibility Flags | `nodejs_compat`              |
| Nitro Preset        | `cloudflare_module`          |
| Placement           | Smart (edge optimised)       |
| Custom Domains      | `syn.horse`, `www.syn.horse` |
| Workers Dev         | Enabled                      |
| Observability       | Enabled                      |
| Source Map Upload   | Enabled                      |
| Minification        | Enabled                      |

## Vee-Validate Component Names

Vee-Validate components are renamed to avoid conflicts:

| Standard Name  | Renamed To        |
| -------------- | ----------------- |
| `Form`         | `VeeForm`         |
| `Field`        | `VeeField`        |
| `FieldArray`   | `VeeFieldArray`   |
| `ErrorMessage` | `VeeErrorMessage` |

## Linting Stack

### ESLint

- Extends Nuxt auto-generated config (`.nuxt/eslint.config.mjs`)
- Checker mode enabled (real-time feedback)
- Ignores: `worker-configuration.d.ts`, `.agents/**`, `.claude/**`, `.data/**`, `.gemini/**`

### Prettier

- Print width: 120
- No semicolons (except TypeScript overrides with trailing commas)
- Double quotes
- 2-space indentation
- LF line endings
- Arrow parens: always

### Trunk.io

Orchestrates 11 linters via `.trunk/trunk.yaml`:

| Linter         | Version | Purpose                   |
| -------------- | ------- | ------------------------- |
| actionlint     | 1.7.11  | GitHub Actions validation |
| checkov        | 3.2.504 | Infrastructure security   |
| eslint         | 10.0.0  | JavaScript/TypeScript     |
| git-diff-check | -       | Git diff validation       |
| markdownlint   | 0.47.0  | Markdown linting          |
| oxipng         | 10.1.0  | PNG optimisation          |
| prettier       | 3.8.1   | Code formatting           |
| taplo          | 0.10.0  | TOML linting              |
| trufflehog     | 3.93.3  | Secret detection          |
| yamllint       | 1.38.0  | YAML validation           |

Pre-commit hooks: `trunk-fmt-pre-commit`, `trunk-check-pre-push`

### Other

- **DevSkim** — Microsoft security scanner (CI only, SARIF output)
- **Dependabot** — Daily dependency updates for npm and GitHub Actions

## CI/CD Workflows

### ci.yml — Lint & Build

Triggers on push and pull request. Steps:

1. Trunk linting (`trunk-io/trunk-action`)
2. Setup Node 24.13.1 + Bun 1.3.9
3. `bun install` (two passes with trust)
4. `bun run lint:types` (TypeScript check)
5. `bun run build` (production build)

### claude.yml — Claude Code Integration

Triggers on issue/PR comments containing `@claude`. Runs Claude Code Action for automated assistance.

### claude-code-review.yml — Automated Code Review

Triggers on PR opened/synchronised/ready. Runs Claude Code Review plugin for automated review.

### devskim.yml — Security Scanning

Triggers on push and pull request. Runs DevSkim analysis and uploads SARIF results to GitHub Security tab.

## SEO & Metadata Configuration

```typescript
// nuxt.config.ts site settings
site: {
  defaultLocale: "en",
  description: "it's syn and it's a horse.",
  indexable: true,
  name: "syn dot horse",
  url: "https://syn.horse",
}
```

- **Robots:** Disallows `/admin`, `/private`; blocks GPTBot and ChatGPT-User entirely
- **Schema.org:** Identity configured (needs real data — currently placeholder "John Doe")
- **OG Image:** Module enabled with defaults (no custom template yet)
- **Link Checker:** Excludes `/api/**`, generates HTML and markdown reports

## Shadcn-Vue Aliases

```json
{
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "composables": "@/composables"
}
```

Install new Shadcn-Vue components with:

```bash
bunx shadcn-vue@latest add <component-name>
```

<!-- NUXT-DEVTOOLS:CRITICAL-FILES -->

## Critical Configuration Files

The following files trigger a full Nuxt restart when modified:

- `nuxt.config.ts`
- `nuxt.config.js`
- `app.config.ts`
- `app.config.js`
- `.nuxtrc`
- `tsconfig.json`

### MANDATORY CHECK (EVERY TIME, NO EXCEPTIONS)

**BEFORE modifying ANY of these files, you MUST:**

```plaintext
1. READ .claude-devtools/settings.json
2. CHECK criticalFiles.autoConfirm value
3. IF false OR file missing -> STOP and ASK user
4. IF true -> inform user, then proceed
```

**This check is REQUIRED every single time, even if you checked before in this session.**

### Order of Operations

1. **Complete ALL prerequisite tasks FIRST**
   - Create all new files that will be referenced
   - Install all dependencies
   - Write all related code

2. **Verify prerequisites exist**
   - All files referenced in config change must exist
   - All imports must be valid

3. **Check settings file** (read `.claude-devtools/settings.json`)

4. **Act based on autoConfirm setting**

### Current Setting

**autoConfirm: DISABLED**

MUST ask user and WAIT for explicit "yes" before proceeding.

---

After restart, conversation history is preserved. User can send "continue" to resume.

<!-- /NUXT-DEVTOOLS:CRITICAL-FILES -->

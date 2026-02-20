# syn.horse

A creative web application built with Nuxt 4, Vue 3, and TypeScript, deployed to Cloudflare Workers. Serves the custom domains [syn.horse](https://syn.horse) and [www.syn.horse](https://www.syn.horse).

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) with [Vue 3](https://vuejs.org/)
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLch colour theming
- **Components:** [Shadcn-Vue](https://www.shadcn-vue.com/) (New York style) + [Reka UI](https://reka-ui.com/) (headless primitives)
- **Icons:** [Lucide](https://lucide.dev/) + [Solar Icons](https://icon-sets.iconify.design/solar/)
- **Forms:** [FormKit](https://formkit.com/) with Pro inputs + [Vee-Validate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **State:** [Pinia](https://pinia.vuejs.org/) with [Colada](https://pinia-colada.esm.dev/) (async query caching) + [Pinia ORM](https://orm.pinia.vuejs.org/)
- **Content:** [@nuxt/content](https://content.nuxt.com/) (markdown CMS with SQLite)
- **3D:** [Three.js](https://threejs.org/) via [TresJS](https://tresjs.org/)
- **SEO:** [@nuxtjs/seo](https://nuxtseo.com/) (robots, sitemap, schema.org, OG images)
- **Platform:** [NuxtHub](https://hub.nuxt.com/) (blob storage, KV, caching, D1 database)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Package Manager:** [Bun](https://bun.sh/) 1.3.9

## Prerequisites

- [Bun](https://bun.sh/) 1.3.9+ (version pinned in `.bun-version`)
- [Node.js](https://nodejs.org/) 24.x (version pinned in `.node-version`)
- A Cloudflare account (for deployment)

## Setup

```bash
bun install
```

The postinstall script handles everything automatically:

1. Ensures [Trunk.io](https://trunk.io/) is available (or falls back to the npm launcher)
2. Runs `nuxt prepare` to generate TypeScript types and module augmentations
3. Generates `worker-configuration.d.ts` from Wrangler bindings in `nuxt.config.ts`
4. Formats the generated types file with Prettier

## Development

```bash
bun run dev
```

Starts the Nuxt development server on `http://localhost:3000` with hot module replacement, Nuxt DevTools, and VS Code code-server integration (port 3094).

To preview the production build locally with Wrangler (simulating the Cloudflare Workers environment):

```bash
bun run preview
```

To remove build artefacts and caches (useful for recovering from stale state):

```bash
bun run clean
```

## Linting & Formatting

```bash
bun run lint          # ESLint + Trunk.io + TypeScript type checking
bun run lint:fix      # Auto-fix lint issues
bun run format        # Prettier + Trunk.io formatting
bun run lint:types    # TypeScript type checking only
```

Trunk.io orchestrates 10 linters including ESLint, Prettier, actionlint, checkov, markdownlint, oxipng, trufflehog (secret detection), and yamllint.

## Testing

```bash
bun run test          # All test projects (unit + nuxt)
bun run test:unit     # Unit tests only (node environment)
bun run test:nuxt     # Nuxt environment tests only
bun run test:watch    # Watch mode
bun run test:coverage # With coverage report
bun run test:e2e      # Playwright E2E tests
bun run test:e2e:ui   # Playwright with interactive UI
```

Test configuration lives in `vitest.config.mts` with three test projects:

- **unit** — `test/unit/*.{test,spec}.ts` (node environment)
- **nuxt** — `test/nuxt/*.{test,spec}.ts` (Nuxt environment via `@nuxt/test-utils`)
- **e2e** — `test/e2e/*.{test,spec}.ts` (Playwright)

## Database

```bash
bun run db:generate           # Generate migration from schema changes
bun run db:migrate            # Apply pending migrations (local)
bun run db:migrate:remote     # Apply pending migrations (production D1)
```

See [DB.md](DB.md) for the full database guide including emergency procedures, advanced usage, and all available commands.

## Deployment

```bash
bun run deploy              # Production deploy to syn.horse
bun run deploy:nonprod      # Upload a new version (staging)
```

Deployment targets the custom domains `syn.horse` and `www.syn.horse` via Cloudflare Workers with smart placement (edge-optimised routing). Source maps are uploaded automatically and observability is enabled.

## Cloudflare Platform Bindings

The application has access to the following Cloudflare services (configured in `nuxt.config.ts` and managed by NuxtHub):

| Service           | Binding               | Description                           |
| ----------------- | --------------------- | ------------------------------------- |
| Workers AI        | `AI`                  | LLM inference and AI models           |
| Browser Rendering | `BROWSER`             | Headless browser automation           |
| Images            | `IMAGES`              | Image transformation and optimisation |
| Email             | `EMAIL`               | Send email from `ponygirl@syn.horse`  |
| Assets            | `ASSETS`              | Static file serving                   |
| Version Metadata  | `CF_VERSION_METADATA` | Worker version information            |

Additionally, [NuxtHub](https://hub.nuxt.com/) provides managed access to:

- **Blob Storage** — R2 object storage
- **Cache** — KV-backed caching layer
- **Database** — D1 SQLite database (via Drizzle ORM)
- **Key-Value** — General-purpose KV store

## Project Structure

```plaintext
app/                            # Nuxt application source
  app.vue                       # Root component
  assets/css/tailwind.css       # Tailwind v4 theme (OKLch colour system)
  components/ui/                # Shadcn-Vue components (install on demand)
  lib/utils.ts                  # cn() class merging utility
  pages/index.vue               # Home page (content-driven)
  plugins/ssr-width.ts          # SSR viewport width for VueUse
content/                        # Markdown content (rendered via @nuxt/content)
public/                         # Static assets (images, favicons, manifest)
scripts/                        # Build helper scripts
```

## Architecture Notes

### Content-Driven

The home page (`app/pages/index.vue`) fetches markdown from the `content/` directory using `@nuxt/content`'s collection API with native SQLite backing. SEO metadata is extracted from frontmatter.

### Theming

The design system uses the OKLch colour space for perceptually uniform theming. Light and dark modes are defined as CSS custom properties in `app/assets/css/tailwind.css` with 40+ semantic colour tokens. Dark mode is the default and is toggled via the `.dark` class (managed by `@nuxtjs/color-mode`).

### Forms

Two form systems are available: **FormKit** (with Pro inputs and the Regenesis theme) for complex forms, and **Vee-Validate** (with Zod and Valibot adapters) for validation. Vee-Validate components are renamed with a `Vee` prefix to avoid conflicts (`VeeForm`, `VeeField`, etc.).

### Security

- **nuxt-security** provides security headers, SRI (Subresource Integrity), and CSP
- **Robots** blocks AI crawlers (GPTBot, ChatGPT-User) and restricts `/admin`, `/private`
- **trufflehog** scans for leaked secrets in pre-commit hooks
- **DevSkim** runs security analysis in CI

## Environment Variables

| Variable                | Purpose                         |
| ----------------------- | ------------------------------- |
| `ADMIN_TOKEN`           | Admin authentication secret     |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier   |
| `NUXT_FORMKIT_PRO_KEY`  | FormKit Pro licence key         |
| `NUXT_PUBLIC_GTAG_ID`   | Google Analytics measurement ID |

## CI/CD

GitHub Actions workflows handle:

- **CI** — Trunk linting, TypeScript checking, and production build on every push/PR
- **Claude Code** — Automated assistance via `@claude` mentions in issues and PRs
- **Claude Code Review** — Automated code review on pull requests
- **DevSkim** — Security scanning with SARIF output to GitHub Security tab
- **Dependabot** — Daily dependency updates for npm packages and GitHub Actions

## Licence

MIT License. Copyright (c) 2025 [Dave Williams](https://github.com/daveio).

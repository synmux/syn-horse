# syn-horse — AI Agent Context

## Project Overview

**syn.horse** is a creative web application deployed to Cloudflare Workers. It serves the domains `syn.horse` and `www.syn.horse`. The project uses Nuxt 4 (Vue 3) with TypeScript, Tailwind CSS v4, and multiple Cloudflare platform bindings.

## Tech Stack

| Layer       | Technology          | Version                       |
| ----------- | ------------------- | ----------------------------- |
| Framework   | Nuxt.js             | 4.3.1                         |
| UI Library  | Vue                 | 3.5.28                        |
| Language    | TypeScript          | Strict, ES modules            |
| CSS         | Tailwind CSS        | 4.2.0 (Vite plugin)           |
| Components  | Shadcn-Vue          | 2.4.3 (New York, zinc)        |
| Icons       | Lucide Vue Next     | 0.574.0                       |
| 3D          | Three.js            | 0.183.0                       |
| Composables | VueUse              | 14.2.1                        |
| Deployment  | Cloudflare Workers  | Wrangler 4.66.0               |
| Runtime     | Bun                 | 1.3.9                         |
| Linting     | Trunk.io + ESLint   | Prettier formatting           |
| Testing     | Vitest + Playwright | Configured, not yet populated |

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
bun run lint                  # ESLint + Trunk + tsc --noEmit
bun run lint:fix              # Auto-fix lint issues
bun run format                # Prettier + Trunk formatting
bun run lint:types            # TypeScript type checking only

# Testing
bun run test                  # Vitest
bun run test:watch            # Vitest watch mode
bun run test:coverage         # Vitest with coverage
bun run test:e2e              # Playwright E2E

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

### Styling

- Tailwind CSS v4 via Vite plugin (not PostCSS)
- OKLch colour space for perceptually uniform theming
- `cn()` utility in `app/lib/utils.ts` (clsx + tailwind-merge)
- Shadcn-Vue: New York style, zinc base, CSS variables, Lucide icons

### Git

- Emoji-prefixed commit messages
- Commit command: `git add -A . && oco --fgm --yes`
- All files owned by `@daveio` (CODEOWNERS)

## Directory Structure

```plaintext
app/                        # Nuxt application source
  app.vue                   # Root Vue component
  assets/css/tailwind.css   # Tailwind v4 theme (OKLch light/dark)
  components/ui/            # Shadcn-Vue components (install on demand)
  lib/utils.ts              # cn() class merging utility
  plugins/ssr-width.ts      # SSR viewport width for VueUse
public/                     # Static assets (images, favicons, manifest)
server/                     # [CREATE] Nitro server routes and middleware
pages/                      # [CREATE] Nuxt file-based routing
composables/                # [CREATE] Shared Vue composables
layouts/                    # [CREATE] Nuxt layout components
tests/                      # [CREATE] Vitest and Playwright tests
```

## Cloudflare Bindings

Access bindings in Nitro server routes via `event.context.cloudflare.env`:

| Binding                 | Type                    | Purpose                                  |
| ----------------------- | ----------------------- | ---------------------------------------- |
| `AI`                    | `Ai`                    | Cloudflare Workers AI (remote)           |
| `BROWSER`               | `Fetcher`               | Browser Rendering (remote)               |
| `IMAGES`                | `ImagesBinding`         | Image processing (remote)                |
| `MEDIA`                 | `MediaBinding`          | Media processing (remote)                |
| `EMAIL`                 | `SendEmail`             | Email from `ponygirl@syn.horse` (remote) |
| `ASSETS`                | `Fetcher`               | Static assets from `.output/public/`     |
| `CF_VERSION_METADATA`   | `WorkerVersionMetadata` | Worker version info                      |
| `ADMIN_TOKEN`           | `string`                | Admin authentication secret              |
| `CLOUDFLARE_ACCOUNT_ID` | `string`                | Cloudflare account identifier            |

```typescript
// Example: server/api/example.ts
export default defineEventHandler(async (event) => {
  const { env } = event.context.cloudflare;
  const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    prompt: "Hello",
  });
  return result;
});
```

## Key Files

| File                        | Purpose                       | Editable                                 |
| --------------------------- | ----------------------------- | ---------------------------------------- |
| `nuxt.config.ts`            | Nuxt configuration            | Yes                                      |
| `wrangler.jsonc`            | Cloudflare Worker config      | Yes                                      |
| `tsconfig.json`             | TypeScript project references | Yes                                      |
| `components.json`           | Shadcn-Vue component config   | Yes                                      |
| `env.d.ts`                  | H3/Cloudflare type extensions | Yes                                      |
| `worker-configuration.d.ts` | Auto-generated Wrangler types | **No** — regenerate with `bun run types` |

## Linting Stack

- **ESLint** — Nuxt config with auto-fix
- **Trunk.io** — orchestrates: actionlint, checkov, eslint, markdownlint, oxipng, prettier, trufflehog, yamllint
- **DevSkim** — security scanning in CI
- **Dependabot** — automated dependency updates

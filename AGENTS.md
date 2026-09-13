# `AGENTS.md`

`syn.horse` is the personal site of `syn`. It runs Nuxt 4 on Cloudflare Workers. The design system and candidate build it implements live in `_design/` (an export from Claude Design - frozen reference, do not modify).

**IMPORTANT:** YOUR DEFAULT SHELL IS `fish`. YOU MUST USE `fish` SYNTAX.

<!-- skilld -->

Before modifying code, evaluate each installed skill against the current task.
For each skill, determine YES/NO relevance and invoke all YES skills before proceeding.

<!-- /skilld -->

## Project skills

Detailed reference material lives in on-demand skills rather than in this file. Load the ones that match your task:

- **`synhorse-styling`** - theme tokens, the `synhorse` daisyUI theme, named component classes, CSS gotchas. Any work on `main.css`, classes in templates, colours, type, animations or FX.
- **`synhorse-data-layer`** - D1 + Drizzle schema, migration workflow, schema-driven enums, cold-environment recovery. Any `server/db/` or `db:*` work.
- **`synhorse-workers`** - wrangler config topology, dev bindings, Nitro server route conventions, the `/api/panic` queue pipeline. Any `server/api/`, `server/utils/`, bindings or deploy work.
- **`synhorse-code-standards`** - TypeScript, async, a11y, security, performance and testing baseline for non-trivial new code.

Cloudflare platform knowledge (Workers, KV, R2, D1, Queues, Durable Objects, Agents SDK) is covered by the global `cloudflare`, `wrangler` and `workers-best-practices` skills. Retrieve current docs rather than trusting pre-trained knowledge; limits and quotas live on each product's `/platform/limits/` page.

## Serena

You have the `serena` MCP to help you navigate code; use it, it will make your life a lot easier. If other tooling is more appropriate, you don't HAVE to use Serena - it's just worth considering how it might help.

## Architecture

- **Framework:** Nuxt 4.4 with `srcDir: app/`. Pages, components, layouts, composables and data live under `app/`. Server routes live under `server/`. Project-level config (`nuxt.config.ts`, `content.config.ts`, `tsconfig.json`) sits at the repo root.
- **Deployment:** Cloudflare Workers via `nitro.preset = "cloudflare_module"`. There is intentionally no `wrangler.{json,jsonc,toml}` at the repo root - see `synhorse-workers` before touching any Cloudflare config.
- **Styling:** Tailwind CSS v4 + daisyUI 5, single bespoke `synhorse` theme, all in `app/assets/css/main.css`. Utility classes for atomic styling, named component classes in `@layer components` for repeated patterns. See `synhorse-styling`.
- **Content:** the blog is `@nuxt/content`-driven - `content.config.ts` defines a `blog` collection (source `blog/**.md`) with a Zod schema, posts live in `content/blog/*.md`, pages query them live via `queryCollection("blog")`. Everything else (projects, cv, domains, goodies, social, im, command palette) stays as hardcoded TypeScript in `app/data/*.ts`. There is no `app/data/posts.ts`.
- **Data:** D1 via Drizzle. See `synhorse-data-layer`.

## Where things live

| Concern                      | Path                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Pages (routes)               | `app/pages/**.vue`                                                           |
| Default layout               | `app/layouts/default.vue` (status bar, nav, FX overlays, palette, konami)    |
| Error page                   | `app/error.vue` (wraps content in `<NuxtLayout name="default">`)             |
| Layout components            | `app/components/layout/*.vue` (auto-import as `<LayoutStatusBar />` etc.)    |
| UI primitives                | `app/components/ui/*.vue`                                                    |
| 404 component                | `app/components/NotFound.vue` (used by `error.vue`)                          |
| Composables (auto-imported)  | `app/composables/*.ts`                                                       |
| Static content data          | `app/data/*.ts`                                                              |
| Site-wide constants          | `app/data/site.ts` (status string, version, urls)                            |
| Global CSS entry             | `app/assets/css/main.css`                                                    |
| Cloudflare config            | `nuxt.config.ts` `nitro.cloudflare.wrangler` (do not modify)                 |
| Drizzle schema               | `server/db/schema.ts`                                                        |
| Drizzle migrations           | `server/db/migrations/sqlite/*.sql`                                          |
| Drizzle config               | `drizzle.config.ts` at repo root                                             |
| Server API routes            | `server/api/*.ts` (Nitro file routing - `panic.post.ts` → `POST /api/panic`) |
| Server utils (auto-imported) | `server/utils/*.ts` - `db.ts` (`useDb`) and `pager.ts` (`usePager`)          |

## Conventions

- Prose is lowercase. Headings, eyebrows, body copy - all lowercase. Errors and a few stamps are uppercase on purpose.
- British English spelling in any code comments and authored copy.
- No single-letter variable, function or file names anywhere - including inside loops.
- No React. Vue 3 with `<script setup lang="ts">` for every component.
- For navigation use `<NuxtLink>` (which renders an `<a>`). Programmatic navigation via `navigateTo()`. Buttons only for non-navigational interactions.
- Component auto-imports use path-prefixed names: a file at `app/components/layout/StatusBar.vue` is imported as `<LayoutStatusBar />`. A file at `app/components/NotFound.vue` (no subdirectory) is `<NotFound />`.
- Each commit follows Conventional Commits + GitMoji as per the global agent rules.
- Track deferrals in `TODO.md`. Whenever you decide not to do something now - partial work, follow-ups, known issues you uncovered along the way - append a `- [ ]` checkbox line in the existing format (imperative phrasing, lowercase, one item per line, grouped under a sensible heading if a relevant section already exists). If `TODO.md` is empty (no unchecked items), tell the user at the end of the task so they know nothing is queued.

## Things to know before changing things

- **Live status-bar clock.** `app/components/layout/StatusBar.vue` shows the current time and uptime; both spans are wrapped in `<ClientOnly>` with `--:--:--` placeholder fallbacks to avoid SSR/CSR drift. Never read `Date.now()` outside `onMounted` in components that render on the server.
- **The blog is `@nuxt/content`-driven at runtime.** `app/pages/blog/index.vue` lists posts via `queryCollection("blog").order("date", "DESC")`; `app/pages/blog/[slug].vue` resolves a post with `queryCollection("blog").path(route.path)`, hides `future: true` posts outside dev, and 404s on miss. `@nuxt/content` v3 runs an in-browser SQLite WASM module for client-side queries (relevant to the CSP - hence `wasm-unsafe-eval`).
- **`security.sri: true`** is on, plus `ssg.hashScripts/Styles/meta`. Avoid inline `:style="{ ... }"` bindings - bind a class and put the dynamic value in CSS instead.
- **CSS keyframes are global** and collide silently across `main.css`. Check `synhorse-styling` before adding animations.

## Do not modify

- Anything inside `_design/`. That is the design export and the source of truth for the look-and-feel; agent edits there will desync the implementation from the brief.
- `_DSOY/` and `_DIO/` - staged exports from prior projects, not part of this build.
- The `nitro.cloudflare.wrangler` block in `nuxt.config.ts` (custom domains, bindings, account id, dev host).
- `worker-configuration.d.ts` - auto-generated by `wrangler types`; runs as part of `pnpm build`.
- The static easter-egg files under `public/sudo`, `public/git`, `public/gpg/`, `public/ssh/` - served as plain text on purpose.
- `.github/` workflows, dependabot config and the trunk toolchain unless explicitly asked.

## Build and verify

- `pnpm dev` - local dev server on `http://localhost:3000` (the wrangler dev block configures binding to a tailnet host; ignore unless you need it).
- `pnpm lint:types` - `tsc --noEmit`. Should always pass.
- `pnpm lint` - eslint + trunk + typecheck.
- `pnpm build` - runs the Nuxt build then `wrangler types` to regenerate `worker-configuration.d.ts`.
- `pnpm preview` - local wrangler dev against the production build output.
- `pnpm run deploy` - `wrangler deploy` to production. Do not run this without explicit user request.
- `pnpm db:generate` / `db:migrate:local` / `db:migrate:remote` / `db:studio` - see `synhorse-data-layer`.

## Useful reading

- `app/data/site.ts` - single source of truth for the status string, version badge, urls.
- `_design/design-system/README.md` - brand voice, colour rules, type rules, what is and is not allowed.
- `TODO.md` - what has been intentionally deferred.

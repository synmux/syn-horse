# `AGENTS.md`

`syn.horse` is the personal site of syn (Dave). It runs Nuxt 4 on Cloudflare Workers. The design system and candidate build it implements live in `_design/` (an export from Claude Design — frozen reference, do not modify).

<!-- skilld -->

Before modifying code, evaluate each installed skill against the current task.
For each skill, determine YES/NO relevance and invoke all YES skills before proceeding.

<!-- /skilld -->

## Serena

You have the `serena` MCP to help you navigate code; use it, it will make your life a lot easier. If other tooling is more appropriate, you don't HAVE to use Serena - it's just worth considering how it might help.

## Cloudflare Workers

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

### Docs

- <https://developers.cloudflare.com/workers>
- MCP: <https://docs.mcp.cloudflare.com/mcp>

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

### Commands

| Command               | Purpose                   |
| --------------------- | ------------------------- |
| `npx wrangler dev`    | Local development         |
| `npx wrangler deploy` | Deploy to Cloudflare      |
| `npx wrangler types`  | Generate TypeScript types |

Run `wrangler types` after changing bindings in wrangler.jsonc.

### Node.js Compatibility

<https://developers.cloudflare.com/workers/runtime-apis/nodejs/>

### Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: <https://developers.cloudflare.com/workers/observability/errors/>

### Product Docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

### Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: <https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/>
- Workflows: <https://developers.cloudflare.com/workflows/build/rules-of-workflows/>

## Architecture

- **Framework:** Nuxt 4.4 with `srcDir: app/`. Pages, components, layouts, composables and data live under `app/`. Server routes live under `server/`. Project-level config (`nuxt.config.ts`, `content.config.ts`, `tsconfig.json`) sits at the repo root.
- **Deployment:** Cloudflare Workers via `nitro.preset = "cloudflare_module"`. The deploy wrangler config is generated to `.output/server/wrangler.json` from the `nitro.cloudflare.wrangler` block in `nuxt.config.ts`; there is intentionally no `wrangler.{json,jsonc,toml}` at the repo root, because nitropack's cloudflare preset and the wrangler CLI both auto-discover those filenames and would `defu`-merge with the inline block — every binding would end up duplicated in `.output/server/wrangler.json`. Custom domains: `syn.horse`, `syn.as`, `syn.haus`, `syn.pink`, `dcw.soy` (each with `www.`).
- **Dev bindings (Miniflare):** `wrangler.dev.jsonc` at the repo root is read **only by nitropack's built-in `cloudflare-dev` preset** via `nitro.cloudflareDev.configPath` in `nuxt.config.ts`. The non-standard filename keeps it out of the auto-discovery path described above. It contains a strict subset of the deploy bindings — D1 (`DB`), KV (`KV` + `CACHE`), R2 (`BLOB`), the `NOTIFICATIONS` queue producer, version_metadata and vars — because `getPlatformProxy()` switches to a remote authenticated edge-preview session the moment any binding lacks local emulation (AI, BROWSER, IMAGES, analytics datasets are commented in the file as references). The legacy `nitro-cloudflare-dev` module is intentionally **not** in `modules:` — nitropack 2.13+ has the same wiring with top-level await, so there's no `globalThis.__env__` race against NuxtHub's migration plugin.
- **Styling:** Tailwind CSS v4 + daisyUI 5 with a single bespoke `synhorse` theme. Everything lives in `app/assets/css/main.css`: the `@theme` block defines the design tokens (palette, type scale, spacing, easings, glows, animations); the `@plugin "daisyui/theme"` block maps daisyUI's semantic roles (`primary` → `hot`, `secondary` → `cool`, `accent` → `lilac`, `base-100/200/300` → the void scale, etc.) to those tokens. Built-in daisyUI themes are disabled (`themes: false`). The `<html data-theme="synhorse">` attribute is set in `nuxt.config.ts`. Templates use Tailwind utility classes for atomic styling; repeated patterns are extracted as named component classes in `@layer components` (see "Component classes" below). Avoid scoped Vue styles unless a component genuinely needs encapsulation, and avoid inline `:style="{ ... }"` bindings — bind a class instead.
- **Fonts:** VT323 (display, single weight), Inter (variable 100-900 + italic), Space Mono (variable 100-800 + italic) — loaded via `@nuxt/fonts` from the Google provider.
- **Content:** the blog is `@nuxt/content`-driven. `content.config.ts` defines a `blog` collection (`type: "page"`, source `blog/**.md`) with a Zod schema (`date`, `title`, `description`, `tags`, `read`, `future`); the posts live in `content/blog/*.md` and the blog pages query them live via `queryCollection("blog")`. Everything else (projects, cv, domains, social, im, command palette) stays as hardcoded TypeScript modules in `app/data/*.ts` — there is no `app/data/posts.ts`.

## Where things live

| Concern                      | Path                                                                                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages (routes)               | `app/pages/**.vue`                                                                                                                                                                              |
| Default layout               | `app/layouts/default.vue` (status bar, nav, FX overlays, palette, konami)                                                                                                                       |
| Error page                   | `app/error.vue` (wraps content in `<NuxtLayout name="default">`)                                                                                                                                |
| Layout components            | `app/components/layout/*.vue` (auto-import as `<LayoutStatusBar />` etc.)                                                                                                                       |
| UI primitives                | `app/components/ui/*.vue`                                                                                                                                                                       |
| 404 component                | `app/components/NotFound.vue` (used by `error.vue`)                                                                                                                                             |
| Composables (auto-imported)  | `app/composables/*.ts`                                                                                                                                                                          |
| Static content data          | `app/data/*.ts`                                                                                                                                                                                 |
| Site-wide constants          | `app/data/site.ts` (status string, version, urls)                                                                                                                                               |
| Global CSS entry             | `app/assets/css/main.css` (theme tokens + daisyUI theme + component classes + effects)                                                                                                          |
| Cloudflare config            | `nuxt.config.ts` `nitro.cloudflare.wrangler`                                                                                                                                                    |
| Drizzle schema               | `server/db/schema.ts` (active — `panic_pages` only; `redirects` is a legacy hand-applied table in `sql/redirects.sql`, not a Drizzle table)                                                     |
| Drizzle migrations           | `server/db/migrations/sqlite/*.sql` (apply with `bun run db:migrate:{local,remote}`)                                                                                                            |
| Drizzle config               | `drizzle.config.ts` at repo root                                                                                                                                                                |
| Server API routes            | `server/api/*.ts` (Nitro file routing — `panic.post.ts` → `POST /api/panic`; validates, verifies Turnstile, enqueues to the `NOTIFICATIONS` queue, records to D1 — see "Panic paging pipeline") |
| Server utils (auto-imported) | `server/utils/*.ts` — `db.ts` (`useDb(event)`, a Drizzle client over D1) and `pager.ts` (`usePager(event)` / `extractSource(event)` for the `/panic` queue)                                     |

## Conventions

- Prose is lowercase. Headings, eyebrows, body copy — all lowercase. Errors and a few stamps are uppercase on purpose.
- British English spelling in any code comments and authored copy.
- No single-letter variable, function or file names anywhere — including inside loops.
- No React. Vue 3 with `<script setup lang="ts">` for every component.
- For navigation use `<NuxtLink>` (which renders an `<a>`). Programmatic navigation via `navigateTo()`. Buttons only for non-navigational interactions.
- Component auto-imports use path-prefixed names: a file at `app/components/layout/StatusBar.vue` is imported as `<LayoutStatusBar />`. A file at `app/components/NotFound.vue` (no subdirectory) is `<NotFound />`.
- Each commit follows Conventional Commits + GitMoji as per the global agent rules.
- Track deferrals in `TODO.md`. Whenever you decide not to do something now — partial work, follow-ups, known issues you uncovered along the way — append a `- [ ]` checkbox line in the existing format (imperative phrasing, lowercase, one item per line, grouped under a sensible heading if a relevant section already exists). If `TODO.md` is empty (no unchecked items), tell the user at the end of the task so they know nothing is queued.

## Theme tokens (Tailwind v4 `@theme`)

These are the project-specific tokens defined in `app/assets/css/main.css`. Everything else (default Tailwind utilities) is also available, but prefer the syn.horse names so design intent stays visible.

- **Colours.** `bg-void`, `bg-void-2`, `bg-void-3`, `bg-void-4` (page → border surface scale). `text-paper`, `text-paper-2`, `text-paper-3`, `text-paper-4` (primary → disabled foreground). Brand: `text-hot` / `bg-hot` (#ff71ce, "the brand pink"), `text-cool` / `bg-cool` (#01cdfe, links / focus / "info"), `text-lilac` (#b967ff, decorative). Status: `text-pop` (lemon, warnings), `text-danger` / `bg-danger` (destructive only), `text-ok` / `bg-ok` (success — used sparingly). Each colour also has a "pressed" variant suffixed `-2` (e.g. `bg-hot-2`).
- **Fonts.** `font-display` (VT323 — large headlines, terminal prompts), `font-sans` (Inter — default body / UI), `font-mono` (Space Mono — eyebrows, kbd hints, code).
- **Type.** Custom scale with `--text-{xs,sm,base,md,lg,xl,2xl,3xl,4xl,5xl,6xl}` mapping to `12,13,15,17,20,24,32,44,64,96,144 px`. Use arbitrary values (`text-[28px]`) for sizes that fall outside the scale.
- **Spacing.** `--spacing: 4px`, so `p-1` = 4px, `p-2` = 8px, `p-12` = 48px, etc. Matches the original `--s-*` design tokens exactly.
- **Easings.** `ease-snap` (`cubic-bezier(0.2, 0.9, 0.2, 1)` — the design's hard snap), `ease-soft` (the gentler one).
- **Shadows.** `shadow-glow-hot`, `shadow-glow-hot-strong`, `shadow-glow-cool`, `shadow-glow-lilac`, `shadow-glow-palette`, `shadow-pulse-ok`, `shadow-inset-edge`. No traditional drop shadows — the design forbids them.
- **Animations.** `animate-pulse-glow` (status dots), `animate-scan-flicker` / `animate-grain-shift` (FX overlays), `animate-glitch-strong` (404), `animate-konami` (toast).

## Component classes (`@layer components` in `main.css`)

Repeated patterns get a named class instead of an inline utility soup. They all reference the theme tokens above.

- **Reusable UI:** `.tg` (+ `.hot/.cool/.lilac/.warn/.solid/.on` modifiers — small mono pills used in projects, blog filters, cv stack), `.eyebrow` (mono uppercase label above page headlines), `.lede` (paragraph lead text), `.console` (+ `.pr/.mu/.ok/.danger` inner spans — terminal-style code block), `.btn-syn` (+ `.lg/.warn` modifiers — outlined mono button), `.dot` (accent period after page titles).
- **Page-level shell + headings:** `.page-shell` (+ `.wide` — fixed-width content column, replaces the legacy `.container`), `.page-h1` (112px display headline used on every secondary page), `.page-h2` (44px section heading), `.footer-note` (bottom strip on home / contact / domains).
- **Lists:** `.diamond-list > li` (◆-bulleted list with hairline borders, used on `/now` and post bodies), `.dotted-link` (paper-2 link with hot pink dotted underline, used in the home links row).
- **Home page:** `.home-card` (+ `.home-card-head/.home-card-title/.home-card-body/.home-card-arrow` — clickable card used on the home page).
- **Page-specific:** `.proj-grid/.proj/.proj-year/.proj-title/.proj-body/.proj-url/.proj-tags` (project cards), `.blog-filter/.blog-row/.blog-feed-line` (blog index), `.post-crumb/.post-h1/.post-meta/.post-body/.post-foot` (single post — `.post-body` carries all the prose styling), `.cv-actions/.cv-h2/.cv-role/.cv-talks/.cv-talk` (cv layout), `.notfound` (+ `.big/.yell/.console/.actions` inner — 404 page, also used by `error.vue`'s 404 branch), `.generic-error` (non-404 error fallback).
- **FX overlays:** `.fx-scan` (scanline gradient, 4s flicker), `.fx-grain` (low-opacity noise SVG with grain shift), `.fx-vignette` (corner darkening), `.fx-glitch` (chromatic aberration on hover, 60ms jitter — apply to `<NuxtLink>` / `<button>` for the rgb-split-on-hover effect).

## Things to know before changing things

- **Live status-bar clock.** `app/components/layout/StatusBar.vue` shows the current time and uptime; both spans are wrapped in `<ClientOnly>` with `--:--:--` placeholder fallbacks to avoid SSR/CSR drift. Never read `Date.now()` outside `onMounted` in components that render on the server.
- **CSS keyframes are global.** Two animations sharing a name will collide silently; the later definition wins everywhere. We previously hit this when `glitch-jitter` was redefined for the konami toast (now renamed to `konami-jitter`). All keyframes live near the top of `main.css`. Be careful adding new ones.
- **Tag variant classes are flat** (`.tg.hot`, `.tg.cool`, `.tg.warn`, `.tg.lilac`, `.tg.solid`, `.tg.on`). Don't invent new ones — extend the existing modifier set in `main.css` if you need another colour.
- **The blog is `@nuxt/content`-driven at runtime.** `app/pages/blog/index.vue` lists posts via `queryCollection("blog").order("date", "DESC")`; `app/pages/blog/[slug].vue` resolves a post with `queryCollection("blog").path(route.path)`, hides `future: true` posts outside dev, and 404s on miss. `@nuxt/content` v3 runs an in-browser SQLite WASM module for client-side queries (relevant to the CSP — hence `wasm-unsafe-eval`). There is no `app/data/posts.ts`.
- **`security.sri: true`** is on, plus `ssg.hashScripts/Styles/meta`. Avoid inline `:style="{ ... }"` bindings on Vue templates where possible — bind a class and put the dynamic value in CSS instead.
- **The `--accent-color` custom property** falls back to `--color-hot` everywhere via `var(--accent-color, var(--color-hot))`. The runtime tweaks panel that used to write it has been dropped, but the pattern is preserved for any future re-introduction.
- **Reduced motion.** `app/assets/css/main.css` has a `@media (prefers-reduced-motion: reduce)` block at the bottom that mutes the loud animations (scanlines, 404 glitch, konami toast). Keep new decorative animations in scope of those overrides.
- **Arbitrary properties for vendor prefixes.** Use Tailwind v4's `[<property>:<value>]` syntax for one-off CSS that doesn't have a utility — e.g. `[-webkit-text-stroke:1.5px_var(--color-paper-3)]` for an outlined wordmark. Underscores become spaces.
- **Server route conventions** (set by `server/api/panic.post.ts`, the project's first Nitro route). Use Zod 4 `safeParse` for body validation — note the v4 keyword change from `message` to `error`. `verifyTurnstileToken(token)` is **auto-imported** by `@nuxtjs/turnstile`; do **not** `import … from "#turnstile"` — that virtual alias is not exposed in this version and breaks the Nitro build with "externals are not allowed". DB access goes through `useDb(event).insert(…)` from `server/utils/db.ts`. Use `crypto.randomUUID()` for IDs (global on Workers; no `uuid` import needed). The `/api/**` route rules in `nuxt.config.ts` already attach CORS, `Cache-Control: no-cache`, and `X-Content-Type-Options: nosniff` — no per-route work required.
- **Migrations: local auto-applies, remote is explicit.** In practice NuxtHub's migration plugin applies pending local migrations on `bun run dev`, so `bun run db:migrate:local` is usually unnecessary — and the auto-apply can race a Miniflare reload (see "Cold environment recovery" below for the `table already exists` / `duplicate column` fix). Production is never auto-applied: run `bun run db:migrate:remote` explicitly. Both scripts pass `--config wrangler.dev.jsonc` because the deploy wrangler config is generated to `.output/server/wrangler.json` only at build time; the dev jsonc carries `migrations_dir` (`server/db/migrations/sqlite/`) for both `--local` and `--remote` applies.
- **Schema-driven enums.** Columns with a fixed value set are declared as `text({ enum: [...] })` on the Drizzle column and consumed everywhere else through derivation — `$inferSelect`-based types in Vue, `enumValues` for Zod validators. Don't duplicate the literal union. See the "Schema-driven enums" subsection under [Database (D1 + Drizzle)](#database-d1--drizzle) below.

## Do not modify

- Anything inside `_design/`. That is the design export and the source of truth for the look-and-feel; agent edits there will desync the implementation from the brief.
- `_DSOY/` and `_DIO/` — staged exports from prior projects, not part of this build.
- The `nitro.cloudflare.wrangler` block in `nuxt.config.ts` (custom domains, bindings, account id, dev host).
- `worker-configuration.d.ts` — auto-generated by `wrangler types`; runs as part of `bun run build`.
- The static easter-egg files under `public/sudo`, `public/git`, `public/gpg/`, `public/ssh/` — served as plain text on purpose.
- `.github/` workflows, dependabot config and the trunk toolchain unless explicitly asked.

## Build and verify

- `bun run dev` — local dev server on `http://localhost:3000` (the wrangler dev block configures binding to a tailnet host; ignore unless you need it).
- `bun run lint:types` — `tsc --noEmit`. Should always pass.
- `bun run lint` — eslint + trunk + typecheck.
- `bun run build` — runs the Nuxt build then `wrangler types` to regenerate `worker-configuration.d.ts`.
- `bun run preview` — local wrangler dev against the production build output.
- `bun run deploy` — `wrangler deploy` to production. Do not run this without explicit user request.
- `bun run db:generate` — `drizzle-kit generate` reads `drizzle.config.ts` and writes new SQL to `server/db/migrations/sqlite/`.
- `bun run db:migrate:local` — apply pending migrations to local Miniflare D1 via wrangler. `:remote` variant for production.
- `bun run db:studio` — `drizzle-kit studio` (browse + edit the schema).

## Database (D1 + Drizzle)

- **Schema:** `server/db/schema.ts` (`sqliteTable` from `drizzle-orm/sqlite-core`). Currently just `panic_pages` (`id`, `channel`, `message`, `contact`, `createdAt`, `status`, `queueError`, `queuedAt`). `redirects` is **not** a Drizzle table — it's a legacy hand-applied table in `sql/redirects.sql`.
- **Migrations:** `server/db/migrations/sqlite/00NN_*.sql` (drizzle-kit metadata under `meta/`).
- **Drizzle config:** `drizzle.config.ts` at repo root.
- **D1 binding:** `DB`. Declared in `nuxt.config.ts` (deploy) and `wrangler.dev.jsonc` (dev). Database name: `syn-horse`.
- **Server access:** `useDb(event)` from `server/utils/db.ts` — auto-imported in server scope.
- **Migration tooling:** local migrations auto-apply via NuxtHub's plugin on `bun run dev`; remote applies are explicit (`bun run db:migrate:remote`). Both go through the wrangler CLI with `--config wrangler.dev.jsonc`.

### Schema-driven enums (single source of truth)

For columns constrained to a fixed value set, declare the values once on the Drizzle column with `text({ enum: [...] })` and derive everything else from that array. Today this applies to `panicPages.channel` and `panicPages.status`:

```typescript
// server/db/schema.ts
export const panicPages = sqliteTable("panic_pages", {
  // …
  channel: text({ enum: ["red", "green"] }).notNull(),
  status: text({ enum: ["queued", "send_failed"] }).notNull()
})

export type Channel = (typeof panicPages.$inferSelect)["channel"]
export type PageStatus = (typeof panicPages.$inferSelect)["status"]
```

- **Frontend / Vue:** `import type { Channel } from "~~/server/db/schema"`. Type-only imports are erased at compile time, so reaching into the server tree from a `.vue` file carries no runtime cost.
- **Runtime validation (Zod):** `z.enum(panicPages.channel.enumValues)` — `enumValues` is Drizzle's typed runtime tuple, so Zod and TypeScript stay in lockstep.
- **SQL:** Drizzle's SQLite `enum` is a TypeScript-only constraint. The column stays plain `TEXT`, no `CHECK` clause is emitted, and `bun run db:generate` produces no diff when you only touch the enum array. Add a manual `CHECK (col IN (...))` clause to a migration if you also want database-level enforcement.

Adding or removing a value only requires editing the schema array — TypeScript then surfaces every consumer that hasn't caught up.

### Why migrate scripts pass `--config wrangler.dev.jsonc`

No `wrangler.{json,jsonc,toml}` at the repo root by design — both the wrangler CLI and nitropack auto-discover those names and would `defu`-merge with the inline `nitro.cloudflare.wrangler` block, duplicating every binding in `.output/server/wrangler.json`. `wrangler.dev.jsonc` is non-discoverable and carries the dev bindings AND `migrations_dir`. The same file drives both `--local` (Miniflare) and `--remote` (production D1) applies.

### Day-to-day loop

1. Edit `server/db/schema.ts`.
2. `bun run db:generate` — writes `00NN_*.sql` and updates `meta/_journal.json`.
3. Inspect the SQL; sanity-check destructive changes.
4. `bun run db:migrate:local` then `bun run dev` to test.
5. `bun run db:migrate:remote` — apply to production before deploy if new code references new tables, after if only adding indexes / non-required columns.
6. `bun run deploy` if worker code also changed.

### Cold environment recovery

If `d1_migrations` is missing, wrangler re-runs migration 0000 and fails with `table already exists`.

**Inspect:**

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

**Decision table:**

| State                                                   | Action                                             |
| ------------------------------------------------------- | -------------------------------------------------- |
| `panic_pages` has `status` / `queueError` / `queuedAt`  | Up to date — nothing to do.                        |
| `panic_pages` present, `d1_migrations` has the 0000 row | `bun run db:migrate:remote` (applies 0001/0002).   |
| `panic_pages` present but no `d1_migrations` 0000 row   | Backfill then apply (see below).                   |
| Empty                                                   | `bun run db:migrate:remote` — all three run clean. |

**Backfill tracking row:**

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "CREATE TABLE IF NOT EXISTS d1_migrations(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO d1_migrations(name) VALUES ('0000_stale_omega_sentinel.sql');"
bun run db:migrate:remote
```

Swap `--remote`/`db:migrate:remote` for `--local`/`db:migrate:local` to target Miniflare.

**Verify** (should list `d1_migrations`, `panic_pages`, `sqlite_sequence`):

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

### Adjacent production requirements

- **Turnstile secret:** `bun run wrangler secret put NUXT_TURNSTILE_SECRET_KEY` — without it every `/panic` submission 403s.
- **Worker deploy is separate:** `db:migrate:remote` does not deploy code; run `bun run deploy` after migrations land.

## Panic paging pipeline (Cloudflare Queues)

`POST /api/panic` (`server/api/panic.post.ts`) is the **producer**. It validates the body (Zod 4 `safeParse` — 422 with field issues on failure), verifies Turnstile in production (403 on failure; skipped entirely under `import.meta.dev`), enqueues a message, then records the attempt to D1.

- **Enqueue.** `usePager(event)` (`server/utils/pager.ts`) wraps the `NOTIFICATIONS` queue producer binding (queue `syn-horse-notifications`). Wire format: `QueueMessage = { channel, contact, message, source? }`. `extractSource(event)` derives `source` from the leftmost `X-Forwarded-For` entry, falling back to `CF-Connecting-IP`, and only puts it on the wire if it matches an IPv4 / IPv6 / RFC-1123-hostname shape.
- **Producer↔consumer contract.** The `source` validators in `pager.ts` are kept **byte-for-byte identical** to the consumer Worker's `HOSTNAME_RE` (`syn-horse.notifications/src/schema.ts`), so the producer never emits a `source` the consumer would reject. Change one, change the other.
- **D1 record.** Each submission writes a `panic_pages` row: `status = "queued"` when the enqueue succeeds, or `"send_failed"` (with `queueError`, and `queuedAt` left null) when `queue.send` throws. This is producer-side state only.
- **The consumer is a separate Worker, in its own repo — do not edit it from here.** `syn-horse-notifications` consumes the queue through a four-stage pipeline: logging → rate limits (KV, fail-open) → AI moderation (stubbed) → delivery (adapter; `stub` today, `email`/`ntfy`/`pushover` scaffolded). It logs to its own D1 database (also named `syn-horse-notifications`); delivery and moderation state live there, not in this repo's `panic_pages`.

## Useful reading

- `app/data/site.ts` — single source of truth for the status string, version badge, urls.
- `_design/design-system/README.md` — brand voice, colour rules, type rules, what is and is not allowed.
- `_design/site/styles.css` — original design CSS (the canonical visual reference; the live site mirrors it via Tailwind tokens + component classes in `main.css`).
- `TODO.md` — what has been intentionally deferred.

## Imported Claude Cowork project instructions

This is a Nuxt 4 project.

## Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.

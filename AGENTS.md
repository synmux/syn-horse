# `AGENTS.md`

<!-- skilld -->

Before modifying code, evaluate each installed skill against the current task.
For each skill, determine YES/NO relevance and invoke all YES skills before proceeding.

<!-- /skilld -->

`syn.horse` is the personal site of syn (Dave). It runs Nuxt 4 on Cloudflare Workers. The design system and candidate build it implements live in `_design/` (an export from Claude Design — frozen reference, do not modify).

## Architecture

- **Framework:** Nuxt 4.4 with `srcDir: app/`. Pages, components, layouts, composables and data live under `app/`. Server routes live under `server/`. Project-level config (`nuxt.config.ts`, `content.config.ts`, `tsconfig.json`) sits at the repo root.
- **Deployment:** Cloudflare Workers via `nitro.preset = "cloudflare_module"`. The deploy wrangler config is generated to `.output/server/wrangler.json` from the `nitro.cloudflare.wrangler` block in `nuxt.config.ts`; there is intentionally no `wrangler.{json,jsonc,toml}` at the repo root, because nitropack's cloudflare preset and the wrangler CLI both auto-discover those filenames and would `defu`-merge with the inline block — every binding would end up duplicated in `.output/server/wrangler.json`. Custom domains: `syn.horse`, `syn.as`, `syn.haus`, `syn.pink`, `dcw.soy` (each with `www.`).
- **Dev bindings (Miniflare):** `wrangler.dev.jsonc` at the repo root is read **only by nitropack's built-in `cloudflare-dev` preset** via `nitro.cloudflareDev.configPath` in `nuxt.config.ts`. The non-standard filename keeps it out of the auto-discovery path described above. It contains a strict subset of the deploy bindings — D1, KV, R2, version_metadata, vars — because `getPlatformProxy()` switches to a remote authenticated edge-preview session the moment any binding lacks local emulation (AI, BROWSER, IMAGES, analytics datasets are commented in the file as references). The legacy `nitro-cloudflare-dev` module is intentionally **not** in `modules:` — nitropack 2.13+ has the same wiring with top-level await, so there's no `globalThis.__env__` race against NuxtHub's migration plugin.
- **Styling:** Tailwind CSS v4 + daisyUI 5 with a single bespoke `synhorse` theme. Everything lives in `app/assets/css/main.css`: the `@theme` block defines the design tokens (palette, type scale, spacing, easings, glows, animations); the `@plugin "daisyui/theme"` block maps daisyUI's semantic roles (`primary` → `hot`, `secondary` → `cool`, `accent` → `lilac`, `base-100/200/300` → the void scale, etc.) to those tokens. Built-in daisyUI themes are disabled (`themes: false`). The `<html data-theme="synhorse">` attribute is set in `nuxt.config.ts`. Templates use Tailwind utility classes for atomic styling; repeated patterns are extracted as named component classes in `@layer components` (see "Component classes" below). Avoid scoped Vue styles unless a component genuinely needs encapsulation, and avoid inline `:style="{ ... }"` bindings — bind a class instead.
- **Fonts:** VT323 (display, single weight), Inter (variable 100-900 + italic), JetBrains Mono (variable 100-800 + italic) — loaded via `@nuxt/fonts` from the Google provider.
- **Content:** today, hardcoded TypeScript modules in `app/data/*.ts`. Future: `@nuxt/content` from `content/blog/*.md`. Fifteen markdown posts already exist; `content.config.ts` defines a `docs` collection with optional tags. The collection is registered but not queried — see `TODO.md`.

## Where things live

| Concern                      | Path                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| Pages (routes)               | `app/pages/**.vue`                                                                     |
| Default layout               | `app/layouts/default.vue` (status bar, nav, FX overlays, palette, konami)              |
| Error page                   | `app/error.vue` (wraps content in `<NuxtLayout name="default">`)                       |
| Layout components            | `app/components/layout/*.vue` (auto-import as `<LayoutStatusBar />` etc.)              |
| UI primitives                | `app/components/ui/*.vue`                                                              |
| 404 component                | `app/components/NotFound.vue` (used by `error.vue`)                                    |
| Composables (auto-imported)  | `app/composables/*.ts`                                                                 |
| Static content data          | `app/data/*.ts`                                                                        |
| Site-wide constants          | `app/data/site.ts` (status string, version, urls)                                      |
| Global CSS entry             | `app/assets/css/main.css` (theme tokens + daisyUI theme + component classes + effects) |
| Cloudflare config            | `nuxt.config.ts` `nitro.cloudflare.wrangler`                                           |
| Drizzle schema               | `server/db/schema.ts` (active — `redirects`, `panic_pages`)                            |
| Drizzle migrations           | `server/db/migrations/sqlite/*.sql` (apply with `bun run db:migrate:{local,remote}`)   |
| Drizzle config               | `drizzle.config.ts` at repo root                                                       |
| Server API routes            | `server/api/*.ts` (Nitro file routing — `panic.post.ts` → `POST /api/panic`)           |
| Server utils (auto-imported) | `server/utils/*.ts` (`useDb(event)` returns a Drizzle client over D1)                  |

## Conventions

- Prose is lowercase. Headings, eyebrows, body copy — all lowercase. Errors and a few stamps are uppercase on purpose.
- British English spelling in any code comments and authored copy.
- No single-letter variable, function or file names anywhere — including inside loops.
- No React. Vue 3 with `<script setup lang="ts">` for every component.
- For navigation use `<NuxtLink>` (which renders an `<a>`). Programmatic navigation via `navigateTo()`. Buttons only for non-navigational interactions.
- Component auto-imports use path-prefixed names: a file at `app/components/layout/StatusBar.vue` is imported as `<LayoutStatusBar />`. A file at `app/components/NotFound.vue` (no subdirectory) is `<NotFound />`.
- Each commit follows Conventional Commits + GitMoji as per the global agent rules.

## Theme tokens (Tailwind v4 `@theme`)

These are the project-specific tokens defined in `app/assets/css/main.css`. Everything else (default Tailwind utilities) is also available, but prefer the syn.horse names so design intent stays visible.

- **Colours.** `bg-void`, `bg-void-2`, `bg-void-3`, `bg-void-4` (page → border surface scale). `text-paper`, `text-paper-2`, `text-paper-3`, `text-paper-4` (primary → disabled foreground). Brand: `text-hot` / `bg-hot` (#ff71ce, "the brand pink"), `text-cool` / `bg-cool` (#01cdfe, links / focus / "info"), `text-lilac` (#b967ff, decorative). Status: `text-pop` (lemon, warnings), `text-danger` / `bg-danger` (destructive only), `text-ok` / `bg-ok` (success — used sparingly). Each colour also has a "pressed" variant suffixed `-2` (e.g. `bg-hot-2`).
- **Fonts.** `font-display` (VT323 — large headlines, terminal prompts), `font-sans` (Inter — default body / UI), `font-mono` (JetBrains Mono — eyebrows, kbd hints, code).
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
- **`@nuxt/content` is configured but unused at runtime.** Treat `app/data/posts.ts` as the current source of truth for blog metadata. Migration shape is documented in the TODO comment at the top of `app/pages/blog/[slug].vue`.
- **`security.sri: true`** is on, plus `ssg.hashScripts/Styles/meta`. Avoid inline `:style="{ ... }"` bindings on Vue templates where possible — bind a class and put the dynamic value in CSS instead.
- **The `--accent-color` custom property** falls back to `--color-hot` everywhere via `var(--accent-color, var(--color-hot))`. The runtime tweaks panel that used to write it has been dropped, but the pattern is preserved for any future re-introduction.
- **Reduced motion.** `app/assets/css/main.css` has a `@media (prefers-reduced-motion: reduce)` block at the bottom that mutes the loud animations (scanlines, 404 glitch, konami toast). Keep new decorative animations in scope of those overrides.
- **Arbitrary properties for vendor prefixes.** Use Tailwind v4's `[<property>:<value>]` syntax for one-off CSS that doesn't have a utility — e.g. `[-webkit-text-stroke:1.5px_var(--color-paper-3)]` for an outlined wordmark. Underscores become spaces.
- **Server route conventions** (set by `server/api/panic.post.ts`, the project's first Nitro route). Use Zod 4 `safeParse` for body validation — note the v4 keyword change from `message` to `error`. `verifyTurnstileToken(token)` is **auto-imported** by `@nuxtjs/turnstile`; do **not** `import … from "#turnstile"` — that virtual alias is not exposed in this version and breaks the Nitro build with "externals are not allowed". DB access goes through `useDb(event).insert(…)` from `server/utils/db.ts`. Use `crypto.randomUUID()` for IDs (global on Workers; no `uuid` import needed). The `/api/**` route rules in `nuxt.config.ts` already attach CORS, `Cache-Control: no-cache`, and `X-Content-Type-Options: nosniff` — no per-route work required.
- **Migrations are wrangler-applied, not NuxtHub-applied.** Migrations live at `server/db/migrations/sqlite/` (a non-default path), so NuxtHub's auto-runner doesn't see them — apply via `bun run db:migrate:local` (or `:remote`). The scripts pass `--config wrangler.dev.jsonc` because the deploy wrangler config is generated to `.output/server/wrangler.json` only at build time. The dev jsonc carries `migrations_dir` for both local and remote applies (same `database_id`, just `--local` vs `--remote`).

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

## Useful reading

- `app/data/site.ts` — single source of truth for the status string, version badge, urls.
- `_design/design-system/README.md` — brand voice, colour rules, type rules, what is and is not allowed.
- `_design/site/styles.css` — original design CSS (the canonical visual reference; the live site mirrors it via Tailwind tokens + component classes in `main.css`).
- `TODO.md` — what has been intentionally deferred.

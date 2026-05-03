# `AGENTS.md`

<!-- skilld -->

Before modifying code, evaluate each installed skill against the current task.
For each skill, determine YES/NO relevance and invoke all YES skills before proceeding.

<!-- /skilld -->

`syn.horse` is the personal site of syn (Dave). It runs Nuxt 4 on Cloudflare Workers. The design system and candidate build it implements live in `_design/` (an export from Claude Design — frozen reference, do not modify).

## Architecture

- **Framework:** Nuxt 4.4 with `srcDir: app/`. Pages, components, layouts, composables and data live under `app/`. Server routes live under `server/`. Project-level config (`nuxt.config.ts`, `content.config.ts`, `tsconfig.json`) sits at the repo root.
- **Deployment:** Cloudflare Workers via `nitro.preset = "cloudflare_module"`. The wrangler config is generated from the `nitro.cloudflare.wrangler` block in `nuxt.config.ts` — there is no separate `wrangler.toml`. Custom domains: `syn.horse`, `syn.as`, `syn.haus`, `syn.pink`, `dcw.soy` (each with `www.`).
- **Styling:** hand-written CSS with custom properties. Tokens in `app/assets/css/colors_and_type.css`, layout/component rules in `app/assets/css/styles.css`. **No Tailwind utility classes, no daisyUI.** Avoid scoped Vue styles unless a component genuinely needs encapsulation.
- **Fonts:** VT323 (display, single weight), Inter (variable 100-900 + italic), JetBrains Mono (variable 100-800 + italic) — loaded via `@nuxt/fonts` from the Google provider.
- **Content:** today, hardcoded TypeScript modules in `app/data/*.ts`. Future: `@nuxt/content` from `content/blog/*.md`. Fifteen markdown posts already exist; `content.config.ts` defines a `docs` collection with optional tags. The collection is registered but not queried — see `TODO.md`.

## Where things live

| Concern                     | Path                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| Pages (routes)              | `app/pages/**.vue`                                                        |
| Default layout              | `app/layouts/default.vue` (status bar, nav, FX overlays, palette, konami) |
| Error page                  | `app/error.vue` (wraps content in `<NuxtLayout name="default">`)          |
| Layout components           | `app/components/layout/*.vue` (auto-import as `<LayoutStatusBar />` etc.) |
| Home variants               | `app/components/home/*.vue` (auto-import as `<HomeCalm />` etc.)          |
| UI primitives               | `app/components/ui/*.vue`                                                 |
| 404 component               | `app/components/NotFound.vue` (used by `error.vue`)                       |
| Composables (auto-imported) | `app/composables/*.ts`                                                    |
| Static content data         | `app/data/*.ts`                                                           |
| Site-wide constants         | `app/data/site.ts` (status string, version, urls)                         |
| Global CSS entry            | `app/assets/css/main.css` (imports the other two)                         |
| Cloudflare config           | `nuxt.config.ts` `nitro.cloudflare.wrangler`                              |
| Drizzle schema (dormant)    | `server/db/schema.ts`                                                     |

## Conventions

- Prose is lowercase. Headings, eyebrows, body copy — all lowercase. Errors and a few stamps are uppercase on purpose.
- British English spelling in any code comments and authored copy.
- No single-letter variable, function or file names anywhere — including inside loops.
- No React. Vue 3 with `<script setup lang="ts">` for every component.
- For navigation use `<NuxtLink>` (which renders an `<a>`). Programmatic navigation via `navigateTo()`. Buttons only for non-navigational interactions.
- Component auto-imports use path-prefixed names: a file at `app/components/layout/StatusBar.vue` is imported as `<LayoutStatusBar />`. A file at `app/components/NotFound.vue` (no subdirectory) is `<NotFound />`.
- Each commit follows Conventional Commits + GitMoji as per the global agent rules.

## Things to know before changing things

- **Three home variants.** `HomeCalm`, `HomeFeral`, `HomeUnhinged` live as siblings under `app/components/home/`. `app/pages/index.vue` reads `?v=<feral|unhinged>` via the `useHomeVariant` composable and switches with `<component :is>`. Default is `calm`. SSR sees the same query string the client does, so no `<ClientOnly>` wrapping is needed for the variant choice.
- **Live status-bar clock.** `app/components/layout/StatusBar.vue` shows the current time and uptime; both spans are wrapped in `<ClientOnly>` with `--:--:--` placeholder fallbacks to avoid SSR/CSR drift. Never read `Date.now()` outside `onMounted` in components that render on the server.
- **CSS keyframes are global.** Two animations sharing a name will collide silently; the later definition wins everywhere. We previously hit this when `glitch-jitter` was redefined for the konami toast (now renamed to `konami-jitter`). Be careful adding new keyframes.
- **CSS class names follow the source design's flat conventions** (`.tg.hot`, `.tg.cool`, `.tg.warn`, `.tg.lilac`, `.tg.solid`, `.tg.on`). Don't invent variants — verify against `app/assets/css/styles.css`.
- **`@nuxt/content` is configured but unused at runtime.** Treat `app/data/posts.ts` as the current source of truth for blog metadata. Migration shape is documented in the TODO comment at the top of `app/pages/blog/[slug].vue`.
- **`security.sri: true`** is on, plus `ssg.hashScripts/Styles/meta`. Avoid inline `:style="{ ... }"` bindings on Vue templates where possible — bind a class and put the dynamic value in CSS instead.
- **The `--accent-color` custom property** falls back to `--hot` everywhere via `var(--accent-color, var(--hot))`. The runtime tweaks panel that used to write it has been dropped.
- **Reduced motion.** `app/assets/css/styles.css` has a `@media (prefers-reduced-motion: reduce)` block that mutes the loud animations (scanlines, marquee, 404 glitch, konami toast). Keep new animations in scope of those overrides if they are decorative.

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

## Useful reading

- `app/data/site.ts` — single source of truth for the status string, version badge, urls.
- `_design/design-system/README.md` — brand voice, colour rules, type rules, what is and is not allowed.
- `_design/site/styles.css` — original design CSS (we lifted it verbatim with one rename).
- `TODO.md` — what has been intentionally deferred.

# syn.horse — core

Personal site of syn (Dave). Nuxt 4 (SSR) on Cloudflare Workers, single bespoke daisyUI `synhorse` theme. Custom domains: syn.horse, syn.as, syn.haus, syn.pink, dcw.soy (+ www).

**`CLAUDE.md` → `AGENTS.md` (repo root) is the authoritative project doc and is always in agent context** — architecture, full where-things-live table, conventions, exhaustive D1/Drizzle guide, panic-pipeline section. Read it first. These memories complement it with the _verified_ source map and non-obvious facts; they no longer track doc drift (AGENTS.md + README were reconciled to code on 2026-05-24).

## Domain memories

- Languages/frameworks/version pins/notable deps → `mem:tech_stack`
- Commands the user actually runs (dev/build/db/lint) → `mem:suggested_commands`
- Load-bearing code-style + structural invariants → `mem:conventions`
- What "done" requires; note there is no test runner → `mem:task_completion`

(app/ frontend and server/ backend share one build/config/tsconfig and server is tiny — kept unified here rather than split into per-module cores.)

## Source map (verified 2026-05-24)

- `app/` = Nuxt `srcDir`; `server/` = Nitro. Root config: `nuxt.config.ts`, `content.config.ts`, `drizzle.config.ts`, `tsconfig.json`.
- Pages `app/pages/*.vue`: index, projects, domains, contact, panic, cv, now, void (hidden, `layout: false`), blog/index, blog/[slug].
- Shell: `app/layouts/default.vue`; 404 via `app/error.vue` + `app/components/NotFound.vue`.
- Components in `app/components/{ui,layout,OgImage}/`. Auto-import is path-prefixed: `layout/StatusBar.vue` → `<LayoutStatusBar/>`; top-level `NotFound.vue` → `<NotFound/>`.
- `app/components/OgImage/*.takumi.vue` (5: BlogPost, Docs, General, NuxtSeo, ProductCard) — OG-image templates rendered via @takumi-rs.
- Composables `app/composables/*.ts`: clock/time (useClock, useTime), konami suite (useKonamiCode/State/Toast/Boot/Orchestrator), useCommandPalette.
- Auto-imported client utils `app/utils/*.ts` (format-blog-date.ts).
- Static data `app/data/*.ts`: site, projects, cv, domains, social, im, commands. `site.ts` = single source for status/version/urls. No `posts.ts` — the blog is @nuxt/content (`blog` collection, `content/blog/*.md`, queried via `queryCollection("blog")`).
- Global CSS `app/assets/css/main.css`: `@theme` tokens + daisyUI theme + `@layer components` classes + FX overlays.
- Server: `server/api/panic.post.ts` (→ POST /api/panic); `server/utils/{db.ts,pager.ts}` (auto-imported); `server/db/schema.ts`; migrations `server/db/migrations/sqlite/00NN_*.sql` (through `0002_fast_elektra`; first is `0000_stale_omega_sentinel`).

## Panic paging pipeline

`/panic` → `panic.post.ts` validates (Zod 4, 422), verifies Turnstile in prod (403), enqueues via `usePager(event)` to the `NOTIFICATIONS` queue (`syn-horse-notifications`), and records a `panic_pages` row (`status` = `queued|send_failed`, plus `queueError`/`queuedAt`). The consumer is a **separate Worker/repo** (`syn-horse-notifications`, worktree at `/Users/dave/src/_worktrees/syn-horse.notifications`) doing logging→rate-limit(KV)→AI-moderation(stub)→delivery(stub) — **do not edit it from this repo**. `pager.ts`'s `source` validators are kept byte-identical to that consumer's `HOSTNAME_RE`. Full detail: AGENTS.md "Panic paging pipeline".

## Schema (D1 + Drizzle)

`server/db/schema.ts` defines **only `panic_pages`** (two schema-driven enums: `channel` red|green, `status` queued|send_failed). `redirects` is a legacy hand-applied table in `sql/redirects.sql`, never in Drizzle migrations. Local migrations auto-apply via NuxtHub on `bun run dev`; remote is explicit (`db:migrate:remote`).

## Project-wide invariants

- **No React, ever.** Vue 3 `<script setup lang="ts">` only.
- **No `wrangler.{json,jsonc,toml}` at repo root by design** — auto-discovery would defu-merge with the inline `nitro.cloudflare.wrangler` block and duplicate every binding. Deploy config is generated to `.output/server/wrangler.json`; dev bindings live in `wrangler.dev.jsonc`; db migrate scripts pass `--config wrangler.dev.jsonc`.
- Lowercase prose; British English in comments/copy; no single-letter names anywhere.

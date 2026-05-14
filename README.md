# syn.horse

The personal site of [syn](https://syn.horse) (Dave). A queer pixel-future shouting into the void.

Built with [Nuxt 4](https://nuxt.com) on [Cloudflare Workers](https://workers.cloudflare.com), implementing the design system and candidate build from `_design/` (an export from Claude Design).

Live at [syn.horse](https://syn.horse). Other domains in the family: [syn.as](https://syn.as), [syn.haus](https://syn.haus), [syn.pink](https://syn.pink), [dcw.soy](https://dcw.soy).

## Setup

Make sure you mount the 1Password environment in `.env` and `.dev.vars`.

Toolchain versions are pinned in `mise.toml` and `.tool-versions`. With [`mise`](https://mise.jdx.dev/) installed:

```bash
mise install
bun install
```

If you would rather manage tools yourself: Node 24.15.0, Bun 1.3.13.

## Development

```bash
bun run dev
```

Boots the Nuxt dev server on `http://localhost:3000`. Cloudflare bindings (D1, KV, Cache, R2, version metadata, vars) are wired through nitropack's built-in `cloudflare-dev` preset, which reads `wrangler.dev.jsonc` via `nitro.cloudflareDev.configPath` in `nuxt.config.ts`. AI, Browser, Images, and Analytics bindings exist in production but aren't emulated locally — they need an authenticated remote-bindings session, so they're left commented out in `wrangler.dev.jsonc` until dev code needs them.

## Production

```bash
bun run build      # nuxt build + wrangler types regen
bun run preview    # local wrangler dev against .output/
bun run deploy     # wrangler deploy (production)
```

## Linting and formatting

```bash
bun run lint              # eslint + trunk + tsc --noEmit
bun run lint:types        # type check only
bun run lint:fix          # eslint --fix + trunk fix
bun run format            # prettier --write + trunk fmt
```

## Database (D1 + Drizzle)

```bash
bun run db:generate         # drizzle-kit generate → server/db/migrations/sqlite/
bun run db:migrate:local    # apply migrations to local Miniflare D1
bun run db:migrate:remote   # apply migrations to production D1
bun run db:studio           # drizzle-kit studio (browse the schema)
```

### Setup at a glance

- **Schema:** `server/db/schema.ts` (Drizzle, `sqliteTable` from `drizzle-orm/sqlite-core`). Currently: `redirects`, `panic_pages`.
- **Migrations:** `server/db/migrations/sqlite/00NN_*.sql`, with drizzle-kit metadata under `meta/`.
- **Drizzle config:** `drizzle.config.ts` at repo root (sqlite dialect, schema + out path wired).
- **D1 binding:** `DB`. Declared in both `nuxt.config.ts` (deploy) and `wrangler.dev.jsonc` (dev). Database name is `syn-horse`.
- **Server-side access:** `useDb(event)` from `server/utils/db.ts` returns a Drizzle client over `event.context.cloudflare.env.DB`. Auto-imported in server scope.
- **Migration tooling:** the wrangler CLI, not NuxtHub's auto-runner — migrations live at a non-default path so NuxtHub's plugin doesn't see them.

### Schema-driven enums (single source of truth)

For columns with a fixed set of values, declare them once on the Drizzle column and derive everything else from that array. Today this is `panicPages.channel` (`"red"` or `"green"`):

```typescript
// server/db/schema.ts
export const panicPages = sqliteTable('panic_pages', {
	// …
	channel: text({ enum: ['red', 'green'] }).notNull(),
});

export type Channel = (typeof panicPages.$inferSelect)['channel'];
```

- **Frontend types:** `import type { Channel } from "~~/server/db/schema"` in any `.vue` or `.ts` file. Type-only imports are erased at compile time, so the client bundle never pulls the schema module — only the union literal travels.
- **Server-side runtime validation:** `z.enum(panicPages.channel.enumValues)` — `enumValues` is Drizzle's typed runtime tuple, so the Zod validator and TypeScript stay in lockstep.
- **SQL:** Drizzle's SQLite `enum` option is a TypeScript-only constraint; the column stays plain `TEXT` and `bun run db:generate` won't emit a diff when you only touch the enum array. Add a manual `CHECK (col IN (...))` clause to a migration if you also want database-level enforcement.

Adding or removing a value is a one-line edit to the schema array — TypeScript then surfaces every site that needs to handle it.

### Why migrate scripts pass `--config wrangler.dev.jsonc`

There's intentionally no `wrangler.{json,jsonc,toml}` at the repo root: nitropack's cloudflare preset and the wrangler CLI both auto-discover those filenames and would `defu`-merge with the inline `nitro.cloudflare.wrangler` block in `nuxt.config.ts` — every binding would end up duplicated in `.output/server/wrangler.json`.

`wrangler.dev.jsonc` is deliberately non-discoverable. It carries the dev binding subset for Miniflare AND the `migrations_dir` that wrangler's `d1 migrations apply` needs. The `db:migrate:{local,remote}` scripts pass `--config wrangler.dev.jsonc` so wrangler reads from there. Same file works for both `--local` (Miniflare) and `--remote` (production D1) because wrangler routes by flag, not by config.

### Day-to-day loop

1. Edit `server/db/schema.ts` — add or modify tables.
2. `bun run db:generate` — `drizzle-kit generate` writes a new `00NN_*.sql` under `server/db/migrations/sqlite/` and updates `meta/_journal.json`.
3. Inspect the generated SQL. If it's a destructive change, sanity-check against data you don't want to lose.
4. Apply locally with `bun run db:migrate:local`. Test with `bun run dev`.
5. Apply to production with `bun run db:migrate:remote` — before deploy if new code references new tables, after if only adding indexes / non-required columns.
6. `bun run deploy` if you also changed worker code.

### Bringing a cold environment up to date

If you're applying to a database that has tables but no `d1_migrations` tracking table, wrangler will try to re-run migration 0000 and fail with `table already exists`. Detect and fix:

**Step 1** — inspect the target database

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

If `d1_migrations` appears in the output, also run:

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM d1_migrations ORDER BY id"
```

Swap `--remote` for `--local` to inspect the local Miniflare database.

**Step 2** — apply, depending on what you saw

| State                                                                                 | What to do                                                    |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Has `panic_pages` already                                                             | Nothing — skip to Step 3.                                     |
| Has `redirects` AND `d1_migrations` populated with `0000_curved_daimon_hellstrom.sql` | `bun run db:migrate:remote` (or `:local`).                    |
| Has `redirects` but no `d1_migrations` row for 0000                                   | Backfill the tracking row first (see below), then apply.      |
| Empty                                                                                 | `bun run db:migrate:remote` — both migrations run from clean. |

To backfill the tracking row:

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "CREATE TABLE IF NOT EXISTS d1_migrations(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO d1_migrations(name) VALUES ('0000_curved_daimon_hellstrom.sql');"

bun run db:migrate:remote
```

Same recipe works for local — swap `--remote` for `--local` and use `db:migrate:local`.

**Step 3** — verify

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

Should list at least `d1_migrations`, `panic_pages`, `redirects`, `sqlite_sequence`.

### Adjacent production requirements

- **Turnstile secret key.** `NUXT_TURNSTILE_SECRET_KEY` must be set as a Workers secret — without it, `verifyTurnstileToken` returns `{ success: false }` and every `/panic` submission 403s:

  ```bash
  bun run wrangler secret put NUXT_TURNSTILE_SECRET_KEY
  ```

- **Worker deploy.** `bun run db:migrate:remote` doesn't deploy code. Run `bun run deploy` after migrations land cleanly.

## Pages

| Route          | What                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| `/`            | Home                                                                    |
| `/now`         | What I'm doing this month                                               |
| `/projects`    | Things I made                                                           |
| `/blog`        | Blog index, tag filter                                                  |
| `/blog/<slug>` | Individual post (placeholder body for now — see [TODO.md](./TODO.md))   |
| `/cv`          | Boring resume version                                                   |
| `/contact`     | Email, signal, the rest                                                 |
| `/domains`     | The syn.\* family                                                       |
| `/panic`       | Page syn — red button for emergencies, green button for everything else |

## Easter eggs

- Press `/` anywhere to open the command palette.
- Up Up Down Down Left Right Left Right B A.
- `/sudo`, `/git`, `/gpg/agent`, `/gpg/config`, `/ssh/config` — config files served as plain text. SSH public keys at `/ssh/keys`.

## Tech

- [Nuxt 4](https://nuxt.com) with `compatibilityVersion: 4`
- [@nuxt/content](https://content.nuxt.com) — installed; the blog content is currently hardcoded in `app/data/posts.ts` while a migration to markdown-driven posts is pending
- [@nuxt/fonts](https://fonts.nuxt.com) — loads VT323, Inter and JetBrains Mono via the Google provider
- [@nuxthub/core](https://hub.nuxt.com) — provides the KV and R2 bindings
- [nuxt-security](https://nuxt-security.com) — SRI, hashed scripts and styles, security headers
- [Drizzle ORM](https://orm.drizzle.team) — D1-backed; powers the `/panic` paging endpoint via a `panic_pages` table. Auto-imported `useDb(event)` helper lives in `server/utils/db.ts`.
- [@nuxtjs/turnstile](https://github.com/nuxt-modules/turnstile) — Cloudflare Turnstile widget on `/panic`; `verifyTurnstileToken` runs on the server
- [Tailwind CSS v4](https://tailwindcss.com) and [daisyUI 5](https://daisyui.com), wired with a single bespoke `synhorse` theme — the design tokens (palette, type scale, spacing, glow shadows, animations) live in `app/assets/css/main.css` under `@theme`, and daisyUI's semantic roles (`primary`, `secondary`, `accent`, `base-100`, …) map onto them.

## Project layout

```text
app/
  app.vue                      # NuxtLayout > NuxtPage shell
  error.vue                    # 404/500 page (uses default layout)
  assets/
    css/
      main.css                 # @theme tokens + daisyUI synhorse theme + component classes + FX overlays + reduced-motion overrides
  components/
    layout/                    # StatusBar, NavBar, FxLayer, CommandPalette, KonamiToast
    ui/                        # Tag, Console
    NotFound.vue
  composables/                 # useTime, useCommandPalette, useKonamiCode
  data/                        # typed content modules (posts, projects, domains, ...)
  layouts/default.vue
  pages/                       # index, now, projects, cv, contact, domains, blog/
content/blog/                  # 15 markdown posts (dormant; future @nuxt/content source)
public/                        # static assets, easter-egg config files
server/
  api/                         # Nitro API routes (panic.post.ts → POST /api/panic)
  db/                          # drizzle schema + migrations (sqlite/)
  utils/                       # auto-imported server helpers (useDb)
_design/                       # design system + candidate site export — frozen reference
nuxt.config.ts
content.config.ts              # @nuxt/content collection definition
```

## Design

The full design system lives at `_design/design-system/` — colour swatches, type scale, component cards, brand voice. The candidate build that this repo implements is `_design/site/`. Both were exported from Claude Design and should be treated as a frozen reference.

Tokens that drive every visual decision live in the `@theme` block at the top of `app/assets/css/main.css`. The pixel mark in the nav is `public/assets/logo-mark.svg`; the wordmark next to it is rendered as text.

## Deferred work

See [TODO.md](./TODO.md) for the running list of intentional deferrals — chiefly: migrating the blog to `@nuxt/content`, an RSS feed, OG image generation, and mobile breakpoints.

## Licence

[MIT](./LICENSE).

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

Migrations live under `server/db/migrations/sqlite/` (configured via `drizzle.config.ts`). The migrate scripts pass `--config wrangler.dev.jsonc` so wrangler picks up the binding ID and migrations directory without a root `wrangler.{json,jsonc,toml}` getting auto-merged into the deploy config.

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

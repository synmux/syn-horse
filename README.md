# syn.horse

The personal site of [syn](https://syn.horse) (Dave). A queer pixel-future shouting into the void.

Built with [Nuxt 4](https://nuxt.com) on [Cloudflare Workers](https://workers.cloudflare.com), implementing the design system and candidate build from `_design/` (an export from Claude Design).

Live at [syn.horse](https://syn.horse). Other domains in the family: [syn.as](https://syn.as), [syn.haus](https://syn.haus), [syn.pink](https://syn.pink), [dcw.soy](https://dcw.soy).

## Setup

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

Boots the Nuxt dev server on `http://localhost:3000`. Cloudflare bindings (KV, R2, Cache, AI, Browser, Images, Analytics, version metadata) are wired through `nitro-cloudflare-dev`, so the runtime in dev is the same one you ship.

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

## Three home variants

The home page ships three layouts; the default is the calm one. Switch with a query param:

| URL            | Variant  | Vibe                                                   |
| -------------- | -------- | ------------------------------------------------------ |
| `/`            | calm     | minimal, two-by-two card grid, the production-safe one |
| `/?v=feral`    | feral    | huge headline, scrolling marquee, six cards            |
| `/?v=unhinged` | unhinged | overlapping wordmarks, ASCII art, terminal block       |

## Pages

| Route          | What                                                                  |
| -------------- | --------------------------------------------------------------------- |
| `/`            | Home (variants above)                                                 |
| `/now`         | What I'm doing this month                                             |
| `/projects`    | Things I made                                                         |
| `/blog`        | Blog index, tag filter                                                |
| `/blog/<slug>` | Individual post (placeholder body for now — see [TODO.md](./TODO.md)) |
| `/cv`          | Boring resume version                                                 |
| `/contact`     | Email, signal, the rest                                               |
| `/domains`     | The syn.\* family                                                     |

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
- [Drizzle ORM](https://orm.drizzle.team) — schema scaffolded for redirects; D1 currently disabled
- Hand-written CSS using design tokens from `_design/site/colors_and_type.css`. No Tailwind utility classes are used by the new design.

## Project layout

```text
app/
  app.vue                      # NuxtLayout > NuxtPage shell
  error.vue                    # 404/500 page (uses default layout)
  assets/
    css/
      colors_and_type.css      # design tokens (palette, type, spacing, motion)
      styles.css               # site styles (lifted verbatim from the design)
      main.css                 # entry point
  components/
    home/                      # HomeCalm, HomeFeral, HomeUnhinged
    layout/                    # StatusBar, NavBar, FxLayer, CommandPalette, KonamiToast
    ui/                        # PageHeader, Tag, Console
    NotFound.vue
  composables/                 # useTime, useHomeVariant, useCommandPalette, useKonamiCode
  data/                        # typed content modules (posts, projects, domains, ...)
  layouts/default.vue
  pages/                       # index, now, projects, cv, contact, domains, blog/
content/blog/                  # 15 markdown posts (dormant; future @nuxt/content source)
public/                        # static assets, easter-egg config files
server/db/                     # drizzle schema and migrations (dormant)
_design/                       # design system + candidate site export — frozen reference
nuxt.config.ts
content.config.ts              # @nuxt/content collection definition
```

## Design

The full design system lives at `_design/design-system/` — colour swatches, type scale, component cards, brand voice. The candidate build that this repo implements is `_design/site/`. Both were exported from Claude Design and should be treated as a frozen reference.

Tokens that drive every visual decision are in `app/assets/css/colors_and_type.css`. The pixel mark in the nav is `public/assets/logo-mark.svg`; the wordmark next to it is rendered as text.

## Deferred work

See [TODO.md](./TODO.md) for the running list of intentional deferrals — chiefly: migrating the blog to `@nuxt/content`, an RSS feed, OG image generation, and mobile breakpoints.

## Licence

[MIT](./LICENSE).

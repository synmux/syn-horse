# to-do list

- nuxthub integration (the D1 binding is commented out in `nuxt.config.ts`)
- migrate blog from hardcoded `app/data/posts.ts` to `@nuxt/content` — 15 markdown files already in `content/blog/`, the `content.config.ts` schema has been relaxed; the placeholder body in `app/pages/blog/[slug].vue` needs swapping for `<ContentRenderer :value="page" />`
- backfill `tags:` frontmatter to the existing `content/blog/*.md` files (or drop `tags` from `content.config.ts` entirely; current schema marks it optional but populated tags drive the blog filter row)
- RSS feed at `/feed.xml` — currently linked from the home and blog footers but returns 404. Wants a `server/routes/feed.xml.ts` reading from `app/data/posts.ts` (or, post-content-migration, from a `queryCollection`)
- OG image generation at `/_og/s/*` — `@takumi-rs/core` + `@takumi-rs/wasm` are already installed, `nitro.json` excludes the path, just needs a server route handler **note: I think we already have OG images from nuxt-seo; check this first**
- the three CV-page action buttons (download pdf, linkedin, email for refs) are stubs with no handlers
- mobile breakpoints — the source design ships no `@media` queries; some headings overflow narrow viewports
- prune the `.lc-all` block (lowercase-mode toggle, ~30 lines at the bottom of `styles.css`) and `.ca-on` references — both were tweak-panel toggles that were dropped with the panel itself
- shiki / `onig.wasm` warning during the Cloudflare Workers build ("Failed to load the WebAssembly module; falling back to module mode") — cosmetic, falls back fine, but worth understanding before it bites
- the hardcoded "last meaningful update: 2026.04.20" line in `app/pages/now.vue` and the "updated 2026.04.20" eyebrow either need a dynamic source or an explicit manual-update workflow
- the existing redirects schema in `server/db/schema.ts` and the seed in `sql/redirects.sql` are dormant — wire them up or remove

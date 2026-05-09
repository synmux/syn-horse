# to-do list

- [ ] RSS feed at `/feed.xml` — currently linked from the home and blog footers but returns 404. Wants a `server/routes/feed.xml.ts` reading from a `queryCollection`.
- [ ] mobile breakpoints — the source design ships no `@media` queries; some headings overflow narrow viewports

## review recommendations (2026-05-09)

### verification and tooling

- [ ] make `bun run lint` pass locally, or adjust the documented command. Today `bun run lint:eslint` checks `_DIO/`, `_DSOY/` and `_design/` even though they are frozen/export directories, while Trunk already ignores them.
- [ ] make `bun run lint:trunk` pass, or scope Trunk away from generated/local agent skill files under `.agents/skills/**`; the current run reports markdown/yaml issues in installed skill files plus the intentional TODO in `server/api/panic.post.ts`.
- [ ] decide whether the `x:test*` scripts are real project commands. They currently call `vitest` and `playwright`, but neither binary is installed as a direct dependency, so both version checks fail with `command not found`.
- [ ] add a small smoke-test suite for core routes: `/`, `/blog`, one known `/blog/<slug>`, `/feed.xml`, `/robots.txt`, `/sitemap.xml`, and `/api/panic` validation failure/success paths.
- [ ] add a content-asset check that scans Markdown image links and fails CI when the target is missing or accidentally relative to the wrong directory.
- [ ] audit direct dependencies and move/remove packages that are only historical or optional peers: candidates include `openai`, `uuid`, `ntfy`, `pushover-js`, `dotenv`, `@dotenvx/dotenvx`, `node-gyp`, `untun`, `nuxi`, `@catppuccin/*`, and possibly `@libsql/client` / `better-sqlite3` if they are only present for local `@nuxt/content` support.
- [ ] consider gating `devtools.enabled` / timeline config to development only, unless the Nuxt production build is confirmed to tree-shake all devtools runtime.
- [ ] avoid side effects in `nuxt.config.ts`: it writes `.buildtime` when imported if the file is missing. Prefer a build/deploy script, environment variable, or Nitro hook so config evaluation stays read-only.

### content and blog

- [ ] fix broken Markdown image references. I found missing paths in `0003_prometheus-is-cool-and-good.md`, `0007_good-times-in-the-shell.md`, and relative `images/blog/...` paths in `0011_neurakink.md` that likely should be `/images/blog/...` or copied into `public/images/blog/...`.
- [ ] add post-body styles for images, captions, tables, ordered lists, horizontal rules, and footnote-ish blocks; `ContentRenderer` now exposes full Markdown but `main.css` mostly styles paragraphs, headings, code, blockquotes, and unordered lists.
- [ ] revisit `future: true` semantics. The hidden posts dated `2026-02-11`, `2026-04-18`, and `2026-05-06` are all in the past as of `2026-05-09`, so either publish them, rename the flag to `draft`, or auto-hide only when `date > today`.
- [ ] verify the generated sitemap includes content posts, not only static page routes, and that future/draft posts are excluded in production.
- [ ] wire the existing `SITE.feed` constant everywhere instead of hardcoding `/feed.xml` in multiple templates.
- [ ] decide whether `sql/redirects.sql` and the old `/go/*` redirect data are still useful. The Drizzle migrations now drop `redirects`, but docs and archived files still imply redirects are active.
- [ ] update stale blog docs: `docs/BLOG.md` still uses old `queryContent(...)` examples, while runtime code now uses `queryCollection(...)`.
- [ ] update `README.md`: it still says blog detail pages are placeholders, says `content/blog/` has 15 dormant posts, and says the blog migration to `@nuxt/content` is deferred.

### app behaviour and ux

- [ ] convert clickable non-controls into real controls: blog filter `<span>` elements and command palette result `<div>` rows should be buttons/listbox options with keyboard and ARIA states.
- [ ] give the command palette a fuller accessibility pass: `role="combobox"`/listbox semantics, `aria-activedescendant`, focus trapping/restoration, and focusable mouse-selectable results.
- [ ] make `/projects` cards actual links when `url` is present; right now they show a URL and hover like cards, but there is no navigation target.
- [ ] make the `/cv` action buttons real links/actions or remove the button affordance. `download pdf`, `linkedin`, and `email for full ref list` currently do nothing.
- [ ] make the Konami key listener ignore inputs, textareas, selects, and contenteditable elements so typing in `/panic` cannot trigger the sequence.
- [ ] show the actual requested path in the 404 console instead of the placeholder `/this-route` / `/this-page-does-not-exist`.
- [ ] review nav/statusbar behaviour at narrow widths. The sticky status bar and full nav tab row may need horizontal collapse before the larger page heading fixes are done.
- [ ] add responsive rules for the main two-column layouts: home portrait grid, contact grid, project grid, blog row grid, domain rows, and CV role/talk rows.

### security, privacy, and cloudflare

- [ ] add abuse protection for `POST /api/panic` beyond Turnstile: a Cloudflare Rate Limiting binding or KV/D1-backed throttle keyed by IP/contact would keep valid-token spam from filling D1 or paging you.
- [ ] cap `turnstileToken` length in the Zod schema. Cloudflare Turnstile tokens are documented with a 2048-character maximum, so rejecting oversized bodies before verification is cheap.
- [ ] pass and/or validate more Turnstile context if `@nuxtjs/turnstile` exposes it: remote IP, expected hostname, expected action, and clearer logging of validation failure modes.
- [ ] reduce PII in Workers logs for `/api/panic`. The route currently logs truncated `issue` and `contact`; consider logging only the id/channel and keeping sensitive details in D1.
- [ ] add a `channel` constraint at the database layer for `panic_pages` so D1 enforces `red` / `green`, not just TypeScript and Zod.
- [ ] decide on retention for `panic_pages` rows, since they contain contact details and incident descriptions.
- [ ] implement the real paging path already sketched in `server/api/panic.post.ts`: red immediate notification, green deferred/batched notification, and a retry/dead-letter story.
- [ ] review the CSP once Turnstile, gtag, and any future scripts are settled. The current `script-src` includes `https:`, `'unsafe-inline'`, `'strict-dynamic'`, a nonce, and `'wasm-unsafe-eval'`; some of that may be necessary, but it is worth documenting the minimum.
- [ ] verify whether `public/_robots.txt` and `app/assets/robots.txt` are intentional. Neither is a plain `public/robots.txt`; confirm `@nuxtjs/seo` is serving the desired robots response and remove duplicates if not needed.
- [ ] revisit production observability settings after launch. `head_sampling_rate: 1`, invocation logs, server source maps, and `upload_source_maps` are useful during bring-up but may be noisy or too revealing long-term.

### docs and repo hygiene

- [ ] update `DB.md` and `AGENTS.md` to match the current schema. They still describe `redirects` as active even though `server/db/schema.ts` only defines `panic_pages` and migration `0002` drops `redirects`.
- [ ] update `DB.md` migration wording: one section says NuxtHub auto-runs dev migrations, while the project instructions say migrations are wrangler-applied because the path is non-default.
- [ ] update `.env.example` to distinguish active settings from leftovers. It lists OpenRouter, Anthropic, Linear, ControlD, and Sentry variables that do not appear in the current app/server code.
- [ ] either refresh or remove `docs/RECOMMENDATIONS.md`; it reads like an older generic review and now overlaps/conflicts with this checkbox backlog.
- [ ] document why `worker-configuration.d.ts` is tracked even though it is generated by `wrangler types`, and add a quick note on when it should be regenerated.
- [ ] add a short "content authoring checklist" covering frontmatter, `future`/draft handling, image placement under `public/images/blog`, and RSS/sitemap visibility.

### seo and sharing

- [ ] replace or remove the default/ejected OG image templates under `app/components/OgImage/`. Several still say `- Ejected!`, use non-brand colours, and are not wired by page code.
- [ ] add per-page and per-post social metadata: canonical URL, `og:image`, `og:type`, article published time, article tags, and a default social card.
- [ ] verify `@nuxtjs/seo` route output after build/preview: sitemap index, content URLs, robots rules, canonical URLs, and hidden/future post exclusion.
- [ ] add `link rel="alternate" type="application/rss+xml"` to the head once `/feed.xml` exists.

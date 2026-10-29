# to-do list

## features

- [x] abandoned projects which appear when in konami code mode and disappear otherwise (folded into the year-sorted project grid, animated in/out)
- [ ] swap the placeholder secret goodies in `app/data/goodies.ts` (`/horse`, `/konami`, `/mixtape`) for real files published at public.syn.horse - they 404 until then
- [x] fix the dead easter-egg redirect targets (2026-10-25). `/ssh/config`, `/ssh/keys`, `/gpg/agent`, `/gpg/config`, `/gpg/keys` and `/git` all 301'd to files that 404 on public.syn.horse. `/ssh` and `/gpg` now redirect to the published key files, `/git` is gone, and the gpg and ssh goodies link to the same files.
- [ ] create API endpoint for the notification endpoint to write logs to the DB, so that we can remove the notification worker's DB binding and the underlying DB, and write to our primary DB.
- [ ] add retry policy + dead-letter handling on the consumer side once it lands.
- [ ] consider a second `Pager` implementation on the producer side (e.g. a direct synchronous channel) if/when needed - extend `usePager()` to choose based on channel or runtime config.
- [ ] decide whether to keep `status = "queued"` rows visible to any future admin UI as in-flight states, vs treating them as failed after a TTL if no consumer-side `delivered` / `delivery_failed` update arrives.
- [ ] RSS feed at `/feed.xml` - currently linked from the home and blog footers but returns 404. Wants a `server/routes/feed.xml.ts` reading from a `queryCollection`. **(designed & independently reviewed - full spec in `APP.md` §15; ready to implement)**
- [ ] review `PUBSUB.md` (2026-07-02) and pick a websocket transport for the digital signage device - recommended: dedicated realtime worker + hibernating durable object; build `/api/signage/state` with `ETag` first whichever option wins
- [ ] mobile breakpoints - the source design ships no `@media` queries; some headings overflow narrow viewports

## review recommendations (2026-05-09)

### verification and tooling

- [ ] make `pnpm lint` pass locally, or adjust the documented command. Today `pnpm lint:eslint` checks `_DIO/`, `_DSOY/` and `_design/` even though they are frozen/export directories, while Trunk already ignores them.
- [ ] make `pnpm lint:trunk` pass, or scope Trunk away from generated/local agent skill files under `.agents/skills/**`; the current run reports markdown/yaml issues in installed skill files plus the intentional TODO in `server/api/panic.post.ts`.
- [x] remove the `x:test:*` placeholder scripts (coverage, e2e, nuxt and unit projects), none of which had their tooling installed; `pnpm test` / `pnpm test:watch` cover the unit tests (2026-09-29).
- [x] make `pnpm lint:types` actually type-check. It ran `tsc --noEmit`, which checks zero files because the root `tsconfig.json` is references-only. It now runs `nuxt typecheck` (2026-09-29). `@vueuse/core` is a direct dependency, and the one error the real check found, in `CommandPalette.vue`, is fixed.
- [x] add `vue-tsc` so `.vue` files are type-checked (2026-09-29, through `nuxt typecheck`).
- [x] run `pnpm test` in the `ci` workflow, between typecheck and build (2026-09-29; editing `.github/` for this was approved).
- [ ] add a small smoke-test suite for core routes: `/`, `/blog`, one known `/blog/<slug>`, `/feed.xml`, `/robots.txt`, `/sitemap.xml`, and `/api/panic` validation failure/success paths.
- [ ] add a content-asset check that scans Markdown image links and fails CI when the target is missing or accidentally relative to the wrong directory.
- [ ] audit direct dependencies and move/remove packages that are only historical or optional peers: candidates include `openai`, `uuid`, `dotenv`, `@dotenvx/dotenvx`, `node-gyp`, `untun`, `nuxi`, `@catppuccin/*`, and possibly `@libsql/client` / `better-sqlite3` if they are only present for local `@nuxt/content` support.
- [ ] consider gating `devtools.enabled` / timeline config to development only, unless the Nuxt production build is confirmed to tree-shake all devtools runtime.
- [ ] avoid side effects in `nuxt.config.ts`: it writes `.buildtime` when imported if the file is missing. Prefer a build/deploy script, environment variable, or Nitro hook so config evaluation stays read-only.
- [ ] fix the pinact `401 Bad credentials` failures in `pnpm lint:trunk` (2026-08-16): pinact verifies GitHub Actions pin annotations against api.github.com and the ambient GitHub token is being rejected, producing 11 "security issues" across `.github/workflows/*` - refresh `gh auth` / `GITHUB_TOKEN` (or configure pinact's token) so the check can resolve commit hashes again
- [ ] clear the two markdownlint findings under `.github/` (2026-08-16): `copilot-instructions.md` MD041 (first line should be a top-level heading) and `instructions/mermaid.instructions.md` MD034 (bare url) - `.github/` is on the do-not-modify list, so this needs explicit approval or a markdownlint ignore entry
- [ ] revisit the `TMPDIR=/tmp` prefix on the `dev` script once `@nuxt/vite-builder` shortens its vite-node IPC socket name. On macOS the default `$TMPDIR` (`/var/folders/.../T/`, ~49 bytes) plus the builder's `nuxt-vite-node-<rand>/nuxt-vite-node-<pid>-<ts>.sock` path totals ~110 bytes, over the 104-byte `sun_path` limit, so vite-node IPC fails with `connect EINVAL` and the dev server dies on first request; `/tmp` shortens the path to ~66 bytes. Latest `@nuxt/vite-builder` (4.4.7) still constructs it this way.
- [ ] replace the `bun-install` action in `.trunk/trunk.yaml` (runs `bun install && bun run format`) with a pnpm equivalent; the trunk toolchain is on the do-not-modify list so this needs explicit approval.

### content and blog

- [ ] fix broken Markdown image references. I found missing paths in `0003_prometheus-is-cool-and-good.md`, `0007_good-times-in-the-shell.md`, and relative `images/blog/...` paths in `0011_neurakink.md` that likely should be `/images/blog/...` or copied into `public/images/blog/...`.
- [ ] add post-body styles for images, captions, tables, ordered lists, horizontal rules, and footnote-ish blocks; `ContentRenderer` now exposes full Markdown but `main.css` mostly styles paragraphs, headings, code, blockquotes, and unordered lists.
- [ ] revisit `future: true` semantics. The hidden posts dated `2026-02-11`, `2026-04-18`, and `2026-05-06` are all in the past as of `2026-05-09`, so either publish them, rename the flag to `draft`, or auto-hide only when `date > today`.
- [ ] verify the generated sitemap includes content posts, not only static page routes, and that future/draft posts are excluded in production.
- [ ] wire the existing `SITE.feed` constant everywhere instead of hardcoding `/feed.xml` in multiple templates.
- [ ] decide whether `sql/redirects.sql` and the old `/go/*` redirect data are still useful. `redirects` was never a Drizzle table (only `sql/redirects.sql`); some docs and archived files still imply it's active.
- [ ] update stale blog docs: `docs/BLOG.md` still uses old `queryContent(...)` examples, while runtime code now uses `queryCollection(...)`.
- [x] stop other worker versions writing production's content D1: `preview_urls` is off (2026-09-29). Gradual deployments and version splits would still share `DB_CONTENT`; while two versions with different content get traffic, `content-sync` in each rebuilds D1 to its own content, so they flip-flop. Give non-production versions their own content D1 before using either. A "newest build wins" rule looks tempting, but it lets a preview built after the last deploy take over production's content.
- [x] fail the build on broken content (2026-09-29). @nuxt/content turned unparseable frontmatter into a row of NULLs and garbage, and never checked the schema; a file that made the parser throw was dropped with a warning. `modules/content-integrity.ts` now stops the build if a file has no row or a row fails its schema.
- [x] page when content-sync keeps failing (2026-09-29). After a minute of failures with no success in between, the middleware sends a red page on the `NOTIFICATIONS` queue, which the consumer delivers through Pushover at emergency priority. The last page time is kept in KV, so an outage pages once an hour across all isolates, and recovery clears it.
- [x] send a green all-clear when content-sync works again after an outage that paged (2026-09-29). Any isolate whose sync succeeds checks KV for an outstanding red page, removes it and sends the all-clear, so it does not depend on the isolate that paged still being alive.
- [ ] alert on failed deploys (for example `content-integrity` stopping a build). Workers Builds publishes `build.failed` events to a Queue through Event Subscriptions, so no build-time binding is needed. Either subscribe the notifications queue (the consumer must then accept that event shape) or give build events a queue of their own.
- [x] stop the site name appearing twice in page titles (2026-09-29). Pages set only their own title, and the SEO module's template adds `· syn.horse`. The same fix gave every page its own og:title and og:description; both had been the site defaults everywhere.

### app behaviour and ux

- [ ] convert clickable non-controls into real controls: blog filter `<span>` elements and command palette result `<div>` rows should be buttons/listbox options with keyboard and ARIA states.
- [ ] give the command palette a fuller accessibility pass: `role="combobox"`/listbox semantics, `aria-activedescendant`, focus trapping/restoration, and focusable mouse-selectable results.
- [ ] make `/projects` cards actual links when `url` is present; right now they show a URL and hover like cards, but there is no navigation target.
- [ ] make the `/cv` action buttons real links/actions or remove the button affordance. `download pdf`, `linkedin`, and `email for full ref list` currently do nothing.
- [ ] make the Konami key listener ignore inputs, textareas, selects, and contenteditable elements so typing in `/panic` cannot trigger the sequence.
- [ ] show the actual requested path in the 404 console instead of the placeholder `/this-route` / `/this-page-does-not-exist`.
- [ ] review nav/statusbar behaviour at narrow widths. The sticky status bar and full nav tab row may need horizontal collapse before the larger page heading fixes are done.
- [ ] add responsive rules for the main two-column layouts: home portrait grid, contact grid, project grid, blog row grid, domain rows, and CV role/talk rows.
- [ ] the konami-revealed abandoned project cards do not play their entrance animation when `/projects` is reached via in-app navigation while konami mode is already active (the `<TransitionGroup>` has no `appear`, intentionally, so live cards never animate on load). Toggling konami while on the page always animates. Revisit only if it matters.

### security, privacy, and cloudflare

- [ ] add abuse protection for `POST /api/panic` beyond Turnstile: a Cloudflare Rate Limiting binding or KV/D1-backed throttle keyed by IP/contact would keep valid-token spam from filling D1 or paging you.
- [ ] cap `turnstileToken` length in the Zod schema. Cloudflare Turnstile tokens are documented with a 2048-character maximum, so rejecting oversized bodies before verification is cheap.
- [ ] pass and/or validate more Turnstile context if `@nuxtjs/turnstile` exposes it: remote IP, expected hostname, expected action, and clearer logging of validation failure modes.
- [ ] add a `channel` constraint at the database layer for `panic_pages` so D1 enforces `red` / `green`, not just TypeScript and Zod.
- [ ] decide on retention for `panic_pages` rows, since they contain contact details and incident descriptions.
- [ ] review the CSP once Turnstile, gtag, and any future scripts are settled. The current `script-src` includes `https:`, `'unsafe-inline'`, `'strict-dynamic'`, a nonce, and `'wasm-unsafe-eval'`; some of that may be necessary, but it is worth documenting the minimum.
- [ ] verify whether `public/_robots.txt` and `app/assets/robots.txt` are intentional. Neither is a plain `public/robots.txt`; confirm `@nuxtjs/seo` is serving the desired robots response and remove duplicates if not needed.
- [ ] revisit production observability settings after launch. `head_sampling_rate: 1`, invocation logs, server source maps, and `upload_source_maps` are useful during bring-up but may be noisy or too revealing long-term.
- [ ] reconcile R2 binding drift uncovered while writing `APP.md`: the bucket name differs between `hub.blob.bucketName` (`blob-syn-horse`) and the deploy `r2_buckets` block in `nuxt.config.ts` (`syn-horse`). Confirm which bucket the `BLOB` binding actually resolves to before building anything on R2.
- [ ] fix the dev `KV` namespace id in `wrangler.dev.jsonc` - it has 33 hex chars (`3fa198f1477f456c8d27eb9a72562a4bf`, trailing `f`) versus the 32-char deploy id in `nuxt.config.ts` (`3fa198f1477f456c8d27eb9a72562a4b`). Harmless in Miniflare (id is only a local state key) but keep them identical so local KV state lines up with intent.
- [ ] restore or redirect the dormant family domains. `syn.as`, `syn.haus`, `syn.pink` and `dcw.soy` have had no dns records since their custom-domain routes were dropped in 1d0b71d (2026-05-07). the mastodon profile field on basilisk.gallery/@syn still points at `https://syn.as`, so its rel=me verification fails on an unresolvable host even though syn.horse serves `<link rel="me" href="https://basilisk.gallery/@syn">` correctly. options: re-add the custom domains to the wrangler block, add a cloudflare redirect rule from syn.as to syn.horse, or change the profile field to `https://syn.horse`.

### docs and repo hygiene

- [ ] update `DB.md` to match the current schema - it still describes `redirects` as active even though `server/db/schema.ts` only defines `panic_pages`. (`redirects` was never a Drizzle table, only `sql/redirects.sql`; `AGENTS.md`/`README.md` already corrected.)
- [ ] align `DB.md` migration wording with `AGENTS.md`/`README.md`: local migrations auto-apply via NuxtHub on `pnpm dev`; remote (`pnpm db:migrate:remote`) stays explicit.
- [ ] update `.env.example` to distinguish active settings from leftovers. It lists OpenRouter, Anthropic, Linear, ControlD, and Sentry variables that do not appear in the current app/server code.
- [ ] either refresh or remove `docs/RECOMMENDATIONS.md`; it reads like an older generic review and now overlaps/conflicts with this checkbox backlog.
- [ ] document why `worker-configuration.d.ts` is tracked even though it is generated by `wrangler types`, and add a quick note on when it should be regenerated.
- [ ] add a short "content authoring checklist" covering frontmatter, `future`/draft handling, image placement under `public/images/blog`, and RSS/sitemap visibility.
- [ ] fix docs that still claim five custom domains. `README.md` line 7, `APP.md` line 48 and `.agents/skills/synhorse-workers/SKILL.md` line 17 say syn.as/syn.haus/syn.pink/dcw.soy are served; only syn.horse and <www.syn.horse> have routes and dns.

### seo and sharing

- [ ] replace or remove the default/ejected OG image templates under `app/components/OgImage/`. Several still say `- Ejected!`, use non-brand colours, and are not wired by page code.
- [ ] add per-page and per-post social metadata: canonical URL, `og:image`, `og:type`, article published time, article tags, and a default social card.
- [ ] verify `@nuxtjs/seo` route output after build/preview: sitemap index, content URLs, robots rules, canonical URLs, and hidden/future post exclusion.
- [ ] add `link rel="alternate" type="application/rss+xml"` to the head once `/feed.xml` exists.

## bug hunt (2026-10-14)

Confirmed by two reviewers, each trying to disprove the other's findings.

- [ ] stop inherited object keys resolving as content collections. `resolveContentTarget` in `server/utils/content-sync.ts:104-111` indexes plain manifest objects, so `POST /__nuxt_content/constructor/query` (also `toString`, `valueOf`, `__proto__`, …) builds a target, the dump fetch fails, and the middleware returns 503 instead of 404. Two such requests reaching one isolate at least 60s apart make `failureTracker` report the run as alert-worthy, so the middleware enqueues a red "constructor pages are down" page. That needs no auth and no Turnstile, and allows about one page per name per hour. Use `Object.hasOwn` (or a `Map`) for the manifest lookups.
- [ ] make `/api/panic` report a failed queue send. `server/api/panic.post.ts:67-88` stores `send_failed` but still returns `{ ok: true }`, and `app/pages/panic.vue:64-65` shows "paged." either way, so a red page that never left looks delivered.
- [ ] take the panic `source` from `CF-Connecting-IP` only. `extractSource` in `server/utils/pager.ts:19-37` prefers the leftmost `X-Forwarded-For` entry, which the client controls (Cloudflare appends to an existing header), so a caller can set any IP or a hostname such as `content-sync.syn.horse` as the message source.
- [ ] write the content-sync red-page claim to KV only after the queue send succeeds. `pageForOutage` (`server/middleware/content-sync.ts:79-98`) claims first, so a failed send suppresses retries for the full hour, and recovery later sends a green all-clear for a red page that never went out.
- [ ] retry the content-sync green all-clear when its send fails. `announceRecovery` (`server/middleware/content-sync.ts:104-123`) deletes the KV key before sending, so a failed send loses the all-clear permanently.
- [ ] fix the sitemap: a production build lists only the 10 static routes and omits every blog post (supersedes the "verify" items above).
- [ ] either compare row content as well as `__hash__` in content-sync drift detection, or stop claiming it repairs manual edits. An `UPDATE` that keeps `__hash__` reports no drift (`server/utils/content-sync.ts:214-220, 255-263`), contradicting the header at lines 12-13 and the note at `server/middleware/content-sync.ts:24`.
- [ ] read panic validation messages from `data.data.issues`. Nitro wraps `createError({ data })` in the response body, so `app/pages/panic.vue:71` always falls back to "validation failed" (low impact: the client guards mirror the server's limits).

## ponytail audit (2026-10-29)

Whole-repo audit, deferred. Load assumed: a small personal site with low traffic, served by many Worker isolates at once, every endpoint public. `pnpm test` passed (59 tests) at the time. Items marked "expands bug hunt" repeat a 2026-10-14 entry above with the full fix; tick both when done. Suggested order: 1, 2, 3 first (each under 10 lines; together they close a path where anyone can page syn and the panic form's status is wrong).

### must fix

- [ ] 1. stop prototype keys paging syn (expands bug hunt). `resolveContentTarget` in `server/utils/content-sync.ts:104-108` looks the collection name up in plain manifest objects, so `POST /__nuxt_content/constructor/query` finds the inherited `checksums["constructor"]`, builds a target, the dump fetch fails and the request gets a 503. Two such requests 60s apart in one isolate send a red Pushover emergency page claiming the `constructor` pages are down, with no captcha or login; repeatable about once an hour per inherited name (`constructor`, `toString`, `valueOf`, `__proto__`, …). Fix: `Object.hasOwn(manifest.checksums, collection)` and the same for `checksumsStructure` and `tables`; add one `"constructor"` test beside the existing `resolveContentTarget` tests in `test/unit/content-sync.test.ts`.
- [ ] 2. make `/api/panic` tell the truth about the page (expands bug hunt). `server/api/panic.post.ts:67-88` sends to the queue, then inserts the D1 row. If the send fails, the row says `send_failed` but the reply is still `{ ok: true }` and `app/pages/panic.vue` shows `paged.`, so a real emergency looks delivered. If the send works and the insert throws, the sender sees an error, retries, and syn gets the same red page twice. Fix: after the insert, `if (!result.ok) throw createError({ statusCode: 502, statusMessage: "could not page" })`; wrap the insert in `try/catch` that logs the error and still returns `ok`, because the page has already gone out. Add a test for both paths (the handler has none today).
- [ ] 3. take the panic `source` from `cf-connecting-ip` only (expands bug hunt). `extractSource` in `server/utils/pager.ts:19-37` prefers the leftmost `X-Forwarded-For` entry, which the client writes (Cloudflare only appends), so a caller can set any IP or `content-sync.syn.horse` and use up the consumer's per-source rate limit meant for real outage alerts. Fix: delete the `X-Forwarded-For` branch (about 10 lines) and keep the `isValidSource` check on `cf-connecting-ip`; add one test where a forged `X-Forwarded-For` header still yields the `cf-connecting-ip` value (`extractSource` has no test today).
- [ ] 4. point the mastodon links at `@syn`. `nuxt.config.ts:47` verifies `rel=me` against `https://basilisk.gallery/@syn`, but `app/pages/index.vue:69`, `app/data/commands.ts:60-61` and `app/data/social.ts:11-12` send visitors to `https://basilisk.gallery/@dave` (6 strings). Fix: change them to `@syn`; better, have `index.vue` and `commands.ts` read the github/mastodon/bluesky URLs from `SOCIAL` so only one copy exists. If skipped, every visitor who clicks mastodon lands on the old account.
- [ ] 5. make `pnpm run deploy` build, and stop the build stamps going stale. `deploy` in `package.json` runs `deploy:stamp deploy:hash deploy:wrangler` but never builds (unlike `deploy:nonprod`), so it uploads whatever is in `.output` and the fresh stamp only affects the next build. `nuxt.config.ts:11-26` reads `.buildtime` and `.commithash` whenever they exist and never refreshes them: the local `.buildtime` was still `2026-09-29` on 2026-10-29, so every local build showed `build 30d ago`, and after one deploy `.commithash` pins the status-bar commit link to that old commit. Fix: compute both on every config load (`new Date().toISOString()`, and `git rev-parse --short HEAD` with the existing `unknown` fallback), delete the file reads/writes plus `deploy:stamp` and `deploy:hash`, and set `deploy` to `pnpm run-s build deploy:wrangler`. Also closes the "avoid side effects in `nuxt.config.ts`" item above.

### should fix

- [ ] 6. send content-sync alerts before touching KV (expands the two bug-hunt alert items). `pageForOutage` (`server/middleware/content-sync.ts:79-98`) records the page time in KV, then sends; `announceRecovery` (`:104-123`) deletes the record, then sends. A failed red send blocks every isolate from retrying for an hour and later yields a green all-clear for a page that never went out; a failed green send loses the all-clear for good. Fix: send first, then `put` (red) or `delete` (green) only when `result.ok`, keeping the existing rule that a KV error still lets the red page go out.
- [ ] 7. serve `/feed.xml` or remove its links (same as the RSS item under features). It 404s but is linked from `app/pages/index.vue:74`, `app/pages/blog/index.vue:66`, `app/data/social.ts:27` and `app/data/site.ts:7`. Fix: build `server/routes/feed.xml.ts` from the spec in `APP.md` §15 (about 40 lines); until then, delete the four links.
- [ ] 8. put blog posts in the sitemap (expands bug hunt). `@nuxtjs/sitemap` 9.1.0 is installed but nothing feeds it the blog collection, so a production build lists the 10 static routes and none of the posts. Fix: wrap the `blog` collection in `content.config.ts` with `asSitemapCollection()` from `@nuxtjs/sitemap/content` and keep `future: true` posts out; `content-integrity` still passes because `z.object` strips the extra key. Not re-verified with a build during the audit.
- [ ] 9. make the blog tag filter keyboard-usable (expands the "clickable non-controls" item). `app/pages/blog/index.vue:43-47` renders each tag as `<span @click>`, which Tab cannot reach and Enter cannot activate, so keyboard and screen-reader users cannot filter posts. Fix: `<button type="button" :aria-pressed="filter === tag">` with the same classes.
- [ ] 10. remove 9 unused dependencies (expands the dependency-audit item). Each was searched for across the whole tree and found only in docs or the lockfile: `uuid` (code uses `crypto.randomUUID()`), `@libsql/client`, `vite-plugin-eslint2`, `@tailwindcss/cli` (`@tailwindcss/vite` is the one in use), `untun`, `@catppuccin/daisyui`, `@catppuccin/tailwindcss`, `nuxt-gtag` (loaded in `nuxt.config.ts:211` with no tag id, while `/panic` says `no analytics`), and `lefthook` (`lefthook.yml` is only commented-out examples, so it installs hooks that do nothing). Fix: remove all 9, the `nuxt-gtag` module line and `lefthook.yml` (and lefthook's `allowBuilds` entry in `pnpm-workspace.yaml`), then run `pnpm build`.
- [ ] 11. delete the 5 unused OG image templates (expands the OG template item). `app/components/OgImage/{BlogPost,Docs,General,NuxtSeo,ProductCard}.takumi.vue` are ejected defaults (some still say `Ejected!`), 283 lines, and no page calls `defineOgImage`. Also delete `NUXT_OG_IMAGE_SECRET` from `mise.toml`: `nuxt-og-image` 7 reads `NUXT_APP_SECRET`, so the committed value is dead, not a leaked secret.
- [ ] 12. delete dead config from `nuxt.config.ts` (about 26 lines). Nothing outside `APP.md` reads `runtimeConfig.public.apiBase`, `runtimeConfig.public.siteUrl`, `runtimeConfig.cloudflare.d1Token` or `runtimeConfig.public.cloudflare.accountId`; the commented-out `routeRules` entries (lines 359-371) and `hub.blob` (no code uses R2) are dead too. The do-not-modify `nitro.cloudflare.wrangler` block also declares unused `AI`, `BROWSER`, `IMAGES` and `ANALYTICS` bindings; removing those needs explicit approval.

### nice to have

- [ ] 13. trim panic fields on the server. `server/api/panic.post.ts:9-16` checks length without trimming (the client trims), so a direct POST with 10 spaces passes `min(10)` and pages syn with a blank message (it still needs a Turnstile token). Fix: `z.string().trim().min(10)`, and the same for `contact`.
- [ ] 14. show panic field errors (same as the bug-hunt `data.data.issues` item). `app/pages/panic.vue:71` reads `fetchErr.data?.issues`, but Nitro wraps the body, so users always see `validation failed`. Fix: read `fetchErr.data?.data?.issues`.
- [ ] 15. stop the content-sync comments claiming manual edits get repaired (narrower fix for the bug-hunt hash item). Drift is detected only by `__hash__`, so an `UPDATE` that keeps the hash goes unnoticed. Fix: take manual edits out of the header at `server/utils/content-sync.ts:12-13` and the note at `server/middleware/content-sync.ts:24`.
- [ ] 16. run CI on node 26. `.github/workflows/ci.yaml` uses `runtime: node@24`, while `.node-version`, `mise.toml` and `engines` all pin 26.12.1, so CI can pass or fail on behaviour that local builds and deploys never see. Fix: `runtime: node@26`; `.github/` is on the do-not-modify list, so this needs explicit approval.

### left out of the audit report (already tracked above)

Dev KV id typo in `wrangler.dev.jsonc`, Konami firing inside text fields, dead `/cv` and `/projects` buttons, Turnstile hostname/remote-ip validation, `/api/panic` rate limiting, R2 bucket name drift.

### not checked during the audit

`now`, `cv`, `projects`, `goodies`, `domains` and `contact` pages were read only for links; `main.css` was not read; `pnpm build`, `pnpm lint` and `pnpm lint:types` were not run; the notifications consumer (on the `notifications` branch) and production Cloudflare settings could not be checked.

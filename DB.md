# DB.md

How D1 + Drizzle migrations are wired on syn.horse, and how to bring an environment up to date.

## The setup at a glance

- **Schema:** `server/db/schema.ts` (Drizzle, `sqliteTable` from `drizzle-orm/sqlite-core`). Currently: `redirects`, `panic_pages`.
- **Migrations:** `server/db/migrations/sqlite/00NN_*.sql`, with drizzle-kit metadata under `meta/`.
- **Drizzle config:** `drizzle.config.ts` at repo root (sqlite dialect, schema + out path wired).
- **D1 binding:** `DB`. Declared in both `nuxt.config.ts` (deploy) and `wrangler.dev.jsonc` (dev). Database name is `syn-horse`.
- **Server-side access:** `useDb(event)` from `server/utils/db.ts` returns a Drizzle client over `event.context.cloudflare.env.DB`. Auto-imported in server scope.
- **Migration tooling:** the wrangler CLI, not NuxtHub's auto-runner — our migrations live at a non-default path so NuxtHub's plugin doesn't see them.

## Why the migrate scripts pass `--config wrangler.dev.jsonc`

There's intentionally no `wrangler.{json,jsonc,toml}` at the repo root: nitropack's cloudflare preset and the wrangler CLI both auto-discover those filenames and would `defu`-merge with the inline `nitro.cloudflare.wrangler` block in `nuxt.config.ts` — every binding would end up duplicated in `.output/server/wrangler.json`.

`wrangler.dev.jsonc` is deliberately non-discoverable. It carries the dev binding subset for Miniflare AND, since the panic feature, the `migrations_dir` that wrangler's `d1 migrations apply` needs. The `db:migrate:{local,remote}` scripts pass `--config wrangler.dev.jsonc` so wrangler reads from there. Same file works for both `--local` (Miniflare) and `--remote` (production D1) because wrangler routes by flag, not by config.

## The day-to-day loop

1. Edit `server/db/schema.ts` — add or modify tables.
2. `bun run db:generate` — `drizzle-kit generate` writes a new `00NN_*.sql` under `server/db/migrations/sqlite/` and updates `meta/_journal.json`.
3. Inspect the generated SQL. If it's a destructive change, sanity-check against the data you don't want to lose.
4. `bun run db:migrate:local` — applies pending migrations to local Miniflare D1. Idempotent: wrangler tracks applied migrations in a `d1_migrations` table and only runs new ones.
5. Test the route locally with `bun run dev`.
6. `bun run db:migrate:remote` — applies pending migrations to production D1.
7. `bun run deploy` if you also changed worker code.

The migrate and deploy steps are independent. Generally apply migrations **before** deploy if the new code references new tables, or **after** deploy if it's only adding indexes / non-required columns.

## Bringing a cold environment up to current

If you're applying to a database that has tables but no `d1_migrations` tracking table, wrangler will try to re-run migration 0000 and fail with `table already exists`. This happens because the `redirects` table predated the Drizzle wiring and was applied by some other path. Detect and fix:

### Step 1 — inspect the target database

For remote:

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

If `d1_migrations` appears in the output, also run:

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM d1_migrations ORDER BY id"
```

For local: swap `--remote` for `--local`.

### Step 2 — apply, depending on what you saw

| State                                                                                 | What to do                                                    |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Has `panic_pages` already                                                             | Nothing — skip to Step 3.                                     |
| Has `redirects` AND `d1_migrations` populated with `0000_curved_daimon_hellstrom.sql` | `bun run db:migrate:remote` (or `:local`).                    |
| Has `redirects` but no `d1_migrations` row for 0000                                   | Backfill the tracking row first (see below), then apply.      |
| Empty                                                                                 | `bun run db:migrate:remote` — both migrations run from clean. |

#### Backfilling the tracking row

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "CREATE TABLE IF NOT EXISTS d1_migrations(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO d1_migrations(name) VALUES ('0000_curved_daimon_hellstrom.sql');"

bun run db:migrate:remote
```

Same recipe works for local — swap `--remote` for `--local` and use `db:migrate:local`.

### Step 3 — verify

```bash
bun run wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

Should list at least `d1_migrations`, `panic_pages`, `redirects`, `sqlite_sequence`.

## Adjacent prod requirements

These aren't Drizzle, but `/panic` won't work in prod without them:

- **Turnstile secret key.** `runtimeConfig.turnstile.secretKey` is empty by default and overridden at runtime by `NUXT_TURNSTILE_SECRET_KEY`. Set it once as a Workers secret:

  ```bash
  bun run wrangler secret put NUXT_TURNSTILE_SECRET_KEY
  ```

  Without it, `verifyTurnstileToken` returns `{ success: false }` and every submission 403s.

- **Worker deploy.** `bun run db:migrate:remote` doesn't deploy code. Run `bun run deploy` when the migration lands cleanly.

## Reference

- Schema: `server/db/schema.ts`
- Migrations: `server/db/migrations/sqlite/`
- Drizzle config: `drizzle.config.ts`
- Server-side helper: `server/utils/db.ts` (auto-imported `useDb(event)`)
- Migrate scripts: `package.json` (`db:generate`, `db:migrate:local`, `db:migrate:remote`, `db:studio`)
- Wrangler dev config (read by nitropack's cloudflare-dev preset AND the migrate scripts): `wrangler.dev.jsonc`

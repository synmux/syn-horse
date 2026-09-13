---
name: synhorse-data-layer
description: "syn.horse D1 + Drizzle data layer - schema location, schema-driven enums, the migration workflow, why migrate scripts pass --config wrangler.dev.jsonc, and the cold-environment recovery runbook. ALWAYS use when editing server/db/schema.ts, generating or applying migrations, running any db:* script or wrangler d1 command, using useDb(event), or debugging 'table already exists' / 'duplicate column' migration errors."
version: 1.0.0
---

# syn.horse data layer (D1 + Drizzle)

- **Schema:** `server/db/schema.ts` (`sqliteTable` from `drizzle-orm/sqlite-core`). Currently just `panic_pages` (`id`, `channel`, `message`, `contact`, `createdAt`, `status`, `queueError`, `queuedAt`). `redirects` is **not** a Drizzle table - it's a legacy hand-applied table in `sql/redirects.sql`.
- **Migrations:** `server/db/migrations/sqlite/00NN_*.sql` (drizzle-kit metadata under `meta/`).
- **Drizzle config:** `drizzle.config.ts` at repo root.
- **D1 binding:** `DB`. Declared in `nuxt.config.ts` (deploy) and `wrangler.dev.jsonc` (dev). Database name: `syn-horse`.
- **Server access:** `useDb(event)` from `server/utils/db.ts` - auto-imported in server scope.

## Scripts

- `pnpm db:generate` - `drizzle-kit generate` reads `drizzle.config.ts` and writes new SQL to `server/db/migrations/sqlite/`.
- `pnpm db:migrate:local` - apply pending migrations to local Miniflare D1 via wrangler. `:remote` variant for production.
- `pnpm db:studio` - `drizzle-kit studio` (browse + edit the schema).

## Local auto-applies, remote is explicit

In practice NuxtHub's migration plugin applies pending local migrations on `pnpm dev`, so `pnpm db:migrate:local` is usually unnecessary - and the auto-apply can race a Miniflare reload (see "Cold environment recovery" for the `table already exists` / `duplicate column` fix). Production is never auto-applied: run `pnpm db:migrate:remote` explicitly.

## Schema-driven enums (single source of truth)

For columns constrained to a fixed value set, declare the values once on the Drizzle column with `text({ enum: [...] })` and derive everything else from that array. Don't duplicate the literal union. Today this applies to `panicPages.channel` and `panicPages.status`:

```typescript
// server/db/schema.ts
export const panicPages = sqliteTable("panic_pages", {
  // …
  channel: text({ enum: ["red", "green"] }).notNull(),
  status: text({ enum: ["queued", "send_failed"] }).notNull()
})

export type Channel = (typeof panicPages.$inferSelect)["channel"]
export type PageStatus = (typeof panicPages.$inferSelect)["status"]
```

- **Frontend / Vue:** `import type { Channel } from "~~/server/db/schema"`. Type-only imports are erased at compile time, so reaching into the server tree from a `.vue` file carries no runtime cost.
- **Runtime validation (Zod):** `z.enum(panicPages.channel.enumValues)` - `enumValues` is Drizzle's typed runtime tuple, so Zod and TypeScript stay in lockstep.
- **SQL:** Drizzle's SQLite `enum` is a TypeScript-only constraint. The column stays plain `TEXT`, no `CHECK` clause is emitted, and `pnpm db:generate` produces no diff when you only touch the enum array. Add a manual `CHECK (col IN (...))` clause to a migration if you also want database-level enforcement.

Adding or removing a value only requires editing the schema array - TypeScript then surfaces every consumer that hasn't caught up.

## Why migrate scripts pass `--config wrangler.dev.jsonc`

No `wrangler.{json,jsonc,toml}` at the repo root by design - both the wrangler CLI and nitropack auto-discover those names and would `defu`-merge with the inline `nitro.cloudflare.wrangler` block, duplicating every binding in `.output/server/wrangler.json`. `wrangler.dev.jsonc` is non-discoverable and carries the dev bindings AND `migrations_dir` (`server/db/migrations/sqlite/`). The same file drives both `--local` (Miniflare) and `--remote` (production D1) applies.

## Day-to-day loop

1. Edit `server/db/schema.ts`.
2. `pnpm db:generate` - writes `00NN_*.sql` and updates `meta/_journal.json`.
3. Inspect the SQL; sanity-check destructive changes.
4. `pnpm db:migrate:local` then `pnpm dev` to test.
5. `pnpm db:migrate:remote` - apply to production before deploy if new code references new tables, after if only adding indexes / non-required columns.
6. `pnpm run deploy` if worker code also changed.

## Cold environment recovery

If `d1_migrations` is missing, wrangler re-runs migration 0000 and fails with `table already exists`.

**Inspect:**

```bash
pnpm wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

**Decision table:**

| State                                                   | Action                                          |
| ------------------------------------------------------- | ----------------------------------------------- |
| `panic_pages` has `status` / `queueError` / `queuedAt`  | Up to date - nothing to do.                     |
| `panic_pages` present, `d1_migrations` has the 0000 row | `pnpm db:migrate:remote` (applies 0001/0002).   |
| `panic_pages` present but no `d1_migrations` 0000 row   | Backfill then apply (see below).                |
| Empty                                                   | `pnpm db:migrate:remote` - all three run clean. |

**Backfill tracking row:**

```bash
pnpm wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "CREATE TABLE IF NOT EXISTS d1_migrations(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP); INSERT OR IGNORE INTO d1_migrations(name) VALUES ('0000_stale_omega_sentinel.sql');"
pnpm db:migrate:remote
```

Swap `--remote`/`db:migrate:remote` for `--local`/`db:migrate:local` to target Miniflare.

**Verify** (should list `d1_migrations`, `panic_pages`, `sqlite_sequence`):

```bash
pnpm wrangler d1 execute syn-horse --remote --config wrangler.dev.jsonc \
  --command "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

## Adjacent production requirements

- **Turnstile secret:** `pnpm wrangler secret put NUXT_TURNSTILE_SECRET_KEY` - without it every `/panic` submission 403s.
- **Worker deploy is separate:** `db:migrate:remote` does not deploy code; run `pnpm run deploy` after migrations land.

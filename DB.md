# Database Guide — syn.horse

## How It Works

### The Stack

The database layer is built from three components working together:

1. **Drizzle ORM** — Type-safe schema definitions and query builder
2. **NuxtHub** — Manages the database lifecycle (driver selection, migrations, bindings)
3. **Cloudflare D1** — The production SQLite database (a globally-distributed SQLite service)

You write your schema in TypeScript using Drizzle. NuxtHub reads that schema, generates migrations, and handles applying them. In production, NuxtHub connects to Cloudflare D1. In local development, it uses a plain SQLite file.

### Driver Auto-Detection

NuxtHub uses a **dual-driver system** that automatically selects the right database driver based on the environment:

| Environment        | Driver   | Database location          | Cloudflare tokens needed? |
| ------------------ | -------- | -------------------------- | ------------------------- |
| `bun run dev`      | `libsql` | `.data/db/sqlite.db`       | No                        |
| `bun run preview`  | `d1`     | `.wrangler/state/` (local) | No                        |
| Cloudflare Workers | `d1`     | Cloudflare D1 (remote)     | N/A (binding injected)    |

This is controlled by `nuxt.config.ts`:

```typescript
hub: {
  dir: ".data",
  db: {
    dialect: "sqlite",
    // No `driver` specified — NuxtHub auto-detects based on environment
    connection: {
      databaseId: "acf9b51d-7ed9-41e0-b308-de31b082aba5",
    },
  },
}
```

**Key point:** The `driver` field is intentionally omitted. If you set `driver: "d1"`, NuxtHub will try to use a Cloudflare D1 binding even in local dev, which doesn't exist — you'll get `[nuxt-hub] DB binding not found`.

The `connection.databaseId` tells NuxtHub which D1 database to bind to when generating the production wrangler config. It's ignored in local dev.

### How the Config Flows to Production

At build time (`bun run build`), NuxtHub:

1. Reads `hub.db.connection.databaseId` from `nuxt.config.ts`
2. Generates `.output/server/wrangler.json` with a `d1_databases` entry binding `"DB"` to that database ID
3. Copies migrations from `server/db/migrations/` to `.output/server/db/migrations/`

When deployed to Cloudflare Workers, the D1 binding is injected into the Worker's environment by Wrangler. NuxtHub detects the binding and uses D1 automatically.

### File Layout

```plaintext
server/db/
  schema.ts                              # Drizzle schema (source of truth)
  migrations/
    0000_brave_moon_knight.sql           # SQL migration files (applied in order)
    0001_next_migration.sql              # Each migration is a numbered SQL file
    sqlite/
      meta/
        0000_snapshot.json               # Drizzle Kit schema snapshots
        _journal.json                    # Drizzle Kit migration journal
.data/
  db/
    sqlite.db                            # Local dev database (gitignored)
    migrations/                          # Copies of migrations for local tracking
.nuxt/hub/db/
  drizzle.config.ts                      # Auto-generated Drizzle Kit config
  schema.mjs                             # Auto-generated compiled schema
.output/server/
  wrangler.json                          # Auto-generated production wrangler config
  db/migrations/                         # Migrations copied for production deployment
```

### How Migrations Work

NuxtHub manages migrations through a `_hub_migrations` table that tracks which migrations have been applied. The flow:

1. You modify `server/db/schema.ts`
2. You run `npx nuxt db generate` — Drizzle Kit diffs the schema against the last snapshot and generates a new `.sql` file in `server/db/migrations/`
3. Migrations auto-apply during `bun run dev` (local SQLite) and `bun run build` (production D1)
4. You can also manually apply with `npx nuxt db migrate`

Migrations are **idempotent** — if a migration has already been applied (tracked in `_hub_migrations`), it's skipped.

### Accessing the Database in Code

NuxtHub provides auto-imported `db` and `schema` objects in server-side code:

```typescript
// server/api/redirects.get.ts
import { db, schema } from "hub:db"
import { eq } from "drizzle-orm"

export default defineEventHandler(async () => {
  // Select all
  const allRedirects = await db.select().from(schema.redirects)

  // Select one
  const redirect = await db.query.redirects.findFirst({
    where: eq(schema.redirects.slug, "example")
  })

  return allRedirects
})
```

The `hub:db` import is a virtual module provided by NuxtHub. It resolves to the correct driver (libsql locally, D1 in production) without any code changes.

---

## Step-by-Step Guides

### Adding a New Table

1. Edit `server/db/schema.ts`:

   ```typescript
   import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

   export const redirects = sqliteTable("redirects", {
     slug: text().unique().notNull().primaryKey(),
     destination: text().notNull()
   })

   // Add your new table
   export const pages = sqliteTable("pages", {
     id: integer().primaryKey({ autoIncrement: true }),
     title: text().notNull(),
     content: text().notNull(),
     createdAt: integer({ mode: "timestamp" }).notNull()
   })
   ```

2. Generate the migration:

   ```bash
   npx nuxt db generate
   ```

   This creates a new `.sql` file in `server/db/migrations/` (e.g., `0001_some_name.sql`).

3. The migration auto-applies next time you run `bun run dev`. Or apply manually:

   ```bash
   npx nuxt db migrate
   ```

### Modifying an Existing Table

Same workflow as above. Edit the schema, generate, and the diff migration handles `ALTER TABLE` statements.

```bash
# 1. Edit server/db/schema.ts
# 2. Generate migration
npx nuxt db generate
# 3. Review the generated SQL in server/db/migrations/
# 4. Apply (automatic on dev, or manual)
npx nuxt db migrate
```

### Deploying Migrations to Production

Migrations auto-apply during `bun run build`. The deployment flow:

```bash
# Build (migrations are bundled into .output/)
bun run build

# Deploy to Cloudflare (migrations apply automatically)
bun run deploy
```

If you want to apply migrations to production **without** a full deploy:

```bash
# Apply migrations against the remote D1 database
npx nuxt db migrate --remote
```

This requires Cloudflare authentication (API token or `wrangler login`).

### Querying the Local Database Directly

For quick inspection or debugging:

```bash
# Run arbitrary SQL against the local dev database
npx nuxt db sql "SELECT * FROM redirects"

# Or against production
npx nuxt db sql --remote "SELECT * FROM redirects"
```

### Seeding the Local Database

There's no built-in seed command, but you can use `npx nuxt db sql`:

```bash
npx nuxt db sql "INSERT INTO redirects (slug, destination) VALUES ('gh', 'https://github.com/daveio')"
```

Or create a seed script and use the `hub:db:queries:paths` hook (see Advanced section).

### Checking Migration Status

Look at the `_hub_migrations` table:

```bash
npx nuxt db sql "SELECT * FROM _hub_migrations"
```

This shows which migrations have been applied and when.

---

## Emergency Procedures

### Reset the Local Database Entirely

Delete the local SQLite file and restart dev:

```bash
rm -f .data/db/sqlite.db
bun run dev
```

NuxtHub recreates the database and re-applies all migrations from scratch on startup.

### Reset the Local Database (Keeping Migrations)

Use the NuxtHub drop-all command:

```bash
npx nuxt db drop-all
```

This drops all tables but keeps the migration history. Next `bun run dev` re-applies all migrations.

### Drop a Specific Table Locally

```bash
npx nuxt db drop redirects
```

### Reset the Production Database

**This is destructive. Data is permanently lost.**

```bash
# Drop all tables on the remote D1
npx nuxt db drop-all --remote

# Re-apply all migrations
npx nuxt db migrate --remote
```

Alternatively, through the Cloudflare dashboard:

1. Go to Workers & Pages > D1
2. Find the database (`acf9b51d-7ed9-41e0-b308-de31b082aba5`)
3. Delete and recreate it (you'll need to update the `databaseId` in `nuxt.config.ts` if the ID changes)

### Squash Migrations

If you have many small migration files and want to consolidate:

```bash
npx nuxt db squash
```

This combines all migrations into a single file. Only do this when all environments (local + production) are fully migrated.

### Mark a Migration as Applied Without Running It

If production already has the schema changes (e.g., applied manually) but the `_hub_migrations` table doesn't know:

```bash
npx nuxt db mark-as-migrated 0000_brave_moon_knight --remote
```

### Fix "Migration Already Applied" Errors

If you get errors about migrations being already applied (e.g., after a squash or manual intervention):

```bash
# Check what's recorded as applied
npx nuxt db sql "SELECT * FROM _hub_migrations"

# Remove a migration record if needed
npx nuxt db sql "DELETE FROM _hub_migrations WHERE name = '0000_brave_moon_knight'"

# Re-apply
npx nuxt db migrate
```

---

## Advanced

### Remote Development Mode

If you want local dev to use the **real** production D1 database (useful for debugging production data):

```typescript
// nuxt.config.ts
hub: {
  remote: true, // Connect to production Cloudflare bindings in dev
}
```

This requires Cloudflare authentication. **Be careful** — you're working with live production data.

### Custom Migration Directories

Use the `hub:db:migrations:dirs` hook in a Nuxt module:

```typescript
// modules/custom-migrations.ts
export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("hub:db:migrations:dirs", (dirs) => {
      dirs.push(resolve("./db-migrations"))
    })
  }
})
```

### Post-Migration Seed Queries

Use the `hub:db:queries:paths` hook to run SQL after migrations:

```typescript
// modules/db-seed.ts
export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("hub:db:queries:paths", (paths, dialect) => {
      paths.push(resolve(`./seed.${dialect}.sql`))
    })
  }
})
```

The seed SQL must be **idempotent** (safe to run multiple times) since it runs on every dev start and build.

### The wrangler.json Symlink

There's a symlink at the project root:

```
wrangler.json -> .output/server/wrangler.json
```

This exists so that `wrangler` CLI commands (like `wrangler d1 execute`) can find the config. It points to the NuxtHub-generated config in the build output. **You must run `bun run build` at least once** for this symlink target to exist.

For most operations, prefer NuxtHub's commands (`npx nuxt db ...`) over raw Wrangler commands, as they handle both local and remote environments consistently.

---

## Command Reference

| Command                                 | What it does                                         |
| --------------------------------------- | ---------------------------------------------------- |
| `npx nuxt db generate`                  | Generate migration from schema changes               |
| `npx nuxt db migrate`                   | Apply pending migrations (local)                     |
| `npx nuxt db migrate --remote`          | Apply pending migrations (production D1)             |
| `npx nuxt db sql "SELECT ..."`          | Run SQL query (local)                                |
| `npx nuxt db sql --remote "SELECT ..."` | Run SQL query (production D1)                        |
| `npx nuxt db drop <table>`              | Drop a table (local)                                 |
| `npx nuxt db drop-all`                  | Drop all tables (local)                              |
| `npx nuxt db drop-all --remote`         | Drop all tables (production D1)                      |
| `npx nuxt db squash`                    | Consolidate migrations into one file                 |
| `npx nuxt db mark-as-migrated [name]`   | Mark migration as applied without executing          |
| `bun run dev`                           | Start dev server (auto-applies migrations locally)   |
| `bun run build`                         | Build for production (auto-applies migrations to D1) |
| `bun run deploy`                        | Build + deploy to Cloudflare                         |

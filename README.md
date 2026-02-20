# syn.horse

A creative web application built with Nuxt 4, Vue 3, and TypeScript, deployed to Cloudflare Workers. Serves the custom domains [syn.horse](https://syn.horse) and [www.syn.horse](https://www.syn.horse).

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) with [Vue 3](https://vuejs.org/)
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLch colour theming
- **Components:** [Shadcn-Vue](https://www.shadcn-vue.com/) (New York style) + [Reka UI](https://reka-ui.com/) (headless primitives)
- **Icons:** [Lucide](https://lucide.dev/) + [Solar Icons](https://icon-sets.iconify.design/solar/)
- **Forms:** [FormKit](https://formkit.com/) with Pro inputs + [Vee-Validate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **State:** [Pinia](https://pinia.vuejs.org/) with [Colada](https://pinia-colada.esm.dev/) (async query caching) + [Pinia ORM](https://orm.pinia.vuejs.org/)
- **Content:** [@nuxt/content](https://content.nuxt.com/) (markdown CMS with SQLite)
- **3D:** [Three.js](https://threejs.org/) via [TresJS](https://tresjs.org/)
- **SEO:** [@nuxtjs/seo](https://nuxtseo.com/) (robots, sitemap, schema.org, OG images)
- **Platform:** [NuxtHub](https://hub.nuxt.com/) (blob storage, KV, caching, D1 database)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Package Manager:** [Bun](https://bun.sh/) 1.3.9

## Prerequisites

- [Bun](https://bun.sh/) 1.3.9+ (version pinned in `.bun-version`)
- [Node.js](https://nodejs.org/) 24.x (version pinned in `.node-version`)
- A Cloudflare account (for deployment)

## Setup

```bash
bun install
```

The postinstall script handles everything automatically:

1. Ensures [Trunk.io](https://trunk.io/) is available (or falls back to the npm launcher)
2. Runs `nuxt prepare` to generate TypeScript types and module augmentations
3. Generates `worker-configuration.d.ts` from Wrangler bindings in `nuxt.config.ts`
4. Formats the generated types file with Prettier

## Development

```bash
bun run dev
```

Starts the Nuxt development server on `http://localhost:3000` with hot module replacement, Nuxt DevTools, and VS Code code-server integration (port 3094).

To preview the production build locally with Wrangler (simulating the Cloudflare Workers environment):

```bash
bun run preview
```

To remove build artefacts and caches (useful for recovering from stale state):

```bash
bun run clean
```

## Linting & Formatting

```bash
bun run lint          # ESLint + Trunk.io + TypeScript type checking
bun run lint:fix      # Auto-fix lint issues
bun run format        # Prettier + Trunk.io formatting
bun run lint:types    # TypeScript type checking only
```

Trunk.io orchestrates 10 linters including ESLint, Prettier, actionlint, checkov, markdownlint, oxipng, trufflehog (secret detection), and yamllint.

## Testing

```bash
bun run test          # All test projects (unit + nuxt)
bun run test:unit     # Unit tests only (node environment)
bun run test:nuxt     # Nuxt environment tests only
bun run test:watch    # Watch mode
bun run test:coverage # With coverage report
bun run test:e2e      # Playwright E2E tests
bun run test:e2e:ui   # Playwright with interactive UI
```

Test configuration lives in `vitest.config.mts` with three test projects:

- **unit** — `test/unit/*.{test,spec}.ts` (node environment)
- **nuxt** — `test/nuxt/*.{test,spec}.ts` (Nuxt environment via `@nuxt/test-utils`)
- **e2e** — `test/e2e/*.{test,spec}.ts` (Playwright)

## Database

```bash
bun run db:generate           # Generate migration from schema changes
bun run db:migrate            # Apply pending migrations (local)
bun run db:migrate:remote     # Apply pending migrations (production D1)
```

See [DB.md](DB.md) for the full database guide including emergency procedures, advanced usage, and all available commands.

## Deployment

```bash
bun run deploy              # Production deploy to syn.horse
bun run deploy:nonprod      # Upload a new version (staging)
```

Deployment targets the custom domains `syn.horse` and `www.syn.horse` via Cloudflare Workers with smart placement (edge-optimised routing). Source maps are uploaded automatically and observability is enabled.

## Cloudflare Platform Bindings

The application has access to the following Cloudflare services (configured in `nuxt.config.ts` and managed by NuxtHub):

| Service           | Binding               | Description                           |
| ----------------- | --------------------- | ------------------------------------- |
| Workers AI        | `AI`                  | LLM inference and AI models           |
| Browser Rendering | `BROWSER`             | Headless browser automation           |
| Images            | `IMAGES`              | Image transformation and optimisation |
| Email             | `EMAIL`               | Send email from `ponygirl@syn.horse`  |
| Assets            | `ASSETS`              | Static file serving                   |
| Version Metadata  | `CF_VERSION_METADATA` | Worker version information            |

Additionally, [NuxtHub](https://hub.nuxt.com/) provides managed access to:

- **Blob Storage** — R2 object storage
- **Cache** — KV-backed caching layer
- **Database** — D1 SQLite database (via Drizzle ORM)
- **Key-Value** — General-purpose KV store

## Project Structure

```plaintext
app/                            # Nuxt application source
  app.vue                       # Root component
  assets/css/tailwind.css       # Tailwind v4 theme (OKLch colour system)
  components/ui/                # Shadcn-Vue components (install on demand)
  lib/utils.ts                  # cn() class merging utility
  pages/index.vue               # Home page (content-driven)
  plugins/ssr-width.ts          # SSR viewport width for VueUse
content/                        # Markdown content (rendered via @nuxt/content)
public/                         # Static assets (images, favicons, manifest)
scripts/                        # Build helper scripts
```

## Architecture Notes

### Content-Driven

The home page (`app/pages/index.vue`) fetches markdown from the `content/` directory using `@nuxt/content`'s collection API with native SQLite backing. SEO metadata is extracted from frontmatter.

### Theming

The design system uses the OKLch colour space for perceptually uniform theming. Light and dark modes are defined as CSS custom properties in `app/assets/css/tailwind.css` with 40+ semantic colour tokens. Dark mode is the default and is toggled via the `.dark` class (managed by `@nuxtjs/color-mode`).

### Forms

Two form systems are available: **FormKit** (with Pro inputs and the Regenesis theme) for complex forms, and **Vee-Validate** (with Zod and Valibot adapters) for validation. Vee-Validate components are renamed with a `Vee` prefix to avoid conflicts (`VeeForm`, `VeeField`, etc.).

### Security

- **nuxt-security** provides security headers, SRI (Subresource Integrity), and CSP
- **Robots** blocks AI crawlers (GPTBot, ChatGPT-User) and restricts `/admin`, `/private`
- **trufflehog** scans for leaked secrets in pre-commit hooks
- **DevSkim** runs security analysis in CI

## Environment Variables

| Variable                | Purpose                         |
| ----------------------- | ------------------------------- |
| `ADMIN_TOKEN`           | Admin authentication secret     |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier   |
| `NUXT_FORMKIT_PRO_KEY`  | FormKit Pro licence key         |
| `NUXT_PUBLIC_GTAG_ID`   | Google Analytics measurement ID |

## Database Guide

### How It Works

#### The Stack

The database layer is built from three components working together:

1. **Drizzle ORM** — Type-safe schema definitions and query builder
2. **NuxtHub** — Manages the database lifecycle (driver selection, migrations, bindings)
3. **Cloudflare D1** — The production SQLite database (a globally-distributed SQLite service)

You write your schema in TypeScript using Drizzle. NuxtHub reads that schema, generates migrations, and handles applying
them. In production, NuxtHub connects to Cloudflare D1. In local development, it uses a plain SQLite file.

#### Driver Auto-Detection

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
    db
:
  {
    dialect: "sqlite",
      // No `driver` specified — NuxtHub auto-detects based on environment
      connection
  :
    {
      databaseId: "acf9b51d-7ed9-41e0-b308-de31b082aba5",
    }
  ,
  }
,
}
```

**Key point:** The `driver` field is intentionally omitted. If you set `driver: "d1"`, NuxtHub will try to use a
Cloudflare D1 binding even in local dev, which doesn't exist — you'll get `[nuxt-hub] DB binding not found`.

The `connection.databaseId` tells NuxtHub which D1 database to bind to when generating the production wrangler config.
It's ignored in local dev.

#### How the Config Flows to Production

At build time (`bun run build`), NuxtHub:

1. Reads `hub.db.connection.databaseId` from `nuxt.config.ts`
2. Generates `.output/server/wrangler.json` with a `d1_databases` entry binding `"DB"` to that database ID
3. Copies migrations from `server/db/migrations/` to `.output/server/db/migrations/`

When deployed to Cloudflare Workers, the D1 binding is injected into the Worker's environment by Wrangler. NuxtHub
detects the binding and uses D1 automatically.

#### File Layout

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

#### How Migrations Work

NuxtHub manages migrations through a `_hub_migrations` table that tracks which migrations have been applied. The flow:

1. You modify `server/db/schema.ts`
2. You run `bun run nuxt-db generate` — Drizzle Kit diffs the schema against the last snapshot and generates a new
   `.sql` file in `server/db/migrations/`
3. Migrations auto-apply during `bun run dev` (local SQLite) and `bun run build` (production D1)
4. You can also manually apply with `bun run nuxt-db migrate`

Migrations are **idempotent** — if a migration has already been applied (tracked in `_hub_migrations`), it's skipped.

#### Accessing the Database in Code

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

The `hub:db` import is a virtual module provided by NuxtHub. It resolves to the correct driver (libsql locally, D1 in
production) without any code changes.

---

### Step-by-Step Guides

> **Tip:** Most `bun run nuxt-db` commands have convenience aliases in `package.json` — e.g., `bun run db:generate`
> instead of `bun run nuxt-db generate`. See the [Command Reference](#command-reference) table for the full list.

#### Adding a New Table

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

2. Generate the migration (`bun run db:generate`):

   ```bash
   bun run nuxt-db generate
   ```

   This creates a new `.sql` file in `server/db/migrations/` (e.g., `0001_some_name.sql`).

3. The migration auto-applies next time you run `bun run dev`. Or apply manually (`bun run db:migrate`):

   ```bash
   bun run nuxt-db migrate
   ```

#### Modifying an Existing Table

Same workflow as above. Edit the schema, generate, and the diff migration handles `ALTER TABLE` statements.

```bash
## 1. Edit server/db/schema.ts
## 2. Generate migration
bun run nuxt-db generate
## 3. Review the generated SQL in server/db/migrations/
## 4. Apply (automatic on dev, or manual)
bun run nuxt-db migrate
```

#### Deploying Migrations to Production

Migrations auto-apply during `bun run build`. The deployment flow:

```bash
## Build (migrations are bundled into .output/)
bun run build

## Deploy to Cloudflare (migrations apply automatically)
bun run deploy
```

If you want to apply migrations to production **without** a full deploy (`bun run db:migrate:remote`):

```bash
## Apply migrations against the remote D1 database
bun run nuxt-db migrate --remote
```

This requires Cloudflare authentication (API token or `wrangler login`).

#### Querying the Local Database Directly

For quick inspection or debugging:

```bash
## Run arbitrary SQL against the local dev database
bun run nuxt-db sql "SELECT * FROM redirects"

## Or against production
bun run nuxt-db sql --remote "SELECT * FROM redirects"
```

#### Seeding the Local Database

There's no built-in seed command, but you can use `bun run nuxt-db sql`:

```bash
bun run nuxt-db sql "INSERT INTO redirects (slug, destination) VALUES ('gh', 'https://github.com/daveio')"
```

Or create a seed script and use the `hub:db:queries:paths` hook (see Advanced section).

#### Checking Migration Status

Look at the `_hub_migrations` table:

```bash
bun run nuxt-db sql "SELECT * FROM _hub_migrations"
```

This shows which migrations have been applied and when.

---

### Emergency Procedures

#### Reset the Local Database Entirely

Delete the local SQLite file and restart dev:

```bash
rm -f .data/db/sqlite.db
bun run dev
```

NuxtHub recreates the database and re-applies all migrations from scratch on startup.

#### Reset the Local Database (Keeping Migrations)

Use the NuxtHub drop-all command:

```bash
bun run nuxt-db drop-all
```

This drops all tables but keeps the migration history. Next `bun run dev` re-applies all migrations.

#### Drop a Specific Table Locally

```bash
bun run nuxt-db drop redirects
```

#### Reset the Production Database

**This is destructive. Data is permanently lost.**

```bash
## Drop all tables on the remote D1
bun run nuxt-db drop-all --remote

## Re-apply all migrations
bun run nuxt-db migrate --remote
```

Alternatively, through the Cloudflare dashboard:

1. Go to Workers & Pages > D1
2. Find the database (`acf9b51d-7ed9-41e0-b308-de31b082aba5`)
3. Delete and recreate it (you'll need to update the `databaseId` in `nuxt.config.ts` if the ID changes)

#### Squash Migrations

If you have many small migration files and want to consolidate:

```bash
bun run nuxt-db squash
```

This combines all migrations into a single file. Only do this when all environments (local + production) are fully
migrated.

#### Mark a Migration as Applied Without Running It

If production already has the schema changes (e.g., applied manually) but the `_hub_migrations` table doesn't know:

```bash
bun run nuxt-db mark-as-migrated 0000_brave_moon_knight --remote
```

#### Fix "Migration Already Applied" Errors

If you get errors about migrations being already applied (e.g., after a squash or manual intervention):

```bash
## Check what's recorded as applied
bun run nuxt-db sql "SELECT * FROM _hub_migrations"

## Remove a migration record if needed
bun run nuxt-db sql "DELETE FROM _hub_migrations WHERE name = '0000_brave_moon_knight'"

## Re-apply
bun run nuxt-db migrate
```

---

### Advanced

#### Remote Development Mode

If you want local dev to use the **real** production D1 database (useful for debugging production data):

```typescript
// nuxt.config.ts
hub: {
  remote: true, // Connect to production Cloudflare bindings in dev
}
```

This requires Cloudflare authentication. **Be careful** — you're working with live production data.

#### Custom Migration Directories

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

#### Post-Migration Seed Queries

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

#### The wrangler.json Symlink

There's a symlink at the project root:

```plaintext
wrangler.json -> .output/server/wrangler.json
```

This exists so that `wrangler` CLI commands (like `wrangler d1 execute`) can find the config. It points to the
NuxtHub-generated config in the build output. **You must run `bun run build` at least once** for this symlink target to
exist.

For most operations, prefer NuxtHub's commands (`bun run nuxt-db ...`) over raw Wrangler commands, as they handle both
local and remote environments consistently.

---

### Command Reference

| Command                                     | Script alias                  | What it does                                         |
| ------------------------------------------- | ----------------------------- | ---------------------------------------------------- |
| `bun run nuxt-db generate`                  | `bun run db:generate`         | Generate migration from schema changes               |
| `bun run nuxt-db migrate`                   | `bun run db:migrate`          | Apply pending migrations (local)                     |
| `bun run nuxt-db migrate --remote`          | `bun run db:migrate:remote`   | Apply pending migrations (production D1)             |
| `bun run nuxt-db sql "SELECT ..."`          | `bun run db:sql`              | Run SQL query (local)                                |
| `bun run nuxt-db sql --remote "SELECT ..."` | —                             | Run SQL query (production D1)                        |
| `bun run nuxt-db drop <table>`              | `bun run db:drop`             | Drop a table (local)                                 |
| `bun run nuxt-db drop-all`                  | `bun run db:drop-all`         | Drop all tables (local)                              |
| `bun run nuxt-db drop-all --remote`         | —                             | Drop all tables (production D1)                      |
| `bun run nuxt-db squash`                    | `bun run db:squash`           | Consolidate migrations into one file                 |
| `bun run nuxt-db mark-as-migrated [name]`   | `bun run db:mark-as-migrated` | Mark migration as applied without executing          |
| `bun run dev`                               | —                             | Start dev server (auto-applies migrations locally)   |
| `bun run build`                             | —                             | Build for production (auto-applies migrations to D1) |
| `bun run deploy`                            | —                             | Build + deploy to Cloudflare                         |

## CI/CD

GitHub Actions workflows handle:

- **CI** — Trunk linting, TypeScript checking, and production build on every push/PR
- **Claude Code** — Automated assistance via `@claude` mentions in issues and PRs
- **Claude Code Review** — Automated code review on pull requests
- **DevSkim** — Security scanning with SARIF output to GitHub Security tab
- **Dependabot** — Daily dependency updates for npm packages and GitHub Actions

## Licence

MIT License. Copyright (c) 2025 [Dave Williams](https://github.com/daveio).

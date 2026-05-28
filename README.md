# syn-horse-notifications

Cloudflare Worker queue consumer for processing notification messages through a staged pipeline (logging, rate limits, AI moderation, delivery).

## Current status

- Worker entrypoint is `src/index.ts` and runs as a **Queues consumer**.
- Active stages today: **logging** and **delivery**.
- Implemented but currently commented out in the handler: **rate limits** and **AI moderation**.
- Delivery is currently hard-wired to the `stub` adapter (no outbound network call).

## Architecture

For each queue message:

1. Validate payload with Zod (`safeParseMessage` in `src/schema.ts`)
2. Insert an audit row in D1 (`runLogging`)
3. (Optional, currently disabled) enforce KV-based rate limits (`runRateLimits`)
4. (Optional, currently disabled) run Workers AI moderation (`runAi`)
5. Deliver via adapter and update final result (`runDelivery`)

Error behavior:

- Invalid payloads are logged and ACKed (not retried).
- Runtime failures throw and the queue message is retried.

## Data model

Inbound payload schema (`src/schema.ts`):

- `channel`: `"red" | "green"`
- `contact`: non-empty string (max 256)
- `message`: non-empty string (max 8192)
- `source`: optional IPv4/IPv6/hostname

D1 migration (`migrations/0001_create_log_table.sql`) creates a `log` table that stores:

- raw message fields
- rate-limit decision/violation
- AI decision/violation
- adapter used
- terminal result (`dropped` / `delivered` / `failed`)

## Adapters

Adapter interface is in `src/types.ts`; lookup is explicit in `src/adapters/index.ts`.

Available adapters:

- `stub` (active): no-op success adapter
- `email` (placeholder)
- `ntfy` (placeholder)
- `pushover` (placeholder)

## Prerequisites

- Bun `1.3.14`
- Node `24.16.0`
- Wrangler `4.x`

Pinned versions are defined in `.node-version`, `.tool-versions`, and `mise.toml`.

## Setup

```bash
bun install
```

Then generate worker runtime types:

```bash
bun run types
```

## Development

Run local worker:

```bash
bun run dev
```

`bun run start` is equivalent.

## Database migrations

Apply D1 migrations remotely:

```bash
bun run db:migrate
```

Apply migrations locally:

```bash
bun run db:migrate:local
```

## Linting and formatting

Run full checks:

```bash
bun run lint
```

Useful subsets:

```bash
bun run lint:eslint
bun run lint:trunk
bun run lint:types
```

Format all files:

```bash
bun run format
```

## Deployment

```bash
bun run deploy
```

## Notes and gotchas

- `worker-configuration.d.ts` is generated (`wrangler types`); avoid hand-editing.
- `postinstall` runs type generation and formatting; `bun install` may rewrite generated/type-format-sensitive files.
- Repo currently has no test suite (`test` script and `*.test.*`/`*.spec.*` files are absent).
- `.env.example` / `.dev.vars.example` are currently empty.

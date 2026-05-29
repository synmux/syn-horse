# syn-horse-notifications

Cloudflare Worker queue consumer for processing notification messages through a staged pipeline (logging, rate limits, AI moderation, delivery).

## Current status

- Worker entrypoint is `src/index.ts`. It runs primarily as a **Queues consumer**, and also exposes a small `fetch` handler for a single `/ack` HTTP endpoint.
- All pipeline stages are active: **logging**, **rate limits**, **AI moderation**, and **delivery**.
- Delivery routes by paging channel: `green` → **ntfy**, `red` → **pushover**.

## Architecture

For each queue message:

1. Validate payload with Zod (`safeParseMessage` in `src/schema.ts`)
2. Insert an audit row in D1 (`runLogging`)
3. Enforce KV-based per-source rate limits (`runRateLimits`)
4. Run Workers AI moderation (`runAi`)
5. Deliver via the channel's adapter and update the final result (`runDelivery`)

Any stage can short-circuit (`STOP`) — for example a rate-limit drop or an AI `nonsense`/`spam` verdict — in which case the message is ACKed and later stages are skipped.

Error behavior:

- Invalid payloads are logged and ACKed (not retried).
- Runtime failures throw and the queue message is retried.

### `/ack` HTTP endpoint

The `fetch` handler (`src/http.ts`) serves one route, `/ack`, used by the ntfy notification's "ack" action button. It requires `X-Message-Id` and `X-Self-Token` headers and checks the token against the `SELF_TOKEN` secret (`401` on mismatch, `400` if a header is missing, `404` for any other path).

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
- adapter(s) used
- terminal result (`dropped` / `delivered` / `failed`)

## Adapters

The adapter interface is in `src/types.ts`; lookup is an explicit switch in `src/adapters/index.ts`. Delivery picks an adapter by channel (`green` → `ntfy`, `red` → `pushover`).

Available adapters:

- `ntfy` (active): publishes to ntfy.sh; `red` pages use max priority, and the notification carries an "ack" action button that calls `/ack`
- `pushover` (active): publishes via Pushover; `red` pages are emergency priority (siren, re-alerting until acknowledged), and bodies are truncated to 1024 characters
- `email` (placeholder): returns success without sending; will use the Cloudflare `EMAIL` binding
- `stub`: no-op success adapter (registered, but not part of the current channel routing)
- `twilio` (placeholder): present in `src/adapters/twilio.ts` but **not yet registered** in `getAdapter`

## Secrets and configuration

Configured in `wrangler.jsonc`:

- Secrets (`secrets.required`, set with `wrangler secret put`): `NTFY_TOKEN`, `SELF_TOKEN`, `PUSHOVER_APP_TOKEN`, `PUSHOVER_USER_TOKEN`
- Plain vars: `NTFY_SERVER` (default `https://ntfy.sh`), `NTFY_TOPIC`

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
bun run lint:ultracite
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
- `vitest` and `@cloudflare/vitest-pool-workers` are installed, but the repo currently has no test suite (`test` script and `*.test.*`/`*.spec.*` files are absent).
- `.env.example` / `.dev.vars.example` are currently empty.

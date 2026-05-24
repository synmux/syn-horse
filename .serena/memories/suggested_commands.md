# Suggested commands

All via bun. Authoritative source: package.json `scripts`.

## Dev / build / deploy

- `bun run dev` — Nuxt dev server on localhost:3000; local CF bindings via Miniflare from `wrangler.dev.jsonc`.
- `bun run build` — `nuxt build` then `wrangler types` (regenerates `worker-configuration.d.ts`).
- `bun run preview` — build, then `wrangler dev` against production output.
- `bun run deploy` — stamp buildtime + commithash, build, `wrangler deploy`. **Never run without explicit user request.**
- `bun run deploy:nonprod` — `wrangler versions upload` (preview version, no prod promote).

## Verify (gate → `mem:task_completion`)

- `bun run lint` — eslint + trunk + tsc together (run-s).
- `bun run lint:types` — `tsc --noEmit` only.
- `bun run lint:fix` — eslint --fix + trunk --fix.
- `bun run format` — prettier --write + trunk fmt.

## Database (D1 + Drizzle)

- `bun run db:generate` — drizzle-kit generate → `server/db/migrations/sqlite/`.
- `bun run db:migrate:local` / `:remote` — `wrangler d1 migrations apply syn-horse` (passes `--config wrangler.dev.jsonc`; `--local` vs `--remote`).
- `bun run db:studio` — drizzle-kit studio.

## Tests — NONE wired

`x:test*` scripts exist but are parked; vitest/@playwright/test are NOT installed. See `mem:task_completion`.

## Darwin / shell notes

- macOS (BSD userland). Interactive shell is fish (`/opt/homebrew/bin/fish`) — avoid bash-only one-liner syntax; prefer absolute paths over `cd`.
- `deploy:stamp` uses `date -u +%FT%TZ`.

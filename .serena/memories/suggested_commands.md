# Suggested commands

All via pnpm. Authoritative source: package.json `scripts`.

## Dev / build / deploy

- `pnpm dev` — Nuxt dev server on localhost:3000; local CF bindings via Miniflare from `wrangler.dev.jsonc`.
- `pnpm build` — `nuxt build` then `wrangler types` (regenerates `worker-configuration.d.ts`).
- `pnpm preview` — build, then `wrangler dev` against production output.
- `pnpm run deploy` — stamp buildtime + commithash, build, `wrangler deploy`. **Never run without explicit user request.**
- `pnpm deploy:nonprod` — `wrangler versions upload` (preview version, no prod promote).

## Verify (gate → `mem:task_completion`)

- `pnpm lint` — eslint + trunk + tsc together (run-s).
- `pnpm lint:types` — `tsc --noEmit` only.
- `pnpm lint:fix` — eslint --fix + trunk --fix.
- `pnpm format` — prettier --write + trunk fmt.

## Database (D1 + Drizzle)

- `pnpm db:generate` — drizzle-kit generate → `server/db/migrations/sqlite/`.
- `pnpm db:migrate:local` / `:remote` — `wrangler d1 migrations apply syn-horse` (passes `--config wrangler.dev.jsonc`; `--local` vs `--remote`).
- `pnpm db:studio` — drizzle-kit studio.

## Tests — NONE wired

`x:test*` scripts exist but are parked; vitest/@playwright/test are NOT installed. See `mem:task_completion`.

## Darwin / shell notes

- macOS (BSD userland). Interactive shell is fish (`/opt/homebrew/bin/fish`) — avoid bash-only one-liner syntax; prefer absolute paths over `cd`.
- `deploy:stamp` uses `date -u +%FT%TZ`.

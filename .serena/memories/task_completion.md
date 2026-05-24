# Task completion gate

Run before claiming any code task done (all via bun):

1. `bun run lint:types` — `tsc --noEmit`; must pass clean.
2. `bun run lint` — eslint + trunk + types together (the full gate).
3. If bindings or DB schema changed: `bun run build` (also regenerates `worker-configuration.d.ts` via wrangler types) — confirm it builds.

Auto-fix first with `bun run lint:fix` then `bun run format`, then re-run the gate.

## No automated tests (important)

There is **no working test runner**: `x:test*` scripts are parked and vitest/@playwright/test are not in devDependencies, so "run the tests" is not currently possible. Verify changes manually (`bun run dev` / `bun run preview`) or raise installing a runner with the user. This is in tension with the global "test everything" rule — flag it, don't silently skip.

## DB change flow

After `db:generate`: inspect the generated SQL → `db:migrate:local` + test → `db:migrate:remote` before deploy if new code references the new shape. `bun run deploy` is a separate, explicit-request-only step (does not run migrations).

Commands detailed in `mem:suggested_commands`.

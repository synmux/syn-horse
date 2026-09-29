# Task completion gate

Run before claiming any code task done (all via pnpm):

1. `pnpm test` — vitest unit tests; must pass.
2. `pnpm lint:types` — `nuxt typecheck` (vue-tsc over app, server, config and `test/`, `.vue` files included); must pass clean.
3. `pnpm lint` — eslint + trunk + types together (the full gate).
4. If bindings, DB schema or content changed: `pnpm build` (also regenerates `worker-configuration.d.ts` via wrangler types, and fails if a post is missing from the content dump) — confirm it builds.

Auto-fix first with `pnpm lint:fix` then `pnpm format`, then re-run the gate.

## Tests

Unit tests live in `test/unit/` with doubles in `test/support/`. New logic with side effects gets a test there. There are no browser or end-to-end tests; verify UI changes with `pnpm preview` (or `pnpm dev`).

## DB change flow

After `db:generate`: inspect the generated SQL → `db:migrate:local` + test → `db:migrate:remote` before deploy if new code references the new shape. `pnpm run deploy` is a separate, explicit-request-only step (does not run migrations).

Commands detailed in `mem:suggested_commands`.

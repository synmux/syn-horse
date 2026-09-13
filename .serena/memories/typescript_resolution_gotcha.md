# typescript resolution gotcha (first fixed 2026-08-16 commit f557ead, guard re-pinned 2026-08-21 commit b77803f, guard LOST again 2026-08-24 by dependabot commit 8f8289e)

TypeScript 7's npm package is the Go-native compiler. It ships a working `tsc` binary but **no JavaScript compiler API**. Its `package.json` `exports["."]` points at `lib/version.cjs`, so `require("typescript")` returns only `{ version, versionMajorMinor }` — `ts.sys`, `ts.TypeFlags`, `ts.createProgram` etc. are all `undefined`. The new API lives under `typescript/unstable/*` and nothing in this dependency tree uses it.

Whenever `typescript@7` is the hoisted root `node_modules/typescript`, every hoisted consumer of the classic API crashes at module load. Two known victims here:

1. **`pnpm eslint` / trunk eslint** — `ts-api-utils` (peer `typescript >=4.8.4`, so 7.x satisfies it) → `TypeError: Cannot read properties of undefined (reading 'Intrinsic')`. `@typescript-eslint/*` themselves are fine (peer `<6.1.0`, bun nests a TS 6 copy for them).
2. **`pnpm install` itself (originally observed under `bun install`)** (via `prepare` → `nuxt prepare`) — `@nuxthub/core` `buildDatabaseSchema()` calls `tsdown.build()` to emit `.nuxt/hub/db/schema.d.mts`; `tsdown@0.18` → `rolldown-plugin-dts@0.20` does `require("typescript")` and evaluates `ts.sys.useCaseSensitiveFileNames` at top level of its tsc chunk → `TypeError: Cannot read properties of undefined (reading 'useCaseSensitiveFileNames')`, plugin `rolldown-plugin-dts:generate`. Postinstall exits 1.

## Why no tsconfig.json change can fix it

- The crash is at module evaluation, before any tsconfig is read.
- `@nuxthub/core` passes `tsconfig: false` and `dts: { tsconfig: false, build: false, newContext: true }` to tsdown, so the project tsconfig is never consulted for that build anyway.
- tsconfig cannot influence which `typescript` package a dependency `require()`s.

## Why "TS 7 at root, TS 6 for the plugin" is not possible with bun

Bun only supports top-level `overrides` (flat, by package name). Nested / parent-scoped overrides (`"rolldown-plugin-dts": { "typescript": "^6" }` or `"tsdown>typescript"`) are explicitly unsupported (`OverrideMap.rs` warns "Bun currently does not support nested overrides").

## Upstream state (checked 2026-09-05)

- `rolldown-plugin-dts@0.28.5` supports `typescript ~7.0.0` by auto-selecting a `tsgo` generator when TS 7.0 is installed, but that generator **requires a tsconfig path** and throws otherwise — nuxthub hard-codes `tsconfig: false`, so it would still fail. The `oxc` generator needs `isolatedDeclarations`, which the drizzle schema exports (no explicit type annotations) cannot satisfy.
- `@nuxthub/core@0.10.8` (latest) pins `tsdown@^0.18.1`; a bun top-level override to `tsdown@^0.23` would still hit the tsconfig requirement above.
- Conclusion: TS 7 needs an `@nuxthub/core` change (pass a tsconfig to the dts build, or stop emitting dts) before it can be the root `typescript` here.

## The guard

`package.json` devDependencies must declare `"typescript": "^6.x"` (6.0.3 was the last known-good). That keeps an API-complete compiler hoisted at root; `skilld` (which pins exact `typescript@7.0.2`) gets its own nested copy. `pnpm lint:types` consequently runs classic tsc 6, not native tsc 7.

Do not remove or bump the root `typescript` devDependency to 7 as "unused" — nothing imports it, but it exists to win hoisting. Dependabot has already done this once (8f8289e); consider a dependabot `ignore` rule for `typescript` major updates in `.github/dependabot.yml` (ask before editing `.github/`).

## If this resurfaces

1. `pnpm why typescript` — check what resolves the ROOT copy.
2. `node -e "const ts=require('typescript'); console.log(ts.version, typeof ts.sys, typeof ts.TypeFlags)"` from the repo root — `undefined undefined` means an API-less native build is hoisted.
3. Restore the `^6` pin, `pnpm install`.

## Post-migration note (2026-09-13, pnpm 12.4.1)

The project moved from bun to pnpm in 8b6f61e. The bun-specific analysis above (no nested overrides) is historical: pnpm supports parent-scoped `overrides` such as `"tsdown>typescript"` in `pnpm-workspace.yaml`. The `typescript@6.0.3` pin was kept anyway during the migration to satisfy the `@typescript-eslint` peer range (`<6.1.0`). Re-test before assuming the failure modes above still reproduce under pnpm.

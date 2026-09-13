# pnpm config gotchas (verified against pnpm 12.4.1, 2026-09-13)

- `.npmrc` is read for **auth and registry keys only** since pnpm 11. Any other key
  (`child-concurrency`, `optional`, `frozen-lockfile`, ...) placed there is silently
  ignored: `pnpm config get` returns nothing and no warning is printed. Put settings in
  `pnpm-workspace.yaml` with camelCase keys. The repo `.npmrc` is reference-only comments.
- `dev` / `production` are **not** config settings any more; they are the `--dev` /
  `--prod` cli flags only. `production: true` in `pnpm-workspace.yaml` still installs
  devDependencies. `NODE_ENV=production pnpm install` also still installs devDependencies.
- `optional` still works as a workspace key (`optional: false` skips optionalDependencies)
  but is undocumented in the v12 settings pages. Default true; left unset.
- `frozenLockfile` defaults to true on CI (ci-info detection) and false locally. Do not set
  it explicitly to false in the project config or the CI guard is lost.
- `childConcurrency` (default 5) is the equivalent of bun's `install.concurrentScripts`.
  `networkConcurrency` (default 16) is fetch parallelism, a different thing.
- Bun -> pnpm mapping lives in comments in `pnpm-workspace.yaml`; `bunfig.toml` is gone.

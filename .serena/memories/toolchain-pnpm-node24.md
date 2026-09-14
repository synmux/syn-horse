# Toolchain: pnpm 12 + Node 24 (migrated from Bun on 2026-09-14)

- Package manager is pnpm, hash-pinned in `package.json` `packageManager`. Never run `bun install` here.
- Node 24.20.0 via mise (`mise.toml`, `.node-version`, `.tool-versions`); `engines.node ^24.20.0`; `@types/node` stays on 24.x.
- Scripts call binaries directly. Verification gate: `pnpm run lint` (ultracite check + tsc --noEmit), `pnpm run format`.
- Install policy in `pnpm-workspace.yaml`: `allowBuilds` (add new deps with install scripts there), `minimumReleaseAge: 10080` (versions must be a week old).
- CI: `.github/workflows/ci.yml` uses `pnpm/setup` (installs itself) then `pnpm run lint`. No Trunk config exists.
- No test suite yet; vitest + @cloudflare/vitest-pool-workers are installed for when one is added.
- Biome suppressions (`// biome-ignore rule: reason`) go directly above the statement with the violation, not above an enclosing loop.
- Full write-up in Basic Memory: "syn-horse notifications: Bun to Node 24 + pnpm migration".

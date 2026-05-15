---
name: nuxi-skilld
description: 'ALWAYS use when writing code importing "nuxi". Consult for debugging, best practices, or modifying nuxi, cli.'
metadata:
  version: 3.35.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# nuxt/cli `nuxi@3.35.2`

**Tags:** latest: 3.35.2

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxi` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxi` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API and command changes in nuxi v3.35.2 — prioritising recent major/minor releases and behavioural shifts.

- BREAKING: `nuxt module add <name>` → `nuxt add <name>` — v3.32.0 renamed the module addition command for priority and ergonomics. The old `module add` command is no longer available [source](./.skilld/releases/v3.32.0.md#enhancements)

- NEW: `nuxt template-add <template>` — v3.32.0 introduced a dedicated command for adding templates (previously `nuxt add`). Use this to scaffold pages, layouts, middleware, and other template files [source](./.skilld/releases/v3.32.0.md#enhancements)

- BREAKING: Dev proxy server removed, now uses direct listening — v3.30.0 eliminated the built-in proxy server. This removes persistent connection overhead and flakiness on Windows; dev server now listens directly on the configured host/port without an intermediary socket or TCP proxy [source](./.skilld/releases/v3.30.0.md#highlights)

- NEW: `--profile` flag for `nuxt build` and `nuxt dev` — v3.34.0 added Vite-style performance profiling. Use `--profile` to generate timing data for performance analysis [source](./.skilld/releases/v3.34.0.md#enhancements)

- NEW: `--extends` / `-e` flag for layers — v3.26.0 introduced `--extends` (v3.27.0 added the `-e` alias) to extend nuxt layers at runtime. Useful as an escape hatch when layer configuration in `nuxt.config` is not possible: `nuxt dev --extends @my-org/nuxt-layer my-project` [source](./.skilld/releases/v3.26.0.md#layer-support-with---extends)

- NEW: `--no-modules` flag for `nuxt init` — v3.26.0 added flag to skip interactive module selection entirely, allowing dependency-managed module setup [source](./.skilld/releases/v3.26.0.md#better-module-management)

- NEW: Release channels for `nuxt upgrade` — v3.29.0 introduced upgrade channels: `v3`, `v4`, `v3-nightly`, `v4-nightly`. Specify with `--channel <name>` to upgrade to a specific Nuxt major version or nightly build [source](./.skilld/releases/v3.29.0.md#enhancements)

- NEW: `--nightly` flag for `nuxt init` — v3.28.0 added `--nightly` to scaffold projects using the latest nightly Nuxt build instead of stable releases [source](./.skilld/releases/v3.28.0.md#enhancements)

**Also changed:** Shell completions via `@bomb.sh/tab` · Fuzzy search in module selection · `@clack/prompts` v4 upgrade · Clipboard migration (`copy-paste` replaces `clipboardy`) · NODE_COMPILE_CACHE auto-enable for ~3x faster CLI startup · Native fs.watch for config/env watching · Socket-based dev proxy (v3.18+ on Nuxt v4)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use `--profile` with `nuxt build` and `nuxt dev` to capture performance profiles for benchmarking — writes a V8 CPU profile and JSON report on exit; use `--profile=verbose` for a full console report [source](./.skilld/docs/raw/docs/4.x/api/commands/build.md:L214:226)

- Set `NODE_TLS_REJECT_UNAUTHORIZED=0` when using self-signed certificates in development — necessary for HTTPS dev server with local certs [source](./.skilld/docs/raw/docs/4.x/api/commands/dev.md:L421:425)

- Use environment variables (NUXT_PORT, NUXT_HOST, NODE_PATH) to configure dev server instead of flags — enables consistent configuration across shells and CI/CD [source](./.skilld/docs/raw/docs/4.x/api/commands/dev.md:L415)

- Specify `--dotenv` with a custom path to load environment files for different deployment stages — allows separate .env files per environment without modifying source [source](./.skilld/docs/raw/docs/4.x/api/commands/build.md:L152:167)

- Use `--extends` to inherit configuration from a Nuxt layer — enables composition of shared configs across monorepos and multi-tenant setups [source](./.skilld/docs/raw/docs/4.x/api/commands/dev.md:L150:159)

- Pass `--prerender` with `nuxt build` for static site generation — automatically sets preset to `static` and pre-renders all routes [source](./.skilld/docs/raw/docs/4.x/api/commands/build.md:L104:115)

- Use `--preset` early in your build configuration to target specific deployment platforms — enables platform-specific optimizations (Vercel, Netlify, Cloudflare, etc.) [source](./.skilld/docs/raw/docs/4.x/api/commands/build.md:L120:147)

- Run `nuxt upgrade --force` to dedupe dependencies and recreate lockfile during major version upgrades — resolves transitive dependency conflicts that can break builds [source](./.skilld/docs/raw/docs/4.x/api/commands/upgrade.md:L127:131)

- Use `--offline` or `--preferOffline` with `nuxt init` in CI/CD pipelines — reduces network latency and prevents failures from temporary connectivity issues [source](./.skilld/docs/raw/docs/4.x/api/commands/init.md:L130:157)

- Pass `--logLevel=verbose` to any command for detailed diagnostic output when debugging build or dev server issues [source](./.skilld/docs/raw/docs/4.x/api/commands/build.md:L88:99)

- Use `--cwd` to specify working directory for monorepo setups with multiple Nuxt apps — takes precedence over ROOTDIR argument [source](./.skilld/docs/raw/docs/4.x/api/commands/dev.md:L67:83)

- Specify `--channel` with `nuxt upgrade` to test nightly versions before stable release — available channels: `stable`, `nightly`, `v3`, `v4`, `v3-nightly`, `v4-nightly` [source](./.skilld/docs/raw/docs/4.x/api/commands/upgrade.md:L136:151)

- Use `--no-install` with `nuxt init` to skip dependency installation and manage packages manually — useful for workspaces where package management is handled at root level [source](./.skilld/docs/raw/docs/4.x/api/commands/init.md:L162:172)

- Pass `--gitInit` with `nuxt init` to automatically initialize git repository — saves a manual step in project setup and CI/CD workflows [source](./.skilld/docs/raw/docs/4.x/api/commands/init.md:L175:189)

- Use `--tunnel` with `nuxt dev` to expose the development server publicly via untun — creates a public URL for testing on mobile devices or sharing with collaborators [source](./.skilld/docs/raw/docs/4.x/api/commands/dev.md:L335:351)

- Use `nuxt module search <query>` before `nuxt module add` to verify compatibility with your Nuxt version — shows all available modules matching your query [source](./.skilld/docs/raw/docs/4.x/api/commands/module.md:L159:257)

- Pass `--skipInstall` and `--skipConfig` with `nuxt module add` for programmatic control — enables custom installation workflows in automation scripts or CI/CD [source](./.skilld/docs/raw/docs/4.x/api/commands/module.md:L110:141)
<!-- /skilld:best-practices -->

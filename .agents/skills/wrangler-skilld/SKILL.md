---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.100.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# cloudflare/workers-sdk `wrangler@4.100.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.100.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `createTestHarness()` from "wrangler" — v4.99.0 integration testing API with `listen()`, `fetch()`, `getWorker()`, `getLogs()`, `debug()`, `reset()`, `close()` methods and `.scheduled()` for cron events [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- BREAKING: `web_search` binding renamed to `websearch` — config key changed in v4.98.0; update `"web_search": { "binding": "..." }` to `"websearch": { "binding": "..." }` [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- BREAKING: `wrangler deploy` and `wrangler versions upload` positional argument changed from `[script]` to `[path]` — now accepts directories for static assets; `--script` option deprecated in v4.98.0 but still works for files [source](./.skilld/releases/wrangler@4.98.0.md:L35:42)

- BREAKING: D1 `migrations_pattern` field added in v4.98.0 — glob pattern (relative to wrangler config) for migration files; defaults to `${migrations_dir}/*.sql` for backward compatibility [source](./.skilld/releases/wrangler@4.98.0.md:L11:33)

- NEW (experimental): `--x-new-config` flag for TypeScript config files — v4.100.0 enables `cloudflare.config.ts` (via `defineWorker` from "wrangler/experimental-config") and optional `wrangler.config.ts` (via `defineWranglerConfig`) [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

- NEW (experimental): `wrangler/experimental-config` exports `defineWorker()`, `defineWranglerConfig()`, and `bindings` utilities — v4.100.0; format and APIs may change without notice [source](./.skilld/releases/wrangler@4.100.0.md:L19:50)

- BREAKING: `getPlatformProxy()` now passes workflow bindings with `script_name` through instead of stripping them — v4.98.0; workflows without `script_name` still stripped with warning [source](./.skilld/releases/wrangler@4.98.0.md:L44:50)

- NEW: `--version-tag` support for `wrangler versions deploy` — v4.99.0 deploys versions by tag instead of version ID; resolves tag to Version ID against deployable versions [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- NEW: `wrangler ai models list` and `wrangler ai models schema` commands — v4.93.0 query Workers AI model catalog with filters (`--search`, `--task`, `--author`, `--source`, `--hide-experimental`) [source](./.skilld/releases/wrangler@4.93.0.md#minor-changes)

- BREAKING: `pipeline` field in pipelines bindings renamed to `stream` — v4.96.0; old field deprecated but still accepted with warning [source](./.skilld/releases/wrangler@4.96.0.md:L71:101)

- NEW: `agent_memory` bindings configuration — v4.96.0 with `namespace` property; binding is remote-only connecting to Cloudflare Agent Memory service [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler agent-memory namespace` commands — v4.96.0 `create`, `list`, `get`, `delete` for managing Agent Memory namespaces [source](./.skilld/releases/wrangler@4.96.0.md:L56:65)

- BREAKING: Removed `experimental.testMode` from `unstable_dev()` — v4.96.0; use `logLevel: "warn"` instead for quiet output [source](./.skilld/releases/wrangler@4.96.0.md:L116:120)

- BREAKING: `wrangler types` now generates `BrowserRun` type for browser bindings — v4.96.0, previously generated generic `Fetcher` type [source](./.skilld/releases/wrangler@4.96.0.md:L138:140)

- BREAKING: Workflow binding `schedule` property renamed to `schedules` — v4.95.0; accepts string or array of cron expressions (note: scheduling not yet active) [source](./.skilld/releases/wrangler@4.95.0.md:L53:59)

- BREAKING: `remote: false` now rejected for always-remote bindings — v4.95.0; AI, AI Search, Media, Artifacts, Flagship, VPC Service, VPC Network must have `remote: true` or omit the field [source](./.skilld/releases/wrangler@4.95.0.md:L27:29)

- NEW: `wrangler artifacts` commands — v4.92.0 CLI support for Artifacts repos and tokens (`namespace list/inspect`, `repo create/list/inspect/delete`, `token create`) [source](./.skilld/releases/wrangler@4.92.0.md:L11:15)

- NEW: `--keep-vars` flag for `wrangler versions upload` — v4.92.0 preserves dashboard-configured environment variables instead of deleting them [source](./.skilld/releases/wrangler@4.92.0.md:L17:17)

- NEW: `wrangler workflows instances restart` with step disambiguation — v4.97.0 `--from-step-name`, optional `--from-step-count` and `--from-step-type` options for both remote and local workflows [source](./.skilld/releases/wrangler@4.97.0.md#minor-changes)

- NEW: `--tunnel-name` support for named Cloudflare Tunnels in `wrangler dev --tunnel` — v4.91.0 stable public hostname instead of temporary trycloudflare.com URL [source](./.skilld/releases/wrangler@4.91.0.md#minor-changes)

- DEPRECATED: `delivery_delay` in queue producer bindings — v4.90.0 has had no effect since 2024; use `wrangler queues update` for queue-level settings instead [source](./.skilld/releases/wrangler@4.90.0.md#minor-changes)

**Also changed:** `--containers-rollout=none` (v4.93.0) · R2 objects served publicly at `/cdn-cgi/local/r2/public/<bucket-id>/<key>` in dev (v4.100.0) · `cf-wrangler` experimental delegate entrypoint (v4.100.0) · Service token auth for Access-protected Workers (v4.94.0) · D1 SQL export column names in INSERT (v4.94.0) · Workflow `schedules` deploy payload fix (v4.97.0) · Non-string `vars` preserved in previews (v4.91.0) · Tunnel QR code display (v4.94.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `wrangler.jsonc` for new projects instead of TOML — enables type inference and access to newer Wrangler features [source](./.skilld/docs/workers/wrangler/configuration.md#L10)

- Treat your Wrangler configuration file as the source of truth for Worker configuration — centralise all configuration (bindings, routes, triggers, etc.) in wrangler.jsonc rather than dashboard settings [source](./.skilld/docs/workers/wrangler/configuration.md#L22)

- Use `getPlatformProxy()` instead of the deprecated `getBindingsProxy()` — provides the same arguments but with current API support [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#L92)

- Declare required secret names using the `secrets` configuration property — causes deploy to fail with clear error messages if any secrets are missing, preventing silent runtime failures [source](./.skilld/docs/workers/configuration/secrets.md#L82)

- Choose either `.dev.vars` or `.env` for local development, not both — defining `.dev.vars` causes `.env` values to be excluded from the `env` object [source](./.skilld/docs/workers/configuration/secrets.md#L51)

- Add `.dev.vars*` and `.env*` to `.gitignore` — local secret files should never be committed to git, preventing credential leaks [source](./.skilld/docs/workers/configuration/secrets.md#L61)

- Use environment-specific secret files (`.dev.vars.<environment-name>`) to override defaults in per-environment development — environment-specific files load ahead of the generic `.dev.vars` file [source](./.skilld/docs/workers/wrangler/environments.md#L73)

- Format service bindings that target Workers in specific environments as `<worker-name>-<environment-name>` — required when cross-environment service bindings point to differently-deployed instances [source](./.skilld/docs/workers/wrangler/environments.md#L45)

- Deploy Durable Object migrations separately from other code changes — migrations are atomic operations that affect all instances simultaneously, so isolating them limits blast radius if issues arise [source](./.skilld/docs/workers/configuration/versions-and-deployments/gradual-deployments.md#L152)

- Run `wrangler dev` with DevTools attached when possible, not headless — headless sessions without DevTools can leak memory over time due to unbounded network tracking [source](./.skilld/releases/wrangler@4.100.0.md:L82)

- Use the `nodejs_compat` compatibility flag instead of legacy `node_compat` configuration — provides both the legacy polyfills and newly natively-implemented Node.js APIs [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#L76)

- Migrate from Workers Sites (`site` config property) to Workers Static Assets — Static Assets is the preferred modern approach and is required for use with the Vite plugin [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#L74)

- Add `--remote` flag to wrangler commands that interact with your Cloudflare account after upgrading to v4 — v4 commands default to local mode; remote interaction requires explicit opt-in [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#L72)

- Use the latest LTS version of Node.js — Cloudflare recommends keeping Node.js up-to-date to ensure compatibility with current Wrangler releases [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#L64)
<!-- /skilld:best-practices -->

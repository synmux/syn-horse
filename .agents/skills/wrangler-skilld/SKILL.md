---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.105.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# cloudflare/workers-sdk `wrangler@4.105.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.105.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in wrangler v4.x — these are the changes that may cause silent breakage or are unknown to LLMs trained on older data.

- BREAKING: `web_search` binding renamed to `websearch` — v4.98.0 changed the configuration key from `web_search` to `websearch` in `wrangler.jsonc`, along with the binding type string and miniflare option key. Update your config from `"web_search": { "binding": "WEBSEARCH" }` to `"websearch": { "binding": "WEBSEARCH" }`. The runtime `WebSearch` type is unchanged [source](./.skilld/releases/wrangler@4.98.0.md:L52:62)

- BREAKING: Workflow binding `schedule` property renamed to `schedules` — v4.95.0 changed the configuration field from `schedule` to `schedules` to match the control plane API. Update Workflow bindings from `"schedule": "0 0 * * *"` to `"schedules": "0 0 * * *"` or `"schedules": ["0 0 * * *", ...]` [source](./.skilld/releases/wrangler@4.95.0.md:L53:56)

- BREAKING: Pipeline binding `pipeline` field renamed to `stream` — v4.96.0 changed the pipeline bindings configuration field from `pipeline` to `stream` to align with the updated API wire format. The old `pipeline` field is still accepted but deprecated and emits a warning. Update from `"pipeline": "my-stream-name"` to `"stream": "my-stream-name"` [source](./.skilld/releases/wrangler@4.96.0.md:L71:101)

- BREAKING: `experimental.testMode` removed from `unstable_dev` — v4.96.0 removed the deprecated `experimental.testMode` option which only affected the default log level. Callers passing `testMode: true` should now set `logLevel: "warn"` directly [source](./.skilld/releases/wrangler@4.96.0.md:L116:120)

- NEW: `createTestHarness()` for integration testing Workers — v4.99.0 introduces a new exported function from `wrangler` that creates a local test environment. It runs Workers using production build output and works with both Wrangler projects and the Cloudflare Vite plugin. Use `createTestHarness({ workers: [{ configPath: "./dist/worker/wrangler.json" }] })` then call `.fetch()`, `.getWorker()`, `.getLogs()`, `.debug()`, and `.reset()` on the returned server instance [source](./.skilld/releases/wrangler@4.99.0.md:L11:44)

- NEW: `agent_memory` bindings — v4.96.0 adds support for Agent Memory bindings for storing and retrieving agent conversation state. Configure with `"agent_memory": [{ "binding": "MY_MEMORY", "namespace": "my-namespace" }]`. Wrangler auto-provisions namespaces on deployment and generates types via `wrangler types` [source](./.skilld/releases/wrangler@4.96.0.md:L35:52)

- NEW: `wrangler agent-memory namespace` commands — v4.96.0 adds CLI commands for managing Agent Memory namespaces: `wrangler agent-memory namespace create <namespace>`, `list [--json]`, `get <namespace_name> [--json]`, `delete <namespace_name> [--force]` [source](./.skilld/releases/wrangler@4.96.0.md:L56:65)

- NEW: `--x-new-config` flag for TypeScript config files (experimental) — v4.100.0 introduces an experimental opt-in feature to author Worker config in TypeScript instead of TOML/JSON. When enabled, `wrangler dev`, `build`, `deploy`, `versions upload`, and `versions deploy` load from `cloudflare.config.ts` (required, defines bindings/triggers/routes via `defineWorker`) and optional `wrangler.config.ts` (tooling config via `defineWranglerConfig`). Per-environment config uses `ctx.mode` branching. Export both from `wrangler/experimental-config`. This is experimental and may change [source](./.skilld/releases/wrangler@4.100.0.md:L15:52)

- NEW: `migrations_pattern` for D1 database bindings — v4.98.0 adds an optional `migrations_pattern` field to D1 bindings in `wrangler.jsonc`, allowing you to point `wrangler d1 migrations apply` and `list` at nested migration files (e.g., ORM-generated folders like `migrations/0000_init/migration.sql`). It defaults to `${migrations_dir}/*.sql`. When no migrations match but files at common patterns exist, Wrangler logs a hint suggesting the opt-in. `wrangler d1 migrations create` returns an error if the filename would not match the pattern [source](./.skilld/releases/wrangler@4.98.0.md:L11:33)

- NEW: `--version-tag` support for `wrangler versions deploy` — v4.99.0 adds the ability to deploy a version by the tag it was uploaded with (e.g., a commit SHA) instead of the Version ID. Use `wrangler versions deploy --version-tag <sha>@100%` and the tag is resolved to a Version ID against deployable versions. Works with the same `<version-tag>@<percentage>` notation and splitting traffic as `<version-id>` [source](./.skilld/releases/wrangler@4.99.0.md:L52:58)

- NEW: `--from-step-name`, `--from-step-count`, `--from-step-type` options for `wrangler workflows instances restart` — v4.97.0 adds the ability to restart a Workflow instance from a specific step using `--from-step-name` with optional disambiguation flags `--from-step-count` and `--from-step-type`. These work for both remote Workflow instances and local `wrangler dev --local` sessions [source](./.skilld/releases/wrangler@4.97.0.md:L11:13)

- NEW: R2 bucket objects publicly accessible via dev server — v4.100.0 exposes local R2 bucket objects at `/cdn-cgi/local/r2/public/<bucket-id>/<key>` on the dev server, where `<bucket-id>` is the bucket's `bucket_name` when set, otherwise its `binding`. Simulates a public bucket during development. Bindings configured with `remote: true` are not exposed [source](./.skilld/releases/wrangler@4.100.0.md:L11:13)

- NEW: `cf-wrangler` delegate entrypoint (experimental) — v4.100.0 adds an experimental `cf-wrangler dev` command that starts the same local dev server as `wrangler dev` but exposes a narrow CLI surface (`--mode`, `--port`, `--host`, `--local`) for parent CLIs to delegate to. This replaces the separate `@cloudflare/wrangler-bundler` package and is an internal integration point [source](./.skilld/releases/wrangler@4.100.0.md:L60:64)

- NEW: Pipeline status and failure reasons visible in CLI — v4.99.0 adds `Status` column to `wrangler pipelines list` and shows failure reasons for failed pipelines. `wrangler pipelines get` now shows pipeline `Status` in details and highlights failures with the reason reported by the API [source](./.skilld/releases/wrangler@4.99.0.md:L46:50)

**Also changed:** `[path]` argument for `wrangler deploy` and `wrangler versions upload` (v4.98.0) — accepts file or directory auto-detected, `--script` deprecated · `getPlatformProxy()` passes through Workflow bindings with `script_name` (v4.98.0) · D1 `executeSql` logger level restore via try/finally (v4.98.0) · OAuth error descriptions surfaced in `wrangler login` (v4.98.0) · JSON variable bindings fixed in remote config (v4.97.0) · Graceful EMFILE error handling for large assets directories (v4.97.0) · `wrangler secret bulk` stdin newline preservation (v4.97.0) · `wrangler secret bulk` JSON validation (v4.97.0) · Workflow `schedules` deploy payload mapped to API format (v4.97.0) · Sentry error reporting disabled by default (v4.96.0) · Secrets stored with mode `0600` on Unix (v4.98.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `wrangler.jsonc` (JSON configuration) instead of TOML for new projects — newer Wrangler features are only available with JSON config files, and Cloudflare recommends this format for new projects [source](./.skilld/docs/workers/wrangler/configuration.md#section-wrangler-jsonc)

- Treat your Wrangler configuration file as the single source of truth for Worker configuration — avoid making changes via the Cloudflare dashboard to prevent configuration drift between local and deployed state [source](./.skilld/docs/workers/wrangler/configuration.md#source-of-truth)

- Use secrets instead of environment variables for sensitive information — `vars` are designed for non-sensitive configuration and are visible in the dashboard, while secrets are encrypted and only available to the Worker [source](./.skilld/docs/workers/wrangler/environments.md#secrets-in-local-development)

- Store local secrets in `.dev.vars` or `.env` files and add these to `.gitignore` to prevent accidental commits — these dotenv files hold development secrets that should never be version-controlled [source](./.skilld/docs/workers/wrangler/configuration.md#environment-variables)

- Declare required secret names in your Wrangler configuration using the `secrets.required` property — this enables validation during local development and deploy, and ensures type generation captures which secrets your Worker expects [source](./.skilld/docs/workers/wrangler/configuration.md#secrets)

- Set `compatibility_date` to today's date in new projects to opt into the latest Workers runtime features — compatibility dates act as a feature freeze, isolating your Worker from unintended breaking changes during Cloudflare platform updates [source](./.skilld/docs/workers/wrangler/configuration.md#compatibility-dates)

- Do not use `wrangler.jsonc` and `wrangler.toml` simultaneously in the same project — Wrangler will prioritise one format and silently ignore the other, causing configuration confusion [source](./.skilld/docs/workers/wrangler/configuration.md#configuration-files)

- Avoid disabling bundling unless your code is pre-processed by other tooling — Wrangler's bundler (esbuild) handles dependency resolution, tree-shaking, and compatibility transforms that are essential for Workers runtime compatibility [source](./.skilld/docs/workers/wrangler/bundling.md#disable-bundling)

- Migrate from `unstable_dev()` to `unstable_startWorker()` for programmatic Worker management — `unstable_dev()` has an experimental API prefix and is expected to change, whereas `unstable_startWorker()` provides a more stable interface [source](./.skilld/docs/workers/wrangler/api.md#unstable_startworker)

- Do not store sensitive information in environment names or comments — environment-specific names (e.g. "migrating-service-from-company1-to-company2") are visible in public DNS and SSL certificate records [source](./.skilld/docs/workers/wrangler/environments.md#environment-specific-configuration)

- Continue using Wrangler CLI to manage Worker configuration when you use `wrangler deploy` — dashboard-initiated syncs with `--from-dash` do not track subsequent dashboard changes, causing ongoing configuration drift [source](./.skilld/docs/workers/wrangler/commands/workers.md#wrangler-deploy)

- Use environment-specific secret files (`.dev.vars.<environment-name>`) when developing multiple Wrangler environments locally — if an environment-specific file exists, Wrangler loads only that file and ignores the base `.dev.vars`, ensuring correct secrets per environment [source](./.skilld/docs/workers/wrangler/environments.md#secrets-in-local-development)

- Run `wrangler types` after updating bindings or configuration to regenerate TypeScript types — the generated `worker-configuration.d.ts` file ensures type inference for all env bindings and is kept in sync via the postinstall hook [source](./.skilld/docs/workers/wrangler/commands/general.md#generate-types)

- Profile startup time with `wrangler check startup` using the exact same arguments as your deploy command — if you deploy with `--no-bundle`, profile with `--args="--no-bundle"` to get an accurate representation of startup behaviour in production [source](./.skilld/docs/workers/wrangler/commands/workers.md#wrangler-check-startup)
<!-- /skilld:best-practices -->

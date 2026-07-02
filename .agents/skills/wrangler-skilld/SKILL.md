---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.107.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-02
---

# cloudflare/workers-sdk `wrangler@4.107.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.107.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in wrangler v4.x — prioritizing recent minor releases where APIs changed in ways that older training data may not reflect.

## Detailed Changes

- NEW: `createTestHarness()` — v4.99.0 adds integration testing for Workers. Runs Workers in a local preview environment using production build output. Supports multiple workers, request triggering, scheduled events, test server reset, and structured log capture via `getLogs()` and `debug()`. [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- NEW: `defineWorker()` and `defineWranglerConfig()` from `wrangler/experimental-config` — v4.100.0 introduces experimental TypeScript config authoring. When `--x-new-config` flag is passed, `wrangler dev`, `wrangler build`, `wrangler deploy`, `wrangler versions upload`, and `wrangler versions deploy` load from `cloudflare.config.ts` (required, worker runtime config via `defineWorker`) and optional `wrangler.config.ts` (tooling config via `defineWranglerConfig`). Per-environment config via `ctx.mode` branching. This is experimental and may change. [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

- BREAKING: `web_search` binding renamed to `websearch` — v4.98.0. Wrangler config key, binding-type string, and miniflare option key all move from `web_search`/`webSearch` to `websearch`. Update `"web_search": { "binding": "WEBSEARCH" }` to `"websearch": { "binding": "WEBSEARCH" }`. Runtime type `WebSearch` on `env.WEBSEARCH` unchanged. [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- NEW: `agent_memory` bindings — v4.96.0 allows Workers to connect to Cloudflare Agent Memory service for storing/retrieving agent conversation state. Remote-only binding. Configure with binding name and namespace; wrangler auto-provisions namespace on deploy. Adds `agent-memory:write` OAuth scope to login. Supports type generation via `wrangler types`. [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler agent-memory namespace` commands — v4.96.0 adds `create`, `list`, `get`, `delete` subcommands for managing Agent Memory namespaces. Supports `--json` output. [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler websearch search` command — v4.96.0 CLI for running ad-hoc Web Search queries. Syntax: `wrangler websearch search "query"` with optional `--limit <N>` (default 10, max 20) and `--json` for raw response. [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- BREAKING: `pipeline` field renamed to `stream` in pipeline bindings — v4.96.0. Old `pipeline` field still accepted but deprecated with warning. Update config from `{ "binding": "MY_PIPELINE", "pipeline": "my-stream-name" }` to `{ "binding": "MY_PIPELINE", "stream": "my-stream-name" }`. [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- BREAKING: `schedule` property renamed to `schedules` on Workflow bindings — v4.95.0. Configuration-only rename. Scheduled triggering of Workflow instances not yet available. [source](./.skilld/releases/wrangler@4.95.0.md#patch-changes)

- NEW: `migrations_pattern` field in D1 database bindings — v4.98.0. Optional glob (relative to wrangler config) allowing nested migration file layouts (e.g. ORM-generated `migrations/0000_init/migration.sql`). Defaults to `${migrations_dir}/*.sql`. `wrangler d1 migrations create` now errors if generated filename would not match pattern. When no migrations match but drizzle-style layout exists, wrangler logs hint. [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- NEW: `--version-tag` support on `wrangler versions deploy` — v4.99.0. Deploy version by tag (e.g. commit SHA) instead of Version ID: `wrangler versions deploy --version-tag <sha>@100%`. Tag resolved against worker's deployable versions. Supports traffic splitting across multiple `--version-tag` values. [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- NEW: `--path` positional argument (generic) for `wrangler deploy` and `wrangler versions upload` — v4.98.0. Replaces `[script]` positional. Accepts file (Worker entry-point) or directory (static assets). Type auto-detected. Example: `wrangler deploy ./public` for static site. `--script` named option now hidden/deprecated (still works for files only). [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- DEPRECATED: `--script` named option on `wrangler deploy` and `wrangler versions upload` — v4.98.0. Use positional `--path` instead. Continues working for backwards compatibility (file paths only). Passing directory to `--script` now errors with suggestion to use `--path` or `--assets`. [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- NEW: `getPlatformProxy()` passes through workflow bindings with `script_name` — v4.98.0. Workflows with `script_name` now work in split-process setups (SvelteKit/Remix). Miniflare reroutes engine's `USER_WORKFLOW` binding through dev-registry-proxy. Workflows without `script_name` still stripped (internal workflow engine cannot run in empty proxy worker). [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- BREAKING: `experimental.testMode` option removed from `unstable_dev()` — v4.96.0. Previously only affected default `logLevel` (was `"warn"` when `testMode: true`). Callers needing quiet logs should now set `logLevel: "warn"` directly. Default `logLevel` now matches `wrangler dev` (`"log"`). [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler artifacts` commands — v4.92.0 adds CLI for Artifacts control-plane workflows (previously API-only). Includes `list`/`inspect` namespaces, `create`/`list`/`inspect`/`delete` repos, issue repo-scoped tokens for git auth. Human-readable and `--json` output. [source](./.skilld/releases/wrangler@4.92.0.md#minor-changes)

- NEW: `--keep-vars` flag on `wrangler versions upload` — v4.92.0. Matches existing `wrangler deploy` behavior. Preserves dashboard-configured environment variables instead of deleting them before upload. [source](./.skilld/releases/wrangler@4.92.0.md#minor-changes)

- NEW: `--from-step-name`, `--from-step-count`, `--from-step-type` options for `wrangler workflows instances restart` — v4.97.0. Restart Workflow instance from specific step. Works for remote instances and local `wrangler dev --local` sessions. `--from-step-count` and `--from-step-type` optional for disambiguation. [source](./.skilld/releases/wrangler@4.97.0.md#minor-changes)

- NEW: R2 public bucket simulation in `wrangler dev` — v4.100.0. Local R2 bucket objects now publicly accessible under `/cdn-cgi/local/r2/public/<bucket-id>/<key>` on dev server. `<bucket-id>` is bucket's `bucket_name` if set, otherwise `binding`. Bindings with `remote: true` excluded. [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

- NEW: `--x-new-config` flag (experimental) — v4.100.0. Gates upcoming TypeScript config support. When enabled, loads Worker config from `cloudflare.config.ts` / `wrangler.config.ts` instead of `wrangler.json`/`wrangler.jsonc`/`wrangler.toml`. See `defineWorker()`/`defineWranglerConfig()` above. Format and exports may change. [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

**Also changed:** `cf-wrangler dev` experimental delegate entrypoint (v4.100.0) · `browser` type generation now uses `BrowserRun` instead of generic `Fetcher` (v4.96.0) · `wrangler types --check` fixed for multi-worker setups with secondary `-c` configs (v4.99.0) · Workflow `schedules` property renamed from `schedule` (v4.95.0, config-only) · `--skip-confirmation` flag for `wrangler containers images delete` (v4.96.0) · D1 error messages improved for `d1 execute`, `d1 export`, `d1 time-travel restore`, `d1 insights` (v4.100.0) · Cloud authentication error messages now explain failure reason + list fixes (v4.100.0) · R2 Sippy error messages improved with specific `--flag` guidance (v4.100.0) · Pages CLI error messages improved with actionable guidance (v4.95.0) · OAuth login now shows actual error instead of hanging on provider rejection (v4.98.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `wrangler types` after changing bindings — do not manually define your Env interface. Run this command whenever you add or rename a binding to generate type definitions that match your configuration exactly, catching mismatches at compile time instead of deploy time [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L735:751)

- Configure environments deliberately in wrangler.jsonc — each environment (production, staging, etc.) deploys as a separate Worker and does not inherit bindings from the root. Declare bindings per environment and always deploy with `--env` to avoid accidentally deploying to the root Worker [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L829:872)

- Store secrets with `wrangler secret put`, never in config or source — secrets must be managed through the CLI. Use `.env` files for local development (added to `.gitignore`), and use `wrangler secret put API_KEY` in production [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L778:827)

- Keep your compatibility_date current — set it to today's date on new projects and periodically update existing ones. This unlocks new APIs and bug fixes without changing your code [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L689:710)

- Enable nodejs_compat compatibility flag — this gives Workers access to Node.js built-in modules like `node:crypto`, `node:buffer`, and `node:stream`. Many libraries depend on these modules; enabling the flag avoids cryptic import errors [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L712:733)

- Stream request and response bodies instead of buffering — use `response.body` directly and `TransformStream` for piping, never `await response.text()` or `await request.arrayBuffer()`. Workers have a 128 MB memory limit; buffering large payloads causes crashes [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L906:948)

- Use `ctx.waitUntil()` for background work after the response — it lets you perform work after responding to the client, such as analytics or cache writes. Do not destructure `ctx` (it loses the `this` binding); call `ctx.waitUntil()` directly [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L950:975)

- Use bindings for Cloudflare services, not REST APIs — bindings like R2, KV, D1, Queues are direct in-process references with no network hop, no authentication, and no extra latency. Calling the REST API from within a Worker wastes time and adds complexity [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L981:1000)

- Use service bindings for Worker-to-Worker communication instead of HTTP requests — service bindings are zero-cost, bypass the public internet, and support type-safe RPC. Access them via `env.SERVICE_NAME` from a configured binding [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1031:1050)

- Use Hyperdrive when connecting to remote PostgreSQL or MySQL databases — it maintains a regional connection pool that eliminates the per-request cost of TCP handshake, TLS negotiation, and connection setup. Create a new `Client` on each request; Hyperdrive manages the underlying pool [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1052:1090)

- Enable observability (logs and traces) in production — add `observability.enabled: true` and configure `head_sampling_rate` in wrangler.jsonc to start collecting structured logs and traces. Use `console.log` with JSON objects, `console.error` for errors, and `console.warn` for warnings [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1146:1186)

- Never store request-scoped state in global scope — Workers reuse isolates across requests, so a variable set during one request is still present during the next, causing cross-request data leaks. Pass state through function arguments or store it on `env` bindings [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1194:1217)

- Always `await` or `ctx.waitUntil()` Promises — floating promises cause silent bugs and dropped results. Enable the `no-floating-promises` lint rule (@typescript-eslint/no-floating-promises or oxlint typescript/no-floating-promises) to catch these at development time [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1219:1248)

- Test with @cloudflare/vitest-pool-workers to access real bindings — this test environment runs tests inside the Workers runtime, giving access to KV, R2, D1, and Durable Objects. Note: the Vitest pool automatically injects `nodejs_compat`, so confirm your wrangler.jsonc includes the flag if your code depends on Node.js modules [source](./.skilld/docs/workers/best-practices/workers-best-practices.md:L1319:1342)
<!-- /skilld:best-practices -->

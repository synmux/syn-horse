---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.112.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# cloudflare/workers-sdk `wrangler@4.112.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.112.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in wrangler v4.x — focusing on breaking changes, renamed/deprecated APIs, and new features unknown to LLMs trained on older data.

## Breaking & Renamed APIs

- BREAKING: `experimental.testMode` removed from `unstable_dev` — v4.96.0 dropped this option. Callers that passed `testMode: true` to reduce logging should now set `logLevel: "warn"` directly. Default log level now matches `wrangler dev` (`log`). [source](./.skilld/releases/wrangler@4.96.0.md:L116-L120)

- DEPRECATED: `web_search` binding renamed to `websearch` — v4.98.0 renames the binding key from `web_search` to `websearch` to align product naming. Update config from `"web_search": { "binding": "WEBSEARCH" }` to `"websearch": { "binding": "WEBSEARCH" }`. The runtime `WebSearch` type on `env.WEBSEARCH` is unchanged. [source](./.skilld/releases/wrangler@4.98.0.md:L52-L64)

- DEPRECATED: `pipeline` field renamed to `stream` in pipelines bindings — v4.96.0 renames the config field inside `pipelines` bindings to `stream` for API wire-format alignment. The old `pipeline` field still works but emits a deprecation warning. Update from `"pipeline": "my-stream-name"` to `"stream": "my-stream-name"`. [source](./.skilld/releases/wrangler@4.96.0.md:L71-L101)

- DEPRECATED: `schedule` renamed to `schedules` in Workflow bindings — v4.95.0 renames the Workflow binding property to match the control plane API. Update config from `"schedule": "..."` to `"schedules": "..."`. Scheduled triggering is not yet implemented. [source](./.skilld/releases/wrangler@4.95.0.md:L53-L57)

- DEPRECATED: `--script` option hidden and deprecated in `wrangler deploy` and `wrangler versions upload` — v4.98.0 deprecates the `--script` flag in favour of a positional `[path]` argument. The flag still works for backwards compatibility but now rejects directories (directing users to use the positional argument or `--assets` flag instead). [source](./.skilld/releases/wrangler@4.98.0.md:L35-L42)

- BREAKING: `remote: false` now rejected on always-remote bindings — v4.95.0 now fails with a clear error when you set `remote: false` on bindings that have no local simulator (AI, AI Search, Media, Artifacts, Flagship, VPC Service, VPC Network). Previously this was silently accepted but produced non-functional bindings. [source](./.skilld/releases/wrangler@4.95.0.md:L27-L29)

## New APIs & Features

- NEW: `createTestHarness()` added for integration testing Workers — v4.99.0 introduces `createTestHarness()` from the `wrangler` package for running Workers in a local preview environment with production build output. Use it with any Node.js test runner to send requests to individual Workers, trigger scheduled events, capture structured logs via `getLogs()`, or debug with `debug()`. Works with both Wrangler projects and Cloudflare Vite plugin builds. [source](./.skilld/releases/wrangler@4.99.0.md:L11-L44)

- NEW: Agent Memory bindings support — v4.96.0 adds `agent_memory` bindings for storing and retrieving agent conversation state. Configure via `wrangler.json` with a `namespace` field; bindings are remote-only. Wrangler auto-provisions the namespace at deploy time and `wrangler types` generates `AgentMemory` types. [source](./.skilld/releases/wrangler@4.96.0.md:L35-L54)

- NEW: Web Search binding support — v4.96.0 adds `websearch` bindings (named `web_search` in this release, renamed to `websearch` in v4.98.0) for Cloudflare's managed web discovery service. No namespace/instance needed — only the binding name. Exposes a `search()` method returning URLs and metadata; uses the global `fetch()` API to read result content. Always remote in local dev (proxies to production). [source](./.skilld/releases/wrangler@4.96.0.md:L11-L33)

- NEW: `wrangler websearch search` CLI command — v4.96.0 adds a CLI for ad-hoc Web Search queries: `wrangler websearch search "query" [--limit <1-20>] [--json]`. Default limit is 10, capped at 20. `--json` outputs raw response; without it results render as a table. [source](./.skilld/releases/wrangler@4.96.0.md:L25-L33)

- NEW: `wrangler agent-memory namespace` commands — v4.96.0 adds management commands for Agent Memory namespaces: `create`, `list [--json]`, `get <name> [--json]`, `delete <name> [--force]`. [source](./.skilld/releases/wrangler@4.96.0.md:L56-L65)

- NEW: D1 `migrations_pattern` field — v4.98.0 adds optional `migrations_pattern` to D1 database bindings as a glob (relative to wrangler config) for discovering migrations in nested layouts (e.g., ORM-generated `migrations/*/migration.sql` for drizzle). Defaults to `${migrations_dir}/*.sql`. When no matches exist but drizzle-style files are detected, Wrangler logs a hint. `wrangler d1 migrations create` now errors if the generated filename would not match the pattern. [source](./.skilld/releases/wrangler@4.98.0.md:L11-L33)

- NEW: Positional `[path]` argument for `wrangler deploy` and `wrangler versions upload` — v4.98.0 generalizes the positional argument from `[script]` to `[path]`, accepting either a Worker entry-point file or a directory of static assets with auto-detection. For example: `wrangler deploy ./src/index.ts` (Worker file) or `wrangler deploy ./public` (assets directory, no confirmation prompt). [source](./.skilld/releases/wrangler@4.98.0.md:L35-L42)

- NEW: `--version-tag` support for `wrangler versions deploy` — v4.99.0 adds `--version-tag <tag>@<percentage>` to deploy by version tag (e.g., commit SHA) instead of Version ID. Tags are resolved against recent deployable versions; split traffic via multiple `--version-tag` values. If a tag matches zero or multiple versions, an error directs you to use Version ID. [source](./.skilld/releases/wrangler@4.99.0.md:L52-L59)

- NEW: TypeScript config files (experimental) — v4.100.0 introduces `--x-new-config` flag to load configuration from `cloudflare.config.ts` (runtime config via `defineWorker()`) and optional `wrangler.config.ts` (tooling config via `defineWranglerConfig()`) instead of `wrangler.json`. Per-environment config via `ctx.mode` branching. Format and APIs may change in future releases. [source](./.skilld/releases/wrangler@4.100.0.md:L15-L52)

- NEW: R2 bucket objects served publicly via dev server — v4.100.0 exposes local R2 bucket objects at `/cdn-cgi/local/r2/public/<bucket-id>/<key>` on the dev server, simulating a public bucket. Bindings with `remote: true` are excluded. `<bucket-id>` is the bucket's `bucket_name` if set, otherwise its `binding` name. [source](./.skilld/releases/wrangler@4.100.0.md:L11-L13)

- NEW: Workflow bindings now pass through `script_name` — v4.98.0 allows `getPlatformProxy()` to pass Workflow bindings with a `script_name` field (internal workflows without it are still stripped with a warning). Enables server-side SvelteKit/Remix handlers to call `platform.env.MY_WORKFLOW.create({ ... })` in dev, with miniflare rerouting through the dev-registry-proxy. [source](./.skilld/releases/wrangler@4.98.0.md:L44-L50)

- NEW: Confirmation prompt for `wrangler containers images delete` — v4.96.0 adds confirmation before deleting container images (previously immediate). Use `-y` or `--skip-confirmation` to bypass in scripts. [source](./.skilld/releases/wrangler@4.96.0.md:L67-L69)

Also changed: Workflows `schedules` deploy payload now correctly maps cron strings to `{ cron }` objects (v4.97.0) · Pagination-aware resource resolution for pipeline/stream/sink commands (v4.96.0) · `wrangler secret bulk` now supports deletion by setting value to `null` (v4.96.0) · ProxyCommand support for `wrangler containers ssh --stdio` (v4.96.0) · Browser binding types now generate `BrowserRun` instead of generic `Fetcher` (v4.96.0) · R2 Sippy error messages now name specific flags with context and examples (v4.100.0) · `wrangler versions list` capped to 10 most recent deployable versions (v4.98.0) · `--from-step-name`, `--from-step-count`, `--from-step-type` options for `wrangler workflows instances restart` (v4.97.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Wrangler Best Practices

## Best Practices

- Use `wrangler types` after each binding or configuration change — never hand-write the `Env` interface. This catches type mismatches at compile time instead of deploy time and keeps your types in sync with your actual configuration [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#generate-binding-types-with-wrangler-types)

- Set `compatibility_date` to today's date on new projects and periodically update it on existing ones to unlock new runtime features and bug fixes without code changes. This is a low-risk way to adopt improvements incrementally [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#keep-your-compatibility-date-current)

- Enable `nodejs_compat` compatibility flag to access Node.js built-in modules like `node:crypto`, `node:buffer`, and `node:stream`. Many dependencies rely on these and omitting the flag causes cryptic import errors at runtime [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#enable-nodejs_compat)

- Use bindings for Cloudflare services (R2, KV, D1, Queues) instead of making REST API calls — bindings are direct in-process references with no network hop, no authentication overhead, and no latency tax [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-bindings-for-cloudflare-services-not-rest-apis)

- Stream large request and response bodies instead of buffering with `await response.text()` or `await request.arrayBuffer()` — Workers have a 128 MB memory limit and buffering large payloads crashes your Worker. Use `TransformStream` to pipe data without holding it in memory [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#stream-request-and-response-bodies)

- Use `ctx.waitUntil()` for background work that does not affect the response (analytics, cache writes, webhooks). Keep your response fast while completing secondary tasks after the client receives it. Avoid the common pitfall of destructuring `ctx`, which loses the `this` binding and throws "Illegal invocation" [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-waituntil-for-work-after-the-response)

- Use Queues for simple async fan-out (one event triggers many consumers) and Workflows for multi-step durable processes where steps depend on each other. Queues decouple producers from consumers; Workflows handle state and retries at the step level [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-queues-and-workflows-for-async-and-background-work)

- Use service bindings instead of HTTP requests when one Worker calls another — they are zero-cost, bypass the public internet, support type-safe RPC via `WorkerEntrypoint`, and require no authentication setup [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-service-bindings-for-worker-to-worker-communication)

- Always use Hyperdrive when connecting to remote PostgreSQL or MySQL databases — it maintains a connection pool close to your database, eliminating the per-request cost of TCP handshake and TLS negotiation. Create a new client per request; Hyperdrive manages the underlying pool [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-hyperdrive-for-external-database-connections)

- Use Durable Objects with the Hibernation API for reliable long-lived WebSocket connections. Call `this.ctx.acceptWebSocket()` instead of `ws.accept()` to enable hibernation and preserve connections even when the isolate is evicted [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-durable-objects-for-websockets)

- Store secrets with `wrangler secret put` and access them through `env` at runtime — never put secrets in your config file or source code. For local development use a `.env` file in `.gitignore` [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#store-secrets-with-wrangler-secret-not-in-source)

- Configure environments deliberately and expect non-inheritance — bindings and vars declared in root do not carry to environment-specific deployments (e.g., `my-worker-production`). Each environment is treated as a separate, standalone Worker [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#configure-environments-deliberately)

- Enable Workers Logs and Traces before deploying to production, using `head_sampling_rate` to control volume. Structured JSON logging with `console.log` makes logs searchable and filterable in the dashboard; use `console.error` and `console.warn` for proper severity levels [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#enable-workers-logs-and-traces)

- Never store request-scoped state in global module-level variables — Workers reuse isolates across requests, causing cross-request data leaks and "Cannot perform I/O on behalf of a different request" errors. Pass state through function arguments or store it on `env` bindings instead [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#do-not-store-request-scoped-state-in-global-scope)
<!-- /skilld:best-practices -->

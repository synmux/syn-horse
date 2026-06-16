---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.101.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-16
---

# cloudflare/workers-sdk `wrangler@4.101.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.101.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- NEW: `createTestHarness()` — v4.99.0 introduces integration testing API for Workers. Runs workers in local preview using production build output, works with Wrangler and Vite plugin projects. Methods: `listen()`, `fetch()`, `getWorker()`, `getLogs()`, `debug()`, `reset()`, `close()` [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- BREAKING: `web_search` binding renamed to `websearch` — v4.98.0 renames config key from `web_search` to `websearch`. Update wrangler config: `"websearch": { "binding": "WEBSEARCH" }`. Runtime type `WebSearch` on `env.WEBSEARCH` unchanged [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- NEW: `defineWorker()` and `defineWranglerConfig()` — v4.100.0 adds experimental `--x-new-config` flag enabling TypeScript-based config. `cloudflare.config.ts` (required) defines Worker runtime config via `defineWorker` from `wrangler/experimental-config`. `wrangler.config.ts` (optional) defines tooling config via `defineWranglerConfig`. Per-environment config via `ctx.mode` branching. Flag, formats, and exports may change [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

- NEW: Agent Memory bindings (`agent_memory`) — v4.96.0 adds remote-only bindings for Cloudflare Agent Memory service. Configure in wrangler.json with `binding` and `namespace` fields. Namespaces auto-provision on deploy. Wrangler generates types via `wrangler types`. `agent-memory:write` OAuth scope added [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler agent-memory namespace` commands — v4.96.0 adds `create`, `list`, `get`, `delete` subcommands with optional `--json` output and `-y`/`--force` flags [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `wrangler websearch search` command — v4.96.0 adds CLI for Web Search queries. Usage: `wrangler websearch search "query" [--limit 5] [--json]`. Limit defaults to 10, capped at 20. Remote-only binding [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- BREAKING: Workflow binding `schedule` renamed to `schedules` — v4.95.0 renames property from singular `schedule` to plural `schedules`. Accepts string or string array of cron expressions. Scheduled triggering not yet available [source](./.skilld/releases/wrangler@4.95.0.md#patch-changes)

- BREAKING: Pipeline binding `pipeline` field renamed to `stream` — v4.96.0 renames config from `"pipeline": "name"` to `"stream": "name"`. Old field still accepted but deprecated with warning [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: D1 binding `migrations_pattern` field — v4.98.0 adds optional glob pattern (relative to wrangler config). Defaults to `${migrations_dir}/*.sql`. Supports nested layouts like drizzle-style `migrations/*/migration.sql`. `wrangler d1 migrations create` errors if generated filename won't match pattern [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

- NEW: `--version-tag` support for `wrangler versions deploy` — v4.99.0 allows deploying by version tag instead of version ID. Usage: `wrangler versions deploy --version-tag <sha>@100%`. Tags resolved against deployable versions; unsupported for aged-out versions [source](./.skilld/releases/wrangler@4.99.0.md#minor-changes)

- NEW: `wrangler workflows instances restart --from-step-*` options — v4.97.0 adds `--from-step-name`, `--from-step-count`, `--from-step-type` to restart from specific step. Works for remote and local `wrangler dev --local` sessions [source](./.skilld/releases/wrangler@4.97.0.md#minor-changes)

- NEW: `wrangler ai models list` command — v4.93.0 adds model catalog query with filters: `--search`, `--task`, `--author`, `--source`, `--hide-experimental` [source](./.skilld/releases/wrangler@4.93.0.md#minor-changes)

- NEW: `wrangler ai models schema` command — v4.93.0 adds schema fetching for Workers AI models. Usage: `wrangler ai models schema <model>` [source](./.skilld/releases/wrangler@4.93.0.md#minor-changes)

- NEW: `wrangler artifacts` commands — v4.92.0 adds control-plane workflows: list/inspect namespaces, create/list/inspect/delete repos, issue repo-scoped tokens. Supports `--json` output [source](./.skilld/releases/wrangler@4.92.0.md#minor-changes)

- NEW: `--keep-vars` flag for `wrangler versions upload` — v4.92.0 adds flag matching `wrangler deploy` behaviour, preserving dashboard environment variables instead of deleting them [source](./.skilld/releases/wrangler@4.92.0.md#minor-changes)

- DEPRECATED: `experimental.testMode` removed from `unstable_dev()` — v4.96.0 removes option that only affected default `logLevel`. Callers should use `logLevel: "warn"` directly instead [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: Secret bulk deletion via null values — v4.96.0 allows `wrangler secret bulk` to delete secrets by setting value to `null` in JSON input. Usage: `{ "SECRET_TO_DELETE": null, "SECRET_TO_UPDATE": "new-value" }` [source](./.skilld/releases/wrangler@4.96.0.md#minor-changes)

- NEW: `--containers-rollout=none` flag — v4.93.0 allows skipping container deploy while updating Worker configuration [source](./.skilld/releases/wrangler@4.93.0.md#minor-changes)

- NEW: Public R2 bucket objects via `/cdn-cgi/local/r2/public/` — v4.100.0 exposes local R2 objects on dev server at `/cdn-cgi/local/r2/public/<bucket-id>/<key>`. Bindings with `remote: true` excluded. Simulates public bucket [source](./.skilld/releases/wrangler@4.100.0.md#minor-changes)

- NEW: `cf-wrangler` delegate entrypoint (experimental) — v4.100.0 adds narrow CLI surface for parent CLIs to delegate to wrangler's dev server. Supports `--mode`, `--port`, `--host`, `--local`. Replaces `@cloudflare/wrangler-bundler`. Internal integration point [source](./.skilld/releases/wrangler@4.100.0.md#patch-changes)

- BREAKING: `[script]` positional argument generalised to `[path]` — v4.98.0 generalises `wrangler deploy` and `wrangler versions upload` positional from file to file-or-directory. Auto-detects type. `--script` flag deprecated (hidden, backwards compatible for files only; rejects directories with guidance). Usage: `wrangler deploy ./src/index.ts` (file) or `wrangler deploy ./public` (directory) [source](./.skilld/releases/wrangler@4.98.0.md#minor-changes)

**Also changed:** Tunnel QR code display v4.94.0 · `getPlatformProxy()` workflow binding passthrough v4.98.0 · `wrangler types --check` multi-worker fix v4.99.0 · `wrangler secret bulk` delete-only no-op v4.99.0 · Workflow binding `schedule` property v4.94.0 · Deploy helper flags v4.95.0 · Authentication error messages v4.100.0 · D1 error message improvements v4.100.0 · R2 Sippy error messages v4.100.0 · Memory leak fix in headless dev v4.100.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Run `wrangler types` to generate your `Env` interface instead of hand-writing it — this catches binding mismatches at compile time rather than deploy time and must be re-run whenever bindings change [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#generate-binding-types-with-wrangler-types)

- Set `compatibility_date` to today's date on new projects and periodically update existing projects to access new runtime features and bug fixes — this enables newer APIs without code changes [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#keep-your-compatibility-date-current)

- Enable the `nodejs_compat` compatibility flag to give Workers access to Node.js built-in modules (`node:crypto`, `node:buffer`, `node:stream`) which many libraries depend on [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#enable-nodejs_compat)

- Store secrets with `wrangler secret put` (interactive prompt) or piped from environment variables/CLI tools — never store secrets in `wrangler.jsonc` or source code, use `.env` files locally with `.gitignore` [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#store-secrets-with-wrangler-secret-not-in-source)

- Configure each environment (production, staging) with explicit per-environment bindings and routes — bindings are not inherited and the root Worker is a separate deployment [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#configure-environments-deliberately)

- Use Cloudflare service bindings (KV, R2, D1, Queues, Workflows) instead of REST APIs — bindings are in-process with no network hop, no authentication overhead, and no latency [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-bindings-for-cloudflare-services-not-rest-apis)

- Stream request and response bodies using `response.body` or `TransformStream` instead of buffering with `await response.text()` — the 128 MB memory limit means large payloads will crash your Worker [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#stream-request-and-response-bodies)

- Use `ctx.waitUntil()` for background work after sending the response (analytics, cache writes, webhooks) without destructuring `ctx` which loses the `this` binding — this keeps responses fast while completing non-critical tasks [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-waituntil-for-work-after-the-response)

- Use Queues for single-step async work (email, webhooks, buffering) and Workflows for multi-step durable processes (payment → fulfillment → notification) — Workflows persist step results and retry only failed steps, not the entire job [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-queues-and-workflows-for-async-and-background-work)

- Use service bindings for Worker-to-Worker communication via RPC instead of HTTP requests — service bindings are zero-cost, bypass the public internet, and support type-safe method calls [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-service-bindings-for-worker-to-worker-communication)

- Use Hyperdrive to connect to remote PostgreSQL or MySQL databases — it maintains a regional connection pool eliminating per-request TCP handshake and TLS negotiation costs (often 300–500ms) [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-hyperdrive-for-external-database-connections)

- Use Durable Objects with `ctx.acceptWebSocket()` and the Hibernation API for persistent WebSocket connections — this keeps connections alive even when the isolate is evicted and auto-wakes on message arrival [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-durable-objects-for-websockets)

- Test with `@cloudflare/vitest-pool-workers` which runs tests inside the Workers runtime with real bindings (KV, R2, D1, Durable Objects) — Node.js tests miss unsupported APIs and can pass without required compatibility flags [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#test-with-cloudflarevitest-pool-workers)

- Enable observability with structured JSON logging via `console.log()` and control sampling with `head_sampling_rate` (1 = 100% capture, lower for high-traffic) — without observability enabled, production Workers are a black box for debugging intermittent errors [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#enable-workers-logs-and-traces)
<!-- /skilld:best-practices -->

---
name: wrangler-skilld
description: "ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.98.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# cloudflare/workers-sdk `wrangler@4.98.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.98.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for Wrangler v4.98.0, focusing on breaking changes from v3→v4 migrations and new APIs.

- BREAKING: KV/R2 commands default to local mode — `wrangler kv key get`, `wrangler r2 object get`, and other subcommands now query locally by default and require `--remote` flag to access production data [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#commands-default-to-local-mode)

- BREAKING: `getBindingsProxy()` removed — replaced by `getPlatformProxy(options?)` which takes identical arguments and returns a proxy object for accessing Worker bindings [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `legacy_assets` config and `--legacy-assets` flag removed — must migrate to Workers Static Assets or errors will occur during build [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `node_compat` config and `--node-compat` flag removed — use `nodejs_compat` compatibility flag instead, which includes polyfills and native Node.js APIs [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `usage_model` config property no longer has any effect — after Workers Standard Pricing rollout, must configure via dashboard instead [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: esbuild upgraded from v0.17.19 to v0.24 — wildcard dynamic imports like `import('./data/' + kind + '.json')` now automatically bundle all matching files in the glob pattern instead of just explicitly referenced files [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#upgraded-esbuild-version)

- BREAKING: `wrangler version` command removed — use `wrangler --version` to check Wrangler version [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `wrangler publish` command removed — use `wrangler deploy` to deploy Workers instead [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `wrangler generate` command removed — use `npm create cloudflare@latest` to scaffold new projects [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: `wrangler pages publish` command removed — use `wrangler pages deploy` to deploy Pages projects [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#deprecated-commands-and-configurations-removed)

- BREAKING: Node.js v16 no longer supported — Wrangler v4 only supports Current, Active LTS, and Maintenance LTS versions; users on v16 (EOL 2022) must upgrade [source](./.skilld/docs/workers/wrangler/migration/update-v3-to-v4.md#updated-nodejs-support-policy)

- NEW: `experimental_generateTypes(options)` — programmatic API to generate TypeScript type definitions from Worker configuration, equivalent to `wrangler types` CLI command [source](./.skilld/pkg/wrangler-dist/cli.d.ts:L239:L300)

- NEW: `unstable_startWorker(options)` — low-level API for starting a Worker in tests, returns a Worker instance for programmatic interaction [source](./.skilld/pkg/wrangler-dist/cli.d.ts:L1)

- NEW: `unstable_generateASSETSBinding(opts)` — runtime assets binding generator that returns a request handler for serving static assets [source](./.skilld/pkg/wrangler-dist/cli.d.ts:L1)

**Also changed:** `getPlatformProxy()` now the standard API for dev bindings · `unstable_getMiniflareWorkerOptions()` for Miniflare integration · `experimentalGetWranglerCommands()` to inspect CLI structure · `nodejs_compat_populate_process_env` compat flag for auto-populating `process.env` · WebSocket message size limit increased to 32 MiB in runtime · Float16Array and explicit resource context management support added
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `wrangler.jsonc` as your configuration format — JSONC allows comments and is the recommended choice over raw JSON or TOML. Include `"$schema": "node_modules/wrangler/config-schema.json"` for IDE autocomplete and validation [source](./.skilld/pkg/README.md#configuration)

- Run `wrangler types` after adding or renaming bindings — generates type-safe `Env` interfaces that match your actual configuration, catching mismatches at compile time rather than deploy time [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#generate-binding-types-with-wrangler-types)

- Keep `compatibility_date` current — set it to today on new projects and periodically update on existing ones to access new APIs and runtime fixes without code changes [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#keep-your-compatibility-date-current)

- Stream request and response bodies instead of buffering — use `response.body` piping or `TransformStream` to avoid the 128 MB memory limit on large payloads. For concatenating multiple responses, pipe sequentially with `preventClose: true` to keep the writable stream open [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#stream-request-and-response-bodies)

- Use `ctx.waitUntil()` for non-blocking background work — use for analytics, cache writes, and logging after the response is sent. Avoid destructuring `ctx` (loses binding) and respect the 30-second time limit after the response [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-waituntil-for-work-after-the-response)

- Prefer bindings over REST API calls to Cloudflare services — bindings skip network hops and authentication, providing zero-latency access to KV, R2, D1, Queues, and Workflows [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-bindings-for-cloudflare-services-not-rest-apis)

- Choose Queues for single-step async work and Workflows for multi-step durable processes — Queues handle fan-out and buffering (one message, many consumers); Workflows handle complex state where later steps depend on earlier results and can pause for external events [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-queues-and-workflows-for-async-and-background-work)

- Use service bindings for Worker-to-Worker communication instead of HTTP requests — bindings are zero-cost, bypass the public internet, and enable type-safe RPC through `WorkerEntrypoint` classes [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-service-bindings-for-worker-to-worker-communication)

- Create a new Hyperdrive `Client` on each request — Hyperdrive manages the underlying connection pool, so per-request client creation is fast and maintains regional pooling close to your database [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-hyperdrive-for-external-database-connections)

- Use `this.ctx.acceptWebSocket()` with hibernation for reliable WebSocket connections in Durable Objects — enables the runtime to keep connections alive even while the object is evicted from memory. Use `setWebSocketAutoResponse()` for ping/pong heartbeats that do not wake the object [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-durable-objects-for-websockets)

- Never store request-scoped state in module-level variables — Workers reuse isolates across requests, causing data leaks and stale state. Pass request data through function arguments or access via `env` bindings only [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#do-not-store-request-scoped-state-in-global-scope)

- Use `crypto.subtle.timingSafeEqual()` when comparing secret values — hash both values to fixed size first, then compare in constant time to prevent timing side-channel attacks. Never do direct string comparison on secrets or tokens [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-web-crypto-for-secure-token-generation)

- Enable structured JSON logging with `console.log` and `console.error` — use `console.log(JSON.stringify({ … }))` for searchable, filterable logs in the Workers dashboard. Set `observability.logs.head_sampling_rate` to tune volume on high-traffic Workers [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#enable-workers-logs-and-traces)

- Explicitly handle errors with `try...catch` instead of `ctx.passThroughOnException()` — the fail-open mechanism hides bugs and makes debugging difficult; return structured error responses and log with context instead [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#do-not-use-passthroughonexception-as-error-handling)
<!-- /skilld:best-practices -->

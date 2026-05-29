---
name: wrangler-skilld
description: "Command-line interface for all things Cloudflare Workers. ALWAYS use when writing code importing \"wrangler\". Consult for debugging, best practices, or modifying wrangler, workers-sdk, workers sdk."
metadata:
  version: 4.95.0
  generated_by: cached
  generated_at: 2026-05-29
---

# cloudflare/workers-sdk `wrangler@4.95.0`
**Tags:** wrangler@2.2.4: 2.2.4, legacy: 3.114.17, latest: 4.95.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p wrangler` instead of grepping `.skilld/` directories. Run `skilld search --guide -p wrangler` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for Wrangler v4.95.0.

- BREAKING: `ConfigFields["entry-point"]` — property in `site` configuration is deprecated; use top-level `main` or pass path as CLI argument [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:2397-2402)

- BREAKING: `EnvironmentInheritable.workers_dev` — change in default behavior/handling of `workers_dev` flag [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:1256-1262)

- DEPRECATED: `unstable_getDevCompatibilityDate()` — use today's date for compatibility date [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:2792-2794)

- DEPRECATED: `ContainerApp.instances` — property for number of application instances [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:928-931)

- DEPRECATED: `ContainerApp.wrangler_ssh` — use `ssh` instead [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:996-999)

- DEPRECATED: `ContainerApp.configuration` — use top-level `containers` fields; `configuration.image` becomes `image`, `limits` becomes `instance_type` [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:1018-1024)

- DEPRECATED: `ContainerApp.durable_objects` — use `class_name` field instead [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:1082-1085)

- DEPRECATED: `ContainerApp.instance_type` values (`"dev"`, `"standard"`) — use `"lite"` and `"standard-1"` respectively [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:960-961)

- DEPRECATED: `EnvironmentNonInheritable.services.environment` — use `service: <worker_name>-<environment_name>` instead [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:1930-1934)

- NEW: `unstable_dev()` — programmatically start a Wrangler dev server [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:105-107)

- NEW: `deploy()` — programmatically deploy to Cloudflare Pages [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:150-152)

- NEW: `generateTypes()` — programmatically generate TypeScript type definitions [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:290-292)

- NEW: `unstable_generateASSETSBinding` (experimental) — function to generate ASSETS binding [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:3335)

- NEW: `experimental_getWranglerCommands()` (experimental) — get registered Wrangler commands for documentation generation [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:3323-3329)

- NEW: `ContainerApp.rollout_step_percentage` · `ContainerApp.rollout_kind` · `ContainerApp.rollout_active_grace_period` — new container rollout configuration options [source](./src/_worktrees/syn-horse.notifications/node_modules/wrangler/wrangler-dist/cli.d.ts:1107)

**Also changed:**
NEW: `EnvironmentNonInheritable.vectorize` binding · NEW: `EnvironmentNonInheritable.ai_search_namespaces` binding · NEW: `EnvironmentNonInheritable.ai_search` binding · NEW: `EnvironmentNonInheritable.hyperdrive` binding · NEW: `EnvironmentNonInheritable.analytics_engine_datasets` binding · NEW: `EnvironmentNonInheritable.browser` binding · NEW: `EnvironmentNonInheritable.ai` binding · NEW: `EnvironmentNonInheritable.images` binding · NEW: `EnvironmentNonInheritable.media` binding · NEW: `EnvironmentNonInheritable.stream` binding · NEW: `EnvironmentNonInheritable.mtls_certificates` binding · NEW: `EnvironmentNonInheritable.tail_consumers` binding · NEW: `EnvironmentNonInheritable.streaming_tail_consumers` binding · NEW: `EnvironmentNonInheritable.dispatch_namespaces` binding · NEW: `EnvironmentNonInheritable.pipelines` binding · NEW: `EnvironmentNonInheritable.secrets_store_secrets` binding · NEW: `EnvironmentNonInheritable.artifacts` binding · NEW: `EnvironmentNonInheritable.flagship` binding · NEW: `EnvironmentNonInheritable.ratelimits` binding · NEW: `EnvironmentNonInheritable.worker_loaders` binding · NEW: `EnvironmentNonInheritable.vpc_services` binding · NEW: `EnvironmentNonInheritable.vpc_networks` binding.

**Note:** This information is primarily derived from the `wrangler@4.95.0/wrangler-dist/cli.d.ts` type definition file, as detailed release notes for versions between `v4.80.0` and `v4.95.0` were not available in the provided resources.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Keep your compatibility date current — ensures access to latest features and bug fixes.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#keep-your-compatibility-date-current)

- Generate binding types with wrangler types — catches config/code mismatches at compile time, not deploy time.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#generate-binding-types-with-wrangler-types)

- Store secrets with wrangler secret, not in source — securely handles sensitive information, preventing exposure in version control.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#store-secrets-with-wrangler-secret-not-in-source)

- Configure environments deliberately — ensures distinct deployments for production, staging, and development with separate configurations.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#configure-environments-deliberately)

- Set up custom domains or routes correctly — avoids common `ERR_NAME_NOT_RESOLVED` issues by correctly configuring DNS records and understanding the difference between custom domains and routes.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#set-up-custom-domains-or-routes-correctly)

- Stream request and response bodies — reduces memory usage and improves time-to-first-byte, crucial for large payloads within Workers' memory limits.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#stream-request-and-response-bodies)

- Use waitUntil for work after the response — improves response time by offloading non-critical tasks like analytics or cache writes to background.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-waituntil-for-work-after-the-response)

- Use bindings for Cloudflare services, not REST APIs — eliminates network hops, authentication, and latency by using in-process references to Cloudflare services.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-bindings-for-cloudflare-services-not-rest-apis)

- Use Queues and Workflows for async and background work — decouples producer/consumer, handles multi-step durable processes, and moves long-running tasks out of the critical path.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-queues-and-workflows-for-async-and-background-work)

- Use service bindings for Worker-to-Worker communication — provides zero-cost, type-safe RPC for inter-Worker communication, bypassing the public internet.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-service-bindings-for-worker-to-worker-communication)

- Use Hyperdrive for external database connections — improves performance by maintaining a regional connection pool and caching query results for remote databases.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-hyperdrive-for-external-database-connections)

- Use Durable Objects for WebSockets — ensures persistent state and hibernation for reliable, long-lived WebSocket connections, unlike plain Workers.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#use-durable-objects-for-websockets)

- Do not store request-scoped state in global scope — prevents cross-request data leaks, stale state, and "Illegal invocation" errors by isolating state per request.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#do-not-store-request-scoped-state-in-global-scope)

- Always await or waitUntil your Promises — avoids silent bugs, dropped results, and swallowed errors by ensuring all promises are handled.
  [source](./.skilld/docs/workers/best-practices/workers-best-practices.md#always-await-or-waituntil-your-promises)
<!-- /skilld:best-practices -->

---
name: cloudflare-vitest-pool-workers-skilld
description: 'ALWAYS use when writing code importing "@cloudflare/vitest-pool-workers". Consult for debugging, best practices, or modifying @cloudflare/vitest-pool-workers, cloudflare/vitest-pool-workers, cloudflare vitest-pool-workers, cloudflare vitest pool workers, workers-sdk, workers sdk.'
metadata:
  version: 0.16.10
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-27
---

# cloudflare/workers-sdk `@cloudflare/vitest-pool-workers@0.16.10`

**Tags:** latest: 0.16.10

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @cloudflare/vitest-pool-workers` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @cloudflare/vitest-pool-workers` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Miniflare 2's `jest-environment-miniflare` and `vitest-environment-miniflare` packages are replaced by `@cloudflare/vitest-pool-workers`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#install-the-workers-vitest-integration)
- BREAKING: No Jest testing environment is provided for Workers; migrate to Vitest. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#install-the-workers-vitest-integration)
- BREAKING: Workers Vitest integration does not support service worker format; migrate to ES modules. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#install-the-workers-vitest-integration)
- BREAKING: Vitest config `environment: "miniflare"` and `environmentOptions` are replaced by `plugins: [cloudflareTest({ miniflare: { ... }, wrangler: { configPath: "./wrangler.jsonc" } })]`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#update-your-vitest-configuration-file)
- BREAKING: TypeScript `types` declaration `vitest-environment-miniflare/globals` is replaced by `@cloudflare/vitest-pool-workers`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#update-your-typescript-configuration-file)
- BREAKING: `getMiniflareBindings()` is replaced by `env` helper from `cloudflare:workers` module. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#access-bindings)
- BREAKING: `setupMiniflareIsolatedStorage()` is no longer needed; storage isolation is per test file by default. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#storage-isolation)
- BREAKING: `new ExecutionContext()` is replaced by `createExecutionContext()` from `cloudflare:test`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#work-with-waituntil)
- BREAKING: `getMiniflareWaitUntil()` is replaced by `waitOnExecutionContext()` from `cloudflare:test`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#work-with-waituntil)
- BREAKING: `waitOnExecutionContext()` now returns `Promise<void>` instead of a `Promise` resolving to `waitUntil()`ed `Promise`s results. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#work-with-waituntil)
- REMOVED: `getMiniflareFetchMock()` is no longer available; mock `globalThis.fetch` directly. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#mock-outbound-requests)
- BREAKING: Durable Object helpers (`getMiniflareDurableObjectStorage()`, `getMiniflareDurableObjectState()`, `getMiniflareDurableObjectInstance()`, `runWithMiniflareDurableObjectGates()`) are replaced by a single `runInDurableObject()` from `cloudflare:test`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#use-durable-object-helpers)
- BREAKING: `flushMiniflareDurableObjectAlarms()` is replaced by `runDurableObjectAlarm()` from `cloudflare:test`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#use-durable-object-helpers)
- BREAKING: `getMiniflareDurableObjectIds()` is replaced by `listDurableObjectIds()` from `cloudflare:test`, which accepts `DurableObjectNamespace`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md#use-durable-object-helpers)
- BREAKING: The `unstable_dev` API from `wrangler` is replaced by using `exports` from `cloudflare:workers` for `fetch` events. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev.md#reference-a-worker-for-integration-testing)
- REMOVED: `worker.stop()` is no longer needed/available with Workers Vitest integration. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev.md#stop-a-worker)
- BREAKING: Wrangler configuration is now imported via `cloudflareTest({ wrangler: { configPath: "wrangler.jsonc" } })` in `vitest.config.js`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev.md#import-wrangler-configuration)
- REMOVED: `UnstableDevWorker` imports from `wrangler` are no longer needed. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev.md#define-types)

**Also changed:** `cloudflareTest()` Vite plugin new · `createExecutionContext()` new · `waitOnExecutionContext()` new · `runInDurableObject()` new · `runDurableObjectAlarm()` new · `listDurableObjectIds()` new · `exports` from `cloudflare:workers` new

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Keep your `compatibility_date` current — Setting `compatibility_date` to today's date on new projects ensures access to the latest runtime features and bug fixes. Periodically updating it on existing projects provides new APIs and fixes without code changes. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#keep-your-compatibility-date-current)

- Enable `nodejs_compat` — Enable the `nodejs_compat` compatibility flag to give your Worker access to Node.js built-in modules, avoiding cryptic import errors at runtime, especially when using libraries that depend on them. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#enable-nodejs_compat)

- Generate binding types with `wrangler types` — Avoid hand-writing `Env` interfaces; instead, run `wrangler types` to automatically generate a type definition file that matches your Wrangler configuration. This catches mismatches at compile time rather than deploy time. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#generate-binding-types-with-wrangler-types)

- Store secrets with `wrangler secret`, not in source — Never include secrets (API keys, tokens, database credentials) directly in your Wrangler configuration or source code. Use `wrangler secret put` for secure storage and access them via `env` at runtime. For local development, use `.env` files with `.gitignore`. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#store-secrets-with-wrangler-secret-not-in-source)

- Configure environments deliberately — Use Wrangler environments to deploy the same code to distinct Workers (e.g., production, staging). Be aware that bindings and variables are not inherited between environments, and the root Worker is a separate deployment. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#configure-environments-deliberately)

- Set up custom domains or routes correctly — Understand the difference between custom domains (Worker is the origin, auto DNS/SSL) and routes (Worker in front of existing origin, requires proxied DNS record). For routes without a real origin, use a proxied `AAAA` record pointing to `100::` as a placeholder. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#set-up-custom-domains-or-routes-correctly)

- Stream request and response bodies — Always stream large request and response bodies using `TransformStream` to reduce peak memory usage and improve time-to-first-byte, as Workers have a 128 MB memory limit. Enforce maximum sizes for bodies you consume entirely. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#stream-request-and-response-bodies)

- Use `waitUntil` for work after the response — Utilize `ctx.waitUntil()` to perform non-critical background tasks (analytics, cache writes, logging) after sending the response to the client. This keeps response times fast. Avoid destructuring `ctx` as it breaks the `this` binding. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#use-waituntil-for-work-after-the-response)

- Use bindings for Cloudflare services, not REST APIs — Access Cloudflare services like R2, KV, D1, Queues, and Workflows via bindings instead of REST APIs. Bindings provide direct, in-process references without network hops, authentication, or extra latency. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#use-bindings-for-cloudflare-services-not-rest-apis)

- Use Queues and Workflows for async and background work — For long-running, retryable, or non-urgent tasks, leverage Queues (for decoupling producers/consumers, fan-out, simple background jobs) and Workflows (for multi-step, durable, long-running processes) to move work out of the critical request path. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#use-queues-and-workflows-for-async-and-background-work)

- Use service bindings for Worker-to-Worker communication — When Workers need to communicate, use service bindings. They are zero-cost, bypass the public internet, and support type-safe RPC, making inter-Worker communication efficient and secure. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#use-service-bindings-for-worker-to-worker-communication)

- Use Hyperdrive for external database connections — Always connect to remote PostgreSQL or MySQL databases via Hyperdrive. It maintains a regional connection pool, eliminating per-request overhead (TCP handshake, TLS negotiation) and caching query results. Create a new `Client` per request. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#use-hyperdrive-for-external-database-connections)

- Enable Workers Logs and Traces — Enable logs and traces in your Wrangler configuration before deploying to production. Use `head_sampling_rate` to manage volume and costs. Prefer structured JSON logging with `console.log` for searchability and `console.error` for error severity. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#enable-workers-logs-and-traces)

- Do not store request-scoped state in global scope — Avoid storing request-scoped state in global variables, as Workers reuse isolates and this can lead to data leaks or stale state between requests. Instead, pass state through function arguments or store it on `env` bindings. [source](./.skilld/references/@cloudflare/vitest-pool-workers@0.16.10/docs/workers/best-practices/workers-best-practices.md#do-not-store-request-scoped-state-in-global-scope)
<!-- /skilld:best-practices -->

Related: zod-skilld

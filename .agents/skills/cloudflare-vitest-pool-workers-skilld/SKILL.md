---
name: cloudflare-vitest-pool-workers-skilld
description: "ALWAYS use when writing code importing \"@cloudflare/vitest-pool-workers\". Consult for debugging, best practices, or modifying @cloudflare/vitest-pool-workers, cloudflare/vitest-pool-workers, cloudflare vitest-pool-workers, cloudflare vitest pool workers, workers-sdk, workers sdk."
metadata:
  version: 0.16.13
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# cloudflare/workers-sdk `@cloudflare/vitest-pool-workers@0.16.13`
**Tags:** latest: 0.16.13

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @cloudflare/vitest-pool-workers` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @cloudflare/vitest-pool-workers` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `new ExecutionContext()` constructor removed — use `createExecutionContext()` instead for creating execution context instances [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L718:730)

- BREAKING: `getMiniflareWaitUntil(ctx)` removed — replaced by `waitOnExecutionContext(ctx)` which now returns `Promise<void>` instead of a Promise resolving to all waitUntil() results [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L718:730)

- BREAKING: `getMiniflareFetchMock()` function removed — to mock outbound fetch() requests, use `globalThis.fetch` mocking directly or ecosystem libraries such as MSW instead [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L730:736)

- BREAKING: Durable Object test helpers consolidated — `getMiniflareDurableObjectStorage()`, `getMiniflareDurableObjectState()`, `getMiniflareDurableObjectInstance()`, and `runWithMiniflareDurableObjectGates()` all replaced by single `runInDurableObject()` function [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L736:750)

- BREAKING: `flushMiniflareDurableObjectAlarms()` removed — replaced by `runDurableObjectAlarm(stub)` which accepts a single DurableObjectStub and returns Promise<boolean> [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L750:756)

- BREAKING: `getMiniflareDurableObjectIds()` removed — replaced by `listDurableObjectIds(namespace)` which now accepts DurableObjectNamespace instance instead of string for stricter typing [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L756:762)

- DEPRECATED: `env` export from `cloudflare:test` module — use `import { env } from "cloudflare:workers"` instead [source](./.skilld/pkg/types/cloudflare-test.d.ts:L3:5)

- DEPRECATED: `SELF` binding from `cloudflare:test` module — use `import { exports } from "cloudflare:workers"` and `exports.default.fetch()` instead [source](./.skilld/pkg/types/cloudflare-test.d.ts:L11:13)

- NEW: `reset()` function — resets all data from all attached bindings for test isolation [source](./.skilld/pkg/types/cloudflare-test.d.ts:L61)

- NEW: `abortAllDurableObjects()` function — resets all Durable Object instances without deleting persisted data [source](./.skilld/pkg/types/cloudflare-test.d.ts:L77)

- NEW: `adminSecretsStore()` function — provides admin API for secrets store binding to create, update, delete, and list secrets [source](./.skilld/pkg/types/cloudflare-test.d.ts:L170:172)

- NEW: `introspectWorkflowInstance()` — creates introspector for specific Workflow instance to modify behavior and await outcomes (available in v0.9.0+) [source](./.skilld/pkg/types/cloudflare-test.d.ts:L176:202)

- NEW: `introspectWorkflow()` — creates introspector for Workflow where instance IDs are unknown, allowing modifications for all subsequently created instances (available in v0.9.0+) [source](./.skilld/pkg/types/cloudflare-test.d.ts:L205:230)

- NEW: `cloudflareTest()` Vite plugin — replaces `vitest-environment-miniflare` environment; configure via `plugins` array in vitest.config with miniflare options and wrangler config paths [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md:L643:690)

- NEW: TypeScript configuration — update `tsconfig.json` to include `"@cloudflare/vitest-pool-workers/types"` in compiler options instead of old `"vitest-environment-miniflare/globals"` [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L680:690)

- NEW: Storage isolation per test file — automatically provided by Workers Vitest integration, no need for `setupMiniflareIsolatedStorage()` setup function [source](./.skilld/docs/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2.md:L706:716)

- NEW: `exports` from `cloudflare:workers` — provides access to main Worker's exports for integration testing with automatic hot-module reloading [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L661:667)

- NEW: `createScheduledController()` — creates ScheduledController instance for testing scheduled() handlers with scheduledTime and cron options [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L688:693)

- NEW: `createMessageBatch()` — creates MessageBatch for testing queue() exported handlers [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L696:697)

- NEW: `getQueueResult()` — gets acknowledged/retry state of messages in MessageBatch and waits for waitUntil() promises [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L698:703)

- NEW: `applyD1Migrations()` — applies D1 migrations from migrations array within tests, with automatic migration state tracking [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L742:743)

- NEW: `readD1Migrations()` — reads D1 migrations from migrations directory as Node.js module, exported from `@cloudflare/vitest-pool-workers/config` [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md:L689:699)

**Also changed:** `buildPagesASSETSBinding()` for Pages ASSETS binding · service worker format unsupported (migrate to ES modules) · `unstable_dev` API fully replaced · `cloudflarePool()` direct plugin export · `additionalExports` config option for virtual module re-exports
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `cloudflareTest()` Vite plugin with `wrangler.configPath` to inherit Worker configuration automatically instead of duplicating settings — this ensures tests use the same bindings, compatibility dates, and environment as production [source](./.skilld/docs/workers/testing/vitest-integration/write-your-first-test.md#define-vitest-configuration)

- Set compatibility date to `2022-10-31` or later and ensure Worker uses ES modules format — the integration requires these baselines to function correctly [source](./.skilld/docs/workers/testing/vitest-integration/write-your-first-test.md#prerequisites)

- Always `await` all storage operations (KV, R2, D1, Cache) before running test assertions — even if you're not asserting the result, consuming response bodies and awaiting puts/gets prevents storage state leakage between test files [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#await-all-storage-operations)

- Use `createExecutionContext()` and `waitOnExecutionContext()` for unit tests to handle asynchronous side effects — `waitOnExecutionContext()` waits for all `ctx.waitUntil()` Promises to settle before assertions run [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md#events)

- Prefer integration tests with `exports.default.fetch()` only when testing global mocks and module caching together — for tests closer to production behaviour, use auxiliary Workers configured via `miniflare.workers` array [source](./.skilld/docs/workers/testing/vitest-integration/write-your-first-test.md#integration-tests)

- Storage isolation is per test file by default — to share storage across test files for integration tests, run with `--max-workers=1 --no-isolate` flags instead of relying on default concurrent isolation [source](./.skilld/docs/workers/testing/vitest-integration/isolation-and-concurrency.md#isolation-model)

- Explicitly dispose Workflow introspectors with `await using` or call `.dispose()` to prevent test state leakage — skipping disposal causes instance state to persist across tests and breaks per-file storage isolation [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md#workflows)

- Use `readD1Migrations()` and `applyD1Migrations()` from config package to manage database schema in tests — apply migrations in `setupFiles` using the migration array bound via `miniflare.bindings` [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md#readd1migrationsmigrationspath)

- Only use Istanbul/instrumented code coverage, not V8 native coverage — the integration does not support V8 due to the Workers runtime environment [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#coverage)

- Avoid dynamic `import()` inside `export default { ... }` handlers or Durable Object event handlers — use static imports in global scope or call handlers directly instead [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#dynamic-importstatements-with-exports-and-durable-objects)

- Use `runInDurableObject()` to run code inside a Durable Object instance for method calls, state inspection, and data seeding — this is safer than calling fetch directly as it avoids module resolution differences [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md#durable-objects)

- Define `ProvidedEnv` interface with ambient module declaration to type-safe access `env` in tests — wire environment types once to prevent type mismatches between test and Worker code [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md#cloudflareworkers-exports)

- Do not rely on fake timers for KV, R2, and Cache operations — `vi.useFakeTimers()` does not affect these services, so TTL expiry and time-based logic must be tested differently [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#fake-timers)

- Use `additionalExports` configuration option when Worker re-exports from virtual modules or uses wildcard exports that esbuild cannot resolve statically [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#missing-properties-on-ctxexports)

- Enable Vite SSR optimizer for dependencies with ES Module conflicts (e.g., `require()` errors) via `test.deps.optimizer.ssr` configuration — bundle problematic packages to resolve Node.js/ESM mismatch issues [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md#module-resolution)
<!-- /skilld:best-practices -->

Related: zod-skilld, wrangler-skilld

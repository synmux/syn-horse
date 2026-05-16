---
name: cloudflare-vitest-pool-workers-skilld
description: 'ALWAYS use when writing code importing "@cloudflare/vitest-pool-workers". Consult for debugging, best practices, or modifying @cloudflare/vitest-pool-workers, cloudflare/vitest-pool-workers, cloudflare vitest-pool-workers, cloudflare vitest pool workers, workers-sdk, workers sdk.'
metadata:
  version: 0.16.6
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# cloudflare/workers-sdk `@cloudflare/vitest-pool-workers@0.16.6`

**Tags:** latest: 0.16.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @cloudflare/vitest-pool-workers` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @cloudflare/vitest-pool-workers` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for @cloudflare/vitest-pool-workers — prioritise recent major/minor releases and breaking changes.

### Core Pool & Plugin APIs

- NEW: `cloudflareTest()` — Vite plugin for Workers testing integration [source](./.skilld/pkg/dist/pool/index.d.mts:L90)
  Primary entry point for configuring the Vitest pool. Accepts either direct options or an async function returning options. Replaces separate test configuration approaches in earlier versions.

- NEW: `cloudflarePool()` — Pool runner initializer for Vitest [source](./.skilld/pkg/dist/pool/index.d.mts:L93)
  Creates the test pool instance that runs tests inside the Workers runtime. Works with `cloudflareTest()` to establish the complete testing environment.

- NEW: `WorkersPoolOptions` — Configuration schema with Zod validation [source](./.skilld/pkg/dist/pool/index.d.mts:L77)
  Supports: `main` (entrypoint), `remoteBindings`, `additionalExports`, `miniflare` (Worker options), `wrangler` (config path and environment). The `additionalExports` field maps module names to export types: `"WorkerEntrypoint"`, `"DurableObject"`, or `"WorkflowEntrypoint"`.

### Binding & Context APIs

- NEW: `env` export from `cloudflare:workers` — ProvidedEnv type for binding access [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Exposes the `env` object containing all configured bindings (KV, D1, Durable Objects, etc.). Use ambient module declaration to type `ProvidedEnv` for your specific bindings.

- NEW: `exports` export from `cloudflare:workers` — Access main Worker's exports [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Allows integration testing against the main Worker's handlers. Use `exports.default.fetch()` for fetch handler tests. Runs in same isolate as tests, so global mocks apply. Does NOT expose Assets (use `startDevWorker()` instead).

### Event & Handler Test APIs

- NEW: `createExecutionContext()` from `cloudflare:test` — Create ExecutionContext instances [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Required third argument for ES module format handlers. Use with `waitOnExecutionContext()` to await `ctx.waitUntil()` promises before assertions.

- NEW: `waitOnExecutionContext()` from `cloudflare:test` — Wait for context promises [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Blocks until all promises passed to `ctx.waitUntil()` settle. Only accepts instances from `createExecutionContext()`.

- NEW: `createScheduledController()` from `cloudflare:test` — Create ScheduledController for cron/scheduled tests [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Creates `ScheduledController` for scheduled handler tests. Accepts optional `FetcherScheduledOptions` with `scheduledTime` and `cron` properties.

- NEW: `createMessageBatch()` from `cloudflare:test` — Create Queue MessageBatch [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Creates `MessageBatch` for testing queue handlers. Each message requires `id`, `timestamp`, and `body`.

- NEW: `getQueueResult()` from `cloudflare:test` — Get queue ack/retry state [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Returns queue operation results: `ackAll`, `retryBatch`, `explicitAcks`, `retryMessages`. Waits for context promises.

### Durable Object Test APIs

- NEW: `runInDurableObject()` from `cloudflare:test` — Execute code inside Durable Object [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Temporarily replaces fetch handler with callback, sends request, returns result. Allows method calls and state inspection. Only works with stubs from `main` Worker.

- NEW: `runDurableObjectAlarm()` from `cloudflare:test` — Trigger scheduled alarm [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Immediately runs and removes scheduled Durable Object alarm. Returns `true` if alarm ran, `false` if none scheduled. Only works with `main` Worker objects.

- NEW: `listDurableObjectIds()` from `cloudflare:test` — List object IDs in namespace [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Returns all created object IDs in a namespace. Respects per-file storage isolation (objects from other test files not included).

### D1 & Migration APIs

- NEW: `readD1Migrations()` — Read D1 migrations from filesystem [source](./.skilld/pkg/dist/pool/index.d.mts:L106)
  Reads all migrations from `migrationsPath`, ordered by number. Splits each migration into array of SQL queries. Returns `D1Migration[]` array.

- NEW: `applyD1Migrations()` from `cloudflare:test` — Apply migrations to test database [source](./.skilld/pkg/dist/pool/index.d.mts:L1)
  Applies un-applied migrations to `D1Database`. Records state in `migrationsTableName` (defaults to `d1_migrations`). Call `readD1Migrations()` from Node to get migrations array.

### Workflows Test APIs (experimental)

- NEW: `introspectWorkflowInstance()` from `cloudflare:test` — Introspect specific Workflow instance [source](./.skilld/pkg/dist/pool/index.d.mts:L1) (experimental)
  Creates introspector for known instance ID. Supports `modify()` for disabling sleeps/retries, mocking steps, forcing timeouts. Use `await using` or explicit `dispose()` for test isolation. Available since v0.9.0.

- NEW: `introspectWorkflow()` from `cloudflare:test` — Introspect all Workflow instances [source](./.skilld/pkg/dist/pool/index.d.mts:L1) (experimental)
  Creates introspector that captures ALL instances created after initialization. Use `modifyAll()` to apply changes to all instances. Returns array via `get()`. Requires `dispose()` to prevent leaks.

- NEW: `WorkflowInstanceModifier` methods — Modify Workflow behaviour (experimental)
  - `disableSleeps()` — Disable sleeps (instant resolution)
  - `disableRetryDelays()` — Disable retry backoff (instant retry)
  - `mockStepResult()` — Mock step output
  - `mockStepError()` — Force step failure
  - `forceStepTimeout()` — Force step timeout
  - `mockEvent()` — Send event to `step.waitForEvent()`
  - `forceEventTimeout()` — Force event timeout

### Internal & Utility APIs

- NEW: `structuredSerializableStringify()` / `structuredSerializableParse()` — Serialise/deserialise structured data [source](./.skilld/pkg/dist/pool/index.d.mts:L114:L115)
  Internal utilities for preserving complex object types across isolate boundaries (used for `exports` and other bindings).

- NEW: `getRunnerName()` — Get test runner name [source](./.skilld/pkg/dist/pool/index.d.mts:L116)
  Returns runner name for a project/file combination. Used internally for test file isolation.

- NEW: `getDurableObjectDesignators()` — Get Durable Object binding details [source](./.skilld/pkg/dist/pool/index.d.mts:L126)
  Returns map of bound names to designators (`className`, `scriptName`, `unsafeUniqueKey`). Useful for introspection.

- NEW: `getProjectMiniflare()` — Get Miniflare instance for project [source](./.skilld/pkg/dist/pool/index.d.mts:L127)
  Internal API to retrieve Miniflare instance. Requires `Vitest` context, project, pool options, and optional main path.

- NEW: `maybeGetResolvedMainPath()` — Resolve main Worker path [source](./.skilld/pkg/dist/pool/index.d.mts:L128)
  Resolves configured `main` entrypoint to absolute path. Returns `undefined` if no main configured.

- NEW: `connectToMiniflareSocket()` — Connect to Worker via WebSocket [source](./.skilld/pkg/dist/pool/index.d.mts:L129)
  Low-level API to establish WebSocket connection to a Worker running in Miniflare. Used for `startDevWorker()` integration.

- NEW: `assertCompatibleVitestVersion()` — Validate Vitest compatibility [source](./.skilld/pkg/dist/pool/index.d.mts:L130)
  Runtime check for supported Vitest version. Throws if incompatible.

### Configuration & Export Handling

The package supports three explicit export types in `additionalExports`:

- `"WorkerEntrypoint"` — ES module Worker handler (default/fetch/scheduled/queue)
- `"DurableObject"` — Durable Object class
- `"WorkflowEntrypoint"` — Workflow handler (new in recent versions)

Configuration accepts optional `wrangler` section with `configPath` and `environment` to load wrangler.toml settings into tests. `remoteBindings` (default `false`) enables access to remote resources.

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices — @cloudflare/vitest-pool-workers v0.16.6

## Best Practices

- Use `readD1Migrations()` with async `cloudflareTest()` to load migrations from disk at configuration time, rather than embedding migrations or reading them manually — ensures migrations are applied in the correct order before tests run [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md:L682)

- Recognise that per-file storage isolation is the default behaviour; each test file gets its own isolated storage environment. For integration tests requiring shared state across files, explicitly run tests with `--max-workers=1 --no-isolate` flags [source](./.skilld/docs/workers/testing/vitest-integration/isolation-and-concurrency.md:L643)

- Always `await` all storage operations in test setup and teardown — without awaiting, storage writes may not complete before the test file exits and isolation cleanup occurs [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L674)

- Call `waitOnExecutionContext(ctx)` after each fetch/scheduled/queue handler invocation to ensure all `ctx.waitUntil()` promises have settled before running assertions on side effects [source](./.skilld/docs/workers/testing/vitest-integration/test-apis.md:L674)

- Consume the entire response body from `fetch()` or `R2.get()` calls even if you are not asserting its content — leaving bodies unconsumed can cause test isolation failures due to resource cleanup [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L700)

- Pass an async function to `cloudflareTest()` instead of a static object when configuration depends on runtime values such as reading files or constructing dynamic bindings — the function receives no arguments and should return the options object [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md:L663)

- Use the `using` keyword (or explicit `dispose()` calls) when calling RPC methods that return non-primitive values such as objects or classes extending `RpcTarget` — ensures resources are released before test file storage isolation cleanup [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L688)

- Do not attempt to use custom Vitest `environment` or `runner` configurations — the Workers pool does not support these and they will be ignored [source](./.skilld/docs/workers/testing/vitest-integration/configuration.md:L648)

- Understand that Vitest's fake timers (`vi.useFakeTimers()`) do not apply to KV, R2, or Cache API simulators — expiration cannot be tested by advancing fake time [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L650)

- Use only static `import` statements in `export default { fetch() {} }` handlers and Durable Object event handlers — dynamic `import()` statements are not supported in these contexts [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L656)

- Run Vitest with `--inspect=port --no-file-parallelism` flags when debugging; this opens an inspector port and disables parallel test execution to avoid multiple processes competing for the debugger [source](./.skilld/docs/workers/testing/vitest-integration/debugging.md:L639)

- Be aware that `nodejs_compat` is automatically injected as a compatibility flag — your Worker will have Node.js globals and APIs available in tests that are not available in production unless you explicitly enable this flag in `wrangler.jsonc` [source](./.skilld/docs/workers/testing/vitest-integration/isolation-and-concurrency.md:L657)

- Use the `additionalExports` configuration option when virtual modules or complex build setups prevent esbuild from statically inferring exports — map export names to their types (`WorkerEntrypoint`, `DurableObject`, or `WorkflowEntrypoint`) [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L722)

- Use Istanbul instrumentation for code coverage reporting instead of V8 native coverage — the Workers pool does not support native V8 code coverage [source](./.skilld/docs/workers/testing/vitest-integration/known-issues.md:L644)
<!-- /skilld:best-practices -->

Related: zod-skilld, wrangler-skilld

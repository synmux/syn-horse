---
name: vitest-skilld
description: "ALWAYS use when writing code importing \"vitest\". Consult for debugging, best practices, or modifying vitest."
metadata:
  version: 4.1.8
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# vitest-dev/vitest `vitest@4.1.8`
**Tags:** latest: 4.1.8, beta: 5.0.0-beta.4, V3: 3.2.6

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p vitest` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vitest` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Vitest 4.1.8 API Changes

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

### Vitest 4.0 Breaking Changes

- BREAKING: `vi.fn().getMockName()` — now returns `vi.fn()` by default instead of `spy`; affects snapshots with mocks where name changes from `[MockFunction spy]` to `[MockFunction]` [source](./.skilld/docs/guide/migration.md:L156)

- BREAKING: `vi.restoreAllMocks` — no longer resets state of spies; only restores manually created spies via `vi.spyOn`, automocks no longer affected [source](./.skilld/docs/guide/migration.md:L157)

- BREAKING: `coverage.all` and `coverage.extensions` config options removed — v4 defaults to include only covered files instead of all files [source](./.skilld/docs/guide/migration.md:L30:77)

- BREAKING: `maxThreads` and `maxForks` config options — renamed to `maxWorkers`; `singleThread` and `singleFork` replaced with `maxWorkers: 1, isolate: false` [source](./.skilld/docs/guide/migration.md:L329:335)

- BREAKING: `poolOptions` config option removed — all previous `poolOptions` are now top-level options; `memoryLimit` renamed to `vmMemoryLimit` [source](./.skilld/docs/guide/migration.md:L332)

- BREAKING: `workspace` config option replaced with `projects` — functionally identical but cannot specify another file as source [source](./.skilld/docs/guide/migration.md:L231:264)

- BREAKING: Browser provider configuration — now accepts object instead of string; `provider: 'playwright'` becomes `provider: playwright({})` [source](./.skilld/docs/guide/migration.md:L268:293)

- BREAKING: `@vitest/browser/context` import — moved to `vitest/browser`; `@vitest/browser/utils` also moved to `vitest/browser` exports [source](./.skilld/docs/guide/migration.md:L297:316)

- BREAKING: Reporter lifecycle APIs — `onCollected`, `onSpecsCollected`, `onPathsCollected`, `onTaskUpdate`, `onFinished` removed; see `Reporters API` for new alternatives [source](./.skilld/docs/guide/migration.md:L423:424)

- BREAKING: `basic` reporter removed — use `default` reporter with `summary: false` instead [source](./.skilld/docs/blog/vitest-4.md:L293:303)

- BREAKING: Deprecated APIs removed — `poolMatchGlobs`, `environmentMatchGlobs`, `deps.external`, `deps.inline`, `deps.fallbackCJS`, `browser.testerScripts`, `minWorkers`, and third-argument test options syntax [source](./.skilld/docs/guide/migration.md:L486:502)

- BREAKING: `coverage.ignoreEmptyLines` and `coverage.experimentalAstAwareRemapping` removed — AST-aware remapping is now the default [source](./.skilld/docs/guide/migration.md:L30:32)

- BREAKING: Constructor mocking — `vi.spyOn(cart, 'Apples').mockImplementation()` must now use `function` keyword or `class` for proper `new` keyword support [source](./.skilld/docs/guide/migration.md:L121:150)

- BREAKING: Test options argument position — no longer supports test options as third argument; must be second argument instead: `test('name', { retry: 2 }, () => {})` [source](./.skilld/docs/guide/migration.md:L491:502)

### Vitest 4.0 New APIs

- NEW: `expect.assert` — access to Chai's assert directly via `expect.assert()` for type narrowing [source](./.skilld/docs/blog/vitest-4.md:L235:257)

- NEW: `expect.schemaMatching` — asymmetric matcher that validates values against Standard Schema v1 objects; works with Zod, Valibot, ArkType [source](./.skilld/docs/blog/vitest-4.md:L259:289)

- NEW: `expect.element().toBeInViewport()` — checks if element is in viewport using IntersectionObserver API [source](./.skilld/docs/blog/vitest-4.md:L166:174)

- NEW: `page.frameLocator()` — Playwright API to find elements inside iframes (Playwright provider only) [source](./.skilld/docs/blog/vitest-4.md:L184:196)

- NEW: `experimental_parseSpecifications()` — API method to parse test file without running it [source](./.skilld/docs/blog/vitest-4.md:L323)

- NEW: `watcher` API method — exposes methods for custom Vitest watcher implementations [source](./.skilld/docs/blog/vitest-4.md:L324)

- NEW: `enableCoverage()` and `disableCoverage()` — API methods to dynamically enable/disable coverage [source](./.skilld/docs/blog/vitest-4.md:L325)

- NEW: `getSeed()` API method — returns seed value when tests run at random [source](./.skilld/docs/blog/vitest-4.md:L326)

- NEW: `getGlobalTestNamePattern()` API method — returns current test name pattern [source](./.skilld/docs/blog/vitest-4.md:L327)

- NEW: `waitForTestRunEnd()` API method — returns promise that resolves when all tests finish [source](./.skilld/docs/blog/vitest-4.md:L328)

### Vitest 4.1 New APIs and Features

- NEW: `vi.defineHelper()` — wraps a function so internals are removed from stack traces, pointing error back to call site instead [source](./.skilld/docs/blog/vitest-4-1.md:L299:313)

- NEW: `mockThrow()` and `mockThrowOnce()` — concise API for making mocks throw errors without wrapping in function [source](./.skilld/docs/blog/vitest-4-1.md:L396:404)

- NEW: `page.mark()` and `locator.mark()` — APIs for adding custom markers to Playwright trace viewer [source](./.skilld/docs/blog/vitest-4-1.md:L187:205)

- NEW: `aroundAll` and `aroundEach` hooks — wrap all suites and individual tests with context (e.g., transactions, tracing spans) [source](./.skilld/docs/blog/vitest-4-1.md:L265:293)

- NEW: Test Tags feature — label and filter tests using `tags` configuration with custom options [source](./.skilld/docs/blog/vitest-4-1.md:L58:116)

- NEW: `test.extend()` builder pattern — new syntax with type inference for fixtures without manual type declarations [source](./.skilld/docs/blog/vitest-4-1.md:L209:241)

- NEW: `detectAsyncLeaks` configuration — enables async leak detection via `node:async_hooks` with source locations [source](./.skilld/docs/blog/vitest-4-1.md:L317:337)

- NEW: Chai-style mocking assertions — support for `expect(fn).to.have.been.called`, `calledWith()`, `returned()` matching Jest-style equivalents [source](./.skilld/docs/blog/vitest-4-1.md:L419:434)

**Also changed:** `vi.spyOn()` on mock returns same mock · `mock.settledResults` populated immediately with `'incomplete'` result · Automocked instance methods now properly isolated · Automocked getters no longer call original, return `undefined` by default · `vi.fn(implementation).mockReset()` correctly returns mock implementation · `vi.fn().mock.invocationCallOrder` starts with `1` (like Jest) instead of `0` · `coverage.ignoreEmptyLines` removed (lines without code excluded from reports) · `coverage.experimentalAstAwareRemapping` removed (now default) · Snapshots with custom elements now print shadow root contents · `VITEST_MAX_THREADS`/`VITEST_MAX_FORKS` environment variables replaced with `VITEST_MAX_WORKERS` · Simplified `exclude` only removes `node_modules` and `.git` by default · `coverage.changed` option added to limit coverage to changed files · Coverage ignore hints (`/* istanbul ignore start */` / `/* v8 ignore start */`) now supported in both providers · `browser.detailsPanelPosition` added for UI layout control · `experimental.viteModuleRunner` flag to disable module runner (native Node.js execution) · `--tags-filter` CLI option with `and`/`or`/`not` operators · Reporter changes: `verbose` now always prints one-by-one, `tree` reporter for previous tree behavior · HTML coverage now works reliably across UI, reporter, and browser modes
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Vitest v4.1.8 Best Practices

## Best Practices

- Disable test isolation for projects without side effects — runs tests in the same process and dramatically improves performance when cleanup is reliable, especially for projects using `node` environment [source](./.skilld/docs/guide/improving-performance.md#test-isolation)

- Use the builder pattern with `test.extend()` for automatic type inference — return values from fixture factories instead of the `use()` callback, eliminating manual type declarations and catching scope violations at compile time [source](./.skilld/docs/guide/test-context.md#builder-pattern)

- Use `expect.soft()` to report multiple assertion failures in a single test — continues test execution on failure instead of terminating, allowing reporters to show all failures together [source](./.skilld/docs/api/expect.md#soft)

- Use `expect.poll()` for flaky assertions in async code — retries the assertion callback until success with configurable `interval` and `timeout`, preferred over manual wait loops [source](./.skilld/docs/api/expect.md#poll)

- Apply test tags with shared configuration for cross-cutting concerns — define tags in config with options like `retry` and `timeout`, then apply tags to tests to inherit those options automatically [source](./.skilld/docs/blog/vitest-4-1.md#test-tags)

- Use `{ spy: true }` option with `vi.mock()` in browser mode instead of `vi.spyOn()` — browser module namespaces are sealed and cannot be reconfigured, so spying requires the `spy: true` option [source](./.skilld/docs/guide/mocking/modules.md#browser-mode-support)

- Call suite-level hooks on the extended `test` object, not global hooks — suite-level hooks on custom test objects can access file-scoped and worker-scoped fixtures, while global hooks cannot [source](./.skilld/docs/guide/test-context.md#suite-level-hooks)

- Use `--merge-reports` with `--shard` for distributed CI builds — split test files across machines with `--reporter=blob --shard=N/total`, then merge blob reports in a final job to handle large suites [source](./.skilld/docs/guide/improving-performance.md#sharding)

- Use `test.concurrent` only for tests with async operations — synchronous concurrent tests still block the JavaScript thread, so benefits only apply to tests awaiting network, timers, or I/O [source](./.skilld/docs/guide/parallelism.md#test-parallelism)

- Use context-bound `expect` in concurrent snapshot tests — import `expect` from the test context parameter rather than globally to ensure correct test tracking across parallel execution [source](./.skilld/docs/guide/snapshot.md#use-snapshots)

- Use `defineConfig` from `vitest/config` with type reference for full type safety — when extending Vite config, add `/// <reference types="vitest/config" />` to enable autocomplete and validation of test options [source](./.skilld/docs/config/index.md#configuring-vitest)

- Use `test.override()` for fixture variations in nested suites — override fixture values for specific describe blocks instead of creating separate tests, providing cleaner scoping and inheritance [source](./.skilld/docs/guide/test-context.md#overriding-fixture-values)

- Enable `experimental.fsModuleCache` in watch mode for multi-run performance — persists transform cache to disk across reruns, reducing repeated parse/transform work when rerunning single files with large module graphs [source](./.skilld/docs/guide/improving-performance.md#caching-between-reruns)
<!-- /skilld:best-practices -->

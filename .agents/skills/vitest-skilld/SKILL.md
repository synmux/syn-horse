---
name: vitest-skilld
description: "ALWAYS use when writing code importing \"vitest\". Consult for debugging, best practices, or modifying vitest."
metadata:
  version: 4.1.9
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# vitest-dev/vitest `vitest@4.1.9`
**Tags:** beta: 5.0.0-beta.5, V3: 3.2.6, latest: 4.1.9

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vitest` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vitest` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Vitest v4.1.9 API Changes

This document captures version-specific API changes in vitest v4.1.9, focusing on APIs that changed between versions and may not match LLM training data.

## API Changes

### Major Version Transitions (v3 → v4)

- BREAKING: `maxThreads` and `maxForks` renamed to `maxWorkers` — simplifies pool configuration; use `maxWorkers` instead [source](./.skilld/docs/guide/migration.md:L329)

- BREAKING: `singleThread` and `singleFork` replaced with `maxWorkers: 1, isolate: false` — pool rework in v4 removed these explicit options [source](./.skilld/docs/guide/migration.md:L331)

- BREAKING: `poolOptions` config removed entirely — all poolOptions are now top-level config; `memoryLimit` renamed to `vmMemoryLimit` [source](./.skilld/docs/guide/migration.md:L332)

- BREAKING: Custom pool interface completely rewritten — if using custom pools, see migration guide for new interface requirements [source](./.skilld/docs/guide/migration.md:L334)

- BREAKING: Browser provider configuration changed from string to object — `provider: 'playwright'` becomes `provider: playwright({ launchOptions: {...} })` [source](./.skilld/docs/guide/migration.md#browser-provider-rework)

- BREAKING: `@vitest/browser` package no longer needed — use `vitest/browser` instead; `@vitest/browser/context` and `@vitest/browser/utils` both move to `vitest/browser` [source](./.skilld/docs/guide/migration.md:L297)

- BREAKING: Reporter APIs `onCollected`, `onSpecsCollected`, `onPathsCollected`, `onTaskUpdate`, `onFinished` removed — use new reporter APIs from v3.0.0 [source](./.skilld/docs/guide/migration.md#reporter-updates)

- BREAKING: `basic` reporter removed — use `['default', { summary: false }]` configuration instead [source](./.skilld/docs/guide/migration.md#reporter-updates)

- BREAKING: `verbose` reporter now prints flat test list — use `--reporter=tree` to restore previous hierarchical output [source](./.skilld/docs/guide/migration.md:L440)

- BREAKING: `vi.fn().getMockName()` returns `vi.fn()` instead of `spy` — affects snapshots containing mock names; spies from `vi.spyOn` keep original names [source](./.skilld/docs/guide/migration.md:L156)

- BREAKING: `vi.restoreAllMocks` only restores manual `vi.spyOn` spies; automocks no longer affected — use `.mockRestore` on individual mocks if needed [source](./.skilld/docs/guide/migration.md:L157)

- BREAKING: `mock.settledResults` populated immediately with `'incomplete'` status — status changes after promise settles instead of populating on demand [source](./.skilld/docs/guide/migration.md:L159)

- BREAKING: Automocked methods can no longer be restored with `.mockRestore` — exception for `spy: true` automocks [source](./.skilld/docs/guide/migration.md:L181)

- BREAKING: Automocked getters return `undefined` by default, not original value — use `vi.spyOn(object, name, 'get')` to spy on getters instead [source](./.skilld/docs/guide/migration.md:L182)

- BREAKING: `vi.fn().mock.invocationCallOrder` now starts at 1 — matches Jest behaviour instead of v3's 0-based counting [source](./.skilld/docs/guide/migration.md:L184)

- BREAKING: `coverage.all` option removed; only covered files included by default — must set `coverage.include` to include uncovered files [source](./.skilld/docs/guide/migration.md:L41)

- BREAKING: `coverage.extensions` option removed — extensions are now inferred from `coverage.include` patterns [source](./.skilld/docs/guide/migration.md:L37)

- BREAKING: `test()` third-argument options syntax removed — use second argument for options instead; timeout as number still supported [source](./.skilld/docs/guide/migration.md:L491)

### v4.1 New Features

- NEW: `doMock()` returns a disposable for cleanup — call the returned function to restore the mock without using `vi.unmock()` [source](./.skilld/releases/v4.1.0.md:L15)

- NEW: `aroundEach` and `aroundAll` hooks — wrap each test or suite with setup/teardown logic; receives `runTest`/`runSuite` callback that must be invoked [source](./.skilld/releases/v4.1.0.md:L23)

- NEW: `test.extend()` builder pattern with type inference — return values directly from fixture factory instead of using `use()` callback; types inferred automatically [source](./.skilld/releases/v4.1.0.md:L27)

- NEW: `mockThrow()` and `mockThrowOnce()` methods — make mocks throw errors concisely without wrapping in `.mockImplementation(() => { throw ... })` [source](./.skilld/releases/v4.1.0.md:L33)

- NEW: `vi.defineHelper()` API — hides helper function internals from stack traces so errors point to call site instead of helper implementation [source](./.skilld/docs/blog/vitest-4-1.md#helper-for-better-stack-traces)

- NEW: Test tags with `tags` config option — label and filter tests by tags; supports `and`, `or`, `not` operators in `--tags-filter` [source](./.skilld/docs/blog/vitest-4-1.md#test-tags)

- NEW: `detectAsyncLeaks` config and `--detect-async-leaks` flag — tracks leaked timers, handles, and unresolved async resources via `node:async_hooks` [source](./.skilld/releases/v4.1.0.md:L32)

- NEW: `experimental.viteModuleRunner: false` — disable Vite module runner and run tests with native Node.js imports; no transforms applied, faster startup [source](./.skilld/docs/blog/vitest-4-1.md#experimental-vitemodulerunner-false)

- NEW: `browser.detailsPanelPosition` option — place UI details panel at `'right'` or `'bottom'` for flexible screen layouts [source](./.skilld/releases/v4.1.0.md:L47)

- NEW: `page.mark()` and `locator.mark()` APIs — add custom markers to Playwright trace timeline for better debugging [source](./.skilld/releases/v4.1.0.md:L36)

- NEW: Chai-style mocking assertions — `expect(fn).to.have.been.called`, `.to.have.been.calledWith()`, `.to.have.callCount()` complement traditional `toHaveBeen*` matchers [source](./.skilld/docs/blog/vitest-4-1.md#chai-style-mocking-assertions)

- NEW: `coverage.changed` option — report coverage only for modified files while running all tests [source](./.skilld/releases/v4.1.0.md:L54)

- NEW: `setTickMode()` for fake-timers control — added from sinon/fake-timers v15 upgrade for finer timer control [source](./.skilld/releases/v4.1.0.md:L17)

- NEW: `runTestFiles()` API — alternative to `runTestSpecifications` for programmatic test execution [source](./.skilld/releases/v4.1.0.md:L40)

- NEW: `toTestSpecification` method on reported tasks — convert test results back to test specifications [source](./.skilld/releases/v4.1.0.md:L19)

- NEW: `agent` reporter — minimal output mode for AI agents; suppresses passing test output to reduce token usage, auto-enabled in agent environments [source](./.skilld/releases/v4.1.0.md:L63)

- NEW: GitHub Actions job summary support — `github-actions` reporter auto-generates test summary with test statistics and flaky test permalinks [source](./.skilld/docs/blog/vitest-4-1.md#github-actions-job-summary)

- NEW: Chai-style assertions extended — support `eql`, `throw`, `be` and other chai matchers as alternatives to built-in matchers [source](./.skilld/releases/v4.1.0.md:L16)

### v4.1 Deprecations

- DEPRECATED: `toBe*` spy assertions in favour of `toHaveBeen*` — `toBeCalled` → `toHaveBeenCalled`, `toBeCalledWith` → `toHaveBeenCalledWith`, `toBeCalledTimes` → `toHaveBeenCalledTimes` [source](./.skilld/releases/v4.1.0.md:L104)

- DEPRECATED: Unused types in matcher context — several internal types removed from context; use standard expect/assertion APIs instead [source](./.skilld/releases/v4.1.0.md:L79)

- DEPRECATED: Several `vitest/*` entry points — specific entry points deprecated in v4.1 for future removal; prefer `vitest/node`, `vitest/browser`, `vitest/config` imports [source](./.skilld/releases/v4.1.0.md:L76)

- DEPRECATED: `test.scoped` in favour of `test.override` — scoped tests will be removed in next major version [source](./.skilld/docs/api/test.md:L315)

- DEPRECATED: `describe.sequential` — use `sequential: true` option in suite config instead [source](./.skilld/docs/api/describe.md:L223)

- DEPRECATED: `browser.isolate` config — use top-level `isolate` option instead [source](./.skilld/docs/config/browser/isolate.md:L1)

- DEPRECATED: `server` config option — option provided for backwards compatibility only; Vitest 4 uses different configuration approach [source](./.skilld/docs/config/server.md:L1)

- DEPRECATED: Synchronous `unmount()` in browser Vue testing — always `await` unmount, synchronous usage will be removed in next major [source](./.skilld/docs/api/browser/vue.md:L165)

### Breaking Changes in v4.0

- BREAKING: V8 coverage remapping now uses AST-based analysis — produces more accurate results than v8-to-istanbul; expect different coverage numbers [source](./.skilld/docs/guide/migration.md#v8-code-coverage-major-changes)

- BREAKING: `coverage.ignoreEmptyLines` removed — lines without runtime code no longer included by default [source](./.skilld/docs/guide/migration.md:L30)

- BREAKING: `coverage.experimentalAstAwareRemapping` removed — now always enabled, no longer configurable [source](./.skilld/docs/guide/migration.md:L31)

- BREAKING: `vitest/execute` entry point removed — was always internal; use public APIs instead [source](./.skilld/docs/guide/migration.md:L221)

- BREAKING: `__vitest_executor` no longer injected — replaced with `moduleRunner` instance in test runner [source](./.skilld/docs/guide/migration.md:L220)

- BREAKING: `VITE_NODE_DEPS_MODULE_DIRECTORIES` env var renamed to `VITEST_MODULE_DIRECTORIES` [source](./.skilld/docs/guide/migration.md:L219)

- BREAKING: `deps.optimizer.web` renamed to `deps.optimizer.client` — affects custom optimizer configurations [source](./.skilld/docs/guide/migration.md:L224)

- BREAKING: Custom environments must provide `viteEnvironment` — `transformMode` property no longer used [source](./.skilld/docs/guide/migration.md:L222)

- BREAKING: `poolMatchGlobs` and `environmentMatchGlobs` config removed — use `projects` instead [source](./.skilld/docs/guide/migration.md:L486)

- BREAKING: `deps.external`, `deps.inline`, `deps.fallbackCJS` moved under `server.deps` — use `server.deps.external`, etc. [source](./.skilld/docs/guide/migration.md:L488)

- BREAKING: `browser.testerScripts` removed — use `browser.testerHtmlPath` instead [source](./.skilld/docs/guide/migration.md:L489)

- BREAKING: `minWorkers` config option removed — only `maxWorkers` affects test execution now [source](./.skilld/docs/guide/migration.md:L490)

- BREAKING: Spy on constructors now supported — mocks called with `new` keyword construct instances; mock implementation must use `function` or `class` keyword [source](./.skilld/docs/guide/migration.md:L121)

- BREAKING: `vi.spyOn` on a mock returns same mock — prevents double-wrapping of mocks [source](./.skilld/docs/guide/migration.md:L158)

- BREAKING: Custom snapshots include shadow root contents — custom elements now print shadow DOM; use `printShadowRoot: false` to restore old behavior [source](./.skilld/docs/guide/migration.md:L451)

Also changed: `VITEST_MAX_THREADS`/`VITEST_MAX_FORKS` → `VITEST_MAX_WORKERS` · `experimental_parseSpecification` supports tests starting/ending with `test` · `createSpecification` accepts filters · `userEvent.wheel` API added · `filterNode` option for browser prettyDOM · Playwright persistent context support · Chai-style assertions (`eql`, `throw`, `be`, `instanceof`, etc.) · Coverage ignore hints updated · `coverage.ignoreClassMethods` now supported by V8 · Instance methods properly isolated in automocks · BlazeDiff replaces pixelmatch for screenshot diffs
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Vitest 4.1.9 Best Practices

## Best Practices

- Use `defineConfig` from `vitest/config` for type-safe configuration — ensures your config aligns with Vitest types and enables IDE autocomplete and validation [source](./.skilld/docs/guide/migration.md#vitest-4)

- Use `test.extend()` with the builder pattern to define fixtures with automatic type inference — preferred over object syntax for better developer experience and fewer type annotations [source](./.skilld/docs/guide/test-context.md#builder-pattern)

- Import directly from specific module exports rather than barrel files — importing from `date-fns/format` instead of `date-fns` reduces transform overhead and improves test performance significantly [source](./.skilld/docs/guide/profiling-test-performance.md#use-specific-entry-points)

- Use `deps.optimizer` to bundle heavy external dependencies — reduces import overhead for packages with many internal modules by combining them into a single file [source](./.skilld/docs/guide/profiling-test-performance.md#use-the-dependency-optimizer)

- Use `test.concurrent` with context-bound `expect` for snapshot tests instead of global expect — the context-bound API ensures snapshots are tracked correctly in parallel test execution [source](./.skilld/docs/guide/snapshot.md#inline-snapshots)

- Define `coverage.include` explicitly with glob patterns matching your source files — defaults changed in v4 to only include loaded files, requiring explicit configuration to see uncovered files [source](./.skilld/docs/guide/migration.md#removed-options-coverageall-and-coverageextensions)

- Remember that `vi.mock` calls are hoisted to the top of the file — call `vi.mock` before any imports of the module you're mocking, or use dynamic import patterns for conditional mocking [source](./.skilld/docs/guide/mocking.md#cheat-sheet)

- Use test tags to label and organize tests with shared configuration — tags let you apply timeout, retry, and other options to groups of tests and filter at runtime with patterns like `frontend && !flaky` [source](./.skilld/docs/blog/vitest-4-1.md#test-tags)

- Prefer the v8 coverage provider for most projects — v8 offers faster execution, lower memory usage, and accuracy equivalent to Istanbul since v3.2.0 with AST-based remapping [source](./.skilld/docs/guide/coverage.md#v8-provider)

- Return cleanup functions from `beforeAll` and `beforeEach` hooks instead of writing separate `afterAll` and `afterEach` — this keeps setup and teardown code together and simplifies test organization [source](./.skilld/docs/api/hooks.md#beforeeach)

- Enable `clearMocks`, `mockReset`, or `restoreMocks` configuration to automatically clean up mock state between tests — prevents test pollution from lingering mock side effects [source](./.skilld/docs/guide/mocking.md#cheat-sheet)

- Use `experimental.viteModuleRunner: false` for server-side tests that don't need Vite transforms — runs tests with native Node.js imports for closer-to-production behavior and faster startup (v4.1) [source](./.skilld/docs/blog/vitest-4-1.md#experimental-vitemodulerunner-false)

- Use context-bound `skip()` method for conditional test skipping with boolean expressions — `skip(condition)` in v3.1+ is cleaner than wrapping test logic in if-statements [source](./.skilld/docs/guide/test-context.md#skip)

- Enable `experimental.importDurations` to identify and optimize slow imports — prints a breakdown of the slowest modules to help target import performance bottlenecks [source](./.skilld/docs/guide/profiling-test-performance.md#file-import)
<!-- /skilld:best-practices -->

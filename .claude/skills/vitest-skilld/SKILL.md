---
name: vitest-skilld
description: "ALWAYS use when writing code importing \"vitest\". Consult for debugging, best practices, or modifying vitest."
metadata:
  version: 4.1.6
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# vitest-dev/vitest `vitest@4.1.6`
**Tags:** latest: 4.1.6, beta: 5.0.0-beta.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vitest` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vitest` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## Vitest v4.1.6 — API Changes

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

**v4.1.0 Major Release (2026-03-12):**

- NEW: `doMock()` — now returns a `Disposable` for cleanup [source](./.skilld/releases/v4.1.0.md:L15)

- NEW: `setTickMode()` — new timer control API for fake timers; replaces manual tick mode logic. Requires sinon/fake-timers v15+ [source](./.skilld/releases/v4.1.0.md:L17)

- NEW: `aroundEach()` and `aroundAll()` hooks — lifecycle hooks that wrap test/suite execution for setup/teardown. Replaces nested beforeEach/afterEach patterns [source](./.skilld/releases/v4.1.0.md:L23)

- NEW: `test.extend()` — new syntax for fixture-based test APIs with full type inference support [source](./.skilld/releases/v4.1.0.md:L27)

- NEW: `mockThrow()` and `mockThrowOnce()` — mock functions that throw errors instead of returning values [source](./.skilld/releases/v4.1.0.md:L33)

- NEW: `test.meta` — test options can now include custom metadata [source](./.skilld/releases/v4.1.0.md:L26)

- NEW: `test.tags` — tags support for test filtering and organization [source](./.skilld/releases/v4.1.0.md:L22)

- NEW: `test.fails` — Track expectedly failed tests in UI and CLI reporting [source](./.skilld/releases/v4.1.0.md:L21)

- NEW: `toTestSpecification()` — on reported tasks; allows passing down test cases for static collection [source](./.skilld/releases/v4.1.0.md:L19,L42)

- NEW: `expect.soft()` — support for soft assertions in snapshots; assertion continues on failure instead of stopping [source](./.skilld/releases/v4.1.0.md:L93)

- NEW: `userEvent.wheel()` API — browser mode API for wheel input events [source](./.skilld/releases/v4.1.0.md:L44)

- NEW: `runTestFiles()` — API method as alternative to `runTestSpecifications()` [source](./.skilld/releases/v4.1.0.md:L40)

- NEW: `allowWrite` and `allowExec` — API options for controlling test execution permissions [source](./.skilld/releases/v4.1.0.md:L41)

- NEW: Chai style assertions — Added support for chai assertions alongside existing Jest-style matchers [source](././.skilld/releases/v4.1.0.md:L16)

- NEW: `createSpecification` filters — filters parameter for static test specification creation [source](./.skilld/releases/v4.1.0.md:L39)

- DEPRECATED: `vitest/*` entry points — several import paths no longer recommended; use main `vitest` export [source](./.skilld/releases/v4.1.0.md:L76)

- DEPRECATED: `toBe*` spy assertions — `toBeCalledWith`, `toBeCalledTimes`, etc. deprecated in favor of `toHaveBeen*` and `toThrowError` [source](./.skilld/releases/v4.1.0.md:L104)

- DEPRECATED: Matcher context types — types in `MatcherState` marked deprecated; use type inference instead [source](./.skilld/releases/v4.1.0.md:L79)

- DEPRECATED: `sequential` test API — test option `sequential` and `test.sequential()` deprecated in v4.1.6; use `test(..., { concurrent: false })` instead [source](./.skilld/releases/v4.1.6.md:L12)

**v4.0.0 Major Release (v3 → v4 Migration):**

- BREAKING: V8 coverage remapping now uses AST-based analysis for accuracy; previously used `v8-to-istanbul` which was less precise [source](./.skilld/docs/guide/migration.md:L19-L32)

- BREAKING: `coverage.ignoreEmptyLines` removed — lines without runtime code no longer included in reports by default [source](./.skilld/docs/guide/migration.md:L30)

- BREAKING: `coverage.experimentalAstAwareRemapping` removed — AST remapping is now the only supported method [source](./.skilld/docs/guide/migration.md:L31)

- BREAKING: `coverage.all` removed — defaults to including only covered files; set `coverage.include` to restore previous behaviour [source](./.skilld/docs/guide/migration.md:L34-L44)

- BREAKING: `coverage.extensions` removed — extensions are inferred from `coverage.include` pattern [source](./.skilld/docs/guide/migration.md:L34)

- BREAKING: `vi.fn().getMockName()` — returns `"vi.fn()"` by default instead of `"spy"`; affects snapshots with mocks [source](./.skilld/docs/guide/migration.md:L156)

- BREAKING: `vi.restoreAllMocks()` — no longer resets automock state; only restores manually created spies with `vi.spyOn()`; use `.mockRestore()` for full reset [source](./.skilld/docs/guide/migration.md:L157)

- BREAKING: `vi.fn().mock.invocationCallOrder` — now starts with `1` (like Jest) instead of `0`; affects test assertions counting invocations [source](./.skilld/docs/guide/migration.md:L184)

- BREAKING: Automocked instance methods — now properly isolated per instance but share state with prototype; `.mockReset()` no longer breaks prototype inheritance [source](./.skilld/docs/guide/migration.md:L160)

- BREAKING: Automocked getters — no longer call original getter; return `undefined` by default; use `vi.spyOn(object, name, 'get')` to spy [source](./.skilld/docs/guide/migration.md:L182)

- BREAKING: Automocked methods cannot be restored — `vi.restoreAllMocks()` will not affect automocks; use `spy: true` for restorable mocks [source](./.skilld/docs/guide/migration.md:L181)

- BREAKING: `spyOn()` and `fn()` support constructors — arrow functions no longer work as mock constructors; use `function` keyword or `class` [source](./.skilld/docs/guide/migration.md:L123-L148)

- BREAKING: `VITE_NODE_DEPS_MODULE_DIRECTORIES` → `VITEST_MODULE_DIRECTORIES` environment variable renamed [source](./.skilld/docs/guide/migration.md:L219)

- BREAKING: `vitest/execute` entry point removed — was internal; use standard module runner instead [source](./.skilld/docs/guide/migration.md:L221)

- BREAKING: `deps.optimizer.web` → `deps.optimizer.client` — configuration key renamed [source](./.skilld/docs/guide/migration.md:L224)

- BREAKING: `workspace` config → `projects` — `workspace` option fully replaced; move `vitest.workspace.js` into `vitest.config.ts` [source](./.skilld/docs/guide/migration.md:L230-L264)

- BREAKING: Browser provider object API — `browser.provider` now accepts object from `@vitest/browser-*` instead of string name [source](./.skilld/docs/guide/migration.md:L268-L293)

- BREAKING: `@vitest/browser` package removed — no longer needed; use `vitest/browser` for context import instead [source](./.skilld/docs/guide/migration.md:L297)

- BREAKING: Custom environments no longer need `transformMode` — provide `viteEnvironment` instead; Vitest infers from env name [source](./.skilld/docs/guide/migration.md:L222)

**Also changed:**
`expect.poll()` with fake timers · Coverage ignore hints updated · `vi.mock({ spy: true })` node v8 coverage · `--detect-async-leaks` flag · `--update "new"` or `--update "all"` options · `filterNode` option to prettyDOM · Playwright persistent context · `vi.defineHelper()` improvements · `expect(..., message)` consistency · `experimental.preParse` flag · `browser.locators.exact` option · `TestAttachment.bodyEncoding` · Custom snapshot matcher · `matchesTags()` exposure · `experimental.vcsProvider` · `aria snapshot` (experimental)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Vitest Best Practices

## Best Practices

- Use `defineConfig()` from `vitest/config` for proper TypeScript support when you have a separate vitest config file — enables type inference and allows merging with Vite configs [source](./.skilld/docs/config/index.md#automatic-dependency-installation)

- Disable test isolation for unit tests that don't rely on side effects and properly clean up state — use `projects` configuration with `isolate: false` to speed up unit test suites significantly [source](./.skilld/docs/guide/recipes.md#disabling-isolation-for-specific-test-files-only)

- Prefer `vi.spyOn()` over `vi.fn()` when you need to track calls to existing methods while keeping the original implementation intact — this maintains actual behavior while enabling assertions [source](./.skilld/docs/guide/mocking.md#spying-on-methods)

- Use `vi.mock()` with the module promise signature (`vi.mock(import('./path'))`) over string paths — provides better IDE support, automatic type inference, and path updates when files are moved [source](./.skilld/docs/api/vi.md#vi-mock)

```ts
// Prefer this for better IDE support and types
vi.mock(import('./calculator.ts'), async (importOriginal) => {
  const mod = await importOriginal()
  return { ...mod, calculate: vi.fn() }
})

// Over this (string paths)
vi.mock('./calculator.ts', () => ({ calculate: vi.fn() }))
```

- Combine `beforeAll()` with cleanup function return instead of separate `afterAll()` — ensures cleanup always runs and pairs setup/teardown logic together in one place [source](./.skilld/docs/api/hooks.md#beforeall)

```ts
beforeAll(async () => {
  await startServer()
  return async () => {
    await stopServer()
  }
})
```

- Only use `test.concurrent` for async tests that spend time waiting — synchronous concurrent tests provide no speed benefit since they still block the single JavaScript thread [source](./.skilld/docs/guide/parallelism.md#test-parallelism)

- Use the `test.repeats` option when debugging flaky tests — runs the same test multiple times in succession to identify intermittent failures without needing to manually rerun [source](./.skilld/docs/api/test.md#repeats)

- Use `toMatchFileSnapshot()` for snapshots containing code or formatted content that needs syntax highlighting — avoids escaping double-quotes and backticks that reduce readability [source](./.skilld/docs/guide/snapshot.md#file-snapshots)

- Use `vi.hoisted()` to define mock values before `vi.mock()` when you need to reference variables outside the factory scope — avoids hoisting issues and improves code clarity [source](./.skilld/docs/api/vi.md#vi-mock)

```ts
const mocks = vi.hoisted(() => ({ getValue: vi.fn() }))
vi.mock('./module.ts', () => ({ getValue: mocks.getValue }))
```

- Enable filesystem module caching with `experimental.fsModuleCache` for faster watch mode reruns — most noticeable when rerunning a single test file with a large module graph [source](./.skilld/docs/guide/improving-performance.md#caching-between-reruns)

- Use test sharding with `--shard` and `--reporter=blob` for CI/CD pipelines running tests across multiple machines — enables splitting test files across machines and collecting results into a merged report [source](./.skilld/docs/guide/improving-performance.md#sharding)

- Use the `test.retry` object form (Vitest 4.1+) with a `condition` function to retry only on specific error patterns — prevents retrying tests that fail for structural reasons [source](./.skilld/docs/api/test.md#retry)

```ts
test('flaky network call', {
  retry: {
    count: 3,
    delay: 100,
    condition: (error) => error.message.includes('ECONNRESET')
  }
}, async () => {
  // only retries on connection errors, not assertion failures
})
```

- Use `aroundEach()` hooks for resource management that needs to wrap entire test execution — allows safe access to fixtures in both setup and teardown phases [source](./.skilld/docs/api/hooks.md#aroundeach)

```ts
aroundEach(async (runTest) => {
  await db.transaction(runTest)
  // transaction automatically rolls back after test
})
```
<!-- /skilld:best-practices -->

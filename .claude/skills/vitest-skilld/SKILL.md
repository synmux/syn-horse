---
name: vitest-skilld
description: 'ALWAYS use when writing code importing "vitest". Consult for debugging, best practices, or modifying vitest.'
metadata:
  version: 4.1.7
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-27
---

# vitest-dev/vitest `vitest@4.1.7`

**Tags:** latest: 4.1.7, beta: 5.0.0-beta.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p vitest` instead of grepping `.skilld/` directories. Run `skilld search --guide -p vitest` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `doMock()` returns a disposable [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L10)
- NEW: Chai style assertions `expect().to.be.true` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L11)
- NEW: `vi.setTickMode()` for timer controls [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L12)
- NEW: Matcher types exposed [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L13)
- NEW: `toTestSpecification` added to reported tasks [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L14)
- NEW: Support for test `tags` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L17)
- NEW: `aroundEach` and `aroundAll` hooks [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L18)
- NEW: `--update` flag accepts `new` or `all` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L20)
- NEW: Test options support `meta` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L21)
- NEW: `test.extend` syntax for type inference [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L22)
- NEW: Assertion helper to hide internal stack traces [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L24)
- NEW: `--detect-async-leaks` CLI option [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L27)
- NEW: `mockThrow` and `mockThrowOnce` for mocking [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L28)
- NEW: `update: "none"` option for snapshots [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L29)
- NEW: `page/locator.mark` API for Playwright trace [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L31)
- NEW: `createSpecification` supports filters [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L34)
- NEW: `runTestFiles` exposed as alternative to `runTestSpecifications` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L35)
- NEW: `api` options `allowWrite` and `allowExec` [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L36)
- NEW: `userEvent.wheel` API for browser testing [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L39)
- DEPRECATED: Several `vitest/*` entry points [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L70)
- DEPRECATED: Unused types in matcher context [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L73)
- DEPRECATED: `toBe*` spy assertions in favor of `toHaveBeen*` (and `toThrowError`) [source](./.skilld/repos/vitest-dev/vitest/releases/v4.1.0.md:L106)

**Also changed:** `toTestSpecification` allows test cases (api) · `filterNode` option for prettyDOM (browser) · Playwright persistent context (browser) · `detailsPanelPosition` option (browser) · `findElement` and strict mode in webdriverio (browser) · `@bomb.sh/tab` completions (cli) · `ignore start/stop` hints (coverage) · `coverage.changed` option (coverage) · `onModuleRunner` hook (experimental) · Option to disable module runner (experimental) · `importDurations: { limit, print }` options (experimental) · `print` and `fail` thresholds for `importDurations` (experimental) · File context passed to `beforeAll/afterAll` (fixtures) · `agent` reporter (reporters) · `retry` options enhanced (runner) · Run individual test/suites (ui) · Project filter/sort support (ui) · Duration sorting to explorer (ui) · Filter for slow tests (ui) · Run summary in GitHub Actions Reporter (vitest)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Improve Performance by Disabling Test Isolation: For projects not relying on side effects, disable test isolation with `test.isolate: false` in `vitest.config.js` or `--no-isolate` CLI flag to speed up test execution. [source](./.skilld/references/vitest@4.1.7/docs/guide/improving-performance.md#test-isolation)

- Use Test Sharding for Large Suites: Split large test suites across multiple machines or to balance load on high CPU-count machines using `--shard` with `--reporter=blob`, then merge results with `--merge-reports`. [source](./.skilld/references/vitest@4.1.7/docs/guide/improving-performance.md#sharding)

- Limit Directory Search with `test.dir`: Speed up test discovery by limiting the working directory where Vitest searches for files using the `test.dir` option. [source](./.skilld/references/vitest@4.1.7/docs/guide/improving-performance.md#limiting-directory-search)

- Persist Module Cache for Faster Reruns (experimental): Enable `experimental.fsModuleCache` to persist the transformed module cache to the file system, significantly speeding up subsequent reruns of tests with large module graphs. [source](./.skilld/references/vitest@4.1.7/docs/guide/improving-performance.md#caching-between-reruns)

- Use `vitest.config.ts` for Test-Specific Overrides: Create a separate `vitest.config.ts` to provide test-specific configurations that override `vite.config.ts` without interfering with your main application's build. [source](./.skilld/references/vitest@4.1.7/docs/config/index.md#configuring-vitest)

- Include `vitest/globals` for TypeScript with Global APIs: When `test.globals: true` is enabled, add `vitest/globals` to your `tsconfig.json` `types` array to ensure proper TypeScript recognition of global APIs. [source](./.skilld/references/vitest@4.1.7/docs/config/globals.md#globals)

- Specify Environment per File with `@vitest-environment`: Use `/** @vitest-environment jsdom */` or `// @vitest-environment happy-dom` comments at the top of test files for granular control over the test environment. [source](./.skilld/references/vitest@4.1.7/docs/config/environment.md#environment)

- Manually Manage Mocks with Concurrent Tests: Avoid `clearMocks`, `restoreMocks`, or `mockReset` with `test.concurrent` due to potential conflicts; manually clear/restore mocks or use `vi.unstubAllEnvs`/`vi.unstubAllGlobals` in `beforeEach` hooks. [source](./.skilld/references/vitest@4.1.7/docs/config/clearmocks.md#clearmocks)

- Prefer `vi.stubEnv` with `unstubEnvs` for `import.meta.env` mocking: Automatically reset mocked environment variables between tests by using `vi.stubEnv` and enabling `unstubEnvs` in your config.

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    unstubEnvs: true,
  },
})
```

[source](./.skilld/references/vitest@4.1.7/docs/guide/mocking.md#mock-import-meta-env)

- Always `await` Async Calls to Prevent Unhandled Rejections: Ensure all async function calls within tests are `await`ed to properly handle promise rejections and avoid misleading `Unhandled Promise Rejection` errors. [source](./.skilld/references/vitest@4.1.7/docs/guide/common-errors.md#unhandled-promise-rejection)

- Use Typeargs for `toEqualTypeOf`/`toExtend` in Type Tests: When writing type tests with `expectTypeOf().toEqualTypeOf()` or `toExtend()`, prefer using type arguments (e.g., `<{ a: string }>`) over concrete objects for more actionable error messages. [source](./.skilld/references/vitest@4.1.7/docs/guide/testing-types.md#concrete-expected-objects-vs-typeargs)

- Configure `ssr.resolve.conditions` for Custom Package Conditions: When using custom conditions in `package.json` `exports` or `imports` in a Node.js environment, explicitly configure `ssr.resolve.conditions` in your Vitest config. [source](./.skilld/references/vitest@4.1.7/docs/guide/common-errors.md#custom-package-conditions-are-not-resolved)

- Use `pool: 'forks'` for Native NodeJS Modules: If encountering segfaults or cryptic errors with native NodeJS modules, switch to `pool: 'forks'` as these modules might not be multi-thread safe with `pool: 'threads'`. [source](./.skilld/references/vitest@4.1.7/docs/guide/common-errors.md#segfaults-and-native-code-errors)

- Fix Relative Aliases with `new URL(..., import.meta.url).pathname`: For `test.alias` in `vitest.config.js`, ensure relative paths are correctly resolved by using `new URL('./src/', import.meta.url).pathname` to prevent module not found errors.

```ts
// vitest.config.js
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
})
```

[source](./.skilld/references/vitest@4.1.7/docs/guide/common-errors.md#cannot-find-module-relative-path)

<!-- /skilld:best-practices -->

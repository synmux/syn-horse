---
name: npm-run-all2-skilld
description: 'ALWAYS use when writing code importing "npm-run-all2". Consult for debugging, best practices, or modifying npm-run-all2, npm run all2.'
metadata:
  version: 9.0.1
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-27
---

# bcomnes/npm-run-all2 `npm-run-all2@9.0.1`

**Tags:** beta: 8.1.0-beta.0, latest: 9.0.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p npm-run-all2` instead of grepping `.skilld/` directories. Run `skilld search --guide -p npm-run-all2` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Node.js engine floor raised to `>= Node 20` — affects users on older Node.js versions, requiring an upgrade to Node.js 20 or greater. [source](./.skilld/repos/bcomnes/npm-run-all2/releases/v8.0.0.md#commits)

- BREAKING: Node.js engine floor raised to `^18.17.0 || >=20.5.0` — previous breaking change for migration from v7 to v8, requiring Node.js 18.17.0 or 20.5.0 or greater. [source](./.skilld/repos/bcomnes/npm-run-all2/releases/v7.0.0.md#commits)

**Also changed:** `--aggregate-output` option new in v4.1.0 · `--max-parallel` option new in v4.0.0 · `$npm_config_xxx` support new in v3.1.0 · `race` option new in v2.3.0 · arguments pass-through new in v2.2.0 · `npm-run-all2` bin alias new in v6.1.1 · pnpm support new in v6.1.0

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Maintain updated Node.js versions: Ensure your Node.js environment meets or exceeds the minimum version required by `npm-run-all2` (e.g., Node 20 for v8.0.0+) to benefit from crucial updates and prevent compatibility issues. [source](./.skilld/releases/v8.0.0.md:L7)

- Control parallel task concurrency: Use the `--max-parallel` option with `run-p` to limit the number of concurrently executing scripts, especially in resource-constrained environments like CI/CD, to prevent system overload. [source](./.skilld/releases/CHANGELOG.md:L221)

- Dynamically adjust concurrency in CI: Leverage environment variables (e.g., `MAX_PARALLEL_TASKS`) to dynamically set the `--max-parallel` limit, allowing for flexible resource management across different CI pipeline configurations. [source](./.skilld/issues/issue-116.md:L9-L10)

- Prioritize PNPM compatibility: When working with PNPM, use `npm-run-all2` versions that specifically address PNPM configuration handling (e.g., v6.2.3 and later) to avoid unintended flag passing. [source](./.skilld/releases/CHANGELOG.md:L112)

- Be mindful of glob pattern changes: Be aware that `npm-run-all2` has undergone internal changes to its glob matching library (`minimatch` to `picomatch` and back), which can subtly alter script matching behavior across versions. [source](./.skilld/releases/CHANGELOG.md:L50)

- Aggregate parallel output for readability: Employ the `--aggregate-output` option with `run-p` to consolidate the output of parallel tasks, improving log readability and debugging experience. [source](./.skilld/releases/CHANGELOG.md:L196)

- Continue on non-critical task failures: For parallel execution where some task failures are tolerable, use the `--continue-on-error` option to allow other tasks to complete instead of halting the entire process prematurely. [source](./.skilld/releases/CHANGELOG.md:L231)

- Suppress internal `npm-run-all2` output: Use the `--silent` option to minimize verbose output from `npm-run-all2` itself, focusing the console on the actual script outputs for cleaner logs. [source](./.skilld/releases/CHANGELOG.md:L305)

- Ensure deterministic sequential order with wildcards: When using `run-s` with wildcard patterns, understand that the current expectation is for script execution order to follow their definition in `package.json`, although this behavior is explicitly sought for documentation. [source](./.skilld/issues/issue-167.md:L10-L11)

- Use `--workspaces` for monorepo script execution (experimental consideration): While direct `--workspaces` support is a feature request, for monorepos, consider patterns that iterate through workspaces and then apply `run-s` or `run-p` to the individual workspace scripts. [source](./.skilld/issues/issue-60.md:L7)

- Leverage `read-package-json-fast` integration: Newer versions integrate `read-package-json-fast` for potentially faster package.json parsing, which can contribute to overall performance in large projects. [source](./.skilld/releases/CHANGELOG.md:L142)

- Consider `--race` for early exit conditions: When running parallel tasks where the success of any single task is sufficient, use the `--race` option to terminate all other tasks as soon as one completes successfully. [source](./.skilld/releases/CHANGELOG.md:L355)

- Explicitly pass arguments to child scripts: Use the `--` separator to correctly pass arguments from the `npm-run-all2` command to the child npm scripts, ensuring proper configuration and execution. [source](./.skilld/releases/CHANGELOG.md:L377)

- Utilize `npm-run-all2` bin alias: The `npm-run-all2` package provides its own bin alias. Use this directly for clarity and to avoid potential conflicts with other `npm-run-all` versions. [source](./.skilld/releases/CHANGELOG.md:L157)
<!-- /skilld:best-practices -->

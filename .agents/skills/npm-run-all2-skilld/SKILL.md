---
name: npm-run-all2-skilld
description: 'ALWAYS use when writing code importing "npm-run-all2". Consult for debugging, best practices, or modifying npm-run-all2, npm run all2.'
metadata:
  version: 9.0.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# bcomnes/npm-run-all2 `npm-run-all2@9.0.2`

**Tags:** beta: 8.1.0-beta.0, latest: 9.0.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p npm-run-all2` instead of grepping `.skilld/` directories. Run `skilld search --guide -p npm-run-all2` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

- BREAKING: ESM only — v9.0.0 no longer exports CJS; use `import npmRunAll from "npm-run-all2"` instead of `require()` [source](./.skilld/releases/v9.0.0.md:L11)

- BREAKING: Node engine requirements — v9.0.0 requires `^22.22.2 || ^24.15.0 || >=26.0.0` (raised from `>=20` in v8.0.0) [source](./.skilld/releases/v9.0.0.md:L12)

- BREAKING: Glob pattern matching — empty glob patterns now succeed silently instead of throwing an error; unmatched patterns no longer cause exit code non-zero [source](./.skilld/releases/v9.0.0.md#breaking-changes)

- NEW: `--node-run` CLI flag / `nodeRun` option — v9.0.0 added support for `node --run` mode to bypass the package manager; faster execution but omits pre/post lifecycle hooks and npm environment variables [source](./.skilld/docs/npm-run-all.md:L51:L59)

- NEW: `colorMode` option — v9.0.0 added `colorMode` option to override terminal colour palette detection; accepts `"auto"` (default, detect from stream), `"none"` (disable), `"16"` (force 16-colour palette), or `"256"` (force 256-colour palette) [source](./.skilld/docs/node-api.md:L43:L45)

**Also changed:** `packageConfig` now a proper typed option · `maxParallel` type enforcement improved · Published types with `tsc` validation

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use the `--node-run` flag or set `nodeRun: true` in `package.json` to leverage Node's native `node --run` command — this bypasses the package manager entirely for faster execution (available since v9.0.0 for Node >= 22.3.0) [source](./.skilld/docs/npm-run-all.md:L51:59)

- Set `--max-parallel` in CI environments to limit resource consumption, preventing resource exhaustion on systems with constrained CPU or memory — especially useful in CI/CD pipelines where you need explicit parallelism control [source](./.skilld/docs/npm-run-all.md:L28:29)

- Use `--aggregate-output` in parallel mode to prevent interleaved log output from multiple concurrent tasks, improving readability when task output matters (though some tools stop coloring when stdout is piped) [source](./.skilld/docs/npm-run-all.md:L16:17)

- When using glob patterns with `run-s`, scripts execute in the order they appear in `package.json` due to ECMAScript specification guarantees; this is predictable only if your build tool doesn't alphabetically reorder the scripts file [source](./.skilld/docs/npm-run-all.md:L154:156)

- Prefix script names with numbers (e.g., `build:1:html`, `build:2:js`) instead of relying on glob patterns when deterministic execution order is critical and your toolchain may rewrite `package.json` alphabetically [source](./.skilld/docs/npm-run-all.md:L159:160)

- Use `--continue-on-error` to allow subsequent tasks to run even when one task exits with a non-zero code — the process still exits with non-zero if any task failed, but you get complete results instead of early termination [source](./.skilld/docs/npm-run-all.md:L24:27)

- Combine `--print-label` and `--print-name` for parallel execution to keep task output clearly identified with source task names, though note that some tools (like chalk-based colorizers) stop applying colour when stdout is piped; use `FORCE_COLOR=1` if needed [source](./.skilld/docs/npm-run-all.md:L35:39)

- Leverage argument placeholders (`{1}`, `{2}`, `{@}`, `{*}`, `{%}`) with suffix defaults (`{1-=fallback}`, `{1:=sticky}`) to pass dynamic arguments through glob patterns — this is more flexible than explicit script names when building parameterized task pipelines [source](./.skilld/docs/npm-run-all.md:L174:211)

- Use the `race` flag with `--parallel` to terminate all tasks immediately when the first one succeeds with exit code zero — useful for competitive tasks like "watch for changes OR serve dev server" where you want the fastest to win [source](./.skilld/docs/npm-run-all.md:L43:45)

- Configure `nodeRun` in `package.json` under `"npm-run-all2": { "nodeRun": true }` to enable `node --run` globally for all commands without requiring the CLI flag on every invocation [source](./.skilld/docs/npm-run-all.md:L57:59)

- Empty glob patterns now succeed silently instead of throwing errors (breaking change in v9.0.0) — if you depend on error detection for missing scripts, use explicit script names instead of wildcards or implement your own validation [source](./.skilld/releases/v9.0.0.md:L26)

- Pass explicit task lists via the Node API's `taskList` option to avoid redundant `package.json` reads when you're building tooling that manages its own script discovery — this optimizes performance for wrapper commands [source](./.skilld/docs/node-api.md:L95:98)

- Configure `colorMode` intelligently using `"256"` for modern terminals and `"none"` for CI logs to preserve clean output; the default `"auto"` detection works well but explicit control prevents colour artefacts in piped output [source](./.skilld/docs/npm-run-all.md:L19:23)

- Use `stdin`, `stdout`, and `stderr` options in the Node API to integrate npm-run-all into larger process pipelines, but configure `emitter.setMaxListeners(n)` appropriately when streaming to multiple child processes to avoid MaxListenersExceededWarning [source](./.skilld/docs/node-api.md:L117:121)

<!-- /skilld:best-practices -->

---
name: npm-run-all2-skilld
description: 'ALWAYS use when writing code importing "npm-run-all2". Consult for debugging, best practices, or modifying npm-run-all2, npm run all2.'
metadata:
  version: 8.0.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# bcomnes/npm-run-all2 `npm-run-all2@8.0.4`

**Tags:** beta: 8.1.0-beta.0, latest: 8.0.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p npm-run-all2` instead of grepping `.skilld/` directories. Run `skilld search --guide -p npm-run-all2` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for npm-run-all2 v8.0.4.

BREAKING: Node engine requirement — v8.0.0 changed minimum Node version from `^18.17.0 || >=20.5.0` to `^20.5.0 || >=22.0.0`. This is a silent breaking change: code using the npm-run-all2 API will compile without error on Node 18, but execution will fail. Verify your Node.js version is >= 20.5.0 or >= 22.0.0 before upgrading. [source](./.skilld/releases/v8.0.0.md) · [package.json](./.skilld/pkg/package.json:L13:L16)

Also changed: npm engine requirement raised to >= 10 in v8.0.0 · dependency updates (minimatch v10.0.1 in v8.0.1) · npm lifecycle improvements in v8.0.4-beta

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Prefer `run-s` and `run-p` shorthand commands for simple, focused tasks — more concise and self-documenting than `npm-run-all` with flags [source](./.skilld/pkg/docs/run-s.md) [source](./.skilld/pkg/docs/run-p.md)

- Use glob patterns with single-level wildcard (`*`) and globstar (`**`) to match script hierarchies — avoids repetition and scales automatically as you add scripts [source](./.skilld/pkg/docs/npm-run-all.md:L118:135)

- Use `--aggregate-output` with parallel tasks to prevent interleaved output — each task's output is buffered and printed atomically when finished, aiding readability and debugging [source](./.skilld/pkg/docs/npm-run-all.md:L16:17)

- Apply `--print-label` and `--print-name` during development and debugging — prefix output with task names to trace which output comes from which script [source](./.skilld/pkg/docs/npm-run-all.md:L29:33)

- Set `--max-parallel <number>` in CI environments — resource-constrained CI systems need bounded parallelism to avoid memory exhaustion and timeouts [source](./.skilld/pkg/docs/npm-run-all.md:L22:23) [source](./.skilld/issues/issue-116.md)

- Force color output with `FORCE_COLOR=1` when using `--print-label` — the flag pipes stdout which disables coloring in tools like eslint; set the environment variable to override [source](./.skilld/pkg/docs/npm-run-all.md:L189:194)

- Use `--continue-on-error` selectively for graceful degradation, not by default — understand when you want to fail fast (most builds) versus when you want resilience (linting multiple modules) [source](./.skilld/pkg/docs/npm-run-all.md:L19:21)

- Leverage argument placeholders (`{1}`, `{2}`, `{@}`, `{*}`) to compose flexible script invocations — allows dynamic argument forwarding when scripts are called with additional parameters [source](./.skilld/pkg/docs/npm-run-all.md:L150:187)

- Define scripts in a consistent order in `package.json` for deterministic execution — wildcard matches execute in the order scripts appear in the manifest, critical for sequential script correctness [source](./.skilld/issues/issue-167.md)

- Use `--race` flag in parallel mode when the first successful task is sufficient — kills all other tasks on first zero exit code, useful for competitive tasks like finding available ports [source](./.skilld/pkg/docs/npm-run-all.md:L37:39)

- Configure `emitter.setMaxListeners(n)` when using Node API with stdin/stdout/stderr streams in parallel — prevents `MaxListenersExceededWarning` which can crash production processes [source](./.skilld/pkg/docs/node-api.md:L113:117)

- Avoid `--print-label` when color output is critical to observability — the piped stdout disables TTY detection in chalk and similar libraries; use `FORCE_COLOR=1` or drop the label flag [source](./.skilld/pkg/docs/npm-run-all.md:L189:194)

- Use Node API with typed options object for programmatic control — enables IDE autocomplete, type safety, and complex orchestration that CLI flags cannot express [source](./.skilld/pkg/docs/node-api.md:L28:95)
<!-- /skilld:best-practices -->

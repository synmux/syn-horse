---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.214
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.214`
**Tags:** stable: 2.1.205, latest: 2.1.214, next: 2.1.214

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.214 — prioritize these when using the CLI or SDK.

- NEW: `ClaudeDesign` tool — performs Claude Design operations via a generic operation dispatcher; call with operation: "list" to discover available operations and their schemas [source](./.skilld/pkg/sdk-tools.d.ts:L2442:L2453)

- NEW: `Projects` tool — manage persistent project files and knowledge bases with methods for read/write/search/delete; supports inline content or local file uploads; marks deliverables via present_to_user flag [source](./.skilld/pkg/sdk-tools.d.ts:L2454:L2479)

- NEW: `ShowOnboardingRolePicker` tool — displays a role selection UI on first run; returns selected role or dismissed status [source](./.skilld/pkg/sdk-tools.d.ts:L2651:L2651)

**Also changed:** Artifact tool retains favicon, label, url, force parameters from v2.1.198 · PushNotification tool for mobile/browser notifications remains stable
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices — @anthropic-ai/claude-code@2.1.214

- Define workflow `meta` as a pure literal object with no computed values or function calls — the schema enforces immutability; computed values cause parse failures and make resume semantics ambiguous [source](./.skilld/pkg/sdk-tools.d.ts:L2565)

- Prefer `pipeline()` over `parallel()` in workflows when stages are logically sequential — it provides wall-clock speed (slowest single-item chain) without barrier latency while still running all items concurrently through the stages [source](./.skilld/pkg/sdk-tools.d.ts:L2565)

- Set `persistent: true` on Monitor when watching session-length state (PR monitoring, log tails) — `persistent` ignores the `timeout_ms` default of 300s and runs until TaskStop or session end [source](./.skilld/pkg/sdk-tools.d.ts:L2662)

- Use `ScheduleWakeup` with `delaySeconds` between 60–3600 (1–60 min) for idle polling loops rather than `sleep` commands — avoids blocking, respects prompt cache TTL, and keeps sessions responsive [source](./.skilld/pkg/sdk-tools.d.ts:L2620:2637)

- Spawn worktree-isolated agents for concurrent mutations using `isolation: "worktree"` — prevents file-lock collisions and allows parallel edits across a codebase without shared state hazards [source](./.skilld/pkg/sdk-tools.d.ts:L2877:2887)

- Pass `run_in_background: false` to Agent when you need its result before continuing — the default background mode is asynchronous; synchronous agents block until completion but return structured output immediately [source](./.skilld/pkg/sdk-tools.d.ts:L483:520)

- Use `CronCreate` with `durable: true` only when the user explicitly requests the task survive session restarts — the default `durable: false` is in-memory only and auto-deletes with the session [source](./.skilld/pkg/sdk-tools.d.ts:L2595:2612)

- Check `agent()` return value is non-null before using it in workflows — agents fail silently on terminal API errors, returning `null` instead of throwing; filter with `.filter(Boolean)` before downstream work [source](./.skilld/pkg/sdk-tools.d.ts:L99:200)

- Set effort levels on expensive verification phases — use `effort: "high"` or `"xhigh"` in the Agent tool to ensure deeper reasoning; low effort is appropriate only for cheap mechanical stages [source](./.skilld/pkg/sdk-tools.d.ts:L483:520)

- Override agent model for specific task tiers — use `model: "haiku"` for mechanical stages (pagination, filtering, boilerplate) and `model: "opus"` for novel design/reasoning phases to optimise cost and latency [source](./.skilld/pkg/sdk-tools.d.ts:L483:520)

- Pass `args` to workflows as native JSON objects, not stringified — arrays and objects passed as actual values become the global `args` variable; stringified input breaks iteration methods [source](./.skilld/pkg/sdk-tools.d.ts:L2581:2585)

- Resume workflows from `runId` after edits to cache unchanged agent() calls — the longest unchanged prefix of agent() calls returns cached results instantly; only edited/new calls re-run, preserving prior work [source](./.skilld/pkg/sdk-tools.d.ts:L2591:2593)

- Include `activeForm` in TaskCreate for present-continuous feedback during in_progress status — spinner displays the text (e.g., "Running tests") to indicate what the task is currently doing [source](./.skilld/pkg/sdk-tools.d.ts:L2482:2502)
<!-- /skilld:best-practices -->

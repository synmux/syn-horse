---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.200
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-03
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.200`
**Tags:** stable: 2.1.193, next: 2.1.201, latest: 2.1.200

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.200 — prioritize these when using the CLI or SDK.

- BREAKING: `ProjectsInput.force` parameter renamed to `present_to_user` with semantic change — old code using `force` to bypass the chat-injection budget guard will silently fail; new parameter marks a doc as the user-facing deliverable instead [source](./.skilld/pkg/sdk-tools.d.ts:L2370)

- BREAKING: `ProjectsInput` project_write method — `knowledge` object removed fields `search_threshold`, `rag_active`, and `remaining_budget`; code expecting these fields will error [source](./.skilld/pkg/sdk-tools.d.ts:L396:L401)

- BREAKING: `ProjectsInput` project_init method — `knowledge` object removed fields `search_threshold`, `rag_active`, and `remaining_budget` [source](./.skilld/pkg/sdk-tools.d.ts:L376:L374)

- NEW: `ClaudeDesignInput` and `ClaudeDesignOutput` tools — manage Claude Design operations via generic `operation` and `arguments` interface; call with `"list"` operation first to discover available actions [source](./.skilld/pkg/sdk-tools.d.ts:L2341:L2351 and L3509:L3515)

- BREAKING: `PushNotificationOutput` — removed `idleSec` and `hasFocus` optional fields; code checking for these properties will silently get `undefined` [source](./.skilld/pkg/sdk-tools.d.ts:L3499:L3507)

**Also changed:** `FileEditOutput` now includes optional `source: "seeded"` to indicate startup-seeded memory matches · `ReportFindings` findings array items now accept optional `category` field for finding classification (e.g., "correctness", "simplification", "efficiency", "test-coverage")
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices — @anthropic-ai/claude-code@2.1.200

- Define workflow `meta` as a pure literal object with no computed values or function calls — the schema enforces immutability; computed values cause parse failures and make resume semantics ambiguous [source](./sdk-tools.d.ts:L2462:L2493)

- Prefer `pipeline()` over `parallel()` when stages are logically sequential — pipeline provides wall-clock speed (slowest single-item chain) without barrier latency while still running all items concurrently through the stages [source](./sdk-tools.d.ts:L2462:L2493)

- Set `persistent: true` on Monitor when watching session-length state (PR monitoring, log tails) — `persistent` ignores the `timeout_ms` default of 300s and runs until TaskStop or session end [source](./sdk-tools.d.ts:L2547:L2572)

- Use `ScheduleWakeup` with `delaySeconds` between 300–3600 (5–60 min) for idle polling loops rather than `sleep` commands — avoids blocking, respects prompt cache TTL, and keeps sessions responsive [source](./sdk-tools.d.ts:L2519:L2533)

- Spawn worktree-isolated agents for concurrent mutations using `isolation: "worktree"` — prevents file-lock collisions and allows parallel edits across a codebase without shared state hazards [source](./sdk-tools.d.ts:L410:L447)

- Pass `run_in_background: false` to Agent when you need its result before continuing — the default background mode is asynchronous; synchronous agents block until completion but return structured output immediately [source](./sdk-tools.d.ts:L410:L447)

- Use `CronCreate` with `durable: true` only when the user explicitly requests the task survive session restarts — the default `durable: false` is in-memory only and auto-deletes when the session ends [source](./sdk-tools.d.ts:L2494:L2511)

- Check `agent()` return value is non-null before using it in workflows — agents fail silently on terminal API errors, returning `null` instead of throwing; filter with `.filter(Boolean)` before downstream work [source](./sdk-tools.d.ts:L410:L447)

- Set effort levels on expensive verification phases — `effort: "high"` or `"xhigh"` on agents verifying code correctness or security ensures deeper reasoning; low effort is appropriate only for cheap mechanical stages [source](./sdk-tools.d.ts:L410:L447)

- Override agent model for task tiers — use `model: "haiku"` for mechanical stages (pagination, filtering, boilerplate) and `model: "opus"` for novel design/reasoning phases to optimize cost and latency [source](./sdk-tools.d.ts:L410:L447)

- Batch file reads using `limit` and `offset` parameters for large files — reading partial chunks avoids token overrun; many small reads in parallel are cheaper than one full read that truncates [source](./sdk-tools.d.ts:L528:L545)

- Use `isolation: "remote"` on Agent only when the user explicitly requests cloud execution — remote isolation runs the agent outside the local session in a Cloudflare cloud environment; always runs in background and has gated availability [source](./sdk-tools.d.ts:L410:L447)

- Resume workflows from runId after edits to cache unchanged agent() calls — the longest unchanged prefix of agent() calls returns cached results instantly; only edited/new calls re-run, preserving prior work [source](./sdk-tools.d.ts:L2462:L2493)
<!-- /skilld:best-practices -->

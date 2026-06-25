---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.191
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-25
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.191`
**Tags:** stable: 2.1.179, latest: 2.1.191, next: 2.1.193

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.191.

- NEW: `ReadMcpResourceDir` tool — list directory contents from Model Context Protocol servers. Returns child resources with URIs, names, and MIME types. Complementary to `ReadMcpResource` for hierarchical navigation [source](./.skilld/pkg/sdk-tools.d.ts:L670-679 / L2869-2891)

- DEPRECATED: `team_name` parameter on Agent — ignored in v2+. The session has a single implicit team (no replacement parameter needed) [source](./.skilld/pkg/sdk-tools.d.ts:L437)

- DEPRECATED: `shell_id` parameter on TaskStop — use `task_id` instead. Both are optional but `task_id` is the canonical identifier [source](./.skilld/pkg/sdk-tools.d.ts:L635)

**Also changed:** `taskType` in WorkflowOutput tracks task execution context · `workflowName` in WorkflowOutput carries meta.name from script · `runId` in WorkflowOutput enables resumeFromRunId handle for local workflows · `scriptPath` in WorkflowOutput tracks persisted workflow script location
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Pass `args` to Workflow as actual JSON values, not JSON-encoded strings — a stringified list breaks `args.filter()` and `args.map()` in the workflow script [source](./.skilld/pkg/sdk-tools.d.ts:L2382:2388)

- Iterate on workflow scripts by editing the persisted file and re-invoking with the same `scriptPath` instead of re-sending the full script each turn [source](./.skilld/pkg/sdk-tools.d.ts:L2390:2393)

- Resume incomplete Workflow runs with `resumeFromRunId` after stopping the prior run — completed agent() calls with unchanged (prompt, opts) return cached results instantly; only edited or new calls re-run [source](./.skilld/pkg/sdk-tools.d.ts:L2395:2397)

- Use persistent Monitor for session-length watches like PR monitoring or log tails — set `persistent: true` and stop with TaskStop instead of relying on timeout_ms [source](./.skilld/pkg/sdk-tools.d.ts:L2502:2508)

- Keep Bash command descriptions clear and active-voice without hedging words — avoid "complex" or "risk"; for piped commands, add enough context to clarify intent [source](./.skilld/pkg/sdk-tools.d.ts:L460:L478)

- Limit AskUserQuestion to 1–4 questions per call and 2–4 distinct, mutually exclusive options per question — do not add an 'Other' option (auto-provided) [source](./.skilld/pkg/sdk-tools.d.ts:L724:L754)

- Use Grep `head_limit: 0` (unlimited) sparingly — large result sets waste context; prefer bounded limits or narrower patterns and `output_mode: "files_with_matches"` for path-only results [source](./.skilld/pkg/sdk-tools.d.ts:L869:L876)

- Set TaskCreate `activeForm` to present-continuous form shown in task spinner (e.g., "Running tests") so users see live progress, not just a static subject [source](./.skilld/pkg/sdk-tools.d.ts:L1030:L1035)

- Use Agent model override (e.g., `model: "haiku"`) to force specific tier when a task is cost-critical or inherently lightweight; omit to inherit the parent/session model [source](./.skilld/pkg/sdk-tools.d.ts:L129:L132)

- Enable Grep multiline matching (`multiline: true`) only when patterns span multiple lines — costs more resources; prefer single-line patterns and regex alternation for common cases [source](./.skilld/pkg/sdk-tools.d.ts:L899:L901)

- Use Artifact `file_path` with a short, distinctive basename — it becomes the fallback title if the HTML has no `<title>` tag [source](./.skilld/pkg/sdk-tools.d.ts:L2519:L2521)

- Pass `baseVersion` when updating Artifacts to detect concurrent writes (409 conflict); omit only after reconciling and intending to force-replace via `force: true` [source](./.skilld/pkg/sdk-tools.d.ts:L2531:L2534)

- Limit PushNotification `message` to under 200 characters — mobile OSes truncate longer text [source](./.skilld/pkg/sdk-tools.d.ts:L2545:L2547)
<!-- /skilld:best-practices -->

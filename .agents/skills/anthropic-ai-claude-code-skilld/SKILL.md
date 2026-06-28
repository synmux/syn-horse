---
name: anthropic-ai-claude-code-skilld
description: 'ALWAYS use when writing code importing "@anthropic-ai/claude-code". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88.'
metadata:
  version: 2.1.195
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-28
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.195`

**Tags:** stable: 2.1.181, latest: 2.1.195, next: 2.1.195

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `AgentInput.team_name` — ignored; the session has a single implicit team [source](./.skilld/pkg/sdk-tools.d.ts:L437:439)

- DEPRECATED: `TaskStopInput.shell_id` — use `task_id` instead [source](./.skilld/pkg/sdk-tools.d.ts:L635:637)

**Also changed:** No additional breaking changes, removals, or renames detected in v2.1.x lineage.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Write Bash command descriptions in active voice with clear intent — use 5-10 words for simple commands (e.g., "List files in current directory"), and add context for complex ones with piping or flags (e.g., "Find and delete all .tmp files recursively"). Avoid vague words like "complex" or "risk"; focus on describing what the command does [source](./.skilld/pkg/sdk-tools.d.ts:L518:L533)

- Use FileRead's offset and limit parameters for large files instead of reading the entire file at once — this avoids truncation by token caps and allows paginated reading [source](./.skilld/pkg/sdk-tools.d.ts:L307:L320)

- When reading PDF files with FileRead, use the pages parameter to limit requests to a maximum of 20 pages at a time — this ensures efficient handling of large documents [source](./.skilld/pkg/sdk-tools.d.ts:L312:L313)

- Pass Workflow args as actual JSON values (objects or arrays), never as JSON-encoded strings — stringified args break destructuring and array methods in the workflow script [source](./.skilld/pkg/sdk-tools.d.ts:L1717:L1720)

- Use Workflow's scriptPath parameter when iterating on workflow scripts — edit the returned script file and re-invoke with the same scriptPath to avoid resending large scripts [source](./.skilld/pkg/sdk-tools.d.ts:L1726:L1728)

- Define Workflow meta as a pure literal object without computed values — JSON serialization of meta requires this constraint [source](./.skilld/pkg/sdk-tools.d.ts:L1704:L1708)

- Resume Workflow executions with resumeFromRunId to preserve caching — completed agent() calls with unchanged prompts return cached results instantly while new or edited calls re-run [source](./.skilld/pkg/sdk-tools.d.ts:L1730:L1733)

- Keep Agent descriptions to 3-5 words — they are shown in progress UI and should be scannable at a glance [source](./.skilld/pkg/sdk-tools.d.ts:L1651:L1653)

- Ask 1-4 questions per AskUserQuestion call with 2-4 options each — keep header labels to 12 characters maximum and option labels to 1-5 words for clarity in the UI [source](./.skilld/pkg/sdk-tools.d.ts:L2389:L2395)

- Set Monitor's timeout_ms to match the expected operation duration (default 300000ms / 5 min, max 3600000ms / 60 min) — use persistent: true for session-length watches like PR monitoring or log tails that require TaskStop to terminate [source](./.skilld/pkg/sdk-tools.d.ts:L3056:L3065)

- Use present continuous form for Task activeForm (e.g., "Running tests", "Compiling") — this is shown in the spinner while the task is in_progress [source](./.skilld/pkg/sdk-tools.d.ts:L2293:L2295)

- Name new Worktrees with alphanumeric characters, dots, underscores, and dashes only; limit to 64 characters total — invalid names will be rejected by git worktree [source](./.skilld/pkg/sdk-tools.d.ts:L3098:L3100)

- Persist Cron tasks across sessions by setting durable: true — this writes to .claude/scheduled_tasks.json and survives restarts; omit or set false for in-memory tasks that die when the session ends [source](./.skilld/pkg/sdk-tools.d.ts:L1799:L1803)

<!-- /skilld:best-practices -->

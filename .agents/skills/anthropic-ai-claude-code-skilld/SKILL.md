---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.196
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-30
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.196`
**Tags:** stable: 2.1.185, latest: 2.1.196, next: 2.1.197

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for the Claude Code CLI tool. Since @anthropic-ai/claude-code is primarily a CLI application distributed as a binary, programmatic APIs are exposed through TypeScript interfaces in `sdk-tools.d.ts`.

- DEPRECATED: `team_name` field in AgentInput — ignored; the session has a single implicit team. Use without this parameter. [source](./.skilld/pkg/sdk-tools.d.ts:L439)

- DEPRECATED: `shell_id` field in TaskStopInput — use `task_id` instead for stopping background tasks. Both fields are in the interface, but `task_id` is the canonical identifier. [source](./.skilld/pkg/sdk-tools.d.ts:L637)

**Also changed:** AgentInput model options (`sonnet`, `opus`, `haiku`, `fable`) · EnterWorktreeInput/ExitWorktreeOutput for isolated git worktrees · CronCreateInput/CronDeleteInput/CronListInput for scheduled tasks · ScheduleWakeupInput for dynamic loop pacing · RemoteTriggerInput for remote cloud agent dispatch
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## @anthropic-ai/claude-code Best Practices

## Best Practices

- Use `isolation: "worktree"` when spawning agents that mutate files in parallel to prevent conflicts — automatically isolates the agent's file system changes and cleans up after completion [source](./.skilld/pkg/sdk-tools.d.ts:L425:427)

- Pass `run_in_background: true` and `name: "..."` when launching long-running agents to remain responsive and enable inter-agent messaging — agents without names cannot be addressed via SendMessage [source](./.skilld/pkg/sdk-tools.d.ts:L420:424)

- Use `pipeline()` instead of `parallel()` for multi-stage workflows by default — provides true streaming where stage N processes items while stage N+1 is still waiting, maximising wall-clock throughput over sequential barriers [source](./.skilld/pkg/README.md:L36:65)

- Set Bash `timeout` to 600000ms (10 minutes) maximum when running long-running commands to prevent indefinite hangs — specify timeout in milliseconds to enforce absolute limits [source](./.skilld/pkg/sdk-tools.d.ts:L453)

- Read large files with `offset` and `limit` parameters instead of loading entire contents at once — omit these for small files; use only when the file is too large to read in one call to avoid context bloat [source](./.skilld/pkg/sdk-tools.d.ts:L533:540)

- Always call File.Read before File.Edit to verify the old_string exists and identify exact context — Edit requires reading first; unsourced edits risk silent failures or incorrect replacements [source](./.skilld/pkg/sdk-tools.d.ts:L513:523)

- Use `resume_from_run_id` in Workflow to skip re-executing completed agent calls when restarting failed workflows — unchanged agent() prompts return cached results instantly while edited calls re-run, reducing iteration time [source](./.skilld/pkg/sdk-tools.d.ts:L2476:2478)

- Set Bash `description` to active voice, specific output (not "complex" / "risk"), keeping 5-10 words for simple commands and adding context for piped or obscure-flag commands — descriptions improve permission prompts and audit trails [source](./.skilld/pkg/sdk-tools.d.ts:L462:475)

- Guard budget-aware loops with `budget.total && budget.remaining() > threshold` before spawning agents in workflows — prevents runaway loops and respects user-set token budgets without silent truncation [source](./.skilld/pkg/README.md:L102:108)

- Use `mode: "plan"` when spawning agents that require explicit approval before editing files, and `mode: "auto"` for fully autonomous agents — mode controls permission prompts and safety guardrails [source](./.skilld/pkg/sdk-tools.d.ts:L426)

- Prefer `model: "sonnet"` for most tasks, reserve `"opus"` for complex reasoning, and use `"haiku"` for simple lookups or loop iterations to optimise cost without sacrificing capability [source](./.skilld/pkg/sdk-tools.d.ts:L418:419)

- Use Monitor with `persistent: true` for session-length watches (e.g., PR polling, log tails) and `persistent: false` with explicit `timeout_ms` (default 300000ms) for finite checks — persistent monitors must be stopped manually with TaskStop [source](./.skilld/pkg/sdk-tools.d.ts:L2541:2549)

- Declare `meta.phases` in workflows as an array of `{ title, detail }` objects to group agent work into logical stages — phase() calls group progress UI; unmatched phase names create new groups automatically [source](./.skilld/pkg/README.md:L19:22)
<!-- /skilld:best-practices -->

---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code."
metadata:
  version: 2.1.167
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# @anthropic-ai/claude-code@2.1.167
**Tags:** stable: 2.1.153, latest: 2.1.167, next: 2.1.167

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This package (@anthropic-ai/claude-code v2.1.167) is a compiled CLI tool distributed as a binary executable with TypeScript type definitions. Detailed version history and API changes cannot be fully documented because:

1. **No local changelog/releases:** The `.skilld/` directory contains only basic README and compiled definitions without release notes, changelog entries, or migration guides.

2. **Auto-generated types:** The TypeScript definitions (`sdk-tools.d.ts`) are automatically generated from JSON schemas and do not embed version history comments.

3. **CLI-only distribution:** The package exports only a binary executable and TypeScript type definitions, without a version-controlled public API surface that tracks breaking changes between releases.

### Known API Changes

Based on examination of the TypeScript type definitions:

- DEPRECATED: `shell_id` parameter in TaskStopInput — deprecated in favour of `task_id` [source](./.skilld/pkg/sdk-tools.d.ts:L529-L531)

- NEW: `taskType`, `workflowName`, `runId` fields in WorkflowOutput — recently added to track background task metadata; these fields are absent only on transcripts written before the fields existed [source](./.skilld/pkg/sdk-tools.d.ts:L3115-L3125)

### How to obtain version history

For complete API/feature changes in @anthropic-ai/claude-code, refer to:

- **GitHub Releases:** https://github.com/anthropics/claude-code/releases
- **Documentation:** https://code.claude.com/docs/en/overview
- **NPM Package Page:** https://www.npmjs.com/package/@anthropic-ai/claude-code

These external sources contain the definitive version history, breaking changes, and new features for each release.

**Also changed:** No additional items could be documented due to unavailable version history
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `resumeFromRunId` in Workflow to continue from interrupted runs rather than restarting — restores cached results from prior agent() calls with unchanged prompts and options, allowing incremental progress without token waste [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2295)

- Pass args to workflows as actual JSON objects, never as JSON-encoded strings — stringified values break args.filter() and args.map() inside the script, causing runtime errors [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2285)

- Prefer 270s over 300s when sleeping in loops to stay within the 5-minute prompt cache window — sleeping past 300 seconds forces cache misses and increases token cost without amortizing the expense [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2326)

- Set persistent: true in Monitor for session-length watches (PR monitoring, log tails) instead of using timeout_ms — avoids creating dozens of short-lived monitors that compete for resources [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2361)

- Use scriptPath over script when iterating on Workflow code — allows editing the persisted script file and re-invoking with the same path, avoiding full re-sends on each iteration [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2291)

- Supply model override (sonnet/opus/haiku) only when confident a smaller or larger model fits the task — omitting inherits the parent context, avoiding unnecessary tier shifts [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2321)

- Check truncatedByTokenCap in FileReadOutput when implementing pagination — true signals the content was auto-paginated due to token budget, enabling graceful follow-up reads with offset/limit [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L169)

- Use multiSelect: true in AskUserQuestion only for non-mutually-exclusive choices — answers default to single-select, so enabling multiSelect changes the UI and interaction model [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L768)

- Block TaskOutput with timeout instead of polling — the block parameter waits for completion, avoiding manual wait loops and race conditions [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L383:385)

- Leverage EnterWorktreeInput isolation for agents that mutate files in parallel — each agent in a separate worktree prevents branch/file conflicts across concurrent modifications [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2376)

- Use REPL for state-persisting JavaScript work where each call preserves prior declarations — state persists across invocations (unlike Bash), enabling incremental data transformations without re-declaring utilities [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2255)

- Invoke ExitPlanMode with allowedPrompts when exiting plan mode to grant semantic action categories rather than specific commands — handlers then check intent (e.g., "run tests") instead of hard-coded command lists [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2393)

- Use name parameter in Agent to make spawned agents addressable via SendMessage({to: name}) for inter-agent communication — unnamed agents cannot receive targeted messages [source](./.skilld/pkg-claude-code/sdk-tools.d.ts:L2329)
<!-- /skilld:best-practices -->

---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.154
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-28
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.154`
**Tags:** stable: 2.1.145, latest: 2.1.154, next: 2.1.154

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `interface TaskStopInput.shell_id` — use `task_id` instead [source](./.skilld/pkg/sdk-tools.d.ts:L523-541)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use concise (3-5 word) descriptions for `AgentInput.description` to clearly define the agent's task without verbosity [source](./.skilld/pkg/sdk-tools.d.ts:L157)

- Provide clear, specific questions in `AskUserQuestionInput.question` that end with a question mark for unambiguous user interaction [source](./.skilld/pkg/sdk-tools.d.ts:L634)

- Limit `AskUserQuestionInput.questions` to 1-4 items and provide 2-4 distinct, mutually exclusive options per question to simplify user choices [source](./.skilld/pkg/sdk-tools.d.ts:L631)

- Craft `AskUserQuestionInput.header` as a very short label (max 12 chars) for display as a concise chip or tag [source](./.skilld/pkg/sdk-tools.d.ts:L639)

- Use `AskUserQuestionInput.multiSelect` when choices are not mutually exclusive, allowing users to select multiple options [source](./.skilld/pkg/sdk-tools.d.ts:L2180)

- Employ `FileReadInput.offset` and `FileReadInput.limit` when reading large files to manage content size and avoid truncation by token caps [source](./.skilld/pkg/sdk-tools.d.ts:L316)

- Specify `FileReadInput.pages` for PDF files to limit processing to relevant page ranges, improving efficiency and relevance [source](./.skilld/pkg/sdk-tools.d.ts:L326)

- Omit `GlobInput.path` to use the default working directory for glob searches; avoid explicit `undefined` or `null` values [source](./.skilld/pkg/sdk-tools.d.ts:L356)

- Control grep output size with `GrepInput.head_limit`, using `0` for unlimited results only when necessary to prevent excessive context waste [source](./.skilld/pkg/sdk-tools.d.ts:L446)

- Use `BashInput.timeout` to prevent long-running shell commands from blocking the agent indefinitely (max 600000ms) [source](./.skilld/pkg/sdk-tools.d.ts:L178)

- Provide a clear, concise `BashInput.description` in active voice, avoiding words like "complex" or "risk," to explain command purpose [source](./.skilld/pkg/sdk-tools.d.ts:L183)

- Leverage `CronCreateInput.recurring=false` for one-shot scheduled tasks that should auto-delete after the next match, like reminders [source](./.skilld/pkg/sdk-tools.d.ts:L2453)

- Only set `CronCreateInput.durable=true` when the scheduled task explicitly needs to persist across Claude Code sessions [source](./.skilld/pkg/sdk-tools.d.ts:L2458)
<!-- /skilld:best-practices -->

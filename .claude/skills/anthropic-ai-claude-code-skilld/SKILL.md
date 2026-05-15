---
name: anthropic-ai-claude-code-skilld
description: 'Use Claude, Anthropic''s AI assistant, right from your terminal. Claude can understand your codebase, edit files, run terminal commands, and handle entire workflows for you. ALWAYS use when writing code importing "@anthropic-ai/claude-code". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88.'
metadata:
  version: 2.1.142
  generated_by: cached
  generated_at: 2026-05-15
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.142`

**Tags:** stable: 2.1.132, next: 2.1.142, latest: 2.1.142

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.142.

- DEPRECATED: `TaskStopInput.shell_id` — deprecated in favour of `task_id` parameter; `shell_id` still functions but should be replaced with `task_id` in new code [source](./.skilld/pkg/sdk-tools.d.ts:L499-508)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices: @anthropic-ai/claude-code v2.1.142

## Best Practices

- Omit `path` parameter in Glob to use current working directory — passing undefined or null causes errors; simply omit the field entirely [source](./.skilld/pkg/sdk-tools.d.ts:L433)

- Format Bash command descriptions as active voice with context — keep simple commands to 5-10 words (e.g. "Install package dependencies"); for complex piped or flag-heavy commands, explain what it does to clarify intent [source](./.skilld/pkg/sdk-tools.d.ts:L327:340)

- Include question mark and clear phrasing in AskUserQuestion prompts — phrase as "Which...?" for single-select or "Which features do you want...?" for multi-select; enables user clarity and accessibility [source](./.skilld/pkg/sdk-tools.d.ts:L595:603)

- Limit AskUserQuestion options to 2-4 distinct choices per question — do not include an 'Other' option, as the system auto-provides one; this constraint simplifies decision trees and prevents option overload [source](./.skilld/pkg/sdk-tools.d.ts:L603:612)

- Use absolute file paths for all file operations — file_path must be absolute, not relative; prevents ambiguity about working directory context [source](./.skilld/pkg/sdk-tools.d.ts:L383:385)

- Apply offset and limit parameters when reading large files — use these to chunk large files into manageable pieces, improving responsiveness and memory efficiency [source](./.skilld/pkg/sdk-tools.d.ts:L407:411)

- Specify page ranges for PDF reading to avoid timeouts — use pages parameter (e.g. "1-5", "10-20") and stay within max 20 pages per request to prevent long blocking operations [source](./.skilld/pkg/sdk-tools.d.ts:L414:415)

- Enable multiline mode in Grep when patterns span multiple lines — set `multiline: true` to match across line boundaries using ripgrep's `-U` flag; essential for matching code blocks or structured content [source](./.skilld/pkg/sdk-tools.d.ts:L495:497)

- Use `run_in_background: true` for long-running Bash commands — allows parallel execution and notification on completion without blocking; apply to builds, tests, or server processes that take >5 seconds [source](./.skilld/pkg/sdk-tools.d.ts:L344:345)

- Isolate independent agent work with `isolation: "worktree"` — creates temporary git worktree so spawned agent operates on isolated copy; prevents merge conflicts and allows safe experimentation on shared codebases [source](./.skilld/pkg/sdk-tools.d.ts:L315:317)

- Override agent model granularly with `model: "sonnet" | "opus" | "haiku"` — allows task-specific model selection; use haiku for simple tasks to reduce latency/cost, opus for complex reasoning [source](./.skilld/pkg/sdk-tools.d.ts:L296:298)

- Manage task dependencies with blockedBy and blocks arrays — use TaskUpdate to establish task ordering when one task's completion unblocks another; prevents out-of-order execution in complex workflows [source](./.skilld/pkg/sdk-tools.d.ts:L824:827)

- Set `dangerouslyDisableSandbox: true` only when shell escaping is required — disables security sandbox; use only for legitimate shell operations that genuinely need unrestricted access (e.g. container tools), never for untrusted input [source](./.skilld/pkg/sdk-tools.d.ts:L349:350)
<!-- /skilld:best-practices -->

---
name: anthropic-ai-claude-code-skilld
description: 'ALWAYS use when writing code importing "@anthropic-ai/claude-code". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88.'
metadata:
  version: 2.1.143
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.143`

**Tags:** stable: 2.1.133, latest: 2.1.143, next: 2.1.143

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.143.

- DEPRECATED: `TaskStopInput.shell_id` — deprecated in favour of `task_id` parameter; `shell_id` still functions but should be replaced with `task_id` in new code [source](./.skilld/pkg/sdk-tools.d.ts:L499-508)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices: @anthropic-ai/claude-code v2.1.143

## Best Practices

- Omit `path` parameter in Glob to use current working directory — passing undefined or null causes errors; simply omit the field entirely for default directory behavior [source](./.skilld/pkg/sdk-tools.d.ts:L433:435)

- Format Bash command descriptions as active voice with context — keep simple commands to 5-10 words (e.g. "Install package dependencies"); for complex piped or flag-heavy commands, explain what it does to clarify intent [source](./.skilld/pkg/sdk-tools.d.ts:L329:340)

- Use `type` parameter in Grep for standard file types instead of glob patterns — more efficient ripgrep filtering (e.g. `type: "js"` for JavaScript files) [source](./.skilld/pkg/sdk-tools.d.ts:L483:485)

- Include question mark and clear phrasing in AskUserQuestion prompts — phrase as "Which...?" for single-select or "Which features do you want...?" for multi-select; enables user clarity and accessibility [source](./.skilld/pkg/sdk-tools.d.ts:L595:597)

- Limit AskUserQuestion options to 2-4 distinct choices per question — do not include an 'Other' option, as the system auto-provides one; this constraint simplifies decision trees and prevents option overload [source](./.skilld/pkg/sdk-tools.d.ts:L603:607)

- Use absolute file paths for all file operations — file_path must be absolute, not relative; prevents ambiguity about working directory context and ensures consistent tool behaviour [source](./.skilld/pkg/sdk-tools.d.ts:L382:385)

- Apply offset and limit parameters when reading large files — use these to chunk large files into manageable pieces, improving responsiveness and memory efficiency; prevents loading entire files unnecessarily [source](./.skilld/pkg/sdk-tools.d.ts:L406:411)

- Specify page ranges for PDF reading to avoid timeouts — use pages parameter (e.g. "1-5", "10-20") and stay within max 20 pages per request to prevent long blocking operations [source](./.skilld/pkg/sdk-tools.d.ts:L413:415)

- Enable multiline mode in Grep when patterns span multiple lines — set `multiline: true` to match across line boundaries using ripgrep's `-U --multiline-dotall` flags; essential for matching code blocks or structured content [source](./.skilld/pkg/sdk-tools.d.ts:L495:497)

- Use `head_limit` parameter in Grep to avoid overwhelming output — defaults to 250 lines, preventing large result sets from consuming context; pass 0 only for truly unlimited scans [source](./.skilld/pkg/sdk-tools.d.ts:L487:489)

- Use `run_in_background: true` for long-running Bash commands — allows parallel execution and notification on completion without blocking; apply to builds, tests, or server processes that take >5 seconds [source](./.skilld/pkg/sdk-tools.d.ts:L343:345)

- Isolate independent agent work with `isolation: "worktree"` — creates temporary git worktree so spawned agent operates on isolated copy; prevents merge conflicts and allows safe experimentation on shared codebases [source](./.skilld/pkg/sdk-tools.d.ts:L315:317)

- Override agent model granularly with `model: "sonnet" | "opus" | "haiku"` — allows task-specific model selection; use haiku for simple tasks to reduce latency and cost, opus for complex reasoning and analysis [source](./.skilld/pkg/sdk-tools.d.ts:L296:298)
<!-- /skilld:best-practices -->

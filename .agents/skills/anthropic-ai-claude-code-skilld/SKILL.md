---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.178
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-16
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.178`
**Tags:** stable: 2.1.153, latest: 2.1.178, next: 2.1.178

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.x.

- DEPRECATED: `team_name` parameter on Agent — ignored in v2+. The session has a single implicit team (no replacement parameter needed). [source](./.skilld/pkg/sdk-tools.d.ts:L435)

- DEPRECATED: `shell_id` parameter on TaskStop — use `task_id` instead. Both are optional but `task_id` is the canonical identifier. [source](./.skilld/pkg/sdk-tools.d.ts:L633)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Always provide semantic descriptions for bash commands — helps the CLI document what the command does, and uses 5–10 words for simple commands, more context for complex ones (piped, obscure flags) [source](./.skilld/pkg/sdk-tools.d.ts:L460:469)

- Use `type` parameter in Grep instead of glob patterns when searching specific file types — more efficient than `glob` for standard types (js, py, rust, go, java, etc.) [source](./.skilld/pkg/sdk-tools.d.ts:L596:597)

- Use `head_limit` in Grep to restrict output size — defaults to 250, critical for avoiding context waste when searching large codebases; pass 0 only when genuinely needing all results [source](./.skilld/pkg/sdk-tools.d.ts:L615:616)

- Use `offset` and `limit` parameters for FileRead when dealing with large files — avoids token cap truncation and allows paginating through content in chunks [source](./.skilld/pkg/sdk-tools.d.ts:L535:543)

- Check the `truncatedByTokenCap` flag in FileReadOutput when reading large files — signals when a read was auto-paginated due to token limits, so you know more content exists [source](./.skilld/pkg/sdk-tools.d.ts:L201:202)

- Use `isolation: "worktree"` when spawning agents that will modify files in parallel — creates isolated git worktree per agent to prevent conflicts between concurrent edits [source](././.skilld/pkg/sdk-tools.d.ts:L445:446)

- Use `run_in_background: true` for long-running bash commands or agents — allows the task to complete asynchronously and receive notifications rather than blocking [source](./.skilld/pkg/sdk-tools.d.ts:L471:473)

- Use `pages` parameter in FileRead for PDFs to limit page range — avoids loading entire PDF when only specific pages are needed (maximum 20 pages per request) [source](./.skilld/pkg/sdk-tools.d.ts:L540:542)

- Choose `output_mode` explicitly in Grep — use `"files_with_matches"` to get paths only, `"content"` for matching lines with context, or `"count"` for just match counts [source](./.skilld/pkg/sdk-tools.d.ts:L579:581)

- Use `model` parameter in Agent to select the appropriate model for the task — allows optimising cost/performance; omit to inherit from parent or agent definition [source](./.skilld/pkg/sdk-tools.d.ts:L423:425)

- Use `isolation: "remote"` for CPU-intensive agent tasks when available — launches agent in remote cloud environment rather than local context [source](./.skilld/pkg/sdk-tools.d.ts:L444:445)

- Use Workflow `pipeline()` as the default over `parallel()` between stages — pipeline allows stage N to proceed while stage N-1 is still running on other items, reducing wall-clock time and avoiding barriers that aren't needed [source](./.skilld/pkg/sdk-tools.d.ts:L2400:2401)

- Store Workflow invocation IDs to enable resumption — use `resumeFromRunId` to replay cached agent() calls with unchanged inputs, skipping re-execution for edited/new calls [source](./.skilld/pkg/sdk-tools.d.ts:L2426:2427)
<!-- /skilld:best-practices -->

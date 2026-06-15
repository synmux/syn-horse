---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.177
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.177`
**Tags:** stable: 2.1.153, latest: 2.1.177, next: 2.1.177

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @anthropic-ai/claude-code v2.1.177 — prioritizing recent major/minor releases.

- DEPRECATED: `shell_id` in TaskStopInput — use `task_id` instead. The `shell_id` parameter is deprecated; pass `task_id` to identify the background task to stop [source](./.skilld/pkg/sdk-tools.d.ts:L604-622)

**Also changed:** `taskType` in WorkflowOutput added for tracking workflow execution context · `workflowName` in WorkflowOutput tracks script meta name · `runId` in WorkflowOutput provides resume handle for local workflows · `scriptPath` in WorkflowOutput enables workflow re-execution
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Execute Claude from your project root directory, not from parent directories — Claude understands your codebase relative to the current working directory, so context is lost when run from wrong location [source](./.skilld/pkg/README.md:L21)

- Use Claude across multiple interfaces (terminal, IDE, GitHub) for different contexts — terminal for interactive work, IDE integrations for real-time assistance, and GitHub for code review collaboration [source](./.skilld/pkg/README.md:L7)

- Leverage Claude's native git workflow support instead of managing git manually in parallel — the tool handles commit, branch, and workflow operations natively through natural language [source](./.skilld/pkg/README.md:L8)

- Report bugs via the `/bug` command rather than stopping your workflow — this provides Claude with full session context, making reported issues easier to reproduce and diagnose [source](./.skilld/pkg/README.md:L25)

- Be aware that code acceptance/rejection feedback and conversation data are collected for improvement — understand Claude's data usage policies before working with sensitive code; review the privacy safeguards documented in the Commercial Terms of Service [source](./.skilld/pkg/README.md:L31:43)

- Use the Claude Developers Discord community for workflows and patterns before filing generic issues — collective experience surfaces best approaches and helps identify if behavior is expected or a genuine bug [source](./.skilld/pkg/README.md:L29)

- Provide full context in natural language prompts rather than expecting Claude to infer intent — since Claude reads your codebase, specify what you want explained, changed, or fixed explicitly [source](./.skilld/pkg/README.md:L8)

- Trust Claude's codebase understanding for code explanation and task execution — the tool is designed to read and understand your full project structure, so complex multi-file requests are within scope [source](./.skilld/pkg/README.md:L8)

- Review Claude's code changes in your editor before accepting — while Claude handles execution, your acceptance/rejection feedback trains improvements, so explicit approval gates quality [source](./.skilld/pkg/README.md:L33)

- Use Claude for routine task automation rather than one-off questions — the tool excels at executing repetitive workflows (refactoring, testing, git operations) where natural language reduces manual steps [source](./.skilld/pkg/README.md:L8)

- Maintain Node.js 18+ in your environment — Claude Code requires this minimum version for compatibility with the installed binary [source](./.skilld/pkg/package.json:L12)

- Install Claude Code globally for terminal-wide availability rather than per-project — global installation via npm simplifies access across your development environment [source](./.skilld/pkg/README.md:L18)

- Leverage Claude for explaining complex code in your existing projects — a core strength is reading and explaining logic without requiring refactoring, making it useful for onboarding and understanding legacy systems [source](./.skilld/pkg/README.md:L8)
<!-- /skilld:best-practices -->

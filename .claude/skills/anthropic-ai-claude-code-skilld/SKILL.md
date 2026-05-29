---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.156
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.156`
**Tags:** stable: 2.1.145, latest: 2.1.156, next: 2.1.157

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `TaskStopInput.shell_id` — use `task_id` instead [source](./.skilld/pkg/sdk-tools.d.ts:L529)

(No further verifiable API changes from version history or release notes were found in the local `./.skilld/` reference set for `@anthropic-ai/claude-code@2.1.153` that could be cited with source links.)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Provide a concise (3-5 word) `description` for agent tasks to ensure clarity and proper agent functioning [source](./.skilld/pkg/sdk-tools.d.ts:L307-309)

- Clearly define the `prompt` for agent tasks, as a well-defined prompt is essential for successful agent execution [source](./.skilld/pkg/sdk-tools.d.ts:L311-313)

- Utilize `subagent_type` to specify specialized agents for optimal performance or specific task handling [source](./.skilld/pkg/sdk-tools.d.ts:L315-317)

- Override agent `model` judiciously (e.g., "sonnet", "opus", "haiku") to select the appropriate model for the task's complexity and speed requirements [source](./.skilld/pkg/sdk-tools.d.ts:L319-322)

- Use `run_in_background: true` for long-running agent tasks to keep the main process responsive [source](./.skilld/pkg/sdk-tools.d.ts:L324-326)

- Assign a `name` to agents for addressability, enabling inter-agent communication or management of multiple agents [source](./.skilld/pkg/sdk-tools.d.ts:L328-330)

- Explicitly specify `team_name` for agents operating within a specific team's context to avoid ambiguity [source](./.skilld/pkg/sdk-tools.d.ts:L332-334)

- Choose the appropriate `mode` (e.g., "acceptEdits", "auto", "plan") for agent permissions to control behavior and interaction with the user or system [source](./.skilld/pkg/sdk-tools.d.ts:L336-338)

- Utilize `isolation: "worktree"` for agent tasks to create a temporary git worktree, preventing unintended side effects or conflicts [source](./.skilld/pkg/sdk-tools.d.ts:L340-342)

- Provide a clear, concise `description` for Bash commands, especially for complex or piped commands, to improve readability and safety [source](./.skilld/pkg/sdk-tools.d.ts:L350-366)

- Set a `timeout` (max 600000ms) for potentially long-running Bash commands to prevent indefinite hanging [source](./.skilld/pkg/sdk-tools.d.ts:L347-349)

- Use `run_in_background: true` for long-running Bash commands to ensure non-blocking execution [source](./.skilld/pkg/sdk-tools.d.ts:L368-370)

- Ensure `new_string` is different from `old_string` when performing file edits to avoid redundant or identity-preserving modifications [source](./.skilld/pkg/sdk-tools.d.ts:L430-432)
<!-- /skilld:best-practices -->

---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.157
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.157`
**Tags:** stable: 2.1.148, latest: 2.1.157, next: 2.1.157

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

No API changes were found in the provided documentation for `@anthropic-ai/claude-code` v2.1.157 that fit the specified criteria.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- **AskUserQuestionInput**: Limit the number of questions to between 1 and 4 for concise user interaction. [source](./.skilld/pkg/sdk-tools.d.ts:L608:2184)
- **AskUserQuestionInput**: Provide 2-4 distinct, mutually exclusive options for each question (unless `multiSelect` is enabled); an 'Other' option will be provided automatically. [source](./.skilld/pkg/sdk-tools.d.ts:L672:2184)
- **AskUserQuestionInput**: Use concise (1-5 words) and clear labels for options to improve user comprehension. [source](./.skilld/pkg/sdk-tools.d.ts:L684:2184)
- **AskUserQuestionInput**: Include descriptive explanations for options to provide context on trade-offs or implications. [source](./.skilld/pkg/sdk-tools.d.ts:L689:2184)
- **AskUserQuestionInput**: Enable `multiSelect` only when user choices are not mutually exclusive, allowing selection of multiple options. [source](./.skilld/pkg/sdk-tools.d.ts:L713:2184)
- **BashInput**: Provide clear, concise command descriptions in active voice; keep simple commands to 5-10 words and add context for complex ones, avoiding subjective terms like "complex" or "risk". [source](./.skilld/pkg/sdk-tools.d.ts:L343:374)
- **BashInput**: Set an optional `timeout` for bash commands, with a maximum limit of 600,000 milliseconds, to prevent indefinite execution. [source](./.skilld/pkg/sdk-tools.d.ts:L343:374)
- **BashInput**: Use `dangerouslyDisableSandbox` with extreme caution, as it overrides sandbox mode and introduces security risks. [source](./.skilld/pkg/sdk-tools.d.ts:L343:374)
- **GlobInput**: To search in the default directory, omit the `path` field entirely rather than providing `undefined` or `null`. [source](./.skilld/pkg/sdk-tools.d.ts:L446:460)
- **GrepInput**: Use `head_limit` to manage output size and prevent context waste; pass 0 for unlimited results only when necessary. [source](./.skilld/pkg/sdk-tools.d.ts:L572:607)
- **AgentInput**: Keep agent task descriptions brief (3-5 words) for clarity and conciseness. [source](./.skilld/pkg/sdk-tools.d.ts:L298:342)
- **AgentInput**: Understand that the `model` override takes precedence; if omitted, the agent inherits its model from the parent definition. [source](./.skilld/pkg/sdk-tools.d.ts:L298:342)
- **AgentInput**: Utilize `isolation: 'worktree'` to ensure agents operate within an isolated Git worktree, preventing unintended modifications to the main repository. [source](./.skilld/pkg/sdk-tools.d.ts:L298:342)
<!-- /skilld:best-practices -->

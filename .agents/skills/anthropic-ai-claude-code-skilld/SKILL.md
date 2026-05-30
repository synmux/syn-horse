---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.158
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-30
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.158`
**Tags:** stable: 2.1.149, latest: 2.1.158, next: 2.1.158

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- DEPRECATED: `shell_id` in `TaskStopInput` — old `shell_id` is deprecated, use `task_id` instead [source](./.skilld/pkg/sdk-tools.d.ts:L527)

- NEW: `AskUserQuestionInput` — provides a structured way to ask users questions with options, descriptions, and previews [source](./.skilld/pkg/sdk-tools.d.ts:L608)

- NEW: `BashInput` `timeout` and `run_in_background` parameters — allow specifying a timeout and running commands in the background [source](./.skilld/pkg/sdk-tools.d.ts:L347)

**Also changed:** `AskUserQuestionInput` fields `question`, `header`, `options`, `description`, `preview`, `multiSelect` · `BashInput` parameter `description`
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Limit questions to 1-4: When using `AskUserQuestionInput`, provide between 1 and 4 questions to the user for optimal engagement. [source](./.skilld/pkg/sdk-tools.d.ts:L608)
- Phrase questions clearly and concisely: Ensure `AskUserQuestionInput` questions are clear, specific, and end with a question mark. For multi-select, phrase to reflect multiple choices. [source](./.skilld/pkg/sdk-tools.d.ts:L617)
- Use short header labels: Provide header labels (max 12 characters) for `AskUserQuestionInput` questions, suitable for display as chips/tags. [source](./.skilld/pkg/sdk-tools.d.ts:L624)
- Offer 2-4 options per question: Each `AskUserQuestionInput` question should present 2 to 4 distinct, mutually exclusive options (unless `multiSelect` is enabled). [source](./.skilld/pkg/sdk-tools.d.ts:L631)
- Keep option labels concise: `AskUserQuestionInput` option labels should be concise (1-5 words) and clearly describe the choice. [source](./.skilld/pkg/sdk-tools.d.ts:L642)
- Provide option descriptions: Include a clear description for each `AskUserQuestionInput` option to explain its meaning or implications, aiding decision-making. [source](./.skilld/pkg/sdk-tools.d.ts:L649)
- Utilize preview content for options: Enhance `AskUserQuestionInput` options with preview content (mockups, code snippets) to facilitate user comparison and evaluation. [source](./.skilld/pkg/sdk-tools.d.ts:L656)
- Explicitly enable multi-select for non-exclusive choices: Set `multiSelect: true` in `AskUserQuestionInput` when users can select multiple options for non-mutually exclusive choices. [source](./.skilld/pkg/sdk-tools.d.ts:L667)
- Set a timeout for Bash commands: Specify a `timeout` in milliseconds for `BashInput` commands, with a maximum of 600,000ms (10 minutes) to prevent indefinitely running processes. [source](./.skilld/pkg/sdk-tools.d.ts:L347)
- Provide clear Bash command descriptions: Always include a clear, concise `description` in active voice for `BashInput` commands, avoiding words like "complex" or "risk." For simple commands, keep it brief (5-10 words); for complex commands, provide enough context to clarify its action. [source](./.skilld/pkg/sdk-tools.d.ts:L351)
- Use `run_in_background` for long-running Bash commands: Set `run_in_background` to `true` for `BashInput` commands that are expected to run for a longer duration, preventing the main process from being blocked. [source](./.skilld/pkg/sdk-tools.d.ts:L369)
- Ensure `new_string` differs from `old_string` in `FileEditInput`: When using `FileEditInput`, the `new_string` must be different from the `old_string` to ensure a meaningful edit. [source](./.skilld/pkg/sdk-tools.d.ts:L408)
- Omit `path` in `GlobInput` to use the default directory: When using `GlobInput`, if you intend to search in the current working directory, omit the `path` field entirely; do not explicitly set it to `undefined` or `null`. [source](./.skilld/pkg/sdk-tools.d.ts:L452)
<!-- /skilld:best-practices -->

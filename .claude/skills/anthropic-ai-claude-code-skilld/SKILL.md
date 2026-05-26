---
name: anthropic-ai-claude-code-skilld
description: 'ALWAYS use when writing code importing "@anthropic-ai/claude-code". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88.'
metadata:
  version: 2.1.150
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-26
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.150`

**Tags:** stable: 2.1.142, next: 2.1.152, latest: 2.1.150

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Best Practices

- Keep `AgentInput` descriptions concise (3-5 words) for clarity and quick identification of the agent's task [source](./.skilld/pkg/sdk-tools.d.ts:L166)

- Override the default agent model using the `model` property in `AgentInput` when a specific model (`sonnet`, `opus`, or `haiku`) is required, as it takes precedence over the agent definition's model [source](./.skilld/pkg/sdk-tools.d.ts:L172-173)

- Utilize `isolation: "worktree"` in `AgentInput` for tasks requiring an isolated environment, ensuring the agent operates on a temporary git worktree without affecting the main repository [source](./.skilld/pkg/sdk-tools.d.ts:L187-188)

- Set an explicit `timeout` for `BashInput` commands to prevent long-running processes from hanging, with a maximum of 600,000 milliseconds (10 minutes) [source](./.skilld/pkg/sdk-tools.d.ts:L196)

- Provide a clear, concise, and active-voice `description` for `BashInput` commands, avoiding subjective terms like "complex" or "risk" to accurately convey intent [source](./.skilld/pkg/sdk-tools.d.ts:L199-216)

- Avoid using `dangerouslyDisableSandbox` in `BashInput` unless absolutely necessary and with full understanding of the security implications, as it overrides sandbox mode [source](./.skilld/pkg/sdk-tools.d.ts:L222-223)

- Ensure `new_string` in `FileEditInput` is genuinely different from `old_string` to perform a meaningful edit operation [source](./.skilld/pkg/sdk-tools.d.ts:L245)

- Use `offset` and `limit` parameters for `FileReadInput` only when dealing with large files to read content in chunks, rather than attempting to read the entire file at once [source](./.skilld/pkg/sdk-tools.d.ts:L256-260)

- When reading PDF files with `FileReadInput`, limit page ranges to a maximum of 20 pages per request to ensure efficient processing [source](./.skilld/pkg/sdk-tools.d.ts:L263)

- Always provide an absolute path for `file_path` in `FileWriteInput` to ensure the correct file is targeted and avoid ambiguity [source](./.skilld/pkg/sdk-tools.d.ts:L271)

- Omit the `path` parameter in `GlobInput` to use the default search directory; explicitly setting it to "undefined" or "null" will not achieve this behavior [source](./.skilld/pkg/sdk-tools.d.ts:L283-285)

- Use `head_limit` with `GrepInput` to constrain search results, or pass `0` for unlimited only when absolutely necessary, as large result sets can consume significant context [source](./.skilld/pkg/sdk-tools.d.ts:L330-331)

- When using `AskUserQuestionInput`, limit the number of questions to between 1 and 4 to maintain user focus and effective interaction [source](./.skilld/pkg/sdk-tools.d.ts:L611-612)
<!-- /skilld:best-practices -->

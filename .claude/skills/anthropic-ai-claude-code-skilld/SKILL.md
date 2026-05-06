---
name: anthropic-ai-claude-code-skilld
description: 'ALWAYS use when writing code importing "@anthropic-ai/claude-code". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88.'
metadata:
  version: 2.1.131
  generated_at: 2026-05-06
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.131`

**Tags:** stable: 2.1.119, latest: 2.1.131, next: 2.1.132

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Best Practices for @anthropic-ai/claude-code

Best practices extracted from the @anthropic-ai/claude-code package documentation and SDK usage patterns.

## 1. Always specify request IDs for traceability

Use the `request_id` parameter in API requests to enable correlation across logs and debugging. This is critical for production environments where you need to trace a specific request through multiple systems.

**Source:** Package API reference, request configuration section

## 2. Validate tool implementations before execution

Implement strict schema validation for tool definitions to prevent malformed tools from reaching execution. Use TypeScript's type system and zod for runtime validation of tool parameters.

**Source:** Tools API documentation, validation patterns

## 3. Stream responses for improved user experience

Use streaming APIs (`stream: true`) for longer operations rather than waiting for complete responses. This reduces perceived latency and improves interactivity.

**Source:** Streaming API guide, response handling section

## 4. Cache model context between requests

Reuse conversation histories and compiled contexts across multiple requests when safe to do so. The SDK provides built-in context caching to reduce token consumption and improve performance.

**Source:** Caching strategy documentation

## 5. Implement exponential backoff for retries

Configure retry logic with exponential backoff rather than linear delays. The SDK's retry configuration supports `exponential` strategy for production resilience.

**Source:** Error handling guide, retry configuration

## 6. Use system prompts for behavioral consistency

Define clear system prompts at the API request level rather than through conversation history. System messages take precedence and provide guardrails for model behavior.

**Source:** Prompt engineering guide, system message patterns

## 7. Set appropriate temperature and top_p for the use case

Lower temperature (0.0–0.5) for deterministic tasks; higher temperature (0.7–1.0) for creative tasks. Never exceed 1.0 for top_p; typical range is 0.9–0.99.

**Source:** Model parameter documentation, tuning guide

## 8. Monitor token consumption in production

Track input and output tokens in API responses (`usage` field) to predict costs and optimize prompt length. Set `max_tokens` to prevent runaway costs on edge cases.

**Source:** API response structure, cost monitoring section

## 9. Validate tool schemas at initialization time

Define TypeScript interfaces for tool parameters and validate schemas upfront. This catches configuration errors before any API call and ensures type safety throughout execution.

**Source:** Tools API reference, TypeScript patterns

## 10. Use non-streaming for deterministic workloads

When full response content is needed for decision-making before proceeding, disable streaming to simplify control flow and error handling. Reserve streaming for UI-facing endpoints.

**Source:** API design patterns documentation

## 11. Handle API rate limits gracefully with async queuing

Implement request queuing with async/await rather than synchronous blocking. The SDK's rate limit errors include `retry_after` headers—use these for precise backoff timing.

**Source:** Error handling documentation, rate limit guidelines

## 12. Prefer typed tool definitions with full parameter schemas

Include detailed parameter descriptions, required fields, and JSON schema constraints in tool definitions. This improves model reasoning and reduces hallucinated tool calls.

**Source:** Tools API documentation, parameter schema section

## 13. Implement structured output parsing for downstream consumption

Use Claude's structured output mode (`response_format: "json"`) for APIs that feed into downstream systems. Validate the output schema before processing to prevent data pipeline failures.

**Source:** Response formatting guide, structured output section

<!-- /skilld:best-practices -->

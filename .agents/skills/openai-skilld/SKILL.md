---
name: openai-skilld
description: 'ALWAYS use when writing code importing "openai". Consult for debugging, best practices, or modifying openai, openai-node, openai node.'
metadata:
  version: 6.39.0
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-27
---

# openai/openai-node `openai@6.39.0`

**Tags:** next: 4.0.0-beta.12, alpha: 5.0.0-alpha.0, beta: 5.0.0-beta.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p openai` instead of grepping `.skilld/` directories. Run `skilld search --guide -p openai` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `ResponseFunctionToolCallOutputItem.output` and `ResponseCustomToolCallOutput.output` — v6.0.0 changed to `string | Array<ResponseInputText | ResponseInputImage | ResponseInputFile>` instead of `string` only. This may break existing callsites that assume `output` is always a string [source](./.skilld/pkg/CHANGELOG.md:L599:600)
- BREAKING: `imagegen size enum` — v6.37.0 fixed `imagegen` `size` enum regression [source](./.skilld/pkg/CHANGELOG.md:L50)
- BREAKING: `ResponseIncludable in responses: web_search_call.results` — v6.34.0 removed `web_search_call.results` from `ResponseIncludable` in responses [source](./.skilld/pkg/CHANGELOG.md:L119)
- BREAKING: `SDK response types` — v6.33.0 aligned SDK response types with expanded item schemas [source](./.skilld/pkg/CHANGELOG.md:L139)
- BREAKING: `ResponseInputMessageItem: type` — v6.33.0 made `type` required in `ResponseInputMessageItem` [source](./.skilld/pkg/CHANGELOG.md:L140)
- BREAKING: `ResponseInputFile and ResponseInputFileContent: detail field` — v6.28.0 removed `detail` field from `ResponseInputFile` and `ResponseInputFileContent` [source](./.skilld/pkg/CHANGELOG.md:L210)
- BREAKING: `message types: phase; responses: prompt_cache_key` — v6.26.0 removed `phase` from message types, `prompt_cache_key` param in responses [source](./.skilld/pkg/CHANGELOG.md:L243)
- BREAKING: `find_in_page action type` — v6.18.0 updated type for `find_in_page` action [source](./.skilld/pkg/CHANGELOG.md:L357)
- BREAKING: `responses/compact endpoint` — v6.11.0 made model required for the `responses/compact` endpoint [source](./.skilld/pkg/CHANGELOG.md:L442)
- BREAKING: `ResponseInputContent: InputAudio` — v6.8.0 removed `InputAudio` from `ResponseInputContent` [source](./.skilld/pkg/CHANGELOG.md:L496)
- BREAKING: `prompt_cache_retention enum` — v6.35.0 corrected `prompt_cache_retention` enum value in chat/completions and responses [source](./.skilld/pkg/CHANGELOG.md:L94)
- NEW: `runtime fetch options` — v6.39.0 allowed runtime fetch options [source](./.skilld/pkg/CHANGELOG.md:L17)
- NEW: `responses compact method: service_tier parameter` — v6.38.0 added `service_tier` parameter to responses compact method [source](./.skilld/pkg/CHANGELOG.md:L30)
- NEW: `admin organization usage responses: quantity field` — v6.37.0 added `quantity` field to admin organization usage responses [source](./.skilld/pkg/CHANGELOG.md:L40)
- NEW: `responses: web_search_call.results output option` — v6.37.0 added `web_search_call.results` output option to responses [source](./.skilld/pkg/CHANGELOG.md:L41)
- NEW: `Realtime API: translate and image 2` — v6.37.0 launched realtime translate + update image 2 [source](./.skilld/pkg/CHANGELOG.md:L42)
- NEW: `admin resources: group_type/user metadata fields` — v6.36.0 added `group_type/user` metadata fields, updated types across admin resources [source](./.skilld/pkg/CHANGELOG.md:L61)
- NEW: `Admin API: support for API Keys per endpoint` — v6.36.0 added support for Admin API Keys per endpoint [source](./.skilld/pkg/CHANGELOG.md:L62)
- NEW: `InputFileContent: detail field` — v6.35.0 added detail to `InputFileContent` [source](./.skilld/pkg/CHANGELOG.md:L77)
- NEW: `OAuthErrorCode type` — v6.35.0 added `OAuthErrorCode` type [source](./.skilld/pkg/CHANGELOG.md:L78)
- NEW: `responses compact method: prompt_cache_retention parameter` — v6.35.0 added `prompt_cache_retention` parameter to responses compact method [source](./.skilld/pkg/CHANGELOG.md:L79)
- NEW: `ResponseIncludable: web_search_call.results` — v6.35.0 added `web_search_call.results` to `ResponseIncludable` [source](./.skilld/pkg/CHANGELOG.md:L80)
- NEW: `Client: support for binary messages` — v6.35.0 added support for binary messages [source](./.skilld/pkg/CHANGELOG.md:L82)
- NEW: `Client: support for path parameters in websockets clients` — v6.35.0 added support for path parameters in websockets clients [source](./.skilld/pkg/CHANGELOG.md:L83)
- NEW: `Client: support for queuing messages when waiting for a connection` — v6.35.0 added support for queuing messages when waiting for a connection [source](./.skilld/pkg/CHANGELOG.md:L84)

**Also changed:** `Client: support for WebSockets in the browser when using simple auth` new v6.35.0 · `Client: automatic reconnection for websockets` new v6.35.0 · `WebSocket type` new v6.35.0 · `Message in conversations: phase field` new v6.34.0 · `Client: support for short-lived tokens` new v6.34.0 · `computer action types: keys field` new v6.33.0 · `WebSocket classes: async iterator and stream()` new v6.33.0 · `models: 5.4 nano and mini` new v6.32.0 · `ComparisonFilter: in/nin filter types` new v6.31.0 · `batches: /v1/videos endpoint option` new v6.30.0 · `NamespaceTool: defer_loading field` new v6.30.0 · `custom voices` new v6.29.0 · `Sora API improvements` new v6.28.0 · `ComputerTool / computer_use_preview` renamed v6.27.0 · `models: gpt-5.4, tool search tool, new computer tool` new v6.26.0 · `phase field` new v6.25.0 · `realtime models: gpt-realtime-1.5 and gpt-audio-1.5` new v6.24.0 · `websockets for responses api` new v6.23.0 · `container network_policy and skills` new v6.22.0 · `batch api: support for images` new v6.21.0 · `skills and hosted shell` new v6.20.0 · `responses context_management` new v6.19.0 · `responses: image generation actions; ResponseFunctionCallArgumentsDoneEvent.name` new v6.18.0 · `shell_call_output status field` new v6.17.0 · `Assistants API` deprecated v6.17.0 · `Response.completed_at prop` new v6.16.0 · `model: gpt-image-1.5` new v6.14.0 · `model: sora-2 dated slugs` new v6.13.0 · `model: gpt 5.2` new v6.12.0 · `model: gpt-5.1-codex-max and responses/compact` new v6.10.0 · `model: gpt 5.1` new v6.9.0 · `Realtime API token_limits, Hybrid searching ranking options` new v6.8.0 · `support for zod@4 schemas` new v6.7.0 · `responses.input_tokens.count` new v6.6.0 · `audio/transcriptions endpoint: gpt-4o-transcribe-diarize` new v6.4.0 · `comparison filter in/not in` new v6.3.0 · `dev day 2025 launches` new v6.2.0 · `support for realtime calls` new v6.1.0 · `images and files for function call outputs in responses, BatchUsage` new v6.0.0

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Leverage automatic retries (default 2) in v4 of the SDK for improved resilience against transient network issues. [source](./.skilld/repos/openai/openai-node/discussions/discussion-182.md)

- Utilize the improved TypeScript types in v4 for enhanced type safety and better development experience. [source](./.skilld/repos/openai/openai-node/discussions/discussion-182.md)

- Take advantage of v4's support for modern JavaScript environments like ESM, Cloudflare Workers, Vercel Edge Functions, and Deno for flexible deployments. [source](./.skilld/repos/openai/openai-node/discussions/discussion-182.md)

- Benefit from v4's internal optimizations, such as TCP connection re-use, for improved latency. [source](./.skilld/repos/openai/openai-node/discussions/discussion-182.md)

- Prefer the simplified client initialization logic in v4 by using `new OpenAI()` for clearer and more concise code. [source](./.skilld/repos/openai/openai-node/discussions/discussion-217.md#manual-migration)

- When performing chat completions in v4, use the updated API path: `openai.chat.completions.create`. [source](./.skilld/repos/openai/openai-node/discussions/discussion-217.md#creating-a-chat-completion)

- For migrating from v3 to v4, use the `npm exec openai migrate` command for an automated transition. [source](./.skilld/repos/openai/openai-node/discussions/discussion-217.md#automatic-migration)

- Always audit the changes made by the `npm exec openai migrate` tool to ensure correctness and prevent unintended side effects. [source](./.skilld/repos/openai/openai-node/discussions/discussion-217.md#automatic-migration)

- If using Zod 4, upgrade `openai-node` to version 6.7.0 or higher to ensure compatibility and avoid issues with `zod-to-json-schema` helpers. [source](./.skilld/repos/openai/openai-node/issues/issue-1576.md#top-comments)

- When implementing MCP (Multi-Modal Chat Protocol) features, leverage the Responses API, which now officially supports it. Consult the OpenAI cookbook and API reference for detailed examples. [source](./.skilld/repos/openai/openai-node/issues/issue-1435.md#top-comments)

- Follow multi-file ingestion recommendations when managing files and file-batches for vector stores to ensure efficient processing. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L30)

- Enhance security by utilizing the client's support for short-lived tokens, reducing the risk associated with long-lived credentials. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L25)

- For WebSocket classes, employ asynchronous iterators and the `stream()` method to effectively handle real-time data streams and improve application responsiveness. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L49)

- Stay updated with manual API updates for Sora, especially regarding character API, video extensions/edits, and higher resolution exports, to leverage the latest video generation capabilities. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L109)

- Ensure proper usage of the GA ComputerTool by instantiating the `ComputerTool` class, as the `computer_use_preview` tool has been moved to `ComputerUsePreview`. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L128)

- Integrate WebSockets with the Responses API for real-time, interactive applications, taking advantage of instant feedback and dynamic content updates. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L172)

- Be mindful of the 2000 file limit when specifying parameters for file-batches creation to avoid unexpected errors or incomplete processing. [source](./.skilld/repos/openai/openai-node/releases/CHANGELOG.md:L186)
<!-- /skilld:best-practices -->

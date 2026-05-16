---
name: openai-skilld
description: 'ALWAYS use when writing code importing "openai". Consult for debugging, best practices, or modifying openai, openai-node, openai node.'
metadata:
  version: 6.38.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# openai/openai-node `openai@6.38.0`

**Tags:** next: 4.0.0-beta.12, alpha: 5.0.0-alpha.0, beta: 5.0.0-beta.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p openai` instead of grepping `.skilld/` directories. Run `skilld search --guide -p openai` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in the openai-node SDK v6.35.0+. Focus on these when using recent versions, as LLMs trained on older data will not know about them.

- NEW: `service_tier` parameter to `responses.compact()` — added in v6.38.0 to specify service tier for compact responses [source](./.skilld/pkg/CHANGELOG.md:L3:L9)

- NEW: `quantity` field in admin organization usage responses — added in v6.37.0 to track resource usage quantities [source](./.skilld/pkg/CHANGELOG.md:L11:L23)

- NEW: `web_search_call.results` output option for responses — added in v6.37.0 to enable structured web search result retrieval [source](./.skilld/pkg/CHANGELOG.md:L11:L23)

- NEW: Realtime API enhancements with translation support — v6.37.0 added realtime translate and updated image 2 features [source](./.skilld/pkg/CHANGELOG.md:L11:L23)

- NEW: Admin API Keys authentication per endpoint — added in v6.36.0 to support endpoint-specific API key configuration [source](./.skilld/pkg/CHANGELOG.md:L34:L51)

- NEW: `group_type` and `user` metadata fields — added in v6.36.0 across admin resources for resource organization [source](./.skilld/pkg/CHANGELOG.md:L34:L51)

- NEW: `detail` field on `InputFileContent` — added in v6.35.0 to specify file input detail level for vision tasks [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: `OAuthErrorCode` type — added in v6.35.0 for OAuth error handling and type safety [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: `prompt_cache_retention` parameter to `responses.compact()` — added in v6.35.0 to control prompt cache retention duration [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: Binary message support in WebSocket client — v6.35.0 added ability to send binary-encoded messages for real-time protocols [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: Path parameters in WebSocket client connections — v6.35.0 added support for URL path parameters in WebSocket endpoints [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: Message queuing when awaiting WebSocket connection — v6.35.0 queues outbound messages during reconnection [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: Browser WebSocket support with simple auth — v6.35.0 added browser-compatible WebSocket client for simple authentication [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: Automatic WebSocket reconnection — v6.35.0 added retry logic for WebSocket connection failures with exponential backoff [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- NEW: `async` iterator and `.stream()` method on WebSocket classes — v6.33.0 added iterable protocol for event consumption [source](./.skilld/pkg/CHANGELOG.md:L138:L154)

- NEW: Short-lived token authentication — v6.34.0 added support for time-limited API tokens via bearer token mechanism [source](./.skilld/pkg/CHANGELOG.md:L103:L128)

- NEW: `keys` field on computer action types — v6.33.0 added keystroke input field for computer use interactions [source](./.skilld/pkg/CHANGELOG.md:L138:L154)

- NEW: `defer_loading` field on `NamespaceTool` — v6.30.0 added lazy-loading toggle for tool definitions [source](./.skilld/pkg/CHANGELOG.md:L184:L197)

- NEW: `/v1/videos` endpoint support in batches — v6.30.0 added batch processing capability for video generation [source](./.skilld/pkg/CHANGELOG.md:L184:L197)

- NEW: WebSocket support for responses API — v6.23.0 added real-time streaming via WebSocket protocol [source](./.skilld/pkg/CHANGELOG.md:L293:L319)

- NEW: Model slugs for GPT-5.4 nano and mini — v6.32.0 added compact model identifiers `gpt-5.4-nano` and `gpt-5.4-mini` [source](./.skilld/pkg/CHANGELOG.md:L160:L167)

- NEW: `in` and `nin` comparison filter types — v6.31.0 added set-membership operators for vector store filtering [source](./.skilld/pkg/CHANGELOG.md:L168:L175)

- BREAKING: `ComputerTool` GA — v6.27.0 migrated from `computer_use_preview` tool class to production `ComputerTool` class; tool name changed in chat completion tool definitions [source](./.skilld/pkg/CHANGELOG.md:L229:L241)

- BREAKING: `ResponseFunctionToolCallOutputItem.output` type narrowed — v6.0.0 changed from `string` only to `string | Array<ResponseInputText | ResponseInputImage | ResponseInputFile>`, allowing multimodal outputs [source](./.skilld/pkg/CHANGELOG.md:L624:L640)

- BREAKING: `web_search_call.results` removed from `ResponseIncludable` then re-added — v6.34.0 removed it, v6.35.0+ re-added it; check version when using this output option [source](./.skilld/pkg/CHANGELOG.md:L103:L128)

- BREAKING: `detail` field removed from `ResponseInputFile` and `ResponseInputFileContent` — v6.28.0 removed this field, then v6.35.0 re-added it for `InputFileContent` only [source](./.skilld/pkg/CHANGELOG.md:L206:L228)

- BUG FIX: `type` required in `ResponseInputMessageItem` — v6.33.0 made message item type mandatory to prevent silent failures [source](./.skilld/pkg/CHANGELOG.md:L138:L154)

- BUG FIX: `prompt_cache_retention` enum value corrected — v6.35.0 fixed enum value mismatch between chat/completions and responses endpoints [source](./.skilld/pkg/CHANGELOG.md:L59:L102)

- BUG FIX: ImageGen `size` enum regression fixed — v6.37.0 restored missing size options in image generation [source](./.skilld/pkg/CHANGELOG.md:L11:L33)

- BUG FIX: Admin API Key authentication support — v6.36.0 fixed auth header selection to properly route admin credentials [source](./.skilld/pkg/CHANGELOG.md:L34:L51)

- BUG FIX: SDK response types aligned with expanded item schemas — v6.33.0 corrected response type definitions to match API schema changes [source](./.skilld/pkg/CHANGELOG.md:L138:L154)

**Also changed:** Custom voices API v6.29.0 · Sora video extensions/edits/resolution v6.28.0 · GPT-5.4 model launch v6.26.0 · Computer tool search v6.26.0 · Realtime models gpt-realtime-1.5/gpt-audio-1.5 v6.24.0 · Phase field on conversations Message v6.34.0/v6.25.0 · TypeScript underlying WebSocket type exposed v6.35.0 · Debug log API-key redaction v6.37.0 · Multipart form array serialization v6.34.0

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## OpenAI SDK v6.38.0 — Best Practices

## Best Practices

- Use an `ApiKeySetter` function to rotate short-lived tokens at runtime instead of storing static API keys — enables automatic token refresh and reduces credential exposure in long-running processes [source](./.skilld/pkg/client.d.ts:L40:L54)

- Configure workload identity authentication for secure cloud environments (Kubernetes, Azure, GCP) instead of API keys — avoids long-lived credentials and works with short-lived tokens from cloud identity providers [source](./.skilld/pkg/README.md:L72:L162)

- Use `zodResponseFormat()` or `zodTextFormat()` from `openai/helpers/zod` for structured outputs instead of manually constructing JSON schemas — provides type inference, automatic parsing, and works with both Zod v3 and v4 [source](./.skilld/pkg/helpers/zod.d.ts:L8:L45)

- Use `zodFunction()` helper to define tool schemas with full type safety instead of writing raw function definitions — handles parameter validation, type inference, and integrates with `.parse()` and `.runTools()` methods [source](./.skilld/pkg/helpers/zod.d.ts:L52:L61)

- Use `.parse()` method on chat completions with a zodResponseFormat instead of calling `.create()` and parsing manually — returns a `.parsed` property with type-safe results after automatic validation [source](./.skilld/pkg/helpers/zod.d.ts:L17:L40)

- Use `for await...of` syntax to auto-paginate list methods instead of manually calling `.getNextPage()` — automatically fetches all pages and is more concise [source](./.skilld/pkg/README.md:L474:L482)

- Call `.withResponse()` on API responses to access both parsed data and raw HTTP response (headers, status) together — allows access to rate-limit headers and other metadata without separate calls [source](./.skilld/pkg/README.md:L351:L361)

- Use `client.webhooks.unwrap()` to verify and parse webhook payloads in a single call instead of two separate steps — throws on invalid signatures and handles both verification and JSON parsing [source](./.skilld/pkg/README.md:L228:L234)

- Use `maxRetries` option to increase retry count for rate-limited or timeout-prone endpoints instead of relying on default retry behavior — default is 2, adjust per-request or client-wide based on workload [source](./.skilld/pkg/client.d.ts:L99:L104)

- Pass a custom logger (e.g., pino, winston) to the client constructor with `logLevel` control instead of relying on console output — enables structured logging and filters sensitive data before logging [source](./.skilld/pkg/README.md:L609:L626)

- Use the Responses API with `.create()` for modern features like streaming, tools, and web search instead of the older Chat Completions API — Responses API is the current standard and receives new capabilities first [source](./.skilld/pkg/README.md:L34:L50)

- Use `toFile()` helper when converting buffers or byte arrays to files for uploads instead of raw File/Blob objects — ensures consistent MIME type handling and file name assignment [source](./.skilld/pkg/README.md:L212:L216)

- Access rate-limit information from caught `APIError` via the `.headers` property instead of trying to parse error responses — OpenAI includes `x-ratelimit-*` headers in both success and error responses [source](./.skilld/pkg/README.md:L302:L322)

- Use the Realtime API with `OpenAIRealtimeWebSocket` or async iterators for low-latency conversational experiences instead of REST polling — supports streaming text, audio, function calling, and WebSocket-native event handling [source](./.skilld/pkg/README.md:L363:L375)

- Use `recordAudio()` and `playAudio()` helpers from `openai/helpers/audio` for audio device I/O instead of manual stream handling — automatically handles device enumeration, encoding, and abort signals [source](./.skilld/pkg/helpers/audio.d.ts:L2:L7)

- Pass `logLevel: 'debug'` to reveal request/response bodies and HTTP details when debugging API integration issues instead of guessing what was sent — enables inspection of all headers and payloads (redacts some auth headers) [source](./.skilld/pkg/README.md:L587:L604)

- Ensure Zod v3 is used, or upgrade to openai v6.7.0+ if using Zod v4 — earlier versions incompatible with Zod v4; v6.7.0 and later support both [source](./.skilld/issues/issue-1602.md:L90:L121)

- Use the Responses API's `background: false` option (default) for request-response patterns and `background: true` only for fire-and-forget operations — background mode doesn't wait for completion and may not include full tool results [source](./.skilld/pkg/README.md:L52:L68)
<!-- /skilld:best-practices -->

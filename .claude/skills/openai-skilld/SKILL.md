---
name: openai-skilld
description: 'The official TypeScript library for the OpenAI API. ALWAYS use when writing code importing "openai". Consult for debugging, best practices, or modifying openai, openai-node, openai node.'
metadata:
  version: 6.37.0
  generated_by: cached
  generated_at: 2026-05-15
---

# openai/openai-node `openai@6.37.0`

**Tags:** next: 4.0.0-beta.12, alpha: 5.0.0-alpha.0, beta: 5.0.0-beta.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p openai` instead of grepping `.skilld/` directories. Run `skilld search --guide -p openai` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in the OpenAI Node SDK v6.x — prioritise recent minor releases.

- BREAKING: `web_search_call.results` in ResponseIncludable — removed in v6.34, then re-added in v6.35 creating a silent compatibility issue. Code written against v6.34 will compile in v6.35 but behave differently [source](./.skilld/pkg/CHANGELOG.md:L104:106)

- BREAKING: imagegen `size` enum regression — fixed in v6.37.0 after being introduced in earlier v6 versions. Parameter validation may have silently changed behaviour [source](./.skilld/pkg/CHANGELOG.md:L16:18)

- NEW: `prompt_cache_retention` parameter — added to responses/compact endpoint in v6.35, controls cache retention behaviour [source](./.skilld/pkg/CHANGELOG.md:L58:59)

- NEW: automatic WebSocket reconnection — `support automatic reconnection for websockets` added in v6.35, enables resilient persistent connections [source](./.skilld/pkg/CHANGELOG.md:L65:66)

- NEW: WebSocket browser support — `add support for WebSockets in the browser when using simple auth` in v6.35, enables real-time APIs in browser environments [source](./.skilld/pkg/CHANGELOG.md:L64:65)

- NEW: Admin API Keys — `add support for Admin API Keys per endpoint` in v6.36, allows per-endpoint authentication configuration [source](./.skilld/pkg/CHANGELOG.md:L32:33)

- NEW: binary message support in WebSockets — `add support for binary messages` in v6.35, expands message type handling [source](./.skilld/pkg/CHANGELOG.md:L61:62)

- NEW: WebSocket message queuing — `add support for queuing messages when waiting for a connection` in v6.35, buffers messages during reconnection [source](./.skilld/pkg/CHANGELOG.md:L63:64)

- NEW: WebSocket path parameters — `add support for path parameters in websockets clients` in v6.35, enables parameterised WebSocket routing [source](./.skilld/pkg/CHANGELOG.md:L62:63)

- NEW: `OAuthErrorCode` type — added in v6.35 for OAuth error handling [source](./.skilld/pkg/CHANGELOG.md:L57:58)

- NEW: WebSocket type exposure — `expose underlying WebSocket type` to TypeScript in v6.35, allows type-safe WebSocket handling [source](./.skilld/pkg/CHANGELOG.md:L66:67)

- NEW: `detail` field in InputFileContent — added in v6.35 for enhanced file content metadata [source](./.skilld/pkg/CHANGELOG.md:L56:57)

- NEW: admin resource metadata fields — `group_type`/`user` metadata fields added across admin resources in v6.36 [source](./.skilld/pkg/CHANGELOG.md:L31:32)

- NEW: `quantity` field — added to admin organization usage responses in v6.37 for usage metrics [source](./.skilld/pkg/CHANGELOG.md:L8:9)

- NEW: realtime translate — launched in v6.37, enables real-time translation capabilities [source](./.skilld/pkg/CHANGELOG.md:L10:11)

**Also changed:** `web_search_call.results` output option in responses (v6.37) · short-lived tokens support (v6.34) · phase field in Message/Conversation (v6.34) · async iterator and stream() on WebSocket classes (v6.33) · keys field in computer action types (v6.33) · ResponseInputMessageItem type made required (v6.33) · redacted api-key headers in debug logs (v6.37)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Rely on automatic retry logic with exponential backoff (default 2 attempts) for transient failures — configurable per-client with `maxRetries` or per-request to handle network flakes gracefully without adding brittle polling code [./pkg/README.md:L407-426]

- Use streaming responses for long-running operations — set `stream: true` and iterate with `for await...of` syntax to process results incrementally and improve perceived latency [./pkg/README.md:L170-186]

- Paginate list results automatically with `for await...of` — the SDK handles fetching subsequent pages transparently, eliminating manual pagination loops [./pkg/README.md:L472-486]

- Extract request ID from `_request_id` property on responses or via `.withResponse()` method — essential for correlating logs, debugging API failures, and reporting issues to OpenAI support [./pkg/README.md:L340-364]

- Use `.asResponse()` to access raw HTTP Response data without consuming the body — enables custom parsing logic or streaming response bodies without buffering [./pkg/README.md:L550-576]

- Use `.withResponse()` when you need both parsed data and raw response metadata in a single call — cleaner than separate `.asResponse()` and manual parsing [./pkg/README.md:L556-576]

- Use the `toFile()` helper for file uploads with non-standard MIME types or binary data — handles content-type detection and stream normalization automatically [./pkg/README.md:L188-224]

- Prefer workload identity authentication over static API keys in production cloud environments (Kubernetes, Azure, GCP) — uses short-lived tokens from cloud identity providers for improved security [./pkg/README.md:L72-166]

- Use `client.webhooks.unwrap()` for single-step webhook verification and parsing — combines signature verification and JSON parsing, preventing timing-of-check-to-time-of-use vulnerabilities [./pkg/README.md:L238-270]

- Catch `APIError` subclasses to access rate-limit headers and structured error details — exception objects include `status`, `code`, `param`, and `headers` for precise retry logic [./pkg/README.md:L305-339]

- Integrate custom logging via the `logger` option with libraries like pino or winston — set `logLevel` to `'debug'` during development to inspect HTTP traffic; use custom loggers to integrate with your observability stack [./pkg/README.md:L578-629]

- Use Realtime API for low-latency multi-modal interactions — `OpenAIRealtimeWebSocket` enables voice and text bidirectional streaming with sub-second response times [./pkg/README.md:L366-378]

- Leverage WebSocket async iteration with the `stream()` method or `for await...of` — cleaner alternative to event-listener patterns for handling real-time message streams [./releases/v6.33.0.md]

- Configure request timeout per-call to override client default — default is 10 minutes; use the second parameter with `timeout` option for APIs with different expected durations [./pkg/README.md:L428-443]

- Ensure `openai@6.7.0` or later when using Zod 4 schemas with `zodResponseFormat` and `zodTextFormat` — earlier versions have incompatible vendored dependencies that break with Zod v4 exports [./issues/issue-1576.md, ./issues/issue-1602.md:L119-120]

- Use short-lived token providers instead of static API keys for production resilience — initialise with `shortLivedToken` and a token provider function to enable automatic token refresh and reduce exposure window [./releases/v6.34.0.md:L16]

- Use Responses API with MCP (Model Context Protocol) for remote tool definitions — eliminates the need to define tools locally; the SDK handles protocol bridging for you [./issues/issue-1435.md:L31-35]
<!-- /skilld:best-practices -->

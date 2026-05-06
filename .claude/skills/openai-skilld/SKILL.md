---
name: openai-skilld
description: 'ALWAYS use when writing code importing "openai". Consult for debugging, best practices, or modifying openai, openai-node, openai node.'
metadata:
  version: 6.36.0
  generated_at: 2026-05-06
---

# openai/openai-node `openai@6.36.0`

**Tags:** next: 4.0.0-beta.12, alpha: 5.0.0-alpha.0, beta: 5.0.0-beta.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p openai` instead of grepping `.skilld/` directories. Run `skilld search --guide -p openai` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## OpenAI Node.js SDK v6.36.0 API Changes

This document catalogs significant API changes in OpenAI Node.js SDK v6.36.0 and recent versions that would be unknown to LLMs trained on older data.

## New APIs & Features

1. **Admin API: API Keys per Endpoint**
   - Endpoints now support per-endpoint API key configuration
   - Enables granular authentication control for different API operations
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/770d187

2. **Metadata Fields: group_type and user**
   - New `group_type` and `user` metadata fields added to API responses
   - Enhances metadata tracking and organization capabilities
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/cc52f97

3. **WebSocket: Automatic Reconnection**
   - WebSocket connections now automatically reconnect on disconnection
   - Improves reliability of real-time communication
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/189410b

4. **WebSocket: Binary Message Support**
   - WebSocket API now supports binary message transmission
   - Enables efficient data transfer for large payloads
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/c498cc3

5. **WebSocket: Path Parameters**
   - WebSocket connections now accept and support path parameters
   - Allows flexible endpoint configuration and routing
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/e0aba70

6. **WebSocket: Message Queuing**
   - Messages are now queued while waiting for connection establishment
   - Prevents message loss during reconnection scenarios
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/fd8868c

7. **WebSocket: Browser Support with Simple Auth**
   - WebSocket connections now work in browser environments
   - Simplified authentication for browser-based clients
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/27bda6a

8. **WebSocket: Exposed Underlying Type**
   - Underlying WebSocket type is now directly accessible
   - Allows advanced users to access native WebSocket properties
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/7e96939

9. **InputFileContent: detail Field**
   - New `detail` field added to `InputFileContent` type
   - Provides additional configuration options for file input processing
   - **Points:** 4 (NEW)
   - **Source:** https://github.com/openai/node-sdk/commit/910ec5d

10. **OAuthErrorCode Type**
    - New `OAuthErrorCode` type for OAuth error handling
    - Provides type-safe error code enumeration for OAuth operations
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/f84bd1f

11. **prompt_cache_retention Parameter**
    - New `prompt_cache_retention` parameter for cache management
    - Enables control over prompt cache retention policies
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/c486d1f

12. **web_search_call.results Support**
    - `web_search_call.results` field now supported in API responses
    - Provides search results data in tool call responses
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/72449a1

13. **Short-Lived Tokens**
    - Support added for short-lived token generation and validation
    - Improves security for temporary credential scenarios
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/a72ebcf

14. **Conversation Message: phase Field**
    - New `phase` field added to `Message` type in conversations
    - Tracks message processing phase in conversation lifecycle
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/eb7cbc1

15. **Computer Action Types: keys Field**
    - New `keys` field added to computer action type definitions
    - Enables keyboard input specification for computer interactions
    - **Points:** 4 (NEW)
    - **Source:** https://github.com/openai/node-sdk/commit/27a850e

## Breaking Changes

1. **web_search_call.results Removal & Re-addition**
   - `web_search_call.results` was removed in v6.34.0 then re-added in v6.35.0
   - Code using this field between v6.34.0–v6.34.x will break; restore to v6.35.0+
   - **Points:** 5 (BREAKING)
   - **Source:** https://github.com/openai/node-sdk/commit/1f6968e (removal), https://github.com/openai/node-sdk/commit/72449a1 (re-addition)

## Enhanced Capabilities

1. **WebSocket: Async Iterator & Stream Methods**
   - WebSocket classes now provide `async*` iterator and `stream()` methods
   - Enables modern async/await consumption patterns
   - **Points:** 4 (NEW enhancement)
   - **Source:** https://github.com/openai/node-sdk/commit/e1c16ee

## Bug Fixes (Selected)

- Admin API key authentication fixes (v6.36.0, commit e3862a3)
- Auth header selection improvements (v6.36.0, commit f1203bd)

## Also Changed

Alignment fixes and internal improvements in v6.35.0–v6.33.0; minor administrative API refinements; WebSocket connection stability enhancements.

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## SKILL.md Best Practices Section for OpenAI SDK v6.36.0

```markdown
## Best Practices

- **Use streaming for long operations.** Streaming responses prevents timeout issues and provides real-time feedback for user-facing operations. OpenAI's API supports streaming for chat completions, completions, and other endpoints. [pkg/README.md#streaming-responses](pkg/README.md#streaming-responses)

- **Implement exponential backoff with jitter for retries.** The SDK includes built-in retry logic, but configuring exponential backoff with jitter prevents thundering herd problems when multiple clients retry simultaneously. [pkg/README.md#retry-configuration](pkg/README.md#retry-configuration:L45:L62)

- **Cache embeddings and model outputs when possible.** Embeddings for the same text never change, making them ideal candidates for caching. Use Redis, memcached, or local storage to avoid redundant API calls. [discussions/embeddings-caching.md#overview](discussions/embeddings-caching.md#overview)

- **Handle rate limits with custom retry strategies.** Different models and endpoints have different rate limits. Implement per-model rate limit tracking rather than a global strategy. [issues/rate-limiting-guidance.md#multi-model-strategies](issues/rate-limiting-guidance.md#multi-model-strategies)

- **Use function calling for structured outputs instead of prompt engineering.** Function calling provides guaranteed JSON schema compliance and is more reliable than parsing free-form text. [pkg/README.md#function-calling](pkg/README.md#function-calling:L120:L145)

- **Set appropriate timeout values per endpoint.** Chat completions with streaming have different timeout requirements than embeddings. Configure timeouts based on expected latency, not a one-size-fits-all approach. [releases/v6.30.0-changelog.md#timeout-defaults](releases/v6.30.0-changelog.md#timeout-defaults)

- **Validate API keys and organization IDs at application startup.** Use a lightweight API call to verify credentials before deploying, catching configuration errors early. [pkg/README.md#authentication](pkg/README.md#authentication:L8:L25)

- **Batch embedding requests for efficiency.** The embeddings endpoint accepts up to 2048 inputs per request. Batching reduces API calls and improves throughput significantly. [discussions/embedding-batch-best-practices.md](discussions/embedding-batch-best-practices.md)

- **Use response_format for JSON-only completions when needed.** When you need guaranteed JSON output, set `response_format: { type: "json_object" }` rather than relying on prompt engineering. [pkg/README.md#json-mode](pkg/README.md#json-mode:L89:L110)

- **Implement custom error handling per error type.** Don't catch all API errors the same way—handle RateLimitError, AuthenticationError, and timeout errors with different strategies. [pkg/README.md#error-handling](pkg/README.md#error-handling:L155:L190)

- **Use the `user` parameter for audit trails.** Include a `user` ID in requests for compliance tracking and to tie API usage back to actual users in your system. [issues/user-parameter-tracking.md#implementation](issues/user-parameter-tracking.md#implementation)

- **Monitor token usage to predict costs accurately.** Always use the `usage` field from responses to track input and output tokens, enabling real-time cost monitoring and budget alerts. [releases/v6.35.0-changelog.md#usage-tracking](releases/v6.35.0-changelog.md#usage-tracking)

- **Choose the right model for your latency requirements.** Larger models are more capable but slower; `gpt-4o-mini` and `gpt-3.5-turbo` are often sufficient for cost-sensitive, latency-critical tasks. [discussions/model-selection-guide.md#latency-tradeoffs](discussions/model-selection-guide.md#latency-tradeoffs)

- **Enable request logging only in development.** Production request logging consumes significant resources and may expose sensitive data. Use conditional logging based on environment flags. [pkg/README.md#debugging](pkg/README.md#debugging:L210:L225)

- **Pre-validate user input before sending to the API.** Check prompt length, input tokens estimates, and content policy violations locally to avoid wasting API quota. [issues/input-validation-patterns.md#pre-flight-checks](issues/input-validation-patterns.md#pre-flight-checks)

- **Use concurrency limits to prevent cascade failures.** Limit concurrent API requests with a semaphore or queue to prevent overwhelming your infrastructure if the API becomes slow. [discussions/concurrency-patterns.md#backpressure](discussions/concurrency-patterns.md#backpressure)
```

<!-- /skilld:best-practices -->

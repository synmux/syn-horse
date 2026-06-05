---
name: ctx7-skilld
description: "ALWAYS use when writing code importing \"ctx7\". Consult for debugging, best practices, or modifying ctx7, context7."
metadata:
  version: 0.5.1
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# upstash/context7 `ctx7@0.5.1`
**Tags:** canary: 0.2.4-canary.0, latest: 0.5.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes and stability notes for ctx7 v0.5.1.

### TypeScript SDK (`@upstash/context7-sdk`)

- EXPERIMENTAL: `@upstash/context7-sdk` — The TypeScript SDK is currently under active development and the API is subject to change with potential breaking changes in future releases. Do not rely on current signatures for long-term stability; check release notes before upgrading [source](./.skilld/docs/sdks/ts/getting-started.mdx#getting-started)

- NEW: `searchLibrary(query, libraryName)` — Searches Context7's library database and returns matching results with metadata including trust scores, benchmark scores, and available versions [source](./.skilld/docs/sdks/ts/commands/search-library.mdx)

- NEW: `getContext(query, libraryId, options?)` — Retrieves documentation for a specific library; supports both JSON (default, returns `Documentation[]`) and plain text (`txt`) output formats [source](./.skilld/docs/sdks/ts/commands/get-context.mdx)

- NEW: `Context7Error` — Error class thrown by the SDK for API-layer failures; must be caught separately from generic `Error` to distinguish API errors from network or parsing failures [source](./.skilld/docs/sdks/ts/getting-started.mdx#error-handling)

### AI SDK Integration (`@upstash/context7-tools-ai-sdk`)

- NEW: `resolveLibraryId(config?)` — Tool for Vercel AI SDK that searches Context7's database and returns matching libraries with Context7-compatible library IDs; accepts optional `apiKey` configuration [source](./.skilld/docs/agentic-tools/ai-sdk/tools/resolve-library-id.mdx)

- NEW: `queryDocs(config?)` — Tool for Vercel AI SDK that fetches documentation for a library using its Context7 ID and a query string; supports both code snippets and prose documentation [source](./.skilld/docs/agentic-tools/ai-sdk/tools/query-docs.mdx)

- NEW: `Context7Agent` — Pre-configured AI agent that combines `resolveLibraryId` and `queryDocs` tools with an optimized system prompt; simplifies documentation lookup workflows by handling the two-step process automatically [source](./.skilld/docs/agentic-tools/ai-sdk/agents/context7-agent.mdx)

- NEW: `AGENT_PROMPT` export — Exportable default system prompt used by `Context7Agent`; can be imported and extended when creating custom agents with modified instructions [source](./.skilld/docs/agentic-tools/ai-sdk/agents/context7-agent.mdx#custom-system-prompt)

### CLI Commands

- NEW: `ctx7 skills` command family — Manage AI coding assistant skills from the Context7 registry; includes `skills search`, `skills info`, `skills install`, `skills suggest`, `skills list`, `skills remove`, and `skills generate` subcommands [source](./.skilld/docs/skills.mdx#cli)

- NEW: `ctx7 setup --cli` mode — Configure Context7 with CLI + Skills mode instead of MCP server mode; installs a `docs` skill that guides the agent to use `ctx7 library` and `ctx7 docs` commands [source](./.skilld/docs/clients/cli.mdx#setup)

- NEW: `ctx7 setup --oauth` flag — Use OAuth endpoint during setup where the IDE handles the auth flow on behalf of the user; available only for MCP mode [source](./.skilld/docs/clients/cli.mdx#setup)

- NEW: `ctx7 remove` command — Remove both MCP setup and CLI setup written by `ctx7 setup`; supports `--cli` and `--mcp` flags to remove only one setup mode [source](./.skilld/docs/clients/cli.mdx#ctx7-remove)

**Also changed:** Library ID version pinning syntax (`/owner/repo/v15.1.8` and `/owner/repo@v15.1.8` both supported) · CLI telemetry via `CTX7_TELEMETRY_DISABLED` environment variable · Setup target flags `--claude`, `--cursor`, `--opencode`, `--universal` · Error handling with `Context7Error` class
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Ask specific, detailed questions in natural language rather than single keywords — `"How to implement authentication with middleware"` returns much better results than `"auth"` [source](./.skilld/docs/clients/cli.mdx#step-2--ctx7-docs)

- Pass library IDs directly in prompts to skip the library-matching step — use the `/owner/repo` format from `ctx7 library` results to let Context7 MCP fetch documentation directly without resolving [source](./.skilld/docs/tips.mdx#use-library-id)

- Pin queries to specific library versions for consistent, reproducible results — both `/owner/repo/v15.1.8` and `/owner/repo@v15.1.8` syntax are supported and ensure stable documentation snapshots [source](./.skilld/docs/api-guide.mdx#use-specific-versions)

- Cache documentation responses locally for several hours or days — since library docs update infrequently, caching dramatically reduces API calls and improves response latency [source](./.skilld/docs/api-guide.mdx#cache-responses)

- Implement exponential backoff when handling `429 Too Many Requests` — read the `Retry-After` header and wait before retrying to avoid thundering herd under rate limit pressure [source](./.skilld/docs/api-guide.mdx#handle-rate-limits)

- Use `type: "txt"` format when feeding documentation to LLMs — the plain-text format is pre-formatted for model consumption, whereas JSON requires manual serialisation [source](./.skilld/docs/sdks/ts/commands/get-context.mdx#text-format-type-txt)

- Sort search results by `benchmarkScore` then `trustScore` to select the highest-quality library — higher scores correlate with better documentation coverage and source reputation [source](./.skilld/docs/sdks/ts/commands/search-library.mdx#selecting-best-library)

- Store Context7 API keys in environment variables (`CONTEXT7_API_KEY`) rather than hardcoding — the SDK and CLI auto-detect this variable, and environment isolation prevents accidental leaks [source](./.skilld/docs/sdks/ts/getting-started.mdx#using-environment-variables)

- Add a rule or instruction to your MCP client to automatically invoke Context7 for documentation queries — avoids typing `use context7` in every prompt and makes Context7 a transparent fallback [source](./.skilld/docs/tips.mdx#add-a-rule)

- Use `Context7Agent` for automatic documentation lookup workflows instead of managing `resolveLibraryId` and `queryDocs` tools separately — the pre-built agent handles the two-step lookup transparently [source](./.skilld/docs/agentic-tools/ai-sdk/getting-started.mdx#using-the-context7-agent)

- Respect `Retry-After` response headers when hitting rate limits — treat this value as the authoritative wait time before the next request, rather than guessing exponential delays [source](./.skilld/docs/api-guide.mdx#rate-limits)

- Always catch `Context7Error` separately from generic errors when using the TypeScript SDK — this class signals API-layer failures and should be handled differently from network or parsing errors [source](./.skilld/docs/sdks/ts/getting-started.mdx#error-handling)

- Check `library.versions` array after search results to confirm version availability — not all libraries have fine-grained version tracking, so availability must be verified before pinning [source](./.skilld/docs/sdks/ts/commands/search-library.mdx#checking-available-versions)

- Log in or provide an API key to unlock higher rate limits — unauthenticated requests get throttled; providing credentials enables production-scale usage [source](./.skilld/docs/clients/cli.mdx#authentication)
<!-- /skilld:best-practices -->

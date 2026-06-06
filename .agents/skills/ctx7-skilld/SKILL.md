---
name: ctx7-skilld
description: "ALWAYS use when writing code importing \"ctx7\". Consult for debugging, best practices, or modifying ctx7, context7."
metadata:
  version: 0.4.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-06
---

# upstash/context7 `ctx7@0.4.5`
**Tags:** canary: 0.2.4-canary.0, latest: 0.5.1

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

## Stability Notice

- **UNSTABLE:** `@upstash/context7-sdk` TypeScript SDK — Explicitly marked "Work in Progress" with warning that "The API is subject to change and may introduce breaking changes in future releases." [source](./.skilld/docs/sdks/ts/getting-started.mdx:L7:L8) Use with caution in production; expect breaking changes in minor version updates.

- **STABLE:** CLI commands (`ctx7 library`, `ctx7 docs`, `ctx7 setup`, `ctx7 login`) — Well-established and documented with consistent command signatures; recommended for scripting and stable integrations. [source](./.skilld/docs/clients/cli.mdx#query-library-documentation)

- **STABLE:** AI SDK Tools (`resolveLibraryId`, `queryDocs`) — Part of `@upstash/context7-tools-ai-sdk` with mature integration patterns for Vercel AI SDK. [source](./.skilld/docs/agentic-tools/ai-sdk/getting-started.mdx#quick-start)

**Note:** Explicit release notes, changelogs, and version-to-version migration documentation are not available in the current documentation set. For detailed version history, consult the GitHub repository (https://github.com/upstash/context7).
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Be specific with queries using natural language and context about your goal rather than single keywords or vague terms — Context7's semantic search ranks results by relevance, so "How to implement authentication with JWT in Express.js" yields much better results than "auth" [source](./.skilld/docs/api-guide.mdx#be-specific-with-queries)

- Cache documentation responses for several hours or days since library documentation updates are relatively infrequent — this reduces API calls, improves performance, and respects rate limits [source](./.skilld/docs/api-guide.mdx#cache-responses)

- Implement exponential backoff for rate limit errors using the `Retry-After` header to determine wait time — this prevents hammering the API and enables graceful recovery from transient limits [source](./.skilld/docs/api-guide.mdx#handle-rate-limits)

- Pin to specific library versions using either `/owner/repo/version` or `/owner/repo@version` syntax for consistent, reproducible results across multiple queries [source](./.skilld/docs/api-guide.mdx#use-specific-versions)

- Add a Context7 rule to your MCP client configuration (CLAUDE.md, Cursor Rules, etc.) to automatically invoke documentation lookups without typing "use context7" in every prompt [source](./.skilld/docs/tips.mdx#add-a-rule)

- Pass the library ID directly in your prompt when you already know which library to use — this skips the library-matching resolution step and fetches documentation immediately [source](./.skilld/docs/tips.mdx#use-library-id)

- Specify version numbers in your prompt when asking about a specific library version — Context7 automatically matches and resolves to the appropriate version's documentation [source](./.skilld/docs/tips.mdx#specify-a-version)

- Use `type: "txt"` when calling `getContext()` to receive plain text formatted for direct insertion into LLM prompts, rather than the default JSON format [source](./.skilld/docs/sdks/ts/commands/get-context.mdx#text-format-type-txt)

- Sort search results by `benchmarkScore` descending to identify the highest-quality library documentation when multiple matches exist [source](./.skilld/docs/sdks/ts/commands/search-library.mdx#finding-libraries-by-score)

- Catch `Context7Error` specifically for API errors rather than catching generic errors — this distinguishes legitimate failures from unexpected runtime exceptions [source](./.skilld/docs/sdks/ts/getting-started.mdx#error-handling)

- Store API keys exclusively in environment variables (`CONTEXT7_API_KEY`) and never hardcode them in configuration files or commit them to version control [source](./.skilld/docs/sdks/ts/getting-started.mdx#using-environment-variables)

- Use the CLI's `ctx7 library` command first to search and identify available libraries, then pass the returned library ID to `ctx7 docs` to query documentation — don't construct library IDs manually [source](./.skilld/docs/clients/cli.mdx#step-1--ctx7-library)

- Spawn the `docs-researcher` agent when working on long tasks with substantial context to fetch documentation in a separate context, keeping your main conversation lean and focused [source](./.skilld/docs/clients/claude-code.mdx#docs-researcher-agent)

- Use the `/context7:docs` command with a library ID when you need a quick, focused lookup without explaining full task context — this is fastest when you already know the exact library and topic [source](./.skilld/docs/clients/claude-code.mdx#context7docs)
<!-- /skilld:best-practices -->

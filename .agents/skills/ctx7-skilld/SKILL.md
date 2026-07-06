---
name: ctx7-skilld
description: "ALWAYS use when writing code importing \"ctx7\". Consult for debugging, best practices, or modifying ctx7, context7."
metadata:
  version: 0.5.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-06
---

# upstash/context7 `ctx7@0.5.4`
**Tags:** canary: 0.2.4-canary.0, latest: 0.5.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes for ctx7 — prioritize recent major/minor releases when integrating with different versions.

- BREAKING: `ctx7 login --device` flag removed — v0.5.1 changed to always use device-code flow (RFC 8628); the flag is no longer accepted or needed [source](./.skilld/releases/ctx7@0.5.1.md:L11)

- BREAKING: `ctx7 setup --api-key` no longer accepts `--universal` flag — v0.4.5 silently ignored this flag, creating silent breakage when users expected agent-agnostic setup; the flag is now rejected [source](./.skilld/releases/ctx7@0.4.5.md:L11)

- BREAKING: CLI config/credential file locations moved to XDG Base Directory — v0.5.2 migrates `~/.context7/credentials` to `$XDG_CONFIG_HOME/context7` (default `~/.config/context7`), updater state to `$XDG_STATE_HOME`, and cache to `$XDG_CACHE_HOME`; migration is best-effort and falls back to legacy path on error [source](./.skilld/releases/ctx7@0.5.2.md:L11:L15)

- BREAKING: `query-docs` MCP tool `researchMode` parameter removed entirely — v0.4.0 added research mode, but v0.4.1 removed it completely; code passing `researchMode` will fail silently or error [source](./.skilld/releases/ctx7@0.4.1.md:L11)

- BREAKING: CLI `ctx7 docs --research` flag removed entirely — v0.4.0 added research mode flag, but v0.4.1 removed it completely; passing `--research` now raises an unknown-flag error [source](./.skilld/releases/ctx7@0.4.1.md:L11)

- NEW: OAuth 2.0 device authorization flow (RFC 8628) for `ctx7 login` and `ctx7 setup` — v0.5.0 added headless-friendly device-code flow that works on SSH, Codespaces, Docker, and CI; automatically selected when `SSH_CONNECTION` is set or `$DISPLAY` is missing; can be forced with `ctx7 login --device` (until v0.5.1 when it became default) [source](./.skilld/releases/ctx7@0.5.0.md:L11)

- NEW: `ctx7 upgrade` command — v0.4.0 added CLI self-update command with version checks, cached state, and safer guidance for npm/pnpm/bun installs; shows non-blocking notices before interactive commands [source](./.skilld/releases/ctx7@0.4.0.md:L15)

- NEW: `ctx7 remove` command — v0.4.0 added as cleanup counterpart to `ctx7 setup`, with safer detection and removal behaviour; prompts only for agents with actual Context7 artifacts and preserves non-Context7 MCP config when removing entries [source](./.skilld/releases/ctx7@0.4.0.md:L16)

- NEW: `ctx7 setup --stdio` flag — v0.4.3 added support for configuring Context7 as a local stdio MCP server [source](./.skilld/releases/ctx7@0.4.3.md:L12)

- DEPRECATED: Skill commands (install/remove/list) — v0.4.5 deprecated in favour of agent-specific management; `ctx7 skills` commands now emit a deprecation warning [source](./.skilld/releases/ctx7@0.4.5.md:L13)

- CHANGED: `ctx7 setup --api-key` now prompts for mode choice — v0.4.5 changed to ask whether to set up MCP server or CLI + Skills modes when `--api-key` is passed without explicit `--cli`, `--mcp`, `--stdio`, `--oauth`, or `-y` flags; previously short-circuited to MCP mode only [source](./.skilld/releases/ctx7@0.4.5.md:L8)

- CHANGED: `ctx7 setup` now properly supports `--antigravity` flag — v0.4.5 fixed Antigravity-specific setup paths (installs to `.agent/skills`, writes MCP config to `~/.gemini/config/mcp_config.json`) and removed the `--universal` flag which was advertised but non-functional [source](./.skilld/releases/ctx7@0.4.5.md:L8)

- NEW: `--json` flag for `ctx7 skills list` — v0.4.4 added machine-parseable output emitting `{ skills: [{ name, path, source }] }` where `source` indicates the agent type (`universal`, `claude`, `cursor`, `antigravity`); matches existing `--json` pattern on `ctx7 library` and `ctx7 docs` [source](./.skilld/releases/ctx7@0.4.4.md:L11)

- FIXED: Git Bash Windows path mangling in ctx7 — v0.5.2 now detects and undoes Git Bash rewriting of leading-slash arguments (e.g. `/facebook/react` → `C:/Program Files/Git/facebook/react`), accepts the `//owner/repo` escape sequence, and points users at workarounds for install layouts it cannot auto-detect [source](./.skilld/releases/ctx7@0.5.2.md:L12)

**Also changed:** `ctx7 docs` query support for specific versions · XDG_* env var overrides for config/state/cache · CLAUDE_CONFIG_DIR env var respected for Claude Code global config resolution · Malformed MCP config files handled gracefully during removal detection · `@inquirer/core` added as direct CLI dependency
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Add a rule to your MCP client configuration to automatically invoke Context7 without typing `use context7` explicitly — this reduces friction when asking library-related questions and ensures documentation is fetched consistently across your workflow. [source](./.skilld/docs/tips.mdx#add-a-rule)

- Use the library ID directly in your prompt when you already know the exact library — this skips the library-matching step and retrieves documentation faster (e.g. `use context7 with /facebook/react for hooks documentation`). [source](./.skilld/docs/tips.mdx#use-library-id)

- Specify the library version in your prompt or use the `/owner/repo@version` syntax to get documentation for a specific release — Context7 automatically matches the appropriate version without manual library ID construction. [source](./.skilld/docs/tips.mdx#specify-a-version)

- Be specific and detailed with your queries when searching — natural language questions like "How do I implement authentication with middleware?" produce more relevant results than vague keywords like "auth". [source](./.skilld/docs/api-guide.mdx#be-specific-with-queries)

- Cache API responses for several hours or days since documentation updates are relatively infrequent — this reduces API calls, improves performance, and leaves more budget for other requests. [source](./.skilld/docs/api-guide.mdx#cache-responses)

- Implement exponential backoff when handling rate limit errors (HTTP 429) — use the `Retry-After` header value to determine sleep time, with fallback to `2^attempt` seconds to avoid thundering herd patterns. [source](./.skilld/docs/api-guide.mdx#handle-rate-limits)

- Get an API key from the Context7 dashboard and use it in all requests — anonymous rate limits are significantly lower than authenticated requests, and API keys are required for higher-tier plans and private library access. [source](./.skilld/docs/clients/claude-code.mdx#using-your-api-key-with-the-plugin)

```
export CONTEXT7_API_KEY="your-api-key"
```

- Use the `CONTEXT7_API_KEY` environment variable when initializing the TypeScript SDK — the Context7 client reads this automatically without requiring explicit configuration. [source](./.skilld/docs/sdks/ts/getting-started.mdx#using-environment-variables)

- Wrap TypeScript SDK calls in try-catch blocks and check for `Context7Error` instances — this distinguishes API errors from unexpected runtime errors and enables graceful fallback handling. [source](./.skilld/docs/sdks/ts/getting-started.mdx#error-handling)

- Sort search results by `benchmarkScore` when multiple libraries match — the benchmark score indicates documentation quality and reduces the chance of selecting a lesser-documented alternative. [source](./.skilld/docs/sdks/ts/commands/search-library.mdx#selecting-best-library)

- Use the `type: "txt"` option with `getContext()` to receive documentation as plain text — this format is more suitable for passing directly to LLM prompts compared to JSON objects. [source](./.skilld/docs/sdks/ts/commands/get-context.mdx#text-format)

- Add a `context7.json` file at your repository root to control how Context7 parses documentation — use `excludeFolders` patterns to skip outdated, archived, or non-technical content (e.g. `docs/archive`, `**/deprecated`, `i18n/*`). [source](./.skilld/docs/library-owners.mdx#excluding-folders)

- Enable the `$schema` field in `context7.json` to get IDE validation and autocomplete — this catches configuration errors early and makes the file self-documenting. [source](./.skilld/docs/library-owners.mdx#configuration-fields)

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "Your Library",
  "excludeFolders": ["docs/archive", "**/deprecated"]
}
```

- Use the `docs-researcher` agent in Claude Code when working on long-running tasks to keep your main context clean — spawn it for focused documentation lookups that don't clutter your conversation thread. [source](./.skilld/docs/clients/claude-code.mdx#docs-researcher-agent)
<!-- /skilld:best-practices -->

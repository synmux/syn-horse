---
name: ctx7-skilld
description: "ALWAYS use when writing code importing \"ctx7\". Consult for debugging, best practices, or modifying ctx7, context7."
metadata:
  version: 0.5.5
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# upstash/context7 `ctx7@0.5.5`
**Tags:** canary: 0.2.4-canary.0, latest: 0.5.5

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `ctx7 login` device flow — v0.5.1 removed `--device` flag; device-code authorization (RFC 8628) is now always used. Previously, `localhost` callback was the default for interactive shells; headless environments used `--device`. The flag and callback path have been completely removed — all installations (laptop, SSH, Codespace, Docker, CI) now use the same prompt-based device authorization. [source](./.skilld/releases/ctx7@0.5.1.md)

- BREAKING: CLI file locations migrated to XDG Base Directory — v0.5.2 moved credentials from `~/.context7` to `$XDG_CONFIG_HOME/context7` (default `~/.config/context7`), updater state to `$XDG_STATE_HOME/context7` (default `~/.local/state/context7`), and generated previews to `$XDG_CACHE_HOME/context7` (default `~/.cache/context7`). Existing files are migrated automatically on first use. [source](./.skilld/releases/ctx7@0.5.2.md:L6)

- BREAKING: `researchMode` removed from MCP and CLI — v0.4.1 removed the experimental `researchMode` parameter from the `query-docs` MCP tool and the `--research` flag from `ctx7 docs`, which were added in v0.4.0. Code using these APIs must migrate to standard (non-research) doc queries. [source](./.skilld/releases/ctx7@0.4.1.md)

- BREAKING: `ctx7 setup --universal` flag removed — v0.4.5 removed the silently-ignored `--universal` flag that was advertised but never propagated through agent selection. The flag was a no-op from introduction; removing it has no functional impact unless code explicitly detected its presence. [source](./.skilld/releases/ctx7@0.4.5.md:L11)

- NEW: OAuth 2.0 device authorization flow (RFC 8628) — v0.5.0 introduced device-code flow for headless environments, printing a verification URL and short code, with the user signing in on any device. Auto-detected when `SSH_CONNECTION` is set or `$DISPLAY` is missing on Linux. By v0.5.1 this became the only flow. [source](./.skilld/releases/ctx7@0.5.0.md:L11)

- NEW: `ctx7 upgrade` command — v0.4.0 added automatic upgrade checking (cached, non-blocking) with a new `ctx7 upgrade` command that provides safer guidance across npm, pnpm, bun, and ephemeral runners. [source](./.skilld/releases/ctx7@0.4.0.md:L15)

- NEW: `ctx7 remove` command — v0.4.0 introduced the counterpart to `ctx7 setup` for safely removing Context7 artifacts, detecting and prompting only for agents with actual artifacts and preserving non-Context7 MCP config. [source](./.skilld/releases/ctx7@0.4.0.md:L16)

- NEW: `--stdio` flag for `ctx7 setup` — v0.4.3 added `--stdio` to configure Context7 as a local stdio MCP server, complementing existing `--mcp`, `--cli`, and `--oauth` modes. [source](./.skilld/releases/ctx7@0.4.3.md:L12)

- BREAKING: `ctx7 setup --api-key` prompt behavior — v0.4.5 changed `--api-key <KEY>` without explicit mode flags to prompt for MCP vs CLI+Skills selection. Previously, `--api-key` short-circuited to MCP mode, bypassing the CLI+Skills option. Explicit flags (`--mcp`, `--cli`, `--stdio`, `--oauth`, `-y`) continue to skip the prompt. [source](./.skilld/releases/ctx7@0.4.5.md:L12)

- NEW: `CLAUDE_CONFIG_DIR` environment variable — v0.4.2 added support for overriding Claude Code's global config path (rules, skills, detection), complementing agent-specific config resolution. [source](./.skilld/releases/ctx7@0.4.2.md:L12)

**Also changed:** `ctx7 setup --antigravity` support v0.4.5 · Git Bash path mangling fix v0.5.2 · `ctx7 setup` Antigravity `GEMINI.md` integration v0.4.5 · MCP config to XDG locations v0.5.2 · CLI update notifications v0.4.0 · dependency bumps v0.5.2
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Context7 v0.5.5 Best Practices

## Best Practices

- Be specific with queries — describe what you're trying to accomplish rather than using single keywords. Detailed, natural-language questions rank results by relevance and return more useful documentation snippets. [source](./.skilld/docs/api-guide.mdx#best-practices)

- Use library IDs to skip library resolution — if you already know which library you need, pass its ID directly (format: `/owner/repo` or `/source/id`) to avoid the search step and get results immediately. [source](./.skilld/docs/api-guide.mdx#library-id-format)

- Pin to specific versions in library IDs — both `/owner/repo/v15.1.8` and `/owner/repo@v15.1.8` syntax are supported to ensure consistent, version-specific documentation. [source](./.skilld/docs/api-guide.mdx#use-specific-versions)

- Check available versions before querying — call `searchLibrary` and inspect the `versions` array to pick the right version ID upfront, avoiding version mismatches in documentation. [source](./.skilld/sdks/ts/commands/search-library.mdx#checking-available-versions)

- Authenticate with API keys for higher rate limits — Context7 returns a 429 status code without authentication. Create an API key in the Context7 dashboard to unlock higher limits based on your plan. [source](./.skilld/docs/api-guide.mdx#rate-limits)

- Implement exponential backoff when handling 429 rate limit responses — check the `Retry-After` header and wait before retrying; this prevents thundering herd issues under load. [source](./.skilld/docs/api-guide.mdx#handle-rate-limits)

- Cache responses — documentation updates are infrequent, so caching results for several hours or days reduces API calls and improves performance without staleness risk. [source](./.skilld/docs/api-guide.mdx#cache-responses)

- Output as JSON for programmatic use — call with `type: "json"` or append `--json` to CLI commands to get an array of documentation objects (title, content, source) suitable for scripting and integration. [source](./.skilld/docs/clients/cli.mdx#step-2--ctx7-docs)

- Use text format for LLM context injection — set `type: "txt"` in the SDK or omit the flag in the CLI to get pre-formatted plain text ready to pass directly into LLM prompts. [source](./.skilld/sdks/ts/commands/get-context.mdx#text-format)

- Select best library by benchmark score — when `searchLibrary` returns multiple results, sort by `benchmarkScore` to pick the highest-quality, most-relevant library documentation. [source](./.skilld/sdks/ts/commands/search-library.mdx#selecting-best-library)

- Use the docs-researcher agent to preserve context — when context is growing long, spawn a separate agent for documentation lookups instead of running tools inline to avoid bloating the main conversation. [source](./.skilld/docs/clients/claude-code.mdx#docs-researcher-agent)

- Use `Context7Error` for robust error handling — catch API errors with `instanceof Context7Error` to distinguish Context7-specific failures from network or application errors. [source](./.skilld/sdks/ts/commands/get-context.mdx#error-handling)

- Add auto-trigger rules to your MCP client config — configure your editor (Cursor Settings > Rules, CLAUDE.md, or equivalent) to automatically invoke Context7 for code-related questions without needing to say "use context7" every time. [source](./.skilld/docs/tips.mdx#add-a-rule)

- Store API keys in environment variables — set `CONTEXT7_API_KEY` before launching your agent, client, or script; the SDK and CLI read it automatically for transparent authentication. [source](./.skilld/docs/clients/claude-code.mdx#using-your-api-key-with-the-plugin)
<!-- /skilld:best-practices -->

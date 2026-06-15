---
name: ctx7-skilld
description: "ALWAYS use when writing code importing \"ctx7\". Consult for debugging, best practices, or modifying ctx7, context7."
metadata:
  version: 0.5.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-13
---

# upstash/context7 `ctx7@0.5.2`
**Tags:** canary: 0.2.4-canary.0, latest: 0.5.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

### Breaking Changes (v0.5.x and Migration from v0.4.x)

- BREAKING: `ctx7 login` — v0.5.1 always uses OAuth 2.0 device-code flow; localhost-callback flow and `--device` flag removed. Every install (laptop, SSH, Codespace, Docker, CI) now uses the same device flow. Older CLI versions (≤ 0.5.0) still work against unchanged auth endpoints [source](./.skilld/releases/ctx7@0.5.1.md:L10)

- BREAKING: `researchMode` MCP parameter removed — v0.4.1 removed the `researchMode` parameter from the MCP server's `query-docs` tool and the CLI's `--research` flag on `ctx7 docs`. Research mode was briefly exposed in v0.4.0 but deprecated immediately [source](./.skilld/releases/ctx7@0.4.1.md:L11)

- BREAKING: `--universal` flag removed — v0.4.5 removes the `--universal` flag from `ctx7 setup`, which was advertised but silently ignored and never propagated through agent selection [source](./.skilld/releases/ctx7@0.4.5.md:L11)

### New Commands and Flags (v0.4.0 onwards)

- NEW: `ctx7 upgrade` command — v0.4.0 adds upgrade notifications and a new `ctx7 upgrade` command with safer guidance across npm, pnpm, bun, and ephemeral runner setups [source](./.skilld/releases/ctx7@0.4.0.md:L15)

- NEW: `ctx7 remove` command — v0.4.0 adds cleanup counterpart to `ctx7 setup`. Safely detects and removes Context7 artifacts, preserves non-Context7 MCP configuration when removing entries [source](./.skilld/releases/ctx7@0.4.0.md:L16)

- NEW: `--stdio` flag for `ctx7 setup` — v0.4.3 adds `--stdio` flag to configure Context7 as a local stdio MCP server [source](./.skilld/releases/ctx7@0.4.3.md:L12)

- NEW: `--json` flag for `ctx7 skills list` — v0.4.4 adds machine-parseable JSON output emitting `{ skills: [{ name, path, source }] }` where `path` is absolute and `source` is agent type (`universal`, `claude`, `cursor`, `antigravity`) [source](./.skilld/releases/ctx7@0.4.4.md:L11)

- NEW: OAuth 2.0 device authorization flow (`--device` flag) — v0.5.0 adds device flow for headless/remote hosts (SSH, Codespaces, Docker, CI). Prints verification URL and short code, then polls token endpoint. Device flow is automatically selected when `SSH_CONNECTION` is set or `$DISPLAY` is missing on Linux, and can be forced with `--device` [source](./.skilld/releases/ctx7@0.5.0.md:L11)

### Configuration and File Paths (v0.5.2)

- BREAKING: XDG Base Directory compliance — v0.5.2 moves CLI files from `~/.context7` to XDG-compliant locations: credentials to `$XDG_CONFIG_HOME/context7` (default `~/.config/context7`), updater state to `$XDG_STATE_HOME/context7` (default `~/.local/state/context7`), and `generate` previews to `$XDG_CACHE_HOME/context7` (default `~/.cache/context7`). Existing `~/.context7` files are migrated automatically on first use; migration is best-effort with fallback to reading legacy file. Credentials file re-asserted to `0o600` after migration/write [source](./.skilld/releases/ctx7@0.5.2.md:L11)

- FIXED: Windows Git Bash path handling — v0.5.2 recovers Context7 library IDs that Git Bash mangles (e.g., `/facebook/react` → `C:/Program Files/Git/facebook/react`). CLI detects and undoes conversion before validation, accepts `//owner/repo` escape, and points users at workaround for undetectable layouts [source](./.skilld/releases/ctx7@0.5.2.md:L12)

### Enhanced Agent Support and Setup Modes

- ENHANCED: `ctx7 setup --antigravity` — v0.4.5 expands Antigravity support, installing skills to `.agent/skills`, adding `GEMINI.md` rule section, and writing MCP config to Antigravity 2.0's documented global path `~/.gemini/config/mcp_config.json` (with `httpUrl` for HTTP, matching Gemini convention). Since Antigravity lacks project-level MCP file, `--project --mcp` writes to global location [source](./.skilld/releases/ctx7@0.4.5.md:L11)

- ENHANCED: `ctx7 setup --api-key` behavior — v0.4.5 adds prompt to choose between MCP server and CLI + Skills modes when passing `--api-key` without explicit mode flag. Explicit `--mcp` / `--cli` / `--stdio` / `--oauth` / `-y` still skip the prompt [source](./.skilld/releases/ctx7@0.4.5.md:L12)

**Also changed:** Skill command deprecation warning added v0.4.5 · `@inquirer/core` declared as direct dependency v0.4.3 · MCP config parse error handling v0.4.2 · `CLAUDE_CONFIG_DIR` env var respected v0.4.2 · Skill name character set restricted v0.4.3 · Dependency bumps: `commander` 13→15, `ora` 9.0→9.4 in v0.5.2
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Context7 Best Practices

## Best Practices

- Add MCP client rules to avoid repeated `use context7` directives in every prompt — set once and Context7 activates automatically for all code-related queries [source](./.skilld/docs/tips.mdx#add-a-rule)

- Specify the library ID directly in prompts when you already know which library to use — skips the search step and retrieves docs immediately [source](./.skilld/docs/tips.mdx#use-library-id)

- Mention the target version in your prompt to retrieve documentation for specific library versions — Context7 automatically matches the appropriate version identifier [source](./.skilld/docs/tips.mdx#specify-a-version)

- Use detailed, natural-language queries instead of single keywords for better relevance ranking — `"How to implement authentication with middleware"` returns much better results than `"auth"` [source](./.skilld/docs/api-guide.mdx#be-specific-with-queries)

- Cache documentation responses for several hours or days rather than fetching fresh docs on every request — documentation updates are infrequent and caching reduces API calls and improves performance [source](./.skilld/docs/api-guide.mdx#cache-responses)

- Implement exponential backoff when handling rate limit errors (429 status) — use the `Retry-After` header value to delay before retrying, avoiding thundering herd [source](./.skilld/docs/api-guide.mdx#handle-rate-limits)

- Pin to specific library versions for consistent results across requests — use both `/owner/repo/v15.1.8` and `/owner/repo@v15.1.8` syntax interchangeably [source](./.skilld/docs/api-guide.mdx#use-specific-versions)

- Use `context7.json` in your repository root to control which folders and files Context7 parses — exclude test directories, node_modules, and language-specific docs via `excludeFolders` and `excludeFiles` fields [source](./.skilld/docs/adding-libraries.mdx#advanced-configuration-with-context7json)

- Trigger manual refreshes through the Context7 dashboard or API immediately after releasing new versions — don't wait for automatic refresh thresholds [source](./.skilld/docs/library-updates.mdx#manual-refresh)

- Use GitHub Actions to automatically refresh Context7 docs on every push to your default branch — store your API key as a repository secret and curl the refresh endpoint [source](./.skilld/docs/integrations/github-actions.mdx#setup)

- Select libraries by sorting results on `benchmarkScore` or `trustScore` — higher scores indicate better documentation coverage and source reliability [source](./.skilld/docs/sdks/ts/commands/search-library.mdx#selecting-best-library)

- Use `type: "txt"` when retrieving context for LLM prompts instead of the default JSON format — produces clean, ready-to-use text without needing manual formatting [source](./.skilld/docs/sdks/ts/commands/get-context.mdx#use-cases)

- Never commit API keys to version control — store keys in environment variables (`CONTEXT7_API_KEY`) and rotate them regularly for security [source](./.skilld/docs/security/best-practices.mdx#secure-your-api-keys)

- Use the device authorization flow (`ctx7 login --device`) for headless environments (SSH, Codespaces, Docker, CI) instead of the localhost callback flow — device flow prints a verification URL and short code that works from any browser [source](./.skilld/releases/ctx7@0.5.0.md)
<!-- /skilld:best-practices -->

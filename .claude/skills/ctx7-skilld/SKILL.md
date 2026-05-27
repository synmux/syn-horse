---
name: ctx7-skilld
description: 'Context7 CLI - Manage AI coding skills and documentation context. ALWAYS use when writing code importing "ctx7". Consult for debugging, best practices, or modifying ctx7, context7.'
metadata:
  version: 0.4.4
  generated_by: cached
  generated_at: 2026-05-27
---

# upstash/context7 `ctx7@0.4.4`

**Tags:** canary: 0.2.4-canary.0, latest: 0.4.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `researchMode` tool and `docs --research` flag — removed from MCP server and CLI [source](./.skilld/releases/ctx7@0.4.1.md:L8)

- NEW: `researchMode` tool and `docs --research` flag — exposed through MCP and CLI [source](./.skilld/releases/ctx7@0.4.0.md:L8)

- NEW: `ctx7 upgrade` command — adds CLI update notifications and upgrade functionality [source](./.skilld/releases/ctx7@0.4.0.md:L11)

- NEW: `ctx7 remove` command — cleanup counterpart to `ctx7 setup` [source](./.skilld/releases/ctx7@0.4.0.md:L14)

- NEW: `ctx7 remove` graceful config handling — handles malformed MCP config files during agent detection [source](./.skilld/releases/ctx7@0.4.2.md:L8)

- NEW: `CLAUDE_CONFIG_DIR` env var support — respects environment variable for resolving Claude Code's global config [source](./.skilld/releases/ctx7@0.4.2.md:L11)

- NEW: `ctx7 setup` command — configures Context7 MCP and rules across Claude Code, Cursor, and OpenCode [source](./.skilld/releases/ctx7@0.3.0.md:L8)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Prefer `npx ctx7` for ephemeral tasks — avoids global installation and ensures usage of the latest version without manual updates. [source](./.skilld/pkg/README.md:L10-13)

- Specify target agents during setup — use flags like `--claude`, `--cursor`, or `--opencode` with `ctx7 setup` for precise configuration, avoiding interactive prompts for automation. [source](./.skilld/pkg/README.md:L25-27)

- Always use `/owner/repo` format for library IDs — when querying documentation or libraries, use the `/owner/repo` or `/owner/repo/version` format to prevent misinterpretation, especially in environments like Git Bash on Windows. [source](./.skilld/pkg/README.md:L36-39)

- Use `--json` for programmatic output — when scripting or integrating `ctx7` into other tools, use the `--json` flag to receive structured output for easier parsing. [source](./.skilld/pkg/README.md:L42)

- Use precise `ctx7 remove` flags for cleanup — leverage `--cursor`, `--claude`, `--project`, `--cli`, or `--mcp` to target specific components and avoid unintended removals. [source](./.skilld/pkg/README.md:L72-78)

- Authenticate via `ctx7 login` before skill generation — ensure you are logged in before attempting to `ctx7 skills generate` to access authenticated features and track usage correctly. [source](./.skilld/pkg/README.md:L86)

- Target skill installation to specific agents/scopes — install skills with `--cursor`, `--claude`, `--universal`, `--global`, or `--all-agents` to ensure they are available where intended. [source](./.skilld/pkg/README.md:L116-121)

- Disable telemetry for privacy/compliance — set the `CTX7_TELEMETRY_DISABLED=1` environment variable if you need to opt out of anonymous usage data collection. [source](./.skilld/pkg/README.md:L157-162)

- Implement external freshness verification for critical data — do not rely solely on `ctx7` for real-time critical data freshness; establish external checks for rapidly changing API versions or health. [source](./.skilld/discussions/discussion-2510.md:L23-38)

- Avoid `ctx7 setup` on Git Bash for Windows for skill installation (Workaround for bug) — if encountering "Skill file path resolves outside the target directory" errors, consider using WSL or ensuring Windows path normalization for skill installations until the bug is resolved. [source](./.skilld/issues/issue-2361.md:L33-35)

- Implement retry logic with exponential backoff for API calls — to gracefully handle rate-limiting (`too many requests`) when making frequent `ctx7` API calls programmatically. [source](./.skilld/issues/issue-808.md:L16)

- Explicitly configure `CONTEXT7_API_KEY` in plugin's `.mcp.json` — for plugin-based installations, ensure the API key is set directly in the plugin configuration, as environment variables may not be honored. [source](./.skilld/issues/issue-1713.md:L19-21)

- Do not use `folders` attribute in `context7.json` for content filtering — the `folders` attribute is currently not respected, and the entire repository is scanned, which may lead to unintentional context inclusion. [source](./.skilld/issues/issue-1020.md:L15-18)

- Utilize `ctx7 docs --research` for in-depth queries — for complex questions requiring deeper analysis beyond standard documentation retrieval, use the `--research` flag (experimental). [source](./.skilld/releases/ctx7@0.4.0.md:L5-6)
<!-- /skilld:best-practices -->

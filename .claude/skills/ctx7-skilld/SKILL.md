---
name: ctx7-skilld
description: 'ALWAYS use when writing code importing "ctx7". Consult for debugging, best practices, or modifying ctx7, context7.'
metadata:
  version: 0.4.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# upstash/context7 `ctx7@0.4.2`

**Tags:** canary: 0.2.4-canary.0, latest: 0.4.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ctx7` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ctx7` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes in ctx7 — prioritizing recent major/minor releases that affect LLM usage patterns.

## Breaking Changes (v0.4 and v0.3)

- BREAKING: `ctx7 docs --research` flag removed entirely in v0.4.1 — added in v0.4.0 then removed one week later. The MCP `query-docs` tool no longer accepts `researchMode` parameter; the CLI no longer exposes `--research` flag on `ctx7 docs`. If code or workflows reference research mode, switch to standard documentation queries [source](./.skilld/releases/ctx7@0.4.1.md:L11)

- BREAKING: Global universal skill install path changed from `~/.config/agents/skills` to `~/.agents/skills` in v0.3.8. Code invoking `ctx7 skills install --universal` will write skills to the new path; old path location will be ignored [source](./.skilld/releases/ctx7@0.3.8.md:L23)

- BREAKING: CLI agent flags replaced in v0.2.4 — `--codex`, `--opencode`, and `--amp` flags removed from `ctx7 skills install` and replaced with single `--universal` flag. Code using old flags will fail [source](./.skilld/releases/ctx7@0.2.4.md:L12)

## New Commands (v0.4 through v0.3)

- NEW: `ctx7 remove` command added in v0.4.0 as the cleanup counterpart to `ctx7 setup`. Safely detects and removes Context7 artifacts, preserves non-Context7 MCP configuration, and includes stronger test coverage for JSON and TOML cleanup [source](./.skilld/releases/ctx7@0.4.0.md:L16)

- NEW: `ctx7 upgrade` command added in v0.4.0 for safe CLI version management. Checks for newer versions with cached state, shows non-blocking notice before interactive commands, and provides upgrade guidance across npm, pnpm, bun, and ephemeral runner setups [source](./.skilld/releases/ctx7@0.4.0.md:L15)

- NEW: `ctx7 library` and `ctx7 docs` commands added in v0.3.2 for querying library documentation directly from the terminal. Complements programmatic MCP access with CLI tooling [source](./.skilld/releases/ctx7@0.3.2.md:L11)

- NEW: `ctx7 skills suggest` command added in v0.2.3 that scans project dependencies (package.json, requirements.txt, pyproject.toml) and recommends relevant skills with install counts and trust scores [source](./.skilld/releases/ctx7@0.2.3.md:L11)

- NEW: `ctx7 setup` command added in v0.3.0 for configuring Context7 MCP and rules across Claude Code, Cursor, and OpenCode with multi-agent support [source](./.skilld/releases/ctx7@0.3.0.md:L11)

## API and Behavior Changes

- RENAMED: "docs" skill renamed to "find-docs" starting v0.3.4. Scripts and configurations referencing the old name will not resolve the skill; use `find-docs` instead [source](./.skilld/releases/ctx7@0.3.4.md:L13)

- BREAKING: `ctx7 setup` output behavior changed in v0.3.8 — OpenCode now writes setup rules to `AGENTS.md` instead of `.opencode/rules/`. Existing `.opencode/rules/` setup files will not be updated by subsequent setup runs [source](./.skilld/releases/ctx7@0.3.8.md:L20)

- NEW: `ctx7 skills install` gained `--all-agents` and `--yes` flags in v0.3.11 for non-interactive multi-agent skill installs without prompts [source](./.skilld/releases/ctx7@0.3.11.md:L11)

- NEW: Gemini CLI support added to `ctx7 setup` in v0.3.10. The setup command now auto-detects Gemini CLI and offers to configure it alongside Claude Code, Cursor, and OpenCode [source](./.skilld/releases/ctx7@0.3.10.md:L11)

## Environment and Configuration

- NEW: `CLAUDE_CONFIG_DIR` environment variable respected in v0.4.2 when resolving Claude Code's global config, rules, skills, and detection paths. Previously hardcoded to `~/.claude`; now respects the env var if set [source](./.skilld/releases/ctx7@0.4.2.md:L12)

- BEHAVIOR: MCP configuration file parsing made graceful in v0.4.2 during `ctx7 remove` — malformed JSON at agent config paths (e.g., hand-edited `~/.claude.json`) now logs a warning and continues instead of crashing with `SyntaxError` [source](./.skilld/releases/ctx7@0.4.2.md:L11)

**Also changed:** Skill name/trust score display enhanced in v0.3.3 with categorical reputation labels · Skill search popularity enumerated as 4-star scale in v0.3.4 · Allow re-selecting agents in setup with overwrite behavior in v0.3.9 · Use GITHUB_TOKEN for skill downloads to avoid rate limits in v0.3.10 · Install rules alongside skills in setup for higher trigger rates in v0.3.8

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## ctx7 v0.4.2 Best Practices

## Overview

Non-obvious patterns and recommendations for using ctx7 to fetch library documentation and manage AI coding skills across agents.

## Best Practices

- Use `ctx7 setup` to auto-configure MCP and CLI rules across all installed agents in one command — handles Claude Code, Cursor, OpenCode, Codex, and Gemini CLI without manual JSON/TOML editing [source](./.skilld/releases/ctx7@0.3.0.md)

- Install rules alongside skills during setup for significantly higher invocation rates — the find-docs skill sees 66% → 98% invocation increase when accompanied by a rule file [source](./.skilld/releases/ctx7@0.3.8.md:L15)

- Prefer `--universal` flag to install skills once to `.agents/skills/` for multiple agents instead of repeating per-agent installs — supported across Cursor, Codex, Gemini CLI, and other universal agents [source](./.skilld/releases/ctx7@0.2.4.md:L10)

- Set `GITHUB_TOKEN` or `GH_TOKEN` environment variable before `ctx7 skills install` when installing from custom repositories — prevents GitHub API rate limit exhaustion on skill downloads [source](./.skilld/releases/ctx7@0.3.10.md:L12)

- Configure API key in `.mcp.json` with `"env": {"CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}"}` when using Context7 as a Claude Code plugin — environment variables set in shell profiles are not inherited by plugin processes [source](./.skilld/issues/issue-1713.md)

- Use `ctx7 setup --api-key YOUR_API_KEY` instead of OAuth for environments where browser access is restricted or unavailable — skips the OAuth flow entirely [source](./.skilld/pkg/README.md:L101)

- Re-run `ctx7 setup` to update existing agent configurations without conflicts — the command now skips manual selection prompts for already-configured agents and safely overwrites MCP entries on re-run [source](./.skilld/releases/ctx7@0.3.9.md)

- Pair Context7 library documentation with project-specific context files (e.g., FAF `project.faf`) for complete coding context — library queries answer "how does React Router work?" while project context answers "how do WE do routing?" [source](./.skilld/discussions/discussion-1334.md:L29)

- Run `ctx7 skills install --global --universal --yes` for non-interactive, multi-agent skill setup in automation or CI environments — avoids interactive prompts while supporting all compatible agents [source](./.skilld/releases/ctx7@0.3.11.md)

- Use `ctx7 setup --project` instead of global setup to contain skills and rules to the current project directory — prevents polluting the global `~/.claude/skills/` or `~/.agents/skills/` directories with project-specific skills [source](./.skilld/pkg/README.md:L108)

- Disable telemetry by setting `CTX7_TELEMETRY_DISABLED=1` environment variable — useful for privacy-sensitive environments or when you prefer not to contribute anonymous usage metrics [source](./.skilld/pkg/README.md:L278)

- Query with exact library names (e.g., "Next.js" not "nextjs") to improve documentation retrieval accuracy — the library resolver uses fuzzy matching but exact names return higher-quality results [source](./.skilld/pkg/README.md:L68)

- Use `ctx7 remove` for safe uninstall that preserves non-Context7 MCP configuration — the command detects Context7-specific entries and removes only those, leaving other agent setup intact [source](./.skilld/releases/ctx7@0.4.0.md:L16)

- Use `ctx7 remove --all` when you want to remove both MCP server and CLI setup for an agent simultaneously — default removes both, but `--mcp` and `--cli` flags allow granular removal [source](./.skilld/pkg/README.md:L129)

## Experimental / Unstable

None currently.

<!-- /skilld:best-practices -->

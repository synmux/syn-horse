---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code, claude-code-2.1.88, claude code 2.1.88."
metadata:
  version: 2.1.168
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-08
---

# Exhen/claude-code-2.1.88 `@anthropic-ai/claude-code@2.1.168`
**Tags:** stable: 2.1.153, latest: 2.1.168, next: 2.1.169

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

@anthropic-ai/claude-code v2.1.168 is a CLI tool that provides agentic coding capabilities. This document covers the stable tool schema APIs available in the current version.

### Core Tool APIs (Stable in v2.1.x)

- `Agent` — Spawn subagents with optional model override, background execution, and worktree isolation support. Supports specialized agent types and team context [source](./.skilld/sdk-tools.d.ts:L305:342)

- `Bash` — Execute shell commands with optional timeout and sandbox bypass. Supports background execution and descriptive command documentation [source](./.skilld/sdk-tools.d.ts:L343:374)

- `FileRead` — Read text, images, notebooks, PDFs with pagination support. Returns file metadata including token cap truncation signals [source](./.skilld/sdk-tools.d.ts:L142:269)

- `FileEdit` — Edit files with old_string/new_string matching and replace_all flag. Supports atomic text replacements [source](./.skilld/sdk-tools.d.ts:L405:422)

- `FileWrite` — Write new files with absolute paths. Complete file replacement operation [source](./.skilld/sdk-tools.d.ts:L441:450)

- `Glob` — Match files by pattern across directories. Optional path parameter defaults to current directory [source](./.skilld/sdk-tools.d.ts:L451:460)

- `Grep` — Search files with ripgrep regex support. Supports output modes (content, files_with_matches, count), context windows, case-insensitive, multiline matching [source](./.skilld/sdk-tools.d.ts:L461:522)

- `TaskCreate` — Create tracked background tasks with subject, description, and optional activeForm spinner text [source](./.skilld/sdk-tools.d.ts:L2186:2205)

- `TaskUpdate` — Update task status, metadata, and blocking relationships. Supports status transitions and owner assignment [source](./.skilld/sdk-tools.d.ts:L2212:2251)

- `Workflow` — Execute deterministic multi-agent orchestration scripts with phase tracking and budget management [source](./.skilld/sdk-tools.d.ts:L2267:2285)

- `EnterPlanMode` — Enter structured planning mode with permission-based allowed prompts for Bash operations [source](./.skilld/sdk-tools.d.ts:L389:404)

- `ExitPlanMode` — Exit plan mode with optional prompt-based permission specifications [source](./.skilld/sdk-tools.d.ts:L389:404)

- `MCP` — Access Model Context Protocol resources with dynamic schema discovery and server filtering [source](./.skilld/sdk-tools.d.ts:L539:541)

- `AskUserQuestion` — Present 1-4 multiple-choice questions with optional multi-select, previews, and annotations support [source](./.skilld/sdk-tools.d.ts:L608:2184)

- `NotebookEdit` — Edit Jupyter notebooks with cell insertion, deletion, and type specification. Supports code and markdown cells [source](./.skilld/sdk-tools.d.ts:L542:563)

**Also changed:** `WebFetch` supports prompt-based content extraction · `WebSearch` supports domain allow/block lists · `EnterWorktree` creates isolated git worktree environments · `Monitor` streams background task output · `ScheduleWakeup` enables interval-based task loops
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use Claude Code in your terminal, IDE, or GitHub (@claude mentions) depending on your workflow — each environment provides different integration advantages and keeps your coding context consistent [source](./.skilld/pkg/README.md:L7)

- Report issues via the `/bug` command within Claude Code rather than creating separate GitHub issues — this captures context automatically and gets routed to the development team [source](./.skilld/pkg/README.md:L25)

- Ensure your Node.js version is 18.0.0 or higher before installing — older versions are not supported and will cause installation failures [source](./.skilld/pkg/package.json:L12)

- Accept feedback and monitor code acceptance/rejection data — Claude Code collects this usage data to improve suggestions, and understanding your acceptance patterns helps refine future interactions [source](./.skilld/pkg/README.md:L31:32)

- Run the postinstall script during installation without using `--ignore-scripts` flags — the postinstall copies the native binary which is faster than the Node.js fallback wrapper [source](./.skilld/pkg/cli-wrapper.cjs:L2:7)

- Let platform detection happen automatically — Claude Code detects your OS and architecture and selects the optimized binary, including handling Rosetta 2 emulation on Apple Silicon [source](./.skilld/pkg/cli-wrapper.cjs:L73:81)

- Join the Claude Developers Discord community for help and feedback — you'll connect with other developers using Claude Code and get real-time assistance with issues [source](./.skilld/pkg/README.md:L29)

- Review the Commercial Terms of Service and Privacy Policy before using in production — Claude Code collects and retains certain data, and understanding the safeguards matters for enterprise or sensitive projects [source](./.skilld/pkg/README.md:L43:44)

- Use Claude Code to understand codebases before making changes — it can explain complex code and provide context about what components do and how they interact [source](./.skilld/pkg/README.md:L7)

- Leverage the git workflow features for routine tasks — Claude Code handles commit creation, branching, and pull request workflows through natural language, reducing manual git operations [source](./.skilld/pkg/README.md:L7)

- Start with natural language commands in your project directory — after navigating to your project and running `claude`, use conversational prompts to describe what you want to accomplish [source](./.skilld/pkg/README.md:L21:22)

- Check data usage policies to understand what happens to your code and feedback — Anthropic uses this data to improve Claude Code, and knowing the details helps you decide what projects to use it on [source](./.skilld/pkg/README.md:L37)

- Trust the SDK type definitions for tool input/output contracts — if building tools that integrate with Claude Code, the exported types in `sdk-tools.d.ts` are the authoritative API surface [source](./.skilld/pkg/package.json:L33)
<!-- /skilld:best-practices -->

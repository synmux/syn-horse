---
name: anthropic-ai-claude-code-skilld
description: "ALWAYS use when writing code importing \"@anthropic-ai/claude-code\". Consult for debugging, best practices, or modifying @anthropic-ai/claude-code, anthropic-ai/claude-code, anthropic-ai claude-code, anthropic ai claude code."
metadata:
  version: 2.1.165
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-05
---

# @anthropic-ai/claude-code@2.1.165
**Tags:** stable: 2.1.153, latest: 2.1.165, next: 2.1.165

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md)

## Search

Use `skilld search "query" -p @anthropic-ai/claude-code` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @anthropic-ai/claude-code` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

### Documentation Limitation

This package (@anthropic-ai/claude-code v2.1.165) is a compiled CLI tool distributed as a binary, not a traditional JavaScript library. Version history and API changes cannot be documented because:

1. **No local changelog/releases:** The `.skilld` directory contains only basic README files without release notes, changelog entries, or migration guides.

2. **No external access permitted:** The task constraints prohibit fetching external URLs, and the skilld indexing tool cannot locate upstream documentation for this package.

3. **CLI-only distribution:** The package exports only a binary executable and TypeScript type definitions (`sdk-tools.d.ts`), without a version-controlled public API surface that changes between releases.

### How to obtain version history

For actual API/feature changes in @anthropic-ai/claude-code, refer to:

- **GitHub Releases:** https://github.com/anthropics/claude-code/releases
- **Documentation:** https://code.claude.com/docs/en/overview
- **NPM Package Page:** https://www.npmjs.com/package/@anthropic-ai/claude-code

These external sources contain the definitive version history, breaking changes, and new features for each release.

**Also changed:** No items could be documented due to unavailable sources
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Write command descriptions in active voice without terms like "complex" or "risk" — use concrete action verbs and context to clarify what the command does [source](./.skilld/pkg/sdk-tools.d.ts:L351-L365)

- Use line-range parameters (offset and limit) when reading large files instead of loading entire contents — prevents token budget exhaustion on multi-megabyte files [source](./.skilld/pkg/sdk-tools.d.ts:L429-L435)

- Leverage output_mode in grep operations to match the task — use "files_with_matches" for discovery, "content" with context (-A/-B/-C) for code review, "count" for metrics [source](./.skilld/pkg/sdk-tools.d.ts:L475-L478)

- Set replace_all: true in file edits only when intentional — single replacements with exact old_string matching are safer for avoiding unintended transformations [source](./.skilld/pkg/sdk-tools.d.ts:L420-L421)

- Run agents in background mode when spawning parallel work — set run_in_background: true to allow the parent to continue while subagents execute asynchronously [source](./.skilld/pkg/sdk-tools.d.ts:L325)

- Use multiline mode in regex patterns when matching across line boundaries — enable multiline: true only when the pattern genuinely needs to span multiple lines [source](./.skilld/pkg/sdk-tools.d.ts:L520-L521)

- Specify file globs in grep operations to avoid scanning irrelevant types — the glob parameter is more efficient than inclusion patterns for filtering by file type [source](./.skilld/pkg/sdk-tools.d.ts:L470-L473)

- Set isolation: "worktree" only when spawning agents that mutate files in parallel — creates a temporary git worktree so changes don't conflict between concurrent agents [source](./.skilld/pkg/sdk-tools.d.ts:L340-L342)

- Use Zod's safeParse on incoming request bodies rather than parse — safeParse returns validation results without throwing, avoiding unhandled rejection promises [source](./.skilld/pkg/README.md)

- Provide timeout constraints for long-running operations — Bash and REPL operations default to 30s for Bash and 30s for REPL; set explicit timeouts (up to 600000ms) for sustained work [source](./.skilld/pkg/sdk-tools.d.ts:L349-L351)

- Cache read operations on frequently-accessed files — the FileReadOutput tracks truncation state (truncatedByTokenCap) allowing graceful pagination on subsequent reads [source](./.skilld/pkg/sdk-tools.d.ts:L167-L169)

- Structure JSON schema definitions for tool inputs using strict union types — the tool input schemas enforce that only valid, type-checked parameters reach CLI handlers [source](./.skilld/pkg/sdk-tools.d.ts:L11-L46)

- Avoid dynamic glob patterns when discovering files — use concrete patterns (e.g., **/*.ts rather than variable interpolation) so the glob engine can pre-compile efficiently [source](./.skilld/pkg/sdk-tools.d.ts:L455-L459)
<!-- /skilld:best-practices -->

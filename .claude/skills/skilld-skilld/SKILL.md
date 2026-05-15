---
name: skilld-skilld
description: 'ALWAYS use when writing code importing "skilld". Consult for debugging, best practices, or modifying skilld.'
metadata:
  version: 2.0.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# skilld-dev/skilld `skilld@2.0.0`

**Tags:** latest: 2.0.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p skilld` instead of grepping `.skilld/` directories. Run `skilld search --guide -p skilld` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases to understand what's new in v2.0.0.

- NEW: `skilld prepare` — new command (v1.5.0) for restoring references and syncing shipped skills in package.json hooks [source](./.skilld/releases/v1.5.0.md#features)

- NEW: `skilld author` — new command system (v1.5.0) for maintainers to generate and publish skills directly with their packages [source](./.skilld/releases/v1.5.0.md#features)

- NEW: `skilld list --outdated` — flag added (v1.4.0) to filter and display only skills with available version updates [source](./.skilld/releases/v1.4.0.md#features)

- NEW: `skilld search --filter` — flag added (v1.5.0) for filtering search results by type (e.g., issue, discussion, release) using JSON syntax [source](./.skilld/releases/v1.5.0.md#features)

- NEW: `skilld search --limit` — flag added (v1.5.0) to cap the number of search results returned [source](./.skilld/releases/v1.5.0.md#features)

- NEW: `skilld search --guide` — flag added (v1.5.0) to display full search syntax, filters, and operators for advanced queries [source](./.skilld/releases/v1.5.0.md#features)

- NEW: `skilld cache --stats` — flag added (v1.6.0) to display cache statistics including size and age of LLM-generated sections [source](./.skilld/releases/v1.6.0.md#features)

- NEW: `skilld cache --clean` — flag added (v1.6.0) to remove stale and expired cache entries [source](./.skilld/releases/v1.6.0.md#features)

- NEW: No agent mode — workflow added (v1.1.0) allowing skilld to run without an agent CLI, generating portable prompts for any LLM instead [source](./.skilld/releases/v1.1.0.md#features)

- NEW: AI OAuth providers — authentication flow added (v1.3.0) with UX rework to support multiple LLM provider logins [source](./.skilld/releases/v1.3.0.md#features)

- NEW: Private GitHub repo fallback — feature added (v1.2.0) allowing skill docs and sync to resolve from private GitHub repositories [source](./.skilld/releases/v1.2.0.md#features)

- NEW: Incremental search index updates — search system improved (v1.3.0) to rebuild only changed docs instead of all-or-nothing rebuilds, reducing sync time [source](./.skilld/releases/v1.3.0.md#features)

- NEW: LLM-generated sections — skills now support optional sections for Best Practices, API Changes, and custom prompts curated by LLMs instead of raw docs [source](./.skilld/pkg/README.md:L34)

**Also changed:** Dangling symlink handling · Isolated lockfile cache copies · Skip LLM on full cache hit · jsonc-parser for surgical edits

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Install curated skill collections rather than individual skills — @harlan-zw's stacks (Agent workflow, Architecture, Frontend Design, etc.) are vetted groups that work together cohesively [source](./.skilld/docs/collections.md)

- Use `skilld search` with `--filter`, `--limit`, and `--guide` flags to navigate the registry programmatically instead of browsing without query context [source](./.skilld/releases/v1.5.0.md:L14)

- Run `skilld list --outdated` regularly to identify skills that have newer versions available and require updates [source](./.skilld/releases/v1.4.0.md:L11)

- Manage cache performance with `skilld cache --stats` to monitor cache size and `skilld cache --clean` to remove stale entries before they degrade lookup speed [source](./.skilld/releases/v1.6.0.md:L11)

- Integrate skilld into your build process using `skilld prepare` hooks in package.json — enables skills to stay fresh during development and CI/CD workflows [source](./.skilld/releases/v1.5.0.md:L11)

- Prioritise skill install counts and source reputation when selecting between similar skills — the registry displays install counts and contributor credentials to indicate production readiness [source](./.skilld/docs/index.md:L84)

- Use `skilld author` as a maintainer to publish skills correctly — ensures your skills are indexed with proper metadata and discoverable across the ecosystem [source](./.skilld/releases/v1.5.0.md:L12)

- Trust incremental search index updates introduced in v1.3.0 rather than forcing full rebuilds — the system now updates only changed sections, avoiding redundant embedding work [source](./.skilld/releases/v1.3.0.md:L12)

- Validate skills before deploying by checking that shipped dependencies (from `node_modules`) are used before falling back to doc resolution — prevents loading incompatible or outdated skill versions [source](./.skilld/releases/v1.5.0.md:L18)

- Watch collections for changes after authentication — GitHub sign-in enables weekly digests when curated stacks you depend on receive new skills or updated SKILL.md files [source](./.skilld/docs/collections.md:L106)

- Avoid cherry-picking individual skills from disparate authors — instead, find a collection that matches your workflow and install the whole stack to ensure compatibility and coherent agent capability [source](./.skilld/docs/@harlan-zw/agent-workflow-stack.md)

- Handle dangling symlinks when restoring package symlinks in multi-package setups — recent releases fixed edge cases where broken links caused restore operations to fail silently [source](./.skilld/releases/v1.6.0.md:L15)

- Return isolated copies from the lockfile cache to prevent concurrent operations from mutating shared state — the internal cache now preserves immutability for safe parallel skill resolution [source](./.skilld/releases/v1.6.0.md:L16)

- Skip LLM prompt execution when all sections are already cached during sync operations — conditional prompting reduces token usage and speeds up skill updates for unchanged content [source](./.skilld/releases/v1.3.0.md:L17)
<!-- /skilld:best-practices -->

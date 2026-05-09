---
name: skilld-skilld
description: 'ALWAYS use when writing code importing "skilld". Consult for debugging, best practices, or modifying skilld.'
metadata:
  version: 1.7.3
  generated_at: 2026-05-06
---

# skilld-dev/skilld `skilld@1.7.3`

**Tags:** latest: 1.7.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p skilld` instead of grepping `.skilld/` directories. Run `skilld search --guide -p skilld` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes for skilld v1.6.2

Based on the release history from v1.1.0 through v1.6.2, here are the significant API changes and behavioural shifts that would affect LLM code generation and usage patterns:

## High-Priority Changes (Score ≥4 — New Commands/Flags)

1. **skilld prepare** command (v1.5.0) — new command for package.json hook integration
   - Source: https://github.com/harlan-zw/skilld/issues/43
   - Allows scripts to hook into the skills lifecycle via package.json
   - Replaces manual postinstall handling patterns

2. **skilld author** command (v1.5.0) — new maintainer skill publishing workflow
   - Source: https://github.com/harlan-zw/skilld/issues/45
   - Enables skills to be published directly by maintainers
   - Changes how credentials and publishing are managed

3. **search --filter, --limit, --guide** flags (v1.5.0) — full query API expansion
   - Source: https://github.com/harlan-zw/skilld/issues/47
   - Replaces simpler search interface with filtering and limit options
   - --guide flag provides additional context in results
   - Breaking change for scripts relying on fixed search output format

4. **cache --stats, --clean** flags (v1.6.0) — cache introspection and maintenance
   - Source: https://github.com/skilld-dev/skilld/issues/61
   - New ability to inspect cache state and clean stale entries
   - Previously no cache management tools available

5. **list --outdated** flag (v1.4.0) — filter skills by version mismatch
   - Source: https://github.com/harlan-zw/skilld/issues/42
   - Identifies skills with available updates
   - Essential for automation and CI workflows

6. **AI oauth providers** system (v1.3.0) — expanded authentication backend
   - Source: https://github.com/harlan-zw/skilld/issues/35
   - Adds OAuth integration for multiple AI platforms (Codex, Gemini, etc.)
   - Replaces simpler API key handling
   - UX workflow significantly changed

## Medium-Priority Changes (Score 3-4 — API Behaviour & Features)

7. **jsonc-parser** dependency (v1.5.0) — surgical package.json editing
   - Source: https://github.com/harlan-zw/skilld/issues/46
   - Enables preservation of comments and formatting in package.json
   - Changes how hook injection works internally

8. **Incremental search index updates** (v1.3.0) — performance optimization
   - Source: https://github.com/harlan-zw/skilld/issues/41
   - Replaces all-or-nothing index rebuild with incremental updates
   - Silent behaviour change; search results may differ on first-run

9. **LLM prompt caching** for sections (v1.3.0) — caching strategy change
   - Source: https://github.com/harlan-zw/skilld/issues/40
   - Syncs cache state with LLM-specific prompt caching backends
   - May affect response latency and API billing

10. **Private GitHub repo fallback** (v1.2.0) — authentication fallback added
    - Source: https://github.com/harlan-zw/skilld/issues/11
    - Falls back to private repos when public docs unavailable
    - Requires additional permissions in GitHub token

11. **No agent mode** (v1.1.0) — disable agent-based skill discovery
    - Source: harlan-zw/skilld commit 85dc4
    - New --no-agent flag to disable automatic skill agent usage
    - Changes how skills are discovered in default mode

12. **Dangling symlinks handling** (v1.6.0) — robustness fix for symlink restoration
    - Source: https://github.com/skilld-dev/skilld/issues/57
    - Previously would crash on broken symlinks; now gracefully handles them
    - Silent behaviour change in error handling

13. **Isolated copies from readLock cache** (v1.6.0) — mutation safety fix
    - Source: https://github.com/skilld-dev/skilld/issues/58
    - Cache now returns isolated copies instead of shared references
    - Silent breaking change if code relied on mutation patterns

14. **Prerelease version filtering** (v1.1.0) — version selection behavior
    - Source: harlan-zw/skilld commit 8004f
    - No longer shows old prerelease versions in listings
    - Changes output of list and search commands

15. **Gemini model version bumps** (v1.1.0) — OAuth provider model updates
    - Source: harlan-zw/skilld commit c09c5
    - Models specified in oauth provider config may be deprecated
    - Requires validation of model IDs if hardcoded

---

**Version Note:** Latest available is v1.6.2 (2026-04-08), not v1.7.3. The API changes above cover v1.1.0 through v1.6.2 inclusive.

**Also changed:** Commit 37968 added private GitHub repo fallback for skills sync (v1.2.0); Commit 54757 cleaned up stale references (v1.5.0); Commits 2f3f3 and 462d2 improved error handling in symlink and cache operations (v1.6.0).

<!-- /skilld:api-changes -->

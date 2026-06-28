---
name: storybloq-storybloq-skilld
description: 'ALWAYS use when writing code importing "@storybloq/storybloq". Consult for debugging, best practices, or modifying @storybloq/storybloq, storybloq/storybloq, storybloq storybloq, storybloq.'
metadata:
  version: 1.4.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-15
---

# Storybloq/storybloq `@storybloq/storybloq@1.4.4`

**Tags:** latest: 1.4.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @storybloq/storybloq` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @storybloq/storybloq` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritise recent major/minor releases.

### Federation multi-repo orchestration (v1.4.0)

NEW: Coordinate work across multiple repositories with `storybloq init --type orchestrator` and node management commands. One orchestrator tracks cross-repo milestones while each node manages its own tickets independently [source](./.skilld/releases/v1.4.0.md#federation--multi-repo-orchestration).

- `storybloq init --name NAME --type orchestrator` — create orchestrator project
- `storybloq node add NODE --path PATH --stack STACK --role ROLE` — register a node
- `storybloq node update NODE --role ROLE --link NODE:ENDPOINT` — update node metadata
- `storybloq node remove NODE` — unregister a node
- `storybloq node list` — list all registered nodes
- `--node NODE` flag on all ticket/phase operations to work from orchestrator directory (e.g. `storybloq ticket create --node engine --title "..."`)
- `--cross-node-blocked-by` flag on ticket updates to gate orchestrator milestones on node work (e.g. `--cross-node-blocked-by engine:T-020,client:T-012`)
- `storybloq_node_init`, `storybloq_node_add`, `storybloq_node_list`, `storybloq_node_update` MCP tools [source](./.skilld/releases/v1.4.0.md#mcp-tools)
- `storybloq_recommend` now synthesises suggestions from federated dependency graphs [source](./.skilld/releases/v1.4.0.md#other)

### NEW: `storybloq dispatch` for parallel Agent View sessions (v1.3.0)

Dispatch tickets and issues to Claude Code Agent View background sessions for autonomous parallel work. Each dispatched session runs the full autonomous pipeline independently [source](./.skilld/releases/v1.3.0.md#storybloq-dispatch--parallel-agent-view-dispatch).

- `storybloq dispatch --recommend` — preview dispatch plan
- `storybloq dispatch --all --yes` — dispatch all recommended items
- `storybloq dispatch T-001 ISS-077 --yes` — dispatch specific items
- Config: `maxParallelAgents` in recipeOverrides (default 3, max 8)
- Requires Claude Code >= 2.1.139 (Agent View)

### NEW: Branch awareness and per-ticket branching (v1.3.0)

The autonomous guide now detects ticket/issue IDs in git branch names and prevents picking unrelated tickets, protecting feature-branch history. Per-ticket branching auto-creates branches at PICK_TICKET [source](./.skilld/releases/v1.3.0.md#branch-awareness-at-pick_ticket).

- Branch names like `story/T-012-feature` are detected at PICK_TICKET — picking an unrelated ticket routes to HANDOVER instead
- `branchStrategy: "per-ticket"` config option auto-creates `story/T-XXX-slug` branches
- Set with: `storybloq config set-overrides --json '{"branchStrategy": "per-ticket"}'`

### NEW: Custom metadata for tickets and issues (v1.3.0)

Passthrough JSON fields for extending ticket/issue schema with passthrough dot-path-aware get/set/unset operations [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues).

- `storybloq ticket meta get T-001 FIELD` — retrieve metadata field
- `storybloq ticket meta set T-001 FIELD VALUE` — set metadata field (supports nested dot paths)
- `storybloq ticket meta unset T-001 FIELD` — remove metadata field
- `storybloq issue meta get/set/unset` — same for issues
- Core schema fields are protected from metadata writes
- 6 new MCP tools: `ticket_meta_get`, `ticket_meta_set`, `ticket_meta_unset`, `issue_meta_get`, `issue_meta_set`, `issue_meta_unset` [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)

### NEW: `completedAction: "skip_ticket"` escape mechanism (v1.3.0)

Route stuck tickets to HANDOVER by skipping the current ticket/issue without completion. Available in PLAN, PLAN_REVIEW, and CODE_REVIEW stages [source](./.skilld/releases/v1.3.0.md#skip_ticket-escape-mechanism).

- Return `completedAction: "skip_ticket"` from any stage to release the ticket and skip to HANDOVER
- Releases ticket/issue claims with skip-specific context
- Combined with stuck-detection cancel bypass (5 consecutive retries)
- KNOWN ISSUE: bug #15 — `skip_ticket` crashes the MCP server in v1.4.4 due to unhandled rejection ([source](./.skilld/issues/issue-15.md))

### NEW: `storybloq setup --client` option (v1.2.0)

Install Storybloq for Claude Code, Codex CLI, or both [source](./.skilld/releases/v1.2.0.md#new).

- `storybloq setup --client claude` — Claude Code only
- `storybloq setup --client codex` — OpenAI Codex CLI only
- `storybloq setup --client all` — both (default)

### NEW: `storybloq codex-review` for Codex sessions (v1.2.0)

Native review helper for Codex with schema-constrained output. Faster sandboxed alternative to codex-claude-bridge for Codex-primary users [source](./.skilld/releases/v1.2.0.md#new).

- `storybloq codex-review plan --session SESSION_ID` — review plan phase
- `storybloq codex-review code --session SESSION_ID` — review code phase
- Wraps `codex exec --ephemeral --sandbox read-only` with structured output

### NEW: `codexReviewBackends` config field (v1.2.0)

Optional config field for Codex-session review preferences. Defaults to `["lenses"]`. Existing `reviewBackends` semantics are frozen (Claude-scoped) [source](./.skilld/releases/v1.2.0.md#changed).

- Set with: `storybloq config set-overrides --json '{"codexReviewBackends": ["lenses", "self"]}'`

### DEPRECATED: `CLAUDESTORY_PROJECT_ROOT` env var (v1.2.0)

`STORYBLOQ_PROJECT_ROOT` is the canonical project-root environment variable. `CLAUDESTORY_PROJECT_ROOT` still works as a deprecated fallback [source](./.skilld/releases/v1.2.0.md#changed).

- Use `STORYBLOQ_PROJECT_ROOT` for new code
- `CLAUDESTORY_PROJECT_ROOT` will be removed in a future major version

**Also changed:** Codex auto-approval for `storybloq_node_list` (v1.4.1) · `status.json` refresh on workflow state transitions (v1.4.2) · Symlink-safe dotfile writes (v1.4.3) · Windows path handling in `.story/` writes (v1.4.4)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Return `"insufficient-context"` status when code fragments are too disjointed to review safely — never force findings from ambiguous context. This prevents false positives from incomplete views of data flow or error handling paths [source](./.skilld/docs/shared-preamble.md:L18:22)

- Use the canonical category names exactly as defined per-lens — the blocking policy and verdict logic depend on exact string matches. For security, use `"injection"`, `"auth-bypass"`, `"hardcoded-secrets"`, `"xss"`, `"csrf"`; do not invent variations [source](./.skilld/docs/lens-security.md:L74:89)

- Trace data flow from untrusted input source to sensitive sink for every security finding — populate both `inputSource` and `sink` fields and explain assumptions when the full flow crosses file boundaries you cannot verify [source](./.skilld/docs/lens-security.md:L18:20)

- Treat performance findings as severity calibrated to realistic scale, not micro-optimizations — N+1 queries and unbounded result sets on growing tables are `"critical"`, but a single unnecessary object allocation is not [source](./.skilld/docs/lens-performance.md:L10:16)

- Report errors only when the catch block swallows them entirely or logs without propagating — if the caller handles the error downstream, do not flag the inner try/catch, even if it's defensive [source](./.skilld/docs/lens-error-handling.md:L21:22)

- Verify TypeScript strict mode before flagging missing null checks — null/undefined guards are not required when TypeScript's type system guarantees the value cannot be null [source](./.skilld/docs/lens-error-handling.md:L22:23)

- Deduplicate findings deterministically by (file, line, category) first via `issueKey`, then check remaining findings for semantic similarity — when merging, keep the lens with the most specific description and highest severity, and preserve all contributing lenses in `mergedFrom` [source](./.skilld/docs/merger.md:L27:36)

- Do NOT auto-resolve conflicting lens perspectives — preserve tensions as explicit conflicts when lenses genuinely disagree, marking `blocking: true` only for security/compliance/data-integrity tradeoffs [source](./.skilld/docs/merger.md:L40:48)

- Calibrate severity considering corroboration from other lenses — a `"critical"` finding mitigated by evidence from another lens should be downgraded, and a `"minor"` appearing independently in 3+ lenses may warrant upgrading [source](./.skilld/docs/judge.md:L29:33)

- Apply stage-aware verdict calibration — at PLAN_REVIEW stage, findings are advisory and tensions are expected; reject only for fundamental security/integrity gaps, not architectural opinions [source](./.skilld/docs/judge.md:L41:45)

- Use federation to coordinate work across multiple repositories — set `type: "orchestrator"` and define nodes with `dependsOn` and `links` to model build order and runtime integration points [source](./.skilld/repos/Storybloq/storybloq/releases/v1.4.0.md:L23:28)

- Gate orchestrator milestones on cross-repo work completion with `--cross-node-blocked-by` — this prevents false completion signals and makes dependencies explicit across repository boundaries [source](./.skilld/repos/Storybloq/storybloq/releases/v1.4.0.md:L55:60)

- Enable `branchStrategy: "per-ticket"` to auto-create per-ticket branches and prevent branch-history contamination — the dispatch system enforces that each autonomous session works only on the ticket matching the branch name [source](./.skilld/repos/Storybloq/storybloq/releases/v1.3.0.md:L23:26)

- Dispatch independent tickets to parallel autonomous sessions with `storybloq dispatch --all` to scale work across multiple agents — configure `maxParallelAgents` (default 3, max 8) to control concurrency [source](./.skilld/repos/Storybloq/storybloq/releases/v1.3.0.md:L12:21)

<!-- /skilld:best-practices -->

Related: zod-skilld

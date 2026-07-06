---
name: storybloq-storybloq-skilld
description: "ALWAYS use when writing code importing \"@storybloq/storybloq\". Consult for debugging, best practices, or modifying @storybloq/storybloq, storybloq/storybloq, storybloq storybloq, storybloq."
metadata:
  version: 1.5.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-06
---

# Storybloq/storybloq `@storybloq/storybloq@1.5.0`
**Tags:** latest: 1.5.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @storybloq/storybloq` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @storybloq/storybloq` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @storybloq/storybloq — prioritise recent major/minor releases.

## v1.4.0 Federation API

- NEW: `storybloq init --type orchestrator` — initialise a multi-repo orchestrator project [source](./.skilld/releases/v1.4.0.md#federation--multi-repo-orchestration)

- NEW: `storybloq node add <name>` — add a node to an orchestrator with `--path`, `--stack`, `--role`, `--depends-on`, `--link` flags [source](./.skilld/releases/v1.4.0.md#node-management-cli)

- NEW: `storybloq node update <name>` — modify node role and integration links [source](./.skilld/releases/v1.4.0.md#node-management-cli)

- NEW: `storybloq node remove <name>` — deregister a node from the orchestrator [source](./.skilld/releases/v1.4.0.md#node-management-cli)

- NEW: `storybloq node list` — enumerate all registered federation nodes [source](./.skilld/releases/v1.4.0.md#node-management-cli)

- NEW: `--node <name>` flag on `storybloq ticket`, `storybloq phase`, `storybloq issue` commands — operate on a federated node's `.story/` from the orchestrator directory [source](./.skilld/releases/v1.4.0.md#cross-node-operations-with---node)

- NEW: `--cross-node-blocked-by <refs>` flag on `storybloq ticket update` — gate orchestrator milestones on node ticket completion (e.g. `engine:T-020,client:T-012`) [source](./.skilld/releases/v1.4.0.md#--cross-node-blocked-by-on-ticket-update)

- NEW: `storybloq_node_add`, `storybloq_node_list`, `storybloq_node_update` MCP tools — CLI node operations via agent API [source](./.skilld/releases/v1.4.0.md#mcp-tools)

- NEW: `storybloq_node_init` MCP tool — bootstrap a node's `.story/` directory from the orchestrator context [source](./.skilld/releases/v1.4.0.md#node-bootstrapping-via-mcp)

- CHANGED: `storybloq_recommend` — now synthesises suggestions from federated node graphs instead of single projects [source](./.skilld/releases/v1.4.0.md#other)

- NEW: `/story federation` skill — guided setup flow for multi-repo orchestration [source](./.skilld/releases/v1.4.0.md#-story-federation-skill)

## v1.3.0 Dispatch & Metadata API

- NEW: `storybloq dispatch` command — dispatch tickets and issues to parallel Agent View background sessions with `--recommend`, `--all`, `--yes` flags [source](./.skilld/releases/v1.3.0.md#storybloq-dispatch--parallel-agent-view-dispatch)

- NEW: Branch awareness at PICK_TICKET — autonomous guide detects ticket/issue IDs in git branch names and blocks mismatched work [source](./.skilld/releases/v1.3.0.md#branch-awareness-at-pick_ticket)

- NEW: `branchStrategy: "per-ticket"` config option — auto-create `story/T-XXX-slug` branches at PICK_TICKET [source](./.skilld/releases/v1.3.0.md#branch-awareness-at-pick_ticket)

- NEW: `storybloq ticket meta get|set|unset <id> <key> [<value>]` — query and modify custom metadata on tickets [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)

- NEW: `storybloq issue meta get|set|unset <id> <key> [<value>]` — query and modify custom metadata on issues [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)

- NEW: `ticket_meta_get`, `ticket_meta_set`, `ticket_meta_unset` MCP tools — metadata operations on tickets via agent API [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)

- NEW: `issue_meta_get`, `issue_meta_set`, `issue_meta_unset` MCP tools — metadata operations on issues via agent API [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)

- NEW: `skip_ticket` completedAction value — release ticket/issue claims and route to HANDOVER with context (replaces manual state manipulation) [source](./.skilld/releases/v1.3.0.md#skip_ticket-escape-mechanism)

- CHANGED: `storybloq status` output — now includes configured review backends and unconfigured setup guidance [source](./.skilld/releases/v1.3.0.md#status-config-hints)

## v1.2.0 Codex Support API

- NEW: `storybloq setup --client claude|codex|all` — per-client installation with `claude` (Claude Code only), `codex` (Codex CLI only), or `all` [source](./.skilld/releases/v1.2.0.md#new)

- NEW: `storybloq codex-review plan|code --session <id>` — native Codex review helper wrapping `codex exec` with schema-constrained output [source](./.skilld/releases/v1.2.0.md#new)

- NEW: `STORYBLOQ_PROJECT_ROOT` environment variable — canonical project-root location [source](./.skilld/releases/v1.2.0.md#changed)

- DEPRECATED: `CLAUDESTORY_PROJECT_ROOT` environment variable — still works as fallback, superseded by `STORYBLOQ_PROJECT_ROOT` [source](./.skilld/releases/v1.2.0.md#changed)

- NEW: `codexReviewBackends` config field — Codex-session review preferences (defaults to `["lenses"]`, separate from Claude's `reviewBackends`) [source](./.skilld/releases/v1.2.0.md#changed)

**Also changed:** `storybloq_node_list` auto-approved in Codex (v1.4.1) · `status.json` auto-refresh on state transitions (v1.4.2) · `writeState()` implicit `status.json` sync on field changes (v1.4.2)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Storybloq v1.5.0 Best Practices

- Create new handover files exclusively; never modify or overwrite existing ones — handovers are append-only historical records that form the crash-safe recovery boundary [source](./.skilld/docs/SKILL.md#session-lifecycle)

- Run `storybloq snapshot` before writing a handover so the next session's recap can show what changed since the last snapshot [source](./.skilld/docs/SKILL.md#session-lifecycle)

- When working on a ticket and encountering an out-of-scope bug or improvement, create an issue immediately via `storybloq issue create` with severity and impact description rather than fixing it inline — this keeps the tracker growing organically and ensures discoveries are not lost [source](./.skilld/docs/SKILL.md#ticket-and-issue-discipline)

- Distinguish tickets (planned work) from issues (discovered problems): when unsure, default to creating an issue — it can be promoted to a ticket later without data loss [source](./.skilld/docs/SKILL.md#ticket-and-issue-discipline)

- Check existing lessons via `storybloq_lesson_digest` before creating new lessons to avoid duplication — handovers are narrative, lessons are structured, tagged, and ranked [source](./.skilld/docs/SKILL.md#session-lifecycle)

- In review findings disposition, use `deferred` only when genuinely wanting a new issue created (it auto-files), and reserve `contested` for genuine false positives, not valid-but-deferred work [source](./.skilld/docs/autonomous-mode.md#review-findings-and-dispositions)

- Use targeted autonomous mode (`/story auto T-XXX ISS-YYY ...`) to work through specific items in order and skip the branch-affinity check, avoiding unrelated commits contaminating feature branches [source](./.skilld/docs/autonomous-mode.md#targeted-mode)

- Gate every irreversible action (push, deploy) on the byte-review verdict, never the implementer's word — byte-review agents verify reports against repo reality (commits exist, RED→GREEN re-derived, test counts logged) [source](./.skilld/docs/orchestrator-mode.md#critical-rules)

- Enrich items in orchestrator mode using the template (CONTEXT / VERIFIED STATE @ sha / SCOPE / OUT OF SCOPE / ACCEPTANCE / PITFALLS / VERIFICATION / SIZING) with byte-verified facts so weaker models can trust the spec [source](./.skilld/docs/orchestrator-mode.md#the-enrichment-pass-run-once-per-wave-before-dispatching-hands)

- In orchestrator mode, maintain one pen per repo — never run two waves or edit while a wave executes in the same repo, as read-write conflicts bypass review gates [source](./.skilld/docs/orchestrator-mode.md#critical-rules)

- Batch ships by collecting ~3 review-clean items per push (one deploy per ship), and ship risky/L-sized items alone fenced by pushes before and after [source](./.skilld/docs/orchestrator-mode.md#sizing---scheduling)

- Batch agent-discovered follow-ups for orchestrator filing (agents report via `followUps` structured output, the orchestrator files after checking existing items) rather than letting agents file issues — this prevents duplicate tracking and keeps the pen authority in the orchestrator [source](./.skilld/docs/orchestrator-mode.md#critical-rules)

- When configuring storybloq via `storybloq config set-overrides --json`, pass ONLY the `recipeOverrides` object (e.g. `{"maxTicketsPerSession": 10}`), never top-level fields like version or project [source](./.skilld/docs/SKILL.md#step-4-apply-changes)

- Never skip the active-session guard by auto-selecting a ticket — always surface via `AskUserQuestion` when an active session exists, and require explicit user choice (Resume / Cancel / Monitor) for each session [source](./.skilld/docs/SKILL.md#step-3-present-summary)
<!-- /skilld:best-practices -->

Related: zod-skilld

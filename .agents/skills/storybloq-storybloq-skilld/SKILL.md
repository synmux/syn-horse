---
name: storybloq-storybloq-skilld
description: "ALWAYS use when writing code importing \"@storybloq/storybloq\". Consult for debugging, best practices, or modifying @storybloq/storybloq, storybloq/storybloq, storybloq storybloq, storybloq."
metadata:
  version: 1.8.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-18
---

# Storybloq/storybloq `@storybloq/storybloq@1.8.0`
**Tags:** latest: 1.8.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @storybloq/storybloq` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @storybloq/storybloq` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @storybloq/storybloq. **Note:** Release notes are only available through v1.4.4 (May 2026); versions 1.5.0–1.8.0 are undocumented in the releases index.

### v1.4.0 (Multi-repo Federation) — MINOR

- NEW: `storybloq node add <name> --path <p>` — Add a federation node to an orchestrator project [source](./.skilld/releases/v1.4.0.md#node-management-cli)
- NEW: `storybloq node update <name>` — Update a federation node's metadata [source](./.skilld/releases/v1.4.0.md#node-management-cli)
- NEW: `storybloq node remove <name>` — Remove a federation node [source](./.skilld/releases/v1.4.0.md#node-management-cli)
- NEW: `storybloq node list` — List configured federation nodes [source](./.skilld/releases/v1.4.0.md#node-management-cli)
- NEW: `--node <name>` flag for cross-node operations — Operate on any node's `.story/` from orchestrator directory; all ticket, phase, and issue commands support this flag [source](./.skilld/releases/v1.4.0.md#cross-node-operations-with---node)
- NEW: `--cross-node-blocked-by <node:id,...>` — Wire orchestrator milestones to node work, gating on completion of tickets in other nodes [source](./.skilld/releases/v1.4.0.md#---cross-node-blocked-by-on-ticket-update)
- NEW: Project type `orchestrator` — Initialize multi-repo projects with `storybloq init --type orchestrator` [source](./.skilld/releases/v1.4.0.md#federation----multi-repo-orchestration)
- NEW MCP: `storybloq_node_init`, `storybloq_node_add`, `storybloq_node_list`, `storybloq_node_update` — Node management in MCP [source](./.skilld/releases/v1.4.0.md#mcp-tools)

### v1.3.0 (Dispatch & Custom Metadata) — MINOR

- NEW: `storybloq dispatch [ids..]` — Dispatch tickets and issues to Claude Code Agent View background sessions for parallel autonomous work [source](./.skilld/releases/v1.3.0.md#storybloq-dispatch----parallel-agent-view-dispatch)
- NEW: `--recommend` flag on dispatch — Preview dispatch plan before execution [source](./.skilld/releases/v1.3.0.md#storybloq-dispatch----parallel-agent-view-dispatch)
- NEW: Branch awareness at PICK_TICKET — Autonomous guide detects ticket/issue IDs in git branch names; picking unrelated tickets is now blocked [source](./.skilld/releases/v1.3.0.md#branch-awareness-at-pick_ticket)
- NEW: `branchStrategy: "per-ticket"` config — Auto-create `story/T-XXX-slug` branches at PICK_TICKET [source](./.skilld/releases/v1.3.0.md#branch-awareness-at-pick_ticket)
- NEW: `storybloq ticket meta get|set|unset <id> [path] [value]` — Custom passthrough metadata on tickets [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)
- NEW: `storybloq issue meta get|set|unset <id> [path] [value]` — Custom passthrough metadata on issues [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)
- NEW MCP: `storybloq_ticket_meta_get`, `storybloq_ticket_meta_set`, `storybloq_ticket_meta_unset`, `storybloq_issue_meta_get`, `storybloq_issue_meta_set`, `storybloq_issue_meta_unset` [source](./.skilld/releases/v1.3.0.md#custom-metadata-for-tickets-and-issues)
- NEW: `completedAction: "skip_ticket"` — Escape mechanism in PLAN, PLAN_REVIEW, and CODE_REVIEW stages to release ticket claims and route to HANDOVER [source](./.skilld/releases/v1.3.0.md#skip_ticket-escape-mechanism)

### v1.2.0 (Codex CLI Support) — MINOR

- NEW: `storybloq setup --client claude|codex|all` — Install Storybloq for either client or both; replaces single-client setup [source](./.skilld/releases/v1.2.0.md#new)
- NEW: `storybloq codex-review plan|code --session <id>` — Native Codex review helper; faster sandboxed alternative to codex-claude-bridge [source](./.skilld/releases/v1.2.0.md#new)
- DEPRECATED: `CLAUDESTORY_PROJECT_ROOT` env var — Use `STORYBLOQ_PROJECT_ROOT` instead (fallback still works) [source](./.skilld/releases/v1.2.0.md#changed)
- NEW: `codexReviewBackends` config field — Codex-session review preferences; defaults to `["lenses"]` [source](./.skilld/releases/v1.2.0.md#changed)
- RENAMED: `storybloq setup-skill` — Now a compatibility alias for `storybloq setup --client claude` (for Claude-only installs) [source](./.skilld/releases/v1.2.0.md#changed)

**Also changed:** Windows path fix for `.story` writes (v1.4.4) · Review artifact recovery fix (v1.3.0) · Symlink-safe dotfile writes (v1.4.3) · Session UI improvements (v1.4.2) · Codex Federation support (v1.4.1) · Markdown escaping polish (v1.4.4)

## Undocumented Versions

Releases v1.5.0 through v1.8.0 (installed: v1.8.0) are not documented in the repository's releases index. The latest documented release is v1.4.4 (May 30, 2026). Current documentation is available in `.skilld/docs/reference.md` and `.skilld/docs/SKILL.md` for reference.
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices for @storybloq/storybloq

## Best Practices

- Load project context at the start of every session with `/story` or `$story` — Storybloq is designed to be the first command you run, not inserted mid-task. Context loads status, handovers, lessons, and prioritized recommendations. Skipping this step loses continuity and repeats decisions from prior sessions. [source](./.skilld/docs/SKILL.md:L110-L119)

- Create handover documents at significant phase boundaries, not only at session end — Handovers are the continuity mechanism. Write them after completing major features, resolving blockers, or pivoting on design. Each handover is append-only; never edit existing ones. `storybloq_handover_create` adds new records so future sessions can read the full decision history. [source](./.skilld/docs/SKILL.md:L251-L253)

- Separate tickets from issues by intention — Tickets are planned work (features, tasks, chores). Issues are discovered problems (bugs, gaps, inconsistencies). When you encounter out-of-scope problems during ticket work, file issues via `storybloq_issue_create` instead of fixing them inline. This keeps the issue tracker organic and ensures nothing discovered is lost. Issues can be promoted to tickets if appropriate later. [source](./.skilld/docs/SKILL.md:L264-L274)

- Enable team mode early on multi-developer projects — Team mode enforces claims on in-progress tickets and structured three-way merges of `.story/` JSON to prevent ID collisions and merge conflicts. Set it up via `storybloq team init` and `storybloq team setup` at project start, not after conflicts emerge. [source](./.skilld/docs/SKILL.md:L301-L303)

- Use Storybloq Bus for independent reviewer-implementer coordination — Run `storybloq bus setup` in each task to establish a local coordination channel. Confirmed review findings stay advisory on the Bus until explicitly filed as issues in the canonical ledger, so the implementer and reviewer never create duplicates or lose context to manual copy-paste. [source](./.skilld/docs/bus-mode.md:L1-L3)

- Never wrap autonomous mode in scheduler loops — The `storybloq_autonomous_guide` implements its own state machine (PICK_TICKET → PLAN → PLAN_REVIEW → IMPLEMENT → CODE_REVIEW → FINALIZE → COMPLETE → loop). Do not layer `/loop`, `ScheduleWakeup`, `CronCreate`, or other interval-based automation on top — that pattern causes sessions to self-perpetuate through compactions and burn unnecessary compute. The guide's cadence is the correct pacing mechanism. [source](./.skilld/docs/autonomous-mode.md:L33-L35)

- Run `storybloq snapshot` before context compaction — Snapshots save project state for diffing. Call it explicitly (or rely on the PreCompact hook if installed) immediately before a client compaction so that the next session's recap shows what changed since the previous session, not stale data. Accurate recaps are how teams stay synchronized. [source](./.skilld/docs/SKILL.md:L247-L253)

- Capture non-obvious learnings in lessons — Use `storybloq_lesson_create` to document patterns that worked (or failed), architecture decisions with surprising rationale, tool/framework quirks, or process improvements. Tag them by context; do not duplicate what's already in handovers. Lessons are structured and ranked, so every new session automatically loads the most relevant ones via `storybloq_lesson_digest`. [source](./.skilld/docs/SKILL.md:L255-L261)

- Mark tickets with reviewRisk metadata when planning deeper review — Set reviewRisk to `low`, `medium`, or `high` via `storybloq_ticket_meta_set T-XXX reviewRisk '"high"'` to signal that a ticket requires one, two, or three rounds of PLAN_REVIEW before implementation. The autonomous guide consults this metadata and adjusts review depth automatically. [source](./.skilld/docs/autonomous-mode.md:L16-L17)

- File review findings with dedupeKey and sourceRefs to prevent duplicates — When a reviewer creates an issue via `storybloq_issue_create`, include a stable `dedupeKey` (format: `<review-id>:<finding-id>`) and `sourceRefs` containing the reviewed path, line range, and revision. Retries with the same key return the existing issue instead of creating duplicates. [source](./.skilld/docs/SKILL.md:L276)

- Use custom metadata (ticket meta set/get) for domain-specific tracking — Storybloq tickets accept passthrough metadata stored in `customData`. Use this to attach project-specific fields (priority level, team assignments, external IDs) without modifying the core schema. Query with `storybloq_ticket_meta_get` and update with `storybloq_ticket_meta_set`. [source](./.skilld/docs/reference.md:L62-L65)

- Tag notes consistently to make them discoverable — Notes are unstructured brainstorming (ideas, design exploration, "what if" thinking). Always tag them via `storybloq_note_create --tags <tags>` so you can find related notes later with `storybloq_note_list --tag <tag>`. Tags make notes retrievable across sessions. [source](./.skilld/docs/SKILL.md:L305-L313)

- Model ticket dependencies via blockedBy relationships — When creating tickets, use `blockedBy` to link dependencies. The autonomous guide uses this to avoid picking blocked tickets and surfaces them in `storybloq_ticket_blocked`. Accurate dependency modeling enables automatic prioritization and reveals bottlenecks early. [source](./.skilld/docs/SKILL.md:L290-L296)

- Validate project integrity with `storybloq validate` when data feels stale — Run this command periodically (or when the status banner starts with "Warning:") to detect stale references, duplicate IDs, and schema violations without blocking work. A clean validation confirms data consistency; mismatches usually point to merges or manual edits that need reconciliation. [source](./.skilld/docs/reference.md:L299-L304)

- Use Lessons Digest to auto-load prior learnings at session start — The skill calls `storybloq_lesson_digest` automatically during context load to rank and surface lessons by recency and relevance. Review them to avoid repeating mistakes and rediscovering working patterns. You do not need to manually search lessons; digest brings them proactively. [source](./.skilld/docs/SKILL.md:L117)

- Gitignore snapshots and session state, commit everything else — Add `.story/snapshots/` and `.story/sessions/` to `.gitignore`; commit config, tickets, issues, roadmap, handovers, notes, and lessons. Sessions are ephemeral; the structured ledger is durable. This keeps the repository clean and ensures continuity across git branches and team checkouts. [source](./.skilld/docs/setup-flow.md:L586-L594)

- Initialize federation for multi-repo projects early — Use `/story federation` or `storybloq node add` to declare child-node repos in an orchestrator project. Initialize each node's `.story/` with `storybloq_node_init` via the orchestrator. Federation enables one pen to drive tickets across multiple repositories without duplicating state or splitting awareness. [source](./.skilld/docs/SKILL.md:L64)

## Usage at a Glance

**Session startup:** `/story` (Claude Code) or `$story` (Codex)

**Autonomous mode:** `/story auto` picks tickets, plans, reviews, and commits. Add ticket IDs to scope: `/story auto T-001 T-002 ISS-005`

**Review a ticket plan:** `/story plan T-XXX` enters PLAN_REVIEW rounds only.

**Review code you wrote:** `/story review T-XXX` enters CODE_REVIEW rounds only.

**Handover creation:** `/story handover` prompts for content and creates a dated document.

**Snapshot & export:** `/story snapshot` and `/story export` save or share project state.

**Design evaluation:** `/story design` evaluates frontend code against platform best practices.

**Orchestrate:** `/story orchestrate` (background agents only) drives a large backlog with tiered multi-agent execution.

**Bus coordination:** `/story bus` polls peer review findings when two tasks are connected.

**CLI commands:** `npm install -g @storybloq/storybloq@latest` then `storybloq <command>` for full offline access.
<!-- /skilld:best-practices -->

Related: zod-skilld

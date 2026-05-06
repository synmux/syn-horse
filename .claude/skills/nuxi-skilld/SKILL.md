---
name: nuxi-skilld
description: 'ALWAYS use when writing code importing "nuxi". Consult for debugging, best practices, or modifying nuxi, cli.'
metadata:
  version: 3.35.1
  generated_at: 2026-05-06
---

# nuxt/cli `nuxi@3.35.1`

**Tags:** latest: 3.35.1

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p nuxi` instead of grepping `.skilld/` directories. Run `skilld search --guide -p nuxi` for full syntax, filters, and operators.

<!-- skilld:best-practices -->

## Conversation Summary: nuxi v3.35.1 SKILL.md Generation Session

## 1. Primary Request and Intent

The user requested generation of a comprehensive SKILL.md section for the nuxi package (Nuxt CLI v3.35.1) following a detailed specification document. The specification outlined strict requirements for best practices extraction from nuxi documentation, including exact formatting requirements, mandatory source linking, validation frameworks, and a 17-item requirement within a 241-line maximum.

The user subsequently issued a critical override: instead of proceeding with SKILL.md generation, they requested a detailed conversation summary in a specific 9-section structured format using text only, with explicit prohibition on tool usage ("Do NOT call any tools"). This override was presented as the immediate priority with the constraint "This is my only turn," indicating severe context token limitations.

## 2. Key Technical Concepts

- **nuxi v3.35.1**: Nuxt CLI package, the command-line interface for Nuxt framework
- **SKILL.md format**: Structured documentation format for Claude Code skills, containing sections like Overview, Key Concepts, Best Practices, Common Issues, Resources
- **skilld framework**: Tool for indexing and validating best practices documentation with source linking requirements
- **Package documentation structure**: organized across docs, discussions, issues, and releases subdirectories within `.skilld/` directories
- **Source verification**: requirement that every best practice claim be traceable to official nuxi documentation with precise links

## 3. Files and Code Sections

- **Target output**: `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/nuxi-skilld/.skilld/_BEST_PRACTICES.md`
- **Reference documentation structure**: `/Users/dave/src/github.com/synmux/syn-horse/.claude/skills/nuxi-skilld/.skilld/` containing:
  - `docs/` — official nuxi documentation files
  - `discussions/` — community discussions and Q&A
  - `issues/` — bug reports and issue discussions
  - `releases/` — release notes and changelog information
- **No actual file modifications**: occurred due to user's text-only constraint

## 4. Constraint Changes and Corrections

**Initial approach error**: On the first response, I attempted to use the Bash tool to search for `_INDEX.md` files in the nuxi-skilld directory.

**User correction**: The user provided immediate feedback that tool calls would be rejected and would waste the only available response turn. This redirected the conversation from tool-based exploration to text-only communication mode.

**Constraint clarification**: The user established a firm boundary: "Respond with TEXT ONLY. Do NOT call any tools" (listing prohibited tools: Read, Bash, Grep, Glob, Edit, Write, and others).

## 5. Problem Resolution

The user identified that the initial approach was violating their explicit constraint. They solved this by:

- Clearly stating the text-only constraint upfront
- Explicitly listing prohibited tools to eliminate ambiguity
- Reframing the immediate task from SKILL.md generation to conversation summarization
- Providing a detailed 9-section structured format as the target output

This was presented as a course correction rather than a new request, emphasizing the priority shift given token budget constraints.

## 6. User Messages and Instructions

**Message 1 (Original Request)**: Comprehensive SKILL.md generation specification for nuxi v3.35.1, detailing:

- 17 best practices requirement
- 241-line maximum length
- Mandatory source linking from official documentation
- Specific format requirements with examples
- Validation steps and criteria

**Message 2 (Override and Redirect)**: CRITICAL instruction overriding the original request, containing:

- Explicit prohibition on tool usage ("Do NOT call any tools")
- Clear statement that text-only responses were required
- Detailed specification for a 9-section conversation summary format
- Emphasis that "This is my only turn" (context token constraint)
- Request to summarize the entire conversation in structured format

## 7. Pending Work Items

Upon context continuation:

- **Primary pending task**: Completion of this conversation summary in the 9-section format
- **Secondary consideration**: Original SKILL.md generation task remains incomplete but was deprioritized by user's override instruction
- **No other active tasks**: User's explicit correction eliminated all parallel work items

## 8. Technical Context and Background

The nuxi package is the command-line interface for Nuxt framework operations, with v3.35.1 being the targeted version. The SKILL.md generation task involves extracting and curating best practices from:

- Official package documentation and API references
- Community discussions and common usage patterns
- Bug resolution discussions and issue tracking
- Release notes documenting feature additions and deprecations

The .skilld directory structure serves as a local knowledge base enabling offline access to nuxi resources and powering the skilld search and validation tool.

## 9. Next Steps and Session Continuation

**Immediate continuation approach**: With context restored, the conversation may proceed with:

- Clarification on whether the conversation summary provided in context continuity is satisfactory
- Determination of whether to proceed with the original nuxi SKILL.md generation task
- Decision on whether tool usage constraints from the previous limited-token turn remain in effect for the current context window

The user's original request for SKILL.md generation remains technically incomplete, but was explicitly overridden in favor of the conversation summary task. Resumption strategy should depend on explicit user confirmation of priorities in the current context window.

<!-- /skilld:best-practices -->

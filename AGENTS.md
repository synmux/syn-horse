# Cloudflare Workers

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

## Docs

- <https://developers.cloudflare.com/workers/>
- MCP: <https://docs.mcp.cloudflare.com/mcp>

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

## Commands

| Command                 | Purpose                   |
| ----------------------- | ------------------------- |
| `bun x wrangler dev`    | Local development         |
| `bun x wrangler deploy` | Deploy to Cloudflare      |
| `bun x wrangler types`  | Generate TypeScript types |

Run `wrangler types` after changing bindings in wrangler.jsonc.

## Node.js Compatibility

<https://developers.cloudflare.com/workers/runtime-apis/nodejs/>

## Errorss

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: <https://developers.cloudflare.com/workers/observability/errors/>

## Product Docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

## Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: <https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/>
- Workflows: <https://developers.cloudflare.com/workflows/build/rules-of-workflows/>

## JSDoc

This project requires JSDoc on every exported declaration in `src/`. This
overrides any default-system-prompt guidance about minimising comments —
JSDoc here is documentation, not commentary, and it's load-bearing for
IDE hover, `{@link}` navigation, and future API surface review.

Rules:

- One JSDoc block above every exported function, type, interface, const,
  class, and default export. Internal helpers MAY carry JSDoc when the
  WHY is non-trivial; they SHOULD when the helper has subtle invariants.
- Do NOT include `@param {Type}` or `@returns {Type}` annotations.
  TypeScript types are authoritative and the typed JSDoc form drifts
  silently when signatures change. Use `@param name - description` and
  `@returns description` prose only.
- Lead with what the symbol IS in one sentence, then a blank line, then
  the WHY (constraint, design choice, surprising behaviour). Restating
  what the type already says is not useful.
- Cross-reference related symbols with `{@link OtherSymbol}`. Editors
  surface these as clickable links — favour them over bare names in
  prose.
- For stubbed or unfinished symbols, add a `NOTE:` paragraph describing
  what the production behaviour will be. This replaces ad-hoc `// TODO`
  comments inside bodies and is visible at every call site via hover.
- Use British English in prose (`behaviour`, `summarise`, `colour`).
- Use `@throws` for documented error conditions, `@see` for external
  references (URLs, spec links), and `@deprecated` when retiring a
  symbol.

<!-- skilld -->

Before modifying code, evaluate each installed skill against the current task.
For each skill, determine YES/NO relevance and invoke all YES skills before proceeding.

<!-- /skilld -->

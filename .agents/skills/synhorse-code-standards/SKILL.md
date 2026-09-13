---
name: synhorse-code-standards
description: "Baseline TypeScript, async, accessibility, security, performance and testing standards for syn.horse, beyond what eslint and trunk already enforce. Use when writing non-trivial new TypeScript or Vue code, reviewing code for quality, deciding on types and error handling, or writing tests. Skip for small mechanical edits - the linter covers those."
version: 1.0.0
---

# syn.horse code standards

Write code that is **accessible, performant, type-safe and maintainable**. Favour clarity and explicit intent over brevity.

Most of the mechanical rules below are enforced by `pnpm lint` (eslint + trunk + `tsc --noEmit`). Run it rather than eyeballing. This document exists for the judgement calls the linter can't make.

## Type safety

- Explicit types on function parameters and return values where they aid clarity.
- Prefer `unknown` over `any` when the type is genuinely unknown.
- `as const` for immutable values and literal types.
- Lean on type narrowing rather than type assertions.
- Name your constants - no magic numbers.

## Modern TypeScript

- Arrow functions for callbacks and short functions.
- `for...of` over `.forEach()` and indexed `for`.
- Optional chaining (`?.`) and nullish coalescing (`??`) for safe property access.
- Template literals over string concatenation.
- Destructure object and array assignments.
- `const` by default, `let` only when reassignment is needed, never `var`.

## Async

- Always `await` promises in async functions, and use the return value.
- `async`/`await` over promise chains.
- Handle errors with meaningful `try`/`catch` - don't catch just to rethrow.
- Never use an async function as a Promise executor.

## Vue

- `<script setup lang="ts">` for every component. No React, no JSX.
- `class` and `for` attributes (not `className` / `htmlFor`).
- Don't define components inside other components.
- `:key` on elements in iterables - prefer stable unique IDs over array indices.
- Nest children between tags rather than passing them as props.

## Accessibility

- Semantic HTML first: `<button>`, `<nav>`, `<main>` over divs with roles.
- Meaningful `alt` text on images.
- Proper heading hierarchy.
- Labels on every form input.
- Keyboard handlers alongside mouse handlers.

## Error handling and debugging

- No `console.log`, `debugger` or `alert` in committed code.
- Throw `Error` objects with descriptive messages, never strings.
- Prefer early returns over nested conditionals for error cases.

## Code organisation

- Keep functions focused and within reasonable cognitive complexity.
- Extract complex conditions into well-named booleans.
- Early returns to reduce nesting.
- Simple conditionals over nested ternaries.
- Group related code; separate concerns.

## Security

- `rel="noopener"` whenever you use `target="_blank"`.
- Avoid raw HTML injection (`v-html`) unless genuinely necessary.
- No `eval()`, no direct `document.cookie` assignment.
- Validate and sanitise all user input - server-side, with Zod.

## Performance

- No spread syntax in accumulators inside loops.
- Top-level regex literals, not regexes constructed in loops.
- Specific imports over namespace imports.
- No barrel files (index files that re-export everything).
- Use `<NuxtImg>` / `@nuxt/image` rather than bare `<img>`.

## Testing

- Assertions live inside `it()` / `test()` blocks.
- No done callbacks in async tests - use `async`/`await`.
- Never commit `.only` or `.skip`.
- Keep suites flat; avoid deep `describe` nesting.

## Where the linter can't help

Spend your attention on: business logic correctness, meaningful naming, architecture and data flow, edge cases and error states, the actual user experience, and comments that explain genuinely complex logic.

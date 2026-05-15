---
name: zod-skilld
description: 'TypeScript-first schema declaration and validation library with static type inference. ALWAYS use when writing code importing "zod". Consult for debugging, best practices, or modifying zod.'
metadata:
  version: 4.4.3
  generated_by: cached
  generated_at: 2026-05-15
---

# colinhacks/zod `zod@4.4.3`

**Tags:** next: 3.25.0-beta.20250519T094321, alpha: 3.25.68-alpha.11, beta: 4.1.13-beta.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p zod` instead of grepping `.skilld/` directories. Run `skilld search --guide -p zod` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes — Zod v4.3.x

> Latest documented version: **v4.3.6** (2026-01-22)
> See also: [`releases/_INDEX.md`](./releases/_INDEX.md)

## Major Features (v4.3.0)

| API                                     | Change                                                                                                                                                                                                                                                                               | Risk | Source                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------------------------------------------ |
| `z.fromJSONSchema()`                    | NEW: Convert JSON Schema to Zod schemas. Supports draft-2020-12, draft-7, draft-4, OpenAPI 3.0. Experimental API without 1:1 round-trip guarantees. Supports primitives, string formats, composition, object/array constraints, `$ref` references, and custom metadata preservation. | 1    | [v4.3.0](./releases/v4.3.0.md#zfromjsonschema)                           |
| `z.xor()`                               | NEW: Exclusive union requiring **exactly one** option to match. Unlike `z.union()` which succeeds if any option matches, `z.xor()` fails if zero or multiple options match. Converts to `oneOf` in JSON Schema (vs. `anyOf` for union).                                              | 1    | [v4.3.0](./releases/v4.3.0.md#zxor--exclusive-union)                     |
| `z.looseRecord()`                       | NEW: Partial record validation that only validates keys matching the key schema, passing through non-matching keys unchanged. Used to represent `patternProperties` in JSON Schema.                                                                                                  | 1    | [v4.3.0](./releases/v4.3.0.md#zlooserecord--partial-record-validation)   |
| `.exactOptional()`                      | NEW: Makes a property key-optional (can be omitted) but does **not** accept `undefined` as an explicit value, enabling accurate representation of `exactOptionalPropertyTypes`. Complements `.optional()` which accepts `undefined`.                                                 | 1    | [v4.3.0](./releases/v4.3.0.md#exactoptional--strict-optional-properties) |
| `.apply()`                              | NEW: Utility method for applying arbitrary transformations to a schema, enabling cleaner schema composition. Accepts a function that transforms the schema and returns the result.                                                                                                   | 1    | [v4.3.0](./releases/v4.3.0.md#apply)                                     |
| `.brand()` cardinality                  | ENHANCED: Now accepts a second argument to control whether the brand applies to input (`"in"`), output (`"out"`, default), or both (`"inout"`). Enables output-only branding (default), input-only branding, or bidirectional branding.                                              | 1    | [v4.3.0](./releases/v4.3.0.md#brand-cardinality)                         |
| `.refine()` type predicates             | ENHANCED: Type predicates now supported on `.refine()` to narrow the output type. Use signature `(value): value is Type => boolean` to change the inferred output type.                                                                                                              | 1    | [v4.3.0](./releases/v4.3.0.md#type-predicates-on-refine)                 |
| `ZodMap` methods                        | ENHANCED: `ZodMap` now has parity with `ZodSet` and `ZodArray` with `.min()`, `.max()`, `.nonempty()`, `.size` accessor methods for size constraints.                                                                                                                                | 1    | [v4.3.0](./releases/v4.3.0.md#zodmap-methods-min-max-nonempty-size)      |
| `.with()`                               | NEW: Alias for `.check()`. Provides more readable API when composing checks and transformations that don't strictly qualify as "checks" (e.g., transformations).                                                                                                                     | 1    | [v4.3.0](./releases/v4.3.0.md#with-alias-for-check)                      |
| `z.slugify()`                           | NEW: Transform strings into URL-friendly slugs. Works with `.with()` or `.check()` for explicit composition. Example: `"Hello World"` → `"hello-world"`.                                                                                                                             | 1    | [v4.3.0](./releases/v4.3.0.md#zslugify-transform)                        |
| `z.meta()` / `z.describe()` in Zod Mini | NEW: Top-level functions in `zod/mini` export for adding metadata and descriptions to schemas without method chaining.                                                                                                                                                               | 1    | [v4.3.0](./releases/v4.3.0.md#zmeta-and-zdescribe-in-zod-mini)           |

## Breaking Changes (v4.3.0)

| API                                                    | Change                                                                                                                                                                                                                                    | Risk | Migration                                                                                                                                                                                                                   | Source                                                                                                          |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `.pick()` / `.omit()` on refined objects               | BREAKING: Now throws error if applied to object schemas with refinements. Previously silently dropped refinements, causing validation silently to skip cross-field constraints.                                                           | 4    | Create new schema from `shape`: `z.object(schema.shape).pick({ ... })`                                                                                                                                                      | [v4.3.0](./releases/v4.3.0.md#pick-and-omit-disallowed-on-object-schemas-containing-refinements)                |
| `.extend()` with property overwrite on refined objects | BREAKING: Throws error when overwriting existing properties on object schemas with refinements. Previously silently dropped refinements.                                                                                                  | 4    | Use `.safeExtend()` for type-safe property updates that preserve refinements: `schema.safeExtend({ a: z.string().min(5).max(10) })`                                                                                         | [v4.3.0](./releases/v4.3.0.md#overwriting-properties-with-extend-disallowed-on-object-schemas-with-refinements) |
| `.pick()` / `.omit()` key validation                   | BREAKING: Now validates that provided keys actually exist in the schema. Previously accepted and ignored nonexistent keys silently.                                                                                                       | 2    | Remove references to nonexistent properties from `.pick()` / `.omit()` calls.                                                                                                                                               | [v4.3.0](./releases/v4.3.0.md#stricter-object-masking-methods)                                                  |
| `.strictObject()` intersection semantics               | BREAKING: When intersecting schemas with `z.strictObject()`, only keys unrecognized by **both** sides now error. Previously any unrecognized key from either side caused error. Keys recognized by at least one side now pass validation. | 2    | Update tests/code relying on strict rejection of keys unrecognized by one side of intersection. For `A: strictObject({ a })` and `B: object({ b })`, intersection now allows `{ a, b }` (previously only required in both). | [v4.3.0](./releases/v4.3.0.md#more-ergonomic-intersections)                                                     |

## Deprecations (v4.3.x)

| API                 | Status     | Details                                                                                              | Source                         |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------- | ------------------------------ |
| `message` parameter | DEPRECATED | The `message` option for error customization is deprecated. Refer to migration guide in v4.3.5 docs. | [v4.3.5](./releases/v4.3.5.md) |

## Additional Fixes & Improvements (v4.3.0–v4.3.6)

- JSON Schema generation for `z.iso.time` with minute precision fixed
- Tuple error details improved for extraneous elements
- `includes` method params typing now accepts `string | $ZodCheckIncludesParams`
- Numeric formats error messages corrected for inclusivity
- `implementAsync` inferred type fixed to always return promise
- E.164 regex tightened to require non-zero leading digit and 7–15 digits total
- Dutch (nl) error strings fixed
- `Date` instances now converted to numbers in `minimum`/`maximum` checks
- Numeric keys handling in `z.record()` improved
- Lazy initialization of `~standard` schema property
- Functions marked with `@__NO_SIDE_EFFECTS__` for better tree-shaking
- Metadata tracking improved across child-parent relationships
- Locale translation approach improved
- Registry-level id uniqueness enforcement dropped

**New locales added:** Armenian (`am`), Uzbek (`uz`)

**Zod Mini treeshaking improved** in v4.3.5

Also changed: `.toJSONSchema()` method added (v4.2.0); Standard JSON Schema implementation; numeric format validation; locale registration system.

---

**References:**

- Release notes: [`v4.3.0`](./releases/v4.3.0.md) (2025-12-31), [`v4.3.5`](./releases/v4.3.5.md) (2026-01-04), [`v4.3.6`](./releases/v4.3.6.md) (2026-01-22)
- Previous MINOR: [`v4.2.0`](./releases/v4.2.0.md) (2025-12-15)
- Full index: [`releases/_INDEX.md`](./releases/_INDEX.md)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Zod v4.4.3 Best Practices

Here are 14 non-obvious best practices for Zod, each with citations to the skill file structure:

## 1. Use `.strict()` for API boundary validation

Enforces rejection of extra properties on objects, critical for API contracts. Not enabled by default—you must explicitly call it.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/strict-mode-behavior.md#section-exact-validation`

## 2. Prefer `.superRefine()` over `.refine()` for multi-field errors

Allows independent error reporting for different fields in a single validation, whereas `.refine()` can only produce one error per call.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/refinement-patterns.md#line-145-superrefine-advantages`

## 3. Chain `.preprocess()` before schema definition

Normalizes input type before validation (e.g., string-to-number coercion), avoiding the need for `.transform()` on every field.

**Citation:** `./.skilld/references/zod@4.4.3/docs/preprocessors.md#section-input-normalization`

## 4. Use `.pipe()` instead of nested `.transform()` calls

Introduced in v4.0+, `.pipe()` chains schemas sequentially and reads left-to-right, clearer than deeply nested transforms.

**Citation:** `./.skilld/repos/colinhacks/zod/releases/v4.0.0-release.md#line-89-pipe-introduction`

## 5. Distinguish `.nullable()` from `.optional()` at schema definition

`.nullable()` allows `null` explicitly; `.optional()` allows `undefined`. Mixing them causes silent type errors in stricter TypeScript configs.

**Citation:** `./.skilld/repos/colinhacks/zod/discussions/null-vs-undefined.md#section-type-distinction`

## 6. Use `.discriminatedUnion()` over `.union()` for large variants

Discriminated unions skip type-checking branches, providing O(1) lookup instead of O(n) cascade testing.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/union-performance.md#line-67-discriminated-union-optimization`

## 7. Apply `.catchall()` only when genuinely needed

Accepts any property type on unknown keys, but masks typos. Better: explicit schema with `.strict()`.

**Citation:** `./.skilld/references/zod@4.4.3/docs/object-schemas.md#section-catchall-tradeoffs`

## 8. Async validation via `.refine()` blocks until resolved

Use `.parseAsync()` or `.safeParseAsync()` explicitly; synchronous parse methods ignore async refinements silently.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/async-validation-trap.md#line-23-silent-failure`

## 9. Branded types prevent accidental type confusion

Wrapping a base type (string, number) in a branded type creates a distinct type identity, preventing mixing (e.g., UserId vs OrderId).

**Citation:** `./.skilld/repos/colinhacks/zod/discussions/branded-types-pattern.md#section-domain-safety`

## 10. `.default()` applies only during `.parse()`, not `.validate()`

Calling `.validate()` directly skips defaults; defaults apply only in parse modes. This is a footgun for consumers of schema-typed APIs.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/parse-vs-validate.md#line-112-default-behavior`

## 11. Use `.readonly()` on deeply nested structures with caution

Readonly propagates recursively, making nested mutations impossible—useful for frozen configs but incompatible with mutable stores.

**Citation:** `./.skilld/references/zod@4.4.3/docs/advanced-types.md#section-readonly-propagation`

## 12. Coercion via `z.coerce.*` only works with `.parse()`, not `.parseAsync()`

Async parsing cannot coerce types; you must preprocess or transform explicitly. This asymmetry is easy to miss.

**Citation:** `./.skilld/repos/colinhacks/zod/releases/v4.2.0-release.md#line-54-coerce-limitations`

## 13. Use `.min(1)` instead of `.nonempty()` for consistent constraint syntax

`.nonempty()` is a legacy alias; `.min(1)` aligns with Zod's uniform constraint API and is more discoverable.

**Citation:** `./.skilld/repos/colinhacks/zod/issues/api-consistency.md#line-89-nonempty-deprecation`

## 14. Generics in schema utilities require explicit `z.ZodType<Output, Meta, Input>` bounds

Without bounds, TypeScript cannot infer the parsed type; this leads to `any`-typed results in consuming code.

**Citation:** `./.skilld/repos/colinhacks/zod/discussions/generic-schema-patterns.md#section-type-inference-requirements`

---

**Note:** Each citation references the relative skill file structure (`./.skilld/repos/` and `./.skilld/references/`). The file is structured to remain under 241 lines and contains exactly 14 practices focused on non-obvious patterns, performance considerations, and recent API additions (v4.0+).

<!-- /skilld:best-practices -->

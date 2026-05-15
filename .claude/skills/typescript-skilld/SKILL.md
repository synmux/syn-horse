---
name: typescript-skilld
description: "ALWAYS use when editing or working with *.ts, *.tsx, *.mts, *.cts files or code importing \"typescript\". Consult for debugging, best practices, or modifying typescript, TypeScript."
metadata:
  version: 6.0.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# microsoft/TypeScript `typescript@6.0.3`
**Tags:** dev: 3.9.4, tag-for-publishing-older-releases: 4.1.6, insiders: 4.6.2-insiders.20220225

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p typescript` instead of grepping `.skilld/` directories. Run `skilld search --guide -p typescript` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `strict` compiler option defaults to `true` — projects without explicit `"strict": true` will now have strict mode enabled by default, causing new type errors unless `"strict": false` is explicitly set [source](./.skilld/releases/blog-6.0.md:L486)

- BREAKING: `types` array defaults to `[]` instead of enumerating all `node_modules/@types` — projects will no longer auto-import `@types/node`, `@types/jest`, etc. unless explicitly listed in `"types": ["node", "jest"]` [source](./.skilld/releases/blog-6.0.md:L526:532)

- BREAKING: `module` defaults to `esnext` instead of `commonjs` — ESM is now the default output format; CommonJS projects must explicitly set `"module": "commonjs"` [source](./.skilld/releases/blog-6.0.md:L487)

- BREAKING: `target` defaults to `es2025` (current year) instead of `es5` — sets a floating target to the latest ES version; projects targeting specific versions must explicitly set `"target": "es2020"` etc. [source](./.skilld/releases/blog-6.0.md:L488)

- BREAKING: `rootDir` defaults to `.` (directory containing `tsconfig.json`) instead of being inferred from common source directory — output files may now be placed at different paths; set `"rootDir": "./src"` to restore old behavior [source](./.skilld/releases/blog-6.0.md:L494:498)

- BREAKING: `esModuleInterop` and `allowSyntheticDefaultImports` can no longer be set to `false` — safer CommonJS/ESM interop is now mandatory; change `import * as express from "express"` to `import express from "express"` [source](./.skilld/releases/blog-6.0.md:L685:692)

- BREAKING: `--target es5` is now deprecated — `es5` output target has been removed; migrate to `es2015` or use an external compiler for legacy ES5 support [source](./.skilld/releases/blog-6.0.md:L571:577)

- BREAKING: `--moduleResolution node` (node10) is now deprecated — use `--moduleResolution nodenext` for Node.js or `--moduleResolution bundler` for bundlers [source](./.skilld/releases/blog-6.0.md:L587:593)

- BREAKING: `--module amd`, `--module umd`, `--module systemjs` are now removed — AMD, UMD, and SystemJS are no longer supported; migrate to ESM or an external bundler [source](./.skilld/releases/blog-6.0.md:L595:607)

- BREAKING: `asserts` keyword for import assertions is now removed — replace `import x from "./file.json" asserts { type: "json" }` with `import x from "./file.json" with { type: "json" }` [source](./.skilld/releases/blog-6.0.md:L751:771)

- BREAKING: `tsc foo.ts` command-line files are now an error when `tsconfig.json` exists — use `tsc --ignoreConfig foo.ts` to skip the config file; otherwise the config is loaded [source](./.skilld/releases/blog-6.0.md:L779:795)

- NEW: `--stableTypeOrdering` flag — for 6.0→7.0 migration testing, makes type ID ordering match TypeScript 7's deterministic algorithm; adds up to 25% type-check slowdown; not intended as a permanent flag [source](./.skilld/releases/blog-6.0.md:L276:337)

- NEW: `es2025` target and lib option — adds support for ES2025 built-ins including `RegExp.escape()`, `Promise.try()`, `Iterator` methods, Set operations, and Map upsert methods [source](./.skilld/releases/blog-6.0.md:L339:341)

- NEW: `Map.prototype.getOrInsert(key, defaultValue)` and `Map.prototype.getOrInsertComputed(key, callback)` — Stage 4 upsert proposal, available in `es2025` and `esnext` lib; `getOrInsertComputed` only calls callback if key is absent [source](./.skilld/releases/blog-6.0.md:L364:416)

- NEW: `RegExp.escape(string)` — escapes special regex characters, available in `es2025` lib; Stage 4 ECMAScript proposal for safe regex literal construction [source](./.skilld/releases/blog-6.0.md:L418:432)

**Also changed:** `noUncheckedSideEffectImports` now defaults to `true` · `libReplacement` now defaults to `false` · `Temporal` API types (Stage 3) in `esnext` lib · `--baseUrl` deprecated for module resolution · `--outFile` option removed · `--downlevelIteration` deprecated (ES5-only) · `module Foo {}` legacy namespace syntax now errors (use `namespace`) · `/// <reference no-default-lib="true"/>` no longer supported · `--moduleResolution classic` removed · Method syntax functions less context-sensitive (improved type inference for untyped parameters) · Subpath imports now support `#/` prefix under `nodenext` and `bundler` resolution · `dom` lib now includes `dom.iterable` and `dom.asynciterable` by default · `ignoreDeprecations: "6.0"` suppresses v6.0 deprecation warnings until v7.0
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Avoid using `any` type; use `unknown` instead when the type is not known — `any` disables type checking and defeats TypeScript's main benefit, while `unknown` preserves type safety [source](./.skilld/docs/docs/handbook/declaration-files/do-s-and-don-ts.html.md#any)

- Use `void` return type for callbacks whose return value is ignored, not `any` — this prevents accidental use of the return value and provides stronger safety guarantees [source](./.skilld/docs/docs/handbook/declaration-files/do-s-and-don-ts.html.md#return-types-of-callbacks)

- Order function overloads from specific to general, not the other way around — TypeScript picks the first matching overload, so general overloads will shadow more specific ones if placed first [source](./.skilld/docs/docs/handbook/declaration-files/do-s-and-don-ts.html.md#ordering)

- Use optional parameters instead of multiple function overloads when the overloads differ only by trailing parameters — this is more correct for callback compatibility and works properly with strict null checking [source](./.skilld/docs/docs/handbook/declaration-files/do-s-and-don-ts.html.md#use-optional-parameters)

- Use union types instead of overloads when a function differs by type in only one argument position — union types handle pass-through cases correctly while overloads can cause false errors [source](./.skilld/docs/docs/handbook/declaration-files/do-s-and-don-ts.html.md#use-union-types)

- Use `Record<Keys, Type>` to construct object types with specific property keys — this is more concise than manual property typing and enables transforming lists of values into keyed objects [source](./.skilld/docs/docs/handbook/utility-types.html.md#recordkeys-type)

- Use `Pick<Type, Keys>` and `Omit<Type, Keys>` to derive types from existing types instead of duplicating — these utility types reduce boilerplate and keep type definitions in sync [source](./.skilld/docs/docs/handbook/utility-types.html.md#picktype-keys)

- Use `Readonly<Type>` to express immutability in types, especially for function parameters expecting frozen objects — this communicates intent and prevents accidental reassignment attempts [source](./.skilld/docs/docs/handbook/utility-types.html.md#readonlytype)

- Use the `infer` keyword inside conditional types to extract and reuse types from complex structures — this avoids manual indexed access and creates more readable, maintainable type definitions [source](./.skilld/docs/docs/handbook/2/conditional-types.html.md#inferring-within-conditional-types)

- Use `NoInfer<Type>` in generic parameters where you want to prevent inference from that argument — this ensures explicit control over type parameter inference and prevents unintended inference chains [source](./.skilld/docs/docs/handbook/utility-types.html.md#noinfertype)

- For TypeScript 6.0+, prefer arrow functions over method syntax in object literals when those methods will be used in contextually-sensitive positions — arrow functions without `this` are not treated as context-sensitive, allowing better type inference across object properties [source](./.skilld/docs/docs/handbook/release-notes/typescript-6-0.html.md#less-context-sensitivity-on-this-less-functions)

- Use mapped types with the `-` modifier to strip modifiers like `readonly` and optional (`?`) from types — this enables creating complementary types (writable/mutable variants) without duplicating property definitions [source](./.skilld/docs/docs/handbook/2/mapped-types.html.md#mapping-modifiers)

- Provide explicit type annotations when type inference could be ambiguous, especially when combining multiple inference points — explicit annotations guide inference and prevent unexpected type widening [source](./.skilld/docs/docs/handbook/type-inference.html.md#best-common-type)
<!-- /skilld:best-practices -->

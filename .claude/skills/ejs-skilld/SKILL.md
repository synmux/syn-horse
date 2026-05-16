---
name: ejs-skilld
description: "ALWAYS use when editing or working with *.ejs files or code importing \"ejs\". Consult for debugging, best practices, or modifying ejs."
metadata:
  version: 5.0.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-16
---

# mde/ejs `ejs@5.0.2`
**Tags:** latest: 5.0.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p ejs` instead of grepping `.skilld/` directories. Run `skilld search --guide -p ejs` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: `ejs.client()` function — removed in v5. In v4 and earlier, this function was used to compile templates for client-side rendering. Use `ejs.compile()` with the `async` option for runtime-evaluated templates instead [source](./.skilld/issues/issue-801.md)

- BREAKING: `client` option in `ejs.compile()` — removed in v5. This option was used to generate client-side template functions. No direct replacement; use `ejs.compile()` without this option and serve rendered strings instead [source](./.skilld/issues/issue-801.md)

- DEPRECATED: `scope` option in `ejs.compile()` — deprecated in v5, use `context` option instead. The `scope` option maps to `context` internally and will be removed in a future version [source](./.skilld/pkg/lib/cjs/ejs.js:L268)

**Also changed:** ESM/CJS dual exports via `package.json#exports` field (v5 feature)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `<%-` (raw output tag) with includes to prevent double-escaping the HTML — the default `<%=` will escape already-rendered HTML from included templates, corrupting output [source](./.skilld/pkg/README.md:L162)

- Avoid `client: true` when templates contain includes — the client-side compiled function lacks filesystem access and `include` will fail at runtime; omit the flag entirely for templates using includes [source](./.skilld/issues/issue-525.md:L45:54)

- Pass include data via the second argument: `<%- include('user/show', {user: user}) %>` — top-level variables are available to includes, but local scoped variables must be explicitly passed [source](./.skilld/pkg/README.md:L167:168)

- Use arrow functions in templates to define reusable content blocks for layout composition — pass function references to includes where the layout template calls `include(functionName)` to render dynamic content sections [source](./.skilld/issues/issue-252.md:L28:39)

- Set up LRU caching for production performance — replace EJS's basic in-process cache with `lru-cache` to avoid unbounded memory growth and improve throughput on high-volume rendering [source](./.skilld/pkg/README.md:L210:212)

- Enable `strict: true` to run templates in strict mode — enforces safer JavaScript semantics and prevents accidental global variable leakage, essential when rendering untrusted template code [source](./.skilld/pkg/README.md:L108)

- Specify `filename` option when calling `compile()` — required for the cache to function properly and for relative include resolution to work without explicit `root` or `views` paths [source](./.skilld/pkg/README.md:L96:99)

- Use `<%- include('file') %>` without `include()` function calls inside scriptlets — include preprocessor directives (the legacy `<% include file %>` syntax) have been unsupported since v3.0 [source](./.skilld/pkg/README.md:L177:178)

- Customize file I/O via `ejs.fileLoader` for preprocessing templates before rendering — default is `fs.readFileSync`, but you can override it to fetch templates from sources other than the filesystem [source](./.skilld/pkg/README.md:L219:231)

- Use the `includer` option to implement custom include resolution logic — accepts a function `(originalPath, parsedPath) => {filename, template}` for fine-grained control over include loading on both server and client [source](./.skilld/pkg/README.md:L125:129)

- Set `_with: false` and provide `destructuredLocals` array to run templates safely in strict mode — avoids the `with()` construct which can cause variable leakage and performance issues in modern JavaScript engines [source](./.skilld/pkg/README.md:L109:112)

- Use `rmWhitespace: true` to strip unsafe whitespace in production rendering — enables a safer version of `-%>` line slurping and removes leading/trailing whitespace to reduce output size without breaking semantics [source](./.skilld/pkg/README.md:L115:118)

- Use `ejs.compile(template)` with caching for on-demand rendering, not `ejs.render()` — compilation is the expensive step; cache the function and call it multiple times with different data to amortise compile overhead across requests [source](./.skilld/pkg/README.md:L73:75)
<!-- /skilld:best-practices -->

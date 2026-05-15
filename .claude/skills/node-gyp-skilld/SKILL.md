---
name: node-gyp-skilld
description: 'ALWAYS use when writing code importing "node-gyp". Consult for debugging, best practices, or modifying node-gyp, node gyp.'
metadata:
  version: 12.3.0
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# nodejs/node-gyp `node-gyp@12.3.0`

**Tags:** latest: 12.3.0

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p node-gyp` instead of grepping `.skilld/` directories. Run `skilld search --guide -p node-gyp` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes for node-gyp v12.x — focusing on breaking changes and new APIs that differ from earlier versions.

- BREAKING: `npm_config_python` — removed in v12.2.0, use `--python` flag or `NODE_GYP_FORCE_PYTHON` environment variable instead [source](./.skilld/pkg/CHANGELOG.md:L21:22)

- BREAKING: `url.parse()` / `url.resolve()` — replaced with built-in `URL` API in v12.2.0 and v12.3.0 [source](./.skilld/pkg/CHANGELOG.md:L14:15)

- BREAKING: Node.js engine requirement — v12.0.0+ requires `^20.17.0 || >=22.9.0` (dropped support for Node.js 16.x and earlier in v11.0.0, further restricted in v12.0.0) [source](./.skilld/releases/v12.0.0.md:L12:14)

- NEW: Built-in fetch (undici) — v12.3.0 replaces `make-fetch-happen` dependency with native fetch implementation, affecting download behaviour internally [source](./.skilld/pkg/CHANGELOG.md:L8:9)

- NEW: Visual Studio 2026 (18.x) support — added in v12.1.0 for Windows native addon builds [source](./.skilld/releases/v12.1.0.md:L12:15)

**Also changed:** Built package version in error logs · gyp-next updated to v0.22.1 (v12.3.0), v0.21.1 (v12.2.0), v0.21.0 (v12.0.0) · env-paths bumped to v3.0.0 (v12.0.0) · which bumped to v6.0.0 (v12.0.0) · nopt updated to v9.0.0 (v12.0.0)

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Configure the build before running build commands — the configure step generates platform-specific project files that the build command depends on [source](./.skilld/pkg/README.md:L131:145)

- Store node-gyp options in `package.json` using the `node_gyp_` prefix to centralise configuration and ensure consistency across environments [source](./.skilld/pkg/README.md:L238:248)

- Use platform-specific conditions in `binding.gyp` to handle OS and architecture differences rather than applying all settings to every platform [source](./.skilld/pkg/addon.gypi:L12:18)

- Run `node-gyp rebuild` instead of manually running configure and build separately — it automatically runs clean, configure, and build in sequence [source](./.skilld/pkg/README.md:L198)

- Use the `--jobs max` flag when building to parallelize compilation across all available CPU cores, improving build times significantly [source](./.skilld/pkg/README.md:L210)

- Set `NODE_GYP_FORCE_PYTHON` environment variable when you have multiple Python versions installed and none of the other Python detection methods can be used [source](./.skilld/pkg/README.md:L99:101)

- Use the `--target` flag to compile native addons for a different Node.js version than the one currently running, enabling cross-version compatibility [source](./.silld/pkg/README.md:L211)

- Enable `'win_delay_load_hook': true` in your `binding.gyp` for Windows builds to ensure the addon works regardless of the Node binary name (node.exe, iojs.exe, etc.) [source](./.skilld/pkg/addon.gypi:L68:89)

- Always build for Release mode in production and reserve Debug builds for development and testing [source](./.skilld/pkg/README.md:L155)

- Avoid relying on or including `common.gypi` from the Node.js source tree — use the addon-specific settings from `addon.gypi` instead [source](./.skilld/issues/issue-1118.md:L14:20)

- Be aware that hard links may not persist in containerised environments like Docker on cloud platforms (Google Cloud Run, etc.) — use `--ensure` flag if you encounter missing build artifacts [source](./.skilld/issues/issue-2455.md:L22:24)

- Set `NODE_GYP_FORCE_PYTHON` rather than relying on `PYTHON` or `npm_config_python` when running node-gyp directly outside npm's environment [source](./.skilld/pkg/README.md:L98:102)

- Use case-insensitive configuration keys in `package.json` config — node-gyp v11.4.0+ normalizes keys automatically [source](./.skilld/pkg/CHANGELOG.md:L138:139)

- Keep gyp-next updated regularly alongside node-gyp — newer versions include platform support and bug fixes for emerging compiler and OS versions [source](./.skilld/pkg/CHANGELOG.md:L7:8)
<!-- /skilld:best-practices -->

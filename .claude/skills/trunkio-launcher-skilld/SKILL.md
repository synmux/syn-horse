---
name: trunkio-launcher-skilld
description: "ALWAYS use when writing code importing \"@trunkio/launcher\". Consult for debugging, best practices, or modifying @trunkio/launcher, trunkio/launcher, trunkio launcher."
metadata:
  version: 1.3.4
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-05-15
---

# @trunkio/launcher@1.3.4
**Tags:** latest: 1.3.4

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @trunkio/launcher` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @trunkio/launcher` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

**Note:** `@trunkio/launcher` is a CLI launcher/bootstrapper package, not a library. It does not expose a JavaScript API for programmatic use. The package is invoked as a command-line tool via the `trunk` binary entry point defined in `package.json`.

### About the Launcher

The launcher's purpose is to:
1. Detect the current platform (Linux, macOS, Windows)
2. Download the appropriate Trunk CLI binary for that platform
3. Cache the binary in `~/.cache/trunk`
4. Execute the Trunk CLI with the provided arguments

Since the launcher is solely a bootstrapper, it has no JavaScript API surface to document version changes for. The CLI commands and options are provided by the underlying Trunk CLI tool itself, which is downloaded at runtime based on the pinned version in `.trunk/trunk.yaml`.

### Usage

Install and invoke via npm:

```bash
npm install @trunkio/launcher
npm exec trunk [command] [options]
```

Or as a direct binary (after installation):

```bash
./node_modules/.bin/trunk [command] [options]
```

### Environment Variables

The launcher respects these Node.js and system environment variables:

- `TRUNK_CACHE_DIR` — override the default cache directory (`~/.cache/trunk`)
- `TRUNK_TOKEN` — authentication token for Trunk services
- `TRUNK_HOME` — alternative to `TRUNK_CACHE_DIR` (legacy)
- `NODE_OPTIONS` — passed to Node.js runtime if needed

### Platform Support

- Node.js ≥ 18.0.0 (as specified in `package.json` engines)
- Linux (x64, arm64)
- macOS (x64, arm64)
- Windows (x64)

---

**Source:** Package analysis of @trunkio/launcher v1.3.4 ([`package.json`](./.skilld/pkg-launcher/package.json) · [`README.md`](./.skilld/pkg-launcher/README.md))
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Pin Trunk CLI version in `.trunk/trunk.yaml` rather than relying on auto-detection — ensures reproducible runs across environments and explicit upgrade control [source](./.skilld/docs/index.md#versioning)

- Use the `cli.sha256` field in `.trunk/trunk.yaml` to verify binary integrity across platforms — launcher validates downloads against platform-specific checksums before executing [source](./.skilld/docs/index.md)

- Set `TRUNK_CLI_VERSION` environment variable for temporary version overrides in CI — allows ephemeral testing against specific versions without modifying repository configuration

- Understand launcher caches binaries in `~/.cache/trunk/` and does not re-download if present — clear cache manually if corruption occurs or to force a clean download

- In CI environments, ensure the cache directory `~/.cache/trunk/` is preserved between runs for performance — avoids re-downloading the Trunk binary on every job

- Use `npm exec trunk init` rather than global installation — ensures the installed launcher version matches your project's pinned CLI version and avoids version conflicts

- Run `npm exec trunk upgrade` when updating versions — modifies `.trunk/trunk.yaml` and preserves platform-specific checksums, preventing mismatches across local and CI environments

- Never commit temporary `~/.cache/trunk/` artifacts — launcher manages caching automatically; committing cache pollutes the repository and causes sync issues across machines

- Configure platform-specific checksums (`cli.sha256.darwin_x86_64`, `cli.sha256.darwin_arm64`, `cli.sha256.linux_x86_64`, etc.) when pinning versions — ensures binary validation succeeds on all supported platforms without fallback [source](./.skilld/docs/index.md)

- Handle UserError exceptions separately from system errors in scripts — launcher emits structured UserError when configuration issues occur (e.g., missing version in trunk.yaml), distinct from network or platform errors

- Pass all CLI arguments through unchanged to the Trunk binary via `process.argv.slice(2)` — launcher is transparent; arguments and flags reach Trunk unmodified

- Verify macOS version compatibility (10.15.0 or later) before running on Apple Silicon or Intel systems — launcher checks at startup and exits with clear message if unsupported, preventing cryptic binary failures

- Test launcher functionality on all target platforms (Linux x86_64/arm64, macOS Intel/Apple Silicon, Windows x86_64) when automating binary pinning — platform detection affects which executable is downloaded and cached
<!-- /skilld:best-practices -->

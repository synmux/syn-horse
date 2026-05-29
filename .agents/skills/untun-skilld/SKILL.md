---
name: untun-skilld
description: "ALWAYS use when writing code importing \"untun\". Consult for debugging, best practices, or modifying untun."
metadata:
  version: 0.1.3
  generated_by: Google · Gemini 2.5 Flash
  generated_at: 2026-05-29
---

# unjs/untun `untun@0.1.3`
**Tags:** latest: 0.1.3

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Issues](./.skilld/issues/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p untun` instead of grepping `.skilld/` directories. Run `skilld search --guide -p untun` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

- NEW: `acceptCloudflareNotice` in `TunnelOptions` — new boolean option to accept Cloudflare notice, added in v0.1.3 [source](./.skilld/pkg/dist/index.d.ts:L3)
- NEW: CLI `bin` field — enables direct execution of `untun` command via CLI, added in v0.1.1 [source](./.skilld/releases/v0.1.1.md#fixes)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Prefer `http2` protocol for `cloudflared` to ensure more reliable connections, especially when the default `quic` protocol shows instability. [source](./.skilld/issues/issue-38.md:L18)

- Ensure the `url` for the tunnel is correctly constructed, as previous versions had issues with URL construction, which was addressed in a fix. [source](./.skilld/releases/CHANGELOG.md:L10)

- Explicitly set the `protocol` ("http" or "https") in `TunnelOptions` to ensure predictable tunnel behavior and avoid reliance on implicit defaults. [source](./.skilld/pkg/./dist/index.d.ts:L4)

- Enable `verifyTLS` for production security to prevent man-in-the-middle attacks, reserving `false` for specific debugging or development scenarios only. [source](./.skilld/pkg/./dist/index.d.ts:L5)

- Programmatically `acceptCloudflareNotice` when required by explicitly setting `acceptCloudflareNotice: true` in `TunnelOptions` to prevent tunnel blocking, while understanding its implications. [source](./.skilld/pkg/./dist/index.d.ts:L6)

- Always call `close()` on the returned `Tunnel` object when it's no longer needed to free up resources and prevent lingering connections, ensuring proper lifecycle management. [source](./.skilld/pkg/./dist/index.d.ts:L11)

- Rigorously check `startTunnel` return for `undefined` before attempting to use the `Tunnel` object, as the API explicitly indicates this possibility. [source](./.skilld/pkg/./dist/index.d.ts:L13)

- Be mindful of the `port` type; explicitly use `number` for numeric ports in `TunnelOptions` to avoid potential type coercion issues if the underlying `cloudflared` expects a numeric type. [source](./.skilld/pkg/./dist/index.d.ts:L3)

- Utilize `hostname` for explicit routing by setting it in `TunnelOptions` for clear and controlled traffic direction, especially in environments with multiple services or subdomains. [source](./.skilld/pkg/./dist/index.d.ts:L4)

- Dynamically retrieve the public tunnel URL using `getURL()` after a tunnel is successfully started, ensuring your application always uses the correct and current tunnel endpoint. [source](./.skilld/pkg/./dist/index.d.ts:L10)

- Keep `untun` dependencies updated to benefit from bug fixes, performance improvements, and security patches, as evidenced by routine dependency updates in releases. [source](./.skilld/releases/CHANGELOG.md:L14)

- Avoid reliance on accidental logs for debugging or operational purposes, as they are not part of the stable API and can be removed in subsequent versions. [source](./.skilld/releases/CHANGELOG.md:L25)

- Ensure `cloudflared` CLI is installed and accessible in the system's PATH or at a location `untun` can find it, to prevent tunnel initialization failures. [source](./.skilld/issues/issue-9.md:L1-L10)
<!-- /skilld:best-practices -->

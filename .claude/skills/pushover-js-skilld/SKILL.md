---
name: pushover-js-skilld
description: 'Library to send notifications with Pushover. ALWAYS use when writing code importing "pushover-js". Consult for debugging, best practices, or modifying pushover-js, pushover js.'
metadata:
  version: 1.3.2
  generated_by: cached
  generated_at: 2026-05-27
---

# danitetus/pushover-js `pushover-js@1.3.2`

**Tags:** latest: 1.3.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p pushover-js` instead of grepping `.skilld/` directories. Run `skilld search --guide -p pushover-js` for full syntax, filters, and operators.

<!-- skilld:api-changes -->

## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- BREAKING: Promise-based API — v1.x completely rewrote the library from callback-based to promise-based, all v0.x methods no longer work [source](./.skilld/pkg/README.md:L9:15)

- NEW: `setAttachment(name, filePath)` — added in v1.3.0, enables file attachment to notifications [source](./.skilld/pkg/CHANGELOG.md:L7:9)

- NEW: `setHtml()` — added in v1.2.0, marks message content as HTML-compliant [source](./.skilld/pkg/CHANGELOG.md:L11:13)

- NEW: `setTimestamp(timestamp)` — added in v1.1.1, allows custom unix timestamp for notification creation time [source](./.skilld/pkg/CHANGELOG.md:L15:17)

- FIXED: Promise resolution bug — v1.1.1 fixed successful requests not resolving promise and returning response object [source](./.skilld/pkg/CHANGELOG.md:L19:20)

**Also changed:** `Pushover` constructor expects `(user, token)` positional args · `send(title?, message?)` returns Promise<IResponse> · method chaining supported on all `set*()` methods

<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->

## Best Practices

- Use async/await with Pushover's promise-based API — preferred over .then/.catch chains for readability and error handling in modern applications [source](./.skilld/pkg/README.md#usage)

- Leverage method chaining to build notifications fluently — each setter returns the Pushover instance, reducing intermediate variable assignments [source](./.skilld/pkg/lib/pushover.js:L25-73)

- Pass title and message to `send()` when appropriate — allows overriding previously set values without creating a new instance [source](./.skilld/pkg/lib/pushover.js:L75-87)

- Always provide Unix timestamp in **seconds** when using `setTimestamp()` — convert JavaScript's milliseconds-based timestamps by dividing by 1000 to avoid silent timing errors [source](./.skilld/pkg/README.md:L61-62)

- Respect priority level constraints: for priority 2, always supply both `expire` and `retry` parameters or let them default to 10800 and 3600 seconds [source](./.skilld/pkg/lib/pushover.js:L52-62)

- Reuse a single Pushover instance for multiple notifications with different content — constructor accepts user and token once, allowing efficient sequential messaging [source](./.skilld/pkg/lib/pushover.js:L9-23)

- Validate priority values before setting — library logs an error but continues on invalid priority (-3 or 3), preventing silent failures by checking range yourself [source](./.skilld/pkg/lib/pushover.js:L53-55)

- Rely on automatic MIME type detection for attachments — library detects jpg, jpeg, png, gif, mp3, and mp4 files, defaulting to application/octet-stream for unknown types [source](./.skilld/pkg/lib/request.js:L34-50)

- Use `setUrl()` with an optional title for user-friendly click behavior — the title parameter becomes the display text, improving notification context [source](./.skilld/pkg/README.md:L59)

- Enable HTML formatting with `setHtml()` when using HTML markup in messages — required for proper rendering of HTML content in notifications [source](./.skilld/pkg/README.md:L65)

- Handle ResponseError exceptions separately — the library throws with both message and statusCode properties, enabling status-specific error recovery [source](./.skilld/pkg/lib/request.js:L24-29)

- Set device targets early in the chain to scope notifications — `setDevice()` allows restricting notifications to specific Pushover devices [source](./.skilld/pkg/lib/pushover.js:L25-27)

- Default sound value 'pushover' is suitable for most cases — only override with `setSound()` when alert tone customization is required [source](./.skilld/pkg/lib/pushover.js:L17)
<!-- /skilld:best-practices -->

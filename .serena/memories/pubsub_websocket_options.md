# WebSocket / pub-sub options for the signage device (`PUBSUB.md`)

Decision document `PUBSUB.md` (repo root, written 2026-07-02) evaluates how a digital signage device can receive update events from syn.horse over WebSockets. **No code written; decision pending Dave's review** (tracked in `TODO.md` under features).

Key verified facts (current as of 2026-07-02, from Cloudflare docs + nitropack 2.13 source):

- Plain stateless Workers can terminate WebSockets but cannot broadcast across connections — every real option is a **Durable Object** underneath. Hibernation API (`ctx.acceptWebSocket`) = sockets stay open while the DO sleeps, no duration billing, runtime auto-answers pings.
- **Nitro 2.13 integrated route:** `nitro.experimental.websocket = true` + swap preset `cloudflare_module` → `cloudflare_durable`. The durable preset extends module (HTTP unchanged), exports a `$DurableObject` class wired to crossws's cloudflare-durable adapter; all WS upgrades converge on one instance (binding `$DurableObject`, instance name `server`, both hard-coded). Nitro does **NOT** auto-add the DO binding/migration to the generated wrangler config — the protected `nitro.cloudflare.wrangler` block would need `durable_objects` + `migrations` (`new_sqlite_classes: ["$DurableObject"]`) added manually. crossws caveat: publishes into a hibernated DO may miss sockets (in-memory peer map).
- **Deploys disconnect all WebSockets** (DO restart). With the integrated option every site deploy drops signage connections; with a separate worker only its own (rare) deploys do. Major argument for separation.
- **Recommended: option 1** — dedicated realtime Worker + hand-written hibernating DO on `wss://ws.syn.horse` (mirrors the syn-horse-notifications pattern), publish via authenticated HTTP POST from the Nuxt server / curl / CI. Pattern: **notify-then-fetch** (WS event = doorbell; device GETs `/api/signage/state` with ETag; polling = fallback transport).
- Cloudflare's former **Pub/Sub product (MQTT, closed beta)** is gone from the docs — dead; not an option despite the doc's name.
- Agents SDK = separate-worker DO framework with state sync; overkill now, upgrade path if signage state grows rich.
- Cost at signage scale ≈ nil (hibernation + 20:1 WS message billing ratio; DOs even on free plan since 2025-04).

If implementation proceeds: build `/api/signage/state` + ETag first (serves polling immediately and the fetch path of every other option).

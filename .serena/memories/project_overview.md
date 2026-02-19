# syn-horse — Project Overview

## Purpose

**syn.horse** is a web application deployed to Cloudflare Workers. It is a personal/creative project by Dave Williams (dave@dave.io) hosted at `syn.horse` and `www.syn.horse`. The app description is "NEIGH" — a playful/creative site with email capability via `ponygirl@syn.horse`.

## Tech Stack

- **Framework:** Nuxt.js 4.3.1 (Vue 3 meta-framework)
- **Language:** TypeScript (strict, ES modules)
- **Runtime:** Node.js 24.13.1, Package Manager: Bun 1.3.9
- **CSS:** Tailwind CSS v4.2.0 with `@tailwindcss/vite` plugin
- **UI Components:** Shadcn-Vue 2.4.3 (New York style, zinc base, Lucide icons)
- **Deployment:** Cloudflare Workers via Wrangler 4.66.0 (Nitro preset: `cloudflare_module`)
- **3D Graphics:** Three.js 0.183.0

## Cloudflare Bindings

- `AI` — Cloudflare Workers AI (remote)
- `BROWSER` — Browser Rendering (remote)
- `IMAGES` — Image processing (remote)
- `MEDIA` — Media processing (remote)
- `EMAIL` — SendEmail for `ponygirl@syn.horse` (remote)
- `ASSETS` — Static assets from `.output/public/`
- `CF_VERSION_METADATA` — Worker version metadata
- `ADMIN_TOKEN` — Secret environment variable
- `CLOUDFLARE_ACCOUNT_ID` — Account ID variable

## Current State

- Frontend-only: just `app.vue` with NuxtWelcome component
- No server routes, API endpoints, or database yet
- Strong infrastructure in place (CI/CD, linting, deployment scripts)
- Ready for feature development

## Domain

- Production: `syn.horse`, `www.syn.horse`
- Account ID: `def50674a738cee409235f71819973cf`

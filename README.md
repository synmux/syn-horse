# syn.horse

A creative web application built with Nuxt 4, Vue 3, and TypeScript, deployed to Cloudflare Workers.

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) with [Vue 3](https://vuejs.org/)
- **Language:** TypeScript (strict)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLch colour theming
- **Components:** [Shadcn-Vue](https://www.shadcn-vue.com/) (New York style)
- **Icons:** [Lucide](https://lucide.dev/)
- **3D:** [Three.js](https://threejs.org/)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Package Manager:** [Bun](https://bun.sh/)

## Prerequisites

- [Bun](https://bun.sh/) 1.3.9+
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 4.x (installed as dev dependency)
- A Cloudflare account (for deployment)

## Setup

```bash
bun install
```

This runs the full postinstall chain: Trunk.io setup, Nuxt preparation, type generation, and formatting.

## Development

```bash
bun run dev
```

Starts the Nuxt development server on `http://localhost:3000` with hot module replacement.

To preview the production build locally with Wrangler (simulating the Cloudflare Workers environment):

```bash
bun run preview
```

## Linting & Formatting

```bash
bun run lint          # ESLint + Trunk.io + TypeScript type checking
bun run lint:fix      # Auto-fix lint issues
bun run format        # Prettier + Trunk.io formatting
```

## Testing

```bash
bun run test          # Unit tests with Vitest
bun run test:e2e      # End-to-end tests with Playwright
```

## Deployment

```bash
bun run deploy              # Production deploy to syn.horse
bun run deploy:nonprod      # Upload a new version (staging)
```

Deployment targets the custom domains `syn.horse` and `www.syn.horse` via Cloudflare Workers.

## Cloudflare Platform Bindings

The application has access to the following Cloudflare services:

| Service           | Binding   | Description                           |
| ----------------- | --------- | ------------------------------------- |
| Workers AI        | `AI`      | LLM inference and AI models           |
| Browser Rendering | `BROWSER` | Headless browser automation           |
| Images            | `IMAGES`  | Image transformation and optimisation |
| Media             | `MEDIA`   | Media processing                      |
| Email             | `EMAIL`   | Send email from `ponygirl@syn.horse`  |
| Assets            | `ASSETS`  | Static file serving                   |

## Project Structure

```plaintext
app/                     # Nuxt application source
  app.vue                # Root Vue component
  assets/css/            # Tailwind CSS theme configuration
  components/ui/         # Shadcn-Vue UI components
  lib/                   # Shared utilities
  plugins/               # Nuxt plugins
public/                  # Static assets (images, favicons, manifest)
server/                  # Nitro server routes and API endpoints
```

## Licence

Private project by [Dave Williams](https://github.com/daveio).

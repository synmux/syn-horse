# Conventions

Full list is in CLAUDE.md (always in context). These are the load-bearing, project-specific invariants worth not rediscovering.

- **No React.** Vue 3 `<script setup lang="ts">` for every component.
- **Naming:** no single-letter or meaningless identifiers anywhere, including loop vars.
- **Component auto-import is path-prefixed:** `app/components/layout/StatusBar.vue` → `<LayoutStatusBar/>`; top-level `app/components/NotFound.vue` → `<NotFound/>`.
- **Navigation:** `<NuxtLink>` for links (renders `<a>`); `navigateTo()` for programmatic; `<button>` only for non-navigational actions.
- **Copy:** lowercase prose everywhere (headings, eyebrows, body); uppercase reserved for errors/stamps. British English in comments + authored copy.
- **Styling:** Tailwind utilities; extract repeated patterns into named classes in `@layer components` of `app/assets/css/main.css` (`.tg` + modifiers, `.btn-syn`, `.page-shell`, `.console`, `.eyebrow`, …). Use `synhorse` theme tokens (`bg-void`, `text-paper`, `text-hot`/`cool`/`lilac`, `font-display`/`sans`/`mono`), not raw values. Avoid scoped styles and inline `:style` bindings — `security.sri` is on; bind a class and put the dynamic value in CSS. Tag variant classes are flat (`.tg.hot/.cool/.warn/.lilac/.solid/.on`) — extend, don't invent.
- **CSS keyframes are global** — duplicate names collide silently; keep all keyframes near the top of main.css.
- **Reduced motion:** loud animations are muted in a `@media (prefers-reduced-motion: reduce)` block at the bottom of main.css — keep new decorative animations in scope of it.
- **Server routes (Nitro file routing):** e.g. `panic.post.ts` → `POST /api/panic`. Validate bodies with zod `safeParse`. `verifyTurnstileToken()` is **auto-imported** by @nuxtjs/turnstile — do NOT import from `#turnstile` (breaks the Nitro build). DB via `useDb(event)`; IDs via global `crypto.randomUUID()`. `/api/**` route rules already attach CORS + no-cache + nosniff.
- **Schema-driven enums:** declare the value set once as `text({ enum: [...] })` on the Drizzle column; derive TS via `$inferSelect` and Zod via `.enumValues`. Never duplicate the literal union.
- **Commits:** Conventional Commits + GitMoji, multiline with full detail; commit per feature/fix/refactor.
- **Deferrals:** append `- [ ]` items to `TODO.md` (imperative, lowercase, grouped).

**Do-not-modify zones:** `_design/`, `_DSOY/`, `_DIO/`, the `nitro.cloudflare.wrangler` block in `nuxt.config.ts`, generated `worker-configuration.d.ts`, easter-egg files under `public/{sudo,git,gpg,ssh}`, and `.github/` + trunk toolchain (unless explicitly asked).

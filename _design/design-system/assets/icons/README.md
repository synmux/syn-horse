# icons

mixed system. **pick by context.**

## pixel sprites (custom)

`pixel-sprites.svg` — inline SVG spritesheet, 16×16 each. use for brand-adjacent decoration, status indicators, terminal prompts.

```html
<svg width="16" height="16"><use href="/assets/icons/pixel-sprites.svg#px-horse" /></svg>
```

available symbols:

- `px-horse` — brand mark
- `px-diamond` — synth/status indicator
- `px-prompt` — terminal `>` prompt
- `px-spin-1` — loading spinner frame
- `px-skull` — error states
- `px-heart` — likes
- `px-save` — floppy / save
- `px-power` — power / quit

render at 16, 32, or 48px **only** (integer multiples). other sizes look like garbage.

## line icons (lucide via cdn)

for ui chrome (sidebars, buttons, menus). loaded via:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>
  lucide.createIcons()
</script>
<i data-lucide="search"></i>
```

stroke 1.5px. sizes 16/20/24.

_substitution flagged: lucide is a substitute since no custom icon set was provided. closest free match to "modern but weird"._

## unicode glyphs (use directly)

`◆ ▶ ▼ ▲ ◯ ✶ ※ ▓ ▒ ░ ■ │ ─ ┌ ┐ └ ┘ ╳ ←  → ↑ ↓ ⌘ ⌥ ⌃ ⇧`

color them `--lilac` or `--cool`, never `--fg-1`.

## emoji

**banned.** see `README.md` content fundamentals.

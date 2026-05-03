# fonts

self-hosted, loaded via `@font-face` at the top of `../colors_and_type.css`.

| family             | files                                                                               | weights           | license |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------- | ------- |
| **VT323**          | `VT323-Regular.ttf`                                                                 | 400               | SIL OFL |
| **Inter**          | `Inter-VariableFont_opsz_wght.ttf`, `Inter-Italic-VariableFont_opsz_wght.ttf`       | 100–900 + italics | SIL OFL |
| **JetBrains Mono** | `JetBrainsMono-VariableFont_wght.ttf`, `JetBrainsMono-Italic-VariableFont_wght.ttf` | 100–900 + italics | SIL OFL |

## roles

- **VT323** → display (h1/h2/h3, marquees, terminal banners). pixel/bitmap, single weight.
- **Inter** → body. variable axis lets us hit 400 / 500 / 600 / 700 from one file.
- **JetBrains Mono** → code, mono labels, eyebrows, status bars, command palettes.

## paths

`@font-face` rules try three relative paths so the same stylesheet works whether it's loaded from project root, `/ui_kits/<kit>/`, or `/preview/<card>/`. if you nest deeper, add a `<link rel="preload" href="...">` in your `<head>` or override `@font-face` locally.

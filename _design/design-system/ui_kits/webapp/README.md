# syn.horse — webapp UI kit

a 6-screen click-thru of the syn.horse dashboard. open `index.html`.

screens (cycle via top tabs or `[` `]`):

1. **dashboard** — your synths, stats, marquee
2. **synth detail** — view + edit a single synth
3. **composer** — make a new synth
4. **command palette** — `⌘K` overlay
5. **settings** — account + danger zone
6. **404** — empty/error state

components live as separate `.jsx` files. all share a `<Shell>` (status bar + side rail + marquee).

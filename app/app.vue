<script setup lang="ts">
useSeoMeta({
  title: "syn",
  description: "syn.horse — a small corner of the internet",
  ogTitle: "syn",
  ogDescription: "syn.horse — a small corner of the internet",
  themeColor: "#0a0a0a",
})

// Horse head ASCII art by Tua Xiong, sourced from ascii-art.de/ascii/ghi/horse.txt
const horse = [
  "           {)",
  "        c==//\\",
  "   _-~~/-._|_|",
  "  /'_,/,   //'~~~\\;;,",
  "  `~  _( _||_..\\ | ';;",
  "    /'~|/ ~' `\\<\\>  ;",
  "    \"  |      /  |",
  "       \"      \"  \"",
].join("\n")
</script>

<template>
  <div class="page">
    <NuxtRouteAnnouncer />
    <main class="stage">
      <div class="horse-frame">
        <pre class="horse" role="img" aria-label="ASCII horse head spinning"><span aria-hidden="true">{{ horse }}</span></pre>
      </div>
      <h1 class="brand">syn</h1>
      <p class="tag">syn.horse</p>
    </main>
    <footer class="foot">
      <span>ascii horse head — tua xiong</span>
    </footer>
  </div>
</template>

<style scoped>
.page {
  background: #0a0a0a;
  color: var(--color-text);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.page::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 45%,
      rgba(191, 255, 0, 0.08),
      transparent 60%
    ),
    repeating-linear-gradient(
      0deg,
      rgba(191, 255, 0, 0.025) 0px,
      rgba(191, 255, 0, 0.025) 1px,
      transparent 1px,
      transparent 3px
    );
  pointer-events: none;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem;
  z-index: 1;
}

.horse-frame {
  width: clamp(14rem, 32vw, 22rem);
  height: clamp(14rem, 32vw, 22rem);
  display: grid;
  place-items: center;
}

.horse {
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(0.7rem, 1.6vw, 1.05rem);
  line-height: 1.05;
  color: var(--color-lime);
  text-shadow:
    0 0 6px rgba(191, 255, 0, 0.55),
    0 0 18px rgba(191, 255, 0, 0.25);
  margin: 0;
  animation: spin 9s linear infinite;
  transform-origin: 50% 50%;
  white-space: pre;
  user-select: none;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .horse {
    animation: none;
  }
}

.brand {
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(3rem, 9vw, 6rem);
  color: var(--color-lime);
  letter-spacing: 0.08em;
  margin: 0;
  text-shadow:
    0 0 12px rgba(191, 255, 0, 0.45),
    0 0 32px rgba(191, 255, 0, 0.2);
}

.tag {
  font-family: var(--font-subtitle), system-ui, sans-serif;
  font-size: 0.95rem;
  color: var(--color-lime-dim);
  letter-spacing: 0.4em;
  text-transform: lowercase;
  margin: -1.25rem 0 0;
}

.foot {
  position: absolute;
  bottom: 1rem;
  font-family: var(--font-mono), monospace;
  font-size: 0.7rem;
  color: rgba(191, 255, 0, 0.35);
  letter-spacing: 0.2em;
  z-index: 1;
}
</style>

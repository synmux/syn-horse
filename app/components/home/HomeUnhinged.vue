<script setup lang="ts">
import { SITE } from "~/data/site"

const ascii = [
  "   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄",
  "   █                       █",
  "   █   ◆ syn.horse v0.3   █",
  "   █     not for sale     █",
  "   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀"
].join("\n")

const stamps = [
  { k: "◆ name", v: "syn", colour: "" },
  { k: "▶ pronouns", v: "they / them", colour: "" },
  { k: "※ role", v: "devops", colour: "text-hot" },
  { k: "▓ locale", v: "en_GB", colour: "text-cool" },
  { k: "◯ posts", v: "17", colour: "" },
  { k: "✶ projects", v: "8", colour: "text-hot" },
  { k: "◆ domains", v: "5", colour: "text-cool" },
  { k: "▒ newsletter", v: "no", colour: "" },
  { k: "░ analytics", v: "no", colour: "" }
] as const
</script>

<template>
  <div class="relative mx-auto max-w-[1080px] px-8 pt-14 pb-0">
    <div class="eyebrow">▶ /home · uptime since 2014 · last reboot: complaint-driven</div>
    <h1 class="font-display text-[196px] leading-[0.92] tracking-[-0.01em] text-paper">
      <span
        class="block translate-x-[-4px] translate-y-[-8px] text-transparent [-webkit-text-stroke:1.5px_var(--color-paper-3)]"
        >syn.horse</span
      >
      <span class="block text-hot [-webkit-text-stroke:0]">syn.horse</span>
    </h1>
    <pre class="mt-3 font-mono text-[10px] leading-[1.05] whitespace-pre opacity-80 text-lilac">{{ ascii }}</pre>
    <div class="mt-8 grid grid-cols-3 gap-0 border border-void-4">
      <div v-for="(s, i) in stamps" :key="i" class="border-r border-b border-void-4 p-4.5 nth-[3n]:border-r-0">
        <div class="font-mono text-[9px] tracking-[0.14em] uppercase text-paper-3">{{ s.k }}</div>
        <div :class="['pt-1 font-display text-[32px] leading-[1.05]', s.colour || 'text-paper']">{{ s.v }}</div>
      </div>
    </div>
    <div class="mt-8 border-t border-void-4 py-5 font-display text-[56px] leading-none text-paper">
      currently <span class="text-hot">{{ SITE.status }}</span
      >.
    </div>
    <div class="mt-6 console !text-[12px]">
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> whoami</div>
      <div class="mu">→ a devops engineer who keeps building blogs instead of sleeping</div>
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> cat /etc/motd</div>
      <div class="mu">→ welcome. read nothing. press buttons.</div>
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> ls -la /things</div>
      <div class="mu">drwx— <span class="ok">blog/</span> 17 posts · last touched 2025-09-20</div>
      <div class="mu">drwx— <span class="ok">projects/</span> 8 items · 6 alive</div>
      <div class="mu">drwx— <span class="ok">cv/</span> 4 roles · 5 talks · 4 side things</div>
      <div class="mu">drwx— <span class="ok">domains/</span> 5 of them. don't ask.</div>
      <div>
        <span class="pr">syn@horse</span> <span class="mu">~/$</span>
        <span class="text-paper">_</span>
      </div>
    </div>
    <div class="mt-8 grid grid-cols-3 gap-3.5">
      <NuxtLink to="/blog" class="home-card fx-glitch">
        <div class="home-card-head">cat /blog</div>
        <h3 class="home-card-title">read the words</h3>
        <p class="home-card-body">17 posts. one of them is 24k characters about fish.</p>
        <span class="home-card-arrow">→ /blog</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="home-card fx-glitch">
        <div class="home-card-head">cat /cv</div>
        <h3 class="home-card-title">look at the cv</h3>
        <p class="home-card-body">i did the things. they are listed in chronological order.</p>
        <span class="home-card-arrow">→ /cv</span>
      </NuxtLink>
      <NuxtLink to="/contact" class="home-card fx-glitch">
        <div class="home-card-head">echo hi</div>
        <h3 class="home-card-title">say something</h3>
        <p class="home-card-body">i will respond. eventually. probably. tone is everything.</p>
        <span class="home-card-arrow">→ /contact</span>
      </NuxtLink>
    </div>
    <div
      class="mt-12 flex flex-wrap justify-between gap-2 border-t border-void-4 pt-3.5 pb-16 font-mono text-[11px] tracking-[0.04em] text-paper-3"
    >
      <span>◆ syn · 2026 · this site is held together with vibes and a cloudflare worker</span>
      <span>you got here. you're reading. that's the contract.</span>
    </div>
  </div>
</template>

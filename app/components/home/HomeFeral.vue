<script setup lang="ts">
import { computed } from "vue"
import { SITE } from "~/data/site"

const today = computed(() => new Date().toISOString().slice(0, 10))

const marqueeItems = [
  "currently shouting at git",
  "◆ syn.horse v0.3.1",
  "last build 3h ago",
  "◆ 17 posts",
  "8 projects",
  "◆ 5 domains",
  "on-call free since 2023",
  "◆ no newsletter",
  "no analytics",
  "◆ NO WE",
  "do not subscribe",
  "◆ ask me about meshtastic"
] as const
</script>

<template>
  <div class="container home feral">
    <div class="eyebrow">▶ syn · they/them · last seen: {{ today }}</div>
    <h1>
      <span class="l1">devops</span>
      <span class="l2">engineer.</span>
      <span class="l3">general-purpose nerd.</span>
    </h1>
    <div class="glitch-band">
      <div class="marquee-track">
        <span v-for="(t, i) in marqueeItems" :key="`a-${i}`" :class="i % 3 === 0 ? 'hl' : ''">
          {{ t }}
        </span>
        <span v-for="(t, i) in marqueeItems" :key="`b-${i}`" :class="i % 3 === 0 ? 'hl' : ''">
          {{ t }}
        </span>
      </div>
    </div>
    <p class="sub" style="margin-top: 32px">
      terraform, nomad, cloudflare. a homelab. a meshtastic node on a ridge in wales.
      <b>currently shouting at git.</b>
    </p>
    <div class="grid three" style="margin-top: 36px">
      <NuxtLink to="/now" class="card fx-glitch">
        <div class="h">▶ /now</div>
        <h3>this month</h3>
        <p>{{ SITE.status }}.</p>
        <span class="arrow">read /now →</span>
      </NuxtLink>
      <NuxtLink to="/blog" class="card fx-glitch">
        <div class="h">▶ /blog</div>
        <h3>17 posts</h3>
        <p>shell tools, meshtastic, eeg, ms, sdam. unedited.</p>
        <span class="arrow">read posts →</span>
      </NuxtLink>
      <NuxtLink to="/projects" class="card fx-glitch">
        <div class="h">▶ /projects</div>
        <h3>8 things</h3>
        <p>some alive, some retired, one asks about ducks.</p>
        <span class="arrow">see projects →</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="card fx-glitch">
        <div class="h">▶ /cv</div>
        <h3>cv. (lol.)</h3>
        <p>10+ years. devops, sre, sysadmin. terse.</p>
        <span class="arrow">read cv →</span>
      </NuxtLink>
      <NuxtLink to="/domains" class="card fx-glitch">
        <div class="h">▶ /domains</div>
        <h3>5 domains</h3>
        <p>syn.horse, syn.as, syn.haus, syn.pink, dcw.soy.</p>
        <span class="arrow">see all →</span>
      </NuxtLink>
      <NuxtLink to="/contact" class="card fx-glitch">
        <div class="h">▶ /contact</div>
        <h3>say hi</h3>
        <p>email + signal. dms are on, mostly.</p>
        <span class="arrow">contact →</span>
      </NuxtLink>
    </div>
    <div class="footer-note" style="margin-top: 48px">
      <span>◆ syn · 2026 · built in the void</span>
      <span> press <kbd style="color: var(--cool)">/</kbd> for command palette · ↑↑↓↓ for a surprise </span>
    </div>
  </div>
</template>

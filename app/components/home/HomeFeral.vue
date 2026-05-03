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
  <div class="relative mx-auto max-w-[920px] px-8 pt-14 pb-20">
    <div class="eyebrow">▶ syn · they/them · last seen: {{ today }}</div>
    <h1 class="font-display text-[168px] leading-[0.98] text-paper">
      <span class="block translate-x-[-3px]">devops</span>
      <span class="block translate-x-[8px] text-hot">engineer.</span>
      <span class="block translate-x-[-2px] tracking-[-0.02em]">general-purpose nerd.</span>
    </h1>
    <div
      class="mt-5 flex gap-6 overflow-hidden border-y border-void-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase whitespace-nowrap text-paper-3"
    >
      <div class="inline-flex shrink-0 gap-8 animate-marquee">
        <span v-for="(t, i) in marqueeItems" :key="`a-${i}`" :class="i % 3 === 0 ? 'text-hot' : ''">
          {{ t }}
        </span>
        <span v-for="(t, i) in marqueeItems" :key="`b-${i}`" :class="i % 3 === 0 ? 'text-hot' : ''">
          {{ t }}
        </span>
      </div>
    </div>
    <p class="mt-8 max-w-[620px] text-[19px] leading-[1.55] text-paper-2">
      terraform, nomad, cloudflare. a homelab. a meshtastic node on a ridge in wales.
      <b class="font-semibold text-paper">currently shouting at git.</b>
    </p>
    <div class="mt-9 grid grid-cols-3 gap-3.5">
      <NuxtLink to="/now" class="home-card fx-glitch">
        <div class="home-card-head">▶ /now</div>
        <h3 class="home-card-title">this month</h3>
        <p class="home-card-body">{{ SITE.status }}.</p>
        <span class="home-card-arrow">read /now →</span>
      </NuxtLink>
      <NuxtLink to="/blog" class="home-card fx-glitch">
        <div class="home-card-head">▶ /blog</div>
        <h3 class="home-card-title">17 posts</h3>
        <p class="home-card-body">shell tools, meshtastic, eeg, ms, sdam. unedited.</p>
        <span class="home-card-arrow">read posts →</span>
      </NuxtLink>
      <NuxtLink to="/projects" class="home-card fx-glitch">
        <div class="home-card-head">▶ /projects</div>
        <h3 class="home-card-title">8 things</h3>
        <p class="home-card-body">some alive, some retired, one asks about ducks.</p>
        <span class="home-card-arrow">see projects →</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="home-card fx-glitch">
        <div class="home-card-head">▶ /cv</div>
        <h3 class="home-card-title">cv. (lol.)</h3>
        <p class="home-card-body">10+ years. devops, sre, sysadmin. terse.</p>
        <span class="home-card-arrow">read cv →</span>
      </NuxtLink>
      <NuxtLink to="/domains" class="home-card fx-glitch">
        <div class="home-card-head">▶ /domains</div>
        <h3 class="home-card-title">5 domains</h3>
        <p class="home-card-body">syn.horse, syn.as, syn.haus, syn.pink, dcw.soy.</p>
        <span class="home-card-arrow">see all →</span>
      </NuxtLink>
      <NuxtLink to="/contact" class="home-card fx-glitch">
        <div class="home-card-head">▶ /contact</div>
        <h3 class="home-card-title">say hi</h3>
        <p class="home-card-body">email + signal. dms are on, mostly.</p>
        <span class="home-card-arrow">contact →</span>
      </NuxtLink>
    </div>
    <div class="footer-note mt-12">
      <span>◆ syn · 2026 · built in the void</span>
      <span>press <kbd class="text-cool">/</kbd> for command palette · ↑↑↓↓ for a surprise</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DOMAINS, type DomainCls } from "~/data/domains"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `domains · ${SITE.name}`,
  description: "the syn.* family."
})

const TLD_COLOUR: Record<DomainCls, string> = {
  "": "text-hot",
  alt: "text-cool",
  alt2: "text-lilac",
  alt3: "text-pop"
}
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /domains · the syn.* family · {{ DOMAINS.length }} of them</div>
    <h1 class="page-h1">domains<span class="dot">.</span></h1>
    <p class="lede">
      i collect tlds the way other people collect houseplants. one is the main site. the rest redirect, park, or quietly
      ask a question about ducks.
    </p>
    <div class="mt-9 grid grid-cols-1 gap-0 border-t border-void-4">
      <div
        v-for="d in DOMAINS"
        :key="d.tld"
        class="grid grid-cols-[1fr_2fr_auto] items-center gap-6 border-b border-void-4 py-5.5"
      >
        <div class="font-display text-[56px] leading-none text-paper">
          {{ d.base }}<span class="text-paper-3">.</span><span :class="TLD_COLOUR[d.cls]">{{ d.tld }}</span>
        </div>
        <div class="max-w-[520px] font-sans text-[14px] leading-[1.55] text-paper-2">{{ d.desc }}</div>
        <div class="text-right font-mono text-[11px] tracking-[0.12em] uppercase text-paper-3">
          <span v-if="d.status === 'ok'" class="text-ok">● {{ d.statusText }}</span>
          <span v-else-if="d.status === 'warn'" class="text-pop">● {{ d.statusText }}</span>
          <span v-else-if="d.status === 'park'" class="text-paper-3">○ {{ d.statusText }}</span>
        </div>
      </div>
    </div>
    <div class="footer-note mt-12">
      <span>◆ all served by one cloudflare worker</span>
      <span>renewal calendar lives in fastmail · pray for me</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SOCIAL } from "~/data/social"
import { IM } from "~/data/im"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `contact · ${SITE.name}`,
  description: "email, signal, and a few obligated others."
})
</script>

<template>
  <div class="relative mx-auto max-w-[920px] px-8 pt-14 pb-20">
    <div class="eyebrow">▶ /contact · email is open · dms are mostly</div>
    <h1 class="page-h1">say hi<span class="dot">.</span></h1>
    <p class="lede">
      email works. signal works. the rest are listed because i feel obligated. tone is everything: lead with what you
      want, not pleasantries.
    </p>
    <div class="mt-10 grid grid-cols-2 gap-5">
      <div>
        <h2 class="mb-3.5 border-b border-void-4 pb-1.5 font-display text-[36px] text-paper">the open ones</h2>
        <div class="grid gap-0">
          <a
            v-for="s in SOCIAL"
            :key="s.k"
            class="fx-glitch grid grid-cols-[110px_1fr_auto] items-baseline gap-3.5 border-b border-void-4 py-3 transition-colors duration-[80ms] hover:text-hot"
            :href="s.href"
            target="_blank"
            rel="noopener"
          >
            <span class="font-mono text-[11px] tracking-[0.12em] uppercase text-paper-3">{{ s.k }}</span>
            <span class="font-mono text-[13px] text-paper">{{ s.v }}</span>
            <span class="font-mono text-[11px] text-cool">↗</span>
          </a>
        </div>
      </div>
      <div>
        <h2 class="mb-3.5 border-b border-void-4 pb-1.5 font-display text-[36px] text-paper">im / messengers</h2>
        <div class="border border-void-4 bg-void-2 p-5.5 shadow-inset-edge">
          <div
            v-for="m in IM"
            :key="m.name"
            class="flex items-center justify-between border-b border-void-4 py-2.5 font-mono text-[12px] tracking-[0.04em] text-paper-2 last:border-b-0"
          >
            <span>◆ {{ m.name }}</span>
            <span class="text-ok">{{ m.note }}</span>
          </div>
        </div>
        <div
          class="mt-4.5 border border-dashed border-paper-3 bg-[#08011a] p-3.5 font-mono text-[12px] leading-[1.55] text-paper-2"
        >
          <b class="font-bold tracking-[0.12em] uppercase text-hot">ask for my number ◆</b>
          <br />i don't list phone numbers in plaintext (scrapers gonna scrape). email me first, mention which
          messenger, and i'll send you a number. signal preferred.
        </div>
      </div>
    </div>

    <div class="footer-note mt-16">
      <span>◆ usually responds within 48h · sometimes 2 weeks · rarely never</span>
      <span>do not pitch me web3, "ai-driven" anything, or recruitment for crypto</span>
    </div>
  </div>
</template>

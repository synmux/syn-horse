<script setup lang="ts">
import { SOCIAL } from "~/data/social"
import { IM } from "~/data/im"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `contact · ${SITE.name}`,
  description: "email, signal, and a few obligated others.",
})
</script>

<template>
  <div class="container contact">
    <div class="eyebrow">▶ /contact · email is open · dms are mostly</div>
    <h1>say hi<span class="dot">.</span></h1>
    <p class="lede">
      email works. signal works. the rest are listed because i feel obligated. tone is everything:
      lead with what you want, not pleasantries.
    </p>
    <div class="grid">
      <div>
        <h2>the open ones</h2>
        <div class="links">
          <a
            v-for="s in SOCIAL"
            :key="s.k"
            class="link fx-glitch"
            :href="s.href"
            target="_blank"
            rel="noopener"
          >
            <span class="k">{{ s.k }}</span>
            <span class="v">{{ s.v }}</span>
            <span class="arr">↗</span>
          </a>
        </div>
      </div>
      <div>
        <h2>im / messengers</h2>
        <div class="im-card">
          <div v-for="m in IM" :key="m.name" class="row">
            <span>◆ {{ m.name }}</span>
            <span class="ok">{{ m.note }}</span>
          </div>
        </div>
        <div class="ask">
          <b>ask for my number ◆</b>
          <br />i don't list phone numbers in plaintext (scrapers gonna scrape). email me first,
          mention which messenger, and i'll send you a number. signal preferred.
        </div>
      </div>
    </div>

    <div class="footer-note" style="margin-top: 64px">
      <span>◆ usually responds within 48h · sometimes 2 weeks · rarely never</span>
      <span>do not pitch me web3, "ai-driven" anything, or recruitment for crypto</span>
    </div>
  </div>
</template>

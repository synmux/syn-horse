<script setup lang="ts">
import { DOMAINS } from "~/data/domains"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `domains · ${SITE.name}`,
  description: "the syn.* family."
})
</script>

<template>
  <div class="container domains">
    <div class="eyebrow">▶ /domains · the syn.* family · {{ DOMAINS.length }} of them</div>
    <h1>domains<span class="dot">.</span></h1>
    <p class="lede">
      i collect tlds the way other people collect houseplants. one is the main site. the rest redirect, park, or quietly
      ask a question about ducks.
    </p>
    <div class="dom-grid">
      <div v-for="d in DOMAINS" :key="d.tld" :class="['dom-row', d.cls]">
        <div class="name">
          {{ d.base }}<span style="color: var(--paper-3)">.</span><span class="tld">{{ d.tld }}</span>
        </div>
        <div class="desc">{{ d.desc }}</div>
        <div class="status">
          <span v-if="d.status === 'ok'" class="ok">● {{ d.statusText }}</span>
          <span v-else-if="d.status === 'warn'" class="warn">● {{ d.statusText }}</span>
          <span v-else-if="d.status === 'park'" class="park">○ {{ d.statusText }}</span>
        </div>
      </div>
    </div>
    <div class="footer-note" style="margin-top: 48px">
      <span>◆ all served by one cloudflare worker</span>
      <span>renewal calendar lives in fastmail · pray for me</span>
    </div>
  </div>
</template>

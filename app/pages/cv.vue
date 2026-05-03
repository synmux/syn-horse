<script setup lang="ts">
import { CV_ROLES, TALKS, SIDE } from "~/data/cv"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `cv · ${SITE.name}`,
  description: "10+ years in devops, sre, and sysadmin."
})
</script>

<template>
  <div class="container cv">
    <div class="eyebrow">▶ /cv · last revised 2026.03 · pdf available on request</div>
    <h1>cv<span class="dot">.</span></h1>
    <p class="lede">
      10+ years in devops, sre, and sysadmin. terraform, nomad, kubernetes, prometheus, more bash than is strictly
      healthy. terse on purpose.
    </p>
    <div class="cv-actions">
      <button type="button" class="btn fx-glitch">↓ download pdf</button>
      <button type="button" class="btn fx-glitch">↗ linkedin (don't)</button>
      <button type="button" class="btn fx-glitch">✉ email for full ref list</button>
    </div>

    <h2><span class="num">01 ·</span> work</h2>
    <div v-for="(r, i) in CV_ROLES" :key="i" class="role">
      <div class="left">
        <div class="dt">{{ r.dt }}</div>
        <div class="place">{{ r.place }}</div>
        <div class="loc">{{ r.loc }}</div>
      </div>
      <div class="right">
        <h3>{{ r.title }}</h3>
        <p>{{ r.desc }}</p>
        <div class="stack">
          <span v-for="s in r.stack" :key="s" class="tg">{{ s }}</span>
        </div>
      </div>
    </div>

    <h2><span class="num">02 ·</span> talks</h2>
    <div class="talks">
      <div v-for="(t, i) in TALKS" :key="i" class="talk">
        <span class="yr">{{ t.yr }}</span>
        <h4>{{ t.title }}</h4>
        <span class="venue">↗ {{ t.venue }}</span>
      </div>
    </div>

    <h2><span class="num">03 ·</span> side projects</h2>
    <div class="proj-grid">
      <div v-for="(s, i) in SIDE" :key="i" class="proj">
        <span class="yr">{{ s.yr }}</span>
        <h3>{{ s.name }}</h3>
        <p>{{ s.desc }}</p>
      </div>
    </div>

    <h2><span class="num">04 ·</span> elsewhere</h2>
    <div class="role">
      <div class="left">
        <div class="dt">refs</div>
        <div class="place">on request</div>
      </div>
      <div class="right">
        <p>
          i can put you in touch with eng managers, peers, and direct reports. names + contact details on request — i'm
          not putting them on a public page.
        </p>
      </div>
    </div>
  </div>
</template>

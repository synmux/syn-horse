<script setup lang="ts">
import { PROJECTS } from "~/data/projects"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `projects · ${SITE.name}`,
  description: "things i made on purpose."
})
</script>

<template>
  <div class="relative mx-auto max-w-[920px] px-8 pt-14 pb-20">
    <div class="eyebrow">▶ /projects · {{ PROJECTS.length }} things</div>
    <h1 class="page-h1">projects<span class="dot">.</span></h1>
    <p class="lede">things i made on purpose. things i regret are not on this list.</p>
    <div class="proj-grid">
      <div v-for="p in PROJECTS" :key="p.name" class="proj fx-glitch">
        <span class="proj-year">{{ p.yr }}</span>
        <h3 class="proj-title">{{ p.name }}</h3>
        <p class="proj-body">{{ p.desc }}</p>
        <div class="proj-url">↗ {{ p.url }}</div>
        <div class="proj-tags">
          <span v-for="(t, i) in p.tags" :key="i" :class="['tg', t.k]">{{ t.l }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

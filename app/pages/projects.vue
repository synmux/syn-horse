<script setup lang="ts">
import { PROJECTS } from "~/data/projects"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `projects · ${SITE.name}`,
  description: "things i made on purpose."
})
</script>

<template>
  <div class="container projects">
    <div class="eyebrow">▶ /projects · {{ PROJECTS.length }} things</div>
    <h1>projects<span class="dot">.</span></h1>
    <p class="lede">things i made on purpose. things i regret are not on this list.</p>
    <div class="proj-grid">
      <div v-for="p in PROJECTS" :key="p.name" class="proj fx-glitch">
        <span class="yr">{{ p.yr }}</span>
        <h3>{{ p.name }}</h3>
        <p>{{ p.desc }}</p>
        <div class="url">↗ {{ p.url }}</div>
        <div class="tags">
          <span v-for="(t, i) in p.tags" :key="i" :class="['tg', t.k]">{{ t.l }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useKonamiState } from "~/composables/useKonamiState"
import { ABANDONED_PROJECTS, PROJECTS, type Project } from "~/data/projects"
import { SITE } from "~/data/site"

const { commandsEnabled } = useKonamiState()

// live and abandoned projects share one card shape so they can be folded into
// a single year-descending list. abandoned cards carry an epitaph instead of a
// url and only join the list while konami mode is active.
type ProjectCard = Omit<Project, "url"> & {
  abandoned: boolean
  epitaph?: string
  url?: string
}

const cards = computed<ProjectCard[]>(() => {
  const live: ProjectCard[] = PROJECTS.map((project) => ({
    ...project,
    abandoned: false
  }))
  const dead: ProjectCard[] = commandsEnabled.value
    ? ABANDONED_PROJECTS.map((project) => ({ ...project, abandoned: true }))
    : []
  // stable sort keeps each year's curated order; dead cards slot into place.
  return [...live, ...dead].sort((first, second) => Number(second.yr) - Number(first.yr))
})

useSeoMeta({
  title: `projects · ${SITE.name}`,
  description: "things i made on purpose."
})
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /projects · {{ PROJECTS.length }} things</div>
    <h1 class="page-h1">projects<span class="dot">.</span></h1>
    <p class="lede">
      things i made on purpose. things i got bored with are not on this list, but may appear with the correct
      invocation.
    </p>
    <TransitionGroup tag="div" name="grave" class="proj-grid">
      <div
        v-for="card in cards"
        :key="(card.abandoned ? 'grave:' : 'live:') + card.name"
        :class="['proj', 'fx-glitch', { abandoned: card.abandoned }]"
      >
        <span class="proj-year">{{ card.yr }}</span>
        <h3 class="proj-title">{{ card.name }}</h3>
        <p class="proj-body">{{ card.desc }}</p>
        <div v-if="card.abandoned" class="proj-epitaph">† {{ card.epitaph }}</div>
        <div v-else class="proj-url">↗ {{ card.url }}</div>
        <div class="proj-tags">
          <span v-for="(t, i) in card.tags" :key="i" :class="['tg', t.k]">{{ t.l }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

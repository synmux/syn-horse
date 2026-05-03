<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useCommandPalette } from "~/composables/useCommandPalette"

const route = useRoute()
const palette = useCommandPalette()

const tabs = [
  { id: "home", label: "home", to: "/" },
  { id: "now", label: "now", to: "/now" },
  { id: "projects", label: "projects", to: "/projects" },
  { id: "blog", label: "blog", to: "/blog" },
  { id: "cv", label: "cv", to: "/cv" },
  { id: "domains", label: "domains", to: "/domains" },
  { id: "contact", label: "contact", to: "/contact" }
] as const

const activeId = computed(() => {
  const p = route.path
  if (p === "/") return "home"
  const top = p.replace(/^\//, "").replace(/\/.*$/, "")
  // /blog/<slug> still highlights "blog"
  return top || "home"
})
</script>

<template>
  <nav
    class="nav sticky top-8 z-[99] flex items-center gap-4.5 border-b border-void-4 bg-void/70 px-8 py-3.5 font-sans text-[13px] backdrop-blur-md"
  >
    <NuxtLink to="/" class="fx-glitch flex cursor-pointer items-center gap-2.5">
      <img class="h-7 w-7 [image-rendering:pixelated]" src="/assets/logo-mark.svg" alt="" />
      <span class="font-display text-[26px] leading-none tracking-[0.01em] text-paper">
        syn<span class="text-hot">.</span>horse
      </span>
    </NuxtLink>
    <span class="flex-1" />
    <NuxtLink
      v-for="t in tabs"
      :key="t.id"
      :to="t.to"
      :class="[
        'fx-glitch relative px-1 py-1.5 font-sans text-[13px] lowercase transition-colors duration-[80ms] ease-snap hover:text-paper',
        activeId === t.id ? 'text-paper' : 'text-paper-3'
      ]"
    >
      <span v-if="activeId === t.id" class="align-[1px] text-[10px] text-hot">◆ </span>{{ t.label }}
    </NuxtLink>
    <button
      class="border border-void-4 bg-void-2 px-1.75 py-0.75 font-mono text-[10px] tracking-[0.08em] text-paper-3"
      type="button"
      @click="palette.show()"
    >
      press <kbd class="text-cool">/</kbd>
    </button>
  </nav>
</template>

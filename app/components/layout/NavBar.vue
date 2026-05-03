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
  <nav class="nav">
    <NuxtLink to="/" class="brand fx-glitch">
      <img class="mark" src="/assets/logo-mark.svg" alt="" />
      <span class="word">syn<span class="dot">.</span>horse</span>
    </NuxtLink>
    <span class="spacer" />
    <NuxtLink v-for="t in tabs" :key="t.id" :to="t.to" :class="['tab', 'fx-glitch', activeId === t.id && 'active']">
      {{ t.label }}
    </NuxtLink>
    <button class="cmd-hint" type="button" @click="palette.show()">press <kbd>/</kbd></button>
  </nav>
</template>

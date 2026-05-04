<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useTime } from "~/composables/useTime"
import { SITE } from "~/data/site"

const route = useRoute()
const { now } = useTime()

const buildTimeRaw = useRuntimeConfig().public.buildTime as string
const buildTimeMs = (() => {
  const parsed = new Date(buildTimeRaw).getTime()
  return Number.isNaN(parsed) ? null : parsed
})()

const time = computed(() => (now.value ? now.value.toISOString().slice(11, 19) : ""))

const buildAge = computed(() => {
  if (!now.value || buildTimeMs === null) return ""
  const diffMs = now.value.getTime() - buildTimeMs
  const minutes = Math.max(Math.floor(diffMs / 60_000), 0)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days >= 1) return `${days}d ago`
  if (hours >= 1) return `${hours}h ago`
  return `${minutes}m ago`
})

const slug = computed(() => {
  const p = route.path
  if (p === "/") return "home"
  return p.replace(/^\//, "").replace(/\/.*$/, "") || "home"
})
</script>

<template>
  <div
    class="statusbar sticky top-0 z-[100] grid h-8 grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-void-4 bg-void/85 px-4.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-paper-3 backdrop-blur-md"
  >
    <span>
      <span
        class="mr-1.5 inline-block h-1.75 w-1.75 rounded-full bg-ok align-middle shadow-pulse-ok animate-pulse-glow"
      />
      online
    </span>
    <span class="flex gap-4 overflow-hidden whitespace-nowrap text-paper-3">
      <span class="inline-flex items-center gap-1.5"
        >◆ <span class="text-hot">/{{ slug }}</span></span
      >
      <span class="inline-flex items-center gap-1.5">tz <span class="text-paper-2">UTC</span></span>
    </span>
    <span>
      build
      <ClientOnly>
        <span class="text-cool tabular-nums">{{ buildAge }}</span>
        <template #fallback>
          <span class="text-cool tabular-nums">—</span>
        </template>
      </ClientOnly>
    </span>
    <span>
      local
      <ClientOnly>
        <span class="text-paper-2 tabular-nums">{{ time }}</span>
        <template #fallback>
          <span class="text-paper-2 tabular-nums">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span>{{ SITE.version }}</span>
  </div>
</template>

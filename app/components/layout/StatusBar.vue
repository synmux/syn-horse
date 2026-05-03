<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useTime } from "~/composables/useTime"
import { SITE } from "~/data/site"

const route = useRoute()
const { now, uptimeS } = useTime()

const time = computed(() => (now.value ? now.value.toISOString().slice(11, 19) : ""))

const uptime = computed(() => {
  const s = uptimeS.value
  const hh = String(Math.floor(s / 3600)).padStart(2, "0")
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
  const ss = String(s % 60).padStart(2, "0")
  return `${hh}:${mm}:${ss}`
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
      uptime
      <ClientOnly>
        <span class="text-cool tabular-nums">{{ uptime }}</span>
        <template #fallback>
          <span class="text-cool tabular-nums">--:--:--</span>
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

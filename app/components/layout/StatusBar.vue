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
  <div class="statusbar">
    <span>
      <span class="pulse-dot" />online
    </span>
    <span class="sb-mid">
      <span class="frag">◆ <span class="sb-route">/{{ slug }}</span></span>
      <span class="frag">tz <span style="color: var(--paper-2)">UTC</span></span>
    </span>
    <span>
      uptime
      <ClientOnly>
        <span class="sb-up">{{ uptime }}</span>
        <template #fallback>
          <span class="sb-up">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span>
      local
      <ClientOnly>
        <span class="sb-time">{{ time }}</span>
        <template #fallback>
          <span class="sb-time">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span>{{ SITE.version }}</span>
  </div>
</template>

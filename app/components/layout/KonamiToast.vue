<script setup lang="ts">
import { ref, onUnmounted } from "vue"
import { useKonamiCode } from "~/composables/useKonamiCode"

const visible = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

useKonamiCode(() => {
  visible.value = true
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    visible.value = false
  }, 3200)
})

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<template>
  <div
    v-if="visible"
    class="konami-toast fixed bottom-6 left-1/2 z-[2000] -translate-x-1/2 border-2 border-void bg-hot px-6 py-3.5 font-display text-[28px] tracking-[0.02em] uppercase text-void shadow-glow-hot-strong animate-konami"
  >
    ◆ THE HORSE IS LOOSE ◆
  </div>
</template>

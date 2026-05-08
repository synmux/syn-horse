<script setup lang="ts">
import { useKonamiToast } from "~/composables/useKonamiToast"

const { message } = useKonamiToast()
</script>

<template>
  <Transition name="konami-fade">
    <div
      v-if="message"
      class="konami-toast fixed bottom-6 left-1/2 z-[2000] -translate-x-1/2 border-2 border-void bg-hot px-6 py-3.5 font-display text-[28px] tracking-[0.02em] uppercase text-void shadow-glow-hot-strong animate-konami text-center"
      role="status"
      aria-live="polite"
    >
      <div>◆ {{ message.title }} ◆</div>
      <div v-if="message.sub" class="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-void">
        {{ message.sub }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.konami-fade-leave-active {
  transition: opacity 280ms ease;
}
.konami-fade-leave-to {
  opacity: 0;
}
</style>

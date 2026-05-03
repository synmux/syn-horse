<script setup lang="ts">
import { computed } from "vue"
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()
const isFourOhFour = computed(() => props.error?.statusCode === 404)
</script>

<template>
  <NuxtLayout name="default">
    <NotFound v-if="isFourOhFour" />
    <section v-else class="page-shell generic-error">
      <div class="eyebrow">▶ /error · status {{ error.statusCode || "unknown" }}</div>
      <h1>{{ error.statusCode || "error" }}<span class="dot">.</span></h1>
      <p class="lede">{{ error.statusMessage || "something broke. sorry about that." }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <NuxtLink to="/" class="btn-syn lg fx-glitch">← go home</NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

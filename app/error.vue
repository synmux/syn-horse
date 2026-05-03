<script setup lang="ts">
import { computed } from "vue"
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()
const isFourOhFour = computed(() => props.error?.statusCode === 404)
</script>

<template>
  <NuxtLayout name="default">
    <NotFound v-if="isFourOhFour" />
    <section v-else class="container generic-error">
      <div class="eyebrow">▶ /error · status {{ error.statusCode || "unknown" }}</div>
      <h1>{{ error.statusCode || "error" }}<span class="dot">.</span></h1>
      <p class="lede">{{ error.statusMessage || "something broke. sorry about that." }}</p>
      <div class="actions" style="margin-top: 24px">
        <NuxtLink to="/" class="btn fx-glitch">← go home</NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

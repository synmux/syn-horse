<script setup lang="ts">
import { computed } from "vue"
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()
const isFourOhFour = computed(() => props.error?.statusCode === 404)
</script>

<template>
  <NuxtLayout name="default">
    <section v-if="isFourOhFour" class="container generic-error">
      <p class="eyebrow">syn.horse · /404</p>
      <h1>not found<span class="dot">.</span></h1>
      <p class="lede">this page doesn't exist. yet.</p>
      <p class="actions">
        <NuxtLink to="/" class="btn">go home</NuxtLink>
        <NuxtLink to="/blog" class="btn">read the blog instead</NuxtLink>
        <NuxtLink to="/domains" class="btn">maybe it's on another domain</NuxtLink>
      </p>
    </section>
    <section v-else class="container generic-error">
      <p class="eyebrow">syn.horse · /error</p>
      <h1>{{ error.statusCode || "error" }}<span class="dot">.</span></h1>
      <p class="lede">{{ error.statusMessage || "something broke. sorry about that." }}</p>
      <p class="actions">
        <NuxtLink to="/" class="btn">go home</NuxtLink>
      </p>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lede?: string
}>()
</script>

<template>
  <header class="page-header">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}<span class="dot">.</span></h1>
    <p v-if="lede" class="lede">{{ lede }}</p>
  </header>
</template>

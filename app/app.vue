<script setup lang="ts">
import { SITE } from "~/data/site"

useSeoMeta({
  title: SITE.name,
  description: SITE.description,
  ogTitle: SITE.name,
  ogDescription: SITE.description,
  themeColor: "#0d0221",
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

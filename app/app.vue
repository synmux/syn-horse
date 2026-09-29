<script setup lang="ts">
import { SITE } from "~/data/site"

// Pages set only their own title and description. The SEO module's title template appends the
// site name (with the separator from `app.head.templateParams` in `nuxt.config.ts`), and its
// inference plugin derives og:title and og:description from each page's own values, so
// neither is set here.
useSeoMeta({
  description: SITE.description,
  themeColor: "#0d0221"
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

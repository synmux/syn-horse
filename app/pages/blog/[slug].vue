<script setup lang="ts">
import { useRoute } from "vue-router"
import { SITE } from "~/data/site"

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  const query = queryCollection("blog").path(route.path)
  return import.meta.dev ? query.first() : query.where("future", "=", false).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "post not found",
    fatal: true
  })
}

useSeoMeta({
  title: () => `${page.value?.title} · ${SITE.name}`,
  description: () => page.value?.description
})
</script>

<template>
  <div class="page-shell">
    <NuxtLink to="/blog" class="post-crumb fx-glitch">← / blog</NuxtLink>
    <h1 class="post-h1">{{ page!.title }}</h1>
    <div class="post-meta">
      <span><span class="pill">◆</span> {{ formatBlogDate(page!.date) }}</span>
      <span>· {{ page!.read }}</span>
      <span>· tags: {{ page!.tags.join(", ") }}</span>
      <span v-if="page!.future" class="text-pop">· FROM THE FUTURE</span>
    </div>
    <div class="post-body">
      <ContentRenderer :value="page!" :prose="false" />
    </div>
    <div class="post-foot">
      <span>◆ written in /var/notes/2026/ · cron'd, not edited</span>
      <span>
        <a :href="SITE.github" target="_blank" rel="noopener">edit on github →</a>
      </span>
    </div>
  </div>
</template>

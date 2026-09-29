<script setup lang="ts">
import { useRoute } from "vue-router"
import { SITE } from "~/data/site"

const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => {
  const query = queryCollection("blog").path(route.path)
  return import.meta.dev ? query.first() : query.where("future", "=", false).first()
})

throwIfContentFailed(error.value)

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

const formatGithubURL = (id: string) => {
  const slug = id.split("/").slice(1).join("/")
  return slug
}
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
      <span>◆ from the depths of ~~/content/blog · presented with nuxt content</span>
      <span>
        <a :href="`${SITE.github}/blob/main/content/${formatGithubURL(page!.id)}`" target="_blank" rel="noopener"
          >view on github →</a
        >
      </span>
    </div>
  </div>
</template>

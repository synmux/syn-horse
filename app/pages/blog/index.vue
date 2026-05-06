<script setup lang="ts">
import { ref, computed } from "vue"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `blog · ${SITE.name}`,
  description: "essays, notes, and shouts into the void."
})

const { data: posts } = await useAsyncData("blog-index", () => {
  const query = queryCollection("blog").order("date", "DESC")
  return import.meta.dev ? query.all() : query.where("future", "=", false).all()
})

const filter = ref<string>("all")

const tagCounts = computed<Array<[string, number]>>(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value ?? []) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries()).sort((left, right) => right[1] - left[1])
})

const filtered = computed(() => {
  const all = posts.value ?? []
  return filter.value === "all" ? all : all.filter((post) => post.tags.includes(filter.value))
})
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /blog · {{ posts?.length ?? 0 }} posts · infrequent · lowercase</div>
    <h1 class="page-h1">blog<span class="dot">.</span></h1>
    <p class="lede">
      writing about devops, hardware, the slow death of weird websites, and occasionally my body. infrequent. unedited.
      no editor will ever fix that.
    </p>
    <div class="blog-filter">
      <span :class="['tg', filter === 'all' && 'on']" @click="filter = 'all'"> ALL · {{ posts?.length ?? 0 }} </span>
      <span v-for="[tag, count] in tagCounts" :key="tag" :class="['tg', filter === tag && 'on']" @click="filter = tag">
        {{ tag.toUpperCase() }} · {{ count }}
      </span>
    </div>
    <ul class="mt-7">
      <li v-for="post in filtered" :key="post.path" class="blog-row fx-glitch">
        <NuxtLink :to="post.path" class="blog-row-link">
          <span class="date">{{ formatBlogDate(post.date) }}</span>
          <div>
            <h3>{{ post.title }}</h3>
            <div class="desc">{{ post.description }}</div>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tg">{{ tag }}</span>
              <span v-if="post.future" class="tg warn">FUTURE</span>
            </div>
          </div>
          <span class="read">{{ post.read }} →</span>
        </NuxtLink>
      </li>
    </ul>
    <div class="blog-feed-line">
      rss feed: <a href="/feed.xml">/feed.xml</a> · subscribe with the reader of your choice. no email list. i'm not
      chasing you.
    </div>
  </div>
</template>

<style scoped>
.blog-row-link {
  display: contents;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue"
import { POSTS, TAG_COUNTS } from "~/data/posts"
import { SITE } from "~/data/site"

useSeoMeta({
  title: `blog · ${SITE.name}`,
  description: "essays, notes, and shouts into the void."
})

const filter = ref<string>("all")

const filtered = computed(() => (filter.value === "all" ? POSTS : POSTS.filter((p) => p.tags.includes(filter.value))))
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /blog · {{ POSTS.length }} posts · infrequent · lowercase</div>
    <h1 class="page-h1">blog<span class="dot">.</span></h1>
    <p class="lede">
      writing about devops, hardware, the slow death of weird websites, and occasionally my body. infrequent. unedited.
      no editor will ever fix that.
    </p>
    <div class="blog-filter">
      <span :class="['tg', filter === 'all' && 'on']" @click="filter = 'all'"> ALL · {{ POSTS.length }} </span>
      <span v-for="[t, c] in TAG_COUNTS" :key="t" :class="['tg', filter === t && 'on']" @click="filter = t">
        {{ t.toUpperCase() }} · {{ c }}
      </span>
    </div>
    <ul class="mt-7">
      <li v-for="p in filtered" :key="p.slug" class="blog-row fx-glitch">
        <NuxtLink :to="`/blog/${p.slug}`" class="blog-row-link">
          <span class="date">{{ p.date }}</span>
          <div>
            <h3>{{ p.title }}</h3>
            <div class="desc">{{ p.desc }}</div>
            <div class="post-tags">
              <span v-for="t in p.tags" :key="t" class="tg">{{ t }}</span>
              <span v-if="!p.real" class="tg warn">FUTURE</span>
            </div>
          </div>
          <span class="read">{{ p.read }} →</span>
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

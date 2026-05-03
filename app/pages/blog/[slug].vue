<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { POSTS } from "~/data/posts"
import { SITE } from "~/data/site"

// TODO: When @nuxt/content is wired up, replace the data lookup with:
//   const { data: page } = await useAsyncData(route.path, () =>
//     queryCollection('docs').path(route.path).first()
//   )
// and render the body via <ContentRenderer :value="page" />.
// The existing markdown files live in content/blog/<YYYY-MM-DD>_<slug>.md.

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const post = computed(() => POSTS.find((p) => p.slug === slug.value))

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "post not found",
    fatal: true,
  })
}

useSeoMeta({
  title: () => `${post.value!.title} · ${SITE.name}`,
  description: () => post.value!.desc,
})

const sourcePath = computed(
  () => `content/blog/${post.value!.date.replace(/\./g, "-")}_${post.value!.slug}.md`,
)
</script>

<template>
  <div class="container post">
    <NuxtLink to="/blog" class="crumb fx-glitch">← / blog</NuxtLink>
    <h1>{{ post!.title }}</h1>
    <div class="meta">
      <span><span class="pill">◆</span> {{ post!.date }}</span>
      <span>· {{ post!.read }}</span>
      <span>· tags: {{ post!.tags.join(", ") }}</span>
      <span v-if="!post!.real" style="color: var(--pop)">· FROM THE FUTURE</span>
    </div>
    <div class="body">
      <p>
        {{ post!.desc }}
        <i>
          this is the placeholder body — the real post lives in
          <code>{{ sourcePath }}</code>
          and will render via <code>@nuxt/content</code> once that integration ships.
        </i>
      </p>
      <h2>the setup</h2>
      <p>
        here's the thesis. i had a problem, i refused to leave the house, and i had a half-charged
        thinkpad. you can guess what happened next.
      </p>
      <p>
        i'd been running this exact stack for about six months — <code>nuxt 4</code>,
        <code>cloudflare workers</code>, <code>@nuxt/content</code>, <code>tailwind</code>,
        <code>daisyui</code> — and the thing that finally broke me was the
        <b>build pipeline</b>. specifically, the part where it lies about whether content has
        changed.
      </p>
      <pre><code>&gt; wrangler deploy
✘ [ERROR] you tried something
   the worker is fine. you are not.

i lost the file. i'm not sorry.</code></pre>
      <h2>what changed</h2>
      <p>
        the fix, as is tradition, was three lines of yaml. but the journey there involved
        <a href="#">prometheus</a>, <a href="#">grafana</a>, a misconfigured tailnet, two pots of
        coffee, and a brief out-of-body experience.
      </p>
      <blockquote>"the kernel panics, but romantically."</blockquote>
      <p>
        that's an error message i would die for. instead i get "<i
          >something went wrong, our team has been notified</i
        >." nothing went wrong. somebody wrote a bad query and capitalism happened. say so.
      </p>
      <h2>what to do</h2>
      <ul>
        <li>build a personal site. make it weird.</li>
        <li>don't put your linkedin on it.</li>
        <li>don't optimize for the algorithm.</li>
        <li>write your own 404. swear, occasionally.</li>
        <li>link to a friend.</li>
      </ul>
      <p>
        that's it. that's the post. there's no call to action. there's no "if you liked this,
        consider subscribing." you got here. you read it. that's the contract. thanks.
      </p>
    </div>
    <div class="post-foot">
      <span>◆ written in /var/notes/2026/ · cron'd, not edited</span>
      <span>
        <a :href="SITE.github" target="_blank" rel="noopener">edit on github →</a>
      </span>
    </div>
  </div>
</template>

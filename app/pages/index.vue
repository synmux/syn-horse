<script setup lang="ts">
import { SITE } from "~/data/site"

const { data: blogCount } = await useAsyncData(
  "home-blog-count",
  () => {
    const query = queryCollection("blog")
    return import.meta.dev ? query.count() : query.where("future", "=", false).count()
  },
  { default: () => 0 }
)
</script>

<template>
  <div class="relative mx-auto max-w-[920px] px-8 pt-14 pb-20">
    <div class="eyebrow">▶ syn · they/them · non-binary</div>
    <div class="grid grid-cols-[1fr_auto] items-stretch gap-6">
      <h1 class="pb-3.5 font-display text-[128px] leading-[1.05] text-paper">
        devops<br />and bad<br />ideas<span class="text-hot">.</span>
      </h1>
      <NuxtImg
        src="/images/self/self-small-transbg.webp"
        alt="a portrait of syn"
        width="420"
        height="420"
        class="aspect-square self-stretch h-full object-cover"
      />
    </div>
    <p class="mt-4.5 max-w-[620px] text-[19px] leading-[1.55] text-paper-2">
      i'm <code class="font-semibold">syn</code>. queer, disabled devops engineer and general-purpose nerd. i write
      occasionally, ship occasionally, and have a lot of opinions about prometheus and accessibility.
    </p>
    <div class="mt-6.5 flex items-center gap-3 border border-void-4 bg-void-2 px-4 py-3 shadow-inset-edge">
      <span class="h-2 w-2 shrink-0 rounded-full bg-lilac shadow-pulse-ok" />
      <span class="font-mono text-[12.5px] leading-[1.5] tracking-[0.04em] text-paper-2">
        <b class="font-bold text-paper">NOW:</b> {{ SITE.status }}
      </span>
    </div>
    <div class="mt-12 grid grid-cols-2 gap-3.5">
      <NuxtLink to="/now" class="home-card fx-glitch">
        <div class="home-card-head">/ now</div>
        <h3 class="home-card-title">this month</h3>
        <p class="home-card-body">updated whenever i remember.</p>
        <span class="home-card-arrow">read /now →</span>
      </NuxtLink>
      <NuxtLink to="/projects" class="home-card fx-glitch">
        <div class="home-card-head">/ projects</div>
        <h3 class="home-card-title">things i made</h3>
        <p class="home-card-body">some live. some retired. some catch fire a lot.</p>
        <span class="home-card-arrow">see projects →</span>
      </NuxtLink>
      <NuxtLink to="/blog" class="home-card fx-glitch">
        <div class="home-card-head">/ blog</div>
        <h3 class="home-card-title">{{ blogCount }} posts</h3>
        <p class="home-card-body">cli, meshtastic, ms, sdam. infrequent. mostly coherent.</p>
        <span class="home-card-arrow">read posts →</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="home-card fx-glitch">
        <div class="home-card-head">/ cv</div>
        <h3 class="home-card-title">cv (lol)</h3>
        <p class="home-card-body">10+ years. devops, sre, sysadmin. pdf if you must.</p>
        <span class="home-card-arrow">read cv →</span>
      </NuxtLink>
    </div>
    <div class="mt-9 flex flex-wrap gap-4.5 font-mono text-[12px]">
      <a href="https://github.com/synmux" target="_blank" rel="noopener" class="dotted-link">github</a>
      <a href="https://basilisk.gallery/@dave" target="_blank" rel="noopener" class="dotted-link">mastodon</a>
      <a href="https://bsky.app/profile/syn.horse" target="_blank" rel="noopener" class="dotted-link">bluesky</a>
      <NuxtLink to="/contact" class="dotted-link">contact</NuxtLink>
      <NuxtLink to="/domains" class="dotted-link">domains</NuxtLink>
      <NuxtLink to="/panic" class="dotted-link">panic</NuxtLink>
      <a href="/feed.xml" class="dotted-link">rss</a>
    </div>
    <div class="footer-note">
      <span>◆ syn · 2026 · built in the void</span>
      <span>no analytics · no newsletter · no we</span>
    </div>
  </div>
</template>

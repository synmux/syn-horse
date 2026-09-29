<script setup lang="ts">
useSeoMeta({
  title: "now",
  description: "what i'm actually doing this month."
})
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /now · updated 2026.04.20</div>
    <h1 class="page-h1">now<span class="dot">.</span></h1>
    <p class="lede max-w-150">
      a /now page. what i'm actually doing this month, not what linkedin would have you believe.
    </p>

    <h2 class="page-h2">building</h2>
    <ul class="diamond-list">
      <li>
        <span>
          <strong>syn.horse</strong>
          - this very site. nuxt 4 on cloudflare workers, blog content from markdown. mostly working.
        </span>
      </li>
      <li>
        <span>
          <strong><span class="sparkle-motion">the cluster</span></strong>
          - a small kubernetes cluster for hosting personal projects like
          <NuxtLink to="https://basilisk.gallery">basilisk.gallery</NuxtLink> and shared house infrastructure like
          <NuxtLink to="https://github.com/hxck/arrsuite">the arrs</NuxtLink>. using
          <NuxtLink to="https://upcloud.com">UpCloud</NuxtLink> because they're wonderful and based outside the US (in
          Finland). IaC using Pulumi, mostly in typescript. still a work in progress. may also have an in-house node,
          that might be cool, push workloads out to the internet by shifting their node selector.
        </span>
      </li>
      <li>
        <span>
          <strong>genderbase</strong>
          - a resource for people to learn about gender identity and expression. still in early stages. ruby on rails,
          will eventually be hosted on the cluster because cloudflare's container functionality is... limited.
        </span>
      </li>
      <li>
        <span>
          <strong>recon</strong>
          - exploring swift and swiftui. pretty simple; it <strong>RE</strong>sizes and <strong>CON</strong>verts
          images. built it due to issues with mastodon, which it did not fix. may publish to the app store.
        </span>
      </li>
      <li>
        <span>
          <strong>super sekrit TEC project</strong>
          - volunteering for the <NuxtLink to="https://transequitycoalition.org">Trans Equity Coalition</NuxtLink> of
          New Jersey. web dev, nuxt 4 on cloudflare workers. can't really say much more than that, but it's a good cause
          and i'm happy to help.
        </span>
      </li>
      <li>
        <span>
          <strong>a house</strong>
          - i'm moving house. it has taken over a year and I have been stuck at my parents for the duration. this is, of
          course, driving me strange - but we're close to the finish line. after which, i'll be buying a house in wales
          for me, mog, faith, and too many cats. after I pay back the not remotely insignificant, and totally bizarre to
          me that this is seen as okay, <em>cost</em> of selling the house. don't get me started.
        </span>
      </li>
    </ul>

    <h2 class="page-h2">reading</h2>
    <ul class="diamond-list">
      <li>
        <span
          ><strong>the illuminatus! trilogy</strong>, robert anton wilson. for the second time. it literally
          restructures your interface with reality while you read. the story is nonsense. it's a delivery mechanism for
          a wider mind.</span
        >
      </li>
      <li>
        <span>
          <strong>short stories</strong>. charles stross, david langford, others. they fit an audhd head and the short
          length means the author condenses as much meaning as possible into every single word. short stories good.
        </span>
      </li>
      <li>
        <span
          ><strong>too many <a href="https://are.na">are.na</a> blocks</strong>. probably more than is healthy, frankly.
          they're concentrated intent.</span
        >
      </li>
    </ul>

    <h2 class="page-h2">listening</h2>
    <ul class="diamond-list">
      <li><span>bodyimage - BOY DRUGS</span></li>
      <li><span>The Skinner Brothers - Nothing on Me</span></li>
      <li><span>Chase & Status - No Problem</span></li>
    </ul>

    <h2 class="page-h2">not doing</h2>
    <ul class="diamond-list">
      <li>
        <span><strong>twitter / x</strong> - quit it, and so should you. fuck elon musk.</span>
      </li>
      <li>
        <span
          ><strong>tidying up</strong> - i mean, it's not like my space is too bad. but still, the executive function
          eludes me once more.</span
        >
      </li>
      <li>
        <span><strong>a job</strong> - for the love of god, hire me. hit that cv link at the top.</span>
      </li>
    </ul>

    <!-- <div class="console mt-7">
      <div>
        <span class="pr">&gt;</span>
        <span class="mu">console output</span>
      </div>
    </div> -->
    <div class="mt-9 font-mono text-[11px] tracking-[0.08em] text-paper-3">
      last meaningful update: 2026.08.01 · next: when i remember
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
  color: var(--accent-color, var(--color-hot));
  font-weight: bold;
}
</style>

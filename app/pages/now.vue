<script setup lang="ts">
import { SITE } from "~/data/site"

useSeoMeta({
  title: `now · ${SITE.name}`,
  description: "what i'm actually doing this month."
})
</script>

<template>
  <div class="container now">
    <div class="eyebrow">▶ /now · updated 2026.04.20</div>
    <h1>now<span class="dot">.</span></h1>
    <p class="lede">a /now page. what i'm actually doing this month, not what linkedin would have you believe.</p>
    <h2>building</h2>
    <ul>
      <li>
        <span>
          <b>syn.horse</b> — this rewrite. nuxt 4 on cloudflare workers, content from markdown, deployed via wrangler.
          mostly working. {{ SITE.status }}.
        </span>
      </li>
      <li>
        <span>
          <b>genderbase</b> — quarterly content review. removed 2 dead links, added 7 resources, refreshed the FAQ.
        </span>
      </li>
      <li>
        <span>
          <b>meshtastic node FOXP1</b> — moved it to a higher ridge. range went from 8km to ~12km. neighbours now relay
          my jokes.
        </span>
      </li>
    </ul>
    <h2>reading</h2>
    <ul>
      <li>
        <span><b>the dispossessed</b>, le guin, third time round. somehow weirder.</span>
      </li>
      <li>
        <span>
          <b>the unaccountability machine</b>, dan davies. systems thinking for people who already shout at git.
        </span>
      </li>
      <li>
        <span>too many <b>are.na blocks</b>. probably more than is healthy.</span>
      </li>
    </ul>
    <h2>listening</h2>
    <ul>
      <li>
        <span> <b>the broadcast</b> — dub techno. it's april. that's enough excuse. </span>
      </li>
      <li>
        <span> <b>look mum no computer</b> — tinkerer/musician. accidentally informative. </span>
      </li>
    </ul>
    <h2>not doing</h2>
    <ul>
      <li>
        <span><b>twitter / x</b> — quit it. not bragging.</span>
      </li>
      <li>
        <span><b>that side project from january</b> — it can wait. it has to.</span>
      </li>
      <li>
        <span><b>on-call</b> — ate it for a year in 2020. never again.</span>
      </li>
    </ul>
    <div class="console">
      <div>
        <span class="pr">&gt;</span>
        <span class="mu">last cron job ran 3h ago — yes the site is alive</span>
      </div>
      <div>
        <span class="pr">&gt;</span>
        <span class="mu">if you got here from hacker news: hi. don't comment. read.</span>
      </div>
      <div>
        <span class="pr">&gt;</span>
        <span class="mu">if you got here from linkedin: i don't know how. close the tab.</span>
      </div>
    </div>
    <div class="updated">last meaningful update: 2026.04.20 · next: when i remember</div>
  </div>
</template>

<script setup lang="ts">
import { SITE } from "~/data/site"
</script>

<template>
  <div class="container home">
    <div class="eyebrow">▶ syn · they/them · in the void</div>
    <h1>devops<br />and weird<br />things<span class="accent">.</span></h1>
    <p class="sub">
      i'm <b>syn</b>. devops engineer and general-purpose nerd. i write occasionally, ship occasionally, and have a lot
      of opinions about prometheus.
    </p>
    <div class="now-bar">
      <span class="pulse" />
      <span class="text"><b>NOW:</b> {{ SITE.status }}</span>
    </div>
    <div class="grid">
      <NuxtLink to="/now" class="card fx-glitch">
        <div class="h">/ now</div>
        <h3>this month</h3>
        <p>updated whenever i remember. sometimes wrong on purpose.</p>
        <span class="arrow">read /now →</span>
      </NuxtLink>
      <NuxtLink to="/projects" class="card fx-glitch">
        <div class="h">/ projects</div>
        <h3>things i made</h3>
        <p>some live. some retired. one is a question about ducks.</p>
        <span class="arrow">see projects →</span>
      </NuxtLink>
      <NuxtLink to="/blog" class="card fx-glitch">
        <div class="h">/ blog</div>
        <h3>17 posts</h3>
        <p>shell tools, meshtastic, eeg, ms, sdam. infrequent. unedited.</p>
        <span class="arrow">read posts →</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="card fx-glitch">
        <div class="h">/ cv</div>
        <h3>cv (lol)</h3>
        <p>10+ years. devops, sre, sysadmin. pdf if you must.</p>
        <span class="arrow">read cv →</span>
      </NuxtLink>
    </div>
    <div class="links">
      <a href="https://github.com/synmux" target="_blank" rel="noopener">github</a>
      <a href="https://basilisk.gallery/@dave" target="_blank" rel="noopener">mastodon</a>
      <a href="https://bsky.app/profile/syn.horse" target="_blank" rel="noopener">bluesky</a>
      <NuxtLink to="/contact">contact</NuxtLink>
      <NuxtLink to="/domains">the syn.* domains</NuxtLink>
      <a href="/feed.xml">rss</a>
    </div>
    <div class="footer-note">
      <span>◆ syn · 2026 · built in the void</span>
      <span>no analytics · no newsletter · no we</span>
    </div>
  </div>
</template>

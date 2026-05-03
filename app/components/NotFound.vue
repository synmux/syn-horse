<script setup lang="ts">
import { ref, onMounted } from "vue"

// Random 8-hex page-fault address — only generated on the client to
// keep SSR output stable.
const fault = ref<string>("00000000")

onMounted(() => {
  fault.value = Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, "0")
})
</script>

<template>
  <div class="notfound">
    <div class="eyebrow">▶ /this-page-does-not-exist · status 404</div>
    <div class="big">404</div>
    <div class="yell">
      this page <span class="accent">does not exist</span>. never did. go home.
    </div>
    <div class="console">
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> stat /this-route</div>
      <div class="mu">
        → stat: cannot stat '/this-route':
        <span class="danger">no such file or directory</span>
      </div>
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> dmesg | tail</div>
      <div class="mu">→ kernel: page fault at 0x{{ fault }} — request was nonsense</div>
      <div class="mu">→ kernel: i checked. it's not here. it never was.</div>
      <div class="mu">→ kernel: type the url next time. don't trust shortcuts.</div>
      <div>
        <span class="pr">syn@horse</span> <span class="mu">~/$</span>
        <span style="color: var(--paper)">_</span>
      </div>
    </div>
    <div class="actions">
      <NuxtLink to="/" class="btn fx-glitch">← go home</NuxtLink>
      <NuxtLink to="/blog" class="btn fx-glitch">read the blog instead</NuxtLink>
      <NuxtLink to="/domains" class="btn warn fx-glitch">maybe it's on another domain</NuxtLink>
    </div>
  </div>
</template>

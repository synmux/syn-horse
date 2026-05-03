<script setup lang="ts">
import { SITE } from "~/data/site"

const ascii = [
  "   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄",
  "   █                       █",
  "   █   ◆ syn.horse v0.3   █",
  "   █     not for sale     █",
  "   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
].join("\n")
</script>

<template>
  <div class="container wide home unhinged">
    <div class="eyebrow">▶ /home · uptime since 2014 · last reboot: complaint-driven</div>
    <h1>
      <span class="ghost">syn.horse</span>
      <span class="punk">syn.horse</span>
    </h1>
    <pre class="ascii">{{ ascii }}</pre>
    <div class="stamp-grid">
      <div class="stamp">
        <div class="k">◆ name</div>
        <div class="v">syn</div>
      </div>
      <div class="stamp">
        <div class="k">▶ pronouns</div>
        <div class="v">they / them</div>
      </div>
      <div class="stamp">
        <div class="k">※ role</div>
        <div class="v hot">devops</div>
      </div>
      <div class="stamp">
        <div class="k">▓ locale</div>
        <div class="v cool">en_GB</div>
      </div>
      <div class="stamp">
        <div class="k">◯ posts</div>
        <div class="v">17</div>
      </div>
      <div class="stamp">
        <div class="k">✶ projects</div>
        <div class="v hot">8</div>
      </div>
      <div class="stamp">
        <div class="k">◆ domains</div>
        <div class="v cool">5</div>
      </div>
      <div class="stamp">
        <div class="k">▒ newsletter</div>
        <div class="v">no</div>
      </div>
      <div class="stamp">
        <div class="k">░ analytics</div>
        <div class="v">no</div>
      </div>
    </div>
    <div class="strap">
      currently <span class="accent">{{ SITE.status }}</span
      >.
    </div>
    <div class="console-block" style="margin-top: 24px">
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> whoami</div>
      <div class="mu">→ a devops engineer who keeps building blogs instead of sleeping</div>
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> cat /etc/motd</div>
      <div class="mu">→ welcome. read nothing. press buttons.</div>
      <div><span class="pr">syn@horse</span> <span class="mu">~/$</span> ls -la /things</div>
      <div class="mu">drwx— <span class="ok">blog/</span> 17 posts · last touched 2025-09-20</div>
      <div class="mu">drwx— <span class="ok">projects/</span> 8 items · 6 alive</div>
      <div class="mu">drwx— <span class="ok">cv/</span> 4 roles · 5 talks · 4 side things</div>
      <div class="mu">drwx— <span class="ok">domains/</span> 5 of them. don't ask.</div>
      <div>
        <span class="pr">syn@horse</span> <span class="mu">~/$</span>
        <span style="color: var(--paper)">_</span>
      </div>
    </div>
    <div class="grid three" style="margin-top: 32px">
      <NuxtLink to="/blog" class="card fx-glitch">
        <div class="h">cat /blog</div>
        <h3>read the words</h3>
        <p>17 posts. one of them is 24k characters about fish.</p>
        <span class="arrow">→ /blog</span>
      </NuxtLink>
      <NuxtLink to="/cv" class="card fx-glitch">
        <div class="h">cat /cv</div>
        <h3>look at the cv</h3>
        <p>i did the things. they are listed in chronological order.</p>
        <span class="arrow">→ /cv</span>
      </NuxtLink>
      <NuxtLink to="/contact" class="card fx-glitch">
        <div class="h">echo hi</div>
        <h3>say something</h3>
        <p>i will respond. eventually. probably. tone is everything.</p>
        <span class="arrow">→ /contact</span>
      </NuxtLink>
    </div>
    <div class="footer-note" style="margin: 48px 0 0; padding: 14px 0 64px">
      <span>◆ syn · 2026 · this site is held together with vibes and a cloudflare worker</span>
      <span>you got here. you're reading. that's the contract.</span>
    </div>
  </div>
</template>

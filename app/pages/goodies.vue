<script setup lang="ts">
import { computed } from "vue"
import { useKonamiState } from "~/composables/useKonamiState"
import { GOODIES, type Goody, SECRET_GOODIES } from "~/data/goodies"

const { commandsEnabled } = useKonamiState()

// public files always show; secret files only join the list while konami
// mode is active, appended below the honest ones.
type GoodyRow = Goody & { secret: boolean }

const rows = computed<GoodyRow[]>(() => {
  const listed: GoodyRow[] = GOODIES.map((goody) => ({ ...goody, secret: false }))
  const classified: GoodyRow[] = commandsEnabled.value
    ? SECRET_GOODIES.map((goody) => ({ ...goody, secret: true }))
    : []
  return [...listed, ...classified]
})

useSeoMeta({
  title: "goodies",
  description: "files i keep public. take what you want."
})
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /goodies · {{ rows.length }} files · free to a good home</div>
    <h1 class="page-h1">goodies<span class="dot">.</span></h1>
    <p class="lede">
      files i keep public - configs, keys, small artefacts. take what you want; that is rather the point. tarballs are
      compressed using <NuxtLink to="https://facebook.github.io/zstd">Zstandard</NuxtLink>. some files are not listed.
      the correct invocation fixes that.
    </p>
    <TransitionGroup tag="div" name="reveal" class="goody-list">
      <NuxtLink
        v-for="row in rows"
        :key="row.path"
        :to="row.url"
        target="_blank"
        :class="['goody-row', 'fx-glitch', { secret: row.secret }]"
      >
        <span class="goody-path">{{ row.path }}</span>
        <span class="goody-desc">{{ row.desc }}</span>
        <span v-if="row.secret" class="goody-meta">★ {{ row.size }}</span>
        <span v-else class="goody-meta">{{ row.size }} ↗</span>
      </NuxtLink>
    </TransitionGroup>
    <div class="footer-note mt-12">
      <span>◆ served raw from public.syn.horse</span>
      <span>if a file 404s, you were too late. womp womp</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
  color: var(--accent-color, var(--color-hot));
  font-weight: bold;
}
.goody-path {
  font-weight: normal;
}

.goody-desc {
  font-weight: normal;
}
</style>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue"
import { useMagicKeys, whenever, useEventListener } from "@vueuse/core"
import { COMMANDS, type Command } from "~/data/commands"
import { useCommandPalette } from "~/composables/useCommandPalette"
import { SITE } from "~/data/site"

const palette = useCommandPalette()
const inputEl = ref<HTMLInputElement | null>(null)
const sel = ref(0)

const filtered = computed<Command[]>(() => {
  const q = palette.query.value.trim().toLowerCase()
  if (!q) return COMMANDS
  return COMMANDS.filter(
    (c) => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
  )
})

watch(filtered, () => {
  sel.value = 0
})

watch(
  () => palette.isOpen.value,
  (open) => {
    if (open) {
      sel.value = 0
      nextTick(() => inputEl.value?.focus())
    }
  }
)

const keys = useMagicKeys()
whenever(keys["/"], () => {
  if (palette.isOpen.value) return
  const t = document.activeElement as HTMLElement | null
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return
  palette.show()
})

const dispatch = (c: Command) => {
  palette.hide()
  if (c.ext) {
    window.open(c.ext, "_blank", "noopener")
    return
  }
  if (c.id === "404") {
    navigateTo("/this-page-does-not-exist")
    return
  }
  navigateTo(c.id === "home" ? "/" : `/${c.id}`)
}

useEventListener("keydown", (e: KeyboardEvent) => {
  if (!palette.isOpen.value) return
  const len = filtered.value.length
  if (e.key === "Escape") {
    e.preventDefault()
    palette.hide()
  } else if (e.key === "ArrowDown") {
    e.preventDefault()
    if (len > 0) sel.value = Math.min(len - 1, sel.value + 1)
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    if (len > 0) sel.value = Math.max(0, sel.value - 1)
  } else if (e.key === "Enter") {
    e.preventDefault()
    const c = filtered.value[sel.value]
    if (c) dispatch(c)
  }
})
</script>

<template>
  <div v-if="palette.isOpen.value" class="palette-bg" @click.self="palette.hide()">
    <div class="palette" role="dialog" aria-label="command palette">
      <div class="input-wrap">
        <span class="pr">▶</span>
        <input
          ref="inputEl"
          v-model="palette.query.value"
          placeholder="type to navigate. esc to dismiss."
          autocomplete="off"
          spellcheck="false"
        />
        <span class="hint">{{ filtered.length }} results</span>
      </div>
      <div class="results">
        <div
          v-for="(c, i) in filtered"
          :key="c.id"
          :class="['row', i === sel && 'sel']"
          @mouseenter="sel = i"
          @click="dispatch(c)"
        >
          <span class="ic">[{{ c.ic }}]</span>
          <div>
            <div class="label">{{ c.label }}</div>
            <div class="desc">{{ c.desc }}</div>
          </div>
          <span class="ic">↵</span>
        </div>
        <div v-if="filtered.length === 0" class="row" style="color: var(--paper-3)">
          <span class="ic">—</span>
          <div>
            <div class="label">nothing matches.</div>
            <div class="desc">try less.</div>
          </div>
          <span />
        </div>
      </div>
      <div class="footer">
        <span>↑↓ navigate · ↵ open · esc dismiss</span>
        <span>{{ SITE.name }} · {{ SITE.versionShort }}</span>
      </div>
    </div>
  </div>
</template>

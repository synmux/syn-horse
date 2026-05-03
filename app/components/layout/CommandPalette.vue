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
  <div
    v-if="palette.isOpen.value"
    class="fixed inset-0 z-[1000] flex items-start justify-center bg-void/85 pt-[12vh] backdrop-blur-[6px]"
    @click.self="palette.hide()"
  >
    <div
      class="w-[min(560px,90vw)] border border-hot bg-void-2 shadow-glow-palette"
      role="dialog"
      aria-label="command palette"
    >
      <div class="flex items-center gap-2.5 border-b border-void-4 px-4 py-3.5">
        <span class="font-mono text-[14px] text-hot">▶</span>
        <input
          ref="inputEl"
          v-model="palette.query.value"
          class="flex-1 border-0 bg-transparent font-mono text-[14px] text-paper caret-hot outline-0"
          placeholder="type to navigate. esc to dismiss."
          autocomplete="off"
          spellcheck="false"
        />
        <span class="font-mono text-[10px] tracking-[0.14em] text-paper-3">{{ filtered.length }} results</span>
      </div>
      <div class="max-h-[50vh] overflow-y-auto">
        <div
          v-for="(c, i) in filtered"
          :key="c.id"
          :class="[
            'grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-void-3 py-2.5',
            i === sel ? 'border-l-2 border-l-hot bg-void-3 pr-4 pl-3.5' : 'px-4'
          ]"
          @mouseenter="sel = i"
          @click="dispatch(c)"
        >
          <span :class="['font-mono text-[11px] tracking-[0.14em]', i === sel ? 'text-hot' : 'text-paper-3']"
            >[{{ c.ic }}]</span
          >
          <div>
            <div class="font-sans text-[14px] text-paper">{{ c.label }}</div>
            <div class="font-mono text-[11px] tracking-[0.04em] text-paper-3">{{ c.desc }}</div>
          </div>
          <span :class="['font-mono text-[11px] tracking-[0.14em]', i === sel ? 'text-hot' : 'text-paper-3']">↵</span>
        </div>
        <div
          v-if="filtered.length === 0"
          class="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-void-3 px-4 py-2.5 text-paper-3"
        >
          <span class="font-mono text-[11px] tracking-[0.14em] text-paper-3">—</span>
          <div>
            <div class="font-sans text-[14px] text-paper">nothing matches.</div>
            <div class="font-mono text-[11px] tracking-[0.04em] text-paper-3">try less.</div>
          </div>
          <span />
        </div>
      </div>
      <div
        class="flex justify-between border-t border-void-4 px-4 py-2 font-mono text-[10px] tracking-[0.12em] text-paper-3"
      >
        <span>↑↓ navigate · ↵ open · esc dismiss</span>
        <span>{{ SITE.name }} · {{ SITE.versionShort }}</span>
      </div>
    </div>
  </div>
</template>

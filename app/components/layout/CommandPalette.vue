<script setup lang="ts">
import { useEventListener, useMagicKeys, whenever } from "@vueuse/core"
import { computed, nextTick, ref, watch } from "vue"
import { useCommandPalette } from "~/composables/useCommandPalette"
import { useKonamiState } from "~/composables/useKonamiState"
import { useKonamiToast } from "~/composables/useKonamiToast"
import { COMMANDS, type Command, KONAMI_COMMANDS } from "~/data/commands"
import { SITE } from "~/data/site"

const palette = useCommandPalette()
const { commandsEnabled } = useKonamiState()
const { show: showKonamiToast } = useKonamiToast()
const commitHash = useRuntimeConfig().public.commitHash as string
const commitUrl = `${SITE.github}/commit/${commitHash}`
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
const sel = ref(0)

const allCommands = computed<Command[]>(() => (commandsEnabled.value ? [...KONAMI_COMMANDS, ...COMMANDS] : COMMANDS))

const filtered = computed<Command[]>(() => {
  const q = palette.query.value.trim().toLowerCase()
  if (!q) {
    return allCommands.value
  }
  return allCommands.value.filter(
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

watch(sel, async () => {
  await nextTick()
  if (!listEl.value) {
    return
  }
  const row = listEl.value.children.item(sel.value) as HTMLElement | null
  row?.scrollIntoView({ block: "nearest" })
})

const keys = useMagicKeys()
whenever(keys["/"], () => {
  if (palette.isOpen.value) {
    return
  }
  const t = document.activeElement as HTMLElement | null
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) {
    return
  }
  palette.show()
})

const dispatch = (c: Command) => {
  palette.hide()
  if (c.joke) {
    handleJoke(c.joke)
    return
  }
  if (c.ext) {
    window.open(c.ext, "_blank", "noopener")
    return
  }
  navigateTo(c.id === "home" ? "/" : `/${c.id}`)
}

function handleJoke(joke: NonNullable<Command["joke"]>) {
  if (joke.kind === "descend") {
    navigateTo("/void")
    return
  }
  if (joke.kind === "shake-toast") {
    document.body.classList.add("pony-shake")
    window.setTimeout(() => {
      document.body.classList.remove("pony-shake")
    }, 650)
  }
  showKonamiToast(joke.message)
}

useEventListener("keydown", (e: KeyboardEvent) => {
  if (!palette.isOpen.value) {
    return
  }
  const len = filtered.value.length
  if (e.key === "Escape") {
    e.preventDefault()
    palette.hide()
  } else if (e.key === "ArrowDown") {
    e.preventDefault()
    if (len > 0) {
      sel.value = Math.min(len - 1, sel.value + 1)
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    if (len > 0) {
      sel.value = Math.max(0, sel.value - 1)
    }
  } else if (e.key === "Enter") {
    e.preventDefault()
    const c = filtered.value[sel.value]
    if (c) {
      dispatch(c)
    }
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
      <div ref="listEl" class="max-h-[50vh] overflow-y-auto">
        <div
          v-for="(c, i) in filtered"
          :key="c.id"
          :class="['palette-row', c.joke && 'palette-row-joke', i === sel && 'is-selected']"
          @mouseenter="sel = i"
          @click="dispatch(c)"
        >
          <span class="palette-row-icon">[{{ c.ic }}]</span>
          <div>
            <div class="palette-row-label">{{ c.label }}</div>
            <div class="palette-row-desc">{{ c.desc }}</div>
            <div v-if="commandsEnabled && c.konamiNote" class="mt-0.5 font-mono text-[11px] tracking-[0.04em] text-hot">
              ★ {{ c.konamiNote }}
            </div>
          </div>
          <span class="palette-row-arrow">↵</span>
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
        <span
          >{{ SITE.name }}
          ·
          <a :href="commitUrl" class="hover:text-cool">{{ commitHash }}</a></span
        >
      </div>
    </div>
  </div>
</template>

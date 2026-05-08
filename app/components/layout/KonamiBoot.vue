<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const emit = defineEmits<{ done: [] }>()

const LINES = [
  "syn.horse bios v0.3.1 - look upon my ponies, ye mighty, and despair",
  "",
  "cpu: risc architecture (4 hooves, 32 strands) @ 4.20 ghz",
  "",
  "memory test ...................... 64k ok",
  "mounting /dev/horse .............. [ ok ]",
  "adding nonsense .................. [ ok ]",
  "starting sugarlumpd .............. [ ok ]",
  "examining vibes .................. immaculate",
  "",
  "welcome to synux. press any key."
] as const

const FULL_TEXT = LINES.join("\n")
const CHARS_PER_FRAME = 3

const visible = ref(true)
const printed = ref("")
const typingComplete = ref(false)

let rafHandle: number | null = null
let dismissed = false

function cleanupTimers() {
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle)
    rafHandle = null
  }
}

function addInputListeners() {
  window.addEventListener("keydown", onUserInput)
  window.addEventListener("mousedown", onUserInput)
  window.addEventListener("touchstart", onUserInput)
}

function removeInputListeners() {
  window.removeEventListener("keydown", onUserInput)
  window.removeEventListener("mousedown", onUserInput)
  window.removeEventListener("touchstart", onUserInput)
}

function startDismiss() {
  if (dismissed) return
  dismissed = true
  cleanupTimers()
  removeInputListeners()
  document.body.classList.remove("boot-mode")
  visible.value = false
}

function onUserInput() {
  if (typingComplete.value) startDismiss()
}

function onTransitionAfterLeave() {
  emit("done")
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

onMounted(() => {
  document.body.classList.add("boot-mode")

  if (prefersReducedMotion()) {
    printed.value = FULL_TEXT
    typingComplete.value = true
    addInputListeners()
    return
  }

  let position = 0
  const advance = () => {
    if (dismissed) return
    position = Math.min(position + CHARS_PER_FRAME, FULL_TEXT.length)
    printed.value = FULL_TEXT.slice(0, position)
    if (position < FULL_TEXT.length) {
      rafHandle = requestAnimationFrame(advance)
      return
    }
    rafHandle = null
    typingComplete.value = true
    addInputListeners()
  }
  rafHandle = requestAnimationFrame(advance)
})

onBeforeUnmount(() => {
  cleanupTimers()
  removeInputListeners()
  document.body.classList.remove("boot-mode")
})
</script>

<template>
  <Teleport to="body">
    <Transition name="boot-fade" @after-leave="onTransitionAfterLeave">
      <div
        v-if="visible"
        class="fixed inset-0 z-[10000] overflow-hidden bg-black px-6 py-6 sm:px-10 sm:py-10"
        role="dialog"
        aria-modal="true"
        aria-label="boot sequence"
      >
        <span class="sr-only">{{ FULL_TEXT }}</span>
        <pre
          aria-hidden="true"
          class="font-display text-[20px] leading-[1.35] tracking-[0.02em] text-paper whitespace-pre-wrap sm:text-[24px]">{{ printed }}<span v-if="visible" class="boot-cursor">▍</span></pre>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.boot-fade-leave-active {
  transition: opacity 400ms ease;
}
.boot-fade-leave-to {
  opacity: 0;
}

.boot-cursor {
  display: inline-block;
  margin-left: 0.05em;
  animation: boot-cursor-blink 0.85s steps(2) infinite;
}

@keyframes boot-cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .boot-cursor {
    animation: none !important;
  }
}
</style>

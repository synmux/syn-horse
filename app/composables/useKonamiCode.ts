import { ref, onMounted, onUnmounted } from "vue"

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const

export function useKonamiCode(onTrigger: () => void) {
  const buffer = ref<string[]>([])

  const handler = (e: KeyboardEvent) => {
    const next = [...buffer.value, e.key].slice(-SEQUENCE.length)
    buffer.value = next
    if (next.length === SEQUENCE.length && next.every((k, i) => k === SEQUENCE[i])) {
      buffer.value = []
      onTrigger()
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handler)
  })

  onUnmounted(() => {
    window.removeEventListener("keydown", handler)
  })
}

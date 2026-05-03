import { ref, onMounted, onUnmounted } from "vue"
import { useIntervalFn } from "@vueuse/core"

export function useTime() {
  const now = ref<Date | null>(null)
  const bootedAt = ref<number | null>(null)
  const uptimeS = ref<number>(0)

  let pauseFn: (() => void) | null = null

  onMounted(() => {
    const start = Date.now()
    bootedAt.value = start
    now.value = new Date(start)
    const ctl = useIntervalFn(
      () => {
        const t = Date.now()
        now.value = new Date(t)
        uptimeS.value = Math.floor((t - start) / 1000)
      },
      1000,
      { immediate: true },
    )
    pauseFn = ctl.pause
  })

  onUnmounted(() => {
    pauseFn?.()
  })

  return { now, uptimeS }
}

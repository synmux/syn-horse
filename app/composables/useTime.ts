import { onMounted, onUnmounted, ref } from "vue"
import { useIntervalFn } from "@vueuse/core"

export function useTime() {
  const now = ref<Date | null>(null)

  let pauseFn: (() => void) | null = null

  onMounted(() => {
    now.value = new Date()
    const ctl = useIntervalFn(
      () => {
        now.value = new Date()
      },
      1000,
      { immediate: true },
    )
    pauseFn = ctl.pause
  })

  onUnmounted(() => {
    pauseFn?.()
  })

  return { now }
}

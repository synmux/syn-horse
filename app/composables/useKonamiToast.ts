import { ref } from "vue"

export type KonamiToastMessage = { title: string; sub?: string }

const message = ref<KonamiToastMessage | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

export function useKonamiToast() {
  return {
    message,
    show(title: string, sub?: string) {
      message.value = { title, sub }
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        message.value = null
        timer = null
      }, 3200)
    },
  }
}

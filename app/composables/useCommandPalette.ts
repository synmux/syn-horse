import { ref } from "vue"

const isOpen = ref(false)
const query = ref("")

export function useCommandPalette() {
  return {
    isOpen,
    query,
    show: (initialQuery = "") => {
      isOpen.value = true
      query.value = initialQuery
    },
    hide: () => {
      isOpen.value = false
    },
    toggle: () => {
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        query.value = ""
      }
    },
  }
}

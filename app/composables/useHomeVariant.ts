import { computed } from "vue"
import { useRoute } from "vue-router"

export type HomeVariant = "calm" | "feral" | "unhinged"

export function useHomeVariant() {
  const route = useRoute()
  return computed<HomeVariant>(() => {
    const v = route.query.v
    if (v === "feral" || v === "unhinged") return v
    return "calm"
  })
}

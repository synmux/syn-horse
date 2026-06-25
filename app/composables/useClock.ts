import { type ComputedRef, computed, type Ref } from "vue"

export function useClock(now: Ref<Date | null>, timeZone: string): ComputedRef<string> {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  })
  return computed(() => (now.value ? formatter.format(now.value) : ""))
}

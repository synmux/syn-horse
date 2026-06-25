import { ref } from "vue"

const bootHasRun = ref(false)
const commandsEnabled = ref(false)

export function useKonamiState() {
  return { bootHasRun, commandsEnabled }
}

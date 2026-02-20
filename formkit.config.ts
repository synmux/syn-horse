import { defineFormKitConfig } from "@formkit/vue"
import { createProPlugin, inputs } from "@formkit/pro"
import { useRuntimeConfig } from "nuxt/app"
import { genesisIcons } from "@formkit/icons"

export default defineFormKitConfig(() => {
  // here we can access `useRuntimeConfig` because
  // our function will be called by Nuxt.
  const config = useRuntimeConfig()

  const proPlugin = createProPlugin(config.formkitProKey as string, { ...inputs })

  return {
    icons: {
      ...genesisIcons,
    },
    plugins: [proPlugin],
  }
})

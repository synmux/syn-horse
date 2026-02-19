// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  ignores: ["worker-configuration.d.ts", ".agents/**", ".claude/**", ".data/**", ".gemini/**"]
})

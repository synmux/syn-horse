import Components from "unplugin-vue-components/vite"
import RekaResolver from "reka-ui/resolver"

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        RekaResolver()

        // RekaResolver({
        //   prefix: '' // use the prefix option to add Prefix to the imported components
        // })
      ]
    })
  ]
})

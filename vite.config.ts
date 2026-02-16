import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  experimental: {
    enableNativePlugin: true
  },
  build:{
    minify: false,
    rolldownOptions:{
      experimental:{
        viteMode: false,
      },
      optimization:{
        inlineConst: true
      }
    }
  }
})

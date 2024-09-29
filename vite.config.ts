// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'MySimplePackage',
      fileName: (format) => `cs-simple-image-compress.${format}.ts`,
      formats: ['es']  // 仅输出 ESM 格式
    }
  }
})
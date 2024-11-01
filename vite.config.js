import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 配置别名
const resolve = (dir) => path.resolve(__dirname, dir)

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
})

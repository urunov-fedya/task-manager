import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/shared/ui'),
      '@lib': path.resolve(__dirname, './src/shared/lib'),
      '@types': path.resolve(__dirname, './src/shared/types'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@api': path.resolve(__dirname, './src/shared/api'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
    },
  },
})

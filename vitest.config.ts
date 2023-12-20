import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue() as any],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./tests/setupVitest.ts'],
    alias: {
      '~/': new URL('./', import.meta.url).pathname,
      '@/': new URL('./', import.meta.url).pathname,
    },
  },
})

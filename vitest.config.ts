import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [vue() as any, tsconfigPaths()],
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

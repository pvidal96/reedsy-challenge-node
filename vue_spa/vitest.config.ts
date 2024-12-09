import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [vue(), jsx()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    deps: {
      inline: ['vue', '@vue/compat'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

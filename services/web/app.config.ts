import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    compatibilityDate: '2024-09-29',
    preset: 'cloudflare-pages',
    rollupConfig: {
      external: ['node:async_hooks'],
    },
  },
  vite: {
    plugins: [
      // @ts-expect-error vite types in vinxi
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})

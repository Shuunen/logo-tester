import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { uniqueMark } from './src/plugins/unique-mark.ts'

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    reportCompressedSize: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'react-dom', test: /react-dom/ }],
        },
      },
    },
  },
  plugins: [react(), tailwindcss(), uniqueMark()],
  // dedicated ports, so apps never collide when running together
  preview: { port: 4106, strictPort: true },
  server: { port: 5106, strictPort: true },
  test: {
    coverage: {
      exclude: ['src/bin/lint.rules.ts', 'src/main.tsx'],
      provider: 'v8' as const,
    },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    reporters: ['dot'],
    silent: true,
  },
})

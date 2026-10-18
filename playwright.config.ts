import { defineConfig, devices } from '@playwright/test'

const e2ePort = 5199

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  fullyParallel: true,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium-headless-shell' } }],
  reporter: './e2e/summary-reporter.ts',
  testDir: './e2e',
  use: { baseURL: `http://localhost:${e2ePort}` },
  webServer: {
    command: `pnpm run dev --port ${e2ePort}`,
    reuseExistingServer: !process.env.CI,
    url: `http://localhost:${e2ePort}`,
  },
})

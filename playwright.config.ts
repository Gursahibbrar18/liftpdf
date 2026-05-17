import { defineConfig, devices } from "@playwright/test";

const localBaseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5899";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  reporter: [["list"], ["html", { outputFolder: "tests/report", open: "never" }]],

  use: {
    baseURL: localBaseURL,
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
  },

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- -p 5899 -H 127.0.0.1",
        url: localBaseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

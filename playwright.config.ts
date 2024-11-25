import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 360000,
  use: {
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
  expect: {
    timeout: 30000,
  },
});

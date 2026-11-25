import { defineConfig, devices } from '@playwright/test';
import { site } from './site.config.js';

const port = Number(process.env.PORT ?? 4173);

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: `http://localhost:${port}${site.basePath}/`,
		trace: 'on-first-retry'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'node scripts/serve.mjs',
		url: `http://localhost:${port}${site.basePath}/`,
		reuseExistingServer: true,
		timeout: 30_000
	}
});

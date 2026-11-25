import { expect, test } from '@playwright/test';
import { PAGES } from './pages';

test.describe('pages render', () => {
	for (const path of [...PAGES, 'does-not-exist/']) {
		test(`/${path}`, async ({ page }) => {
			const problems: string[] = [];
			const is404 = path === 'does-not-exist/';
			// The 404 document itself makes the browser log one "404" line; real subresource failures are caught below.
			page.on(
				'console',
				(m) =>
					m.type() === 'error' &&
					!(is404 && /status of 404/.test(m.text())) &&
					problems.push(`console: ${m.text()}`)
			);
			page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
			page.on('requestfailed', (r) => problems.push(`failed: ${r.url()} ${r.failure()?.errorText}`));
			page.on('response', (r) => {
				if (r.status() >= 400 && r.url() !== new URL(path, test.info().project.use.baseURL).href)
					problems.push(`status ${r.status()}: ${r.url()}`);
			});
			const res = await page.goto(path);
			expect(res?.status()).toBe(path === 'does-not-exist/' ? 404 : 200);
			await expect(page.locator('h1').first()).toBeVisible();
			expect(await page.title()).not.toBe('');
			// The 404 page is noindex and has no canonical URL.
			await expect(page.locator('link[rel="canonical"]')).toHaveCount(path === 'does-not-exist/' ? 0 : 1);
			await page.waitForLoadState('networkidle');
			expect(problems).toEqual([]);
		});
	}
});

test('copy button copies the quick start command', async ({ page, context }) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('');
	const btn = page.locator('[data-copy="hero-cmd"]');
	await btn.click();
	await expect(btn.locator('[data-copy-label]')).toHaveText('Copied');
	const clip = await page.evaluate(() => navigator.clipboard.readText());
	expect(clip).toContain('PROFILE=quickstart ./install.sh');
});

test('theme toggle sets data-theme, persists and toggles the icon', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('');
	const html = page.locator('html');
	const toggle = page.locator('[data-theme-toggle]');
	const sun = toggle.locator('.ic-sun');
	const moon = toggle.locator('.ic-moon');
	await expect(moon).toBeVisible();
	await expect(sun).toBeHidden();
	await toggle.click();
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await expect(sun).toBeVisible();
	await expect(moon).toBeHidden();
	await page.reload();
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await expect(sun).toBeVisible();
	await page.locator('[data-theme-toggle]').click();
	await expect(html).toHaveAttribute('data-theme', 'light');
	await expect(moon).toBeVisible();
});

test.describe('small screens', () => {
	test.use({ viewport: { width: 360, height: 740 } });

	for (const path of PAGES) {
		test(`no horizontal scroll on /${path}`, async ({ page }) => {
			await page.goto(path);
			await page.waitForLoadState('networkidle');
			const width = await page.evaluate(() => document.documentElement.scrollWidth);
			expect(width).toBeLessThanOrEqual(360);
		});
	}

	test('mobile menu opens', async ({ page }) => {
		await page.goto('');
		const menu = page.locator('#mobile-menu');
		await expect(menu).toBeHidden();
		await page.locator('[data-menu-toggle]').click();
		await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'true');
		await expect(menu).toBeVisible();
		await expect(menu.getByRole('link').first()).toBeVisible();
	});
});

test('reduced motion stops the diagram dots', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('');
	const dots = page.locator('.rp-svg .dot');
	const n = await dots.count();
	expect(n).toBeGreaterThan(0);
	for (let i = 0; i < n; i++) {
		const s = await dots.nth(i).evaluate((el) => {
			const cs = getComputedStyle(el);
			return {
				display: cs.display,
				visibility: cs.visibility,
				opacity: cs.opacity,
				animation: cs.animationName
			};
		});
		const hidden = s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0';
		expect(hidden || s.animation === 'none').toBe(true);
	}
});

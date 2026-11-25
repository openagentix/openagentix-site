import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PAGES } from './pages';

for (const scheme of ['light', 'dark'] as const) {
	test.describe(`axe, ${scheme}`, () => {
		test.use({ colorScheme: scheme });
		for (const path of [...PAGES, 'does-not-exist/']) {
			test(`/${path}`, async ({ page }) => {
				await page.goto(path);
				await page.evaluate(async () => {
					for (let y = 0; y < document.body.scrollHeight; y += 400) {
						window.scrollTo(0, y);
						await new Promise((r) => setTimeout(r, 40));
					}
					window.scrollTo(0, 0);
				});
				await page.waitForLoadState('networkidle');
				const { violations } = await new AxeBuilder({ page })
					.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
					.analyze();
				expect(
					violations.map((v) => `${v.id}: ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)
				).toEqual([]);
			});
		}
	});
}

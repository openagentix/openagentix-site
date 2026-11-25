// Captures real screenshots of the OpenAgentix web console in demo mode, for the marketing site.
//
// 1. Start the console in demo mode (from a checkout of openagentix, after services/console/build-web.sh):
//      cd services/console && ./build-web.sh && go build -o /tmp/console-bin ./cmd/console
//      CONSOLE_DEV_FAKE=1 CONSOLE_ADDR=127.0.0.1:8137 /tmp/console-bin
//    Capture within a minute or two of starting it: relative times in the demo data move.
// 2. From this repo:  node scripts/capture-screenshots.mjs
//
// Env: CONSOLE_URL (http://127.0.0.1:8137), CONSOLE_TOKEN (demo-token), OUT_DIR (static/img/console),
//      ONLY (comma list of views to capture, default all).
// Output per view and theme: <view>-<theme>.{png,webp,avif}, 2000 px wide, raw pixels without a frame.
// Needs cwebp, avifenc and magick on PATH (brew install webp libavif imagemagick).
// The console keeps its token in tab memory only, so every context signs in through the form and then moves between
// pages by clicking links (a reload would sign out).
import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const URL_ = process.env.CONSOLE_URL ?? 'http://127.0.0.1:8137';
const TOKEN = process.env.CONSOLE_TOKEN ?? 'demo-token';
const OUT = process.env.OUT_DIR ?? 'static/img/console';
const ONLY = process.env.ONLY?.split(',');
const WIDTH = 1440;
const OUT_W = 2000;
mkdirSync(OUT, { recursive: true });

const sidebar = (href) => async (page) => {
	await page.locator(`a[href="${href}"]`).first().click();
	await page.waitForURL(`**${href}`);
};

// Each view: css height of the capture, how to get there from the signed-in overview, and what must be visible.
const views = [
	{ name: 'overview', height: 1100, go: async () => {}, ready: 'text=Security posture' },
	{ name: 'agents', height: 760, go: sidebar('/agents'), ready: 'text=researcher' },
	{
		name: 'builder',
		height: 1400,
		ready: 'text=Model and capabilities',
		go: async (page) => {
			await sidebar('/agents')(page);
			await page.getByRole('link', { name: 'researcher', exact: true }).first().click();
		}
	},
	{
		name: 'refused',
		height: 1000,
		ready: 'text=Refused',
		go: async (page) => {
			await sidebar('/agents')(page);
			await page.getByRole('link', { name: 'cve-triage', exact: true }).first().click();
		}
	},
	{ name: 'costs', height: 760, go: sidebar('/costs'), ready: 'h1' },
	{
		name: 'traces',
		height: 730,
		ready: 'ul.waterfall button.wf',
		go: async (page) => {
			await sidebar('/traces')(page);
			await page.locator('button.linkbtn').first().click();
		}
	},
	{ name: 'governance', height: 780, go: sidebar('/governance'), ready: 'h1' }
];

const sh = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' });

function encode(raw, base) {
	const png = `${base}.png`;
	sh('magick', [raw, '-resize', `${OUT_W}x`, '-strip', '-define', 'png:compression-level=9', png]);
	try {
		sh('pngquant', ['--force', '--quality=80-95', '--output', png, png]);
	} catch {
		/* pngquant optional */
	}
	sh('cwebp', ['-q', '82', '-quiet', png, '-o', `${base}.webp`]);
	sh('avifenc', ['--min', '25', '--max', '40', '-s', '4', png, `${base}.avif`]);
}

const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
	const ctx = await browser.newContext({
		viewport: { width: WIDTH, height: 900 },
		deviceScaleFactor: 2,
		colorScheme: theme,
		reducedMotion: 'reduce',
		bypassCSP: true
	});
	await ctx.addInitScript((t) => {
		try {
			localStorage.setItem('oa-theme', t);
		} catch {
			// ignore
		}
	}, theme);
	const page = await ctx.newPage();
	await page.goto(URL_ + '/');
	await page.getByLabel('Console token').fill(TOKEN);
	await page.getByRole('button', { name: /sign in/i }).click();
	await page.waitForSelector('text=Security posture');
	await page.addStyleTag({
		content:
			'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'
	});
	for (const v of views) {
		if (ONLY && !ONLY.includes(v.name)) continue;
		await v.go(page);
		await page.setViewportSize({ width: WIDTH, height: v.height });
		await page.locator(v.ready).first().waitFor({ state: 'visible', timeout: 15000 });
		await page.waitForLoadState('networkidle');
		await page.evaluate(() => document.fonts.ready);
		await page.mouse.move(WIDTH - 5, 5);
		await page.waitForTimeout(800);
		await page.evaluate(() => window.scrollTo(0, 0));
		const raw = join(OUT, `.raw-${v.name}-${theme}.png`);
		await page.screenshot({ path: raw });
		if ((await page.content()).includes(TOKEN)) throw new Error(`token visible in DOM of ${v.name}`);
		encode(raw, join(OUT, `${v.name}-${theme}`));
		rmSync(raw);
		console.log('captured', v.name, theme);
		await sidebar('/')(page).catch(() => page.locator('a[href="/"]').first().click());
		await page.waitForSelector('text=Security posture');
	}
	await ctx.close();
}
await browser.close();

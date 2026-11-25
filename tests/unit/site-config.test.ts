import { describe, expect, it } from 'vitest';
import { resolveSite } from '../../site.config.js';

describe('resolveSite', () => {
	it('uses the GitHub Pages defaults', () => {
		const s = resolveSite({});
		expect(s.siteUrl).toBe('https://openagentix.github.io/openagentix-site');
		expect(s.basePath).toBe('/openagentix-site');
		expect(s.cname).toBe('');
		expect(s.docsUrl).toBe('https://openagentix.github.io/openagentix');
	});

	it('gives an empty base path and a cname for a custom domain', () => {
		const s = resolveSite({ SITE_URL: 'https://openagentix.org' });
		expect(s.basePath).toBe('');
		expect(s.cname).toBe('openagentix.org');
		expect(s.origin).toBe('https://openagentix.org');
	});

	it('lets BASE_PATH override the path of SITE_URL', () => {
		const s = resolveSite({ SITE_URL: 'https://example.com/x', BASE_PATH: '/site' });
		expect(s.basePath).toBe('/site');
	});

	it('strips trailing slashes', () => {
		const s = resolveSite({
			SITE_URL: 'https://openagentix.org///',
			BASE_PATH: '/site//',
			DOCS_URL: 'https://d.example/docs/'
		});
		expect(s.siteUrl).toBe('https://openagentix.org');
		expect(s.basePath).toBe('/site');
		expect(s.docsUrl).toBe('https://d.example/docs');
	});

	it('treats a lone slash as an empty base path', () => {
		expect(resolveSite({ SITE_URL: 'https://openagentix.org', BASE_PATH: '/' }).basePath).toBe('');
	});

	it('writes no cname for a github.io SITE_URL', () => {
		expect(resolveSite({ SITE_URL: 'https://someone.github.io/repo' }).cname).toBe('');
	});

	it('overrides the docs URL', () => {
		expect(resolveSite({ DOCS_URL: 'https://docs.example.org' }).docsUrl).toBe('https://docs.example.org');
	});

	it('treats empty variables as not set', () => {
		const s = resolveSite({ SITE_URL: '', BASE_PATH: '', DOCS_URL: '' });
		expect(s.siteUrl).toBe('https://openagentix.github.io/openagentix-site');
		expect(s.basePath).toBe('/openagentix-site');
		expect(s.docsUrl).toBe('https://openagentix.github.io/openagentix');
	});

	it('treats an empty BASE_PATH as not set with a custom domain', () => {
		const s = resolveSite({ SITE_URL: 'https://openagentix.org', BASE_PATH: '' });
		expect(s.basePath).toBe('');
		expect(s.cname).toBe('openagentix.org');
	});
});

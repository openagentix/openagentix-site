import { describe, expect, it } from 'vitest';
import { canonical, docs, repoFile, SITE } from '../../src/lib/config';

describe('canonical', () => {
	it('builds the home URL', () => {
		expect(canonical('/')).toBe(`${SITE.siteUrl}/`);
	});
	it('adds a trailing slash and normalises slashes', () => {
		expect(canonical('/features')).toBe(`${SITE.siteUrl}/features/`);
		expect(canonical('features/')).toBe(`${SITE.siteUrl}/features/`);
		expect(canonical('//roadmap//')).toBe(`${SITE.siteUrl}/roadmap/`);
	});
});

describe('link helpers', () => {
	it('builds docs and repo links', () => {
		expect(docs('a/b')).toBe(`${SITE.docsUrl}/a/b`);
		expect(docs()).toBe(`${SITE.docsUrl}/`);
		expect(repoFile('SECURITY.md')).toBe(`${SITE.repoUrl}/blob/main/SECURITY.md`);
	});
});

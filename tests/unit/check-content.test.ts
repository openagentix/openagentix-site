import { describe, expect, it } from 'vitest';
import { checkContent } from '../../scripts/check-content.mjs';

const page = (body: string, head = '') => `<html><head>${head}</head><body>${body}</body></html>`;

describe('checkContent', () => {
	it('passes clean content', () => {
		expect(
			checkContent(page('<p>Run it on your own cluster.</p>', '<script src="/site.js"></script>'))
		).toEqual([]);
	});
	it('flags em dashes in text and attributes', () => {
		expect(checkContent(page('<p>one — two</p>'))).toHaveLength(1);
		expect(checkContent(page('<img alt="a — b">'))).toHaveLength(1);
	});
	it('flags hype words case-insensitively as whole words', () => {
		expect(checkContent(page('<p>Seamless and Cutting-Edge</p>')).length).toBe(2);
		expect(checkContent(page('<p>We Leverage it</p>'))).toHaveLength(1);
		expect(checkContent(page('<meta name="description" content="A game changer">'))).toHaveLength(1);
	});
	it('does not flag words that only contain a banned word', () => {
		expect(checkContent(page('<p>unlocked leverages leveraged</p>'))).toEqual([]);
	});
	it('flags email addresses', () => {
		expect(checkContent(page('<p>mail me@example.com</p>'))).toHaveLength(1);
		expect(checkContent('contact: a.b@ex.org', { isHtml: false })).toHaveLength(1);
	});
	it('flags scripts from other origins but not relative ones', () => {
		expect(checkContent(page('', '<script src="https://cdn.example.com/x.js"></script>'))).toHaveLength(1);
		expect(checkContent(page('', '<script src="//cdn.example.com/x.js"></script>'))).toHaveLength(1);
		expect(checkContent(page('', '<script src="/openagentix-site/site.js"></script>'))).toEqual([]);
	});
	it('flags trackers and cookies', () => {
		expect(checkContent(page('<script>document.cookie = "a=b"</script>')).length).toBeGreaterThan(0);
		expect(checkContent(page('', '<script>gtag("x")</script>')).length).toBeGreaterThan(0);
		expect(checkContent('see plausible.io', { isHtml: false })).toHaveLength(1);
	});
	it('ignores banned words inside script and style blocks', () => {
		expect(checkContent(page('<style>.seamless{}</style><script>var leverage=1</script>'))).toEqual([]);
	});
});

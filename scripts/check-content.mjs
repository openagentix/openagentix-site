// Content gate for the built site. Usage: node scripts/check-content.mjs <dir>
// Fails on em dashes, hype words, email addresses, third-party scripts and trackers.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const BANNED_WORDS = [
	'revolutionary',
	'seamless',
	'seamlessly',
	'blazing',
	'blazing-fast',
	'game-changing',
	'game changer',
	'unlock',
	'unlocks',
	'supercharge',
	'supercharged',
	'enterprise-grade',
	'cutting-edge',
	'next-generation',
	'world-class',
	'best-in-class',
	'effortless',
	'effortlessly',
	'magical',
	'leverage'
];
export const TRACKERS = [
	'google-analytics',
	'googletagmanager',
	'gtag(',
	'plausible',
	'segment.com',
	'hotjar',
	'document.cookie'
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WORD_RE = new RegExp(`(?<![\\w-])(?:${BANNED_WORDS.map(escape).join('|')})(?![\\w-])`, 'gi');
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const SCRIPT_SRC_RE = /<script\b[^>]*?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

/** Text a reader or crawler sees: tags stripped, attribute values kept. */
export function visibleText(html) {
	const attrs = [];
	html.replace(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, (_m, name, a, b) => {
		if (/^(alt|title|aria-label|aria-description|content|placeholder|value)$/i.test(name)) attrs.push(a ?? b);
		return '';
	});
	const body = html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]*>/g, ' ');
	return `${body}\n${attrs.join('\n')}`;
}

/** Returns a list of problems found in one file. */
export function checkContent(text, { isHtml = true } = {}) {
	const problems = [];
	const prose = isHtml ? visibleText(text) : text;
	if (prose.includes('—')) problems.push('em dash (U+2014)');
	for (const m of prose.matchAll(WORD_RE)) problems.push(`banned word "${m[0]}"`);
	for (const m of prose.matchAll(EMAIL_RE)) problems.push(`email-like address "${m[0]}"`);
	if (isHtml) {
		for (const m of text.matchAll(SCRIPT_SRC_RE)) {
			const src = (m[1] ?? m[2] ?? m[3] ?? '').trim();
			if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(src) || /^[a-z][a-z0-9+.-]*:/i.test(src))
				problems.push(`script from another origin "${src}"`);
		}
	}
	const lower = text.toLowerCase();
	for (const t of TRACKERS) if (lower.includes(t)) problems.push(`tracker or cookie use "${t}"`);
	return problems;
}

function* walk(dir) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) yield* walk(p);
		else yield p;
	}
}

function main(dir) {
	let files = 0;
	let failures = 0;
	for (const file of walk(dir)) {
		const isHtml = file.endsWith('.html');
		if (!isHtml && !file.endsWith('llms.txt')) continue;
		files++;
		for (const p of checkContent(readFileSync(file, 'utf8'), { isHtml })) {
			failures++;
			console.error(`${file}: ${p}`);
		}
	}
	console.log(`check-content: ${files} files, ${failures} problems`);
	if (!files) {
		console.error('no files found, did you build?');
		process.exit(1);
	}
	if (failures) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const dir = process.argv[2];
	if (!dir) {
		console.error('usage: node scripts/check-content.mjs <dir>');
		process.exit(2);
	}
	main(dir);
}

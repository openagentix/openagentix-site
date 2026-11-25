// Link checker for the built site. Usage: node scripts/check-links.mjs <dir> [--external]
// Internal links must resolve to a file in <dir> (and #fragments to an id in the target page): failures exit 1.
// External links are only reported, never fail the run.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../site.config.js';

const base = site.basePath;
const siteOrigin = site.origin;

export function extractRefs(html) {
	const refs = [];
	for (const m of html.matchAll(/\s(href|src|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
		const name = m[1].toLowerCase();
		const value = (m[2] ?? m[3]).replace(/&amp;/g, '&');
		if (name === 'srcset') {
			for (const part of value.split(',')) {
				const u = part.trim().split(/\s+/)[0];
				if (u) refs.push(u);
			}
		} else refs.push(value);
	}
	return refs;
}

export function extractIds(html) {
	return new Set(
		[...html.matchAll(/\s(?:id|name)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map((m) => m[1] ?? m[2])
	);
}

/** Classify a ref found in the file at urlPath (e.g. /openagentix-site/features/). */
export function classify(ref, fromPath) {
	if (/^(mailto:|tel:|data:|javascript:)/i.test(ref)) return { kind: 'skip' };
	if (ref.startsWith('//')) ref = `https:${ref}`;
	if (/^https?:\/\//i.test(ref)) {
		const u = new URL(ref);
		if (u.origin === siteOrigin && (u.pathname === base || u.pathname.startsWith(`${base}/`)))
			return { kind: 'internal', path: u.pathname, hash: u.hash.slice(1) };
		return { kind: 'external', url: ref.split('#')[0] };
	}
	const u = new URL(ref, `http://x${fromPath}`);
	return { kind: 'internal', path: u.pathname, hash: u.hash.slice(1) };
}

function* walk(dir) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) yield* walk(p);
		else yield p;
	}
}

function resolveFile(dir, urlPath) {
	let rel = decodeURIComponent(urlPath);
	if (base) {
		if (rel !== base && !rel.startsWith(`${base}/`)) return null;
		rel = rel.slice(base.length);
	}
	const file = join(dir, rel);
	if (existsSync(file) && statSync(file).isDirectory()) {
		const idx = join(file, 'index.html');
		return existsSync(idx) ? idx : null;
	}
	return existsSync(file) ? file : null;
}

async function checkExternal(url) {
	const attempt = async (method) => {
		const ctl = new AbortController();
		const t = setTimeout(() => ctl.abort(), 10000);
		try {
			return await fetch(url, {
				method,
				redirect: 'follow',
				signal: ctl.signal,
				headers: { 'user-agent': 'openagentix-site-linkcheck' }
			});
		} finally {
			clearTimeout(t);
		}
	};
	try {
		let res = await attempt('HEAD');
		if (res.status === 405 || res.status === 403 || res.status === 404) res = await attempt('GET');
		return res.status < 400 ? null : `HTTP ${res.status}`;
	} catch (e) {
		return e.name === 'AbortError' ? 'timeout after 10 s' : String(e.cause?.code ?? e.message);
	}
}

async function main(dir, external) {
	const htmlFiles = [...walk(dir)].filter((f) => f.endsWith('.html'));
	const idCache = new Map();
	const idsOf = (file) => {
		if (!idCache.has(file)) idCache.set(file, extractIds(readFileSync(file, 'utf8')));
		return idCache.get(file);
	};
	const externals = new Map();
	let checked = 0;
	const broken = [];
	for (const file of htmlFiles) {
		const rel = file.slice(dir.length).replace(/\\/g, '/').replace(/^\/?/, '/');
		const fromPath = `${base}${rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel}`;
		for (const ref of extractRefs(readFileSync(file, 'utf8'))) {
			const c = classify(ref, fromPath);
			if (c.kind === 'skip') continue;
			if (c.kind === 'external') {
				if (!externals.has(c.url)) externals.set(c.url, file);
				continue;
			}
			checked++;
			if (c.path === fromPath && !c.hash) continue;
			const target = resolveFile(dir, c.path);
			if (!target) {
				broken.push(`${file}: ${ref} (no such file)`);
				continue;
			}
			if (c.hash && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(c.hash)))
				broken.push(`${file}: ${ref} (no element with id "${c.hash}")`);
		}
	}
	for (const b of broken) console.error(b);
	console.log(`check-links: ${htmlFiles.length} pages, ${checked} internal links, ${broken.length} broken`);
	console.log(`check-links: ${externals.size} unique external links`);
	if (external) {
		const urls = [...externals.keys()];
		const failed = [];
		let i = 0;
		await Promise.all(
			Array.from({ length: 8 }, async () => {
				while (i < urls.length) {
					const u = urls[i++];
					const err = await checkExternal(u);
					if (err) failed.push(`${u}: ${err} (first seen in ${externals.get(u)})`);
				}
			})
		);
		for (const f of failed) console.warn(`external failure: ${f}`);
		console.log(
			`check-links: external ${urls.length - failed.length} ok, ${failed.length} failed (reported only)`
		);
	}
	if (broken.length) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const args = process.argv.slice(2);
	const dir = args.find((a) => !a.startsWith('--'));
	if (!dir) {
		console.error('usage: node scripts/check-links.mjs <dir> [--external]');
		process.exit(2);
	}
	await main(dir.replace(/\/+$/, ''), args.includes('--external'));
}

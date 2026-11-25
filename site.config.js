// One place for every URL the site depends on. Read at build time only.
// SITE_URL   full public address of the site, with its base path if it has one.
// BASE_PATH  path the site is served under ("" for a custom domain).
// DOCS_URL   address of the documentation site.

const PAGES_URL = 'https://openagentix.github.io/openagentix-site';

/** @param {Record<string, string | undefined>} env */
export function resolveSite(env) {
	const rawSite = (env.SITE_URL ?? '').trim().replace(/\/+$/, '');
	const siteUrl = rawSite || PAGES_URL;
	const parsed = new URL(siteUrl);
	// An empty BASE_PATH counts as not set (GitHub passes empty strings for unset variables).
	const rawBase = (env.BASE_PATH ?? '').trim();
	const basePath = (rawBase || parsed.pathname).replace(/\/+$/, '');
	const host = parsed.hostname;
	return {
		siteUrl,
		origin: parsed.origin,
		basePath: basePath === '/' ? '' : basePath,
		// A CNAME file is written only when SITE_URL names a custom domain.
		cname: rawSite && !host.endsWith('.github.io') ? host : '',
		docsUrl: (env.DOCS_URL ?? '').trim().replace(/\/+$/, '') || 'https://openagentix.github.io/openagentix',
		repoUrl: 'https://github.com/openagentix/openagentix',
		siteRepoUrl: 'https://github.com/openagentix/openagentix-site'
	};
}

export const site = resolveSite(process.env);

import { site } from '../../site.config.js';

export const SITE = site;
export const DOCS = site.docsUrl;
export const REPO = site.repoUrl;

/** Absolute URL of a docs page, for example docs('features/model-gateway'). */
export function docs(path = ''): string {
	return path ? `${DOCS}/${path.replace(/^\/+/, '')}` : `${DOCS}/`;
}

/** Link to a file on the main branch of the main repository. */
export function repoFile(path: string): string {
	return `${REPO}/blob/main/${path}`;
}

/** Canonical absolute URL for a route path such as '/features/'. */
export function canonical(path: string): string {
	const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
	return `${site.siteUrl}${clean === '/' ? '/' : clean}`;
}

export const QUICKSTART = [
	'git clone https://github.com/openagentix/openagentix',
	'cd openagentix',
	'PROFILE=quickstart ./install.sh'
] as const;

export const ASK = 'hack/ask.sh quickstart "Look up known vulnerabilities of lodash 4.17.20 (npm)"';

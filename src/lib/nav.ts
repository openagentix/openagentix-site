import { asset, resolve } from '$app/paths';

type RouteId = '/' | '/features' | '/sovereign-ai' | '/open-source' | '/roadmap';

/** Link to a page of this site, with the base path and a trailing slash. */
export function page(id: RouteId, hash = ''): string {
	const path = resolve(id).replace(/\/+$/, '');
	return `${path}/${hash ? `#${hash}` : ''}`;
}

/** Link to a file in static/, with the base path. */
export function file(path: string): string {
	return asset(path as Parameters<typeof asset>[0]);
}

export const NAV: { id: RouteId; label: string }[] = [
	{ id: '/features', label: 'Features' },
	{ id: '/sovereign-ai', label: 'Sovereign AI' },
	{ id: '/open-source', label: 'Open source' },
	{ id: '/roadmap', label: 'Roadmap' }
];

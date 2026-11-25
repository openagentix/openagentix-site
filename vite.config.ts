import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { site } from './site.config.js';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', strict: true }),
			compilerOptions: { runes: true },
			paths: { base: site.basePath as '' | `/${string}`, relative: false },
			prerender: { handleHttpError: 'fail', handleMissingId: 'fail', entries: ['*', '/404'] }
		})
	],
	test: { include: ['tests/unit/**/*.test.ts'], environment: 'node' }
});

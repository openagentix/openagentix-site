// Serves build/ under the configured base path, the way GitHub Pages does:
// directory index.html, and build/404.html with status 404 for unknown paths.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { site } from '../site.config.js';

const root = 'build';
const port = Number(process.env.PORT ?? 4173);
const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.woff2': 'font/woff2',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml'
};

createServer((req, res) => {
	const url = new URL(req.url ?? '/', 'http://x');
	let path = decodeURIComponent(url.pathname);
	if (site.basePath && path === site.basePath) {
		res.writeHead(301, { location: `${site.basePath}/` }).end();
		return;
	}
	if (site.basePath && !path.startsWith(`${site.basePath}/`)) path = '/__none__';
	else path = path.slice(site.basePath.length);
	let file = normalize(join(root, path));
	if (!file.startsWith(root)) file = join(root, '__none__');
	if (existsSync(file) && statSync(file).isDirectory()) {
		if (!path.endsWith('/')) {
			res.writeHead(301, { location: `${url.pathname}/` }).end();
			return;
		}
		file = join(file, 'index.html');
	}
	if (!existsSync(file)) {
		res.writeHead(404, { 'content-type': types['.html'] });
		createReadStream(join(root, '404.html')).pipe(res);
		return;
	}
	res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
	createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${root} at http://localhost:${port}${site.basePath}/`));

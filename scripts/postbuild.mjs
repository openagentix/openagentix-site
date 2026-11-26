// Writes sitemap.xml, robots.txt, llms.txt and (only for a custom domain) CNAME into build/.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { site } from '../site.config.js';

const dir = process.argv[2] ?? 'build';

function htmlFiles(d) {
	return readdirSync(d).flatMap((n) => {
		const p = join(d, n);
		return statSync(p).isDirectory() ? htmlFiles(p) : n.endsWith('.html') ? [p] : [];
	});
}

const pages = htmlFiles(dir)
	.map((f) => relative(dir, f).replace(/\\/g, '/'))
	.filter((f) => f !== '404.html')
	.map((f) => (f === 'index.html' ? '/' : `/${f.replace(/index\.html$/, '')}`))
	.sort();

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
	join(dir, 'sitemap.xml'),
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
		.map((p) => `  <url><loc>${site.siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`)
		.join('\n')}\n</urlset>\n`
);

writeFileSync(join(dir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

writeFileSync(
	join(dir, 'llms.txt'),
	`# OpenAgentix

> OpenAgentix is an open-source (Apache-2.0) control plane for running AI agents on Kubernetes under the rules a platform team sets. Each agent gets its own model gateway key and token budget, sees only the tools in an approved tool profile, and reaches only the outbound hosts it is allowed. Callers are checked by an A2A gate that writes an audit line per request. Memory, knowledge, traces and metrics stay in the cluster; calls to a hosted model provider leave it, a model you host does not.

Status: early project with one maintainer. Not production ready. Proven on a single-node kind cluster, and the keyless quick start in CI on hosted runners on kind and k3s (first answer about 5 minutes after the start of the install, 301 to 320 s on kind). Not run on a managed cloud, OpenShift, several nodes or under load. Agents run on kagent with Agent Substrate (gVisor sandboxes). Bring your own A2A agent (a digest-pinned container speaking A2A 1.0) is proven in CI on kind only, off by default. Release signing is unproven until a real tag runs.

Quick start (needs docker, kind, kubectl, helm, jq, the Python yq, openssl, curl, python3):

    git clone https://github.com/openagentix/openagentix && cd openagentix
    PROFILE=quickstart ./install.sh

## Site

- [Home](${site.siteUrl}/): what OpenAgentix is, the problem, how it works, quick start
- [Features](${site.siteUrl}/features/): every part and how it was proven
- [Sovereign AI](${site.siteUrl}/sovereign-ai/): what stays in your cluster and what leaves
- [Open source](${site.siteUrl}/open-source/): licence, governance, standards, the projects it is built with
- [Roadmap](${site.siteUrl}/roadmap/): now, next, later

## Docs

- [Documentation](${site.docsUrl}/)
- [Why OpenAgentix](${site.docsUrl}/guide/why)
- [Concepts](${site.docsUrl}/guide/concepts)
- [FAQ](${site.docsUrl}/guide/faq)
- [What works](${site.docsUrl}/what-works): the strict record of what is proven
- [Quick start](${site.docsUrl}/features/quick-start)

## Source

- [Repository](${site.repoUrl})
- [Governance](${site.repoUrl}/blob/main/GOVERNANCE.md)
- [Third-party components](${site.repoUrl}/blob/main/THIRD-PARTY.md)
`
);

if (site.cname) writeFileSync(join(dir, 'CNAME'), `${site.cname}\n`);
console.log(`postbuild: ${pages.length} pages in sitemap${site.cname ? `, CNAME ${site.cname}` : ''}`);

<script lang="ts">
	import { DOCS, REPO, SITE, docs, repoFile } from '#lib/config';
	import { NAV, page } from '#lib/nav';
	import Logo from './Logo.svelte';
</script>

<footer class="ftr">
	<div class="wrap grid">
		<div class="brand">
			<Logo />
			<p>
				An open-source control plane for running AI agents on Kubernetes, under the rules your platform team
				sets.
			</p>
			<p class="small">
				Apache-2.0. OpenAgentix is not affiliated with the projects it is built with. Their names belong to
				their owners.
			</p>
		</div>
		<nav aria-label="Site">
			<h2>Site</h2>
			<ul>
				<li><a href={page('/')}>Home</a></li>
				{#each NAV as item (item.id)}<li><a href={page(item.id)}>{item.label}</a></li>{/each}
			</ul>
		</nav>
		<nav aria-label="Documentation">
			<h2>Docs</h2>
			<ul>
				<li><a href={`${DOCS}/`}>Documentation</a></li>
				<li><a href={docs('features/quick-start')}>Quick start</a></li>
				<li><a href={docs('what-works')}>What works</a></li>
				<li><a href={docs('guide/faq')}>FAQ</a></li>
			</ul>
		</nav>
		<nav aria-label="Community">
			<h2>Community</h2>
			<ul>
				<li><a href={REPO}>GitHub</a></li>
				<li><a href={`${REPO}/discussions`}>Discussions</a></li>
				<li><a href={repoFile('CONTRIBUTING.md')}>Contributing</a></li>
				<li><a href={repoFile('SECURITY.md')}>Security</a></li>
				<li><a href={SITE.siteRepoUrl}>Source of this site</a></li>
			</ul>
		</nav>
	</div>
	<div class="wrap legal">
		<p>No cookies, no analytics, no tracking on this site.</p>
	</div>
</footer>

<style>
	.ftr {
		border-top: 1px solid var(--c-border);
		background: var(--c-surface);
		padding-block: 3.5rem 2rem;
		font-size: 0.9375rem;
	}
	.grid {
		display: grid;
		gap: 2.5rem;
		grid-template-columns: 1fr 1fr;
	}
	.brand {
		grid-column: 1 / -1;
		max-width: 26rem;
	}
	.brand p {
		color: var(--c-text-2);
		margin-top: 1rem;
	}
	.small {
		font-size: 0.8125rem;
		color: var(--c-text-3) !important;
	}
	h2 {
		font-size: 0.8125rem;
		font-family: var(--font-mono);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--c-text-3);
		margin-bottom: 0.75rem;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.5rem;
	}
	a {
		color: var(--c-text-2);
		text-decoration: none;
	}
	a:hover {
		color: var(--c-accent);
		text-decoration: underline;
	}
	.legal {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--c-border);
		color: var(--c-text-3);
		font-size: 0.8125rem;
	}
	@media (min-width: 800px) {
		.grid {
			grid-template-columns: 2fr 1fr 1fr 1fr;
		}
		.brand {
			grid-column: auto;
		}
	}
</style>

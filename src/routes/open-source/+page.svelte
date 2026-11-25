<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { REPO, repoFile } from '#lib/config';
	import { jsonldBreadcrumb } from '#lib/data/seo';
	import { TECH } from '#lib/data/tech';
	import { page } from '#lib/nav';

	const standards = [
		{ name: 'MCP', full: 'Model Context Protocol', use: 'for tools', url: 'https://modelcontextprotocol.io' },
		{ name: 'A2A', full: 'Agent2Agent protocol', use: 'for calling agents', url: 'https://a2a-protocol.org' },
		{ name: 'OTel', full: 'OpenTelemetry', use: 'for traces and metrics', url: 'https://opentelemetry.io' },
		{ name: 'K8s', full: 'Kubernetes resources', use: 'for agents and policy', url: 'https://kubernetes.io' }
	];
</script>

<Seo
	title="Open source"
	description="OpenAgentix is Apache-2.0, vendor-neutral and built on open standards (MCP, A2A, OpenTelemetry) and established cloud-native projects. How it is governed, what it is built with, and how to contribute."
	path="/open-source/"
	jsonld={[jsonldBreadcrumb('Open source', '/open-source/')]}
/>

<PageHero eyebrow="Open source" title="Open code, open standards, open decisions.">
	<p>
		OpenAgentix is Apache-2.0. It is built on established open-source projects, speaks open standards, and is
		run by written rules that keep it vendor-neutral.
	</p>
</PageHero>

<section class="section">
	<div class="wrap three">
		<div class="card box">
			<Icon name="scale" />
			<h2>Licence</h2>
			<p>
				The code is under the <a href={repoFile('LICENSE')}>Apache License 2.0</a>. Every upstream component
				and its licence is listed in <a href={repoFile('THIRD-PARTY.md')}>THIRD-PARTY.md</a>, with how each
				licence was checked.
			</p>
		</div>
		<div class="card box">
			<Icon name="users" />
			<h2>Governance</h2>
			<p>
				<a href={repoFile('GOVERNANCE.md')}>GOVERNANCE.md</a> says how decisions are made: lazy consensus on pull
				requests and decision records, and a vote of the maintainers when that fails. The roadmap is decided in
				the open, no feature may depend on a commercial product, and security is never held back.
			</p>
		</div>
		<div class="card box">
			<Icon name="heart" />
			<h2>One maintainer, for now</h2>
			<p>
				Today the project has one maintainer. The governance rules say how new maintainers join, and the
				project is looking for maintainers from other organisations.
			</p>
		</div>
	</div>
</section>

<section class="section section-alt" aria-labelledby="std-title">
	<div class="wrap">
		<h2 id="std-title" class="h-section">Open standards</h2>
		<p class="lede intro">
			Agents, tools and telemetry use open protocols, so the parts you add do not tie you to this project.
		</p>
		<ul class="std">
			{#each standards as s (s.name)}
				<li class="card">
					<span class="abbr">{s.name}</span>
					<h3><a href={s.url}>{s.full}</a></h3>
					<p>{s.use}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section" aria-labelledby="built-with">
	<div class="wrap">
		<h2 id="built-with" class="h-section">Built with</h2>
		<p class="lede intro">
			OpenAgentix runs these projects behind adapters and adds the policy, the keys, the gate and the console.
			The aim is that replacing one needs a new adapter, not a change to your agent definitions. Today each
			part has one adapter.
		</p>
		<ul class="tech">
			{#each TECH as t (t.name)}
				<li class="card">
					<div class="t-top">
						<h3><a href={t.url}>{t.name}</a></h3>
						<span class="tags">
							{#if t.foundation}<span class="tag">{t.foundation}</span>{/if}
							<span class="tag">{t.licence}</span>
						</span>
					</div>
					<dl>
						<dt>What it is</dt>
						<dd>{t.what}</dd>
						<dt>What OpenAgentix uses it for</dt>
						<dd>{t.use}</dd>
					</dl>
				</li>
			{/each}
		</ul>
		<p class="fine">
			"Built with" means OpenAgentix installs or uses these projects. It does not mean they endorse, sponsor
			or are affiliated with OpenAgentix. Names belong to their owners. Foundations are named only where the
			project's own page says so, as read on 2026-11-25.
		</p>
	</div>
</section>

<section class="section section-alt" aria-labelledby="contrib-title">
	<div class="wrap two">
		<div>
			<h2 id="contrib-title" class="h-section">Contribute</h2>
			<p class="lede intro">You do not need a cluster or a model key to contribute code, tests or docs.</p>
			<ul class="plain">
				<li>
					Good first areas: documentation, tests, an adapter for another observability stack, vector store or
					notification target.
				</li>
				<li>Have a Slack workspace? Testing the Slack path helps a lot.</li>
				<li>
					Every commit is signed off with the Developer Certificate of Origin (<code>git commit -s</code>).
				</li>
				<li>
					Everyone follows the <a href={repoFile('CODE_OF_CONDUCT.md')}>Code of Conduct</a> (Contributor Covenant
					2.1).
				</li>
			</ul>
			<div class="ctas">
				<a class="btn btn-primary" href={repoFile('CONTRIBUTING.md')}>
					Read CONTRIBUTING.md <Icon name="arrow" />
				</a>
				<a class="btn btn-secondary" href={`${REPO}/discussions`}>Ask in Discussions</a>
			</div>
		</div>
		<div class="card sec" id="security">
			<Icon name="lock" />
			<h2>Report a security issue</h2>
			<p>
				Do not report a vulnerability in a public issue, pull request or discussion. Use GitHub private
				vulnerability reporting on the repository. Only the maintainers can read the report.
			</p>
			<a href={repoFile('SECURITY.md')}>Read the security policy <Icon name="arrow" /></a>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap cta">
		<h2 class="h-section">Read the code, then run it.</h2>
		<div class="ctas center">
			<a class="btn btn-primary" href={page('/', 'quick-start')}>Try the quick start <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={REPO}>Star on GitHub</a>
		</div>
	</div>
</section>

<style>
	.three,
	.std,
	.tech {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
	}
	.std,
	.tech {
		list-style: none;
		padding: 0;
		margin: 2rem 0 0;
	}
	.tech {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
	}
	.box,
	.std li,
	.tech li,
	.sec {
		padding: 1.5rem;
		color: var(--c-accent);
	}
	.box h2,
	.sec h2 {
		font-size: 1.25rem;
		margin: 0.875rem 0 0.5rem;
		color: var(--c-text-1);
	}
	.box p,
	.std p,
	.sec p,
	dd {
		color: var(--c-text-2);
		font-size: 0.9375rem;
	}
	.intro {
		margin-top: 1rem;
		max-width: 46rem;
	}
	.abbr {
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 0.875rem;
		background: var(--c-accent-soft);
		border-radius: 6px;
		padding: 0.125rem 0.5rem;
	}
	.std h3 {
		font-size: 1.0625rem;
		margin: 0.875rem 0 0.25rem;
	}
	.std h3 a,
	.tech h3 a {
		color: var(--c-text-1);
		text-decoration: none;
	}
	.std h3 a:hover,
	.tech h3 a:hover {
		color: var(--c-accent);
		text-decoration: underline;
	}
	.t-top {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		align-items: baseline;
	}
	.tech h3 {
		font-size: 1.125rem;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	.tag {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--c-text-3);
		border: 1px solid var(--c-border);
		border-radius: 6px;
		padding: 0.0625rem 0.375rem;
	}
	dl {
		margin: 0.875rem 0 0;
		display: grid;
		gap: 0.25rem;
	}
	dt {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--c-text-3);
		margin-top: 0.5rem;
	}
	dd {
		margin: 0;
	}
	.fine {
		margin-top: 1.5rem;
		font-size: 0.875rem;
		color: var(--c-text-3);
		max-width: 52rem;
	}
	.two {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 960px) {
		.two {
			grid-template-columns: 1.4fr 1fr;
			gap: 4rem;
			align-items: start;
		}
	}
	.plain {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0;
		display: grid;
		gap: 0.625rem;
	}
	.plain li {
		position: relative;
		padding-left: 1.25rem;
		color: var(--c-text-2);
	}
	.plain li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background: var(--c-accent);
	}
	.plain code {
		font-size: 0.85em;
		background: var(--c-sunken);
		border: 1px solid var(--c-border);
		padding: 0.05em 0.35em;
		border-radius: 5px;
	}
	.sec a {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-weight: 600;
		margin-top: 1rem;
		text-decoration: none;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}
	.ctas.center {
		justify-content: center;
	}
	.cta {
		text-align: center;
	}
</style>

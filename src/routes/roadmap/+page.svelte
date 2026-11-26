<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { REPO, docs, repoFile } from '#lib/config';
	import { jsonldBreadcrumb } from '#lib/data/seo';

	const stages = [
		{
			when: 'Now',
			rel: 'on main',
			items: [
				'Control plane: AgentDefinition, platform policy, admission policies',
				'Web console with the agent builder (API proven live, UI tested in demo mode)',
				'Quick start with no model key and no chat token, proven in CI on kind and k3s',
				'Bring your own A2A agent (a digest-pinned container), proven in CI on kind, off by default',
				'Model gateway, tool gateway and profiles, egress per agent, A2A gate',
				'Memory, knowledge base, knowledge graph, webhooks, schedules, cost and traces'
			]
		},
		{
			when: 'Next',
			rel: '0.3',
			items: [
				'Bring your own agent beyond CI: a registry pull and egress allowlists for container agents',
				'Control plane and console proven on a cluster',
				'Install on a managed cloud, and the OpenShift manifests run on OpenShift (both tested offline only today)',
				'AgentAccess and Schedule resources'
			]
		},
		{
			when: 'Then',
			rel: '0.4',
			items: [
				'Slack channel proven on a real workspace',
				'Agent runs and human approval for chosen tool calls',
				'Identity per agent and token exchange, adopted from existing open-source projects',
				'Console sign-in with OpenID Connect, and a runtime conformance suite'
			]
		},
		{
			when: 'Later',
			rel: '0.5 and on',
			items: [
				'Workspaces, long steps, budgets per run, queueing and delegation',
				'Postponed until users ask: editing models and tools from the console, a skill registry, a model router, Microsoft Teams, several clusters, air-gap'
			]
		}
	];
</script>

<Seo
	title="Roadmap"
	description="What OpenAgentix has now, and what is planned next: the control plane proven on a cluster and a managed cloud install in 0.3, identity and human approval in 0.4. Plans can change; the decision records say why."
	path="/roadmap/"
	jsonld={[jsonldBreadcrumb('Roadmap', '/roadmap/')]}
/>

<PageHero eyebrow="Roadmap" title="One focus: governed agent runs for platform teams.">
	<p>
		The first goal is adoption: an install that works in minutes on the clusters people have, with or without
		a paid model key. Less is promised, and what is promised is proven. Everything below "Now" is a plan, not
		a feature.
	</p>
</PageHero>

<section class="section">
	<div class="wrap">
		<ol class="timeline">
			{#each stages as s, i (s.when)}
				<li class:now={i === 0}>
					<div class="when">
						<h2>{s.when}</h2>
						<span class="chip {i === 0 ? 'chip-ready' : 'chip-accent'}">{s.rel}</span>
					</div>
					<ul>
						{#each s.items as it (it)}<li>{it}</li>{/each}
					</ul>
				</li>
			{/each}
		</ol>
		<p class="fine">
			Source: the <a href={repoFile('docs/roadmap.md')}>roadmap</a> and
			<a href={docs('decisions/focus-and-runtime-neutrality')}>decision record 0013</a>. Each release is a
			<a href={`${REPO}/milestones`}>milestone</a> on GitHub, and its issues are the backlog.
		</p>
	</div>
</section>

<section class="section section-alt">
	<div class="wrap cta">
		<h2 class="h-section">Shape what comes next.</h2>
		<p class="lede">Tell us what you would need to run it at work.</p>
		<div class="ctas">
			<a class="btn btn-primary" href={`${REPO}/discussions`}>Join the discussion <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={`${REPO}/milestones`}>See the milestones</a>
		</div>
	</div>
</section>

<style>
	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0;
		position: relative;
	}
	.timeline > li {
		display: grid;
		gap: 1rem;
		padding: 2rem 0 2rem 2rem;
		border-left: 2px solid var(--c-border);
		position: relative;
	}
	.timeline > li::before {
		content: '';
		position: absolute;
		left: -9px;
		top: 2.4rem;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--c-surface);
		border: 2px solid var(--c-accent);
	}
	.timeline > li.now::before {
		background: var(--c-ready);
		border-color: var(--c-ready);
	}
	.when {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.when h2 {
		font-size: 1.5rem;
	}
	.timeline ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.625rem;
		max-width: 46rem;
	}
	.timeline ul li {
		position: relative;
		padding-left: 1.25rem;
		color: var(--c-text-2);
	}
	.timeline ul li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background: var(--c-accent);
	}
	@media (min-width: 900px) {
		.timeline > li {
			grid-template-columns: 12rem 1fr;
			gap: 2rem;
		}
	}
	.fine {
		margin-top: 2rem;
		font-size: 0.875rem;
		color: var(--c-text-3);
	}
	.cta {
		text-align: center;
	}
	.cta .lede {
		margin-top: 0.75rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
</style>

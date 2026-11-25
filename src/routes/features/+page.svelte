<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Shot from '#lib/components/Shot.svelte';
	import { docs } from '#lib/config';
	import { FEATURES } from '#lib/data/features';
	import { jsonldBreadcrumb } from '#lib/data/seo';
	import { SHOTS } from '#lib/data/shots';
	import { page } from '#lib/nav';

	const shotFor: Record<string, string> = {
		'control-plane': 'refused',
		console: 'builder',
		observability: 'traces',
		'model-gateway': 'costs'
	};
</script>

<Seo
	title="Features"
	description="Every part of OpenAgentix and how it was proven: agents as Kubernetes resources, model and tool gateways, egress control, the A2A gate, sandboxes, memory, knowledge, channels, cost and traces."
	path="/features/"
	jsonld={[jsonldBreadcrumb('Features', '/features/')]}
/>

<PageHero eyebrow="Features" title="Every part, and how it was proven.">
	<p>
		Each feature below says what it does, what was run to prove it, and where to read the record. Nothing here
		was tested at scale or under load. The full status is in <a href={docs('what-works')}>what works</a>.
	</p>
</PageHero>

<nav class="wrap toc" aria-label="Features on this page">
	<ul>
		{#each FEATURES as f (f.id)}<li><a href="#{f.id}">{f.title}</a></li>{/each}
	</ul>
</nav>

<div class="wrap list">
	{#each FEATURES as f, i (f.id)}
		<section class="feat" aria-labelledby="{f.id}-h" id={f.id}>
			<div class="meta">
				<span class="f-icon"><Icon name={f.icon} /></span>
				<span class="chip {f.status.startsWith('Proven') ? 'chip-ready' : 'chip-pending'}">{f.status}</span>
			</div>
			<div class="body">
				<h2 id="{f.id}-h">{f.title}</h2>
				<p class="short">{f.short}</p>
				<ul class="points">
					{#each f.points as p (p)}<li>{p}</li>{/each}
				</ul>
				<div class="proof">
					<p class="proof-h">Proven how</p>
					<p>{f.proof}</p>
					<a href={docs(f.doc)}>Read the record in the docs <Icon name="arrow" /></a>
				</div>
				{#if shotFor[f.id] && SHOTS[shotFor[f.id] ?? '']}
					{@const s = SHOTS[shotFor[f.id] ?? '']}
					{#if s}
						<figure class="fshot">
							<Shot shot={s} eager={i === 0} sizes="(min-width: 960px) 760px, 100vw" />
							<figcaption>{s.caption} Screenshot with demo data.</figcaption>
						</figure>
					{/if}
				{/if}
			</div>
		</section>
	{/each}
</div>

<section class="section section-alt">
	<div class="wrap cta">
		<h2 class="h-section">Run it and check for yourself.</h2>
		<div class="ctas">
			<a class="btn btn-primary" href={page('/', 'quick-start')}>Try the quick start <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={page('/open-source', 'built-with')}>What it is built with</a>
		</div>
	</div>
</section>

<style>
	.toc {
		padding-block: 2rem 0;
	}
	.toc ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.toc a {
		display: inline-block;
		font-size: 0.875rem;
		padding: 0.375rem 0.75rem;
		border-radius: 999px;
		border: 1px solid var(--c-border);
		background: var(--c-surface);
		color: var(--c-text-2);
		text-decoration: none;
	}
	.toc a:hover {
		border-color: var(--c-accent);
		color: var(--c-accent);
	}
	.list {
		padding-block: 1rem 4rem;
	}
	.feat {
		display: grid;
		gap: 1rem;
		padding-block: 3rem;
		border-bottom: 1px solid var(--c-border);
	}
	.feat:last-child {
		border-bottom: 0;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		align-content: start;
	}
	.f-icon {
		display: inline-grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 10px;
		background: var(--c-accent-soft);
		color: var(--c-accent);
	}
	.body {
		min-width: 0;
		max-width: 48rem;
	}
	h2 {
		font-size: clamp(1.5rem, 2.8vw, 2rem);
	}
	.short {
		margin-top: 0.75rem;
		font-size: 1.125rem;
		color: var(--c-text-2);
	}
	.points {
		list-style: none;
		padding: 0;
		margin: 1.25rem 0 0;
		display: grid;
		gap: 0.625rem;
	}
	.points li {
		position: relative;
		padding-left: 1.5rem;
	}
	.points li::before {
		content: '';
		position: absolute;
		left: 0.25rem;
		top: 0.7em;
		width: 7px;
		height: 7px;
		border-radius: 2px;
		background: var(--c-accent);
	}
	.proof {
		margin-top: 1.5rem;
		padding: 1.125rem 1.25rem;
		border-radius: 12px;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-left: 3px solid var(--c-ready);
		display: grid;
		gap: 0.5rem;
	}
	.proof-h {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--c-ready);
	}
	.proof a {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-weight: 600;
		text-decoration: none;
	}
	.proof a:hover {
		text-decoration: underline;
	}
	.fshot {
		margin: 2rem 0 0;
	}
	.fshot figcaption {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: var(--c-text-3);
	}
	@media (min-width: 960px) {
		.feat {
			grid-template-columns: 14rem 1fr;
			gap: 3rem;
		}
		.meta {
			flex-direction: column;
			align-items: flex-start;
		}
	}
	.cta {
		text-align: center;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
</style>

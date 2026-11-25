<script lang="ts">
	import { page as current } from '$app/state';
	import { DOCS, REPO } from '#lib/config';
	import { NAV, page } from '#lib/nav';
	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';

	const isCurrent = (id: string) => current.route.id === id;
</script>

<header class="hdr">
	<div class="wrap row">
		<a class="home" href={page('/')} aria-label="OpenAgentix home"><Logo /></a>
		<nav aria-label="Main" class="main-nav">
			<ul>
				{#each NAV as item (item.id)}
					<li>
						<a href={page(item.id)} aria-current={isCurrent(item.id) ? 'page' : undefined}>{item.label}</a>
					</li>
				{/each}
				<li><a href={`${DOCS}/`}>Docs</a></li>
			</ul>
		</nav>
		<div class="actions">
			<a class="gh" href={REPO} aria-label="OpenAgentix on GitHub">
				<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
				<span class="gh-label">GitHub</span>
			</a>
			<button type="button" class="tbtn" data-theme-toggle aria-label="Switch theme" aria-pressed="false">
				<Icon name="moon" class="icon ic-moon" />
				<Icon name="sun" class="icon ic-sun" />
			</button>
			<a class="btn btn-primary cta" href={page('/', 'quick-start')}>Try the quick start</a>
			<button
				type="button"
				class="tbtn menu-btn"
				data-menu-toggle
				aria-expanded="false"
				aria-controls="mobile-menu"
				aria-label="Menu"
			>
				<Icon name="menu" />
			</button>
		</div>
	</div>
	<nav id="mobile-menu" class="mobile" aria-label="Main, small screens" hidden>
		<ul class="wrap">
			{#each NAV as item (item.id)}
				<li>
					<a href={page(item.id)} aria-current={isCurrent(item.id) ? 'page' : undefined}>{item.label}</a>
				</li>
			{/each}
			<li><a href={`${DOCS}/`}>Docs</a></li>
			<li><a href={REPO}>GitHub</a></li>
			<li><a class="btn btn-primary" href={page('/', 'quick-start')}>Try the quick start</a></li>
		</ul>
	</nav>
</header>

<style>
	.hdr {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--c-page) 86%, transparent);
		backdrop-filter: saturate(1.4) blur(12px);
		-webkit-backdrop-filter: saturate(1.4) blur(12px);
		border-bottom: 1px solid var(--c-border);
	}
	.row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		height: 4rem;
	}
	.home {
		text-decoration: none;
		flex: none;
	}
	.main-nav {
		display: none;
		flex: 1;
	}
	.main-nav ul {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.main-nav a,
	.mobile a:not(.btn) {
		color: var(--c-text-2);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9375rem;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
	}
	.main-nav a:hover,
	.mobile a:not(.btn):hover {
		color: var(--c-text-1);
		background: var(--c-sunken);
	}
	.main-nav a[aria-current='page'],
	.mobile a[aria-current='page'] {
		color: var(--c-accent);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-left: auto;
	}
	.gh {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--c-text-2);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9375rem;
		padding: 0.5rem;
		border-radius: 8px;
	}
	.gh:hover {
		color: var(--c-text-1);
	}
	.gh-label,
	.cta {
		display: none;
	}
	.tbtn {
		display: inline-grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 10px;
		border: 1px solid var(--c-border);
		background: var(--c-surface);
		color: var(--c-text-2);
		cursor: pointer;
	}
	.tbtn:hover {
		color: var(--c-text-1);
		border-color: var(--c-border-strong);
	}
	.tbtn :global(.ic-sun) {
		display: none;
	}
	:global(:root[data-theme='dark']) .tbtn :global(.ic-sun) {
		display: block;
	}
	:global(:root[data-theme='dark']) .tbtn :global(.ic-moon) {
		display: none;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .tbtn :global(.ic-sun) {
			display: block;
		}
		:global(:root:not([data-theme='light'])) .tbtn :global(.ic-moon) {
			display: none;
		}
	}
	.mobile {
		border-top: 1px solid var(--c-border);
		background: var(--c-page);
	}
	.mobile ul {
		list-style: none;
		display: grid;
		gap: 0.25rem;
		padding-block: 0.75rem 1rem;
		margin: 0 auto;
	}
	.mobile a {
		display: block;
	}
	.mobile .btn {
		margin-top: 0.5rem;
		display: flex;
	}
	@media (min-width: 640px) {
		.gh-label {
			display: inline;
		}
	}
	@media (min-width: 960px) {
		.main-nav,
		.cta {
			display: flex;
		}
		.menu-btn,
		.mobile {
			display: none !important;
		}
	}
	@media (min-width: 960px) and (max-width: 1100px) {
		.gh-label {
			display: none;
		}
	}
</style>

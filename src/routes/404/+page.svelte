<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { DOCS } from '#lib/config';
	import { page } from '#lib/nav';
</script>

<svelte:head>
	<title>Page not found | OpenAgentix</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="section">
	<div class="wrap nf">
		<p class="eyebrow">404</p>
		<h1 class="h-display">This page is not here.</h1>
		<p class="lede">The address may be old or mistyped. These pages are a good place to start.</p>
		<div class="ctas">
			<a class="btn btn-primary" href={page('/')}>Go to the home page <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={page('/features')}>Features</a>
			<a class="btn btn-secondary" href={`${DOCS}/`}>Documentation</a>
		</div>
	</div>
</section>

<style>
	.nf {
		max-width: 44rem;
		padding-block: 4rem;
	}
	h1 {
		margin-top: 0.875rem;
	}
	.lede {
		margin-top: 1rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}
</style>

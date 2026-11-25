<script lang="ts">
	import { SITE, canonical } from '#lib/config';

	let {
		title,
		description,
		path,
		jsonld = []
	}: { title: string; description: string; path: string; jsonld?: object[] } = $props();

	const url = $derived(canonical(path));
	const image = `${SITE.siteUrl}/og.png`;
	const fullTitle = $derived(path === '/' ? title : `${title} | OpenAgentix`);
	const ld = $derived(
		jsonld.length
			? JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonld }).replace(/</g, '\\u003c')
			: ''
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="OpenAgentix" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="OpenAgentix: governed AI agents on your own Kubernetes clusters" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{#if ld}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD built from our own constants -->
		{@html '<script type="application/ld+json">' + ld + '</' + 'script>'}
	{/if}
</svelte:head>

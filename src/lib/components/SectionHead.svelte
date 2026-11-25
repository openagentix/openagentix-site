<script lang="ts">
	let {
		eyebrow,
		title,
		id,
		center = false,
		children
	}: {
		eyebrow?: string;
		title: string;
		id?: string;
		center?: boolean;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<div class="head" class:center>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<h2 class="h-section" {id}>{title}</h2>
	{#if children}<div class="lede">{@render children()}</div>{/if}
</div>

<style>
	.head {
		max-width: 46rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}
	.head.center {
		margin-inline: auto;
		text-align: center;
	}
	.eyebrow {
		margin-bottom: 0.75rem;
	}
	.lede {
		margin-top: 1rem;
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { eyebrow, title, children }: { eyebrow: string; title: string; children?: Snippet } = $props();
</script>

<section class="ph grid-bg">
	<div class="wrap">
		<p class="eyebrow">{eyebrow}</p>
		<h1 class="h-display">{title}</h1>
		{#if children}<div class="lede">{@render children()}</div>{/if}
	</div>
</section>

<style>
	.ph {
		padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2.5rem, 5vw, 4rem);
		border-bottom: 1px solid var(--c-border);
	}
	.ph h1 {
		max-width: 52rem;
		margin-top: 0.875rem;
		font-size: clamp(2.125rem, 5vw, 3.5rem);
	}
	.lede {
		margin-top: 1.25rem;
		max-width: 44rem;
	}
	.lede :global(p + p) {
		margin-top: 0.75rem;
	}
</style>

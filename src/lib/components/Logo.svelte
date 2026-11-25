<script lang="ts">
	let { size = 28 }: { size?: number } = $props();
</script>

<span class="logo">
	<svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
		<rect width="32" height="32" rx="8" fill="var(--c-accent)" />
		<g fill="var(--c-on-accent)">
			<circle cx="8.5" cy="16" r="3.6" />
			<circle cx="23.5" cy="16" r="3.6" />
		</g>
		<path d="M12 16h8M16 10.5v11" stroke="var(--c-on-accent)" stroke-width="2.4" stroke-linecap="round" />
	</svg>
	<span class="word"><span class="open">Open</span><b>Agentix</b></span>
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 1.1875rem;
		letter-spacing: -0.01em;
	}
	.open {
		color: var(--c-text-2);
		font-weight: 500;
	}
	b {
		color: var(--c-text-1);
		font-weight: 650;
	}
</style>

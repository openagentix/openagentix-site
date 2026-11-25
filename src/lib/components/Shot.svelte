<script lang="ts">
	import { file } from '#lib/nav';
	import type { Shot } from '#lib/data/shots';

	let {
		shot,
		eager = false,
		sizes = '(min-width: 1200px) 1150px, 100vw'
	}: { shot: Shot; eager?: boolean; sizes?: string } = $props();

	const src = (theme: string, ext: string) => file(`/img/console/${shot.name}-${theme}.${ext}`);
</script>

<div class="frame">
	<div class="chrome" aria-hidden="true">
		<span class="dots"><i></i><i></i><i></i></span>
		<span class="url">127.0.0.1:8080 · OpenAgentix console</span>
	</div>
	{#each ['light', 'dark'] as theme (theme)}
		<picture class={theme === 'light' ? 'theme-light-only' : 'theme-dark-only'}>
			<source type="image/avif" srcset={src(theme, 'avif')} {sizes} />
			<source type="image/webp" srcset={src(theme, 'webp')} {sizes} />
			<img
				src={src(theme, 'png')}
				alt={shot.alt}
				width={shot.w}
				height={shot.h}
				loading={eager ? 'eager' : 'lazy'}
				decoding="async"
				fetchpriority={eager && theme === 'light' ? 'high' : undefined}
			/>
		</picture>
	{/each}
</div>

<style>
	.frame {
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--c-border-strong);
		background: var(--c-surface);
		box-shadow: var(--shadow-lg);
	}
	.chrome {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		height: 2.25rem;
		padding-inline: 0.875rem;
		background: var(--c-sunken);
		border-bottom: 1px solid var(--c-border);
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--c-border-strong);
	}
	.url {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--c-text-3);
		background: var(--c-surface);
		border: 1px solid var(--c-border);
		border-radius: 6px;
		padding: 0.125rem 0.75rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
	}
	img {
		display: block;
		width: 100%;
		height: auto;
	}
</style>

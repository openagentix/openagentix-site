<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		id,
		lines,
		label = 'Terminal',
		comments = []
	}: { id: string; lines: readonly string[]; label?: string; comments?: readonly string[] } = $props();
</script>

<div class="code">
	<div class="bar">
		<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
		<span class="label">{label}</span>
		<button type="button" class="copy" data-copy={id} aria-describedby="{id}-status">
			<Icon name="copy" class="ci" />
			<span data-copy-label>Copy</span>
		</button>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre {id} tabindex="0" data-text={lines.join('\n')}><code
			>{#each lines as line, i (i)}<span class="line"
					><span class="prompt" aria-hidden="true">$ </span>{line}{#if comments[i]}<span class="cm"
							>{'  '}# {comments[i]}</span
						>{/if}</span
				>{/each}</code
		></pre>
	<span id="{id}-status" class="sr-only" role="status" aria-live="polite"></span>
</div>

<style>
	.code {
		background: var(--c-code-bg);
		color: var(--c-code-text);
		border-radius: 14px;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		text-align: left;
		min-width: 0;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.5rem 0.5rem 0.875rem;
		border-bottom: 1px solid rgb(255 255 255 / 0.08);
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.18);
	}
	.label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--c-code-dim);
		flex: 1;
	}
	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font: 600 0.8125rem var(--font-sans);
		color: var(--c-code-text);
		background: rgb(255 255 255 / 0.08);
		border: 1px solid rgb(255 255 255 / 0.14);
		border-radius: 8px;
		padding: 0.375rem 0.75rem;
		min-height: 2.25rem;
		cursor: pointer;
	}
	.copy:hover {
		background: rgb(255 255 255 / 0.14);
	}
	.copy :global(.ci) {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
	}
	.copy:global([data-copied='true']) {
		color: #71d59d;
		border-color: #71d59d;
	}
	.copy:focus-visible {
		outline-color: #5db8db;
	}
	pre {
		margin: 0;
		padding: 1rem 1.125rem 1.125rem;
		font-size: 0.875rem;
		line-height: 1.75;
		overflow-x: auto;
	}
	.line {
		display: block;
		white-space: pre;
	}
	.prompt {
		color: #5db8db;
		user-select: none;
	}
	.cm {
		color: var(--c-code-dim);
	}
</style>

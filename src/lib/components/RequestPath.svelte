<script lang="ts">
	type Node = { x: number; y: number; t: string; s: string; kind?: 'agent' | 'outside' | 'deny' | 'quiet' };
	const W = 120;
	const H = 56;
	const nodes: Node[] = [
		{ x: 164, y: 36, t: 'AgentDefinition', s: 'kubectl or Git' },
		{ x: 304, y: 36, t: 'Control plane', s: 'policy check' },
		{ x: 24, y: 172, t: 'Caller', s: 'script, webhook' },
		{ x: 164, y: 172, t: 'A2A gate', s: 'checks callers' },
		{ x: 304, y: 172, t: 'Agent', s: 'gVisor sandbox', kind: 'agent' },
		{ x: 444, y: 92, t: 'Model gateway', s: 'own key, budget' },
		{ x: 444, y: 172, t: 'Tool gateway', s: 'tool profile' },
		{ x: 444, y: 252, t: 'Knowledge', s: 'and memory' },
		{ x: 304, y: 300, t: 'Traces and cost', s: 'OpenTelemetry', kind: 'quiet' },
		{ x: 596, y: 92, t: 'Model', s: 'hosted or yours', kind: 'outside' },
		{ x: 596, y: 324, t: 'Other hosts', s: 'not on the list', kind: 'deny' }
	];
	const edges = [
		'M284 64H304',
		'M364 92V172',
		'M144 200H164',
		'M284 200H304',
		'M424 190C436 190 432 120 444 120',
		'M424 200H444',
		'M424 210C436 210 432 280 444 280',
		'M564 120H596',
		'M364 228V300'
	];
	const flowCall = 'M144 200H304';
	const flowModel = 'M364 200H424C436 190 432 120 444 120H596';
	const flowTool = 'M364 200H444';
	const flowBuild = 'M224 64H364V172';
	const flowDeny = 'M392 228C392 320 470 352 556 352';
</script>

<figure class="rp">
	<svg
		viewBox="0 0 720 404"
		role="img"
		aria-labelledby="rp-title rp-desc"
		class="rp-svg"
		preserveAspectRatio="xMidYMid meet"
	>
		<title id="rp-title">How a request flows through OpenAgentix</title>
		<desc id="rp-desc">
			An AgentDefinition is checked by the control plane, which builds the agent. A caller reaches the agent
			only through the A2A gate. The agent reaches a model only through the model gateway with its own key and
			budget, and tools only through the tool gateway and its profile. Memory, knowledge, traces and cost stay
			in your cluster. Calls to hosts that are not on the agent's list are refused.
		</desc>
		<rect class="cluster" x="6" y="6" width="566" height="392" rx="16" />
		<text class="cluster-label" x="22" y="388">your Kubernetes cluster</text>
		<text class="cluster-label" x="596" y="78">outside</text>

		{#each edges as d (d)}<path class="edge" {d} />{/each}
		<path class="edge deny-edge" d={flowDeny} />
		<g class="deny-mark" transform="translate(566 352)">
			<circle r="9" />
			<path d="M-5.5 5.5 5.5 -5.5" />
		</g>
		<path class="edge" d="M572 352H596" stroke-dasharray="2 4" />

		{#each nodes as n (n.t)}
			<g class="node {n.kind ?? ''}" transform="translate({n.x} {n.y})">
				<rect width={W} height={H} rx="10" />
				<text class="t" x="12" y="24">{n.t}</text>
				<text class="s" x="12" y="42">{n.s}</text>
			</g>
		{/each}

		<g class="dots" aria-hidden="true">
			<circle class="dot build" r="4" style:offset-path="path('{flowBuild}')" />
			<circle class="dot call" r="4" style:offset-path="path('{flowCall}')" />
			<circle class="dot model" r="4" style:offset-path="path('{flowModel}')" />
			<circle class="dot tool" r="4" style:offset-path="path('{flowTool}')" />
			<circle class="dot deny" r="4" style:offset-path="path('{flowDeny}')" />
		</g>
	</svg>
	<ol class="rp-list" aria-hidden="true">
		<li><b>AgentDefinition</b> is checked by the <b>control plane</b>, which builds the agent.</li>
		<li>A <b>caller</b> reaches the agent only through the <b>A2A gate</b>.</li>
		<li>The <b>agent</b> runs in a gVisor sandbox.</li>
		<li>Model calls go through the <b>model gateway</b>, with the agent's own key and budget.</li>
		<li>Tool calls go through the <b>tool gateway</b> and its profile.</li>
		<li>Memory, knowledge, traces and cost stay <b>in your cluster</b>.</li>
		<li class="no">Calls to <b>other hosts</b> are refused.</li>
	</ol>
	<figcaption class="legend">
		<span><i class="sw ok"></i>allowed path</span>
		<span><i class="sw no"></i>refused by default</span>
		<span class="note">A hosted model is outside your cluster. A model you host is inside it.</span>
	</figcaption>
</figure>

<style>
	.rp {
		margin: 0;
	}
	.rp-svg {
		width: 100%;
		height: auto;
		display: block;
		font-family: var(--font-sans);
	}
	.cluster {
		fill: color-mix(in srgb, var(--c-accent-soft) 45%, transparent);
		stroke: var(--c-accent);
		stroke-opacity: 0.45;
		stroke-width: 1.2;
		stroke-dasharray: 6 5;
	}
	.cluster-label {
		font-family: var(--font-mono);
		font-size: 11px;
		fill: var(--c-text-3);
	}
	.edge {
		fill: none;
		stroke: var(--c-border-strong);
		stroke-width: 1.6;
	}
	.deny-edge {
		stroke: var(--c-refused);
		stroke-opacity: 0.55;
		stroke-dasharray: 5 4;
	}
	.deny-mark circle {
		fill: var(--c-refused-bg);
		stroke: var(--c-refused);
		stroke-width: 1.6;
	}
	.deny-mark path {
		stroke: var(--c-refused);
		stroke-width: 1.8;
		stroke-linecap: round;
	}
	.node rect {
		fill: var(--c-surface);
		stroke: var(--c-border-strong);
		stroke-width: 1.2;
	}
	.node .t {
		font-size: 13px;
		font-weight: 650;
		fill: var(--c-text-1);
	}
	.node .s {
		font-family: var(--font-mono);
		font-size: 10.5px;
		fill: var(--c-text-3);
	}
	.node.agent rect {
		fill: var(--c-accent-soft);
		stroke: var(--c-accent);
		stroke-width: 1.8;
	}
	.node.agent .t {
		fill: var(--c-accent);
	}
	.node.outside rect {
		fill: var(--c-page);
		stroke-dasharray: 4 3;
	}
	.node.deny rect {
		fill: var(--c-page);
		stroke: var(--c-refused);
		stroke-opacity: 0.6;
		stroke-dasharray: 4 3;
	}
	.node.deny .t {
		fill: var(--c-refused);
	}
	.node.quiet rect {
		fill: var(--c-sunken);
	}
	.dot {
		fill: var(--c-ready);
		offset-rotate: 0deg;
		offset-distance: 0%;
		opacity: 0;
		animation: travel 7s var(--ease-standard) infinite;
	}
	.dot.build {
		fill: var(--c-accent);
		animation-delay: 0s;
	}
	.dot.call {
		animation-delay: 1.2s;
	}
	.dot.model {
		animation-delay: 2.4s;
	}
	.dot.tool {
		animation-delay: 3.4s;
	}
	.dot.deny {
		fill: var(--c-refused);
		animation-name: travel-deny;
		animation-delay: 4.4s;
	}
	@keyframes travel {
		0% {
			offset-distance: 0%;
			opacity: 0;
		}
		4% {
			opacity: 1;
		}
		24% {
			offset-distance: 100%;
			opacity: 1;
		}
		30%,
		100% {
			offset-distance: 100%;
			opacity: 0;
		}
	}
	@keyframes travel-deny {
		0% {
			offset-distance: 0%;
			opacity: 0;
		}
		4% {
			opacity: 1;
		}
		22% {
			offset-distance: 100%;
			opacity: 1;
		}
		24% {
			offset-distance: 100%;
			opacity: 1;
			r: 7;
		}
		32%,
		100% {
			offset-distance: 100%;
			opacity: 0;
			r: 4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
			display: none;
		}
	}
	.rp-list {
		display: none;
		list-style: none;
		padding: 0;
		margin: 0;
		counter-reset: s;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.5rem;
		font-size: 0.9375rem;
		color: var(--c-text-2);
	}
	.rp-list li {
		counter-increment: s;
		display: flex;
		gap: 0.625rem;
		padding: 0.625rem 0.75rem;
		border: 1px solid var(--c-border);
		border-radius: 10px;
		background: var(--c-surface);
	}
	.rp-list li::before {
		content: counter(s);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--c-ready);
		background: var(--c-ready-bg);
		border-radius: 6px;
		padding: 0 0.4rem;
		height: fit-content;
	}
	.rp-list li.no::before {
		color: var(--c-refused);
		background: var(--c-refused-bg);
	}
	.rp-list b {
		color: var(--c-text-1);
		font-weight: 600;
	}
	@media (max-width: 640px) {
		.rp-svg {
			display: none;
		}
		.rp-list {
			display: grid;
		}
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		margin-top: 0.875rem;
		font-size: 0.8125rem;
		color: var(--c-text-2);
	}
	.legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
	.sw {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: inline-block;
	}
	.sw.ok {
		background: var(--c-ready);
	}
	.sw.no {
		background: var(--c-refused);
	}
	.note {
		color: var(--c-text-3);
		flex-basis: 100%;
	}
</style>

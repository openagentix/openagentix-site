<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { docs } from '#lib/config';
	import { jsonldBreadcrumb } from '#lib/data/seo';
	import { page } from '#lib/nav';

	const flows = [
		{
			what: 'Agent memory',
			where: 'In your cluster',
			how: 'PostgreSQL with pgvector, with optional expiry.',
			stay: true
		},
		{
			what: 'Knowledge base',
			where: 'In your cluster',
			how: 'Documents and their vectors in PostgreSQL.',
			stay: true
		},
		{
			what: 'Embeddings',
			where: 'In your cluster',
			how: 'Made by a small CPU model in the cluster. The model file is downloaded from Hugging Face on first start.',
			stay: true
		},
		{
			what: 'Traces and metrics',
			where: 'In your cluster',
			how: 'Bundled Jaeger and VictoriaMetrics. Content capture is off by default.',
			stay: true
		},
		{
			what: 'Audit lines',
			where: 'In your cluster',
			how: 'Logs of the A2A gate and the tool gateway pods.',
			stay: true
		},
		{
			what: 'Prompts and answers, model you host',
			where: 'In your cluster or on your machine',
			how: 'An OpenAI-compatible endpoint you run, or a local Ollama.',
			stay: true
		},
		{
			what: 'Prompts and answers, hosted model',
			where: 'Leaves the cluster',
			how: 'Sent to the provider you configure, through the model gateway.',
			stay: false
		},
		{
			what: 'Tool calls to outside services',
			where: 'Leaves the cluster',
			how: 'A tool server reaches the service it wraps. The OSV tool asks the public OSV database.',
			stay: false
		},
		{
			what: 'Hosts on an agent’s list',
			where: 'Leaves the cluster',
			how: 'Only the hosts you allow for that agent.',
			stay: false
		},
		{
			what: 'Knowledge graph extraction (off by default)',
			where: 'Goes to the extraction model',
			how: 'The text of every ingested document is sent to that model.',
			stay: false
		},
		{
			what: 'Notifications (off by default)',
			where: 'Leaves the cluster',
			how: 'Posted to the Telegram or Slack destinations you list.',
			stay: false
		}
	];
</script>

<Seo
	title="Sovereign AI"
	description="Run AI agents on Kubernetes clusters you control, with any model. Memory, knowledge and traces stay in your cluster. A hosted model call leaves the cluster; a model you host does not."
	path="/sovereign-ai/"
	jsonld={[jsonldBreadcrumb('Sovereign AI', '/sovereign-ai/')]}
/>

<PageHero eyebrow="Sovereign AI" title="Your agents, on your clusters, with your choice of model.">
	<p>
		Sovereign AI means you decide where your agents run, which model they use and where your data goes.
		OpenAgentix runs on Kubernetes clusters you control and keeps the agent's state there. This page is exact
		about what stays and what leaves.
	</p>
</PageHero>

<section class="section">
	<div class="wrap prose-site narrow">
		<h2 class="first">Why it matters</h2>
		<p>
			An agent sees more than a chat window. It reads documents, remembers what users told it, and calls tools
			with real data. Where that memory, knowledge and record of activity lives is a decision for your
			organisation, not for a vendor.
		</p>
		<ul>
			<li>
				<strong>Your cluster.</strong> Agents run on Kubernetes you operate: on premises or in any cloud.
			</li>
			<li>
				<strong>Your data stays.</strong> Memory, knowledge, embeddings, traces and audit lines are in your own
				databases and logs, in the cluster.
			</li>
			<li>
				<strong>Any model.</strong> Use a key from a model provider, any OpenAI-compatible endpoint, or a model
				you host. Every call goes through the model gateway, with a key and budget per agent.
			</li>
			<li>
				<strong>Your rules.</strong> Tools, outbound hosts, callers and budgets are set by your platform team, in
				resources you can keep in Git.
			</li>
			<li><strong>Open source.</strong> Apache-2.0, open standards, no fee per agent or per call.</li>
		</ul>
	</div>
</section>

<section class="section section-alt" aria-labelledby="flows-title">
	<div class="wrap">
		<h2 id="flows-title" class="h-section">What stays, and what leaves</h2>
		<p class="lede intro">
			Be exact: a call to a hosted model provider leaves your cluster. A model you host in the cluster does
			not.
		</p>
		<div class="table-wrap">
			<table>
				<caption class="sr-only">Where each kind of data goes</caption>
				<thead>
					<tr><th scope="col">Data</th><th scope="col">Where it goes</th><th scope="col">Details</th></tr>
				</thead>
				<tbody>
					{#each flows as f (f.what)}
						<tr>
							<th scope="row">{f.what}</th>
							<td>
								<span class="chip {f.stay ? 'chip-ready' : 'chip-pending'}">
									<Icon name={f.stay ? 'check' : 'arrow'} class="ci" />{f.where}
								</span>
							</td>
							<td>{f.how}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="fine">
			The install itself pulls container images and the kubectl-ate plugin from public sources. Source:
			<a href={docs('guide/faq')}>FAQ, "Does data leave my cluster?"</a>
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap prose-site narrow">
		<h2 class="first">What running it yourself means</h2>
		<p>Self-hosting has real benefits, and real costs. Both belong in the decision.</p>
		<h3>What you gain</h3>
		<ul>
			<li>Memory, knowledge, graph and traces are in your own databases.</li>
			<li>Any model and provider behind one gateway, including models you host.</li>
			<li>No fee per session or per call. The cost is your nodes, including idle ones.</li>
			<li>Agents and their policy are resources in Git, reviewed like code.</li>
			<li>Cost you can read: the gateway log and the node bill.</li>
		</ul>
		<h3>What you take on</h3>
		<ul>
			<li>Operations are yours: sizing, upgrades and scaling.</li>
			<li>No scaling to zero per session.</li>
			<li>No compliance attestations. Self-hosting moves the audit to you.</li>
			<li>Isolation with gVisor sandboxes is comparable to micro virtual machines, not stronger.</li>
			<li>Running without internet access (air-gapped) is possible in principle and not proven.</li>
		</ul>
		<h3>Where the project stands</h3>
		<p>
			OpenAgentix is early. It was proven on a single-node kind cluster and in CI. Hosted Anthropic models are
			proven many times. The Ollama path and the OpenAI and Gemini defaults are not verified yet. Read
			<a href={docs('what-works')}>what works</a> before you plan around it.
		</p>
	</div>
</section>

<section class="section section-alt">
	<div class="wrap cta">
		<h2 class="h-section">Start with no model key at all.</h2>
		<p class="lede">The quick start uses a scripted stub model, so nothing goes to a model provider.</p>
		<div class="ctas">
			<a class="btn btn-primary" href={page('/', 'quick-start')}>Try the quick start <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={page('/features')}>See the features</a>
		</div>
	</div>
</section>

<style>
	.narrow > :global(*) {
		max-width: 46rem;
	}
	.first {
		margin-top: 0 !important;
	}
	.intro {
		margin-top: 1rem;
		max-width: 44rem;
	}
	.table-wrap {
		margin-top: 2rem;
		border: 1px solid var(--c-border);
		border-radius: 14px;
		background: var(--c-surface);
		overflow: hidden;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
	}
	th,
	td {
		text-align: left;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--c-border);
		vertical-align: top;
	}
	thead th {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--c-text-3);
		background: var(--c-sunken);
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	tbody th {
		font-weight: 600;
	}
	td:last-child {
		color: var(--c-text-2);
	}
	td :global(.ci) {
		width: 0.875rem;
		height: 0.875rem;
		stroke-width: 2.2;
	}
	.chip {
		white-space: normal;
	}
	@media (max-width: 720px) {
		thead {
			display: none;
		}
		tr {
			display: grid;
			padding: 0.75rem 0;
			border-bottom: 1px solid var(--c-border);
		}
		tbody tr:last-child {
			border-bottom: 0;
		}
		th,
		td {
			border: 0;
			padding: 0.25rem 1rem;
		}
	}
	.fine {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--c-text-3);
	}
	.cta {
		text-align: center;
	}
	.cta .lede {
		margin-top: 0.75rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
</style>

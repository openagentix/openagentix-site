<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import RequestPath from '#lib/components/RequestPath.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Shot from '#lib/components/Shot.svelte';
	import { ASK, DOCS, QUICKSTART, REPO, docs, repoFile } from '#lib/config';
	import { FEATURES } from '#lib/data/features';
	import { HOME_FAQ, jsonldOrganization, jsonldSoftware, jsonldFaq } from '#lib/data/seo';
	import { GALLERY, SHOTS } from '#lib/data/shots';
	import { TECH } from '#lib/data/tech';
	import { page } from '#lib/nav';

	const problems = [
		{
			icon: 'key',
			q: 'Provider keys sit in every agent pod.',
			a: 'Agents never hold a provider key. Each one gets its own gateway key, and only the gateway holds the real one.'
		},
		{
			icon: 'coin',
			q: 'Nobody knows what each agent costs.',
			a: 'The gateway counts tokens and cost per agent. A token budget stops an agent in a loop with HTTP 429.'
		},
		{
			icon: 'globe',
			q: 'Tools and the network are wide open.',
			a: 'An agent sees only the tools you approved, and its sandbox reaches only the hosts you list.'
		},
		{
			icon: 'users',
			q: 'No record of who called which agent.',
			a: 'A gate checks every caller and the user it speaks for, and writes one audit line per request.'
		},
		{
			icon: 'layers',
			q: 'Every team wires its own stack.',
			a: 'One install gives every team the same runtime, gateways, telemetry and console, checked by one policy.'
		}
	] as const;

	const controls = [
		{
			t: 'Own model key and budget per agent',
			d: 'No provider key in agent pods. 401 without a key, 429 when the budget is used up.'
		},
		{
			t: 'Tools only through an approved profile',
			d: 'A tool outside the profile is not found, even from code the agent runs.'
		},
		{
			t: 'Outbound access denied unless allowed',
			d: 'The sandbox reaches its model, its tools and the hosts you list. Others get 403.'
		},
		{
			t: 'Callers checked at the gate',
			d: 'A ServiceAccount token or a key, and a rule for which agents and user ids.'
		},
		{
			t: 'An audit record',
			d: 'One line per request at the gate and one per tool call, without message text.'
		},
		{
			t: 'Policy before anything is created',
			d: 'A definition that breaks a rule is refused with the reason, and nothing is built.'
		}
	];

	const heroShot = SHOTS.overview;
	const homeFeatures = FEATURES.filter((f) => f.id !== 'admission');
	const techTiles = TECH;
</script>

<Seo
	title="OpenAgentix: governed AI agents on your own Kubernetes"
	description="OpenAgentix is an open-source control plane for running AI agents on Kubernetes. Each agent gets its own model key and budget, only approved tools, and no outbound access you did not allow."
	path="/"
	jsonld={[jsonldOrganization(), ...jsonldSoftware(), jsonldFaq(HOME_FAQ)]}
/>

<!-- Hero -->
<section class="hero grid-bg" aria-labelledby="hero-title">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<p class="badge"><span class="chip chip-accent">Open source</span> Apache-2.0 · Kubernetes-native</p>
			<h1 id="hero-title" class="h-display">Run AI agents on your own Kubernetes, under your rules.</h1>
			<p class="lede hero-lede">
				OpenAgentix is an open-source control plane for AI agents. Each agent gets its own model key and
				budget, only the tools you approved, and no outbound access you did not allow. Memory, knowledge and
				traces stay in your cluster.
			</p>
			<div class="ctas">
				<a class="btn btn-primary" href="#quick-start">Try the quick start <Icon name="arrow" /></a>
				<a class="btn btn-secondary" href={REPO}>
					<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
						<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
					</svg>
					Star on GitHub
				</a>
			</div>
		</div>
		<div class="hero-side">
			<CodeBlock id="hero-cmd" lines={QUICKSTART} label="No model key needed" />
			<ul class="gets" aria-label="What the quick start gives you">
				<li><Icon name="check" />An agent built from an AgentDefinition, in a gVisor sandbox</li>
				<li><Icon name="check" />Its own gateway key and token budget</li>
				<li><Icon name="check" />One tool profile, and callers checked at the A2A gate</li>
				<li><Icon name="check" />The console, traces and cost per agent</li>
			</ul>
			<p class="cmd-note">Measured in CI on a hosted runner, from an empty cache: 6 min 34 s.</p>
		</div>
	</div>
	{#if heroShot}
		<div class="wrap hero-shot">
			<Shot shot={heroShot} eager />
			<p class="shot-note">Console screenshots show demo data.</p>
		</div>
	{/if}
</section>

<!-- Problem -->
<section class="section" aria-labelledby="problem-title">
	<div class="wrap">
		<SectionHead eyebrow="The problem" title="Your developers have started to run agents." id="problem-title">
			<p>
				At first each team does it its own way. After a few weeks, the platform team sees the same five
				problems again and again.
			</p>
		</SectionHead>
		<ol class="problems">
			{#each problems as p, i (p.q)}
				<li class="card problem">
					<div class="p-top">
						<span class="num">0{i + 1}</span>
						<Icon name={p.icon} />
					</div>
					<h3>{p.q}</h3>
					<p>{p.a}</p>
				</li>
			{/each}
		</ol>
		<p class="more">
			<a href={docs('guide/why')}>Read each problem with its proof in the docs <Icon name="arrow" /></a>
		</p>
	</div>
</section>

<!-- How it works -->
<section class="section section-alt" aria-labelledby="how-title">
	<div class="wrap">
		<SectionHead
			eyebrow="How it works"
			title="Describe the agent. The platform does the rest."
			id="how-title"
		>
			<p>
				A team writes a short AgentDefinition. The platform team sets the policy once. The control plane
				checks one against the other, then builds the agent with its key, its tools and its limits.
			</p>
		</SectionHead>
		<div class="how">
			<ol class="steps">
				<li>
					<span class="step-n">1</span>
					<div>
						<h3>Define</h3>
						<p>
							Name the model, the instructions, the tool profile and the tools. There is no field for an
							image, a key or a budget. Keep it in Git with your other manifests.
						</p>
					</div>
				</li>
				<li>
					<span class="step-n">2</span>
					<div>
						<h3>Check</h3>
						<p>
							The control plane checks the definition against the platform policy: which models, tool
							profiles, outside hosts, and how many agents. A definition that breaks a rule is refused with a
							reason.
						</p>
					</div>
				</li>
				<li>
					<span class="step-n">3</span>
					<div>
						<h3>Run</h3>
						<p>
							The agent runs in a sandbox. Callers come through the A2A gate. Model calls go through the model
							gateway, tool calls through the tool gateway. Every step is traced.
						</p>
					</div>
				</li>
			</ol>
			<figure class="yaml">
				<div class="yaml-bar">
					<span>agent.yaml</span><span class="chip chip-ready"><Icon name="check" class="ci" />Ready</span>
				</div>
				<pre><code
						><span class="k">apiVersion:</span> openagentix.io/v1alpha1
<span class="k">kind:</span> AgentDefinition
<span class="k">metadata:</span>
  <span class="k">name:</span> quickstart
  <span class="k">namespace:</span> kagent
<span class="k">spec:</span>
  <span class="k">description:</span> Looks up known vulnerabilities of a package
  <span class="k">model:</span> quickstart-model
  <span class="k">instructions:</span> |
    You look up known vulnerabilities of software
    packages with the tool you have.
  <span class="k">toolProfile:</span> lookup
  <span class="k">tools:</span> [osv_query_vulnerability]</code
					></pre>
				<figcaption>The quick start agent, shortened. The full file is in the repository.</figcaption>
			</figure>
		</div>
		<div class="card diagram">
			<h3 class="diagram-h">The request path</h3>
			<RequestPath />
		</div>
	</div>
</section>

<!-- Governed by default -->
<section class="section" aria-labelledby="gov-title">
	<div class="wrap gov">
		<div>
			<SectionHead
				eyebrow="Governed by default"
				title="The safe setting is the default setting."
				id="gov-title"
			>
				<p>
					Off by default, deny by default, no content capture by default. Each control below was proven on a
					live cluster, and each has a record of how.
				</p>
			</SectionHead>
			<a class="btn btn-secondary" href={page('/features')}>
				See every feature and its proof <Icon name="arrow" />
			</a>
		</div>
		<ul class="controls">
			{#each controls as c (c.t)}
				<li>
					<span class="tick"><Icon name="check" /></span>
					<div>
						<h3>{c.t}</h3>
						<p>{c.d}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Sovereign AI -->
<section class="section sov" aria-labelledby="sov-title">
	<div class="wrap">
		<SectionHead eyebrow="Sovereign AI" title="Your cluster. Your data. Any model." id="sov-title">
			<p>
				Run agents on clusters you control. Bring a key from a model provider, or host the model yourself. We
				are exact about what leaves the cluster, so you can decide.
			</p>
		</SectionHead>
		<div class="sov-grid">
			<div class="card sov-card">
				<h3><span class="chip chip-ready">Stays in your cluster</span></h3>
				<ul>
					<li>Agent memory and the knowledge base, in PostgreSQL</li>
					<li>Embeddings, made by a small model running in the cluster</li>
					<li>Traces and metrics, in the bundled Jaeger and VictoriaMetrics</li>
					<li>The audit lines of the gate and the tool gateway</li>
					<li>Prompts and answers, when the model runs in your cluster</li>
				</ul>
			</div>
			<div class="card sov-card">
				<h3><span class="chip chip-pending">Leaves, because you chose it</span></h3>
				<ul>
					<li>Prompts, answers and tool results, when you use a hosted model provider</li>
					<li>Requests from tool servers to the services they wrap</li>
					<li>Calls to the hosts you put on an agent's list</li>
					<li>Document text sent to the extraction model, if you turn on the knowledge graph</li>
				</ul>
			</div>
		</div>
		<p class="more"><a href={page('/sovereign-ai')}>Read the full argument <Icon name="arrow" /></a></p>
	</div>
</section>

<!-- Features -->
<section class="section section-alt" aria-labelledby="features-title">
	<div class="wrap">
		<SectionHead
			eyebrow="Features"
			title="One install. Everything a platform team needs to run agents."
			id="features-title"
		/>
		<ul class="features">
			{#each homeFeatures as f (f.id)}
				<li class="card feature">
					<span class="f-icon"><Icon name={f.icon} /></span>
					<h3><a href={page('/features', f.id)}>{f.title}</a></h3>
					<p>{f.short}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Gallery -->
{#if GALLERY.length}
	<section class="section" aria-labelledby="see-title">
		<div class="wrap">
			<SectionHead eyebrow="See it" title="A console your platform team can read at a glance." id="see-title">
				<p>Real screenshots of the OpenAgentix console. They show demo data.</p>
			</SectionHead>
			<ul class="gallery">
				{#each GALLERY as s (s.name)}
					<li>
						<figure>
							<Shot shot={s} sizes="(min-width: 960px) 560px, 100vw" />
							<figcaption><strong>{s.title}.</strong> {s.caption}</figcaption>
						</figure>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<!-- Built with -->
<section class="section section-alt" aria-labelledby="built-title">
	<div class="wrap">
		<SectionHead
			eyebrow="Under the hood"
			title="Built on technology the cloud-native community is building right now."
			id="built-title"
		>
			<p>
				OpenAgentix does not rebuild what open-source projects already do well. It runs them behind adapters
				and adds the policy, the keys, the gate and the console. It speaks open standards: MCP, A2A and
				OpenTelemetry.
			</p>
		</SectionHead>
		<ul class="tech">
			{#each techTiles as t (t.name)}
				<li class="tile">
					<div class="tile-top">
						<a href={t.url} class="tile-name">{t.name}</a>
						{#if t.foundation}<span class="fnd">{t.foundation}</span>{/if}
					</div>
					<p>{t.use}</p>
				</li>
			{/each}
		</ul>
		<p class="fine">
			Built with these projects. OpenAgentix is not affiliated with or endorsed by them.
			<a href={page('/open-source', 'built-with')}>What each one is and how we use it</a>.
		</p>
	</div>
</section>

<!-- Quick start -->
<section class="section" aria-labelledby="qs-title" id="quick-start">
	<div class="wrap qs">
		<div>
			<SectionHead eyebrow="Quick start" title="A governed agent on your laptop in minutes." id="qs-title">
				<p>
					No model key and no chat account needed. A built-in stub model answers, so you can see the controls
					first: the tool profile, the gate, the budget, the console and the refusals.
				</p>
			</SectionHead>
			<p class="req">
				You need <code>docker</code>, <code>kind</code>, <code>kubectl</code>, <code>helm</code>,
				<code>jq</code>, the Python <code>yq</code>, <code>openssl</code>, <code>curl</code> and
				<code>python3</code>, and Docker with 4 CPU and 8 GB.
			</p>
		</div>
		<ol class="qs-steps">
			<li>
				<h3><span class="step-n">1</span>Install</h3>
				<CodeBlock id="qs-install" lines={QUICKSTART} comments={['', '', 'no key needed']} />
			</li>
			<li>
				<h3><span class="step-n">2</span>Ask the agent</h3>
				<CodeBlock id="qs-ask" lines={[ASK]} />
				<p>The answer comes back through the A2A gate, with the time it took.</p>
			</li>
			<li>
				<h3><span class="step-n">3</span>Open the console, then add a real model</h3>
				<p>
					The installer prints the command for the console and its sign-in token. For real answers, run the
					install again with <code>ANTHROPIC_API_KEY</code>, <code>OPENAI_API_KEY</code>,
					<code>GOOGLE_API_KEY</code>, any OpenAI-compatible endpoint, or a local Ollama.
				</p>
			</li>
		</ol>
	</div>
</section>

<!-- Status and roadmap -->
<section class="section section-alt" aria-labelledby="status-title">
	<div class="wrap status">
		<div class="card status-card">
			<p class="eyebrow">Honest status</p>
			<h2 id="status-title" class="h-section">Early, and proven where it says so.</h2>
			<ul class="plain">
				<li>
					One maintainer. The last release is v0.2.0; the control plane, console and quick start are on main.
				</li>
				<li>Proven on a single-node kind cluster, and the quick start in CI on a hosted runner.</li>
				<li>Not yet tried on k3s, a managed cloud, OpenShift, several nodes or under load.</li>
				<li>
					Databases are development setups and most services run one replica. It is not production ready.
				</li>
			</ul>
			<a href={docs('what-works')}>Read what works, row by row <Icon name="arrow" /></a>
		</div>
		<div class="roadmap-teaser">
			<p class="eyebrow">Roadmap</p>
			<ol>
				<li>
					<span class="rel">0.3</span><span>
						Bring your own A2A agent, built with any framework. Install tested on kind and k3s in CI.
					</span>
				</li>
				<li>
					<span class="rel">0.4</span><span>
						Slack proven on a real workspace, identity per agent, human approval, console sign-in with OpenID
						Connect.
					</span>
				</li>
				<li><span class="rel">0.5</span><span>Workspaces, long steps, budgets per run, queueing.</span></li>
			</ol>
			<a class="btn btn-secondary" href={page('/roadmap')}>See the roadmap <Icon name="arrow" /></a>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section" aria-labelledby="faq-title">
	<div class="wrap faq">
		<SectionHead eyebrow="FAQ" title="Questions platform engineers ask first." id="faq-title" />
		<div class="faq-list">
			{#each HOME_FAQ as f (f.q)}
				<details class="card">
					<summary><h3>{f.q}</h3></summary>
					<p>{f.a}</p>
				</details>
			{/each}
		</div>
		<p class="more"><a href={docs('guide/faq')}>More answers in the FAQ <Icon name="arrow" /></a></p>
	</div>
</section>

<!-- Community -->
<section class="section section-alt" aria-labelledby="community-title">
	<div class="wrap">
		<SectionHead eyebrow="Community" title="Built in the open. Looking for maintainers." id="community-title">
			<p>
				The roadmap is decided in the open, no feature may depend on a commercial product, and security is
				never held back. You do not need a cluster or a model key to contribute code, tests or docs.
			</p>
		</SectionHead>
		<ul class="community">
			<li class="card">
				<Icon name="chat" />
				<h3><a href={`${REPO}/discussions`}>Ask in Discussions</a></h3>
				<p>Questions, ideas and what you would need to try it at work.</p>
			</li>
			<li class="card">
				<Icon name="git" />
				<h3><a href={repoFile('CONTRIBUTING.md')}>Contribute</a></h3>
				<p>Docs, tests, an adapter for another store or notification target. Sign off each commit.</p>
			</li>
			<li class="card">
				<Icon name="map" />
				<h3><a href={`${DOCS}/`}>Read the docs</a></h3>
				<p>Concepts, use cases and a page per feature with how it was proven.</p>
			</li>
			<li class="card">
				<Icon name="scale" />
				<h3><a href={page('/open-source')}>Open source and governance</a></h3>
				<p>Apache-2.0, vendor-neutral rules, and how to report a security issue.</p>
			</li>
		</ul>
	</div>
</section>

<!-- Final CTA -->
<section class="section final" aria-labelledby="final-title">
	<div class="wrap final-inner">
		<h2 id="final-title" class="h-section">See the controls on your own machine.</h2>
		<p class="lede">One command. No key. A governed agent, a gate, a budget and a console.</p>
		<div class="ctas center">
			<a class="btn btn-primary" href="#quick-start">Try the quick start <Icon name="arrow" /></a>
			<a class="btn btn-secondary" href={REPO}>Star on GitHub</a>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(2.5rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
		position: relative;
		overflow: hidden;
	}
	.hero::before {
		content: '';
		position: absolute;
		inset: -20% -10% auto auto;
		width: 60rem;
		height: 40rem;
		background: radial-gradient(closest-side, var(--c-glow), transparent);
		pointer-events: none;
	}
	.hero-grid {
		display: grid;
		gap: 2.5rem;
		align-items: center;
		position: relative;
	}
	.hero-copy {
		min-width: 0;
	}
	.badge {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.875rem;
		color: var(--c-text-2);
		margin-bottom: 1.25rem;
	}
	.hero-lede {
		margin-top: 1.25rem;
		max-width: 38rem;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}
	.ctas.center {
		justify-content: center;
	}
	.cmd-note,
	.shot-note {
		font-size: 0.875rem;
		color: var(--c-text-3);
		margin-top: 0.75rem;
	}
	.shot-note {
		text-align: center;
	}
	.hero-side {
		min-width: 0;
	}
	.gets {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0;
		display: grid;
		gap: 0.625rem;
		font-size: 0.9375rem;
		color: var(--c-text-2);
	}
	.gets li {
		display: flex;
		gap: 0.625rem;
		align-items: flex-start;
	}
	.gets :global(.icon) {
		color: var(--c-ready);
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.2rem;
		stroke-width: 2.2;
	}
	.diagram {
		margin-top: clamp(2.5rem, 5vw, 4rem);
		padding: clamp(1rem, 3vw, 2rem);
		overflow-x: clip;
	}
	.diagram-h {
		font-size: 1.0625rem;
		margin-bottom: 1rem;
	}
	.diagram :global(.rp) {
		max-width: 58rem;
		margin-inline: auto;
	}
	.hero-shot {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		position: relative;
	}
	@media (min-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1.2fr 1fr;
			gap: 4rem;
		}
	}

	.problems {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 13.5rem), 1fr));
	}
	.problem {
		padding: 1.5rem;
	}
	.p-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--c-accent);
		margin-bottom: 1rem;
	}
	.num {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--c-text-3);
	}
	.problem h3 {
		font-size: 1.0625rem;
		margin-bottom: 0.5rem;
	}
	.problem p,
	.feature p,
	.community p,
	.controls p,
	.qs-steps p {
		color: var(--c-text-2);
		font-size: 0.9375rem;
	}
	.more {
		margin-top: 2rem;
		font-weight: 600;
	}
	.more a,
	.status-card > a {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		text-decoration: none;
		font-weight: 600;
	}
	.more a:hover,
	.status-card > a:hover {
		text-decoration: underline;
	}

	.how {
		display: grid;
		gap: 2.5rem;
		align-items: start;
	}
	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.75rem;
	}
	.steps li {
		display: flex;
		gap: 1rem;
	}
	.step-n {
		flex: none;
		display: inline-grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 8px;
		background: var(--c-accent-soft);
		color: var(--c-accent);
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 0.875rem;
	}
	.steps h3 {
		font-size: 1.1875rem;
		margin-bottom: 0.375rem;
	}
	.steps p {
		color: var(--c-text-2);
	}
	.yaml {
		margin: 0;
		background: var(--c-code-bg);
		color: var(--c-code-text);
		border-radius: 14px;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		min-width: 0;
	}
	.yaml-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.625rem 1rem;
		border-bottom: 1px solid rgb(255 255 255 / 0.08);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--c-code-dim);
	}
	.yaml-bar .chip {
		background: #11271b;
		color: #71d59d;
	}
	.yaml-bar :global(.ci) {
		width: 0.875rem;
		height: 0.875rem;
		stroke-width: 2.2;
	}
	.yaml pre {
		margin: 0;
		padding: 1rem 1.125rem;
		font-size: 0.8125rem;
		line-height: 1.7;
		overflow-x: auto;
	}
	.yaml .k {
		color: #5db8db;
	}
	.yaml figcaption {
		padding: 0 1.125rem 1rem;
		font-size: 0.8125rem;
		color: var(--c-code-dim);
	}
	@media (min-width: 960px) {
		.how {
			grid-template-columns: 1fr 1.1fr;
			gap: 4rem;
		}
	}

	.gov {
		display: grid;
		gap: 2.5rem;
	}
	.controls {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
	}
	.controls li {
		display: flex;
		gap: 0.875rem;
		padding: 1.25rem;
		border-radius: 14px;
		background: var(--c-surface);
		border: 1px solid var(--c-border);
	}
	.controls h3 {
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}
	.tick {
		flex: none;
		display: inline-grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: var(--c-ready-bg);
		color: var(--c-ready);
	}
	.tick :global(.icon) {
		width: 1rem;
		height: 1rem;
		stroke-width: 2.4;
	}
	@media (min-width: 1024px) {
		.gov {
			grid-template-columns: 1fr 1.6fr;
			gap: 4rem;
		}
	}

	.sov {
		background: linear-gradient(180deg, var(--c-page), var(--c-accent-soft));
	}
	.sov-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
	}
	.sov-card {
		padding: 1.75rem;
	}
	.sov-card h3 {
		margin-bottom: 1rem;
	}
	.sov-card ul,
	.plain {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.625rem;
	}
	.sov-card li,
	.plain li {
		padding-left: 1.25rem;
		position: relative;
		color: var(--c-text-2);
	}
	.sov-card li::before,
	.plain li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background: var(--c-accent);
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
	}
	.feature {
		padding: 1.5rem;
		position: relative;
		transition:
			border-color 160ms var(--ease-standard),
			transform 160ms var(--ease-standard);
	}
	.feature:hover {
		border-color: var(--c-accent);
	}
	.f-icon {
		display: inline-grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 10px;
		background: var(--c-accent-soft);
		color: var(--c-accent);
		margin-bottom: 1rem;
	}
	.feature h3 {
		font-size: 1.0625rem;
		margin-bottom: 0.375rem;
	}
	.feature h3 a {
		color: var(--c-text-1);
		text-decoration: none;
	}
	.feature h3 a::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 14px;
	}
	.feature h3 a:focus-visible {
		outline: none;
	}
	.feature:has(a:focus-visible) {
		outline: 2px solid var(--c-accent);
		outline-offset: 2px;
	}

	.gallery {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 2.5rem 2rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
	}
	.gallery figure {
		margin: 0;
	}
	.gallery figcaption {
		margin-top: 1rem;
		color: var(--c-text-2);
		font-size: 0.9375rem;
	}
	.gallery strong {
		color: var(--c-text-1);
	}

	.tech {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1px;
		background: var(--c-border);
		border: 1px solid var(--c-border);
		border-radius: 14px;
		overflow: hidden;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 16.5rem), 1fr));
	}
	.tile {
		background: var(--c-surface);
		padding: 1.25rem 1.375rem;
	}
	.tile-top {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25rem 0.75rem;
		margin-bottom: 0.375rem;
	}
	.tile-name {
		font-weight: 650;
		font-size: 1.0625rem;
		color: var(--c-text-1);
		text-decoration: none;
	}
	.tile-name:hover {
		color: var(--c-accent);
		text-decoration: underline;
	}
	.fnd {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--c-text-3);
	}
	.tile p {
		font-size: 0.875rem;
		color: var(--c-text-2);
	}
	.fine {
		margin-top: 1.25rem;
		font-size: 0.875rem;
		color: var(--c-text-3);
	}

	.qs {
		display: grid;
		gap: 2.5rem;
	}
	.req {
		color: var(--c-text-2);
		font-size: 0.9375rem;
	}
	.req code,
	.qs-steps code {
		font-size: 0.85em;
		background: var(--c-sunken);
		border: 1px solid var(--c-border);
		padding: 0.05em 0.35em;
		border-radius: 5px;
	}
	.qs-steps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 2rem;
		min-width: 0;
	}
	.qs-steps li {
		min-width: 0;
	}
	.qs-steps h3 {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.125rem;
		margin-bottom: 0.875rem;
	}
	.qs-steps p {
		margin-top: 0.75rem;
	}
	@media (min-width: 1024px) {
		.qs {
			grid-template-columns: 1fr 1.4fr;
			gap: 4rem;
		}
	}

	.status {
		display: grid;
		gap: 1.5rem;
	}
	.status-card {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}
	.roadmap-teaser {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}
	.roadmap-teaser ol {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
	}
	.roadmap-teaser li {
		display: flex;
		gap: 1rem;
		color: var(--c-text-2);
	}
	.rel {
		flex: none;
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--c-accent);
		background: var(--c-accent-soft);
		border-radius: 6px;
		padding: 0.125rem 0.5rem;
		height: fit-content;
	}
	.roadmap-teaser .btn {
		justify-self: start;
	}
	@media (min-width: 960px) {
		.status {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	.faq-list {
		display: grid;
		gap: 0.75rem;
		max-width: 52rem;
	}
	details {
		padding: 0;
	}
	summary {
		cursor: pointer;
		padding: 1.125rem 1.375rem;
		list-style: none;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		font-family: var(--font-mono);
		color: var(--c-accent);
		font-size: 1.25rem;
		line-height: 1.2;
	}
	details[open] summary::after {
		content: '\2212';
	}
	summary h3 {
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	details p {
		padding: 0 1.375rem 1.25rem;
		color: var(--c-text-2);
	}

	.community {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
	}
	.community li {
		padding: 1.5rem;
		color: var(--c-accent);
	}
	.community h3 {
		font-size: 1.0625rem;
		margin: 0.875rem 0 0.375rem;
	}

	.final {
		text-align: center;
		background: radial-gradient(60rem 24rem at 50% 120%, var(--c-glow), transparent), var(--c-page);
	}
	.final-inner {
		max-width: 44rem;
	}
	.final .lede {
		margin-top: 1rem;
	}
</style>

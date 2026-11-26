import type { IconName } from '#lib/components/Icon.svelte';

// Every "proof" line restates a row of docs/diary/what-works.md in the main repository.
// "status" uses the same words: proven live, proven in CI, built and tested, opt-in.

export type Feature = {
	id: string;
	icon: IconName;
	title: string;
	short: string;
	points: string[];
	proof: string;
	status: string;
	doc: string;
};

export const FEATURES: Feature[] = [
	{
		id: 'control-plane',
		icon: 'cube',
		title: 'Agents as Kubernetes resources',
		short:
			'Describe an agent in a short AgentDefinition. A platform policy checks it before anything is created.',
		points: [
			'An AgentDefinition names the model, instructions, tool profile and tools. It has no field for an image, a key or a budget: those come from the platform.',
			'The control plane checks each definition against the platform policy. A definition that breaks a rule is refused with the reason in its status, and nothing is created.',
			'Keep definitions in Git and apply them like any other manifest. Suspend and resume an agent. Delete removes every object it created.'
		],
		proof:
			'A definition became a Ready agent in 13 to 31 s. A refused definition created nothing. Delete removed every object and the key entry.',
		status: 'Proven live on kind',
		doc: 'features/control-plane'
	},
	{
		id: 'admission',
		icon: 'shield',
		title: 'Admission policies that limit the controller too',
		short: 'Eight ValidatingAdmissionPolicies bound what the OpenAgentix controller itself may do.',
		points: [
			'The policies run in the Kubernetes API server and are written in CEL.',
			'They denied impersonating the controller, deleting a foreign Secret, deleting a chart agent, creating a stray Secret and an egress policy that injects a Secret.'
		],
		proof: 'In CI: 406 cases with the Kubernetes admission code and 71 checks against a real API server.',
		status: 'Proven live on kind and in CI',
		doc: 'features/control-plane'
	},
	{
		id: 'model-gateway',
		icon: 'key',
		title: 'Model gateway: keys, budgets, cost',
		short: 'Agents never hold a provider key. Each one gets its own gateway key with a token budget.',
		points: [
			'Only the gateway holds the provider key. A call without a valid key gets HTTP 401.',
			'Each virtual key has a token budget. When it is used up, the gateway answers 429.',
			'Cost and tokens are counted per agent. Prompt caching and fallback between models are set at the gateway; fallback is still experimental.'
		],
		proof:
			'Real completions through the gateway, 401 without a key, 429 when the budget ran out. The cost metric matched the access log for ten calls.',
		status: 'Proven live on kind',
		doc: 'features/model-gateway'
	},
	{
		id: 'tools',
		icon: 'tool',
		title: 'Tool gateway and tool profiles',
		short: 'An agent sees only the tools in the profile you approved, even from code it runs.',
		points: [
			'Tools are MCP servers behind one tool gateway.',
			'A tool profile is a named list of approved tools with its own endpoint. A tool outside the profile is not found.',
			'Every tool call writes an audit line with tool, outcome, actor and duration, without the arguments.'
		],
		proof:
			'A profile advertised only its 4 tools. Hidden tools were not found directly or in code mode. A profile agent answered with an allowed tool.',
		status: 'Proven live on kind',
		doc: 'features/tools'
	},
	{
		id: 'egress',
		icon: 'globe',
		title: 'Outbound access denied unless allowed',
		short: 'Each agent sandbox reaches its model and tools, plus the hosts you list. Nothing else.',
		points: [
			'List allowed hosts per agent as https://host[:port].',
			'Other hosts do not resolve or get 403 from the sandbox egress proxy.',
			'NetworkPolicies keep other pods away from the tool gateway, knowledge base and controller.'
		],
		proof:
			'The allowed host answered 200 from the real sandbox. Other hosts were refused. Pods in default timed out against the protected services.',
		status: 'Proven live on kind',
		doc: 'features/security'
	},
	{
		id: 'gate',
		icon: 'users',
		title: 'Known callers and an audit record',
		short: 'The A2A gate checks who calls an agent and which user they may speak for.',
		points: [
			'Each caller proves who it is with a Kubernetes ServiceAccount token or a key.',
			'A caller rule says which agents it may call and which user ids it may use.',
			'The gate writes one audit line per request. The user id is stored as a hash, never the message text.'
		],
		proof:
			'No token gave 401. A caller claiming another caller’s user id gave 403. Schedule and webhook calls completed through the gate.',
		status: 'Proven live on kind',
		doc: 'features/security'
	},
	{
		id: 'runtime',
		icon: 'box',
		title: 'A sandbox for every conversation',
		short: 'Agents run on kagent with Agent Substrate. Each conversation gets its own gVisor sandbox.',
		points: [
			'The control plane talks to the runtime through an adapter.',
			'Skills in the Agent Skills format are mounted into the sandbox from digest-pinned OCI images.',
			'Multi-turn conversations keep their context on one A2A conversation id.'
		],
		proof:
			'A2A SendMessage, multi-turn on one contextId, a real model, cold install twice. An OCI skill was loaded by a real model.',
		status: 'Proven live on kind',
		doc: 'features/runtime'
	},
	{
		id: 'console',
		icon: 'eye',
		title: 'A web console for the platform',
		short: 'List agents, build new ones within the policy, see the YAML, pause and delete.',
		points: [
			'Shows models, tools, the policy and, with observability on, spend and traces.',
			'No ingress: open it with kubectl port-forward and a token.',
			'The agent builder is checked by 116 component tests and 15 Playwright flows in demo mode.'
		],
		proof:
			'An agent created through the console API became Ready in 25 s. The browser builder was exercised in demo mode only, not yet against a live cluster.',
		status: 'API proven live, UI built and tested',
		doc: 'features/console'
	},
	{
		id: 'memory',
		icon: 'database',
		title: 'Memory with expiry',
		short: 'Agents remember facts across conversations, per user, and old memories can expire.',
		points: [
			'Memory is stored in PostgreSQL with pgvector in your cluster.',
			'An opt-in expiry job removes memories older than the limit you set.',
			'Users can list and delete their own memories through the gate.'
		],
		proof:
			'A fact saved in one conversation was recalled in a new one, and not for another user id. Expiry was proven in a test database and the job ran on kind.',
		status: 'Proven live on kind (expiry: parts)',
		doc: 'features/memory'
	},
	{
		id: 'knowledge',
		icon: 'graph',
		title: 'Knowledge base and knowledge graph',
		short: 'Semantic search over your documents, and a graph of the entities in them.',
		points: [
			'Embeddings are made in the cluster with a small CPU model. Nothing leaves for them.',
			'The knowledge graph extracts entities and relations with a model, so an agent can answer questions that span several documents.'
		],
		proof:
			'Semantic hits for queries that share no word with the text. The graph canary passed: an agent answered a question that needs five documents, citing each.',
		status: 'Proven live on kind',
		doc: 'features/knowledge-base'
	},
	{
		id: 'channels',
		icon: 'channel',
		title: 'Webhooks, schedules and channels',
		short: 'Start agent turns from signed webhooks, cron schedules or a chat bridge.',
		points: [
			'Signed webhooks run a turn; a bad signature gets 401.',
			'Schedules are Kubernetes CronJobs that call an agent through the gate.',
			'A Telegram bridge is included for demos. Slack is in the chart and not yet run against a real workspace.'
		],
		proof:
			'A signed webhook ran a turn and completed. A real cron firing completed. A Telegram bridge delivered to a real chat.',
		status: 'Proven live on kind (Slack: not yet)',
		doc: 'features/channels'
	},
	{
		id: 'observability',
		icon: 'trace',
		title: 'Cost and traces per agent',
		short: 'Tokens and cost per agent, and one trace across the whole request path.',
		points: [
			'OpenTelemetry traces and metrics, stored in your cluster with VictoriaMetrics and Jaeger.',
			'Content capture is off by default.',
			'The console Overview and Costs pages read the same store. They are built and tested, not yet checked against a live cluster.'
		],
		proof:
			'One trace across four services, with traceparent kept along the whole path. A 59-span trace was recorded.',
		status: 'Proven live on kind',
		doc: 'features/observability'
	},
	{
		id: 'quick-start',
		icon: 'bolt',
		title: 'A quick start that needs no key',
		short: 'One command installs a governed agent on a local kind cluster. A built-in stub model answers.',
		points: [
			'Bring a key from Anthropic, OpenAI or Google, any OpenAI-compatible endpoint, or a local Ollama when you want real answers.',
			'Ask the agent with hack/ask.sh. The answer comes back through the A2A gate.'
		],
		proof:
			'In CI on a hosted runner, with nothing cached: first answer 301 to 320 s after the start of the install on kind, then the smoke checks passed. Also passed on k3s in CI.',
		status: 'Proven in CI',
		doc: 'features/quick-start'
	},
	{
		id: 'byo',
		icon: 'box',
		title: 'Bring your own agent',
		short:
			'Run your own container that speaks A2A 1.0, built with any framework, under the same key, budget, gate and tool profile.',
		points: [
			'The image is pinned by digest and comes from a registry prefix the platform allows.',
			'It runs as a non-root user with a read-only root file system and no Kubernetes token.',
			'Calls reach it through the A2A gate. Its model calls go through its own gateway key.',
			'A conformance checker tests the A2A side before you deploy.'
		],
		proof:
			'In CI on kind with the stub model: the sample agent was Ready 10 s after creation, answered through the gate and the gateway, and listed its tools through a tool profile. Definitions with a tag or an image outside the allowed prefix were refused.',
		status: 'Proven in CI on kind, off by default',
		doc: 'guide/bring-your-own-agent'
	}
];

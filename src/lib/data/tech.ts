// Projects OpenAgentix is built with. "What it is" follows each project's own description.
// "Foundation" is filled in only where the project's own page (or the foundation's page) says so,
// checked on 2026-11-25. OpenAgentix is not affiliated with, or endorsed by, any of them.

export type Tech = {
	name: string;
	url: string;
	what: string;
	use: string;
	foundation?: string;
	licence: string;
	group: 'runtime' | 'gateways' | 'standards' | 'data' | 'kubernetes';
};

export const TECH: Tech[] = [
	{
		name: 'Agent Substrate',
		url: 'https://github.com/kagent-dev/substrate',
		what: 'A security-hardened runtime for sandboxed agents on Kubernetes, with default-deny networking and snapshots of agent state.',
		use: 'Runs each agent conversation in its own gVisor sandbox, with its own identity, and holds back outbound traffic that is not allowed.',
		licence: 'Apache-2.0',
		group: 'runtime'
	},
	{
		name: 'kagent',
		url: 'https://kagent.dev',
		what: 'A Kubernetes-native platform for running and managing AI agents.',
		use: 'The default agent runtime. The control plane turns each AgentDefinition into a kagent agent.',
		foundation: 'CNCF Sandbox',
		licence: 'Apache-2.0',
		group: 'runtime'
	},
	{
		name: 'gVisor',
		url: 'https://gvisor.dev',
		what: 'A memory-safe, Linux-compatible kernel that runs in user space, between a container and the host.',
		use: 'The sandbox that Agent Substrate puts around each agent conversation.',
		licence: 'Apache-2.0',
		group: 'runtime'
	},
	{
		name: 'agentgateway',
		url: 'https://agentgateway.dev',
		what: 'An open-source proxy for agent, model and tool traffic, with security, observability and governance.',
		use: 'The model gateway: one virtual key and token budget per agent, cost per agent, prompt caching and failover.',
		foundation: 'Linux Foundation',
		licence: 'Apache-2.0',
		group: 'gateways'
	},
	{
		name: 'ToolHive',
		url: 'https://github.com/stacklok/toolhive',
		what: 'A platform for running and managing Model Context Protocol (MCP) servers, including a virtual MCP server that joins many tools behind one endpoint.',
		use: 'The tool gateway: tool servers sit behind it, and each tool profile is its own endpoint with only the approved tools.',
		licence: 'Apache-2.0',
		group: 'gateways'
	},
	{
		name: 'Model Context Protocol (MCP)',
		url: 'https://modelcontextprotocol.io',
		what: 'An open standard for connecting AI applications to tools and data.',
		use: 'How agents call tools. Any MCP server can be added behind the tool gateway.',
		foundation: 'Agentic AI Foundation (Linux Foundation)',
		licence: 'Apache-2.0',
		group: 'standards'
	},
	{
		name: 'Agent2Agent (A2A)',
		url: 'https://a2a-protocol.org',
		what: 'An open protocol that lets agents from different frameworks find each other and work together.',
		use: 'How callers, schedules, webhooks and other agents call an agent, through the A2A gate.',
		foundation: 'Linux Foundation',
		licence: 'Apache-2.0',
		group: 'standards'
	},
	{
		name: 'OpenTelemetry',
		url: 'https://opentelemetry.io',
		what: 'The open standard for traces, metrics and logs.',
		use: 'Traces and metrics for each agent turn, across the gate, the agent, and the model and tool gateways.',
		foundation: 'CNCF Graduated',
		licence: 'Apache-2.0',
		group: 'standards'
	},
	{
		name: 'Jaeger',
		url: 'https://www.jaegertracing.io',
		what: 'An open-source platform for distributed tracing.',
		use: 'Stores traces in your cluster and shows each agent turn as one trace.',
		foundation: 'CNCF Graduated',
		licence: 'Apache-2.0',
		group: 'data'
	},
	{
		name: 'VictoriaMetrics',
		url: 'https://victoriametrics.com',
		what: 'A time series database and monitoring system.',
		use: 'Stores tokens, cost and other metrics per agent in your cluster.',
		licence: 'Apache-2.0',
		group: 'data'
	},
	{
		name: 'PostgreSQL and pgvector',
		url: 'https://www.postgresql.org',
		what: 'PostgreSQL is an open-source object-relational database. pgvector adds vector similarity search to it.',
		use: 'Long-term memory and the knowledge base, with embeddings made inside the cluster.',
		licence: 'PostgreSQL Licence',
		group: 'data'
	},
	{
		name: 'ValidatingAdmissionPolicy (CEL)',
		url: 'https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/',
		what: 'A Kubernetes feature, stable since v1.30, that checks API requests with rules written in the Common Expression Language.',
		use: 'Eight policies limit what even the OpenAgentix controller may create, change or delete.',
		licence: 'Apache-2.0',
		group: 'kubernetes'
	},
	{
		name: 'Gateway API',
		url: 'https://gateway-api.sigs.k8s.io',
		what: 'The Kubernetes SIG Network API for routing traffic into and inside a cluster.',
		use: 'Defines the model gateway and its routes as standard Kubernetes resources.',
		licence: 'Apache-2.0',
		group: 'kubernetes'
	},
	{
		name: 'Agent Kourier',
		url: 'https://agentkourier.dev',
		what: 'A Kubernetes-native broker that carries messages between chat tools and A2A agents.',
		use: 'Channels and signed webhooks that start an agent turn.',
		licence: 'Apache-2.0',
		group: 'gateways'
	}
];

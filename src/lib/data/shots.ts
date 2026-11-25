// Real console screenshots, captured in demo mode by scripts/capture-screenshots.mjs.
// Demo mode runs an in-memory backend with made-up agents and numbers.
export type Shot = { name: string; title: string; caption: string; alt: string; w: number; h: number };

const list: Shot[] = [
	{
		name: 'overview',
		title: 'Overview',
		caption: 'Agents by state, spend per agent, the security posture and the health of each platform part.',
		alt: 'The Overview page of the OpenAgentix console in demo mode: tiles for 5 agents (3 ready, 1 pending, 1 refused), spend and model requests, a spend per agent chart, a security posture card that reads All checks pass, a list of agents that need attention, and platform health cards for the runtime, model gateway and tool gateway.',
		w: 2000,
		h: 1528
	},
	{
		name: 'agents',
		title: 'Agents',
		caption:
			'Every agent with its state, model, tool profile and capabilities, built or managed by the chart.',
		alt: 'The Agents registry in demo mode: a table of five agents, including cve-triage marked Refused and release-notes marked Pending, with model, tool profile, capabilities and source.',
		w: 2000,
		h: 1056
	},
	{
		name: 'builder',
		title: 'Agent builder',
		caption:
			'Build an agent inside the policy: model, tool profile and tools, memory, skills and allowed hosts.',
		alt: 'The agent builder for the agent researcher in demo mode: instructions on the left, and on the right a Model and capabilities panel with the model, the tool profile lookup with a checkbox per tool, switches for knowledge, notify and memory, an approved skill, and one allowed outbound host.',
		w: 2000,
		h: 1944
	},
	{
		name: 'refused',
		title: 'Refused by policy',
		caption: 'A definition that breaks a rule is refused with the reasons, and nothing is created.',
		alt: 'The agent cve-triage in demo mode with a Refused badge and a banner that says two rules of the platform policy refused this definition: a tool that is not in its tool profile, and an outbound host that the policy does not allow.',
		w: 2000,
		h: 1389
	},
	{
		name: 'costs',
		title: 'Costs',
		caption: 'Spend, tokens and cache use per agent key, from the model gateway metrics.',
		alt: 'The Costs page in demo mode for the last 24 hours: total spend, tokens, cache read share and model requests, a spend per agent key chart, and a table of cost, share and tokens per agent.',
		w: 2000,
		h: 1056
	},
	{
		name: 'traces',
		title: 'Traces',
		caption:
			'One agent turn as a waterfall: the gate, the model calls and the tool call. Prompts and answers are not stored.',
		alt: 'The Traces page in demo mode: a list of recent agent turns and an open trace waterfall with four spans, the A2A request, two model calls and one tool call to osv_query_vulnerability, with span attributes in a side panel.',
		w: 2000,
		h: 1014
	},
	{
		name: 'governance',
		title: 'Governance',
		caption: 'The platform policy, read-only: what a definition may use and what is always enforced.',
		alt: 'The Governance page in demo mode showing the platform policy read-only: at most 5 agents, the allowed model and tool profile, memory of at most 30 days, the allowed outbound hosts, and a list of rules that are always enforced.',
		w: 2000,
		h: 1083
	}
];

export const SHOTS: Record<string, Shot> = Object.fromEntries(list.map((s) => [s.name, s]));
export const GALLERY: Shot[] = list.filter((s) => s.name !== 'overview');

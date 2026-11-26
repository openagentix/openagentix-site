import { DOCS, REPO, SITE } from '#lib/config';

export type QA = { q: string; a: string };

// Questions shown on the home page. FAQPage JSON-LD is built only from these.
export const HOME_FAQ: QA[] = [
	{
		q: 'Is OpenAgentix production ready?',
		a: 'No. It is an early project with one maintainer. It was proven on one single-node kind cluster, and the quick start in CI on hosted runners, on kind and on k3s. It was not run on a managed cloud, OpenShift, several nodes or under load.'
	},
	{
		q: 'Does data leave my cluster?',
		a: 'Memory, knowledge, embeddings, traces and metrics stay in your cluster. Prompts, answers and tool results go to the model provider you choose; with a model you host, they stay with you. Tool servers reach the services they wrap.'
	},
	{
		q: 'Which models can I use?',
		a: 'Every model call goes through the model gateway. The installer takes a key for Anthropic, OpenAI or Google, any OpenAI-compatible endpoint, or a local Ollama, and otherwise a scripted stub. Anthropic models and the stub are proven; the others are not yet verified.'
	},
	{
		q: 'Do I need a specific agent framework?',
		a: 'No. You can describe an agent in an AgentDefinition and it runs on kagent with Agent Substrate, with no framework code. Or bring your own agent: a digest-pinned container that speaks A2A 1.0, built with any framework, under the same key, budget, gate and tool profile. That path is opt-in and proven in CI on kind only.'
	},
	{
		q: 'What does it cost?',
		a: 'OpenAgentix is free and open source under the Apache-2.0 licence. You pay for your own nodes and for the model provider you choose, if any. There is no fee per agent or per call.'
	}
];

export function jsonldOrganization() {
	return {
		'@type': 'Organization',
		'@id': `${SITE.siteUrl}/#org`,
		name: 'OpenAgentix',
		url: `${SITE.siteUrl}/`,
		logo: `${SITE.siteUrl}/favicon.svg`,
		sameAs: ['https://github.com/openagentix']
	};
}

export function jsonldSoftware() {
	return [
		{
			'@type': 'SoftwareSourceCode',
			'@id': `${SITE.siteUrl}/#code`,
			name: 'OpenAgentix',
			description:
				'An open-source control plane for running AI agents on Kubernetes under the rules your platform team sets.',
			codeRepository: REPO,
			license: 'https://www.apache.org/licenses/LICENSE-2.0',
			programmingLanguage: ['Go', 'TypeScript'],
			runtimePlatform: 'Kubernetes',
			author: { '@id': `${SITE.siteUrl}/#org` }
		},
		{
			'@type': 'SoftwareApplication',
			'@id': `${SITE.siteUrl}/#app`,
			name: 'OpenAgentix',
			applicationCategory: 'DeveloperApplication',
			operatingSystem: 'Kubernetes 1.37 or newer',
			softwareVersion: '0.2.0',
			url: `${SITE.siteUrl}/`,
			downloadUrl: REPO,
			softwareHelp: `${DOCS}/`,
			license: 'https://www.apache.org/licenses/LICENSE-2.0',
			isAccessibleForFree: true,
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			publisher: { '@id': `${SITE.siteUrl}/#org` }
		}
	];
}

export function jsonldFaq(items: QA[]) {
	return {
		'@type': 'FAQPage',
		mainEntity: items.map((i) => ({
			'@type': 'Question',
			name: i.q,
			acceptedAnswer: { '@type': 'Answer', text: i.a }
		}))
	};
}

export function jsonldBreadcrumb(name: string, path: string) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}/` },
			{ '@type': 'ListItem', position: 2, name, item: `${SITE.siteUrl}${path}` }
		]
	};
}

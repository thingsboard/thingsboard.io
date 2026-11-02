/** Copy and calls to action for `/products/paas/`. */

import type { Benefit } from '@models/benefit';
import type { Cta } from '@models/cta';
import type { ChoiceNote, ChoiceOption } from '@models/choice-band';

export const paasHeroCaption = ['No credit card', 'Running in under 5 minutes'];

export const paasCtas = {
	primary: {
		text: 'Try Cloud for free',
		href: 'https://thingsboard.cloud/signup',
		icon: 'tabler:cloud-filled',
		variant: 'brand',
		target: '_blank',
		cloudAuth: 'signup',
	} satisfies Cta,
	privacy: { text: 'ThingsBoard Cloud Privacy policy', href: '/products/paas/privacy-policy/' },
	secondary: {
		text: 'Talk to an expert',
		href: '/contact-us/?subject=ThingsBoard%20Products&message=I%20have%20a%20question%20about%20ThingsBoard%20Cloud',
		icon: 'tabler:message-circle',
		variant: 'outline',
		ariaLabel: 'Talk to an expert about ThingsBoard Cloud',
	} satisfies Cta,
};

export const paasBenefits: Benefit[] = [
	{
		icon: 'tabler:box-multiple',
		color: '#3d50f5',
		title: 'All-in-one IoT Platform',
		description:
			'From device connectivity through data processing to the end-user interface — no separate services to license, integrate and keep in sync.',
	},
	{
		icon: 'tabler:server-cog',
		color: '#c2410c',
		title: 'We run it, you build on it',
		description:
			'No servers to size, no patches to apply, no upgrade windows. Infrastructure, version upgrades, daily backups and round-the-clock monitoring are ours.',
	},
	{
		icon: 'tabler:heartbeat',
		color: '#047857',
		title: 'Built to stay up',
		description:
			'Deployed across multiple availability zones with replicated storage, under a contractual uptime SLA.',
	},
	{
		icon: 'tabler:certificate',
		color: '#7c3aed',
		title: 'Security & compliance',
		description:
			'ThingsBoard is ISO 27001 and ISO 9001 certified, and every environment runs in ISO 27001 and PCI-DSS certified data centres.',
	},
	{
		icon: 'tabler:world',
		color: '#007c7b',
		title: 'Data residency you choose',
		description:
			'ThingsBoard Cloud runs in North America or Europe. Private Cloud adds APAC, with the region chosen when your cluster is provisioned.',
	},
	{
		icon: 'tabler:transfer-in',
		color: '#006bc7',
		title: 'One platform, anywhere',
		description:
			'ThingsBoard Cloud, Private Cloud, or your own infrastructure — moving between them moves your solution rather than rebuilding it.',
	},
];


/** Capabilities both Cloud deployments include; the comparison table holds only where they differ. */

export const paasOnPremises: ChoiceNote = {
	lead: 'Prefer to run it yourself?',
	text: 'ThingsBoard On-premises',
	href: '/products/thingsboard-pe/',
	icon: 'tabler:server',
};

export const paasChoice = {
	title: 'Start free, or talk to us',
	lead: 'ThingsBoard Cloud is self-serve and running in five minutes. Private Cloud is a dedicated cluster our team manages for you, with a stronger uptime SLA and higher throughput.',
	options: [
		{
			icon: 'tabler:cloud',
			name: 'Cloud',
			price: 'Free',
			priceNote: 'Free tier up to 5 devices',
			summary: 'The fastest, shared-infrastructure start.',
			points: ['Shared multi-tenant environment', 'Under 5 minutes, self-serve', 'No card required to start'],
			cta: {
				text: 'Start for free',
				icon: 'tabler:cloud-filled',
				href: 'https://thingsboard.cloud/signup',
				variant: 'brand',
				target: '_blank',
				cloudAuth: 'signup',
			},
			plansHref: '/pricing/?product=thingsboard-cloud',
		},
		{
			icon: 'tabler:cloud-lock',
			name: 'Private Cloud',
			price: 'From $1,499',
			priceNote: 'Per month, 5,000 devices',
			summary: 'A dedicated, isolated cluster with a stronger uptime SLA.',
			points: [
				'Dedicated, isolated Kubernetes cluster',
				'Provisioned by our team in hours',
				'99.9%–99.99% uptime SLA',
			],
			cta: {
				text: 'Contact us',
				icon: 'tabler:message-circle',
				href: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Private%20Cloud',
				variant: 'outline',
			},
			plansHref: '/pricing/?product=thingsboard-private-cloud',
		},
	] satisfies ChoiceOption[],
};

/** Copy and calls to action for `/products/thingsboard-pe/`. */

import type { Benefit } from '@models/benefit';
import type { Cta } from '@models/cta';
import type { ChoiceOption } from '@models/choice-band';

const PRICING_SUBSCRIPTION = '/pricing/?section=thingsboard-pe-options&product=thingsboard-pe';
const PRICING_PERPETUAL = '/pricing/?section=thingsboard-pe-options&product=thingsboard-pe&solution=pe-perpetual';

export const onPremHeroCaption = ['No credit card', 'Docker, Kubernetes or any cloud'];

export const onPremCtas = {
	install: {
		text: 'Install for free',
		href: '/docs/pe/installation/',
		icon: 'tabler:server',
		variant: 'brand',
		ariaLabel: 'Install for free — ThingsBoard On-premises installation guides',
	} satisfies Cta,
	secondary: {
		text: 'Talk to an expert',
		href: '/contact-us/?subject=ThingsBoard%20Products&message=I%20have%20a%20question%20about%20ThingsBoard%20On-premises',
		icon: 'tabler:message-circle',
		variant: 'outline',
		ariaLabel: 'Talk to an expert about ThingsBoard On-premises',
	} satisfies Cta,
	legal: { text: 'ThingsBoard license agreement', href: '/products/thingsboard-pe/eula/' },
	cloud: {
		lead: 'Want to look around first? Nothing to install on',
		text: 'ThingsBoard Cloud',
		tail: ' — and you can bring it in-house later.',
		href: '/products/paas/',
		icon: 'tabler:cloud',
	},
};

export const onPremChoice = {
	title: 'Subscribe, or own it',
	lead: 'Both run on infrastructure you control — one license you pay for while you use it, one you own.',
	options: [
		{
			icon: 'tabler:refresh',
			name: 'Subscription',
			price: 'Free',
			priceNote: '100 devices included',
			summary: 'Licensed month to month, on your own servers.',
			points: [
				'Commercial use included, and 1,000 devices for non-commercial projects',
				'Paid tiers from $99 a month add white labeling, a help desk, and more devices as you scale',
				'Cancel any time, no notice',
			],
			cta: {
				text: 'Install for free',
				icon: 'tabler:server',
				href: '/docs/pe/installation/',
				variant: 'brand',
			},
			plansHref: PRICING_SUBSCRIPTION,
		},
		{
			icon: 'tabler:infinity',
			name: 'Perpetual license',
			price: 'From $4,999',
			priceNote: '5,000 devices included',
			summary: 'Bought once, and it does not expire.',
			points: [
				'The platform keeps running whether or not you renew updates',
				'A capital purchase on your books, not an operating cost',
				'License terms shaped around your deployment rather than a fixed package',
			],
			cta: {
				text: 'Talk to sales',
				icon: 'tabler:message-circle',
				href: '/contact-us/?subject=ThingsBoard%20Products&message=I%20am%20interested%20in%20Self-managed%20perpetual%20license',
				variant: 'outline',
			},
			plansHref: PRICING_PERPETUAL,
			plansLabel: 'Learn more',
		},
	] satisfies ChoiceOption[],
};

export const onPremBenefits: Benefit[] = [
	{
		icon: 'tabler:box-multiple',
		color: '#007c7b',
		title: 'All-in-one IoT Platform',
		description:
			'From device connectivity through data processing to the end-user interface — no separate services to license, integrate and keep in sync.',
	},
	{
		icon: 'tabler:server',
		color: '#178649',
		title: 'Runs where you choose',
		description:
			'Your own data centre, your AWS, Azure or GCP account, or a Kubernetes cluster — including fully air-gapped environments with no internet connection at all.',
	},
	{
		icon: 'tabler:certificate',
		color: '#7c3aed',
		title: 'Security & compliance',
		description:
			'Every LTS release gets security patches from our engineers and an independent penetration test. ThingsBoard is ISO 27001 and ISO 9001 certified.',
	},
	{
		icon: 'tabler:source-code',
		color: '#c2410c',
		title: 'Source code included',
		description:
			'Read it, extend any part of it, and build what your use case needs instead of working around what the platform assumes.',
	},
	{
		icon: 'tabler:stack-2',
		color: '#3d50f5',
		title: 'Horizontal scalability',
		description:
			'Start monolithic for quick launches, move to microservices as load grows. Add instances of any service — no single point of failure, and no rewrite along the way.',
	},
	{
		icon: 'tabler:headset',
		color: '#006bc7',
		title: 'Support from our engineers',
		description:
			'Around 30 minutes average response in business hours, from the same team that writes the platform — plus help with upgrade planning, architecture reviews and performance tuning.',
	},
];


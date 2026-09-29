import type { CloudFlow } from '@util/cloud-regions';

/** The two deployments in the Products section. */
export interface ProductChoice {
	name: string;
	/** The category line over the name. */
	label: string;
	/** One paragraph per string. */
	description: string[];
	/** Badge fill, and the colour of the highlighted word. */
	badgeFill: string;
	/** The part of `name` shown in the badge colour. */
	nameHighlight: string;
	/** The filled button; `href` and `link` are the text link under it. */
	action: { label: string; href: string; icon: string; cloudAuth?: CloudFlow };
	href: string;
	link: string;
}

export const homeProducts: ProductChoice[] = [
	{
		name: 'ThingsBoard Cloud',
		label: 'Fully managed, shared or dedicated',
		description: [
			'We run the servers, scaling, backups and upgrades, with a contractual uptime SLA. Start free on shared infrastructure, or move to Private Cloud for a dedicated cluster.',
		],
		badgeFill: '#3d50f5',
		nameHighlight: 'Cloud',
		action: {
			label: 'Sign up and start in 5 min',
			href: 'https://thingsboard.cloud/signup',
			icon: 'tabler:cloud-filled',
			cloudAuth: 'signup',
		},
		href: '/products/paas/',
		link: 'Explore Cloud',
	},
	{
		name: 'ThingsBoard On-premises',
		label: 'Self-managed, on your infrastructure',
		description: [
			'You host it in your cloud, data center, or fully air-gapped, so data location and compliance stay in your hands. We ship LTS releases and security patches.',
		],
		badgeFill: '#178649',
		nameHighlight: 'On-premises',
		action: { label: 'Install for free', href: '/installations/', icon: 'tabler:server' },
		href: '/products/thingsboard-pe/',
		link: 'Explore On-premises',
	},
];

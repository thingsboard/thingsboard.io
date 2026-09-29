/** The homepage's hero and closing calls to action. */

import type { Cta } from '@models/cta';

export const homeHeroCtas: Cta[] = [
	{
		text: 'Try for free',
		href: '/installations/choose-region/',
		icon: 'tabler:cloud-filled',
		variant: 'brand',
		ariaLabel: 'Try for free on ThingsBoard Cloud',
		cloudAuth: 'signup',
	},
	{
		text: 'Talk to an expert',
		href: '/contact-us/?subject=ThingsBoard%20Products',
		icon: 'tabler:messages',
		variant: 'outline',
	},
];

export const homeClosingCtas: Cta[] = [
	{
		text: 'Start free on Cloud',
		href: 'https://thingsboard.cloud/signup',
		icon: 'tabler:cloud-filled',
		variant: 'brand',
		target: '_blank',
		cloudAuth: 'signup',
	},
	{ text: 'Install On-premises', href: '/installations/', icon: 'tabler:download', variant: 'outline' },
];

export interface SocialNetwork {
	href: string;
	name: string;
	icon: string;
}

// Official profiles we own: the footer's Follow links and the Organization JSON-LD `sameAs`.
export const socialNetworks: SocialNetwork[] = [
	{
		href: 'https://github.com/thingsboard',
		name: 'GitHub',
		icon: 'simple-icons:github',
	},
	{
		href: 'https://www.youtube.com/thingsboard',
		name: 'YouTube',
		icon: 'simple-icons:youtube',
	},
	{
		href: 'https://www.facebook.com/thingsboard',
		name: 'Facebook',
		icon: 'simple-icons:facebook',
	},
	{
		href: 'https://www.instagram.com/thingsboard_iot/',
		name: 'Instagram',
		icon: 'simple-icons:instagram',
	},
	{
		href: 'https://www.linkedin.com/company/thingsboard/',
		name: 'LinkedIn',
		icon: 'simple-icons:linkedin',
	},
	{
		href: 'https://twitter.com/thingsboard',
		name: 'X',
		icon: 'simple-icons:x',
	},
];

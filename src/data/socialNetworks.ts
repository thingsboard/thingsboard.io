export interface SocialNetwork {
	href: string;
	name: string;
	icon: string;
	/** An official profile we own; these hrefs become the Organization JSON-LD `sameAs`. */
	profile: boolean;
}

export const socialNetworks: SocialNetwork[] = [
	{
		href: 'https://github.com/thingsboard',
		name: 'GitHub',
		icon: 'simple-icons:github',
		profile: true,
	},
	{
		href: 'https://www.youtube.com/thingsboard',
		name: 'YouTube',
		icon: 'simple-icons:youtube',
		profile: true,
	},
	{
		href: 'https://www.facebook.com/thingsboard',
		name: 'Facebook',
		icon: 'simple-icons:facebook',
		profile: true,
	},
	{
		href: 'https://www.instagram.com/thingsboard_iot/',
		name: 'Instagram',
		icon: 'simple-icons:instagram',
		profile: true,
	},
	{
		href: 'https://www.linkedin.com/company/thingsboard/',
		name: 'LinkedIn',
		icon: 'simple-icons:linkedin',
		profile: true,
	},
	{
		href: 'https://twitter.com/thingsboard',
		name: 'X',
		icon: 'simple-icons:x',
		profile: true,
	},
];

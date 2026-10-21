export interface SocialNetwork {
	href: string;
	icon?: string;
	iconClass?: string;
	src?: string;
	ariaLabel: string;
	/** An official profile we own; these hrefs become the Organization JSON-LD `sameAs`. */
	profile: boolean;
}

export const socialNetworks: SocialNetwork[] = [
	{
		href: 'https://github.com/thingsboard',
		icon: 'simple-icons:github',
		ariaLabel: 'Link to our Github',
		profile: true,
	},
	{
		href: 'https://www.youtube.com/thingsboard',
		icon: 'simple-icons:youtube',
		ariaLabel: 'Link to our Youtube channel',
		profile: true,
	},
	{
		href: 'https://stackoverflow.com/questions/tagged/thingsboard',
		icon: 'simple-icons:stackoverflow',
		ariaLabel: 'Link to our Stack Overflow page',
		profile: false,
	},
	{
		href: 'https://www.facebook.com/thingsboard',
		icon: 'simple-icons:facebook',
		ariaLabel: 'Link to our Facebook',
		profile: true,
	},
	{
		href: 'https://www.instagram.com/thingsboard_iot/',
		icon: 'simple-icons:instagram',
		ariaLabel: 'Link to our Instagram',
		profile: true,
	},
	{
		href: 'https://www.linkedin.com/company/thingsboard/',
		icon: 'simple-icons:linkedin',
		ariaLabel: 'Link to our linkedin',
		profile: true,
	},
	{
		href: 'https://twitter.com/thingsboard',
		icon: 'simple-icons:x',
		ariaLabel: 'Link to our X',
		profile: true,
	},
];

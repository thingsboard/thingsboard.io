// Privacy copy for the footers, the cookie banner and dialog, and the video notice, so legal can edit it in one place.

// Privacy Policy link required by GDPR Art. 13 and CalOPPA (Cal. Bus. & Prof. Code §22575), plus the Cookie Policy.
export const footerLegalLinks: { href: string; label: string }[] = [
	{ href: '/legal/privacy-policy/', label: 'Privacy Policy' },
	{ href: '/cookie-policy/', label: 'Cookie Policy' },
];

// Opens the cookie preferences dialog (CCPA regs §7015 opt-out link).
export const PRIVACY_CHOICES_LABEL = 'Your Privacy Choices';

// Under the Marketing switch when the browser sends Global Privacy Control (CCPA regs §7025).
export const GPC_MARKETING_NOTE = 'Your browser sent a Global Privacy Control signal, so Marketing stays off.';

// The Cookie Policy link follows it in the markup.
export const CONSENT_BANNER_TEXT = `We use cookies for site analytics, to measure our advertising campaigns and, if you allow it, to load the site search from Google. Nothing optional is set until you choose. You can change your choice anytime in ${PRIVACY_CHOICES_LABEL} at the bottom of every page.`;

// The sentence with the Cookie Policy and Privacy Policy links follows it in the markup.
export const CONSENT_DIALOG_INTRO =
	'We use cookies for our own analytics, to see how our campaigns perform and, if you allow it, to load content from other services such as the Google site search. We never sell your data. Necessary cookies keep the site working and cannot be switched off.';

export const NECESSARY_COOKIES_DESCRIPTION = 'Security, load balancing and remembering your cookie choice.';

// Marketing becomes "(Google Ads, LinkedIn, Meta, partner program)" on the day LinkedIn and Meta return.
export const CONSENT_CATEGORIES: { id: TbConsentCategory; title: string; description: string }[] = [
	{
		id: 'analytics',
		title: 'Analytics',
		description: 'Show us which pages people read and how they find the site, so we can improve it (Google Analytics).',
	},
	{
		id: 'marketing',
		title: 'Marketing',
		description:
			'Show us which of our ad campaigns bring visitors to the site and remember the campaign or partner link you arrived from (Google Ads, partner program). We do not use these cookies to build advertising profiles.',
	},
	{
		id: 'media',
		title: 'External media',
		description:
			'Load the site search from Google when you use it. Google sets its own cookies and shows ads in the search results.',
	},
];

// On the YouTube poster (`YouTubeVideo.astro`); the Cookie Policy link follows it in the markup.
export const VIDEO_NOTICE_TEXT =
	'Playing this video loads it from YouTube (Google), which sets cookies on its own domain.';
// Draft, not approved by legal: shown only if `REQUIRE_MEDIA_CONSENT` is turned on.
export const VIDEO_LOCKED_NOTICE_TEXT =
	'Playing this video turns on External media for the whole site, and YouTube sets cookies.';

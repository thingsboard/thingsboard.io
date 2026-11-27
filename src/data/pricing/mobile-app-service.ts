import type { FaqCategory } from '@data/pricing/types';

/**
 * The White-labeled Mobile App service: what the setup fee and the monthly subscription pay for, what is not
 * included, and what happens without a subscription. One source for the section on /products/mobile/ and the
 * answer in the three pricing FAQs (Cloud, Self-managed, Private Cloud), so the wording cannot drift apart.
 *
 * The prices match the add-on card in add-ons.ts; change them in both places.
 */
export const MOBILE_APP_SERVICE = {
	monthlyUsd: 99,
	setupFeeUsd: 1000,
	/** Typical time from kick-off to the first store release, e.g. "2–3 weeks". */
	leadTime: '2–3 weeks after we receive your branding assets and access to your developer accounts',
	/** Oldest ThingsBoard version a new build supports. The 2.x app needs 4.4. */
	minTbVersion: '4.4',
} as const;

const s = MOBILE_APP_SERVICE;

const usd = (amount: number) => `$${amount.toLocaleString('en-US')}`;

export const MOBILE_APP_SERVICE_PRICE = `${usd(s.monthlyUsd)} per month plus a one-time ${usd(s.setupFeeUsd)} setup fee`;

export const MOBILE_APP_SERVICE_SETUP = [
	'Branding: app name, icon, splash screen, colors and logo',
	'Connection to your ThingsBoard instance: Cloud, Private Cloud or self-managed',
	'Sign-in options: OAuth 2.0, two-factor authentication and QR code login',
	'Push notifications',
	'Publishing to the App Store and Google Play under your own developer accounts',
];

export const MOBILE_APP_SERVICE_SUBSCRIPTION = [
	'New builds for each ThingsBoard release',
	'Updates for the yearly App Store and Google Play requirements, such as the target Android API level and the iOS SDK',
	'Security fixes, released as soon as they are ready',
];

/** Shown after the Custom Development item, which each page renders itself because it carries a link. */
export const MOBILE_APP_SERVICE_NOT_INCLUDED = [
	'Branding changes or other releases you request. We quote them separately.',
	'Developer account fees, paid by you: Apple $99 per year, Google $25 once.',
];

export const MOBILE_APP_SERVICE_WITHOUT_SUBSCRIPTION =
	'The app already installed on your users’ phones keeps working, but we stop publishing new builds. ' +
	'A later ThingsBoard, iOS or Android release can break an old build, and once it falls behind the yearly store ' +
	'requirements, new users may not be able to install it. ' +
	// A one-off update costs the same as the setup fee: one build for the current versions, published once.
	`To bring it up to date, order a one-off update for ${usd(s.setupFeeUsd)}: we update the app for the current ` +
	'ThingsBoard version and store requirements and publish it once to both stores. ' +
	'To keep it working after that, add the monthly subscription.';

export const MOBILE_APP_SERVICE_PAGE = '/products/mobile/#white-labeled-app-service';

type FaqProduct = 'cloud' | 'self-managed' | 'private-cloud';

const FAQ_ID_PREFIX: Record<FaqProduct, string> = {
	cloud: 'tb-cloud',
	'self-managed': 'pe-pay-as-you-go',
	'private-cloud': 'tb-private-cloud',
};

const list = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

/**
 * The "Mobile App" FAQ category for each pricing tab, next to Trendz and Edge. The first question keeps the id
 * the add-on card's tooltip links to (`faqId` in add-ons.ts).
 */
export function mobileAppServiceFaqCategory(product: FaqProduct): FaqCategory {
	const id = (slug: string) => `${FAQ_ID_PREFIX[product]}-${slug}`;
	const requirements = [
		`ThingsBoard ${s.minTbVersion} or later, with the mobile app configured in Mobile Center`,
		...(product === 'cloud' ? ['A ThingsBoard Cloud plan that includes white-labeling: Pilot or higher'] : []),
		'Your own Apple Developer and Google Play developer accounts',
	];
	return {
		id: 'mobileApp',
		label: 'Mobile App',
		items: [
			{
				id: id('what-is-included-in-the-white-labeled-mobile-app-add-on'),
				question: 'What is included in the White-Labeled Mobile App add-on?',
				answer: `<p>Our team builds your branded ThingsBoard mobile app, publishes it to the App Store and Google Play under your own developer accounts, and keeps it working as ThingsBoard, iOS and Android change. The price is ${MOBILE_APP_SERVICE_PRICE} for each app.</p><p>See the <a href="${MOBILE_APP_SERVICE_PAGE}">White-labeled Mobile App service</a> for the full overview.</p>`,
			},
			{
				id: id('mobile-app-setup-fee'),
				question: 'What does the one-time setup fee cover?',
				answer: `<p>The ${usd(s.setupFeeUsd)} setup fee covers:</p>${list(MOBILE_APP_SERVICE_SETUP)}<p>The first release typically takes ${s.leadTime}.</p>`,
			},
			{
				id: id('mobile-app-subscription'),
				question: 'What does the monthly subscription cover?',
				answer: `<p>The ${usd(s.monthlyUsd)} per month subscription covers:</p>${list(MOBILE_APP_SERVICE_SUBSCRIPTION)}`,
			},
			{
				id: id('mobile-app-not-included'),
				question: 'What is not included?',
				answer: list([
					'Custom features and screens. Our <a href="/services/development-services/">Custom Development</a> team quotes them separately.',
					...MOBILE_APP_SERVICE_NOT_INCLUDED,
				]),
			},
			{
				id: id('mobile-app-several-apps'),
				question: 'Can I have more than one branded app?',
				answer: `<p>Yes. Each app, for example one per brand or per client, is priced separately: ${usd(s.monthlyUsd)} per month plus a ${usd(s.setupFeeUsd)} setup fee. The Plan Calculator lets you choose the number of apps.</p>`,
			},
			{
				id: id('mobile-app-without-subscription'),
				question: 'What happens if I cancel or do not renew the subscription?',
				answer: `<p>${MOBILE_APP_SERVICE_WITHOUT_SUBSCRIPTION}</p>`,
			},
			{
				id: id('mobile-app-requirements'),
				question: 'What do I need to get started?',
				answer: `${list(requirements)}<p><a href="/contact-us/">Contact us</a> to start the setup.</p>`,
			},
			{
				id: id('mobile-app-build-yourself'),
				question: 'Can I build and publish the app myself instead?',
				answer:
					'<p>Yes. The ThingsBoard mobile app is <a href="https://github.com/thingsboard/flutter_thingsboard_app" target="_blank" rel="noopener noreferrer">open source</a>, and the <a href="/docs/mobile/pe/">mobile app docs</a> describe how to customize, build and publish it. The add-on is for teams that prefer us to do it and keep it up to date.</p>',
			},
		],
	};
}

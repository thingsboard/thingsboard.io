import type { FaqCategory } from '@data/pricing/types';

// FAQ for the ThingsBoard App 2.0 release post. Rendered inline in
// `src/content/blog/thingsboard-mobile-app-2-0.mdx` by the shared `FaqSection`,
// which also emits the page's FAQPage structured data.
// Questions are phrased the way people search for the problem.
// Item ids are public anchors; do not renumber.

const DOCS = '/docs/mobile/pe';
const REPO = 'https://github.com/thingsboard/flutter_thingsboard_app';

export const mobileApp20Faq: FaqCategory[] = [
	{
		id: 'basics',
		label: 'Basics',
		items: [
			{
				id: 'what-is-thingsboard-app',
				question: 'What is the ThingsBoard App?',
				defaultOpen: true,
				answer: `<p>The ThingsBoard App is an open-source mobile app for ThingsBoard and ThingsBoard Cloud, built with Flutter for iOS and Android. It shows your dashboards, alarms, devices and notifications on a phone or tablet. Use it as is, or as the base of your own branded IoT mobile app. See the <a href="${DOCS}/">ThingsBoard App documentation</a>.</p>`,
			},
			{
				id: 'is-it-open-source',
				question: 'Is the ThingsBoard mobile app open source?',
				answer: `<p>Yes. The source code is in the <a href="${REPO}">flutter_thingsboard_app</a> repository on GitHub under the BSD 3-Clause license, so you can change it, rebrand it and publish it under your own name.</p>`,
			},
			{
				id: 'where-to-download',
				question: 'Where can I download the ThingsBoard mobile app?',
				answer: `<p>ThingsBoard Cloud users can install the ThingsBoard Cloud app, built on ThingsBoard App 2.0, from <a href="https://play.google.com/store/apps/details?id=org.thingsboard.cloud">Google Play</a> or the <a href="https://apps.apple.com/us/app/thingsboard-cloud/id6499209395">App Store</a>. For your own ThingsBoard server, build the app from the <a href="${REPO}">source code</a> with your branding and publish it under your name; see <a href="${DOCS}/getting-started/">Getting started</a>.</p>`,
			},
			{
				id: 'why-one-app',
				question: 'Why is there one app instead of separate CE and PE apps?',
				answer: `<p>ThingsBoard Community Edition and Professional Edition are now <a href="/blog/one-thingsboard-source-available/">one ThingsBoard platform</a>, so the mobile app followed. Version 2.0 continues the former Professional Edition app with all of its history, and the code of the separate editions is removed.</p>`,
			},
			{
				id: 'which-server-versions',
				question: 'Which ThingsBoard versions does App 2.0 support?',
				answer: `<p>ThingsBoard 4.4.0 or later, and ThingsBoard Cloud. The app checks the server version at start-up and on every sign-in. On an older server it shows a <strong>Server update required</strong> page with the server version and does not keep the user signed in. For older servers, build the 1.x version listed in the <a href="${DOCS}/compatibility/">compatibility matrix</a>.</p>`,
			},
			{
				id: 'is-it-more-secure',
				question: 'What makes ThingsBoard App 2.0 more secure?',
				answer: `<p>App data is kept in the device's secure storage: Keychain on iOS and Keystore-encrypted storage on Android. The app checks the server version on every sign-in and keeps no session on an incompatible server, handles sessions revoked elsewhere with a clear "Session has expired" message, and refuses QR codes that lead to a server that doesn't answer or isn't ThingsBoard. Two-factor authentication explains each method and always says why a code was rejected. The underlying <code>thingsboard_client</code> 5.0 drops token refreshes that finish after logout or a new login, so an old session can't overwrite the current one, and masks credentials in its debug logs.</p>`,
			},
		],
	},
	{
		id: 'upgrading',
		label: 'Upgrading',
		items: [
			{
				id: 'signed-out-after-update',
				question: 'Why do users have to sign in again after updating to 2.0?',
				answer: `<p>App 2.0 moved its data to the platform secure storage: Keychain on iOS and Keystore-encrypted storage on Android. After an update from 1.x, users sign in once and choose their region or server again. This happens only once.</p>`,
			},
			{
				id: 'where-are-1x-releases',
				question: 'Where are the 1.x releases of the app?',
				answer: `<p>Releases 1.x of the former Professional Edition app are in the <a href="https://github.com/thingsboard/flutter_thingsboard_pe_app/releases">flutter_thingsboard_pe_app</a> repository. The 1.x tags in <code>flutter_thingsboard_app</code>, such as <code>v.1.8.1</code>, are releases of the former Community Edition app.</p>`,
			},
		],
	},
	{
		id: 'developers',
		label: 'Developers',
		items: [
			{
				id: 'which-dart-client',
				question: 'Which Dart client does ThingsBoard App 2.0 use?',
				answer: `<p><a href="https://pub.dev/packages/thingsboard_client">thingsboard_client</a> 5.0 from pub.dev, the single generated Dart client for ThingsBoard. It replaces <code>thingsboard_pe_client</code>. If your fork calls the API directly, see <a href="/docs/pe/reference/dart-client/#migrating-from-earlier-clients">Migrating from earlier clients</a>.</p>`,
			},
			{
				id: 'build-requirements',
				question: 'What do I need to build ThingsBoard App 2.0?',
				answer: `<p>Flutter 3.47.9, the version pinned in the repository's <code>.fvmrc</code>. Building for iOS needs a Mac with Xcode 26.2 or later: iOS plugins are now integrated through Swift Package Manager, and only <code>flutter_esp_ble_prov</code> and <code>plugin_wifi_connect</code> still use CocoaPods. See <a href="${DOCS}/getting-started/">Getting started</a>.</p>`,
			},
		],
	},
];

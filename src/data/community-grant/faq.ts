import type { FaqCategory } from '@data/pricing/types';
import { SOURCE_AVAILABLE_FROM_VER } from '@data/versions';
import { announcementDateHtml as date } from '@data/community-grant/announcement-date';
import { LTS_4_2_EOL, REGISTRATION_CLOSES } from '@data/community-grant/key-dates';

// FAQ for `/community-grant-program/`, rendered by the shared `FaqSection`,
// which also emits the page's FAQPage structured data. Copy is marketing's;
// category order and item order follow their document.
// Item ids are public anchors — the accordion deep-links and the per-item
// copy-link button both use them, so treat them as URLs and do not rename.

// `subject` must match the `Community Grant` option in ContactForm, which pre-selects by value.
export const CONTACT = '/contact-us/?subject=Community%20Grant';
const contact = (label = 'contact us') => `<a href="${CONTACT}">${label}</a>`;

export const communityGrantFaq: FaqCategory[] = [
	{
		id: 'grant-for-me',
		label: 'Is the grant for me?',
		items: [
			{
				id: 'cg-who-can-get',
				question: 'Who can get a Community Grant?',
				defaultOpen: true,
				answer: `<p>Any organization that was already running a ThingsBoard Community Edition deployment in production before ${date}. Register your deployment, and we will calculate your grant based on what you were already running.</p>`,
			},
			{
				id: 'cg-do-i-need-one',
				question: 'Do I actually need one?',
				answer: `<p>Only if you want to move an existing deployment to ThingsBoard ${SOURCE_AVAILABLE_FROM_VER} or later. If you stay on your current version, you need nothing — it remains under Apache 2.0 and no license or key is required for it.</p><p>One date worth knowing: Community Edition 4.3 LTS receives security updates until ${REGISTRATION_CLOSES}. After that it keeps running, but stops receiving official fixes.</p>`,
			},
			{
				id: 'cg-existing-deployment',
				question: 'What counts as an existing deployment?',
				answer: `<p>A ThingsBoard Community Edition deployment that was already running in production before ${date}. Your grant is calculated from that deployment and stays with it for its lifetime.</p>`,
			},
			{
				id: 'cg-started-after',
				question: 'I started using ThingsBoard after the announcement. Can I still get one?',
				answer: `<p>No. The grant is only for deployments that already existed before ${date}.</p><p>Production use is free under a Free License if either: commercial use with up to 100 devices across your Organization, on no more than one production server; or non-commercial use — education and non-profit organizations — with up to 1,000 devices, on any number of servers. The Free License includes the entire feature set: every feature is free, including integrations, the scheduler, reporting, and advanced security. Beyond those limits, see the <a href="/pricing/">Pricing page</a>.</p>`,
			},
			{
				id: 'cg-multiple-deployments',
				question: 'I have multiple deployments. Do I need to register each one?',
				answer:
					'<p>Yes, and each one gets its own grant. A grant attaches to a single deployment, so every isolated production environment you were running registers separately and receives its own capacity — there is no limit on how many your organization can hold. What is not allowed is registering the same environment more than once to collect several grants for it.</p>',
			},
			{
				id: 'cg-transfer',
				question: 'Can I transfer my grant to another organization?',
				answer:
					'<p>No. It belongs to the organization that registered the deployment. It does transfer to a successor in a merger, acquisition, or change of control — tell us, and we will move the record.</p>',
			},
		],
	},
	{
		id: 'what-do-i-get',
		label: 'What do I get?',
		items: [
			{
				id: 'cg-how-calculated',
				question: 'How is my Community Grant calculated?',
				answer: `<p>From the size of your deployment on ${date}. We take your device count, your production server count, and any branding you had already changed, and grant you all of it — plus 10% extra device headroom.</p>`,
			},
			{
				id: 'cg-device-counting',
				question: 'How are devices counted?',
				answer: `<p>A device is each individual unit you monitor or control — not a tag, a data point, or a platform record — whether it connects directly or through a gateway. 200 meters reporting through one gateway are 200 devices; the gateway counts only if it reports data of its own.</p><p>Your granted capacity is your device count on ${date} plus 10%, rounded up to the next 10 devices. The extra is at least 10 devices and never more than 1,000, and every grant covers at least 100 devices in total.</p><ul><li>30 devices → 100 granted (minimum applies)</li><li>104 devices → 124 granted (headroom 20)</li><li>500 devices → 550 granted (headroom 50)</li><li>3,268 devices → 3,598 granted (headroom 330)</li><li>15,000 devices → 16,000 granted (headroom capped at 1,000)</li></ul><p>Counting is per deployment, not per organization. Your capacity is calculated once, at registration, and does not grow with your deployment.</p>`,
			},
			{
				id: 'cg-production-server',
				question: 'What counts as a production server?',
				answer:
					'<p>One running ThingsBoard server process that serves your business. If you run ThingsBoard on a single machine, that is one. If you run several for high availability or scale, each one counts.</p><p>Registration reads this number from your deployment, so you do not need to work it out yourself. Unlike devices, production servers receive no extra headroom — you keep exactly what you were already running.</p>',
			},
			{
				id: 'cg-remove-devices',
				question: 'What if I remove devices after I register?',
				answer: `<p>Your grant does not change. It is based on the deployment you were running before ${date}, not on how many devices are connected today.</p>`,
			},
			{
				id: 'cg-register-later',
				question: 'If I register later, which devices count?',
				answer: `<p>Only those that existed before ${date}. You can register any time before the deadline, but anything added after that date is not part of your grant.</p>`,
			},
			{
				id: 'cg-updates',
				question: 'Do I still get updates?',
				answer: `<p>Yes. Your grant covers ${SOURCE_AVAILABLE_FROM_VER} and every later release, for as long as you stay within your granted capacity, at no cost. There is never a maintenance fee on your grant.</p>`,
			},
			{
				id: 'cg-ai-tokens',
				question: 'Do I get AI features?',
				answer:
					'<p>Your grant includes 5M AI tokens for the platform\u2019s built-in AI features, granted once when you register rather than renewed each period.</p><p>When they run out, buy more the same way any perpetual license holder does. The AI features stay available; only the tokens are consumed.</p>',
			},
			{
				id: 'cg-support',
				question: 'What support do I get?',
				answer:
					'<p>Community Support is included with your grant at no charge: public documentation and community forums, with no guaranteed response times.</p><p>Purchase of Professional Pack includes the first year of maintenance, which gives you Help Desk access — our official support channel. After that first year, Help Desk continues while you keep maintenance renewed.</p>',
			},
			{
				id: 'cg-version-required',
				question: 'Do I need to be on a specific version to register?',
				answer: `<p>To register, your deployment must run the latest 4.3 LTS patch. Registration and verification run from inside the platform, and older versions cannot apply without updating first. See the <a href="/docs/installation/upgrade-instructions/">Community Edition upgrade instructions</a>.</p>`,
			},
		],
	},
	{
		id: 'how-to-register',
		label: 'How to register',
		items: [
			{
				id: 'cg-how-register',
				question: 'How do I register?',
				answer:
					'<p>From inside your deployment. It runs a quick read-only check against your own database; you sign in to the <a href="https://license.thingsboard.io/" target="_blank" rel="noopener noreferrer">License Portal</a> and accept the <a href="/legal/community-grant-license-agreement/">Community Grant License Agreement</a>, and your perpetual grant key is issued and stored in your Portal account.</p><p>Registration is free and self-service, and for most deployments it takes under a minute. Larger deployments may need a short additional review.</p>',
			},
			{
				id: 'cg-upload-database',
				question: 'Will I have to upload my database or telemetry?',
				answer:
					"<p>No. The check produces one small encrypted report with structural information only — entity counts, creation timestamps, table sizes, and your deployment's identifiers. It never includes telemetry values, device names, or dashboard contents, and you never upload your database.</p>",
			},
			{
				id: 'cg-no-internet',
				question: 'What if my deployment has no internet access?',
				// The document links an offline registration guide that does not exist
				// yet; the steps it would give are the ones the page body already
				// states, so they are repeated here and the guide's slot goes to us.
				answer: `<p>There is an offline path: download the read-only reporting tool from the License Portal on any connected machine, run it against your deployment, and submit the encrypted report through the Portal yourself. If anything in that is unclear, ${contact()} and we will walk you through it.</p>`,
			},
			{
				id: 'cg-register-before-upgrade',
				question: `Do I need to register before upgrading to ${SOURCE_AVAILABLE_FROM_VER}?`,
				answer: `<p>Yes, and it has to be that way round. The key issued at registration is what licenses ${SOURCE_AVAILABLE_FROM_VER}, and registration runs from inside a 4.3 deployment — so there is no path that upgrades first.</p><p>Once the key is in your Portal account you can upgrade whenever you are ready. See <a href="/docs/installation/register-community-grant/">how to register your deployment</a>.</p>`,
			},
			{
				id: 'cg-wrong-numbers',
				question: 'What if something is wrong with my numbers?',
				answer:
					'<p>Tell us. Genuine mistakes get corrected — the process is built to protect honest users, not to catch them out. Registration reads your numbers from your own database, so there is nothing to fill in wrongly. Tampering with that database to inflate what it reports, or altering your deployment history, violates the license terms: it voids the grant from the start and makes standard commercial fees payable for the whole period.</p>',
			},
		],
	},
	{
		id: 'running-deployment',
		label: 'Running your deployment',
		items: [
			{
				id: 'cg-after-upgrade',
				question: `What changes after I upgrade to ${SOURCE_AVAILABLE_FROM_VER}?`,
				answer: `<p>Nothing you can see. Your deployment runs under your Community Grant, with the same devices, the same production servers, and the same branding you had before.</p><p>One thing to plan for: if you have local modifications to the source code, nothing of yours disappears — but after the upgrade you re-apply them to the new version yourself. If that looks difficult, ${contact()} and we will help you work through it.</p>`,
			},
			{
				id: 'cg-infrastructure-changes',
				question: 'Does my Community Grant survive changes to my infrastructure?',
				answer: `<p>Yes. Your grant is tied to your deployment, not to the machine it runs on. Moving to new hardware or a new hosting provider, restoring from a backup, or replacing a production server all leave your grant untouched — including any branding covered by it. You only pay when you add a production server beyond your granted count, not when you replace one.</p><p>If you are planning a migration or a restore, ${contact()} beforehand and we will confirm your license stays linked to the deployment.</p>`,
			},
			{
				id: 'cg-merge-deployments',
				question: 'What if I merge two deployments into one?',
				answer: `<p>${contact('Contact us')} first. Each grant covers one deployment, and two grants cannot be added together into a single larger one — so merging without planning it can leave you with less capacity than you had across both. Tell us your target structure, and we will work out the approach that keeps as much of your granted capacity as possible.</p>`,
			},
			{
				id: 'cg-device-limit',
				question: 'What happens when I reach my device limit?',
				answer:
					'<p>Nothing breaks. Existing devices, data, and services keep running normally; new devices above your capacity are simply not added, and the platform shows a prompt to increase your licensed capacity.</p><p>You can add devices yourself, at any time, straight from the License Portal. It is self-service, it takes effect immediately, and nothing about your running solution stops while you do it. Devices are sold individually at up to 1 USD each, and the price per device goes down as the volume grows.</p>',
			},
			{
				id: 'cg-internet-required',
				question: 'Does my deployment need internet access to keep running?',
				answer: `<p>On a standard key, yes. The platform checks in with our license server periodically and tolerates interruptions of up to 48 hours. After that, it shuts down until the next successful check. Nothing is deleted, and it comes back as soon as the connection does. ${contact('Contact us')} if your deployment can only run without external connectivity.</p>`,
			},
		],
	},
	{
		id: 'when-do-i-pay',
		label: 'When do I pay?',
		items: [
			{
				id: 'cg-ever-pay',
				question: 'Will I ever have to pay for my Community Grant?',
				answer:
					'<p>No. It is perpetual and free. There are no renewal fees, subscription fees, or maintenance fees on the capacity your grant covers, and we will never ask you for back payment or fees for past use.</p>',
			},
			{
				id: 'cg-what-can-i-buy',
				question: 'What can I buy, and when would I need to?',
				answer:
					'<p>Three things, independently of each other: more device capacity, production servers, or the Professional Pack. You need them only if you grow beyond your granted capacity or want capabilities your grant does not include.</p><p>Extra capacity is a one-time perpetual purchase, not a subscription, and your Community Grant license stays in place when you buy it. Devices are sold individually at up to 1 USD each, with the price per device going down as the volume grows.</p>',
			},
			{
				id: 'cg-professional-pack',
				question: 'What is the Professional Pack and what does it cost?',
				answer:
					'<p>Professional Pack is an optional add-on available only to Community Grant participants. In a single one-time payment it unlocks every remaining feature of the platform — everything your grant does not already include, such as integrations, the scheduler, reporting, and the white-labeling features that manage branding from the interface without modifying the source code. It is defined by what it adds to your grant rather than by a fixed list, so it covers new capabilities as they ship.</p><p>The first year of maintenance is included, so you also get Help Desk access — first response within one business day for an issue preventing production use, two business days otherwise.</p><p>A flat 2,999 USD, once, per deployment, whatever its size. It is not time-limited, so you can buy it whenever you need it, and it does not change your granted capacity.</p><p>Your grant already includes everything the former Community Edition had, plus the advanced security features that used to be Professional Edition only: fine-grained RBAC, SSO and OAuth2, and Secrets Storage.</p>',
			},
			{
				id: 'cg-wrong-declaration',
				question: 'What if my Free License or Community Grant declaration turns out to be wrong?',
				answer: `<p>Free License keys and Community Grants depend on the declarations you make being truthful and accurate — your non-commercial status, your device count, and who your Organization is.</p><p>Honest mistakes are fixable: ${contact()} and we'll help you correct your registration or move to the right license. A false, deceptive, or manipulated declaration is different — it is a material breach of our Terms of Use, and it voids the no-charge permission from the start, so the use counts as unlicensed and standard commercial fees then apply retroactively for the whole period, alongside any other remedy available to us.</p><p>If your setup, architecture, or Organization doesn't fit the standard declarations cleanly, don't guess — ${contact()} first and we'll clarify or arrange custom terms before you register.</p>`,
			},
			{
				id: 'cg-maintenance',
				question: 'Do I need maintenance?',
				answer:
					'<p>Only if you buy something, and even then it is optional. The first year of maintenance is included in the price of any purchase. From the second year onward it costs 17% per year of what you paid — for the Professional Pack on its own, that is 510 USD.</p><p>Maintenance covers source code updates and Help Desk support for the paid parts of your license. It never applies to your Community Grant. If you do not renew, your deployment keeps running and you keep everything you bought; you simply stop receiving source updates and Help Desk support until you renew.</p>',
			},
			{
				id: 'cg-go-back',
				question: 'Can I go back to my Community Grant after buying something?',
				answer:
					'<p>Yes, at any time, at no charge, with no penalty and no deadline. Bring your deployment back within your granted capacity, stop using the capabilities your grant does not cover, and tell us — we reissue your key at granted scope. You never lose the capacity your grant protects.</p>',
			},
		],
	},
	{
		id: 'white-labeling',
		label: 'White-labeling',
		items: [
			{
				id: 'cg-existing-branding',
				question: 'I removed ThingsBoard branding before the announcement. What happens now?',
				answer:
					"<p>You keep it, free, at your granted scale, with no back payment and no relicensing fee. You continue maintaining it the way you always have: re-applying your changes to each new version's source.</p>",
			},
			{
				id: 'cg-add-white-labeling',
				question: 'Can I add white-labeling later?',
				answer:
					'<p>Yes, through the Professional Pack. That gives you both the right to remove or replace ThingsBoard branding and the built-in white-labeling feature, which manages branding without touching the source code. Under the grant alone, the default branding and the “Powered by ThingsBoard” badge stay in place.</p><p>White-labeling is licensed per deployment, not per device, so your branding choice never increases the cost of growth.</p>',
			},
			{
				id: 'cg-mixed-branding',
				question: 'Some of my deployments are rebranded, and some are not. How does that work?',
				answer: `<p>Each deployment is treated separately. One that was already rebranded before ${date} keeps its branding under its own grant. One that still shows ThingsBoard branding does not gain the right to remove it — that comes with the Professional Pack for that deployment.</p>`,
			},
		],
	},
	{
		id: 'versions-dates',
		label: 'Versions and dates',
		items: [
			{
				id: 'cg-keep-old-version',
				question: 'Can I keep using ThingsBoard 4.3 or an older version?',
				answer: `<p>Yes, indefinitely. Every Community Edition release published before ${SOURCE_AVAILABLE_FROM_VER} stays under Apache 2.0 permanently, and no license or key is ever needed for it. Community Edition 4.3 LTS receives security updates until ${REGISTRATION_CLOSES}, and 4.2 LTS until ${LTS_4_2_EOL}. After those dates, the versions keep running but no longer receive official fixes.</p><p>From ${SOURCE_AVAILABLE_FROM_VER} onward, the unified platform is licensed under the Business Source License 1.1. The source stays public: you can read, build, modify, fork, and redistribute it, and use it freely for development and testing. Production use is free within the Free License limits. And every release automatically becomes Apache 2.0 four years after it ships.</p>`,
			},
			{
				id: 'cg-important-dates',
				question: 'What are the important dates?',
				answer: `<ul><li><strong>${date}</strong> — registration opens, and this is the date your deployment size is measured against.</li><li><strong>${LTS_4_2_EOL}</strong> — 4.2 LTS stops receiving security updates.</li><li><strong>${REGISTRATION_CLOSES}</strong> — registration closes, 4.3 LTS stops receiving security updates, and grandfathered branding rights can no longer be registered.</li></ul><p>There is no advantage to waiting, and no advantage to rushing: your grant is calculated from ${date} either way.</p>`,
			},
			{
				id: 'cg-miss-deadline',
				question: `What happens if I miss the ${REGISTRATION_CLOSES} deadline?`,
				answer: `<p>You can no longer get a grant. Registration closes on ${REGISTRATION_CLOSES}, and after that the route to a free perpetual key is shut: moving to ${SOURCE_AVAILABLE_FROM_VER} or later means buying a commercial license, like any other new deployment. That is the reason to register before the date rather than after it.</p><p>Your existing versions are unaffected either way: every release published before ${SOURCE_AVAILABLE_FROM_VER} stays under Apache 2.0 permanently, so nothing you run today stops working.</p><p>If you have already registered, the deadline does not affect you at all. You can buy the Professional Pack, add capacity, or go back to your grant at any point afterwards, with no re-registration.</p>`,
			},
		],
	},
];

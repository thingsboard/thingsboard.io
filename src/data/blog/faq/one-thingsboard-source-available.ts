import type { FaqCategory } from '@data/pricing/types';
import { CONTACT } from '@data/community-grant/faq';
import { announcementDateHtml, apacheConversionDateHtml } from '@data/community-grant/announcement-date';

// FAQ for the BUSL relicensing announcement post. Rendered inline in
// `src/content/blog/one-thingsboard-source-available.mdx` by the shared
// `FaqSection`, which also emits the page's FAQPage structured data.
// Category order mirrors the legal team's FAQ document; the sidebar labels are
// shortened to single-line noun phrases (the document's own headings repeat
// "Customers"/"Users" and wrap the 280px rail).
// Item ids are public anchors — the accordion deep-links and the per-item
// copy-link button both use them, so treat them as URLs and do not renumber.

export const buslFaq: FaqCategory[] = [
	{
		id: 'pe-customers',
		label: 'Professional Edition',
		items: [
			{
				id: 'pe-customer-changes',
				question: "I'm already a Professional Edition customer. What changes?",
				answer:
					"<p>Your existing agreement, pricing, license, white-labeling rights, and support remain unchanged — and you gain access to the merged product's source code. Anything you newly purchase is offered under the current commercial terms.</p>",
			},
			{
				id: 'maker-prototype-plans',
				question: 'What happens to Maker and Prototype plans?',
				answer:
					'<p>Your subscription continues automatically. You can <a href="/contact-us/">contact us</a> if you want to replace your current license with a Free License.</p>',
			},
		],
	},
	{
		id: 'ce-users',
		label: 'Community Edition',
		items: [
			{
				id: 'ce-user-free-license',
				question: "I'm a Community Edition user — what happens to my deployment?",
				defaultOpen: true,
				answer: `<p><strong>Keep what you run today free.</strong> The Community Grant Program covers your current deployment at its registered scale; you pay only for growth beyond it. Read the full terms, or <a href="${CONTACT}">talk to us</a> about your deployment.</p><a class="faq-cta-link" href="/community-grant-program/">Community Grant Program</a>`,
			},
		],
	},
	{
		id: 'cloud-customers',
		label: 'ThingsBoard Cloud',
		items: [
			{
				id: 'cloud-unaffected',
				question: 'I use ThingsBoard Cloud. Does this affect me?',
				answer:
					'<p>No. This change applies to the on-premises (self-hosted) ThingsBoard. Cloud plans, pricing, and customer experience remain unchanged.</p>',
			},
		],
	},
	{
		id: 'other-products',
		label: 'Other products',
		items: [
			{
				id: 'other-products-coverage',
				question: 'Does the new license cover Trendz, Edge, Gateway, mobile apps, and TBMQ?',
				answer:
					'<p>No — the license covers <strong>only</strong> the platform repository. Software products we publish in separate repositories are licensed under their own terms.</p>',
			},
			{
				id: 'contributing-code',
				question: 'I contribute code to ThingsBoard — does this change anything for me?',
				answer:
					'<p>You can keep reading, building, modifying, and submitting pull requests exactly as before. One new step: on your first pull request you will be asked to sign the ThingsBoard Contributor License Agreement once, through a link in the pull request; it takes a minute, and a signature covers all your later contributions. The CLA does not take your copyright: you keep it and grant us a license to use your contribution under the project license and to relicense it as ThingsBoard, Inc. relicenses the project.</p>',
			},
		],
	},
	{
		id: 'free-licenses',
		label: 'Free License',
		items: [
			{
				id: 'what-is-free',
				question: 'What is free?',
				answer:
					'<p>Production use is free under a Free License if either:</p><ul><li>commercial use with up to 100 devices across your Organization, on no more than one Production Instance;</li><li>non-commercial use — education and non-profit organizations — with up to 1,000 devices, on any number of Production Instances.</li></ul>',
			},
			{
				id: 'non-profit-track',
				question: 'My organization is a non-profit / municipality / school — which track?',
				answer:
					"<p>If your organization is educational or non-profit and the use has no commercial purpose, you're on the non-commercial track: up to 1,000 devices, any number of Production Instances.</p>",
			},
			{
				id: 'hobbyist-track',
				question: "I'm a hobbyist / running a personal project / doing independent research — which track am I on?",
				answer:
					'<p>If your project has no commercial purpose, you are on the non-commercial track: up to 1,000 devices. If it earns money or serves a business, the commercial track: up to 100 devices on one server.</p>',
			},
			{
				id: 'paid-academic-research',
				question: 'Does paid academic research qualify as non-commercial?',
				answer:
					"<p>The researcher's salary doesn't matter — what matters is whether the research serves a commercial purpose.</p><p>Independent scholarly research at an educational or non-profit institution is non-commercial; a study commissioned by a company for its commercial advantage is commercial use (up to 100 devices free, or a Commercial License).</p>",
			},
			{
				id: 'how-devices-are-counted',
				question: 'How are devices counted? Is every sensor a device?',
				answer:
					"<p>We count the individual units you monitor or control — not tags, data points, or platform records.</p><ul><li>A pump with 5 temperature sensors, 5 flow meters, 3 pressure sensors, a PLC, and a gateway is <strong>one</strong> device: all those readings describe the same machine.</li><li>A fleet of 50 trucks is 50 devices.</li><li>One gateway forwarding data from sensors in 100 rooms is 100 devices — one per monitored room.</li><li>Gateways, PLCs, and other intermediaries aren't counted for data they merely forward. How you model things on the platform doesn't change the count.</li></ul>",
			},
			{
				id: 'limits-scope',
				question: 'Do limits apply per server, per account, or per company?',
				answer:
					"<p>Per Organization: you together with every entity that controls, is controlled by, or is under common control with you. Devices are counted across all your deployments, added together — including deployments run for you by someone else. Splitting a fleet across Production Instances or accounts doesn't multiply the Free License.</p>",
			},
			{
				id: 'server-limits',
				question: 'Is there a limit on Production Instances or clusters in the Free License?',
				answer:
					'<p>It depends on the track.</p><p>Commercial (up to 100 devices): production runs on one Production Instance — a fully functional deployment corresponding to a single server process.</p><p>Non-commercial (up to 1,000 devices): no limit on Production Instances.</p><p>A process that only does auxiliary UI, transport, or integration work is not a fully functional deployment, so it is not a separate Production Instance — a small setup with separate transport nodes still qualifies. A cluster is different: it runs at least two services of the same type, so each one counts, and commercial production on a cluster needs a Commercial License.</p>',
			},
		],
	},
	{
		id: 'when-to-pay',
		label: 'When you pay',
		items: [
			{
				id: 'what-is-paid',
				question: 'What ThingsBoard capabilities are paid now?',
				answer:
					'<p>Three things:</p><ul><li>white-labeling — replacing or removing the ThingsBoard branding, at any scale;</li><li>help desk — the official technical support channel for priority assistance;</li><li>scale — more than 100 devices commercially (or more than 1,000 non-commercially), or commercial production on more than one Production Instance.</li></ul>',
			},
			{
				id: 'what-counts-as-white-labeling',
				question: 'What exactly counts as white-labeling? Does changing the logo count?',
				answer:
					'<p>White-labeling means removing or replacing the visible ThingsBoard branding — so swapping the ThingsBoard logo or name for your own is white-labeling and needs a Commercial License (or a Professional Pack for Community Grant Program participants), at any scale.</p><p>Configuring dashboards, themes, colors, and content while the "Powered by ThingsBoard" attribution stays visible is not white-labeling and is free.</p>',
			},
			{
				id: 'hosting-for-clients',
				question: 'Can I host ThingsBoard for my clients / offer it as SaaS?',
				answer:
					"<p>You may serve your clients from a deployment you operate, including multi-tenant, under your own key. Their devices count toward your Organization's limits, and ThingsBoard branding must stay visible. A client that runs its own deployment needs a key issued to its own Organization. When the total scale outgrows the Free License, or you need to white-label your solution, you need a Commercial License.</p>",
			},
			{
				id: 'build-and-sell-product',
				question: 'Can I build my own product on ThingsBoard and sell access to it?',
				answer:
					"<p>Yes — that has always been the intent, and it's free as long as:</p><ul><li>your Organization's devices stay within your Free License limits;</li><li>the \"Powered by ThingsBoard\" attribution stays visible (you haven't white-labeled).</li></ul><p>When the total scale outgrows the Free License, or you need to white-label your solution, you need a Commercial License.</p>",
			},
			{
				id: 'integrator-services',
				question: "I'm an integrator: I get paid to deploy and maintain ThingsBoard for clients. Allowed?",
				answer:
					'<p>Yes. You sell your services; the client is the licensee with their own key and limits. Nothing in the license restricts consulting, integration, configuration, or support work.</p>',
			},
			{
				id: 'subscription-vs-perpetual',
				question: "Subscription or Perpetual — what's the difference?",
				answer:
					'<p>Both are variants of the same Commercial License.</p><p><em>Subscription</em>: a recurring fee; new versions are included while active. On cancellation, the deployment reverts to the Free License if it fits; otherwise, it moves to restricted operation until you restore a valid license.</p><p><em>Perpetual</em>: a one-time purchase, yours forever; new versions after the first year require the update fee — not paying it changes nothing about the versions you already have.</p>',
			},
			{
				id: 'cost-beyond-free',
				question: 'How much does it cost to go beyond the Free License?',
				answer:
					'<p>Pricing for scale, white-labeling, and commercial support is published on the <a href="/pricing/?section=thingsboard-pe-options&amp;product=thingsboard-pe">Pricing Page</a>, and it is the same as it was for Professional Edition before relicensing — the price has not gone up. For existing Community users, the Community Grant covers your current scale for free; you pay only for growth beyond it, and optionally for a Professional Pack.</p>',
			},
		],
	},
	{
		id: 'license-keys',
		label: 'License keys',
		items: [
			{
				id: 'license-key-needed',
				question: 'Do I need a license key?',
				answer:
					'<p>For production — yes: every production deployment runs with a key from the <a href="https://license.thingsboard.io" target="_blank" rel="noopener noreferrer">ThingsBoard License Portal</a>. A Free License key is issued instantly, self-service, at no charge; paid scopes get a key with purchase. For development, testing, and anything non-production, no key is needed. Without a key, the software runs in development mode: unlimited devices, a visible development notice, and the full feature set except white-labeling.</p><p>Keyless development mode counts cumulative run-time up to 30 days; a free Development key waives that limit (the deployment stays under the development notice and confirms non-production use every 30 days) and registers you so we can send security notices.</p><p>Building from source with the license check disabled is the same keyless development mode. Development mode is a technical state, not a license status — it never reclassifies production use: if real operations depend on the deployment, it needs a production key regardless of the mode, the notice, or what you name the environment.</p>',
			},
			{
				id: 'reaching-device-limit',
				question: 'What happens when I reach my device limit?',
				answer:
					'<p>Nothing breaks.</p><p>Existing devices, data, and services keep working; only new device connections are refused until capacity is increased. We never disconnect running devices or delete data.</p><p>This works the same on every path — Free License, Community Grant, and Commercial License: the limit gates new connections only, and capacity can be increased at any time through the License Portal.</p>',
			},
			{
				id: 'offline-air-gapped',
				question: 'Can I run ThingsBoard fully offline / air-gapped?',
				answer:
					'<p>Yes. An offline key is available for a Perpetual License where your Order authorizes an Offline Deployment: it encodes your licensed scope in the key itself and needs no validation against our license server.</p><p>Get it from the License Portal on any machine with internet access, then activate your deployment with it. (An online key, by contrast, is validated periodically and tolerates interruptions of up to 48 hours. After that, the management interface locks until the next successful check. Connected devices keep sending data, and nothing is deleted.)</p>',
			},
			{
				id: 'what-data-is-sent',
				question: 'What data does my ThingsBoard instance send to you?',
				answer:
					"<p>Under a standard online license, the instance contacts our License Server to validate the license (about hourly) and, by default, attaches a usage snapshot about every 12 hours.</p><p>The snapshot contains only aggregate, installation-wide technical figures: entity counts (tenants, devices, assets, users), which features are in use and how heavily, previous-day processing volumes, database size, product version, and packaging.</p><p>It never contains device telemetry or message content, entity or user names, credentials, configuration, or scripts, and it doesn't break anything down by tenant, user, or device. We're honest about one thing: this data isn't anonymous — it travels with the identifiers used for license validation, which is what makes compliance work. We also record the network address your instance connects from.</p><p>You can switch the usage snapshot off at any time with a documented flag — licensing, functionality, and support are unaffected; validation and the connecting-address record continue.</p>",
			},
			{
				id: 'offline-reporting',
				question: 'What does an offline (air-gapped) deployment report?',
				answer:
					"<p>Offline licenses don't send the usage snapshot at all.</p><p>Instead, each node performs a short license check-in at startup and about hourly: the customer and subscription identifiers in the offline license, plus software version and packaging — no usage counters, no telemetry, no data about your users.</p><p>A genuinely disconnected environment simply never delivers these check-ins, and the platform keeps working regardless.</p>",
			},
			{
				id: 'third-party-build',
				question: 'Someone sold me a ThingsBoard build / appliance. Is my deployment legal?',
				answer:
					"<p>Distributing and selling builds is allowed.</p><p>Your production deployment, though, must run a key issued to <strong>your</strong> Organization — register at the License Portal (free within the Free License limits). A key issued to the vendor's Organization doesn't cover your deployment.</p>",
			},
			{
				id: 'production-examples',
				question: 'Real-world production and non-production usage examples?',
				answer:
					'<ul><li>An 18-month "beta" with 500 customer installations — production (customers rely on it).</li><li>A two-year R&amp;D build with 10 bench devices and no customers — non-production (take as long as you need).</li><li>A full-scale staging mirror beside a real deployment — non-production; its devices are already counted once in production.</li></ul>',
			},
		],
	},
	{
		id: 'busl',
		label: 'The BUSL license',
		items: [
			{
				id: 'which-license',
				question: 'What license is ThingsBoard 4.4 under?',
				answer:
					"<p>The Business Source License 1.1 (BUSL). The source code is public: anyone may read, copy, modify, fork, and redistribute it, and use it freely for development and testing — no key, no conditions. Production use is free within the limits above. Four years after each version's release, that version automatically becomes Apache 2.0.</p>",
			},
			{
				id: 'still-open-source',
				question: 'Is ThingsBoard still open source?',
				answer:
					'<p>Strictly speaking, no — while the BUSL restrictions apply, ThingsBoard is source-available, not OSI-approved open source, and we say that plainly. The full source stays public on GitHub, and every release automatically converts to Apache 2.0 (true open source) four years after it ships.</p>',
			},
			{
				id: 'source-available-meaning',
				question: 'What does "source-available" mean for me?',
				answer:
					'<p>The complete source code stays public on GitHub. You can read it, build it, modify it, self-host it, fork it, and submit pull requests. The license restricts only production use beyond the free limits without a Commercial License.</p>',
			},
			{
				id: 'when-apache-2',
				question: 'When does the code become fully open source?',
				answer: `<p>Each version converts to Apache 2.0 exactly four years after its own release date — the LICENSE file states the rule ("four years from the date the Licensed Work is published"). For ThingsBoard 4.4.0, released ${announcementDateHtml}, that means ${apacheConversionDateHtml}.</p>`,
			},
			{
				id: 'where-to-read-license',
				question: 'Where can I read the actual license?',
				answer:
					'<p>In the <a href="https://github.com/thingsboard/thingsboard/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE file</a> at the root of the ThingsBoard GitHub repository. We encourage customers and their legal teams to review it directly — the license, not this FAQ, is the legally operative text. Paid licenses are governed by the <a href="/legal/license-agreement/">ThingsBoard License Agreement</a>.</p>',
			},
			{
				id: 'what-you-accept',
				question: 'What do I accept, and when?',
				answer:
					'<p>Registering at the License Portal means accepting the <a href="/legal/terms-of-use/">License Portal Terms of Use</a> and the <a href="/legal/privacy-policy/">Privacy Policy</a> — nothing about the software yet.</p><p>What you accept for the software depends on the key.</p><p>A <strong>Free License</strong> key (non-commercial, or no-charge commercial within the Additional Use Grant) is issued on your acceptance of the <strong>BUSL and the Portal Terms</strong> — the ThingsBoard License Agreement does <em>not</em> apply to no-charge use.</p><p>A <strong>paid Commercial License</strong> is accepted at checkout, together with your Order: the <strong>ThingsBoard License Agreement, its Order, and the Portal Terms</strong>.</p>',
			},
			{
				id: 'additional-use-grant',
				question: 'What is the Additional Use Grant?',
				answer:
					'<p>It is the part of the BUSL license file where we grant free production use. "Additional" means additional to the base rights (copy / modify / fork / redistribute / non-production) — not "extra payment." Everything in the Additional Use Grant is free.</p>',
			},
			{
				id: 'what-conditions-apply-to',
				question: 'What do the conditions (branding, license key) apply to?',
				answer:
					'<p>Only to no-charge production use. Forks, development, testing, CI, and research need no key and carry no conditions — they run under the base grant.</p>',
			},
			{
				id: 'paid-terms-location',
				question: "Where are the paid terms, and why aren't they in the license?",
				answer:
					"<p>BUSL does not allow paid terms inside the grant — the grant may only add rights. Paid use sits outside the license's grants. Commercial terms — Subscription, Perpetual, scopes, and keys for paid capacity — live in the ThingsBoard License Agreement, which you accept when a key is issued, with pricing on the Pricing Page.</p>",
			},
			{
				id: 'busl-legal-safety',
				question: 'Is BUSL legally safe? Will our legal team approve it?',
				answer:
					'<p>BUSL is an established source-available license, created by MariaDB and used by well-known vendors (Terraform, Vault, Couchbase, and others). Rights and obligations are fixed in the license text, and every release carries a hard date on which it becomes Apache 2.0. Customers operating within the free conditions, or under a Commercial License, are fully authorized. We encourage legal teams to review the published license directly.</p>',
			},
			{
				id: 'production-vs-non-production',
				question: 'What is "production use" vs "non-production use"?',
				answer:
					'<p>If real devices are sending you real data and it matters that it keeps working, that is production use — whatever you call the environment. Everything else is non-production: development, testing, QA, staging, CI, training. Non-production is free, with no device limit, for as long as you like. The boundary is drawn by the nature of the use, not the software mode or the key. Evaluating with real devices is non-production while nothing depends on it. The keyless development mode you evaluate in runs for 30 days of cumulative operating time (<a href="/legal/terms-of-use/">Terms of Use</a>, section 5), and a free Development key extends it. Once real operations rely on the deployment, it is production and needs a production key.</p>',
			},
			{
				id: 'standby-deployment',
				question: 'Is a standby or disaster-recovery deployment production?',
				answer:
					'<p>A standby that receives replicated data but serves no users and sends no commands is not production use until it is activated. Its devices are already counted once — in the deployment it mirrors — and for the commercial Free License, a passive standby does not count against the one-instance condition: you have one Production Instance at any moment, and on failover the standby becomes it. A staging mirror restored from a production backup is the same.</p>',
			},
			{
				id: 'internal-only-use',
				question: 'Only my own engineers use the dashboard — is that still production?',
				answer:
					'<p>Yes. Internal use is still production use: a dashboard three of your engineers use to watch real machines is production. What matters is that real operations depend on it, not who the users are.</p>',
			},
		],
	},
	{
		id: 'why-now',
		label: 'Why now',
		items: [
			{
				id: 'why-change',
				question: 'Why are you doing this?',
				answer:
					'<p>The honest answer is AI. Coding assistants only became genuinely useful at the end of 2025; today, anyone running the source can read it, build on it, and use AI on it — so when open code and AI are this powerful together, the right move is to open more of ThingsBoard, not less.</p><p>Merging Community and Professional into one product also ends the question of whether each new feature belongs in CE or PE — features reach everyone at once.</p>',
			},
			{
				id: 'charging-more',
				question: 'Is this just a way to charge more?',
				answer:
					"<p>No. Existing Community Edition users keep their current deployment free at its registered scale through the Community Grant Program and pay only for future growth. New users get a Free License that didn't exist before.</p><p>Every feature is now free for everyone — the only paid things are white-labeling, commercial support, and scale beyond the free limits.</p>",
			},
			{
				id: 'free-product-development',
				question: 'Will you keep developing and improving the free product?',
				answer:
					'<p>Yes. There is now one product, so the Free License and the Community Grant get the same platform and the same improvements — there is no "lesser" edition to fall behind. Everything already released stays Apache 2.0 forever, and every new release becomes Apache 2.0 four years on.</p>',
			},
		],
	},
];

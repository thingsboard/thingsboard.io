import type { AstroIntegration } from 'astro';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROD_ORIGIN } from '../../src/consts';
import { isIndexableCanonical, readPageHead } from '../indexable-page';

/**
 * Writes `/llms.txt`, one `llms.txt` per product at its docs home, and one per large section of a
 * `splitSections` product, after the build. The pages are the sitemap's (indexable, self-canonical,
 * see `config/indexable-page.ts`); titles and descriptions come from the built `<head>`.
 * The linkcheck build writes them too, since pages link to `/llms.txt`.
 */
export function llmsTxt(): AstroIntegration {
	let site: URL;
	return {
		name: 'llms-txt',
		hooks: {
			'astro:config:done': ({ config }) => {
				if (!config.site) throw new Error('llms-txt needs `site` to resolve canonical URLs');
				site = new URL(config.site);
			},
			'astro:build:done': ({ dir, pages, logger }) => {
				const outDir = fileURLToPath(dir);
				const entries = collectEntries(outDir, site, pages);
				checkTrustCenterPages(outDir, site);
				const files = renderFiles(entries);
				for (const [path, body] of files) {
					const target = join(outDir, path);
					mkdirSync(dirname(target), { recursive: true });
					writeFileSync(target, body);
					if (body.length > FILE_SIZE_WARN) {
						logger.warn(`${path} is ${body.length} characters, over the ${FILE_SIZE_WARN} agents read in one fetch`);
					}
				}
				logger.info(`${entries.length} docs pages in ${files.size} files`);
			},
		},
	};
}

interface Product {
	name: string;
	summary: string;
	/** The product's docs home; its `llms.txt` is written there. */
	home: string;
	/** URL prefixes after `/docs/`, most specific first; a section is the path segment after one of them. */
	prefixes: string[];
	/** Big sections get their own file under the product home instead of a list in the product file. */
	splitSections?: boolean;
	/** Pages of this product left out of its catalog. */
	exclude?: RegExp[];
}

/** One page per rule node; the node category pages (`.../rule-engine/nodes/action/`) list every node in them. */
const RULE_NODE_PAGE = /\/rule-engine\/nodes\/[^/]+\/[^/]+\/$/;

/**
 * One page per SCADA symbol: near-identical template pages. The `widget-library/*-scada-*` pages
 * list every symbol of their library.
 */
const SCADA_SYMBOL_PAGE = /\/reference\/widgets\/scada\/.+\/$/;

/**
 * Catalog files, in the order llms.txt lists them. The first product whose prefix matches
 * owns a page, so the catch-all ThingsBoard entry (`''`) stays last.
 */
const PRODUCTS: Product[] = [
	{
		name: 'ThingsBoard Edge',
		summary: 'on-premises edge nodes that process data locally and synchronize with a ThingsBoard server',
		home: '/docs/edge/pe/',
		prefixes: ['edge/pe/', 'edge/'],
		// The nodes are the platform's; the ThingsBoard catalog lists them.
		exclude: [RULE_NODE_PAGE],
	},
	{
		name: 'ThingsBoard Mobile',
		summary: 'customizable mobile application for end-user IoT solutions',
		home: '/docs/mobile/pe/',
		prefixes: ['mobile/pe/', 'mobile/'],
	},
	{
		name: 'Trendz Analytics',
		summary: 'AI-driven analytics built on top of ThingsBoard telemetry',
		home: '/docs/trendz/',
		prefixes: ['trendz/'],
	},
	{
		name: 'ThingsBoard IoT Gateway',
		summary: 'protocol bridge for industrial devices (OPC-UA, Modbus, BACnet, BLE, and more)',
		home: '/docs/iot-gateway/',
		prefixes: ['iot-gateway/'],
	},
	{
		name: 'ThingsBoard IoT Hub',
		summary:
			'catalog of ready-to-use devices, widgets, rule chains, and other components by category, and how to use and contribute them',
		home: '/docs/iot-hub/',
		prefixes: ['iot-hub/'],
	},
	{
		name: 'ThingsBoard License Server',
		summary: 'license management for self-hosted ThingsBoard deployments',
		home: '/docs/license-server/',
		prefixes: ['license-server/'],
	},
	{
		name: 'ThingsBoard CLI',
		summary: 'command-line tool for working with a ThingsBoard instance',
		home: '/docs/cli/',
		prefixes: ['cli/'],
	},
	{
		name: 'ThingsBoard',
		summary:
			'the platform itself: getting started, concepts, user guide, installation, APIs, and reference, including ThingsBoard Cloud',
		home: '/docs/pe/',
		prefixes: ['pe/', 'paas/eu/', 'paas/', ''],
		splitSections: true,
		exclude: [SCADA_SYMBOL_PAGE],
	},
];

/**
 * Pages kept out of the main lists and filed under `## Optional`: one page per old release,
 * near-identical to its neighbours. Agents short on context skip that section (per the spec);
 * the platform and version index pages that link to them stay in the main lists.
 */
const OPTIONAL_PATTERNS: RegExp[] = [/\/upgrade-instructions\/[^/]+\/v\d[^/]*\/$/, /\/releases-table\/v\d[^/]*\/$/];

/**
 * A section of a `splitSections` product at least this long (characters, Optional pages included)
 * gets its own file; shorter ones stay listed in the product file, saving agents a fetch.
 */
const SECTION_FILE_MIN = 8_000;

/**
 * Claude Code reads 100,000 characters of a fetched file; agent-docs checkers fail a file above that.
 * The build warns when a file outgrows it.
 */
const FILE_SIZE_WARN = 100_000;

/** The IoT Hub and its category pages (`/iot-hub/devices/`, …) join the IoT Hub catalog; the item pages do not. */
const IOT_HUB_LISTING = /^\/iot-hub\/([^/]+\/)?$/;

/** Words a section heading spells differently from its URL segment. */
const SECTION_WORDS: Record<string, string> = {
	api: 'API',
	coap: 'CoAP',
	http: 'HTTP',
	lwm2m: 'LwM2M',
	mqtt: 'MQTT',
	snmp: 'SNMP',
	tbel: 'TBEL',
	ui: 'UI',
};

/** Sections listed first, in this order; the rest follow alphabetically. */
const SECTION_ORDER = ['', 'getting-started', 'concepts', 'user-guide', 'installation'];

interface CuratedPage {
	path: string;
	title: string;
	description: string;
}

/**
 * Curated pages for `/llms.txt`. Each must be in the catalog, or the build fails —
 * that is what keeps a renamed or deleted page from being advertised.
 */
const KEY_PAGES: CuratedPage[] = [
	{
		path: '/docs/pe/',
		title: 'ThingsBoard — Documentation home',
		description: 'Top-level entry point for ThingsBoard documentation.',
	},
	{
		path: '/docs/pe/why-thingsboard/',
		title: 'Why ThingsBoard?',
		description: 'Core design principles, architecture, and platform highlights.',
	},
	{
		path: '/docs/pe/getting-started/',
		title: 'Getting Started with ThingsBoard',
		description: 'End-to-end setup: install, connect a device, build a dashboard.',
	},
	{
		path: '/docs/pe/connect-iot-devices/',
		title: 'Connect IoT Devices',
		description: 'Connectivity guide across MQTT, HTTP, CoAP, LwM2M, SNMP, OPC-UA, and Modbus protocols.',
	},
	{
		path: '/docs/pe/concepts/digital-twin-model/',
		title: 'Digital Twin Model',
		description: 'Devices, assets, customers, entity views, and relations — the platform entity model.',
	},
	{
		path: '/docs/pe/concepts/data-processing/',
		title: 'Data Processing',
		description: 'Rule engine concepts: nodes, chains, message routing, and transformations.',
	},
	{
		path: '/docs/pe/concepts/data-visualization/',
		title: 'Data Visualization',
		description: 'Dashboards, widgets, and the visualization model.',
	},
	{
		path: '/docs/pe/concepts/multi-tenancy/',
		title: 'Multi-tenancy and Hierarchy',
		description: 'Tenant isolation, customer hierarchies, and role-based access.',
	},
	{
		path: '/docs/pe/concepts/alarms-and-notifications/',
		title: 'Alarms and Notifications',
		description: 'Alarm lifecycle, severity, propagation, and notification delivery.',
	},
	{
		path: '/docs/pe/installation/',
		title: 'Installation options',
		description: 'Deployment topologies and installation paths for ThingsBoard.',
	},
	{
		path: '/docs/pe/reference/rest-api/',
		title: 'REST API reference',
		description: 'HTTP API surface for platform automation and integration.',
	},
	{
		path: '/docs/pe/user-guide/rule-engine/',
		title: 'Rule Engine',
		description: 'Rule chains, rule nodes, and queues for processing incoming data.',
	},
	{
		path: '/docs/edge/pe/',
		title: 'ThingsBoard Edge',
		description: 'On-premises edge nodes that synchronize with a central ThingsBoard server.',
	},
	{
		path: '/docs/mobile/pe/',
		title: 'ThingsBoard Mobile',
		description: 'Customizable mobile application for end-user IoT solutions.',
	},
	{
		path: '/docs/trendz/',
		title: 'Trendz Analytics',
		description: 'AI-driven analytics built on top of ThingsBoard telemetry.',
	},
	{
		path: '/docs/iot-gateway/',
		title: 'IoT Gateway',
		description: 'Protocol bridge for industrial devices (OPC-UA, Modbus, BACnet, BLE, and more).',
	},
];

/**
 * Trust Center pages for `/llms.txt`. Not docs pages, so `KEY_PAGES` can't hold them; each must be
 * built, indexable and self-canonical, or the build fails.
 */
const TRUST_CENTER_PAGES: CuratedPage[] = [
	{
		path: '/trust-center/',
		title: 'Trust Center',
		description: 'Security, compliance and privacy at ThingsBoard.',
	},
	{
		path: '/trust-center/compliance/',
		title: 'Compliance',
		description: 'ISO/IEC 27001:2022 and ISO 9001:2015 certificates: scope, certification body and validity.',
	},
	{
		path: '/trust-center/compliance/iso-27001/',
		title: 'ISO/IEC 27001:2022',
		description: 'The certificate, what it covers and how long it is valid.',
	},
	{
		path: '/trust-center/compliance/iso-9001/',
		title: 'ISO 9001:2015',
		description: 'The quality management certificate and how long it is valid.',
	},
	{
		path: '/trust-center/cloud/',
		title: 'ThingsBoard Cloud and Private Cloud',
		description: 'Hosting, data regions, isolation, backups and uptime.',
	},
	{
		path: '/trust-center/subprocessors/',
		title: 'Sub-processors',
		description: 'Vendors that process customer data.',
	},
	{
		path: '/trust-center/report-vulnerability/',
		title: 'Report a vulnerability',
		description: 'How to report a security issue privately.',
	},
];

function checkTrustCenterPages(outDir: string, site: URL): void {
	const missing = TRUST_CENTER_PAGES.filter(({ path }) => {
		const head = readPageHead(outDir, path);
		return head === null || !isIndexableCanonical(head, new URL(path, site).href);
	});
	if (missing.length > 0) throw notIndexable('Trust Center pages are not indexable pages', missing);
}

function notIndexable(what: string, pages: CuratedPage[]): Error {
	return new Error(
		`llms.txt ${what} (deleted, renamed, noindex, or canonical elsewhere): ${pages.map((p) => p.path).join(', ')}`
	);
}

function renderCurated(pages: CuratedPage[]): string {
	return pages.map((p) => `- [${p.title}](${PROD_ORIGIN}${p.path}): ${p.description}`).join('\n');
}

const OPTIONAL_LINKS = [
	{
		label: 'ThingsBoard Blog',
		url: `${PROD_ORIGIN}/blog/`,
		description: 'latest news, feature announcements, and use-case articles',
	},
	{
		label: 'ThingsBoard GitHub',
		url: 'https://github.com/thingsboard/thingsboard',
		description: 'source code, issues, and community discussions',
	},
	{
		label: 'ThingsBoard YouTube',
		url: 'https://www.youtube.com/thingsboard',
		description: 'video tutorials, webinars, and product demos',
	},
	{
		label: 'ThingsBoard on Stack Overflow',
		url: 'https://stackoverflow.com/questions/tagged/thingsboard',
		description: 'community Q&A for ThingsBoard development questions',
	},
];

interface Entry {
	pathname: string;
	title: string;
	description: string | null;
	product: Product;
	section: string;
	/** The path segment after `section`, when the page sits below it. */
	subsection: string | null;
	optional: boolean;
}

function collectEntries(outDir: string, site: URL, pages: { pathname: string }[]): Entry[] {
	const entries: Entry[] = [];
	for (const { pathname: raw } of pages) {
		const pathname = `/${raw}`.replace(/\/+/g, '/').replace(/\/?$/, '/');
		const isListing = IOT_HUB_LISTING.test(pathname);
		if (!isListing && !pathname.startsWith('/docs/')) continue;
		const head = readPageHead(outDir, pathname);
		if (head === null || !isIndexableCanonical(head, new URL(pathname, site).href)) continue;

		// A listing page is filed as if it were `/docs/iot-hub/categories/…`.
		const rest = isListing ? 'iot-hub/categories/' : pathname.slice('/docs/'.length);
		const product = PRODUCTS.find((p) => p.prefixes.some((prefix) => rest.startsWith(prefix)));
		if (!product || product.exclude?.some((re) => re.test(pathname))) continue;
		const prefix = product.prefixes.find((p) => rest.startsWith(p)) ?? '';
		const [section = '', subsection = null] = rest.slice(prefix.length).split('/').filter(Boolean);

		entries.push({
			pathname,
			title: pageTitle(head.title ?? pathname),
			description: head.description,
			product,
			section,
			subsection,
			optional: OPTIONAL_PATTERNS.some((re) => re.test(pathname)),
		});
	}
	return entries.sort((a, b) => a.pathname.localeCompare(b.pathname));
}

/**
 * The page's own name from its `<title>` ("{Page} | {suffix}", see `formatDocsTitle`). A product
 * index has the suffix alone — "ThingsBoard Docs" or "Docs | ThingsBoard Trendz" — so that is kept whole.
 */
function pageTitle(title: string): string {
	const parts = title.split(' | ');
	if (parts.length === 1) return title;
	if (parts[0] === 'Docs') return `${parts[1]} Docs`;
	return parts[0] ?? title;
}

function renderFiles(entries: Entry[]): Map<string, string> {
	const files = new Map<string, string>();
	const productLinks: string[] = [];

	for (const product of PRODUCTS) {
		const own = entries.filter((e) => e.product === product);
		if (own.length === 0) continue;
		const productUrl = `${PROD_ORIGIN}${product.home}llms.txt`;
		const inline: string[] = [];
		const sectionLinks: string[] = [];

		// A section that gets its own file takes its Optional pages along; the rest stay at the end.
		const optionalBySection = new Map<string, Entry[]>();
		for (const entry of own.filter((e) => e.optional)) {
			optionalBySection.set(entry.section, [...(optionalBySection.get(entry.section) ?? []), entry]);
		}
		const sectionsWithFiles = new Set<string>();

		for (const [section, main] of groupSections(own)) {
			if (section === OPTIONAL) {
				const rest = main.filter((e) => !sectionsWithFiles.has(e.section));
				if (rest.length > 0) inline.push(renderSection('Optional', rest));
				continue;
			}
			const list = product.splitSections ? [...main, ...(optionalBySection.get(section) ?? [])] : main;
			const heading = sectionName(section);
			if (!product.splitSections || section === '' || renderSection(heading, list).length < SECTION_FILE_MIN) {
				inline.push(renderSection(heading, main));
				continue;
			}
			sectionsWithFiles.add(section);
			const path = `${product.home}${section}/llms.txt`;
			files.set(
				path.slice(1),
				renderFile(
					`${product.name} documentation: ${heading}`,
					`Every page of the ${heading} section of the ${product.name} documentation: title, one-line description, and URL. Fetch a page URL to read it. Part of the ${product.name} index at ${productUrl}.`,
					groupSections(list, false).map(([sub, subList]) => renderSection(sectionName(sub, heading), subList))
				)
			);
			sectionLinks.push(`- [${heading}](${PROD_ORIGIN}${path}): ${list.length} pages.`);
		}

		if (sectionLinks.length > 0) {
			inline.push(['## Sections', 'Larger sections have their own index:', sectionLinks.join('\n')].join('\n\n'));
		}
		files.set(
			`${product.home.slice(1)}llms.txt`,
			renderFile(
				`${product.name} documentation`,
				`Every ${product.name} documentation page: title, one-line description, and URL. Fetch a page URL to read it. Part of the ThingsBoard documentation index at ${PROD_ORIGIN}/llms.txt.`,
				inline
			)
		);
		productLinks.push(`- [${product.name}](${productUrl}): ${own.length} pages — ${product.summary}.`);
	}

	files.set('llms.txt', renderIndex(entries, productLinks));
	return files;
}

/**
 * Entries by section (by subsection when not `topLevel`), in display order, Optional pages last.
 * A section holding a single page is a standalone page, not a folder, so it joins the Overview.
 */
function groupSections(entries: Entry[], topLevel = true): [string, Entry[]][] {
	const keyOf = (e: Entry) => (topLevel ? e.section : (e.subsection ?? ''));
	const main = entries.filter((e) => !e.optional);
	const sizes = new Map<string, number>();
	for (const entry of main) sizes.set(keyOf(entry), (sizes.get(keyOf(entry)) ?? 0) + 1);

	const sections = new Map<string, Entry[]>();
	for (const entry of main) {
		const key = keyOf(entry);
		const section = (sizes.get(key) ?? 0) > 1 ? key : '';
		const list = sections.get(section) ?? [];
		list.push(entry);
		sections.set(section, list);
	}
	const ordered = [...sections.entries()].sort(([a], [b]) => sectionRank(a) - sectionRank(b) || a.localeCompare(b));
	const optional = entries.filter((e) => e.optional);
	if (optional.length > 0) ordered.push([OPTIONAL, optional]);
	return ordered;
}

const OPTIONAL = '\0optional';

function renderFile(title: string, summary: string, sections: string[]): string {
	return [`# ${title}`, `> ${summary}`, ...sections].join('\n\n') + '\n';
}

function renderSection(heading: string, entries: Entry[]): string {
	const intro =
		heading === 'Optional'
			? [
					'Upgrade instructions and release tables for individual older versions; the version index pages are listed above.',
				]
			: [];
	return [`## ${heading}`, ...intro, entries.map(renderEntry).join('\n')].join('\n\n');
}

function renderIndex(entries: Entry[], productLinks: string[]): string {
	const byPath = new Set(entries.map((e) => e.pathname));
	const missing = KEY_PAGES.filter((p) => !byPath.has(p.path));
	if (missing.length > 0) throw notIndexable('key pages are not indexable docs pages', missing);

	const parts = [
		'# ThingsBoard',
		'> ThingsBoard is an IoT platform for device management, data collection, processing, and visualization.',
		[
			'- ThingsBoard supports device connectivity via MQTT, CoAP, HTTP, LwM2M, SNMP, OPC-UA, and Modbus protocols.',
			'- The platform provides a powerful rule engine for real-time data processing, transformation, and automated actions on IoT telemetry.',
			'- ThingsBoard dashboards offer rich interactive widgets for data visualization, alarm management, and device control.',
			'- Multi-tenancy architecture supports isolated customer and tenant hierarchies with role-based access control.',
			'- ThingsBoard is an all-in-one platform: white-labeling, solution templates, reporting, advanced RBAC, and integrations with third-party platforms and cloud services are built in.',
			'- ThingsBoard Cloud (PaaS) is a fully managed cloud offering; ThingsBoard Edge extends the platform to on-premises edge nodes.',
			'- Additional products: IoT Gateway (protocol bridge for industrial devices), Trendz Analytics (AI-driven analytics), Mobile SDK, License Server. The TBMQ MQTT broker is documented separately at https://tbmq.io.',
		].join('\n'),
		'## Key pages',
		renderCurated(KEY_PAGES),
		'## Trust Center',
		renderCurated(TRUST_CENTER_PAGES),
		'## Documentation Sets',
		'Each product has its own llms.txt listing every page of its documentation.',
		productLinks.join('\n'),
		'## Notes',
		[
			`- The catalogs are generated at build time from the same page list as ${PROD_ORIGIN}/sitemap-index.xml.`,
			'- Pages that repeat another page and point to it as canonical (Cloud, Community Edition, and Edge copies of platform pages) are left out; the page they point to is listed.',
		].join('\n'),
		'## Optional',
		OPTIONAL_LINKS.map((l) => `- [${l.label}](${l.url}): ${l.description}`).join('\n'),
	];
	return parts.join('\n\n') + '\n';
}

function renderEntry(entry: Entry): string {
	const title = oneLine(entry.title).replace(/[[\]]/g, '\\$&');
	const link = `- [${title}](${PROD_ORIGIN}${entry.pathname})`;
	return entry.description ? `${link}: ${oneLine(entry.description)}` : link;
}

function oneLine(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function sectionRank(section: string): number {
	const rank = SECTION_ORDER.indexOf(section);
	return rank === -1 ? SECTION_ORDER.length : rank;
}

function sectionName(section: string, parent?: string): string {
	if (section === OPTIONAL) return 'Optional';
	if (section === '') return parent ?? 'Overview';
	const words = section.split('-').map((word, i) => {
		const spelled = SECTION_WORDS[word];
		if (spelled) return spelled;
		return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
	});
	return words.join(' ');
}

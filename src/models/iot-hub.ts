import { z } from 'astro/zod';

// `IOT_HUB_API_URL` resolution differs by context:
//
//   * Server-side (Astro frontmatter, content-collection loaders, build-time
//     scripts) reads the URL straight from `import.meta.env`.
//   * Client-side bundled scripts can't see the env var unless it's prefixed
//     `PUBLIC_*` (Vite strips non-public vars from the client bundle). They
//     read it from `window.__IOT_HUB_API_URL`, which `<IotHubRuntimeConfig />`
//     populates via an inline `<script>` in <head> using the server's value.
//
// This way a single import works in both contexts, the URL stays in one
// env var (no `PUBLIC_*` duplicate), and runtime fetches always hit the
// same origin the server-side fetches do.
declare global {
	interface Window {
		__IOT_HUB_API_URL?: string;
	}
}
const BUILD_TIME_IOT_HUB_API_URL = import.meta.env.IOT_HUB_API_URL ?? 'https://iot-hub.thingsboard.io';
export const IOT_HUB_API_URL =
	typeof window !== 'undefined' && window.__IOT_HUB_API_URL
		? window.__IOT_HUB_API_URL
		: BUILD_TIME_IOT_HUB_API_URL;

export const IOT_HUB_CATEGORIES = [
	{
		slug: 'devices',
		itemType: 'DEVICE',
		label: 'Devices',
		singularLabel: 'Device',
		tileLabel: 'Device Library',
		heroTitle: 'IoT Device Library',
		card: 'big',
		tileColor: '#ccd5ff',
		tileColorDark: '#4c63cc',
		heroDescription:
			'Connect your IoT hardware in one step. Find ready-to-use device profiles — sensors, gateways, controllers, meters, and trackers — with connection config and telemetry mapping built in.',
		seoDescription:
			'Connect your hardware in one step. Install ready-made IoT device profiles for LoRaWAN, NB-IoT, Modbus, and more from the ThingsBoard IoT Hub.',
		guideHref: '/docs/iot-hub/contribution-guides/device/',
		// Intentionally worded differently from the other categories.
		ctaTitle: 'Add Your Device to the Community',
		ctaDescription:
			'Built or ship IoT hardware? Package your device as a ZIP and publish it to the IoT Hub so users can provision it in one click.',
		ctaPrimaryLabel: 'Contribute a Device',
		ctaSecondaryLabel: 'Read the contribution guide',
	},
	{
		slug: 'solution-templates',
		itemType: 'SOLUTION_TEMPLATE',
		label: 'Solution Templates',
		singularLabel: 'Solution Template',
		tileLabel: 'Solution Templates',
		heroTitle: 'IoT Solution Templates',
		card: 'big',
		tileColor: '#b8d9ff',
		tileColorDark: '#2c6cb4',
		heroDescription:
			'Install a complete IoT solution in one step — from simple monitoring to full SCADA. Each template bundles dashboards, rule chains, and device profiles, and ships with working demo data so dashboards are never empty.',
		seoDescription:
			'Install complete IoT solution templates — dashboards, rule chains, and device profiles bundled — for energy, fleet, SCADA, and more from the IoT Hub.',
		guideHref: '/docs/iot-hub/contribution-guides/solution-template/',
		ctaTitle: 'Share Your Solution with the Community',
		ctaDescription:
			'Built a complete IoT solution? Package it as a ZIP archive — dashboards, rule chains, profiles, calculated fields, devices, and emulators — and publish it to the IoT Hub so others can deploy your architecture in one click.',
		ctaPrimaryLabel: 'Contribute a Solution Template',
		ctaSecondaryLabel: 'Read the contribution guide',
	},
	{
		slug: 'widgets',
		itemType: 'WIDGET',
		label: 'Widgets',
		singularLabel: 'Widget',
		tileLabel: 'Widgets',
		heroTitle: 'IoT Dashboard Widgets',
		card: 'big',
		tileColor: '#a3ffc3',
		tileColorDark: '#2c9755',
		heroDescription:
			'Install reusable charts, gauges, maps, controls, and custom UI components to visualize telemetry and build more effective IoT dashboards.',
		seoDescription:
			'Build dashboards faster with ready-to-use IoT widgets. Install charts, gauges, maps, and control cards from the ThingsBoard IoT Hub.',
		guideHref: '/docs/iot-hub/contribution-guides/widget/',
		ctaTitle: 'Share Your Widget with the Community',
		ctaDescription:
			'Built a custom widget? Export it as a JSON from ThingsBoard and publish it to the IoT Hub through a simple 4-step wizard (Upload, Listing, Readme, Review & Submit). Share it with thousands of ThingsBoard developers worldwide and get featured in the catalog.',
		// Intentionally worded differently from the other categories.
		ctaPrimaryLabel: 'Submit Your Widget',
		ctaSecondaryLabel: 'Read the Contributor Guide',
	},
	{
		slug: 'calculated-fields',
		itemType: 'CALCULATED_FIELD',
		label: 'Calculated Fields',
		singularLabel: 'Calculated Field',
		tileLabel: 'Calculated Fields',
		heroTitle: 'IoT Calculated Fields',
		card: 'small',
		tileColor: '#bdedff',
		tileColorDark: '#3db5e0',
		heroDescription:
			'Install ready-made formulas in one click — turn raw telemetry into the metrics you monitor, like fuel efficiency or power factor, without building the logic by hand.',
		seoDescription:
			'Compute metrics automatically. Install ready-made IoT calculated fields for fuel efficiency, power factor, aggregations, and geofencing.',
		guideHref: '/docs/iot-hub/contribution-guides/calculated-field/',
		ctaTitle: 'Share Your Calculated Field with the Community',
		ctaDescription:
			'Built a useful data transformation? Export it as a JSON from ThingsBoard and publish it to the IoT Hub. Share it with thousands of ThingsBoard developers worldwide.',
		ctaPrimaryLabel: 'Contribute a Calculated Field',
		ctaSecondaryLabel: 'Read the contribution guide',
	},
	{
		slug: 'alarm-rules',
		itemType: 'ALARM_RULE',
		label: 'Alarm Rules',
		singularLabel: 'Alarm Rule',
		tileLabel: 'Alarm Rules',
		heroTitle: 'IoT Alarm Rules',
		card: 'small',
		tileColor: '#ffe6cc',
		tileColorDark: '#d7702f',
		heroDescription:
			'Install ready-to-use alarm rules in one click — detect threshold breaches, offline devices, and equipment faults, and start reacting the moment they happen.',
		seoDescription:
			'Install ready-to-use IoT alarm rules for threshold breaches, offline devices, and equipment health — on a device, asset, or profile in one step.',
		guideHref: '/docs/iot-hub/contribution-guides/alarm-rule/',
		ctaTitle: 'Share Your Alarm Rule with the Community',
		ctaDescription:
			'Built a reliable alarm rule? Export it as a JSON from ThingsBoard and publish it to the IoT Hub. Share it with thousands of ThingsBoard developers and help the community react to incidents faster.',
		ctaPrimaryLabel: 'Contribute an Alarm Rule',
		ctaSecondaryLabel: 'Read the contribution guide',
	},
	{
		slug: 'rule-chains',
		itemType: 'RULE_CHAIN',
		label: 'Rule Chains',
		singularLabel: 'Rule Chain',
		tileLabel: 'Rule Chains',
		heroTitle: 'IoT Rule Chains',
		seoTitleStem: 'IoT Rule Chains | IoT Automation',
		card: 'small',
		tileColor: '#ecd1ff',
		tileColorDark: '#bb7ce9',
		heroDescription:
			'Install ready-made automation logic in one click — alerting, data processing, device lifecycle, and external integrations you plug into your existing rule chain.',
		seoDescription:
			'Install ready-made IoT rule chains for alerting, data processing, and integrations — plug them into ThingsBoard as a sub-chain in one step.',
		guideHref: '/docs/iot-hub/contribution-guides/rule-chain/',
		ctaTitle: 'Share Your Rule Chain with the Community',
		ctaDescription:
			'Built a useful automation workflow? From a simple alarm recipe to a complex multi-cloud integration — publish it to the IoT Hub. Share it with thousands of ThingsBoard developers.',
		ctaPrimaryLabel: 'Contribute a Rule Chain',
		ctaSecondaryLabel: 'Read the contribution guide',
	},
] as const;

export type IotHubCategorySlug = (typeof IOT_HUB_CATEGORIES)[number]['slug'];
export type IotHubItemType = (typeof IOT_HUB_CATEGORIES)[number]['itemType'];
export type IotHubCardVariant = 'big' | 'small';

export const getCardVariant = (itemType: string): IotHubCardVariant => {
	const cat = IOT_HUB_CATEGORIES.find((c) => c.itemType === itemType);
	return cat?.card ?? 'big';
};

// Default `cfType` → Material icon name.
const CF_TYPE_ICONS: Record<string, string> = {
	SIMPLE: 'calculate',
	SCRIPT: 'code',
	GEOFENCING: 'share_location',
	ALARM: 'notification_important',
	PROPAGATION: 'account_tree',
	RELATED_ENTITIES_AGGREGATION: 'hub',
	ENTITY_AGGREGATION: 'functions',
};

// Placeholder icon for a compact tile — either a Material Icons font name or
// a `mdi:xxx` identifier (handled by the card renderer).
type IconableListing = Pick<ListingView, 'itemType' | 'icon' | 'cfType' | 'ruleChainType'>;
export const getPlaceholderIcon = (item: IconableListing): string => {
	switch (item.itemType) {
		case 'WIDGET':
			return 'widgets';
		case 'SOLUTION_TEMPLATE':
			return 'integration_instructions';
		case 'CALCULATED_FIELD':
			return item.icon || (item.cfType && CF_TYPE_ICONS[item.cfType]) || 'functions';
		case 'ALARM_RULE':
			return item.icon || 'notification_important';
		case 'RULE_CHAIN':
			return item.icon || (item.ruleChainType === 'EDGE' ? 'router' : 'device_hub');
		case 'DEVICE':
			return 'memory';
		default:
			return 'extension';
	}
};

// User-facing UI strings used by IoT Hub components. Centralized so they're
// easy to find, audit, and swap for a `t(...)` call if marketing-side i18n
// ever lands (the site's existing i18n machinery only covers Starlight docs).
export const IOT_HUB_STRINGS = {
	filterPanel: {
		title: 'Filter',
		closeAriaLabel: 'Close filters',
		landmarkLabel: 'Filters',
		searchPlaceholder: 'Search...',
		searchAriaPrefix: 'Search',
		mostPopular: 'Most popular',
		all: 'All',
		sections: {
			type: 'Type',
			category: 'Category',
			vendor: 'Vendor',
			hardwareType: 'Hardware Type',
			connectivity: 'Connectivity',
			useCase: 'Use Case',
		},
	},
	listingsBar: {
		filter: 'Filter',
		searchAriaLabel: 'Search',
		defaultSearchPlaceholder: 'Search...',
		resultSingular: 'result',
		resultPlural: 'results',
	},
	emptyState: 'No items available yet.',
	faqHeading: 'Frequently Asked Questions',
	fetchError: {
		heading: 'Network or server unavailable',
		subtitle: 'We couldn’t reach the catalog. Please try again in a moment.',
		ctaLabel: 'Try again',
	},
	installDialog: {
		title: 'Install item',
		titleConnect: 'Connect item',
		// `\n` is a hard line break, rendered via `white-space: pre-line` to match
		// the two-line layout in the design.
		subtitle:
			'Choose a ThingsBoard instance to install this item into.\nCopy the install link or open it directly in a new tab.',
		closeAriaLabel: 'Close',
		copy: 'Copy link',
		copied: 'Copied',
		editLocal: 'Edit local URL',
		save: 'Save',
		cancel: 'Cancel',
		invalidUrl: 'Enter a valid URL, e.g. http://localhost:8080',
	},
	creatorPage: {
		breadcrumbRoot: 'IoT Hub',
		publishedItems: 'Published Items',
		searchPlaceholder: 'Search published items...',
		sortLabel: 'Most Installed',
		resultSingular: 'result',
		resultPlural: 'results',
		verifiedLabel: 'Verified creator',
		websiteLabel: 'Website',
		emailLabel: 'Email',
		githubLabel: 'GitHub',
		linkedinLabel: 'LinkedIn',
		twitterLabel: 'X',
	},
	searchPage: {
		breadcrumbRoot: 'IoT Hub',
		breadcrumbCurrent: 'Search results',
		headingEmpty: 'Search results',
		// `headingPrefix` + the user's query in typographic quotes ("…").
		headingPrefix: 'Search results for',
		searchPlaceholder: 'Search in IoT Hub...',
		sortLabel: 'Most Installed',
		resultSingular: 'result',
		resultPlural: 'results',
	},
	installs: {
		singular: 'install',
		plural: 'installs',
	},
} as const;

// Shared formatting helpers, used by both the static (SSR) markup and the
// runtime binders.

/** Thousands-formatted install count, e.g. `1,234`. */
export function formatInstallCount(count: number): string {
	return count.toLocaleString('en-US');
}

/** Install count with pluralized unit, e.g. `1 install` / `1,234 installs`. */
export function formatInstalls(count: number): string {
	const word = count === 1 ? IOT_HUB_STRINGS.installs.singular : IOT_HUB_STRINGS.installs.plural;
	return `${formatInstallCount(count)} ${word}`;
}

// Maps raw subtype keys from the API (`timeseries`, `SIMPLE`, `CORE`, …)
// to user-facing labels for the filter panel "Type" section.
export const ITEM_SUBTYPE_LABELS: Partial<Record<IotHubItemType, Record<string, string>>> = {
	WIDGET: {
		timeseries: 'Timeseries',
		latest: 'Latest',
		rpc: 'Control',
		alarm: 'Alarm',
		static: 'Static',
	},
	CALCULATED_FIELD: {
		SIMPLE: 'Simple',
		SCRIPT: 'Script',
		GEOFENCING: 'Geofencing',
		ALARM: 'Alarm',
		PROPAGATION: 'Propagation',
		RELATED_ENTITIES_AGGREGATION: 'Related Entities Aggregation',
		ENTITY_AGGREGATION: 'Entity Aggregation',
	},
	RULE_CHAIN: {
		CORE: 'Core',
		EDGE: 'Edge',
	},
};

// --- Sort options ------------------------------------------------------------
// Shared between the search page, creator page, category pages and any other
// surface that exposes a sort selector. Each option carries the API query
// params it maps to (`sortProperty` + `sortOrder`), so consumers can spread
// them straight into the listings request without a second lookup.

export type IotHubSortId = 'most-installed' | 'newest' | 'name-asc';
export type IotHubSortProperty = 'installCount' | 'publishedTime' | 'name';
export type IotHubSortDirection = 'ASC' | 'DESC';

export interface IotHubSortOption {
	id: IotHubSortId;
	label: string;
	sortProperty: IotHubSortProperty;
	sortOrder: IotHubSortDirection;
}

export const IOT_HUB_SORT_OPTIONS: ReadonlyArray<IotHubSortOption> = [
	{ id: 'most-installed', label: 'Most Installed', sortProperty: 'installCount',  sortOrder: 'DESC' },
	{ id: 'newest',         label: 'Newest',         sortProperty: 'publishedTime', sortOrder: 'DESC' },
	{ id: 'name-asc',       label: 'Name (A-Z)',     sortProperty: 'name',          sortOrder: 'ASC'  },
];

export const DEFAULT_IOT_HUB_SORT_ID: IotHubSortId = 'most-installed';

export function getIotHubSortOption(id: string | null | undefined): IotHubSortOption {
	return IOT_HUB_SORT_OPTIONS.find((o) => o.id === id) ?? IOT_HUB_SORT_OPTIONS[0];
}

export const getSubtypeLabel = (itemType: IotHubItemType, key: string): string =>
	ITEM_SUBTYPE_LABELS[itemType]?.[key] ?? key;

// Rule-chain node info. `type` is one of the NodeComponentType values
// (ENRICHMENT / FILTER / TRANSFORMATION / ACTION / ANALYTICS / EXTERNAL /
// FLOW / UNKNOWN) and drives the chip color in DetailRuleNodes.
export interface IotHubNodeInfo {
	name: string;
	type: string;
}

// Shape returned by every `/api/listings/...` paged endpoint (mirrors the
// platform's `PageData<T>` in iot-hub-version.models.ts). Shared by all
// runtime fetchers (search page, creator page, hero popup, …).
export interface PageData<T> {
	data: T[];
	totalPages: number;
	totalElements: number;
	hasNext: boolean;
}

export const PAGE_SIZE = 12;
// Creator profile page paginates each category's items at 16/page.
export const CREATOR_PAGE_SIZE = 16;
// Search results page — same default as the creator page; kept separate so
// the eventual dynamic page-size control on the search bar can vary it
// without disturbing the creator route.
export const SEARCH_PAGE_SIZE = 16;
export const HOME_PER_CATEGORY = 4;
export const API_FETCH_PAGE_SIZE = 128;

export const resolveImage = (path: string | null | undefined): string | null =>
	path ? `${IOT_HUB_API_URL}${path}` : null;

// Same as `resolveImage`, but appends a `/preview` segment to the end of the
// path while keeping any query params intact (e.g. `…/api/resources/<id>?v=ab`
// becomes `…/api/resources/<id>/preview?v=ab`).
export const resolvePreviewImage = (path: string | null | undefined): string | null => {
	const url = resolveImage(path);
	if (!url) return null;
	const parsed = new URL(url);
	parsed.pathname = `${parsed.pathname.replace(/\/$/, '')}/preview`;
	return parsed.toString();
};

// Format the supported ThingsBoard version range for a listing. Backend
// stores versions as int hundreds (e.g. 420 = 4.2), so divide by 100 and
// render as `v{min}` / `v{min} - {max}` / `v{min}+` depending on whether
// `maxTbVersion` is set. Empty string when `minTbVersion` is missing.
export const getTbVersionLabel = (
	minTbVersion?: number | null,
	maxTbVersion?: number | null
): string => {
	if (!minTbVersion) return '';
	const min = (minTbVersion / 100).toFixed(1);
	if (maxTbVersion) {
		const max = (maxTbVersion / 100).toFixed(1);
		return `v${min} - ${max}`;
	}
	return `v${min}+`;
};

export const itemTypeEnum = z.enum([
	'WIDGET',
	'SOLUTION_TEMPLATE',
	'CALCULATED_FIELD',
	'RULE_CHAIN',
	'DEVICE',
	'ALARM_RULE',
]);

export const screenshotResourceSchema = z.object({
	id: z.uuid(),
	type: z.string().nullable().optional(),
});

// Conservative CSS-color allowlist: `#hex` (3/4/6/8 chars) or bare named color
// (letters only). API values that don't match are coerced to null so we never
// interpolate untrusted strings into inline `style` attributes.
const cssColorSchema = z
	.string()
	.regex(/^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)$/)
	.nullable()
	.catch(null);

export const listingViewSchema = z.object({
	slug: z.string(),
	itemType: itemTypeEnum,
	name: z.string(),
	creatorId: z.string().nullable().default(null),
	description: z.string().nullable(),
	image: z.string().nullable(),
	icon: z.string().nullable(),
	color: cssColorSchema,
	seoTitle: z.string().nullable(),
	seoMetaDescription: z.string().nullable(),
	ogImage: z.string().nullable(),
	categories: z.array(z.string()).default([]),
	useCases: z.array(z.string()).default([]),
	cfType: z.string().nullable(),
	widgetType: z.string().nullable(),
	ruleChainType: z.string().nullable(),
	hardwareType: z.string().nullable(),
	vendor: z.string().nullable(),
	connectivity: z.array(z.string()).default([]),
	tags: z.array(z.string()).default([]),
	installCount: z.number().default(0),
	createdTime: z.number().nullable().default(null),
	updatedTime: z.number().nullable().default(null),
	publishedTime: z.number().nullable(),
	creatorDisplayName: z.string().nullable(),
	creatorAvatarUrl: z.string().nullable(),
	creatorVerified: z.boolean().default(false),
	creatorAffiliateId: z.string().nullable().default(null),
	screenshots: z.array(screenshotResourceSchema).default([]),
});

export const listingDetailSchema = listingViewSchema.extend({
	readmeContent: z.string().nullable(),
	// Lifted from the picked primary variant on the backend
	// (MpListingServiceImpl.pickPrimaryVariant). Polymorphic JSON object whose
	// shape depends on the listing's `itemType` — type-specific fields like
	// `widgetType`, `cfType`, `ruleChainType` are read off this without
	// walking the variants list. Kept untyped here; narrow at the use site.
	dataDescriptor: z.unknown().nullable(),
	// Primary variant's published version string (e.g. "1.0.0").
	version: z.string().nullable(),
	// Aggregated edition + supported-TB-version envelope across all variants
	// (computed by MpListingServiceImpl.findDetailById):
	//   ceOnly       — true when ALL variants have ceOnly=true
	//   peOnly       — true when ALL variants have peOnly=true
	//   minTbVersion — the smallest minTbVersion across variants
	//   maxTbVersion — the largest maxTbVersion; null means "no upper limit"
	//                  and any null variant collapses the field to null.
	ceOnly: z.boolean().default(false),
	peOnly: z.boolean().default(false),
	minTbVersion: z.number().int().default(0),
	maxTbVersion: z.number().int().nullable(),
});

// Public creator profile — `GET /api/creators/{id}/profile`
// (CreatorController.findCreatorProfile, @PreAuthorize("permitAll()")).
// `youtubeUrl` is returned by the API but intentionally NOT surfaced in the UI
// (the upstream iot-hub-creator-profile component omits it).
export const creatorViewSchema = z.object({
	id: z.string(),
	displayName: z.string(),
	contactEmail: z.string().nullable().default(null),
	website: z.string().nullable().default(null),
	description: z.string().nullable().default(null),
	avatarUrl: z.string().nullable().default(null),
	githubUrl: z.string().nullable().default(null),
	linkedinUrl: z.string().nullable().default(null),
	twitterUrl: z.string().nullable().default(null),
	youtubeUrl: z.string().nullable().default(null),
	verified: z.boolean().default(false),
	// `publishedCount`: published item-version count across all the creator's
	// items. `publishedListingCount`: number of the creator's listings whose
	// status is PUBLISHED — what the creator page surfaces as the "items"
	// figure since users care about how many distinct listings they ship,
	// not how many versions sit inside them.
	publishedCount: z.number().default(0),
	publishedListingCount: z.number().default(0),
});

export type CreatorView = z.infer<typeof creatorViewSchema>;

// `/iot-hub/creator/{id}/` — used by the creator page route and by the creator
// links on listing cards + the item detail meta block.
export const getCreatorHref = (creatorId: string): string =>
	`/iot-hub/creator/${creatorId}/`;

// Pure-numeric slugs collide with pagination URLs (`/iot-hub/{cat}/2/`), so they
// are excluded from listing grids and creator pages. One predicate keeps the
// rule identical across every route that applies it.
export const isNumericSlug = (slug: string): boolean => /^\d+$/.test(slug);

// Display label for the website button — strip the protocol and any trailing
// slash, keeping any `www.`.
export const getWebsiteLabel = (website: string): string =>
	website.replace(/^https?:\/\//, '').replace(/\/+$/, '');

// First-letter initials (max 2) for the avatar fallback. Mirrors the inline
// logic already in DetailMeta.astro.
export const getInitials = (name: string): string =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? '')
		.join('');

// Resolve a creator/listing avatar that may be a relative `/api/resources/...`
// path or an absolute URL. Returns null when unset.
export const resolveAvatar = (url: string | null | undefined): string | null => {
	const raw = url?.trim() || null;
	if (!raw) return null;
	return raw.startsWith('/api/resources') ? resolveImage(raw) : raw;
};

// `/api/item-listing/listingFilterInfo/{itemType}` response shape.
export const filterParamInfoSchema = z.object({
	key: z.string(),
	totalItems: z.number(),
	totalInstallCount: z.number(),
});

const nullableArrayOfFilterParamInfo = z
	.array(filterParamInfoSchema)
	.nullable()
	.default([])
	.transform((v) => v ?? []);

export const itemTypeFilterInfoSchema = z.object({
	types: nullableArrayOfFilterParamInfo,
	categories: nullableArrayOfFilterParamInfo,
	useCases: nullableArrayOfFilterParamInfo,
	vendors: nullableArrayOfFilterParamInfo,
	hardwareTypes: nullableArrayOfFilterParamInfo,
	connectivities: z
		.record(z.string(), z.array(filterParamInfoSchema))
		.nullable()
		.default({})
		.transform((v) => v ?? {}),
});

// One collection entry per category. `items` preserves the API order
// (installCount DESC) because it's stored as an array inside a single entry —
// `getCollection()` only re-sorts entries by id, not the data within them.
export const iotHubCategorySchema = z.object({
	itemType: itemTypeEnum,
	label: z.string(),
	items: z.array(listingDetailSchema),
	filterInfo: itemTypeFilterInfoSchema,
});

export type ListingView = z.infer<typeof listingViewSchema>;
export type ListingDetail = z.infer<typeof listingDetailSchema>;
export type IotHubCategoryData = z.infer<typeof iotHubCategorySchema>;
export type FilterParamInfo = z.infer<typeof filterParamInfoSchema>;
export type ItemTypeFilterInfo = z.infer<typeof itemTypeFilterInfoSchema>;

// --- Install / Connect dialog -------------------------------------------
// URL logic ported from the upstream Angular preview-links-dialog
// (thingsboard/iot-hub @ acb157d). The Local instance base is editable and
// persisted to localStorage on this static site (no logged-in user here).

export const INSTALL_LOCAL_DEFAULT = 'http://localhost:8080';
export const INSTALL_LOCAL_STORAGE_KEY = 'tb:iot-hub:local-url';
export const INSTALL_PREVIEW_PATH = '/iot-hub/listing/';

/** scheme + host[:port] only — no path, no trailing slash. */
export const INSTALL_LOCAL_URL_PATTERN = /^https?:\/\/[^/\s]+$/;

export interface InstallInstance {
	key: 'na' | 'eu' | 'local';
	label: string;
	base: string;
	/** Icon key (see `ICON_PATHS` in install-dialog.ts) rendered in the row tile. */
	icon: string;
	/** Cloud rows append `?fpr=<affiliateId>` when one is available. */
	referral?: boolean;
	/** Local row: user-editable + persisted to localStorage. */
	editable?: boolean;
}

// Order matches the design: NA, EU, Local.
export const INSTALL_INSTANCES: readonly InstallInstance[] = [
	{
		key: 'na',
		label: 'ThingsBoard Cloud (North America)',
		base: 'https://thingsboard.cloud',
		icon: 'cloud',
		referral: true,
	},
	{
		key: 'eu',
		label: 'ThingsBoard Cloud (Europe)',
		base: 'https://eu.thingsboard.cloud',
		icon: 'cloud',
		referral: true,
	},
	{
		key: 'local',
		label: 'Local ThingsBoard',
		base: INSTALL_LOCAL_DEFAULT,
		icon: 'server',
		editable: true,
	},
];

export const stripTrailingSlash = (s: string): string =>
	s.endsWith('/') ? s.slice(0, -1) : s;

export const stripScheme = (s: string): string => s.replace(/^https?:\/\//, '');

export interface BuildInstallUrlOptions {
	referral?: boolean;
	affiliateId?: string | null;
}

export const buildInstallUrl = (
	base: string,
	slug: string,
	{ referral = false, affiliateId = null }: BuildInstallUrlOptions = {}
): string => {
	// `base` is always a valid origin (cloud constants or a pattern-validated
	// local URL), so the URL API safely handles slug/param encoding for us.
	const url = new URL(INSTALL_PREVIEW_PATH + encodeURIComponent(slug), base);
	if (referral && affiliateId) url.searchParams.set('fpr', affiliateId);
	return url.toString();
};

// `itemType` is `string` (not `IotHubItemType`) because one caller passes a raw
// value read from a DOM data-attribute.
export const getInstallVerb = (itemType: string, variant = 'card'): string =>
	itemType === 'DEVICE' ? (variant === 'hero' ? 'Connect device' : 'Connect') : 'Install';

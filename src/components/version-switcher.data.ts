import { Products } from '@models/site.models.ts';
import { TBMQ_DOCS_URL } from '@models/tbmq';

/**
 * Data behind the docs product selector (VersionSwitcher.astro), extracted so
 * the Family union is importable (and unit-testable) and the tables are built
 * once per build instead of once per docs-page render.
 *
 * Add or edit one FAMILIES entry to add/edit a product in the selector.
 */

export type Group = 'core' | 'addons' | 'ecosystem';

export interface Edition {
	product: Products;
	label: string;
}

export interface Region {
	product: Products;
	label: string;
	subtitle: string;
}

interface FamilyBase {
	id: Products;
	group: Group;
	name: string;
	tagline: string;
	iconId: string;
}

/** A family whose docs live on this site. */
export interface LocalFamily extends FamilyBase {
	kind: 'local';
	editions: Edition[];
	/** When defined, region row + popover render whenever the active edition
	 * matches one of `options[].product`. */
	regions?: { options: Region[] };
	/** Edition to land on when this family is picked from the product dropdown.
	 * Defaults to `editions[editions.length - 1]` (Professional/Cloud first). */
	preferredEdition?: Products;
}

/** A family whose docs moved off-site: picking it from the dropdown leaves
 * thingsboard.io (opens in a new tab). No editions, so it can never be the
 * current family. */
export interface ExternalFamily extends FamilyBase {
	kind: 'external';
	externalUrl: string;
}

export type Family = LocalFamily | ExternalFamily;

export const FAMILIES: Family[] = [
	{
		kind: 'local',
		id: Products.CE,
		group: 'core',
		name: 'ThingsBoard',
		tagline: 'IoT Platform',
		iconId: 'tb-logo',
		editions: [
			{ product: Products.CE, label: 'Community' },
			{ product: Products.PE, label: 'Professional' },
			{ product: Products.PAAS, label: 'Cloud' },
		],
		regions: {
			options: [
				{ product: Products.PAAS, label: 'North America', subtitle: 'N. Virginia' },
				{ product: Products.PAAS_EU, label: 'Europe', subtitle: 'Frankfurt' },
			],
		},
		preferredEdition: Products.PE,
	},
	{
		kind: 'local',
		id: Products.EDGE,
		group: 'addons',
		name: 'Edge Computing',
		tagline: 'Real-time processing at the source',
		iconId: 'edge',
		editions: [
			{ product: Products.EDGE, label: 'Community' },
			{ product: Products.EDGE_PE, label: 'Professional' },
		],
		preferredEdition: Products.EDGE_PE,
	},
	{
		kind: 'local',
		id: Products.TRENDZ,
		group: 'addons',
		name: 'Trendz Analytics',
		tagline: 'Turn raw data into foresight',
		iconId: 'trendz',
		editions: [{ product: Products.TRENDZ, label: 'Trendz' }],
	},
	{
		kind: 'local',
		id: Products.GW,
		group: 'ecosystem',
		name: 'IoT Gateway',
		tagline: 'Bridge any hardware to the cloud',
		iconId: 'gateway',
		editions: [{ product: Products.GW, label: 'IoT Gateway' }],
	},
	{
		kind: 'external',
		id: Products.TBMQ,
		group: 'ecosystem',
		name: 'MQTT Broker',
		tagline: 'Reliable messaging for massive fleets',
		iconId: 'tbmq',
		externalUrl: TBMQ_DOCS_URL,
	},
	{
		kind: 'local',
		id: Products.MOBILE,
		group: 'ecosystem',
		name: 'Mobile Application',
		tagline: 'Your operation, available anywhere',
		iconId: 'mobile',
		editions: [
			{ product: Products.MOBILE, label: 'Community' },
			{ product: Products.MOBILE_PE, label: 'Professional' },
		],
		preferredEdition: Products.MOBILE_PE,
	},
	{
		kind: 'local',
		id: Products.LICENSE,
		group: 'ecosystem',
		name: 'License Server',
		tagline: 'Automated billing and license management',
		iconId: 'license-portal',
		editions: [{ product: Products.LICENSE, label: 'License Server' }],
	},
	{
		kind: 'local',
		id: Products.IOT_HUB,
		group: 'ecosystem',
		name: 'IoT Hub',
		tagline: 'Ready-to-install IoT solutions',
		iconId: 'iot-hub',
		editions: [{ product: Products.IOT_HUB, label: 'IoT Hub' }],
	},
];

export const SECTIONS: { label: string; group: Group }[] = [
	{ label: 'Core platform', group: 'core' },
	{ label: 'Add-ons', group: 'addons' },
	{ label: 'Ecosystem', group: 'ecosystem' },
];

export const localFamilies: LocalFamily[] = FAMILIES.filter((f) => f.kind === 'local');

/** Edition to land on when a local family is picked from the product dropdown. */
export const preferredOf = (f: LocalFamily): Products =>
	f.preferredEdition ?? f.editions[f.editions.length - 1]!.product;

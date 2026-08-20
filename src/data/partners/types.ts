import type { Region } from '@data/partners/regions';

export interface PartnerLink {
	label: string;
	href: string;
}

export interface PartnerLinks {
	sensorGuides?: PartnerLink[];
	gatewayGuides?: PartnerLink[];
	generalGuides?: PartnerLink[];
	generalGuide?: PartnerLink[];
	microcontrollersGuides?: PartnerLink[];
	singleBoardComputersGuides?: PartnerLink[];
	otherDevicesGuides?: PartnerLink[];
	trackersGuides?: PartnerLink[];
	otherGuides?: PartnerLink[];
}

export interface HardwarePartner {
	name: string;
	slug: string;
	connectivity: string[];
	industry: string[];
	useCase: string[];
	hardwareTypes: string[];
	logo: string;
	website: string;
	links: PartnerLinks;
	description: string;
	showcases?: PartnerLink[];
}

export interface Distributor {
	name: string;
	/** Regions served. Non-empty: no regions means the card matches no filter. */
	regions: [Region, ...Region[]];
	/**
	 * Countries covered, or 'region-wide' for every country in `regions`.
	 * Non-empty: an empty list drops the card out of every country filter.
	 */
	countries: [string, ...string[]] | 'region-wide';
	email: string;
	website: string;
}

export interface ProgramTier {
	name: string;
	slug: string;
	color: string;
	price: string;
	period?: string;
	features: Record<string, boolean | string>;
}

export interface ProgramFaqItem {
	question: string;
	answer: string;
}

export interface ProgramFaqCategory {
	title: string;
	items: ProgramFaqItem[];
}

// Teaser cards for the case studies, as `CaseStudyCard` renders them on the development-services and
// proof-of-concept pages. The copy is written for the card (short figures, labels broken to fit three
// lines), so it stays separate from the case-study pages' data. Kept outside `src/data/case-studies/`,
// whose modules are enumerated as case-study pages.

export interface CaseStudyCardStat {
	value: string;
	/** Shown under the value. With `long`, the hover swaps it for the long label. */
	label: string;
	/** The long label, one entry per line. */
	long?: string[];
}

export interface CaseStudyCardData {
	tag: string;
	title: string;
	image: string;
	logo: {
		src: string;
		name: string;
		width: number;
		height: number;
		/** Display height, for marks whose box carries more padding than the default 36px allows. */
		displayHeight?: number;
	};
	stats: CaseStudyCardStat[];
}

export const caseStudyCards: Record<string, CaseStudyCardData> = {
	schwarz: {
		tag: 'Retail & consumer service',
		title: 'IoT in retail: how Schwarz Group accelerated digitalization with ThingsBoard',
		image: '/images/case-studies/schwarz.webp',
		logo: { src: '/images/case-studies/schwarz.svg', name: 'Schwarz', width: 410, height: 208 },
		stats: [
			{ value: '500K+', label: 'Devices', long: ['Connected', 'devices'] },
			{ value: '13K+', label: 'Stores' },
			{ value: '32', label: 'Countries' },
		],
	},
	'super-bock': {
		tag: 'Manufacturing',
		title: 'Revolutionizing beer distribution: how ThingsBoard empowered Super Bock Group',
		image: '/images/case-studies/super-bock-group.webp',
		logo: { src: '/images/case-studies/super-bock-group.svg', name: 'Super Bock Group', width: 126, height: 56 },
		stats: [
			{ value: '100%', label: 'Visibility', long: ['Visibility of beer', 'stock in', 'real-time'] },
			{ value: '90%', label: 'Automation', long: ['Reduction in', 'manual', 'operations'] },
			{ value: '3+', label: 'Solutions', long: ['Integrated', 'solutions'] },
		],
	},
	dacor: {
		tag: 'Industry 4.0',
		title: 'Real-time production monitoring for automotive supplier by süc//dacor GmbH',
		image: '/images/case-studies/dacor.webp',
		logo: { src: '/images/case-studies/dacor.svg', name: 'Dacor', width: 400, height: 140 },
		stats: [
			{ value: '20', label: 'Gateways', long: ['LoRaWAN', 'gateways in our', 'public network'] },
			{ value: '5+', label: 'IoT experience', long: ['Experience in the', 'field of IoT with', 'LoRaWAN'] },
			{ value: '150', label: 'Sensor types', long: ['Sensor types', 'tested in', 'our lab'] },
		],
	},
	oxi: {
		tag: 'Energy and utilities',
		title: 'Empowering alternative energy: how OXI TRADE streamlined IoT infrastructure with TB',
		image: '/images/case-studies/oxi.webp',
		logo: { src: '/images/case-studies/oxi.svg', name: 'OXI Trade', width: 153, height: 56 },
		stats: [
			{ value: '10+', label: 'Experience', long: ['Years experience', 'in the alternative', 'energy sector'] },
			{ value: '7K', label: 'Sales', long: ['Pellet burners', 'sold'] },
			{ value: '96%', label: 'Efficiency', long: ['Efficiency of', 'pellet burners'] },
		],
	},
	awake: {
		tag: 'Equipment tracking',
		title: 'Awake: unifying global rental operations with custom IoT solutions',
		image: '/images/case-studies/awake.webp',
		logo: { src: '/images/case-studies/awake.svg', name: 'Awake', width: 402, height: 59, displayHeight: 20 },
		stats: [
			{ value: '7', label: 'Experience', long: ['Years of', 'experience', 'on the market'] },
			{ value: '50+', label: 'Retailers', long: ['Retailers', 'managed under', 'one system'] },
			{ value: '6', label: 'Challenges', long: ['Solving', 'challenges', 'with data'] },
		],
	},
	senseing: {
		tag: 'Logistics & supply chain',
		title: 'Transforming food logistics with IoT-powered temperature monitoring',
		image: '/images/case-studies/senseing.webp',
		logo: { src: '/images/case-studies/senseing.svg', name: 'SenseING GmbH', width: 240, height: 56, displayHeight: 24 },
		stats: [
			{ value: '100%', label: 'Automation', long: ['Automated', 'temperature', 'monitoring'] },
			{ value: '90%', label: 'Accuracy', long: ['Reduction', 'in human error'] },
			{ value: '100+', label: 'Units', long: ['Storage and', 'transportation', 'units'] },
		],
	},
};

/**
 * Copy and structure for `PlatformOverview`. Every string is measured against the drawing's unit
 * grid, so changing one is a layout change; the notes on each field say what the budget is.
 */

/** Two fields, not one string: the mark sits beside them and the brand is set bolder. */
export const PLATFORM_CORE = { brand: 'ThingsBoard', product: 'Platform' };

export interface ZoneItem {
	icon: string;
	/** Two or three words; the note underneath carries the specifics. */
	name: string;
	note: string;
}

export interface Zone {
	/** Keys the run colours as well as the card, so a line and its origin cannot disagree. */
	id: 'equipment' | 'people';
	title: string;
	items: ZoneItem[];
}

/** Three items each: a fourth makes that column taller than the platform it flanks. */
export const PLATFORM_ZONES: Zone[] = [
	{
		id: 'equipment',
		title: 'Your equipment and data',
		items: [
			{ icon: 'tabler:gauge', name: 'Machines and sensors', note: 'Telemetry and device state' },
			{ icon: 'tabler:server', name: 'Gateways and platforms', note: 'Existing IoT data sources' },
			{ icon: 'tabler:database', name: 'Business systems', note: 'Schedules, tariffs, context' },
		],
	},
	{
		id: 'people',
		title: 'Your teams and customers',
		items: [
			{ icon: 'tabler:urgent', name: 'Operators and managers', note: 'Real-time status and KPIs' },
			{ icon: 'tabler:tool', name: 'Service teams', note: 'Act with equipment context' },
			{ icon: 'tabler:users', name: 'Customers', note: 'Branded live dashboards' },
		],
	},
];

export interface PlatformStage {
	icon: string;
	name: string;
	/**
	 * Three, always: a fourth makes this stage a line taller than its neighbours. The column is 107.5
	 * units and "Calculated fields" is the longest at 105.4.
	 */
	items: [string, string, string];
	/** The stage's own hue, carried by its icon — the only colour in the middle column. */
	accent: string;
}

/**
 * What the platform does, as four stages in the order you meet them. The names are verbs because the
 * columns beside them are nouns: one side is a thing you own, the other is work done to it.
 *
 * The accents are the hues the page's own sections carry further down, mapped by meaning rather than
 * by position — so the orders differ, and the fifth section's green has no stage to attach to.
 */
export const PLATFORM_STAGES: PlatformStage[] = [
	{
		name: 'Connect',
		items: ['Devices', 'Gateways', 'Integrations'],
		icon: 'tabler:plug-connected',
		accent: '#007c7b',
	},
	{
		name: 'Model',
		items: ['Assets', 'Relations', 'Profiles'],
		icon: 'tabler:box-model',
		accent: '#7a37e7',
	},
	{
		name: 'Automate',
		items: ['Calculated fields', 'Alarm rules', 'Rule chains'],
		icon: 'tabler:binary-tree',
		accent: '#b44100',
	},
	{
		name: 'Operate',
		items: ['Dashboards', 'Reports', 'SCADA'],
		icon: 'tabler:chart-dots',
		accent: '#3d50f5',
	},
];

export interface PlatformRun {
	id: 'telemetry' | 'views' | 'actions' | 'commands';
	/** The zone the line leaves, which is also the zone whose colour it takes. */
	from: 'equipment' | 'platform' | 'people';
	to: 'equipment' | 'platform' | 'people';
	label: string;
}

/** In at the top left, out at the top right, in at the bottom right, out at the bottom left. */
export const PLATFORM_RUNS: PlatformRun[] = [
	{ id: 'telemetry', from: 'equipment', to: 'platform', label: 'Telemetry' },
	{ id: 'views', from: 'platform', to: 'people', label: 'Views and alerts' },
	{ id: 'actions', from: 'people', to: 'platform', label: 'Actions' },
	// "Commands", not "Commands and updates": the longer form was the only label needing two lines.
	{ id: 'commands', from: 'platform', to: 'equipment', label: 'Commands' },
];

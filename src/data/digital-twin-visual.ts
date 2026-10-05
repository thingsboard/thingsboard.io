/** Content for the digital twin visual: a physical asset mirrored by its digital twin. */

export const DIGITAL_TWIN_STAGES = { physical: 'Physical world', twin: 'Digital twin' };

export interface UnitDevice {
	label: string;
	icon: string;
}

export interface UnitSpec {
	name: string;
	icon: string;
	devices: UnitDevice[];
}

export const PHYSICAL_ASSET = {
	name: 'Cold storage unit',
	icon: 'tabler:cpu',
	path: ['Warehouse 3', 'Zone B'],
	devices: [
		{ label: 'Temp probe', icon: 'tabler:temperature' },
		{ label: 'Door sensor', icon: 'tabler:door' },
		{ label: 'Compressor', icon: 'tabler:engine' },
		{ label: 'Power meter', icon: 'tabler:bolt' },
	],
} satisfies UnitSpec & { path: string[] };

export const TWIN = {
	name: 'CS-04 twin',
	attributes: [
		{ key: 'temperature', value: '−18.4 °C' },
		{ key: 'door', value: 'closed' },
	],
};

export const TWIN_FLOWS = [
	{ label: 'telemetry', to: 'twin' },
	{ label: 'commands', to: 'physical' },
] as const;

export const TWIN_HISTORY = {
	domain: [-20, -16] as [number, number],
	hours: 24,
};

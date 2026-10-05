/** Content for `ScaleDuo`: the two deployment architectures the docs name. */

export interface ScaleMode {
	mode: string;
	trait: string;
	/** Read before the figure. Absent where the figure is not a ceiling. */
	lead?: string;
	devices: string;
	/** Blank where the figure is not a count. */
	unit?: string;
	stack: string[];
}

export const SCALE_MODES: ScaleMode[] = [
	{
		mode: 'Monolith',
		trait: 'A single ThingsBoard instance carries the whole fleet.',
		lead: 'Up to',
		devices: '1M',
		stack: ['PostgreSQL', 'Citus', 'Cassandra'],
	},
	{
		mode: 'Cluster',
		trait: 'Keeps running through hardware failures and upgrades.',
		devices: 'Any size',
		unit: '',
		stack: ['PostgreSQL', 'Citus', 'Cassandra', 'Kafka', 'Valkey'],
	},
];

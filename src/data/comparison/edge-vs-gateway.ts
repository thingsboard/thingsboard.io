/** One feature row of the IoT Gateway / Edge / Server comparison. */
export interface EdgeMatrixRow {
	label: string;
	labelHref?: string;
	/** Second link appended to the label with "and". */
	labelExtra?: { text: string; href: string };
	gateway: boolean | string;
	edge: boolean | string;
	server: boolean | string;
}

export const EDGE_VS_GATEWAY_ROWS: EdgeMatrixRow[] = [
	{ label: 'ThingsBoard Server Required', gateway: true, edge: true, server: 'N/A' },
	{
		label: 'Data Collection',
		labelHref: '/docs/pe/reference/architecture/performance/',
		gateway: true,
		edge: true,
		server: true,
	},
	{
		label: 'Core Protocols Support (MQTT, HTTP, CoAP, etc.)',
		labelHref: '/docs/pe/apis-and-sdks/',
		gateway: true,
		edge: true,
		server: true,
	},
	{
		label: 'Peripheral Infrastructure Protocols Support (Modbus, BACNet, BLE, etc.)',
		labelHref: '/docs/iot-gateway/',
		gateway: true,
		edge: false,
		server: false,
	},
	{
		label: 'Data Processing and Analysis',
		labelHref: '/docs/pe/user-guide/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Real-Time HMI Dashboards',
		labelHref: '/docs/pe/user-guide/dashboards/',
		labelExtra: { text: 'SCADA-like HMI Dashboards', href: '/docs/pe/user-guide/scada/' },
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Alarms & Notifications',
		labelHref: '/docs/pe/user-guide/alarms/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Asset Management',
		labelHref: '/docs/pe/user-guide/assets/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Offline Data Computing and Storage (Remote Site Scenarios)',
		labelHref: '/docs/edge/pe/key-concepts/edge-instance/',
		gateway: 'Data Collection',
		edge: true,
		server: false,
	},
	{
		label: 'Multi-Tenancy Support',
		labelHref: '/docs/pe/user-guide/multi-tenancy/',
		gateway: false,
		edge: false,
		server: true,
	},
	{
		label: 'Hardware Resources Usage',
		gateway: 'Low',
		edge: 'Medium to Low',
		server: 'High to Medium',
	},
];

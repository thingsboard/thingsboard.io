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
		labelHref: '/docs/reference/architecture/performance/',
		gateway: true,
		edge: true,
		server: true,
	},
	{
		label: 'Core Protocols Support (MQTT, HTTP, CoAP, etc.)',
		labelHref: '/docs/apis-and-sdks/',
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
		labelHref: '/docs/user-guide/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Real-Time HMI Dashboards',
		labelHref: '/docs/user-guide/dashboards/',
		labelExtra: { text: 'SCADA-like HMI Dashboards', href: '/docs/user-guide/scada/' },
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Alarms & Notifications',
		labelHref: '/docs/user-guide/alarms/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Asset Management',
		labelHref: '/docs/user-guide/assets/',
		gateway: false,
		edge: true,
		server: true,
	},
	{
		label: 'Offline Data Computing and Storage (Remote Site Scenarios)',
		labelHref: '/docs/edge/key-concepts/edge-instance/',
		gateway: 'Data Collection',
		edge: true,
		server: false,
	},
	{
		label: 'Multi-Tenancy Support',
		labelHref: '/docs/user-guide/multi-tenancy/',
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

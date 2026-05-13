// Copy shared by every SCADA use-case page (Energy management, Drilling, etc.).
// Edit here once and the change applies to all SCADA flavors — keeps benefit
// blurbs from drifting when ThingsBoard messaging is updated.

import type { Benefit } from './types';

export const SCADA_COMMON_BENEFITS: Benefit[] = [
	{
		title: 'PLCs and RTUs',
		description:
			'Seamlessly integrate your SCADA system with PLCs and RTUs using ThingsBoard integrations and IoT Gateway. Support for Modbus, OPC-UA, BACnet, and other popular protocols ensures reliable real-time data collection and control.',
	},
	{
		title: 'IoT gateway',
		description:
			"ThingsBoard's IoT Gateway bridges the gap between legacy SCADA devices and modern IoT platforms. It ensures data reliability with built-in local data storage during network outages and supports efficient protocol conversion, secure data transmission, and centralized device management.",
	},
	{
		title: 'Data processing',
		description:
			"Unlock actionable insights with ThingsBoard's robust data processing tools. Perform real-time transformations, apply complex rules, and automate workflows with built-in rule chains and scriptable integrations.",
	},
	{
		title: 'Alarm system',
		description:
			"Enhance operational awareness with ThingsBoard's advanced alarm system. Manage incident workflows with features like alarm acknowledgment, clearing, commenting, and configurable escalation rules.",
	},
	{
		title: 'Notification system',
		description:
			"Stay informed with ThingsBoard's flexible notification system, delivering alerts via email, SMS, Slack, or custom webhooks. Automate critical notifications based on configurable conditions and thresholds.",
	},
	{
		title: 'IoT dashboards',
		description:
			"Visualize your SCADA data with ThingsBoard's real-time IoT dashboards. Design interactive views using SCADA symbols, customizable widgets, and dynamic updates to monitor and control processes seamlessly.",
	},
];

import type { FaqGroup, IotHubCategorySections } from '@models/iot-hub-sections';

// Below-hero content per category slug. Pages without an entry render no extra sections.
export const IOT_HUB_CATEGORY_SECTIONS: Record<string, IotHubCategorySections> = {
	'alarm-rules': {
		faq: [
			{
				id: 'using-alarm-rules',
				label: 'Using Alarm Rules',
				items: [
					{
						id: 'faq-what-is-an-alarm-rule',
						question: 'What is an alarm rule?',
						answer: `An alarm rule is a reusable condition-to-severity template. Once installed on a device, asset, or profile, it evaluates live telemetry and raises — and clears — alarms whenever its conditions are met, with no rule logic to write.`,
					},
					{
						id: 'faq-how-do-i-install-an-alarm-rule',
						question: 'How do I install an alarm rule?',
						answer: `Click Install and pick the target — a device, an asset, or a device/asset profile — in the install dialog. The rule is created there and starts evaluating live telemetry immediately. A profile-level install covers every entity of that type, including ones added later.`,
					},
					{
						id: 'faq-alarm-rule-editions',
						question: 'Are alarm rules compatible with all ThingsBoard editions?',
						answer: `Most rules work on CE and PE. Rules that rely on owner-hierarchy propagation are Professional Edition only. Each listing shows an edition badge and the minimum ThingsBoard version.`,
					},
					{
						id: 'faq-alarm-rule-thresholds',
						question: 'Do I need to configure thresholds before it works?',
						answer: `Usually not. Well-built rules read thresholds from server attributes with sensible defaults, so they fire correctly out of the box. You can override the value per entity by setting the attribute — no need to edit the rule.`,
					},
				],
			},
			{
				id: 'conditions-severities',
				label: 'Conditions & Severities',
				items: [
					{
						id: 'faq-alarm-rule-severities',
						question: 'What severities can a rule raise?',
						answer: `CRITICAL, MAJOR, MINOR, WARNING, and INDETERMINATE. A single rule can define different trigger conditions for different severities.`,
					},
					{
						id: 'faq-how-does-an-alarm-clear',
						question: 'How does an alarm clear?',
						answer: `A rule can include a clear condition that clears the alarm automatically when telemetry returns to normal. Without one, the alarm stays active until an operator clears it.`,
					},
					{
						id: 'faq-alarm-rule-category-vs-use-case',
						question: "What's the difference between Category and Use Case?",
						answer: `The category describes what the rule monitors (Threshold, Connectivity, Equipment Health, Environmental, Energy, Safety, Geofencing, Other). Use Case is the shared IoT domain (Cold Chain, Fleet Tracking, Predictive Maintenance, etc.) used across the whole marketplace.`,
					},
				],
			},
			{
				id: 'contributing',
				label: 'Contributing',
				items: [
					{
						id: 'faq-how-do-i-contribute-an-alarm-rule',
						question: 'How do I contribute an alarm rule?',
						answer: `Check the <a href="/docs/iot-hub/contribution-guides/alarm-rule/">IoT Alarm Rule Contribution Guide</a> that describes the process of adding alarm rules. You can also contact <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a> for help.`,
					},
					{
						id: 'faq-are-alarm-rules-free',
						question: 'Are alarm rules free to use?',
						answer: `All community-contributed alarm rules are currently free. Commercial listings may be introduced in a future phase.`,
					},
				],
			},
		],
	},
	'widgets': {
		faq: [
			{
				id: 'using-widgets',
				label: 'Using Widgets',
				items: [
					{
						id: 'faq-widget-what-are-iot-widgets',
						question: 'What are IoT widgets?',
						answer: 'Widgets are self-contained UI components that connect to device data and render it visually on ThingsBoard dashboards. ThingsBoard ships with 300+ built-in widgets across 34 bundles, and the IoT Hub extends this with community-contributed components.',
					},
					{
						id: 'faq-widget-editions-compatible',
						question: 'Which editions are widgets compatible with?',
						answer: 'Each widget shows its edition badge and minimum ThingsBoard version. Most widgets work across all editions; some may use PE-only features. Check the badge on the widget page before installing.',
					},
					{
						id: 'faq-widget-how-to-install',
						question: 'How do I install a widget?',
						answer: 'Click Install on the widget’s page. The platform downloads the widget JSON and imports it into your Widget Library as a new bundle — then you can drop it onto any dashboard and configure data keys, targets, and styling as usual. No external dependencies or code are required. Self-hosted instances follow the same one-click flow.',
					},
					{
						id: 'faq-widget-customize-after-import',
						question: 'Can I customize widgets after importing?',
						answer: 'Yes. Open any widget in the Widget Editor to modify HTML, CSS, JavaScript, and settings schema. Change data sources, colors, thresholds, and behavior to match your requirements.',
					},
					{
						id: 'faq-widget-use-case-tags',
						question: 'How do use-case tags work?',
						answer: 'Each widget is tagged with shared IoT use cases, so browsing by one surfaces matching widgets, devices, and dashboards together. Tags include Air Quality, Environment Monitoring, Smart Building, Smart City, Smart Energy, Smart Metering, Tank Level Monitoring, Fleet Tracking, Industrial Automation, Predictive Maintenance, Smart Farming, Smart Retail, and Solar Monitoring — the full list is in the Use Case filter.',
					},
				],
			},
			{
				id: 'widget-types-categories',
				label: 'Widget Types & Categories',
				items: [
					{
						id: 'faq-widget-types-supported',
						question: 'What widget types are supported?',
						answer: 'Two core types, set by the widget’s descriptor.type: Latest Values (latest) for the most recent telemetry or attribute reading, and Time Series (timeseries) for historical data visualized over a configurable time window.',
					},
					{
						id: 'faq-widget-type-vs-category',
						question: 'What’s the difference between widget type and category?',
						answer: 'Type defines what data a widget consumes (its technical behavior); category describes how it looks (visual grouping). For example, a “Line Chart” is type “Time Series” and category “Charts & Graphs.” Use types to match your data source, categories to match your visual needs. Browse categories: Cards & Info, Charts & Graphs, Controls, Gauges & Indicators, Input Forms, and Video & Cameras.',
					},
				],
			},
			{
				id: 'contributing',
				label: 'Contributing',
				items: [
					{
						id: 'faq-widget-contribute-custom',
						question: 'How do I contribute a custom widget?',
						answer: 'Check the <a href="/docs/iot-hub/contribution-guides/widget/">IoT Widget Contribution Guide</a> that describes the process of adding an IoT widget. You can also contact <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a> for help.',
					},
					{
						id: 'faq-widget-free-to-use',
						question: 'Are widgets free to use?',
						answer: 'All community-contributed widgets are currently free. Commercial listings may be introduced in a future phase.',
					},
				],
			},
		],
	},
	'rule-chains': {
		faq: [
			{
				id: 'using-rule-chains',
				label: 'Using Rule Chains',
				items: [
					{
						id: 'faq-rc-what-are-rule-chains',
						question: 'What are ThingsBoard rule chains?',
						answer: 'Rule chains are visual message processing pipelines. Every message entering ThingsBoard (telemetry, attributes, RPC, lifecycle events) flows through a rule chain. Each node in the chain performs an operation — filtering, enriching, transforming, or acting on the message — and routes it to the next node. ThingsBoard ships with a default Root Rule Chain, and the IoT Hub offers community-contributed chains for specialized automation.',
					},
					{
						id: 'faq-rc-what-is-rule-engine',
						question: 'What is the ThingsBoard rule engine?',
						answer: 'The rule engine is the ThingsBoard component that processes incoming messages in real time. It runs your rule chains — every device message passes through the rule engine, which routes it through the chain\'s nodes to filter, transform, store, raise alarms, or trigger external actions. Rule chains from the IoT Hub run on this same engine.',
					},
					{
						id: 'faq-rc-edition-compatibility',
						question: 'Are rule chains compatible with all ThingsBoard editions?',
						answer: 'Most rule chains work on CE. However, chains using Analytics nodes (Aggregate Latest, Aggregate Stream) or certain Integration nodes require PE. Each chain in the Catalog displays edition badges. Chains using PE-only nodes are clearly marked.',
					},
					{
						id: 'faq-rc-how-to-install',
						question: 'How do I install a rule chain?',
						answer: 'Open the rule chain page and click Install. In the dialog you can import the chain on its own, or set it as the default rule chain for a device or asset profile (with a confirmation if that profile already has one). The chain then appears in your Rule Chains list and starts receiving messages as soon as it\'s wired in or bound to a profile. You can also download the JSON and import it manually via Rule Chains → Import rule chain.',
					},
					{
						id: 'faq-rc-overwrite-root-chain',
						question: 'Will importing a rule chain overwrite my existing root chain?',
						answer: 'No. Imported rule chains are always created as new, separate chains. You must explicitly set a chain as the root for a device profile or connect it as a sub-chain. Your existing root chain is never modified by import.',
					},
				],
			},
			{
				id: 'rule-engine-architecture',
				label: 'Rule Engine Architecture',
				items: [
					{
						id: 'faq-rc-root-vs-sub-chain',
						question: 'What’s the difference between a root chain and a sub-chain?',
						answer: 'The root rule chain is the entry point for all messages from devices using a given device profile. Sub-chains are reusable modules connected from the root chain (or other sub-chains) via the Rule Chain node. Many IoT Hub rule chains are designed as sub-chains that you plug into your existing root chain without replacing it.',
					},
					{
						id: 'faq-rc-message-types',
						question: 'What message types can rule chains process?',
						answer: 'POST_TELEMETRY_REQUEST (sensor data), POST_ATTRIBUTES_REQUEST (attribute updates), RPC_REQUEST (commands), ACTIVITY_EVENT (connect/disconnect), INACTIVITY_EVENT (device timeout), ALARM (alarm lifecycle), and custom message types. Use Message Type Switch to route each type differently.',
					},
					{
						id: 'faq-rc-node-categories',
						question: 'What node categories exist?',
						answer: 'Seven categories: Filter (route by conditions), Enrichment (add context), Transformation (modify payload), Action (save/alarm/RPC), External (integrate with external systems), Flow (connect sub-chains), and Analytics (aggregate data — PE only).',
					},
					{
						id: 'faq-rc-organized-in-hub',
						question: 'How are rule chains organized in the Hub?',
						answer: 'By Type (CORE for the main server, EDGE for ThingsBoard Edge), by Category (Alerting, Analytics, Automation, Data Processing, Device Connectivity, Integration), and by shared Use Case tags. Browse categories describe what a chain does and are distinct from the node building blocks inside it.',
					},
					{
						id: 'faq-rc-use-case-tags',
						question: 'How do use-case tags work?',
						answer: 'Each rule chain is tagged with shared IoT use cases, so filtering by a use case surfaces matching chains, widgets, dashboards, and devices together. Popular use cases include Asset Tracking, Fleet Tracking, Industrial Automation, Predictive Maintenance, and Smart Farming; the full vocabulary is searchable in the Use Case filter.',
					},
				],
			},
			{
				id: 'contributing',
				label: 'Contributing',
				items: [
					{
						id: 'faq-rc-how-to-contribute',
						question: 'How do I contribute a rule chain?',
						answer: 'Check the <a href="/docs/iot-hub/contribution-guides/rule-chain/">IoT Rule Chain Contribution Guide</a> that describes the process of adding rule chains. You can also contact <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a> for help.',
					},
					{
						id: 'faq-rc-external-services',
						question: 'What if my rule chain references external services?',
						answer: 'Document all external dependencies (Kafka broker, SMTP server, REST API endpoint, etc.) in your README. The manifest has an externalDependencies field listing required services. Users will need to configure their own credentials/endpoints after import.',
					},
				],
			},
		],
	},
	'solution-templates': {
		faq: [
			{
				id: 'using-solution-templates',
				label: 'Using Solution Templates',
				items: [
					{
						id: 'faq-st-what-is-a-solution-template',
						question: 'What is an IoT solution template?',
						answer: 'A solution template is a complete, deployable IoT solution that bundles dashboards, rule chains, device and asset profiles, calculated fields, devices, and telemetry emulators. Installing it gives you a working end-to-end solution with live simulated data — a starting point you adapt to your own data.',
					},
					{
						id: 'faq-st-how-do-i-install',
						question: 'How do I install an IoT solutions template?',
						answer: 'Click Install, review the description and preview gallery, and confirm. The platform atomically provisions every entity and redirects you to the main dashboard with simulated data already flowing.',
					},
					{
						id: 'faq-st-compatible-all-editions',
						question: 'Are solution templates compatible with all editions?',
						answer: 'Each template targets Community Edition (CE), Professional Edition (PE), or both. CE templates use only CE features; PE templates may use RBAC, white-labeling, advanced integrations, and reporting. The catalog shows an edition badge and the minimum ThingsBoard version.',
					},
					{
						id: 'faq-st-demo-use-real-data',
						question: 'Does the demo use real data?',
						answer: 'No — templates ship with device emulators that stream realistic synthetic telemetry immediately, so dashboards are never empty. Post-install instructions explain how to connect real hardware.',
					},
				],
			},
			{
				id: 'categories-use-cases',
				label: 'Categories & Use Cases',
				items: [
					{
						id: 'faq-st-how-are-templates-organized',
						question: 'How are solution templates organized?',
						answer: 'By Category (Agriculture, Asset Management, Energy, Industrial, Monitoring, Operations, Smart City, SCADA) and by shared Use Case tags. Browse or filter by either.',
					},
					{
						id: 'faq-st-how-do-use-case-tags-work',
						question: 'How do use-case tags work?',
						answer: 'Each template is tagged with shared IoT use cases, so filtering by a use case surfaces matching solutions, widgets, dashboards, and devices together. Popular use cases include Air Quality Monitoring, Asset Tracking, Cold Chain, Environment Monitoring, Fleet Tracking, Health Care, Industrial Automation, and Smart Farming; the full vocabulary is searchable in the Use Case filter.',
					},
				],
			},
			{
				id: 'contributing',
				label: 'Contributing',
				items: [
					{
						id: 'faq-st-how-do-i-contribute',
						question: 'How do I contribute a solution template?',
						answer: 'Check the <a href="/docs/iot-hub/contribution-guides/solution-template/">IoT Solution Template Contribution Guide</a> that describes the process of adding an IoT solution template. You can also contact <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a> for help.',
					},
					{
						id: 'faq-st-are-templates-free',
						question: 'Are solution templates free to use?',
						answer: 'All community-contributed templates are currently free. Commercial listings may be introduced in a future phase.',
					},
				],
			},
		],
	},
	'devices': {
		faq: [
			{
				id: 'general-catalog-contribution',
				label: 'General Catalog & Contribution',
				items: [
					{
						id: 'add-device',
						question: 'How can I add my device to the ThingsBoard IoT Device Library?',
						answer: 'To contribute your device, please check the <a href="/docs/iot-hub/contribution-guides/device/">IoT Device Contribution Guide</a> for step-by-step instructions. You will find the required guide structure, supported formats, and contact details for submission.',
					},
					{
						id: 'how-organized',
						question: 'How is the IoT device library organized?',
						answer: 'By Vendor (manufacturer), Hardware Type (Sensor, Gateway, Tracker, Development Board, Single Board Computer, and more), Connectivity (wireless, wired, and protocol tags), and shared Use Case tags. Combine filters to narrow results quickly.',
					},
					{
						id: 'how-often-updated',
						question: 'How often is the library updated?',
						answer: 'We continuously update the library with new devices, protocols, datasheets, and integration guides to reflect the latest IoT trends and user needs.',
					},
					{
						id: 'contact-support',
						question: 'Who can I contact for support or partnership inquiries?',
						answer: 'For support, technical questions, or partnership opportunities, contact us at <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a>',
					},
				],
			},
			{
				id: 'device-integration-testing',
				label: 'Device Integration & Testing',
				items: [
					{
						id: 'install-device',
						question: 'How do I install a device from the library?',
						answer: 'Click Connect on the device’s page. The install wizard shows setup instructions, collects any required input (device name, credentials, network settings), then creates the device profile, device, and dashboard in your instance and shows post-install steps with your connection details and firmware snippets.',
					},
					{
						id: 'connect-existing-device',
						question: 'How do I connect an existing device or sensor to ThingsBoard if it\'s not in the hub?',
						answer: 'Check out the <a href="/docs/iot-hub/contribution-guides/device/">connectivity guides</a> that describe the process of connecting devices. You can also submit a request to add a device by emailing <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a>',
					},
					{
						id: 'try-without-hardware',
						question: 'How can I try a device if I do not have physical hardware?',
						answer: 'Every device in the library can be instantly simulated using the ThingsBoard Device Emulator so you can test data flows and integration without real hardware.',
					},
					{
						id: 'connectivity-technologies',
						question: 'What connectivity technologies are supported?',
						answer: 'ThingsBoard supports a broad range of protocols, including LoRaWAN, NB-IoT, Wi-Fi, BLE, Ethernet, Modbus, LTE-M, Zigbee, and more. Each device page details supported options.',
					},
					{
						id: 'verify-connected',
						question: 'How can I verify that my device is connected successfully?',
						answer: 'After integration, visit the device page in ThingsBoard and check the Latest telemetry and Attributes sections to confirm data is being received and processed.',
					},
				],
			},
			{
				id: 'device-selection-comparison',
				label: 'Device Selection & Comparison',
				items: [
					{
						id: 'device-types',
						question: 'What types of devices are included in the IoT device library?',
						answer: 'The library features sensors, gateways, controllers, meters, trackers, and other IoT hardware.',
					},
					{
						id: 'compare-side-by-side',
						question: 'Can I compare devices side by side?',
						answer: 'Yes, all device profiles use a standardized layout, making it simple to compare technical specifications, features, and integration options across different brands and models.',
					},
					{
						id: 'filter-by-use-case',
						question: 'Is there a way to filter devices by use case, industry, or connectivity?',
						answer: 'Yes. Use advanced filters to quickly find devices by application, industry, connectivity, hardware type, brand, and more.',
					},
				],
			},
		],
	},
	'calculated-fields': {
		faq: [
			{
				id: 'using-calculated-fields',
				label: 'Using Calculated Fields',
				items: [
					{
						id: 'what-are-calculated-fields',
						question: 'What are calculated fields?',
						answer: 'Calculated fields are server-side data transformations that run automatically when new data arrives. They combine telemetry, attributes, or historical data into derived values, stored as new time series or attributes. Introduced in ThingsBoard 4.0, they simplify logic that previously lived in rule chains.',
					},
					{
						id: 'compatible-with-all-editions',
						question: 'Are they compatible with all ThingsBoard editions?',
						answer: 'Available in CE, PE, and Cloud since v4.0. Data reprocessing (historical recalculation) is PE-only. Each library entry displays edition badges and minimum version requirements.',
					},
					{
						id: 'how-do-i-import',
						question: 'How do I import a calculated field?',
						answer: 'Click Install on the calculated field’s page and pick the target — a device, asset, or device/asset profile — in the install dialog. The field is created on that target and immediately starts computing from live telemetry, saving the result as a new time series key or attribute. You can also download the JSON and import it manually from the Calculated Fields tab.',
					},
					{
						id: 'customize-after-importing',
						question: 'Can I customize calculated fields after importing?',
						answer: 'Yes. Modify title, arguments, expression/script, output config. For Script types, use the built-in Test Function mode to validate with real data before saving.',
					},
				],
			},
			{
				id: 'types-configuration',
				label: 'Types & Configuration',
				items: [
					{
						id: 'what-types-supported',
						question: 'What types of calculated fields are supported?',
						answer: 'Six types: Simple (arithmetic expressions), Script (TBEL logic), Geofencing (zone enter/exit detection), Propagation (forwarding values up or down the entity hierarchy), Related Entities Aggregation (rolling up telemetry across related entities), and Entity Aggregation (aggregating across all entities of a profile, e.g. fleet-wide totals).',
					},
					{
						id: 'difference-simple-script',
						question: 'Difference between Simple and Script?',
						answer: 'Simple uses basic arithmetic and standard math functions. Script uses TBEL for complex logic with conditionals, loops, and multi-value output — ideal for tiered pricing, state machines, or custom aggregation.',
					},
					{
						id: 'can-be-chained',
						question: 'Can calculated fields be chained?',
						answer: 'Yes. Output of one CF can trigger another, enabling multi-step processing pipelines.',
					},
					{
						id: 'how-use-case-tags-work',
						question: 'How do use-case tags work?',
						answer: 'Each calculated field is tagged with shared IoT use cases, so browsing by a use case surfaces matching fields, devices, dashboards, and widgets together. Popular use cases for calculated fields include Asset Tracking, Environment Monitoring, Fleet Tracking, Industrial Automation, Predictive Maintenance, Smart Building, and Smart City; the full marketplace vocabulary is searchable in the Use Case filter.',
					},
				],
			},
			{
				id: 'contributing',
				label: 'Contributing',
				items: [
					{
						id: 'how-do-i-contribute',
						question: 'How do I contribute?',
						answer: 'Check the <a href="/docs/iot-hub/contribution-guides/calculated-field/">IoT Calculated Field Contribution Guide</a> that describes the process of adding calculation fields. You can also contact <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a> for help.',
					},
					{
						id: 'are-they-free',
						question: 'Are they free to use?',
						answer: 'All community-contributed CFs are currently free. Licensing terms displayed on each page. Commercial listings may come in a future phase.',
					},
				],
			},
		],
	},
	'index': {
		info: [
			{
				kind: 'steps',
				heading: 'How It Works',
				intro: 'ThingsBoard IoT Hub helps you discover reusable IoT resources, evaluate them quickly, and apply them in your own ThingsBoard projects.',
				steps: [
					{
						label: 'Browse or search for IoT resources',
						description: 'Explore resources by category, use case, industry, connectivity, or implementation goal to find the most relevant starting point.',
					},
					{
						label: 'Preview and evaluate',
						description: 'Review descriptions, screenshots, technical context, integration-related details, and testing options before choosing the resource that fits your scenario.',
					},
					{
						label: 'Use and adapt',
						description: 'Access reusable assets, setup guidance, implementation resources, and hands-on testing paths that can be adapted to your ThingsBoard environment and project requirements.',
					},
					{
						label: 'Contribute back to the community',
						description: 'Share your own reusable solutions to help other users and expand the ThingsBoard ecosystem over time.',
					},
				],
			},
		],
		faq: [
			{
				id: 'general-hub-discovery',
				label: 'General Hub & Discovery',
				items: [
					{
						id: 'faq-hub-what-is',
						question: 'What is ThingsBoard IoT Hub?',
						answer: 'The ThingsBoard IoT Hub is a marketplace built into ThingsBoard where you install ready-to-use components — devices, solution templates, widgets, rule chains, calculated fields, and alarm rules — into your ThingsBoard instance in one step. Instead of building every part of a solution from scratch, you reuse components that hardware vendors, creators, and the ThingsBoard team have already built and maintain.',
					},
					{
						id: 'faq-hub-resource-kinds',
						question: 'What kinds of resources can I find here?',
						answer: 'The IoT Hub offers six component types: devices, solution templates, widgets, calculated fields, alarm rules, and rule chains. Each one installs into ThingsBoard in one step, and you adapt it to your data.',
					},
					{
						id: 'faq-hub-find-right-resource',
						question: 'How do I find the right resource?',
						answer: 'You can browse by category, use case, industry, connectivity, or implementation goal, and then evaluate resources based on descriptions, technical context, and supported workflows.',
					},
					{
						id: 'faq-hub-account-needed',
						question: 'Do I need a ThingsBoard account to access resources?',
						answer: 'You can discover the IoT Hub components without an account. To install a component, you sign in to your ThingsBoard instance — Community Edition, Professional Edition, or Cloud — and install it there in one step.',
					},
				],
			},
			{
				id: 'using-resources',
				label: 'Using Resources',
				items: [
					{
						id: 'faq-hub-how-to-use',
						question: 'How do I use a widget, alarm rules, or template?',
						answer: 'Open the component in the IoT Hub and install it into your ThingsBoard instance in one step — it arrives preconfigured. For devices, the connection config and telemetry mapping are already set; for alarm rules and rule chains, the logic is ready to use.',
					},
					{
						id: 'faq-hub-customizable',
						question: 'Can these resources be customized?',
						answer: 'Yes, many resources are designed to be adapted to your environment, data model, and project requirements. The level of customization depends on the specific resource type.',
					},
					{
						id: 'faq-hub-production-use',
						question: 'Can these resources be used in production?',
						answer: 'Components are built to speed up implementation, but production readiness depends on your environment and your own validation. Treat a component as a tested starting point you review before deploying.',
					},
					{
						id: 'faq-hub-editions-supported',
						question: 'What platform editions are supported?',
						answer: 'The IoT Hub is available on every ThingsBoard edition — Community Edition, Professional Edition (Self-Managed), and Cloud (PaaS). The implementation context of every component should be indicated on the relevant category or resource page.',
					},
				],
			},
			{
				id: 'device-library-integrations',
				label: 'IoT Device Library & Integrations',
				items: [
					{
						id: 'faq-hub-library-included',
						question: 'What is included in the IoT Device Library?',
						answer: 'The IoT Device Library is the IoT Hub\'s catalog of ready-to-use device profiles. Each entry includes the connection config and telemetry mapping for a specific hardware model, plus technical specs and a datasheet where available. Hardware vendors publish and maintain their own profiles.',
					},
					{
						id: 'faq-hub-integration-support',
						question: 'How do I know if a device has integration support?',
						answer: 'Each device page shows its readiness — whether a setup guide is available and how it connects to ThingsBoard — so you can tell at a glance what\'s supported before you install.',
					},
					{
						id: 'faq-hub-narrow-down-device',
						question: 'How do I narrow down the right device?',
						answer: 'You can filter available IoT devices by vendor, hardware type, connectivity, and use case to quickly narrow down device options.',
					},
				],
			},
			{
				id: 'contributions-community',
				label: 'Contributions & Community',
				items: [
					{
						id: 'faq-hub-how-to-contribute',
						question: 'How can I contribute my solution?',
						answer: 'You can add your component via the ThingsBoard Creator Portal. Detailed instructions are available here: <a href="/docs/iot-hub/contribution-guides/">How to contribute to IoT Hub</a>. You can also ask for help by email <a href="mailto:iothub@thingsboard.io">iothub@thingsboard.io</a>',
					},
					{
						id: 'faq-hub-contributions-accepted',
						question: 'What kinds of contributions are accepted?',
						answer: 'Any of the six component types, along with the details that make it usable — a description, screenshots, configuration examples, and setup guidance.',
					},
					{
						id: 'faq-hub-who-reviews',
						question: 'Who reviews contributed resources?',
						answer: 'The ThingsBoard team reviews each contribution before it\'s published, to keep quality and consistency across the IoT Hub.',
					},
					{
						id: 'faq-hub-free-to-use',
						question: 'Are resources free to use?',
						answer: 'Resources in the current stage are intended to be available for free, while access conditions and platform requirements may be specified on individual pages.',
					},
				],
			},
		],
	},
};

export function getCategorySections(slug?: string): IotHubCategorySections | undefined {
	return slug ? IOT_HUB_CATEGORY_SECTIONS[slug] : undefined;
}

export function getCategoryFaq(slug?: string): FaqGroup[] | undefined {
	const faq = getCategorySections(slug)?.faq;
	return faq && faq.length > 0 ? faq : undefined;
}

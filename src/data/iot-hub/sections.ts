import type { FaqGroup, IotHubCategorySections } from '@models/iot-hub-sections';

// Below-hero content per category slug. Pages without an entry render no extra sections.
export const IOT_HUB_CATEGORY_SECTIONS: Record<string, IotHubCategorySections> = {
	'alarm-rules': {
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard Alarm Rules',
				body: 'Alarm rules are how ThingsBoard turns raw telemetry into actionable incidents. Each rule watches one or more telemetry or attribute values and, when a condition is met, raises an alarm at a chosen severity — and clears it automatically when conditions return to normal. The IoT Hub offers pre-built rules you can install onto a device, asset, or profile in one click, so you skip writing the logic and start reacting to incidents immediately.',
			},
			{
				kind: 'bullets',
				heading: 'What Makes Our Catalog Unique?',
				items: [
					{
						label: 'Install and forget',
						description:
							'Each rule is self-contained — trigger conditions, severities, thresholds, and the clear condition all travel inside the JSON.',
					},
					{
						label: 'Works out of the box',
						description:
							'Thresholds read from server attributes with sensible defaults, so a rule fires correctly the moment it is installed — and you can tune the limit per entity without editing the rule.',
					},
					{
						label: 'Profile-level coverage',
						description:
							'Install on a device or asset profile and every entity of that type is monitored, including ones added later.',
					},
					{
						label: 'Severity-aware',
						description:
							'Rules raise CRITICAL, MAJOR, MINOR, WARNING, or INDETERMINATE alarms, with different conditions per severity.',
					},
					{
						label: 'Auto-clearing',
						description:
							'Most rules include a clear condition so alarms resolve themselves when telemetry recovers — no manual cleanup.',
					},
				],
			},
			{
				kind: 'table',
				heading: 'How Alarm Rules Work',
				columns: ['Component', 'What It Does'],
				rows: [
					[
						'Arguments',
						'References the telemetry/attribute the rule reads (e.g. temperature) and the threshold (often a server attribute with a default value).',
					],
					[
						'Create rules',
						'Per-severity trigger conditions — what must be true for each severity to fire, plus the alarm details message.',
					],
					[
						'Clear rule',
						'Optional condition that clears the alarm automatically when telemetry returns to normal.',
					],
					[
						'Propagation',
						'Flags controlling where the alarm surfaces — related entities, owner, owner hierarchy (PE), tenant.',
					],
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				steps: [
					{
						label: 'Browse or search',
						description: 'Use filters to find alarm rules by category or use case.',
					},
					{
						label: 'Check compatibility',
						description:
							'Verify the edition badge (some rules use PE-only propagation) and minimum ThingsBoard version.',
					},
					{
						label: 'Preview',
						description:
							'Read the trigger and clear conditions, severities, and the telemetry the rule expects.',
					},
					{
						label: 'Install and target',
						description:
							'Click Install, pick a device, asset, or profile, and the rule starts evaluating live telemetry right away.',
					},
				],
				cta: { label: 'Learn More About Alarm Rules', href: '/docs/user-guide/alarms/' },
			},
		],
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
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard Widgets',
				body: 'Widgets are the visual building blocks of every ThingsBoard dashboard. Each widget is a self-contained UI component that connects to your device data and renders it as a chart, gauge, map, table, control interface, or custom visualization. ThingsBoard ships with 300+ built-in widgets, and the IoT Hub extends this with community-contributed components you can import with one click.',
			},
			{
				kind: 'bullets',
				heading: 'What Makes Our Catalog Unique?',
				items: [
					{
						label: 'Two core widget types',
						description: 'Latest Values and Time Series — each type (the widget\'s descriptor.type) determines what data a widget consumes and how it renders telemetry.',
					},
					{
						label: 'Six browse categories',
						description: 'Cards & Info, Charts & Graphs, Controls, Gauges & Indicators, Input Forms, and Video & Cameras — plus 300+ built-in components covering every IoT visualization need.',
					},
					{
						label: 'Community-contributed extensions',
						description: 'Browse widgets created by ThingsBoard Team and developers worldwide, reviewed for quality and compatibility.',
					},
					{
						label: 'Import and customize',
						description: 'Every widget can be imported into your Widget Library with one click and fully customized using the built-in Widget Editor — modify HTML, CSS, JavaScript, and settings schema.',
					},
					{
						label: 'Cross-edition compatibility',
						description: 'Each widget supports CE, PE, Cloud edition and displays clear version requirements so you know it works before importing.',
					},
				],
			},
			{
				kind: 'table',
				heading: '2 Core Widget Types',
				intro: 'ThingsBoard\'s widget architecture currently exposes two foundational types in the IoT Hub — Latest Values and Time Series. Each type maps to a descriptor.type value (latest, timeseries) and determines what data a widget can consume and how it renders it.',
				columns: ['Type', 'What It Does', 'Data Source', 'Examples'],
				rows: [
					['Latest Values (latest)', 'Displays most recent telemetry or attribute value', 'Entity attributes, latest time-series, entity count', 'Digital Gauge, Value Card, Entities Table'],
					['Time Series (timeseries)', 'Visualizes historical data over configurable time windows', 'Time-series data with aggregation', 'Line Chart, Bar Chart, Area Chart, Heatmap'],
				],
			},
			{
				kind: 'prose',
				heading: 'Why Types Matter',
				body: 'Every widget in this Catalog declares exactly one type. When browsing, the type tells you what kind of data the widget expects. A “Time Series” widget needs historical telemetry data; a “Latest Values” widget shows the most recent reading. Knowing this helps you pick the right widget before importing it.',
			},
			{
				kind: 'table',
				heading: '6 Widget Categories',
				intro: 'Categories group widgets by what they look like and do, independent of their type. Every widget in the catalog is tagged with one or more of these six categories so you can browse by visual need.',
				columns: ['Category', 'What It Contains', 'Examples'],
				rows: [
					['Cards & Info', 'Compact value cards and informational panels that surface a single reading, label, or status at a glance.', 'Value Card, Label Card, Entity Count, Markdown/HTML Card'],
					['Charts & Graphs', 'Visualizations that plot telemetry over time or compare values across entities.', 'Line Chart, Bar Chart, Area Chart, Pie Chart, Heatmap'],
					['Controls', 'Interactive widgets that send commands or change device/server state via RPC.', 'Switch / Toggle, Command Button, Slider, Knob, Round Switch'],
					['Gauges & Indicators', 'Dial, level, and status widgets that show a value against a range or threshold.', 'Radial Gauge, Linear Gauge, Digital Gauge, Battery Level, Signal Indicator'],
					['Input Forms', 'Data-entry widgets that write attributes or telemetry back to entities.', 'Update Attribute Form, Multiple Input, Date/Time Picker'],
					['Video & Cameras', 'Live and recorded video-stream widgets for camera feeds and visual monitoring.', 'RTSP/HLS Video, IP Camera Stream, Image / Snapshot'],
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				steps: [
					{
						label: 'Browse or search',
						description: 'Use filters to find widgets by type, category, or use case.',
					},
					{
						label: 'Check compatibility',
						description: 'Verify edition badges and minimum version before importing.',
					},
					{
						label: 'Preview and evaluate',
						description: 'Review screenshots, numbers of install, and widget information.',
					},
					{
						label: 'Import and customize',
						description: 'Click Install to import the widget into your ThingsBoard Widget Library, then adapt data sources, styling, and behavior in the Widget Editor.',
					},
				],
				cta: { label: 'Learn More About Widget Integration', href: '/docs/user-guide/widgets/' },
			},
		],
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
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard Rule Chains',
				body: 'Rule chains are the automation engine of ThingsBoard. Every message that enters the platform — telemetry from a sensor, an RPC command, a device connecting or disconnecting — flows through a rule chain. A rule chain is a visual node graph where each node performs a specific operation (filter, enrich, transform, act) and routes the message to the next node based on the result. ThingsBoard ships with a default Root Rule Chain that saves telemetry and attributes. The IoT Hub extends this with community-contributed chains for alarm management, external integrations, data processing, and complex automation scenarios.',
			},
			{
				kind: 'bullets',
				heading: 'What Makes Our Catalog Unique?',
				items: [
					{
						label: 'Visual flow-based logic',
						description: 'Every rule chain is a node graph you can see and understand before importing. No black-box scripts — the processing pipeline is transparent.',
					},
					{
						label: '7 node building blocks',
						description: 'Filter, Enrichment, Transformation, Action, External, Flow, and Analytics nodes — the palette every rule chain is built from, covering everything from threshold checks to multi-cloud integrations.',
					},
					{
						label: 'Root chain + sub-chains',
						description: 'Complex logic can be decomposed into reusable sub-chains connected via the Rule Chain node. Import a sub-chain for alarm handling and plug it into your existing root chain.',
					},
					{
						label: 'Community-contributed patterns',
						description: 'Browse proven automation recipes created by ThingsBoard developers worldwide, reviewed for correctness and compatibility.',
					},
					{
						label: 'JSON import/export',
						description: 'Every rule chain exports as a single JSON file. Import into your instance and connect to device profiles in minutes.',
					},
					{
						label: 'Debug mode',
						description: 'After import, enable Debug on any node to trace message flow, inspect payloads, and troubleshoot logic.',
					},
				],
			},
			{
				kind: 'table',
				heading: 'How Rule Chains Process Messages',
				columns: ['Stage', 'What Happens', 'Node Types Involved'],
				rows: [
					['1. Message arrives', 'Device sends telemetry, attribute update, RPC request, or lifecycle event', '- (platform routes to root rule chain)'],
					['2. Filter & Route', 'Message is categorized and routed based on type, originator, conditions, or scripts', 'Filter nodes: Message Type Switch, Script Filter, Switch, Check Relation'],
					['3. Enrich', 'Additional context is added: device attributes, related entity data, customer info', 'Enrichment nodes: Originator Attributes, Related Attributes, Customer Attributes'],
					['4. Transform', 'Message payload is modified: format conversion, key renaming, calculation', 'Transformation nodes: Script Transform, Change Originator, To Email'],
					['5. Act', 'Operations performed: save to database, create alarm, send RPC, log event', 'Action nodes: Save Timeseries, Create Alarm, RPC Call, Log'],
					['6. Integrate', 'Message forwarded to external systems: email, Kafka, cloud services, webhooks', 'External nodes: REST API Call, Send Email, Kafka, MQTT Bridge'],
				],
			},
			{
				kind: 'table',
				heading: 'Rule Chain Types',
				intro: 'Each rule chain declares one type, which determines where it runs.',
				columns: ['Type', 'What It Does', 'Runs On', 'Example'],
				rows: [
					['CORE', 'Processes messages in the main rule engine — the common case.', 'Main ThingsBoard server', 'Telemetry processing, alarms, integrations'],
					['EDGE', 'Routes and processes messages locally at the edge.', 'ThingsBoard Edge instance', 'Local edge message routing, store-and-forward'],
				],
			},
			{
				kind: 'table',
				heading: 'Rule Chain Categories',
				intro: 'Browse categories describe what a chain does (distinct from the node building blocks inside it). Every chain carries one or more categories.',
				columns: ['Category', 'What It Does', 'Example Chains'],
				rows: [
					['Alerting', 'Detect conditions and raise alarms or notifications.', 'Threshold alarm, device inactivity, multi-severity escalation'],
					['Analytics', 'Compute, summarize, or score telemetry in-flight.', 'Aggregations, trend detection, derived KPIs'],
					['Automation', 'Trigger actions and orchestrate entity behavior.', 'Auto-assign / auto-group devices, scheduled actions'],
					['Data Processing', 'Transform, filter, enrich, and route messages.', 'Validation, unit conversion, deduplication, enrichment'],
					['Device Connectivity', 'Handle onboarding, provisioning, and connectivity events.', 'Auto-provisioning, online/offline tracking, auto-link devices'],
					['Integration', 'Forward data to or from external systems.', 'Kafka sink, MQTT, REST / webhook, cloud pipelines'],
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				steps: [
					{
						label: 'Browse or search',
						description: 'Use filters to find rule chains by type, category, or use case.',
					},
					{
						label: 'Check compatibility',
						description: 'Verify TB edition (some nodes are PE-only) and check if external services are required.',
					},
					{
						label: 'Preview',
						description: 'View the node graph diagram, read the description, and review which nodes and connections are used.',
					},
					{
						label: 'Import and connect',
						description: 'Click Install and choose in the dialog — import the chain on its own, or set it as the default rule chain for a device or asset profile. Imported chains appear in your Rule Chains list and start processing as soon as they’re wired in.',
					},
				],
				cta: { label: 'Learn More About Rule Engine', href: '/docs/user-guide/rule-engine/' },
			},
		],
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
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard Solution Templates',
				body: 'Solution templates are turnkey IoT blueprints that package dashboards, rule chains, device and asset profiles, calculated fields, and emulated devices into a single installable bundle. Click Install and the platform atomically provisions every entity, dropping you onto a live dashboard streaming simulated data within seconds.',
			},
			{
				kind: 'bullets',
				heading: 'What\'s Inside a Solution Template?',
				items: [
					{
						label: 'Dashboards',
						description: 'One or more ThingsBoard dashboards with entity aliases pre-wired, so live data appears immediately after install.',
					},
					{
						label: 'Backend logic',
						description: 'Device & asset profiles, rule chains, and calculated fields — alarms, data processing, and derived metrics — bundled and provisioned automatically.',
					},
					{
						label: 'Devices with telemetry emulators',
						description: 'Simulated devices stream realistic synthetic data the moment the template is installed, so dashboards are never empty.',
					},
					{
						label: 'description.md & instructions.md',
						description: 'Marketplace description plus post-install instructions that walk users through setup and connecting real hardware.',
					},
					{
						label: 'Edition targeting',
						description: 'Each template declares Community Edition (CE), Professional Edition (PE), or both — you only see solutions compatible with your edition.',
					},
				],
			},
			{
				kind: 'table',
				heading: 'Solution Template Categories',
				intro: 'Templates are organized into eight browse categories by the kind of solution they deliver. Every template carries one or more categories so you can browse by domain.',
				columns: ['Category', 'What It Covers', 'Example Solutions'],
				rows: [
					['Agriculture', 'Farming, greenhouse, and irrigation monitoring.', 'Smart irrigation, silo monitoring'],
					['Asset Management', 'Tracking and managing physical assets and inventory.', 'Asset tracking, fleet tracking'],
					['Energy', 'Power generation, distribution, metering, and consumption.', 'Water/energy metering, solar monitoring'],
					['Industrial', 'Manufacturing, process control, and plant operations.', 'Manufacturing plant, industrial automation'],
					['Monitoring', 'General environmental and condition monitoring.', 'Air quality, temperature & humidity'],
					['Operations', 'Day-to-day operational and facility workflows.', 'Smart office, assisted living, waste management'],
					['Smart City', 'Urban infrastructure and public services.', 'Water metering, smart city services'],
					['SCADA', 'Supervisory control and data acquisition for industrial processes.', 'SCADA energy monitoring, SCADA oil & gas'],
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				intro: 'Installing a solution template provisions a complete, working environment in one transaction:',
				steps: [
					{
						label: 'Browse or search',
						description: 'Find solutions by category or use case.',
					},
					{
						label: 'Check compatibility',
						description: 'Verify the CE/PE edition badge and minimum ThingsBoard version.',
					},
					{
						label: 'Review & install',
						description: 'Read the description and preview gallery, then click Install.',
					},
					{
						label: 'Atomic provisioning',
						description: 'The platform creates every entity — profiles, rule chains, calculated fields, dashboards, devices, and emulators — in one transaction.',
					},
					{
						label: 'Explore live data',
						description: 'You land on the main dashboard with simulated telemetry already flowing; post-install instructions explain how to connect real hardware.',
					},
				],
			},
		],
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
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard IoT Device Library',
				body: 'Go beyond basic device listings. The ThingsBoard IoT Device Library helps users research hardware, narrow down options with advanced filters, compare technical characteristics, review connectivity and platform compatibility, access integration options, and instantly test supported devices in ThingsBoard through built-in emulation. From sensors and gateways to controllers, meters, and trackers, the library connects device evaluation with real implementation workflows — even without physical hardware.',
			},
			{
				kind: 'bullets',
				heading: 'What Makes Our Library Unique?',
				items: [
					{
						label: 'All-in-one IoT resource',
						description: 'Explore a diverse lineup of sensors, gateways, controllers, meters, and trackers from top global brands in a single library.',
					},
					{
						label: 'Consistent device profiles',
						description: 'Each device page presents specs, features, datasheets, integration instructions, and related hardware in a clear, standardized format.',
					},
					{
						label: 'Smart discovery tools',
						description: 'Use advanced filters to instantly narrow down devices by hardware type, connectivity, vendors or use case.',
					},
					{
						label: 'Integration-ready assurance',
						description: 'Devices with official ThingsBoard integration options are clearly marked, so you can trust in a seamless setup experience.',
					},
					{
						label: 'Instant hands-on testing',
						description: 'Launch the ThingsBoard Device Emulator for any listed device — simulate and test integration flows directly in your browser, no physical device needed.',
					},
					{
						label: 'Continuously updated',
						description: 'Our library grows alongside the IoT market, with new devices, protocols, and best practices added regularly.',
					},
				],
			},
			{
				kind: 'table',
				heading: 'Hardware Types',
				intro: 'Every device declares one hardware type.',
				columns: ['Hardware Type', 'Description'],
				rows: [
					['Sensor', 'Measures physical quantities (temperature, humidity, motion, air quality).'],
					['Gateway', 'Bridges field devices and protocols to ThingsBoard.'],
					['Tracker', 'GPS / asset-tracking devices.'],
					['Development Board', 'Prototyping boards (ESP32, Arduino, etc.).'],
					['Single Board Computer', 'Full computers on one board (Raspberry Pi, etc.).'],
					['Controller', 'Logic/control units coordinating other devices.'],
					['PLC', 'Programmable logic controllers for industrial automation.'],
					['Meter', 'Utility and energy meters (electricity, water, gas).'],
					['Actuator', 'Devices that act on the physical world (valves, motors, switches).'],
					['Relay', 'Switching devices for circuits and loads.'],
					['Analyzer', 'Instruments that measure and analyze (gas, water, power quality).'],
					['Data Logger', 'Records and buffers measurements over time.'],
					['Camera', 'Image and video capture devices.'],
					['Display', 'Screens and HMI panels.'],
					['AI Accelerator', 'Edge AI/ML inference hardware.'],
				],
			},
			{
				kind: 'table',
				heading: 'Connectivity',
				intro: 'Devices are tagged with every physical interface and protocol they support, grouped as wireless, wired, and protocols.',
				columns: ['Group', 'Tags'],
				rows: [
					['Wireless', 'Wi-Fi, Bluetooth, LoRaWAN, Zigbee, Z-Wave, Thread, NB-IoT, LTE-M, Sigfox, NFC, 2G/3G/4G/5G, 6LoWPAN, DigiMesh, UWB'],
					['Wired', 'Ethernet, RS485, RS232, USB, UART, SPI, I2C, CAN, 1-Wire, 4-20mA, 0-10V, M-Bus, IO-Link, IrDA, Power Line Communication, SDI-12'],
					['Protocols', 'MQTT, HTTP, HTTPS, CoAP, REST, SNMP, Modbus RTU, Modbus TCP, OPC-UA, BACnet, KNX, WebSocket, TCP/IP, UDP, CANopen, DNP3, EtherCAT, Foundation Fieldbus, HART, IEC 61850, PROFINET, Wireless M-Bus'],
				],
			},
			{
				kind: 'bullets',
				heading: 'How Devices Connect',
				intro: 'A device package declares one or more install methods; the install wizard provisions everything for the chosen path:',
				items: [
					{
						label: 'Direct transports',
						description: 'Device connects straight to the platform via HTTP, MQTT, CoAP, LwM2M, or SNMP (CE & PE).',
					},
					{
						label: 'ThingsBoard IoT Gateway connectors',
						description: 'Device talks to a gateway that forwards to the platform — Modbus, OPC-UA, BACnet, BLE, CAN, KNX, OCPP, REST, SNMP, and more (CE & PE).',
					},
					{
						label: 'ChirpStack',
						description: 'LoRaWAN devices via the CE-compatible ChirpStack integration.',
					},
					{
						label: 'PE integrations',
						description: 'LoRaWAN and cloud network servers (TTN/TTI, LORIOT, Sigfox, AWS, Azure, Kafka, etc.) — Professional Edition.',
					},
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				steps: [
					{
						label: 'Browse or search',
						description: 'Use filters to find devices by vendor, hardware type, connectivity, or use case.',
					},
					{
						label: 'Compare devices',
						description: 'Each page provides detailed specs, downloadable datasheets, and side-by-side comparable fields.',
					},
					{
						label: 'Integrate faster',
						description: 'Access step-by-step automated integration guides and test device compatibility with ThingsBoard instantly using the emulator.',
					},
					{
						label: 'Stay informed',
						description: 'Explore real use cases, supported protocols, and platform editions for every device.',
					},
				],
				cta: { label: 'Learn More About Devices', href: '/docs/user-guide/devices/' },
			},
		],
		faq: [
			{
				id: 'general-catalog-contribution',
				label: 'General Catalog & Contribution',
				items: [
					{
						id: 'add-device',
						question: 'How can I add my device to the ThingsBoard IoT Device Library?',
						answer: 'To contribute your device, please check the <a href="/docs/iot-hub/contribution-guides/device/">IoT Hub Device Contribution Guide</a> for step-by-step instructions. You will find the required guide structure, supported formats, and contact details for submission.',
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
		info: [
			{
				kind: 'prose',
				heading: 'About ThingsBoard Calculated Fields',
				body: 'Calculated fields are ThingsBoard’s built-in logic layer for transforming raw IoT data into actionable insights in real time. Instead of building complex rule chains, you define calculations that execute automatically when data arrives — combining telemetry from multiple devices, aggregating historical values, or propagating derived metrics to related entities.',
			},
			{
				kind: 'bullets',
				heading: 'What Makes Our Catalog Unique?',
				items: [
					{
						label: 'Six specialized computation types',
						description: 'From simple arithmetic to TBEL scripts, geofencing, cross-entity propagation, and multi-entity aggregation.',
					},
					{
						label: 'Zero rule chain overhead',
						description: 'Calculated fields replace complex rule chain logic with clean, modular expressions. Introduced in ThingsBoard 4.0.',
					},
					{
						label: 'Community-contributed templates',
						description: 'Browse ready-to-import configurations reviewed for correctness and compatibility.',
					},
					{
						label: 'Import and customize',
						description: 'Every CF can be imported via JSON and adapted to your entity structure and telemetry keys.',
					},
					{
						label: 'Chainable execution',
						description: 'Output of one CF can trigger another, enabling multi-step pipelines without rule chains.',
					},
				],
			},
			{
				kind: 'table',
				heading: '6 Core Types',
				columns: ['Type', 'What It Does', 'Arguments', 'Example'],
				rows: [
					['Simple', 'Basic arithmetic and math functions', 'Latest telemetry, Attributes', 'Dew point from temperature + humidity'],
					['Script', 'Complex TBEL computations, multi-value output', 'All 3 argument types', 'Energy cost with tiered pricing'],
					['Geofencing', 'Position relative to geozones, enter/exit events', 'Lat/lon telemetry + geozone attributes', 'Truck enters warehouse zone'],
					['Propagation', 'Copy/transform data to related entities', 'Source entity telemetry/attributes', 'Battery level → parent asset'],
					['Related Entities Aggregation', 'Aggregate latest data from related entities (min, max, avg, sum, count)', 'Related entity telemetry', 'Avg temperature across room sensors'],
					['Entity Aggregation', 'Aggregate telemetry across all entities of a given profile (fleet-wide totals/averages)', 'Profile entity telemetry', 'Average fuel level across all trucks'],
				],
			},
			{
				kind: 'table',
				heading: '6 Categories',
				intro: 'Categories group calculated fields by the kind of computation they perform, independent of their technical type. Every field is tagged with one or more of these six categories so you can browse by domain.',
				columns: ['Category', 'What It Captures', 'Examples'],
				rows: [
					['Aggregation', 'Fields that roll up readings across related entities or a profile into one metric.', 'Avg temperature across room sensors, active device count, fleet totals'],
					['Custom Formula', 'Arbitrary math or TBEL expressions deriving a new value from inputs.', 'Power factor, delta from previous reading, tiered energy cost'],
					['Energy', 'Power, consumption, and electrical metrics.', 'Active/reactive power, kWh consumption delta, peak demand'],
					['Environmental', 'Climate and air-quality derivations.', 'Dew point, heat index, AQI, comfort score'],
					['Geospatial', 'Location-based computations from GPS telemetry.', 'Geofence enter/exit, distance travelled, GPS position sync'],
					['Statistical', 'Statistical summaries and anomaly metrics.', 'Min / max / avg, standard deviation, rolling trend, anomaly delta'],
				],
			},
			{
				kind: 'steps',
				heading: 'How It Works',
				steps: [
					{
						label: 'Browse or search',
						description: 'Find CFs by type, category, or use case.',
					},
					{
						label: 'Check compatibility',
						description: 'Verify TB version (4.0+ required) and edition.',
					},
					{
						label: 'Preview logic',
						description: 'Review formula/script, arguments, and output structure.',
					},
					{
						label: 'Import and adapt',
						description: 'Download JSON, import into entity/profile, map telemetry keys.',
					},
				],
				cta: { label: 'Learn More About Calculated Fields', href: '/docs/iot-hub/contribution-guides/calculated-field/#calculated-field-categories' },
			},
		],
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

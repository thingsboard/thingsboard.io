import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How SuessCo Sensors Uses ThingsBoard to Monitor Infrastructure with 6D Sensors',
	pageTitle: 'How SuessCo Sensors Monitor Infrastructure with 6D Sensors',
	description:
		'SuessCo Sensors and ThingsBoard provide real-time monitoring of bridges and historic structures in Austria with 6D sensors for safety and maintenance.',
	pageSlug: 'suessco',
	breadcrumb: 'SuessCo — Facility Management',
	categories: ['Facility management'],

	hero: {
		category: 'FACILITY MANAGEMENT',
		heading: 'SuessCo: IoT hub as a platform for monitoring sensors',
		paragraphs: [
			'SuessCo Sensors GmbH, established in 2018 and located in Herzogenburg, Austria, is a leader in sensor technology innovation. They created the world\u2019s first 6D sensor, a groundbreaking device that uses magnetic field technology and artificial intelligence to monitor the health of structures. This includes detecting cracks and tracking the movements of bridges, historical buildings, and other important infrastructure. These sensors are widely used in construction, transportation, and industrial applications to enhance safety and extend the lifespan of infrastructure.',
		],
		logo: 'https://img.thingsboard.io/case-studies/suessco.svg',
		logoAlt: 'SuessCo Sensors GmbH logo',
		logoWidth: 320,
		logoHeight: 57,
		backgroundImage: 'https://img.thingsboard.io/case-studies/suessco.webp',
	},

	authoredQuote: {
		text: '\u201CBridges are very often still monitored manually and it is also very time-consuming to check whether they are still in good condition or not.\u201D',
		author: 'Ernst Windh\u00F6r',
		role: 'CEO',
		company: 'SuessCo Sensors GmbH',
		photo: 'https://img.thingsboard.io/case-studies/Ernst_Windh\u00F6r.webp',
	},

	problem: {
		description:
			'SuessCo Sensors GmbH faced a big challenge: how to provide accurate monitoring for important structures like bridges, historical buildings, and government monuments in Austria. Traditional methods relied on manual inspections, which were slow, required a lot of work, and often missed small but important details. They also couldn\u2019t show real-time changes, which made it harder to act quickly and prevent problems. SuessCo\u2019s clients include construction companies, infrastructure operators, and owners of old buildings such as churches or dioceses. These clients needed real-time data to understand and predict how structures might change due to weather or other conditions. <br> <br> Earlier, SuessCo\u2019s sensors could only measure in two dimensions. The new 6D sensor changed everything. Using magnetic field technology, it can now measure both straight movements and rotations. However, using this advanced sensor created another challenge: SuessCo needed a powerful system to process, store, and analyze the large amount of data the sensor produced.',
		challenges: [
			'Weather Effects: In summer, bridges and other structures expand because of heat. In winter, they shrink because of the cold. Monitoring these changes is important for safety and maintenance.',
			'Cracks in Structures: Historical buildings and monuments need monitoring to check when cracks become big enough to need repair.',
			'Complex Movements: Structures can shift and rotate in three dimensions (X, Y, Z). Measuring these movements is very difficult and needs advanced calculations.',
		],
		results: [
			'Real-time tracking of movements and rotations using 6D sensors. This capability helped detect issues early, preventing major failures and ensuring the stability of critical infrastructure.',
			'A highly flexible rule engine allowed the creation of tailored alerts for structural shifts or stresses. Automated notifications enabled quick responses to potential risks, improving the reliability of the monitoring system.',
			'ThingsBoard\u2019s data analysis tools helped SuessCo identify and prioritise repairs for critical structures like bridges and monuments. This improved public safety and extended the lifespan of monitored infrastructure by focusing on necessary maintenance.',
		],
	},

	power: {
		companyName: 'SuessCo',
		blocks: [
			{
				title: 'Advanced monitoring for 6D sensors',
				text: 'ThingsBoard, provided by Magenta Business, played a key role in helping SuessCo create an advanced monitoring system. This IoT platform made it easier to manage the complex data and requirements of SuessCo\u2019s 6D sensors. These sensors measure movements and rotations in different dimensions, which requires precise calculations. ThingsBoard processed this data in real-time, ensuring accurate results no matter how the sensors were installed. This helped SuessCo provide reliable insights for monitoring infrastructure.',
				image: 'https://img.thingsboard.io/case-studies/strategic_selection.webp',
				imageAlt: 'Man monitoring dashboard',
			},
			{
				title: 'Real-time alerts for structural safety',
				text: 'One of the most useful features of ThingsBoard was its ability to set up automatic alerts. SuessCo used this function to detect structural changes in real-time. If a problem was detected, the system sent an alert to clients so they could act quickly. This reduced the risk of costly repairs and prevented serious damage.',
				image: 'https://img.thingsboard.io/case-studies/real-time-alerts.webp',
				imageAlt: 'Tabled with alert',
			},
			{
				title: 'Custom dashboards for better decision-making',
				text: 'ThingsBoard also provided customizable dashboards where clients could see real-time data about the structures they were monitoring. This made it easy for them to check the condition of bridges, tunnels, and other infrastructure, helping them make better decisions for immediate repairs and long-term planning.',
				image: 'https://img.thingsboard.io/case-studies/analysing_data.webp',
				imageAlt: 'Man at holographic screens',
			},
			{
				title: 'Scalable solutions for any project',
				text: 'The platform was also highly flexible. It allowed SuessCo to monitor both small and large projects, from detecting cracks in historical monuments to managing big infrastructures like the Donaubr\u00FCcke. Its scalability meant that SuessCo could expand its operations without worrying about technical limitations.',
				image: 'https://img.thingsboard.io/case-studies/business_growth.webp',
				imageAlt: 'Man at holographic screens',
			},
			{
				title: 'Secure and reliable data management',
				text: 'Additionally, with the help of Magenta Business, ThingsBoard ensured secure data transmission and storage. This was important for clients such as government agencies and infrastructure operators, who needed to follow strict safety and data protection rules. The reliability of this system strengthened SuessCo\u2019s reputation as a trusted provider of monitoring solutions.',
				image: 'https://img.thingsboard.io/case-studies/secure_and_reliable_data_management.webp',
				imageAlt: 'Man behind holographic charts',
			},
		],
	},

	quote: {
		text: '\u201CThis is a world first, because it is a very disruptive technology,\u201D says Windh\u00F6r. \u201CUntil now, there were only sensors that could measure the change in a crack in one direction. Our sensor can measure in 6 dimensions and therefore map the deviations much more precisely.\u201D',
		author: 'SuessCo Sensors GmbH',
	},

	help: {
		industryName: 'facility management improve operations with IoT',
		blocks: [
			{
				title: 'Centralized monitoring and management',
				text: 'Facility operators deal with multiple disparate systems: HVAC, lighting, security, water supply, and more. ThingsBoard unifies these into a single platform, allowing seamless management of all processes through a user-friendly interface.',
				listItems: [
					'You connect sensors for temperature, humidity, motion, water consumption, and other parameters.',
					'All data is aggregated and visualized on customizable dashboards.',
					'Automated alerts and system responses can be configured (e.g., turning on ventilation when CO\u2082 levels rise).',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/supermarkets_2.webp', alt: 'Thingsboard supermarkets widget', title: 'Thingsboard supermarkets widget' },
				],
			},
			{
				title: 'Predictive maintenance',
				text: 'A broken air conditioner in a shopping mall during summer is not just an inconvenience but a serious business problem. Predictive maintenance helps prevent breakdowns before they occur.',
				listItems: [
					'Sensors track changes in equipment parameters (engine temperature, vibration, oil level).',
					'ThingsBoard analyzes data in real-time and detects anomalies.',
					'The system automatically creates notifications or service requests.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-3.webp', alt: 'Thingsboard alarms widget', title: 'Thingsboard alarms widget' },
				],
			},
			{
				title: 'Smart dashboards and data visualization',
				text: 'Raw data is useless without proper visualization. ThingsBoard enables the creation of informative dashboards that help make faster decisions.',
				listItems: [
					'You create dashboards for specific tasks (e.g., energy consumption monitoring, climate control, space utilization analysis).',
					'Data is displayed using charts, graphs, tables, and maps.',
					'Role-based access control allows engineers to see one set of metrics while managers view another.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
				],
			},
			{
				title: 'Energy consumption management',
				text: 'Energy costs are one of the largest expenses. IoT analytics helps reduce costs, identify overuse, and implement energy-saving scenarios.',
				listItems: [
					'You connect energy meters, light sensors, and climate control systems.',
					'ThingsBoard analyzes consumption and identifies anomalies (e.g., electrical overloads or inefficient heating zones).',
					'Automated scenarios can be configured, such as dimming lights at night or turning off air-conditioners in empty rooms.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
				],
			},
			{
				title: 'Process automation and BMS integration',
				text: 'Building management should not be manual \u2014 ThingsBoard enables the automation of routine processes and seamless integration with Building Management Systems (BMS).',
				listItems: [
					'If CO\u2082 levels exceed the threshold, the system automatically turns on ventilation.',
					'If a water leakage sensor is triggered, ThingsBoard sends an emergency alert and shuts off the water supply.',
					'Motion sensors ensure lights are only on in occupied areas.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Enhancing facility security',
				text: 'Modern buildings require intelligent security systems. ThingsBoard allows integration and monitoring of video surveillance, access control, smoke detectors, and motion sensors.',
				listItems: [
					'Sensors detect movement in restricted areas, triggering instant notifications.',
					'Security personnel can view live camera feeds directly within ThingsBoard.',
					'In case of fire or gas leaks, the system automatically sends an alarm and activates emergency protocols.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarm_widgets.webp', alt: 'Thingsboard alarm widgets', title: 'Thingsboard alarm widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/supermarkets.webp', alt: 'Supermarkets widget', title: 'Supermarkets widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/suessco.svg',
		companyLogoAlt: 'SuessCo Sensors GmbH logo',
		companyLogoWidth: 320,
		companyLogoHeight: 57,
	},
};

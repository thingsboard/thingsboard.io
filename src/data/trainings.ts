export interface SessionTopic {
	textContent: string;
	warning?: boolean;
}

export interface CourseSession {
	sessionName: string;
	sessionLengthInHours: number;
	sessionTopics: SessionTopic[];
}

export interface Course {
	id: string;
	courseName: string;
	courseDescription: string;
	carouselCourseDescription: string;
	warningMessage?: string;
	courseSessions: CourseSession[];
}

export const courses: Course[] = [
	{
		id: 'data-visualization',
		courseName: 'Data visualization',
		courseDescription:
			'Learn how to effectively model and visualize data using the ThingsBoard platform. This training block covers the essentials of ThingsBoard\'s Web UI, entity management, and advanced data visualization techniques. You will gain hands-on experience with creating and customizing widgets, as well as building comprehensive dashboards that provide insightful data representations for your IoT projects.',
		carouselCourseDescription:
			'Clear and simple introduction to data visualization tools and how to create custom widgets',
		courseSessions: [
			{
				sessionName: 'ThingsBoard UI fundamentals: data modeling and visual representation',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn how to navigate the ThingsBoard UI confidently, understanding its layout, navigation, and key features.',
					},
					{
						textContent:
							'Explore the ThingsBoard hierarchy: SysAdmin, Tenants, Customers, and Users, along with roles and permissions.',
					},
					{ textContent: 'Learn how to configure Tenant Profiles.' },
					{ textContent: 'Manage core entities like Devices, Assets, and Entity Views.' },
					{
						textContent:
							'Learn how to group Devices and Assets for better scalability (PE Feature).',
					},
					{
						textContent:
							'Work with entity attributes and telemetry data to retrieve both real-time and historical insights.',
					},
					{
						textContent:
							'Understand entity relations, different relationship types, and how they define connections between entities.',
					},
					{
						textContent:
							'Explore real-world use cases of entity relations in ThingsBoard.',
					},
					{
						textContent:
							'Identify common limitations and best practices to avoid performance bottlenecks.',
					},
					{ textContent: 'Apply knowledge through real-world scenarios.' },
					{
						textContent:
							'Discuss best practices for ThingsBoard UI and data management.',
					},
				],
			},
			{
				sessionName: 'ThingsBoard dashboard & widget mastery',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Deep Dive into ThingsBoard Dashboards to understand Entity Aliases, Time Window selection, General Settings, and Dashboard States.',
					},
					{
						textContent:
							'Explore state transitions and how to enhance user experience.',
					},
					{
						textContent:
							'Learn how to customize Chart, Markdown/HTML Card, and Map widgets.',
					},
					{
						textContent:
							'Utilize Custom Tooltips and Dashboard Actions to improve usability and interaction.',
					},
					{
						textContent:
							'Create dashboards with multiple states to display Asset hierarchy.',
					},
					{
						textContent:
							'Implement drill-down functionality for detailed views of assets and devices.',
					},
					{ textContent: 'Discuss advanced visualization strategies.' },
					{ textContent: 'Gain hands-on experience with dashboard configurations.' },
				],
			},
			{
				sessionName: 'ThingsBoard custom widget development (session 1)',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent: 'Recommended for users with JavaScript and Angular experience',
						warning: true,
					},
					{
						textContent:
							'Learn how to use the ThingsBoard Widget Editor, its layout, and key features.',
					},
					{
						textContent:
							'Explore how to navigate, create, and configure widget bundles.',
					},
					{
						textContent:
							'Manage widgets efficiently through importing, modifying, and exporting.',
					},
					{
						textContent:
							'Learn how to build Control Widgets: develop widgets for real-time user interactions.',
					},
					{
						textContent:
							'Develop Static Widgets: Create non-interactive elements for structured data display.',
					},
					{
						textContent:
							'Understand how to develop Markdown/HTML Widgets: Enhance dashboards with flexible content.',
					},
					{
						textContent:
							'Learn how to structure widgets for performance, scalability, and maintainability.',
					},
					{ textContent: 'Troubleshoot common widget development challenges.' },
					{ textContent: 'Gain hands-on experience in custom widget creation.' },
				],
			},
			{
				sessionName: 'ThingsBoard custom widget development (session 2)',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent: 'Recommended for users with JavaScript and Angular experience',
						warning: true,
					},
					{
						textContent:
							'Understand complex widget structures and custom logic implementation.',
					},
					{
						textContent:
							'Work with the Last Values widgets for real-time data representation.',
					},
					{ textContent: 'Learn how to Develop Time-Series Widgets.' },
					{
						textContent:
							'Build a Time-Series Table to structure historical data.',
					},
					{
						textContent:
							'Create a Dynamic Line Chart to visualize trends in telemetry data.',
					},
					{
						textContent:
							'Implement custom action templates for interactive dashboards.',
					},
					{ textContent: 'Use HTML extensions for advanced data manipulation.' },
					{ textContent: 'Discuss common custom widget challenges.' },
					{
						textContent:
							'Learn best practices for scalable and maintainable widget development.',
					},
				],
			},
		],
	},
	{
		id: 'administration',
		courseName: 'ThingsBoard administration',
		courseDescription:
			'This training provides administrators with the skills needed to successfully deploy, configure, and manage ThingsBoard in various environments. You will learn monolithic and cluster-based deployment strategies, understand architecture components. This training covers hands-on AWS deployment, troubleshooting common issues using logs and diagnostic tools, and improving ThingsBoard\'s performance and stability.',
		carouselCourseDescription:
			'Basic understanding of installation, configuration, and maintenance for effective platform administration.',
		courseSessions: [
			{
				sessionName: 'ThingsBoard administration',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn how to install and configure ThingsBoard in both monolithic and cluster deployments.',
					},
					{
						textContent:
							'Understand the limitations and load capacity of each deployment option, and for which use cases they suit the best.',
					},
					{
						textContent:
							'Explore ThingsBoard architecture and understand the role of key services and third-party applications.',
					},
					{
						textContent:
							'Develop hands-on skills in deploying ThingsBoard on AWS including both basic monolithic and Docker-based microservice platforms.',
					},
					{
						textContent:
							'Understand the advantages and limitations of different deployment types, including monolith and cluster setups.',
					},
					{
						textContent:
							'Discuss best practices for configuring ThingsBoard for optimal performance in different environments.',
					},
					{
						textContent:
							'Identify and troubleshoot common issues using logs and diagnostic tools.',
					},
					{
						textContent:
							'Engage in Q&A discussions to clarify concepts and address real-world challenges.',
					},
				],
			},
		],
	},
	{
		id: 'scada',
		courseName: 'SCADA system',
		courseDescription:
			'You will learn how to utilize existing SCADA symbols, add new ones, work with SVG tags, and define behaviors and properties with a full description of their capabilities. By the end of the course, participants will be able to build powerful dashboards that optimize process management and monitoring.',
		carouselCourseDescription:
			'Detailed guide to creating dashboards for SCADA systems, including layout and configuration settings.',
		warningMessage:
			'Recommended for users with knowledge of the platform or after completing the "Data Visualization" training',
		courseSessions: [
			{
				sessionName:
					'ThingsBoard and IoT gateway essentials – from connectivity to SCADA visualisation',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn the main device connectivity possibilities and fundamentals of the ThingsBoard IoT Gateway option.',
					},
					{
						textContent:
							'Understand what ThingsBoard IoT Gateway is and explore the variety of capabilities and protocols it provides.',
					},
					{
						textContent:
							'Learn about rule chains – what they are, how they work, and how to set them up with practical examples such as processing data with default rule chains, editing them, and assigning custom rule chains to devices.',
					},
					{
						textContent:
							'Dive into a quick overview of ThingsBoard IoT data visualisation.',
					},
					{
						textContent:
							'Learning how to set up a dashboard with an example of SCADA systems in traditional and high-performance modes.',
					},
					{
						textContent:
							'Learn how to use acquired knowledge to develop a SCADA system from scratch or by utilising existing solution templates.',
					},
					{
						textContent:
							'Review the SCADA water pool template, including setting up the solution, a walkthrough, and an explanation of its inner workings.',
					},
					{
						textContent:
							'Configure additional features on top of the SCADA pool template to create new solutions.',
					},
					{ textContent: 'Engage in a Q&A session to ask questions and clarify any doubts.' },
				],
			},
			{
				sessionName: 'SCADA intro – fundamentals of SCADA interface and dashboard creation',
				sessionLengthInHours: 2,
				sessionTopics: [
					{ textContent: 'Learn the core functions of the SCADA user interface.' },
					{
						textContent:
							'Understand the structure and navigation of the SCADA platform.',
					},
					{
						textContent:
							'Discover how to create a basic dashboard using pre-configured symbols.',
					},
					{
						textContent:
							'Use layout settings—such as grid, toolbar, and scaling options—for effective dashboard customization.',
					},
					{
						textContent:
							'Work with different configurations to adjust the user interface to various operational scenarios.',
					},
					{
						textContent:
							'Engage in a Q&A session to clear up any doubts and strengthen your skills.',
					},
				],
			},
			{
				sessionName: 'SCADA advanced - symbol management and tag configuration',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn how to navigate and manage the library of existing SCADA symbols.',
					},
					{
						textContent:
							'Understand the process of searching, configuring, and adding symbols to dashboards.',
					},
					{
						textContent:
							'Discover how to create new SCADA symbols and integrate them into your dashboard.',
					},
					{
						textContent:
							'Use the built-in editor or XML to work with tags for real-time data visualization.',
					},
					{
						textContent:
							'Work with tags effectively and ensure they update data correctly and interact smoothly.',
					},
					{
						textContent:
							'Engage in a Q&A session to better understand advanced topics.',
					},
				],
			},
			{
				sessionName:
					'SCADA mastery – advanced properties, behaviors, and widget engineering',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn to set key behaviour parameters like "Value", "Action," and "Widget Action".',
					},
					{
						textContent:
							'Understand the difference between static and dynamic properties and how to configure them.',
					},
					{
						textContent:
							'Discover the principles of data binding, animations, and event reactions that drive interactive dashboard elements.',
					},
					{
						textContent:
							'Use custom widget development techniques to optimize dashboard performance.',
					},
					{
						textContent:
							'Work with custom widgets and bundles, integrating interactive elements into your dashboards.',
					},
					{
						textContent:
							'Engage in a Q&A session to resolve any queries and ensure mastery of advanced development concepts.',
					},
				],
			},
		],
	},
	{
		id: 'management',
		courseName: 'Platform management and security',
		courseDescription:
			'This training program helps participants gain a strong understanding of ThingsBoard\'s main features through hands-on practice. It covers data automation using the Rule Engine, user access control with RBAC, alarm management, and API interaction. Advanced users will also learn custom rule node development to extend the system capabilities. This program is perfect for professionals who want to build scalable, secure, high-performing IoT solutions using ThingsBoard.',
		carouselCourseDescription:
			'Comprehensive overview of rule engine, alarm management, security model, and API usage.',
		courseSessions: [
			{
				sessionName: 'Rule engine deep dive: data processing & automation in ThingsBoard',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Learn what a Rule Engine is and how it helps process data automatically.',
					},
					{ textContent: 'Understand how messages flow through rule chains.' },
					{
						textContent:
							'Understand the differences between regular and edge rule chains.',
					},
					{
						textContent:
							'Discover how data arrives in the rule chains, including messages produced by the device and platform-generated events (e.g., lifecycle events).',
					},
					{
						textContent:
							'Explore what a Rule Node is and understand its purpose.',
					},
					{
						textContent:
							'Understand why there are different types of nodes (filter, enrichment, transformation, actions, analytics, and external) and how they work together in a rule chain.',
					},
					{
						textContent:
							'Learn how to filter, modify, and enrich incoming data, store telemetry, trigger alarms, and send REST API calls, using nodes.',
					},
					{
						textContent:
							'Use script nodes (TBEL and JavaScript) to enable flexible message processing.',
					},
					{
						textContent:
							'Understand how the Rule Engine operates on a deeper level, including message handling through queues.',
					},
					{
						textContent:
							'Learn how different queue settings affect processing latency and throughput, and how incorrect configurations can cause failures.',
					},
					{
						textContent:
							'Identify common mistakes when working with queues, such as Kafka consumer polling issues.',
					},
					{
						textContent:
							'Use debug mode and logging to track message flow and troubleshoot execution problems.',
					},
					{
						textContent:
							'Understand how to handle large-scale data loads while maintaining high system performance.',
					},
					{
						textContent:
							'Optimize rule chains to reduce unnecessary actions and improve processing speed.',
					},
				],
			},
			{
				sessionName: 'Security model & access management',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Explore the hierarchy model, including system administrators, tenants, customers, and sub-customers and permissions on different levels.',
					},
					{
						textContent:
							'Learn how to use entity groups to efficiently manage access control for multiple users.',
					},
					{
						textContent:
							'Understand how to use role-based access control (RBAC) and control user access and permissions.',
					},
					{
						textContent:
							'Understand the difference between generic and group roles.',
					},
					{
						textContent:
							'Learn how to structure user roles, groups, and permissions to ensure secure access management.',
					},
					{
						textContent:
							'Gain practical knowledge of how to configure access to dashboards and devices at different user levels.',
					},
					{
						textContent:
							'Discover how to create a clear separation between administrators and end users, allowing only limited access.',
					},
					{ textContent: 'Learn how to fix permission errors by setting correct roles.' },
					{
						textContent:
							'Configure security settings, including password policies, JWT settings, 2FA, and OAuth 2.0 authentication.',
					},
					{
						textContent:
							'Understand the importance of audit logs for tracking user activity and identifying security breaches.',
					},
					{
						textContent:
							'Learn how to prevent common security risks, such as manipulating the Host header in login requests.',
					},
					{
						textContent:
							'Discover how security is implemented in REST API (e.g., user authorities).',
					},
				],
			},
			{
				sessionName: 'Alarm management',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Understand what an alarm is in ThingsBoard and how it models real-life abnormal conditions.',
					},
					{
						textContent:
							'Learn about alarm types and their intended usage (e.g. threshold-exceeded alarm).',
					},
					{
						textContent:
							'Explore alarm severity levels and how they help prioritize incidents.',
					},
					{
						textContent:
							'Understand alarm statuses and how they indicate whether the issue is happening now or is already over.',
					},
					{
						textContent:
							'Learn how alarm uniqueness works to prevent duplicate alarms for the same real-life event.',
					},
					{
						textContent:
							'Discover alarm timing concepts, including created time, start time, and end time.',
					},
					{
						textContent:
							'Learn how to assign responsibility for alarms using the assignee feature.',
					},
					{
						textContent:
							'Understand how alarm comments work, differentiating between user-defined and system-generated comments.',
					},
					{
						textContent:
							'Understand how alarm rules define when alarms are created and cleared.',
					},
					{
						textContent:
							'Explore different rule conditions and how they are evaluated.',
					},
					{
						textContent:
							'Learn how to configure alarm propagation settings for efficient alert management.',
					},
					{
						textContent:
							'Work with alarm-related Rule Engine nodes, including alarm status filters, create, count and clear alarm nodes.',
					},
					{
						textContent:
							'Learn how to send alarm notifications via email, SMS, and the notification centre.',
					},
					{
						textContent:
							'Configure an alarm escalation chain to ensure critical alarms receive the necessary attention.',
					},
					{
						textContent:
							'Manage alarms using the REST API, including creating, acknowledging, and clearing alarms programmatically.',
					},
				],
			},
			{
				sessionName: 'ThingsBoard platform API fundamentals (session 1)',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Understand how to interact with ThingsBoard using the REST API.',
					},
					{
						textContent:
							'Learn how to use Swagger UI for testing, developing, and exploring APIs.',
					},
					{
						textContent:
							'Discover how authentication and authorization work in REST API.',
					},
					{
						textContent:
							'Learn how to obtain and use JWT tokens for secure API access.',
					},
					{ textContent: 'Explore entity hierarchy access control.' },
					{
						textContent:
							'Understand user authorities and how RBAC applies to API interactions.',
					},
					{
						textContent:
							'Learn how to troubleshoot API permission issues and handle errors.',
					},
					{
						textContent:
							'Work with CRUD APIs to create, update, and delete entities programmatically.',
					},
					{
						textContent:
							'Use Entity Data Query to efficiently fetch and aggregate data from multiple entities.',
					},
					{
						textContent:
							'Learn how to manage attributes via the Attributes API, including fetching, uploading, and subscribing to updates.',
					},
					{
						textContent:
							'Work with Time Series API for fetching and uploading telemetry data.',
					},
				],
			},
			{
				sessionName: 'ThingsBoard platform API fundamentals (session 2)',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent:
							'Get an overview of different data transport protocols such as MQTT, HTTP, CoAP, LwM2M, and SNMP.',
					},
					{
						textContent:
							'Learn how to send and receive data using MQTT, HTTP, and CoAP protocols.',
					},
					{
						textContent:
							'Understand how Remote Procedure Calls (RPC) work in ThingsBoard.',
					},
					{
						textContent:
							'Learn different ways to send RPC commands from server to device and vice versa.',
					},
					{
						textContent:
							'Discover how to use WebSockets for real-time communication with ThingsBoard.',
					},
					{
						textContent:
							'Learn how to subscribe to WebSocket updates and integrate them into applications.',
					},
				],
			},
			{
				sessionName: 'Custom node development in rule engine',
				sessionLengthInHours: 2,
				sessionTopics: [
					{
						textContent: 'Recommended for users with Java development experience.',
						warning: true,
					},
					{
						textContent:
							'Learn how to write a custom rule node from scratch and integrate it into ThingsBoard.',
					},
					{
						textContent:
							'Explore a prepared project template that includes a basic skeleton and sample custom nodes.',
					},
					{
						textContent:
							'Use internal ThingsBoard APIs to manipulate and execute various operations within the system.',
					},
					{
						textContent:
							'Manage entity data, update records, store information, and send data using custom nodes.',
					},
					{
						textContent:
							'Learn how to deploy a custom node to a self-hosted ThingsBoard instance.',
					},
					{ textContent: 'Explore rule node versioning and upgrade mechanisms.' },
					{
						textContent:
							'Work with the @RuleNode annotation and understand its role in ThingsBoard.',
					},
					{
						textContent:
							'Use the TbNode interface to define custom logic within a rule node.',
					},
					{
						textContent:
							'Handle message transformations, including modifying message payloads and metadata.',
					},
					{
						textContent:
							'Understand the lifecycle of a rule node, including initialization, updates, and deletion.',
					},
					{
						textContent:
							'Optimize performance by utilizing asynchronous programming and efficient threading.',
					},
					{
						textContent:
							'Learn how to avoid common mistakes when implementing custom nodes.',
					},
				],
			},
		],
	},
];
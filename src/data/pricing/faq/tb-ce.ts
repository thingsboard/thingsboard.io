import type { FaqCategory } from '../types';

export const tbCeFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'what-is-tb-ce',
				question: 'What is ThingsBoard Community Edition?',
				answer: '<p>ThingsBoard Community Edition (CE) is the free and open-source version of the ThingsBoard - IoT platform for data collection, processing, visualization, and device management. ThingsBoard CE is available under the Apache 2.0 license.</p>',
			},
			{
				id: 'is-ce-free',
				question: 'Is the Community Edition free to use?',
				answer: '<p>Yes, it is completely free, with no licensing fees or hidden costs.</p>',
			},
			{
				id: 'ce-for-commercial',
				question: 'Can I use ThingsBoard Community Edition for commercial projects?',
				answer: '<p>Yes, ThingsBoard Community Edition can be used for commercial purposes. You can develop and deploy IoT solutions based on the Community Edition as part of your business operations. It is distributed under the Apache 2.0 license, which allows commercial use without the license or royalty fees.</p>',
			},
			{
				id: 'ce-pe-difference',
				question: 'How does the Community Edition differ from Professional Edition?',
				answer: '<p>Community Edition includes essential features for IoT device management, data collection, visualization, and rule processing. The Professional Edition offers advanced features such as white-labeling, RBAC, integrations, etc. You can find a more detailed comparison <a target="_blank" href="/products/thingsboard-pe/">on the ThingsBoard PE page</a>.</p>',
			},
			{
				id: 'ce-connect-devices-limit',
				question: 'Is there a limit on the number of devices I can connect?',
				answer: '<p>No, there are no programatic limits, but performance depends on your server(s) capacity.</p>',
			},
			{
				id: 'possible-migrate-ce-to-pe-sm',
				question:
					'Is it possible to migrate from the Community Edition to the self-managed ThingsBoard Professional Edition?',
				answer: '<p>Yes, you can upgrade from ThingsBoard Community Edition to Professional Edition without losing telemetry data and/or configurations. The upgrade process preserves your existing setup, ensuring a seamless transition. However, <b>please note</b> that any custom modifications made directly to the source code of the Community Edition will be removed during the upgrade process. For more information about the migration procedure, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'possible-migrate-ce-to-cloud',
				question:
					'Is it possible to migrate from the Community Edition to the ThingsBoard Cloud?',
				answer: '<p>Yes, migration from the Community Edition to ThingsBoard Cloud is possible but is not 100% automatic. We recommend to use <a target="_blank" href="/docs/user-guide/version-control/#usage">version control</a> feature to migrate all entities. Then you may transfer telemetry data using the <a target="_blank" href="/docs/reference/rest-api/">REST API</a>. For more information about the migration procedure, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'ce-clustering',
				question: 'Does the Community Edition support clustering?',
				answer: '<p>Yes, clustering is fully supported in the Community Edition. You can find more details about deployment scenarios <a target="_blank" href="/docs/reference/architecture/deployment-scenarios/">in the deployment scenarios reference</a>.</p>',
			},
			{
				id: 'ce-customize',
				question: 'Can I customize and modify the Community Edition?',
				answer: '<p>Yes, the source code is available on <a target="_blank" href="https://github.com/thingsboard/thingsboard">GitHub</a>, and you can fork and modify it according to your requirements. By the way, please consider starring our repository★</p>',
			},
			{
				id: 'ce-internet-connection',
				question: 'Do I need an internet connection to use the Community Edition?',
				answer: '<p>No, you can run it completely offline if needed.</p>',
			},
		],
	},
	{
		id: 'installationAndDeployment',
		label: 'Installation & Deployment',
		items: [
			{
				id: 'how-to-install-ce',
				question: 'How do I install ThingsBoard Community Edition?',
				answer: '<p>Installation guides are available in the <a target="_blank" href="/docs/installation/?ceInstallType=onPremise">documentation</a>. The Community Edition can be installed in monolith or microservice cluster mode, and supports deployment on Docker, Kubernetes, or directly on Linux/Windows OS.</p>',
			},
			{
				id: 'where-to-install-ce',
				question: 'Where can I install the Community Edition?',
				answer: '<p>You can install the Community Edition on your virtual machine, local servers, or any cloud provider infrastructure of your choice.</p>',
			},
			{
				id: 'ce-database-support',
				question: 'What databases does the Community Edition support?',
				answer: '<p>The Community Edition supports pure SQL or a hybrid SQL + NoSQL (for telemetry storage) . For more details on database options, you can check <a target="_blank" href="/docs/reference/architecture/database/">the database approach reference</a>.</p>',
			},
			{
				id: 'official-docker-ce',
				question: 'Is there an official Docker image for Community Edition?',
				answer: '<p>Yes, official Docker images are available on Docker Hub.</p>',
			},
			{
				id: 'ce-on-raspberry-edge',
				question: 'Can I run the Community Edition on Raspberry Pi or other edge devices?',
				answer: '<p>Yes, but performance may be limited due to hardware constraints. You can check details <a target="_blank" href="/docs/installation/">in the installation options guide</a>.</p>',
			},
			{
				id: 'ce-multi-tenancy',
				question: 'Does the Community Edition support multi-tenancy?',
				answer: '<p>Yes, the ThingsBoard Community Edition supports <a target="_blank" href="/docs/user-guide/multi-tenancy/">multi-tenancy</a> out of the box.</p>',
			},
			{
				id: 'ce-scale-deployment',
				question: 'How can I scale a Community Edition deployment?',
				answer: '<p>You can scale the Community Edition horizontally by using a <a target="_blank" href="/docs/reference/architecture/microservices/">microservice</a> deployment.</p>',
			},
		],
	},
	{
		id: 'featuresAndLimitations',
		label: 'Features & Limitations',
		items: [
			{
				id: 'ce-features',
				question: 'What features are included in ThingsBoard Community Edition?',
				answer: '<p>The Community Edition includes device and asset management, data visualization, rule engine automation, and API integrations. You can find all features and descriptions <a target="_blank" href="/docs/">in the documentation</a>.</p>',
			},
			{
				id: 'pe-exclusive-features',
				question: 'What features are exclusive to the Professional Edition?',
				answer: '<p>The Professional Edition offers advanced features such as white-labeling, RBAC, advanced rule engine capabilities, platform integrations, etc. You can find a more detailed comparison <a target="_blank" href="/products/thingsboard-pe/">on the ThingsBoard PE page</a>.</p>',
			},
			{
				id: 'ce-white-labeling-support',
				question: 'Does the Community Edition support white-labeling?',
				answer: '<p>No, white-labeling is available only in the Professional Edition.</p>',
			},
			{
				id: 'ce-other-build-in-security-features',
				question: 'Are there any built-in security features?',
				answer: '<p>Yes, the Community Edition supports secure <a target="_blank" href="/docs/user-guide/connectivity-guide/">device connectivity</a> options, <a target="_blank" href="/docs/user-guide/security/oauth-2-support/">OAuth</a> configuration, and <a target="_blank" href="/docs/user-guide/security/domains/">domain management</a>.</p>',
			},
			{
				id: 'ce-third-party-systems',
				question: 'Can I integrate third-party systems with Community Edition?',
				answer: '<p>Yes, you can integrate the ThingsBoard Community Edition with third-party systems through REST APIs or Rule Engine. Please note that the Professional Edition of the platform provides more integration option via <a target="_blank" href="/docs/user-guide/integrations/">platform integrations</a>.</p>',
			},
			{
				id: 'ce-automate-device-management-telemetry-processing',
				question: 'Can I automate device management and telemetry processing?',
				answer: '<p>Yes, using the rule engine, which allows event-based processing and alerts.</p>',
			},
			{
				id: 'ce-ota-support',
				question: 'Does Community Edition support OTA (Over-the-Air) firmware updates?',
				answer: '<p>Yes, the Community Edition supports <a target="_blank" href="/docs/user-guide/ota-updates/">OTA</a> (Over-the-Air) firmware updates.</p>',
			},
			{
				id: 'ce-mobile-app',
				question: 'Is there a mobile app for Community Edition?',
				answer: '<p>Yes, there is an <a target="_blank" href="/products/mobile/">mobile app</a> for the Community Edition, based on the Flutter SDK. It is free of charge and open-source under Apache 2.0 license.</p>',
			},
			{
				id: 'ce-ai-ml-integrations',
				question: 'Does Community Edition support AI or machine learning integrations?',
				answer: '<p>Not natively, but you can use it with <a target="_blank" href="/products/trendz/">Trendz Analytics</a> or integrate external AI/ML services via APIs.</p>',
			},
		],
	},
	{
		id: 'supportAndCommunityAssistance',
		label: 'Support & Community Assistance',
		items: [
			{
				id: 'ce-out-of-box-support',
				question:
					'Is there out-of-the-box support from ThingsBoard team for Community Edition users?',
				answer: '<p>The ThingsBoard team does not provide dedicated support for Community Edition users. However, users can access community-driven resources such as forums, documentation, and GitHub for assistance.</p>',
			},
			{
				id: 'ce-purchase-additional-support',
				question: 'Can I purchase additional support for the Community Edition?',
				answer: '<p>Depending on the type of support you are looking for, the ThingsBoard team may be able to offer certain types of additional support packages. To discuss your unique case and requirements, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'ce-help-issue',
				question: 'Where can I get help if I run into issues?',
				answer: '<p><a target="_blank" href="https://github.com/thingsboard/">GitHub</a> (report issues, contribute)</p><p><a target="_blank" href="https://stackoverflow.com/questions/tagged/thingsboard">Stack Overflow</a> (for developer-related questions)</p><p><a target="_blank" href="/docs/">Documentation & Tutorials</a></p>',
			},
			{
				id: 'ce-request-custom-feature',
				question: 'Can I request custom features or improvements?',
				answer: '<p>Yes, you are welcome to submit feature requests on GitHub. After the product team reviews them, they may be added to the backlog.</p>',
			},
			{
				id: 'ce-pay-for-development',
				question: 'Can I pay for additional features to be developed?',
				answer: '<p>The ThingsBoard team can propose application configuration services. To discuss your unique case and requirements, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'ce-soft-updates',
				question: 'Are software updates available for Community Edition?',
				answer: '<p>Yes, updates for all <a target="_blank" href="/docs/releases/releases-table/">versions</a> are available.</p>',
			},
			{
				id: 'ce-tb-developers-paid-service',
				question:
					'Can I get ThingsBoard developers to help with my Community Edition deployment?',
				answer: '<p>Yes, you can request such assistance as an additional paid service. Please, <a target="_blank" href="/contact-us/">contact us</a> to discuss how we can help.</p>',
			},
			{
				id: 'ce-bug-found',
				question: 'What should I do if I find a bug in Community Edition?',
				answer: '<p>You can report it on <a target="_blank" href="https://github.com/thingsboard/">GitHub</a>, and the open-source community may help fix it.</p>',
			},
			{
				id: 'ce-contribute',
				question: 'Can I contribute to the development of ThingsBoard Community Edition?',
				answer: '<p>Yes! Pull requests and contributions are welcome on <a target="_blank" href="https://github.com/thingsboard/">GitHub</a>.</p>',
			},
			{
				id: 'ce-development-services',
				question:
					'Can you provide an IoT development service tailored to my specific needs?',
				answer: '<p>Yes, we offer custom <a target="_blank" href="/services/development-services/">IoT development services</a> designed to match your exact requirements. Whether you need a full-featured IoT platform, scalable architecture, or specific integrations, our IoT development team can help you accelerate time-to-market and reduce internal workload while ensuring long-term maintainability.</p>',
			},
		],
	},
	{
		id: 'upgradingToEnterpriseEdition',
		label: 'Upgrading to Enterprise Edition',
		items: [
			{
				id: 'upgrade-ce-to-pe',
				question: 'Can I upgrade from Community Edition to the Professional Edition?',
				answer: '<p>Yes, you can migrate your data and configuration to an Professional Edition at any time.</p>',
			},
			{
				id: 'upgrade-ce-to-pe-benefits',
				question: 'What are the benefits of upgrading to the Professional Edition?',
				answer: '<ul><li>White labeling for branding</li><li>RBAC for application business security strategy</li><li>Advanced integrations capabilities</li><li>Grouping functionality</li><li>Reporting, etc.</li></ul><p>ThingsBoard Professional Edition is designed for production and enterprise IoT solutions, offering comprehensive features to meet all your potential needs with the flexibility to deliver tailored solutions without any blockers.</p>',
			},
			{
				id: 'migrate-pe-to-enterprise',
				question: 'How do I migrate from Professional Edition to Enterprise?',
				answer: '<p>Migration depends on factors such as whether you are migrating to a self-managed system or ThingsBoard Cloud, the version, source code changes, and more. Please <a target="_blank" href="/contact-us/">contact us</a> for personalized suggestions and a clear strategy on how to perform the migration.</p>',
			},
			{
				id: 'enterprise-trial',
				question: 'Can I get a trial of the Enterprise Edition before upgrading?',
				answer: '<p>Yes, we offer a one-month trial on ThingsBoard Cloud for users considering an upgrade. If you would like to try the system in self-managed mode, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'ce-is-instance-secure',
				question: 'Is my ThingsBoard instance secure?',
				answer: '<p>Yes, but security depends on your deployment setup and infrastructure.</p>',
			},
			{
				id: 'ce-encryption',
				question: 'Does Community Edition include encryption?',
				answer: '<p>Yes, the Community Edition includes transport encryption, as well as SSO (Single Sign-On) and OAuth functionality.</p>',
			},
			{
				id: 'ce-store-data-region',
				question: 'Can I store ThingsBoard data in my preferred region?',
				answer: '<p>Yes, you have full control over where your data is stored.</p>',
			},
			{
				id: 'ce-industry-standarts',
				question:
					'Does ThingsBoard Community Edition comply with industry standards (GDPR, ISO, etc.)?',
				answer: '<p>Compliance depends on your hosting environment and data security practices.</p>',
			},
		],
	},
	{
		id: 'edge',
		label: 'Edge',
		items: [
			{
				id: 'edge-community-what-is',
				question: 'What is ThingsBoard Edge Community Edition?',
				answer: '<p>The Community Edition of ThingsBoard Edge is a free, open-source platform. It offers essential features for managing and analyzing IoT data at the edge.</p>',
			},
			{
				id: 'edge-community-intended-for',
				question: 'Who is the Community Edition intended for?',
				answer: '<p>It is ideal for individuals, startups, educational purposes, and organizations conducting small to medium-sized IoT projects without the need for advanced enterprise features.</p>',
			},
			{
				id: 'edge-community-commercial-use',
				question:
					'Can I use ThingsBoard Edge Community Edition for commercial projects?',
				answer: '<p>Yes, ThingsBoard Edge Community Edition can be used for commercial purposes. You can develop and deploy IoT solutions based on the Community Edition as part of your business operations. It is distributed under the Apache 2.0 license, which allows commercial use without the license or royalty fees.</p>',
			},
			{
				id: 'edge-community-compatibility',
				question: 'What ThingsBoard Edge compatibility means?',
				answer: '<p>ThingsBoard Edge Community Edition is able to connect only to ThingsBoard Community Edition server.<br>ThingsBoard Edge Professional Edition is able to connect only to ThingsBoard Professional Edition server (it can be ThingsBoard Cloud or on-premise instances).<br>ThingsBoard Edge Community Edition cannot be connected to ThingsBoard Professional Edition and vice versa.</p>',
			},
			{
				id: 'edge-community-installation',
				question: 'How can I install ThingsBoard Edge Community Edition?',
				answer: '<p>You can install the Community Edition following the <a target="_blank" href="/docs/edge/installation/">installation guides</a> available in the official documentation.</p>',
			},
			{
				id: 'edge-community-system-requirements',
				question:
					'What are the system requirements for deploying the Community Edition?',
				answer: '<p>The Community Edition is compatible with various operating systems, including Linux, Windows, and macOS. Specific requirements depend on the deployment method and can be found in the <a target="_blank" href="/docs/edge/installation/">installation guide</a>.</p>',
			},
			{
				id: 'edge-community-docker-support',
				question: 'Does the Community Edition support Docker deployment?',
				answer: '<p>Yes, ThingsBoard Edge Community Edition supports Docker. Detailed instructions for Docker-based installation are provided in the <a target="_blank" href="/docs/edge/installation/docker/">Docker deployment</a> guide.</p>',
			},
			{
				id: 'edge-community-core-features',
				question: 'What core features are available in the Community Edition?',
				answer: '<ul><li>Device management and telemetry</li><li>Rule engine for data processing</li><li>Dashboard creation</li><li>Support for MQTT, CoAP, and HTTP protocols</li><li>Open-source extensibility through plugins</li></ul>',
			},
			{
				id: 'edge-community-support-options',
				question: 'What support options are available for the Community Edition?',
				answer: '<p>Support for the Community Edition is primarily community-driven, including:</p><ul><li>Community Forums: Engage with other users and developers.</li><li>GitHub Issues: Report bugs or request features.</li><li>Documentation: Comprehensive guides and API references available on the ThingsBoard Documentation.</li></ul>',
			},
			{
				id: 'edge-community-official-support',
				question: 'Is official support available for the Community Edition?',
				answer: '<p>No, official support is not included in the Community Edition. For official support, consider upgrading to a paid edition.</p>',
			},
			{
				id: 'edge-community-upgrade',
				question: 'Can I upgrade from the Community Edition to a paid edition?',
				answer: '<p>Yes, upgrading is straightforward. Contact the ThingsBoard Sales Team or visit the Pricing Page to select a suitable paid plan. The transition will be guided to ensure data integrity and feature migration.</p>',
			},
			{
				id: 'edge-community-upgrade-benefits',
				question: 'What benefits do I gain by upgrading to an Enterprise Edition?',
				answer: '<p>Upgrading provides access to advanced features, dedicated support, and integrations not available in the Community Edition.</p>',
			},
		],
	},
];

import type { FaqCategory } from '../types';

export const tbmqCeFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'what-is-tbmq-ce',
				question: 'What is TBMQ Community Edition?',
				answer: '<p>TBMQ Community Edition (CE) is the free and open-source version of the TBMQ - a highly scalable and fault-tolerant MQTT broker designed for efficient and reliable message routing between connected devices and applications using the MQTT protocol. TBMQ CE is available under the Apache 2.0 license.</p>',
			},
			{
				id: 'is-tbmq-ce-free',
				question: 'Is the Community Edition free to use?',
				answer: '<p>Yes, it is completely free, with no licensing fees or hidden costs.</p>',
			},
			{
				id: 'tbmq-ce-commercial-use',
				question: 'Can I use TBMQ Community Edition for commercial projects?',
				answer: '<p>Yes, TBMQ Community Edition can be used for commercial purposes. You can develop and deploy IoT solutions based on the Community Edition as part of your business operations. It is distributed under the Apache 2.0 license, which allows commercial use without the license or royalty fees.</p>',
			},
			{
				id: 'tbmq-ce-diff-pe',
				question: 'How does the Community Edition differ from Professional Edition?',
				answer: '<p>Community Edition includes essential MQTT broker features with full support for MQTT 3.x and MQTT 5.0. The Professional Edition offers advanced features such as White Labeling, RBAC, Single sign-on, etc. You can find a more detailed comparison <a target="_blank" href="/products/mqtt-broker/">on the TBMQ product page</a>.</p>',
			},
			{
				id: 'tbmq-ce-session-limits',
				question: 'Is there a limit on the number of sessions I can connect?',
				answer: '<p>No, there are no programmatic limits, but performance depends on your server(s) capacity.</p>',
			},
			{
				id: 'tbmq-ce-message-limits',
				question: 'Is there a limit on the number of messages it can process?',
				answer: '<p>No, there are no programmatic limits. TBMQ can handle high loads of millions of messages processed per second. Performance depends on your server(s) capacity.</p>',
			},
			{
				id: 'tbmq-ce-migration-pe',
				question: 'Is it possible to migrate from the Community Edition to the self-managed TBMQ Professional Edition?',
				answer: '<p>Yes, you can upgrade from TBMQ Community Edition to Professional Edition without losing any data and/or configurations. The upgrade process preserves your existing setup, ensuring a seamless transition. However, please note that any custom modifications made directly to the source code of the Community Edition will be removed during the upgrade process. For more information about the migration procedure, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'tbmq-ce-clustering',
				question: 'Does the Community Edition support clustering?',
				answer: '<p>Yes, clustering is fully supported in the Community Edition. You can find more details about deployment scenarios <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">in the deployment options guide</a>.</p>',
			},
			{
				id: 'tbmq-ce-customize',
				question: 'Can I customize and modify the Community Edition?',
				answer: '<p>Yes, the source code is available on <a target="_blank" href="https://github.com/thingsboard/tbmq">GitHub</a>, and you can fork and modify it according to your requirements. By the way, please consider starring our <a target="_blank" href="https://github.com/thingsboard/tbmq">repository★</a>.</p>',
			},
			{
				id: 'tbmq-ce-internet',
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
				id: 'tbmq-ce-install-guide',
				question: 'How do I install TBMQ Community Edition?',
				answer: '<p>Installation guides are available in the <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">documentation</a>. The Community Edition can be installed in monolith or cluster mode, and supports deployment on Docker and Kubernetes.</p>',
			},
			{
				id: 'tbmq-ce-install-location',
				question: 'Where can I install the Community Edition?',
				answer: '<p>You can install the Community Edition on your virtual machine, local servers, or any cloud provider infrastructure of your choice.</p>',
			},
			{
				id: 'tbmq-ce-db-support',
				question: 'What databases does the Community Edition support?',
				answer: '<p>The Community Edition supports Kafka, Redis/Valkey, and PostgreSQL. For more details on database options, you can check <a target="_blank" href="/docs/mqtt-broker/architecture/">the TBMQ architecture page</a>.</p>',
			},
			{
				id: 'tbmq-ce-docker',
				question: 'Is there an official Docker image for Community Edition?',
				answer: '<p>Yes, official Docker images are available on <a target="_blank" href="https://hub.docker.com/r/thingsboard/tbmq">Docker Hub</a>.</p>',
			},
			{
				id: 'tbmq-ce-multitenancy',
				question: 'Does the Community Edition support multi-tenancy?',
				answer: '<p>No, the TBMQ Community Edition does not support multi-tenancy.</p>',
			},
			{
				id: 'tbmq-ce-scaling',
				question: 'How can I scale a Community Edition deployment?',
				answer: '<p>You can scale the Community Edition vertically by adding more resources for the server, and horizontally by using a cluster deployment.</p>',
			},
		],
	},
	{
		id: 'featuresAndLimitations',
		label: 'Features & Limitations',
		items: [
			{
				id: 'tbmq-ce-features-list',
				question: 'What features are included in TBMQ Community Edition?',
				answer: '<p>The Community Edition includes all essential MQTT broker features with full support for MQTT 3.x and MQTT 5.0. You can find all features and descriptions <a target="_blank" href="/docs/mqtt-broker/">in the TBMQ documentation</a>.</p>',
			},
			{
				id: 'tbmq-ce-pe-exclusive',
				question: 'What features are exclusive to the Professional Edition?',
				answer: '<p>The Professional Edition offers advanced features such as White Labeling, RBAC, Single sign-on, etc. You can find a more detailed comparison <a target="_blank" href="/products/mqtt-broker/">on the TBMQ product page</a>.</p>',
			},
			{
				id: 'tbmq-ce-white-label',
				question: 'Does the Community Edition support white-labeling?',
				answer: '<p>No, white-labeling is available only in the Professional Edition.</p>',
			},
			{
				id: 'tbmq-ce-security-features',
				question: 'Are there any built-in security features?',
				answer: '<p>Yes, the Community Edition supports secure MQTT connectivity, authentication, and authorization for MQTT clients.</p>',
			},
			{
				id: 'tbmq-ce-integrations',
				question: 'Can I integrate third-party systems with Community Edition?',
				answer: '<p>Yes, you can integrate the TBMQ Community Edition with third-party systems through <a target="_blank" href="/docs/mqtt-broker/integrations/">platform integrations</a>.</p>',
			},
		],
	},
	{
		id: 'supportAndCommunityAssistance',
		label: 'Support & Community Assistance',
		items: [
			{
				id: 'tbmq-ce-support',
				question: 'Is there out-of-the-box support from TBMQ team for Community Edition users?',
				answer: '<p>The TBMQ team does not provide dedicated support for Community Edition users. However, users can access community-driven resources such as <a target="_blank" href="https://github.com/thingsboard/tbmq/discussions">forums</a>, <a target="_blank" href="/docs/mqtt-broker/">documentation</a>, and <a target="_blank" href="https://github.com/thingsboard/tbmq">GitHub</a> for assistance.</p>',
			},
			{
				id: 'tbmq-ce-paid-support',
				question: 'Can I purchase additional support for the Community Edition?',
				answer: '<p>Depending on the type of support you are looking for, the TBMQ team may be able to offer certain types of additional support packages. To discuss your unique case and requirements, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'tbmq-ce-help',
				question: 'Where can I get help if I run into issues?',
				answer: '<p><a target="_blank" href="https://github.com/thingsboard/tbmq/issues">GitHub</a> (report issues, contribute)<br><a target="_blank" href="https://stackoverflow.com/questions/tagged/thingsboard">Stack Overflow</a> (for developer-related questions)<br><a target="_blank" href="/docs/mqtt-broker/">Documentation & Tutorials</a></p>',
			},
			{
				id: 'tbmq-ce-feature-request',
				question: 'Can I request custom features or improvements?',
				answer: '<p>Yes, you are welcome to submit feature requests on <a target="_blank" href="https://github.com/thingsboard/tbmq/issues">GitHub</a>. After the product team reviews them, they may be added to the backlog.</p>',
			},
			{
				id: 'tbmq-ce-dev-services',
				question: 'Can I pay for additional features to be developed?',
				answer: '<p>The TBMQ team can propose application configuration services. To discuss your unique case and requirements, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'tbmq-ce-updates',
				question: 'Are software updates available for Community Edition?',
				answer: '<p>Yes, updates for all <a target="_blank" href="https://github.com/thingsboard/tbmq/releases">versions</a> are available.</p>',
			},
			{
				id: 'tbmq-ce-dev-assist',
				question: 'Can I get TBMQ developers to help with my Community Edition deployment?',
				answer: '<p>Yes, you can request such assistance as an additional paid service. Please, <a target="_blank" href="/contact-us/">contact us</a> to discuss how we can help.</p>',
			},
			{
				id: 'tbmq-ce-bug-report',
				question: 'What should I do if I find a bug in Community Edition?',
				answer: '<p>You can report it on <a target="_blank" href="https://github.com/thingsboard/tbmq/issues">GitHub</a>, and the open-source community may help fix it.</p>',
			},
			{
				id: 'tbmq-ce-contribute',
				question: 'Can I contribute to the development of TBMQ Community Edition?',
				answer: '<p>Yes! Pull requests and contributions are welcome on <a target="_blank" href="https://github.com/thingsboard/tbmq">GitHub</a>.</p>',
			},
		],
	},
	{
		id: 'upgradingToEnterpriseEdition',
		label: 'Upgrading to Enterprise Edition',
		items: [
			{
				id: 'tbmq-ce-upgrade-pe',
				question: 'Can I upgrade from Community Edition to the Professional Edition?',
				answer: '<p>Yes, you can migrate your data and configuration to an Professional Edition at any time.</p>',
			},
			{
				id: 'tbmq-ce-upgrade-benefits',
				question: 'What are the benefits of upgrading to the Professional Edition?',
				answer: '<p>* White labeling<br>* RBAC<br>* SSO<br>* Audit logs, etc.<br>TBMQ Professional Edition is designed for production and enterprise IoT solutions, offering comprehensive features to meet all your potential needs.</p>',
			},
			{
				id: 'tbmq-ce-migration-strategy',
				question: 'How do I migrate from Community Edition to Enterprise?',
				answer: '<p>Migration depends on factors such as the version, source code changes, and more. Please <a target="_blank" href="/contact-us/">contact us</a> for personalized suggestions and a clear strategy on how to perform the migration.</p>',
			},
			{
				id: 'tbmq-ce-pe-trial',
				question: 'Can I get a trial of the Enterprise Edition before upgrading?',
				answer: '<p>Yes, we offer a one-month trial for default subscription plan in self-managed mode.</p>',
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'tbmq-ce-secure-instance',
				question: 'Is my TBMQ instance secure?',
				answer: '<p>Yes, but security depends on your deployment setup and infrastructure.</p>',
			},
			{
				id: 'tbmq-ce-encryption',
				question: 'Does Community Edition include encryption?',
				answer: '<p>Yes, the Community Edition includes transport encryption, as well as authentication and authorization.</p>',
			},
			{
				id: 'tbmq-ce-data-region',
				question: 'Can I store TBMQ data in my preferred region?',
				answer: '<p>Yes, you have full control over where your data is stored.</p>',
			},
			{
				id: 'tbmq-ce-compliance',
				question: 'Does TBMQ Community Edition comply with industry standards (GDPR, ISO, etc.)?',
				answer: '<p>Compliance depends on your hosting environment and data security practices.</p>',
			},
		],
	},
];

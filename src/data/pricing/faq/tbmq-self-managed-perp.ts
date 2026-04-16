import type { FaqCategory } from '../types';

export const tbmqSelfManagedPerpFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'tbmq-perp-def',
				question: 'What does the Perpetual license mean?',
				answer: `<p>A Perpetual license allows you to use the software indefinitely with a one-time purchase. This grants you permanent access without the need for ongoing subscription fees.</p>`,
			},
			{
				id: 'tbmq-perp-diff',
				question: 'How does the perpetual license differ from a subscription license?',
				answer: `<p>A perpetual license provides lifetime access to TBMQ Professional Edition through a one-time payment, including a predefined capacity (e.g., sessions, message throughput, and processing instances). It can be expanded at any time by purchasing additional capacity units. In contrast, a subscription license offers flexible, usage-based access with regular payments, allowing you to scale resources as your deployment grows, without an upfront lifetime commitment.</p>`,
			},
			{
				id: 'tbmq-perp-features',
				question: 'What features are included in the perpetual license?',
				answer: `<p>The perpetual license includes full access to TBMQ Professional Edition features, such as MQTT 3.x and MQTT 5.0 support, White labeling, RBAC, SSO, and more. It also provides access to standard documentation, support, and updates for a specified period. Additional features or services, such as extended support or custom development, may be available for an extra fee.</p>`,
			},
			{
				id: 'tbmq-perp-buy',
				question: 'How can I buy a perpetual license?',
				answer: `<p>To purchase a perpetual license, you can acquire a license through your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Each license comes with a unique activation key, which allows you to deploy and run the system by following our detailed <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">installation guides</a>.</p>`,
			},
			{
				id: 'tbmq-perp-license-meaning',
				question: 'What does it mean to get the license?',
				answer: `<p>Licensing is applicable to self-hosted platform versions only. Each license comes with a unique license key (activation code) that is automatically generated in your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Using this license key, you can deploy and run the system by following our detailed <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">installation guides</a>.</p>`,
			},
			{
				id: 'tbmq-perp-aim',
				question: 'What is the perpetual license aim for?',
				answer: `<p>The Perpetual License includes a single license key (activation code) for one licensed deployment. This license allows the deployment of predefined number of instances of TBMQ Professional Edition.</p>`,
			},
			{
				id: 'tbmq-perp-servers',
				question: 'How many servers can I have with the Perpetual license?',
				answer: `<p>The Perpetual License initially includes a base of one licensed Production Instance. If your deployment needs to scale horizontally for increased performance, fault tolerance, or High Availability (HA), you can purchase additional Production or Development Instances at any time. This scaling enables you to permanently expand your licensed instance count, allowing for seamless horizontal scaling across your infrastructure while ensuring continuous compliance with your license terms. For purchasing details or specialized capacity needs, please <a target="_blank" href="/contact-us/">contact our sales team</a>.</p>`,
			},
			{
				id: 'tbmq-perp-min-cost',
				question: 'What is the minimum configuration and cost for a TBMQ Perpetual license?',
				answer: `<p>The minimum configuration for the TBMQ Perpetual license is defined by the capacity included in the Base Price. The minimum cost is a one-time fee of $2,999.00.<br>This minimum configuration includes the following licensed resources:<br>* 10,000 Sessions<br>* 1,000 messages per second (msg/sec) Throughput<br>* 1 Production Instance</p>`,
			},
			{
				id: 'tbmq-perp-self-host',
				question: 'Do I need to host TBMQ myself with a perpetual license?',
				answer: `<p>Yes, you are responsible for deploying and managing TBMQ on your own infrastructure.</p>`,
			},
			{
				id: 'tbmq-perp-exceed-limits',
				question: 'What happens if I exceed the total messages per second or session limit in my subscription?',
				answer: `<p>If your TBMQ deployment exceeds the licensed limit for either Sessions or Throughput messages per second, the broker software will enforce the capacity defined in your license key. This typically means that new client connections or incoming messages will be rejected, or your deployment performance may be throttled until usage falls back below the purchased capacity. To maintain continuous service and prevent disruption, we recommend proactively monitoring your capacity usage and adjusting your licensed limits via the <a target="_blank" href="https://license.thingsboard.io/">License Portal</a> before reaching your peak operational thresholds.</p>`,
			},
		],
	},
	{
		id: 'billingAndPayments',
		label: 'Billing & Payments',
		items: [
			{
				id: 'tbmq-perp-pricing',
				question: 'How is the perpetual license priced?',
				answer: `<p>The Perpetual License for TBMQ is offered as a one-time payment that grants lifetime access to the software. It includes a predefined capacity for sessions, message throughput, and production instances, along with one year of software updates and support. You can expand your deployment at any time by purchasing additional capacity. After the first year, updates and support can be renewed annually, while your license remains permanently active even without renewal.</p>`,
			},
			{
				id: 'tbmq-perp-renewals',
				question: 'If the license is Perpetual, why do we pay renewals?',
				answer: `<p>The so-called license ‘renewal’ does not refer to the license itself but rather corresponds to Support service and access to the Latest releases. Perpetual license unlocks support service and access to newer versions for 1 year. After the initial year, one can prolong this option.</p>`,
			},
			{
				id: 'tbmq-perp-renewal-fee',
				question: 'What is the renewal fee per year?',
				answer: `<p>The annual renewal fee for the Perpetual License depends on the total value of your license. <a target="_blank" href="/contact-us/">Contact us</a> for more details.</p>`,
			},
			{
				id: 'tbmq-perp-no-renew',
				question: 'What happens to my license if I don\'t pay for the renewal?',
				answer: `<p>Your current license will remain active, allowing you to continue using the platform seamlessly. By renewing your license, you'll gain access to the latest version releases and ongoing support to enhance your experience.</p>`,
			},
			{
				id: 'tbmq-perp-renewal-logic',
				question: 'I do not understand how the renewal logic works in relation to new version releases?',
				answer: `<p>Here’s how the renewal logic works: If you purchased your license on January 1, 2024, your support period and access to new version releases will expire on January 1, 2025. You can continue using the version of the platform you have without any interruptions. However, after January 1, 2025, you will no longer have access to new versions that are released after that date. You can still use the version you have, and you are free to migrate your hardware or upgrade to any version that was available before January 2, 2025.</p>`,
			},
			{
				id: 'tbmq-perp-missed-renewal',
				question: 'If I miss 1 year and then decide to prolong, how much should I pay?',
				answer: `<p>If you miss the renewal for one year and then decide to renew, you will need to pay the yearly renewal fee for the missed period, in addition to the fee for the new period. If you miss 6 months after the initial expiration date, you can still renew by paying the annual fee, and the renewal will be calculated based on the original expiration date of your license, not from the moment you choose to renew. If you require further clarifications on this, please <a target="_blank" href="/contact-us/">contact us</a>, and we will be happy to explain.</p>`,
			},
			{
				id: 'tbmq-perp-extra-fees',
				question: 'Is there an additional payment for the software use besides the license fee?',
				answer: `<p>No, we do not charge extra unless you want an additional service that we offer: professional support, Custom development and consulting, Training, or Managed service.</p>`,
			},
			{
				id: 'tbmq-perp-refund',
				question: 'Can I request a refund after purchasing the license?',
				answer: `<p>Since the Perpetual License is a one-time purchase granting lifetime access, all sales are final. However, we encourage customers to explore our subscription options before committing to a perpetual license. Subscriptions provide full access to TBMQ Professional Edition, allowing you to evaluate its features and scalability. If you need guidance on selecting the best licensing option for your needs, our <a target="_blank" href="/contact-us/">sales team</a> is happy to assist you.</p>`,
			},
			{
				id: 'tbmq-perp-bulk-discount',
				question: 'Do you offer discounts for multiple licenses?',
				answer: `<p><a target="_blank" href="/contact-us/">Contact our sales team</a> for bulk pricing options.</p>`,
			},
			{
				id: 'tbmq-perp-instance-price',
				question: 'What is the price for extra Production and Development Instances?',
				answer: `<p>Additional Production and Development Instances are priced at a fixed rate of $1999 and $999 per instance, respectively, as a one-time purchase. This allows you to scale your fault-tolerance and dedicated testing environments as needed, ensuring you only pay for the extra nodes you license.</p>`,
			},
			{
				id: 'tbmq-perp-session-price',
				question: 'What is the unit price for additional Sessions capacity?',
				answer: `<p>Sessions capacity is licensed on a per-session, one-time basis. You can license any amount you require. The effective unit rate is calculated as $250.00 per 1000 Sessions.</p>`,
			},
			{
				id: 'tbmq-perp-throughput-price',
				question: 'What is the unit price for additional Throughput capacity?',
				answer: `<p>Throughput capacity is licensed on a flexible per-message-per-second (msg/sec), one-time basis. You can license any amount you require. The effective unit rate is calculated as $500.00 per 1000 messages per second (msg/sec).</p>`,
			},
		],
	},
	{
		id: 'usageDeploymentsAndLimits',
		label: 'Usage, Deployments & Limits',
		items: [
			{
				id: 'tbmq-perp-session-def',
				question: 'What exactly counts as a “session”?',
				answer: `<p>A session is any active connection between an MQTT client and the TBMQ broker. Each session represents a single client, uniquely identified by its client ID, and counts toward your session quota.<br><br>If a client connects and maintains an active session, it occupies one slot in the session quota. When session persistence is enabled, a disconnected client still occupies a session slot, since its session data (subscriptions, messages, etc.) is retained by the broker.<br><br>A session slot is released only when the session has either expired or been explicitly removed. This means your session quota includes both currently connected clients and any disconnected clients with persisted sessions. Only clients with fully expired or deleted sessions free up capacity for new connections.</p>`,
			},
			{
				id: 'tbmq-perp-throughput-def',
				question: 'How is “throughput (msg/sec)” defined and metered?',
				answer: `<p>Throughput (total messages per second) refers to the combined number of MQTT PUBLISH packets processed by the TBMQ each second. This includes both incoming messages from publishers and outgoing messages delivered to subscribers.<br><br>For example, if 100 devices each publish 10 messages per second, that results in 1,000 incoming messages per second. If each message is delivered to 2 subscribers, the outgoing volume is 2,000 messages per second. In this case, the total messages per second would be 3,000.<br><br>Only MQTT PUBLISH packets are counted—control packets like CONNECT, SUBSCRIBE, PINGREQ, etc., are excluded. This metric reflects the actual messaging throughput of your deployment and is used to ensure performance and SLA compliance.</p>`,
			},
			{
				id: 'tbmq-perp-prod-instance',
				question: 'What is production instance?',
				answer: `<p>A Production Instance is the core unit of deployment for TBMQ Professional Edition, representing a single, dedicated TBMQ broker node. This node is licensed exclusively for processing live client traffic, including all licensed Sessions and Throughput. In a self-managed environment, an instance is typically deployed as a Docker container or a Kubernetes pod. While one instance is usually included in the base license, customers often purchase additional instances to create a fault-tolerant cluster for high availability (HA) and increased reliability.</p>`,
			},
			{
				id: 'tbmq-perp-dev-instance',
				question: 'What is development instance?',
				answer: `<p>A Development Instance is a dedicated TBMQ broker node—typically deployed as a Docker container or Kubernetes pod—that is licensed exclusively for non-production activities. This includes staging, testing, QA, and CI/CD workflows. The primary purpose of using a dedicated Development Instance is to ensure isolated environments for testing and integration without risking the integrity or performance of your live Production deployment or contaminating production data.</p>`,
			},
			{
				id: 'tbmq-perp-instance-count',
				question: 'How many instances can I deploy with my perpetual license?',
				answer: `<p>The total number of instances you can deploy is determined by the specific license purchase you make. Your Perpetual License grants you a fixed count of licensed instances, beginning with one Production Instance included in the Base Price. You can increase this total count permanently at any time by purchasing additional Production or Development Instances with a one-time fee. The license covers the total number of instances you have purchased, and you cannot run more nodes concurrently than your total licensed instance count.</p>`,
			},
			{
				id: 'tbmq-perp-cloud-migration',
				question: 'Can I move my deployment between cloud providers?',
				answer: `<p>Yes, self-managed TBMQ is cloud-agnostic and can be migrated as needed.</p>`,
			},
			{
				id: 'tbmq-perp-ha',
				question: 'Does TBMQ support high-availability (HA) setups?',
				answer: `<p>Yes. TBMQ fully supports high-availability (HA) deployments, allowing multiple nodes to operate together as a cluster. This ensures fault tolerance, load balancing, and continuous operation.</p>`,
			},
			{
				id: 'tbmq-perp-migrate-deploy',
				question: 'Can I migrate from one deployment to another using the same license?',
				answer: `<p>Yes, absolutely. The Perpetual License allows you to migrate between deployments through the License Server’s activation management. To transfer your deployment, simply deactivate your existing instances, install TBMQ on the new cluster, and reactivate it using your existing license key. If you wish to preserve your environment, make sure to back up all data from the previous deployment before migration. Once the new setup is complete, you can restore the backup and continue operating seamlessly.</p>`,
			},
			{
				id: 'tbmq-perp-limits',
				question: 'Are there any sessions, message throughput, etc., limits for perpetual licenses?',
				answer: `<p>Yes, the Perpetual License is a commercial product defined by the specific Sessions, Throughput, and Instance count you purchase. These limits are set by your licensed capacity, and the software will enforce them to ensure compliance. However, the TBMQ Professional Edition is engineered for indefinite scalability to meet your long-term growth. You are not locked into your initial configuration: you can permanently expand your licensed capacity at any time by making a new one-time purchase of additional Sessions, Throughput, and Instances. This ensures the license can always be scaled to support your evolving operational demands, constrained only by your total purchased capacity.</p>`,
			},
			{
				id: 'tbmq-perp-offline',
				question: 'Can I run offline?',
				answer: `<p>By default, the platform requires active Internet access or at least access to License server from your host machine. If Offline access is a must, please <a target="_blank" href="/contact-us/">contact us</a> to discuss options.</p>`,
			},
			{
				id: 'tbmq-perp-backup',
				question: 'Can I back up my TBMQ deployment?',
				answer: `<p>Yes. You can back up your TBMQ deployment to preserve configurations, data, and system state.</p>`,
			},
			{
				id: 'tbmq-perp-multitenancy',
				question: 'Does TBMQ support multi-tenancy?',
				answer: `<p>No, it does not support multi-tenancy for now.</p>`,
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'tbmq-perp-security',
				question: 'Is my TBMQ instance secure?',
				answer: `<p>Security depends on your infrastructure setup, but TBMQ provides built-in authentication, role-based access control, and encryption.</p>`,
			},
			{
				id: 'tbmq-perp-storage-loc',
				question: 'Where is my TBMQ data stored?',
				answer: `<p>Your data is stored on your own infrastructure, whether on-premise or in the cloud.</p>`,
			},
			{
				id: 'tbmq-perp-data-region',
				question: 'Can I store TBMQ data in my preferred region?',
				answer: `<p>Yes, you have full control over data storage location.</p>`,
			},
			{
				id: 'tbmq-perp-pentest',
				question: 'Do you provide pentest results?',
				answer: `<p>No, we do not do it for many reasons. Firstly, as a broker vendor, we cannot disclose detected vulnerabilities of certain versions of the platform as the disclosure affects the safety of our existing customers who use that particular version. Secondly, the self-declared pentest is less trustworthy as it is in the vendor’s interest to come up with clean results and you never know whether to believe them or not. Lastly, the penetration test makes more sense to be conducted over a ready-to-use end client software/application to define weak spots (if any). It is the Licensee’s responsibility to order independent testing.</p>`,
			},
			{
				id: 'tbmq-perp-vuln-matrix',
				question: 'Where can I find the logged vulnerability fixes matrix: version + list of fixes?',
				answer: `<p>Please stay tuned with our <a target="_blank" href="/docs/mqtt-broker/pe/releases/">Release notes</a>. Critical vulnerabilities or security issues are mentioned in separate line items. Less threatful vulnerabilities appear as a single record (“Vulnerability fixes”) stating that, at the release date, the version is free of known HIGH and some MEDIUM CVEs.</p>`,
			},
			{
				id: 'tbmq-perp-license-data',
				question: 'What data does ThingsBoard collect for license verification?',
				answer: `<p>During the first launch of ThingsBoard PE, built-in License Server Client generates an “Activate Instance Request” to the License Server. This request contains the license key and version info about the current platform installation. License Server looks up the subscription info based on the license key and replies with the instance id, subscription plan data, and some magic bytes. License Client stores this information locally and uses instance id and some magic bytes for the next license check requests. More details <a target="_blank" href="/products/license-server/">here</a>.</p>`,
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'tbmq-perp-trial',
				question: 'Is there a trial version of the perpetual license?',
				answer: `<p>No, there is no trial option for perpetual licenses. To trial a self-managed system, you can use self-managed subscriptions.</p>`,
			},
			{
				id: 'tbmq-perp-cancel',
				question: 'What happens if I cancel my perpetual license?',
				answer: `<p>Cancellation of the perpetual license means the license key will be removed from the License Server. Once the license key is removed, the TBMQ environment using this key will be stopped immediately.</p>`,
			},
			{
				id: 'tbmq-perp-convert-trial',
				question: 'Can I convert a trial instance into a perpetual license?',
				answer: `<p>Yes, you can convert your self-managed subscription to a perpetual license by purchasing the perpetual license and replacing the license key in the configuration files. For more details, please <a target="_blank" href="/contact-us/">contact us</a>.</p>`,
			},
			{
				id: 'tbmq-perp-refunds',
				question: 'Do you offer refunds for perpetual license purchases?',
				answer: `<p>No, refunds are not offered for perpetual license purchases.</p>`,
			},
		],
	},
	{
		id: 'supportAndAssistance',
		label: 'Support & Assistance',
		items: [
			{
				id: 'tbmq-perp-support-level',
				question: 'What level of support is included with my perpetual license?',
				answer: `<p>The perpetual license includes dedicated support, providing access to the support portal with an initial response time of 24 hours.</p>`,
			},
			{
				id: 'tbmq-perp-support-issues',
				question: 'What issues are included in license support?',
				answer: `<p>Access to our dedicated Support Portal is included with the Direct Help Desk and Priority Help Desk support tiers, as well as for Perpetual license holders. The support service includes expert assistance with platform installation and migration for default deployments, along with resolving any questions related to the platform's out-of-the-box functionalities, as detailed in our documentation. All support inquiries are managed through a single queue, and our commitment is to provide an initial response within 24 hours to address your needs promptly. For specialized services such as custom consulting, code reviews, health assessments, or bespoke development projects, tailored solutions are available; our support engineers will efficiently guide you to the best resources if a request falls outside the standard platform scope.</p>`,
			},
			{
				id: 'tbmq-perp-additional-support',
				question: 'Can I purchase additional support for my perpetual license?',
				answer: `<p>Yes, you can purchase additional services such as managed services, advanced SLAs, consultancy, development, and training. For more details, please <a target="_blank" href="/contact-us/">contact our sales team</a>.</p>`,
			},
			{
				id: 'tbmq-perp-24-7',
				question: 'Do you offer 24/7 support?',
				answer: `<p>Yes, we can provide 24/7 support as part of our managed services with an additional signed SLA. Please <a target="_blank" href="/contact-us/">contact us</a> for more details.</p>`,
			},
			{
				id: 'tbmq-perp-maintenance',
				question: 'Do you provide full maintenance services for TBMQ deployed on my infrastructure?',
				answer: `<p>Yes, we offer full maintenance services for instances deployed on your infrastructure. These services can be customized based on your needs and are provided under an additional SLA, ensuring regular monitoring, updates, and issue resolution. For more details please <a target="_blank" href="/contact-us/">contact us</a>.</p>`,
			},
			{
				id: 'tbmq-perp-contact-support',
				question: 'How do I contact support?',
				answer: `<p>If your license is a Perpetual License or if you have the Direct Help Desk or Priority Help Desk tier on your subscription, you will access support through our dedicated ticketed system managed directly by our TBMQ expert team. You can log in and submit requests via the <a target="_blank" href="https://thingsboard-portal.atlassian.net/servicedesk/customer/portal/1">Support portal</a>.</p>`,
			},
			{
				id: 'tbmq-perp-setup-help',
				question: 'How can I get help with installation and setup?',
				answer: `<p>All perpetual license packages provide dedicated support with predefined response time and access to the ThingsBoard Support Portal. Our expert support team is available to assist you with system deployment by following our recommended <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">installation methods</a> and architecture, ensuring a smooth and efficient setup. For custom installation scripts or alternative deployment scenarios, additional support options are available and you can <a target="_blank" href="/contact-us/">contact us</a> to discuss your needs.</p>`,
			},
		],
	},
];

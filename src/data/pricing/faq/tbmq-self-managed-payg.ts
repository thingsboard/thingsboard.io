import type { FaqCategory } from '../types';

export const tbmqSelfManagedPaygFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'tbmq-payg-sm-definition',
				question: 'What is a self-managed subscription?',
				answer: `<p>A self-managed subscription allows you to host and manage TBMQ on your own infrastructure, either on-premises or in the cloud. You are responsible for the installation, configuration, and ongoing management of the system, while TBMQ team provides the software and necessary documentation to support the process.</p>`,
			},
			{
				id: 'tbmq-payg-buy',
				question: 'How can I buy a self-managed subscription?',
				answer: `<p>To purchase a self-managed subscription, you can acquire a license through your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Each license comes with a unique activation key, which allows you to deploy and run the system by following our detailed <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">installation guides</a>.</p>`,
			},
			{
				id: 'tbmq-payg-license-meaning',
				question: 'What does it mean to get the license?',
				answer: `<p>Licensing is applicable to self-hosted platform versions only. Each license comes with a unique license key (activation code) that is automatically generated in your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Using this license key, you can deploy and run the system by following our detailed <a target="_blank" href="/docs/mqtt-broker/install/installation-options/">installation guides</a>.</p>`,
			},
			{
				id: 'tbmq-payg-plans',
				question: 'What self-managed subscription plans does TBMQ offer?',
				answer: `<p>TBMQ Professional Edition operates on a flexible, consumption-based licensing model rather than using predefined subscription tiers. We offer a single Pay-as-you-go (PAYG) subscription model for self-managed deployments. This structure provides complete control over your licensing costs, as your monthly fee is calculated precisely based on the capacity you configure in the calculator for Sessions, Throughput, and Instances. This ensures you only pay for the exact resources and features you require, allowing your deployment to scale dynamically without being restricted by fixed plan limits.</p>`,
			},
			{
				id: 'tbmq-payg-calculator-reason',
				question:
					'Why does the TBMQ Self-managed Subscription utilize a detailed capacity calculator instead of offering fixed plans?',
				answer: `<p>TBMQ utilizes a detailed capacity calculator to ensure our licensing model is highly flexible and fully transparent. We do not offer fixed subscription plans because we want you to be in complete control of your deployment costs. The calculator is your primary tool for licensing, allowing you to define the exact capacity required for Sessions, Throughput, and Instances. This approach ensures optimal cost efficiency by matching your payment precisely to the resources you consume, allowing for dynamic scaling without the constraints of predefined tiers.</p>`,
			},
			{
				id: 'tbmq-payg-min-cost',
				question:
					'What is the minimum configuration and cost for a TBMQ Self-managed Subscription?',
				answer: `<p>The minimum configuration for the TBMQ Self-managed Subscription grants you the base licensing capacity required to run the TBMQ Professional Edition. This configuration is priced at $15.00 per month and includes the following minimum licensed resources:<br>* 100 Sessions<br>* 100 messages per second (msg/sec) Throughput<br>* 1 Production Instance<br>* Community Support<br>This configuration is typically used for initial testing, proof-of-concept deployments, and qualifies for the 30-day free trial.</p>`,
			},
			{
				id: 'tbmq-payg-commitment',
				question: 'Is there a contract or commitment for the subscription?',
				answer: `<p>No, all subscriptions are month-to-month, and you can cancel anytime.</p>`,
			},
			{
				id: 'tbmq-payg-self-host',
				question: 'Do I need to host TBMQ myself with a subscription license?',
				answer: `<p>Yes, you are responsible for deploying and managing TBMQ on your own infrastructure.</p>`,
			},
			{
				id: 'tbmq-payg-upgrade-downgrade',
				question: 'Can I upgrade or downgrade my subscription at any time?',
				answer: `<p>Yes, the TBMQ Self-managed Pay-as-you-go model is explicitly designed for complete flexibility. You can adjust your licensed capacity for Sessions, Throughput, and Instances at any time using the self-managed calculator. Any changes you make will take effect immediately and will be reflected proportionally in your next monthly billing cycle. This allows you to dynamically scale your resources up or down to perfectly match your deployment's current demands.</p>`,
			},
			{
				id: 'tbmq-payg-exceed-limits',
				question:
					'What happens if I exceed the total messages per second or session limit in my subscription?',
				answer: `<p>If your TBMQ deployment exceeds the licensed limit for either Sessions or Throughput messages per second, the broker software will enforce the capacity defined in your license key. This typically means that new client connections or incoming messages will be rejected, or your deployment performance may be throttled until usage falls back below the purchased capacity. To maintain continuous service and prevent disruption, we recommend proactively monitoring your capacity usage and adjusting your licensed limits via the <a target="_blank" href="https://license.thingsboard.io/">License Portal</a> before reaching your peak operational thresholds.</p>`,
			},
			{
				id: 'tbmq-payg-features',
				question: 'Are all TBMQ features included in the subscription?',
				answer: `<p>Yes, all core TBMQ features are included. The only exception to the comprehensive feature set is White Labeling, which is available as an optional add-on that can be purchased separately.</p>`,
			},
			{
				id: 'tbmq-payg-multi-location',
				question: 'Can I use my license across multiple locations or instances?',
				answer: `<p>Yes, your TBMQ Professional Edition license is fully portable across your self-managed infrastructure. By default, your license includes one Production Instance, and you have the option to purchase additional Production or Development Instances as needed for increased scale, high availability (HA), or isolated testing. Once these resources are licensed, you are free to deploy them anywhere you need—across multiple data centers, regions, or cloud environments—to support your architectural and redundancy requirements. The license covers the total number of purchased instances, Sessions, and Throughput regardless of their geographical location.</p>`,
			},
			{
				id: 'tbmq-payg-migration-server',
				question: 'Can I migrate from one server or container to another using the same license?',
				answer: `<p>Yes! You can migrate your license by activating or deactivating it on the License Server. To move to a new server, deactivate the current instance, install the software on the new server, and reuse your existing license key. Be sure to back up your data if you want to maintain the same environment. Note: The license system prevents running TBMQ Professional Edition on more servers than allowed by the subscription at the same time unless you purchase additional instances.</p>`,
			},
			{
				id: 'tbmq-payg-switch-perpetual',
				question: 'Is it possible to jump from subscription to perpetual?',
				answer: `<p>Customer may cancel the subscription and purchase a perpetual license. The remaining costs from the terminated subscription plan (if any) will be deducted from the total cost for the perpetual license. The perpetual license is non-refundable. Once purchased, it cannot be canceled.</p>`,
			},
		],
	},
	{
		id: 'billingAndPayments',
		label: 'Billing & Payments',
		items: [
			{
				id: 'tbmq-payg-billing',
				question: 'How does billing work for self-managed subscriptions?',
				answer: `<p>Billing is handled via Stripe and is charged monthly based on your configured subscription.</p>`,
			},
			{
				id: 'tbmq-payg-payment-methods',
				question: 'What payment methods do you accept?',
				answer: `<p>We accept credit and debit cards through Stripe.</p>`,
			},
			{
				id: 'tbmq-payg-wire',
				question: 'I cannot pay by card, may we use wire instead?',
				answer: `<p>Sure. In this case, you must reach out to our sales team via <a target="_blank" href="/contact-us/">contact us</a>. If you have ongoing communication with the account manager or success manager on our end, please refer your request to that person.</p>`,
			},
			{
				id: 'tbmq-payg-annual',
				question: 'Do you offer an annual payment option?',
				answer: `<p>We currently offer only a monthly subscription with automatic payments via Stripe. For annual payments, please <a target="_blank" href="/contact-us/">contact</a> our team to arrange a wire transfer invoice.</p>`,
			},
			{
				id: 'tbmq-payg-failed-payment',
				question: 'What happens if my payment fails?',
				answer: `<p>If a payment fails, Stripe will retry the charge several times. If unsuccessful, your license will be suspended.</p>`,
			},
			{
				id: 'tbmq-payg-cancel',
				question: 'Can I cancel my subscription anytime?',
				answer: `<p>Yes, you can cancel your subscription anytime.</p>`,
			},
			{
				id: 'tbmq-payg-refunds',
				question: 'Are refunds available if I cancel my subscription?',
				answer: `<p>No, we do not offer refunds for unused time. However, the funds for the remaining period will be saved on your account balance for future use.</p>`,
			},
			{
				id: 'tbmq-payg-proration',
				question: 'Is there proration when upgrading or downgrading my plan?',
				answer: `<p>Yes, Stripe automatically prorates the charges when you change plans.</p>`,
			},
			{
				id: 'tbmq-payg-discounts',
				question: 'Do you offer discounts for multiple licenses?',
				answer: `<p>Contact our <a target="_blank" href="/contact-us/">sales team</a> for bulk pricing options.</p>`,
			},
			{
				id: 'tbmq-payg-renew-fail',
				question: 'What happens if I don’t renew my subscription?',
				answer: `<p>Your license will become inactive, and your TBMQ instance will be suspended.</p>`,
			},
			{
				id: 'tbmq-payg-transfer',
				question: 'Can I transfer my subscription to another entity?',
				answer: `<p>No, subscriptions are non-transferable. However, you can add users to your License Server account, allowing others to help manage the license subscription.</p>`,
			},
			{
				id: 'tbmq-payg-extra-fees',
				question: 'Is there an additional payment for the software use besides the license fee?',
				answer: `<p>No, we do not charge extra unless you want an additional service that we offer: professional support, custom development and consulting, training, or managed service.</p>`,
			},
			{
				id: 'tbmq-payg-instance-price',
				question: 'What is the price for extra Production and Development Instances?',
				answer: `<p>Additional Production and Development Instances are priced at a fixed rate of $100 and $50 per instance per month, respectively. This allows you to scale your fault-tolerance and dedicated testing environments as needed, ensuring you only pay for the extra nodes you license.</p>`,
			},
			{
				id: 'tbmq-payg-session-price',
				question: 'What is the unit price for additional Sessions capacity?',
				answer: `<p>Sessions capacity is licensed on a flexible per-session, per-month basis. You can license any amount you require. The effective unit rate is calculated as $5.00 per 100 Sessions.</p>`,
			},
			{
				id: 'tbmq-payg-throughput-price',
				question: 'What is the unit price for additional Throughput capacity?',
				answer: `<p>Throughput capacity is licensed on a flexible per-message-per-second (msg/sec), per-month basis. You can license any amount you require. The effective unit rate is calculated as $10.00 per 100 messages per second (msg/sec).</p>`,
			},
		],
	},
	{
		id: 'usageAndLimits',
		label: 'Usage & Limits',
		items: [
			{
				id: 'tbmq-payg-session-def',
				question: 'What exactly counts as a “session”?',
				answer: `<p>A session is any active connection between an MQTT client and the TBMQ broker. Each session represents a single client, uniquely identified by its client ID, and counts toward your session quota.<br><br>If a client connects and maintains an active session, it occupies one slot in the session quota. When session persistence is enabled, a disconnected client still occupies a session slot, since its session data (subscriptions, messages, etc.) is retained by the broker.<br><br>A session slot is released only when the session has either expired or been explicitly removed. This means your session quota includes both currently connected clients and any disconnected clients with persisted sessions. Only clients with fully expired or deleted sessions free up capacity for new connections.</p>`,
			},
			{
				id: 'tbmq-payg-throughput-def',
				question: 'How is “throughput (msg/sec)” defined and metered?',
				answer: `<p>Throughput (total messages per second) refers to the combined number of MQTT PUBLISH packets processed by the TBMQ each second. This includes both incoming messages from publishers and outgoing messages delivered to subscribers.<br><br>For example, if 100 devices each publish 10 messages per second, that results in 1,000 incoming messages per second. If each message is delivered to 2 subscribers, the outgoing volume is 2,000 messages per second. In this case, the total messages per second would be 3,000.<br><br>Only MQTT PUBLISH packets are counted—control packets like CONNECT, SUBSCRIBE, PINGREQ, etc., are excluded. This metric reflects the actual messaging throughput of your deployment and is used to ensure performance and SLA compliance.</p>`,
			},
			{
				id: 'tbmq-payg-prod-instance',
				question: 'What is production instance?',
				answer: `<p>A Production Instance is the core unit of deployment for TBMQ Professional Edition, representing a single, dedicated TBMQ broker node. This node is licensed exclusively for processing live client traffic, including all licensed Sessions and Throughput. In a self-managed environment, an instance is typically deployed as a Docker container or a Kubernetes pod. While one instance is usually included in the base license, customers often purchase additional instances to create a fault-tolerant cluster for high availability (HA) and increased reliability.</p>`,
			},
			{
				id: 'tbmq-payg-dev-instance',
				question: 'What is development instance?',
				answer: `<p>A Development Instance is a dedicated TBMQ broker node—typically deployed as a Docker container or Kubernetes pod—that is licensed exclusively for non-production activities. This includes staging, testing, QA, and CI/CD workflows. The primary purpose of using a dedicated Development Instance is to ensure isolated environments for testing and integration without risking the integrity or performance of your live Production deployment or contaminating production data.</p>`,
			},
			{
				id: 'tbmq-payg-addons',
				question: 'Can I add anything to the subscription?',
				answer: `<p>Yes, the self-managed subscription allows you to enhance your license with two specialized add-ons. The White Labeling add-on enables full customization of the broker interface to seamlessly match your corporate branding. The Priority Help Desk add-on moves your support requests into a high-priority queue managed by the expert TBMQ team, ensuring they are triaged and addressed ahead of standard tickets for faster processing of critical operations.</p>`,
			},
			{
				id: 'tbmq-payg-wl-addon',
				question: 'What is White Labeling add-on?',
				answer: `<p>The White Labeling add-on is an optional feature that allows you to fully customize the TBMQ broker interface and deployment components to match your corporate branding. This removes all TBMQ branding from the control panel and deployment environment, enabling you to deliver a unified and seamless experience to your end-users or internal teams. This is primarily used by organizations integrating TBMQ as a core part of their own product or corporate infrastructure.</p>`,
			},
			{
				id: 'tbmq-payg-priority-support',
				question: 'What is Priority Help Desk add-on?',
				answer: `<p>The Priority Help Desk add-on provides an elevated support service level by moving your support requests directly into a high-priority queue managed by the TBMQ expert team. This ensures your critical operations receive front-of-line attention, and your requests are triaged and addressed ahead of standard tickets. It is important to note that while priority status accelerates processing within the queue, it does not guarantee a faster response time.</p>`,
			},
			{
				id: 'tbmq-payg-capacity-establishment',
				question:
					'Since there are no fixed plans, how is my maximum Session and Throughput capacity established?',
				answer: `<p>Since the TBMQ Self-managed Subscription operates on a Pay-as-you-go model, your maximum Session and Throughput capacities are established entirely by you. You use the self-managed calculator to configure the exact limits needed for your deployment. The license then grants you a total aggregate capacity up to those chosen values. Your license fee is calculated based on the unit rates for the selected Sessions and Throughput capacity, rather than being determined by fixed tiers.</p>`,
			},
			{
				id: 'tbmq-payg-exceed-usage',
				question:
					'What happens if I exceed my subscription’s throughput (messages per second) or session limit?',
				answer: `<p>If your TBMQ deployment exceeds the licensed limit for either Sessions or Throughput messages per second, the broker software will enforce the capacity defined in your license key. This typically means that new client connections or incoming messages will be rejected, or your deployment performance may be throttled until usage falls back below the purchased capacity. To maintain continuous service and prevent disruption, we recommend proactively monitoring your capacity usage and adjusting your licensed limits via the calculator before reaching your peak operational thresholds.</p>`,
			},
			{
				id: 'tbmq-payg-multi-server',
				question: 'Can I use my license on multiple servers?',
				answer: `<p>Yes, your TBMQ Professional Edition license is portable across multiple physical and virtual servers, data centers, and cloud environments. The license grants you a total pool of Sessions, Throughput, and Instances. Each server running a broker must be covered by one of your licensed Production or Development Instances. Crucially, the license key enforces a strict one-to-one mapping: you cannot use a single license entitlement (e.g., 1 Production Instance) to run concurrently on two separate servers or nodes. You can purchase additional Instances as needed for high availability, fault tolerance, and scale, and deploy those licensed units wherever they are required to meet your architectural needs.</p>`,
			},
			{
				id: 'tbmq-payg-api-storage-charge',
				question: 'Does TBMQ charge for API calls or storage?',
				answer: `<p>No, but you may be charged by your cloud provider for resource usage.</p>`,
			},
			{
				id: 'tbmq-payg-internet-connection',
				question: 'Do I need an internet connection to use the self-managed license?',
				answer: `<p>Yes, an internet connection is required for periodic license verification. The system checks the license once per hour, and if the connection is not restored within 24 hours, the platform may shut down. This process ensures proper license management while allowing temporary connectivity issues. For more details, please refer to the license check <a target="_blank" href="/docs/license-server/what-is-license-server/#architecture">description</a>.</p>`,
			},
			{
				id: 'tbmq-payg-offline',
				question: 'Can I run offline?',
				answer: `<p>By default, the platform requires active Internet access or at least access to license portal from your host machine. If Offline access is a must, please <a target="_blank" href="/contact-us/">contact us</a> to discuss options.</p>`,
			},
			{
				id: 'tbmq-payg-cloud-agnostic',
				question: 'Can I move my deployment between cloud providers?',
				answer: `<p>Yes, self-managed TBMQ is cloud-agnostic and can be migrated as needed.</p>`,
			},
			{
				id: 'tbmq-payg-ha',
				question: 'Does TBMQ support high-availability (HA) setups?',
				answer: `<p>Yes, High Availability (HA) is supported and can be achieved through TBMQ services and database replication. Please note that each TBMQ replica will require a separate license.</p>`,
			},
			{
				id: 'tbmq-payg-backup',
				question: 'Can I back up my TBMQ instance?',
				answer: `<p>Yes, backups depend on your database and storage setup.</p>`,
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'tbmq-payg-security',
				question: 'Is my TBMQ instance secure?',
				answer: `<p>Security depends on your infrastructure setup, but TBMQ provides built-in authentication, role-based access control, and encryption.</p>`,
			},
			{
				id: 'tbmq-payg-data-location',
				question: 'Where is my TBMQ data stored?',
				answer: `<p>Your data is stored on your own infrastructure, whether on-premise or in the cloud.</p>`,
			},
			{
				id: 'tbmq-payg-data-region',
				question: 'Can I store TBMQ data in my preferred region?',
				answer: `<p>Yes, you have full control over data storage location.</p>`,
			},
			{
				id: 'tbmq-payg-pentest',
				question: 'Do you provide pentest results?',
				answer: `<p>No, we do not do it for many reasons. Firstly, as a broker vendor, we cannot disclose detected vulnerabilities of certain versions of the platform as the disclosure affects the safety of our existing customers who use that particular version. Secondly, the self-declared pentest is less trustworthy as it is in the vendor’s interest to come up with clean results and you never know whether to believe them or not. Lastly, the penetration test makes more sense to be conducted over a ready-to-use end client software/application to define weak spots (if any). It is the Licensee’s responsibility to order independent testing.</p>`,
			},
			{
				id: 'tbmq-payg-vulnerability-matrix',
				question:
					'Where can I find the logged vulnerability fixes matrix: version + list of fixes?',
				answer: `<p>Please stay tuned with our <a target="_blank" href="/docs/mqtt-broker/pe/releases/">Release notes</a>. Critical vulnerabilities or security issues are mentioned in separate line items. Less threatful vulnerabilities appear as a single record (“Vulnerability fixes”) stating that, at the release date, the version is free of known HIGH and some MEDIUM CVEs.</p>`,
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'tbmq-payg-trial',
				question: 'Can I try a self-managed license before subscribing?',
				answer: `<p>Yes, TBMQ offers a 30-day free trial for the self-managed Professional Edition license, which is available exclusively for the minimum capacity configuration: 100 Sessions, 100 messages per second (msg/sec), and 1 Production Instance. This trial allows you to fully test the broker's performance and core features within your own infrastructure without any financial commitment. At the end of the 30 days, you can choose to transition to a paid subscription, either maintaining that minimum configuration or scaling up your capacity as required.</p>`,
			},
			{
				id: 'tbmq-payg-cancel-sub',
				question: 'What happens if I cancel my subscription?',
				answer: `<p>Your license will become inactive, and your TBMQ instance will be stopped.</p>`,
			},
			{
				id: 'tbmq-payg-refund',
				question: 'Are refunds available for self-managed subscriptions?',
				answer: `<p>No, all sales are final.</p>`,
			},
			{
				id: 'tbmq-payg-switch-to-perp',
				question: 'Can I switch from a subscription license to a perpetual license?',
				answer: `<p>Customer may cancel the subscription and purchase a perpetual license. The remain costs from terminated subscription plan (if remain) will be deducted from Total cost for the perpetual license. The perpetual license is non-refundable. Once purchased, it cannot be canceled.</p>`,
			},
		],
	},
	{
		id: 'supportAndAssistance',
		label: 'Support & Assistance',
		items: [
			{
				id: 'tbmq-payg-support-tier',
				question: 'What support is included in my subscription?',
				answer: `<p>The included Support tier for the TBMQ Self-managed Subscription is tied to the total monthly cost of the license. The foundational Community support tier (which provides access to our public knowledge base and forums) is included when the total subscription cost is less than $300. Once the total subscription cost reaches or exceeds $300, the Direct Help Desk tier is automatically unlocked, providing ticketed access to our expert team. Alternatively, the Direct Help Desk tier can be accessed immediately by purchasing the Priority Help Desk add-on, regardless of the subscription's total monthly cost.</p>`,
			},
			{
				id: 'tbmq-payg-support-247',
				question: 'Do you offer 24/7 support?',
				answer: `<p>Yes, we can provide 24/7 support as part of our managed services with an additional signed SLA. Please <a target="_blank" href="/contact-us/">contact us</a> for more details.</p>`,
			},
			{
				id: 'tbmq-payg-install-help',
				question: 'How can I get help with installation and setup?',
				answer: `<p>If your subscription includes response time support and you have access to the Support Portal, the TBMQ support team can assist with system deployment as part of the subscription. However, this applies only if you follow recommended installation methods and architecture. Custom installation scripts or non-recommended deployment scenarios are not covered under included support. If your subscription plan does not include support, then we recommend using our documentation, tutorials, and optional professional services. To discuss options, please <a target="_blank" href="/contact-us/">contact us</a>.</p>`,
			},
			{
				id: 'tbmq-payg-contact-support',
				question: 'How do I contact support?',
				answer: `<p>The method for contacting support depends on your current license tier. If you are using the Community support tier, support is provided via self-service resources, including our comprehensive public documentation, knowledge base, and peer-to-peer forums. If you have the Direct Help Desk or Priority Help Desk tier (which is included when your subscription cost is over $300 or purchased as an add-on), you will access support through our dedicated ticketed system via the <a target="_blank" href="https://thingsboard-portal.atlassian.net/servicedesk/customer/portal/1">Support portal</a>, where requests are managed directly by our TBMQ expert team.</p>`,
			},
			{
				id: 'tbmq-payg-support-scope',
				question: 'What issues are included in subscription support?',
				answer: `<p>Access to our dedicated Support Portal is included with the Direct Help Desk and Priority Help Desk support tiers, as well as for Perpetual license holders. The support service includes expert assistance with platform installation and migration for default deployments, along with resolving any questions related to the platform's out-of-the-box functionalities, as detailed in our documentation. All support inquiries are managed through a single queue, and our commitment is to provide an initial response within 24 hours to address your needs promptly. For specialized services such as custom consulting, code reviews, health assessments, or bespoke development projects, tailored solutions are available; our support engineers will efficiently guide you to the best resources if a request falls outside the standard platform scope.</p>`,
			},
		],
	},
];

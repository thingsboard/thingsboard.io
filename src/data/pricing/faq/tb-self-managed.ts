import type { FaqCategory } from '../types';

export const tbSelfManagedFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'pe-pay-as-you-go-self-managed-definition',
				question: 'What is a self-managed subscription?',
				answer: '<p>A self-managed subscription allows you to host and manage ThingsBoard on your own infrastructure, either on-premises or in the cloud. You are responsible for the installation, configuration, and ongoing management of the system, while ThingsBoard provides the software and necessary documentation to support the process.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-purchase',
				question: 'How can I buy a self-managed subscription?',
				answer: '<p>To purchase a self-managed subscription, you can acquire a license through your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Each license comes with a unique activation key, which allows you to deploy and run the system by following our detailed installation guides.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-purchase-perpetual-license',
				question: 'How to purchase a Perpetual license?',
				answer: '<p>If you would like to explore the Perpetual option, please <a target="_blank" href="/contact-us/">contact our sales team</a></p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-license',
				question: 'What does it mean to get the license?',
				answer: '<p>Licensing is applicable to self-hosted platform versions only. Each license comes with a unique license key (activation code) that is automatically generated in your <a target="_blank" href="https://license.thingsboard.io/">License Server</a> account. Using this license key, you can deploy and run the system by following our detailed installation guides.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-subscription-plans',
				question: 'What self-managed subscription plans does ThingsBoard offer?',
				answer: '<p>ThingsBoard offers flexible monthly subscription plans, with tiers based on the number of devices and assets. We support 5 predefined plans to cater to different needs. The beginner plan includes support for up to 10 devices. For more details, visit the ThingsBoard <a target="_blank" href="/pricing/?product=thingsboard-pe">pricing page</a>.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-differences',
				question: 'How do the self-managed subscription plans differ?',
				answer: '<p>Plans differ based on the number of devices, support level, and white-labeling availability.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-contract',
				question: 'Is there a contract or commitment for the subscription?',
				answer: '<p>No, all subscriptions are month-to-month, and you can cancel anytime.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-hosting',
				question: 'Do I need to host ThingsBoard myself with a subscription license?',
				answer: '<p>Yes, you are responsible for deploying and managing ThingsBoard on your own infrastructure.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-upgrade',
				question: 'Can I upgrade or downgrade my subscription at any time?',
				answer: '<p>Yes, you can change plans anytime, and billing will be prorated accordingly.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-limits',
				question: 'What happens if I exceed the device or asset limits in my plan?',
				answer: '<p>If you exceed your plan\'s limits, you will need to upgrade to a higher-tier plan. With the Business plan, you can also purchase additional devices on a monthly basis at a rate of $0.10 per extra device.</p>',
			},
			{
				id: 'pe-pay-as-you-go-cloud-to-self-managed',
				question: 'Can I migrate from a ThingsBoard Cloud subscription to a self-managed license?',
				answer: '<p>Please, <a target="_blank" href="/contact-us/">contact us</a> in case migration assistance is needed.</p>',
			},
			{
				id: 'pe-pay-as-you-go-self-managed-features',
				question: 'Are all ThingsBoard features included in every plan?',
				answer: '<p>White labeling is offered starting from the Prototype plan and above.</p>',
			},
			{
				id: 'pe-pay-as-you-go-license-multi-location',
				question: 'Can I use my license across multiple locations or instances?',
				answer: '<p>A platform instance can be installed on a single server, which may be a virtual machine, a running Docker container, or a single OS process. If you need to run the platform across multiple locations or as part of a clustered deployment, you can purchase additional instances for any plan as required. <br><br></p>\n<p>By default, each license includes a predefined number of platform instances. The Maker, Prototype, and Pilot plans include one instance, the Startup plan includes two instances, and the Business plan includes three instances.</p>',
			},
			{
				id: 'pe-pay-as-you-go-subscription-to-perpetual',
				question: 'Is it possible to jump from subscription to perpetual?',
				answer: '<p>Customer may cancel the subscription and purchase a perpetual license. The remaining costs from the terminated subscription plan (if any) will be deducted from the total cost for the perpetual license. The perpetual license is non-refundable. Once purchased, it cannot be canceled.</p>',
			},
			{
				id: 'pe-pay-as-you-go-license-migration',
				question: 'Can I migrate from one server or Virtual machine to another using the same license?',
				answer: '<p>Yes! You can migrate your license by activating or deactivating it on the License Server. To move to a new server, deactivate the current instance, install the software on the new server, and reuse your existing license key. Be sure to back up your data if you want to maintain the same environment. Note: The license system prevents running ThingsBoard Professional Edition on multiple servers at the same time unless you purchase additional instances.</p>',
			},
			{
				id: 'pe-pay-as-you-go-what-is-included-in-the-white-labeled-mobile-app-add-on',
				question: 'What is included in the White-Labeled Mobile App add-on?',
				answer: '<p>The White-Labeled Mobile App add-on provides you with a branded version of the ThingsBoard Mobile application. This includes your company\'s name, logo, colors, and other branding elements. The cost is $99 per month, plus a one-time setup fee of $1,000 to cover branding and configuration.</p>',
			},
		],
	},
	{
		id: 'billingAndPayments',
		label: 'Billing & Payments',
		items: [
			{
				id: 'pe-pay-as-you-go-billing-process',
				question: 'How does billing work for self-managed subscriptions?',
				answer: '<p>Billing is handled via Stripe and is charged monthly based on your selected plan. You can also pay annually with card or wire transfer. Please <a target="_blank" href="/contact-us/">contact us</a> to receive a custom invoice.</p>',
			},
			{
				id: 'pe-pay-as-you-go-payment-methods',
				question: 'What payment methods do you accept?',
				answer: '<p>We accept credit and debit cards through Stripe. You can also pay annually with card or wire transfer. Please <a target="_blank" href="/contact-us/">contact us</a> to receive a custom invoice.</p>',
			},
			{
				id: 'pe-pay-as-you-go-wire-payment',
				question: 'I cannot pay by card, may we use wire instead?',
				answer: '<p>Sure. In this case, you must reach out to our sales team via <a target="_blank" href="/contact-us/">contact us</a>. If you have ongoing communication with the account manager or success manager on our end, please refer your request to that person.</p>',
			},
			{
				id: 'pe-pay-as-you-go-annual-payment',
				question: 'Do you offer an annual payment option?',
				answer: '<p>We currently offer only a monthly subscription with automatic payments via Stripe. For annual payments, please <a target="_blank" href="/contact-us/">contact</a> our team to arrange a wire transfer invoice.</p>',
			},
			{
				id: 'pe-pay-as-you-go-payment-failure',
				question: 'What happens if my payment fails?',
				answer: '<p>If a payment fails, Stripe will retry the charge several times. If unsuccessful, your license will be suspended.</p>',
			},
			{
				id: 'pe-pay-as-you-go-cancel-subscription',
				question: 'Can I cancel my subscription anytime?',
				answer: '<p>Yes, you can cancel your subscription anytime.</p>',
			},
			{
				id: 'pe-pay-as-you-go-refund-policy',
				question: 'Are refunds available if I cancel my subscription?',
				answer: '<p>No, we do not offer refunds for unused time. However, the funds for the remaining period will be saved on your account balance for future use.</p>',
			},
			{
				id: 'pe-pay-as-you-go-proration',
				question: 'Is there proration when upgrading or downgrading my plan?',
				answer: '<p>Yes, Stripe automatically prorates the charges when you change plans.</p>',
			},
			{
				id: 'pe-pay-as-you-go-multiple-licenses',
				question: 'Do you offer discounts for multiple licenses?',
				answer: '<p>Contact our <a target="_blank" href="/contact-us/">sales team</a> for bulk pricing options.</p>',
			},
			{
				id: 'pe-pay-as-you-go-subscription-expiry',
				question: "What happens if I don't renew my subscription?",
				answer: '<p>Your license will become inactive, and your ThingsBoard instance will be suspended.</p>',
			},
			{
				id: 'pe-pay-as-you-go-subscription-transfer',
				question: 'Can I transfer my subscription to another entity?',
				answer: '<p>No, subscriptions are non-transferable. However, you can add users to your License Server account, allowing others to help manage the license subscription.</p>',
			},
			{
				id: 'pe-pay-as-you-go-additional-fees',
				question: 'Is there an additional payment for the software use besides the license fee?',
				answer: '<p>No, we do not charge extra unless you want an additional service that we offer: professional support, Custom development and consulting, Training, or Managed service. </p>',
			},
		],
	},
	{
		id: 'usageDeploymentsAndLimits',
		label: 'Usage, Deployments & Limits',
		items: [
			{
				id: 'pe-pay-as-you-go-device-asset-limits',
				question: 'What are the device and asset limits for each plan?',
				answer: '<p>Maker: 10 devices<br>Prototype: 50 devices<br>Pilot: 100 devices<br>Startup: 500 devices<br>Business: 1000 devices, with the option to purchase additional devices at $0.10 per device per month</p>',
			},
			{
				id: 'pe-pay-as-you-go-production-instances',
				question: 'What does the number of production instances mean?',
				answer: '<p>A <b>Production Instance</b> refers to a single node of the ThingsBoard platform within your deployment. While one instance is enough to run your solution, multiple instances allow you to operate in <b>Cluster Mode</b>. <br><br></p>\n<p>By running multiple instances, you achieve:</p>\n<ul>\n<li><b>High Availability (HA):</b> Your system remains operational even if a node goes down.</li>\n<li><b>Horizontal Scalability:</b> Distribute the processing load across multiple servers to handle more devices and data.</li>\n<li><b>Reliability:</b> Built-in redundancy for mission-critical IoT applications.</li>\n</ul>',
			},
			{
				id: 'pe-pay-as-you-go-exceed-limits',
				question: "What happens if I exceed my plan's device or asset limit?",
				answer: '<p>You will need to upgrade to a higher-tier plan. With the Business plan, you also have the option to purchase additional devices at $0.10 per device per month.</p>',
			},
			{
				id: 'pe-pay-as-you-go-multiple-servers',
				question: 'Can I use my license on multiple servers?',
				answer: '<p>A platform instance can be installed on a single server, which may be a virtual machine, a running Docker container, or a single OS process. If you need to run the platform across multiple locations or as part of a clustered deployment, you can purchase additional instances for any plan as required. <br><br></p>\n<p>By default, each license includes a predefined number of platform instances. The Maker, Prototype, and Pilot plans include one instance, the Startup plan includes two instances, and the Business plan includes three instances.</p>',
			},
			{
				id: 'pe-pay-as-you-go-api-storage-fees',
				question: 'Does ThingsBoard charge for API calls or storage?',
				answer: '<p>No, but you may be charged by your cloud provider for resource usage.</p>',
			},
			{
				id: 'pe-pay-as-you-go-internet-requirement',
				question: 'Do I need an internet connection to use the self-managed license?',
				answer: '<p>Yes, an internet connection is required for periodic license verification. The system checks the license once per hour, and if the connection is not restored within 24 hours, the platform may shut down. This process ensures proper license management while allowing temporary connectivity issues. For more details, please refer to the license check <a target="_blank" href="/docs/license-server/what-is-license-server/">description</a>. Offline mode is also possible as an add-on to the Perpetual license. <a target="_blank" href="/contact-us/">Contact our sales team</a> to know more.</p>',
			},
			{
				id: 'pe-pay-as-you-go-offline-access',
				question: 'Can I run offline?',
				answer: '<p>By default, the platform requires active Internet access or at least access to license portal from your host machine. If Offline access is a must, please <a target="_blank" href="/contact-us/">contact us</a> to discuss options.</p>',
			},
			{
				id: 'pe-pay-as-you-go-cloud-migration',
				question: 'Can I move my deployment between cloud providers?',
				answer: '<p>Yes, self-managed ThingsBoard is cloud-agnostic and can be migrated as needed.</p>',
			},
			{
				id: 'pe-pay-as-you-go-high-availability',
				question: 'Does ThingsBoard support high-availability (HA) setups?',
				answer: '<p>Yes, High Availability (HA) is supported and can be achieved through ThingsBoard services and database replication. Please note that each ThingsBoard replica will require a separate license.</p>',
			},
			{
				id: 'pe-pay-as-you-go-backup',
				question: 'Can I back up my ThingsBoard instance?',
				answer: '<p>Yes, backups depend on your database and storage setup.</p>',
			},
			{
				id: 'pe-pay-as-you-go-telemetry-storage',
				question: 'How is telemetry data stored in self-managed ThingsBoard?',
				answer: '<p>ThingsBoard supports PostgreSQL or PostgreSQL + Cassandra (Hybrid mode) for telemetry storage. For more details on database options, you can check the <a target="_blank" href="/docs/reference/architecture/database/">database approach reference</a>.</p>',
			},
			{
				id: 'pe-pay-as-you-go-multi-tenancy',
				question: 'Does ThingsBoard support multi-tenancy?',
				answer: '<p>Yes, multi-tenancy is supported out of the box.</p>',
			},
			{
				id: 'pe-pay-as-you-go-customer-billing',
				question: 'How to charge my customers?',
				answer: '<p>So far, the ThingsBoard platform does not provide a billing module to charge end customers. At the same time, the platform exposes the <a target="_blank" href="https://thingsboard.cloud/swagger-ui/#/usage-info-controller">Usage API</a> that can be used by the external payment software to generate invoices.</p>',
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'pe-pay-as-you-go-security',
				question: 'Is my ThingsBoard instance secure?',
				answer: '<p>Security depends on your infrastructure setup, but ThingsBoard provides built-in authentication, role-based access control, and encryption.</p>',
			},
			{
				id: 'pe-pay-as-you-go-data-storage',
				question: 'Where is my ThingsBoard data stored?',
				answer: '<p>Your data is stored on your own infrastructure, whether on-premise or in the cloud.</p>',
			},
			{
				id: 'pe-pay-as-you-go-region-storage',
				question: 'Can I store ThingsBoard data in my preferred region?',
				answer: '<p>Yes, you have full control over data storage location.</p>',
			},
			{
				id: 'pe-pay-as-you-go-data-export',
				question: 'Can I export my data at any time?',
				answer: '<p>Yes, you can export your data using the ThingsBoard dashboard, APIs, or by creating a full database backup.</p>',
			},
			{
				id: 'pe-pay-as-you-go-pentest',
				question: 'Do you provide pentest results?',
				answer: '<p>No, we do not do it for many reasons. Firstly, as a platform vendor, we cannot disclose detected vulnerabilities of certain versions of the platform as the disclosure affects the safety of our existing customers who use that particular version. Secondly, the self-declared pentest is less trustworthy as it is in the vendor\'s interest to come up with clean results and you never know whether to believe them or not. Lastly, the penetration test makes more sense to be conducted over a ready-to-use end client software/application to define weak spots (if any). It is the Licensee\'s responsibility to order independent testing. Having said that, the ThingsBoard platform gives one a tool to develop solutions. You may consider the platform a building that a banker rents to establish an office, vault, etc. Now you can see that testing a building itself does not make much sense. But things change when it hosts a bank (or whatever tenant).</p>',
			},
			{
				id: 'pe-pay-as-you-go-vulnerability-fixes',
				question: 'Where can I find the logged vulnerability fixes matrix: version + list of fixes?',
				answer: '<p>Please stay tuned with our <a target="_blank" href="/docs/pe/releases/releases-table/">Release notes</a>. Critical vulnerabilities or security issues are mentioned in separate line items. Less threatful vulnerabilities appear as a single record ("Vulnerability fixes") stating that, at the release date, the version is free of known HIGH and some MEDIUM CVEs.</p>',
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'pe-pay-as-you-go-try-license',
				question: 'Can I try a self-managed license before subscribing?',
				answer: '<p>Yes, the Maker plan ($10/month) is a low-cost way to explore the platform. It also includes trial license for Edge and Trendz products, so you can fully test the ThingsBoard ecosystem.</p>',
			},
			{
				id: 'pe-pay-as-you-go-cancel-subscription',
				question: 'What happens if I cancel my subscription?',
				answer: '<p>Your license will become inactive, and your ThingsBoard instance will be stopped.</p>',
			},
			{
				id: 'pe-pay-as-you-go-switch-perpetual',
				question: 'Can I switch from a subscription license to a perpetual license?',
				answer: '<p>Customer may cancel the subscription and purchase a perpetual license. The remain costs from terminated subscription plan (if remain) will be deducted from Total cost for the perpetual license. The perpetual license is non-refundable. Once purchased, it cannot be canceled.</p>',
			},
			{
				id: 'pe-pay-as-you-go-refunds',
				question: 'Are refunds available for self-managed subscriptions?',
				answer: '<p>No, all sales are final.</p>',
			},
		],
	},
	{
		id: 'supportAndAssistance',
		label: 'Support & Assistance',
		items: [
			{
				id: 'pe-pay-as-you-go-support-included',
				question: 'What support is included in my subscription?',
				answer: '<ul><li><b>Maker and Prototype:</b> Community support.</li><li><b>Startup:</b> Support with 36-hour response time during regular working shifts via Support Portal. <em>Please note: Support for the Startup plan becomes available from the second month of usage.</em></li><li><b>Business:</b> Support with 12-hour response time during regular working shifts via Support Portal.</li></ul>',
			},
			{
				id: 'pe-pay-as-you-go-24-7-support',
				question: 'Do you offer 24/7 support?',
				answer: '<p>Yes, we can provide 24/7 support as part of our managed services with an additional signed SLA. Please <a target="_blank" href="/contact-us/">contact us</a> for more details.</p>',
			},
			{
				id: 'pe-pay-as-you-go-installation-help',
				question: 'How can I get help with installation and setup?',
				answer: '<p>If your subscription plan includes response time support and you have access to the Support Portal, the ThingsBoard support team can assist with system deployment as part of the subscription. However, this applies only if you follow recommended installation methods and architecture. Custom installation scripts or non-recommended deployment scenarios are not covered under included support. If your subscription plan does not include support, then we recommend using our documentation, tutorials, and optional professional services. To discuss options, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
			{
				id: 'pe-pay-as-you-go-contact-support',
				question: 'How do I contact support?',
				answer: '<p>Users of Startup and higher subscriptions, as well as perpetual license holders, are automatically added to the ThingsBoard <a target="_blank" href="https://thingsboard-portal.atlassian.net/servicedesk/customer/portal/1">Support Portal</a> after purchasing a license.</p>',
			},
			{
				id: 'pe-pay-as-you-go-support-issues',
				question: 'What issues are included in subscription support?',
				answer: '<p>Access to the ThingsBoard Support Portal is available for users with Startup and higher subscriptions, as well as perpetual license holders. Without the need for a separate support agreement, all support inquiries are seamlessly managed through a unified queue, ensuring efficient handling of your requests. Our support team is dedicated to providing an initial response within 24 hours to address your needs promptly. <br><br></p>\n<p>The support service includes assistance with installation and migration for default deployments, as well as resolving any questions related to the platform\'s out-of-the-box functionalities, as detailed in our documentation. For specialized services such as consulting, code reviews, health assessments, or development projects, we offer tailored solutions to meet your specific requirements. Should your request involve additional expertise, our support engineers will guide you to the best resources to ensure your success.</p>',
			},
			{
				id: 'pe-pay-as-you-go-development-services',
				question: 'Can you provide an IoT development service tailored to my specific needs?',
				answer: '<p>Yes, we offer custom <a target="_blank" href="/services/development-services/">IoT development services</a> designed to match your exact requirements. Whether you need a full-featured IoT platform, scalable architecture, or specific integrations, our IoT development team can help you accelerate time-to-market and reduce internal workload while ensuring long-term maintainability.</p>',
			},
		],
	},
	{
		id: 'edge',
		label: 'Edge',
		items: [
			{
				id: 'edge-addon-payg-what-is',
				question: 'What is Edge Computing add-on?',
				answer: '<p>The Edge Computing add-on enables local data processing at remote sites through ThingsBoard Edge PE instances. Edge runs independently with offline capability and automatically syncs with your central ThingsBoard PE Server when connectivity returns.</p>\n<p>It is available for all ThingsBoard PE deployments: Cloud, Private Cloud, and self-managed.</p>',
			},
			{
				id: 'edge-addon-payg-pricing-plans',
				question: 'What pricing plans does Edge Computing add-on offer?',
				answer: '<p>Edge Computing add-on pricing depends on your ThingsBoard model. Check the relevant pricing in the <a href="/pricing/?product=thingsboard-pe&calculatorPayg">Plan Calculator</a>.</p>',
			},
			{
				id: 'edge-addon-payg-compatibility',
				question: 'Does Edge work with both ThingsBoard PE and CE?',
				answer: '<p>Edge edition must match your ThingsBoard Server edition:</p>\n<ul>\n<li><b>Edge PE</b> connects to ThingsBoard PE Server.</li>\n<li><b>Edge CE</b> connects to ThingsBoard CE Server.</li>\n</ul>\n<p>Note: Community Editions are free and open-source.</p>',
			},
			{
				id: 'edge-addon-payg-standalone',
				question: 'Can I use Edge without ThingsBoard?',
				answer: '<p>No, Edge PE requires a ThingsBoard PE Server (Cloud, Private Cloud, or self-managed) to provision devices, sync configurations, and exchange data. However, it processes data locally and can operate offline when the connection drops.</p>',
			},
			{
				id: 'edge-addon-payg-free-trial',
				question: 'Do you offer a free trial for Edge?',
				answer: '<p>You can start with the <b>Free</b> plan (limited to 10 devices) with the Edge Computing add-on permanently enabled. This lets you explore Edge PE features at no cost.</p>\n<p>For larger deployments, you can upgrade to paid plans with higher device limits and additional features.</p>',
			},
			{
				id: 'edge-addon-payg-capacity',
				question: 'Can Edge handle my device volume?',
				answer: '<p>We recommend up to 1,000 devices per Edge instance based on typical edge hardware and connectivity constraints. You can exceed this number depending on your hardware capabilities. For more capacity, deploy multiple Edge instances or, starting with version 4.0, cluster Edge nodes for high availability.</p>',
			},
			{
				id: 'edge-addon-payg-instances-included',
				question: 'How many edge instances are included in Edge Computing add-on?',
				answer: '<p>The number of included Edge instances depends on your subscription plan. Additional instances can be purchased separately. Check your plan details or <a target="_blank" href="/contact-us/">contact us</a> for specifics.</p>',
			},
			{
				id: 'edge-addon-payg-inclusions',
				question: "What's included in the Edge Computing add-on price?",
				answer: '<p>The Edge add-on includes: software license, software updates (duration varies by license type), and support level based on your ThingsBoard PE plan. Hardware and infrastructure are not included — you provide your own edge hardware.</p>',
			},
			{
				id: 'edge-addon-payg-activate-cancel',
				question: 'How to activate or cancel Edge Computing add-on license?',
				answer: '<p>To activate your Edge Computing add-on, log in to the License Portal and follow this path:</p>\n<p><b>ThingsBoard license details &rarr; Manage Add-ons &rarr; Enable the checkbox for Edge Computing add-on &rarr; Save the changes.</b></p>\n<p>If you cancel your license before the billing period ends, the funds for the remaining period will stay on your balance but will not be refundable.</p>',
			},
			{
				id: 'edge-addon-payg-hardware',
				question: 'What hardware is required to run Edge Instance?',
				answer: '<p>Edge runs on any machine meeting these minimums:</p>\n<ul>\n<li><b>Light workloads:</b> 1GB+ RAM, 2 CPU cores, 10GB storage (e.g., Raspberry Pi).</li>\n<li><b>Heavy use:</b> 4GB+ RAM, 4+ CPU cores, 20GB+ storage (e.g., Industrial PCs, Edge servers, VMs).</li>\n</ul>',
			},
			{
				id: 'edge-addon-payg-billing',
				question: 'How is Edge Computing add-on billed?',
				answer: '<p>Edge Computing add-on is billed monthly, along with your main ThingsBoard subscription. The price depends on your plan plus any additional instances you purchase.</p>',
			},
			{
				id: 'edge-addon-payg-protocols',
				question: 'I have devices that use proprietary protocols. Can Edge connect to them?',
				answer: '<p>Yes. Edge natively supports MQTT, CoAP, HTTP, SNMP, and LwM2M. For other protocols, use:</p>\n<ul>\n<li>The <b>ThingsBoard IoT Gateway</b> to bridge legacy devices. The Gateway supports Modbus, BACnet, OPC-UA, and more, and is available at no extra cost.</li>\n<li>The <b>Platform Integrations</b> to connect via OPC-UA, ChirpStack, and 30+ other systems using the converter library.</li>\n</ul>',
			},
			{
				id: 'edge-addon-payg-ui-customization',
				question: 'Is UI customization available out of the box?',
				answer: '<p>The Edge Computing add-on includes UI customization out of the box, such as white-labeling (custom branding throughout the interface) and custom menu configuration — both available without code changes.</p>',
			},
			{
				id: 'edge-addon-payg-security',
				question: 'Is my Edge instance secure?',
				answer: '<p>Security depends on your infrastructure setup, but Edge provides built-in authentication, role-based access control, and encryption.</p>',
			},
			{
				id: 'edge-addon-payg-updates',
				question: 'Are software updates included?',
				answer: '<p>Yes. Software updates are included with active Edge licenses:</p>\n<ul>\n<li><b>Subscription licenses:</b> Receive updates throughout the subscription period.</li>\n<li><b>Perpetual licenses:</b> Include 1 year of updates, renewable annually.</li>\n</ul>',
			},
			{
				id: 'edge-addon-payg-expiration',
				question: 'What happens when my Edge subscription expires?',
				answer: '<p>Your Edge instance will stop functioning when the license expires. You\'ll need to renew your Edge license to continue using the instance.</p>\n<p>For <b>perpetual licenses</b>, only updates and support expire — the Edge instance continues running.</p>',
			},
			{
				id: 'edge-addon-payg-upgrade-ce-pe',
				question: 'Can I upgrade from Edge CE to Edge PE?',
				answer: '<p>Yes, but you\'ll need to upgrade your entire system: upgrade your ThingsBoard Server from CE to PE, purchase the Edge Computing add-on, and reinstall Edge using PE packages. Please <a target="_blank" href="/contact-us/">contact us</a> for migration assistance.</p>',
			},
			{
				id: 'edge-addon-payg-separate-license',
				question: 'Do I need a separate license to use Edge Computing add-on?',
				answer: '<p>No. Once you have an active ThingsBoard PE license (Cloud, Private Cloud, or self-managed), you can purchase and activate the Edge Computing add-on directly. The add-on itself serves as the license for your Edge instances. No additional licensing is required.</p>',
			},
		],
	},
	{
		id: 'trendz',
		label: 'Trendz',
		items: [
			{
				id: 'trendz-payg-what-is',
				question: 'What is Trendz?',
				answer: '<p>Trendz is an add-on for advanced IoT Data Analytics. It allows you to analyze, detect anomalies, and predict outcomes — all in one unified analytics workspace that works seamlessly with ThingsBoard. You can check pricing in the <a target="_blank" href="/pricing/?section=thingsboard-pe-options&product=thingsboard-pe&solution=pe-perpetual&calculatorPayg">Plan Calculator</a>.</p>',
			},
			{
				id: 'trendz-payg-pricing-plans',
				question: 'What pricing plans does Trendz offer?',
				answer: '<p>Trendz pricing depends on your ThingsBoard model. You can check the relevant pricing in the <a target="_blank" href="/pricing/?section=thingsboard-pe-options&product=thingsboard-pe&solution=pe-perpetual&calculatorPayg">Plan Calculator</a> on this page.</p>',
			},
			{
				id: 'trendz-payg-activate-cancel',
				question: 'How to activate or cancel Trendz license?',
				answer: '<p>To activate your Trendz license, log in to the License Portal and follow this path:</p>\n<p><b>ThingsBoard license details &rarr; Manage Add-ons &rarr; Enable the checkbox for Trendz &rarr; Save the changes.</b></p>\n<p>If you cancel your license before the billing period ends, the funds for the remaining period will stay on your balance but will not be refundable.</p>',
			},
			{
				id: 'trendz-payg-additional-fees',
				question: 'Is there an additional payment for the software use besides the license fee?',
				answer: '<p>No, we do not charge extra unless you want an additional service that we offer, such as:</p>\n<ul>\n<li>Professional support</li>\n<li>Custom development and consulting</li>\n<li>Training</li>\n<li>Managed services</li>\n</ul>',
			},
			{
				id: 'trendz-payg-pe-vs-ce',
				question: 'Does Trendz work with both ThingsBoard PE and CE?',
				answer: '<p>No, Trendz can be integrated with ThingsBoard Professional Edition (PE), but it is not available in ThingsBoard Community Edition (CE).</p>',
			},
			{
				id: 'trendz-payg-license-types',
				question: 'Can ThingsBoard and Trendz Analytics have different license types?',
				answer: '<p>No, ThingsBoard and Trendz Analytics must have the same license type to function correctly. Trendz Analytics automatically detects all devices and assets from your ThingsBoard instance, along with their relationships.</p>\n<p>It analyzes all entities without the option to select specific ones. You can\'t select specific devices or assets; all entities will be analyzed and added to the \'business entity\' column.</p>',
			},
			{
				id: 'trendz-payg-standalone',
				question: 'Can I use Trendz without ThingsBoard?',
				answer: '<p>No, you cannot use Trendz without ThingsBoard. Trendz automatically detects and analyzes all entities from your ThingsBoard instance. Without ThingsBoard, Trendz has no data source to work with, making it incompatible for use on its own.</p>',
			},
			{
				id: 'trendz-payg-white-labeling',
				question: 'Is white labeling available out of the box?',
				answer: '<p>White labeling functionality is available starting from the <b>Pilot</b> subscription.</p>',
			},
			{
				id: 'trendz-payg-free-trial',
				question: 'Do you offer a free trial for Trendz?',
				answer: '<p>ThingsBoard Maker includes Trendz for free. If you need a free trial for other subscriptions, <a target="_blank" href="/contact-us/">Contact us</a> for details.</p>',
			},
			{
				id: 'trendz-payg-support-types',
				question: 'What support is included in my plan?',
				answer: '<p>The <b>Maker</b> and <b>Prototype</b> subscriptions include Community-level support. Starting from the <b>Startup</b> subscription, customers gain access to the ThingsBoard Support Portal for direct communication with the support team.</p>\n<p><i>Community support is a free initiative provided by the Trendz team and other contributors as a voluntary effort. While our engineers often assist with community requests during their free time, this support comes with no formal obligation from the Trendz team. We highly encourage users to consult the documentation for guidance.</i></p>',
			},
			{
				id: 'trendz-payg-server-location',
				question: 'Which server should Trendz Analytics be installed on?',
				answer: '<p>Trendz can be installed on the same server as your ThingsBoard instance or on a separate server, depending on your preferences and infrastructure.</p>',
			},
			{
				id: 'trendz-payg-backup',
				question: 'Can I back up my Trendz instance?',
				answer: '<p>Yes, backups depend on your database and storage setup.</p>',
			},
			{
				id: 'trendz-payg-security',
				question: 'Is my Trendz instance secure?',
				answer: '<p>Security depends on your infrastructure setup, but Trendz provides built-in authentication, role-based access control, and encryption.</p>',
			},
			{
				id: 'trendz-payg-installation-help',
				question: 'How can I get help with installation and setup?',
				answer: '<p>If your subscription plan includes basic support and you have access to the Support Portal, the Trendz support team can assist with system deployment as part of basic support. However, this applies only if you follow recommended installation methods and architecture. Custom installation scripts or non-recommended deployment scenarios are not covered under basic support.</p>\n<p>If your subscription plan does not include basic support, we recommend using our documentation, tutorials, and optional professional services. To discuss options, please <a target="_blank" href="/contact-us/">contact us</a>.</p>',
			},
		],
	},
];

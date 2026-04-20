import type { FaqCategory } from '../types';

export const tbCloudFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'tb-cloud-definition',
				question: 'What is ThingsBoard Cloud?',
				answer: '<p>ThingsBoard Cloud is a fully managed, scalable, and fault-tolerant platform for your IoT applications.</p>',
			},
			{
				id: 'tb-cloud-pricing-plans',
				question: 'What pricing plans does ThingsBoard Cloud offer?',
				answer: '<p>ThingsBoard Cloud offers flexible monthly subscription plans, with tiers based on the number of devices and the volume of messages they generate. We support 5 predefined plans to cater to different needs. The beginner plan includes up to 5 devices and 10 million data points. For more details, visit the ThingsBoard Cloud <a target="_blank" href="/pricing/?product=thingsboard-cloud">pricing</a> page.</p>',
			},
			{
				id: 'tb-cloud-pricing-structure',
				question: 'How is ThingsBoard Cloud pricing structured?',
				answer: '<p>Pricing is based on the number of connected devices and the volume of messages they generate. Each plan has a fixed monthly fee, with the option to purchase additional entity packs and API call packs. In this case, the total monthly cost consists of the base fee for the selected plan plus additional charges for extra features. More details are available on the <a target="_blank" href="/docs/paas/reference/subscriptions/">subscription plans</a> page.</p>',
			},
			{
				id: 'tb-cloud-api-rate-limits',
				question: 'Are there any API or rate limits?',
				answer: '<p>Yes, each plan includes specific API and rate limits. If needed, you can extend these limits by purchasing additional API call packs. Detailed limits for each plan are available on the <a target="_blank" href="/docs/paas/reference/subscriptions/">subscription plans</a> page.</p>',
			},
			{
				id: 'tb-cloud-free-trial',
				question: 'Do you offer a free trial?',
				answer: '<p>Yes, we offer a free 30-day trial to let you explore ThingsBoard Cloud before committing to a paid plan.</p>',
			},
			{
				id: 'tb-cloud-what-included-in-free-trial',
				question: 'What is included in the free trial?',
				answer: '<p>The free trial includes access to all core features and Trendz Analytics tool with limited usage of devices, messages, and storage.</p>',
			},
			{
				id: 'tb-cloud-upgrade-downgrade-plan',
				question: 'Can I upgrade or downgrade my plan at any time?',
				answer: '<p>Yes, you can change your plan at any time, and billing will be adjusted accordingly.</p>',
			},
			{
				id: 'tb-cloud-vs-on-premise-pricing',
				question: 'How does ThingsBoard Cloud pricing compare to the on-premise version?',
				answer: '<p>ThingsBoard Cloud eliminates infrastructure management costs, offering a predictable monthly fee, whereas the on-premise version requires separate hosting infrastructure and maintenance efforts.</p>',
			},
			{
				id: 'tb-cloud-vs-sm-subscription',
				question: 'What the difference between ThingsBoard Cloud and self-managed subscriptions?',
				answer: '<p>Self-managed subscription plans include only the license fees and do not provide hosting services. This means you need to deploy ThingsBoard on an external cloud platform (AWS, Azure, GCP, etc.) or a local server (on-premise). Additionally, you are responsible for managing the infrastructure and maintaining the ThingsBoard PE server.</p><p>On the other hand, ThingsBoard Cloud offers the ThingsBoard Professional Edition as a fully managed service, hosted on ThingsBoard\'s infrastructure. This eliminates the need for separate infrastructure costs and maintenance efforts.</p><p>For example, the self-managed Prototype subscription costs $99, whereas the ThingsBoard Cloud Prototype subscription is priced at $149. The price difference is due to the hosting fee included in the Cloud subscription.</p>',
			},
			{
				id: 'tb-cloud-additional-costs',
				question: 'Are there any additional costs beyond the subscription fee?',
				answer: '<p>No, all standard features are included in the subscription. However, additional services such as application configuration, integrations, or consulting may incur extra costs. In addition, if you exceed the limits of your selected plan, you can purchase extra entity packs and API call packs for an additional fee.</p>',
			},
			{
				id: 'tb-cloud-exceed-plan-limits',
				question: "What happens if I exceed my plan's limits?",
				answer: '<p>If you exceed your limits, you may need to upgrade to a higher plan or reduce your usage. You can also purchase additional entity packs and API call packs; however, extra devices can only be purchased with the Business plan. If you reach the device limit, you will need to upgrade your plan.</p>',
			},
			{
				id: 'tb-cloud-custom-plan',
				question: 'Can I create a custom plan with the ability to choose limits for devices, assets, users, etc.?',
				answer: '<p>ThingsBoard Cloud offers predefined base plans that can be further customized with additional entity packs and API call packs.</p>',
			},
			{
				id: 'tb-cloud-short-term-project',
				question: 'Can I purchase ThingsBoard Cloud for a short-term project?',
				answer: '<p>Yes, you can subscribe for a single month and cancel anytime.</p>',
			},
			{
				id: 'tb-cloud-how-cancel-supscription',
				question: 'How to cancel my subscription?',
				answer: '<p>Kindly refer to the <a target="_blank" href="/docs/paas/eu/reference/subscriptions/#cancel-subscription">subscription cancellation guide</a>.</p>',
			},
			{
				id: 'migrate-cloud-to-sm',
				question: 'How to migrate from the Cloud to a self-managed platform instance?',
				answer: '<p>We recommend using the <a target="_blank" href="/docs/user-guide/version-control/">Version control</a> feature to migrate your configurations. Telemetry data export can be achieved via REST API. Please, <a target="_blank" href="/contact-us/">contact us</a> in case migration assistence needed.</p>',
			},
			{
				id: 'tb-cloud-us-to-eu',
				question: 'I need to move from US cloud to EU. How to achieve that?',
				answer: '<p>Technically, you have to follow the same flow as for How to migrate from the Cloud to a self-service platform copy. Please, <a target="_blank" href="/contact-us/">contact us</a> in case migration assistence needed.</p>',
			},
			{
				id: 'tb-cloud-what-is-included-in-the-white-labeled-mobile-app-add-on',
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
				id: 'how-tb-cloud-billing-works',
				question: 'How does billing work for ThingsBoard Cloud?',
				answer: '<p>Billing is handled via Stripe and is charged monthly based on your selected plan. You can also pay annually with card or wire transfer. Please <a target="_blank" href="/contact-us/">contact us</a> to receive a custom invoice.</p>',
			},
			{
				id: 'tb-cloud-payment-methods',
				question: 'What payment methods do you accept?',
				answer: '<p>We accept credit and debit cards through Stripe. You can also pay annually with card or wire transfer. Please <a target="_blank" href="/contact-us/">contact us</a> to receive a custom invoice.</p>',
			},
			{
				id: 'tb-cloud-use-wire-instead-of-card',
				question: 'I cannot pay by card, may we use wire instead?',
				answer: '<p>Sure. In this case, you must reach out to our sales team via <a target="_blank" href="/contact-us/">contact us</a>. If you have ongoing communication with the account manager or success manager on our end, please refer your request to that person.</p>',
			},
			{
				id: 'tb-cloud-pay-monthly-or-annually',
				question: 'Can I pay monthly or annually?',
				answer: '<p>We currently offer only a monthly subscription with automatic payments via Stripe. For annual payments, please <a target="_blank" href="/contact-us/">contact</a> our team to arrange a wire transfer invoice.</p>',
			},
			{
				id: 'tb-cloud-volueme-discounts',
				question: 'Do you offer volume discounts for large deployments?',
				answer: '<p>We offer Private Cloud plans for large-scale deployments with 10% discounts for annual payments; <a target="_blank" href="/contact-us/">contact us</a> for details.</p>',
			},
			{
				id: 'tb-cloud-billing-history-invoices',
				question: 'How do I view my billing history and invoices?',
				answer: '<p>You can access invoices and payment history via your ThingsBoard Cloud account dashboard.</p>',
			},
			{
				id: 'tb-cloud-payment-fails',
				question: 'What happens if my payment fails?',
				answer: '<p>If a payment fails, Stripe will retry the charge. If unresolved, your account may be suspended until payment is completed.</p>',
			},
			{
				id: 'tb-cloud-hidden-fees',
				question: 'Are there any hidden fees?',
				answer: '<p>No, there are no hidden fees—pricing is transparent and includes all standard features.</p>',
			},
			{
				id: 'tb-cloud-charge-for-data-transfer-api-calls-msg-processing',
				question: 'Do you charge for data transfer, API calls, or message processing?',
				answer: '<p>Each plan includes predefined usage limits that you can find <a target="_blank" href="/docs/paas/reference/subscriptions/">on the subscription plans page</a>. You can also purchase additional entity and API call packs if required.</p>',
			},
			{
				id: 'tb-cloud-custom-plan-billing',
				question: 'Can I create a custom plan with the ability to choose limits for devices, assets, users, etc.?',
				answer: '<p>ThingsBoard Cloud offers predefined base plans that can be further customized with additional entity packs and API call packs.</p>',
			},
			{
				id: 'tb-cloud-refund',
				question: 'Can I get a refund if I cancel my subscription?',
				answer: '<p>ThingsBoard Cloud does not offer refunds for unused time if you cancel before the billing cycle ends.</p>',
			},
			{
				id: 'tb-cloud-proration',
				question: 'How does proration work when upgrading or downgrading my plan?',
				answer: '<p>When you change plans, Stripe automatically calculates the prorated charge based on your usage.</p>',
			},
			{
				id: 'tb-cloud-how-to-bill-my-customers',
				question: 'How to bill my customers on Cloud?',
				answer: '<p>Currently, ThingsBoard Cloud does not provide a built-in billing module to charge end customers. However, you can create custom dashboards with backend integration between ThingsBoard and the payment system of your choice to set up billing for your application. If you would like our assistance with setting up billing, please <a target="_blank" href="/contact-us/">contact us</a>, and we\'ll be happy to propose such a configuration as an additional service.</p>',
			},
		],
	},
	{
		id: 'usageAndLimits',
		label: 'Usage & Limits',
		items: [
			{
				id: 'tb-cloud-device-msg-data-storage-limits-for-plans',
				question: 'What are the device, message, and data storage limits for each plan?',
				answer: '<p>Limits vary by plan; details can be found on our plans definition <a target="_blank" href="/docs/paas/reference/subscriptions/">page</a>.</p>',
			},
			{
				id: 'tb-cloud-device-usage-calculation',
				question: 'How is device usage calculated?',
				answer: '<p>Device usage is determined by the number of device entities created within your account.</p>',
			},
			{
				id: 'tb-cloud-charge-for-inactive-devices',
				question: 'Do you charge for inactive devices?',
				answer: '<p>Yes, ThingsBoard Cloud charges for all created device entities, whether active or inactive, since telemetry and attribute data for inactive devices are also stored.</p>',
			},
			{
				id: 'tb-cloud-handle-overages',
				question: 'How does ThingsBoard Cloud handle overages?',
				answer: '<p>If you exceed your limits, you may need to upgrade to a higher plan or purchase additional entity and API call packs.</p>',
			},
			{
				id: 'tb-cloud-increase-resource-limits',
				question: 'Can I increase my resource limits if needed?',
				answer: '<p>Yes, you can upgrade your plan at any time to increase your limits, or you can purchase additional entity and API call packs as needed.</p>',
			},
			{
				id: 'tb-cloud-white-labeling',
				question: 'Is white labeling available out of the box?',
				answer: '<p>Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.</p>',
			},
			{
				id: 'tb-cloud-migration-to-sm-support',
				question: 'What support options are available for migrating to a self-managed system instead of switching to the Enterprise plan?',
				answer: '<p>You can perform the migration on your own using the Version Control feature to transfer your configurations. Telemetry data can be exported via the REST API. Alternatively, the ThingsBoard team can provide additional migration assistance. Please <a target="_blank" href="/contact-us/">contact us</a> for more details.</p>',
			},
			{
				id: 'tb-cloud-telemetry-storage-billing',
				question: 'How is telemetry data storage billed?',
				answer: '<p>Storage is included in your plan, but exceeding the limits may require upgrading your subscription or purchasing an additional storage pack. Storage limits vary by plan, you may see details <a target="_blank" href="/docs/paas/reference/subscriptions/">on the subscription plans page</a>.</p>',
			},
			{
				id: 'tb-cloud-dashboard-costs',
				question: 'Are there additional costs for dashboards and visualization?',
				answer: '<p>No, dashboards are included in all plans.</p>',
			},
			{
				id: 'tb-cloud-api-charges',
				question: 'Do you charge for API requests?',
				answer: '<p>API usage is included in your plan, but rate limits apply based on your selected tier. If needed, you can purchase additional API call packs to extend these limits.</p>',
			},
			{
				id: 'tb-cloud-api-limits-exceed',
				question: "What happens if I exceed my plan's API limits?",
				answer: '<p>API access may be throttled until the next billing cycle, or you can upgrade to a higher plan. Alternatively, you can purchase additional API call packs to extend your access.</p>',
			},
			{
				id: 'tb-cloud-users-limits-per-acc',
				question: 'Is there a limit on the number of users per account?',
				answer: '<p>Each plan has a predefined number of users. Limits vary by plan; details can be found on our <a target="_blank" href="/docs/paas/reference/subscriptions/">plans definition page</a>. If needed, you can purchase additional user packs to increase the number of users.</p>',
			},
			{
				id: 'tb-cloud-domain-certificate',
				question: 'Where can I put a domain certificate?',
				answer: '<p>ThingsBoard automatically provisions certificates for your domain name using Let\'s Encrypt. Refer to the <a target="_blank" href="/docs/paas/user-guide/security/domains/">domain configuration guide</a>. Custom certificate provisioning is available exclusively for Enterprise Cloud subscribers upon request.</p>',
			},
			{
				id: 'tb-cloud-tenant-uptime-tracking',
				question: 'How can I track the uptime of my tenant?',
				answer: '<p>The status page is in progress. While we continuously monitor system performance and strive to maintain SLA, our team remains dedicated to delivering high availability and reliability. Updates regarding service status will be available as we develop the status page further.</p>',
			},
		],
	},
	{
		id: 'securityAndCompliance',
		label: 'Security & Compliance',
		items: [
			{
				id: 'tb-cloud-data-security',
				question: 'How is my data secured in ThingsBoard Cloud?',
				answer: '<p>We use encryption, access controls, and best security practices to protect your data.</p>',
			},
			{
				id: 'tb-cloud-iso-compliance',
				question: 'Are you ISO compliant?',
				answer: '<p>The ThingsBoard Cloud is hosted in an IaaS asset compliant with multiple standards, including SOC II, and ISO 27001.</p>',
			},
			{
				id: 'tb-cloud-data-storage-region',
				question: 'Where is my data stored, and can I choose the region?',
				answer: '<p>Your data is stored in either North America or the EU, depending on the cloud region (US or European) you choose. With the Enterprise subscription, you can choose any region or specific country for data storage.</p>',
			},
			{
				id: 'tb-cloud-compliance-costs',
				question: 'Are there additional costs for compliance-related features?',
				answer: '<p>No, security and compliance features are included in all plans.</p>',
			},
			{
				id: 'tb-cloud-multi-tenancy',
				question: 'Do you support multi-tenancy in ThingsBoard Cloud?',
				answer: '<p>Yes, ThingsBoard Cloud supports multi-tenancy, with each tenant requiring its own subscription. Within a tenant, a customer hierarchy can be established, allowing tenant administrators to manage multiple customers under a single subscription. This structure provides sufficient flexibility and access control for most use cases, ensuring a well-organized and efficient management model. ThingsBoard Enterprise subscription offers multi-tenancy within a single plan.</p>',
			},
			{
				id: 'tb-cloud-data-export',
				question: 'Can I export my data at any time?',
				answer: '<p>Yes, you can export data via APIs or the ThingsBoard dashboard.</p>',
			},
			{
				id: 'tb-cloud-data-retention',
				question: 'What happens to my data if I cancel my subscription?',
				answer: '<p>Your data will be retained for a short period before being permanently deleted.</p>',
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'tb-cloud-free-trial-start',
				question: 'How do I start a free trial?',
				answer: '<p>Simply sign up on our website—no credit card required (<a target="_blank" href="https://thingsboard.cloud/signup">North America</a> or <a target="_blank" href="https://eu.thingsboard.cloud/signup">EU</a>).</p>',
			},
			{
				id: 'tb-cloud-free-trial-end',
				question: 'What happens when my free trial ends?',
				answer: '<p>Once your free trial ends, you will need to add billing details so the system can automatically charge you for the new monthly renewal period after the initial free month expires.</p>',
			},
			{
				id: 'tb-cloud-trial-to-paid',
				question: 'Can I switch from a free trial to a paid plan without losing my data?',
				answer: '<p>Yes, all your data and configurations remain intact when upgrading.</p>',
			},
			{
				id: 'tb-cloud-subscription-cancel',
				question: 'How to cancel my subscription?',
				answer: '<p>Kindly refer to the <a target="_blank" href="/docs/paas/eu/reference/subscriptions/#cancel-subscription">subscription cancellation guide</a>.</p>',
			},
			{
				id: 'tb-cloud-subscription-cancel-impact',
				question: 'What happens if I cancel my subscription before the billing period ends?',
				answer: '<p>Canceling your subscription before the end of the billing cycle will result in the loss of funds allocated for the unused period.</p>',
			},
			{
				id: 'tb-cloud-refunds',
				question: 'Do you offer refunds for unused subscription time?',
				answer: '<p>No, refunds are not provided for mid-cycle cancellations.</p>',
			},
		],
	},
	{
		id: 'supportAndAssistance',
		label: 'Support & Assistance',
		items: [
			{
				id: 'tb-cloud-support-included',
				question: 'What support is included in my plan?',
				answer: '<p>All paid subscriptions provide access to the ThingsBoard Support Portal, allowing customers to submit support tickets and communicate directly with the support team. Startup and Business plans also include priority support.</p>',
			},
			{
				id: 'tb-cloud-support-24-7',
				question: 'Do you offer 24/7 customer support?',
				answer: '<p>Yes, we do provide 24/7 support. If this is what you\'re looking for, please <a target="_blank" href="/contact-us/">contact us</a> for a more detailed discussion about your specific needs.</p>',
			},
			{
				id: 'tb-cloud-support-billing',
				question: 'How can I contact ThingsBoard support for billing-related issues?',
				answer: '<p>You can use the <a target="_blank" href="/contact-us/">contact us</a> form and select the "Other" topic. Our account managers will assist you with any billing-related issues.</p>',
			},
			{
				id: 'tb-cloud-knowledge-base',
				question: 'Is there a knowledge base or self-service support portal?',
				answer: '<p>All of our <a target="_blank" href="/docs/paas/">documentation</a> is available on our website, with no hidden information. Additionally, you can use our Github issues for community support.</p>',
			},
			{
				id: 'tb-cloud-priority-support',
				question: 'Can I get priority support with my plan?',
				answer: '<p>Priority support is included with the Startup and Business plans.</p>',
			},
			{
				id: 'tb-cloud-support-response-times',
				question: 'What response times can I expect for support tickets?',
				answer: '<p>Response times vary by plan; Private Cloud customers receive better SLAs.</p>',
			},
			{
				id: 'tb-cloud-support-development-services',
				question: 'Can you provide an IoT development service tailored to my specific needs?',
				answer: '<p>Yes, we offer custom <a target="_blank" href="/services/development-services/">IoT development services</a> designed to match your exact requirements. Whether you need a full-featured IoT platform, scalable architecture, or specific integrations, our IoT development team can help you accelerate time-to-market and reduce internal workload while ensuring long-term maintainability.</p>',
			},
		],
	},
	{
		id: 'trendz',
		label: 'Trendz',
		items: [
			{
				id: 'trendz-what-is',
				question: 'What is Trendz?',
				answer: '<p>Trendz is an add-on for advanced IoT Data Analytics. It allows you to analyze, detect anomalies, and predict outcomes — all in one unified analytics workspace that works seamlessly with ThingsBoard. You can check pricing in the Plan calculator.</p>',
			},
			{
				id: 'trendz-pricing-plans',
				question: 'What pricing plans does Trendz offer?',
				answer: '<p>Trendz pricing depends on your ThingsBoard model. You can check the relevant pricing in the Plan Calculator on this page.</p>',
			},
			{
				id: 'trendz-additional-costs',
				question: 'Are there any additional costs beyond the subscription fee?',
				answer: '<p>No, all standard features are included in the subscription. However, additional services like professional support may incur extra costs.</p>',
			},
			{
				id: 'trendz-license-compatibility',
				question: 'Can ThingsBoard and Trendz Analytics have different license types?',
				answer: '<p>No, ThingsBoard and Trendz Analytics must have the same license type to function correctly. Trendz Analytics automatically detects all devices and assets from your ThingsBoard instance, along with their relationships.</p><p>It analyzes all entities without the option to select specific ones; all entities will be analyzed and added to the \'business entity\' column.</p>',
			},
			{
				id: 'trendz-standalone-usage',
				question: 'Can I use Trendz without ThingsBoard?',
				answer: '<p>No, you cannot use Trendz without ThingsBoard. Trendz automatically detects and analyzes all entities from your ThingsBoard instance. Without ThingsBoard, Trendz has no data source to work with, making it incompatible for use on its own.</p>',
			},
			{
				id: 'trendz-activate-cancel',
				question: 'How to activate or cancel Trendz subscription?',
				answer: '<p>To activate your Trendz license, follow this path:</p><p><b>Billing page &rarr; ThingsBoard license details &rarr; Manage Add-ons &rarr; Enable the checkbox for Trendz &rarr; Save the changes.</b></p><p>If you cancel your subscription before the billing period ends, the funds for the remaining period will stay on your balance but will not be refundable.</p>',
			},
			{
				id: 'trendz-white-labeling',
				question: 'Is white labeling available out of the box?',
				answer: '<p>White labeling functionality is available starting from the <b>Pilot</b> subscription.</p>',
			},
			{
				id: 'trendz-free-trial',
				question: 'Do you offer a free trial for Trendz?',
				answer: '<p>ThingsBoard Public Cloud Free plan includes Trendz for free. If you need a free trial for other subscriptions, please <a target="_blank" href="/contact-us/">Contact us</a> for details.</p>',
			},
			{
				id: 'trendz-support-included',
				question: 'What support is included in my plan?',
				answer: '<p>The <b>Free</b> and <b>Prototype</b> subscriptions include Community-level support. Starting from the <b>Startup</b> subscription, customers gain access to the ThingsBoard Support Portal for direct communication with the support team.</p><p><i>Note: Community support is a free initiative provided by the Trendz team and other contributors as a voluntary effort. While our engineers often assist with community requests during their free time, this support comes with no formal obligation. We highly encourage users to consult the documentation for guidance.</i></p>',
			},
		],
	},
	{
		id: 'edge',
		label: 'Edge',
		items: [
			{
				id: 'edge-addon-cloud-what-is',
				question: 'What is Edge Computing add-on?',
				answer: '<p>The Edge Computing add-on enables local data processing at remote sites through ThingsBoard Edge PE instances. Edge runs independently with offline capability and automatically syncs with your central ThingsBoard PE Server when connectivity returns.</p><p>It is available for all ThingsBoard PE deployments: Cloud, Private Cloud, and self-managed.</p>',
			},
			{
				id: 'edge-addon-cloud-pricing-plans',
				question: 'What pricing plans does Edge Computing add-on offer?',
				answer: '<p>Edge Computing add-on pricing depends on your ThingsBoard model. Check the relevant pricing in the Plan Calculator.</p>',
			},
			{
				id: 'edge-addon-cloud-compatibility',
				question: 'Does Edge work with both ThingsBoard PE and CE?',
				answer: '<p>Edge edition must match your ThingsBoard Server edition:</p><ul><li><b>Edge PE</b> connects to ThingsBoard PE Server.</li><li><b>Edge CE</b> connects to ThingsBoard CE Server.</li></ul><p>Note: Community Editions are free and open-source.</p>',
			},
			{
				id: 'edge-addon-cloud-standalone',
				question: 'Can I use Edge without ThingsBoard?',
				answer: '<p>No, Edge PE requires a ThingsBoard PE Server (Cloud, Private Cloud, or self-managed) to provision devices, sync configurations, and exchange data. However, it processes data locally and can operate offline when the connection drops.</p>',
			},
			{
				id: 'edge-addon-cloud-free-trial',
				question: 'Do you offer a free trial for Edge?',
				answer: '<p>You can start with the <b>Free</b> plan (limited to 5 devices) with the Edge Computing add-on permanently enabled. This lets you explore Edge PE features at no cost.</p><p>For larger deployments, you can upgrade to paid plans with higher device limits and additional features.</p>',
			},
			{
				id: 'edge-addon-cloud-capacity',
				question: 'Can Edge handle my device volume?',
				answer: '<p>We recommend up to 1,000 devices per Edge instance based on typical edge hardware and connectivity constraints. You can exceed this number depending on your hardware capabilities. For more capacity, deploy multiple Edge instances or, starting with version 4.0, cluster Edge nodes for high availability.</p>',
			},
			{
				id: 'edge-addon-cloud-instances-included',
				question: 'How many edge instances are included in Edge Computing add-on?',
				answer: '<p>The number of included Edge instances depends on your subscription plan. Additional instances can be purchased separately. Check your plan details or <a target="_blank" href="/contact-us/">contact us</a> for specifics.</p>',
			},
			{
				id: 'edge-addon-cloud-inclusions',
				question: "What's included in the Edge Computing add-on price?",
				answer: '<p>The Edge add-on includes: software license, software updates (duration varies by license type), and support level based on your ThingsBoard PE plan. Hardware and infrastructure are not included — you provide your own edge hardware.</p>',
			},
			{
				id: 'edge-addon-cloud-activate-cancel',
				question: 'How to activate or cancel Edge Computing add-on license?',
				answer: '<p>To activate your Edge Computing add-on, log in to the License Portal and follow this path:</p><p><b>ThingsBoard license details &rarr; Manage Add-ons &rarr; Enable the checkbox for Edge Computing add-on &rarr; Save the changes.</b></p><p>If you cancel your license before the billing period ends, the funds for the remaining period will stay on your balance but will not be refundable.</p>',
			},
			{
				id: 'edge-addon-cloud-hardware',
				question: 'What hardware is required to run Edge Instance?',
				answer: '<p>Edge runs on any machine meeting these minimums:</p><ul><li><b>Light workloads:</b> 1GB+ RAM, 2 CPU cores, 10GB storage (e.g., Raspberry Pi).</li><li><b>Heavy use:</b> 4GB+ RAM, 4+ CPU cores, 20GB+ storage (e.g., Industrial PCs, Edge servers, VMs).</li></ul>',
			},
			{
				id: 'edge-addon-cloud-billing',
				question: 'How is Edge Computing add-on billed?',
				answer: '<p>Edge Computing add-on is billed monthly, along with your main ThingsBoard subscription. The price depends on your plan plus any additional instances you purchase.</p>',
			},
			{
				id: 'edge-addon-cloud-protocols',
				question: 'I have devices that use proprietary protocols. Can Edge connect to them?',
				answer: '<p>Yes. Edge natively supports MQTT, CoAP, HTTP, SNMP, and LwM2M. For other protocols, use:</p><ul><li>The <b>ThingsBoard IoT Gateway</b> to bridge legacy devices. The Gateway supports Modbus, BACnet, OPC-UA, and more, and is available at no extra cost.</li><li>The <b>Platform Integrations</b> to connect via OPC-UA, ChirpStack, and 30+ other systems using the converter library.</li></ul>',
			},
			{
				id: 'edge-addon-cloud-ui-customization',
				question: 'Is UI customization available out of the box?',
				answer: '<p>The Edge Computing add-on includes UI customization out of the box, such as white-labeling (custom branding throughout the interface) and custom menu configuration — both available without code changes.</p>',
			},
			{
				id: 'edge-addon-cloud-security',
				question: 'Is my Edge instance secure?',
				answer: '<p>Security depends on your infrastructure setup, but Edge provides built-in authentication, role-based access control, and encryption.</p>',
			},
			{
				id: 'edge-addon-cloud-updates',
				question: 'Are software updates included?',
				answer: '<p>Yes. Software updates are included with active Edge licenses:</p><ul><li><b>Subscription licenses:</b> Receive updates throughout the subscription period.</li><li><b>Perpetual licenses:</b> Include 1 year of updates, renewable annually.</li></ul>',
			},
			{
				id: 'edge-addon-cloud-expiration',
				question: 'What happens when my Edge subscription expires?',
				answer: '<p>Your Edge instance will stop functioning when the license expires. You\'ll need to renew your Edge license to continue using the instance.</p><p>For <b>perpetual licenses</b>, only updates and support expire — the Edge instance continues running.</p>',
			},
			{
				id: 'edge-addon-cloud-upgrade-ce-pe',
				question: 'Can I upgrade from Edge CE to Edge PE?',
				answer: '<p>Yes, but you\'ll need to upgrade your entire system: upgrade your ThingsBoard Server from CE to PE, purchase the Edge Computing add-on, and reinstall Edge using PE packages. Please <a target="_blank" href="/contact-us/">contact us</a> for migration assistance.</p>',
			},
			{
				id: 'edge-addon-cloud-separate-license',
				question: 'Do I need a separate license to use Edge Computing add-on?',
				answer: '<p>No. Once you have an active ThingsBoard PE license (Cloud, Private Cloud, or self-managed), you can purchase and activate the Edge Computing add-on directly. The add-on itself serves as the license for your Edge instances. No additional licensing is required.</p>',
			},
		],
	},
];

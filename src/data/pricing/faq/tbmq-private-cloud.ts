import type { FaqCategory } from '../types';

export const tbmqPrivateCloudFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'tbmq-stand-for',
				question: 'What does \u201cTBMQ Private Cloud\u201d stand for?',
				answer: '<p>TBMQ Private Cloud is a fully managed, isolated deployment of the TBMQ Professional Edition that our team provisions and operates for you. We handle the infrastructure setup, apply security patches, monitor your environment 24\u00d77, run automated backups, and provide an SLA-backed uptime guarantee (99.9\u202f%\u201399.99\u202f%, depending on subscription). Your engineering team can stay focused on developing IoT solutions and business logic without worrying about maintaining and scaling the MQTT infrastructure.</p>',
			},
			{
				id: 'tbmq-diff-tb',
				question: 'What is the difference between TBMQ and ThingsBoard?',
				answer: '<p>TBMQ and ThingsBoard serve distinct purposes for customers:</p><ul><li>TBMQ is a high-performance, fault-tolerant MQTT broker designed solely for ingesting, routing, and distributing MQTT messages at massive scale. It focuses on efficient topic multiplexing into Kafka topics, enabling reliable, low-latency messaging for millions of devices.</li><li>ThingsBoard is an end-to-end IoT platform that includes device management, data collection, storage, visualization, rule engines, and dashboards. It integrates various protocols (MQTT, HTTP, CoAP) and offers user-friendly UI components, customizable workflows, and analytics.</li></ul><p>In practice, you might deploy TBMQ when you need a dedicated, scalable message pipeline\u2014especially if you already use Kafka. ThingsBoard, on the other hand, provides a complete solution for IoT applications, enabling customers to onboard devices, process telemetry, and build dashboards without managing separate messaging infrastructure.</p>',
			},
			{
				id: 'tbmq-compare-to-community-pe',
				question: 'How does TBMQ Private Cloud compare to TBMQ Community Edition or TBMQ Professional Edition?',
				answer: '<ul><li>TBMQ Community Edition is the open-source, highly scalable, and fault-tolerant MQTT broker. It is fully compliant with the MQTT protocol\u2014suitable for custom setups where you manage everything yourself.</li><li>TBMQ Professional Edition (PE) is the fully licensed, commercial version of the TBMQ broker, engineered for massive scalability, high performance, and compliance. It is the right choice when you require full control over your deployment environment, seamless integration into your existing private infrastructure or cloud, and a flexible OPEX or CAPEX purchasing model.</li><li>TBMQ Private Cloud is a fully managed, production-grade deployment of TBMQ PE, isolated per customer, with 24\u00d77 monitoring, automated backups, and an SLA-backed uptime guarantee. It\u2019s the right choice when you need reliable MQTT infrastructure without managing DevOps.</li></ul>',
			},
			{
				id: 'tbmq-used-with-tb',
				question: 'Can TBMQ be used together with ThingsBoard?',
				answer: '<p>Yes, TBMQ can be used together with ThingsBoard or completely separately. TBMQ is an independent MQTT broker designed for high performance and scalability, while ThingsBoard is a full IoT platform with advanced features like dashboards, rule engine, and device management. When used together, TBMQ handles all MQTT messaging, and ThingsBoard processes, visualizes, and manages the data. However, there is no dependency between them\u2014TBMQ works perfectly on its own if you only need a reliable MQTT layer, and ThingsBoard can also run with its built-in MQTT transport.</p>',
			},
			{
				id: 'tbmq-pc-vs-sh',
				question: 'What are the benefits of Private Cloud versus self-hosting?',
				answer: '<ul><li>Zero DevOps overhead \u2013 no servers to set up, patch or monitor.</li><li>Guaranteed availability \u2013 written SLA of 99.9 \u2013 99.99\u202f%, with service-credit remedies.</li><li>Faster time-to-market \u2013 we stand up production clusters in 1-2 hours, not weeks.</li><li>Scalability \u2013 Kubernetes-based plans grow as device traffic spikes.</li><li>Predictable cost \u2013 one all-inclusive monthly fee replaces cap-ex plus staffing.</li></ul>',
			},
			{
				id: 'tbmq-uptime-calc',
				question: 'What is \u2018uptime\u2019 and how do you calculate it?',
				answer: '<p>Uptime (%) = ((Total Time \u2013 Downtime) / Total Time) \u00d7 100 <br><br></p><p>Total Time \u2013 number of minutes in the billing month.</p><p>Downtime \u2013 minutes when core broker services are unavailable for the administrator.</p><p>We measure Downtime from incident detection to full service restoration. <br><br></p><p>Excluded from Downtime:</p><ul><li>Scheduled maintenance announced \u2265 48 h in advance</li><li>Emergency security patches</li><li>Force-majeure events or upstream cloud failures (e.g., AWS region outage)</li></ul>',
			},
			{
				id: 'tbmq-deployment-options',
				question: 'What deployment options are available within Private Cloud?',
				answer: '<p>The TBMQ Private Cloud service offers a single, unified, fully managed deployment model that is isolated per customer. This service includes a base capacity of 5,000 Sessions and 1,000 messages per second Throughput, backed by a default Uptime SLA of 99.9%. If your deployment requires capacity or features beyond these base limits, you can easily purchase additional Sessions, Throughput, and add-ons (such as Network Traffic scaling) to meet your specific operational demands.</p>',
			},
			{
				id: 'tbmq-for-whom',
				question: 'Who should choose Private Cloud?',
				answer: '<p>Private Cloud ideal for companies that want to avoid investing in DevOps resources, reduce operational risk, and accelerate time to market. They are particularly beneficial for startups, SMBs, or enterprises scaling production systems who prefer to offload platform operations and upgrades to the ThingsBoard team under a clear SLA.</p>',
			},
			{
				id: 'tbmq-prerequisites',
				question: 'What are the prerequisites to get started?',
				answer: '<p>To get started with TBMQ Private Cloud, the primary prerequisite is a submission of the request form. Once your request is received, we schedule a short onboarding call with our team. This call is used to assess your specific workload and requirements, ensuring we configure the TBMQ Private Cloud deployment to perfectly align with your expected scale, capacity needs, and architectural preferences.</p>',
			},
			{
				id: 'tbmq-minimum-commitment',
				question: 'Is there a minimum commitment?',
				answer: '<p>No long-term lock-in. We simply ask for a 30-day written notice before shutdown so we can decommission resources cleanly.</p>',
			},
			{
				id: 'tbmq-data-hosted',
				question: 'Where will my data be hosted?',
				answer: '<p>During onboarding you pick the region that best fits compliance or latency needs (EU, North America, or APAC). All sites reside in ISO 27001/PCI-DSS-certified data centres.</p>',
			},
			{
				id: 'tbmq-data-gdpr',
				question: 'How can I get my data in line with GDPR requirements?',
				answer: '<p>You can request a complete encrypted database dump at any time. We generate a full PostgreSQL dump of all system-level tables and transfer it to you over a secure channel (SFTP or your own cloud bucket). Because the export is a raw DB dump, you retain 100\u202f% data fidelity and can immediately restore it in another PostgreSQL instance or transform it into any machine-readable format you need. We normally fulfill export requests within 5 business days, and\u2014in line with GDPR\u2014can also execute verified deletion of all system data within 30 days of your erase request.</p>',
			},
			{
				id: 'tbmq-pc-gdpr-compliant',
				question: 'Is your Private Cloud service GDPR-compliant?',
				answer: '<p>Yes. You remain the sole Data Controller; TBMQ acts as a Data Bridge under a standard DPA. Data never leaves the region you select, and you have the right to access, port or delete it at will.</p>',
			},
			{
				id: 'tbmq-cancel-return-data',
				question: 'If I cancel, will you return my data?',
				answer: '<p>Yes. Once we receive your cancellation notice, we prepare a full encrypted PostgreSQL/Redis/Kafka dump of all your admin data\u2014including clients, subscriptions, telemetry\u2014and deliver it to you over a secure channel (SFTP link or your own cloud bucket). You have up to 60 days after the cancellation date to download and verify the dump. After that 60-day grace period, all remaining backups and cluster data are permanently and securely deleted from our systems.</p>',
			},
			{
				id: 'tbmq-security-measurements',
				question: 'What kind of security measurements do you provide?',
				answer: '<p>Private Cloud is designed with enterprise-grade security at its core. Access to the infrastructure is limited to authorized ThingsBoard personnel only, with regular audits and monitoring in place. We follow industry best practices for patch management, vulnerability scanning, and secure software development.</p>',
			},
			{
				id: 'tbmq-upgrades-conductment',
				question: 'How often are upgrades conducted?',
				answer: '<p>All Private Cloud upgrades\u2014whether minor patches or major version releases\u2014are scheduled in coordination with the customer. This ensures full transparency, minimizes disruption, and allows your team to prepare in advance. Our team handles the entire upgrade process and provides clear communication before and after each change to maintain operational continuity and SLA compliance.</p>',
			},
		],
	},
	{
		id: 'billing',
		label: 'Billing & Payments',
		items: [
			{
				id: 'tbmq-pricing-structure',
				question: 'How is the pricing structured for Private Cloud?',
				answer: '<p>The pricing for TBMQ Private Cloud is structured around a single, transparent model based on the capacity and features you require. Every deployment includes a base capacity of 5,000 Sessions and 1,000 messages per second (msg/sec) of Throughput, backed by a 99.9% Uptime SLA. Your total monthly cost is determined by the purchased capacity beyond these base limits and any selected add-ons, such as Multi-AZ Deployment or scaling of Network Traffic capacity. If you exceed your licensed Session or Throughput capacity, this is considered an overage and requires an immediate license capacity adjustment to maintain continuous service.</p>',
			},
			{
				id: 'tbmq-annual-discount',
				question: 'Do you offer a discount for annual payments?',
				answer: '<p>Yes, we offer a 10% discount on the TBMQ Private Cloud service if you choose to pay annually upfront. The annual subscription provides cost savings and simplifies billing by consolidating all monthly capacity, instance, and add-on charges into a single yearly invoice.</p>',
			},
			{
				id: 'tbmq-payment-methods',
				question: 'What payment methods are accepted?',
				answer: '<p>We accept bank wire/ACH and credit- or debit-card payments. Card payments are processed securely via Stripe. All billing and invoicing is handled directly by the ThingsBoard Team.</p>',
			},
			{
				id: 'tbmq-monthly-fee-includes',
				question: 'What is included in the monthly subscription fee?',
				answer: '<p>The monthly subscription fee for Private Cloud covers the complete provisioning and maintenance of your dedicated environment. This includes platform licensing, system monitoring, infrastructure management, software updates, security patching, 24/7 availability monitoring, and SLA-backed support. The fee also includes a default allocation of sessions limit, storage, and message rate capacity depending on your needs.</p>',
			},
			{
				id: 'tbmq-setup-cancellation-fees',
				question: 'Are there any setup or cancellation fees?',
				answer: '<p>No. Start or stop whenever you like. We do ask for 30 days\u2019 notice before cancellation so we can export your data and decommission the cluster cleanly.</p>',
			},
			{
				id: 'tbmq-additional-costs',
				question: 'Are there any additional costs beyond the fixed monthly fee?',
				answer: '<p>In addition to the base monthly fee, you may incur additional monthly charges for Network Traffic usage that exceeds the included monthly limit. This usage is billed at the rate of $0.10 per GB.</p>',
			},
			{
				id: 'tbmq-payment-processing-fees',
				question: 'Are there any payment processing fees?',
				answer: '<p>No, we do not charge any additional processing fees for payments made via wire transfer or credit/debit card.</p>',
			},
			{
				id: 'tbmq-invoice-automation',
				question: 'Are invoices issued automatically?',
				answer: '<p>Invoices are currently generated manually and sent to you at the start of each billing month, so you have the invoice in hand before the service period begins. We\u2019re building a self-service billing portal with fully automated invoicing and expect to roll it out later this year.</p>',
			},
			{
				id: 'tbmq-invoice-taxes',
				question: 'Does your invoice include taxes?',
				answer: '<p>Invoices are issued net of tax in USD. You are responsible for any local taxes that may apply in your jurisdiction.</p>',
			},
			{
				id: 'tbmq-switch-to-annual-billing',
				question: 'Can I switch from monthly to annual billing later?',
				answer: '<p>Yes, you can switch from monthly to annual billing at any time. Simply contact the ThingsBoard team, and we will coordinate the transition, apply the discount, and adjust your invoicing accordingly from your next billing cycle.</p>',
			},
			{
				id: 'tbmq-annual-upgrade-higher-tier',
				question: 'What happens if my plan is upgraded to higher tier during an annual subscription?',
				answer: '<p>If you upgrade your Private Cloud plan during an active annual subscription, the price difference will be calculated on a monthly basis for the remainder of the subscription term. The 10% annual discount will still apply to the new plan. This ensures billing transparency and flexibility while preserving your discount, even if your needs change mid-term.</p>',
			},
			{
				id: 'tbmq-dev-qa-price',
				question: 'What is the price for extra Dev & QA Instances?',
				answer: '<p>Additional Dev & QA Instances are priced at a fixed rate of $100 per instance, per month.</p>',
			},
			{
				id: 'tbmq-sessions-price',
				question: 'What is the unit price for additional Sessions capacity?',
				answer: '<p>Sessions capacity is licensed on a flexible per-session, per-month basis. You can license any amount you require. The effective unit rate is calculated as $5.00 per 100 Sessions.</p>',
			},
			{
				id: 'tbmq-throughput-price',
				question: 'What is the unit price for additional Throughput capacity?',
				answer: '<p>Throughput capacity is licensed on a flexible per-message-per-second (msg/sec), per-month basis. You can license any amount you require. The effective unit rate is calculated as $10.00 per 100 messages per second (msg/sec).</p>',
			},
		],
	},
	{
		id: 'usageAndLimits',
		label: 'Usage & Limits',
		items: [
			{
				id: 'tbmq-session-definition',
				question: 'What exactly counts as a \u201csession\u201d?',
				answer: '<p>A session is any active connection between an MQTT client and the TBMQ broker. Each session represents a single client, uniquely identified by its client ID, and counts toward your session quota.<br><br></p><p>If a client connects and maintains an active session, it occupies one slot in the session quota. When session persistence is enabled, a disconnected client still occupies a session slot, since its session data (subscriptions, messages, etc.) is retained by the broker.<br><br></p><p>A session slot is released only when the session has either expired or been explicitly removed. This means your session quota includes both currently connected clients and any disconnected clients with persisted sessions. Only clients with fully expired or deleted sessions free up capacity for new connections.</p>',
			},
			{
				id: 'tbmq-total-msg-sec-definition',
				question: 'How is \u201cthroughput (msg/sec)\u201d defined and metered?',
				answer: '<p>Total messages per second refers to the combined number of MQTT PUBLISH packets processed by the TBMQ each second. This includes both incoming messages from publishers and outgoing messages delivered to subscribers.<br><br></p><p>For example, if 100 devices each publish 10 messages per second, that results in 1,000 incoming messages per second. If each message is delivered to 2 subscribers, the outgoing volume is 2,000 messages per second. In this case, the total messages per second will be 3,000.<br><br></p><p>Only MQTT PUBLISH packets are counted\u2014control packets like CONNECT, SUBSCRIBE, PINGREQ, etc., are excluded. This metric reflects the actual messaging throughput of your deployment and is used to ensure performance and SLA compliance.</p>',
			},
			{
				id: 'tbmq-add-ons-subscription',
				question: 'Can I add anything to the subscription?',
				answer: '<p>Yes, you can enhance your Private Cloud subscription with several optional add-ons to customize your deployment. The available add-ons are Multi-AZ Deployment, which ensures greater fault tolerance by spreading your service across multiple availability zones; Dev and QA Instances, which provide dedicated, isolated environments for testing and staging; and Network Traffic, which allows you to purchase data transfer capacity beyond the included monthly limit.</p>',
			},
			{
				id: 'tbmq-exceed-message-rate-limit',
				question: 'What happens if I exceed my sustained message-rate limit?',
				answer: '<p>The cluster tolerates brief spikes (see next answer). If sustained traffic stays above your tier\u2019s ceiling, our monitoring flags it and we\u2019ll ask you to upgrade. Plan upgrades are provisioned within three business days; remaining over-quota traffic may be throttled to protect platform stability.</p>',
			},
			{
				id: 'tbmq-burst-message-limit',
				question: 'Can I burst above the message limit and for how long?',
				answer: '<p>Yes. Short-term bursts up to 10% above the stated msgs-per-second ceiling for 5 minutes or less are absorbed automatically and carry no penalty.</p>',
			},
			{
				id: 'tbmq-monitor-usage',
				question: 'How do I monitor my current session, message, traffic, and storage usage?',
				answer: '<p>The Home dashboard contains information about the number of active and persisted sessions. The monitoring dashboard shows per-minute message rates for both incoming and outgoing MQTT traffic. Storage usage is calculated from multiple internal sources and is available upon request. We are working on making storage metrics visible directly within the platform dashboards.</p>',
			},
			{
				id: 'tbmq-undelivered-message-retention',
				question: 'How long are undelivered messages for persistent sessions retained?',
				answer: '<p>Undelivered messages for persistent sessions are retained for 1 day. After that period, they are automatically discarded.</p>',
			},
			{
				id: 'tbmq-user-admin-creation',
				question: 'How many user admins can I create?',
				answer: '<p>User accounts are unlimited. Your TBMQ Private Cloud instance is provisioned for a top-level system administrator; that administrator can create any number of additional admin users without extra charge.</p>',
			},
			{
				id: 'tbmq-backup-frequency-retention',
				question: 'How often are backups taken and how long are they kept?',
				answer: '<p>Nightly snapshots (full or incremental, depending on data churn) are stored in a separate cloud region. We retain backups for 7 days by default.</p>',
			},
			{
				id: 'tbmq-outgrow-plan-upgrade',
				question: 'If I outgrow my plan, how quickly can I upgrade and will there be downtime?',
				answer: '<p>Notify us as soon as you foresee sustained traffic growth. We provision the larger tier within three business days. Upgrades are performed live on Kubernetes; no downtime is expected, though brief reconnections (&lt;1 min) may occur when scaling nodes.</p>',
			},
			{
				id: 'tbmq-telemetry-storage-included',
				question: 'What telemetry storage is included and what data consumes it?',
				answer: '<p>TBMQ Private Cloud includes persistent storage for undelivered messages, used by Kafka (for Application clients) and Redis (for Device clients). While there is no fixed storage quota, the system enforces internal limits to ensure stability and performance.</p><p>Kafka and Redis can be both deployed with replication for durability (if add-on is enabled), which means actual disk usage is higher than the logical size of retained data. Undelivered messages are retained based on session type and expiration settings.</p><p>If storage usage grows beyond safe thresholds, the system will clean up old persistent messages. We monitor usage and can work with you to tune limits or expand capacity if needed.</p>',
			},
			{
				id: 'tbmq-message-rate-limit-importance',
				question: 'What is the message rate limit and why is it important?',
				answer: '<p>The message rate limit, also referred to as Throughput, is measured in total messages processed per second (msg/sec). This is a critical technical limit because it defines the maximum amount of telemetry data your system can reliably process without impacting performance or our Uptime SLA. The Private Cloud service includes a base limit of 1,000 total messages per second, which you can increase by purchasing additional capacity. If your usage exceeds the licensed limit, a mandatory capacity adjustment will be required to maintain service stability and SLA guarantees. Message throughput is actively monitored by the TBMQ Team.</p>',
			},
			{
				id: 'tbmq-geo-region-deployment',
				question: 'What does geo-region deployment selection include?',
				answer: '<p>Geo-region deployment selection allows you to choose the specific geographic region where your Private Cloud instance will be hosted. This ensures your data is stored and processed in a location that meets your compliance or data sovereignty requirements. During onboarding, you can select region, and our team will deploy your environment accordingly. This feature is particularly valuable for organizations subject to regional data protection regulations or those with distributed global operations.<br><br></p><p><b>For the Launch plan, region selection is limited to the following supported regions:</b><ul><li><b>North America:</b> US West, US East, Mexico;</li><li><b>Europe:</b> Ireland, Stockholm;</li><li><b>Asia:</b> Taipei, Thailand, Mumbai.</li></ul></p>',
			},
			{
				id: 'tbmq-maintenance-window-selection',
				question: 'Can I choose a specific maintenance window?',
				answer: '<p>Yes, you can. Private Cloud subscription allow customers to request and define a preferred maintenance window. This ensures any upgrades or maintenance activities are scheduled at a time that minimizes disruption to your operations. Our team coordinates with you to honor this window whenever changes are required.</p>',
			},
			{
				id: 'tbmq-additional-limits',
				question: 'Are there any additional limits?',
				answer: '<p>Yes, TBMQ Private Cloud subscription has sessions, messages, and storage limits. See subscription <a target="_blank" href="/docs/mqtt-broker/pe/subscription/">documentation</a> for more details.</p>',
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'tbmq-trial-option',
				question: 'Is there a trial option for Private Cloud?',
				answer: '<p>Trial access is available by deploying TBMQ Community Edition, which lets you explore the core MQTT features in your own environment. <br><br></p><p>For TBMQ Private Cloud, trials are not applicable due to the use of dedicated infrastructure and custom deployment.</p>',
			},
			{
				id: 'tbmq-downgrade-plan',
				question: 'Can I downgrade my plan later?',
				answer: '<p>Yes, you can reduce your licensed capacity in the TBMQ Private Cloud service if your message rate and resource usage decrease. Since we operate on a single flexible model, reducing capacity means coordinating with the TBMQ team to adjust your licensed Sessions, Throughput, and Instance count to a level that matches your current operational needs. These adjustments are coordinated to ensure service continuity and SLA compliance.</p>',
			},
			{
				id: 'tbmq-upgrade-plan',
				question: 'Can I upgrade my plan at any time?',
				answer: '<p>Upgrades are possible at any time, but they are not initiated automatically. The ThingsBoard team continuously monitors your resource usage and message throughput. If your consumption exceeds the thresholds defined for your current tier, our team will notify you and guide the process of upgrading to a higher plan. This ensures uninterrupted service and compliance with SLA guarantees. You can also request an upgrade proactively if you anticipate growth or require additional capabilities.</p>',
			},
			{
				id: 'tbmq-early-cancellation-fees',
				question: 'Are there any fees for early cancellation?',
				answer: '<p>There is no cancellation fee for Private Cloud. However, since your Private Cloud instance runs on dedicated infrastructure, we kindly ask for at least 30 days\u2019 advance notice prior to cancellation to ensure smooth resource decommissioning and service wrap-up.</p>',
			},
			{
				id: 'tbmq-cancel-return-data-tcr',
				question: 'If I cancel, will you return my data?',
				answer: '<p>Yes. Once we receive your cancellation notice, we prepare a full encrypted PostgreSQL/Redis/Kafka dump of all your admin data\u2014including clients, subscriptions, telemetry\u2014and deliver it to you over a secure channel (SFTP link or your own cloud bucket). You have up to 60 days after the cancellation date to download and verify the dump. After that 60-day grace period, all remaining backups and cluster data are permanently and securely deleted from our systems.</p>',
			},
		],
	},
	{
		id: 'addOns',
		label: 'Add-ons and Optional Features',
		items: [
			{
				id: 'tbmq-ha-services-addon',
				question: 'Are high-availability services available as an add-on?',
				answer: '<p>Yes, high-availability services are available as an optional add-on for the TBMQ Private Cloud service. This feature, known as Multi-AZ Deployment, ensures greater fault tolerance and reliability by deploying your dedicated environment across multiple availability zones and is backed by an enhanced Uptime SLA.</p>',
			},
			{
				id: 'tbmq-dev-qa-addon-reason',
				question: 'Why would I need the Dev & QA Instances add-on?',
				answer: '<p>The Dev and QA Instances add-on provides dedicated, isolated broker environments specifically for development, staging, testing, and CI/CD workflows. The primary purpose is to ensure that all testing, integration, and code changes are executed without impacting the stability, performance, or data integrity of your live Production environment.</p>',
			},
			{
				id: 'tbmq-network-traffic-addon',
				question: 'What is the Network Traffic add-on and how is it billed?',
				answer: '<p>Network Traffic refers to the total volume of data transfer, including both incoming data to the broker and outgoing data to your applications. The base Private Cloud service includes a specific allocation of network traffic (200 GB). The Network Traffic add-on allows you to extend the usage that exceeds the included allocation. Any usage beyond the included monthly limit is billed monthly at the rate of $0.10 per GB.</p>',
			},
		],
	},
];

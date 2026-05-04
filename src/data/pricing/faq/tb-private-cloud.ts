import type { FaqCategory } from '../types';

export const tbPrivateCloudFaq: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'tb-private-cloud-what-does-thingsboard-private-cloud-stand-for',
				question: 'What does “ThingsBoard Private Cloud” stand for?',
				answer: `<p>ThingsBoard Private Cloud is a fully managed, isolated ThingsBoard Professional Edition cluster that our team deploys and operates for you. We provision the infrastructure, keep the platform patched and monitored 24×7, run automated backups, and provide an SLA-backed uptime guarantee (99%–99.99%, depending on plan). During onboarding, you choose the region that best fits your compliance or latency requirements—EU, North America, or APAC. All environments are hosted in ISO 27001/PCI-DSS-certified data centers. Your engineers can stay focused on building IoT applications instead of managing DevOps.</p>`,
			},
			{
				id: 'tb-private-cloud-how-does-private-cloud-compare-to-thingsboard-cloud-community-edition-and-self-managed',
				question: 'How Private Cloud compares to ThingsBoard Cloud, Community Edition and Self-Managed?',
				answer: `<ul>
                                <li>Community Edition itself is the open-source core—perfect for experiments and hobby projects, but offers less features and no SLA.</li>
                                <li>Self-Managed deployments (using either the paid Professional Edition or free Community Edition) live on infrastructure you operate; you gain total control and customisation, yet you also own every patch, backup and compliance task.</li>
                                <li>ThingsBoard Cloud is the quickest way to try ThingsBoard: a SaaS environment that we maintain for you, but shared with other tenants.</li>
                                <li>Private Cloud is a fully managed, isolated cluster run by the ThingsBoard team, with a contractual 99.9–99.99 % SLA and your choice of region—ideal when you need zero DevOps and hard uptime guarantees.</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-what-are-the-benefits-of-private-cloud-versus-self-hosting',
				question: 'What are the benefits of Private Cloud versus self-hosting?',
				answer: `<ul>
                                <li>Zero DevOps overhead – no servers to set up, patch or monitor.</li>
                                <li>Guaranteed availability – written SLA of 99.9 – 99.99 %, with service-credit remedies.</li>
                                <li>Faster time-to-market – we stand up production clusters in 1-2 hours, not weeks.</li>
                                <li>Scalability – Kubernetes-based plans grow as device traffic spikes.</li>
                                <li>Predictable cost – one all-inclusive monthly fee replaces cap-ex plus staffing.</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-what-is-uptime-and-how-do-you-calculate-it',
				question: 'What is ‘uptime’ and how do you calculate it?',
				answer: `<p>Uptime (%) = ((Total Time – Downtime) / Total Time) × 100. <br><br></p>
                            <p>Total Time – number of minutes in the billing month. <br><br></p>
                            <p>Downtime – minutes when core platform services are unavailable for the tenant (device endpoints, REST/WebSocket APIs, Rule Engine infrastructure, dashboards, telemetry DB). <br><br></p>
                            <p>We measure Downtime from incident detection to full service restoration. <br><br></p>
                            <p>Excluded from Downtime: <br></p>
                            <ul>
                                <li>Scheduled maintenance announced ≥ 48 h in advance</li>
                                <li>Emergency security patches</li>
                                <li>Force-majeure events or upstream cloud failures (e.g., AWS region outage)</li>
                                <li>Issues caused by customer-side logic (mis-configured Rule Chains, custom JS, connector errors, abusive API use, edge gateways, etc.)</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-what-deployment-options-are-available-within-private-cloud',
				question: 'What deployment options are available within Private Cloud?',
				answer: `<p>Private Cloud is offered in three fixed tiers—Launch, Growth, and Scale—each designed to support different stages of your IoT deployment journey. The Enterprise plan is tailored for your use case and offers flexible architecture, pricing and custom SLA. <br> <br></p>
                            <p>All plans are powered by Kubernetes, with built-in load balancers to ensure resilient, scalable operations. AWS is our first-choice IaaS, but Azure or GCP regions are also supported on request.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-automatic-backup',
				question: 'What is Automatic Backup?',
				answer: `<p>It is a configured process that regularly creates secure copies of the database with all telemetry, configurations, entities, and related data to avoid data loss in case of failure and enable recovery.</p>`,
			},
			{
				id: 'tb-private-cloud-what-support-is-included',
				question: 'What support is included?',
				answer: `<p>All plans include access to the ThingsBoard Support Portal for direct communication with the support team in case of questions related to ThingsBoard functionality.</p>`,
			},
			{
				id: 'tb-private-cloud-who-should-choose-private-cloud',
				question: 'Who should choose Private Cloud?',
				answer: `<p>Private Cloud ideal for companies that want to avoid investing in DevOps resources, reduce operational risk, and accelerate time to market. They are particularly beneficial for startups, SMBs, or enterprises scaling production systems who prefer to offload platform operations and upgrades to the ThingsBoard team under a clear SLA.</p>`,
			},
			{
				id: 'tb-private-cloud-what-are-the-prerequisites-to-get-started',
				question: 'What are the prerequisites to get started?',
				answer: `<p>1. Use our online calculator to size a Launch, Growth or Scale cluster.</p>
                            <p>2. Submit the request form – we schedule a short onboarding call.</p>
                            <p>3. For Enterprise deals we run a light discovery workshop and issue a custom proposal. <br> <br></p>
                            <p>You are welcome to reach out at any stage — we’ll help you choose the most suitable plan and guide you through the next steps.</p>`,
			},
			{
				id: 'tb-private-cloud-determine-right-plan',
				question: 'How do I determine the right Private Cloud plan for my workload?',
				answer: `<p>To select an appropriate Private Cloud plan, you’ll need to estimate your expected platform usage based on three key indicators: <br> <br></p>
                            <p>1. Number of devices:</p>
                            <ul>
                                <li>Navigate to the Home page of your ThingsBoard Tenant account.</li>
                                <li>Check the total number of devices currently connected.</li>
                            </ul>
                            <p>2. Number of Messages per Day per Device:</p>
                            <ul>
                                <li>Navigate to API Usage → Transport Messages chart</li>
                                <li>Find the monthly total of transport messages</li>
                                <li>Use this formula: Messages per day per device = (Monthly Transport Messages) / (Number of devices × Number of Days in Month)</li>
                            </ul>
                            <p>3. Number of Data Points per Message:</p>
                            <ul>
                                <li>In the same API Usage → Transport Messages chart</li>
                                <li>Identify the Data Points per Month figure</li>
                                <li>Use this formula: Data Points per Message = Data Points per Month / Transport Messages per Month</li>
                            </ul>
                            <p>Once you’ve collected these three values, you can match your usage against the limits defined in each Private Cloud plan tier (Launch, Growth, Scale, Enterprise) to determine the best fit.<br> <br></p>
                            <p>For more guidance, you can share these metrics with our team, we’ll be happy to help you size your environment.</p>`,
			},
			{
				id: 'tb-private-cloud-is-there-a-minimum-commitment',
				question: 'Is there a minimum commitment?',
				answer: `<p>No long-term lock-in. We simply ask for a 30-day written notice before shutdown so we can decommission resources cleanly.</p>`,
			},
			{
				id: 'tb-private-cloud-where-will-my-data-be-hosted',
				question: 'Where will my data be hosted?',
				answer: `<p>During onboarding you pick the region that best fits compliance or latency needs (EU, North America, or APAC). All sites reside in ISO 27001/PCI-DSS-certified data centres.</p>`,
			},
			{
				id: 'tb-private-cloud-how-can-i-get-my-data-in-line-with-gdpr-requirements',
				question: 'How can I get my data in line with GDPR requirements?',
				answer: `<p>You can request a complete encrypted database dump at any time. We generate a full PostgreSQL dump of all tenant-level tables (entities, telemetry, audit logs, custom metadata) and transfer it to you over a secure channel (SFTP or your own cloud bucket). <br><br></p>
                            <p>Because the export is a raw DB dump, you retain 100 % data fidelity and can immediately restore it in another PostgreSQL instance or transform it into any machine-readable format you need. We normally fulfill export requests within 5 business days, and—in line with GDPR—can also execute verified deletion of all tenant data within 30 days of your erase request.</p>`,
			},
			{
				id: 'tb-private-cloud-is-your-private-cloud-service-gdpr-compliant',
				question: 'Is your Private Cloud service GDPR-compliant?',
				answer: `<p>Yes. You remain the sole Data Controller; ThingsBoard acts as a Data Processor under a standard DPA. Data never leaves the region you select, and you have the right to access, port or delete it at will.</p>`,
			},
			{
				id: 'tb-private-cloud-will-i-have-a-sysadmin-user',
				question: 'Will I have a sysadmin user?',
				answer: `<p>For security and SLA integrity we do not expose Sysadmin by default. If your workflow truly needs low-level access, we can provide read-only credentials to metrics/Kubernetes dashboards under an additional NDA.</p>`,
			},
			{
				id: 'tb-private-cloud-what-kind-of-security-measurements-do-you-provide',
				question: 'What kind of security measurements do you provide?',
				answer: `<p>Private Cloud is designed with enterprise-grade security at its core. Access to the infrastructure is limited to authorized ThingsBoard personnel only, with regular audits and monitoring in place. We follow industry best practices for patch management, vulnerability scanning, and secure software development. For added protection, customers may also enable 2FA, dedicated VPN tunnels, and audit logging depending on their plan.</p>`,
			},
			{
				id: 'tb-private-cloud-how-often-are-upgrades-conducted',
				question: 'How often are upgrades conducted?',
				answer: `<p>All Private Cloud upgrades—whether minor patches or major version releases—are scheduled in coordination with the customer. This ensures full transparency, minimizes disruption, and allows your team to prepare in advance. Our team handles the entire upgrade process and provides clear communication before and after each change to maintain operational continuity and SLA compliance.</p>`,
			},
			{
				id: 'tb-private-cloud-can-i-upgrade-my-plan-at-any-time',
				question: 'Can I upgrade my plan at any time?',
				answer: `<p>Upgrades are possible at any time, but they are not initiated automatically. The ThingsBoard team continuously monitors your resource usage and data point throughput. If your consumption exceeds the thresholds defined for your current tier, our team will notify you and guide the process of upgrading to a higher plan. This ensures uninterrupted service and compliance with SLA guarantees. You can also request an upgrade proactively if you anticipate growth or require additional capabilities.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-included-in-service-reviews-and-architecture-consultations',
				question: 'What is included in service reviews and architecture consultations?',
				answer: `<p>Service reviews and architecture consultations are a specialized, ongoing service available exclusively to ThingsBoard Private Cloud customers. These sessions provide structured, high-level guidance from a senior ThingsBoard engineer who collaborates with your team regularly. You’ll receive proactive recommendations on best practices, performance tuning, and scalable architecture design tailored to your evolving use case. <br><br></p>
                            <p>This service is not included by default and can be purchased separately for customers who require advanced architectural guidance and regular expert engagement. <a target="_blank" href="/contact-us/?subject=Private%20Cloud&message=Architecture%20reviews%20and%20consults">Contact us</a> for more details.</p>`,
			},
		],
	},
	{
		id: 'billingAndPayments',
		label: 'Billing & Payments',
		items: [
			{
				id: 'tb-private-cloud-how-is-the-pricing-structured-for-private-cloud',
				question: 'How is the pricing structured for Private Cloud?',
				answer: `<p>The pricing for Private Cloud is based on the selected service tier. Each plan includes a specific device and data point rate limit to ensure proper resource allocation and SLA compliance. The available plans are: <br><br></p>
                            <ul>
                                <li>Launch: $1,499/month — includes up to 5,000 devices and up to 50,000 data points per minute; additional devices are billed at $0.1/device/month.</li>
                                <li>Growth: $2,199/month — includes up to 25,000 devices and up to 100,000 data points per minute; additional devices are billed at $0.09/device/month.</li>
                                <li>Scale: $3,999/month — includes up to 50,000 devices and up to 500,000 data points per minute; additional devices are billed at $0.08/device/month.</li>
                                <li>Enterprise: Custom pricing — includes 100,000 devices by default and no data point rate limits. Extendable as needed based on specific deployment requirements.</li>
                                <li>Short-term bursts up to 20% over the dp/minute ceiling for ≤ 15 min are tolerated. Sustained overages require a plan upgrade.</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-do-you-offer-a-discount-for-annual-payments',
				question: 'Do you offer a discount for annual payments?',
				answer: `<p>Yes, we offer a 10% discount on all Private Cloud plans—including Launch, Growth, Scale, and Enterprise—if you choose to pay annually upfront. The annual subscription provides cost savings and simplifies billing by consolidating charges into a single yearly invoice.</p>`,
			},
			{
				id: 'tb-private-cloud-what-payment-methods-are-accepted',
				question: 'What payment methods are accepted?',
				answer: `<p>We accept bank wire/ACH and credit- or debit-card payments. Card payments are processed securely via Stripe. All billing and invoicing is handled directly by the ThingsBoard Team.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-included-in-the-monthly-subscription-fee',
				question: 'What is included in the monthly subscription fee?',
				answer: `<p>The monthly subscription fee for Private Cloud covers the full provisioning and maintenance of your dedicated environment. This includes platform licensing, infrastructure and system monitoring, software updates, security patching, 24/7 availability monitoring, and SLA-backed support. Each plan tier comes with a predefined allocation of devices, storage, and data point rate capacity. Any usage beyond those included limits (e.g., additional devices, storage, or add-ons) is calculated on top of your regular subscription fee according to your selected plan.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-any-setup-or-cancellation-fees',
				question: 'Are there any setup or cancellation fees?',
				answer: `<p>No. Start or stop whenever you like. We do ask for 30 days’ notice before cancellation so we can export your data and decommission the cluster cleanly.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-any-additional-costs-beyond-the-fixed-monthly-fee',
				question: 'Are there any additional costs beyond the fixed monthly fee?',
				answer: `<p>In addition to the base monthly fee for each plan, you may incur additional monthly charges for the following: <br></p>
                            <ul>
                                <li>devices beyond the included limit for your selected plan (see pricing table)</li>
                                <li>Additional storage usage beyond the included capacity - $0.50 per GB</li>
                                <li>Optional add-ons:
                                    <ul>
                                        <li>Dev/Test environment - $299/month</li>
                                        <li>White-labeled Mobile App - $99/month + one-time $1 000 build fee</li>
                                    </ul>
                                </li>
                            </ul>
                            <p>There are no data point rate overage fees—sustained traffic above plan limits requires an upgrade. Short-term bursts up to 20 % over the dp/minute ceiling for ≤ 15 min are tolerated. Sustained overages require a plan upgrade.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-any-payment-processing-fees',
				question: 'Are there any payment processing fees?',
				answer: `<p>No, we do not charge any additional processing fees for payments made via wire transfer or credit/debit card.</p>`,
			},
			{
				id: 'tb-private-cloud-are-invoices-issued-automatically',
				question: 'Are invoices issued automatically?',
				answer: `<p>Invoices are currently generated manually and sent to you at the start of each billing month, so you have the invoice in hand before the service period begins. We’re building a self-service billing portal with fully automated invoicing and expect to roll it out later this year.</p>`,
			},
			{
				id: 'tb-private-cloud-does-your-invoice-include-taxes',
				question: 'Does your invoice include taxes?',
				answer: `<p>Invoices are issued net of tax in USD. You are responsible for any local taxes that may apply in your jurisdiction.</p>`,
			},
			{
				id: 'tb-private-cloud-how-can-i-estimate-my-tco',
				question: 'How can I estimate my TCO?',
				answer: `<p>Use our online pricing calculator (link on the Plans page) to model monthly spend: select a tier, enter device count, expected message rate, storage needs and any add-ons. The tool instantly shows your projected bill; for Enterprise scenarios our sales engineers will build a custom cost model on request.</p>`,
			},
			{
				id: 'tb-private-cloud-can-i-switch-from-monthly-to-annual-billing-later',
				question: 'Can I switch from monthly to annual billing later?',
				answer: `<p>Yes, you can switch from monthly to annual billing at any time. Simply contact the ThingsBoard team, and we will coordinate the transition, apply the discount, and adjust your invoicing accordingly from your next billing cycle.</p>`,
			},
			{
				id: 'tb-private-cloud-what-happens-if-my-plan-upgraded-to-higher-tier-during-an-annual-subscription',
				question: 'What happens if my plan upgraded to higher tier during an annual subscription?',
				answer: `<p>If you upgrade your Private Cloud plan during an active annual subscription, the price difference will be calculated on a monthly basis for the remainder of the subscription term. The 10% annual discount will still apply to the new plan. This ensures billing transparency and flexibility while preserving your discount, even if your needs change mid-term.</p>`,
			},
			{
				id: 'tb-private-cloud-what-happens-if-i-add-an-add-on-during-an-annual-subscription',
				question: 'What happens if I add an add-on during an annual subscription?',
				answer: `<p>If you add an add-on (such as Trendz, TBMQ, or Mobile App) during an active annual subscription, the additional cost will be calculated on a monthly basis for the remainder of the subscription period. The 10% annual discount will still apply to the added feature (not for storage and additional device fee) for the months it is active within the billing year. This ensures consistent billing logic across upgrades and add-on usage without requiring a full plan change.</p>`,
			},
		],
	},
	{
		id: 'usageAndLimits',
		label: 'Usage & Limits',
		items: [
			{
				id: 'tb-private-cloud-what-exactly-counts-as-a-device',
				question: 'What exactly counts as a “device”?',
				answer: `<p>A device is any distinct IoT endpoint that the platform tracks as its own entity—i.e. a row in the Device table. A record can be created in three ways: <br></p>
                            <ul>
                                <li>Direct connection – the physical unit authenticates itself (token, X-509, access key). One unit → one record.</li>
                                <li>Gateway proxy – a gateway authenticates once, then forwards data for subordinate nodes. The gateway is one device, and each proxied node is an additional device (e.g., 1 gateway + 10 meters = 11 devices).</li>
                                <li>Server-side integration – data arrives through an integration connector (REST, Kafka, Pub/Sub, OPC-UA, etc.). If the payload identifies a new deviceName/deviceType, ThingsBoard auto-creates the record. Every such auto-created entry counts as a separate device.</li>
                                <li>Deleting or disabling a Device entry immediately frees that slot for a replacement, so you only pay for the active records shown in your Device list.</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-how-are-datapoints-defined-and-metered',
				question: 'How are “messages” and “data points” defined and metered?',
				answer: `<p><b>What is a “message”?</b></p>
                            <p>A message is any application-layer packet that enters or leaves the platform—whether it’s uplink telemetry, an RPC call, an attribute update, or a downlink—regardless of transport protocol (MQTT, HTTP, CoAP, LwM2M) or integration. We measure sustained messages per minute, aggregated across all protocols.<br><br></p>
                            <p><b>What is a “data point”?</b></p>
                            <p>A data point is a single key/value pair (e.g., "temperature": 23.5) within a message payload. Because some messages bundle multiple measurements, the total number of data points often exceeds the raw message count.<br><br></p>
                            <p><b>How we count the msg/minute limit?</b></p>
                            <p>Telemetry messages carry one or more data points (sensor readings, attribute updates, etc.). Each data point in a telemetry message counts as 1 toward your per-minute limit.</p>
                            <p>Non-telemetry messages (RPC calls or downlinks with no measurements) carry zero data points—but we still count each such message as 1 toward your per-minute limit.<br><br></p>
                            <p><b>Total data points per minute = telemetry data points + count of messages with zero data points.</b><br><br></p>
                            <p><b>Examples:</b></p>
                            <p>Telemetry Payload { "temperature": 23.5, "humidity": 62 } counts as 2 data points</p>
                            <p>Telemetry Payload { "latitude": 42.222222, "longitude": 73.333333, "speed": 55.5, "fuel": 92, "batteryLevel": 81 } counts as 5 data points.</p>
                            <p>RPC call payload { "method": "setGPIO", "params": {"pin": 4, "value": 1} } counts as 1 message/data point.<br><br></p>
                            <p>By treating messages without payload as one data point and counting every actual measurement as one data point, we ensure your plan’s per-minute limit reflects your true platform usage.</p>`,
			},
			{
				id: 'tb-private-cloud-what-happens-if-i-exceed-my-sustained-data-point-rate-limit',
				question: 'What happens if I exceed my sustained data point rate limit?',
				answer: `<p>The cluster tolerates brief spikes (see next answer). If sustained traffic stays above your tier’s ceiling, our monitoring flags it and we’ll ask you to upgrade. Plan upgrades are provisioned within three business days; remaining over-quota traffic may be throttled to protect platform stability.</p>`,
			},
			{
				id: 'tb-private-cloud-can-i-burst-above-the-data-point-limit-and-for-how-long',
				question: 'Can I burst above the data point limit and for how long?',
				answer: `<p>Yes. Short-term bursts up to 20% above the stated dp-per-minute ceiling for 15 minutes or less are absorbed automatically and carry no penalty.</p>`,
			},
			{
				id: 'tb-private-cloud-how-do-i-monitor-my-current-device-data-point-and-storage-usage',
				question: 'How do I monitor my current device, data point, and storage usage?',
				answer: `<p>The Home dashboard contains information about number of devices and The API Usage dashboard contains information about hourly data point rates. The storage usage information is calculated from multiple data sources and available upon request. We are working on a way to embed it into the platform dashboards.</p>`,
			},
			{
				id: 'tb-private-cloud-what-telemetry-storage-is-included-and-what-data-consumes-it',
				question: 'What telemetry storage is included and what data consumes it?',
				answer: `<p>Each plan bundles a block-storage pool (Launch 500 GB, Growth 1 TB, Scale 2 TB; Enterprise custom). Telemetry, attributes, events, and file assets all consume this pool. When usage approaches the quota you can: (a) request to prune old data, (b) expand storage at $0.50 / GB / month, or (c) upgrade the plan. <br> <br></p>
                            <p><strong>Replication overhead</strong> <br></p>
                            <p>The figures above represent raw logical data. For durability the underlying databases keep multiple physical copies:</p>
                            <ul>
                                <li>PostgreSQL (metadata, latest-timeseries) is synchronously replicated 2×.</li>
                                <li>Cassandra (long-term telemetry) keeps 3× replicas by default.</li>
                            </ul>
                            <p>Therefore, 100 GB of logical telemetry stored in Cassandra will be accounted as 300 GB of physical disk space inside your pool, and 100 GB of metadata in PostgreSQL will consume roughly 200 GB. <br><br></p>
                            <p><strong>Note for Cassandra-backed deployments:</strong> <br></p>
                            <p>Telemetry rows receive a TTL (time-to-live) at the moment they are written. If the TTL is missing or longer than intended, those rows cannot be purged retrospectively; they will live until the TTL expires or the table is truncated. Be sure to set an appropriate TTL in your Rule Engine or integration pipeline when inserting data to keep storage growth predictable.</p>`,
			},
			{
				id: 'tb-private-cloud-how-long-is-telemetry-retained',
				question: 'How long is telemetry retained?',
				answer: `<p>Retention is 100 % customer-controlled through the built-in TTL settings or Rule Engine logic. Keep data for days or years—just remember that longer retention consumes more storage and may raise your bill.</p>`,
			},
			{
				id: 'tb-private-cloud-what-are-custom-data-retention-policies',
				question: 'What are Custom Data Retention Policies?',
				answer: `<p>These policies allow customers to control how long their data is kept. Storage limits are defined by the plan, and more can be added if needed.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-rest-websocket-api-rate-limits',
				question: 'Are there REST / WebSocket API rate limits?',
				answer: `<p>Yes. Per tenant, device and user limits prevent abuse and protect cluster health. The full tables are published <a target="_blank" href="/docs/private-cloud/subscription/">on the Private Cloud subscription page</a>.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-limits-on-dashboards-widgets-rule-chains-or-alarms',
				question: 'Are there limits on dashboards, widgets, rule chains, or alarms?',
				answer: `<p>In practice no—you may create as many dashboards, widgets, rule chains, and alarms as your project needs. Keep in mind, though, that the msg/minute SLA applies only to the default rule-chain templates we provision. Heavy or inefficient custom logic can slow processing. <br><br></p>
                            <p>To protect data integrity while you troubleshoot, every cluster ships with a Kafka buffer of up to 50 GB (roughly several hours of traffic, depending on throughput). Incoming telemetry is queued there until the Rule Engine catches up. If the buffer fills completely, the oldest data points are discarded first, so maintaining efficient rule chains is essential for uninterrupted data flow.</p>`,
			},
			{
				id: 'tb-private-cloud-how-many-user-accounts-and-tenants-can-i-create',
				question: 'How many user accounts and tenants can I create?',
				answer: `<p>User accounts are unlimited. Your Private Cloud instance is provisioned for a single top-level system administrator; that system administrator can create any number of tenants, customers and sub-customers and users without extra charge.</p>`,
			},
			{
				id: 'tb-private-cloud-whats-the-maximum-size-for-firmware-or-file-uploads-ota-assets',
				question: 'What’s the maximum size for firmware or file uploads (OTA, assets)?',
				answer: `<p>Individual file uploads are limited to 5 MB. Larger OTA bundles can be delivered by hosting them externally and serving the URL to edge devices.</p>`,
			},
			{
				id: 'tb-private-cloud-how-often-are-backups-taken-and-how-long-are-they-kept',
				question: 'How often are backups taken and how long are they kept?',
				answer: `<p>Nightly snapshots (full or incremental, depending on data churn) are stored in a separate cloud region. We retain backups for 7 days by default; longer retention can be arranged under the Enterprise tier.</p>`,
			},
			{
				id: 'tb-private-cloud-if-i-outgrow-my-plan-how-quickly-can-i-upgrade-and-will-there-be-downtime',
				question: 'If I outgrow my plan, how quickly can I upgrade and will there be downtime?',
				answer: `<p>Notify us as soon as you foresee sustained traffic growth. We provision the larger tier within three business days. Upgrades are performed live on Kubernetes; no downtime is expected, though brief reconnections (&lt;1 min) may occur when scaling nodes.</p>`,
			},
			{
				id: 'tb-private-cloud-what-are-the-device-limits-private-cloud-plans',
				question: 'What are the device limits Private Cloud plans?',
				answer: `<p>Each plan includes a different default device capacity:</p>
                            <ul>
                                <li>Launch: 5,000 devices</li>
                                <li>Growth: 25,000 devices</li>
                                <li>Scale: 50,000 devices</li>
                                <li>Enterprise: unlimited devices</li>
                            </ul>`,
			},
			{
				id: 'tb-private-cloud-what-happens-if-i-exceed-my-included-device-limit',
				question: 'What happens if I exceed my included device limit?',
				answer: `<p>If you exceed the included device count, you can continue adding more devices by paying an additional per-device fee according to your plan. Exceeding the device limit does not automatically require a plan upgrade, as long as your data point rate per minute remains within the predefined operational thresholds.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-the-data-point-rate-limit-and-why-is-it-important',
				question: 'What is the data point rate limit and why is it important?',
				answer: `<p>Each Private Cloud plan includes a predefined data point rate limit measured in data points per minute. This is the most critical technical limit in our offering, as it defines how much telemetry and integration data your system can process without impacting performance or SLA. <br><br></p>
                            <p>The message rate limits per plan are:</p>
                            <ul>
                                <li>Launch: up to 50,000 data points per minute</li>
                                <li>Growth: up to 100,000 data points per minute</li>
                                <li>Scale: up to 200,000 data points per minute</li>
                                <li>Enterprise: Unlimited</li>
                            </ul>
                            <p>If your usage exceeds the limit of your current plan, a mandatory upgrade will be required to maintain service stability and SLA guarantees. Data points throughput is actively monitored by the ThingsBoard team.</p>`,
			},
			{
				id: 'tb-private-cloud-what-are-the-database-options-in-each-plan',
				question: 'What is the underlying database structure?',
				answer: `<p>All plans use PostgreSQL (SQL) with replication factor of 2 for entities storage and NoSQL (Cassandra) with a replication factor of 3 to store time-series data. Cassandra storage is more efficient—each data point occupies on average five times less space before replication.<br><br></p>
                            <p>PostgreSQL (SQL) is a relational database ideal for structured queries, transactional operations, and smaller workloads. It offers simplicity and consistency, making it perfect for monolithic deployments like the Launch plan.<br><br></p>
                            <p>Cassandra is a distributed NoSQL database designed for high availability and horizontal scalability. It is more than five times more efficient for storing large volumes of telemetry data, requiring significantly less storage space, while also delivering high performance and enabling seamless horizontal scaling.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-the-difference-between-2x-and-3x-replication',
				question: 'What is the difference between 2x and 3x replication?',
				answer: `<p>Data replication ensures durability and high availability of your data within the Private Cloud infrastructure. The replication level defines how many copies of your data are stored across different Availability Zones: <br></p>
                            <ul>
                                <li><b>PostgreSQL (SQL) — 2× replication:</b> data is stored in two copies across separate Availability Zones, using a primary–standby architecture.</li>
                                <li><b>Cassandra (NoSQL) — 3× replication:</b> data is stored in three copies across different Availability Zones, enabling quorum-based consistency.</li>
                            </ul>
                            <p>These replication settings apply to all planes. Higher replication improves fault tolerance and system resilience, making it especially important for production-grade deployments.</p>`,
			},
			{
				id: 'tb-private-cloud-what-does-multi-az-database-replication-mean',
				question: 'What does multi-AZ database replication mean?',
				answer: `<p>Multi-AZ (Availability Zone) database replication refers to the distribution of data copies across multiple physical data center locations within the same region. This provides enhanced fault tolerance, automatic failover, and increased uptime by ensuring that even if one availability zone goes down, your data and services remain accessible through other zones. It is a key feature in Growth, Scale, and Enterprise plans to support high availability and disaster resilience.</p>`,
			},
			{
				id: 'tb-private-cloud-what-does-geo-region-deployment-selection-include',
				question: 'What does geo-region deployment selection include?',
				answer: `<p>Geo-region deployment selection allows you to choose the specific geographic region where your Private Cloud instance will be hosted. This ensures your data is stored and processed in a location that meets your compliance or data sovereignty requirements. During onboarding, you can select region, and our team will deploy your environment accordingly. This feature is particularly valuable for organizations subject to regional data protection regulations or those with distributed global operations.<br><br></p>
                            <p><b>For the Launch plan, region selection is limited to the following supported regions:</b>
                            <ul>
                                <li><b>North America:</b> US West, US East, Mexico;</li>
                                <li><b>Europe:</b> Ireland, Stockholm;</li>
                                <li><b>Asia:</b> Taipei, Thailand, Mumbai.</li>
                            </ul>
                            </p>`,
			},
			{
				id: 'tb-private-cloud-can-i-choose-a-specific-maintenance-window',
				question: 'Can I choose a specific maintenance window?',
				answer: `<p>Yes, you can. All Private Cloud plans imply scheduled maintenance windows. For Launch and Growth plans, our team will suggest available time slots within our standard working hours for you to choose from. For Scale and Enterprise plans, you can define any preferred maintenance window that best fits your operations. We coordinate with you to ensure that any upgrades or maintenance activities are performed within the agreed timeframe to minimize disruption.</p>`,
			},
		],
	},
	{
		id: 'enterpriseSubscription',
		label: 'Enterprise plan',
		items: [
			{
				id: 'tb-private-cloud-what-features-are-unique-to-the-enterprise-plan',
				question: 'What features are unique to the Enterprise plan?',
				answer: `<p>The Enterprise plan is tailored for customers with complex operational and business needs. While it builds on the same platform features, it introduces a separate, flexible billing model and the option for advanced engineering support at the application level. This combination enables organizations to manage Private Cloud at scale with greater control, specialized assistance, and the ability to align infrastructure with their unique workflows and compliance requirements.</p>`,
			},
			{
				id: 'tb-private-cloud-can-i-get-a-custom-sla',
				question: 'Can I get a custom SLA?',
				answer: `<p>The Enterprise plan includes a default SLA with a guaranteed uptime of 99.95%, which already meets the needs of most mission-critical applications. While fully custom SLAs are typically not required, we are open to discussing specific availability or support requirements on a case-by-case basis to ensure alignment with your business expectations.</p>`,
			},
			{
				id: 'tb-private-cloud-how-is-the-pricing-determined-for-the-enterprise-plan',
				question: 'How is the pricing determined for the Enterprise plan?',
				answer: `<p>Enterprise pricing is calculated based on multiple components to reflect the scale, flexibility, and support level required. The total cost typically consists of: <br></p>
                            <ul>
                                <li>Base fee – foundational cost for core platform access and services</li>
                                <li>Infrastructure processing costs – reflects actual compute and networking usage</li>
                                <li>Management fee – covers monitoring, updates, and support</li>
                                <li>Storage costs – based on allocated capacity and retention policy</li>
                                <li>Per-device fee – applies after the included 100,000 device threshold is exceeded</li>
                            </ul>`,
			},
		],
	},
	{
		id: 'trialsCancellationsAndRefunds',
		label: 'Trials, Cancellations & Refunds',
		items: [
			{
				id: 'tb-private-cloud-is-there-a-trial-option-for-private-cloud',
				question: 'Is there a trial option for Private Cloud?',
				answer: `<p>Trial access is available on <a target="_blank" href="/installations/choose-region/">ThingsBoard Cloud</a>, which allows you to explore the core features and capabilities of ThingsBoard without setup overhead.</p>
                            <p>For ThingsBoard Private Cloud, trials are not applicable due to the use of dedicated infrastructure and custom deployment.</p>`,
			},
			{
				id: 'tb-private-cloud-can-i-downgrade-my-plan-later',
				question: 'Can I downgrade my plan later?',
				answer: `<p>Yes, you can downgrade your Private Cloud plan if your data point rate and resource usage fall within the thresholds of a lower-tier Private Cloud plan. Downgrades are coordinated with the ThingsBoard team to ensure service continuity and SLA compliance. If a downgrade results in a remaining balance, the unused portion of your subscription can either be refunded or applied as store credits for future use. However, it is not possible to downgrade from Private Cloud to ThingsBoard Cloud, as the architectures, infrastructure models, and operational processes differ entirely.</p>`,
			},
			{
				id: 'tb-private-cloud-are-there-any-fees-for-early-cancellation',
				question: 'Are there any fees for early cancellation?',
				answer: `<p>There are no cancellation fee for Private Cloud. However, since your Private Cloud instance runs on dedicated infrastructure, we kindly ask for at least 30 days' advance notice prior to cancellation to ensure smooth resource decommissioning and service wrap-up.</p>`,
			},
			{
				id: 'tb-private-cloud-if-i-cancel-will-you-return-my-data',
				question: 'If I cancel, will you return my data?',
				answer: `<p>Yes. Once we receive your cancellation notice, we prepare a full encrypted PostgreSQL/Cassandra dump of all your tenant data—including entities, telemetry, files, and audit logs—and deliver it to you over a secure channel (SFTP link or your own cloud bucket). You have up to 60 days after the cancellation date to download and verify the dump. After that 60-day grace period, all remaining backups and cluster data are permanently and securely deleted from our systems.</p>`,
			},
		],
	},
	{
		id: 'addOns',
		label: 'Add-ons and Optional Features',
		items: [
			{
				id: 'tb-private-cloud-can-i-purchase-additional-storage',
				question: 'Can I purchase additional storage?',
				answer: `<p>Yes, additional storage is available and automatically calculated based on your actual usage and retention policy. There's no need to make a separate manual request. At the end of each month, we assess your storage consumption, and any overage beyond your plan’s default quota is billed at $0.50 per GB. This ensures accurate, usage-based billing without administrative overhead on your side.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-included-in-the-dev-test-environment',
				question: 'What is included in the Dev/Test Environment?',
				answer: `<p>The Dev/Test Environment is a standalone deployment. It is designed to help you safely test configurations, validate integrations, and simulate real workflows before applying them in production—ensuring accuracy, minimizing risks, and supporting continuous development processes.</p>`,
			},
			{
				id: 'tb-private-cloud-are-high-availability-services-available-as-an-add-on',
				question: 'Are high-availability services available as an add-on?',
				answer: `<p>High-availability (HA) services are built into the structure of Private Cloud starting Scale plan and are not offered separately as an add-on. <br><br></p>
                            <p>If your usage or operational requirements indicate the need for HA, the ThingsBoard team will proactively recommend an upgrade to the appropriate tier.<br><br></p>
                            <p>This approach ensures consistent architecture, SLA alignment, and reliability without complicating plan configurations.</p>`,
			},
			{
				id: 'tb-private-cloud-edge-addon-cloud-what-is',
				question: 'What is Edge Computing add-on?',
				answer: `<p>The Edge Computing add-on enables local data processing at remote sites through ThingsBoard Edge PE instances. Edge runs independently with offline capability and automatically syncs with your central ThingsBoard PE Server when connectivity returns.</p>
                            <p>It is available for all ThingsBoard PE deployments: Cloud, Private Cloud, and self-managed.</p>`,
			},
			{
				id: 'tb-private-cloud-edge-addon-cloud-pricing-plans',
				question: 'What pricing plans does Edge Computing add-on offer?',
				answer: `<p>Edge Computing add-on pricing depends on your ThingsBoard model. Check the relevant pricing in the <a href="/pricing/?section=thingsboard-pe-options&product=thingsboard-private-cloud&calculator">Plan Calculator</a>.</p>`,
			},
			{
				id: 'tb-private-cloud-trendz-what-is',
				question: 'What is Trendz?',
				answer: `<p>Trendz is an add-on for advanced IoT Data Analytics. It allows you to analyze, detect anomalies, and predict outcomes — all in one unified analytics workspace that works seamlessly with ThingsBoard. You can check pricing in the Plan calculator.</p>`,
			},
			{
				id: 'tb-private-cloud-trendz-pricing-plans',
				question: 'What pricing plans does Trendz offer?',
				answer: `<p>Trendz pricing depends on your ThingsBoard model. You can check the relevant pricing in the <a href="/pricing/?section=thingsboard-pe-options&product=thingsboard-private-cloud&calculator">Plan Calculator</a> on this page.</p>`,
			},
			{
				id: 'tb-private-cloud-what-is-included-in-the-white-labeled-mobile-app-add-on',
				question: 'What is included in the White-Labeled Mobile App add-on?',
				answer: `<p>The White-Labeled Mobile App add-on provides you with a branded version of the ThingsBoard Mobile application. This includes your company’s name, logo, colors, and other branding elements. The cost is $99 per month, plus a one-time setup fee of $1,000 to cover branding and configuration.</p>`,
			},
		],
	},
];

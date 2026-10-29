import type { FaqCategory } from '@data/pricing/types';
import { CERT_ISSUE } from '@data/trust-center/compliance';
import {
	DPA_HREF,
	IMS_EMAIL,
	NDA_TURNAROUND,
	REPORT_REPLY_TIME,
	SECURITY_EMAIL,
	TERMS_OF_USE_HREF,
	tc,
} from '@data/trust-center/nav';

/** The hub's FAQ, in Pricing's `FaqCategory` shape for `FaqSection`. */

export const TC_FAQ: FaqCategory[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				id: 'contact',
				question: 'How do I contact ThingsBoard about security?',
				answer: `<p>Email ${SECURITY_EMAIL} for security, compliance and privacy questions and vulnerability reports, and ${IMS_EMAIL} for document requests.</p>`,
			},
			{
				id: 'nda-speed',
				question: 'How quickly can we get documents under NDA?',
				answer: `<p>Within ${NDA_TURNAROUND} after we sign a mutual NDA. We can also give you the information you need to complete your own security questionnaire.</p>`,
			},
			{
				id: 'report',
				question: 'How do I report a security issue?',
				answer: `<p>Email ${SECURITY_EMAIL}, using our <a href="${tc('report-vulnerability')}">vulnerability report template</a>. We reply within ${REPORT_REPLY_TIME} with an investigation plan. Please don't open a public issue: it puts other users at risk before a fix is available.</p>`,
			},
		],
	},
	{
		id: 'compliance',
		label: 'Compliance',
		items: [
			{
				id: 'certifications',
				question: 'What certifications does ThingsBoard hold?',
				answer: `<p>ISO/IEC 27001:2022 and ISO 9001:2015. ${CERT_ISSUE.body} issued both certificates on ${CERT_ISSUE.issued}; they are valid until ${CERT_ISSUE.expires}, with an audit every year. You can verify them at ${CERT_ISSUE.validator}.</p>`,
			},
			{
				id: 'iso-scope',
				question: 'What does your ISO/IEC 27001 certificate cover?',
				answer:
					"<p>Our management system: how we design, develop, maintain and support the software, our cloud services, QA testing and licensing. It covers how we build and run ThingsBoard, not a customer's own installation.</p>",
			},
			{
				id: 'certify-own',
				question: 'Can I certify my own solution built on ThingsBoard?',
				answer:
					"<p>Yes. You can use our ISO certificates as supplier evidence in your own audit, for example for ISO/IEC 27001, and under NDA we share the Statement of Applicability and audit reports. The platform already covers many of the controls, such as access control, the audit log and the choice of data region, so you don't need to build them from scratch.</p>",
			},
			{
				id: 'soc2',
				question: 'Do you have a SOC 2 report?',
				answer:
					'<p>ThingsBoard is certified to ISO/IEC 27001 and ISO 9001. The data centers behind ThingsBoard Cloud and Private Cloud hold SOC 2, ISO 27001 and PCI DSS attestations; AWS publishes them in AWS Artifact.</p>',
			},
			{
				id: 'gdpr-ccpa',
				question: 'Do you comply with GDPR and CCPA?',
				answer: `<p>Yes. We meet both through our own privacy program and declare our compliance. When we process data on your behalf, the Data Processing Agreement applies. Send data subject requests to ${SECURITY_EMAIL}.</p>`,
			},
		],
	},
	{
		id: 'cloud',
		label: 'ThingsBoard Cloud and Private Cloud',
		items: [
			{
				id: 'hosting',
				question: 'Where is my data hosted?',
				answer:
					'<p>ThingsBoard Cloud runs on AWS in two independent regions, North America (thingsboard.cloud) and the EU (eu.thingsboard.cloud), and data never moves between them. Private Cloud runs on AWS by default, or on Azure or GCP on request, in North America, the EU or APAC.</p>',
			},
			{
				id: 'separation',
				question: 'How is my data separated from other customers?',
				answer:
					'<p>In ThingsBoard Cloud, every request is confined to its own tenant, and customers and entity groups narrow access further. Private Cloud is a dedicated single-tenant cluster.</p>',
			},
			{
				id: 'backups',
				question: 'How are backups handled?',
				answer:
					'<p>ThingsBoard Cloud is backed up daily, with point-in-time recovery. Private Cloud takes nightly snapshots and stores them in a separate cloud region for 7 days by default (longer on Enterprise).</p>',
			},
			{
				id: 'uptime',
				question: 'What uptime do you commit to?',
				answer:
					'<p>Private Cloud has a contractual SLA: 99.9% on Launch and Growth, 99.95% on Scale and Enterprise, and a custom SLA on Enterprise on request.</p>',
			},
			{
				id: 'staff',
				question: 'Can ThingsBoard staff see my data?',
				answer:
					"<p>Only authorized ThingsBoard engineers can access the infrastructure, with regular audits and monitoring. They work with your tenant's data only to handle a request you raised, and that access is role-based and logged.</p>",
			},
			{
				id: 'vpn',
				question: 'Can Private Cloud connect to our network?',
				answer:
					'<p>Yes. Depending on your plan, we set up a dedicated VPN tunnel to your systems. On request, we also provide read-only access to metrics and Kubernetes dashboards under an NDA.</p>',
			},
			{
				id: 'leaving',
				question: 'What happens to my data when I leave?',
				answer:
					'<p>In ThingsBoard Cloud, you export your data through the REST API, and we delete your tenant after cancellation. In Private Cloud, we prepare a full encrypted PostgreSQL/Cassandra dump; you have 60 days to download it, and then we permanently delete all backups and cluster data.</p>',
			},
		],
	},
	{
		id: 'onprem',
		label: 'On-premises',
		items: [
			{
				id: 'onprem-responsibility',
				question: 'Who is responsible for security in an on-premises deployment?',
				answer:
					'<p>You run the infrastructure, network, patching, backups and recovery, and you keep full control over them. We are responsible for the product code, security fixes and the guides that help you configure the platform securely.</p>',
			},
			{
				id: 'fixes',
				question: 'How do I get security fixes?',
				answer:
					'<p>Security fixes ship in maintenance and patch releases of your release line. They need no upgrade script: ThingsBoard applies any database changes in the background after startup. Fixed CVE IDs are listed in the release notes. For production, use the latest LTS line and pin a tag such as 4.4.0-latest to receive patches automatically.</p>',
			},
			{
				id: 'internet',
				question: 'Does an on-premises installation need internet access?',
				answer:
					'<p>Only for licensing: the platform checks its license every hour over an outbound connection to license.thingsboard.io. Perpetual licenses can use the offline licensing add-on instead.</p>',
			},
			{
				id: 'guides',
				question: 'Where do I find security configuration guides?',
				answer:
					'<p>In the <a href="/docs/pe/user-guide/security/overview/">Security section</a> of the documentation: password and lockout policies, 2FA, OAuth 2.0, API keys, TLS for every protocol, the audit log and secrets storage.</p>',
			},
		],
	},
	{
		id: 'data',
		label: 'Data security',
		items: [
			{
				id: 'encrypted',
				question: 'Is my data encrypted?',
				answer:
					'<p>Users and devices connect over TLS (HTTPS on 443, MQTTS on 8883, DTLS for CoAP and LwM2M). The platform encrypts stored secrets with AES-256 and stores user passwords as BCrypt hashes.</p>',
			},
			{
				id: 'sso',
				question: 'Can we enforce 2FA and single sign-on?',
				answer:
					'<p>Yes. 2FA supports authenticator apps (TOTP), email, SMS and backup codes, and from version 4.3 you can require it for all users, for system administrators or for tenant administrators. Single sign-on works over OAuth 2.0 and OpenID Connect with Google, Azure AD, Okta, Keycloak, Auth0 and others. SAML and LDAP are not supported.</p>',
			},
			{
				id: 'ai',
				question: 'Is my data used to train AI models?',
				answer: `<p>We don't use customer data to train or improve ThingsBoard's own AI models. ThingsBoard Cloud can use third-party AI services, for example for development automation and automated support. Data shared with them is used to provide the functionality you request, and the providers are bound by obligations no less strict than our <a href="${DPA_HREF}">DPA</a> (<a href="${TERMS_OF_USE_HREF}">Terms of Use</a>, 3.13). Our own use of AI follows a dedicated policy aligned with GDPR, the EU AI Act and the NIST AI RMF.</p>`,
			},
			{
				id: 'subprocessors',
				question: 'Who are your sub-processors?',
				answer: `<p>The full list, with purpose and location for each vendor, is on the <a href="${tc('subprocessors')}">sub-processors page</a>.</p>`,
			},
		],
	},
];

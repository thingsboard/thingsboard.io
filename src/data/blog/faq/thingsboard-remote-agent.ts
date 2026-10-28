import type { FaqCategory } from '@data/pricing/types';

// FAQ for the Remote Agent announcement post. Rendered inline in
// `src/content/blog/thingsboard-remote-agent-manage-docker-compose-on-remote-hosts.mdx`
// by the shared `FaqSection`, which also emits the page's FAQPage structured data.
// Questions are phrased the way people search for the problem.
// Item ids are public anchors; do not renumber.

const DOCS = '/docs/pe/user-guide/agents';

export const remoteAgentFaq: FaqCategory[] = [
	{
		id: 'basics',
		label: 'Basics',
		items: [
			{
				id: 'what-is-remote-agent',
				question: 'What is ThingsBoard Remote Agent?',
				defaultOpen: true,
				answer: `<p>Remote Agent is a lightweight Docker container that runs on a remote host, connects outbound to ThingsBoard or ThingsBoard Cloud, and manages Docker Compose applications on that host. From the ThingsBoard UI you deploy, update, upgrade, restart, and delete those applications, watch host and container metrics, and stream live container logs, without opening SSH sessions for routine work. See the <a href="${DOCS}/">Remote Agent overview</a>.</p>`,
			},
			{
				id: 'what-can-it-run',
				question: 'Which applications can Remote Agent manage?',
				answer: `<p>Any Docker Compose application. ThingsBoard Edge and IoT Gateway get first-class support with versioned templates, tracked upgrades, and database migrations. The Generic type runs any other Compose project: MQTT brokers, databases, or your own services. See <a href="${DOCS}/applications/">Applications</a>.</p>`,
			},
			{
				id: 'which-versions',
				question: 'Which ThingsBoard versions support Remote Agent?',
				answer: `<p>Remote Agent is available in ThingsBoard 4.4 and later and in ThingsBoard Cloud. Agents are managed under <strong>Edge management &gt; Agents</strong>.</p>`,
			},
			{
				id: 'vs-portainer',
				question: 'How is Remote Agent different from Portainer or other Docker management tools?',
				answer: `<p>General-purpose tools such as Portainer manage Docker containers on any host. Remote Agent manages Docker Compose applications too, and adds what is specific to ThingsBoard: it finds new ThingsBoard Edge and IoT Gateway versions, runs their database migrations on upgrade with automatic rollback, and creates the Edge or Gateway entity with its credentials. Hosts are managed from the same ThingsBoard UI as your devices, and fleets are provisioned and upgraded through agent and application profiles.</p>`,
			},
			{
				id: 'docker-compose-cli',
				question: 'Does the remote host need Docker Compose installed?',
				answer: `<p>No. The host needs only Docker Engine (Linux, amd64 or arm64). The agent talks to the Docker Engine API directly and applies the standard Docker Compose labels to every resource it creates, so managed applications still look like regular Compose projects to <code>docker compose</code> and other tools.</p>`,
			},
		],
	},
	{
		id: 'remote-management',
		label: 'Remote management',
		items: [
			{
				id: 'manage-docker-without-ssh',
				question: 'How do I manage Docker containers on a remote server without SSH?',
				answer: `<p>Install Remote Agent on the server with the <code>docker run</code> command that ThingsBoard generates for you. The agent connects back to ThingsBoard over an outbound gRPC stream; from then on every operation (install, update, upgrade, restart, delete, logs) is started from the ThingsBoard UI and executed by the agent locally. See <a href="${DOCS}/installation/">Install Remote Agent</a>.</p>`,
			},
			{
				id: 'inbound-ports',
				question: 'Does the remote host need a public IP, open ports, or a VPN?',
				answer: `<p>No. The agent uses outbound connections only and opens no listening ports on the host. It needs outbound access to the ThingsBoard gRPC port (the same port ThingsBoard Edge uses, <code>7070</code> by default). TLS with public or custom CA certificates is supported.</p>`,
			},
			{
				id: 'offline-host',
				question: 'What happens if the host goes offline during an operation?',
				answer: `<p>The agent reconnects automatically with exponential backoff, and commands issued while it was offline are delivered after it reconnects. Every command step is idempotent and its completion is persisted on the agent, so after a reconnect or restart execution continues from the first unfinished step instead of starting over.</p>`,
			},
			{
				id: 'existing-containers',
				question: 'Can Remote Agent manage containers that are already running on a host?',
				answer: `<p>Yes. When the agent connects, it discovers the Docker Compose projects already running on the host and reports them as <strong>Discovered</strong> applications. You can manage them right away, and attach them to an application profile to bring an existing fleet under profile management and bulk actions, without redeploying anything.</p>`,
			},
			{
				id: 'without-compose-files',
				question: 'Do my containers have to be started with Docker Compose for Remote Agent to manage them?',
				answer: `<p>No. The agent doesn't read Compose files. It groups containers into applications by their standard Docker Compose labels, so a container started any other way is managed once it carries the <code>com.docker.compose.project</code> and <code>com.docker.compose.service</code> labels. Volumes and networks need no labels. See <a href="${DOCS}/applications/#discover-existing-applications">Discover existing applications</a>.</p>`,
			},
			{
				id: 'upgrade-agent',
				question: 'How is the agent itself updated?',
				answer: `<p>From the UI. When a newer agent image is published, ThingsBoard enables <strong>Upgrade agent</strong>. The agent pulls the new image, starts a replacement container, hands the host over, and removes the old one. If the handover does not complete, the old agent keeps serving. See <a href="${DOCS}/self-upgrade/">Agent self-upgrade</a>.</p>`,
			},
		],
	},
	{
		id: 'upgrades',
		label: 'Upgrades & safety',
		items: [
			{
				id: 'upgrade-edge-remotely',
				question: 'How do I upgrade ThingsBoard Edge remotely?',
				answer: `<p>When a new Edge version is published, ThingsBoard marks the deployed application with <strong>Upgrade available</strong>. Click <strong>Upgrade</strong>, pick the volumes to back up, and confirm. The agent backs up the data, runs the Edge database upgrade scripts, starts the new version, and rolls back automatically if any step fails. See <a href="${DOCS}/application-actions/#upgrade-an-application">Upgrade an application</a>.</p>`,
			},
			{
				id: 'failed-upgrade',
				question: 'What happens if an upgrade fails?',
				answer: `<p>The application returns to its previous state. Before an update or upgrade, the agent snapshots the application and backs up the selected volumes. If any step fails, it restores the volumes, recreates the previous containers, and marks the event as failed with the error from the failing step. Canceling a running operation rolls back the same way.</p>`,
			},
			{
				id: 'postgres-major-upgrade',
				question: 'Can Remote Agent upgrade PostgreSQL to a new major version inside Docker?',
				answer: `<p>Yes. When an update or upgrade moves a service based on the official <code>postgres</code> image to a new major version, the agent detects the change from the data volume, backs it up, dumps the database with the old version, and restores it with the new one. The migration resumes after a crash and rolls back with the rest of the operation. See <a href="${DOCS}/application-actions/#postgresql-major-version-migration">PostgreSQL major version migration</a>.</p>`,
			},
		],
	},
	{
		id: 'fleets',
		label: 'Fleets',
		items: [
			{
				id: 'same-compose-many-servers',
				question: 'How do I deploy the same Docker Compose configuration to many servers?',
				answer: `<p>Create an application profile with the shared Compose configuration and assign it to an agent profile with an auto-install provisioning strategy. Run the agent profile's provisioning command on each server. It is the same command for every machine. Each server registers as a new agent and installs the assigned applications automatically. See <a href="${DOCS}/agent-profiles/">Agent profiles and auto-provisioning</a>.</p>`,
			},
			{
				id: 'update-many-hosts',
				question: 'How do I update an application on hundreds of hosts at once?',
				answer: `<p>Use a bulk action. On the agent profile, pick the application profile and run a bulk restart, update, upgrade, or delete. Every matching application gets its own tracked execution with its own backup and rollback, so a failure on one host doesn't stop the rollout on the others. See <a href="${DOCS}/bulk-actions/">Bulk actions</a>.</p>`,
			},
			{
				id: 'staged-rollout',
				question: 'Can I roll out an upgrade to staging before production?',
				answer: `<p>Yes. Assign one application profile to a staging and a production agent profile. Bulk upgrade the staging fleet, verify the result and adjust the configuration, then bulk upgrade production with the same profile.</p>`,
			},
			{
				id: 'configuration-drift',
				question: 'How do I find hosts that drifted from the shared configuration?',
				answer: `<p>The <strong>In Sync With App Profile</strong> column shows whether every application still matches its application profile. An application drifts when someone edits its configuration directly or when the profile moves on; a single update or a bulk update brings it back in sync.</p>`,
			},
		],
	},
];

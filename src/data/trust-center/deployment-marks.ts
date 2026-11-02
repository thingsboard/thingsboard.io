/** The deployment models' icons: comparison column heads, and catalog lines opening on a model's name. */
export const DEPLOYMENT_ICON = {
	cloud: 'tabler:cloud',
	private: 'tabler:cloud-lock',
	onprem: 'tabler:server',
} as const;

/** "Every deployment" has none: it is all three. */
const BY_LABEL: Record<string, string> = {
	'ThingsBoard Cloud': DEPLOYMENT_ICON.cloud,
	'Private Cloud': DEPLOYMENT_ICON.private,
	'On-premises': DEPLOYMENT_ICON.onprem,
	'ThingsBoard Cloud and Private Cloud': DEPLOYMENT_ICON.cloud,
};

/** The icon for a line's label, if it names a deployment model. */
export const deploymentIcon = (label: string | undefined): string | undefined => (label ? BY_LABEL[label] : undefined);

/**
 * Per-product host configuration for code examples.
 * Import in MDX includes to show the correct hostname for each product edition.
 */

import { Products } from '~/models/site.models';

export interface HostConfig {
	/** Human-readable label, e.g. "localhost" or "ThingsBoard Cloud" */
	hostLabel: string;
	/** Base hostname for HTTPS/REST, e.g. "localhost" or "thingsboard.cloud" */
	hostName: string;
	/** MQTT broker hostname */
	mqttHostName: string;
	/** CoAP server hostname */
	coapHostName: string;
	/** LwM2M server hostname */
	lwm2mHostName: string;
	/** Full base URL for REST API, e.g. "http://localhost:8080" or "https://thingsboard.cloud" */
	baseUrl: string;
	/** Whether the deployment is self-hosted (user sets their own host) */
	isSelfHosted: boolean;
}

const SELF_HOSTED: HostConfig = {
	hostLabel: 'localhost',
	hostName: 'localhost',
	mqttHostName: 'localhost',
	coapHostName: 'localhost',
	lwm2mHostName: 'localhost',
	baseUrl: 'http://localhost:8080',
	isSelfHosted: true,
};

const CLOUD_NA: HostConfig = {
	hostLabel: 'ThingsBoard Cloud',
	hostName: 'thingsboard.cloud',
	mqttHostName: 'mqtt.thingsboard.cloud',
	coapHostName: 'coap.thingsboard.cloud',
	lwm2mHostName: 'lwm2m.thingsboard.cloud',
	baseUrl: 'https://thingsboard.cloud',
	isSelfHosted: false,
};

const CLOUD_EU: HostConfig = {
	hostLabel: 'ThingsBoard Cloud EU',
	hostName: 'eu.thingsboard.cloud',
	mqttHostName: 'mqtt.eu.thingsboard.cloud',
	coapHostName: 'coap.eu.thingsboard.cloud',
	lwm2mHostName: 'lwm2m.eu.thingsboard.cloud',
	baseUrl: 'https://eu.thingsboard.cloud',
	isSelfHosted: false,
};

export function getHostConfig(product: Products): HostConfig {
	switch (product) {
		case Products.PAAS:
			return CLOUD_NA;
		case Products.PAAS_EU:
			return CLOUD_EU;
		default:
			return SELF_HOSTED;
	}
}

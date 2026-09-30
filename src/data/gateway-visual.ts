/**
 * The words in the IoT Gateway card's visual (`GatewayRelay`). The protocols must match, in order, the
 * ones the card's description in `homeEcosystem` names.
 */
export const GATEWAY_RELAY = {
	protocols: ['Modbus', 'OPC UA', 'BACnet', 'SNMP', 'KNX'],
	more: '+20 more',
	uplink: 'MQTT',
	label:
		'Field devices speaking Modbus, OPC UA, BACnet, SNMP, KNX and twenty more industrial protocols arrive at the ThingsBoard IoT Gateway and continue onward over MQTT.',
};

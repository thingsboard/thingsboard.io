/**
 * ThingsBoard Integrations - Uplink Converter Script
 * 
 * Paste this script into your ThingsBoard Integration -> Uplink Converter console
 * to decode incoming device payload strings into clean ThingsBoard telemetry fields.
 */

// Decode raw binary/hex payload to a readable string
var strArray = decodeToString(payload);

// Clean quotes and split the CSV-formatted data payload
var payloadArray = strArray.replaceAll("\"", "").split(',');

// Initialize the telemetry payload object
var telemetryPayload = {};

// Parse keys and values from the split payload array
for (var i = 2; i < payloadArray.length; i = i + 2) {
    var telemetryKey = payloadArray[i];
    var telemetryValue = parseFloat(payloadArray[i + 1]);
    telemetryPayload[telemetryKey] = telemetryValue;
}

// Prepare the final result object expected by ThingsBoard Integration
var result = {
    deviceName: payloadArray[0] || 'device_01', // First element as device name
    deviceType: 'default',
    telemetry: telemetryPayload
};

return result;

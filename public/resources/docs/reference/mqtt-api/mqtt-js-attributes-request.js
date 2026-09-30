var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost', {
    username: process.env.TOKEN
});
var requestId = 1;

client.on('connect', function () {
    console.log('connected');
    client.subscribe('v1/devices/me/attributes/response/+');
    // Specify keys as comma-separated strings. An empty value returns ALL keys
    // in that scope, e.g. sharedKeys: "". Omit a field to exclude that scope.
    var request = { clientKeys: 'firmwareVersion,serialNumber', sharedKeys: 'targetTemperature,enabled' };
    client.publish('v1/devices/me/attributes/request/' + requestId, JSON.stringify(request));
});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
    client.end();
});

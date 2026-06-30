var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost', {
    username: process.env.TOKEN
});

client.on('connect', function () {
    console.log('connected');
    client.subscribe('v1/gateway/attributes/response');
    // clientKeys/sharedKeys are comma-separated strings. An empty value returns
    // ALL keys in that scope, e.g. sharedKeys: "". Omit a field to exclude a scope.
    var request = { id: 1, device: 'Device A', clientKeys: 'fw_version,battery', sharedKeys: 'targetFwVersion' };
    client.publish('v1/gateway/attributes/request', JSON.stringify(request));
});

client.on('message', function (topic, message) {
    console.log('response.topic: ' + topic);
    console.log('response.body: ' + message.toString());
    client.end();
});

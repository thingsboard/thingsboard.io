
import json
import paho.mqtt.client as mqtt

TOPIC_TWOWAY = 'tb/mqtt-integration-tutorial/fridge/+/rx/twoway'
TOPIC_ONEWAY = 'tb/mqtt-integration-tutorial/fridge/+/rx'
RESPONSE_TOPIC = 'tb/mqtt-integration-tutorial/fridge/SN-001/rx/response'


def on_connect(client, userdata, flags, reason_code, properties):
    print('Connected with result code ' + str(reason_code))
    client.subscribe(TOPIC_TWOWAY)
    client.subscribe(TOPIC_ONEWAY)


def on_message(client, userdata, msg):

    # handle two‑way RPC
    if msg.topic.endswith('/rx/twoway'):
        print('Topic: ' + msg.topic)
        print('Message: ' + msg.payload.decode(errors='replace'))
        print('This is a Two-way RPC call. Going to reply now!')

        try:
            payload = json.loads(msg.payload.decode())
        except json.JSONDecodeError:
            payload = {}

        temperature_value = payload.get('value', payload.get('params'))

        response = {
            'targetTemperature': temperature_value
        }

        response_msg = json.dumps(response)

        print('Sending a response message: ' + response_msg)
        client.publish(RESPONSE_TOPIC, response_msg)
        print('Sent a response message: ' + response_msg)
        return

    # handle one‑way RPC (avoid double processing of twoway topic)
    if msg.topic.endswith('/rx'):
        print('Topic: ' + msg.topic)
        print('Message: ' + msg.payload.decode(errors='replace'))
        print('This is a One-way RPC call.')
        return


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_message = on_message

client.connect('broker.hivemq.com', 1883)
client.loop_forever()

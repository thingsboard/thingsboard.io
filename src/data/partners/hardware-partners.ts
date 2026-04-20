import type { HardwarePartner } from './types';

export const PRIORITY_PARTNERS = [
	'Milesight',
	'Seeed Studio',
	'Lansitec',
	'Shenzhen Beilai Technology Co., Ltd.',
	'MikroTik',
	'MOKO SMART',
];

export const HARDWARE_PARTNERS: HardwarePartner[] = [
	{
		"name": "Efento",
		"slug": "efento",
		"connectivity": [
			"Bluetooth LE",
			"Ethernet",
			"LTE",
			"NB-IoT"
		],
		"industry": [
			"Transportation & Logistics",
			"Healthcare",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Metering",
			"Air Quality Monitoring",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/efento.webp",
		"website": "https://getefento.com/",
		"links": {
			"sensorGuides": [
				{
					"label": "Efento NB-IoT sensors",
					"href": "https://getefento.com/library/efento-nb-iot-sensors-and-things-board/"
				}
			]
		},
		"description": "Offers a wide portfolio of battery powered NB-IoT wireless sensors. Company has been founded in 2014 and since day one focuses on low power consumption wireless IoT devices. You can select a sensor form over 20 types of devices from our portfolio, or talk to us if you need a custom solution to meet your needs."
	},
	{
		"name": "Teltonika Networks",
		"slug": "teltonika",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"Ethernet",
			"GSM/GPRS",
			"NB-IoT",
			"LTE-M",
			"CAT-M/NB",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Fleet Tracking",
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office"
		],
		"hardwareTypes": [
			"Gateways",
			"Sensors",
			"Other devices"
		],
		"logo": "/images/partners/teltonika-networks.webp",
		"website": "https://teltonika-networks.com/?utm_source=iotplatform&utm_medium=referral&utm_content=thingsboard",
		"links": {
			"generalGuides": [
				{
					"label": "Teltonika-Networks devices",
					"href": "https://wiki.teltonika-networks.com/view/Monitoring_with_ThingsBoard_IoT_Platform"
				}
			]
		},
		"description": "Rapidly growing technology company, manufacturing professional network connectivity equipment for international markets. It has developed a wide portfolio of products for the most complex areas of Industry 4.0, Smart City, and Green Energy."
	},
	{
		"name": "Espressif Systems",
		"slug": "espressif",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"Ethernet"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Smart Retail",
			"Smart Farming",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Single-board computers"
		],
		"logo": "/images/partners/espressif.webp",
		"website": "https://www.espressif.com/",
		"links": {
			"microcontrollersGuides": [
				{
					"label": "ESP32 Dev Kit V1",
					"href": "/device-library/pe/esp32-dev-kit-v1/"
				},
				{
					"label": "ESP32 Dev Kit C V4",
					"href": "/device-library/pe/esp32-dev-kit-v4/"
				},
				{
					"label": "ESP32 PICO KIT",
					"href": "/device-library/pe/esp32-pico-kit/"
				}
			]
		},
		"description": "Designs a range of high-performance Wi-Fi+Bluetooth/BLE chipsets and modules."
	},
	{
		"name": "Bivocom",
		"slug": "bivocom",
		"connectivity": [
			"HTTP",
			"MQTT",
			"Ethernet",
			"Wi-Fi",
			"Bluetooth",
			"4G/LTE",
			"NB-IoT",
			"LTE-M",
			"GNSS/GPS",
			"BACnet",
			"CAN",
			"CAT-1",
			"GSM/GPRS",
			"IEC 104",
			"Modbus",
			"OPC UA",
			"USB",
			"RS-485"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Environment Monitoring",
			"Smart Energy",
			"Smart Metering",
			"Smart Farming",
			"Smart Office",
			"Smart Irrigation",
			"Smart Retail",
			"Health Care",
			"Assisted Living",
			"Air Quality Monitoring",
			"Tank Level Monitoring",
			"Water Metering"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/bivocom-logo.png",
		"website": "https://www.bivocom.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Bivocom TG451 IoT Gateway",
					"href": "/device-library/bivocom-tg451/"
				}
			]
		},
		"description": "A leading global IoT & M2M solutions provider with 11+ years of deep expertise, trusted in 90+ countries. Our portfolio spans IoT sensors, 5G/4G/LoRa routers, gateways, modems, RTUs, IoT platforms, and OEM&ODM customised solutions. Together, connect for smarts, sustain for tomorrow."
	},
	{
		"name": "Ezurio",
		"slug": "ezurio",
		"connectivity": [
			"Bluetooth LE",
			"LoRaWAN"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Environmental Monitoring"
		],
		"useCase": [
			"Environment Monitoring",
			"Smart Farming"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/ezurio-logo.png",
		"website": "https://www.ezurio.com/",
		"links": {
			"generalGuide": [
				{
					"label": "Connect S26x LoRaWAN Temperature Sensor to ThingsBoard",
					"href": "/device-library/ce/s26x-lorawan-temperature-sensor/"
				}
			]
		},
		"description": "Turns design possibilities into reality with a comprehensive range of RF modules, system-on-modules, single board computers, internal antennas, IoT devices, and custom solutions. With decades of engineering expertise, Ezurio provides solutions that reduce development costs and time to market. Our global reach and unmatched support are backed by a resilient global supply chain that gives our customers the stability to overcome every design challenge with confidence. Turn design possibilities into reality with Ezurio, your connectivity expert."
	},
	{
		"name": "Seeed Studio",
		"slug": "seeed",
		"connectivity": [
			"Wi-Fi",
			"Ethernet",
			"LoRaWAN",
			"RS-485",
			"RS-232",
			"USB",
			"DI and DO",
			"4G",
			"Wi-Fi/BLE"
		],
		"industry": [
			"Industrial Manufacturing",
			"Smart Buildings",
			"Retail",
			"Smart Cities"
		],
		"useCase": [
			"Smart Office",
			"Smart Retail",
			"Smart Energy"
		],
		"hardwareTypes": [
			"Single-board computers"
		],
		"logo": "/images/partners/seeed.webp",
		"website": "https://www.seeedstudio.com/",
		"links": {
			"generalGuides": [
				{
					"label": "Raspberry Pi with Grove Base Hat",
					"href": "/docs/samples/raspberry/grove/"
				},
				{
					"label": "Seeed Wiki integration",
					"href": "https://wiki.seeedstudio.com/thingsboard_integrated/"
				}
			],
			"singleBoardComputersGuides": [
				{
					"label": "ODYSSEY STM32MP157C",
					"href": "/device-library/pe/odyssey-stm32mp157c/"
				}
			],
			"gatewayGuides": [
				{
					"label": "reComputer R1000",
					"href": "/device-library/edge/recomputer-r1000/"
				},
				{
					"label": "reComputer R1100",
					"href": "/device-library/edge/recomputer-r1100/"
				}
			]
		},
		"description": "Whether you are a developer, technical supplier, or industry player, we provide products and services for your IoT needs.",
		"showcases": [
			{
				"label": "Hailo-Powered Car Park Management",
				"href": "https://seeed-projects.github.io/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/docs/Chapter_6-RaspberryPi_and_AIoT/Car_Park_Solution_Management_with_Thingsboard/"
			}
		]
	},
	{
		"name": "Milesight",
		"slug": "milesight",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"Wi-Fi",
			"Ethernet"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/milesight-logo.webp",
		"website": "https://www.milesight.com/",
		"links": {
			"generalGuides": [
				{
					"label": "ThingsBoard Platform-Milesight Integration via TTI",
					"href": "https://support.milesight-iot.com/support/solutions/articles/73000658954-thingsboard-platform-milesight-integration-via-tti"
				},
				{
					"label": "ThingsBoard Platform-Milesight Integration via HTTP",
					"href": "https://support.milesight-iot.com/support/solutions/articles/73000658955-thingsboard-platform-milesight-integration-via-http"
				},
				{
					"label": "ThingsBoard Platform-Milesight Integration via MQTT",
					"href": "https://support.milesight-iot.com/support/solutions/articles/73000658957-thingsboard-platform-milesight-integration-via-mqtt"
				}
			],
			"sensorGuides": [
				{
					"label": "AM308 Lorawan 9-IN-1 IAQ Sensor",
					"href": "/device-library/pe/am308-sensor/"
				},
				{
					"label": "WS202 PIR & Light LoRaWAN® Sensor",
					"href": "/device-library/pe/ws202-pir-and-light-sensor/"
				}
			],
			"gatewayGuides": [
				{
					"label": "UG56 LoRaWAN® Gateway",
					"href": "/device-library/pe/ug56-lorawan-gateway/"
				},
				{
					"label": "UG65 LoRaWAN® Semi-Industrial Gateway",
					"href": "/device-library/pe/ug65-lorawan-gateway/"
				},
				{
					"label": "UG67 LoRaWAN® Gateway",
					"href": "/device-library/pe/ug67-lorawan-gateway/"
				}
			],
			"otherDevicesGuides": [
				{
					"label": "WS101 LoRaWAN® Smart Button",
					"href": "/device-library/pe/ws101-smart-button/"
				},
				{
					"label": "VS121 AI workplace sensor",
					"href": "/device-library/pe/vs-121/"
				}
			]
		},
		"description": "Leading innovator in IoT technologies such as sensing, LoRaWAN®, AI, and 5G, has emerged as a frontrunner by unveiling a diverse array of advanced products, like dependable gateways, indoor air quality sensors, occupancy trackers, water leak detectors, and more."
	},
	{
		"name": "Smartico",
		"slug": "smartico",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Energy",
			"Water Metering",
			"Fleet Tracking",
			"Smart Metering",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/smartico.webp",
		"website": "https://www.smartico.biz/en/",
		"links": {
			"sensorGuides": [
				{
					"label": "Electricity Meter",
					"href": "/docs/samples/smartico/elec-meter-lorawan/Electricity_Meter_LoRaWAN/"
				},
				{
					"label": "Gas Meter",
					"href": "/docs/samples/smartico/gas-meter-lorawan/Gas_Meter_LoRaWAN/"
				},
				{
					"label": "Gas Shutoff Valve",
					"href": "/docs/samples/smartico/gas-valve-lorawan/Gas_Valve_LoRaWAN/"
				},
				{
					"label": "Leaks Detector",
					"href": "/docs/samples/smartico/leaks-detector-lorawan/Leaks_Detector_LoRaWAN/"
				},
				{
					"label": "Water meter Pulse Sensor",
					"href": "/docs/samples/smartico/pulse-sensor-lorawan/Pulse_Sensor_LoRaWAN/"
				},
				{
					"label": "Water meter wM-Bus Reader",
					"href": "/docs/samples/smartico/wm-bus-lorawan/wMBus_Reader_LoRaWAN/"
				}
			]
		},
		"description": "Research and production complex with its own design bureau, production base, and specialized software development department"
	},
	{
		"name": "Digital Communications Technologies",
		"slug": "digitalcomtech",
		"connectivity": [
			"Wi-Fi",
			"BLE",
			"Cellular 4G Cat 4 and 4G Cat1",
			"Satellite (Iridium, Orbcomm)",
			"Sigfox",
			"MQTT",
			"HTTP",
			"SMS"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Air Quality Monitoring",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/DCT-Logo-Standard-Color-01.webp",
		"website": "https://www.digitalcomtech.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Syrus 4 IoT Telematics Gateway",
					"href": "/docs/samples/syrus/syrus/"
				}
			]
		},
		"description": "Since 2000, DCT has been developing IoT devices and accessories for Fleet Telematics Applications and Industrial Solutions that are trusted by integrators and service providers around the globe. Their expertise in product design and development together with firmware and software makes the perfect combination for developers to start building amazing applications."
	},
	{
		"name": "Nettra",
		"slug": "nettra",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"Ethernet",
			"GSM/GPRS"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Security"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Farming",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/nettra.webp",
		"website": "https://nettra.tech/",
		"links": {
			"generalGuides": [
				{
					"label": "Nettra RTU",
					"href": "/docs/samples/nettrartu+/rtu_temp_sensor/"
				}
			]
		},
		"description": "We provide comprehensive hardware and software IoT solutions."
	},
	{
		"name": "Solandtec",
		"slug": "solandtec",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"Ethernet",
			"GSM/GPRS",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Fleet Tracking",
			"Smart Farming",
			"Smart Irrigation",
			"Smart Energy"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/solandtec.webp",
		"website": "https://solandtec.com/",
		"links": {
			"otherGuides": [
				{
					"label": "ADAM-6717",
					"href": "/docs/samples/solandtec/thingsboard-guide-solandtec/"
				}
			]
		},
		"description": "With 5+ years' experience, excels in tailored automation, enhancing production and cutting costs. We adeptly apply tech to meet unique needs, reflecting commitment to excellence. Embracing Industry 4.0, we seamlessly integrate IoT, enabling data-driven decisions and proactive steps. We pride in enhancing efficiency and connectivity for evolving businesses."
	},
	{
		"name": "Actility",
		"slug": "actility",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"GSM/GPRS",
			"Modbus",
			"BACnet"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Trackers",
			"Gateways"
		],
		"logo": "/images/partners/actility.webp",
		"website": "https://www.actility.com/",
		"links": {
			"trackersGuides": [
				{
					"label": "Abeeway Micro Tracker and Abeeway Industrial Tracker",
					"href": "/docs/samples/abeeway/tracker/"
				}
			]
		},
		"description": "Strong background in large-scale project delivery and a heritage in carrier-grade systems, with leading customer deployments worldwide, making it the global leader in IoT connectivity solutions deployment."
	},
	{
		"name": "SODAQ",
		"slug": "sodaq",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"GSM/GPRS"
		],
		"industry": [
			"Smart Cities",
			"Agriculture",
			"Transportation & Logistics",
			"Environmental Monitoring"
		],
		"useCase": [
			"Fleet Tracking",
			"Smart Farming",
			"Waste Management",
			"Environment Monitoring",
			"Smart Energy",
			"Smart Irrigation",
			"Air Quality Monitoring",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Sensors",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/sodaq.webp",
		"website": "https://sodaq.com/",
		"links": {
			"generalGuides": [
				{
					"label": "SODAQ Universal Tracker",
					"href": "/docs/samples/sodaq/sodaq/"
				}
			]
		},
		"description": "What drives us is the passion to create scalable electronics solutions that work anywhere. We have implemented projects throughout developing countries, from Peru to Sri Lanka, and we will continue working where we can have the highest impact."
	},
	{
		"name": "SensiEDGE",
		"slug": "sensiedge",
		"connectivity": [
			"Bluetooth LE",
			"LoRaWAN"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Fleet Tracking",
			"Air Quality Monitoring",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Sensors"
		],
		"logo": "/images/partners/sensiedge_logo.webp",
		"website": "https://www.sensiedge.com/",
		"links": {
			"singleBoardComputersGuides": [
				{
					"label": "SensiLoRa 2.0 V1.2",
					"href": "/docs/samples/sensiedge/getting_started_sensiLoRa.pdf"
				},
				{
					"label": "SensiBLE 1.0 & 2.1",
					"href": "/docs/samples/sensiedge/connect_sensi_ble.pdf"
				}
			]
		},
		"description": "Fully customisable solution for developers who want to focus on their own applications and core competencies rather than the underlying hardware platform or production logistics when creating products for the IoT."
	},
	{
		"name": "Sensy32",
		"slug": "sensy32",
		"connectivity": [
			"Bluetooth LE",
			"Wi-Fi"
		],
		"industry": [
			"Smart Cities",
			"Agriculture",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Retail",
			"Smart Farming",
			"Air Quality Monitoring"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/sensy32-logo.svg",
		"website": "https://sensy32.io/",
		"links": {
			"singleBoardComputersGuides": [
				{
					"label": "Connect Sensy32 to ThingsBoard",
					"href": "/device-library/ce/sensy32/"
				}
			]
		},
		"description": "All-in-One Sensor IoT Board with LCD designed for sensor enthusiasts, developers, and IoT creators. Powered by ESP32-S3 and packed with a wide array of sensors, it enables seamless monitoring, analysis, and visualization of real-world data. Backed by a robust ESP32-S3 Wifi and Bluetooth module, Sensy32 is not just a board; it's a gateway to endless possibilities."
	},
	{
		"name": "DECODE",
		"slug": "decode",
		"connectivity": [
			"GSM/GPRS",
			"RS232",
			"RS485",
			"M-Bus"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Farming",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/decode.webp",
		"website": "https://www.decode.rs/",
		"links": {
			"otherDevicesGuides": [
				{
					"label": "Decode DL28",
					"href": "/docs/user-guide/integrations/"
				}
			]
		},
		"description": "Serbian company with extensive experience in design, engineering and production of devices for industrial communication and telemetry."
	},
	{
		"name": "TEKTELIC Communications Inc.",
		"slug": "tektelic",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"GSM/GPRS",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/tektelic.webp",
		"website": "https://tektelic.com/",
		"links": {},
		"description": "Leading supplier of LoRaWAN IoT equipment including best-in-class gateways and end devices."
	},
	{
		"name": "AKKR8",
		"slug": "akkr8",
		"connectivity": [
			"LTE-M",
			"NB-IoT"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Environment Monitoring",
			"Smart Office",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/logo-akkr8.webp",
		"website": "https://www.akkr8.io/",
		"links": {},
		"description": "Developed and manufactured in Sweden, flexible sensor-to-platform solution designed for scalable, low-maintenance IoT deployments. It is well-suited for smart buildings, facility management, utilities, and industrial environments requiring robust connectivity and modular sensor integration.<br> Supports multiple power options—battery, solar, or mains—making it adaptable to both remote and on-site installations. It connects over LTE-M for reliable, low-power communication in constrained network conditions.<br> As a BLE gateway, Integrates seamlessly with sensors from industry leaders such as Aguardio, ELA Innovation, and Smart Sensor Devices, enabling applications like leak detection, environmental monitoring, occupancy sensing, and air quality measurement. The device is sold pre-configured for the ThingsBoard platform, providing out-of-the-box compatibility and simplified device management at scale."
	},
	{
		"name": "ROLTEK",
		"slug": "roltek",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"GSM/GPRS",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Office",
			"Smart Energy"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/roltek_logo_dark.webp",
		"website": "https://www.roltek.com.tr/",
		"links": {
			"generalGuides": [
				{
					"label": "Fast IoT Platform",
					"href": "https://www.roltek.com.tr/en/docs/getting-started-with-fast-iot-platform/"
				}
			],
			"otherDevicesGuides": [
				{
					"label": "Integration guide",
					"href": "/docs/samples/roltek/roltek/"
				}
			]
		},
		"description": "Provides end-to-end IoT solutions that enable rapid development, management, and scalability of IoT projects, either through cloud-based or on-premise deployments. Our hardware IoT Gateway products come with different communication options such as ISM and NarrowBand RF, 4G/LTE, WiFi, NB-IoT, and LoRaWan, making them suitable for harsh field conditions."
	},
	{
		"name": "Radionode",
		"slug": "radionode",
		"connectivity": [
			"LAN",
			"Wi-Fi",
			"LoRaWAN",
			"LTE",
			"RS485"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring",
			"Lifescience",
			"Warehouses",
			"Food storage",
			"Construction",
			"Mining",
			"Smart Farms",
			"Pharmaceutical"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Smart Farming",
			"Fleet Tracking",
			"Health Care",
			"Air Quality Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/radionode-logo.png",
		"website": "https://en.radionode365.com/kr/",
		"links": {
			"generalGuides": [
				{
					"label": "Connect RN172plus series to ThingBoard",
					"href": "/device-library/ce/rn172wcd/"
				},
				{
					"label": "Connect RN-320 BTH LoRaWAN Temperature and Humidity sensor to ThingBoard",
					"href": "/device-library/pe/rn320bth/"
				}
			]
		},
		"description": "Radionode is a global leader in environmental monitoring solutions, offering advanced sensors and IoT platforms for industries like life sciences, cold chain logistics, agriculture, construction, and smart buildings. Its LoRaWAN RN320 series features long battery life, ePaper display, alarms, and microSD backup, while the UA-Series USB sensors support  36+ gases and parameters with calibration-ready, plug-and-play design. With the Radionode365 cloud, users gain real-time monitoring, alerts, and predictive insights."
	},
	{
		"name": "Kernel Sistemi",
		"slug": "kernelgroup",
		"connectivity": [
			"GSM/GPRS",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Farming",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/kernel_logo.webp",
		"website": "https://www.kernelgroup.it/",
		"links": {
			"generalGuides": [
				{
					"label": "PLC KERNEL",
					"href": "/docs/samples/kernel/kernel/"
				},
				{
					"label": "Integration guide",
					"href": "https://www.kernelgroup.it/files/Thingsboard%20PE.pdf"
				}
			]
		},
		"description": "Designs and produces electronic solutions for automation, industrial process control, photovoltaics, energy management and home automation."
	},
	{
		"name": "Shenzhen Beilai Technology Co., Ltd.",
		"slug": "beilai",
		"connectivity": [
			"Bluetooth LE",
			"LoRaWAN",
			"Wi-Fi",
			"4G",
			"Ethernet"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/bliiot-logo.webp",
		"website": "https://bliiot.com/",
		"links": {
			"otherDevicesGuides": [
				{
					"label": "4G LTE Industrial Router",
					"href": "/docs/samples/kingpigeon/kingpigeon/"
				},
				{
					"label": "Flexible Device–Edge–Cloud IoT Solution with ARMxy & ThingsBoard",
					"href": "https://bliiot.com/cases-detail/flexible-device%E2%80%93edge%E2%80%93cloud-iot-solution-with-armxy-thingsboard"
				}
			]
		},
		"description": "Focus on the research and development and manufacturing of ARM industrial computers, edge computing gateways, industrial Internet of Things, industrial Internet of Things gateways and IO systems, industrial automation gateways and IO systems, building HVAC Internet of Things gateways and IO systems, power energy Internet of Things gateways and IO systems, etc."
	},
	{
		"name": "MachineAstro Pvt Ltd",
		"slug": "machineastro",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth 5.0",
			"RS485"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Asset Monitoring",
			"Condition Monitoring",
			"Smart Retail",
			"Smart Farming",
			"Smart Irrigation"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/machineastro-logo.png",
		"website": "https://machineastro.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "VIBit integration guide",
					"href": "/device-library/ce/vibit/"
				},
				{
					"label": "VIBit-BP integration guide",
					"href": "/device-library/ce/vibit-bp/"
				}
			]
		},
		"description": "MachineAstro provides AI-powered predictive maintenance and energy analytics solutions. Our VIBit wireless vibration & temperature sensors enable real-time machine condition monitoring. The iEdge360 platform delivers 400+ fault diagnostics, anomaly detection, and energy insights. Our AI video analytics ensures workplace safety with fire, smoke, and PPE compliance monitoring."
	},
	{
		"name": "MClimate",
		"slug": "mclimate",
		"connectivity": [
			"LoRaWAN"
		],
		"industry": [
			"Smart Buildings",
			"Energy Management"
		],
		"useCase": [
			"Air Quality Monitoring",
			"Smart Energy",
			"Smart Office",
			"Assisted Living"
		],
		"hardwareTypes": [
			"Sensors"
		],
		"logo": "/images/partners/mclimate-logo.png",
		"website": "https://mclimate.eu/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Connect the MClimate 16A Switch & Power Meter compact 16A relay and electricity meter to ThingsBoard",
					"href": "/device-library/pe/16a-switch-and-power-meter-compact-16a-relay-and-electricity-meter/"
				},
				{
					"label": "Connect the MClimate CO2 Display lite to ThingsBoard",
					"href": "/device-library/pe/co2-display-lite-temperature-and-humidity-sensor/"
				},
				{
					"label": "Connect the MClimate Vicki Smart Radiator Thermostat to ThingsBoard",
					"href": "/device-library/pe/vicki-smart-radiator-thermostat/"
				}
			]
		},
		"description": "Europe-based company specializing in the development of IoT hardware devices and software solutions that prioritize energy efficiency, air quality, and water loss prevention to make any building smart. Our goal is through partnerships with global entities, technology providers, end-users, and institutions, to retrofit buildings into sustainable places that enhance the well-being and health of their occupants. Moreover, we aid companies in measuring buildings'  data and achieving their ESG goals along the way. We bring best-in-class complete smart solutions in combination with operational excellence, fast response time, and reliable logistics to our partners. Our core philosophy revolves around fostering strong, transparent relationships with our partners and distributors based on our commitment to maintain the highest standards."
	},
	{
		"name": "Senquip",
		"slug": "senquip",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"GSM/GPRS",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus",
			"CAN Bus"
		],
		"industry": [
			"Agriculture",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/senquip.webp",
		"website": "https://www.senquip.com",
		"links": {
			"generalGuides": [
				{
					"label": "Senquip telemetry device",
					"href": "/docs/samples/senquip/senquip/"
				},
				{
					"label": "Integration guide",
					"href": "https://cdn.senquip.com/wp-content/uploads/2024/04/18103454/APN0015-Rev-1.1-Connecting-Senquip-Devices-to-the-ThingsBoard.pdf"
				}
			]
		},
		"description": "Rugged, programmable telemetry devices that connect to any industrial sensor or system."
	},
	{
		"name": "Dusun",
		"slug": "dusun",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Agriculture",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/dusun.webp",
		"website": "https://www.dusuniot.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "DSGW-210 Smart Gateway Hub",
					"href": "/device-library/pe/dsgw-210-iot-gateway-hub/"
				}
			]
		},
		"description": "Provides various kinds of gateways, hardware products and IOT service"
	},
	{
		"name": "monoZ",
		"slug": "monoz",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management"
		],
		"useCase": [
			"Smart Farming",
			"Smart Irrigation",
			"Water Metering",
			"Tank Level Monitoring",
			"Smart Metering",
			"Smart Energy",
			"Environment Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Other devices"
		],
		"logo": "/images/partners/monoZ.webp",
		"website": "https://monoz.io/",
		"links": {
			"trackersGuides": [
				{
					"label": "LPWA GPS Tracker",
					"href": "/docs/samples/monoz/LPWA_GPS_Tracker_with_monoZ/"
				}
			]
		},
		"description": "Aim to assist System Integrators and Enterprises in connecting their assets (things) to the internet at the lowest possible cost and time. Belong to the first few E2C IoT enablers in the world to offer all the components required for businesses to make their ideas a reality."
	},
	{
		"name": "EXXN",
		"slug": "exxn",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Environment Monitoring",
			"Air Quality Monitoring"
		],
		"hardwareTypes": [
			"Gateways",
			"Sensors",
			"Other devices"
		],
		"logo": "/images/partners/exxn.webp",
		"website": "https://exxn.es/en/",
		"links": {
			"gatewayGuides": [
				{
					"label": "EXXN IoT Gateway",
					"href": "/docs/samples/exxn/exxn/"
				}
			]
		},
		"description": "We specialize in integrating technology into your business to enhance efficiency and productivity. Our multipurpose gateways, equipped with an ARM processor, are customizable to meet the specific needs of each customer and use case."
	},
	{
		"name": "Fusion DAQ",
		"slug": "fusiondaq",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Environment Monitoring",
			"Smart Energy",
			"Smart Farming",
			"Smart Irrigation",
			"Air Quality Monitoring",
			"Water Metering",
			"Smart Metering",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/FusionDAQ-Nav-Logo.webp",
		"website": "https://fusiondaq.com/",
		"links": {
			"otherDevicesGuides": [
				{
					"label": "FDQ-99900 MI-8",
					"href": "/docs/samples/fusion-daq/fusion-daq/"
				}
			]
		},
		"description": "Develops and maintains a core product line of data acquisition components and accessories. This includes electronic design, electromechanical integration, PCB and component assembly, as well as software, both embedded and PC."
	},
	{
		"name": "Yobiiq B.V.",
		"slug": "yobiiq",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus",
			"BACnet"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management"
		],
		"useCase": [
			"Smart Office",
			"Air Quality Monitoring",
			"Smart Energy"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/Yobiiq_Logo_Primary.webp",
		"website": "https://yobiiq.com/",
		"links": {
			"sensorGuides": [
				{
					"label": "SD-1001",
					"href": "https://docs.yobiiq.com/thingsboard/sd-1001-integration-guide"
				}
			]
		},
		"description": "The best way to predict the future is by creating it. As an IoT Solutions Company, we develop smart solutions daily, tailored to your business and objectives. We pride ourselves on being a bit different, boosted by a healty dose of honest, straightforward communication without exaggeration. Manufacturing and creating devices that work, period is what we do."
	},
	{
		"name": "YuDash",
		"slug": "yudash",
		"connectivity": [
			"4G/LTE",
			"LAN",
			"Wi-Fi"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/yudash_logo.webp",
		"website": "https://www.yudash.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "YuDash IoT Gateway",
					"href": "https://docs.yudash.com/integration-guides/iot-platform-integration/thingsboard"
				}
			]
		},
		"description": "Industrial IoT gateway manufacturer, offering flexible, user-friendly, and cost-effective products. Cloud connectivity through 4G/LTE, Ethernet and WiFi is available. Industrial protocols like Modbus-RS485, Modbus-TCP/IP, Analog and I2C are supported to IoT enable Industrial PLCs, Instruments and Sensors. Our products are used in Environment, Weather, Energy, Remote Asset Management and Industry 4.0 applications."
	},
	{
		"name": "MOKO SMART",
		"slug": "mokosmart",
		"connectivity": [
			"Bluetooth LE",
			"GSM/GPRS",
			"LoRaWAN",
			"LTE-M",
			"NB-IoT",
			"Sigfox",
			"CAT-M/NB",
			"MQTT",
			"Wi-Fi",
			"Ethernet",
			"Wirepas"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Smart Retail",
			"Fleet Tracking",
			"Health Care",
			"Air Quality Monitoring"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/moko-smart-logo.webp",
		"website": "https://www.mokosmart.com/",
		"links": {
			"generalGuides": [
				{
					"label": "MOKO SMART LoRaWAN device",
					"href": "/docs/samples/moko-smart/moko-smart-guide/"
				},
				{
					"label": "How to connect LW001-BG PRO LoRaWAN Tracker to ThingsBoard?",
					"href": "/device-library/ce/lw001-bg-pro/"
				}
			]
		},
		"description": "Leading manufacturer and provider of ODM, OEM, and IoT devices in China. Established in 2013, created its own IoT brand, which specializes in Bluetooth Low Energy, LoRaWAN, Wi-Fi, RFID, GPS, LTE, UWB, and other wireless technologies. This commitment to innovation and diverse wireless products drives our vision of a connected future."
	},
	{
		"name": "Netvox Technology Co., Ltd.",
		"slug": "netvox",
		"connectivity": [
			"LoRaWAN"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Smart Retail",
			"Smart Farming",
			"Air Quality Monitoring",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors"
		],
		"logo": "/images/partners/netvox-logo.webp",
		"website": "http://www.netvox.com.tw/",
		"links": {
			"generalGuides": [
				{
					"label": "Netvox LoRaWAN Devices",
					"href": "/docs/samples/netvox/netvox-guide/"
				}
			]
		},
		"description": "Our products follow the standard LoRaWAN V1.0.2 specification and they will be compatible as long as the network server and gateway device also follow the protocol. We have developed over 400 LoRaWAN end devices to work with existing systems. There are more than 200 items in our LoRaWAN magnetic-mounted R718 series that comes with an IP 65/67 housing, and most of them are battery powered with long battery life."
	},
	{
		"name": "National Control Devices, LLC",
		"slug": "ncd",
		"connectivity": [
			"Modbus",
			"GSM/GPRS",
			"MQTT",
			"Wi-Fi",
			"Ethernet"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Sensors",
			"Gateways"
		],
		"logo": "/images/partners/ncd-logo.webp",
		"website": "https://ncd.io/",
		"links": {
			"sensorGuides": [
				{
					"label": "NCD Vibration Temperature Sensor",
					"href": "/device-library/pe/ncd-vibration-temperature-sensor/"
				}
			]
		},
		"description": "IoT Hardware Design and Development Company specializing in Wireless IoT sensors. It offers a wide range of plug-and-play devices for monitoring temperature, humidity, pressure, energy, acceleration, gas, and industrial I/O. Our devices allow control over pumps, valves, motors, relays, and more. All products are manufactured in the USA. Since 1995, NCD.io has been providing custom IoT hardware and firmware solutions."
	},
	{
		"name": "Temco Controls",
		"slug": "temcocontrols",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"BACnet",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Office",
			"Smart Energy",
			"Air Quality Monitoring",
			"Smart Metering",
			"Smart Retail",
			"Health Care"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/temco-controls-logo.webp",
		"website": "https://temcocontrols.com/",
		"links": {
			"otherDevicesGuides": [
				{
					"label": "Temco T3E-6CT",
					"href": "/device-library/ce/temco-controls-t3e-6ct-and-hum-w1/"
				},
				{
					"label": "Temco Tstat10",
					"href": "/device-library/ce/temco-controls-tstat-10/"
				}
			]
		},
		"description": "Specializes in manufacturing low-cost sensors and controllers for the HVAC industry. We proudly provide solutions with no license or recurring fees to our customers from all over the world. Both our software and device firmware are open source, making us one of the most open building automation systems on the market. We make collaboration simple and straightforward with easy purchases on the web and open, long-term support on the forum."
	},
	{
		"name": "Arwin Technology Limited",
		"slug": "arwin-technology-limited",
		"connectivity": [
			"NB-IoT",
			"LoRaWAN"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Smart Buildings",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Metering",
			"Air Quality Monitoring",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors"
		],
		"logo": "/images/partners/senso-8-logo.png",
		"website": "https://www.senso8.com/",
		"links": {
			"sensorGuides": [
				{
					"label": "LRS10701 LoRaWAN IAQ Sensor",
					"href": "/device-library/ce/lrs10701/"
				},
				{
					"label": "LRS20100 LoRaWAN Temperature and Humidity Sensor",
					"href": "/device-library/ce/lrs20100/"
				}
			]
		},
		"description": "SENSO8 is the registered product trademark of Arwin Technology Limited. We were founded in 2015 at the Hong Kong Science Park. Our team, with over 20 years of Fortune 500 expertise, delivers end-to-end solutions from embedded design to cloud systems. We specialize in advanced wireless technologies (NB-IoT, LoRa, BLE, Wi-Fi) as well as a wide range of sensor applications. SENSO8 offers best-in-class IoT-sensor solutions - Indoor Air Quality(IAQ) Sensors, Water Leak Sensors, Temperature Sensors, Smart Power Meters, Dry Contact Sensors, etc. Most of the sensor models are battery-powered with years of battery life, which makes installation easier."
	},
	{
		"name": "Atomsenses",
		"slug": "atomsenses",
		"connectivity": [
			"LoRaWAN",
			"Modbus",
			"NB-IoT",
			"Bluetooth LE"
		],
		"industry": [
			"Smart Cities",
			"Agriculture",
			"Healthcare",
			"Smart Buildings",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Smart Farming",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/atomsenses-logo.webp",
		"website": "https://www.atomsenses.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Connect Atomsenses Indoor LoRaWAN® Gateway",
					"href": "https://www.atomsenses.com/how-to-connect-indoor-lorawan-gateway-to-thingsboard-in-collaboration-with-atomsenses/"
				}
			]
		},
		"description": "Specialist IoT solution provider focusing on Lorawan sensors for indoor air quality monitoring, our vision is to transform how we manage and maintain healthy indoor environments."
	},
	{
		"name": "Digicom B810 Spa",
		"slug": "digicom",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/digicom-logo.webp",
		"website": "https://www.digicom.it/",
		"links": {
			"generalGuides": [
				{
					"label": "Energy Meter monitoring",
					"href": "/docs/samples/digicom/energy-meter-monitoring-with-thingsboard-iot-plaƞorm/"
				}
			]
		},
		"description": "Brand with over 45 years of history and experience in the development and management of Internet-connected products. In 2017, Digicom Spa joined the B810 Group, becoming a leading company in the IoT sector enriching its skills and expanding its offer to advanced solutions in various industrial sectors. We offer a wide range of “connected solutions” in the fields of telecommunications, industrial applications, energy, elevators and escalators, providing design, manufacturing, assembly, testing, logistics and support services."
	},
	{
		"name": "MikroTik",
		"slug": "mikrotik",
		"connectivity": [
			"Bluetooth",
			"GSM/GPRS",
			"LoRaWAN",
			"Ethernet",
			"Wi-Fi",
			"Modbus",
			"NB-IoT",
			"CAT-M/NB"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers",
			"Other devices"
		],
		"logo": "/images/partners/mikrotik-logo.webp",
		"website": "https://mikrotik.com/",
		"links": {
			"generalGuides": [
				{
					"label": "MQTT and ThingsBoard configuration",
					"href": "https://help.mikrotik.com/docs/spaces/ROS/pages/105742352/MQTT+and+ThingsBoard+configuration"
				}
			],
			"trackersGuides": [
				{
					"label": "Bluetooth tag-tracking using MQTT and ThingsBoard",
					"href": "https://help.mikrotik.com/docs/spaces/ROS/pages/176914435/Bluetooth+tag-tracking+using+MQTT+and+ThingsBoard"
				},
				{
					"label": "GPS-tracking using MQTT and ThingsBoard",
					"href": "https://help.mikrotik.com/docs/spaces/ROS/pages/166920428/GPS-tracking+using+MQTT+and+ThingsBoard"
				},
				{
					"label": "TG-BT5-OUT tag",
					"href": "https://help.mikrotik.com/docs/spaces/UM/pages/143327239/Sending+temperature+readings+from+the+TG-BT5-OUT+tag+to+ThingsBoard"
				}
			],
			"otherDevicesGuides": [
				{
					"label": "Container - ThingsBoard MQTT/HTTP server",
					"href": "https://help.mikrotik.com/docs/spaces/ROS/pages/166920348/Container+-+ThingsBoard+MQTT+HTTP+server"
				}
			]
		},
		"description": "EU-based leader in networking hardware and software, providing high-performance routers, switches, 5G and wireless solutions. Our technology powers ISPs, enterprises, and IoT networks—enabling everything from asset tracking to smart city integration and adding wireless connectivity to legacy sensors. We focus on efficiency, security, and scalability to build reliable, cost-effective networks worldwide."
	},
	{
		"name": "Lansitec",
		"slug": "lansitec",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Fleet Tracking",
			"Smart Farming",
			"Health Care",
			"Smart Office",
			"Smart Retail"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/lansitec-logo.webp",
		"website": "https://www.lansitec.com/",
		"links": {
			"sensorGuides": [
				{
					"label": "Asset Management Tracker",
					"href": "/device-library/ce/asset-management-tracker/"
				},
				{
					"label": "Helmet Sensor",
					"href": "/device-library/ce/helmet-sensor/"
				},
				{
					"label": "Temperature and Humidity Sensor",
					"href": "/device-library/ce/temperature-humidity-sensor/"
				},
				{
					"label": "Valve Positioning Sensor",
					"href": "/device-library/paas/valve-positioning-sensor/"
				}
			],
			"trackersGuides": [
				{
					"label": "Badge Tracker",
					"href": "/device-library/ce/badge-tracker/"
				},
				{
					"label": "Cat-1 Badge Tracker",
					"href": "/device-library/ce/cat1-badge-tracker/"
				},
				{
					"label": "Cat-1 Container Tracker",
					"href": "/device-library/ce/cat1-container-tracker/"
				},
				{
					"label": "Cat-1 Macro Tracker",
					"href": "/device-library/ce/cat1-macro-tracker/"
				},
				{
					"label": "Contact Tracing Badge",
					"href": "/device-library/ce/contact-tracing-badge/"
				},
				{
					"label": "Container Tracker",
					"href": "/device-library/ce/container-tracker/"
				},
				{
					"label": "Macro Tracker",
					"href": "/device-library/ce/macro-tracker/"
				},
				{
					"label": "Solar Tracker",
					"href": "/device-library/ce/solar-tracker/"
				},
				{
					"label": "Tracking Label",
					"href": "/device-library/ce/tracking-label/"
				},
				{
					"label": "UWB Asset Management Tracker",
					"href": "/device-library/ce/uwb-asset-management-tracker/"
				},
				{
					"label": "UWB Anchor",
					"href": "/device-library/ce/uwb-anchor/"
				},
				{
					"label": "UWB Badge Tracker",
					"href": "/device-library/ce/uwb-badge-tracker/"
				},
				{
					"label": "UWB Container Tracker",
					"href": "/device-library/ce/uwb-container-tracker/"
				}
			],
			"gatewayGuides": [
				{
					"label": "Cat-1 Compact Bluetooth Gateway",
					"href": "/device-library/ce/cat1-compact-bluetooth-gateway/"
				},
				{
					"label": "Cat-1 Macro Bluetooth Gateway",
					"href": "/device-library/ce/cat1-macro-bluetooth-gateway/"
				},
				{
					"label": "Cat-1 Solar Bluetooth Gateway",
					"href": "/device-library/ce/cat1-solar-bluetooth-gateway/"
				},
				{
					"label": "Compact Bluetooth Gateway",
					"href": "/device-library/ce/compact-bluetooth-gateway/"
				},
				{
					"label": "Indoor Bluetooth Gateway",
					"href": "/device-library/ce/indoor-bluetooth-gateway/"
				},
				{
					"label": "Macro Bluetooth Gateway",
					"href": "/device-library/ce/macro-bluetooth-gateway/"
				},
				{
					"label": "Macro Proximity Gateway",
					"href": "/device-library/ce/macro-proximity-gateway/"
				},
				{
					"label": "Micro Bluetooth Gateway",
					"href": "/device-library/ce/micro-bluetooth-gateway/"
				},
				{
					"label": "Socketsync Bluetooth Gateway",
					"href": "/device-library/ce/socketsync-bluetooth-gateway/"
				},
				{
					"label": "Socketsync Proximity Gateway",
					"href": "/device-library/ce/socketsync-proximity-gateway/"
				},
				{
					"label": "Solar Bluetooth Gateway",
					"href": "/device-library/ce/solar-bluetooth-gateway/"
				}
			]
		},
		"description": "Forefront of technological innovation, specializing in the provision of affordable, compact, and highly efficient hardware designed to accurately locate people, resources, and assets. Our unique approach combines cutting-edge trackers, gateways, tags, and sensors with advanced software and algorithms to optimize performance and ensure the best possible outcomes."
	},
	{
		"name": "Elastel",
		"slug": "elastel",
		"connectivity": [
			"Bluetooth LE",
			"GSM/GPRS",
			"LoRaWAN",
			"LTE",
			"4G",
			"LTE-M",
			"NB-IoT",
			"Wi-Fi",
			"HTTP",
			"MQTT",
			"Ethernet",
			"RS485"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Smart Metering",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Gateways",
			"Single-board computers"
		],
		"logo": "/images/partners/elastel-logo.webp",
		"website": "https://www.elastel.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Industrial Raspberry Pi EG500",
					"href": "/device-library/ce/raspberry-pi-cm4/"
				}
			]
		},
		"description": "Technology-driven company providing IIoT products and services globally. With 10+ years of industry experience, developed series Open, High-performance, Reliable, and Easy-to-use IIoT devices like Industrial Raspberry Pi, Arm-based IIoT Gateway, Industrial Cellular Router, etc. These edge hardware allows customers flexibly develop their specific applications for IoT needs."
	},
	{
		"name": "Shenzhen Dragino Technology Development  Co.,Ltd",
		"slug": "dragino",
		"connectivity": [
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"CAT-1"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/dragino-logo.webp",
		"website": "http://www.dragino.com/",
		"links": {
			"generalGuides": [
				{
					"label": "Dragino -NB and -CB series devices",
					"href": "https://wiki.dragino.com/xwiki/bin/view/Main/ThingsBoard"
				}
			]
		},
		"description": "Specializes in IoT solutions, with a focus on LoRaWAN and NB-IoT technologies. We offer end-to-end IoT services, including hardware, software, and network solutions, enabling customers to deploy and manage IoT networks efficiently. Our globally trusted products and solutions ensure rapid deployment, scalability, and customer success in the competitive IoT market."
	},
	{
		"name": "Haltian",
		"slug": "haltian",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"LTE-M",
			"Modbus",
			"Wirepas"
		],
		"industry": [
			"Smart Cities",
			"Healthcare",
			"Industrial Manufacturing",
			"Energy Management",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Office",
			"Air Quality Monitoring",
			"Smart Energy",
			"Waste Management",
			"Tank Level Monitoring",
			"Fleet Tracking",
			"Health Care"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/haltian-logo.webp",
		"website": "https://haltian.com/",
		"links": {
			"generalGuides": [
				{
					"label": "Integration guide",
					"href": "https://support.haltian.com/knowledgebase/thingsboard/"
				}
			]
		},
		"description": "Secure IoT sensor solution for enterprises. Includes mesh-connected sensors, gateways, cellular connectivity and device management cloud. Implemented in commercial real estate, hospitals and warehouses supporting occupancy and utilization analytics, data-driven cleaning, smart FM and RLTS. Global cellular connectivity included with open APIs to integrate with everything. Built in Finland."
	},
	{
		"name": "Sixfab, Inc.",
		"slug": "sixfab",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth",
			"Bluetooth LE",
			"LTEeSIM (eUICC)",
			"GNSS/GPS",
			"Ethernet",
			"USB",
			"GPIO(UART/SPI/I2C)"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Single-board computers",
			"Gateways",
			"Trackers"
		],
		"logo": "/images/partners/sixfab-logo.webp",
		"website": "https://sixfab.com/alpon",
		"links": {
			"gatewayGuides": [
				{
					"label": "ALPON X4 Edge Computer",
					"href": "/device-library/ce/alpon-x4/"
				}
			]
		},
		"description": "Builds modular, always online, industrial-grade edge computers based on Raspberry Pi, designed for real-world deployments. Our ALPON™ devices integrate seamlessly with ThingsBoard and support remote fleet provisioning, resilient multi-network connectivity, and local data processing. Engineered for reliability in harsh conditions, products focus on practical deployment, automation, and maintainability at scale."
	},
	{
		"name": "ioThings",
		"slug": "iothings",
		"connectivity": [
			"Wi-Fi",
			"Bluetooth LE",
			"LoRaWAN",
			"NB-IoT",
			"GSM/GPRS"
		],
		"industry": [
			"Smart Cities",
			"Transportation & Logistics",
			"Industrial Manufacturing",
			"Security"
		],
		"useCase": [
			"Fleet Tracking",
			"Smart Farming",
			"Waste Management"
		],
		"hardwareTypes": [
			"Trackers",
			"Sensors"
		],
		"logo": "/images/partners/iothings-logo.png",
		"website": "https://iotracker.eu/",
		"links": {
			"trackersGuides": [
				{
					"label": "ioTracker Multi-sensor tracker",
					"href": "/device-library/pe/iotracker-multi-sensor-tracker/"
				}
			],
			"otherDevicesGuides": [
				{
					"label": "ioButton Panic button",
					"href": "/device-library/pe/iobutton-panic-button/"
				}
			]
		},
		"description": "The company behind the ioTracker and ioButton, is a Dutch company and was established in 2016 by three technology enthusiasts with a professional background in electronics, security, IT and telecom. We mainly operate in the domain of emergency response, together with indoor and outdoor localisation. Our devices are highly and easy configurable to make sure it can be finetuned for a lot of use cases."
	},
	{
		"name": "ACE PLC",
		"slug": "ace-plc",
		"connectivity": [
			"GSM/GPRS",
			"Wi-Fi",
			"Bluetooth LE",
			"Modbus"
		],
		"industry": [
			"Smart Cities",
			"Industrial Manufacturing",
			"Energy Management",
			"Security"
		],
		"useCase": [
			"Smart Farming",
			"Smart Irrigation",
			"Smart Energy",
			"Tank Level Monitoring",
			"Water Metering",
			"Smart Metering",
			"Environment Monitoring"
		],
		"hardwareTypes": [
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/ace-automation-logo.webp",
		"website": "https://aceautomation.eu/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Connect ACE MQTT 4G GPS Gateway",
					"href": "/device-library/ce/ace-iot-gateway-and-siemens-logo/"
				}
			]
		},
		"description": "Designs compact PLCs, touchscreen HMIs, and LTE/4G MQTT gateways. The “Nano ACE” series stands out for its ultra-low power consumption, compact form factor, and PCB-mount version. Our HMIs are powerful, affordable, and easy to use. The LTE/4G multi-operator gateway is ideal for remote IoT monitoring and control via MQTT."
	},
	{
		"name": "Agrosense | Makerfabs",
		"slug": "agrosense-makerfabs",
		"connectivity": [
			"LoRaWAN"
		],
		"industry": [
			"Smart Cities",
			"Agriculture",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Irrigation"
		],
		"hardwareTypes": [
			"Sensors"
		],
		"logo": "/images/partners/makerfabs-logo.png",
		"website": "https://www.makerfabs.com/agrosense",
		"links": {
			"sensorGuides": [
				{
					"label": "AgroSense Air Temperature and Humidity Sensor",
					"href": "/device-library/pe/air-temperature-and-humidity-sensor/"
				},
				{
					"label": "AgroSense Positioning Water Leak Sensor",
					"href": "/device-library/pe/positioning-water-leak-sensor/"
				},
				{
					"label": "AgroSense Soil Moisture Sensor",
					"href": "/device-library/pe/soil-moisture-sensor/"
				}
			]
		},
		"description": "Professional open-source hardware provider based in Shenzhen, China, offering end-to-end support from concept design, prototyping, small-batch manufacturing, to full-scale production. We are especially experienced in LoRa and LoRaWAN technologies and have helped many clients realize custom IoT solutions across agriculture, smart cities, and industrial monitoring. To better serve these industries, we have established the AgroSense brand – a comprehensive line of LoRaWAN sensors, designed for reliability, adaptability, and ease of integration."
	},
	{
		"name": "Chengdu IOTRouter Tech. Co., Ltd.",
		"slug": "iotrouter",
		"connectivity": [
			"5G/4G LTE",
			"LAN",
			"Wi-Fi",
			"RS485"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/iotrouter-logo.png",
		"website": "http://www.iotrouter.com/",
		"links": {
			"gatewayGuides": [
				{
					"label": "Connect EG8200 Gateway",
					"href": "/device-library/pe/eg8200-gateway/"
				}
			]
		},
		"description": "Established in 2015, high-tech enterprise specializing in the research, development, production, and sales of industrial IoT Edge Gateway, HMI, Remote IO, AI Edge Box, and other digital integration products and solutions. Combines traditional industry with new technologies such as IoT, edge computing, and AI to help users easily integrate OT (Operational Technology) and IT (information technology), thereby building a bridge between traditional industry infrastructure and digital applications. We serve more than 3,000 customers in more than 20 countries. With operations in the US, UK, Germany, Italy, and Southeast Asian countries, we are well placed to meet your needs around the globe."
	},
	{
		"name": "Weinzierl Engineering GmbH",
		"slug": "weinzierl",
		"connectivity": [
			"KNX",
			"Modbus",
			"Modbus TCP"
		],
		"industry": [
			"Smart Cities",
			"Retail",
			"Agriculture",
			"Transportation & Logistics",
			"Healthcare",
			"Industrial Manufacturing",
			"Smart Buildings",
			"Energy Management",
			"Security",
			"Environmental Monitoring"
		],
		"useCase": [
			"Smart Energy",
			"Environment Monitoring",
			"Smart Office",
			"Water Metering",
			"Smart Retail",
			"Smart Farming",
			"Fleet Tracking",
			"Smart Metering",
			"Health Care",
			"Air Quality Monitoring",
			"Smart Irrigation",
			"Waste Management",
			"Tank Level Monitoring"
		],
		"hardwareTypes": [
			"Microcontrollers",
			"Sensors",
			"Gateways",
			"Other devices"
		],
		"logo": "/images/partners/weinzierl-logo.svg",
		"website": "https://weinzierl.de/en/",
		"links": {
			"otherDevicesGuides": [
				{
					"label": "Connect KNX IP Multi IO 580",
					"href": "/device-library/ce/knx-ip-multi-io-580/"
				}
			]
		},
		"description": "We develop, produce, and market complex software and hardware components for building system technology. Our focus lies in building networks based on the KNX standard. Because of this focus, we cover the KNX system with our products and solutions comprehensively. In addition, we offer gateways as well as software solutions for other standards."
	}
];

export function getPartnerBySlug(slug: string): HardwarePartner | undefined {
	return HARDWARE_PARTNERS.find((p) => p.slug === slug);
}

export function getSortedPartners(): HardwarePartner[] {
	const priority = HARDWARE_PARTNERS.filter((p) => PRIORITY_PARTNERS.includes(p.name));
	const rest = HARDWARE_PARTNERS.filter((p) => !PRIORITY_PARTNERS.includes(p.name));
	return [...priority, ...rest];
}

export interface NavItem {
	label: string;
	href?: string;
	submenuId?: string;
	items?: SubMenuItem[];
}

export interface SubMenuItem {
	href: string;
	icon?: string;
	heading: string;
	description?: string;
	linkClass?: string;
}

export interface SubMenuGroup {
	name?: string;
	items: SubMenuItem[];
}

export interface SubMenu {
	id: string;
	className: string;
	groups: SubMenuGroup[];
}

// Main navigation items
export const mainNavItems: NavItem[] = [
	{ label: 'Products', submenuId: 'nav-products' },
	{ label: 'Services', submenuId: 'nav-services' },
	{ label: 'Use Cases', href: '/iot-use-cases/', submenuId: 'nav-cases' },
	{ label: 'Customers', submenuId: 'nav-customers' },
	{ label: 'Company', submenuId: 'nav-company' },
	{ label: 'Partners', submenuId: 'nav-partners' },
	{ label: 'Docs', submenuId: 'nav-docs' },
	{ label: 'Device Library', href: '/device-library/?platform=ce' },
	{ label: 'Blog', href: '/blog/' },
];

// Products submenu
export const productsSubmenu: SubMenu = {
	id: 'nav-products',
	className: 'products',
	groups: [
		{
			items: [
				{
					href: '/',
					icon: '/src/assets/images/landings/nav/thingsboard-cm-icon.svg',
					heading: 'Community Edition',
					description: 'Open-source platform',
					linkClass: 'com-lnk',
				},
				{
					href: '/products/thingsboard-pe/',
					icon: '/src/assets/images/landings/nav/thingsboard-p-icon.svg',
					heading: 'Professional Edition',
					description: 'Advanced IoT platform',
					linkClass: 'prof-lnk',
				},
				{
					href: '/products/paas/',
					icon: '/src/assets/images/landings/nav/thingsboard-c-icon.svg',
					heading: 'Cloud',
					description: 'Platform as a service',
					linkClass: 'cloud-lnk',
				},
			],
		},
		{
			items: [
				{
					href: '/products/thingsboard-edge/',
					icon: '/src/assets/images/landings/nav/thingsboard-e-icon.svg',
					heading: 'Edge',
					description: 'Edge computing',
					linkClass: 'edge-lnk',
				},
				{
					href: '/docs/iot-gateway/',
					icon: '/src/assets/images/landings/nav/gateway-icon.svg',
					heading: 'IoT Gateway',
					description: 'Connect legacy protocols',
					linkClass: 'gateway-lnk',
				},
				{
					href: '/products/mobile/',
					icon: '/src/assets/images/landings/nav/tb-mobile-icon.svg',
					heading: 'Mobile Application',
					description: 'IoT mobile product',
					linkClass: 'mobile-lnk',
				},
				{
					href: '/products/mobile-pe/',
					icon: '/src/assets/images/landings/nav/tb-pe-mobile-icon.svg',
					heading: 'PE Mobile Application',
					description: 'Advanced IoT mobile product',
					linkClass: 'mobile-pe-lnk',
				},
				{
					href: '/products/mqtt-broker/',
					icon: '/src/assets/images/landings/nav/tbmq-icon.svg',
					heading: 'TBMQ',
					description: 'Scalable MQTT broker',
					linkClass: 'mqtt-broker-lnk',
				},
				{
					href: '/products/trendz/',
					icon: '/src/assets/images/landings/nav/trendz-icon.svg',
					heading: 'Trendz Analytics',
					description: 'Data analytics and Prediction',
					linkClass: 'trendz-lnk',
				},
			],
		},
	],
};

// Services submenu
export const servicesSubmenu: SubMenu = {
	id: 'nav-services',
	className: 'services',
	groups: [
		{
			items: [
				{
					href: '/services/development-services/',
					icon: '/src/assets/images/landings/nav/development-services.svg',
					heading: 'Development services',
					description: 'IoT Solutions development',
				},
				{
					href: '/services/support/',
					icon: '/src/assets/images/landings/nav/support-icon.svg',
					heading: 'Support',
					description: 'Support packages',
				},
				{
					href: '/services/trainings/',
					icon: '/src/assets/images/landings/nav/train-icon.svg',
					heading: 'Trainings',
					description: 'ThingsBoard education courses',
				},
			],
		},
	],
};

// Use Cases submenu
export const useCasesSubmenu: SubMenu = {
	id: 'nav-cases',
	className: 'cases',
	groups: [
		{
			items: [
				{
					href: '/use-cases/smart-energy/',
					icon: '/src/assets/images/landings/nav/case-eng-icon.svg',
					heading: 'Smart energy',
					description: 'Energy monitoring and efficiency',
				},
				{
					href: '/use-cases/environment-monitoring/',
					icon: '/src/assets/images/landings/nav/case-env-icon.svg',
					heading: 'Environment monitoring',
					description: 'Indoor & outdoor environment analysis',
				},
				{
					href: '/use-cases/smart-office/',
					icon: '/src/assets/images/landings/nav/case-off-icon.svg',
					heading: 'Smart office',
					description: 'Boost productivity & optimize resources',
				},
				{
					href: '/use-cases/water-metering/',
					icon: '/src/assets/images/landings/nav/case-wat-icon.svg',
					heading: 'Water metering',
					description: 'Water use analysis & fraud detection',
				},
				{
					href: '/use-cases/smart-retail/',
					icon: '/src/assets/images/landings/nav/case-ret-icon.svg',
					heading: 'Smart retail',
					description: 'Food storage & safety monitoring',
				},
				{
					href: '/use-cases/smart-farming/',
					icon: '/src/assets/images/landings/nav/case-fam-icon.svg',
					heading: 'Smart farming',
					description: 'Remote soil & equipment monitoring',
				},
				{
					href: '/use-cases/site-fleet-tracking/',
					icon: '/src/assets/images/landings/nav/site-fleet-tracking-icon.svg',
					heading: 'Site fleet tracking',
					description: 'Fleet tracking & management',
				},
				{
					href: '/use-cases/health-care/',
					icon: '/src/assets/images/landings/nav/case-health-care-icon.svg',
					heading: 'Health care',
					description: 'Smart assisted living solution',
				},
				{
					href: '/use-cases/smart-metering/',
					icon: '/src/assets/images/landings/nav/case-met-icon.svg',
					heading: 'Smart metering',
					description: 'Meter data collection & analysis',
				},
				{
					href: '/use-cases/air-quality-monitoring/',
					icon: '/src/assets/images/landings/nav/case-aq-icon.svg',
					heading: 'Air quality monitoring',
					description: 'Monitor AQI using wide range of sensors',
				},
				{
					href: '/use-cases/smart-irrigation/',
					icon: '/src/assets/images/landings/nav/smart-irrigation.svg',
					heading: 'Smart irrigation',
					description: 'Soil moisture & irrigation control',
				},
				{
					href: '/use-cases/waste-management/',
					icon: '/src/assets/images/landings/nav/case-waste-icon.svg',
					heading: 'Waste management',
					description: 'Real-time waste management',
				},
				{
					href: '/use-cases/tank-level-monitoring/',
					icon: '/src/assets/images/landings/nav/case-level-icon.svg',
					heading: 'Tank level monitoring',
					description: 'Fuel tank location & level monitoring',
				},
			],
		},
		{
			name: 'SCADA',
			items: [
				{
					href: '/use-cases/scada/',
					icon: '/src/assets/images/landings/nav/case-scada-icon.svg',
					heading: 'Swimming pool',
					description: 'Control industrial processes in real time',
				},
				{
					href: '/use-cases/scada-oil-and-gas-drilling-system/',
					icon: '/src/assets/images/landings/nav/case-scada-drilling-system-icon.svg',
					heading: 'Oil and gas drilling system',
					description: 'Control drilling operations',
				},
				{
					href: '/use-cases/scada-energy-management/',
					icon: '/src/assets/images/landings/nav/case-scada-energy-management.svg',
					heading: 'Energy management',
					description: 'Monitor & control energy systems',
				},
			],
		},
	],
};

// Customers submenu
export const customersSubmenu: SubMenu = {
	id: 'nav-customers',
	className: 'customers',
	groups: [
		{
			items: [
				{
					href: '/case-studies/',
					icon: '/src/assets/images/landings/nav/case-studies.svg',
					heading: 'Case studies',
					linkClass: 'small-link',
				},
				{
					href: '/clients-feedback/',
					icon: '/src/assets/images/landings/nav/feedback.svg',
					heading: 'Clients feedback',
					linkClass: 'small-link',
				},
			],
		},
	],
};

// Company submenu
export const companySubmenu: SubMenu = {
	id: 'nav-company',
	className: 'about',
	groups: [
		{
			items: [
				{
					href: '/company/',
					icon: '/src/assets/images/landings/nav/about-s-icon.svg',
					heading: 'Our company',
					linkClass: 'small-link',
				},
				{
					href: '/contact-us/',
					icon: '/src/assets/images/landings/nav/contact-s-icon.svg',
					heading: 'Contact us',
					linkClass: 'small-link',
				},
				{
					href: '/mediakit/',
					icon: '/src/assets/images/landings/nav/media-s-icon.svg',
					heading: 'Media kit',
					linkClass: 'small-link',
				},
				{
					href: '/careers/',
					icon: '/src/assets/images/landings/nav/careers-s-icon.svg',
					heading: 'Careers',
					linkClass: 'small-link',
				},
			],
		},
	],
};

// Partners submenu
export const partnersSubmenu: SubMenu = {
	id: 'nav-partners',
	className: 'about',
	groups: [
		{
			items: [
				{
					href: '/partners/affiliate/',
					icon: '/src/assets/images/landings/nav/affiliate-s-icon.svg',
					heading: 'Affiliate Program',
					linkClass: 'small-link',
				},
				{
					href: '/partners/hardware/',
					icon: '/src/assets/images/landings/nav/hard-s-icon.svg',
					heading: 'Hardware partners',
					linkClass: 'small-link',
				},
				{
					href: '/partners/distributors/',
					icon: '/src/assets/images/landings/nav/dis-s-icon.svg',
					heading: 'Distributors',
					linkClass: 'small-link',
				},
				{
					href: '/partners/marketplace/',
					icon: '/src/assets/images/landings/nav/marketplace-s-icon.svg',
					heading: 'Marketplace',
					linkClass: 'small-link',
				},
			],
		},
	],
};

// Docs submenu
export const docsSubmenu: SubMenu = {
	id: 'nav-docs',
	className: 'products',
	groups: [
		{
			items: [
				{
					href: '/docs/',
					heading: 'Community Edition',
					description: 'Open-source platform',
					linkClass: 'com-lnk',
				},
				{
					href: '/docs/pe/',
					heading: 'Professional Edition',
					description: 'Advanced IoT platform',
					linkClass: 'prof-lnk',
				},
				{
					href: '/docs/paas/',
					heading: 'Cloud',
					description: 'Platform as a service',
					linkClass: 'cloud-lnk',
				},
			],
		},
		{
			items: [
				{
					href: '/docs/edge/',
					heading: 'Edge',
					description: 'Edge computing',
					linkClass: 'edge-lnk',
				},
				{
					href: '/docs/iot-gateway/',
					heading: 'IoT Gateway',
					description: 'Connect legacy protocols',
					linkClass: 'gateway-lnk',
				},
				{
					href: '/docs/mobile/',
					heading: 'Mobile Application',
					description: 'IoT mobile product',
					linkClass: 'mobile-lnk',
				},
				{
					href: '/docs/pe/mobile/',
					heading: 'PE Mobile Application',
					description: 'Advanced IoT mobile product',
					linkClass: 'mobile-pe-lnk',
				},
				{
					href: '/docs/mqtt-broker/',
					heading: 'TBMQ',
					description: 'Scalable MQTT broker',
					linkClass: 'mqtt-broker-lnk',
				},
				{
					href: '/docs/trendz/',
					heading: 'Trendz Analytics',
					description: 'Data analytics and Prediction',
					linkClass: 'trendz-lnk',
				},
			],
		},
	],
};

// All submenus
export const allSubmenus: SubMenu[] = [
	productsSubmenu,
	servicesSubmenu,
	useCasesSubmenu,
	customersSubmenu,
	companySubmenu,
	partnersSubmenu,
	docsSubmenu,
];

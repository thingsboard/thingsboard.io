export interface CustomerLogo {
	src: string;
	ariaLabel: string;
	href: string;
	width: number;
	height: number;
}

export const defaultCustomersLogos: CustomerLogo[] = [
	{
		src: '/src/assets/images/landings/customer-logo/prosegur.svg',
		ariaLabel: 'Prosegur logo',
		href: 'https://www.prosegur.com/',
		width: 181,
		height: 34,
	},
	{
		src: '/src/assets/images/landings/customer-logo/engie.svg',
		ariaLabel: 'Engie logo',
		href: 'https://www.engie.sk/en/kontakt',
		width: 115,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/t-mobile.svg',
		ariaLabel: 'T-mobile logo',
		href: '/clients-feedback/?category=telecom',
		width: 181,
		height: 30,
	},
	{
		src: '/src/assets/images/landings/customer-logo/intel.svg',
		ariaLabel: 'Intel logo',
		href: 'https://www.intel.com/',
		width: 103,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/schwarz-gruppe.svg',
		ariaLabel: 'Schwarz logo',
		href: 'https://gruppe.schwarz/en',
		width: 179,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/bosch.svg',
		ariaLabel: 'Bosch logo',
		href: 'https://www.bosch.com/',
		width: 181,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/tektelic.svg',
		ariaLabel: 'Tektelic logo',
		href: '/clients-feedback/?category=telecom',
		width: 179,
		height: 40,
	},
];

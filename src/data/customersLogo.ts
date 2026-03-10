export interface CustomerLogo {
	src: string;
	ariaLabel: string;
	href: string;
}

export const defaultCustomersLogos: CustomerLogo[] = [
	{
		src: '/src/assets/images/landings/customer-logo/prosegur.svg',
		ariaLabel: 'Prosegur logo',
		href: 'https://www.prosegur.com/',
	},
	{
		src: '/src/assets/images/landings/customer-logo/engie.svg',
		ariaLabel: 'Engie logo',
		href: 'https://www.engie.sk/en/kontakt',
	},
	{
		src: '/src/assets/images/landings/customer-logo/t-mobile.svg',
		ariaLabel: 'T-mobile logo',
		href: '/industries/telecom/#tmobile',
	},
	{
		src: '/src/assets/images/landings/customer-logo/intel.svg',
		ariaLabel: 'Intel logo',
		href: 'https://www.intel.com/',
	},
	{
		src: '/src/assets/images/landings/customer-logo/schwarz-gruppe.svg',
		ariaLabel: 'Schwarz logo',
		href: 'https://gruppe.schwarz/en',
	},
	{
		src: '/src/assets/images/landings/customer-logo/bosch.svg',
		ariaLabel: 'Bosch logo',
		href: 'https://www.bosch.com/',
	},
	{
		src: '/src/assets/images/landings/customer-logo/tektelic.svg',
		ariaLabel: 'Tektelic logo',
		href: '/industries/telecom/#tektelic',
	},
];

export interface CustomerLogo {
	src: string;
	ariaLabel: string;
	/** When omitted, the logo renders as a plain image without a link. */
	href?: string;
	/** The mark's own box, which must be its ink: the strip sizes each logo from this ratio. */
	width: number;
	height: number;
}

// Logos with case-study links come first, unlinked logos follow.
export const defaultCustomersLogos: CustomerLogo[] = [
	{
		src: '/src/assets/images/landings/customer-logo/t-mobile.svg',
		ariaLabel: 'T-mobile logo',
		href: '/case-studies/t-mobile-cz/',
		width: 181,
		height: 30,
	},
	{
		src: '/src/assets/images/landings/customer-logo/schwarz-gruppe.svg',
		ariaLabel: 'Schwarz logo',
		href: '/case-studies/schwarz/',
		width: 179,
		height: 34,
	},
	{
		src: '/src/assets/images/landings/customer-logo/tektelic.svg',
		ariaLabel: 'Tektelic logo',
		href: '/case-studies/tektelic/',
		width: 179,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/prosegur.svg',
		ariaLabel: 'Prosegur logo',
		width: 181,
		height: 34,
	},
	{
		src: '/src/assets/images/landings/customer-logo/engie.svg',
		ariaLabel: 'Engie logo',
		width: 115,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/intel.svg',
		ariaLabel: 'Intel logo',
		width: 103,
		height: 40,
	},
	{
		src: '/src/assets/images/landings/customer-logo/bosch.svg',
		ariaLabel: 'Bosch logo',
		width: 181,
		height: 40,
	},
];

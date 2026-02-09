export interface CustomerLogo {
  src: string;
  ariaLabel: string;
  href: string;
}

export const defaultCustomersLogos: CustomerLogo[] = [
  {
    src: "https://img.thingsboard.io/customers/clear/prosegur.svg",
    ariaLabel: "Prosegur logo",
    href: "https://www.prosegur.com/"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/engie.svg",
    ariaLabel: "Engie logo",
    href: "https://www.engie.sk/en/kontakt"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/t-mobile.svg",
    ariaLabel: "T-mobile logo",
    href: "/industries/telecom/#tmobile"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/intel.svg",
    ariaLabel: "Intel logo",
    href: "https://www.intel.com/"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/schwarz-gruppe.svg",
    ariaLabel: "Schwarz logo",
    href: "https://gruppe.schwarz/en"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/bosch.svg",
    ariaLabel: "Bosch logo",
    href: "https://www.bosch.com/"
  },
  {
    src: "https://img.thingsboard.io/customers/clear/tektelic.svg",
    ariaLabel: "Tektelic logo",
    href: "/industries/telecom/#tektelic"
  }
];
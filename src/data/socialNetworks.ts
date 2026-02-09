export interface SocialNetwork {
  href: string;
  icon?: string;
  iconClass?: string;
  src?: string;
  ariaLabel: string;
}

export const socialNetworks: SocialNetwork[] = [
  {
    href: "https://github.com/thingsboard/thingsboard",
    icon: "simple-icons:github",
    ariaLabel: "Link to our Github"
  },
  {
    href: "https://www.youtube.com/thingsboard",
    icon: "simple-icons:youtube",
    ariaLabel: "Link to our Youtube channel"
  },
  {
    href: "https://stackoverflow.com/questions/tagged/thingsboard",
    icon: "simple-icons:stackoverflow",
    ariaLabel: "Link to our Stack Overflow page"
  },
  {
    href: "https://www.facebook.com/thingsboard",
    icon: "simple-icons:facebook",
    ariaLabel: "Link to our Facebook"
  },
  {
    href: "https://www.instagram.com/thingsboard_iot/",
    icon: "simple-icons:instagram",
    ariaLabel: "Link to our Instagram"
  },
  {
    href: "https://www.linkedin.com/company/thingsboard/",
    icon: "fa-brands:linkedin",
    ariaLabel: "Link to our linkedin"
  },
  {
    href: "https://twitter.com/thingsboard",
    icon: "simple-icons:x",
    ariaLabel: "Link to our X"
  }
];
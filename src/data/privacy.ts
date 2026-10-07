// Privacy copy shown in the footers and the cookie preferences dialog, kept here so legal can change it in one place.

// Privacy Policy link required by GDPR Art. 13 and CalOPPA (Cal. Bus. & Prof. Code §22575), plus the Cookie Policy.
export const footerLegalLinks: { href: string; label: string }[] = [
	{ href: '/legal/privacy-policy/', label: 'Privacy Policy' },
	{ href: '/cookie-policy/', label: 'Cookie Policy' },
];

// Opens the cookie preferences dialog (CCPA regs §7015 opt-out link).
export const PRIVACY_CHOICES_LABEL = 'Your Privacy Choices';

// Under the Marketing switch when the browser sends Global Privacy Control (CCPA regs §7025).
export const GPC_MARKETING_NOTE = 'Your browser sent a Global Privacy Control signal, so Marketing stays off.';

export const locales = {
	en: { prefix: '', title: 'Device Library' },
	// uk: { prefix: 'uk', title: 'Бібліотека пристроїв' }, // temporarily disabled
} as const;

export type Lang = keyof typeof locales;

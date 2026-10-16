// Fired by `CookieConsent.astro` after a choice is saved; `window.tbConsent` already holds it.
const CONSENT_CHANGE_EVENT = 'tb:consent-change';

export const notifyConsentChange = () => window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));

export const onConsentChange = (callback: () => void) => window.addEventListener(CONSENT_CHANGE_EVENT, callback);

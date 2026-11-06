// Google Programmable Search, shared by the header search modal and the docs search pages. cse.js contacts Google's
// ad endpoints and sets google.com cookies, so it loads only with External media consent.

const CSE_SRC = 'https://cse.google.com/cse.js?cx=006967103846171422263:o5lnt35mvwq';

export const hasSearchConsent = () => window.tbConsent?.media === true;

export const isCseLoaded = () => document.querySelector(`script[src="${CSE_SRC}"]`) !== null;

// cse.js scans the DOM for `.gcse-search` once, when it executes: render those elements first.
// `onError` runs if cse.js itself is blocked or fails to load. cse.js then loads a second Google
// script on its own, and a failure there does not call `onError`. A caller that needs to know waits
// for Google's input to appear, with a timeout (as `SiteSearch` does).
export function loadCse(onError?: () => void): void {
	if (isCseLoaded()) return;
	const script = document.createElement('script');
	script.async = true;
	script.src = CSE_SRC;
	if (onError) script.addEventListener('error', onError);
	document.head.appendChild(script);
}

// The visitor's own request to Google, in a new tab, for when search here is off.
export const googleSiteSearchUrl = (query: string) =>
	`https://www.google.com/search?q=${encodeURIComponent(`site:thingsboard.io ${query}`.trim())}`;

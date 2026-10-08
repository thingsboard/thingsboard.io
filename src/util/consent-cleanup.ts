// Deletes the first-party cookies and storage of every consent category not granted (GDPR Art. 7(3)).
// Third-party cookies (google.com `NID`, `.youtube.com`) belong to their own domains and cannot be deleted here.

interface CategoryStorage {
	cookies: string[];
	cookiePrefixes: string[];
	localStorage: string[];
}

// Clarity, Meta and LinkedIn are not on the site now; their names are listed for when they return.
const CATEGORY_STORAGE: Record<TbConsentCategory, CategoryStorage> = {
	analytics: {
		// Google Analytics; Microsoft Clarity.
		cookies: ['_ga', '_gid', '_gat', '_clck', '_clsk'],
		cookiePrefixes: ['_ga_', '_gat_'],
		localStorage: [],
	},
	marketing: {
		// Google Ads; Meta Pixel; LinkedIn Insight Tag.
		cookies: ['_fbp', '_fbc', 'li_fat_id'],
		cookiePrefixes: ['_gcl_', '_gac_'],
		localStorage: ['_gcl_ls'],
	},
	media: {
		// Google site search writes AdSense for Search cookies on our host (`__gsas` seen); its google.com and
		// youtube.com cookies are third-party, disclosed in the Cookie Policy.
		cookies: ['__gsas', '__gads', '__gpi', '__eoi'],
		cookiePrefixes: [],
		localStorage: [],
	},
};

// Google writes its cookies on the widest domain it may (`.thingsboard.io` from any subdomain), so every parent
// domain of the host is tried, plus the host-only variant. The browser ignores the variants that do not apply.
function cookieDomains(): (string | null)[] {
	const labels = location.hostname.split('.');
	const domains: (string | null)[] = [null];
	for (let i = 0; i < labels.length - 1; i++) domains.push(labels.slice(i).join('.'));
	return domains;
}

function deleteCookie(name: string, domains: (string | null)[]): void {
	domains.forEach((domain) => {
		document.cookie = `${name}=; max-age=0; path=/${domain ? `; domain=${domain}` : ''}`;
	});
}

export function clearRefusedCategories(): void {
	const consent = window.tbConsent;
	const refused = (Object.keys(CATEGORY_STORAGE) as TbConsentCategory[]).filter((c) => consent?.[c] !== true);
	if (refused.length === 0) return;

	const present = document.cookie
		.split('; ')
		.map((pair) => pair.split('=')[0])
		.filter(Boolean);
	const domains = cookieDomains();

	refused.forEach((category) => {
		const { cookies, cookiePrefixes, localStorage: keys } = CATEGORY_STORAGE[category];
		present
			.filter((name) => cookies.includes(name) || cookiePrefixes.some((prefix) => name.startsWith(prefix)))
			.forEach((name) => deleteCookie(name, domains));
		try {
			keys.forEach((key) => localStorage.removeItem(key));
		} catch {
			/**/
		}
	});
}

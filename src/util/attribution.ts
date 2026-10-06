// Campaign (`utm_*`) and partner-referral (`fpr`) attribution and the GA client ID for sign-up links and
// contact forms, each used only with its cookie-consent category.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

interface Attribution {
	utm: Record<string, string>;
	fpr: string | null;
}

const UTM_STORAGE_KEY = 'utm';
const FPR_STORAGE_KEY = 'fpr';
// Older builds stored each `utm_*` key separately; now only deleted.
const ALL_STORAGE_KEYS = [UTM_STORAGE_KEY, FPR_STORAGE_KEY, ...UTM_KEYS];

// true: use this page's URL values without consent, unstored. Off: EDPB Guidelines 2/2023 count passing a
// tracking link on as access under ePrivacy Art. 5(3).
const USE_PAGE_VALUES_WITHOUT_CONSENT = false;

// Read once at load: some pages rewrite their query string before a later Accept.
const fromUrl = readUrl();

function readUrl(): Attribution {
	const params = new URLSearchParams(window.location.search);
	const utm: Record<string, string> = {};
	params.forEach((value, key) => {
		if (key.startsWith('utm_') && value) utm[key] = value;
	});
	return { utm, fpr: params.get('fpr') || null };
}

const EMPTY: Attribution = { utm: {}, fpr: null };
const hasMarketingConsent = () => window.tbConsent?.marketing === true;

function readStored(): Attribution {
	try {
		const utm = JSON.parse(localStorage.getItem(UTM_STORAGE_KEY) ?? '{}') ?? {};
		return { utm, fpr: localStorage.getItem(FPR_STORAGE_KEY) };
	} catch {
		return EMPTY;
	}
}

export function syncAttributionStorage(): void {
	try {
		if (!hasMarketingConsent()) {
			ALL_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
			return;
		}
		// A new campaign replaces the stored one whole, so tags of two campaigns never mix.
		if (Object.keys(fromUrl.utm).length > 0) localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl.utm));
		if (fromUrl.fpr) localStorage.setItem(FPR_STORAGE_KEY, fromUrl.fpr);
	} catch {
		/**/
	}
}

function getAttribution(): Attribution {
	const consent = hasMarketingConsent();
	const page = consent || USE_PAGE_VALUES_WITHOUT_CONSENT ? fromUrl : EMPTY;
	const stored = consent ? readStored() : EMPTY;
	return {
		utm: Object.keys(page.utm).length > 0 ? page.utm : stored.utm,
		fpr: page.fpr ?? stored.fpr,
	};
}

// `utm_*=…&fpr=…` for a sign-up URL, empty without attribution.
export function attributionQuery(): string {
	const { utm, fpr } = getAttribution();
	const params = Object.keys(utm).map((key) => key + '=' + encodeURIComponent(utm[key]));
	if (fpr) params.push('fpr=' + encodeURIComponent(fpr));
	return params.join('&');
}

// Gated on consent, not on the cookie: returning visitors may carry a `_ga` set before the banner.
function getGaClientId(): string | null {
	if (window.tbConsent?.analytics !== true) return null;
	const parts = document.cookie
		.split('; ')
		.find((r) => r.startsWith('_ga='))
		?.split('.');
	return parts && parts.length >= 4 ? parts[2] + '.' + parts[3] : null;
}

const TRACKING_FIELDS = [...UTM_KEYS, 'client_id', 'fpr'];

// Empties the fields that have no value; returns the filled ones for the dataLayer event.
export function fillTrackingFields(form: HTMLFormElement): Record<string, string> {
	const { utm, fpr } = getAttribution();
	const data: Record<string, string> = {};
	UTM_KEYS.forEach((key) => {
		if (utm[key]) data[key] = utm[key];
	});
	const clientId = getGaClientId();
	if (clientId) data.client_id = clientId;
	if (fpr) data.fpr = fpr;

	TRACKING_FIELDS.forEach((name) => {
		const el = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
		if (el) el.value = data[name] ?? '';
	});
	return data;
}

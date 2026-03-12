export interface MobileRelease {
	/** Version string, e.g. "1.8.0" */
	version: string;
	/** Release date, e.g. "Feb 5, 2026" */
	date: string;
	/** GitHub release tag for CE app */
	ceTag: string;
	/** GitHub release tag for PE app */
	peTag: string;
	/** CE release date (if different from shared date) */
	ceDate?: string;
	/** PE release date (if different from shared date) */
	peDate?: string;
	/** Short highlights description */
	highlights: string;
}

export const MOBILE_RELEASES: MobileRelease[] = [
	{
		version: '1.8.0',
		date: 'Feb 5, 2026',
		ceTag: 'v.1.8.0',
		peTag: 'v1.8.0',
		ceDate: 'Feb 5, 2026',
		peDate: 'Feb 9, 2026',
		highlights: 'Architecture refactoring, 2FA, new navigation & profile',
	},
	{
		version: '1.7.0',
		date: 'Aug 15, 2025',
		ceTag: 'v.1.7.0',
		peTag: 'v1.7.0',
		highlights: 'Flutter 3.29, app branding, QR redesign & file export',
	},
	{
		version: '1.6.0',
		date: 'Apr 15, 2025',
		ceTag: 'v1.6.0',
		peTag: 'v1.6.0',
		highlights: 'ESP32 provisioning via BLE and SoftAP',
	},
	{
		version: '1.5.0',
		date: 'Dec 31, 2024',
		ceTag: 'v.1.5.0',
		peTag: 'v1.5.0',
		highlights: 'Mobile Center configuration & version restrictions',
	},
	{
		version: '1.4.0',
		date: 'Nov 6, 2024',
		ceTag: 'v1.4.0',
		peTag: 'v1.4.0',
		highlights: 'Alarm details & comments, redesigned navigation bar',
	},
	{
		version: '1.3.0',
		date: 'Sep 24, 2024',
		ceTag: 'v1.3.0',
		peTag: 'v1.3.0',
		highlights: 'Alarm filters, Flutter 3.22, new localizations',
	},
];

export const CE_REPO = 'https://github.com/thingsboard/flutter_thingsboard_app';
export const PE_REPO = 'https://github.com/thingsboard/flutter_thingsboard_pe_app';

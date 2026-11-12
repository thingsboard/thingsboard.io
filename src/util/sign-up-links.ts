// Which links are a way into a Cloud or License Portal account. UtmTracker.astro adds the visitor's campaign
// to them, and scripts/lint-landmarks.ts checks that every built page with one loads that script.
// Loaded by that script in plain Node: see the alias exception in CLAUDE.md.
import { CLOUD_REGIONS } from './cloud-regions.ts';

const SIGN_UP_ORIGINS: string[] = [...CLOUD_REGIONS.map((r) => `https://${r.host}`), 'https://license.thingsboard.io'];

// Other links to the same hosts (public demo dashboards, API reference) are not sign-up links.
const SIGN_UP_PATHS = ['/', '/signup', '/login'];

export const isSignUpLink = ({ origin, pathname }: Pick<URL, 'origin' | 'pathname'>): boolean =>
	SIGN_UP_ORIGINS.includes(origin) && SIGN_UP_PATHS.includes(pathname.replace(/(.)\/$/, '$1'));

import type { APIRoute } from 'astro';
import { PROD_ORIGIN } from '@root/consts';
import { SECURITY_EMAIL, tc } from '@data/trust-center/nav';

// security.txt (RFC 9116).
// Expires is set a year after the build, the longest the RFC recommends, so every deploy renews it.
// Links use the production origin: Canonical has to name the URL the file is served from.

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export const GET: APIRoute = () => {
	const expires = new Date(Date.now() + YEAR_MS).toISOString();
	const body = [
		`Contact: mailto:${SECURITY_EMAIL}`,
		`Expires: ${expires}`,
		`Policy: ${PROD_ORIGIN}${tc('report-vulnerability')}`,
		'Preferred-Languages: en',
		`Canonical: ${PROD_ORIGIN}/.well-known/security.txt`,
	].join('\n');
	return new Response(`${body}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};

const ALLOWED_HOSTNAMES = new Set([
	'www.googletagmanager.com',
	'googletagmanager.com',
	'www.google-analytics.com',
	'google-analytics.com',
	'region1.google-analytics.com',
	'analytics.google.com',
	'region1.analytics.google.com',
	'googleads.g.doubleclick.net',
	'www.googleadservices.com',
]);

export const onRequest = async ({ request }: { request: Request }): Promise<Response> => {
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': '*',
			},
		});
	}

	const url = new URL(request.url);
	const apiUrl = url.searchParams.get('apiurl');

	if (!apiUrl) {
		return new Response('Missing apiurl parameter', { status: 400 });
	}

	let targetUrl: URL;
	try {
		targetUrl = new URL(apiUrl);
	} catch {
		return new Response('Invalid apiurl', { status: 400 });
	}

	if (!ALLOWED_HOSTNAMES.has(targetUrl.hostname)) {
		return new Response('Domain not allowed', { status: 403 });
	}

	const proxied = await fetch(apiUrl, {
		method: request.method,
		headers: request.headers,
		body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
	});

	const response = new Response(proxied.body, proxied);
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

	return response;
};
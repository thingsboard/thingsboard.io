const ALLOWED_HOSTNAMES = new Set([
	'googleads.g.doubleclick.net',
	'www.googleadservices.com',
	'connect.facebook.net',
	'www.facebook.com',
]);

export const onRequest = async ({ request }: { request: Request }) => {
	// 1. Обробка CORS preflight
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '*',
				'Max-Age': '86400',
			},
		});
	}

	const url = new URL(request.url);
	const apiUrl = url.searchParams.get('apiurl');

	if (!apiUrl) return new Response('Missing apiurl', { status: 400 });

	try {
		const targetUrl = new URL(apiUrl);
		if (!ALLOWED_HOSTNAMES.has(targetUrl.hostname)) {
			return new Response('Forbidden domain', { status: 403 });
		}

		// Копіюємо заголовки та видаляємо конфліктні
		const headers = new Headers(request.headers);
		headers.delete('host');
		headers.delete('cookie'); // Безпека: не передаємо ваші куки стороннім сервісам

		const proxied = await fetch(apiUrl, {
			method: request.method,
			headers: headers,
			body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
			redirect: 'follow',
		});

		// Створюємо нову відповідь, щоб додати CORS заголовки
		const response = new Response(proxied.body, proxied);
		response.headers.set('Access-Control-Allow-Origin', '*');

		return response;
	} catch {
		return new Response('Invalid URL or Fetch Error', { status: 500 });
	}
};

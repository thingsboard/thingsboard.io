
class NonRetryableError extends Error {}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string): Promise<Response> {
	const attempts = 3;
	const timeoutMs = 30_000;
	// Linear backoff between attempts (0s, 1s, 2s).
	const backoffMs = 1_000;
	let lastError: unknown;
	for (let i = 0; i < attempts; i++) {
		if (i > 0) await sleep(backoffMs * i);
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeoutMs);
		try {
			const res = await fetch(url, { signal: controller.signal });
			clearTimeout(timer);
			if (res.ok) return res;
			if (res.status < 500) {
				// Fail fast on 4xx — do NOT retry
				const body = await res.text();
				throw new NonRetryableError(`${url} → ${res.status} ${body}`);
			}
			// 5xx — drain the body so the connection can be reused and fall
			// through to the next iteration.
			await res.text().catch(() => undefined);
			lastError = new Error(`${url} → ${res.status}`);
		} catch (e) {
			clearTimeout(timer);
			if (e instanceof NonRetryableError) throw e;
			lastError = e;
		}
	}
	throw lastError ?? new Error(`Failed after ${attempts} attempts: ${url}`);
}

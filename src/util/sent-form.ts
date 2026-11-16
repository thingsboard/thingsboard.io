/** A form's hand-off to its thank-you page: kept in session storage, ignored once older than an hour. */

export const SENT_MAX_AGE_MS = 60 * 60 * 1000;

export function readSent<T extends { at: number }>(key: string): T | null {
	try {
		const sent = JSON.parse(sessionStorage.getItem(key) || 'null');
		return sent && typeof sent.at === 'number' && Date.now() - sent.at <= SENT_MAX_AGE_MS ? sent : null;
	} catch {
		return null;
	}
}

export function storeSent(key: string, sent: { at: number }): void {
	try {
		sessionStorage.setItem(key, JSON.stringify(sent));
	} catch {
		// Private mode or storage off: the thank-you page keeps its generic words.
	}
}

/** For a form that shares a thank-you page but hands nothing over: an earlier form's record must not show. */
export function clearSent(key: string): void {
	try {
		sessionStorage.removeItem(key);
	} catch {
		// Storage off: there is nothing kept to clear.
	}
}

/** "9 Sept 2026" (or "9 September 2026" with `month: 'long'`) from an ISO date, in UTC. */
export const formatDate = (iso: string, month: 'short' | 'long' = 'short'): string =>
	new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' });

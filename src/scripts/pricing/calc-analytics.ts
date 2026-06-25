// Shared analytics helpers for the pricing calculators. Centralizes the
// debounced `calculator_interaction` push (one timer per calculator) and a
// flush(), so the final — most complete — config isn't lost when the user
// closes the modal or leaves the page within the 3s debounce window.

// Every live calculator's flush fn. Drained on page hide so a pending config
// is sent before unload.
const flushers = new Set<() => void>();
let globalBound = false;
function bindGlobalFlush(): void {
	if (globalBound) return;
	globalBound = true;
	const flushAll = () => flushers.forEach((f) => f());
	window.addEventListener('pagehide', flushAll);
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') flushAll();
	});
}

// One debounced pusher per calculator. push() re-arms a 3s timer (only the last
// settled config fires); flush() sends any pending push immediately.
export function makeInteractionPusher() {
	let timer: ReturnType<typeof setTimeout> | null = null;
	let pending: Record<string, unknown> | null = null;
	const flush = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		if (pending) {
			window.dataLayer?.push(pending);
			pending = null;
		}
	};
	const push = (payload: Record<string, unknown>) => {
		pending = payload;
		if (timer) clearTimeout(timer);
		timer = setTimeout(flush, 3000);
	};
	flushers.add(flush);
	bindGlobalFlush();
	return { push, flush };
}

// Immediate (non-debounced) calculator event — opens, exports, CTA clicks.
export function pushCalculatorEvent(payload: Record<string, unknown>): void {
	window.dataLayer?.push(payload);
}

// Delegated footer-CTA (`.calc-cta`) click tracking, bound once on a stable
// parent. getState() supplies the per-calculator extra fields (total, and plan
// for the ThingsBoard calcs) so the event reports the value live at click time.
export function bindCtaTracking(
	root: HTMLElement,
	calculatorType: string,
	getState: () => Record<string, unknown>,
): void {
	root.addEventListener('click', (e) => {
		const cta = e.target instanceof Element ? e.target.closest('.calc-cta') : null;
		if (!cta) return;
		pushCalculatorEvent({
			event: 'calculator_cta_click',
			calculator_type: calculatorType,
			cta_label: cta.textContent?.trim(),
			cta_href: cta.getAttribute('href'),
			...getState(),
		});
	});
}

// Copy/Download summary export event — one shape for all 5 calculators.
export function pushExport(
	calculatorType: string,
	method: 'copy' | 'download',
	extra: Record<string, unknown>,
): void {
	pushCalculatorEvent({
		event: 'calculator_export',
		calculator_type: calculatorType,
		method,
		...extra,
	});
}

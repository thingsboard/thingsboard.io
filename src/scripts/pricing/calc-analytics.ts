// Shared analytics helpers for the pricing calculators. Centralizes the
// debounced `calculator_interaction` push (one timer per calculator) and a
// flush(), so the final — most complete — config isn't lost when the user
// closes the modal or leaves the page within the 3s debounce window.

// The 5 pricing calculators. Threaded through the helpers so a mistyped value
// fails to compile instead of silently mis-bucketing in GA4.
export type CalculatorType = 'tb_payg' | 'tb_pc' | 'tbmq_payg' | 'tbmq_pc' | 'tbmq_perp';

// Debounce settle for calculator_interaction — single home for the value.
const SETTLE_MS = 3000;

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
export function makeInteractionPusher(calculatorType: CalculatorType) {
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
	// calculator_type is injected here (typed once) — callers omit it.
	const push = (payload: Record<string, unknown>) => {
		pending = { ...payload, calculator_type: calculatorType };
		if (timer) clearTimeout(timer);
		timer = setTimeout(flush, SETTLE_MS);
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
	calculatorType: CalculatorType,
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
	calculatorType: CalculatorType,
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

// Calculator-open event (the 2 modal calculators).
export function pushCalculatorOpen(calculatorType: CalculatorType): void {
	pushCalculatorEvent({ event: 'calculator_open', calculator_type: calculatorType });
}

// Copy/Download summary buttons — one delegated binding per calculator.
// buildText() supplies the summary text at click time; getExtra() the event fields.
export function bindExportButtons(
	root: HTMLElement,
	calculatorType: CalculatorType,
	opts: { buildText: () => string; filename: string; getExtra?: () => Record<string, unknown> },
): void {
	const extra = () => (opts.getExtra ? opts.getExtra() : {});
	root.querySelector('[data-calc-copy]')?.addEventListener('click', (e) => {
		// Capture currentTarget before the async clipboard promise nulls it.
		const btn = e.currentTarget as HTMLElement;
		navigator.clipboard
			.writeText(opts.buildText())
			.then(() => {
				btn.classList.add('copied');
				setTimeout(() => btn.classList.remove('copied'), 2000);
			})
			.catch(() => {});
		pushExport(calculatorType, 'copy', extra());
	});
	root.querySelector('[data-calc-download]')?.addEventListener('click', () => {
		const blob = new Blob([opts.buildText()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = opts.filename;
		a.click();
		URL.revokeObjectURL(url);
		pushExport(calculatorType, 'download', extra());
	});
}

// Lazy-loaded module for the TBMQ Perpetual License calculator.
// Inline calculator (rendered inside the TBMQ product tab). See
// `calc-tbmq-payg.ts` for the lazy-load pattern rationale.

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;

const MQP = { basePrice: 2999, includedSessions: 10000, extraSessionsPrice: 0.25, includedThroughput: 1000, extraThroughputPrice: 0.5, includedProdInstances: 1, extraProdInstancesPrice: 1999, extraDevInstancesPrice: 999 };

export function initMqpCalc() {
	const c = document.getElementById('tbmq-perp-calc');
	if (!c || c.dataset.inited === 'true') return;
	c.dataset.inited = 'true';
	const $ = (s: string) => c.querySelector(s) as HTMLElement;
	const sI = $('#mqp-sessions') as HTMLInputElement, sS = $('#mqp-sessions-slider') as HTMLInputElement;
	const tI = $('#mqp-throughput') as HTMLInputElement, tS = $('#mqp-throughput-slider') as HTMLInputElement;
	const res = $('[data-calc-results]'), foot = $('[data-calc-footer]');
	let st = { sessions: 10000, throughput: 1000, prod: 1, dev: 0 };
	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	const infoSvg = '<svg viewBox="0 0 24 24" width="14" height="14" data-icon><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>';
	function tip(t: string) { return ` <span class="calc-tooltip">${infoSvg}<span class="calc-tooltip-text"><span class="calc-tooltip-arrow"></span><span class="calc-tooltip-body">${t}</span></span></span>`; }
	function row(l: string, v: string, t?: string) { return `<div class="calc-result-row"><span class="calc-row-label">${l}:</span><span class="calc-row-value">${v}${t ? tip(t) : ''}</span></div>`; }

	let _calcQueued = false;
	function scheduleCalc() {
		if (_calcQueued) return;
		_calcQueued = true;
		requestAnimationFrame(() => { _calcQueued = false; calc(); });
	}

	function calc() {
		let total = MQP.basePrice;
		const eS = Math.max(0, st.sessions - MQP.includedSessions), sCost = eS * MQP.extraSessionsPrice; total += sCost;
		const eT = Math.max(0, st.throughput - MQP.includedThroughput), tCost = eT * MQP.extraThroughputPrice; total += tCost;
		const eP = Math.max(0, st.prod - MQP.includedProdInstances), pCost = eP * MQP.extraProdInstancesPrice; total += pCost;
		const dCost = st.dev * MQP.extraDevInstancesPrice; total += dCost;

		let html = '';
		html += row('Included Sessions', fN(MQP.includedSessions), "Number of sessions covered by the perpetual license base price.");
		html += row('Included Throughput', `${fN(MQP.includedThroughput)} msg/sec`, "Amount of throughput covered by the perpetual license base price.");
		html += row('Included Prod Instances', fN(MQP.includedProdInstances), "Number of production instances covered by the perpetual license base price.");
		html += row('White Labeling', '<span class="calc-result-badge">Enabled</span>');
		html += row('Support', '<span style="color:var(--color-primary);font-weight:500">Priority Help Desk</span>', 'Prioritized ticket handling via a high-priority queue managed by the expert team.');
		html += row('Base Price', fmt(MQP.basePrice), 'One-time license fee before extras and add-ons.');
		if (eS > 0) html += row('Extra Sessions', fN(eS), "Sessions exceeding the perpetual license included number (requires one-time fee).");
		if (sCost > 0) html += row('Extra Sessions Cost', fmt(sCost), `${fN(eS)} extra sessions × ${fmt(MQP.extraSessionsPrice)}/session`);
		if (eT > 0) html += row('Extra Throughput', `${fN(eT)} msg/sec`, "Throughput exceeding the perpetual license included number.");
		if (tCost > 0) html += row('Extra Throughput Cost', fmt(tCost), `${fN(eT)} extra msg/sec × ${fmt(MQP.extraThroughputPrice)} per msg/sec`);
		if (eP > 0) html += row('Extra Prod Instances', fN(eP), "Production instances added beyond the perpetual license included number.");
		if (pCost > 0) html += row('Extra Prod Instances Cost', fmt(pCost), `${fN(eP)} extra prod instance × ${fmt(MQP.extraProdInstancesPrice)}/prod instance`);
		if (st.dev > 0) html += row('Extra Dev Instances', fN(st.dev), "Development instances added beyond the perpetual license included number.");
		if (dCost > 0) html += row('Extra Dev Instances Cost', fmt(dCost), `${fN(st.dev)} extra dev instance × ${fmt(MQP.extraDevInstancesPrice)}/dev instance`);

		const _st = res.parentElement?.scrollTop || 0; res.innerHTML = html; if (res.parentElement) res.parentElement.scrollTop = _st;

		const totalParts = [`${fmt(MQP.basePrice)} (base)`];
		if (sCost > 0) totalParts.push(`${fmt(sCost)} (sessions)`);
		if (tCost > 0) totalParts.push(`${fmt(tCost)} (throughput)`);
		if (pCost > 0) totalParts.push(`${fmt(pCost)} (prod instances)`);
		if (dCost > 0) totalParts.push(`${fmt(dCost)} (dev instances)`);
		foot.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">${fmt(total)}${tip(totalParts.join(' + '))}</span></div><a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('TBMQ')}&message=${encodeURIComponent(`Sessions: ${fN(st.sessions)}, Throughput: ${fN(st.throughput)} msg/sec, Prod: ${st.prod}, Dev: ${st.dev}, Total: ${fmt(total)}`)}" target="_blank" rel="noopener noreferrer">Contact Us</a>`;
	}

	function bindSlider(sl: HTMLInputElement, inp: HTMLInputElement, key: 'sessions' | 'throughput', max: number) {
		sl.addEventListener('input', () => { (st as any)[key] = parseInt(sl.value); inp.value = sl.value; sliderProgress(sl); scheduleCalc(); });
		inp.addEventListener('input', () => { const v = parseInt(inp.value); if (!isNaN(v) && v > 0) { (st as any)[key] = v; sl.value = String(Math.min(parseInt(sl.max), v)); sliderProgress(sl); scheduleCalc(); } });
		inp.addEventListener('blur', () => { const v = Math.max(parseInt(sl.min), Math.min(max, parseInt(inp.value) || parseInt(sl.min))); (st as any)[key] = v; inp.value = String(v); sl.value = String(Math.min(v, parseInt(sl.max))); sliderProgress(sl); calc(); });
	}
	bindSlider(sS, sI, 'sessions', 1000000); bindSlider(tS, tI, 'throughput', 1000000);

	function bindStepper(id: string, key: 'prod' | 'dev', min: number) {
		const sInp = $(id).querySelector('input[type="number"]') as HTMLInputElement;
		$(id).querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => { if ((btn as HTMLButtonElement).disabled) return; (st as any)[key] = (btn as HTMLElement).dataset.action === 'increment' ? (st as any)[key] + 1 : Math.max(min, (st as any)[key] - 1); sInp.value = String((st as any)[key]); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = (st as any)[key] <= min; calc(); });
		});
		sInp.addEventListener('input', () => { const v = parseInt(sInp.value); if (!isNaN(v) && v >= min) { (st as any)[key] = v; ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; scheduleCalc(); } });
		sInp.addEventListener('blur', () => { const v = Math.max(min, parseInt(sInp.value) || min); (st as any)[key] = v; sInp.value = String(v); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; calc(); });
	}
	bindStepper('#mqp-prod-stepper', 'prod', 1); bindStepper('#mqp-dev-stepper', 'dev', 0);

	function buildSummary(): string {
		const eS = Math.max(0, st.sessions - MQP.includedSessions);
		const eT = Math.max(0, st.throughput - MQP.includedThroughput);
		const eP = Math.max(0, st.prod - MQP.includedProdInstances);
		const total = MQP.basePrice + eS * MQP.extraSessionsPrice + eT * MQP.extraThroughputPrice + eP * MQP.extraProdInstancesPrice + st.dev * MQP.extraDevInstancesPrice;

		let msg = `TBMQ Perpetual License\n`;
		msg += `- Sessions: ${fN(st.sessions)}\n`;
		msg += `- Throughput: ${fN(st.throughput)} msg/sec\n`;
		msg += `- Prod Instances: ${st.prod}\n`;
		msg += `- Dev Instances: ${st.dev}\n`;
		msg += `\nLicense: ${fmt(total)}\n`;
		if (eS > 0) msg += `- Extra Sessions: ${fN(eS)} (${fmt(eS * MQP.extraSessionsPrice)})\n`;
		if (eT > 0) msg += `- Extra Throughput: ${fN(eT)} msg/sec (${fmt(eT * MQP.extraThroughputPrice)})\n`;
		if (eP > 0) msg += `- Extra Prod: ${eP} (${fmt(eP * MQP.extraProdInstancesPrice)})\n`;
		if (st.dev > 0) msg += `- Extra Dev: ${st.dev} (${fmt(st.dev * MQP.extraDevInstancesPrice)})\n`;
		msg += `\nTotal: ${fmt(total)}`;
		return msg;
	}

	c.querySelector('[data-calc-copy]')?.addEventListener('click', (e) => {
		const btn = e.currentTarget as HTMLElement;
		const text = buildSummary();
		const flashCopied = () => {
			btn.classList.add('copied');
			setTimeout(() => btn.classList.remove('copied'), 2000);
		};
		navigator.clipboard.writeText(text).then(flashCopied).catch(() => {});
	});

	c.querySelector('[data-calc-download]')?.addEventListener('click', () => {
		const blob = new Blob([buildSummary()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'tbmq-perpetual-calculation.txt';
		a.click();
		URL.revokeObjectURL(url);
	});

	$('[data-calc-reset]').addEventListener('click', () => {
		st = { sessions: 10000, throughput: 1000, prod: 1, dev: 0 };
		sI.value = '10000'; sS.value = '10000'; tI.value = '1000'; tS.value = '1000';
		($('#mqp-prod') as HTMLInputElement).value = '1'; ($('#mqp-dev') as HTMLInputElement).value = '0';
		($('#mqp-prod-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		($('#mqp-dev-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		sliderProgress(sS); sliderProgress(tS); calc();
		requestAnimationFrame(() => { if (c) initAllSliders(c); });
	});
	sliderProgress(sS); sliderProgress(tS); calc();
	requestAnimationFrame(() => { if (c) initAllSliders(c); });
}

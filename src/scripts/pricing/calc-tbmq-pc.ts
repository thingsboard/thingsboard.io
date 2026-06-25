// Lazy-loaded module for the TBMQ Private Cloud calculator.
// Inline calculator (rendered inside the TBMQ product tab). See
// `calc-tbmq-payg.ts` for the lazy-load pattern rationale.

import { makeInteractionPusher, bindCtaTracking, bindExportButtons, type CalculatorType } from '@root/scripts/pricing/calc-analytics';

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;

const MQPC = { basePrice: 500, includedSessions: 5000, extraSessionsPrice: 0.05, includedThroughput: 1000, extraThroughputPrice: 0.1, extraDevInstancesPrice: 100, multiAZPrice: 400, networkTrafficIncluded: 200, extraNetworkTrafficPricePerGb: 0.1 };
const MQPC_S = [5000, 25000, 50000, 100000, 1000000];
const MQPC_T = [1000, 5000, 10000, 50000, 1000000];

export function initMqpcCalc() {
	const c = document.getElementById('tbmq-pc-calc');
	if (!c || c.dataset.inited === 'true') return;
	c.dataset.inited = 'true';
	const CALC_TYPE: CalculatorType = 'tbmq_pc';
	const $ = (s: string) => c.querySelector(s) as HTMLElement;
	const $$ = (s: string) => c.querySelectorAll(s);
	const sI = $('#mqpc-sessions') as HTMLInputElement, sS = $('#mqpc-sessions-slider') as HTMLInputElement;
	const tI = $('#mqpc-throughput') as HTMLInputElement, tS = $('#mqpc-throughput-slider') as HTMLInputElement;
	const res = $('[data-calc-results]'), foot = $('[data-calc-footer]');
	const devqaToggle = $('#mqpc-devqa-toggle') as HTMLInputElement;
	const multiazToggle = $('#mqpc-multiaz-toggle') as HTMLInputElement;
	const trafficToggle = $('#mqpc-traffic-toggle') as HTMLInputElement;
	const devqaCounter = $('#mqpc-devqa-counter'), trafficCounter = $('#mqpc-traffic-counter');
	const devInput = $('#mqpc-dev') as HTMLInputElement, trafficInput = $('#mqpc-traffic') as HTMLInputElement;
	const trafficCard = $('#mqpc-traffic-card');

	let st = { sessions: 5000, throughput: 1000, devqa: { on: false, count: 1 }, multiaz: false, traffic: { on: false, extraGB: 1 }, isAdvanced: false, billingPeriod: 'monthly' as 'monthly' | 'annual' };
	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	function s2v(v: number, m: number[]) { const i = Math.floor(v), f = v - i; if (i >= m.length - 1) return m[m.length - 1]; return Math.round(m[i] + f * (m[i + 1] - m[i])); }
	function v2s(val: number, m: number[]) { for (let i = 0; i < m.length - 1; i++) { if (val <= m[i + 1]) return i + (val - m[i]) / (m[i + 1] - m[i]); } return m.length - 1; }

	const infoSvg = '<svg viewBox="0 0 24 24" width="14" height="14" data-icon><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>';
	function tip(t: string) { return ` <span class="calc-tooltip">${infoSvg}<span class="calc-tooltip-text"><span class="calc-tooltip-arrow"></span><span class="calc-tooltip-body">${t}</span></span></span>`; }
	function row(l: string, v: string, t?: string) { return `<div class="calc-result-row"><span class="calc-row-label">${l}:</span><span class="calc-row-value">${v}${t ? tip(t) : ''}</span></div>`; }

	// Last computed total, captured where sendGTM is called so it's the settled
	// value when a footer CTA is clicked.
	let lastTotal: number | null = null;

	let _calcQueued = false;
	function scheduleCalc() {
		if (_calcQueued) return;
		_calcQueued = true;
		requestAnimationFrame(() => { _calcQueued = false; calc(); });
	}

	// Debounced GTM push — mirrors the ThingsBoard calculators' 3s settle so one
	// configuration counts once, not per slider tick. Marketing owns the GTM
	// trigger + GA4 tag (event `calculator_interaction`).
	const calcAnalytics = makeInteractionPusher(CALC_TYPE);
	function sendGTM(total: number) {
		calcAnalytics.push({
			event: 'calculator_interaction',
			calculator_sessions: st.sessions,
			calculator_throughput: st.throughput,
			calculator_billing_period: st.billingPeriod,
			calculator_dev_instances: st.devqa.on ? st.devqa.count : 0,
			calculator_addon_dev_qa: st.devqa.on,
			calculator_addon_multi_az: st.multiaz,
			calculator_addon_network_traffic: st.traffic.on,
			calculator_extra_traffic_gb: st.traffic.on ? st.traffic.extraGB : 0,
			calculator_total: total,
		});
	}

	function calc(opts?: { track?: boolean }) {
		const isAnnual = st.billingPeriod === 'annual';
		let total = MQPC.basePrice;
		const eS = Math.max(0, st.sessions - MQPC.includedSessions), sCost = eS * MQPC.extraSessionsPrice; total += sCost;
		const eT = Math.max(0, st.throughput - MQPC.includedThroughput), tCost = eT * MQPC.extraThroughputPrice; total += tCost;
		const devCost = st.devqa.on ? st.devqa.count * MQPC.extraDevInstancesPrice : 0; total += devCost;
		const multiazCost = st.multiaz ? MQPC.multiAZPrice : 0; total += multiazCost;
		const trafficCost = st.traffic.on ? st.traffic.extraGB * MQPC.extraNetworkTrafficPricePerGb : 0; total += trafficCost;
		const finalTotal = isAnnual ? total * 0.9 : total;

		const uptimeSla = st.multiaz ? '99.99%' : '99.9%';
		const showSlaUpgrade = !st.multiaz;

		let html = '';
		html += row('Included Sessions', fN(MQPC.includedSessions), "Number of sessions covered by the subscription base price.");
		html += row('Included Throughput', `${fN(MQPC.includedThroughput)} msg/sec`, "Amount of throughput covered by the subscription base price.");
		html += row('White Labeling', '<span class="calc-result-badge">Enabled</span>');

		if (showSlaUpgrade) {
			html += `<div class="calc-result-row"><span class="calc-row-label">Uptime SLA:</span><span class="calc-row-value"><button type="button" class="mqpc-sla-upgrade" id="mqpc-sla-upgrade" title="Enable Multi-AZ for 99.99% SLA"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="11" fill="var(--color-primary)"/><path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>${uptimeSla}${tip('The guaranteed minimum monthly uptime for the Private Cloud service, excluding scheduled maintenance.')}</span></div>`;
		} else {
			html += `<div class="calc-result-row"><span class="calc-row-label">Uptime SLA:</span><span class="calc-row-value"><span id="mqpc-sla-anim-anchor" style="display:inline-flex"></span>${uptimeSla}${tip('The guaranteed minimum monthly uptime for the Private Cloud service, excluding scheduled maintenance.')}</span></div>`;
		}

		html += row('Base Price', fmt(MQPC.basePrice), 'Monthly subscription fee before extras and add-ons.');
		if (sCost > 0) {
			html += row('Extra Sessions', fN(eS), "Sessions exceeding the subscription included number.");
			html += row('Extra Sessions Cost', fmt(sCost), `${fN(eS)} extra sessions × ${fmt(MQPC.extraSessionsPrice)}/session`);
		}
		if (tCost > 0) {
			html += row('Extra Throughput', `${fN(eT)} msg/sec`, "Throughput exceeding the subscription included number.");
			html += row('Extra Throughput Cost', fmt(tCost), `${fN(eT)} extra msg/sec × ${fmt(MQPC.extraThroughputPrice)} per msg/sec`);
		}

		html += `<div class="calc-addons-divider">Add-ons</div>`;

		if (st.multiaz) {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Multi-AZ Deployment</span><span class="calc-section-price">${fmt(multiazCost)}${tip('Recurring monthly cost for high availability (HA) and fault tolerance with deployment across multiple AZs and a guaranteed uptime SLA.')}</span></div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Multi-AZ Deployment</span><button type="button" class="calc-addon-result-action" data-enable-mqpc-addon="multiaz">Add to plan (${fmt(MQPC.multiAZPrice)})</button></div>`;
		}

		if (st.devqa.on) {
			html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Dev & QA Instances</span><span class="calc-section-price">${fmt(devCost)}${tip(`${st.devqa.count} × ${fmt(MQPC.extraDevInstancesPrice)}`)}</span></div>`;
			html += row('Dev Instances', fN(st.devqa.count));
			html += row('Dev Instances Cost', fmt(devCost), `${fN(st.devqa.count)} × ${fmt(MQPC.extraDevInstancesPrice)}`);
			html += `</div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Dev & QA Instances</span><button type="button" class="calc-addon-result-action" data-enable-mqpc-addon="devqa">Add to plan (${fmt(MQPC.extraDevInstancesPrice)})</button></div>`;
		}

		if (st.isAdvanced) {
			if (st.traffic.on) {
				html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Network traffic</span><span class="calc-section-price">${fmt(trafficCost)}${tip(`${st.traffic.extraGB} GB × $${MQPC.extraNetworkTrafficPricePerGb}/GB`)}</span></div>`;
				html += row('Included Network Traffic', `${MQPC.networkTrafficIncluded} GB`, 'Network traffic included monthly');
				html += row('Extra Network Traffic', `${fN(st.traffic.extraGB)} GB`);
				html += `</div>`;
			} else {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Network Traffic</span><button type="button" class="calc-addon-result-action" data-enable-mqpc-addon="traffic">Add to plan ($${MQPC.extraNetworkTrafficPricePerGb}/GB)</button></div>`;
			}
		}

		const _st = res.parentElement?.scrollTop || 0; res.innerHTML = html; if (res.parentElement) res.parentElement.scrollTop = _st;

		const billingRow = foot.querySelector('.calc-billing-row');
		if (billingRow) {
			billingRow.querySelectorAll('.calc-billing-label').forEach(l => {
				const isMo = (l as HTMLElement).dataset.billing === 'monthly';
				l.classList.toggle('active', isMo ? !isAnnual : isAnnual);
			});
		}

		const totalParts = [`${fmt(MQPC.basePrice)} (base)`];
		if (sCost > 0) totalParts.push(`${fmt(sCost)} (sessions)`);
		if (tCost > 0) totalParts.push(`${fmt(tCost)} (throughput)`);
		if (devCost > 0) totalParts.push(`${fmt(devCost)} (Dev & QA)`);
		if (multiazCost > 0) totalParts.push(`${fmt(multiazCost)} (Multi-AZ)`);
		if (trafficCost > 0) totalParts.push(`${fmt(trafficCost)} (traffic)`);
		let totalTip = totalParts.join(' + ');
		if (isAnnual) totalTip = `(${totalTip}) − 10% Annual Discount`;

		const totalEl = foot.querySelector('.calc-total-row');
		if (totalEl) totalEl.innerHTML = `<span class="calc-total-label">Total</span><span class="calc-total-amount">${fmt(finalTotal)}/month${tip(totalTip)}</span>`;
		const ctaEl = foot.querySelector('.calc-cta') as HTMLAnchorElement | null;
		if (ctaEl) ctaEl.href = `/contact-us/?subject=${encodeURIComponent('TBMQ')}&message=${encodeURIComponent(buildSummary())}`;

		lastTotal = finalTotal;
		if (opts?.track !== false) sendGTM(finalTotal);

		// SLA upgrade button — must rebind because the row containing it is
		// re-rendered on every calc(). Cheap (1 button) so no need to delegate.
		const slaBtn = res.querySelector('#mqpc-sla-upgrade');
		if (slaBtn) {
			slaBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				st.multiaz = true;
				multiazToggle.checked = true;
				$('#mqpc-multiaz-card').classList.add('active');
				calc();
				requestAnimationFrame(() => {
					const anchor = document.getElementById('mqpc-sla-anim-anchor');
					if (anchor) {
						const arrow = document.createElement('span');
						arrow.style.display = 'inline-flex';
						arrow.className = 'mqpc-sla-arrow-animated';
						arrow.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="11" fill="var(--color-primary)"/><path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
						anchor.appendChild(arrow);
						setTimeout(() => arrow.remove(), 500);
					}
				});
			});
		}
	}

	// Delegated handler for [data-enable-mqpc-addon] buttons rendered inside
	// the results panel. Bound once instead of per-button on every calc().
	res.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement)?.closest('[data-enable-mqpc-addon]') as HTMLElement | null;
		if (!btn) return;
		const key = btn.dataset.enableMqpcAddon;
		if (key === 'devqa') { st.devqa.on = true; devqaToggle.checked = true; $('#mqpc-devqa-card').classList.add('active'); devqaCounter.classList.remove('hidden'); }
		if (key === 'multiaz') { st.multiaz = true; multiazToggle.checked = true; $('#mqpc-multiaz-card').classList.add('active'); }
		if (key === 'traffic') { st.traffic.on = true; trafficToggle.checked = true; $('#mqpc-traffic-card').classList.add('active'); trafficCounter.classList.remove('hidden'); }
		calc();
	});

	// Footer conversion CTAs re-render on every recalc, so bind once on the
	// stable container and read state at click.
	bindCtaTracking(c, CALC_TYPE, () => ({ calculator_total: lastTotal }));

	function bindSlider(sl: HTMLInputElement, inp: HTMLInputElement, marks: number[], key: 'sessions' | 'throughput') {
		sl.addEventListener('input', () => { (st as any)[key] = s2v(parseFloat(sl.value), marks); inp.value = String((st as any)[key]); sliderProgress(sl); scheduleCalc(); });
		inp.addEventListener('input', () => { const v = parseInt(inp.value); if (!isNaN(v) && v > 0) { (st as any)[key] = v; sl.value = String(Math.min(parseFloat(sl.max), v2s(v, marks))); sliderProgress(sl); scheduleCalc(); } });
		inp.addEventListener('blur', () => { const v = Math.max(marks[0], parseInt(inp.value) || marks[0]); (st as any)[key] = v; inp.value = String(v); sl.value = String(v2s(v, marks)); sliderProgress(sl); calc(); });
	}
	bindSlider(sS, sI, MQPC_S, 'sessions'); bindSlider(tS, tI, MQPC_T, 'throughput');

	function bindStepper(id: string, onChange: (v: number) => void, min: number) {
		const sInp = $(id).querySelector('input[type="number"]') as HTMLInputElement;
		$(id).querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				if ((btn as HTMLButtonElement).disabled) return;
				let v = parseInt(sInp.value) || min;
				v = (btn as HTMLElement).dataset.action === 'increment' ? v + 1 : Math.max(min, v - 1);
				sInp.value = String(v);
				($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min;
				onChange(v);
			});
		});
		sInp.addEventListener('input', () => { const v = parseInt(sInp.value); if (!isNaN(v) && v >= min) { ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; onChange(v); } });
		sInp.addEventListener('blur', () => { const v = Math.max(min, parseInt(sInp.value) || min); sInp.value = String(v); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; onChange(v); });
	}
	bindStepper('#mqpc-dev-stepper', v => { st.devqa.count = v; calc(); }, 1);
	bindStepper('#mqpc-traffic-stepper', v => { st.traffic.extraGB = v; calc(); }, 1);

	devqaToggle.addEventListener('change', () => { st.devqa.on = devqaToggle.checked; $('#mqpc-devqa-card').classList.toggle('active', st.devqa.on); devqaCounter.classList.toggle('hidden', !st.devqa.on); calc(); });
	multiazToggle.addEventListener('change', () => { st.multiaz = multiazToggle.checked; $('#mqpc-multiaz-card').classList.toggle('active', st.multiaz); calc(); });
	trafficToggle.addEventListener('change', () => { st.traffic.on = trafficToggle.checked; $('#mqpc-traffic-card').classList.toggle('active', st.traffic.on); trafficCounter.classList.toggle('hidden', !st.traffic.on); calc(); });

	// ─── Mode toggle (Basic/Advanced) ───
	$$('.calc-mode-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const adv = (btn as HTMLElement).dataset.mode === 'advanced';
			st.isAdvanced = adv;
			$$('.calc-mode-btn').forEach(b => {
				const isActive = (b as HTMLElement).dataset.mode === (adv ? 'advanced' : 'basic');
				b.classList.toggle('active', isActive);
				b.setAttribute('aria-pressed', String(isActive));
			});
			trafficCard.classList.toggle('hidden', !adv);
			if (!adv && st.traffic.on) {
				st.traffic.on = false;
				trafficToggle.checked = false;
				trafficCard.classList.remove('active');
				trafficCounter.classList.add('hidden');
			}
			calc();
		});
	});

	// ─── Render footer once (billing toggle persists) ───
	foot.innerHTML = `
		<div class="calc-billing-row">
			<span class="calc-billing-label active" data-billing="monthly">Monthly</span>
			<label class="calc-toggle"><input type="checkbox" id="mqpc-bill-toggle" role="switch" aria-label="Toggle billing period" /><span class="calc-toggle-track"></span></label>
			<span class="calc-billing-label" data-billing="annual">Annual <span class="calc-billing-save">(Save 10%)</span></span>
		</div>
		<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">$0/month</span></div>
		<a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('TBMQ')}" target="_blank" rel="noopener noreferrer">Contact Us</a>
		<p class="calc-disclaimer">Pricing calculation is estimate and depend on traffic volume</p>`;

	const billingToggle = foot.querySelector('#mqpc-bill-toggle') as HTMLInputElement;
	billingToggle?.addEventListener('change', () => {
		st.billingPeriod = billingToggle.checked ? 'annual' : 'monthly';
		calc();
	});
	foot.querySelectorAll('.calc-billing-label').forEach(l => {
		l.addEventListener('click', () => {
			st.billingPeriod = (l as HTMLElement).dataset.billing === 'annual' ? 'annual' : 'monthly';
			if (billingToggle) billingToggle.checked = st.billingPeriod === 'annual';
			calc();
		});
	});

	function buildSummary(): string {
		const isAnnual = st.billingPeriod === 'annual';
		const eS = Math.max(0, st.sessions - MQPC.includedSessions);
		const eT = Math.max(0, st.throughput - MQPC.includedThroughput);
		const devCost = st.devqa.on ? st.devqa.count * MQPC.extraDevInstancesPrice : 0;
		const multiazCost = st.multiaz ? MQPC.multiAZPrice : 0;
		const trafficCost = st.traffic.on ? st.traffic.extraGB * MQPC.extraNetworkTrafficPricePerGb : 0;
		const total = MQPC.basePrice + eS * MQPC.extraSessionsPrice + eT * MQPC.extraThroughputPrice + devCost + multiazCost + trafficCost;
		const finalTotal = isAnnual ? total * 0.9 : total;
		const uptimeSla = st.multiaz ? '99.99%' : '99.9%';

		let msg = `TBMQ Private Cloud\n`;
		msg += `- Billing: ${isAnnual ? 'Annual' : 'Monthly'}\n`;
		msg += `- Sessions: ${fN(st.sessions)}\n`;
		msg += `- Throughput: ${fN(st.throughput)} msg/sec\n`;
		msg += `- Uptime SLA: ${uptimeSla}\n`;
		msg += `\nSubscription: ${fmt(finalTotal)}/month\n`;
		if (eS > 0) msg += `- Extra Sessions: ${fN(eS)} (${fmt(eS * MQPC.extraSessionsPrice)})\n`;
		if (eT > 0) msg += `- Extra Throughput: ${fN(eT)} msg/sec (${fmt(eT * MQPC.extraThroughputPrice)})\n`;
		if (devCost > 0) msg += `- Dev & QA: ${st.devqa.count} (${fmt(devCost)})\n`;
		if (multiazCost > 0) msg += `- Multi-AZ: ${fmt(multiazCost)}\n`;
		if (trafficCost > 0) msg += `- Extra Traffic: ${st.traffic.extraGB} GB (${fmt(trafficCost)})\n`;
		if (isAnnual) msg += `\nAnnual discount: 10%\n`;
		msg += `\nTotal: ${fmt(finalTotal)}/month`;
		return msg;
	}

	bindExportButtons(c, CALC_TYPE, {
		buildText: buildSummary,
		filename: 'tbmq-private-cloud-calculation.txt',
		getExtra: () => ({ calculator_total: lastTotal }),
	});

	$('[data-calc-reset]').addEventListener('click', () => {
		st = { sessions: 5000, throughput: 1000, devqa: { on: false, count: 1 }, multiaz: false, traffic: { on: false, extraGB: 1 }, isAdvanced: false, billingPeriod: 'monthly' };
		sI.value = '5000'; sS.value = '0'; tI.value = '1000'; tS.value = '0';
		devInput.value = '1'; trafficInput.value = '1';
		devqaToggle.checked = false; multiazToggle.checked = false; trafficToggle.checked = false;
		$('#mqpc-devqa-card').classList.remove('active'); $('#mqpc-multiaz-card').classList.remove('active'); $('#mqpc-traffic-card').classList.remove('active');
		devqaCounter.classList.add('hidden'); trafficCounter.classList.add('hidden');
		($('#mqpc-dev-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		($('#mqpc-traffic-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		$$('.calc-mode-btn').forEach(b => { b.classList.toggle('active', (b as HTMLElement).dataset.mode === 'basic'); b.setAttribute('aria-pressed', String((b as HTMLElement).dataset.mode === 'basic')); });
		trafficCard.classList.add('hidden');
		if (billingToggle) billingToggle.checked = false;
		foot.querySelectorAll('.calc-billing-label').forEach(l => l.classList.toggle('active', (l as HTMLElement).dataset.billing === 'monthly'));
		sliderProgress(sS); sliderProgress(tS); calc({ track: false });
		requestAnimationFrame(() => { if (c) initAllSliders(c); });
	});

	sliderProgress(sS); sliderProgress(tS); calc({ track: false });
	requestAnimationFrame(() => { if (c) initAllSliders(c); });
}

// Lazy-loaded module for the TBMQ Pay-As-You-Go (self-managed) calculator.
// Inline calculator (not a modal) — rendered only inside the TBMQ product tab.
// The loader in `TbmqPaygCalculator.astro` dynamically imports this module on
// the first `pricing:product-activated` event whose detail is 'tbmq'.

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;

const MQ_PLAN = { basePrice: 15, includedSessions: 100, extraSessionsPrice: 0.05, includedThroughput: 100, extraThroughputPrice: 0.1, includedProdInstances: 1, extraProdInstancesPrice: 100, extraDevInstancesPrice: 50, whiteLabelingPrice: 100, priorityHelpDeskPrice: 300, productId: '6d811b30-f5ec-11f0-8e58-abbac8d0a38a', planId: 'a2a848b0-f5ec-11f0-8e58-abbac8d0a38a' };
const MQ_S_MARKS = [100, 1000, 2000, 5000, 10000, 100000, 1000000];
const MQ_T_MARKS = [100, 1000, 2000, 5000, 10000, 20000, 1000000];

export function initTbmqPaygCalc() {
	const c = document.getElementById('tbmq-payg-calc');
	// Idempotent: skip if this container already has listeners bound. Prevents
	// duplicates when astro:page-load fires against persisted DOM nodes (or when
	// `pricing:product-activated` fires multiple times before a navigation).
	if (!c || c.dataset.inited === 'true') return;
	c.dataset.inited = 'true';
	const $ = (s: string) => c.querySelector(s) as HTMLElement;
	const sI = $('#mq-sessions') as HTMLInputElement, sS = $('#mq-sessions-slider') as HTMLInputElement;
	const tI = $('#mq-throughput') as HTMLInputElement, tS = $('#mq-throughput-slider') as HTMLInputElement;
	const pI = $('#mq-prod') as HTMLInputElement, dI = $('#mq-dev') as HTMLInputElement;
	const res = $('[data-calc-results]'), foot = $('[data-calc-footer]');
	const wl = $('#mq-wl-toggle') as HTMLInputElement, hd = $('#mq-hd-toggle') as HTMLInputElement;

	let st = { sessions: 100, throughput: 100, prod: 1, dev: 0, wl: false, hd: false };

	const isBaseOnly = () =>
		!st.wl && !st.hd &&
		st.sessions <= MQ_PLAN.includedSessions &&
		st.throughput <= MQ_PLAN.includedThroughput &&
		st.prod <= MQ_PLAN.includedProdInstances &&
		st.dev === 0;

	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	function s2v(v: number, m: number[]) { const i = Math.floor(v), f = v - i; if (i >= m.length - 1) return m[m.length - 1]; return Math.round(m[i] + f * (m[i + 1] - m[i])); }
	function v2s(val: number, m: number[]) { for (let i = 0; i < m.length - 1; i++) { if (val <= m[i + 1]) return i + (val - m[i]) / (m[i + 1] - m[i]); } return m.length - 1; }

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
		let total = MQ_PLAN.basePrice;
		const eS = Math.max(0, st.sessions - MQ_PLAN.includedSessions); const sCost = eS * MQ_PLAN.extraSessionsPrice; total += sCost;
		const eT = Math.max(0, st.throughput - MQ_PLAN.includedThroughput); const tCost = eT * MQ_PLAN.extraThroughputPrice; total += tCost;
		const eP = Math.max(0, st.prod - MQ_PLAN.includedProdInstances); const pCost = eP * MQ_PLAN.extraProdInstancesPrice; total += pCost;
		const dCost = st.dev * MQ_PLAN.extraDevInstancesPrice; total += dCost;
		const wlCost = st.wl ? MQ_PLAN.whiteLabelingPrice : 0; total += wlCost;
		const hdCost = st.hd ? MQ_PLAN.priorityHelpDeskPrice : 0; total += hdCost;

		const supportLevel = st.hd ? 'Priority Help Desk' : (total >= 300 ? 'Help Desk' : 'Community');
		const supportTip = supportLevel === 'Community' ? 'Self-service access to public knowledge base, documentation, and community forums.' : supportLevel === 'Help Desk' ? 'Help Desk access to the dedicated TBMQ expert team for technical resolution.' : 'Prioritized ticket handling via a high-priority queue managed by the expert team.';
		const subCost = MQ_PLAN.basePrice + sCost + tCost + pCost + dCost;
		const baseOnly = isBaseOnly();
		const subPriceHtml = baseOnly ? `<span style="font-weight:700">$0.00</span> <span style="text-decoration:line-through;color:var(--color-text-secondary);font-weight:400">${fmt(subCost)}</span>` : fmt(subCost);
		let html = `<div class="calc-section"><div class="calc-section-header"><span class="calc-section-title">Subscription</span><span class="calc-section-price">${subPriceHtml}${tip(baseOnly ? 'Free 30-day trial — subscription starts after trial ends.' : 'Total monthly subscription cost including extra resources (excluding add-ons).')}</span></div><div class="calc-section-body">`;
		html += row('Included Sessions', fN(MQ_PLAN.includedSessions), "Number of sessions covered by this subscription plan's base price.");
		html += row('Included Throughput', `${fN(MQ_PLAN.includedThroughput)} msg/sec`, "Amount of throughput covered by this subscription plan's base price.");
		html += row('Included Prod Instances', fN(MQ_PLAN.includedProdInstances), "Number of production instances covered by this subscription plan's base price.");
		html += row('Support', `<span class="${supportLevel === 'Priority Help Desk' ? 'support-priority' : ''}">${supportLevel}</span>`, supportTip);
		const basePriceHtml = baseOnly ? `<span style="text-decoration:line-through;color:var(--color-text-secondary)">${fmt(MQ_PLAN.basePrice)}</span>` : fmt(MQ_PLAN.basePrice);
		html += row('Base Price', basePriceHtml, 'Monthly subscription fee before extras and add-ons.');
		if (sCost > 0) html += row('Extra Sessions', fN(eS), "Sessions exceeding the subscription plan's included number.");
		if (sCost > 0) html += row('Extra Sessions Cost', fmt(sCost), `${fN(eS)} extra sessions × ${fmt(MQ_PLAN.extraSessionsPrice)}/session`);
		if (tCost > 0) html += row('Extra Throughput', `${fN(eT)} msg/sec`, "Throughput exceeding the subscription plan's included number.");
		if (tCost > 0) html += row('Extra Throughput Cost', fmt(tCost), `${fN(eT)} extra msg/sec × ${fmt(MQ_PLAN.extraThroughputPrice)} per msg/sec`);
		if (pCost > 0) html += row('Extra Prod Instances', fN(eP), "Production instances added beyond the subscription plan's included number.");
		if (pCost > 0) html += row('Extra Prod Cost', fmt(pCost), `${fN(eP)} extra prod instance × ${fmt(MQ_PLAN.extraProdInstancesPrice)}/prod instance`);
		if (dCost > 0) html += row('Dev Instances', fN(st.dev), "Development instances added beyond the subscription plan's included number.");
		if (dCost > 0) html += row('Dev Instances Cost', fmt(dCost), `${fN(st.dev)} extra dev instance × ${fmt(MQ_PLAN.extraDevInstancesPrice)}/dev instance`);
		html += `</div></div>`;

		html += `<div class="calc-addons-divider">Add-ons</div>`;
		if (st.wl) {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">White Labeling</span><span class="calc-section-price">${fmt(wlCost)}${tip('The recurring monthly cost for enabling custom branding in your environment.')}</span></div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">White Labeling</span><button type="button" class="calc-addon-result-action" data-enable-mq-addon="wl">Add to plan (${fmt(MQ_PLAN.whiteLabelingPrice)})</button></div>`;
		}
		if (st.hd) {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Priority Help Desk</span><span class="calc-section-price">${fmt(hdCost)}${tip('The recurring monthly cost for accessing the prioritized support queue.')}</span></div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Priority Help Desk</span><button type="button" class="calc-addon-result-action" data-enable-mq-addon="hd">Add to plan (${fmt(MQ_PLAN.priorityHelpDeskPrice)})</button></div>`;
		}

		const _st = res.parentElement?.scrollTop || 0; res.innerHTML = html; if (res.parentElement) res.parentElement.scrollTop = _st;

		const totalParts = [`${fmt(MQ_PLAN.basePrice)} (base)`];
		if (sCost > 0) totalParts.push(`${fmt(sCost)} (sessions)`);
		if (tCost > 0) totalParts.push(`${fmt(tCost)} (throughput)`);
		if (pCost > 0) totalParts.push(`${fmt(pCost)} (prod instances)`);
		if (dCost > 0) totalParts.push(`${fmt(dCost)} (dev instances)`);
		if (wlCost > 0) totalParts.push(`${fmt(wlCost)} (WL)`);
		if (hdCost > 0) totalParts.push(`${fmt(hdCost)} (Help Desk)`);
		const totalHtml = baseOnly
			? `<span style="font-weight:700">$0.00</span> <span style="text-decoration:line-through;color:var(--color-text-secondary);font-weight:400">${fmt(total)}</span> /month`
			: `${fmt(total)}/month`;
		const totalTip = baseOnly ? 'Free 30-day trial' : totalParts.join(' + ');

		const mqItems: Record<string, any> = {};
		if (eS > 0) mqItems.extraSessionCount = eS;
		if (eT > 0) mqItems.extraThroughputCount = eT;
		if (eP > 0) mqItems.extraInstanceCount = eP;
		if (st.dev > 0) mqItems.extraDevInstanceCount = st.dev;
		if (st.wl) mqItems.whiteLabelingAddonEnabled = true;
		if (st.hd) mqItems.priorityHelpDeskEnabled = true;
		let mqCtaUrl = `https://license.thingsboard.io/signup?createSubscription=true&productId=${MQ_PLAN.productId}&planId=${MQ_PLAN.planId}&coupon=CFQJ30PWTB`;
		const mqItemsStr = JSON.stringify(mqItems);
		if (mqItemsStr !== '{}') mqCtaUrl += '&items=' + encodeURIComponent(mqItemsStr);
		const mqUtm = localStorage.getItem('utm');
		if (mqUtm) { try { const u = JSON.parse(mqUtm); Object.keys(u).forEach(k => { mqCtaUrl += '&' + k + '=' + encodeURIComponent(u[k]); }); } catch { /* ignore malformed utm */ } }
		const mqFpr = localStorage.getItem('fpr');
		if (mqFpr) mqCtaUrl += '&fpr=' + encodeURIComponent(mqFpr);

		foot.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">${totalHtml}${tip(totalTip)}</span></div><a class="calc-cta" href="${mqCtaUrl}" target="_blank" rel="noopener noreferrer">${baseOnly ? 'Try 30 days for free' : 'Get started'}</a>`;
	}

	// Delegated handler for [data-enable-mq-addon] buttons rendered inside the
	// results panel. Bound once instead of per-button on every calc().
	res.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement)?.closest('[data-enable-mq-addon]') as HTMLElement | null;
		if (!btn) return;
		const key = btn.dataset.enableMqAddon;
		if (key === 'wl') { st.wl = true; wl.checked = true; $('#mq-wl-card').classList.add('active'); }
		if (key === 'hd') { st.hd = true; hd.checked = true; $('#mq-hd-card').classList.add('active'); }
		calc();
	});

	function bindSlider(sl: HTMLInputElement, inp: HTMLInputElement, marks: number[], key: 'sessions' | 'throughput') {
		sl.addEventListener('input', () => { (st as any)[key] = s2v(parseFloat(sl.value), marks); inp.value = String((st as any)[key]); sliderProgress(sl); scheduleCalc(); });
		inp.addEventListener('input', () => { const v = parseInt(inp.value); if (!isNaN(v) && v > 0) { (st as any)[key] = v; sl.value = String(Math.min(parseFloat(sl.max), v2s(v, marks))); sliderProgress(sl); scheduleCalc(); } });
		inp.addEventListener('blur', () => { const v = Math.max(marks[0], parseInt(inp.value) || marks[0]); (st as any)[key] = v; inp.value = String(v); sl.value = String(v2s(v, marks)); sliderProgress(sl); calc(); });
	}
	bindSlider(sS, sI, MQ_S_MARKS, 'sessions');
	bindSlider(tS, tI, MQ_T_MARKS, 'throughput');

	function bindStepper(id: string, key: 'prod' | 'dev', min: number) {
		const sInp = $(id).querySelector('input[type="number"]') as HTMLInputElement;
		$(id).querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => { if ((btn as HTMLButtonElement).disabled) return; (st as any)[key] = (btn as HTMLElement).dataset.action === 'increment' ? (st as any)[key] + 1 : Math.max(min, (st as any)[key] - 1); sInp.value = String((st as any)[key]); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = (st as any)[key] <= min; calc(); });
		});
		sInp.addEventListener('input', () => { const v = parseInt(sInp.value); if (!isNaN(v) && v >= min) { (st as any)[key] = v; ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; scheduleCalc(); } });
		sInp.addEventListener('blur', () => { const v = Math.max(min, parseInt(sInp.value) || min); (st as any)[key] = v; sInp.value = String(v); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; calc(); });
	}
	bindStepper('#mq-prod-stepper', 'prod', 1);
	bindStepper('#mq-dev-stepper', 'dev', 0);

	wl.addEventListener('change', () => { st.wl = wl.checked; $('#mq-wl-card').classList.toggle('active', st.wl); calc(); });
	hd.addEventListener('change', () => { st.hd = hd.checked; $('#mq-hd-card').classList.toggle('active', st.hd); calc(); });

	function buildSummary(): string {
		const eS = Math.max(0, st.sessions - MQ_PLAN.includedSessions);
		const eT = Math.max(0, st.throughput - MQ_PLAN.includedThroughput);
		const eP = Math.max(0, st.prod - MQ_PLAN.includedProdInstances);
		let total = MQ_PLAN.basePrice + eS * MQ_PLAN.extraSessionsPrice + eT * MQ_PLAN.extraThroughputPrice + eP * MQ_PLAN.extraProdInstancesPrice + st.dev * MQ_PLAN.extraDevInstancesPrice;
		if (st.wl) total += MQ_PLAN.whiteLabelingPrice;
		if (st.hd) total += MQ_PLAN.priorityHelpDeskPrice;
		const baseOnly = isBaseOnly();
		const supportLevel = st.hd ? 'Priority Help Desk' : (total >= 300 ? 'Help Desk' : 'Community');

		const subCost = MQ_PLAN.basePrice + eS * MQ_PLAN.extraSessionsPrice + eT * MQ_PLAN.extraThroughputPrice + eP * MQ_PLAN.extraProdInstancesPrice + st.dev * MQ_PLAN.extraDevInstancesPrice;
		let msg = `TBMQ Self-managed Subscription\n`;
		msg += `- Sessions: ${fN(st.sessions)}\n`;
		msg += `- Throughput: ${fN(st.throughput)} msg/sec\n`;
		msg += `- Prod Instances: ${st.prod}\n`;
		msg += `- Dev Instances: ${st.dev}\n`;
		msg += `- Support: ${supportLevel}\n`;
		msg += `\nSubscription: ${fmt(subCost)}\n`;
		if (eS > 0) msg += `- Extra Sessions: ${fN(eS)} (${fmt(eS * MQ_PLAN.extraSessionsPrice)})\n`;
		if (eT > 0) msg += `- Extra Throughput: ${fN(eT)} msg/sec (${fmt(eT * MQ_PLAN.extraThroughputPrice)})\n`;
		if (eP > 0) msg += `- Extra Prod: ${eP} (${fmt(eP * MQ_PLAN.extraProdInstancesPrice)})\n`;
		if (st.dev > 0) msg += `- Extra Dev: ${st.dev} (${fmt(st.dev * MQ_PLAN.extraDevInstancesPrice)})\n`;
		if (st.wl || st.hd) {
			msg += `\nAdd-ons:\n`;
			if (st.wl) msg += `- White Labeling: ${fmt(MQ_PLAN.whiteLabelingPrice)}\n`;
			if (st.hd) msg += `- Priority Help Desk: ${fmt(MQ_PLAN.priorityHelpDeskPrice)}\n`;
		}
		msg += baseOnly ? `\nTotal: $0.00/month (Free 30-day trial, then ${fmt(total)}/month)` : `\nTotal: ${fmt(total)}/month`;
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
		a.download = 'tbmq-payg-calculation.txt';
		a.click();
		URL.revokeObjectURL(url);
	});

	$('[data-calc-reset]').addEventListener('click', () => {
		st = { sessions: 100, throughput: 100, prod: 1, dev: 0, wl: false, hd: false };
		sI.value = '100'; sS.value = '0'; tI.value = '100'; tS.value = '0'; pI.value = '1'; dI.value = '0';
		wl.checked = false; hd.checked = false;
		$('#mq-wl-card').classList.remove('active'); $('#mq-hd-card').classList.remove('active');
		($('#mq-prod-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		($('#mq-dev-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		sliderProgress(sS); sliderProgress(tS); calc();
		requestAnimationFrame(() => { if (c) initAllSliders(c); });
	});

	sliderProgress(sS); sliderProgress(tS); calc();
	requestAnimationFrame(() => { if (c) initAllSliders(c); });
}

// Lazy-loaded module for the ThingsBoard Perpetual License calculator.
// See `calc-tb-payg.ts` for the lazy-load pattern rationale.

import { makeModalController } from '@root/scripts/pricing/modal-controller';
import { makeInteractionPusher, pushCalculatorOpen, bindCtaTracking, bindExportButtons, type CalculatorType } from '@root/scripts/pricing/calc-analytics';

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;

const PERP = {
	price: 4999, includedDevices: 5000, extraDevicePrice: 1,
	includedProdInstances: 1, extraProdInstancePrice: 4999, devicesPerInstance: 5000,
	devQaExtraInstancePrice: 999,
	// 1 AI credit pack = 1,000,000 credits; 5 packs come with the license,
	// extra packs are a one-time fee each (matches the License Portal).
	includedAiCreditPacks: 5, extraAiCreditPackPrice: 5,
	edgeBasePrice: 849, edgeInstancesIncluded: 2, extraEdgePrice: 399,
	trendzBasePrice: 1499, trendzExtraDevicePrice: 0.3,
	offlineModePrice: 19999,
	// From this total onward we stop quoting a number and route to sales
	// (matches the License Portal calculator threshold).
	customPricingFrom: 24998,
};

// Default helper under the Production Instances stepper. The SSR markup in
// TbPerpetualCalculator.astro carries the same sentence as the pre-JS
// placeholder — keep the two in sync when editing.
const PROD_DESC_DEFAULT = '1 included. Add a 2nd for high availability (HA). Each purchased instance includes 5,000 devices; every full 5,000 extra devices adds one production instance at no charge.';

const PERP_SLIDER_BP = 20000;
const PERP_SLIDER_MAX = 25000;
const PERP_REAL_MAX = 1000000;
// Purchased instances alone must not push the quota past the 1M device cap:
// 5,000 base + MAX_INSTANCES × 5,000 = PERP_REAL_MAX exactly.
const MAX_INSTANCES = (PERP_REAL_MAX - 5000) / 5000;
const sliderToReal = (v: number) => v <= PERP_SLIDER_BP ? v : Math.round(PERP_SLIDER_BP + (v - PERP_SLIDER_BP) * ((PERP_REAL_MAX - PERP_SLIDER_BP) / (PERP_SLIDER_MAX - PERP_SLIDER_BP)));
const realToSlider = (v: number) => v <= PERP_SLIDER_BP ? v : PERP_SLIDER_BP + (v - PERP_SLIDER_BP) * ((PERP_SLIDER_MAX - PERP_SLIDER_BP) / (PERP_REAL_MAX - PERP_SLIDER_BP));

let openImpl: (() => void) | null = null;

const CALC_TYPE: CalculatorType = 'tb_perp';

export function initTbPerpCalc() {
	if (openImpl) return;
	const modal = document.getElementById('tb-perp-calc');
	if (!modal) return;
	const $ = (s: string) => modal.querySelector(s) as HTMLElement;
	const devicesInput = $('#perp-devices') as HTMLInputElement;
	const slider = $('#perp-devices-slider') as HTMLInputElement;
	const results = $('[data-calc-results]');
	const footer = $('[data-calc-footer]');

	const toggles = {
		edge: $('#perp-edge-toggle') as HTMLInputElement,
		trendz: $('#perp-trendz-toggle') as HTMLInputElement,
		offline: $('#perp-offline-toggle') as HTMLInputElement,
	};
	const cards = {
		edge: $('#perp-edge-card'),
		trendz: $('#perp-trendz-card'),
		offline: $('#perp-offline-card'),
	};

	// Devices and production instances are one symmetric scaling unit:
	// each purchased instance ($4,999) also grants 5,000 devices, and every
	// full 5,000 purchased extra devices unlocks 1 complimentary instance.
	// State therefore tracks what the user *buys*; the device field and the
	// instance stepper both display the resulting entitlement.
	const initialState = () => ({
		extraDevices: 0, instances: 0, dev: 0, aiPacks: PERP.includedAiCreditPacks,
		addons: { edge: { on: false, count: PERP.edgeInstancesIncluded }, trendz: { on: false }, offline: { on: false } }
	});
	let st = initialState();

	const deviceFloor = () => PERP.includedDevices + st.instances * PERP.devicesPerInstance;
	const deviceQuota = () => deviceFloor() + st.extraDevices;
	const getComplimentary = () => Math.floor(st.extraDevices / PERP.devicesPerInstance);
	const totalInstances = () => PERP.includedProdInstances + st.instances + getComplimentary();
	const extraAiPacks = () => Math.max(0, st.aiPacks - PERP.includedAiCreditPacks);

	let lastTotal: number | null = null;
	// Single home for the plan label derivation (null total = contact-sales tier).
	const planLabel = () => (lastTotal === null ? 'Custom' : 'Platform');

	const calcAnalytics = makeInteractionPusher(CALC_TYPE);
	function sendPerpGTM() {
		calcAnalytics.push({
			event: 'calculator_interaction',
			calculator_devices: deviceQuota(),
			calculator_plan: planLabel(),
			calculator_instances: totalInstances(),
			calculator_ai_credits: st.aiPacks,
			calculator_addon_dev_area: st.dev > 0,
			calculator_addon_trendz_bot_area: st.addons.trendz.on,
			calculator_addon_bot_area: st.addons.edge.on,
			calculator_addon_offline: st.addons.offline.on,
			calculator_total: lastTotal,
		});
	}

	const prodDesc = $('#perp-prod-desc') as HTMLElement;
	const prodInp = $('#perp-prod') as HTMLInputElement;
	const prodStepper = $('#perp-prod-stepper');
	const prodDec = prodStepper.querySelector('[data-action="decrement"]') as HTMLButtonElement;
	const devicesDesc = $('#perp-devices-desc') as HTMLElement;

	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	// The device-field caption and the instances helper are rendered from the
	// same state so they always stay in sync (e.g. "5 000 included + 5 000
	// included from instance").
	function updateEntitlementUI() {
		// Purchased instances raise the entitlement floor, so re-clamp both the
		// instances and the extras against the device cap here — every state
		// mutation funnels through this.
		st.instances = Math.min(st.instances, MAX_INSTANCES);
		st.extraDevices = Math.max(0, Math.min(st.extraDevices, Math.max(0, PERP_REAL_MAX - deviceFloor())));
		const comp = getComplimentary();
		// Don't rewrite a field the user is currently typing in — the state is
		// normalized and the field re-synced on blur.
		if (document.activeElement !== devicesInput) devicesInput.value = String(deviceQuota());
		devicesInput.min = String(deviceFloor());
		if (document.activeElement !== prodInp) prodInp.value = String(totalInstances());
		prodDec.disabled = st.instances <= 0;

		const devParts = [`${fN(PERP.includedDevices)} included`];
		if (st.instances > 0) devParts.push(`${fN(st.instances * PERP.devicesPerInstance)} included from instance${st.instances > 1 ? 's' : ''}`);
		if (st.extraDevices > 0) devParts.push(`${fN(st.extraDevices)} extra devices`);
		devicesDesc.textContent = devParts.join(' + ');

		if (comp === 0 && st.instances === 0) {
			prodDesc.textContent = PROD_DESC_DEFAULT;
		} else {
			const h = ['1 included'];
			if (comp > 0) h.push(`${comp} complimentary for ${fN(comp * PERP.devicesPerInstance)} extra devices`);
			if (st.instances > 0) h.push(`${st.instances} purchased`);
			prodDesc.textContent = h.join(' + ') + '. Each purchased instance includes 5,000 devices.';
		}
	}

	function syncDevicesControls() {
		slider.value = String(Math.min(PERP_SLIDER_MAX, realToSlider(Math.min(PERP_REAL_MAX, deviceQuota()))));
		sliderProgress(slider);
	}

	const infoSvg = '<svg viewBox="0 0 24 24" width="14" height="14" data-icon><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>';
	function tip(t: string) { return ` <span class="calc-tooltip">${infoSvg}<span class="calc-tooltip-text"><span class="calc-tooltip-arrow"></span><span class="calc-tooltip-body">${t}</span></span></span>`; }
	function row(l: string, v: string, t?: string) { return `<div class="calc-result-row"><span class="calc-row-label">${l}:</span><span class="calc-row-value">${v}${t ? tip(t) : ''}</span></div>`; }

	type Costs = {
		extraDevCost: number; instCost: number; devCost: number; aiCost: number;
		edgeCost: number; trendzCost: number; offlineCost: number;
		licenseTotal: number; total: number; isCustom: boolean;
		extraDevTotal: number;
	};

	function computeCosts(): Costs {
		const extraDevCost = st.extraDevices * PERP.extraDevicePrice;
		const instCost = st.instances * PERP.extraProdInstancePrice;
		const devCost = st.dev * PERP.devQaExtraInstancePrice;
		const aiCost = extraAiPacks() * PERP.extraAiCreditPackPrice;
		// Add-ons scale with every device beyond the base 5,000 — purchased
		// extras and instance-granted devices alike.
		const extraDevTotal = deviceQuota() - PERP.includedDevices;
		const edgeCost = st.addons.edge.on ? PERP.edgeBasePrice + Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded) * PERP.extraEdgePrice : 0;
		const trendzCost = st.addons.trendz.on ? PERP.trendzBasePrice + extraDevTotal * PERP.trendzExtraDevicePrice : 0;
		const offlineCost = st.addons.offline.on ? PERP.offlineModePrice : 0;
		const licenseTotal = PERP.price + extraDevCost + instCost + devCost + aiCost;
		const total = licenseTotal + edgeCost + trendzCost + offlineCost;
		const isCustom = total >= PERP.customPricingFrom;
		return { extraDevCost, instCost, devCost, aiCost, edgeCost, trendzCost, offlineCost, licenseTotal, total, isCustom, extraDevTotal };
	}

	// "Get a personal price" (without "for these numbers") when Offline Mode is
	// the only thing selected — there are no user-entered numbers to refer to.
	const isOfflineOnly = () =>
		st.addons.offline.on && st.extraDevices === 0 && st.instances === 0 && st.dev === 0 && extraAiPacks() === 0 && !st.addons.edge.on && !st.addons.trendz.on;

	function calculate(opts?: { track?: boolean }) {
		updateEntitlementUI();
		const c = computeCosts();

		// Above the custom-pricing threshold the whole calculation summary is
		// replaced by the personal-price notification — a price-less breakdown
		// would only distract. The configuration still travels to sales inside
		// the Send-request message.
		if (c.isCustom) renderCustom(c);
		else renderPriced(c);

		lastTotal = c.isCustom ? null : c.total;
		if (opts?.track !== false) sendPerpGTM();
	}

	const tagSvg = '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z"/></svg>';

	function renderCustom(c: Costs) {
		results.classList.add('calc-results--custom');
		results.innerHTML = `<div class="calc-custom-banner"><span class="calc-custom-banner-icon">${tagSvg}</span><span class="calc-custom-banner-title">${isOfflineOnly() ? 'Get a personal price' : 'Get a personal price for these numbers'}</span><p class="calc-custom-banner-text">Send us a request, and we'll prepare the most cost-effective quote for you</p></div>`;
		footer.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">Custom</span></div><a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('ThingsBoard Products')}&message=${encodeURIComponent(buildSummary(c))}" target="_blank" rel="noopener noreferrer">Send request</a>`;
	}

	function renderPriced(c: Costs) {
		results.classList.remove('calc-results--custom');
		const comp = getComplimentary();

		let html = `<div class="calc-section"><div class="calc-section-header"><span class="calc-section-title">ThingsBoard PE Perpetual License</span><span class="calc-section-price">${fmt(c.licenseTotal)}${tip('One-time perpetual license cost including extra devices and instances.')}</span></div><div class="calc-section-body">`;
		html += row('Included Devices', fN(PERP.includedDevices));
		if (st.instances > 0) html += row('Devices from Instances', fN(st.instances * PERP.devicesPerInstance), 'Each purchased production instance includes 5,000 devices.');
		if (st.extraDevices > 0) html += row('Extra Devices', fN(st.extraDevices), 'Devices beyond those included with the license and its instances.');
		html += row('Total Device Quota', fN(deviceQuota()), 'Maximum number of devices your license covers.');
		html += row('Included Prod Instances', fN(PERP.includedProdInstances), 'Number of production instances covered by the perpetual license base price.');
		if (comp > 0) html += row('Complimentary Prod Instances', fN(comp), '1 Production Instance provided at no charge for every 5,000 extra devices.');
		if (st.instances > 0) html += row('Purchased Prod Instances', fN(st.instances), 'Additional production instances; each includes 5,000 devices.');
		html += row('Included AI Credits', `${PERP.includedAiCreditPacks}M`, '5,000,000 AI credits included for AI-powered platform features.');
		if (extraAiPacks() > 0) html += row('Extra AI Credits', `${extraAiPacks()}M`, 'Additional AI credits beyond those included with the license.');
		html += row('White Labeling', '<span class="calc-result-badge">Enabled</span>', 'Customization of the platform interface with your corporate branding.');
		html += row('Base Price', fmt(PERP.price), 'One-time license fee before extras and add-ons.');
		if (st.extraDevices > 0) html += row('Extra Devices Cost', fmt(c.extraDevCost), `${fN(st.extraDevices)} × ${fmt(PERP.extraDevicePrice)}`);
		if (st.instances > 0) html += row('Prod Instances Cost', fmt(c.instCost), `${fN(st.instances)} × ${fmt(PERP.extraProdInstancePrice)}, each incl. 5,000 devices`);
		if (extraAiPacks() > 0) html += row('Extra AI Credits Cost', fmt(c.aiCost), `${extraAiPacks()} × ${fmt(PERP.extraAiCreditPackPrice)}`);
		if (st.dev > 0) {
			html += row('Extra Dev Instances', fN(st.dev));
			html += row('Extra Dev Instances Cost', fmt(c.devCost), `${fN(st.dev)} × ${fmt(PERP.devQaExtraInstancePrice)}`);
		}
		html += `</div></div>`;

		// Add-ons
		html += `<div class="calc-addons-divider">Add-ons</div>`;

		// Edge
		if (st.addons.edge.on) {
			const extraEdges = Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded);
			html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><span class="calc-section-price">${fmt(c.edgeCost)}${tip(`Total one-time Edge Computing cost. Calculation: ${fmt(c.edgeCost)} = ${fmt(PERP.edgeBasePrice)} (base) + ${fmt(extraEdges * PERP.extraEdgePrice)} (extra edges)`)}</span></div>`;
			html += row('Included Edges', fN(PERP.edgeInstancesIncluded), 'Number of Edge instances covered by the Edge Computing add-on base price.');
			html += row('Add-on Base Price', fmt(PERP.edgeBasePrice), 'One-time base fee for the Edge Computing add-on.');
			if (extraEdges > 0) {
				html += row('Extra Edges', fN(extraEdges));
				html += row('Extra Edges Cost', fmt(extraEdges * PERP.extraEdgePrice), `${fN(extraEdges)} × ${fmt(PERP.extraEdgePrice)}`);
			}
			html += `</div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="edge">Add (${fmt(PERP.edgeBasePrice)})</button></div>`;
		}

		// Trendz
		if (st.addons.trendz.on) {
			const trendzExtra = c.extraDevTotal * PERP.trendzExtraDevicePrice;
			html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><span class="calc-section-price">${fmt(c.trendzCost)}${tip(`Total one-time Trendz cost. ${fmt(c.trendzCost)} = ${fmt(PERP.trendzBasePrice)} (base price) + ${fmt(trendzExtra)} (extra devices)`)}</span></div>`;
			html += row('Included Devices', fN(PERP.includedDevices), 'Number of devices covered by the Trendz perpetual license base price.');
			html += row('Add-on Base Price', fmt(PERP.trendzBasePrice), 'Base cost for the Trendz Analytics add-on.');
			if (c.extraDevTotal > 0) {
				html += row('Extra Devices', fN(c.extraDevTotal));
				html += row('Extra Devices Cost', fmt(trendzExtra), `${fN(c.extraDevTotal)} × ${fmt(PERP.trendzExtraDevicePrice)}`);
			}
			html += `</div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="trendz">Add (${fmt(PERP.trendzBasePrice)})</button></div>`;
		}

		// Offline
		if (st.addons.offline.on) {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Offline Mode</span><span class="calc-section-price">${fmt(c.offlineCost)}${tip('Enables full platform functionality in environments without internet connection.')}</span></div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Offline Mode</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="offline">Add (${fmt(PERP.offlineModePrice)})</button></div>`;
		}

		const _scroll = results.parentElement?.scrollTop || 0; results.innerHTML = html; if (results.parentElement) results.parentElement.scrollTop = _scroll;

		const totalParts = [`${fmt(PERP.price)} (base)`];
		if (c.extraDevCost > 0) totalParts.push(`${fmt(c.extraDevCost)} (extra devices)`);
		if (c.instCost > 0) totalParts.push(`${fmt(c.instCost)} (prod instances)`);
		if (c.devCost > 0) totalParts.push(`${fmt(c.devCost)} (dev)`);
		if (c.aiCost > 0) totalParts.push(`${fmt(c.aiCost)} (AI credits)`);
		if (c.edgeCost > 0) totalParts.push(`${fmt(c.edgeCost)} (Edge)`);
		if (c.trendzCost > 0) totalParts.push(`${fmt(c.trendzCost)} (Trendz)`);
		if (c.offlineCost > 0) totalParts.push(`${fmt(c.offlineCost)} (Offline)`);
		footer.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">${fmt(c.total)}${tip(totalParts.join(' + '))}</span></div><a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('ThingsBoard Products')}&message=${encodeURIComponent(buildSummary(c))}" target="_blank" rel="noopener noreferrer">Contact Us</a>`;
	}

	// Delegated handler for the [data-enable-perp-addon] buttons rendered
	// inside the results panel. Bound once instead of re-bound per calculate().
	results.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement)?.closest('[data-enable-perp-addon]') as HTMLElement | null;
		if (!btn) return;
		const key = btn.dataset.enablePerpAddon as string;
		if (key === 'edge') { st.addons.edge.on = true; st.addons.edge.count = Math.max(st.addons.edge.count, PERP.edgeInstancesIncluded); toggles.edge.checked = true; cards.edge.classList.add('active'); $('#perp-edge-counter').classList.remove('hidden'); $('#perp-edge-desc').textContent = `${PERP.edgeInstancesIncluded} Edge instances included.`; }
		if (key === 'trendz') { st.addons.trendz.on = true; toggles.trendz.checked = true; cards.trendz.classList.add('active'); }
		if (key === 'offline') { st.addons.offline.on = true; toggles.offline.checked = true; cards.offline.classList.add('active'); }
		calculate();
	});

	function buildSummary(c: Costs): string {
		const comp = getComplimentary();
		// Above the custom-pricing threshold the message carries the
		// configuration without any dollar amounts.
		const money = (v: string) => (c.isCustom ? '' : v);

		let msg = c.isCustom ? `Perpetual License request\n\n` : `Perpetual License: ThingsBoard PE\n\n`;

		msg += c.isCustom ? `Configuration:\n` : `License: ${fmt(c.licenseTotal)}\n`;
		msg += `- Included Devices: ${fN(PERP.includedDevices)}\n`;
		if (st.instances > 0) msg += `- Devices from Instances: ${fN(st.instances * PERP.devicesPerInstance)}\n`;
		if (st.extraDevices > 0) msg += `- Extra Devices: ${fN(st.extraDevices)}${money(` (${fmt(c.extraDevCost)})`)}\n`;
		msg += `- Total Device Quota: ${fN(deviceQuota())}\n`;
		msg += `- Included Prod Instances: ${fN(PERP.includedProdInstances)}\n`;
		if (comp > 0) msg += `- Complimentary Prod Instances: ${fN(comp)}\n`;
		if (st.instances > 0) msg += `- Purchased Prod Instances: ${fN(st.instances)}${money(` (${fmt(c.instCost)})`)}\n`;
		msg += `- Included AI Credits: ${PERP.includedAiCreditPacks}M\n`;
		if (extraAiPacks() > 0) msg += `- Extra AI Credits: ${extraAiPacks()}M${money(` (${fmt(c.aiCost)})`)}\n`;
		msg += `- White Labeling: Enabled\n`;
		msg += money(`- Base Price: ${fmt(PERP.price)}\n`);
		if (st.dev > 0) msg += `- Extra Dev Instances: ${fN(st.dev)}${money(` (${fmt(c.devCost)})`)}\n`;

		const hasAddons = st.addons.edge.on || st.addons.trendz.on || st.addons.offline.on;
		if (hasAddons) {
			msg += `\nAdd-ons:\n`;
			if (st.addons.edge.on) {
				const extraEdges = Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded);
				msg += `- Edge Computing: ${fN(st.addons.edge.count)} instances${money(` (${fmt(c.edgeCost)})`)}\n`;
				if (extraEdges > 0) msg += `  - Extra Edges: ${fN(extraEdges)}\n`;
			}
			if (st.addons.trendz.on) msg += `- Trendz Analytics: Enabled${money(` (${fmt(c.trendzCost)})`)}\n`;
			if (st.addons.offline.on) msg += `- Offline Mode: Enabled${money(` (${fmt(c.offlineCost)})`)}\n`;
		}

		msg += c.isCustom ? `\nTotal: Custom — please prepare a personal quote.` : `\nTotal: ${fmt(c.total)}`;
		return msg;
	}

	// rAF-batch calculate() during continuous input; blur/change still call directly.
	let _calcQueued = false;
	function scheduleCalculate() {
		if (_calcQueued) return;
		_calcQueued = true;
		requestAnimationFrame(() => { _calcQueued = false; calculate(); });
	}

	// Generic stepper wiring for the simple counters (dev / AI / edge): +/- with
	// a minimum clamp, live typing that clamps state (never the field) so the
	// debounced GTM push can't report a sub-minimum configuration, and blur
	// normalization of the field. The production-instances stepper stays
	// hand-rolled — it edits purchases while displaying the derived total.
	function bindStepper(stepper: HTMLElement, inp: HTMLInputElement, dec: HTMLButtonElement, min: number, get: () => number, set: (v: number) => void) {
		// A typed "0" is a legitimate live value only where 0 is purchasable
		// (dev instances); on min>0 steppers it stays inert until blur so a
		// transient keystroke doesn't yank the state below the user's choice.
		const typingFloor = min > 0 ? 1 : 0;
		stepper.querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				if ((btn as HTMLButtonElement).disabled) return;
				set((btn as HTMLElement).dataset.action === 'increment' ? Math.max(min, get()) + 1 : Math.max(min, get() - 1));
				inp.value = String(get());
				dec.disabled = get() <= min;
				calculate();
			});
		});
		inp.addEventListener('input', () => { const v = parseInt(inp.value); if (!isNaN(v) && v >= typingFloor) { set(Math.max(min, v)); dec.disabled = get() <= min; scheduleCalculate(); } });
		inp.addEventListener('blur', () => { const v = Math.max(min, parseInt(inp.value) || min); set(v); inp.value = String(v); dec.disabled = v <= min; calculate(); });
	}

	// ─── Devices slider + input ───
	// Both edit the *purchased extras* on top of the entitlement floor
	// (5,000 base + 5,000 per purchased instance); the field itself always
	// displays the resulting quota.
	slider.addEventListener('input', () => {
		const floor = deviceFloor();
		const real = sliderToReal(parseFloat(slider.value));
		// The thumb can't go below the entitlement floor once purchased
		// instances raised it — snap it back so thumb, field and results agree.
		if (real < floor) slider.value = String(Math.min(PERP_SLIDER_MAX, realToSlider(floor)));
		st.extraDevices = Math.max(0, real - floor);
		devicesInput.value = String(deviceQuota());
		sliderProgress(slider);
		scheduleCalculate();
	});
	slider.addEventListener('change', () => { syncDevicesControls(); calculate(); });
	devicesInput.addEventListener('input', () => { const v = parseInt(devicesInput.value); if (!isNaN(v) && v > 0) { st.extraDevices = Math.max(0, Math.min(PERP_REAL_MAX, v) - deviceFloor()); syncDevicesControls(); scheduleCalculate(); } });
	// An emptied field keeps the current configuration instead of discarding
	// it — same contract as the instances field below.
	devicesInput.addEventListener('blur', () => { const v = parseInt(devicesInput.value); if (!isNaN(v)) st.extraDevices = Math.max(0, Math.min(PERP_REAL_MAX, v) - deviceFloor()); syncDevicesControls(); calculate(); });

	// ─── Production instances stepper ───
	// Displays the total entitlement (included + purchased + complimentary);
	// +/- buys or removes *purchased* instances only.
	prodStepper.querySelectorAll('.calc-stepper-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			if ((btn as HTMLButtonElement).disabled) return;
			if ((btn as HTMLElement).dataset.action === 'increment') st.instances++;
			else st.instances = Math.max(0, st.instances - 1);
			syncDevicesControls();
			calculate();
		});
	});
	prodInp.addEventListener('input', () => { const v = parseInt(prodInp.value); if (!isNaN(v) && v >= 1) { st.instances = Math.max(0, v - PERP.includedProdInstances - getComplimentary()); syncDevicesControls(); scheduleCalculate(); } });
	// An emptied field keeps the current purchases instead of discarding them.
	prodInp.addEventListener('blur', () => { const v = parseInt(prodInp.value); if (!isNaN(v)) st.instances = Math.max(0, v - PERP.includedProdInstances - getComplimentary()); syncDevicesControls(); calculate(); });

	// ─── Dev / AI credits / Edge steppers ───
	const devInstInput = $('#perp-dev') as HTMLInputElement;
	const devStepper = $('#perp-dev-stepper');
	const devDec = devStepper.querySelector('[data-action="decrement"]') as HTMLButtonElement;
	bindStepper(devStepper, devInstInput, devDec, 0, () => st.dev, (v) => { st.dev = v; });

	const aiInp = $('#perp-ai') as HTMLInputElement;
	const aiStepper = $('#perp-ai-stepper');
	const aiDec = aiStepper.querySelector('[data-action="decrement"]') as HTMLButtonElement;
	bindStepper(aiStepper, aiInp, aiDec, PERP.includedAiCreditPacks, () => st.aiPacks, (v) => { st.aiPacks = v; });

	const edgeInp = $('#perp-edge') as HTMLInputElement;
	const edgeCounter = $('#perp-edge-counter');
	const edgeStepper = $('#perp-edge-stepper');
	const edgeDec = edgeStepper.querySelector('[data-action="decrement"]') as HTMLButtonElement;
	bindStepper(edgeStepper, edgeInp, edgeDec, PERP.edgeInstancesIncluded, () => st.addons.edge.count, (v) => { st.addons.edge.count = v; });

	// ─── Addon toggles ───
	toggles.edge.addEventListener('change', () => {
		st.addons.edge.on = toggles.edge.checked;
		cards.edge.classList.toggle('active', st.addons.edge.on);
		edgeCounter.classList.toggle('hidden', !st.addons.edge.on);
		if (st.addons.edge.on) st.addons.edge.count = Math.max(st.addons.edge.count, PERP.edgeInstancesIncluded);
		$('#perp-edge-desc').textContent = st.addons.edge.on ? `${PERP.edgeInstancesIncluded} Edge instances included.` : 'Process data where it is collected.';
		calculate();
	});
	toggles.trendz.addEventListener('change', () => { st.addons.trendz.on = toggles.trendz.checked; cards.trendz.classList.toggle('active', st.addons.trendz.on); calculate(); });
	toggles.offline.addEventListener('change', () => { st.addons.offline.on = toggles.offline.checked; cards.offline.classList.toggle('active', st.addons.offline.on); calculate(); });

	// ─── Copy / Download export buttons ───
	bindExportButtons(modal, CALC_TYPE, {
		buildText: () => buildSummary(computeCosts()),
		filename: 'perpetual-license-calculation.txt',
		getExtra: () => ({ calculator_total: lastTotal, calculator_plan: planLabel() }),
	});

	// Footer CTA tracking. Footer re-renders every recalc, so delegate one
	// click listener on the stable modal element.
	bindCtaTracking(modal, CALC_TYPE, () => ({ calculator_total: lastTotal, calculator_plan: planLabel() }));

	// ─── Modal ───
	const { open: openModal } = makeModalController({
		modal,
		onOpen: () => {
			pushCalculatorOpen(CALC_TYPE);
			sliderProgress(slider);
			requestAnimationFrame(() => initAllSliders(modal));
			calculate({ track: false });
		},
		onClose: () => calcAnalytics.flush(),
	});

	// ─── Reset ───
	$('[data-calc-reset]').addEventListener('click', () => {
		st = initialState();
		devInstInput.value = '0';
		aiInp.value = String(PERP.includedAiCreditPacks);
		edgeInp.value = String(PERP.edgeInstancesIncluded);
		toggles.edge.checked = false; toggles.trendz.checked = false; toggles.offline.checked = false;
		cards.edge.classList.remove('active'); cards.trendz.classList.remove('active'); cards.offline.classList.remove('active');
		edgeCounter.classList.add('hidden');
		$('#perp-edge-desc').textContent = 'Process data where it is collected.';
		devDec.disabled = true;
		aiDec.disabled = true;
		edgeDec.disabled = true;
		syncDevicesControls(); calculate({ track: false });
	});

	sliderProgress(slider); calculate({ track: false });
	requestAnimationFrame(() => initAllSliders(modal));
	openImpl = openModal;
}

export function openTbPerpCalc() {
	if (!openImpl) initTbPerpCalc();
	openImpl?.();
}

// Lazy-loaded module for the ThingsBoard Perpetual License calculator.
// See `calc-tb-payg.ts` for the lazy-load pattern rationale.

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;
declare function calcModalOpen(): void;
declare function calcModalClose(): void;

const PERP = {
	price: 4999, includedDevices: 1000, extraDevicePrice: 1,
	includedProdInstances: 1, extraProdInstancePrice: 4999, devQaExtraInstancePrice: 999,
	edgeMonthPrice: 849, edgeInstancesIncluded: 2, extraEdgePrice: 399,
	trendzMonthPrice: 1499, trendzExtraDevicePrice: 0.3,
	offlineModePrice: 19999
};

const PERP_SLIDER_BP = 20000;
const PERP_SLIDER_MAX = 25000;
const PERP_REAL_MAX = 1000000;
const sliderToReal = (v: number) => v <= PERP_SLIDER_BP ? v : Math.round(PERP_SLIDER_BP + (v - PERP_SLIDER_BP) * ((PERP_REAL_MAX - PERP_SLIDER_BP) / (PERP_SLIDER_MAX - PERP_SLIDER_BP)));
const realToSlider = (v: number) => v <= PERP_SLIDER_BP ? v : PERP_SLIDER_BP + (v - PERP_SLIDER_BP) * ((PERP_SLIDER_MAX - PERP_SLIDER_BP) / (PERP_REAL_MAX - PERP_SLIDER_BP));

let openImpl: (() => void) | null = null;

export function initTbPerpCalc() {
	if (openImpl) return;
	const modal = document.getElementById('tb-perp-calc');
	if (!modal) return;
	const $ = (s: string) => modal.querySelector(s) as HTMLElement;
	const devInput = $('#perp-devices') as HTMLInputElement;
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

	let st = {
		devices: 1000, _prevDevices: 1000, prod: 1, dev: 0,
		addons: { edge: { on: false, count: 2 }, trendz: { on: false }, offline: { on: false } }
	};

	let _perpGtmTimer: ReturnType<typeof setTimeout> | null = null;
	function sendPerpGTM() {
		if (_perpGtmTimer) clearTimeout(_perpGtmTimer);
		_perpGtmTimer = setTimeout(() => {
			const gtm: Record<string, any> = {
				event: 'calculator_interaction',
				calculator_devices: st.devices,
				calculator_plan: 'Platform',
				calculator_instances: st.prod,
				calculator_addon_dev_area: st.dev > 0,
				calculator_addon_trendz_bot_area: st.addons.trendz.on,
				calculator_addon_bot_area: st.addons.edge.on,
				calculator_messages: null,
				calculator_messages_unit: null,
				calculator_instances_monthly: null,
				calculator_extra_storage_cost: null,
			};
			for (let i = 0; i <= 9; i++) gtm[`calculator_profile_${i}_json`] = null;
			(window as any).dataLayer?.push(gtm);
		}, 3000);
	}

	const getComplimentary = () => Math.floor(Math.max(0, st.devices - PERP.includedDevices) / 5000);
	const getMinProd = () => PERP.includedProdInstances + getComplimentary();
	const prodDesc = $('#perp-prod-desc') as HTMLElement;
	const prodInp = $('#perp-prod') as HTMLInputElement;
	const prodStepper = $('#perp-prod-stepper');

	function updateProdForDevices() {
		const complimentary = getComplimentary();
		const minProd = getMinProd();
		const prevMinProd = PERP.includedProdInstances + Math.floor(Math.max(0, st._prevDevices - PERP.includedDevices) / 5000);
		if (st.prod <= prevMinProd || st.prod < minProd) {
			st.prod = minProd;
		}
		prodInp.value = String(st.prod);
		(prodStepper.querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = st.prod <= minProd;
		if (complimentary > 0) {
			prodDesc.textContent = `1 included + ${complimentary} complimentary for ${fN(complimentary * 5000)} extra devices.`;
		} else {
			prodDesc.textContent = '1 included. Add a 2nd for high availability (HA). For every 5,000 extra devices, one production instance is added at no charge.';
		}
		st._prevDevices = st.devices;
	}

	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	const infoSvg = '<svg viewBox="0 0 24 24" width="14" height="14" data-icon><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>';
	function tip(t: string) { return ` <span class="calc-tooltip">${infoSvg}<span class="calc-tooltip-text"><span class="calc-tooltip-arrow"></span><span class="calc-tooltip-body">${t}</span></span></span>`; }
	function row(l: string, v: string, t?: string) { return `<div class="calc-result-row"><span class="calc-row-label">${l}:</span><span class="calc-row-value">${v}${t ? tip(t) : ''}</span></div>`; }

	function calculate() {
		updateProdForDevices();
		let total = PERP.price;

		const extraDev = Math.max(0, st.devices - PERP.includedDevices);
		const extraDevCost = extraDev * PERP.extraDevicePrice;
		total += extraDevCost;

		const complimentaryProd = getComplimentary();
		const extraProd = Math.max(0, st.prod - PERP.includedProdInstances - complimentaryProd);
		const extraProdCost = extraProd * PERP.extraProdInstancePrice;
		total += extraProdCost;

		const devCost = st.dev * PERP.devQaExtraInstancePrice;
		total += devCost;

		let edgeCost = 0;
		if (st.addons.edge.on) {
			const extraEdges = Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded);
			edgeCost = PERP.edgeMonthPrice + extraEdges * PERP.extraEdgePrice;
			total += edgeCost;
		}

		let trendzCost = 0;
		if (st.addons.trendz.on) {
			const trendzExtra = extraDev > 0 ? extraDev * PERP.trendzExtraDevicePrice : 0;
			trendzCost = PERP.trendzMonthPrice + trendzExtra;
			total += trendzCost;
		}

		let offlineCost = 0;
		if (st.addons.offline.on) {
			offlineCost = PERP.offlineModePrice;
			total += offlineCost;
		}

		// Results — plan section
		let html = `<div class="calc-section"><div class="calc-section-header"><span class="calc-section-title">Platform</span><span class="calc-section-price">${fmt(PERP.price)}${tip('Total one-time perpetual license cost including extra resources.')}</span></div><div class="calc-section-body">`;
		html += row('Included Devices', fN(PERP.includedDevices));
		html += row('Included Prod Instances', fN(PERP.includedProdInstances), 'Number of production instances covered by the perpetual license base price.');
		if (complimentaryProd > 0) html += row('Complimentary Prod Instances', fN(complimentaryProd), '1 Production Instance provided at no charge for every 5,000 extra devices.');
		if (extraProd > 0) html += row('Extra Prod Instances', fN(extraProd), 'Additional instances');
		if (extraProdCost > 0) html += row('Extra Prod Instances Cost', fmt(extraProdCost), `${fN(extraProd)} × ${fmt(PERP.extraProdInstancePrice)}`);
		html += row('White Labeling', '<span class="calc-result-badge">Enabled</span>', 'Customization of the platform interface with your corporate branding.');
		html += row('Base Price', fmt(PERP.price), 'One-time license fee before extras and add-ons.');
		if (extraDev > 0) html += row('Extra Devices', fN(extraDev), 'Devices beyond included');
		if (extraDevCost > 0) html += row('Extra Devices Cost', fmt(extraDevCost), `${fN(extraDev)} × ${fmt(PERP.extraDevicePrice)}`);
		if (st.dev > 0) html += row('Extra Dev Instances', fN(st.dev));
		if (devCost > 0) html += row('Extra Dev Instances Cost', fmt(devCost), `${fN(st.dev)} × ${fmt(PERP.devQaExtraInstancePrice)}`);
		html += `</div></div>`;

		// Add-ons
		html += `<div class="calc-addons-divider">Add-ons</div>`;

		// Edge
		if (st.addons.edge.on) {
			const extraEdges = Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded);
			html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><span class="calc-section-price">${fmt(edgeCost)}${tip(`Total one-time Edge Computing cost. Calculation: ${fmt(edgeCost)} = ${fmt(PERP.edgeMonthPrice)} (base) + ${fmt(extraEdges * PERP.extraEdgePrice)} (extra edges)`)}</span></div>`;
			html += row('Included Edges', fN(PERP.edgeInstancesIncluded), 'Number of Edge instances covered by the Edge Computing add-on base price.');
			html += row('Add-on Base Price', fmt(PERP.edgeMonthPrice), 'One-time base fee for the Edge Computing add-on.');
			if (extraEdges > 0) html += row('Extra Edges', fN(extraEdges));
			if (extraEdges > 0) html += row('Extra Edges Cost', fmt(extraEdges * PERP.extraEdgePrice), `${fN(extraEdges)} × ${fmt(PERP.extraEdgePrice)}`);
			html += `</div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="edge">Add (${fmt(PERP.edgeMonthPrice)})</button></div>`;
		}

		// Trendz
		if (st.addons.trendz.on) {
			const hasExtra = extraDev > 0 && PERP.trendzExtraDevicePrice > 0;
			const trendzExtra = extraDev > 0 ? extraDev * PERP.trendzExtraDevicePrice : 0;
			html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><span class="calc-section-price">${fmt(trendzCost)}${tip(`Total one-time Trendz cost. ${fmt(trendzCost)} = ${fmt(PERP.trendzMonthPrice)} (base price) + ${fmt(trendzExtra)} (extra devices)`)}</span></div>`;
			html += row('Included Devices', fN(PERP.includedDevices), 'Number of devices covered by the Trendz perpetual license base price.');
			html += row('Add-on Base Price', fmt(PERP.trendzMonthPrice), 'Base cost for the Trendz Analytics add-on.');
			if (hasExtra) {
				html += row('Extra Devices', fN(extraDev));
				html += row('Extra Devices Cost', fmt(extraDev * PERP.trendzExtraDevicePrice), `${fN(extraDev)} × ${fmt(PERP.trendzExtraDevicePrice)}`);
			}
			html += `</div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="trendz">Add (${fmt(PERP.trendzMonthPrice)})</button></div>`;
		}

		// Offline
		if (st.addons.offline.on) {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Offline Mode</span><span class="calc-section-price">${fmt(offlineCost)}${tip('Enables full platform functionality in environments without internet connection.')}</span></div>`;
		} else {
			html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Offline Mode</span><button type="button" class="calc-addon-result-action" data-enable-perp-addon="offline">Add (${fmt(PERP.offlineModePrice)})</button></div>`;
		}

		const _st = results.parentElement?.scrollTop || 0; results.innerHTML = html; if (results.parentElement) results.parentElement.scrollTop = _st;

		// Total tooltip
		const totalParts = [`${fmt(PERP.price)} (base)`];
		if (extraDevCost > 0) totalParts.push(`${fmt(extraDevCost)} (extra devices)`);
		if (extraProdCost > 0) totalParts.push(`${fmt(extraProdCost)} (extra prod)`);
		if (devCost > 0) totalParts.push(`${fmt(devCost)} (dev)`);
		if (edgeCost > 0) totalParts.push(`${fmt(edgeCost)} (Edge)`);
		if (trendzCost > 0) totalParts.push(`${fmt(trendzCost)} (Trendz)`);
		if (offlineCost > 0) totalParts.push(`${fmt(offlineCost)} (Offline)`);

		footer.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">${fmt(total)}${tip(totalParts.join(' + '))}</span></div><a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('ThingsBoard Products')}&message=${encodeURIComponent(buildSummary(total, extraDev, extraDevCost, extraProd, extraProdCost, devCost, edgeCost, trendzCost, offlineCost))}" target="_blank" rel="noopener noreferrer">Contact Us</a>`;

		sendPerpGTM();
	}

	// Delegated handler for the [data-enable-perp-addon] buttons rendered
	// inside the results panel. Bound once instead of re-bound per calculate().
	results.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement)?.closest('[data-enable-perp-addon]') as HTMLElement | null;
		if (!btn) return;
		const key = btn.dataset.enablePerpAddon as string;
		if (key === 'edge') { st.addons.edge.on = true; st.addons.edge.count = Math.max(st.addons.edge.count, PERP.edgeInstancesIncluded); toggles.edge.checked = true; cards.edge.classList.add('active'); $('#perp-edge-counter').classList.remove('hidden'); }
		if (key === 'trendz') { st.addons.trendz.on = true; toggles.trendz.checked = true; cards.trendz.classList.add('active'); }
		if (key === 'offline') { st.addons.offline.on = true; toggles.offline.checked = true; cards.offline.classList.add('active'); }
		calculate();
	});

	function buildSummary(total: number, extraDev: number, extraDevCost: number, extraProd: number, extraProdCost: number, devCost: number, edgeCost: number, trendzCost: number, offlineCost: number): string {
		const comp = getComplimentary();

		let msg = `Perpetual License: Platform\n\n`;

		msg += `Platform: ${fmt(PERP.price)}\n`;
		msg += `- Included Devices: ${fN(PERP.includedDevices)}\n`;
		msg += `- Included Prod Instances: ${fN(PERP.includedProdInstances)}\n`;
		if (comp > 0) msg += `- Complimentary Prod Instances: ${fN(comp)}\n`;
		if (extraProd > 0) {
			msg += `- Extra Prod Instances: ${fN(extraProd)}\n`;
			msg += `- Extra Prod Instances Cost: ${fmt(extraProdCost)}\n`;
		}
		msg += `- White Labeling: Enabled\n`;
		msg += `- Base Price: ${fmt(PERP.price)}\n`;
		if (extraDev > 0) {
			msg += `- Extra Devices: ${fN(extraDev)}\n`;
			msg += `- Extra Devices Cost: ${fmt(extraDevCost)}\n`;
		}
		if (st.dev > 0) {
			msg += `- Extra Dev Instances: ${fN(st.dev)}\n`;
			msg += `- Extra Dev Instances Cost: ${fmt(devCost)}\n`;
		}

		const hasAddons = st.addons.edge.on || st.addons.trendz.on || st.addons.offline.on;
		if (hasAddons) {
			msg += `\nAdd-ons:\n`;

			if (st.addons.edge.on) {
				const extraEdges = Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded);
				msg += `\nEdge Computing: ${fmt(edgeCost)}\n`;
				msg += `- Included Edges: ${fN(PERP.edgeInstancesIncluded)}\n`;
				msg += `- Add-on Base Price: ${fmt(PERP.edgeMonthPrice)}\n`;
				if (extraEdges > 0) {
					msg += `- Extra Edges: ${fN(extraEdges)}\n`;
					msg += `- Extra Edges Cost: ${fmt(extraEdges * PERP.extraEdgePrice)}\n`;
				}
			}

			if (st.addons.trendz.on) {
				const trendzExtra = extraDev > 0 ? extraDev * PERP.trendzExtraDevicePrice : 0;
				msg += `\nTrendz Analytics: ${fmt(trendzCost)}\n`;
				msg += `- Add-on Base Price: ${fmt(PERP.trendzMonthPrice)}\n`;
				if (extraDev > 0 && trendzExtra > 0) {
					msg += `- Extra Devices: ${fN(extraDev)}\n`;
					msg += `- Extra Devices Cost: ${fmt(trendzExtra)}\n`;
				}
			}

			if (st.addons.offline.on) {
				msg += `\nOffline Mode: ${fmt(offlineCost)}\n`;
			}
		}

		msg += `\nTotal: ${fmt(total)}`;
		return msg;
	}

	// rAF-batch calculate() during continuous input; blur/change still call directly.
	let _calcQueued = false;
	function scheduleCalculate() {
		if (_calcQueued) return;
		_calcQueued = true;
		requestAnimationFrame(() => { _calcQueued = false; calculate(); });
	}

	// ─── Slider ───
	slider.addEventListener('input', () => { st.devices = sliderToReal(parseFloat(slider.value)); devInput.value = String(st.devices); sliderProgress(slider); scheduleCalculate(); });
	devInput.addEventListener('input', () => { const v = parseInt(devInput.value); if (!isNaN(v) && v > 0) { st.devices = v; slider.value = String(Math.min(PERP_SLIDER_MAX, realToSlider(Math.min(PERP_REAL_MAX, v)))); sliderProgress(slider); scheduleCalculate(); } });
	devInput.addEventListener('blur', () => { const v = Math.max(1000, parseInt(devInput.value) || 1000); st.devices = v; devInput.value = String(v); slider.value = String(Math.min(PERP_SLIDER_MAX, realToSlider(Math.min(PERP_REAL_MAX, v)))); sliderProgress(slider); calculate(); });

	// ─── Steppers ───
	function bindStepper(id: string, key: 'prod' | 'dev', getMin: () => number) {
		const sInp = $(id).querySelector('input[type="number"]') as HTMLInputElement;
		$(id).querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				if ((btn as HTMLButtonElement).disabled) return;
				const min = getMin();
				(st as any)[key] = (btn as HTMLElement).dataset.action === 'increment' ? (st as any)[key] + 1 : Math.max(min, (st as any)[key] - 1);
				sInp.value = String((st as any)[key]);
				($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = (st as any)[key] <= min;
				calculate();
			});
		});
		sInp.addEventListener('input', () => { const min = getMin(); const v = parseInt(sInp.value); if (!isNaN(v) && v >= min) { (st as any)[key] = v; ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; scheduleCalculate(); } });
		sInp.addEventListener('blur', () => { const min = getMin(); const v = Math.max(min, parseInt(sInp.value) || min); (st as any)[key] = v; sInp.value = String(v); ($(id).querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; calculate(); });
	}
	bindStepper('#perp-prod-stepper', 'prod', getMinProd);
	bindStepper('#perp-dev-stepper', 'dev', () => 0);

	// ─── Edge stepper ───
	const edgeInp = $('#perp-edge') as HTMLInputElement;
	const edgeCounter = $('#perp-edge-counter');
	$('#perp-edge-stepper').querySelectorAll('.calc-stepper-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			if ((btn as HTMLButtonElement).disabled) return;
			const min = PERP.edgeInstancesIncluded;
			st.addons.edge.count = (btn as HTMLElement).dataset.action === 'increment' ? st.addons.edge.count + 1 : Math.max(min, st.addons.edge.count - 1);
			edgeInp.value = String(st.addons.edge.count);
			($('#perp-edge-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = st.addons.edge.count <= min;
			calculate();
		});
	});
	edgeInp.addEventListener('input', () => { const v = parseInt(edgeInp.value); if (!isNaN(v) && v >= 1) { st.addons.edge.count = v; scheduleCalculate(); } });
	edgeInp.addEventListener('blur', () => { const min = PERP.edgeInstancesIncluded; const v = Math.max(min, parseInt(edgeInp.value) || min); st.addons.edge.count = v; edgeInp.value = String(v); ($('#perp-edge-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = v <= min; calculate(); });

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

	function getCurrentSummary(): string {
		const extraDev = Math.max(0, st.devices - PERP.includedDevices);
		const extraDevCost = extraDev * PERP.extraDevicePrice;
		const compProd = getComplimentary();
		const extraProd = Math.max(0, st.prod - PERP.includedProdInstances - compProd);
		const extraProdCost = extraProd * PERP.extraProdInstancePrice;
		const devCostVal = st.dev * PERP.devQaExtraInstancePrice;
		let edgeCostVal = 0;
		if (st.addons.edge.on) edgeCostVal = PERP.edgeMonthPrice + Math.max(0, st.addons.edge.count - PERP.edgeInstancesIncluded) * PERP.extraEdgePrice;
		let trendzCostVal = 0;
		if (st.addons.trendz.on) trendzCostVal = PERP.trendzMonthPrice + (extraDev > 0 ? extraDev * PERP.trendzExtraDevicePrice : 0);
		const offlineCostVal = st.addons.offline.on ? PERP.offlineModePrice : 0;
		const totalVal = PERP.price + extraDevCost + extraProdCost + devCostVal + edgeCostVal + trendzCostVal + offlineCostVal;
		return buildSummary(totalVal, extraDev, extraDevCost, extraProd, extraProdCost, devCostVal, edgeCostVal, trendzCostVal, offlineCostVal);
	}

	// ─── Copy ───
	modal.querySelector('[data-calc-copy]')?.addEventListener('click', (e) => {
		const btn = e.currentTarget as HTMLElement;
		const text = getCurrentSummary();
		const flashCopied = () => {
			btn.classList.add('copied');
			setTimeout(() => btn.classList.remove('copied'), 2000);
		};
		navigator.clipboard.writeText(text).then(flashCopied).catch(() => {});
	});

	// ─── Download ───
	modal.querySelector('[data-calc-download]')?.addEventListener('click', () => {
		const blob = new Blob([getCurrentSummary()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = 'perpetual-license-calculation.txt'; a.click();
		URL.revokeObjectURL(url);
	});

	// ─── Modal open ───
	function closeCalcModal() { calcModalClose(); setTimeout(() => { modal!.style.display = 'none'; }, 300); }
	$('[data-calc-close]').addEventListener('click', closeCalcModal);
	modal.addEventListener('click', (e) => { if (e.target === modal) closeCalcModal(); });
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display !== 'none') closeCalcModal(); });

	// ─── Reset ───
	$('[data-calc-reset]').addEventListener('click', () => {
		st = { devices: 1000, _prevDevices: 1000, prod: 1, dev: 0, addons: { edge: { on: false, count: 2 }, trendz: { on: false }, offline: { on: false } } };
		prodDesc.textContent = '1 included. Add a 2nd for high availability (HA). For every 5,000 extra devices, one production instance is added at no charge.';
		devInput.value = '1000'; slider.value = '1000';
		($('#perp-prod') as HTMLInputElement).value = '1';
		($('#perp-dev') as HTMLInputElement).value = '0';
		edgeInp.value = '2';
		toggles.edge.checked = false; toggles.trendz.checked = false; toggles.offline.checked = false;
		cards.edge.classList.remove('active'); cards.trendz.classList.remove('active'); cards.offline.classList.remove('active');
		edgeCounter.classList.add('hidden');
		$('#perp-edge-desc').textContent = 'Process data where it is collected.';
		($('#perp-prod-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		($('#perp-dev-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		($('#perp-edge-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		sliderProgress(slider); calculate();
	});

	sliderProgress(slider); calculate();

	openImpl = () => {
		modal.style.display = '';
		calcModalOpen();
		sliderProgress(slider);
		requestAnimationFrame(() => initAllSliders(modal));
		calculate();
	};
}

export function openTbPerpCalc() {
	if (!openImpl) initTbPerpCalc();
	openImpl?.();
}

// Lazy-loaded module for the ThingsBoard PAYG (self-managed) calculator.
// The .astro component renders the modal markup at SSR time; this module is
// dynamically imported on first call to `window.openTbPaygCalc()`, so the
// ~20 KiB of calculator JS never lands on the critical path for users who
// don't open it.

declare function sliderProgress(slider: HTMLInputElement): void;
declare function initAllSliders(root?: HTMLElement | Document): void;
declare function calcModalOpen(): void;
declare function calcModalClose(): void;

const SM_PLANS = {
	mobileApp: 99, mobileAppSetup: 1000,
	plans: [
		{ name: 'Maker', price: 10, includedDevices: 10, includedProdInstances: 1, extraProdInstancePrice: 100, devQaExtraInstancePrice: 50, edgeMonthPrice: 0, edgeInstancesIncluded: 1, trendzMonthPrice: 0, wl: false, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: 'fe493b90-f5ea-11f0-8e58-abbac8d0a38a' },
		{ name: 'Prototype', price: 39, includedDevices: 50, includedProdInstances: 1, extraProdInstancePrice: 100, devQaExtraInstancePrice: 50, edgeMonthPrice: 7, edgeInstancesIncluded: 1, extraEdgePrice: 39, trendzMonthPrice: 12, wl: false, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: '648c95a0-f5eb-11f0-8e58-abbac8d0a38a' },
		{ name: 'Pilot', price: 99, includedDevices: 100, includedProdInstances: 1, extraProdInstancePrice: 100, devQaExtraInstancePrice: 50, edgeMonthPrice: 19, edgeInstancesIncluded: 1, extraEdgePrice: 39, trendzMonthPrice: 29, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: '87f3b1e0-f5eb-11f0-8e58-abbac8d0a38a' },
		{ name: 'Startup', price: 299, includedDevices: 500, includedProdInstances: 2, extraProdInstancePrice: 100, devQaExtraInstancePrice: 50, edgeMonthPrice: 49, edgeInstancesIncluded: 2, extraEdgePrice: 39, trendzMonthPrice: 89, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: 'b8ad2500-f5eb-11f0-8e58-abbac8d0a38a' },
		{ name: 'Business', price: 499, includedDevices: 1000, extraDevicePrice: 0.1, includedProdInstances: 3, extraProdInstancePrice: 100, devQaExtraInstancePrice: 50, edgeMonthPrice: 89, edgeInstancesIncluded: 3, extraEdgePrice: 39, trendzMonthPrice: 149, trendzExtraDevicePrice: 0.03, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: 'f4b90050-f5eb-11f0-8e58-abbac8d0a38a' },
	],
};

const SM_THRESHOLDS = [10, 50, 100, 500, 1000];
const SM_MAX = 150000;
const SM_ENTERPRISE = 50000;

const SM_DESCS: Record<string, { prod: string; dev: string }> = {
	Maker: { prod: 'Maker includes 1 instance. Choose Prototype plan to add more for HA and reliability.', dev: 'Choose Prototype plan to add dev instances. Safely test new features without impacting your live data.' },
	Prototype: { prod: 'Your plan includes 1 instance. Add a 2nd instance for HA to prevent downtime.', dev: 'Add dedicated instances for your dev, test, and CI/CD workflows.' },
	Pilot: { prod: 'Your plan includes 1 instance. Add a 2nd instance for HA to prevent downtime.', dev: 'Add dedicated instances for your dev, test, and CI/CD workflows.' },
	Startup: { prod: 'Your 2 instances provide HA. Add more to scale your application.', dev: 'Add dedicated instances for your dev, test, and CI/CD workflows.' },
	Business: { prod: 'Your plan includes 3 instances for HA. Add more to horizontally scale.', dev: 'Add dedicated instances for your dev, test, and CI/CD workflows.' },
};

// Module-scoped reference to the open function created during init. Lets
// `openTbPaygCalc` work without re-running the (idempotent) init body.
let openImpl: (() => void) | null = null;

export function initTbPaygCalc() {
	if (openImpl) return;
	const modal = document.getElementById('tb-payg-calc');
	if (!modal) return;
	const $ = (sel: string) => modal.querySelector(sel) as HTMLElement;

	const devicesInput = $('#sm-devices') as HTMLInputElement;
	const slider = $('#sm-slider') as HTMLInputElement;
	const prodInput = $('#sm-prod') as HTMLInputElement;
	const devInput = $('#sm-dev') as HTMLInputElement;
	const edgeCount = $('#sm-edge-count') as HTMLInputElement;
	const results = $('[data-calc-results]');
	const footer = $('[data-calc-footer]');
	const prodDesc = $('#sm-prod-desc');
	const devDesc = $('#sm-dev-desc');
	const edgeDesc = $('#sm-edge-desc');
	const edgeCounter = $('#sm-edge-counter');
	const wlPrompt = $('#sm-wl-prompt');

	const toggles = { edge: $('#sm-edge-toggle') as HTMLInputElement, trendz: $('#sm-trendz-toggle') as HTMLInputElement, mobile: $('#sm-mobile-toggle') as HTMLInputElement };
	const cards = { edge: $('#sm-edge-card'), trendz: $('#sm-trendz-card'), mobile: $('#sm-mobile-card') };

	let state = { devices: 10, prodInstances: 1, devInstances: 0, addons: { edge: { on: false, count: 1 }, trendz: { on: false }, mobile: { on: false } } };

	let _smGtmTimer: ReturnType<typeof setTimeout> | null = null;
	function sendSmGTM() {
		if (_smGtmTimer) clearTimeout(_smGtmTimer);
		_smGtmTimer = setTimeout(() => {
			const plan = getPlan(state.devices);
			const gtm: Record<string, any> = {
				event: 'calculator_interaction',
				calculator_devices: state.devices,
				calculator_plan: plan.name,
				calculator_instances: state.prodInstances,
				calculator_addon_dev_area: state.devInstances > 0,
				calculator_addon_trendz_bot_area: state.addons.trendz.on,
				calculator_addon_bot_area: state.addons.edge.on,
				calculator_messages: null,
				calculator_messages_unit: null,
				calculator_instances_monthly: null,
				calculator_extra_storage_cost: null,
			};
			for (let i = 0; i <= 9; i++) gtm[`calculator_profile_${i}_json`] = null;
			(window as any).dataLayer?.push(gtm);
		}, 3000);
	}

	const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ' ');
	const fmtN = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');

	function getPlan(d: number) {
		if (d <= 10) return SM_PLANS.plans[0];
		if (d <= 50) return SM_PLANS.plans[1];
		if (d <= 100) return SM_PLANS.plans[2];
		if (d <= 500) return SM_PLANS.plans[3];
		return SM_PLANS.plans[4];
	}

	function sliderToDevices(v: number): number {
		if (v <= 4) return SM_THRESHOLDS[Math.min(Math.round(v), SM_THRESHOLDS.length - 1)];
		return Math.round(1000 + (v - 4) * (SM_MAX - 1000));
	}

	function devicesToSlider(d: number): number {
		if (d <= 1000) { const idx = SM_THRESHOLDS.findIndex(t => d <= t); return idx !== -1 ? idx : 4; }
		return 4 + (d - 1000) / (SM_MAX - 1000);
	}

	function updateProgress() {
		sliderProgress(slider);
	}

	function setStepper(container: HTMLElement, input: HTMLInputElement, value: number, min: number, disabled: boolean) {
		(container.querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = disabled || value <= min;
		(container.querySelector('[data-action="increment"]') as HTMLButtonElement).disabled = disabled;
		input.disabled = disabled;
		input.value = String(value);
	}

	const infoSvg = '<svg viewBox="0 0 24 24" width="14" height="14" data-icon><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>';

	function tip(text: string) {
		return ` <span class="calc-tooltip">${infoSvg}<span class="calc-tooltip-text"><span class="calc-tooltip-arrow"></span><span class="calc-tooltip-body">${text}</span></span></span>`;
	}

	function row(label: string, value: string, tooltip?: string) {
		const t = tooltip ? tip(tooltip) : '';
		return `<div class="calc-result-row"><span class="calc-row-label">${label}:</span><span class="calc-row-value">${value}${t}</span></div>`;
	}

	function updateUI(plan: any) {
		const isMaker = plan.name === 'Maker';
		const d = SM_DESCS[plan.name] || SM_DESCS.Business;
		prodDesc.textContent = d.prod;
		devDesc.textContent = d.dev;

		if (isMaker) { state.prodInstances = 1; state.devInstances = 0; }
		else { state.prodInstances = Math.max(state.prodInstances, plan.includedProdInstances); }

		setStepper($('#sm-prod-stepper'), prodInput, state.prodInstances, plan.includedProdInstances, isMaker);
		setStepper($('#sm-dev-stepper'), devInput, state.devInstances, 0, isMaker);
		wlPrompt.classList.toggle('hidden', plan.wl === true);
		updateAddons(plan, isMaker);
	}

	function updateAddons(plan: any, isMaker: boolean) {
		if (isMaker) {
			cards.edge.classList.add('addon-free', 'active'); toggles.edge.checked = true; toggles.edge.disabled = true;
			edgeCounter.classList.add('hidden'); edgeDesc.textContent = 'Process data where it is collected.'; state.addons.edge.count = 1;
			cards.trendz.classList.add('addon-free', 'active'); toggles.trendz.checked = true; toggles.trendz.disabled = true;
			cards.mobile.classList.add('addon-disabled'); toggles.mobile.checked = false; toggles.mobile.disabled = true; state.addons.mobile.on = false;
		} else {
			cards.edge.classList.remove('addon-free'); toggles.edge.disabled = false; toggles.edge.checked = state.addons.edge.on;
			cards.edge.classList.toggle('active', state.addons.edge.on);
			if (state.addons.edge.on) {
				state.addons.edge.count = Math.max(state.addons.edge.count, plan.edgeInstancesIncluded);
				edgeCount.value = String(state.addons.edge.count); edgeCounter.classList.remove('hidden');
				edgeDesc.textContent = `${plan.edgeInstancesIncluded} Edge instance${plan.edgeInstancesIncluded > 1 ? 's are' : ' is'} included.`;
				($('#sm-edge-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = state.addons.edge.count <= plan.edgeInstancesIncluded;
			} else { edgeCounter.classList.add('hidden'); edgeDesc.textContent = 'Process data where it is collected.'; }
			cards.trendz.classList.remove('addon-free'); toggles.trendz.disabled = false; toggles.trendz.checked = state.addons.trendz.on;
			cards.trendz.classList.toggle('active', state.addons.trendz.on);
			cards.mobile.classList.remove('addon-disabled'); toggles.mobile.disabled = false; toggles.mobile.checked = state.addons.mobile.on;
			cards.mobile.classList.toggle('active', state.addons.mobile.on);
		}
	}

	function calculate() {
		if (state.devices >= SM_ENTERPRISE) { renderEnterprise(); return; }
		const plan = getPlan(state.devices);
		updateUI(plan);

		const isMaker = plan.name === 'Maker';
		const isBusiness = plan.name === 'Business';
		let total = plan.price;

		let extraDev = 0, extraDevCost = 0;
		if (isBusiness && state.devices > plan.includedDevices) {
			extraDev = state.devices - plan.includedDevices;
			extraDevCost = extraDev * (plan.extraDevicePrice || 0);
			total += extraDevCost;
		}

		const extraProd = !isMaker ? Math.max(0, state.prodInstances - plan.includedProdInstances) : 0;
		const extraProdCost = extraProd * plan.extraProdInstancePrice;
		total += extraProdCost;

		const devCost = !isMaker ? state.devInstances * plan.devQaExtraInstancePrice : 0;
		total += devCost;

		let edgeCost = 0;
		if (state.addons.edge.on || isMaker) {
			if (!isMaker) {
				const extraEdges = Math.max(0, state.addons.edge.count - plan.edgeInstancesIncluded);
				edgeCost = plan.edgeMonthPrice + extraEdges * (plan.extraEdgePrice || 0);
				total += edgeCost;
			}
		}

		let trendzCost = 0;
		if (state.addons.trendz.on || isMaker) {
			if (!isMaker) {
				const trendzExtra = (isBusiness && extraDev > 0 && plan.trendzExtraDevicePrice) ? extraDev * plan.trendzExtraDevicePrice : 0;
				trendzCost = plan.trendzMonthPrice + trendzExtra;
				total += trendzCost;
			}
		}

		let mobileCost = 0;
		if (state.addons.mobile.on && !isMaker) { mobileCost = SM_PLANS.mobileApp; total += mobileCost; }

		// Results

		let html = `<div class="calc-optimal-plan"><span class="calc-optimal-label">Subscription plan:</span><span class="calc-optimal-value">${plan.name}</span></div>`;

		// Plan section (collapsible)
		html += `<div class="calc-section"><div class="calc-section-header"><span class="calc-section-title">${plan.name}</span><span class="calc-section-price">${fmt(plan.price)}${tip('Base plan price')}</span></div><div class="calc-section-body">`;
		html += row('Included Devices', fmtN(plan.includedDevices), `Devices included in the ${plan.name} plan.`);
		html += row('Included Prod Instances', fmtN(plan.includedProdInstances), `Production instances included in the ${plan.name} plan.`);
		html += row('White Labeling', plan.wl ? '<span class="calc-result-badge">Enabled</span>' : '<span class="calc-result-badge calc-result-badge--disabled">Disabled</span>');
		html += row('Base Price', `${fmt(plan.price)}`, 'Monthly subscription fee for the selected plan.');
		if (extraDev > 0) html += row('Extra Devices', fmtN(extraDev), 'Devices beyond what’s included in your plan.');
		if (extraDevCost > 0) html += row('Extra Device Cost', fmt(extraDevCost), `${fmtN(extraDev)} extra devices × $${plan.extraDevicePrice}/device`);
		if (extraProd > 0) html += row('Extra Prod Instances', fmtN(extraProd), 'Additional production instances beyond what’s included.');
		if (extraProdCost > 0) html += row('Extra Prod Instances Cost', fmt(extraProdCost), `${fmtN(extraProd)} × ${fmt(plan.extraProdInstancePrice)}/instance`);
		if (state.devInstances > 0) html += row('Extra Dev Instances', fmtN(state.devInstances), 'Development/QA instances for testing workflows.');
		if (devCost > 0) html += row('Extra Dev Instances Cost', fmt(devCost), `${fmtN(state.devInstances)} × ${fmt(plan.devQaExtraInstancePrice)}/instance`);
		html += `</div></div>`;

		// Add-ons (skip for Maker — free add-ons don't need display)
		if (!isMaker) {
			html += `<div class="calc-addons-divider">Add-ons</div>`;

			// Edge
			if (state.addons.edge.on && edgeCost > 0) {
				html += `<div class="calc-addon-active"><div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><span class="calc-section-price">${fmt(edgeCost)}${tip('Edge Computing add-on total')}</span></div>`;
				html += row('Add-on Base Price', fmt(plan.edgeMonthPrice), 'Monthly base price for Edge Computing');
				html += row('Included Edges', fmtN(plan.edgeInstancesIncluded), 'Edge instances included with this plan');
				const extraEdges = Math.max(0, state.addons.edge.count - plan.edgeInstancesIncluded);
				html += row('Extra Edges', fmtN(extraEdges), 'Additional edge instances beyond included');
				if (extraEdges > 0) html += row('Extra Edges Cost', fmt(extraEdges * (plan.extraEdgePrice || 0)), `${fmtN(extraEdges)} × ${fmt(plan.extraEdgePrice || 0)}`);
				html += `</div>`;
			} else {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Edge Computing</span><button type="button" class="calc-addon-result-action" data-enable-addon="edge">Add (${fmt(plan.edgeMonthPrice)})</button></div>`;
			}

			// Trendz
			if (state.addons.trendz.on && trendzCost > 0) {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><span class="calc-section-price">${fmt(trendzCost)}${tip('Trendz Analytics add-on total')}</span></div>`;
			} else {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">Trendz Analytics</span><button type="button" class="calc-addon-result-action" data-enable-addon="trendz">Add (${fmt(plan.trendzMonthPrice)})</button></div>`;
			}

			// Mobile
			if (state.addons.mobile.on && mobileCost > 0) {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">White-labeled Mobile App</span><span class="calc-section-price">${fmt(mobileCost)}${tip(`Monthly: ${fmt(SM_PLANS.mobileApp)}<br>One-time setup: ${fmt(SM_PLANS.mobileAppSetup)}`)}</span></div>`;
			} else {
				html += `<div class="calc-addon-result"><span class="calc-addon-result-name">White-labeled Mobile App</span><button type="button" class="calc-addon-result-action" data-enable-addon="mobile">Add (${fmt(SM_PLANS.mobileApp)})</button></div>`;
			}
		}

		const _st2 = results.parentElement?.scrollTop || 0; results.innerHTML = html; if (results.parentElement) results.parentElement.scrollTop = _st2;

		// Footer — build total tooltip
		const totalParts = [`${fmt(plan.price)} (base plan)`];
		if (extraDevCost > 0) totalParts.push(`${fmt(extraDevCost)} (extra devices)`);
		if (extraProdCost > 0) totalParts.push(`${fmt(extraProdCost)} (extra prod instances)`);
		if (devCost > 0) totalParts.push(`${fmt(devCost)} (dev instances)`);
		if (edgeCost > 0) totalParts.push(`${fmt(edgeCost)} (Edge)`);
		if (trendzCost > 0) totalParts.push(`${fmt(trendzCost)} (Trendz)`);
		if (mobileCost > 0) totalParts.push(`${fmt(mobileCost)} (Mobile App)`);

		// Build license portal URL with items
		const items: Record<string, any> = {};
		if (extraDev > 0) items.extraDeviceCount = extraDev;
		if (extraProd > 0) items.extraInstanceCount = extraProd;
		if (state.devInstances > 0) items.extraDevInstanceCount = state.devInstances;
		if (state.addons.edge.on) {
			items.edgeEnabled = true;
			const extraEdges = Math.max(0, state.addons.edge.count - plan.edgeInstancesIncluded);
			if (extraEdges > 0) items.extraEdgeCount = extraEdges;
		}
		if (state.addons.trendz.on) items.trendzEnabled = true;
		if (state.addons.mobile.on) items.whiteLabelingAddonEnabled = true;
		let ctaUrl = `https://license.thingsboard.io/signup?createSubscription=true&productId=${plan.productId}&planId=${plan.planId}`;
		const itemsStr = JSON.stringify(items);
		if (itemsStr !== '{}') ctaUrl += '&items=' + encodeURIComponent(itemsStr);
		const utmRaw = localStorage.getItem('utm');
		if (utmRaw) { try { const u = JSON.parse(utmRaw); Object.keys(u).forEach(k => { ctaUrl += '&' + k + '=' + encodeURIComponent(u[k]); }); } catch { /* ignore malformed utm */ } }
		const fpr = localStorage.getItem('fpr');
		if (fpr) ctaUrl += '&fpr=' + encodeURIComponent(fpr);

		footer.innerHTML = `<div class="calc-total-row"><span class="calc-total-label">Total</span><span class="calc-total-amount">${fmt(total)}/month${tip(totalParts.join(' + '))}</span></div><a class="calc-cta" href="${ctaUrl}" target="_blank" rel="noopener noreferrer">Get started</a>`;

		sendSmGTM();
	}

	// Delegated handler for [data-enable-addon] buttons rendered inside the
	// results panel. Bound once here instead of per-button on every calculate(),
	// which both leaked listeners and wasted CPU on each slider tick.
	results.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement)?.closest('[data-enable-addon]') as HTMLElement | null;
		if (!btn) return;
		const key = btn.dataset.enableAddon as string;
		if (!(key in toggles)) return;
		(toggles as any)[key].checked = true;
		(state.addons as any)[key].on = true;
		if (key === 'edge') { state.addons.edge.count = 1; edgeCounter.classList.remove('hidden'); }
		cards[key as keyof typeof cards].classList.add('active');
		calculate();
	});

	function renderEnterprise() {
		let html = `<div class="calc-optimal-plan"><span class="calc-optimal-label">Deployment Summary</span></div>`;
		html += `<p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:16px;">You are building at an impressive scale.</p>`;
		html += row('Devices', fmtN(state.devices));
		html += row('Production Instances', fmtN(state.prodInstances));
		html += row('Development Instances', fmtN(state.devInstances));
		if (state.addons.edge.on) html += row('Edge Instances', fmtN(state.addons.edge.count));
		if (state.addons.trendz.on) html += row('Trendz Analytics', 'Enabled');
		if (state.addons.mobile.on) html += row('White-labeled Mobile App', 'Enabled');
		html += `<p class="calc-enterprise-msg">You have reached a tier where economies of scale apply. Let’s talk about aligning our pricing with your specific rollout schedule and volume requirements.</p>`;
		const _st2 = results.parentElement?.scrollTop || 0; results.innerHTML = html; if (results.parentElement) results.parentElement.scrollTop = _st2;

		const msg = `Enterprise Request\n- Devices: ${fmtN(state.devices)}\n- Prod Instances: ${fmtN(state.prodInstances)}\n- Dev Instances: ${fmtN(state.devInstances)}` +
			(state.addons.edge.on ? `\n- Edge Instances: ${fmtN(state.addons.edge.count)}` : '') +
			(state.addons.trendz.on ? `\n- Trendz Analytics: Enabled` : '') +
			(state.addons.mobile.on ? `\n- Mobile App: Enabled` : '');
		footer.innerHTML = `<a class="calc-cta" href="/contact-us/?subject=${encodeURIComponent('ThingsBoard Products')}&message=${encodeURIComponent(msg)}" target="_blank" rel="noopener noreferrer">Get Enterprise Quote</a>`;
	}

	// rAF-batch calculate() during continuous input (slider drag, typing) so we
	// rebuild the results panel at most once per animation frame. Final-state
	// events (change/blur) still call calculate() directly to commit.
	let _calcQueued = false;
	function scheduleCalculate() {
		if (_calcQueued) return;
		_calcQueued = true;
		requestAnimationFrame(() => { _calcQueued = false; calculate(); });
	}

	// ─── Slider ───
	slider.addEventListener('input', () => { state.devices = sliderToDevices(parseFloat(slider.value)); devicesInput.value = String(state.devices); updateProgress(); scheduleCalculate(); });
	slider.addEventListener('change', () => { const v = parseFloat(slider.value); if (v <= 4) { const s = Math.round(v); slider.value = String(s); state.devices = sliderToDevices(s); devicesInput.value = String(state.devices); updateProgress(); calculate(); } });
	devicesInput.addEventListener('input', () => { const d = parseInt(devicesInput.value); if (!isNaN(d) && d > 0) { state.devices = Math.min(SM_MAX, d); slider.value = String(devicesToSlider(state.devices)); updateProgress(); scheduleCalculate(); } });
	devicesInput.addEventListener('blur', () => { let d = Math.max(1, Math.min(SM_MAX, parseInt(devicesInput.value) || 1)); if (d <= 1000) d = SM_THRESHOLDS.find(t => d <= t) || 1000; state.devices = d; devicesInput.value = String(d); slider.value = String(devicesToSlider(d)); updateProgress(); calculate(); });

	// ─── Steppers ───
	function bindStepper(containerId: string, key: 'prod' | 'dev' | 'edge') {
		const sInp = $(containerId).querySelector('input[type="number"]') as HTMLInputElement;
		$(containerId).querySelectorAll('.calc-stepper-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				if ((btn as HTMLButtonElement).disabled) return;
				const action = (btn as HTMLElement).dataset.action;
				const plan = getPlan(state.devices);
				if (key === 'prod') { state.prodInstances = action === 'increment' ? state.prodInstances + 1 : Math.max(plan.includedProdInstances, state.prodInstances - 1); }
				else if (key === 'dev') { state.devInstances = action === 'increment' ? state.devInstances + 1 : Math.max(0, state.devInstances - 1); }
				else if (key === 'edge') { const min = plan.edgeInstancesIncluded; state.addons.edge.count = action === 'increment' ? state.addons.edge.count + 1 : Math.max(min, state.addons.edge.count - 1); }
				calculate();
			});
		});
		sInp?.addEventListener('input', () => {
			const v = parseInt(sInp.value);
			if (isNaN(v) || v < 0) return;
			if (key === 'prod') state.prodInstances = v;
			else if (key === 'dev') state.devInstances = v;
			else if (key === 'edge') state.addons.edge.count = v;
			scheduleCalculate();
		});
		sInp?.addEventListener('blur', () => {
			const plan = getPlan(state.devices);
			let v = parseInt(sInp.value) || 0;
			if (key === 'prod') { v = Math.max(plan.includedProdInstances, v); state.prodInstances = v; }
			else if (key === 'dev') { v = Math.max(0, v); state.devInstances = v; }
			else if (key === 'edge') { v = Math.max(plan.edgeInstancesIncluded, v); state.addons.edge.count = v; }
			sInp.value = String(v);
			calculate();
		});
	}
	bindStepper('#sm-prod-stepper', 'prod');
	bindStepper('#sm-dev-stepper', 'dev');
	bindStepper('#sm-edge-stepper', 'edge');

	// ─── Addon toggles ───
	(['edge', 'trendz', 'mobile'] as const).forEach(key => {
		toggles[key].addEventListener('change', () => {
			if (toggles[key].disabled) return;
			(state.addons as any)[key].on = toggles[key].checked;
			if (key === 'edge' && !toggles[key].checked) state.addons.edge.count = 1;
			calculate();
		});
	});

	// Choose pilot
	$('#sm-choose-pilot').addEventListener('click', () => {
		state.devices = 100; devicesInput.value = '100'; slider.value = String(devicesToSlider(100)); updateProgress(); calculate();
	});

	// ─── Modal ───
	function closeModal() { calcModalClose(); setTimeout(() => { modal!.style.display = 'none'; }, 300); }
	$('[data-calc-close]').addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display !== 'none') closeModal(); });

	// Build clipboard text from current state
	function buildSummaryText(): string {
		if (state.devices >= SM_ENTERPRISE) {
			let msg = `Enterprise Request\n- Devices: ${fmtN(state.devices)}\n- Prod Instances: ${fmtN(state.prodInstances)}\n- Dev Instances: ${fmtN(state.devInstances)}`;
			if (state.addons.edge.on) msg += `\n- Edge Instances: ${fmtN(state.addons.edge.count)}`;
			if (state.addons.trendz.on) msg += `\n- Trendz Analytics: Enabled`;
			if (state.addons.mobile.on) msg += `\n- Mobile App: Enabled`;
			return msg;
		}
		const plan = getPlan(state.devices);
		const isMaker = plan.name === 'Maker';
		const isBusiness = plan.name === 'Business';
		let extraDev = 0, extraDevCost = 0;
		if (isBusiness && state.devices > plan.includedDevices) {
			extraDev = state.devices - plan.includedDevices;
			extraDevCost = extraDev * (plan.extraDevicePrice || 0);
		}
		const extraProd = !isMaker ? Math.max(0, state.prodInstances - plan.includedProdInstances) : 0;
		const extraProdCost = extraProd * plan.extraProdInstancePrice;
		const devCost = !isMaker ? state.devInstances * plan.devQaExtraInstancePrice : 0;
		let edgeCost = 0;
		if ((state.addons.edge.on || isMaker) && !isMaker) {
			const extraEdges = Math.max(0, state.addons.edge.count - plan.edgeInstancesIncluded);
			edgeCost = plan.edgeMonthPrice + extraEdges * (plan.extraEdgePrice || 0);
		}
		let trendzCost = 0;
		if ((state.addons.trendz.on || isMaker) && !isMaker) {
			const trendzExtra = (isBusiness && extraDev > 0 && plan.trendzExtraDevicePrice) ? extraDev * plan.trendzExtraDevicePrice : 0;
			trendzCost = plan.trendzMonthPrice + trendzExtra;
		}
		const mobileCost = (state.addons.mobile.on && !isMaker) ? SM_PLANS.mobileApp : 0;
		const total = plan.price + extraDevCost + extraProdCost + devCost + edgeCost + trendzCost + mobileCost;

		let msg = `Subscription Plan: ${plan.name} (${fmt(plan.price)})\n`;
		msg += `- Devices: ${fmtN(state.devices)}\n`;
		msg += `- Included Devices: ${fmtN(plan.includedDevices)}\n`;
		msg += `- Included Prod Instances: ${fmtN(plan.includedProdInstances)}\n`;
		if (plan.wl) msg += `- White Labeling: Enabled\n`;
		if (extraDev > 0) msg += `- Extra Devices: ${fmtN(extraDev)} (${fmt(extraDevCost)})\n`;
		if (extraProd > 0) msg += `- Extra Prod Instances: ${fmtN(extraProd)} (${fmt(extraProdCost)})\n`;
		if (state.devInstances > 0) msg += `- Dev Instances: ${fmtN(state.devInstances)} (${fmt(devCost)})\n`;

		const hasAddons = edgeCost > 0 || trendzCost > 0 || mobileCost > 0 || isMaker;
		if (hasAddons) {
			msg += `\nAdd-ons:\n`;
			if (isMaker) { msg += `- Edge Computing: Free\n- Trendz Analytics: Free\n`; }
			else {
				if (edgeCost > 0) msg += `- Edge Computing: ${fmt(edgeCost)} (${fmtN(state.addons.edge.count)} instances)\n`;
				if (trendzCost > 0) msg += `- Trendz Analytics: ${fmt(trendzCost)}\n`;
				if (mobileCost > 0) msg += `- White-labeled Mobile App: ${fmt(mobileCost)} (one-time setup: ${fmt(SM_PLANS.mobileAppSetup)})\n`;
			}
		}
		msg += `\nTotal Monthly Cost: ${fmt(total)}`;
		return msg;
	}

	// Copy. Capture currentTarget BEFORE the promise — browsers null
	// `e.currentTarget` once the click handler returns synchronously, so
	// reading it inside `.then()` throws TypeError on `classList`.
	modal.querySelector('[data-calc-copy]')?.addEventListener('click', (e) => {
		const btn = e.currentTarget as HTMLElement;
		const text = buildSummaryText();
		const flashCopied = () => {
			btn.classList.add('copied');
			setTimeout(() => btn.classList.remove('copied'), 2000);
		};
		// Swallow rejections (e.g. Safari/Firefox `NotAllowedError: Document is not focused`)
		// so they don't surface as unhandled promise rejections; silent failure is intentional.
		navigator.clipboard.writeText(text).then(flashCopied).catch(() => {});
	});

	// Download
	modal.querySelector('[data-calc-download]')?.addEventListener('click', () => {
		const blob = new Blob([buildSummaryText()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'self-managed-calculation.txt';
		a.click();
		URL.revokeObjectURL(url);
	});

	// Reset
	$('[data-calc-reset]').addEventListener('click', () => {
		state = { devices: 10, prodInstances: 1, devInstances: 0, addons: { edge: { on: false, count: 1 }, trendz: { on: false }, mobile: { on: false } } };
		devicesInput.value = '10'; slider.value = '0';
		toggles.edge.checked = false; toggles.trendz.checked = false; toggles.mobile.checked = false;
		cards.edge.classList.remove('active', 'addon-free'); cards.trendz.classList.remove('active', 'addon-free'); cards.mobile.classList.remove('active', 'addon-disabled');
		edgeCounter.classList.add('hidden');
		edgeCount.value = '1';
		($('#sm-edge-stepper').querySelector('[data-action="decrement"]') as HTMLButtonElement).disabled = true;
		updateProgress(); calculate();
	});

	updateProgress(); calculate();
	requestAnimationFrame(() => initAllSliders(modal));
	openImpl = () => { modal.style.display = ''; calcModalOpen(); updateProgress(); requestAnimationFrame(() => initAllSliders(modal)); calculate(); };
}

export function openTbPaygCalc() {
	if (!openImpl) initTbPaygCalc();
	openImpl?.();
}

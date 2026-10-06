import { YOURGPT_WIDGET_ID } from '@data/chat-widget';

// The YourGPT chat through the SDK their `script.js` puts on `window.$yourgptChatbot`: a queue until `chatbot.js`
// has booted, the live API after. `widget:hide` hides the window too, so their launcher is hidden by the dashboard's
// CSS instead.

interface YourGptApi {
	execute(action: string, data?: unknown): void;
	on(event: string, cb: (...args: any[]) => void): void;
}

declare global {
	interface Window {
		YGC_WIDGET_ID?: string;
		$yourgptChatbot?: YourGptApi & { q?: unknown[] };
	}
}

const SCRIPT_ID = 'yourgpt-chatbot';
const ROOT_ID = 'yourgpt_root';

// Every call goes to whatever `$yourgptChatbot` is at the time: a reference kept from before the boot is the
// dead queue, and calls pushed onto it are never read.
const live: YourGptApi = {
	execute: (action, data) => window.$yourgptChatbot!.execute(action, data),
	on: (event, cb) => window.$yourgptChatbot!.on(event, cb),
};

let loaded: Promise<YourGptApi> | undefined;
let up: Promise<YourGptApi> | undefined;

/** Loads their loader on first call. Its queue is up from then: listeners added now hear the boot. */
function whenChatLoaded(): Promise<YourGptApi> {
	loaded ??= new Promise((resolve, reject) => {
		window.YGC_WIDGET_ID = YOURGPT_WIDGET_ID;
		const script = document.createElement('script');
		script.src = 'https://widget.yourgpt.ai/script.js';
		// Their loader finds its own tag by this id.
		script.id = SCRIPT_ID;
		script.addEventListener('load', () => resolve(live));
		script.addEventListener('error', () => {
			script.remove();
			loaded = up = undefined;
			reject(new Error('YourGPT widget failed to load'));
		});
		document.head.appendChild(script);
	});
	return loaded;
}

/**
 * Resolves once the bot has booted, rejects if it has not within 15s (their loader ran, the bot's own requests
 * were blocked). A `widget:open` queued before the boot is replayed and then overwritten by the bot's own
 * initial state, closed, so commands wait for this. Polled: the boot has no event to wait on.
 */
function whenChatUp(): Promise<YourGptApi> {
	up ??= whenChatLoaded().then(
		(api) =>
			new Promise((resolve, reject) => {
				// Their root element exists before the boot; the rendered bot's own root does not.
				const booted = () => !Array.isArray(window.$yourgptChatbot?.q) && document.querySelector('.yourgptChatbotRoot');
				const check = (tries: number) => {
					if (booted()) return resolve(api);
					if (tries <= 0) {
						up = undefined;
						return reject(new Error('YourGPT widget did not boot'));
					}
					setTimeout(() => check(tries - 1), 100);
				};
				check(150);
			})
	);
	return up;
}

// Starts every running hue cycle from the document's origin, so the launcher and the window, whose animations
// start at different moments, pass through each colour together.
function syncHues(): void {
	requestAnimationFrame(() =>
		requestAnimationFrame(() => {
			for (const a of document.getAnimations()) {
				if (a instanceof CSSAnimation && a.animationName === 'chat-hues') a.startTime = 0;
			}
		})
	);
}

/** Our launcher: the first click loads the chat and opens it; later clicks toggle it. `status` reports the load. */
export function wireChatLauncher(launcher: HTMLButtonElement, status: HTMLElement): void {
	let open = false;
	let busy = false;
	let ready = false;
	let errorTimer = 0;

	// A live region: its text is announced; `data-state` shows it (loading after a delay, see the launcher's CSS).
	const report = (state?: 'loading' | 'error') => {
		clearTimeout(errorTimer);
		launcher.toggleAttribute('data-loading', state === 'loading');
		status.textContent =
			state === 'loading' ? 'Loading the AI assistant…' : state === 'error' ? "Couldn't load the chat. Try again." : '';
		if (state) status.dataset.state = state;
		else delete status.dataset.state;
		if (state === 'error') errorTimer = window.setTimeout(report, 6000);
	};

	const reflect = (state: boolean) => {
		if (state === open) return;
		open = state;
		launcher.setAttribute('aria-expanded', String(state));
		// Closed by its own header button, the window leaves focus nowhere: back to the launcher.
		if (!state && document.activeElement?.closest(`#${ROOT_ID}`)) launcher.focus();
		syncHues();
	};

	// Right after the boot the bot can still apply its own initial state, closed, over an open; so the command is
	// repeated until the window is in the state asked for. Their hidden launcher's label says which state that is.
	const windowOpen = () =>
		document.querySelector(`#${ROOT_ID} .ygpts-widgetBtn`)?.getAttribute('aria-label')?.startsWith('Close');
	const settle = async (api: YourGptApi, want: boolean) => {
		for (let tries = 0; tries < 20; tries++) {
			if (tries % 5 === 0) api.execute(want ? 'widget:open' : 'widget:close');
			await new Promise((r) => setTimeout(r, 200));
			if (Boolean(windowOpen()) === want) return true;
		}
		return false;
	};

	const toggle = async () => {
		if (busy) return;
		busy = true;
		launcher.setAttribute('aria-busy', 'true');
		if (!ready) report('loading');
		try {
			// Closes from inside the window (its header button) come back through this.
			if (!loaded) (await whenChatLoaded()).on('widget:popup', (state: unknown) => reflect(Boolean(state)));
			const want = !open;
			const settled = await settle(await whenChatUp(), want);
			// A first open that never shows is a failed load, and the next click is a first one again.
			if (!settled && !ready) throw new Error('YourGPT window did not open');
			if (settled) reflect(want);
			if (!ready) report();
			ready = true;
			if (open) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${ROOT_ID} textarea`)?.focus());
		} catch {
			// Blocked, offline, or booted nowhere: the next click tries again.
			report('error');
		} finally {
			busy = false;
			launcher.removeAttribute('aria-busy');
		}
	};

	launcher.addEventListener('click', toggle);
	if (launcher.dataset.clicked !== undefined) void toggle();
	syncHues();
}

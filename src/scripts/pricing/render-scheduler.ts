// One results render per animation frame for a pricing calculator. Both calculators
// rebuild their whole results panel from state, so input, change and click handlers
// queue a render instead of running one each: a slider key press (input + change in
// one task) or a blur followed by a tap renders once. The rules are shared here so a
// fix to them reaches both calculators.

export interface RenderScheduler {
	/** Queue a render before the next frame. Further calls before it runs are no-ops. */
	schedule(): void;
	/**
	 * Commit a typed value on blur. Typing has already queued its renders, so this
	 * renders only when normalizing the value changed the state, or to flush a queued
	 * render. It renders right away: on touch the blur and the next tap's click run in
	 * one task, and that click can read the rendered results (stepper limits, the CTA
	 * link, the plan that sizes an add-on).
	 */
	commit(changed: boolean): void;
	/** Run the queued render now, if there is one, for code that reads the results next. */
	flush(): void;
	/**
	 * Drop the queued render. A direct render calls this first: it shows the latest
	 * state, so it covers the queued frame too.
	 */
	cancel(): void;
}

export function createRenderScheduler(render: () => void): RenderScheduler {
	let frame = 0;
	return {
		schedule() {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				render();
			});
		},
		commit(changed) {
			if (changed || frame) render();
		},
		flush() {
			if (frame) render();
		},
		cancel() {
			if (!frame) return;
			cancelAnimationFrame(frame);
			frame = 0;
		},
	};
}

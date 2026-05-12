/**
 * Custom starlight-toc script that fixes active heading tracking
 * when headings from included MDX components are rendered as bare <h2> elements
 * (without Starlight's <div class="sl-heading-wrapper">).
 *
 * Fix: getElementHeading() checks direct children for headings before walking
 * backwards through siblings. This handles wrapper divs correctly.
 */

const PAGE_TITLE_ID = '_top';

export class StarlightTOC extends HTMLElement {
	private _current = this.querySelector<HTMLAnchorElement>('a[aria-current="true"]');
	private minH = parseInt(this.dataset.minH || '2', 10);
	private maxH = parseInt(this.dataset.maxH || '3', 10);

	// Lifetime management. All window-level listeners are registered with
	// this controller's signal, and disconnectedCallback aborts it — so
	// when the custom element is removed (view transition, hot-reload,
	// dynamic page swap) we don't leave stale handlers attached to window.
	private abortController?: AbortController;
	private observer?: IntersectionObserver;
	private rafId = 0;
	private resizeTimeout?: ReturnType<typeof setTimeout>;

	protected set current(link: HTMLAnchorElement) {
		if (link === this._current) return;
		if (this._current) this._current.removeAttribute('aria-current');
		link.setAttribute('aria-current', 'true');
		this._current = link;
	}

	private onIdle = (cb: IdleRequestCallback) =>
		(window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(cb);

	constructor() {
		super();
		this.onIdle(() => this.init());
	}

	disconnectedCallback(): void {
		this.abortController?.abort();
		this.observer?.disconnect();
		this.observer = undefined;
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
			this.rafId = 0;
		}
		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = undefined;
		}
	}

	private init = (): void => {
		this.abortController = new AbortController();
		const { signal } = this.abortController;

		/** All the links in the table of contents. */
		const links = [...this.querySelectorAll('a')];

		/**
		 * Heading elements that correspond to TOC links, in document order.
		 * Snapshotted once — Starlight docs don't async-swap their headings,
		 * so the refs stay valid for the element's lifetime. If a future
		 * MDX feature ever re-renders headings client-side without
		 * remounting this element, this list would go stale and
		 * promoteIfAtBottom would no-op against detached nodes.
		 */
		const tocHeadings = links
			.map((link) => {
				const id = decodeURIComponent(link.hash.slice(1));
				return id ? document.getElementById(id) : null;
			})
			.filter((h): h is HTMLElement => h !== null);

		/** True when the document is scrolled as far down as it can go. */
		const isAtBottom = (): boolean =>
			window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

		/**
		 * When at scroll-bottom, the IntersectionObserver's narrow trigger band
		 * near the top of the viewport can't be reached by trailing headings on
		 * tall viewports — so the active link gets stuck on the last heading
		 * that did cross it. Promote the lowest visible heading in that case.
		 */
		const promoteIfAtBottom = (): void => {
			if (!isAtBottom()) return;
			let lastVisible: HTMLElement | null = null;
			const vh = window.innerHeight;
			for (const h of tocHeadings) {
				if (h.getBoundingClientRect().top <= vh) lastVisible = h;
			}
			if (!lastVisible) return;
			const link = links.find((l) => l.hash === '#' + encodeURIComponent(lastVisible!.id));
			if (link) this.current = link;
		};

		/** Test if an element is a table-of-contents heading. */
		const isHeading = (el: Element): el is HTMLHeadingElement => {
			if (el instanceof HTMLHeadingElement) {
				// Special case for page title h1
				if (el.id === PAGE_TITLE_ID) return true;
				// Check the heading level is within the user-configured limits for the ToC
				const level = el.tagName[1];
				if (level) {
					const int = parseInt(level, 10);
					if (int >= this.minH && int <= this.maxH) return true;
				}
			}
			return false;
		};

		/** Walk up the DOM to find the nearest heading. */
		const getElementHeading = (el: Element | null): HTMLHeadingElement | null => {
			if (!el) return null;
			const origin = el;
			while (el) {
				if (isHeading(el)) return el;
				// Check direct children for headings (handles sl-heading-wrapper divs)
				for (const child of el.children) {
					if (isHeading(child)) return child;
				}
				// Assign the previous sibling's last, most deeply nested child to el.
				el = el.previousElementSibling;
				while (el?.lastElementChild) {
					el = el.lastElementChild;
				}
				// Look for headings amongst siblings.
				const h = getElementHeading(el);
				if (h) return h;
			}
			// Walk back up the parent.
			return getElementHeading(origin.parentElement);
		};

		/** Handle intersections and set the current link to the heading for the current intersection. */
		const setCurrent: IntersectionObserverCallback = (entries) => {
			for (const { isIntersecting, target } of entries) {
				if (!isIntersecting) continue;
				const heading = getElementHeading(target);
				if (!heading) continue;
				const link = links.find((link) => link.hash === '#' + encodeURIComponent(heading.id));
				if (link) {
					this.current = link;
					break;
				}
			}
			// IO may have settled on an early heading even though we're already
			// pinned at the bottom of the page — promote to the lowest visible
			// heading in that case.
			promoteIfAtBottom();
		};

		// Observe elements with an `id` (most likely headings) and their siblings.
		// Also observe direct children of `.content` to include elements before
		// the first heading.
		const toObserve = document.querySelectorAll('main [id], main [id] ~ *, main .content > *');

		const observe = () => {
			if (this.observer) return;
			this.observer = new IntersectionObserver(setCurrent, { rootMargin: this.getRootMargin() });
			toObserve.forEach((h) => this.observer!.observe(h));
		};
		observe();

		window.addEventListener(
			'resize',
			() => {
				// Disable intersection observer while window is resizing.
				if (this.observer) {
					this.observer.disconnect();
					this.observer = undefined;
				}
				if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
				this.resizeTimeout = setTimeout(() => this.onIdle(observe), 200);
			},
			{ signal },
		);

		// Scroll listener for the bottom-of-page case — IO won't fire once the
		// page can't scroll any further, so we need our own trigger. rAF-coalesced.
		const onScroll = () => {
			if (this.rafId) return;
			this.rafId = requestAnimationFrame(() => {
				this.rafId = 0;
				promoteIfAtBottom();
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true, signal });
		// Handle the case where the page loads already scrolled to the bottom
		// (e.g. very short content on a very tall viewport).
		promoteIfAtBottom();
	};

	private getRootMargin(): `-${number}px 0% ${number}px` {
		const navBarHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
		// `<summary>` only exists in mobile ToC, so will fall back to 0 in large viewport component.
		const mobileTocHeight = this.querySelector('summary')?.getBoundingClientRect().height || 0;
		/** Start intersections at nav height + 2rem padding. */
		const top = navBarHeight + mobileTocHeight + 32;
		/** End intersections `53px` later. This is slightly more than the maximum `margin-top` in Markdown content. */
		const bottom = top + 53;
		const height = document.documentElement.clientHeight;
		return `-${top}px 0% ${bottom - height}px`;
	}
}

customElements.define('starlight-toc', StarlightTOC);

// A page brought back from the browser's back/forward cache doesn't run its scripts again, and
// intersection observers don't fire again because nothing moved. Safari also comes back with
// videos paused and can drop the document inside an <object>.

export function onPageRestore(callback: () => void): void {
	window.addEventListener('pageshow', (event) => {
		if (event.persisted) callback();
	});
}

/** After a restore, observes the elements afresh so the observer reports where they are now. */
export function reobserveOnRestore(observer: IntersectionObserver, elements: Iterable<Element>): void {
	const list = [...elements];
	onPageRestore(() => {
		for (const element of list) {
			observer.unobserve(element);
			observer.observe(element);
		}
	});
}

/** After a restore, swaps each matching <object> for a copy so it loads its document again. */
export function reloadObjectsOnRestore(selector: string): void {
	onPageRestore(() => {
		document.querySelectorAll(selector).forEach((object) => object.replaceWith(object.cloneNode(true)));
	});
}

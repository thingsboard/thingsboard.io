// The script half of the `reveal` mixin (src/styles/_reveal.scss): marks each element
// `data-revealed` the first time it scrolls into view. Every component that imports this shares
// the one observer.
let observer: IntersectionObserver | undefined;

export function reveal(elements: Iterable<Element>): void {
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.setAttribute('data-revealed', '');
				observer!.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px' },
	);
	for (const element of elements) observer.observe(element);
}

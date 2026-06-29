// Hydrate shared by SearchFilterBar and ListingsFilterBar.
//
// For each `[data-iot-hub-search-bar]` on the page:
//   * Read `?q=` from the URL and populate `[data-search-input]` (when the
//     SSR didn't already supply a value).
//   * If the bar opts into dynamic heading via `data-heading-prefix`,
//     update the heading (`[data-search-heading]`) as the user types —
//     empty input shows `data-heading`, otherwise `${prefix} "{q}"`.
//   * On every input event, dispatch `iot-hub-search-text:change`
//     `{ searchText }` so the host (dynamic-search pipeline) can debounce
//     and refetch.
//   * Wire `[data-search-clear]` to empty the input + fire the same input
//     event + refocus.

const LDQUO = '“';
const RDQUO = '”';

function setupSearchBar(bar: HTMLElement): void {
	if (bar.dataset.searchBarInited) return;
	bar.dataset.searchBarInited = 'true';

	const input = bar.querySelector<HTMLInputElement>('[data-search-input]');
	if (!input) return;

	const heading = bar.querySelector<HTMLElement>('[data-search-heading]');
	const headingText = bar.dataset.heading ?? '';
	const headingPrefix = bar.dataset.headingPrefix ?? '';

	const renderHeading = (text: string) => {
		if (!heading || !headingPrefix) return;
		heading.replaceChildren();
		if (text.trim()) {
			heading.append(`${headingPrefix} ${LDQUO}`);
			const span = document.createElement('span');
			span.setAttribute('data-search-query', '');
			span.textContent = text;
			heading.append(span);
			heading.append(RDQUO);
		} else {
			heading.textContent = headingText;
		}
	};

	const params = new URLSearchParams(location.search);
	const initialQ = params.get('q') ?? '';
	if (initialQ && !input.value) input.value = initialQ;
	renderHeading(input.value);

	input.addEventListener('input', () => {
		renderHeading(input.value);
		bar.dispatchEvent(
			new CustomEvent('iot-hub-search-text:change', {
				detail: { searchText: input.value },
				bubbles: true,
			})
		);
	});

	const clearBtn = bar.querySelector<HTMLButtonElement>('[data-search-clear]');
	if (clearBtn) {
		clearBtn.addEventListener('click', () => {
			input.value = '';
			input.dispatchEvent(new Event('input', { bubbles: true }));
			input.focus();
		});
	}
}

export function initSearchBars(): void {
	function run() {
		document
			.querySelectorAll<HTMLElement>('[data-iot-hub-search-bar]')
			.forEach(setupSearchBar);
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', run);
	} else {
		run();
	}
	document.addEventListener('astro:page-load', run);
}

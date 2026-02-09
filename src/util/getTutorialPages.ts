import type { TutorialEntry } from '~/content.config';

/** Get a sorted list of tutorial pages. */
export function getTutorialPages(allPages: TutorialEntry[]) {
	return [...allPages].sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
}

/** Turn a flat list of tutorial pages into a hierarchical array of units and lessons. */
export function getTutorialUnits(tutorialPages: TutorialEntry[]) {
	return tutorialPages.reduce(
		(units, page) => {
			if (page.data.unitTitle) {
				units.push({
					title: page.data.unitTitle,
					lessons: [page],
				});
			} else {
				units.at(-1)?.lessons.push(page);
			}
			return units;
		},
		[] as { title: string; lessons: typeof tutorialPages }[]
	);
}

import type { AnnotationProperties } from '@actions/core';
import { formatCount } from '../../output.mjs';
import type { CheckBase } from './check.ts';
import type { HtmlPage } from './page.ts';

export interface LinkIssue {
	type: IssueType;
	linkHref: string;
	autofixHref?: string;
	annotationText?: string;
	page: HtmlPage;
	check: CheckBase;
	sourceFileAnnotations: SourceFileAnnotation[];
}

export interface SourceFileAnnotation {
	message: string;
	location: AnnotationProperties;
	autofixed?: boolean;
}

export class IssueType {
	readonly title: string;
	readonly prefix: string;
	readonly sortOrder: number;
	/** A warning is printed but does not fail the run. */
	readonly severity: 'error' | 'warning';

	constructor({
		title,
		prefix,
		sortOrder,
		severity = 'error',
	}: {
		title: string;
		prefix: string;
		sortOrder: number;
		severity?: 'error' | 'warning';
	}) {
		this.title = title;
		this.prefix = prefix;
		this.sortOrder = sortOrder;
		this.severity = severity;
	}

	/**
	 * Formats the issue `title` template based on `count`.
	 *
	 * See {@link formatCount} for full formatting logic.
	 */
	formatTitle(count?: number) {
		return formatCount(count, this.title);
	}
}

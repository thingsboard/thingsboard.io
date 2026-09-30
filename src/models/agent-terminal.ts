/**
 * A typed `AgentTerminal` session: a coding-agent transcript, as a list of turns.
 *
 *   ❯ the person's prompt
 *   ● Tool(argument)
 *     └ what the tool returned
 *   ● the agent's answer
 *     ✔ a point under it
 */

export const GLYPH = { prompt: '❯', dot: '●', tree: '└', item: '✔' } as const;

/** The person's turn, typed into the input and sent to the log. */
interface AgentUserTurn {
	role: 'user';
	text: string;
	/** Offered as ghost text after the caret and accepted whole, as Tab does, instead of typed. */
	suggested?: boolean;
	/** With `suggested`: the offer is never accepted, and the transcript ends on it. */
	pending?: boolean;
}

/** A tool call: it runs for `spin` ms, then `result` lands under it. */
interface AgentToolTurn {
	role: 'tool';
	text: string;
	spin: number;
	result: string;
}

interface AgentSayTurn {
	role: 'agent';
	text: string;
	items?: string[];
	/** A closing paragraph after the items. */
	tail?: string;
}

export interface BannerSeg {
	t: 'brand' | 'ok' | 'arg' | 'dim' | 'text';
	v: string;
}

/** What the CLI prints as it launches: ASCII art down the left, a status line beside each row. */
interface AgentBanner {
	role: 'banner';
	art: string[];
	/** One per row of art; an empty list leaves that row's right side blank. */
	lines: BannerSeg[][];
}

export type AgentStep = AgentBanner | AgentUserTurn | AgentToolTurn | AgentSayTurn;

export const artCols = (art: string[]) => Math.max(...art.map((row) => row.length));

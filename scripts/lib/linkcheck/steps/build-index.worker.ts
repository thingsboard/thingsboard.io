import { parentPort } from 'node:worker_threads';
import { readPageData, type ParseRequest, type ParseResult } from '../base/page-data.ts';

/** Worker thread of `parsePages` in `build-index.ts`: reads and parses each batch of pages it is sent. */
parentPort!.on('message', ({ indexes, htmlFilePaths }: ParseRequest) => {
	const results: ParseResult[] = htmlFilePaths.map((htmlFilePath, i) => readPageData(htmlFilePath, indexes[i]));
	parentPort!.postMessage(results);
});

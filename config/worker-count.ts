import os from 'node:os';

export interface WorkerPlan {
	/** Worker threads to start; below 2 the work runs on the main thread. */
	workers: number;
	/** What decided the count, for the log. */
	source: string;
}

interface WorkerBudget {
	envVar: string;
	/** Memory the job needs on the main thread, in GB. */
	baseGb: number;
	/** Memory each worker adds, in GB. */
	perWorkerGb: number;
}

const GB = 1024 ** 3;

/**
 * Worker threads for a CPU-bound job: the smaller of CPU threads − 1 and
 * (memory GB − `baseGb`) / `perWorkerGb`, where memory is the total or a lower container limit
 * (total, not free, so the count is the same on every run). `{envVar}=0` or `1` runs on the main
 * thread, 2 or more forces that count; a value that is not a whole number is ignored with a warning.
 *
 * Plain Node runs this from `scripts/`, so it imports nothing but Node built-ins.
 */
export function pickWorkerCount({ envVar, baseGb, perWorkerGb }: WorkerBudget): WorkerPlan {
	const override = process.env[envVar];
	if (override !== undefined) {
		if (/^\d+$/.test(override)) return { workers: Number(override), source: `set by ${envVar}=${override}` };
		console.warn(`${envVar}="${override}" is not a whole number; picking the worker count automatically.`);
	}
	const total = os.totalmem();
	const containerLimit = process.constrainedMemory();
	const memory = containerLimit > 0 ? Math.min(total, containerLimit) : total;
	const cpus = os.availableParallelism();
	const byCpu = cpus - 1;
	const byMemory = Math.floor((memory / GB - baseGb) / perWorkerGb);
	const mem =
		memory < total
			? `${(memory / GB).toFixed(1)} GB container limit (machine ${(total / GB).toFixed(1)} GB)`
			: `${(total / GB).toFixed(1)} GB memory`;
	return {
		workers: Math.max(0, Math.min(byCpu, byMemory)),
		source: `auto: ${cpus} CPU threads, ${mem}, limited by ${byMemory < byCpu ? 'memory' : 'CPU'}`,
	};
}

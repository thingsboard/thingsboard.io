// Compute the visual content bounding box of an SVG by rasterising it and
// finding the non-transparent pixel rectangle. Output is in SVG user units.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const file = process.argv[2];
const svg = readFileSync(file, 'utf8');
const SIZE = 256;
const png = await sharp(Buffer.from(svg))
	.resize(SIZE, SIZE, { fit: 'fill' })
	.raw()
	.toBuffer({ resolveWithObject: true });
const { data, info } = png;
let minX = SIZE, minY = SIZE, maxX = -1, maxY = -1;
for (let y = 0; y < SIZE; y++) {
	for (let x = 0; x < SIZE; x++) {
		const i = (y * SIZE + x) * info.channels;
		const a = info.channels === 4 ? data[i + 3] : 255;
		if (a > 16) {
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
	}
}
const vbMatch = svg.match(/viewBox="([^"]+)"/);
const wMatch = svg.match(/width="([^"]+)"/);
const hMatch = svg.match(/height="([^"]+)"/);
const orig = vbMatch?.[1] ?? `0 0 ${wMatch?.[1] ?? SIZE} ${hMatch?.[1] ?? SIZE}`;
const [vx, vy, vw, vh] = orig.split(/\s+/).map(Number);
const sx = vw / SIZE;
const sy = vh / SIZE;
const cx = minX * sx + vx;
const cy = minY * sy + vy;
const cw = (maxX - minX + 1) * sx;
const ch = (maxY - minY + 1) * sy;
console.log(`${file.split('/').pop()}`);
console.log(`  orig: viewBox="${orig}"`);
console.log(`  bbox: ${cx.toFixed(2)} ${cy.toFixed(2)} ${cw.toFixed(2)} ${ch.toFixed(2)}`);

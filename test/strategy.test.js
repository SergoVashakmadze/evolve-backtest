import { test } from "node:test";
import assert from "node:assert/strict";
import { position } from "../src/strategy.js";

const walk = (n, seed = 1) => { let x = seed, p = 100; return Array.from({ length: n }, () => (p *= 1 + (((x = (x * 1103515245 + 12345) >>> 0) / 2 ** 32) - 0.5) * 0.02)); };

test("positions stay between -1 and 1", () => {
	const c = walk(400);
	for (let t = 1; t <= c.length; t++) { const p = position(c.slice(0, t)); assert.ok(Number.isFinite(p) && p >= -1 && p <= 1); }
});
test("it only looks at the past: the same history gives the same position", () => {
	const c = walk(300, 7);
	assert.equal(position(c.slice(0, 200)), position(walk(300, 7).slice(0, 200)));
});
test("it does not change the prices it is given", () => {
	const c = walk(120);
	const copy = [...c];
	position(c);
	assert.deepEqual(c, copy);
});

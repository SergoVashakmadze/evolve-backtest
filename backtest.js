// Prints `score: <annualised Sharpe ratio>` of src/strategy.js on one period. Higher is better.
// `node backtest.js in` scores 2015-2021 (the search); `node backtest.js out` scores 2022-2024 (held out).
// Trading costs 5 basis points per unit of position change. Synthetic data: not a real market.
import { readFileSync } from "node:fs";
import { position } from "./src/strategy.js";

const period = process.argv[2];
if (period !== "in" && period !== "out") throw new Error("usage: node backtest.js in|out");
const rows = readFileSync(new URL("./data/prices.csv", import.meta.url), "utf8").trim().split("\n").slice(1).map((l) => l.split(","));
const closes = rows.map((r) => Number(r[1]));
const start = rows.findIndex((r) => r[0] >= (period === "in" ? "2015-01-01" : "2022-01-01"));
const end = period === "in" ? rows.findIndex((r) => r[0] >= "2022-01-01") : rows.length;
const returns = [];
let prev = 0;
for (let t = start; t < end - 1; t++) {
	const p = Math.max(-1, Math.min(1, Number(position(closes.slice(0, t + 1))) || 0));
	returns.push(p * (closes[t + 1] / closes[t] - 1) - Math.abs(p - prev) * 0.0005);
	prev = p;
}
const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
const sd = Math.sqrt(returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length) || 1e-9;
console.log(`${period}: ${returns.length} days, mean daily return ${(mean * 100).toFixed(4)}%`);
console.log(`score: ${((mean / sd) * Math.sqrt(252)).toFixed(4)}`);

// The strategy: given closing prices up to and including today, return tomorrow's position,
// a number from -1 (fully short) to 1 (fully long). It must only look at the past.
// The starting point is a plain moving-average crossover.

export function position(closes) {
	const n = closes.length;
	if (n < 50) return 0;
	const avg = (k) => closes.slice(n - k).reduce((a, b) => a + b, 0) / k;
	return avg(10) > avg(50) ? 1 : -1;
}

# AGENTS.md

- Only `src/strategy.js` should change; keep `position(closes)` exported, returning -1..1, looking only at the past.
- `npm test` must pass. `npm run bench` prints `score: <Sharpe>` on 2015-2021; higher is better.
- `data/`, `backtest.js` and `package.json` are locked. No dependencies, no network, plain Node 24 ESM.

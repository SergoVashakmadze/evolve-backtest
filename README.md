# evolve-backtest

A toy trading strategy on synthetic prices, used as a fixture for the Evolve Arena's strategy-backtest preset on [iomarkets.dev](https://iomarkets.dev). Not investment advice; the prices are generated, not a real market.

- `npm test`: the strategy only looks at the past and returns positions from -1 to 1.
- `npm run bench`: Sharpe ratio on 2015–2021 (the search period).
- `npm run holdout`: Sharpe ratio on 2022–2024 (held out: scored once, at the end).
- Locked: `data/`, `backtest.js`, `package.json`. Only `src/strategy.js` should change.

MIT licensed.

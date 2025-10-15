# React streaming benchmark on workerd vs node

A benchmark to compare React (18.3.1) streaming rendering in workerd and Node.js.

Originally taken from the [`react-ssr-bench` benchmark from t3dotgg](https://github.com/t3dotgg/cf-vs-vercel-bench/tree/main/react-ssr-bench/cf-edition),
and modified to use streaming rendering instead of React's legacy `renderToString`.

(the math calculations have been removed to make this just measure rendering performance)

The React dependencies have been compiled down to a single shared file (`shared.js`) and function names de-minified (mostly) to help with profiling.

Setup:

```bash
npm install
```

Start the servers:

```bash
npm run workerd-high
```

```bash
npm run node-high
```

Run the benchmark:

```bash
npm run bench # or just `node runner.js`
```

## Options

You can run with lower heap settings using `npm run workerd-low` and `npm run node-low`.

In `runner.js` there are a few options:

```js
const ITERATIONS = 20; // how many requests to make
const CONCURRENCY = 1; // how many at once
const DISCARD_BODY = false; // pipe the body to an empty sink (ignore it) before responding
```

The `DISCARD_BODY` option can be useful to rule out (or investigate) differences in actual response streaming performance, as opposed to just the React streaming itself.

In `shared.js` there's another option:

```js
const VIEW_SIZE = 2048;
```

[This is a fixed value in React](https://github.com/facebook/react/blob/e7984651e4f123d8112f5abab39782ee70d8f4aa/packages/react-server/src/ReactServerStreamConfigNode.js#L41),
but it can be modified here to see how much of a difference a larger buffer (or rather fewer smaller buffers) gives.

## Profiling w/ Chrome DevTools

You can run `npm run workerd-inspect` or `npm run node-inspect` and then open Chrome DevTools at [chrome://inspect/#devices](chrome://inspect/#devices)

Under `Remote Target > localhost:9229` choose `inspect`

You can then record Performance (choose "Record" and then make some requests, can use `node runner.js` for this too) or Memory profiles, etc.

## Results

```bash
Node.js: v24.10.0
workerd: 1.20251011.0
OS: macOS 15.7
Iterations: 20
Concurrency: 1
```

### High Memory (`[workerd|node]-high`)

```bash
| Platform | Mean   | Min    | Max    | Variability |
|----------|--------|--------|--------|-------------|
| workerd  | 0.071s | 0.067s | 0.094s |      0.027s |
| node     | 0.028s | 0.025s | 0.050s |      0.025s |

**Winner:** node (2.52x faster)
```

### Low Memory (`[workerd|node]-low`)

```bash
| Platform | Mean   | Min    | Max    | Variability |
|----------|--------|--------|--------|-------------|
| workerd  | 0.078s | 0.072s | 0.099s |      0.027s |
| node     | 0.041s | 0.029s | 0.058s |      0.028s |

**Winner:** node (1.91x faster)
```

### Low Memory w/ `DISCARD_BODY = true`

```bash
| Platform | Mean   | Min    | Max    | Variability |
|----------|--------|--------|--------|-------------|
| workerd  | 0.053s | 0.051s | 0.085s |      0.034s |
| node     | 0.039s | 0.030s | 0.074s |      0.043s |

**Winner:** node (1.38x faster)
```

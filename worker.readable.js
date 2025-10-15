import { renderToReadableStream, createRoot } from "./shared.js";

// console.log = () => {};

export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname !== "/bench") {
      return new Response(null, { status: 404 });
    }

    const shouldDiscardBody = request.headers.get("x-discard-body") === "1";

    const start = performance.now();

    globalThis.reactTimings.numRequests++;

    const stream = await renderToReadableStream(createRoot(), {
      // https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225
      progressiveChunkSize: 12_800,
    });

    console.log("onShellReady", round(performance.now() - start));

    ctx.waitUntil(
      stream.allReady.then(() => {
        console.log("end", round(performance.now() - start));
        console.log(formatTimings());
      })
    );

    if (shouldDiscardBody) {
      ctx.waitUntil(
        (async () => {
          for await (const _ of stream) {
          }
        })()
      );
    }

    return new Response(shouldDiscardBody ? null : stream, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  },
};

function round(num) {
  return Math.round(num * 100) / 100;
}

function formatTimings() {
  const timings = { ...globalThis.reactTimings };
  for (const key in timings) {
    if (key === "numRequests") continue;
    timings[key] = round(timings[key] / globalThis.reactTimings.numRequests);
  }
  return timings;
}

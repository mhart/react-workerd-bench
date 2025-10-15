import { renderToPipeableStream, createRoot } from "./shared.js";

// console.log = () => {};

export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname !== "/bench") {
      return new Response(null, { status: 404 });
    }

    const shouldDiscardBody = request.headers.get("x-discard-body") === "1";

    const { promise: bodyPromise, resolve: resolveBody } =
      Promise.withResolvers();

    const start = performance.now();

    const { pipe } = renderToPipeableStream(createRoot(), {
      onShellReady() {
        console.log("onShellReady", round(performance.now() - start));

        resolveBody(
          new ReadableStream({
            type: "bytes",
            start(controller) {
              pipe({
                on(event, callback) {
                  if (event === "drain") {
                    callback();
                  }
                },
                write(chunk) {
                  if (!shouldDiscardBody) {
                    controller.enqueue(chunk);
                  }
                },
                end() {
                  console.log("end", round(performance.now() - start));
                  controller.close();
                },
                destroy(err) {
                  controller.error(err);
                },
              });
            },
          })
        );
      },
    });

    return new Response(await bodyPromise, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  },
};

function round(num) {
  return Math.round(num * 100) / 100;
}

import { Transform } from "node:stream";
import { createServer } from "node:http";
import { renderToPipeableStream, createRoot } from "./shared.js";

createServer(async (req, res) => {
  if (!req.url.endsWith("/bench")) {
    res.writeHead(404);
    return res.end();
  }

  const shouldDiscardBody = req.headers["x-discard-body"] === "1";

  const start = performance.now();

  const { pipe } = renderToPipeableStream(createRoot(), {
    onShellReady() {
      console.log("onShellReady", round(performance.now() - start));

      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });

      pipe(
        shouldDiscardBody
          ? new Transform({
              transform(_chunk, _encoding, callback) {
                callback();
              },
              final(callback) {
                res.end();
                callback();
              },
            })
          : res
      ).on("finish", () => {
        console.log("end", round(performance.now() - start));
      });
    },
  });
}).listen(3001, () => console.log("listening"));

function round(num) {
  return Math.round(num * 100) / 100;
}

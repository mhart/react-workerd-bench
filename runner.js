import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const WORKERD_URL = "http://localhost:3000/bench";
const NODE_URL = "http://localhost:3001/bench";

const ITERATIONS = 100;
const CONCURRENCY = 1;
const DISCARD_BODY = false;

async function measureResponseTime(url) {
  const start = performance.now();
  try {
    const response = await fetch(url, {
      headers: {
        "accept-encoding": "identity",
        "x-discard-body": DISCARD_BODY ? "1" : "0",
      },
    });
    const body = await response.arrayBuffer();

    const expectedLength = DISCARD_BODY ? 0 : 1985619;

    if (body.byteLength !== expectedLength) {
      throw new Error(
        `Unexpected body length: ${body.byteLength} (expected ${expectedLength})`
      );
    }

    const end = performance.now();
    const responseTime = end - start;

    return {
      time: responseTime,
      status: response.status,
      success: response.ok,
    };
  } catch (error) {
    return {
      time: null,
      status: null,
      success: false,
      error: error.message,
    };
  }
}

async function runBenchmark(url, name) {
  console.log(`\n🏃 Running benchmark for ${name}...`);
  console.log(`URL: ${url}`);
  console.log(`Discarding Body: ${DISCARD_BODY}\n`);
  console.log(`Iterations: ${ITERATIONS} (concurrency: ${CONCURRENCY})`);

  const results = [];
  let completed = 0;
  let nextIndex = 0;

  // Spawn a fixed number of workers; each pulls the next index until done
  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= ITERATIONS) break;
      const result = await measureResponseTime(url);
      results.push(result);
      completed++;
      process.stdout.write(`  Progress: ${completed}/${ITERATIONS}\r`);
    }
  }

  const workerCount = Math.min(CONCURRENCY, ITERATIONS);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);

  console.log(`\n`);

  // Analyze results
  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const times = successful.map((r) => r.time);

  // Count status codes
  const statusCodes = {};
  results.forEach((r) => {
    if (r.status !== null) {
      statusCodes[r.status] = (statusCodes[r.status] || 0) + 1;
    }
  });

  // Count error types
  const errors = {};
  failed.forEach((r) => {
    if (r.error) {
      errors[r.error] = (errors[r.error] || 0) + 1;
    }
  });

  const failureRate = (failed.length / results.length) * 100;

  if (times.length === 0) {
    console.log(`❌ No successful requests for ${name}`);
    console.log(`   Failure rate: ${failureRate.toFixed(2)}%`);
    if (Object.keys(statusCodes).length > 0) {
      console.log(`   Status codes:`, statusCodes);
    }
    if (Object.keys(errors).length > 0) {
      console.log(`   Errors:`, errors);
    }
    return null;
  }

  const min = Math.min(...times);
  const max = Math.max(...times);
  const mean = times.reduce((a, b) => a + b, 0) / times.length;

  return {
    min,
    max,
    mean,
    successful: successful.length,
    failed: failed.length,
    failureRate,
    statusCodes,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    times,
  };
}

function formatTime(ms) {
  return `${(ms / 1000).toFixed(3)}s`;
}

async function main() {
  console.log("=".repeat(60));
  console.log("  React Streaming Performance Benchmark: workerd vs node");
  console.log("=".repeat(60));

  const allResults = [];

  console.log("\n" + "-".repeat(60));
  console.log(`Test: `);
  console.log("-".repeat(60));

  const workerdResults = await runBenchmark(WORKERD_URL, `workerd`);
  const nodeResults = await runBenchmark(NODE_URL, `node`);

  console.log("=".repeat(60));
  console.log(`  RESULTS)`);
  console.log("=".repeat(60));

  if (workerdResults) {
    console.log("\n📊 workerd Results:");
    console.log(
      `  Successful requests: ${workerdResults.successful}/${ITERATIONS}`
    );
    if (workerdResults.failed > 0) {
      console.log(`  Failed requests: ${workerdResults.failed}/${ITERATIONS}`);
      console.log(`  Failure rate: ${workerdResults.failureRate.toFixed(2)}%`);
      console.log(`  Status codes:`, workerdResults.statusCodes);
      if (workerdResults.errors) {
        console.log(`  Errors:`, workerdResults.errors);
      }
    }
    console.log(`  Min:  ${formatTime(workerdResults.min)}`);
    console.log(`  Max:  ${formatTime(workerdResults.max)}`);
    console.log(`  Mean: ${formatTime(workerdResults.mean)}`);
  }

  if (nodeResults) {
    console.log("\n📊 node Results:");
    console.log(
      `  Successful requests: ${nodeResults.successful}/${ITERATIONS}`
    );
    if (nodeResults.failed > 0) {
      console.log(`  Failed requests: ${nodeResults.failed}/${ITERATIONS}`);
      console.log(`  Failure rate: ${nodeResults.failureRate.toFixed(2)}%`);
      console.log(`  Status codes:`, nodeResults.statusCodes);
      if (nodeResults.errors) {
        console.log(`  Errors:`, nodeResults.errors);
      }
    }
    console.log(`  Min:  ${formatTime(nodeResults.min)}`);
    console.log(`  Max:  ${formatTime(nodeResults.max)}`);
    console.log(`  Mean: ${formatTime(nodeResults.mean)}`);
  }

  if (workerdResults && nodeResults) {
    console.log("\n📈 Comparison:");
    const ratio = workerdResults.mean / nodeResults.mean;
    if (ratio > 1) {
      console.log(
        `  node is ${ratio.toFixed(2)}x faster than workerd (by mean)`
      );
    } else {
      console.log(
        `  workerd is ${(1 / ratio).toFixed(2)}x faster than node (by mean)`
      );
    }
  }

  console.log("\n" + "=".repeat(60));

  // Output final results summary for README
  console.log("\n\n" + "=".repeat(60));
  console.log("  FINAL RESULTS SUMMARY");
  console.log("=".repeat(60) + "\n");

  if (workerdResults && nodeResults) {
    const ratio = nodeResults.mean / workerdResults.mean;
    const winner = ratio > 1 ? "workerd" : "node";
    const speedup = ratio > 1 ? ratio : 1 / ratio;

    const workerdVariability = workerdResults.max - workerdResults.min;
    const nodeVariability = nodeResults.max - nodeResults.min;

    console.log(`| Platform | Mean   | Min    | Max    | Variability |`);
    console.log(`|----------|--------|--------|--------|-------------|`);
    console.log(
      `| workerd  | ${formatTime(workerdResults.mean)} | ${formatTime(
        workerdResults.min
      )} | ${formatTime(workerdResults.max)} |      ${formatTime(
        workerdVariability
      )} |`
    );
    console.log(
      `| node     | ${formatTime(nodeResults.mean)} | ${formatTime(
        nodeResults.min
      )} | ${formatTime(nodeResults.max)} |      ${formatTime(
        nodeVariability
      )} |`
    );
    console.log();
    console.log(`**Winner:** ${winner} (${speedup.toFixed(2)}x faster)`);
    console.log();
  }

  console.log("---");
  console.log(
    `\n*Benchmark run: ${
      new Date().toISOString().split("T")[0]
    } • ${ITERATIONS} iterations • Concurrency: ${CONCURRENCY} • Discard Body: ${DISCARD_BODY}*`
  );
  console.log("\n" + "=".repeat(60) + "\n");

  // Write consolidated results to results-(datetime).json inside results/ directory
  try {
    const resultsDir = path.resolve("results");
    await mkdir(resultsDir, { recursive: true });

    const timestamp = new Date().toISOString();
    const safeStamp = timestamp.replace(/[:.]/g, "-");
    const filePath = path.join(resultsDir, `results-${safeStamp}.json`);

    const summary = {
      timestamp,
      iterations: ITERATIONS,
      concurrency: CONCURRENCY,
      discardBody: DISCARD_BODY,
      result: {
        urls: { workerd: WORKERD_URL, node: NODE_URL },
        results: { workerd: workerdResults, node: nodeResults },
      },
    };

    await writeFile(filePath, JSON.stringify(summary, null, 2), "utf8");
    console.log(`📝 Results written to: ${filePath}`);
  } catch (err) {
    console.error("Failed to write results file:", err.message);
  }
}

main().catch(console.error);


using Workerd = import "/workerd/workerd.capnp";

const reactBenchConfig :Workerd.Config = (
  services = [ (name = "main", worker = .reactBench) ],

  sockets = [ ( name = "http", address = "*:3000", http = (), service = "main" ) ],

  # With this, Node.js is 1.9x faster
  v8Flags = ["--max-old-space-size=128", "--max-semi-space-size=8", "--single-threaded"]
);

const reactBench :Workerd.Worker = (
  modules = [
    (name = "worker.js", esModule = embed "worker.js"),
    (name = "shared.js", esModule = embed "shared.js")
  ],
  compatibilityDate = "2025-10-11",
);

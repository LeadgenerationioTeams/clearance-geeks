import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.PLACEHOLDER_CHECK_PORT ?? "3999";
const BASE = `http://127.0.0.1:${PORT}`;

/** Uppercase bracket placeholders such as [COMPANY NAME] — not markdown links. */
const BRACKET_PLACEHOLDER = /\[[A-Z][A-Z0-9 ]*\]/;

function findPlaceholder(text) {
  return text.match(BRACKET_PLACEHOLDER)?.[0] ?? null;
}

function assertClean(label, text) {
  const hit = findPlaceholder(text);
  if (hit) {
    throw new Error(`${label} contains bracket placeholder ${hit}`);
  }
}

function extractJsonLd(html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push(m[1]);
  }
  return out;
}

async function waitForServer(child, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited with code ${child.exitCode}`);
    }
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Timed out waiting for next start");
}

async function main() {
  const child = spawn("npx", ["next", "start", "-p", PORT], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let logs = "";
  child.stdout?.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr?.on("data", (chunk) => {
    logs += chunk.toString();
  });

  const stop = () => {
    if (!child.killed) child.kill("SIGTERM");
  };
  process.on("exit", stop);

  try {
    await waitForServer(child);

    const routes = [
      "/",
      "/privacy",
      "/terms",
      "/cookies",
      "/services",
      "/areas/stockport",
    ];

    for (const route of routes) {
      const html = await fetch(`${BASE}${route}`).then((res) => {
        if (!res.ok) throw new Error(`GET ${route} → ${res.status}`);
        return res.text();
      });
      assertClean(`HTML ${route}`, html);
      for (const block of extractJsonLd(html)) {
        assertClean(`JSON-LD on ${route}`, block);
      }
    }

    const llms = await fetch(`${BASE}/llms.txt`).then((res) => {
      if (!res.ok) throw new Error(`GET /llms.txt → ${res.status}`);
      return res.text();
    });
    assertClean("llms.txt", llms);

    console.log("Rendered placeholder check passed.");
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    if (logs) {
      console.error("--- next start log (tail) ---");
      console.error(logs.slice(-4000));
    }
    process.exitCode = 1;
  } finally {
    stop();
  }
}

main();

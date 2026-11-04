import { execSync, spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_BIN = join(ROOT, "node_modules", ".bin", "next");
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

async function waitForServer(child, timeoutMs = 60_000) {
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
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for next start");
}

async function pathsFromSitemap() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`GET /sitemap.xml → ${res.status}`);
  }
  const xml = await res.text();
  const paths = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    const pathname = new URL(match[1]).pathname;
    paths.push(pathname === "" ? "/" : pathname);
  }
  if (paths.length === 0) {
    throw new Error("sitemap.xml returned no URLs (is VERCEL_ENV=production set?)");
  }
  return paths;
}

function freePort(port) {
  for (const cmd of [
    `fuser -k ${port}/tcp 2>/dev/null`,
    `lsof -ti :${port} 2>/dev/null | xargs -r kill -9 2>/dev/null`,
  ]) {
    try {
      execSync(cmd, { shell: true, stdio: "ignore" });
    } catch {
      // no listener or tool unavailable
    }
  }
}

function stopServer(child) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    try {
      process.kill(child.pid, "SIGTERM");
    } catch {
      // already exited
    }
  }
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    try {
      process.kill(child.pid, "SIGKILL");
    } catch {
      // already exited
    }
  }
  freePort(PORT);
}

async function main() {
  freePort(PORT);

  const serverEnv = {
    ...process.env,
    NODE_ENV: "production",
    VERCEL_ENV: "production",
  };

  let logs = "";
  const child = spawn(NEXT_BIN, ["start", "-p", PORT], {
    cwd: ROOT,
    env: serverEnv,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout?.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr?.on("data", (chunk) => {
    logs += chunk.toString();
  });

  try {
    await waitForServer(child);

    const routes = await pathsFromSitemap();
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

    console.log(
      `Rendered placeholder check passed (${routes.length} sitemap routes + llms.txt).`,
    );
    stopServer(child);
    process.exit(0);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    if (logs) {
      console.error("--- next start log (tail) ---");
      console.error(logs.slice(-4000));
    }
    stopServer(child);
    process.exit(1);
  }
}

main();

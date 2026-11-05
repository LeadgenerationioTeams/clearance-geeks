import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_BIN = join(ROOT, "node_modules", ".bin", "next");
const EXPECTED_SITE_ORIGIN = "https://theclearancegeeks.co.uk";

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

function pickFreePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const port =
        address && typeof address === "object" ? address.port : undefined;
      probe.close((err) => {
        if (err) reject(err);
        else if (port) resolve(port);
        else reject(new Error("Could not allocate a free TCP port"));
      });
    });
  });
}

function processAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function waitForServer(base, child, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited with code ${child.exitCode}`);
    }
    try {
      const res = await fetch(`${base}/`);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for next start");
}

async function stopServer(child) {
  if (!child?.pid) return;

  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    try {
      process.kill(child.pid, "SIGTERM");
    } catch {
      return;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!processAlive(child.pid)) return;

  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    try {
      process.kill(child.pid, "SIGKILL");
    } catch {
      // already exited
    }
  }
}

async function loadStaticRoutePaths() {
  const json = execFileSync(
    "npx",
    ["--yes", "tsx", join(ROOT, "scripts/print-static-route-paths.ts")],
    { cwd: ROOT, encoding: "utf8", env: process.env },
  ).trim();
  return JSON.parse(json);
}

async function main() {
  const port =
    process.env.PLACEHOLDER_CHECK_PORT != null
      ? Number(process.env.PLACEHOLDER_CHECK_PORT)
      : await pickFreePort();
  const base = `http://127.0.0.1:${port}`;

  const routes = await loadStaticRoutePaths();

  const serverEnv = {
    ...process.env,
    NODE_ENV: "production",
  };

  const child = spawn(NEXT_BIN, ["start", "-p", String(port)], {
    cwd: ROOT,
    env: serverEnv,
    detached: true,
    stdio: "ignore",
  });
  child.unref();

  try {
    await waitForServer(base, child);

    for (const route of routes) {
      const html = await fetch(`${base}${route}`).then((res) => {
        if (!res.ok) throw new Error(`GET ${route} → ${res.status}`);
        return res.text();
      });
      assertClean(`HTML ${route}`, html);
      for (const block of extractJsonLd(html)) {
        assertClean(`JSON-LD on ${route}`, block);
      }
    }

    const llms = await fetch(`${base}/llms.txt`).then((res) => {
      if (!res.ok) throw new Error(`GET /llms.txt → ${res.status}`);
      return res.text();
    });
    assertClean("llms.txt", llms);

    const robots = await fetch(`${base}/robots.txt`).then((res) => {
      if (!res.ok) throw new Error(`GET /robots.txt → ${res.status}`);
      return res.text();
    });
    assertClean("robots.txt", robots);
    if (!robots.includes(`Sitemap: ${EXPECTED_SITE_ORIGIN}/sitemap.xml`)) {
      throw new Error(
        `robots.txt missing Sitemap: ${EXPECTED_SITE_ORIGIN}/sitemap.xml`,
      );
    }

    const sitemapXml = await fetch(`${base}/sitemap.xml`).then((res) => {
      if (!res.ok) throw new Error(`GET /sitemap.xml → ${res.status}`);
      return res.text();
    });
    assertClean("sitemap.xml", sitemapXml);
    const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(
      (match) => match[1],
    );
    if (sitemapLocs.length === 0) {
      throw new Error("sitemap.xml returned no <loc> entries");
    }
    for (const loc of sitemapLocs) {
      if (!loc.startsWith(`${EXPECTED_SITE_ORIGIN}/`) && loc !== EXPECTED_SITE_ORIGIN) {
        throw new Error(`sitemap.xml loc is not on ${EXPECTED_SITE_ORIGIN}: ${loc}`);
      }
      assertClean(`sitemap loc ${loc}`, loc);
    }

    console.log(
      `Rendered placeholder check passed (${routes.length} routes + llms.txt + robots + sitemap on port ${port}).`,
    );
    await stopServer(child);
    process.exit(0);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    await stopServer(child);
    process.exit(1);
  }
}

main();

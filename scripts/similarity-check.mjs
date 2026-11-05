import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const THRESHOLD = 0.4;

/** Fields that render as visible page copy (not code, not source registry). */
const VISIBLE_FIELDS = new Set([
  "summary",
  "accessNotes",
  "about",
  "accessNote",
  "intro",
  "headline",
  "question",
  "answer",
  "title",
  "body",
  "boroughLabel",
  "name",
]);

function tokenize(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 4),
  );
}

function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

/** Extract string literals that belong to visible fields in TS data files. */
function extractVisibleFromDataFile(filePath, idPrefix) {
  const text = readFileSync(filePath, "utf8");
  const pages = [];
  const slugBlocks = text.split(/\{\s*slug:\s*"/).slice(1);
  for (const block of slugBlocks) {
    const slug = block.match(/^([^"]+)/)?.[1] ?? "unknown";
    let visible = "";
    const keyValue =
      /(\w+):\s*\n?\s*"([^"]*)"/g;
    let m;
    while ((m = keyValue.exec(block)) !== null) {
      if (VISIBLE_FIELDS.has(m[1])) visible += ` ${m[2]}`;
    }
    const faqBlocks = block.matchAll(
      /question:\s*"([^"]*)"\s*,\s*answer:\s*"([^"]*)"/g,
    );
    for (const f of faqBlocks) {
      visible += ` ${f[1]} ${f[2]}`;
    }
    pages.push({ id: `${idPrefix}:${slug}`, tokens: tokenize(visible) });
  }
  return pages;
}

function extractNeighbourhoods() {
  const text = readFileSync(
    join(ROOT, "src/lib/neighbourhoods.ts"),
    "utf8",
  );
  const pages = [];
  const entries = text.split(/"([a-z]+:[a-z0-9-]+)":\s*\{/);
  for (let i = 1; i < entries.length; i += 2) {
    const key = entries[i];
    const block = entries[i + 1] ?? "";
    let visible = "";
    for (const m of block.matchAll(/(about|accessNote):\s*\n?\s*"([^"]*)"/g)) {
      visible += ` ${m[2]}`;
    }
    for (const m of block.matchAll(
      /question:\s*"([^"]*)"\s*,\s*answer:\s*"([^"]*)"/g,
    )) {
      visible += ` ${m[1]} ${m[2]}`;
    }
    pages.push({ id: `hood-override:${key}`, tokens: tokenize(visible) });
  }
  const defaults = text.matchAll(
    /about:\s*`([^`]+)`|about:\s*"([^"]+)"/g,
  );
  let idx = 0;
  for (const d of defaults) {
    const body = d[1] ?? d[2] ?? "";
    if (body.includes("neighbourhood within")) {
      pages.push({ id: `hood-default:${idx++}`, tokens: tokenize(body) });
    }
  }
  return pages;
}

function extractServices() {
  return extractVisibleFromDataFile(
    join(ROOT, "src/lib/services.ts"),
    "service",
  );
}

function extractAreas() {
  return extractVisibleFromDataFile(join(ROOT, "src/config/site.ts"), "area");
}

function compareGroup(label, pages) {
  let worst = { a: "", b: "", score: 0 };
  const failures = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      if (pages[i].tokens.size < 8 || pages[j].tokens.size < 8) continue;
      const score = jaccard(pages[i].tokens, pages[j].tokens);
      if (score > worst.score)
        worst = { a: pages[i].id, b: pages[j].id, score };
      if (score > THRESHOLD) {
        failures.push({ a: pages[i].id, b: pages[j].id, score });
      }
    }
  }
  console.log(
    `${label}: ${pages.length} units, worst ${(worst.score * 100).toFixed(1)}% (${worst.a} vs ${worst.b})`,
  );
  return failures;
}

const failures = [
  ...compareGroup("Areas (visible fields)", extractAreas()),
  ...compareGroup("Services (visible fields)", extractServices()),
  ...compareGroup("Neighbourhood overrides", extractNeighbourhoods()),
];

if (failures.length) {
  console.error(`FAIL: ${failures.length} pairs exceed ${THRESHOLD * 100}%`);
  for (const f of failures.slice(0, 20)) {
    console.error(
      `  ${f.a} <-> ${f.b}: ${(f.score * 100).toFixed(1)}%`,
    );
  }
  process.exit(1);
}

console.log("Similarity check passed (visible copy only).");

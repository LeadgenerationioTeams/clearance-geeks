import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const THRESHOLD = 0.4;

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

function extractAreas() {
  const file = readFileSync(join(ROOT, "src/lib/areas.ts"), "utf8");
  const blocks = file.split(/\{\s*slug:\s*"/).slice(1);
  return blocks.map((block) => {
    const slug = block.match(/^([^"]+)/)?.[1] ?? "unknown";
    const grab = (key) => {
      const re = new RegExp(`${key}:\\s*\\n?\\s*"([^"]*)"`, "g");
      const multi = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`, "m");
      let text = "";
      for (const m of block.matchAll(re)) text += ` ${m[1]}`;
      const arr = block.match(multi);
      if (arr) {
        text += arr[1].replace(/"/g, " ");
      }
      return text;
    };
    const body = [
      grab("summary"),
      grab("housingNotes"),
      grab("localParagraphs"),
      grab("typicalJobs"),
      grab("hwrcNote"),
      grab("question"),
      grab("answer"),
    ].join(" ");
    return { id: `area:${slug}`, tokens: tokenize(body) };
  });
}

function extractServices() {
  const file = readFileSync(join(ROOT, "src/lib/services.ts"), "utf8");
  const blocks = file.split(/\{\s*slug:\s*"/).slice(1);
  return blocks.map((block) => {
    const slug = block.match(/^([^"]+)/)?.[1] ?? "unknown";
    const strings = [...block.matchAll(/"([^"]{20,})"/g)].map((m) => m[1]);
    return { id: `service:${slug}`, tokens: tokenize(strings.join(" ")) };
  });
}

function extractTownServiceBlurbs() {
  const file = readFileSync(join(ROOT, "src/lib/areas.ts"), "utf8");
  const blurbs = [...file.matchAll(/"([a-z]+:[a-z-]+)":\s*\n\s*"([^"]+)"/g)];
  return blurbs.map((m) => ({
    id: `town-service:${m[1]}`,
    tokens: tokenize(m[2]),
  }));
}

function compareGroup(label, pages) {
  let worst = { a: "", b: "", score: 0 };
  const failures = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const score = jaccard(pages[i].tokens, pages[j].tokens);
      if (score > worst.score)
        worst = { a: pages[i].id, b: pages[j].id, score };
      if (score > THRESHOLD) {
        failures.push({
          a: pages[i].id,
          b: pages[j].id,
          score,
        });
      }
    }
  }
  console.log(
    `${label}: ${pages.length} pages, worst ${(worst.score * 100).toFixed(1)}% (${worst.a} vs ${worst.b})`,
  );
  return failures;
}

const failures = [
  ...compareGroup("Areas", extractAreas()),
  ...compareGroup("Services", extractServices()),
  ...compareGroup("Town×service blurbs", extractTownServiceBlurbs()),
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

console.log("Similarity check passed.");

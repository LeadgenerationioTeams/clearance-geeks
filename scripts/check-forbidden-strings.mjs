import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const FORBIDDEN = [
  "Undisputed",
  "C1 Clearance",
  "17356878",
  "16791562",
  "Swan Street",
];

const SELF = "check-forbidden-strings.mjs";

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "playwright-report",
  "test-results",
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (!name.endsWith(".png") && !name.endsWith(".jpg")) files.push(p);
  }
  return files;
}

const hits = [];
for (const file of walk(ROOT)) {
  if (file.endsWith(SELF)) continue;
  const text = readFileSync(file, "utf8");
  for (const term of FORBIDDEN) {
    if (text.includes(term)) {
      hits.push({ file: relative(ROOT, file), term });
    }
  }
}

if (hits.length) {
  console.error("Forbidden strings found:");
  for (const h of hits) {
    console.error(`  ${h.term} in ${h.file}`);
  }
  process.exit(1);
}

console.log("Forbidden-string check passed.");

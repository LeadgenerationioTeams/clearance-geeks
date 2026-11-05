#!/usr/bin/env node
/**
 * Verify neighbourhood pages and on-page images return HTTP 200.
 * Usage: npm run build && npm run start -- -p 3010 &
 *        node scripts/verify-neighbourhood-images.mjs http://127.0.0.1:3010
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://127.0.0.1:3010").replace(/\/$/, "");

const serviceSlugs = new Set([
  "house-clearance",
  "garden-waste",
  "office-commercial-clearance",
  "general-junk-rubbish-removal",
  "single-item-collection",
  "builders-waste",
]);

/** @type {string[]} */
let paths = [];

try {
  const json = execSync(
    `npx tsx -e "import { neighbourhoods } from './src/lib/neighbourhoods.ts'; console.log(JSON.stringify(neighbourhoods.map((n) => '/areas/' + n.areaSlug + '/' + n.slug)))"`,
    { cwd: process.cwd(), encoding: "utf8" },
  ).trim();
  paths = JSON.parse(json);
} catch {
  const sitemap = readFileSync(
    `${process.cwd()}/.next/server/app/sitemap.xml.body`,
    "utf8",
  );
  const re = /<loc>[^<]*\/areas\/([^/]+)\/([^/<]+)<\/loc>/g;
  const hoodPaths = new Set();
  let m;
  while ((m = re.exec(sitemap))) {
    const [, area, sub] = m;
    if (!serviceSlugs.has(sub)) hoodPaths.add(`/areas/${area}/${sub}`);
  }
  paths = [...hoodPaths];
}

if (paths.length < 10) {
  console.error(`Expected at least 10 neighbourhood paths, got ${paths.length}`);
  process.exit(1);
}

function extractNextImageRequests(html) {
  const reqs = [];
  const re = /\/_next\/image\?[^"'\s)]+/g;
  let m;
  while ((m = re.exec(html))) {
    reqs.push(m[0].replaceAll("&amp;", "&"));
  }
  return [...new Set(reqs)];
}

function extractLocalImageSrcs(html) {
  const srcs = [];
  const re = /<img[^>]+src="(\/[^"?]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    srcs.push(m[1]);
  }
  return [...new Set(srcs)];
}

/** Verify every neighbourhood page (minimum 10 enforced above). */
const sample = paths;

let failed = false;

for (const path of sample) {
  let pageFailed = false;
  const pageRes = await fetch(`${base}${path}`);
  if (!pageRes.ok) {
    console.error(`FAIL page ${path} -> ${pageRes.status}`);
    failed = true;
    continue;
  }
  const html = await pageRes.text();

  for (const req of extractNextImageRequests(html)) {
    const imgRes = await fetch(`${base}${req}`);
    if (!imgRes.ok) {
      console.error(`FAIL ${path} ${req} -> ${imgRes.status}`);
      pageFailed = true;
    }
  }

  for (const src of extractLocalImageSrcs(html)) {
    const imgRes = await fetch(`${base}${src}`);
    if (!imgRes.ok) {
      console.error(`FAIL ${path} ${src} -> ${imgRes.status}`);
      pageFailed = true;
    }
  }

  if (pageFailed) failed = true;
  else console.log(`OK ${path}`);
}

if (failed) process.exit(1);
console.log(
  `Verified ${sample.length} neighbourhood pages (of ${paths.length} total).`,
);

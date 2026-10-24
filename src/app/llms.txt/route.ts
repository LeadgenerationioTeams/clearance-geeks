import { readFileSync } from "node:fs";
import { join } from "node:path";

export function GET() {
  const body = readFileSync(
    join(process.cwd(), "public/llms.txt"),
    "utf8",
  );
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

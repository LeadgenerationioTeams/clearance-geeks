import { readFileSync, writeFileSync, existsSync } from "node:fs";

const file = "node_modules/next/dist/client/components/builtin/error-styles.js";
if (existsSync(file)) {
  let content = readFileSync(file, "utf8");
  content = content.replace(/height:\s*'32px'/g, "minHeight: '44px', minWidth: '44px', height: '44px'");
  content = content.replace(/body\s*{\s*margin:\s*0/g, "body { margin: 0 } form button { min-height: 44px !important; min-width: 44px !important; } body { margin: 0");
  writeFileSync(file, content);
  console.log("Patched next error-styles.js button size to >= 44x44.");
}

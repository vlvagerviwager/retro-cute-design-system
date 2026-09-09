/*
 * No-magic-values guard.
 * Fails if raw hex colors or px/rem literals appear outside the token
 * sources (tokens.css, tokens.ts). Components and pages must use
 * var(--rc-*) references or Tailwind theme utilities instead.
 */
import { Glob } from "bun";

const TOKEN_SOURCE_BASENAMES = new Set(["tokens.css", "tokens.ts"]);
const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;
const CSS_LENGTH_PATTERN = /\b\d+(\.\d+)?(px|r?em)\b/;

const SCAN_PATTERNS = ["src/**/*.{ts,css,html}", "index.html", "components/**/*.html"];

async function collectFiles(): Promise<string[]> {
  const foundFiles: string[] = [];
  for (const scanPattern of SCAN_PATTERNS) {
    const glob = new Glob(scanPattern);
    for await (const filePath of glob.scan({ cwd: import.meta.dir + "/..", absolute: true })) {
      const fileName = filePath.split("/").at(-1) ?? "";
      if (TOKEN_SOURCE_BASENAMES.has(fileName)) {
        continue;
      }
      // check-no-magic.ts itself is allowed to mention patterns in comments/strings
      if (fileName === "check-no-magic.ts") {
        continue;
      }
      foundFiles.push(filePath);
    }
  }
  return [...new Set(foundFiles)];
}

async function main(): Promise<void> {
  const violations: string[] = [];
  for (const filePath of await collectFiles()) {
    let fileContent = await Bun.file(filePath).text();
    if (filePath.endsWith(".html")) {
      // Docs pages show token values inside <pre>/<code> samples; those
      // are documentation of the tokens, not magic values in styling.
      fileContent = fileContent.replace(/<pre[\s\S]*?<\/pre>/g, "<pre></pre>");
    }
    const fileLines = fileContent.split("\n");
    fileLines.forEach((lineContent, lineIndex) => {
      const trimmedLine = lineContent.trim();
      if (trimmedLine.startsWith("*") || trimmedLine.startsWith("//")) {
        return;
      }
      // theme-color meta must carry a literal hex for the browser chrome.
      if (trimmedLine.includes('name="theme-color"')) {
        return;
      }
      if (HEX_COLOR_PATTERN.test(lineContent) || CSS_LENGTH_PATTERN.test(lineContent)) {
        violations.push(`${filePath}:${lineIndex + 1}: ${trimmedLine}`);
      }
    });
  }
  if (violations.length > 0) {
    console.error("No-magic-values check failed. Move these literals into tokens.css / tokens.ts:");
    for (const violation of violations) {
      console.error(`  ${violation}`);
    }
    process.exit(1);
  }
  console.log("No-magic-values check passed.");
}

await main();

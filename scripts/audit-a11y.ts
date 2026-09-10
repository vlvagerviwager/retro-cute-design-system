/* Accessibility audit: builds the site, serves dist/, runs pa11y-ci
 * (WCAG2AA over both pages, desktop and mobile widths), then stops the
 * server. Exits nonzero when violations are found. The serve port is read
 * from .pa11yci.json so the two can never drift apart. */
import { join } from "node:path";

const repoRoot = join(import.meta.dir, "..");
const distDir = join(repoRoot, "dist");

const pa11yConfig = await Bun.file(join(repoRoot, ".pa11yci.json")).json();
const firstEntry = pa11yConfig.urls[0] as string | { url: string };
const firstUrl = typeof firstEntry === "string" ? firstEntry : firstEntry.url;
const auditPort = Number(new URL(firstUrl).port);

await Bun.$`bun run build`.cwd(repoRoot);

const server = Bun.serve({
  port: auditPort,
  async fetch(request) {
    const requestPath = new URL(request.url).pathname;
    const filePath = requestPath.endsWith("/")
      ? join(distDir, requestPath, "index.html")
      : join(distDir, requestPath);
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Auditing ${distDir} on port ${auditPort}...`);
try {
  await Bun.$`bunx pa11y-ci --config .pa11yci.json`.cwd(repoRoot);
  console.log("pa11y audit passed.");
} finally {
  server.stop(true);
}

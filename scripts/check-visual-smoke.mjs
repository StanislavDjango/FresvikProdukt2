import { execFile, execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const baseUrl = process.env.VISUAL_CHECK_BASE_URL || "http://127.0.0.1:3000";
const browserBaseUrl = process.env.VISUAL_CHECK_BROWSER_BASE_URL || baseUrl;
const outputDir =
  process.env.VISUAL_CHECK_OUTPUT_DIR || ".generated/visual-smoke";

const pages = [
  "/",
  "/produkt",
  "/produkt/fresvik-pir-panel",
  "/tenester",
  "/dokumentasjon",
  "/kundeservice/faq",
  "/referansar",
  "/tilsette",
  "/kontakt",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const forbiddenPublicText = [
  "Migreringsstatus",
  "Gammal kjelde",
  "Gjenstår å kvalitetssikre",
  "TODO:",
];

const browserCandidates = [
  process.env.BROWSER_BIN,
  "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
  "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

function findBrowser() {
  return browserCandidates.find((candidate) => existsSync(candidate));
}

function toBrowserPath(filePath) {
  const absolutePath = resolve(filePath);

  if (!browserBin.startsWith("/mnt/c/")) {
    return absolutePath;
  }

  return execFileSync("wslpath", ["-w", absolutePath], {
    encoding: "utf8",
  }).trim();
}

function pageSlug(path) {
  if (path === "/") return "home";
  return path.replace(/^\/+/, "").replace(/[^a-z0-9]+/gi, "-").replace(/-$/, "");
}

async function fetchHtml(path) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return response.text();
}

function assertRenderedHtml(path, html) {
  const failures = [];

  if (!/<header[\s>]/i.test(html)) {
    failures.push("missing <header>");
  }

  if (!/<footer[\s>]/i.test(html)) {
    failures.push("missing <footer>");
  }

  if (!/<h1[\s>][\s\S]*?<\/h1>/i.test(html)) {
    failures.push("missing <h1>");
  }

  if (!/<main[\s>]/i.test(html)) {
    failures.push("missing <main>");
  }

  for (const forbidden of forbiddenPublicText) {
    if (html.includes(forbidden)) {
      failures.push(`public page exposes "${forbidden}"`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`${path}: ${failures.join(", ")}`);
  }
}

async function captureScreenshot(browserBin, path, viewport) {
  const filePath = `${outputDir}/${pageSlug(path)}-${viewport.name}.png`;
  const screenshotPath = toBrowserPath(filePath);
  const url = new URL(path, browserBaseUrl).toString();

  await execFileAsync(
    browserBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--force-device-scale-factor=1",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--window-size=${viewport.width},${viewport.height}`,
      `--screenshot=${screenshotPath}`,
      url,
    ],
    { timeout: 45_000 },
  );

  const info = await stat(filePath);
  if (info.size < 10_000) {
    throw new Error(`${filePath} looks too small (${info.size} bytes)`);
  }

  return filePath;
}

async function assertBrowserCanRender(browserBin, path) {
  const url = new URL(path, browserBaseUrl).toString();
  const { stdout } = await execFileAsync(
    browserBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--force-device-scale-factor=1",
      "--no-first-run",
      "--no-default-browser-check",
      "--dump-dom",
      url,
    ],
    { timeout: 45_000 },
  );

  if (!stdout.includes("Fresvik") || !/<h1[\s>][\s\S]*?<\/h1>/i.test(stdout)) {
    throw new Error(`${path}: browser did not render the Fresvik page`);
  }

  for (const forbidden of forbiddenPublicText) {
    if (stdout.includes(forbidden)) {
      throw new Error(`${path}: browser exposes "${forbidden}"`);
    }
  }
}

const browserBin = findBrowser();
if (!browserBin) {
  console.error(
    "No headless browser found. Set BROWSER_BIN to Edge, Chrome, or Chromium.",
  );
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const screenshots = [];
for (const path of pages) {
  const html = await fetchHtml(path);
  assertRenderedHtml(path, html);
  await assertBrowserCanRender(browserBin, path);

  for (const viewport of viewports) {
    screenshots.push(await captureScreenshot(browserBin, path, viewport));
  }
}

console.log(
  `Captured ${screenshots.length} screenshots for ${pages.length} pages with ${browserBin}.`,
);
console.log(`Fetched HTML from ${baseUrl}. Browser screenshots used ${browserBaseUrl}.`);
console.log(`Screenshots written to ${outputDir}.`);

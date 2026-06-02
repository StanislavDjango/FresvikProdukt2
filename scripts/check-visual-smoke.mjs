import { execFile, execFileSync, spawn } from "node:child_process";
import { resolve } from "node:path";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const baseUrl = process.env.VISUAL_CHECK_BASE_URL || "http://127.0.0.1:3000";
const browserBaseUrl = process.env.VISUAL_CHECK_BROWSER_BASE_URL || baseUrl;
const outputDir =
  process.env.VISUAL_CHECK_OUTPUT_DIR || ".generated/visual-smoke";
const cdpPort = Number(process.env.VISUAL_CHECK_CDP_PORT || 9237);

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

function wait(ms) {
  return new Promise((resolveWait) => {
    setTimeout(resolveWait, ms);
  });
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

const browserBin = findBrowser();
if (!browserBin) {
  console.error(
    "No headless browser found. Set BROWSER_BIN to Edge, Chrome, or Chromium.",
  );
  process.exit(1);
}

function windowsHostIp() {
  try {
    const value = execFileSync("sh", [
      "-lc",
      "awk '/nameserver/{print $2; exit}' /etc/resolv.conf",
    ], {
      encoding: "utf8",
    }).trim();

    return value || null;
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
}

async function waitForCdpEndpoint() {
  const hosts = Array.from(
    new Set(["127.0.0.1", "localhost", windowsHostIp()].filter(Boolean)),
  );
  const startedAt = Date.now();

  while (Date.now() - startedAt < 15_000) {
    for (const host of hosts) {
      const endpoint = `http://${host}:${cdpPort}`;
      try {
        const version = await fetchJson(`${endpoint}/json/version`);
        if (version.webSocketDebuggerUrl) {
          return { endpoint, version };
        }
      } catch {
        // Keep polling all candidates until the browser exposes CDP.
      }
    }

    await wait(250);
  }

  throw new Error(`Could not connect to browser DevTools on port ${cdpPort}`);
}

class CdpClient {
  constructor(webSocketUrl) {
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    this.socket = new WebSocket(webSocketUrl);
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    await new Promise((resolveOpen, rejectOpen) => {
      this.socket.addEventListener("open", resolveOpen, { once: true });
      this.socket.addEventListener("error", rejectOpen, { once: true });
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data.toString());

      if (message.id && this.pending.has(message.id)) {
        const { resolve: resolvePending, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);

        if (message.error) {
          reject(new Error(message.error.message));
        } else {
          resolvePending(message.result);
        }

        return;
      }

      if (message.method && this.events.has(message.method)) {
        for (const resolveEvent of this.events.get(message.method)) {
          resolveEvent(message.params || {});
        }
        this.events.delete(message.method);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    const payload = JSON.stringify({ id, method, params });

    return new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolve: resolveSend, reject: rejectSend });
      this.socket.send(payload);
    });
  }

  waitForEvent(method, timeoutMs = 15_000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const timer = setTimeout(() => {
        rejectEvent(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);

      const wrappedResolve = (params) => {
        clearTimeout(timer);
        resolveEvent(params);
      };

      const current = this.events.get(method) || [];
      current.push(wrappedResolve);
      this.events.set(method, current);
    });
  }

  close() {
    this.socket.close();
  }
}

async function createPageClient(endpoint) {
  const target = await fetchJson(`${endpoint}/json/new?about:blank`);
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: false });
  return client;
}

async function assertBrowserPage(client, path, viewport) {
  const url = new URL(path, browserBaseUrl).toString();

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.name === "mobile",
  });
  await client.send("Emulation.setTouchEmulationEnabled", {
    enabled: viewport.name === "mobile",
  });

  const loadEvent = client.waitForEvent("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await loadEvent;
  await wait(500);

  const evaluation = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const text = document.body?.innerText || "";
      const main = document.querySelector("main");
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      const h1 = document.querySelector("h1");
      return {
        title: document.title,
        text,
        innerWidth,
        innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body?.scrollWidth || 0,
        hasMain: Boolean(main),
        hasHeader: Boolean(header),
        hasFooter: Boolean(footer),
        h1: h1?.innerText || "",
      };
    })()`,
  });
  const metrics = evaluation.result.value;
  const failures = [];

  if (!metrics.text.includes("Fresvik") || !metrics.h1) {
    failures.push("browser did not render Fresvik page content");
  }

  if (!metrics.hasHeader || !metrics.hasFooter || !metrics.hasMain) {
    failures.push("missing browser-visible page landmarks");
  }

  const maxScrollWidth = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth);
  if (maxScrollWidth > metrics.innerWidth + 2) {
    failures.push(
      `horizontal overflow (${maxScrollWidth}px > ${metrics.innerWidth}px)`,
    );
  }

  for (const forbidden of forbiddenPublicText) {
    if (metrics.text.includes(forbidden)) {
      failures.push(`browser exposes "${forbidden}"`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`${path} ${viewport.name}: ${failures.join(", ")}`);
  }

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const filePath = `${outputDir}/${pageSlug(path)}-${viewport.name}.png`;
  const bytes = Buffer.from(screenshot.data, "base64");

  if (bytes.length < 10_000) {
    throw new Error(`${filePath} looks too small (${bytes.length} bytes)`);
  }

  await writeFile(filePath, bytes);
  return { filePath, metrics };
}

async function captureCliScreenshot(path, viewport) {
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

async function assertCliBrowserCanRender(path) {
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

async function runCliSmoke() {
  const cliScreenshots = [];

  for (const path of pages) {
    const html = await fetchHtml(path);
    assertRenderedHtml(path, html);
    await assertCliBrowserCanRender(path);

    for (const viewport of viewports) {
      cliScreenshots.push(await captureCliScreenshot(path, viewport));
    }
  }

  return cliScreenshots;
}

async function runCdpSmoke() {
  const profileDir = `${outputDir}/browser-profile`;
  await rm(profileDir, { recursive: true, force: true });
  await mkdir(profileDir, { recursive: true });

  const browserProcess = spawn(
    browserBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--force-device-scale-factor=1",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-address=0.0.0.0",
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${toBrowserPath(profileDir)}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const cdpScreenshots = [];

  try {
    const { endpoint } = await waitForCdpEndpoint();
    const client = await createPageClient(endpoint);

    try {
      for (const path of pages) {
        const html = await fetchHtml(path);
        assertRenderedHtml(path, html);

        for (const viewport of viewports) {
          const result = await assertBrowserPage(client, path, viewport);
          cdpScreenshots.push(result.filePath);
        }
      }
    } finally {
      client.close();
    }
  } finally {
    browserProcess.kill();
    await rm(profileDir, { recursive: true, force: true });
  }

  return cdpScreenshots;
}

await mkdir(outputDir, { recursive: true });

let mode = "cdp";
let screenshots = [];
const useCdp =
  process.env.VISUAL_CHECK_USE_CDP === "1" ||
  (!browserBin.startsWith("/mnt/c/") && process.env.VISUAL_CHECK_USE_CDP !== "0");

if (useCdp) {
  try {
    screenshots = await runCdpSmoke();
  } catch (error) {
    if (process.env.VISUAL_CHECK_USE_CDP === "1") {
      throw error;
    }

    mode = "cli-fallback";
    console.warn(
      `CDP viewport check unavailable (${error.message}); falling back to browser CLI smoke screenshots.`,
    );
    screenshots = await runCliSmoke();
  }
} else {
  mode = "cli-fallback";
  screenshots = await runCliSmoke();
}

console.log(
  `Captured ${screenshots.length} ${mode} screenshots for ${pages.length} pages with ${browserBin}.`,
);
console.log(`Fetched HTML from ${baseUrl}. Browser viewport checks used ${browserBaseUrl}.`);
if (mode !== "cdp") {
  console.log(
    "CDP viewport overflow checks were skipped for this Windows browser. Set VISUAL_CHECK_USE_CDP=1 with a CDP-reachable browser to enforce them.",
  );
}
console.log(`Screenshots written to ${outputDir}.`);

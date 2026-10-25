/* =====================================================================
   THE PAUSE BUTTON: ON THE TIMED GAMES ONLY, AND IT WORKS.

   The owner, 25 October 2026: fix it, and take it off the games with no
   clock. On Blitz, Match and Memory the button shows its icon (it used
   to draw 0 wide, so the button looked empty) and the word Pause; the
   clock stops while paused and runs again after Resume; the word meets
   AAA on painted pixels (7:1). On Flashcards and Test there is no pause
   button, and Escape puts up no pause screen.

   node verify/pause.mjs                the check
   node verify/pause.mjs --plant=NAME   must FAIL: zeroicon | noword |
                    clockruns | stillontest | escape
   ===================================================================== */
let chromium;
try { ({ chromium } = await import("playwright")); }
catch (e) { ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs")); }
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };
const PLANT = (process.argv.find((a) => a.startsWith("--plant=")) || "").slice(8);
const PLANTS = {
  zeroicon: [["css/styles.css", "#pause-btn svg { width: 20px; height: 20px; flex: none; }", ""]],
  noword: [["pages/blitz.html", 'ICONS.pause + " <span>Pause</span>";', "ICONS.pause;"]],
  clockruns: [["pages/blitz.html", "      if (pauseCtl.paused) return;\n      timeLeft--;", "      timeLeft--;"]],
  stillontest: [["pages/test.html", '        <div class="hud-stat"><span>Score</span><span id="hud-score">0</span></div>\n', '        <div class="hud-stat"><span>Score</span><span id="hud-score">0</span></div>\n        <button class="btn btn-ghost" id="pause-btn" aria-label="Pause"></button>\n']],
  escape: [["pages/flashcards.html", "    render();\n  </script>", "    new PauseController();\n    render();\n  </script>"]]
};
if (PLANT && !PLANTS[PLANT]) { console.log("no plant called " + PLANT); process.exit(2); }

const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  const rel = u === "/" ? "index.html" : u.slice(1), p = join(ROOT, rel);
  if (!existsSync(p)) { res.writeHead(404); res.end("no"); return; }
  let body = readFileSync(p);
  for (const [file, from, to] of PLANT ? PLANTS[PLANT] : []) {
    if (file !== rel) continue;
    const t = body.toString();
    if (t.split(from).length !== 2) { console.log("PLANT DID NOT APPLY: " + PLANT + " (its anchor isn't in " + rel + " exactly once)"); process.exit(3); }
    body = Buffer.from(t.replace(from, to));
  }
  res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" });
  res.end(body);
});
await new Promise((r) => srv.listen(0, r));
const base = "http://127.0.0.1:" + srv.address().port + "/";
const br = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--headless=new"] });
const bad = [], errs = [];
let checks = 0;
const check = (ok, what) => { checks++; if (!ok) bad.push(what); };
const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

/* the word's contrast on painted pixels: the glyphs hidden, the ground under the word photographed, its darkest and lightest pixels */
async function wordContrast(pg) {
  const box = await pg.evaluate(() => { const s = document.querySelector("#pause-btn span"); if (!s) return null; const r = s.getBoundingClientRect(), c = getComputedStyle(s).color.match(/[\d.]+/g).map(Number); return { x: r.x, y: r.y, w: r.width, h: r.height, fg: c.slice(0, 3) }; });
  if (!box) return null;
  await pg.addStyleTag({ content: "#pause-btn, #pause-btn * { color: transparent !important; } #pause-btn svg { visibility: hidden !important; }" });
  const shot = await pg.screenshot({ clip: { x: box.x, y: box.y, width: Math.max(1, box.w), height: Math.max(1, box.h) } });
  await pg.evaluate(() => { const s = [...document.querySelectorAll("style")].pop(); if (s && /pause-btn/.test(s.textContent)) s.remove(); });
  const px = await pg.evaluate(async (b64) => { const img = new Image(); await new Promise((ok) => { img.onload = ok; img.src = "data:image/png;base64," + b64; }); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const g = c.getContext("2d"); g.drawImage(img, 0, 0); const d = g.getImageData(0, 0, c.width, c.height).data, out = []; for (let i = 0; i < d.length; i += 4) out.push([d[i], d[i + 1], d[i + 2]]); return out; }, shot.toString("base64"));
  return Math.min(...px.map((p) => ratio(box.fg, p)));
}

for (const theme of ["light", "dark"]) for (const g of ["blitz", "match", "memory"]) {
  const pg = await br.newPage({ viewport: { width: 1100, height: 900 } }); pg.setDefaultTimeout(5000); pg.on("pageerror", (e) => errs.push(g + ": " + e.message));
  await pg.goto(base + "pages/" + g + ".html", { waitUntil: "networkidle" });
  await pg.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
  if (await pg.$("#start-btn")) await pg.click("#start-btn").catch(() => {});
  const tag = g + " (" + theme + "): ";
  try {
    const b = await pg.evaluate(() => { const x = document.getElementById("pause-btn"), s = x && x.querySelector("svg"); return x ? { text: x.textContent.trim(), icon: s ? Math.round(s.getBoundingClientRect().width) : 0, shown: x.getBoundingClientRect().width > 0 } : null; });
    check(!!b && b.shown, tag + "the pause button is there");
    check(!!b && b.icon >= 16, tag + "its icon is drawn (" + (b && b.icon) + " px wide)");
    check(!!b && b.text === "Pause", tag + "it says Pause (" + (b && JSON.stringify(b.text)) + ")");
    const cr = await wordContrast(pg);
    check(cr !== null && cr >= 7, tag + "the word Pause meets 7:1 on painted pixels (" + (cr === null ? "no word" : cr.toFixed(2) + ":1") + ")");
    if (theme === "light") {   /* the clock, once: it stops while paused and runs again after Resume */
      const clock = () => pg.$eval("#hud-time", (n) => n.textContent);
      await pg.waitForTimeout(1200);
      await pg.click("#pause-btn");
      check(await pg.$eval("#pause-overlay", (n) => !n.hidden), tag + "Pause puts up the pause screen");
      const t0 = await clock(); await pg.waitForTimeout(2300); const t1 = await clock();
      check(t0 === t1, tag + "the clock stops while paused (" + t0 + " then " + t1 + ")");
      await pg.click("#pause-resume-btn");
      check(await pg.$eval("#pause-overlay", (n) => n.hidden), tag + "Resume takes the pause screen away");
      await pg.waitForTimeout(2300);
      check((await clock()) !== t1, tag + "the clock runs again after Resume");
    }
  } catch (e) { check(false, tag + "stopped: " + String(e.message).split("\n")[0]); }
  await pg.close();
}

for (const g of ["flashcards", "test"]) {
  const pg = await br.newPage({ viewport: { width: 1100, height: 900 } }); pg.setDefaultTimeout(5000); pg.on("pageerror", (e) => errs.push(g + ": " + e.message));
  await pg.goto(base + "pages/" + g + ".html", { waitUntil: "networkidle" });
  if (await pg.$("#start-btn")) await pg.click("#start-btn").catch(() => {});
  check(!(await pg.$("#pause-btn")), g + ": no pause button (it has no clock)");
  await pg.keyboard.press("Escape"); await pg.waitForTimeout(150);
  check(await pg.evaluate(() => { const o = document.getElementById("pause-overlay"); return !o || o.hidden; }), g + ": Escape puts up no pause screen");
  await pg.close();
}

await br.close(); srv.close();
if (errs.length) bad.push("page errors: " + errs.join(" | "));
console.log((PLANT ? "[plant " + PLANT + "] " : "") + checks + " checks; " + bad.length + " failed");
bad.slice(0, 20).forEach((b) => console.log("  " + b));
process.exit(bad.length ? 1 : 0);

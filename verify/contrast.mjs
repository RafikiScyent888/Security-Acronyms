/* =====================================================================
   AAA CONTRAST — MEASURED ON PAINTED PIXELS.

   These students have eye damage from military service. Contrast is a
   medical accommodation: 7:1 body text, 4.5:1 large text (>=24px, or
   >=18.66px bold).

   THIS PAGE IS WHY YOU CANNOT READ THE CASCADE. The body background is
   a GRADIENT — it lives in `background-image` and carries no
   `background-color` at all. A checker that walks up the DOM finds
   nothing and assumes white, and reports a clean pass on a page nobody
   can read.

   So: hide the glyphs, photograph the ground they sit on, sample the
   real pixels, then put the page back. Leaving the injected style in
   place makes every later measurement read 1:1 and pass, which is the
   most dangerous failure a checker like this has.

   Calibrated with --plant.
   ===================================================================== */
let chromium;
try { ({ chromium } = await import("playwright")); }
catch (e) { ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs")); }
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
                ".json": "application/json", ".png": "image/png", ".pdf": "application/pdf" };
const PLANT = process.argv.includes("--plant");

const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  const p = join(ROOT, u === "/" ? "index.html" : u);
  if (!existsSync(p)) { res.writeHead(404); res.end("no"); return; }
  res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
});
await new Promise(r => srv.listen(0, r));
const base = "http://127.0.0.1:" + srv.address().port + "/";

const br = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--headless=new", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"]
});

/* Every screen a student actually sees, in BOTH themes — the dark one
   arrives automatically from the operating system, so it is not an
   optional extra face, it is what half of them will get. */
const PAGES = [
  { name: "dashboard", url: "index.html" },
  { name: "blitz", url: "pages/blitz.html", start: "#start-btn" },
  { name: "test", url: "pages/test.html", start: "#start-btn" },
  { name: "flashcards", url: "pages/flashcards.html", start: "#start-btn" },
  { name: "match", url: "pages/match.html", start: "#start-btn" },
  { name: "memory", url: "pages/memory.html", start: "#start-btn" },

  /* THE TOAST IS ONLY ON SCREEN FOR 1.8 SECONDS, SO THE SWEEP NEVER SAW
     IT — and it was `background: var(--ink); color: #fff`, which on a
     dark page is near-white ink on a near-white pill. The confirmation
     that the theme had changed was the one thing on the page you could
     not read.

     Measured on its own screen, with `root` narrowing the walk to the
     toast, so this does not re-report the whole dashboard twice. */
  { name: "toast", url: "index.html", toast: "Dark mode on", root: "#app-toast" }
];
const THEMES = ["light", "dark"];

function lum(r, g, b) {
  const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const l1 = lum(a[0], a[1], a[2]), l2 = lum(b[0], b[1], b[2]);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const fails = [];
let measured = 0;
/* WHICH SCREENS ACTUALLY CAUGHT THE PLANT.

   A bare "--plant produced failures" is worthless on a site that has
   real failures of its own: the run passes trivially and says nothing.
   It has to be per screen. That is precisely how the below-the-fold bug
   showed itself — the plant fired on 8 screens out of 12, and the four
   silent ones were the long pages where everything past the first
   viewport was never measured at all. */
const plantedOn = new Set();
const allScreens = [];

for (const theme of THEMES) {
  for (const pg0 of PAGES) {
    const pg = await br.newPage({ viewport: { width: 1280, height: 1000 } });
    await pg.goto(base + pg0.url, { waitUntil: "networkidle" });
    await pg.evaluate(t => document.documentElement.setAttribute("data-theme", t), theme);
    if (pg0.start) {
      const b = pg.locator(pg0.start);
      if (await b.count()) { await b.click().catch(() => {}); await pg.waitForTimeout(400); }
    }
    if (pg0.toast) {
      await pg.evaluate((m) => {
        showToast(m);
        const el = document.getElementById("app-toast");
        clearTimeout(el._hideTimer);           /* hold it open to be measured */
      }, pg0.toast);
      await pg.waitForTimeout(350);
    }
    if (PLANT) {
      /* Planted INSIDE the root being walked. Appended to document.body
         it would land outside a narrowed root, the plant would go
         unnoticed on that screen, and the calibration would report a
         miss that is the harness's fault rather than the check's. */
      await pg.evaluate((rootSel) => {
        const host = (rootSel && document.querySelector(rootSel)) || document.body;
        const d = document.createElement("span");
        d.style.cssText = "color:#6e6e6e;background:#5a5a5a;font-size:15px;padding:8px";
        d.textContent = "Planted low-contrast text.";
        host.appendChild(d);
      }, pg0.root || null);
    }
    await pg.waitForTimeout(250);

    /* GROW THE VIEWPORT TO THE WHOLE PAGE FIRST.

       `elementFromPoint` only sees the viewport, so the hit-test that
       rejects flipped cards was ALSO rejecting everything below the
       fold — silently, by skipping it. The calibration run caught the
       plant on 8 screens out of 12 and that is how it showed: the plant
       is appended to the end of the body, which on a long page is off
       screen. Fit the page in the window and every element is testable. */
    const full = await pg.evaluate(() => Math.max(
      document.documentElement.scrollHeight, document.body.scrollHeight));
    await pg.setViewportSize({ width: 1280, height: Math.min(6000, Math.max(1000, full + 40)) });
    await pg.waitForTimeout(200);

    const boxes = await pg.evaluate((rootSel) => {
      const out = [];
      const root = (rootSel && document.querySelector(rootSel)) || document.body;
      const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      let n;
      while ((n = walk.nextNode())) {
        if (!n.nodeValue.trim()) continue;
        const el = n.parentElement;
        if (!el || seen.has(el)) continue;
        seen.add(el);
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.95) continue;
        if (el.closest("[hidden]")) continue;
        /* MEASURE THE TEXT ITSELF, NOT ITS PARENT'S BOX.

           A Range over the text node gives the actual glyph runs. The
           parent's box is wider than the words and often contains a
           sibling — the brand link holds a white logo mark next to dark
           text, and sampling the parent counted the logo as "ground",
           reporting 1.08:1 on a heading that is perfectly readable. */
        const rng = document.createRange();
        rng.selectNodeContents(n);
        const rects = [].slice.call(rng.getClientRects()).filter(q => q.width > 1 && q.height > 1);
        rng.detach && rng.detach();
        if (!rects.length) continue;
        const box = rects[0];

        /* AND CHECK THE TEXT IS ACTUALLY WHAT IS PAINTED THERE.

           A memory card flipped away still reports a box and still says
           it is visible, but the BACK face is what the screen shows.
           Hit-testing the middle of the glyph run catches that, and
           every other case of something sitting on top. */
        /* ...EXCEPT WHERE THE HIT TEST CANNOT SEE.

           `elementFromPoint` skips anything with `pointer-events: none`
           and returns whatever is behind it. The toast is exactly that:
           painted, on top, unreadable — and invisible to the hit test,
           so it was dropped and measured zero elements while the
           calibration quietly reported "caught on 12 of 14".

           For those, take the box on trust. It is a real gap — an
           overlay ON TOP of a pointer-events:none element would not be
           noticed — but silently skipping painted text is the worse of
           the two, by a long way. */
        let unhittable = false;
        for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
          if (getComputedStyle(a).pointerEvents === "none") { unhittable = true; break; }
        }
        if (!unhittable) {
          const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
          if (!hit || !(hit === el || el.contains(hit) || hit.contains(el))) continue;
        }

        const svg = el.ownerSVGElement != null;
        /* Drop the half-leading: a line box is taller than its glyphs by
           (line-height - font-size), split top and bottom, and nothing is
           ever painted in that gap. */
        const size0 = parseFloat(cs.fontSize) || 16;
        const lead = Math.max(0, (box.height - size0) / 2);
        const r = {
          x: box.x, y: box.y + lead,
          width: box.width,
          height: Math.max(1, box.height - lead * 2)
        };
        const paint = svg ? cs.fill : cs.color;
        const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(paint);
        if (!m || (m[4] !== undefined && parseFloat(m[4]) < 0.95)) continue;
        const bold = parseInt(cs.fontWeight, 10) >= 700;
        out.push({
          tag: el.tagName.toLowerCase(), cls: (el.getAttribute("class") || "").slice(0, 34),
          text: n.nodeValue.trim().slice(0, 34),
          x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height,
          fg: [Number(m[1]), Number(m[2]), Number(m[3])],
          size: size0, bold: bold, large: size0 >= 24 || (size0 >= 18.66 && bold)
        });
      }
      return out;
    }, pg0.root || null);

    await pg.evaluate(() => {
      const s = document.createElement("style");
      s.id = "__hide_glyphs";
      s.textContent = "*,*::before,*::after{color:transparent!important;fill:transparent!important;" +
                      "text-shadow:none!important;-webkit-text-fill-color:transparent!important}";
      document.head.appendChild(s);
    });
    await pg.waitForTimeout(120);
    const shot = (await pg.screenshot({ fullPage: true })).toString("base64");
    await pg.evaluate(() => { const s = document.getElementById("__hide_glyphs"); if (s) s.remove(); });

    const results = await pg.evaluate(async (args) => {
      const [b64, boxes] = args;
      const img = new Image();
      await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = "data:image/png;base64," + b64; });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext("2d", { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const dpr = img.naturalWidth / document.documentElement.scrollWidth;
      const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return boxes.map(b => {
        const x0 = Math.round(b.x * dpr), y0 = Math.round(b.y * dpr);
        const w = Math.max(1, Math.round(b.w * dpr)), h = Math.max(1, Math.round(b.h * dpr));
        if (x0 < 0 || y0 < 0 || x0 + w > c.width || y0 + h > c.height) return Object.assign({ skip: true }, b);
        const d = g.getImageData(x0, y0, w, h).data;
        let dark = null, light = null, dl = 2, ll = -1;
        for (let i = 0; i < d.length; i += 4) {
          const L = 0.2126 * f(d[i]) + 0.7152 * f(d[i + 1]) + 0.0722 * f(d[i + 2]);
          if (L < dl) { dl = L; dark = [d[i], d[i + 1], d[i + 2]]; }
          if (L > ll) { ll = L; light = [d[i], d[i + 1], d[i + 2]]; }
        }
        return Object.assign({ dark: dark, light: light }, b);
      });
    }, [shot, boxes]);

    results.forEach(r => {
      if (r.skip || !r.dark) return;
      measured++;
      const need = r.large ? 4.5 : 7;
      const got = Math.min(ratio(r.fg, r.dark), ratio(r.fg, r.light));
      const where = theme + " · " + pg0.name;
      if (got + 0.005 < need) {
        fails.push({ where, need, got, r });
        if (PLANT && /^Planted low-contrast/.test(r.text)) plantedOn.add(where);
      }
    });
    allScreens.push(theme + " · " + pg0.name);
    await pg.close();
  }
}

await br.close();
srv.close();

console.log("measured " + measured + " text elements across " + allScreens.length + " screens");

if (PLANT) {
  const missed = allScreens.filter(s => !plantedOn.has(s));
  console.log("\nplant caught on " + plantedOn.size + " of " + allScreens.length + " screens");
  if (missed.length) {
    console.log("NOT CAUGHT ON: " + missed.join(", "));
    console.log("Those screens are not being measured. Fix the harness before trusting a pass.");
    process.exit(1);
  }
  console.log("every screen is genuinely being measured.");
  process.exit(0);
}
if (fails.length) {
  fails.sort((a, b) => a.got - b.got);
  console.log("\n" + fails.length + " BELOW AAA (worst first):\n");
  const rgb = c => "rgb(" + c.join(",") + ")";
  fails.slice(0, 500).forEach(f => {
    console.log("  " + f.got.toFixed(2) + ":1 (needs " + f.need + ")  [" + f.where + "]  " +
      f.r.tag + "." + f.r.cls + "  " + f.r.size.toFixed(0) + "px" + (f.r.bold ? " bold" : "") +
      "\n      " + JSON.stringify(f.r.text) +
      "\n      ink " + rgb(f.r.fg) + " on " + rgb(f.r.dark) + " / " + rgb(f.r.light));
  });
  if (fails.length > 500) console.log("\n  ...and " + (fails.length - 30) + " more");
  process.exit(1);
}
console.log("\nevery measured element meets AAA.");

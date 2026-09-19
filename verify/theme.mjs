/* =====================================================================
   THE LIGHT / DARK TOGGLE — DRIVEN, NOT READ.

   Five claims, and none of them is trusted until the matching plant has
   been shown to break it:

     1. the toggle is ON EVERY PAGE and flips the theme
     2. the choice SURVIVES a page change and a reload
     3. the choice BEATS the operating system, for ever
     4. with no choice made, the operating system decides
     5. the theme is on <html> BEFORE the body exists — no white flash
     6. the two dark token blocks in styles.css are IDENTICAL

   (6) is the one that keeps biting. There is a block for the stamped
   theme and a block for the no-JavaScript fallback, and they have to
   carry the same values. Last time they drifted, an operating-system
   dark page got a 60% white wash behind the disclaimer panel and a
   cream sun over the topbar, and nothing noticed for weeks.

   ---------------------------------------------------------------------
   CALIBRATION

     node verify/theme.mjs --plant

   Serves a deliberately broken copy of the site — four of them, one
   defect each — and demands that every one is caught. A --plant run
   that PASSES is reported as a failure, because it means the check is
   measuring nothing.
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

const PAGES = ["index.html", "pages/blitz.html", "pages/test.html",
               "pages/flashcards.html", "pages/match.html", "pages/memory.html"];

/* ---------------------------------------------------------------------
   THE PLANTS

   Each one is a byte transform applied to a file as it is served, so
   nothing on disk is touched and a crashed run cannot leave the repo
   broken. Each names the assertion it is supposed to trip.
   --------------------------------------------------------------------- */
const PLANTS = {
  persist: {
    catches: "persistence",
    file: "js/theme.js",
    fn: (s) => s.replace("try { global.localStorage.setItem(KEY, v); return true; }",
                         "try { return true; }")
  },
  flash: {
    catches: "no-flash",
    file: "js/theme.js",
    /* Defer the boot to DOMContentLoaded — the exact mistake this
       architecture exists to prevent. */
    fn: (s) => s.replace("var chosen = read();\n  apply(chosen || systemTheme());",
                         "var chosen = read();\n  document.addEventListener('DOMContentLoaded', function () { apply(chosen || systemTheme()); });")
  },
  parity: {
    catches: "token parity",
    file: "css/styles.css",
    /* Drop one token from the no-JavaScript block only. This is the
       real historical bug, reproduced. */
    fn: (s) => s.replace("    --panel-wash: rgba(255, 255, 255, 0.06);\n", "")
  },
  button: {
    catches: "toggle present",
    file: "js/common.js",
    fn: (s) => s.replace('<button type="button" class="btn btn-ghost theme-toggle" id="theme-toggle"></button>', "")
  }
};

function serve(plant) {
  const srv = createServer((req, res) => {
    const u = decodeURIComponent(req.url.split("?")[0]);
    const rel = u === "/" ? "index.html" : u.replace(/^\//, "");
    const p = join(ROOT, rel);
    if (!existsSync(p)) { res.writeHead(404); res.end("no"); return; }
    let body = readFileSync(p);
    if (plant && plant.file === rel) {
      const before = body.toString();
      const after = plant.fn(before);
      if (after === before) throw new Error("plant did not apply to " + rel + " — the check is testing nothing");
      body = Buffer.from(after);
    }
    res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream",
                         "cache-control": "no-store" });
    res.end(body);
  });
  return srv;
}

/* --------------------------------------------------------------------- */
async function run(plant) {
  const fails = [];
  const fail = (what, detail) => fails.push(what + " — " + detail);

  /* A missing button is a FINDING, not a crash. Playwright's click
     waits thirty seconds and then throws, which tore the run down
     before the remaining checks had said anything — so the `button`
     plant produced a stack trace instead of a caught defect, and a
     stack trace is not a result. */
  async function clickToggle(pg, where) {
    const btn = await pg.$("#theme-toggle");
    if (!btn) { fail("toggle present", where + " has no #theme-toggle to press"); return false; }
    await btn.click();
    return true;
  }

  const srv = serve(plant);
  await new Promise(r => srv.listen(0, r));
  const base = "http://127.0.0.1:" + srv.address().port + "/";

  const br = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: ["--headless=new", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"]
  });

  /* Record the theme attribute at the instant <body> is first attached.
     The init script runs at document_start, before any page script, so
     if theme.js has done its job the attribute is already there.

     It observes `document`, NOT `document.documentElement`. At
     document_start there is sometimes no <html> element yet, and
     observing null throws — which the try/catch then swallowed, so the
     probe recorded nothing and reported `undefined` for all six pages.
     A probe that measures nothing looks exactly like a failure, and
     that is the good outcome; it could just as easily have looked like
     a pass. */
  const WATCH = () => {
    const o = new MutationObserver(() => {
      if (document.body && window.__atBody === undefined) {
        window.__atBody = document.documentElement.getAttribute("data-theme");
      }
    });
    o.observe(document, { childList: true, subtree: true });
  };

  /* Sections 2 to 4 all press the button. If section 1 found it missing
     there is nothing to press, and driving on would throw thirty seconds
     later instead of reporting. The gate keeps a missing button a
     finding and lets the remaining checks — no-flash, token parity —
     still have their say. */
  let haveToggle = true;

  /* ---- 1. the toggle is on every page, and it flips ------------------ */
  {
    const ctx = await br.newContext({ colorScheme: "light" });
    for (const path of PAGES) {
      const pg = await ctx.newPage();
      await pg.goto(base + path, { waitUntil: "networkidle" });
      const btn = await pg.$("#theme-toggle");
      if (!btn) { fail("toggle present", path + " has no #theme-toggle"); haveToggle = false; await pg.close(); continue; }

      const label = (await btn.innerText()).trim();
      const aria = await btn.getAttribute("aria-label");
      if (!/Dark mode/i.test(label)) fail("toggle label", path + ' reads "' + label + '", expected "Dark mode" on a light page');
      if (!aria || !/Switch to dark mode/i.test(aria)) fail("toggle aria-label", path + " has " + JSON.stringify(aria));

      await btn.click();
      const after = await pg.getAttribute("html", "data-theme");
      if (after !== "dark") fail("toggle flips", path + " stayed " + after);
      const label2 = (await btn.innerText()).trim();
      if (!/Light mode/i.test(label2)) fail("toggle relabels", path + ' still reads "' + label2 + '" after flipping to dark');

      /* Wipe the choice so the next page starts clean. */
      await pg.evaluate(() => localStorage.clear());
      await pg.close();
    }
    await ctx.close();
  }

  /* ---- 2. it survives a page change and a reload --------------------- */
  if (haveToggle) {
    const ctx = await br.newContext({ colorScheme: "light" });
    const pg = await ctx.newPage();
    await pg.goto(base + "index.html", { waitUntil: "networkidle" });
    await clickToggle(pg, "index.html");                   /* -> dark */

    await pg.goto(base + "pages/blitz.html", { waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "dark")
      fail("persistence", "the choice did not carry from the dashboard to Blitz");

    await pg.reload({ waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "dark")
      fail("persistence", "the choice did not survive a reload");

    /* A new tab is the closest thing here to coming back tomorrow. */
    const pg2 = await ctx.newPage();
    await pg2.goto(base + "pages/memory.html", { waitUntil: "networkidle" });
    if (await pg2.getAttribute("html", "data-theme") !== "dark")
      fail("persistence", "the choice did not survive opening a new tab");

    await ctx.close();
  }

  /* ---- 3. the student's choice beats the operating system ------------ */
  if (haveToggle) {
    const ctx = await br.newContext({ colorScheme: "dark" });
    const pg = await ctx.newPage();
    await pg.goto(base + "index.html", { waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "dark")
      fail("system default", "an OS-dark browser did not open dark");

    await clickToggle(pg, "index.html");                   /* -> light, deliberately */
    if (await pg.getAttribute("html", "data-theme") !== "light")
      fail("choice wins", "choosing light on an OS-dark machine did not take");

    await pg.reload({ waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "light")
      fail("choice wins", "the OS overruled the student after a reload");

    await pg.goto(base + "pages/test.html", { waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "light")
      fail("choice wins", "the OS overruled the student on another page");

    await ctx.close();
  }

  /* ---- 4. with no choice made, the OS decides, live ------------------ */
  if (haveToggle) {
    const ctx = await br.newContext({ colorScheme: "light" });
    const pg = await ctx.newPage();
    await pg.goto(base + "index.html", { waitUntil: "networkidle" });
    if (await pg.getAttribute("html", "data-theme") !== "light")
      fail("system default", "an OS-light browser did not open light");

    await pg.emulateMedia({ colorScheme: "dark" });
    await pg.waitForTimeout(80);
    if (await pg.getAttribute("html", "data-theme") !== "dark")
      fail("system follow", "the OS flipped to dark and an undecided page did not follow");
    const lbl = (await pg.innerText("#theme-toggle")).trim();
    if (!/Light mode/i.test(lbl))
      fail("system follow", 'the page followed but the button still reads "' + lbl + '"');

    await ctx.close();
  }

  /* ---- 5. no flash: the theme is set before <body> exists ------------ */
  {
    const ctx = await br.newContext({ colorScheme: "dark" });
    await ctx.addInitScript(WATCH);
    for (const path of PAGES) {
      const pg = await ctx.newPage();
      await pg.goto(base + path, { waitUntil: "networkidle" });
      const atBody = await pg.evaluate(() => window.__atBody);
      if (atBody !== "dark")
        fail("no-flash", path + " had data-theme=" + JSON.stringify(atBody) + " when <body> was attached");
      await pg.close();
    }
    await ctx.close();
  }

  await br.close();

  /* ---- 6. the two dark token blocks are identical -------------------- */
  {
    let css = readFileSync(join(ROOT, "css/styles.css"), "utf8");
    if (plant && plant.file === "css/styles.css") css = plant.fn(css);

    const stamped = tokensIn(css, ':root[data-theme="dark"] {');
    const fallback = tokensIn(css, ':root:not([data-theme="light"]) {');

    if (!stamped) fail("token parity", "could not find the :root[data-theme=\"dark\"] block");
    if (!fallback) fail("token parity", "could not find the no-JavaScript fallback block");
    if (stamped && fallback) {
      const keys = new Set([...Object.keys(stamped), ...Object.keys(fallback)]);
      for (const k of [...keys].sort()) {
        if (!(k in stamped)) fail("token parity", k + " is in the fallback block but not the stamped one");
        else if (!(k in fallback)) fail("token parity", k + " is in the stamped block but the no-JavaScript fallback never gets it");
        else if (stamped[k] !== fallback[k])
          fail("token parity", k + " differs: stamped " + stamped[k] + " vs fallback " + fallback[k]);
      }
    }
  }

  return fails;
}

/** Pull `--name: value` pairs out of the brace-balanced block that
    follows `selector`. Values may span lines, so whitespace is
    collapsed before comparing. */
function tokensIn(css, selector) {
  const at = css.indexOf(selector);
  if (at < 0) return null;
  let i = at + selector.length, depth = 1;
  while (i < css.length && depth > 0) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    if (depth > 0) i++;
  }
  const body = css.slice(at + selector.length, i);
  const out = {};
  body.split(";").forEach((decl) => {
    const line = decl.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    const m = /^(--[a-z0-9-]+)\s*:\s*([\s\S]+)$/i.exec(line);
    if (m) out[m[1]] = m[2].replace(/\s+/g, " ").trim();
  });
  return out;
}

/* --------------------------------------------------------------------- */
if (process.argv.includes("--plant")) {
  let allCaught = true;
  for (const [name, plant] of Object.entries(PLANTS)) {
    const fails = await run(plant);
    const caught = fails.some(f => f.startsWith(plant.catches));
    console.log((caught ? "  caught  " : "  MISSED  ") + name.padEnd(8) +
                " (expected the " + plant.catches + " check to fire) — " +
                fails.length + " failure(s) reported");
    if (!caught) { allCaught = false; fails.forEach(f => console.log("            " + f)); }
  }
  if (allCaught) {
    console.log("\nall four plants caught. the check measures what it claims to.");
    console.log("a --plant run is only meaningful when it FAILS nothing — exiting 0.");
    process.exit(0);
  }
  console.log("\nAT LEAST ONE PLANT WENT UNNOTICED. The check is not trustworthy.");
  process.exit(1);
}

const fails = await run(null);
if (fails.length === 0) {
  console.log("light/dark toggle: all checks pass across " + PAGES.length + " pages");
  process.exit(0);
}
console.log(fails.length + " FAILURE(S):\n");
fails.forEach(f => console.log("  " + f));
process.exit(1);

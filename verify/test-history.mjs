/* =====================================================================
   THE TEST: NO ACRONYM FROM THE LAST THREE TESTS — and fair wrong options.

   A student takes eight tests in a row in one browser: four finished and
   started again with "Take again", four by coming back to the page. No
   test may ask an acronym any of the three before it asked. The memory
   must be under this site's own key (every acronym site shares one web
   address, so one browser storage), and hold three tests, no more.

   Also: blocked storage (a private window) still gives a working test;
   a list too short to leave three tests out still gives fifteen different
   questions (not reachable with these lists: shown by cutting the list
   down in the page); and on every acronym, a wrong option is never
   another meaning of the same acronym, never a definition the right one
   shares, and no two options read the same (with a second meaning added
   for one acronym while it runs, so a list with no acronym listed twice
   still proves the rule).

   node verify/test-history.mjs                the check
   node verify/test-history.mjs --plant=NAME   must FAIL: noexclude |
                    norecord | sharedkey | samemeaning | samedef | nofallback
   ===================================================================== */
const SITE_KEY = "security-acronyms:test-history";
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
const T = "pages/test.html";
const PLANTS = {
  noexclude: [[T, "ACRONYMS.filter((a) => !recent.has(a.id))", "ACRONYMS.filter((a) => true)"]],
  norecord: [[T, "      saveHistory(history.concat([picked.map((a) => a.id)]));\n", ""]],
  sharedkey: [[T, 'const HISTORY_KEY = "' + SITE_KEY + '"', 'const HISTORY_KEY = "aplus-arcade:test-history"']],
  samemeaning: [[T, "if (x.acronym === item.acronym || seen.has(x.definition)) continue;", "if (x.id === item.id || seen.has(x.definition)) continue;"]],
  samedef: [[T, "if (x.acronym === item.acronym || seen.has(x.definition)) continue;", "if (x.acronym === item.acronym) continue;"]],
  nofallback: [[T, "for (let k = 0; picked.length < want && k < history.length; k++) {", "for (let k = 0; false; k++) {"]]
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
/* the acronyms this test asks, as the student meets them: one by one, answered, Next */
async function takeTest(pg) {
  const seen = [];
  for (let k = 0; k < 15; k++) {
    seen.push(await pg.evaluate(() => ({ id: questions[view].item.id, acronym: document.getElementById("quiz-acronym").textContent })));
    await pg.evaluate(() => { const right = questions[view].item.definition; [...document.querySelectorAll("#quiz-options .quiz-option")].find((b) => b.firstChild.textContent === right).click(); });
    await pg.click("#next-btn");
  }
  return seen;
}

/* ---------------------------------------------------------------- eight tests in a row */
{
  const ctx = await br.newContext();
  const pg = await ctx.newPage(); pg.setDefaultTimeout(4000); pg.on("pageerror", (e) => errs.push(e.message));
  await pg.goto(base + T, { waitUntil: "networkidle" });
  const tests = [];
  try {
    for (let t = 1; t <= 8; t++) {
      if (t > 1 && t <= 4) await pg.click("#play-again-btn");                      /* finished, and Take again */
      if (t > 4) { await pg.goto(base + T, { waitUntil: "networkidle" }); }         /* back to the page another day */
      const asked = await takeTest(pg);
      check(new Set(asked.map((x) => x.id)).size === 15, "test " + t + ": fifteen different acronyms");
      const before = new Set(tests.slice(-3).flat().map((x) => x.id));
      const again = asked.filter((x) => before.has(x.id));
      check(!again.length, "test " + t + ": nothing from the last three tests" + (again.length ? " (asked again: " + again.map((x) => x.acronym).join(", ") + ")" : ""));
      tests.push(asked);
    }
    const store = await pg.evaluate((k) => ({ mine: localStorage.getItem(k), keys: Object.keys(localStorage) }), SITE_KEY);
    const h = store.mine ? JSON.parse(store.mine) : null;
    check(!!h && h.length === 3, "the memory is under this site's own key (" + SITE_KEY + ") and holds three tests: " + JSON.stringify(store.keys));
    check(!!h && JSON.stringify(h[2].slice().sort()) === JSON.stringify(tests[7].map((x) => x.id).sort()), "its last test is the one just taken");
  } catch (e) { check(false, "the eight tests stopped: " + String(e.message).split("\n")[0]); }
  await ctx.close();
}

/* ---------------------------------------------------------------- storage blocked: still a test */
{
  const ctx = await br.newContext();
  await ctx.addInitScript(() => { const no = () => { throw new Error("storage blocked"); }; Storage.prototype.getItem = no; Storage.prototype.setItem = no; });
  const pg = await ctx.newPage(); pg.setDefaultTimeout(4000); const e2 = []; pg.on("pageerror", (e) => e2.push(e.message));
  await pg.goto(base + T, { waitUntil: "networkidle" });
  try { const a = await takeTest(pg); await pg.click("#play-again-btn"); const b = await takeTest(pg); check(a.length === 15 && b.length === 15, "storage blocked: two whole tests run"); }
  catch (e) { check(false, "storage blocked: the test stopped (" + String(e.message).split("\n")[0] + ")"); }
  /* the shared best-score helper doesn't guard its storage; only the test's own memory is held to it here */
  check(!e2.some((m) => !/storage blocked/.test(m) || /HISTORY|readHistory|saveHistory/.test(m)), "storage blocked: no error from the test's memory: " + e2.join(" | "));
  await ctx.close();
}

/* ---------------------------------------------------------------- a short list, and fair wrong options */
{
  const ctx = await br.newContext();
  const pg = await ctx.newPage(); pg.setDefaultTimeout(4000); pg.on("pageerror", (e) => errs.push(e.message));
  await pg.goto(base + T, { waitUntil: "networkidle" });
  const r = await pg.evaluate(() => {
    const out = {};
    /* fair wrong options, on every acronym, many times over */
    /* a second meaning for the first acronym, added for the check (removed below), so a list with no acronym listed twice
       still proves the rule */
    out.twins = ACRONYMS.filter((a) => ACRONYMS.some((b) => b !== a && (b.acronym === a.acronym || b.definition === a.definition))).map((a) => a.acronym);
    ACRONYMS.push({ id: 999999, acronym: ACRONYMS[0].acronym, expansion: "A second meaning", definition: "A second meaning, written for this check." });
    const problems = [], twins = ACRONYMS.filter((a) => ACRONYMS.some((b) => b !== a && (b.acronym === a.acronym || b.definition === a.definition)));
    for (const item of ACRONYMS) for (let k = 0; k < (twins.indexOf(item) >= 0 ? 60 : 4); k++) {
      const w = pickWrongOptions(item, 3), defs = new Set([item.definition].concat(w.map((x) => x.definition)));
      if (w.length !== 3 || w.some((x) => x.acronym === item.acronym || x.definition === item.definition) || defs.size !== 4) { problems.push(item.acronym + ": " + w.map((x) => x.acronym).join("/")); break; }
    }
    ACRONYMS.pop();
    /* and on a list cut to six, where a broken rule shows nearly every time: the question, a second meaning of its acronym, a
       different acronym with the same definition, and three plain ones. The wrong options can only be the three plain ones */
    const full = ACRONYMS.slice(), q = full[0], plain = full.filter((a) => a.acronym !== q.acronym && a.definition !== q.definition).slice(0, 3);
    ACRONYMS.length = 0;
    [q, { id: 999998, acronym: q.acronym, expansion: "x", definition: "Another meaning of the same letters." }, { id: 999997, acronym: "ZZQ", expansion: "y", definition: q.definition }].concat(plain).forEach((a) => ACRONYMS.push(a));
    for (let k = 0; k < 40; k++) { const w = pickWrongOptions(q, 3).map((x) => x.id).sort().join(","); if (w !== plain.map((x) => x.id).sort().join(",")) { problems.push("on six: " + w); break; } }
    ACRONYMS.length = 0; full.forEach((a) => ACRONYMS.push(a));
    out.problems = problems;
    /* a list cut to 40: three tests of fifteen can't all be left out */
    const keep = ACRONYMS.slice(); ACRONYMS.length = 40;
    localStorage.removeItem(HISTORY_KEY);
    const sizes = []; for (let t = 0; t < 5; t++) { const q = buildQuestions(); sizes.push(new Set(q.map((x) => x.item.id)).size); }
    ACRONYMS.length = 0; keep.forEach((a) => ACRONYMS.push(a)); localStorage.removeItem(HISTORY_KEY);
    out.sizes = sizes;
    return out;
  });
  check(!r.problems.length, "wrong options are fair on every acronym (" + (r.twins.length ? "twins: " + r.twins.join(", ") : "no twins in this list") + ")" + (r.problems.length ? ": " + r.problems.slice(0, 5).join("; ") : ""));
  check(r.sizes.every((n) => n === 15), "a list too short to leave three tests out still gives fifteen different questions: " + r.sizes.join(", "));
  await ctx.close();
}

await br.close(); srv.close();
if (errs.length) bad.push("page errors: " + errs.join(" | "));
console.log((PLANT ? "[plant " + PLANT + "] " : "") + checks + " checks; " + bad.length + " failed");
bad.slice(0, 20).forEach((b) => console.log("  " + b));
process.exit(bad.length ? 1 : 0);

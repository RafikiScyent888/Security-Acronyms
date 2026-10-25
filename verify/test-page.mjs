/* =====================================================================
   THE TEST PAGE: BACK, AND ANSWERS MARKED IN WORDS — driven as a student
   takes it, then measured on painted pixels.

   Back takes the student to an earlier question, shown as it was answered
   and LOCKED: its right answer has already been shown, so changing the
   pick would only change the score. Every marked answer says what it is
   in words, not only in colour.

   AAA (7:1 body, 4.5:1 large) is measured on the screens this adds — an
   answer marked, an earlier question under review — in both themes, at
   desk and phone width: glyphs hidden, the ground photographed, the real
   pixels sampled, the page put back. The footer is not measured here.

   node verify/test-page.mjs                 the check
   node verify/test-page.mjs --plant=NAME    must FAIL: unlocked | nodisable |
                                             noword | noback | pale | sky
   A locked answer is held twice (its buttons disabled, and the click
   handler refusing a question already answered), so taking out one of
   the two locks breaks nothing a student can do: "unlocked" takes out
   both, and "nodisable" the disabled state, which shows on its own.
   ===================================================================== */
let chromium;
try { ({ chromium } = await import("playwright")); }
catch (e) { ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs")); }
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const PLANT = (process.argv.find((a) => a.startsWith("--plant=")) || "").slice(8);

/* each plant is the defect a part of this check exists to catch, swapped into what the server sends */
const PLANTS = {
  unlocked: [["pages/test.html", "if (view !== qIndex || picks[view] !== undefined) return;", ""], ["pages/test.html", "        btn.disabled = true;\n", ""]],
  nodisable: [["pages/test.html", "        btn.disabled = true;\n", ""]],
  noword: [["pages/test.html", "btn.appendChild(word);", ""]],
  noback: [["pages/test.html", "backBtn.hidden = view === 0;", "backBtn.hidden = true;"]],
  pale: [["css/styles.css", ".review-note {\n  margin: -8px 0 16px;", ".review-note {\n  color: #9fb6c9 !important;\n  margin: -8px 0 16px;"]],
  sky: [["css/styles.css", ".test-nav .btn-primary {\n  background: #0b3a82;", ".test-nav .btn-primary {\n  background: linear-gradient(135deg, #38bdf8, #0284c7);"]]
};
if (PLANT && !PLANTS[PLANT]) { console.log("no plant called " + PLANT); process.exit(2); }

const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  const rel = u === "/" ? "index.html" : u.slice(1);
  const p = join(ROOT, rel);
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

/* ---------------------------------------------------------------- the student's way through */
const state = (pg) => pg.evaluate(() => {
  const opts = [...document.querySelectorAll("#quiz-options .quiz-option")];
  return {
    acronym: document.getElementById("quiz-acronym").textContent,
    label: document.getElementById("hud-label").textContent, index: document.getElementById("hud-index").textContent,
    score: document.getElementById("hud-score").textContent,
    back: !document.getElementById("back-btn").hidden, next: !document.getElementById("next-btn").hidden,
    note: document.getElementById("review-note").hidden ? null : document.getElementById("review-note").textContent,
    opts: opts.map((b) => ({ text: b.firstChild.textContent, cls: b.className, word: (b.querySelector(".mark-word") || {}).textContent || null, disabled: b.disabled }))
  };
});
/* the right definition for the question on screen, from the page's own question (an acronym can be listed twice, with
   two meanings, so looking it up by its letters can find the other one) */
const answer = (pg) => pg.evaluate(() => questions[view].item.definition);
const pickByText = (pg, t) => pg.evaluate((t) => { [...document.querySelectorAll("#quiz-options .quiz-option")].find((b) => b.firstChild.textContent === t).click(); }, t);

{
  const pg = await br.newPage({ viewport: { width: 1280, height: 1000 } });
  pg.setDefaultTimeout(4000);
  pg.on("pageerror", (e) => errs.push(e.message));
  try {
  await pg.goto(base + "pages/test.html", { waitUntil: "networkidle" });
  let s = await state(pg);
  check(!s.back && !s.next && s.label === "Question" && s.index === "1 / 15", "question 1: no Back, no Next until it's answered");
  /* question 1 answered wrong */
  const q1 = s.acronym, right1 = await answer(pg), wrong1 = s.opts.find((o) => o.text !== right1).text;
  await pickByText(pg, wrong1); s = await state(pg);
  const w = s.opts.find((o) => o.text === wrong1), r = s.opts.find((o) => o.text === right1);
  check(/wrong/.test(w.cls) && w.word === "✗ Your answer: wrong", "a wrong pick is marked in words: " + JSON.stringify(w));
  check(/correct/.test(r.cls) && r.word === "✓ The correct answer", "the right answer is marked in words: " + JSON.stringify(r));
  check(s.opts.every((o) => o.disabled) && s.next && !s.back && s.score === "0", "answered: locked, Next shown, still no Back on question 1");
  /* question 2 answered right */
  await pg.click("#next-btn"); s = await state(pg);
  check(s.back && !s.next && s.index === "2 / 15" && s.opts.every((o) => !o.disabled), "question 2: Back is there before it's answered");
  const q2 = s.acronym, right2 = await answer(pg);
  await pickByText(pg, right2); s = await state(pg);
  check(s.opts.find((o) => o.text === right2).word === "✓ Your answer: correct" && s.score === "1", "a right pick says so in words; the score is 1");
  /* back to question 1: as it was answered, locked */
  await pg.click("#back-btn"); s = await state(pg);
  check(s.acronym === q1 && s.label === "Reviewing" && s.index === "1 / 15", "Back shows question 1, the HUD says Reviewing 1 / 15");
  check(!!s.note && /question 1/.test(s.note) && /locked/.test(s.note), "the review note says which question and that it's locked: " + s.note);
  check(s.opts.find((o) => o.text === wrong1).word === "✗ Your answer: wrong" && s.opts.find((o) => o.text === right1).word === "✓ The correct answer", "question 1 comes back with its pick and the right answer marked");
  check(s.opts.every((o) => o.disabled) && !s.back && s.next, "under review every option is locked; no Back before question 1");
  await pickByText(pg, right1); s = await state(pg);
  check(s.score === "1" && s.opts.find((o) => o.text === wrong1).word === "✗ Your answer: wrong", "trying to change a locked answer changes nothing: the score stays 1");
  /* forward again: question 2 answered, then question 3 live */
  await pg.click("#next-btn"); s = await state(pg);
  check(s.acronym === q2 && s.label === "Question" && !s.note && s.next && s.back, "Next goes back to question 2, answered, no longer under review");
  await pg.click("#next-btn"); s = await state(pg);
  check(s.index === "3 / 15" && !s.next && s.back && s.opts.every((o) => !o.disabled), "Next goes on to question 3, still to answer");
  /* Back from a question not yet answered, and forward again */
  await pg.click("#back-btn"); s = await state(pg);
  check(s.acronym === q2 && s.label === "Reviewing", "Back from an unanswered question 3 shows question 2 under review");
  await pg.click("#next-btn"); s = await state(pg);
  check(s.index === "3 / 15" && !s.next, "and Next returns to question 3, still to answer");
  /* the rest right, then the results */
  for (let k = 3; k <= 15; k++) { await pickByText(pg, await answer(pg)); await pg.click("#next-btn"); }
  const res = await pg.evaluate(() => ({ shown: !document.getElementById("results").hidden, score: document.getElementById("res-score").textContent, review: document.getElementById("review-list").textContent }));
  check(res.shown && res.score === "14 / 15" && res.review.indexOf(q1) >= 0, "the results: 14 / 15, question 1's acronym to review: " + JSON.stringify(res));
  await pg.click("#play-again-btn"); s = await state(pg);
  check(!s.back && !s.next && s.index === "1 / 15" && s.score === "0", "Take again starts clean: question 1, no Back");
  } catch (e) { check(false, "the drive stopped: " + String(e.message).split("\n")[0]); }
  await pg.close();
}

/* ---------------------------------------------------------------- AAA on painted pixels */
function lum(r, g, b) { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
function ratio(a, b) { const l1 = lum(a[0], a[1], a[2]), l2 = lum(b[0], b[1], b[2]); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); }
async function measure(pg, roots) {
  const boxes = await pg.evaluate((roots) => {
    const out = [];
    for (const sel of roots) {
      const root = document.querySelector(sel); if (!root) continue;
      const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
      while ((n = walk.nextNode())) {
        if (!n.nodeValue.trim()) continue;
        const el = n.parentElement, cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || el.closest("[hidden]")) continue;
        const rng = document.createRange(); rng.selectNodeContents(n);
        const rects = [...rng.getClientRects()].filter((q) => q.width > 1 && q.height > 1);
        for (const box of rects) {
          const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
          if (!hit || !(hit === el || el.contains(hit) || hit.contains(el))) continue;
          const size = parseFloat(cs.fontSize) || 16, lead = Math.max(0, (box.height - size) / 2);
          const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(cs.color);
          if (!m) continue;
          let op = 1; for (let a = el; a && a.nodeType === 1; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity);
          const bold = parseInt(cs.fontWeight, 10) >= 700;
          out.push({ text: n.nodeValue.trim().slice(0, 40), x: box.x + scrollX, y: box.y + lead + scrollY, w: box.width, h: Math.max(1, box.height - 2 * lead),
            fg: [+m[1], +m[2], +m[3]], alpha: (m[4] === undefined ? 1 : +m[4]) * op, large: size >= 24 || (size >= 18.66 && bold) });
        }
      }
    }
    return out;
  }, roots);
  await pg.evaluate(() => { const s = document.createElement("style"); s.id = "__hide"; s.textContent = "*,*::before,*::after{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}"; document.head.appendChild(s); });
  await pg.waitForTimeout(80);
  const shot = (await pg.screenshot({ fullPage: true })).toString("base64");
  await pg.evaluate(() => document.getElementById("__hide").remove());   /* put the page back: left in, every later reading is 1:1 */
  const grounds = await pg.evaluate(async ([b64, boxes]) => {
    const img = new Image(); await new Promise((ok) => { img.onload = ok; img.src = "data:image/png;base64," + b64; });
    const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
    const dpr = img.naturalWidth / document.documentElement.scrollWidth;
    return boxes.map((b) => { const x = Math.round(b.x * dpr), y = Math.round(b.y * dpr), w = Math.max(1, Math.round(b.w * dpr)), h = Math.max(1, Math.round(b.h * dpr));
      const d = g.getImageData(x, y, w, h).data, px = []; for (let i = 0; i < d.length; i += 16) px.push([d[i], d[i + 1], d[i + 2]]); return px; });
  }, [shot, boxes]);
  return boxes.map((b, i) => {
    let worst = 99;
    for (const q of grounds[i]) { const eff = b.fg.map((v, k) => b.alpha * v + (1 - b.alpha) * q[k]); worst = Math.min(worst, ratio(eff, q)); }
    return { text: b.text, need: b.large ? 4.5 : 7, got: worst };
  });
}
let runs = 0;
for (const theme of ["light", "dark"]) for (const vw of [1280, 380]) for (const screen of ["answered", "review"]) {
  const pg = await br.newPage({ viewport: { width: vw, height: 1000 } });
  pg.setDefaultTimeout(4000);
  await pg.goto(base + "pages/test.html", { waitUntil: "networkidle" });
  await pg.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
  const right = await answer(pg), opts = (await state(pg)).opts;
  await pickByText(pg, opts.find((o) => o.text !== right).text);   /* a wrong pick: both marks on screen */
  if (screen === "review") { try { await pg.click("#next-btn"); await pickByText(pg, await answer(pg)); await pg.click("#back-btn"); } catch (e) { bad.push(theme + " " + vw + "px: couldn't reach the review screen (" + String(e.message).split("\n")[0] + ")"); await pg.close(); continue; } }
  await pg.waitForTimeout(200);
  const R = await measure(pg, [".game-header", "#game-area"]);
  runs += R.length;
  const words = R.filter((x) => /Your answer|correct answer|Back|Next|Looking back|Reviewing/.test(x.text));
  check(words.length >= (screen === "review" ? 5 : 3), theme + " " + vw + "px " + screen + ": the new words were measured (" + words.length + ")");
  for (const x of R) if (x.got + 0.005 < x.need) bad.push(x.got.toFixed(2) + ":1 (needs " + x.need + ") [" + theme + " " + vw + "px " + screen + '] "' + x.text + '"');
  await pg.close();
}
await br.close(); srv.close();
if (errs.length) bad.push("page errors: " + errs.join(" | "));
console.log((PLANT ? "[plant " + PLANT + "] " : "") + checks + " checks, " + runs + " text runs measured; " + bad.length + " failed");
bad.slice(0, 30).forEach((b) => console.log("  " + b));
process.exit(bad.length ? 1 : 0);

/* The flash cards' two lists, "Know it" and "Study it", driven through the page as a student would.
   node verify/flashcards.mjs            the checks
   node verify/flashcards.mjs --plant    each plant breaks one thing the checks exist to catch, and must fail them

   What it proves: marking puts a card in a list and goes on to the next; a card is in one list at most; pressing the mark
   again takes it out and stays; the lists survive a reload, under this site's own name (another acronym site's lists, or the
   old shared key, change nothing here); the Study it deck holds only that list, and a card moved out leaves it; an empty list
   says so; the list view shows both lists A to Z and opens a card; clearing asks first; a blocked storage still works for the
   visit; K and S mark from the keyboard. */
let chromium;
try { ({ chromium } = await import("playwright")); } catch (e) { ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs")); }
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };
const SITE = /site: "([^"]+)"/.exec(readFileSync(join(ROOT, "js/common.js"), "utf8"))[1];
const OTHER = SITE === "cysa-acronyms" ? "security-acronyms" : "cysa-acronyms";   /* another acronym site, whose lists must never show here */

/* each plant: a change to the page's code, served instead of the real one, and the check it must make fail */
const PLANTS = [
  ["the shared key", 'const LISTS_KEY = `${Scores.site}:flashcards:lists`;', 'const LISTS_KEY = "aplus-arcade:flashcards:lists";', "another site's lists"],
  ["no going on", "} else if (was !== k) go(1);", "} else if (was !== k) render();", "goes on to the next card"],
  ["in both lists", "else { lists[other].delete(item.id); lists[k].add(item.id);", "else { lists[k].add(item.id);", "never in both"],
  ["nothing saved", "try { localStorage.setItem(LISTS_KEY,", "try { if (0) localStorage.setItem(LISTS_KEY,", "survive a reload"],
  ["the deck unfiltered", 'deck = shuffleArray(name === "all" ? ACRONYMS : ACRONYMS.filter((a) => lists[name].has(a.id)));', "deck = shuffleArray(ACRONYMS);", "only the Study it cards"],
  ["a moved card stays", "        deck.splice(index, 1);\n", "", "leaves the Study it deck"],
  ["clearing without asking", '$("clear-btn").addEventListener("click", () => { $("clear-confirm").hidden = false;', '$("clear-btn").addEventListener("click", () => { $("clear-yes").click(); $("clear-confirm").hidden = false;', "asks first"],
  ["hidden that shows", "[hidden] {\n  display: none !important;\n}", "", "the empty list says so"],   /* the site's own rule: .card-controls sets display, so hidden needs it */
  ["no undo", "if (was === k) { lists[k].delete(item.id);", "if (false) { lists[k].delete(item.id);", "takes it out"],
  /* the data is already A to Z, so taking the sort out changes nothing anyone could see: the check is calibrated by sorting Z to A */
  ["the list Z to A", ".sort((a, b) => a.acronym.localeCompare(b.acronym))", ".sort((a, b) => b.acronym.localeCompare(a.acronym))", "A to Z"]
];
const plantArg = process.argv.includes("--plant");

function server(plant) {
  const srv = createServer((req, res) => {
    const u = decodeURIComponent(req.url.split("?")[0]);
    const p = join(ROOT, u === "/" ? "index.html" : u);
    if (!existsSync(p)) { res.writeHead(404); res.end("no"); return; }
    let body = readFileSync(p, "utf8");
    if (plant && body.indexOf(plant[1]) >= 0) body = body.split(plant[1]).join(plant[2]);
    res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" });
    res.end(body);
  });
  return new Promise((r) => srv.listen(0, () => r(srv)));
}

const br = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--headless=new"] });

async function run(plant) {
  if (plant) { const src = readFileSync(join(ROOT, plant[1].startsWith("[hidden]") ? "css/styles.css" : "pages/flashcards.html"), "utf8"); if (src.indexOf(plant[1]) < 0) throw new Error("plant not found in the page: " + plant[0]); }
  const srv = await server(plant), base = "http://127.0.0.1:" + srv.address().port + "/";
  const out = []; let n = 0;
  const check = (ok, what) => { n++; if (!ok) out.push(what); };
  const ctx = await br.newContext({ viewport: { width: 1280, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  /* another site's lists and the old shared key, already in this browser: neither may show here */
  await p.goto(base + "index.html");
  await p.evaluate((other) => { localStorage.setItem(other + ":flashcards:lists", JSON.stringify({ know: [1, 2, 3, 4, 5], study: [6, 7, 8] })); localStorage.setItem("aplus-arcade:flashcards:known", JSON.stringify([9, 10, 11])); localStorage.setItem("aplus-arcade:flashcards:lists", JSON.stringify({ know: [12, 13], study: [14] })); }, OTHER);
  await p.goto(base + "pages/flashcards.html"); await p.waitForTimeout(150);
  /* a click that can't happen (a planted fault hid its button) is a failed step, not a stopped run */
  const clk = async (pg, sel) => { try { await pg.click(sel, { timeout: 2500 }); } catch (e) { out.push("couldn't click " + sel); } };
  const T = (sel) => p.$eval(sel, (e) => e.textContent.trim()).catch(() => "");
  const acr = () => T("#face-acronym");
  const counts = async () => [+(await T("#hud-know")), +(await T("#hud-study"))];
  check(String(await counts()) === "0,0", "another site's lists, or the old shared key, show here: Know it and Study it start at " + (await counts()));
  check(/All cards \(\d+\)/.test(await T("#deck-all")) && (await p.getAttribute("#deck-all", "aria-pressed")) === "true" && /^✓/.test(await T("#deck-all")), "the deck picker starts on All cards, pressed and ticked");
  /* marking: into the list, and on to the next card */
  const a1 = await acr(); await clk(p, "#know-btn");
  const a2 = await acr();
  check(a2 !== a1, "marking Know it goes on to the next card");
  check(String(await counts()) === "1,0" && /added to Know it/.test(await T("#mark-status")), "the first card is in Know it, and the page says so");
  await clk(p, "#study-btn"); const a3 = await acr();
  check(String(await counts()) === "1,1", "the second card is in Study it");
  /* back to it: its badge, its buttons; moved to the other list it's never in both */
  await clk(p, "#prev-btn");
  check((await acr()) === a2 && /In your Study it list/.test(await T("#badge-front")) && !(await p.$eval("#badge-front", (e) => e.hidden)), "back on the second card: its badge says it's in the Study it list");
  check(/In Study it \(undo\)/.test(await T("#study-btn")) && /Move to Know it/.test(await T("#know-btn")) && (await p.getAttribute("#study-btn", "aria-pressed")) === "true", "its buttons say what they'll do: undo Study it, or move it to Know it");
  await clk(p, "#know-btn"); check(String(await counts()) === "2,0", "moved to Know it: never in both lists (" + (await counts()) + ")");
  await clk(p, "#prev-btn"); await clk(p, "#know-btn");
  check(String(await counts()) === "1,0" && (await acr()) === a2 && /taken out of Know it/.test(await T("#mark-status")), "pressed again, the mark takes it out and the card stays");
  await clk(p, "#study-btn");   /* the second card back in Study it; on to the third */
  /* the keyboard: S on the third card */
  await p.keyboard.press("s"); check(String(await counts()) === "1,2", "S marks Study it from the keyboard");
  await p.keyboard.press("k"); check(String(await counts()) === "2,2", "K marks Know it from the keyboard");
  /* a reload: both lists still there */
  await p.reload(); await p.waitForTimeout(150);
  check(String(await counts()) === "2,2", "both lists survive a reload (" + (await counts()) + ")");
  const ours = await p.evaluate((k) => JSON.parse(localStorage.getItem(k) || "{}"), SITE + ":flashcards:lists");
  check(Array.isArray(ours.know) && ours.know.length === 2 && ours.study.length === 2, "saved under this site's own name, " + SITE + ":flashcards:lists");
  /* the Study it deck: only its cards, and one moved out leaves it */
  await clk(p, "#deck-study");
  check((await T("#hud-index")) === "1 / 2" && /^✓ Study it \(2\)/.test(await T("#deck-study")), "the Study it deck: only the Study it cards (" + (await T("#hud-index")) + ")");
  const s1 = await acr();
  await clk(p, "#know-btn");
  check((await T("#hud-index")) === "1 / 1" && (await acr()) !== s1 && String(await counts()) === "3,1", "a card moved to Know it leaves the Study it deck, and the next takes its place");
  await clk(p, "#know-btn");
  check(!(await p.$eval("#empty-deck", (e) => e.hidden)) && (await p.isVisible("#empty-deck")) && !(await p.isVisible("#flashcard")) && !(await p.isVisible("#mark-controls")) && !(await p.isVisible("#nav-controls")) && /Study it list is empty/.test(await T("#empty-text")), "the empty list says so, in place of the card and its buttons");
  await clk(p, "#empty-all"); check(/^✓ All cards/.test(await T("#deck-all")) && (await p.isVisible("#flashcard")), "from the empty list, back to all the cards");
  /* the list view: both lists, A to Z, each acronym opens its card */
  await clk(p, "#study-btn"); await clk(p, "#study-btn");
  await clk(p, "#list-btn");
  const know = await p.$$eval("#list-know .mark-list-item b", (l) => l.map((b) => b.textContent));
  check(know.length === 4 && know.join("|") === know.slice().sort((x, y) => x.localeCompare(y)).join("|"), "the Know it list shows its four cards, A to Z (" + know.join(", ") + ")");
  check(/My Study it list \(2\)/.test(await T("#list-study-h")) && (await p.$$("#list-study .mark-list-item")).length === 2, "the Study it list shows its two");
  await clk(p, "#list-know .mark-list-item >> nth=1");
  check((await acr()) === know[1] && /^✓ Know it/.test(await T("#deck-know")), "an acronym in the list opens its card, in that list's deck");
  /* clearing asks first */
  await clk(p, "#clear-btn");
  check(String(await counts()) === "4,2" && (await p.isVisible("#clear-confirm")), "Clear my lists asks first: nothing cleared yet");
  await clk(p, "#clear-no"); check(String(await counts()) === "4,2" && !(await p.isVisible("#clear-confirm")), "Keep my lists keeps them");
  await clk(p, "#clear-btn"); await clk(p, "#clear-yes");
  check(String(await counts()) === "0,0", "Yes, clear both lists: both empty");
  await p.reload(); await p.waitForTimeout(100); check(String(await counts()) === "0,0", "and still empty after a reload");
  check(!errs.length, "no page errors (" + errs.join("; ") + ")");
  /* storage blocked (a private window): the lists work for the visit */
  const c2 = await br.newContext(); await c2.addInitScript(() => { Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } }); });
  const q = await c2.newPage(); const e2 = []; q.on("pageerror", (e) => e2.push(e.message));
  await q.goto(base + "pages/flashcards.html"); await q.waitForTimeout(150); await clk(q, "#study-btn");
  check(!e2.length && (await q.$eval("#hud-study", (e) => e.textContent)) === "1", "storage blocked: no error, and the list works for this visit");
  await c2.close(); await ctx.close(); srv.close();
  return { n, out };
}

if (!plantArg) {
  const r = await run(null);
  r.out.forEach((x) => console.log("FAIL", x));
  console.log(r.out.length ? r.out.length + " of " + r.n + " checks failed" : "PASS: " + r.n + " checks");
  await br.close(); process.exit(r.out.length ? 1 : 0);
}
let missed = 0;
for (const pl of PLANTS) {
  const r = await run(pl), hit = r.out.some((x) => x.indexOf(pl[3]) >= 0);
  console.log((hit ? "caught  " : "MISSED  ") + pl[0] + (hit ? "" : " (" + r.out.join(" | ") + ")"));
  if (!hit) missed++;
}
console.log(missed ? missed + " of " + PLANTS.length + " plants missed" : "every plant caught (" + PLANTS.length + ")");
await br.close(); process.exit(missed ? 1 : 0);

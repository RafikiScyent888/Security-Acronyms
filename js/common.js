/* =========================================================
   Security+ Acronym Arcade — shared helpers
   Used by every page (dashboard + all games).
   ========================================================= */

const ICONS = {
  cards: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="14" height="14" rx="2.4" fill="currentColor" opacity="0.55"/><rect x="7" y="3" width="14" height="14" rx="2.4" fill="currentColor"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1v3"/><path d="M12 20v3"/><path d="M4.2 4.2l2.1 2.1"/><path d="M17.7 17.7l2.1 2.1"/><path d="M1 12h3"/><path d="M20 12h3"/><path d="M4.2 19.8l2.1-2.1"/><path d="M17.7 6.3l2.1-2.1"/></g></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 18a4.5 4.5 0 1 1 1.1-8.86A5.5 5.5 0 0 1 18.9 11 4 4 0 0 1 18 18.9z" fill="currentColor"/><path d="M9 21l-1.5 3M13 21l-1.5 3M17 21l-1.5 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c1 3-2.5 4.2-2.5 7.4A3.9 3.9 0 0 0 13.3 13c1.1-.2 1.3-1.2.9-2 2 1 3.3 2.9 3.3 5.1A5.5 5.5 0 0 1 6 16.4c0-4 2.7-5.6 3.6-8.4.4-1.3.2-3.4 2.4-6z" fill="currentColor"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16" rx="1.2" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5 12 4l9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h3.5L14 18h3.5M14 6h3.5L21 9.5M17.5 6 21 9.5 17.5 13M17.5 18 21 14.5 17.5 11M3 18h3.5L11 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" fill="currentColor"/><path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 15h4v3h-4z" fill="currentColor"/><path d="M8 21h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.5 9.5 18 20 6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const DISCLAIMER_TEXT =
  "Educational use only. This is an independent study project created for personal learning and exam preparation. " +
  "It is not affiliated with, endorsed by, or sponsored by CompTIA. All acronym content is provided for educational " +
  "reference purposes only.";

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleArray(arr, n) {
  return shuffleArray(arr).slice(0, Math.min(n, arr.length));
}

/** Pick `count` distractor entries whose id differs from `correct.id`. */
function pickDistractors(correct, pool, count) {
  const others = pool.filter((item) => item.id !== correct.id);
  return sampleArray(others, count);
}

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function showToast(message) {
  let el = document.getElementById("app-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "app-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/* ---------- Best-score persistence (localStorage) ---------- */
const Scores = {
  key(game) {
    return `aplus-arcade:best:${game}`;
  },
  getBest(game) {
    const raw = localStorage.getItem(this.key(game));
    return raw ? JSON.parse(raw) : null;
  },
  setBestIfBetter(game, value, higherIsBetter = true) {
    const current = this.getBest(game);
    if (current === null || (higherIsBetter ? value > current : value < current)) {
      localStorage.setItem(this.key(game), JSON.stringify(value));
      return true;
    }
    return false;
  },
};

/* ---------- Pause / Resume overlay ---------- */
class PauseController {
  /**
   * @param {Object} opts
   * @param {Function} [opts.onPause]
   * @param {Function} [opts.onResume]
   */
  constructor(opts = {}) {
    this.onPause = opts.onPause || (() => {});
    this.onResume = opts.onResume || (() => {});
    this.paused = false;
    this._buildOverlay();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.toggle();
    });
  }

  _buildOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "pause-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="overlay-card">
        <h2>Paused</h2>
        <p class="center-note">Take a breath. Resume when you're ready, or head back to the dashboard.</p>
        <div class="overlay-actions">
          <button class="btn btn-primary btn-block" id="pause-resume-btn">${ICONS.check} Resume</button>
          <a class="btn btn-ghost btn-block" href="${dashboardPath()}">${ICONS.home} Main Menu</a>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#pause-resume-btn").addEventListener("click", () => this.resume());
    this.overlay = overlay;
  }

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.overlay.hidden = false;
    this.onPause();
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.overlay.hidden = true;
    this.onResume();
  }

  toggle() {
    this.paused ? this.resume() : this.pause();
  }
}

function dashboardPath() {
  return document.body.dataset.depth === "1" ? "../index.html" : "index.html";
}

function assetPath(rel) {
  return document.body.dataset.depth === "1" ? `../${rel}` : rel;
}

/* ---------- Shared page chrome ---------- */
function renderTopbar({ backLabel = "Dashboard" } = {}) {
  const el = document.getElementById("topbar");
  if (!el) return;
  el.innerHTML = `
    <a class="brand" href="${dashboardPath()}">
      <span class="brand-badge">${ICONS.bolt}</span>
      Security+ Acronym Arcade
    </a>
    <div class="topbar-actions">
      <a class="btn btn-ghost" href="${dashboardPath()}">${ICONS.home} ${backLabel}</a>
    </div>`;
}

function renderDisclaimer(target) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
  el.innerHTML = `<strong>Disclaimer:</strong> ${DISCLAIMER_TEXT}`;
}

function renderFooter(target) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
    <p><strong>Disclaimer:</strong> ${DISCLAIMER_TEXT}</p>
    <p>&copy; ${year} Security+ Acronym Arcade &middot; Built for CompTIA Security+ exam prep</p>`;
}

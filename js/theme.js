/* =====================================================================
   LIGHT / DARK — THE STUDENT'S CHOICE, AND IT STICKS.

   Until now this site had no toggle at all. The dark theme arrived by
   itself, from the operating system, and a student who found it
   unreadable had no way out of it from inside the page. That is the
   whole reason this file exists.

   ---------------------------------------------------------------------
   IT RUNS IN <head>, ON PURPOSE, AND IT BLOCKS

   A theme applied after the body has painted is a white flash in the
   face of somebody with light sensitivity. So this is a synchronous
   script in the head: the parser stops, the attribute lands on <html>,
   and the first paint is already correct. Deferring it or moving it to
   the bottom of the body would undo the point of it.

   ---------------------------------------------------------------------
   IT ALWAYS STAMPS AN EXPLICIT THEME

   Even when the student has never chosen. That collapses the CSS to a
   single path — `[data-theme="dark"]` — instead of two that have to be
   kept in step by hand. Keeping them in step by hand is exactly how the
   disclaimer panel ended up with a dark rule the media query never got,
   and how the quiz-option colours ended up missing from one of the two
   copies.

   The stamp is not the same thing as a choice. Nothing is written to
   storage until the student presses the button. Before that the page
   follows the operating system live — flip the OS to dark with the tab
   open and the page follows. After that, their choice wins and the OS
   is ignored, because a student who has said "I need this light" should
   not be overruled at sunset by a phone setting.

   ---------------------------------------------------------------------
   STORAGE CAN THROW

   Private windows, blocked site data, a school-managed browser. Every
   read and write is wrapped. A student whose storage is unavailable
   gets a toggle that works for the page they are on and forgets
   afterwards, which is worse than persistence and far better than a
   thrown exception that kills the rest of the script.
   ===================================================================== */
(function (global) {
  "use strict";

  var KEY = "secacr:theme";
  var LIGHT = "light";
  var DARK = "dark";

  /* The colour the browser paints its own chrome with — the phone's
     status bar and the address bar. If it stays sky blue on a dark page
     there is a bright band above the content, which is the one part of
     the screen the page cannot dim. Each page ships its own light
     value, matching its tile, so that one is read rather than assumed. */
  var meta = document.querySelector('meta[name="theme-color"]');
  var LIGHT_CHROME = meta ? meta.getAttribute("content") : "#4db4f0";
  var DARK_CHROME = "#0f2b40";

  var mq = global.matchMedia ? global.matchMedia("(prefers-color-scheme: dark)") : null;

  function read() {
    var v = null;
    try { v = global.localStorage.getItem(KEY); } catch (e) { v = null; }
    return (v === LIGHT || v === DARK) ? v : null;
  }

  function write(v) {
    try { global.localStorage.setItem(KEY, v); return true; }
    catch (e) { return false; }
  }

  function systemTheme() {
    return (mq && mq.matches) ? DARK : LIGHT;
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (meta) meta.setAttribute("content", theme === DARK ? DARK_CHROME : LIGHT_CHROME);
  }

  /* --- boot, before anything paints ---------------------------------- */
  var chosen = read();
  apply(chosen || systemTheme());

  /* Only while the student has not chosen. `addEventListener` on a media
     query list is the modern form; `addListener` is what older WebKit
     has, and some of these students are on old hardware. */
  function follow(e) {
    if (read()) return;                       /* they have chosen: stop following */
    apply(e.matches ? DARK : LIGHT);
    if (typeof Theme.onchange === "function") Theme.onchange(Theme.current(), false);
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener("change", follow);
    else if (mq.addListener) mq.addListener(follow);
  }

  var Theme = {
    LIGHT: LIGHT,
    DARK: DARK,

    /** What is on screen right now, chosen or not. */
    current: function () {
      return document.documentElement.getAttribute("data-theme") === DARK ? DARK : LIGHT;
    },

    /** What the student picked, or null if they never have. */
    chosen: read,

    /** The theme the button would move them to. */
    next: function () {
      return Theme.current() === DARK ? LIGHT : DARK;
    },

    set: function (theme) {
      theme = (theme === DARK) ? DARK : LIGHT;
      apply(theme);
      var saved = write(theme);
      if (typeof Theme.onchange === "function") Theme.onchange(theme, saved);
      return theme;
    },

    toggle: function () {
      return Theme.set(Theme.next());
    },

    /** Words for the button. They name the DESTINATION, not the state —
        a button says what pressing it does. */
    label: function () {
      return Theme.next() === DARK ? "Dark mode" : "Light mode";
    },

    /** The unabbreviated version, for screen readers and for the tooltip,
        because "Dark mode" alone is ambiguous about which way it goes. */
    description: function () {
      return Theme.next() === DARK
        ? "Switch to dark mode. Currently light mode."
        : "Switch to light mode. Currently dark mode.";
    },

    /** Set by common.js so the button can repaint itself when the
        operating system changes underneath an undecided student. */
    onchange: null
  };

  global.Theme = Theme;
})(window);

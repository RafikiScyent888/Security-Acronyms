# Security+ Acronym Arcade

A free, static website for studying **334 acronyms** from a CompTIA Security+ acronym/definition reference — as flashcards and four study games. No build step, no dependencies, no backend. Open `index.html` or host it on GitHub Pages.

> **Disclaimer — Educational use only.** This is an independent study project created for personal learning and exam preparation. It is **not affiliated with, endorsed by, or sponsored by CompTIA**. All acronym content is provided for educational reference purposes only.

## Preview

### Dashboard (desktop & mobile)

| Desktop | Mobile |
| --- | --- |
| ![Dashboard desktop](assets/screenshots/dashboard-desktop.png) | ![Dashboard mobile](assets/screenshots/dashboard-mobile.png) |

The main page uses a sky-blue canvas. Each tile has its own themed color:

| Tile | Theme | Colors |
| --- | --- | --- |
| Flashcards | Green | `#34d399 → #059669` |
| Match | Sun | `#ffd166 → #f59e0b` |
| Memory | Dark storm cloud | `#64748b → #1e293b` |
| Test | Fire | `#fb923c → #dc2626` |
| Blitz | Lightning | `#fef08a → #7c3aed` |

### Games

| Flashcards | Match |
| --- | --- |
| ![Flashcards](assets/screenshots/flashcards.png) | ![Match](assets/screenshots/match.png) |

| Memory | Test |
| --- | --- |
| ![Memory](assets/screenshots/memory.png) | ![Test](assets/screenshots/test.png) |

| Blitz | Mobile (flashcards) |
| --- | --- |
| ![Blitz](assets/screenshots/blitz.png) | ![Flashcards mobile](assets/screenshots/flashcards-mobile.png) |

## Features

- **Flashcards** — classic flip cards: acronym on the front, full expansion + definition on the back. Shuffle, step through with keyboard arrows, and mark cards as "known" (saved locally).
- **Match** — tap an acronym, then tap its matching definition across two columns. 8 pairs per round, scored on time and mistakes.
- **Memory** — a concentration/flip grid. Find the 6 acronym ↔ expansion pairs in as few flips as possible.
- **Test** — an untimed 15-question multiple-choice quiz with a results screen and a review list of anything missed.
- **Blitz** — a 60-second, rapid-fire multiple-choice sprint. Track your score and best streak.
- **Pause & resume** on every game — pause any time to stop the clock, then resume or jump back to the dashboard.
- **Best scores** are saved locally in your browser (`localStorage`) — no account or server required.
- **Mobile friendly** — responsive layout, large tap targets, tested down to 375px wide with no horizontal scrolling.
- **Light/dark aware** — colors adapt to your system's light/dark mode preference.

## Data source

All 334 acronym/expansion/definition entries were extracted from `Security Acronyms with definitions.pdf` (included in this repo). The set includes several acronyms with multiple valid meanings in security contexts (e.g. `MAC` = Mandatory Access Control, Media Access Control, *and* Message Authentication Code) — each is kept as its own flashcard/game entry since they're genuinely different concepts. Data lives in [`data/acronyms.json`](data/acronyms.json) / [`js/acronyms-data.js`](js/acronyms-data.js).

## Project structure

```
├── index.html                 # Main tile dashboard (start here)
├── data/acronyms.json         # Source data (334 entries)
├── js/
│   ├── acronyms-data.js       # Same data, embedded as a JS constant
│   └── common.js              # Shared helpers: icons, pause/resume, scoring, page chrome
├── css/styles.css             # Sky-blue theme, tile colors, responsive layout
├── pages/
│   ├── flashcards.html
│   ├── match.html
│   ├── memory.html
│   ├── test.html
│   └── blitz.html
└── assets/screenshots/        # Preview images used in this README
```

## Running locally

No build tools required — it's plain HTML/CSS/JS.

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly by double-clicking also works, since every page uses relative script/stylesheet paths.

## Hosting on GitHub Pages

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your branch, and set the folder to `/ (root)`.
4. Save — your site will be published at `https://<your-username>.github.io/<repo-name>/`.

## Ideas for future enhancements

A few things that would build nicely on top of this:

- Group cards by topic (encryption, access control, network security, malware, governance/compliance) — the raw data doesn't include categories, but they could be added
- A toggle to disambiguate acronyms with multiple meanings (e.g. show all 3 `MAC` entries together for a quick compare)
- A dark-mode toggle switch (colors already adapt to system preference, but a manual switch is a nice touch)
- Filter to "missed cards only" using the Test/Blitz review data
- A print-friendly flashcard view for offline study
- Sound effects / haptic feedback toggle
- Export/import progress as a JSON file to move between devices

## License / disclaimer

This project is provided as-is for personal, educational use. CompTIA and CompTIA Security+ are trademarks of CompTIA, Inc. This project is an independent study aid and is not affiliated with, endorsed by, or sponsored by CompTIA.

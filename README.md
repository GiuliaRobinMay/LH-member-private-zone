# My Lesko Zone — member private zone (mock-up)

A compact, embeddable widget for **Lesko Help** members: ask a question or build a call sheet, and
keep every answer in one private place. It belongs to the Lesko App Lab family (Credit Score Coach,
Answer Vault) — same cream paper, navy ink, red italics, card suits, hairline borders, system fonts.

**No backend. No database. No build step. No web fonts.** Open `index.html` and it runs.

---

## What it is

One narrow rectangle — `min(720px, 94vw)` — made to sit inside a Mighty Networks space without
competing with it. Four small mono pill tabs at the top:

| Tab | What it does |
|---|---|
| **01 · Ask** | Type a question in your own words. Private — a team member answers, and the answer lands in the same thread. |
| **02 · My questions** | Every question ever asked, each one a single conversation. Unread answers show as a red count on the tab. |
| **03 · Call sheet** | Topic + ZIP (or city) + the problem in the member's own words → a conversational call sheet. |
| **04 · My sheets** | The archive. Every sheet kept, re-openable, tick-marks intact, printable, exportable. |

That's the whole surface. No sidebar, no home page, no app-in-an-app.

### The call sheet is the showpiece

All 14 columns of the current AI Grant Researcher output survive, re-presented as a document a
nervous person can actually use: their own words quoted back, a warm honest opening, **"Start with
this one call"** with a tappable number and a read-aloud script, a numbered plan, then each
organisation as an expandable card with a tick box. *Print or save as PDF* and *Download
spreadsheet* (the original 14 columns plus a Called column) keep the existing habits.

---

## Running it

```bash
open index.html          # just open it
python3 -m http.server   # or serve it, to test inside an iframe
```

`dist/my-lesko-zone.html` is the whole widget inlined into one file — email it, drop it on
Netlify, embed it. Rebuild with `node tools/bundle.js`.

**Embedding in Mighty Networks:** host the folder (Netlify / GitHub Pages, like the other App Lab
tools) and embed the URL. Hash routes (`#/ask`, `#/sheet/…`) survive the iframe and deep-link.

**Demo reset:** *Start the demo over* in the footer (two taps), or `LZ.resetDemo()` in the console.

---

## Real vs simulated

| Real | Simulated |
|---|---|
| Every screen and interaction; threading; ticks; persistence (`localStorage`) | The AI research — sheets come from five prepared, fact-checked examples, re-addressed with the member's words and place |
| Print / PDF and 15-column CSV export | The team's answer (arrives ~6 s after asking) |

The seeded organisations are real programmes (211, LIHEAP, SNAP, SBDC, SCORE, NFCC, Kiva, HUD
counselors, NSF SBIR…), fact-checked to drop ended programmes — still demo content; verify before
members see it.

---

## Files

```
index.html            the widget shell — topbar, masthead, tabs, footer
assets/css/app.css    the App Lab design language, plus print styles
assets/js/seed.js     all demo content (generated; safe to edit by hand)
assets/js/store.js    state + localStorage — the only place data changes
assets/js/views.js    the four faces + thread + call sheet, as HTML strings
assets/js/app.js      tab router, forms, export, copy, print
tools/bundle.js       inlines everything into dist/my-lesko-zone.html
docs/                 what changed in the call sheet, and why
```

## If this gets built for real

1. **Answers** — connect the question threads to the team's question-answering dashboard so replies
   land privately instead of as public comments.
2. **Research** — swap `store.buildSheet()`'s simulation for the real AI call; the 14-column
   contract is preserved end to end.
3. **Identity** — members are already signed in to Mighty; the zone needs to know who they are to
   keep the archive private.

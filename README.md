# My Lesko Zone — member private zone (mock-up)

A compact, embeddable widget for **Lesko Help** members: chat privately with a team member, and
keep every conversation and every call sheet in one place. It belongs to the Lesko App Lab family
(Credit Score Coach, Answer Vault) — same cream paper, navy ink, red accents, card suits, hairline
borders, system fonts.

**No backend. No database. No build step. No web fonts.** Open `index.html` and it runs.

---

## What it is

One narrow rectangle — `min(640px, 94vw)` — made to sit inside a Mighty Networks space without
competing with it. One window with a navy band on top; the dropdown at the right of the band moves
between the aspects of the zone:

| Aspect | What it does |
|---|---|
| **Chat with a Team Member** | Opens on the list of your conversations, like the Messages panel inside Mighty: the team member's photo, the title, their name, and how long ago. A red **Ask us a question** pill floats over the list and opens a pop-up — ZIP code, state, and a big box to really describe what you need. Each conversation is a chat: your messages in solid blue on the right, the team's photo and answer as white cards on the left, with the links and files they send along, and *Was this helpful?* under an answer. Replies go from the bar at the bottom. |
| **My call sheets** | Every call sheet made for you, with its date and how many calls are ticked. A sheet opens straight into the working list: Called tick (stamps the date), phone, email, website, a private note per row, and **Download** for Excel. Call sheets are made elsewhere and land here. |

The team is **Rose, Misty and Tony**. Their real profile photos from the community are wired in
(`assets/js/seed.js`, `teamPhotos`) and load when the widget is hosted; where outside images are
blocked, a coloured initial shows instead. Rose's full name and photo are still to be added.

No sidebar, no home page, no app-in-an-app.

---

## Running it

```bash
open index.html          # just open it
python3 -m http.server   # or serve it, to test inside an iframe
```

`dist/my-lesko-zone.html` is the whole widget inlined into one file — email it, drop it on
Netlify, embed it. Rebuild with `node tools/bundle.js`.

**Embedding in Mighty Networks:** host the folder (Netlify / GitHub Pages, like the other App Lab
tools) and embed the URL. Hash routes (`#/chats`, `#/thread/…`, `#/sheets`, `#/sheet/…`) survive
the iframe and deep-link.

**Demo reset:** *Start the demo over* in the footer (two taps), or `LZ.resetDemo()` in the console.

---

## Real vs simulated

| Real | Simulated |
|---|---|
| Every screen and interaction; threading; ticks; notes; persistence (`localStorage`) | The team's answer (arrives ~5 s after asking) |
| 15-column CSV export of a call sheet | The five seeded call sheets and nine seeded conversations |

The seeded organisations are real programmes (211, LIHEAP, SNAP, SBDC, SCORE, NFCC, Kiva, HUD
counselors, NSF SBIR…), fact-checked to drop ended programmes — still demo content; verify before
members see it.

---

## Files

```
index.html            the widget shell — topbar, the window, footer
assets/css/app.css    the App Lab design language, plus print styles
assets/js/seed.js     all demo content (generated; safe to edit by hand) + the team
assets/js/store.js    state + localStorage — the only place data changes
assets/js/views.js    the conversations list, the chat, the pop-up, the call sheets
assets/js/app.js      router, dropdown, pop-up, chat, export, notes
tools/bundle.js       inlines everything into dist/my-lesko-zone.html
docs/                 what changed in the call sheet, and why
```

## If this gets built for real

1. **Answers** — connect the conversations to the team's question-answering dashboard so replies
   land privately instead of as public comments.
2. **Call sheets** — the research tool writes finished sheets into the member's zone; the
   14-column contract is preserved end to end.
3. **Identity** — members are already signed in to Mighty; the zone needs to know who they are to
   keep the archive private.

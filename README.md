# My Lesko Zone — member private zone (mock-up)

A compact, embeddable widget for **Lesko Help** members: chat privately with a team member, and
keep every conversation and every call sheet in one place. It belongs to the Lesko App Lab family
(Credit Score Coach, Answer Vault) — same cream paper, navy ink, red accents, card suits, hairline
borders, system fonts.

**No backend. No database. No build step. No web fonts.** Open `index.html` and it runs.

---

## What it is

A page, not a widget. The layout language comes from the Mighty pricing page: one split
card with a colour panel beside a white one, big bold numbers, quiet grey labels, hairline
rules and a lot of air — in Lesko Help's own colours.

| Where | What it does |
|---|---|
| **The hero card** | Colour panel on the left with the member's own numbers (conversations, call sheets, new answers). White panel on the right with the three grant coaches, what happens when you ask, and a full-width **Ask a grant coach** button. |
| **My conversations** | Every conversation: the coach's face, their name on top, what it was about underneath in italics, how long ago on the right. An unread answer is one small blue dot. A red pill floats over the list to start a new one. |
| **One conversation** | On a wide screen the list stays on the left and the conversation opens beside it; on a phone the conversation takes the window. The member's words are the community blue on the right, the coach's are soft grey cards with their face on the left, with any files they sent. |
| **The pop-up** | ZIP code, state and a big box to describe what you need — with **Speak it instead**, the browser's own dictation, where the browser allows it. |
| **My call sheets** | Every sheet with its date and how many calls are ticked. A sheet opens straight into the working list: Called tick (stamps the date), phone, email, website, a private note per row, and **Download** for Excel. |

The coaches are **Tony, Misty and Rose**. Their real profile photos from the community are
wired in (`assets/js/seed.js`, `teamPhotos`) and load when the widget is hosted; until then
the illustrated mock-up portraits stand in. Rose's full name and photo are still to come.

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
the iframe and deep-link. The microphone needs the embedding iframe to allow it; where it is
blocked the button says so and points at the phone keyboard's own mic.

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

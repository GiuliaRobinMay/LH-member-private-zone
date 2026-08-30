# My Lesko Zone — member private zone (mock-up)

A clickable, on-brand mock-up of a private member zone for **Lesko Help**. It replaces two things
that live apart today — the public Questions Channel and the off-brand AI call sheet tool — with one
private space where a member's questions, answers, call sheets and follow-ups all stay together.

**No backend. No database. No build step.** Open `index.html` and it runs.

---

## Why it exists

Today, in the live community:

- **Questions are public.** A member posts in the Questions Channel, a team member answers in the
  comments, and the member has to *bookmark their own post* to find the answer again. There is no
  "here is everything I asked and everything I was told".
- **Call sheets come out as a spreadsheet.** The AI Grant Researcher returns 14 columns of dense
  text plus a separate narrative Action Plan. It is built in a third-party tool that is off brand,
  and the result is not saved anywhere the member can go back to.

The members using these tools are frequently older, financially stressed, and not confident with
technology. One of them wrote, in the live channel: *"I'm not very good on the internet. I do have
problems, spelling."* Another asked how to bookmark a call sheet on an iPhone. That audience is the
design constraint that drives everything here.

---

## The five surfaces

| # | Screen | What it does |
|---|--------|--------------|
| 1 | **Ask a question** | Private. Type the question, optionally add a topic and location. Nothing is public. |
| 2 | **Build a call sheet** | Topic + ZIP (or city and state) + **the problem in the member's own words**. That last field is what makes the result feel personal. |
| 3 | **My questions** | Every question ever asked. Each one is a **single thread** — the team's answers sit directly underneath the question, and follow-ups stay in the same conversation. |
| 4 | **My call sheets** | The archive. Every sheet kept for good, re-openable, with the member's tick-marks intact. Printable and exportable. |
| 5 | **My applications** | The follow-through. Organisations from any call sheet become tracked rows: *not started → called → applied → waiting → they helped me / said no*, each with a 7-step checklist, a note, a follow-up date, the call script to hand, and the phone, website, email and postal address for the ones you write to. |

### The big change: call sheets read like a person, not a spreadsheet

Every one of the original 14 columns is still there — it just isn't a grid any more:

- The member's **own words quoted back** at the top, so the sheet is visibly *theirs*.
- A warm opening that says what was found and what it means.
- **"Start with this one call"** — one hero recommendation with a big tappable phone number, the
  reason it's first, and the exact words to say when they answer.
- A numbered plain-language **action plan**.
- Every other organisation as an **expandable card**: what they do in plain words, who qualifies,
  how much, what to have ready before calling, and a **read-aloud script** with a copy button.
- **Tick boxes** on every row — the pattern Lesko print materials already use — saved between visits.
- Gold *"Before you start"* and red *"Watch out"* callouts.
- **Print / save as PDF** and **download as a spreadsheet** (the original 14 columns, plus a
  "Called" column), because that's the habit members already have.

---

## Running it

```bash
# Simplest — just open the file
open index.html

# Or serve it (needed if you want to test it inside an iframe)
python3 -m http.server 8000
# → http://localhost:8000
```

**One file to hand around.** `dist/my-lesko-zone.html` is the whole app inlined into a single
page — email it, put it on a USB stick, open it on a laptop with no wifi. Rebuild it after any
change with `node tools/bundle.js`.

Works on desktop and phone. On small screens the sidebar becomes a bottom tab bar with large
targets, and a plain **Home** button sits in the top bar.

### Embedding in Mighty Networks

The app is a single static page with hash routing (`#/home`, `#/sheet/…`), so it survives being
dropped into an iframe in a Mighty space and can be deep-linked. Host the folder anywhere static
(Netlify, Cloudflare Pages, GitHub Pages) and embed the URL.

---

## What is real and what is simulated

This is a **mock-up for showing the idea**, so some things are staged:

| Real | Simulated |
|------|-----------|
| Every screen, and all navigation between them | The AI research — call sheets are drawn from five prepared examples and re-personalised with the member's own words and location |
| Asking a question, replying, threading | The team's answer, which arrives about six seconds after you ask |
| Ticking off calls, tracker statuses, checklists, notes, follow-up dates | Nothing is sent anywhere — it all stays in this browser |
| Print / PDF and spreadsheet export | — |
| Persistence across refreshes (`localStorage`) | There is no server or database |

The seeded organisations are **real programmes** (211, LIHEAP, SNAP, SBDC, SCORE, HUD-approved
housing counselors, NFCC, Kiva, NSF SBIR and so on) and were fact-checked to remove programmes that
have since ended. They are still demo content: verify before anything goes to members.

To put the demo back to its starting state before showing it to someone, use **Start the demo over**
(in the sidebar, and at the foot of the home screen). `LZ.resetDemo()` in the browser console does
the same thing.

---

## Brand

Drawn from the Lesko Help brand system already in use across the Quick Guides, the onboarding email
sequence and the Pro funnel page.

- **Colours** — cream paper `#FBF6E9`, navy ink `#18234A`, and the four card suits:
  ♠ blue `#2C3FA0` · ♥ red `#E63946` · ♦ gold `#FDC830` · ♣ green `#4FA84F`.
- **Type** — **DM Sans** for everything functional (buttons, labels, forms, body). **Fraunces** only
  for large display titles, with red italic accent words. **JetBrains Mono** for small uppercase
  kicker labels, never for reading.
- **Devices** — the four-suit bar, the `Lesko?Help` wordmark (red *Lesko*, blue **?** badge), the
  giant tonal yellow **?** watermark, the yellow pill CTA with a hard ink drop-shadow, tinted
  callouts with thick coloured left borders, the four-colour stripe divider, and tick boxes on every
  resource row.

> **A note on the serif.** Fraunces is deliberately restricted to page titles here. It is approved
> for digital member-facing surfaces (the funnel page, the onboarding emails) but was rejected for
> printed member cheat-sheets as reading "posh". Every element a member has to *use* is DM Sans.

### Accessibility choices, on purpose

17px base text, 48px minimum tap targets, visible focus rings, real `<label>`s on every field,
`aria-current` on navigation, live regions for progress and confirmations, checkboxes that stay
keyboard-operable, and a print stylesheet that expands every collapsed card so a printed sheet is
complete.

---

## Files

```
index.html              app shell — sidebar, mobile tab bar, fonts
assets/css/app.css      the whole design system
assets/js/seed.js       all demo content (generated; safe to edit by hand)
assets/js/store.js      state + localStorage; the only place data changes
assets/js/views.js      every screen, rendered as HTML strings
assets/js/app.js        hash router, event delegation, export, print
tools/bundle.js         inlines everything into dist/my-lesko-zone.html
dist/my-lesko-zone.html generated single-file build
docs/                   what changed, and why
```

`views.js` is pure — screens take state and return markup. All interaction is wired through
delegated `data-act` attributes in `app.js`, so no view needs to know the router exists.

---

## If this gets built for real

The mock-up deliberately points at three things that need a decision:

1. **Where the answers come from.** The question threads need to connect to the team's
   question-answering dashboard so replies land in the member's private thread rather than a public
   comment.
2. **Where the research runs.** The call sheet generator needs a real backend call. The 14-column
   contract is preserved end to end, so the existing research prompt can feed this presentation
   with only a mapping layer.
3. **Identity.** Members are already signed in to Mighty Networks; the zone needs to know who they
   are to keep the archive private and personal.

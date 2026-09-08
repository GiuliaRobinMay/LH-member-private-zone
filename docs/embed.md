# Embedding My Lesko Zone in Mighty Networks

Live at **https://lh-questions-1on1.netlify.app/**

Paste one of these into a Custom HTML / embed block in Mighty Networks.

---

## The one to use

Responsive height, rounded like a Mighty card, microphone allowed.

```html
<!-- My Lesko Zone — talk to a grant coach 1:1 -->
<div class="lesko-zone">
  <iframe
    src="https://lh-questions-1on1.netlify.app/"
    title="My Lesko Zone — talk to a grant coach 1:1"
    allow="microphone"
    loading="lazy"></iframe>
</div>

<style>
  .lesko-zone iframe {
    display: block;
    width: 100%;
    height: 1200px;
    border: 0;
    border-radius: 20px;
    background: #f5eeda;
  }
  @media (max-width: 900px) {
    .lesko-zone iframe { height: 1320px; }
  }
  @media (max-width: 620px) {
    .lesko-zone iframe { height: 1420px; border-radius: 14px; }
  }
</style>
```

## If the block only accepts a bare tag

```html
<iframe src="https://lh-questions-1on1.netlify.app/" title="My Lesko Zone" allow="microphone" width="100%" height="1200" frameborder="0" style="display:block;width:100%;height:1200px;border:0;border-radius:20px;background:#f5eeda"></iframe>
```

## If iframes are stripped altogether

Some Mighty blocks sanitise HTML. Then link out instead:

```html
<a href="https://lh-questions-1on1.netlify.app/" target="_blank" rel="noopener"
   style="display:inline-block;font:700 13px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:linear-gradient(90deg,#ef5b52,#e8453c);padding:16px 28px;border-radius:999px;text-decoration:none">
  Ask a grant coach 1:1
</a>
```

---

## Why each attribute is there

| Attribute | Why |
|---|---|
| `allow="microphone"` | **Required for dictation.** Without it the browser blocks the mic inside the iframe; the app then says so and points at the phone keyboard's own mic. |
| `height` | The page cannot tell Mighty how tall it is, so the height is fixed. 1200px fits both the list (1054px) and an open conversation (1200px) at desktop width with no inner scrollbar; the media queries cover phones. |
| `background:#f5eeda` | The zone's own cream, so there is no white flash before it paints. |
| `loading="lazy"` | Only loads when the member scrolls to it. Drop it if the embed sits at the top of the page. |
| no `sandbox` | A `sandbox` attribute would block `localStorage` and the microphone. Leave it off. |

## Deep links

Add a hash to open straight into one screen:

| URL | Opens |
|---|---|
| `…netlify.app/` | The zone, with the conversations |
| `…netlify.app/#/sheets` | My call sheets |
| `…netlify.app/#/chats` | My conversations |

## Two things to know

1. **Storage in an iframe.** The demo keeps state in `localStorage`. Safari and Brave partition or block that for third-party iframes, so a member there may find the demo reset on their next visit. The app catches it and keeps working for the session — nothing errors.
2. **It is still a mock-up.** Answers are simulated (~5 s after asking) and the content is seeded. Anyone who opens it can click through everything, which is the point for a demo, but nothing is saved anywhere but their own browser.

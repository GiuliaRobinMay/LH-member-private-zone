/* ==================================================================
   views.js — the screens of My Lesko Zone.

   Two tabs, everything visible, almost no copy:
     Questions   — a chat. Compose bar, conversation list, bubbles.
     Call sheets — the short form and the archive on one screen,
                   plus the finished call sheet document.
   Views are pure: state in, markup out. app.js wires interaction
   through data-act attributes.
   ================================================================== */

(function (global) {
  "use strict";

  var store = global.LZ.store;

  /* ---------------------------------------------------------- helpers */

  function esc(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Escape, then make bare URLs and phone numbers tappable. */
  function rich(s) {
    var out = esc(s);
    out = out.replace(/(https?:\/\/[^\s<)"']+)/g, function (m) {
      var href = m.replace(/[.,;:)]+$/, "");
      var tail = m.slice(href.length);
      return (
        '<a href="' + href + '" target="_blank" rel="noopener">' +
        href.replace(/^https?:\/\//, "") +
        "</a>" + tail
      );
    });
    out = out.replace(
      /\b(1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g,
      function (m) {
        return '<a href="tel:' + m.replace(/[^\d+]/g, "") + '">' + m + "</a>";
      }
    );
    return out;
  }

  function tel(phone) {
    return String(phone || "").replace(/[^\d+]/g, "");
  }

  /**
   * A "phone" is not always a number — some offices publish a route in
   * words instead. Split the dialable part from the guidance so the green
   * pill always holds a real number.
   */
  function phoneParts(raw) {
    var s = String(raw || "").trim();
    if (!s) return { number: "", note: "" };

    var num = "";
    var shortCode = s.match(/^(2-?1-?1|9-?8-?8)\b/);
    if (shortCode) {
      num = shortCode[0];
    } else {
      var m = s.match(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      if (m) num = m[0].trim();
    }

    var note = num ? s.replace(num, " ") : s;
    note = note.replace(/^[\s,.;:()-]+/, "").replace(/[\s,.;:]+$/, "").trim();
    note = note.replace(/^(?:or|and|is)\s+/i, "");

    var opens = (note.match(/\(/g) || []).length;
    var closes = (note.match(/\)/g) || []).length;
    if (closes > opens) note = note.replace(/\)/g, "");
    if (opens > closes) note = note.replace(/\(/g, "");

    note = note.replace(/^[\s,.;:-]+/, "").trim();
    note = note.replace(/[\s,]*\b(?:is|are|at|on|to|or|and|call|dial|phone)\s*[.:,]?$/i, "");
    note = note.replace(/[\s,;:]+$/, "");
    if (note.length < 8) note = "";

    return { number: num, note: note };
  }

  function phonePill(phone, small) {
    var parts = phoneParts(phone);
    var out = "";
    if (parts.number) {
      out +=
        '<a class="phone-pill' + (small ? " sm" : "") + '" href="tel:' +
        esc(tel(parts.number)) +
        '"><span aria-hidden="true">&#9742;</span>' +
        '<span><span class="sr-only">Call </span>' +
        esc(parts.number) + "</span></a>";
    }
    if (parts.note) {
      out += '<span class="phone-note">' + rich(parts.note) + "</span>";
    }
    return out;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return esc(iso);
    return d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  /** Very short relative time for the chat list: "2d", "3h", "now". */
  function agoShort(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var mins = Math.round((Date.now() - then) / 60000);
    if (mins < 2) return "now";
    if (mins < 60) return mins + "m";
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + "h";
    var days = Math.round(hrs / 24);
    if (days < 31) return days + "d";
    var months = Math.round(days / 30);
    if (months < 12) return months + "mo";
    return Math.round(months / 12) + "y";
  }

  function unnumber(text) {
    return String(text || "").replace(/^\s*(?:step\s*)?\d+[.):]\s*/i, "");
  }

  function label(key, fallback) {
    var l = store.copy && store.copy.labels;
    return (l && l[key]) || fallback;
  }

  function mini(kind, suit, title, body) {
    if (!body) return "";
    return (
      '<div class="mini ' + kind + '" data-suit="' + suit + '">' +
      '<span class="mono-label">' + esc(title) + "</span>" +
      "<p>" + rich(body) + "</p></div>"
    );
  }

  function scriptBox(text) {
    if (!text) return "";
    return (
      '<div class="script">' +
      '<span class="mono-label">' +
      esc(label("whatToSay", "What to say when they answer")) +
      "</span>" +
      '<p class="words">' + esc(text) + "</p>" +
      '<button class="btn ghost" data-act="copy" data-text="' + esc(text) + '">' +
      "Copy these words</button></div>"
    );
  }

  function privateLine() {
    return (
      '<p class="private-line"><span aria-hidden="true">&#128274;</span>' +
      "<span>Private — only you and the Lesko Help team can see this.</span></p>"
    );
  }

  /* =================================================== QUESTIONS (chat) */

  function chat() {
    var qs = store.state.questions;

    var rows = qs
      .map(function (q) {
        var last = q.messages[q.messages.length - 1] || { body: "" };
        var dot = q.unread ? "new" : q.status === "answered" ? "" : "waiting";
        var lastWho = last.role === "team" ? "" : "You: ";
        return (
          '<button class="convo' + (q.unread ? " unread" : "") +
          '" data-act="thread" data-id="' + esc(q.id) + '">' +
          '<span class="c-dot ' + dot + '" aria-hidden="true"></span>' +
          "<span>" +
          '<span class="c-subj">' + esc(q.subject) + "</span>" +
          '<span class="c-prev">' + esc(lastWho + store.shorten(last.body, 80)) + "</span>" +
          "</span>" +
          '<span class="c-when">' + esc(agoShort(q.createdAt)) +
          (q.unread ? '<span class="sr-only"> — new answer</span>' : "") +
          "</span></button>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      '<form class="compose" id="new-q">' +
      '<label class="sr-only" for="q-input">Type your question</label>' +
      '<textarea id="q-input" rows="1" placeholder="Type your question here&hellip;"></textarea>' +
      '<button class="send" type="submit" aria-label="Send my question">&#8593;</button>' +
      "</form>" +
      privateLine() +
      '<div class="convos">' + rows + "</div>" +
      "</section>"
    );
  }

  /* ------------------------------------------------------- one thread */

  function thread(id) {
    var q = store.getQuestion(id);
    if (!q) return notFound("conversation", "q");

    var msgs = q.messages
      .map(function (m) {
        var isTeam = m.role === "team";
        return (
          '<div class="brow ' + (isTeam ? "team" : "me") + '">' +
          '<div class="bubble">' +
          (isTeam ? '<span class="b-who">' + esc(m.name) + " &middot; Lesko Help</span>" : "") +
          rich(m.body) +
          "</div></div>" +
          '<div class="bmeta">' + esc(store.ago(m.createdAt) || m.ago) + "</div>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      '<div class="thread-head">' +
      '<button class="backlink" data-act="go" data-to="q" style="margin:0">&larr; My questions</button>' +
      (q.status === "waiting"
        ? '<span class="badge wait">' + esc(label("waiting", "Waiting for an answer")) + "</span>"
        : "") +
      "</div>" +
      msgs +
      '<div id="typing-slot"></div>' +
      '<form class="compose" id="reply-form" style="margin-top:10px">' +
      '<label class="sr-only" for="reply-input">Write back</label>' +
      '<textarea id="reply-input" rows="1" placeholder="Write back&hellip;"></textarea>' +
      '<button class="send" type="submit" data-id="' + esc(q.id) +
      '" aria-label="Send my reply">&#8593;</button>' +
      "</form>" +
      "</section>"
    );
  }

  /** The animated "the team is typing" bubble, injected by app.js. */
  function typingBubble() {
    return (
      '<div class="brow team typing"><div class="bubble" aria-label="The team is typing">' +
      '<span class="d"></span><span class="d"></span><span class="d"></span>' +
      "</div></div>"
    );
  }

  /* ============================================= CALL SHEETS (build tab) */

  function build() {
    var c = store.copy.callsheet;
    var topics = store.copy.topics || [];

    var opts = '<option value="">Choose one&hellip;</option>';
    topics.forEach(function (t) {
      opts += '<option value="' + esc(t.key) + '">' + esc(t.label) + "</option>";
    });

    var list = store.state.sheets;
    var rows = list
      .map(function (sh) {
        var called = (sh.called || []).length;
        var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;
        return (
          '<button class="convo" data-act="sheet" data-id="' + esc(sh.id) + '">' +
          '<span class="c-dot' + (called ? "" : " waiting") + '" aria-hidden="true"></span>' +
          "<span>" +
          '<span class="c-subj">' + esc(sh.title) + "</span>" +
          '<span class="c-prev">' + esc(place) + " &middot; " + sh.orgs.length +
          " places to call" + (called ? " &middot; " + called + " called" : "") + "</span>" +
          "</span>" +
          '<span class="c-when">' + esc(agoShort(sh.createdAt)) + "</span></button>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      '<form class="form-card" id="build-form" novalidate>' +
      '<div class="field">' +
      '<label for="b-topic">What do you need help with?</label>' +
      '<select id="b-topic">' + opts + "</select></div>" +
      '<div class="field">' +
      '<label for="b-where">Where are you?</label>' +
      '<input id="b-where" placeholder="ZIP code, or city and state"></div>' +
      '<div class="field">' +
      '<label for="b-problem">Tell us what&rsquo;s going on</label>' +
      '<textarea id="b-problem" placeholder="Your own words are perfect — spelling doesn&rsquo;t matter."></textarea>' +
      "</div>" +
      '<p class="form-error" id="build-error"></p>' +
      '<button class="btn big" type="submit">' + esc(c.button || "Find my help") + "</button>" +
      "</form>" +
      privateLine() +
      (list.length
        ? '<div class="mono-label" style="margin-bottom:8px">Your call sheets</div>' +
          '<div class="convos">' + rows + "</div>"
        : "") +
      "</section>"
    );
  }

  function generating() {
    return (
      '<section class="panel"><div class="card generating">' +
      '<div class="suits" aria-hidden="true"><span>&spades;</span><span>&hearts;</span><span>&diams;</span><span>&clubs;</span></div>' +
      '<p class="progress-msg" id="progress-msg" role="status" aria-live="polite"></p>' +
      '<div class="bar"><i id="progress-bar"></i></div>' +
      "</div></section>"
    );
  }

  /* ------------------------------------------------- one call sheet */

  function sheet(id) {
    var sh = store.getSheet(id);
    if (!sh) return notFound("call sheet", "build");

    var firstOrg = null;
    sh.orgs.forEach(function (o) {
      if (o.id === sh.firstCall.orgId) firstOrg = o;
    });
    if (!firstOrg) firstOrg = sh.orgs[0];

    var rest = sh.orgs.filter(function (o) {
      return o.id !== firstOrg.id;
    });

    var calledCount = (sh.called || []).length;

    var steps = sh.plan
      .map(function (p, i) {
        return (
          '<li><span class="n" aria-hidden="true">' + (i + 1) + "</span>" +
          "<div><b>" + esc(unnumber(p.title)) + "</b><p>" + rich(p.body) + "</p></div></li>"
        );
      })
      .join("");

    var orgCards = rest.map(function (o) {
      return orgCard(sh, o);
    }).join("");

    return (
      '<section class="panel">' +
      '<button class="backlink" data-act="go" data-to="build">&larr; My call sheets</button>' +

      '<div class="badges">' +
      '<span class="badge warm">' + esc(sh.topic) + "</span>" +
      '<span class="badge">' + esc(fmtDate(sh.createdAt)) + "</span>" +
      (calledCount
        ? '<span class="badge good">' + calledCount + " of " + sh.orgs.length + " called</span>"
        : "") +
      "</div>" +
      '<h2 class="sheet-title">' + esc(sh.title) + "</h2>" +

      '<div class="note"><span class="mono-label">What you told us</span>' +
      '<p class="said">&ldquo;' + esc(sh.problem) + "&rdquo;</p></div>" +

      '<p class="opening">' + rich(sh.opening) + "</p>" +

      mini("t-yellow", "♦", "Before you start", sh.beforeYouStart) +
      (sh.watchOut ? mini("t-red", "♥", "Watch out for this", sh.watchOut) : "") +

      '<div class="first-call">' +
      '<span class="mono-label"><i>&diams;</i> ' +
      esc(label("firstCall", "Start with this one call")) + "</span>" +
      "<h3>" + esc(firstOrg.name) + "</h3>" +
      '<p class="why">' + rich(sh.firstCall.why) + "</p>" +
      '<div class="contact-row">' +
      phonePill(firstOrg.phone) +
      (firstOrg.url
        ? '<a class="btn ghost" href="' + esc(firstOrg.url) + '" target="_blank" rel="noopener">Their website</a>'
        : "") +
      "</div>" +
      scriptBox(sh.firstCall.whatToSay) +
      "</div>" +

      '<div class="card">' +
      '<span class="mono-label">Your plan &mdash; what to do, in order</span>' +
      '<ol class="steps" style="margin-top:8px">' + steps + "</ol></div>" +

      '<div style="margin:18px 0 10px">' +
      '<span class="mono-label" style="color:var(--red)">' +
      esc(label("thenCall", "Then make these calls")) + "</span>" +
      '<p style="margin:4px 0 0;font-size:14px;color:var(--ink-soft)">' + rest.length +
      " more places. Tick each one off as you call it.</p></div>" +
      '<div class="orgs">' + orgCards + "</div>" +

      '<div class="sheet-actions">' +
      '<button class="btn ghost" data-act="print">' +
      esc(label("printSave", "Print or save as PDF")) + "</button>" +
      '<button class="btn ghost" data-act="export-csv" data-sheet="' + esc(sh.id) + '">Download spreadsheet</button>' +
      "</div>" +
      "</section>"
    );
  }

  function orgCard(sh, org) {
    var done = store.isCalled(sh.id, org.id);
    var cid = "org-" + sh.id + "-" + org.id;

    return (
      '<article class="org' + (done ? " done" : "") + '" id="' + esc(cid) + '">' +
      '<div class="org-head">' +
      '<label class="called-box">' +
      '<input type="checkbox" data-act="called" data-sheet="' + esc(sh.id) +
      '" data-org="' + esc(org.id) + '"' + (done ? " checked" : "") +
      ' aria-label="' + esc(label("markCalled", "Mark as called") + ": " + org.name) + '">' +
      '<span class="cl" aria-hidden="true">Called</span></label>' +
      "<div>" +
      '<p class="org-name">' + esc(org.name) + "</p>" +
      '<p class="org-what">' + rich(org.plainWhat) + "</p>" +
      '<div class="org-row">' +
      phonePill(org.phone, true) +
      '<span class="badge' + (org.moneyType && /free/i.test(org.moneyType) ? "" : " warm") + '">' +
      esc(org.maxAmount || org.moneyType || "") + "</span>" +
      "</div></div>" +
      '<button class="org-toggle" data-act="toggle-org" data-target="' + esc(cid) +
      '" aria-expanded="false" aria-controls="' + esc(cid) + '-d">' +
      '<span aria-hidden="true">&#9662;</span>' +
      '<span class="sr-only">Show the details for ' + esc(org.name) + "</span></button>" +
      "</div>" +

      '<div class="org-detail" id="' + esc(cid) + '-d" hidden>' +
      '<dl class="facts">' +
      fact(label("whoFor", "Who this is for"), org.whoQualifies) +
      fact("Where they help", org.area) +
      fact("When to apply", org.whenToApply) +
      fact(label("freeStuff", "What you get free"), org.freeServices) +
      fact("Kind of help", org.moneyType) +
      fact(label("howMuch", "How much"), org.maxAmount) +
      "</dl>" +
      (org.beforeYouCall
        ? '<div class="note"><span class="mono-label">' +
          esc(label("beforeCall", "Before you call")) + "</span><p>" +
          rich(org.beforeYouCall) + "</p></div>"
        : "") +
      scriptBox(org.script) +
      '<div class="org-links">' +
      (org.url
        ? '<a class="btn ghost" href="' + esc(org.url) + '" target="_blank" rel="noopener">Their website</a>'
        : "") +
      (org.email
        ? '<a class="btn ghost" href="mailto:' + esc(org.email) + '">Email them</a>'
        : "") +
      "</div>" +
      (org.address ? '<p class="org-address">' + esc(org.address) + "</p>" : "") +
      "</div></article>"
    );
  }

  function fact(term, value) {
    if (!value) return "";
    return '<div class="fact"><dt>' + esc(term) + "</dt><dd>" + esc(value) + "</dd></div>";
  }

  /* --------------------------------------------------------- fallback */

  function notFound(what, backTo) {
    return (
      '<section class="panel"><div class="card empty-note">' +
      '<div class="q" aria-hidden="true">?</div>' +
      "<h3>We could not find that " + esc(what) + "</h3>" +
      '<button class="btn" data-act="go" data-to="' + esc(backTo) + '">Go back</button>' +
      "</div></section>"
    );
  }

  /* ----------------------------------------------------------- export */

  global.LZ = global.LZ || {};
  global.LZ.views = {
    chat: chat,
    thread: thread,
    typingBubble: typingBubble,
    build: build,
    generating: generating,
    sheet: sheet,
    esc: esc,
  };
})(window);

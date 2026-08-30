/* ==================================================================
   views.js — every screen in My Lesko Zone, rendered to HTML strings.

   Four small faces behind the tab row — Ask, My questions, Call
   sheet, My call sheets — plus the two detail views (a question
   thread, a finished call sheet) and the "building your sheet"
   moment. Views are pure: state in, markup out. app.js wires all
   interaction through data-act attributes.
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
   * A "phone" is not always a number. Where an office publishes no direct
   * line, the research says so in words. Split the dialable part from the
   * guidance so the green pill always holds a real number.
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

  /** Content sometimes arrives with its own "1. " prefix; the numbered
      circle already supplies the number, so drop it. */
  function unnumber(text) {
    return String(text || "").replace(/^\s*(?:step\s*)?\d+[.):]\s*/i, "");
  }

  function label(key, fallback) {
    var l = store.copy && store.copy.labels;
    return (l && l[key]) || fallback;
  }

  function topicLabel(key) {
    var list = (store.copy && store.copy.topics) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i].label;
    }
    if (!key) return "";
    var words = String(key).replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  function statusBadge(q) {
    if (q.unread) return '<span class="badge hot">New answer</span>';
    if (q.status === "answered")
      return '<span class="badge good">' + esc(label("answered", "Answered")) + "</span>";
    return '<span class="badge wait">' + esc(label("waiting", "Waiting for an answer")) + "</span>";
  }

  function mini(kind, suit, title, body) {
    if (!body) return "";
    return (
      '<div class="mini ' + kind + '" data-suit="' + suit + '">' +
      '<span class="mono-label">' + esc(title) + "</span>" +
      "<p>" + rich(body) + "</p></div>"
    );
  }

  function sectionHead(title, copy) {
    return (
      '<div class="section-head"><h2>' + title + "</h2>" +
      (copy ? '<p class="section-copy">' + esc(copy) + "</p>" : "") +
      "</div>"
    );
  }

  function emptyNote(copy, act, cta) {
    return (
      '<div class="card empty-note">' +
      '<div class="q" aria-hidden="true">?</div>' +
      "<h3>" + esc(copy.title) + "</h3>" +
      "<p>" + esc(copy.body) + "</p>" +
      '<button class="btn" data-act="go" data-to="' + act + '">' +
      esc(cta || copy.cta) + "</button></div>"
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

  /* ========================================================== ASK face */

  function ask() {
    var c = store.copy.ask;
    var f = {};
    (c.fields || []).forEach(function (x) {
      f[x.key] = x;
    });
    var q = f.question || {};
    var topics = store.copy.topics || [];

    var opts = '<option value="">Not sure? Leave this alone.</option>';
    topics.forEach(function (t) {
      opts += '<option value="' + esc(t.key) + '">' + esc(t.label) + "</option>";
    });

    return (
      '<section class="panel">' +
      sectionHead(
        "There is no <em>wrong question.</em>",
        "Say it the way you would say it out loud — spelling doesn't matter one bit. Someone on the Lesko Help team reads every question and answers you right here."
      ) +
      '<form class="form-card" id="ask-form" novalidate>' +
      '<div class="field">' +
      '<label class="mono-label" for="ask-body">What do you need help with?</label>' +
      '<textarea id="ask-body" required placeholder="' +
      esc(q.placeholder || "Example: I'm behind on my electric bill and I don't know who to call.") +
      '"></textarea></div>' +
      '<div class="field-row">' +
      '<div class="field"><label class="mono-label" for="ask-topic">What is this about? <span style="text-transform:none;letter-spacing:0">(optional)</span></label>' +
      '<select id="ask-topic">' + opts + "</select></div>" +
      '<div class="field"><label class="mono-label" for="ask-location">Where do you live? <span style="text-transform:none;letter-spacing:0">(optional)</span></label>' +
      '<input id="ask-location" type="text" placeholder="ZIP code, or city and state" value="' +
      esc(store.member.location || "") + '"></div>' +
      "</div>" +
      '<p class="form-error" id="ask-error">Please type your question first — even a few words is enough.</p>' +
      '<div class="form-actions">' +
      '<button class="btn big" type="submit">' + esc(c.button || "Send my question") + "</button>" +
      '<p class="fine">A real person answers, usually within a day or two.</p>' +
      "</div></form>" +
      '<p class="fine">Demo: your question is saved in this browser only, and a sample answer arrives a few seconds later so you can see how it works.</p>' +
      "</section>"
    );
  }

  /* ================================================= MY QUESTIONS face */

  function questions() {
    var qs = store.state.questions;
    if (!qs.length) {
      return (
        '<section class="panel">' +
        sectionHead("Every question, <em>every answer.</em>", "") +
        emptyNote(store.copy.empty.questions, "ask") +
        "</section>"
      );
    }

    var rows = qs
      .map(function (q) {
        var last = q.messages[q.messages.length - 1] || { body: "" };
        var replies = q.messages.filter(function (m) {
          return m.role === "team";
        }).length;
        return (
          '<button class="rowbtn" data-act="thread" data-id="' + esc(q.id) + '">' +
          '<span class="r-top">' + statusBadge(q) +
          (q.topic ? '<span class="badge">' + esc(topicLabel(q.topic)) + "</span>" : "") +
          "</span>" +
          '<span class="r-title">' + esc(q.subject) + "</span>" +
          '<span class="r-sub">' + esc(store.shorten(last.body, 110)) + "</span>" +
          '<span class="r-meta">' +
          esc(store.ago(q.createdAt) || q.ago) + " &middot; " +
          replies + (replies === 1 ? " reply" : " replies") +
          "</span></button>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      sectionHead(
        "Every question, <em>every answer.</em>",
        "The team's answer lands right under your question — nothing to bookmark, nothing to go hunting for."
      ) +
      '<div class="rows">' + rows + "</div>" +
      "</section>"
    );
  }

  /* ---------------------------------------------------- one thread */

  function thread(id) {
    var q = store.getQuestion(id);
    if (!q) return notFound("question", "questions");

    var msgs = q.messages
      .map(function (m) {
        var isTeam = m.role === "team";
        return (
          '<article class="msg' + (isTeam ? " team" : "") + '">' +
          '<div class="msg-head"><b>' + esc(m.name) + "</b>" +
          (isTeam ? '<span class="badge hot">Lesko Help team</span>' : "") +
          '<span class="when">' + esc(store.ago(m.createdAt) || m.ago) + "</span></div>" +
          '<p class="msg-body">' + rich(m.body) + "</p></article>"
        );
      })
      .join("");

    var waitingNote =
      q.status === "waiting"
        ? '<div class="mini t-blue" data-suit="♠"><span class="mono-label">With the team</span>' +
          "<p>Your question is in. Answers usually come back within a day or two — they will appear right here.</p></div>"
        : "";

    var justSent = q.isNew
      ? mini("t-green", "♣", "Sent", store.copy.ask.confirm)
      : "";

    return (
      '<section class="panel">' +
      '<button class="backlink" data-act="go" data-to="questions">&larr; All my questions</button>' +
      '<h2 class="thread-title">' + esc(q.subject) + "</h2>" +
      '<div class="thread-meta badges">' + statusBadge(q) +
      (q.topic ? '<span class="badge">' + esc(topicLabel(q.topic)) + "</span>" : "") +
      (q.location ? '<span class="badge">' + esc(q.location) + "</span>" : "") +
      '<span class="badge">Asked ' + esc(fmtDate(q.createdAt)) + "</span>" +
      "</div>" +
      justSent +
      msgs +
      waitingNote +
      '<form class="form-card" id="reply-form" style="margin-top:14px">' +
      '<div class="field"><label class="mono-label" for="reply-body">' +
      esc(label("askFollowUp", "Ask a follow-up question")) + "</label>" +
      '<textarea id="reply-body" style="min-height:74px" placeholder="Not sure about something in the answer? Just ask — it stays in this same conversation."></textarea></div>' +
      '<button class="btn" type="submit" data-id="' + esc(q.id) + '">' +
      esc(label("reply", "Send my reply")) + "</button></form>" +
      "</section>"
    );
  }

  /* =================================================== CALL SHEET face */

  function build() {
    var c = store.copy.callsheet;
    var f = {};
    (c.fields || []).forEach(function (x) {
      f[x.key] = x;
    });
    var topics = store.copy.topics || [];

    var opts = '<option value="">Choose the one that fits best&hellip;</option>';
    topics.forEach(function (t) {
      opts +=
        '<option value="' + esc(t.key) + '" data-desc="' + esc(t.desc || "") + '">' +
        esc(t.label) + "</option>";
    });

    return (
      '<section class="panel">' +
      sectionHead(
        "Tell us what&rsquo;s going on. <em>We find who to call.</em>",
        "You get back a list of real places near you — who to call first, what they can do for you, and the exact words to say on the phone."
      ) +
      '<form class="form-card" id="build-form" novalidate>' +
      '<div class="field">' +
      '<label class="mono-label" for="b-topic">What kind of help do you need?</label>' +
      '<select id="b-topic">' + opts + "</select>" +
      '<p class="hint" id="topic-desc"></p></div>' +
      '<div class="field-row">' +
      '<div class="field"><label class="mono-label" for="b-zip">Your ZIP code</label>' +
      '<input id="b-zip" inputmode="numeric" autocomplete="postal-code" placeholder="' +
      esc((f.zip && f.zip.placeholder) || "Example: 14604") + '">' +
      "</div>" +
      '<div class="field"><label class="mono-label" for="b-city">Or your city &amp; state</label>' +
      '<input id="b-city" autocomplete="address-level2" placeholder="Example: Rochester, New York">' +
      "</div></div>" +
      '<p class="hint" style="margin:-6px 0 12px">Either one is fine.</p>' +
      '<div class="field">' +
      '<label class="mono-label" for="b-problem">Tell us in your own words</label>' +
      '<textarea id="b-problem" placeholder="' +
      esc((f.problem && f.problem.placeholder) || "Example: I lost my job in March and I'm three months behind on rent.") +
      '"></textarea>' +
      '<p class="hint">Spelling and grammar do not matter one bit. The more you tell us, the more this list feels made for you.</p>' +
      "</div>" +
      '<p class="form-error" id="build-error"></p>' +
      '<div class="form-actions">' +
      '<button class="btn big" type="submit">' + esc(c.button || "Find my help") + "</button>" +
      '<p class="fine">Takes about half a minute.</p>' +
      "</div></form>" +
      '<p class="fine">Demo: the research is simulated from a small set of prepared examples — pick any topic to see how a finished sheet reads.</p>' +
      "</section>"
    );
  }

  function generating() {
    return (
      '<section class="panel"><div class="card generating">' +
      '<div class="suits" aria-hidden="true"><span>&spades;</span><span>&hearts;</span><span>&diams;</span><span>&clubs;</span></div>' +
      '<p class="progress-msg" id="progress-msg" role="status" aria-live="polite"></p>' +
      '<div class="bar"><i id="progress-bar"></i></div>' +
      '<p class="fine">This usually takes less than a minute.</p>' +
      "</div></section>"
    );
  }

  /* ================================================ MY CALL SHEETS face */

  function sheets() {
    var list = store.state.sheets;
    if (!list.length) {
      return (
        '<section class="panel">' +
        sectionHead("Every call sheet, <em>kept for good.</em>", "") +
        emptyNote(store.copy.empty.callsheets, "build") +
        "</section>"
      );
    }

    var rows = list
      .map(function (sh) {
        var called = (sh.called || []).length;
        var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;
        return (
          '<button class="rowbtn" data-act="sheet" data-id="' + esc(sh.id) + '">' +
          '<span class="r-top"><span class="badge warm">' + esc(sh.topic) + "</span>" +
          (called
            ? '<span class="badge good">' + called + " of " + sh.orgs.length + " called</span>"
            : "") +
          "</span>" +
          '<span class="r-title">' + esc(sh.title) + "</span>" +
          '<span class="r-sub">' + esc(store.shorten(sh.problem, 110)) + "</span>" +
          '<span class="r-meta">' + esc(place) + " &middot; " +
          esc(fmtDate(sh.createdAt)) + " &middot; " + sh.orgs.length +
          " places to call</span></button>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      sectionHead(
        "Every call sheet, <em>kept for good.</em>",
        "Open any of them again — the phone numbers, the scripts and your tick-marks are all still here."
      ) +
      '<div class="rows">' + rows + "</div>" +
      "</section>"
    );
  }

  /* ------------------------------------------------- one call sheet */

  function sheet(id) {
    var sh = store.getSheet(id);
    if (!sh) return notFound("call sheet", "sheets");

    var firstOrg = null;
    sh.orgs.forEach(function (o) {
      if (o.id === sh.firstCall.orgId) firstOrg = o;
    });
    if (!firstOrg) firstOrg = sh.orgs[0];

    var rest = sh.orgs.filter(function (o) {
      return o.id !== firstOrg.id;
    });

    var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;
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
      '<button class="backlink" data-act="go" data-to="sheets">&larr; All my call sheets</button>' +

      '<div class="badges">' +
      '<span class="badge warm">' + esc(sh.topic) + "</span>" +
      '<span class="badge">' + esc(place + (sh.zip && place !== sh.zip ? " " + sh.zip : "")) + "</span>" +
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

      /* ---- the one first call ---- */
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

      /* ---- the plan ---- */
      '<div class="card">' +
      '<span class="mono-label">Your plan &mdash; what to do, in order</span>' +
      '<ol class="steps" style="margin-top:8px">' + steps + "</ol></div>" +

      /* ---- the rest ---- */
      '<div style="margin:18px 0 10px">' +
      '<span class="mono-label" style="color:var(--red)">' +
      esc(label("thenCall", "Then make these calls")) + "</span>" +
      '<p class="section-copy" style="margin:4px 0 0">' + rest.length +
      " more places that can help. Tick each one off as you call it &mdash; your ticks are saved.</p></div>" +
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
      "<p>It may have been removed. Everything else is still here.</p>" +
      '<button class="btn" data-act="go" data-to="' + esc(backTo) + '">Go back</button>' +
      "</div></section>"
    );
  }

  /* ----------------------------------------------------------- export */

  global.LZ = global.LZ || {};
  global.LZ.views = {
    ask: ask,
    questions: questions,
    thread: thread,
    build: build,
    generating: generating,
    sheets: sheets,
    sheet: sheet,
    esc: esc,
  };
})(window);

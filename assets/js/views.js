/* ==========================================================================
   views.js — every screen in My Lesko Zone, rendered to HTML strings.

   Views are pure: they take state and return markup. All interaction is wired
   up by app.js through delegated `data-act` attributes, so nothing here has to
   know about the router.
   ========================================================================== */

(function (global) {
  "use strict";

  var store = global.LZ.store;

  /** Transient UI state owned by app.js — which row is mid-edit. */
  function editState() {
    return (global.LZ.ui && global.LZ.ui.editing) || {};
  }

  /* ======================================================================
     Small helpers
     ====================================================================== */

  function esc(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Escape, then turn bare URLs and phone numbers into real links. */
  function rich(s) {
    var out = esc(s);
    out = out.replace(/(https?:\/\/[^\s<)"']+)/g, function (m) {
      var href = m.replace(/[.,;:)]+$/, "");
      var tail = m.slice(href.length);
      return (
        '<a href="' +
        href +
        '" target="_blank" rel="noopener">' +
        href.replace(/^https?:\/\//, "") +
        "</a>" +
        tail
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

  /**
   * A "phone" is not always a number. Where a small local office publishes no
   * direct line, the research says so in words ("no single statewide line —
   * pick the office for your county at ..."). Split the dialable part from the
   * guidance so the big green button always holds a real number, and the
   * guidance is shown as guidance.
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

    // Pulling the number out can leave an unmatched bracket behind.
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

  /**
   * Some "addresses" are really routing notes ("no office visit needed —
   * counselors work by phone"). Only put an envelope beside a real one.
   */
  function looksPostal(text) {
    var t = String(text || "");
    return (
      /\b\d{5}(-\d{4})?\b/.test(t) ||
      /\b(suite|ste\.?|ave|avenue|blvd|boulevard|street|road|drive|floor|p\.?o\.? box)\b/i.test(t)
    );
  }

  function tel(phone) {
    return String(phone || "").replace(/[^\d+]/g, "");
  }

  function initials(name) {
    var parts = String(name || "?").trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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

  /** Content sometimes arrives with its own "1. " prefix; the numbered tag
      already supplies the number, so drop it. */
  function unnumber(text) {
    return String(text || "").replace(/^\s*(?:step\s*)?\d+[.):]\s*/i, "");
  }

  function label(key, fallback) {
    var l = store.copy && store.copy.labels;
    return (l && l[key]) || fallback;
  }

  function suitsBar() {
    return (
      '<p class="suits" aria-hidden="true"><i class="s">&#9824;</i>' +
      '<i class="h">&#9829;</i><i class="d">&#9830;</i><i class="c">&#9827;</i></p>'
    );
  }

  function stripe() {
    return (
      '<div class="stripe" aria-hidden="true"><span></span><span></span>' +
      "<span></span><span></span></div>"
    );
  }

  function watermark() {
    return '<div class="watermark" aria-hidden="true">?</div>';
  }

  function callout(kind, title, body) {
    if (!body) return "";
    return (
      '<div class="callout ' +
      kind +
      '">' +
      (title ? '<p class="callout-t">' + esc(title) + "</p>" : "") +
      "<p>" +
      rich(body) +
      "</p></div>"
    );
  }

  function pageHead(kicker, title, lede) {
    return (
      '<header class="page-head">' +
      watermark() +
      (kicker ? '<p class="kicker">' + esc(kicker) + "</p>" : "") +
      '<h2 class="display">' +
      title +
      "</h2>" +
      (lede ? '<p class="lede">' + esc(lede) + "</p>" : "") +
      stripe() +
      "</header>"
    );
  }

  function emptyState(copy, act) {
    return (
      '<div class="empty">' +
      watermark() +
      '<div class="q" aria-hidden="true">?</div>' +
      "<h2>" +
      esc(copy.title) +
      "</h2><p>" +
      esc(copy.body) +
      "</p>" +
      '<button class="btn primary" data-act="' +
      act +
      '">' +
      esc(copy.cta) +
      "</button></div>"
    );
  }

  function demoNote(text) {
    return (
      '<p class="demo-note"><b>Demo</b><span>' + esc(text) + "</span></p>"
    );
  }

  function statusMeta(key) {
    var list = (store.copy && store.copy.statuses) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i];
    }
    return { key: key, label: key, line: "" };
  }

  function topicLabel(key) {
    var list = (store.copy && store.copy.topics) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i].label;
    }
    if (!key) return "";
    // Unknown key: show it as words rather than as a slug.
    var words = String(key).replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  /* ======================================================================
     HOME
     ====================================================================== */

  function home() {
    var c = store.copy;
    var n = store.counts();
    var first = store.member.name.split(" ")[0];
    var i;

    var cards = "";
    for (i = 0; i < c.home.cards.length; i++) {
      var card = c.home.cards[i];
      cards +=
        '<button class="action-card" data-act="go" data-to="' +
        esc(card.key) +
        '">' +
        '<span class="ico" aria-hidden="true">' +
        esc(card.icon || "?") +
        "</span>" +
        '<span class="t">' +
        esc(card.title) +
        '</span><span class="d">' +
        esc(card.desc) +
        "</span>" +
        '<span class="go">' +
        esc(card.cta) +
        " &rarr;</span></button>";
    }

    var stats =
      '<div class="stats">' +
      stat(n.questions, n.questions === 1 ? "question asked" : "questions asked") +
      stat(n.sheets, n.sheets === 1 ? "call sheet" : "call sheets") +
      stat(n.openApps, "still working on") +
      stat(n.gotHelp, "got help") +
      "</div>";

    var nudge = "";
    if (n.overdue > 0) {
      nudge = callout(
        "red",
        n.overdue === 1
          ? "1 follow-up is waiting for you"
          : n.overdue + " follow-ups are waiting for you",
        (store.state.trackerMeta.nudges && store.state.trackerMeta.nudges[0]) ||
          "You said you would call back. Today is a good day to do it."
      );
    }

    return (
      '<section class="hero">' +
      watermark() +
      suitsBar() +
      '<h2 class="display">' +
      greeting(c.home.greeting, first) +
      "</h2>" +
      '<p class="lede">' +
      esc(c.home.reassure) +
      "</p>" +
      stripe() +
      "</section>" +
      nudge +
      '<div class="action-cards">' +
      cards +
      "</div>" +
      stats +
      recentStrip() +
      '<p class="demo-note" style="margin-top:22px"><b>Demo</b><span>' +
      "This is a mock-up. Nothing is sent anywhere — everything you do is kept " +
      "in this browser only. " +
      '<button class="linkbtn" data-act="reset">Start the demo over</button>' +
      "</span></p>"
    );
  }

  /**
   * The member's name is set in red italic — the Lesko display accent. The
   * copy may carry a {name} slot or simply trail off, so handle both.
   */
  function greeting(text, first) {
    var t = String(text || "Good to see you,");
    var em = '<em>' + esc(first) + ".</em>";
    if (t.indexOf("{name}") !== -1) {
      return esc(t).replace("{name}", em);
    }
    return esc(t.replace(/[,.\s]+$/, "")) + ", " + em;
  }

  function stat(n, l) {
    return (
      '<div class="stat"><div class="n">' +
      n +
      '</div><div class="l">' +
      esc(l) +
      "</div></div>"
    );
  }

  /** A short "pick up where you left off" strip on Home. */
  function recentStrip() {
    var s = store.state;
    var out = "";
    var q = s.questions[0];
    var sheet = s.sheets[0];

    if (!q && !sheet) return "";

    out += '<h3 style="margin-bottom:12px">Pick up where you left off</h3>';
    out += '<div class="list">';
    if (q) {
      out +=
        '<button class="row" data-act="thread" data-id="' +
        esc(q.id) +
        '">' +
        '<span class="row-top"><span class="chip ' +
        (q.status === "answered" ? "green" : "blue") +
        '">' +
        (q.status === "answered"
          ? label("answered", "Answered")
          : label("waiting", "Waiting for an answer")) +
        '</span><span class="tiny muted">' +
        esc(store.ago(q.createdAt) || q.ago) +
        "</span></span>" +
        '<span class="row-title">' +
        esc(q.subject) +
        "</span>" +
        '<span class="row-sub">' +
        esc(store.shorten(lastMessage(q).body, 130)) +
        "</span></button>";
    }
    if (sheet) {
      out +=
        '<button class="row" data-act="sheet" data-id="' +
        esc(sheet.id) +
        '">' +
        '<span class="row-top"><span class="chip gold">' +
        esc(sheet.topic) +
        '</span><span class="tiny muted">' +
        esc(store.ago(sheet.createdAt) || sheet.ago) +
        "</span></span>" +
        '<span class="row-title">' +
        esc(sheet.title) +
        "</span>" +
        '<span class="row-sub">' +
        esc(sheet.orgs.length) +
        " places to call &middot; " +
        esc([sheet.city, sheet.state].filter(Boolean).join(", ")) +
        "</span></button>";
    }
    out += "</div>";
    return out;
  }

  function lastMessage(thread) {
    return thread.messages[thread.messages.length - 1] || { body: "" };
  }

  /* ======================================================================
     ASK A QUESTION
     ====================================================================== */

  function ask() {
    var c = store.copy.ask;
    var fields = fieldsByKey(c.fields);
    var topics = store.copy.topics;
    var i;

    var opts = '<option value="">Choose one — or leave this blank</option>';
    for (i = 0; i < topics.length; i++) {
      opts +=
        '<option value="' +
        esc(topics[i].key) +
        '">' +
        esc(topics[i].label) +
        "</option>";
    }

    return (
      pageHead("Ask a question", esc(c.heading), "") +
      '<div class="card">' +
      callout("blue", "", c.intro) +
      '<form id="ask-form" novalidate>' +
      '<div class="field">' +
      '<label for="ask-body">' +
      esc(fields.question ? fields.question.label : "What do you need help with?") +
      "</label>" +
      helpP(fields.question) +
      '<textarea class="textarea" id="ask-body" name="body" required placeholder="' +
      esc(fields.question ? fields.question.placeholder : "") +
      '"></textarea>' +
      "</div>" +
      '<div class="grid-2">' +
      '<div class="field">' +
      '<label for="ask-topic">' +
      esc(fields.topic ? fields.topic.label : "What is this about?") +
      "</label>" +
      helpP(fields.topic) +
      '<select class="select" id="ask-topic" name="topic">' +
      opts +
      "</select></div>" +
      '<div class="field">' +
      '<label for="ask-location">' +
      esc(askLoc(fields).label || "Where do you live?") +
      "</label>" +
      helpP(askLoc(fields)) +
      '<input class="input" id="ask-location" name="location" type="text" placeholder="' +
      esc(askLoc(fields).placeholder || "City, State or ZIP") +
      '" value="' +
      esc(prefillLocation(askLoc(fields))) +
      '" /></div>' +
      "</div>" +
      '<p class="tiny muted" id="ask-error" role="alert" style="color:var(--heart);display:none">' +
      "Please type your question first — even a few words is enough.</p>" +
      '<div class="btn-row" style="margin-top:6px">' +
      '<button class="btn primary" type="submit">' +
      esc(c.button) +
      "</button>" +
      '<span class="tiny muted">Only you and the Lesko Help team can see this.</span>' +
      "</div></form></div>" +
      demoNote(
        "This is a mock-up. Your question is saved in this browser only, and a sample answer arrives a few seconds later so you can see how the conversation works."
      )
    );
  }

  /** The location question, whichever key the copy filed it under. */
  function askLoc(fields) {
    return fields.location || fields.zip || fields.city || {};
  }

  /**
   * Prefill the member's location, matched to what the field actually asks
   * for — a bare ZIP if the copy asks for five numbers, otherwise the lot.
   */
  function prefillLocation(field) {
    var loc = store.member.location || "";
    if (field.key === "zip") {
      var zip = loc.match(/\b\d{5}\b/);
      return zip ? zip[0] : loc;
    }
    return loc;
  }

  function helpP(field) {
    if (!field || !field.help) return "";
    return '<p class="help">' + esc(field.help) + "</p>";
  }

  function fieldsByKey(list) {
    var out = {};
    for (var i = 0; i < (list || []).length; i++) out[list[i].key] = list[i];
    return out;
  }

  /* ======================================================================
     MY QUESTIONS — the private inbox
     ====================================================================== */

  function questions(filter) {
    var s = store.state;
    var c = store.copy;
    var i;

    if (!s.questions.length) {
      return (
        pageHead("My questions", "Your questions and answers", "") +
        emptyState(c.empty.questions, "go-ask")
      );
    }

    var shown = s.questions.filter(function (q) {
      if (filter === "answered") return q.status === "answered";
      if (filter === "waiting") return q.status === "waiting";
      return true;
    });

    var rows = "";
    for (i = 0; i < shown.length; i++) {
      rows += questionRow(shown[i]);
    }
    if (!shown.length) {
      rows =
        '<div class="empty"><p style="margin-bottom:0">Nothing here right now. ' +
        "Try the <b>All</b> filter above.</p></div>";
    }

    return (
      pageHead(
        "My questions",
        "Every question you asked, <em>and every answer.</em>",
        "One question, one conversation. The team's answers stay right underneath the question you asked."
      ) +
      '<div class="btn-row" style="margin-bottom:18px">' +
      '<button class="btn primary" data-act="go" data-to="ask">Ask a new question</button>' +
      "</div>" +
      '<div class="filters" role="group" aria-label="Filter questions">' +
      filterBtn("all", "All", filter) +
      filterBtn("answered", label("answered", "Answered"), filter) +
      filterBtn("waiting", label("waiting", "Waiting"), filter) +
      "</div>" +
      '<div class="list">' +
      rows +
      "</div>"
    );
  }

  function filterBtn(key, text, active) {
    return (
      '<button data-act="filter-q" data-filter="' +
      key +
      '" aria-pressed="' +
      (active === key ? "true" : "false") +
      '">' +
      esc(text) +
      "</button>"
    );
  }

  function questionRow(q) {
    var answers = q.messages.filter(function (m) {
      return m.role === "team";
    }).length;

    return (
      '<button class="row" data-act="thread" data-id="' +
      esc(q.id) +
      '">' +
      '<span class="row-top">' +
      '<span class="chip ' +
      (q.status === "answered" ? "green" : "blue") +
      '">' +
      (q.status === "answered"
        ? label("answered", "Answered")
        : label("waiting", "Waiting for an answer")) +
      "</span>" +
      (q.topic
        ? '<span class="chip">' + esc(topicLabel(q.topic) || q.topic) + "</span>"
        : "") +
      (q.unread ? '<span class="chip red">New answer</span>' : "") +
      "</span>" +
      '<span class="row-title">' +
      esc(q.subject) +
      "</span>" +
      '<span class="row-sub">' +
      esc(store.shorten(lastMessage(q).body, 150)) +
      "</span>" +
      '<span class="row-foot">' +
      "<span>" +
      esc(store.ago(q.createdAt) || q.ago) +
      "</span>" +
      "<span>" +
      answers +
      (answers === 1 ? " reply" : " replies") +
      "</span>" +
      (q.location ? "<span>" + esc(q.location) + "</span>" : "") +
      "</span></button>"
    );
  }

  /* ======================================================================
     ONE QUESTION THREAD
     ====================================================================== */

  function thread(id) {
    var q = store.getQuestion(id);
    if (!q) return notFound("question");
    var i;

    var justSent = q.isNew
      ? callout("green", "", store.copy.ask.confirm)
      : "";

    var msgs = "";
    for (i = 0; i < q.messages.length; i++) {
      msgs += message(q.messages[i]);
    }

    var tail;
    if (q.status === "waiting") {
      tail =
        '<div class="waiting-note"><span aria-hidden="true">&#9829;</span>' +
        "<span>The Lesko Help team has your question. Answers usually come back " +
        "within a day or two — we will keep it right here.</span></div>";
    } else {
      tail = "";
    }

    return (
      '<button class="back" data-act="go" data-to="questions">' +
      '<span aria-hidden="true">&larr;</span> Back to my questions</button>' +
      '<header class="page-head">' +
      watermark() +
      '<div class="chips" style="margin-bottom:12px">' +
      '<span class="chip ' +
      (q.status === "answered" ? "green" : "blue") +
      '">' +
      (q.status === "answered"
        ? label("answered", "Answered")
        : label("waiting", "Waiting for an answer")) +
      "</span>" +
      (q.topic
        ? '<span class="chip">' + esc(topicLabel(q.topic) || q.topic) + "</span>"
        : "") +
      (q.location ? '<span class="chip">' + esc(q.location) + "</span>" : "") +
      "</div>" +
      '<h2 class="display" style="font-size:clamp(24px,3.4vw,31px)">' +
      esc(q.subject) +
      "</h2>" +
      '<p class="tiny muted" style="margin:8px 0 0">Asked ' +
      esc(fmtDate(q.createdAt)) +
      " &middot; " +
      esc(store.ago(q.createdAt) || q.ago) +
      "</p>" +
      stripe() +
      "</header>" +
      justSent +
      '<div class="thread">' +
      msgs +
      "</div>" +
      tail +
      '<div class="card reply-box" style="margin-top:18px">' +
      '<form id="reply-form">' +
      '<div class="field" style="margin-bottom:12px">' +
      '<label for="reply-body">' +
      esc(label("askFollowUp", "Ask a follow-up question")) +
      "</label>" +
      '<p class="help">Not sure about something in the answer? Just ask here. ' +
      "It stays in this same conversation.</p>" +
      '<textarea class="textarea" id="reply-body" style="min-height:110px" ' +
      'placeholder="Type your follow-up question…"></textarea></div>' +
      '<button class="btn primary" type="submit" data-id="' +
      esc(q.id) +
      '">' +
      esc(label("reply", "Send my reply")) +
      "</button></form></div>"
    );
  }

  function message(m) {
    var isTeam = m.role === "team";
    return (
      '<article class="msg ' +
      (isTeam ? "team" : "member") +
      '">' +
      '<div class="avatar lg ' +
      (isTeam ? "team" : "") +
      '" aria-hidden="true">' +
      esc(initials(m.name)) +
      "</div>" +
      '<div class="msg-body"><div class="msg-head">' +
      '<span class="msg-name">' +
      esc(m.name) +
      "</span>" +
      (isTeam && m.roleLabel
        ? '<span class="msg-role">' + esc(m.roleLabel) + "</span>"
        : "") +
      '<span class="msg-time">' +
      esc(store.ago(m.createdAt) || m.ago) +
      "</span></div>" +
      '<p class="msg-text">' +
      rich(m.body) +
      "</p></div></article>"
    );
  }

  /* ======================================================================
     BUILD A CALL SHEET
     ====================================================================== */

  function build() {
    var c = store.copy.callsheet;
    var f = fieldsByKey(c.fields);
    var topics = store.copy.topics;
    var i;

    var grid = "";
    for (i = 0; i < topics.length; i++) {
      grid +=
        '<button type="button" class="topic" data-act="pick-topic" data-key="' +
        esc(topics[i].key) +
        '" aria-pressed="false">' +
        '<span class="t">' +
        esc(topics[i].label) +
        "</span>" +
        '<span class="d">' +
        esc(topics[i].desc) +
        "</span></button>";
    }

    return (
      pageHead("Build a call sheet", esc(c.heading), c.intro) +
      '<form id="build-form" novalidate>' +
      '<div class="card">' +
      '<div class="field" style="margin-bottom:10px">' +
      '<span class="label" id="topic-label">' +
      esc(f.topic ? f.topic.label : "What kind of help do you need?") +
      "</span>" +
      helpP(f.topic) +
      '<div class="topic-grid" role="group" aria-labelledby="topic-label">' +
      grid +
      "</div>" +
      '<input type="hidden" id="topic-key" value="" /></div></div>' +
      '<div class="card">' +
      '<div class="field" style="margin-bottom:14px">' +
      '<span class="label">Where are you?</span>' +
      '<p class="help">We use this to find help near you. A ZIP code on its own is fine.</p>' +
      '<div class="segmented" role="group" aria-label="How do you want to give your location?">' +
      '<button type="button" data-act="loc-mode" data-mode="zip" aria-pressed="true">ZIP code</button>' +
      '<button type="button" data-act="loc-mode" data-mode="city" aria-pressed="false">City &amp; state</button>' +
      "</div></div>" +
      '<div id="loc-zip">' +
      '<div class="field"><label for="f-zip">' +
      esc(f.zip ? f.zip.label : "Your ZIP code") +
      "</label>" +
      helpP(f.zip) +
      '<input class="input" id="f-zip" inputmode="numeric" autocomplete="postal-code" ' +
      'placeholder="' +
      esc(f.zip ? f.zip.placeholder : "for example 14604") +
      '" /></div></div>' +
      '<div id="loc-city" hidden><div class="grid-2">' +
      '<div class="field"><label for="f-city">' +
      esc(f.city ? f.city.label : "Your city or town") +
      "</label>" +
      '<input class="input" id="f-city" autocomplete="address-level2" placeholder="' +
      esc(f.city ? f.city.placeholder : "for example Rochester") +
      '" /></div>' +
      '<div class="field"><label for="f-state">' +
      esc(f.state ? f.state.label : "Your state") +
      "</label>" +
      '<input class="input" id="f-state" autocomplete="address-level1" placeholder="' +
      esc(f.state ? f.state.placeholder : "for example New York") +
      '" /></div></div></div>' +
      "</div>" +
      '<div class="card">' +
      '<div class="field" style="margin-bottom:8px">' +
      '<label for="f-problem">' +
      esc(f.problem ? f.problem.label : "Tell us what is going on") +
      "</label>" +
      helpP(f.problem) +
      '<textarea class="textarea" id="f-problem" placeholder="' +
      esc(f.problem ? f.problem.placeholder : "") +
      '"></textarea></div>' +
      callout(
        "gold",
        "",
        "Spelling and grammar do not matter one bit. Say it the way you would say it to a friend."
      ) +
      "</div>" +
      '<p class="tiny" id="build-error" role="alert" style="color:var(--heart);display:none;margin-bottom:10px"></p>' +
      '<div class="btn-row"><button class="btn primary" type="submit">' +
      esc(c.button) +
      "</button>" +
      '<button class="btn ghost" type="button" data-act="go" data-to="sheets">See my old call sheets</button>' +
      "</div></form>" +
      demoNote(
        "This is a mock-up. The research is simulated from a small set of prepared examples, so pick any topic to see how a finished call sheet reads."
      )
    );
  }

  /** The "we are looking this up for you" screen. */
  function generating() {
    return (
      '<div class="generating">' +
      watermark() +
      '<div class="spinner" aria-hidden="true">' +
      '<span style="color:var(--spade)">&#9824;</span>' +
      '<span style="color:var(--heart)">&#9829;</span>' +
      '<span style="color:var(--diamond)">&#9830;</span>' +
      '<span style="color:var(--club)">&#9827;</span></div>' +
      '<p class="progress-msg" id="progress-msg" role="status" aria-live="polite"></p>' +
      '<div class="bar"><i id="progress-bar"></i></div>' +
      '<p class="tiny muted" style="margin-top:18px">This usually takes less than a minute.</p>' +
      "</div>"
    );
  }

  /* ======================================================================
     MY CALL SHEETS — the archive
     ====================================================================== */

  function sheets() {
    var s = store.state;
    var c = store.copy;
    var i;

    if (!s.sheets.length) {
      return (
        pageHead("My call sheets", "Your call sheets", "") +
        emptyState(c.empty.callsheets, "go-build")
      );
    }

    var rows = "";
    for (i = 0; i < s.sheets.length; i++) {
      var sh = s.sheets[i];
      var called = (sh.called || []).length;
      rows +=
        '<button class="row" data-act="sheet" data-id="' +
        esc(sh.id) +
        '">' +
        '<span class="row-top">' +
        '<span class="chip gold">' +
        esc(sh.topic) +
        "</span>" +
        '<span class="chip">' +
        esc([sh.city, sh.state].filter(Boolean).join(", ") || sh.zip) +
        "</span>" +
        (called
          ? '<span class="chip green">' +
            called +
            " of " +
            sh.orgs.length +
            " called</span>"
          : "") +
        "</span>" +
        '<span class="row-title">' +
        esc(sh.title) +
        "</span>" +
        '<span class="row-sub">' +
        esc(store.shorten(sh.problem, 150)) +
        "</span>" +
        '<span class="row-foot"><span>' +
        esc(fmtDate(sh.createdAt)) +
        "</span><span>" +
        sh.orgs.length +
        " places to call</span></span></button>";
    }

    return (
      pageHead(
        "My call sheets",
        "Every call sheet you made, <em>kept for good.</em>",
        "Open any one of them again — the phone numbers, the scripts and your ticks are all still here."
      ) +
      '<div class="btn-row" style="margin-bottom:18px">' +
      '<button class="btn primary" data-act="go" data-to="build">Build a new call sheet</button>' +
      "</div>" +
      '<div class="list">' +
      rows +
      "</div>"
    );
  }

  /* ======================================================================
     ONE CALL SHEET — the showpiece
     ====================================================================== */

  function sheet(id) {
    var sh = store.getSheet(id);
    if (!sh) return notFound("call sheet");
    var i;

    var firstOrg = null;
    for (i = 0; i < sh.orgs.length; i++) {
      if (sh.orgs[i].id === sh.firstCall.orgId) firstOrg = sh.orgs[i];
    }
    if (!firstOrg) firstOrg = sh.orgs[0];

    var rest = sh.orgs.filter(function (o) {
      return o.id !== firstOrg.id;
    });

    /* --- plan steps --- */
    var steps = "";
    for (i = 0; i < sh.plan.length; i++) {
      steps +=
        '<li><span class="numtag n' +
        ((i % 4) + 1) +
        '" aria-hidden="true">' +
        (i + 1) +
        "</span><div><h4>" +
        esc(unnumber(sh.plan[i].title)) +
        "</h4><p>" +
        rich(sh.plan[i].body) +
        "</p></div></li>";
    }

    /* --- the rest of the organisations --- */
    var orgCards = "";
    for (i = 0; i < rest.length; i++) {
      orgCards += orgCard(sh, rest[i], i);
    }

    var place = [sh.city, sh.state].filter(Boolean).join(", ");
    var calledCount = (sh.called || []).length;

    return (
      '<button class="back" data-act="go" data-to="sheets">' +
      '<span aria-hidden="true">&larr;</span> Back to my call sheets</button>' +

      /* ---- header ---- */
      '<header class="sheet-head">' +
      watermark() +
      suitsBar() +
      '<div class="chips" style="margin:12px 0 14px">' +
      '<span class="chip gold">' +
      esc(sh.topic) +
      "</span>" +
      '<span class="chip">' +
      esc(place + (sh.zip ? " " + sh.zip : "")) +
      "</span>" +
      '<span class="chip">' +
      esc(fmtDate(sh.createdAt)) +
      "</span>" +
      (calledCount
        ? '<span class="chip green">' +
          calledCount +
          " of " +
          sh.orgs.length +
          " called</span>"
        : "") +
      "</div>" +
      '<h2 class="display">' +
      esc(sh.title) +
      "</h2>" +
      '<div class="quote"><p class="who">What you told us</p><p>' +
      esc(sh.problem) +
      "</p></div>" +
      '<p class="lede" style="margin:18px 0 0">' +
      rich(sh.opening) +
      "</p>" +
      stripe() +
      "</header>" +

      /* ---- before you start / watch out ---- */
      callout("gold", "Before you start", sh.beforeYouStart) +
      (sh.watchOut ? callout("red", "Watch out for this", sh.watchOut) : "") +

      /* ---- the one first call ---- */
      '<section class="first-call">' +
      '<div class="first-call-bar">' +
      '<span class="suits"><i class="d">&#9830;</i></span>' +
      "<span>" +
      esc(label("firstCall", "Start with this one call")) +
      "</span></div>" +
      '<div class="first-call-body">' +
      watermark() +
      "<h3>" +
      esc(firstOrg.name) +
      "</h3>" +
      '<p style="font-size:17px;margin:0 0 14px">' +
      rich(sh.firstCall.why) +
      "</p>" +
      '<div class="contact-row">' +
      phoneLink(firstOrg.phone) +
      (firstOrg.url
        ? '<a class="btn ghost sm" href="' +
          esc(firstOrg.url) +
          '" target="_blank" rel="noopener">Open their website</a>'
        : "") +
      "</div>" +
      scriptBox(sh.firstCall.whatToSay) +
      '<div class="btn-row" style="margin-top:16px">' +
      '<button class="btn ghost sm" data-act="track-one" data-sheet="' +
      esc(sh.id) +
      '" data-org="' +
      esc(firstOrg.id) +
      '">' +
      esc(label("addToTracker", "Add to my applications")) +
      "</button></div>" +
      "</div></section>" +

      /* ---- the plan ---- */
      '<section class="card">' +
      '<p class="kicker">Your plan</p>' +
      "<h3>What to do, in order</h3>" +
      '<ol class="steps">' +
      steps +
      "</ol></section>" +

      /* ---- everyone else ---- */
      '<section style="margin-top:26px">' +
      '<p class="kicker red">' +
      esc(label("thenCall", "Then make these calls")) +
      "</p>" +
      '<h3 style="margin-bottom:6px">' +
      rest.length +
      " more places that can help</h3>" +
      '<p class="muted small" style="margin:0 0 16px">Tick each one off as you call it. ' +
      "Your ticks are saved.</p>" +
      '<div class="orgs">' +
      orgCards +
      "</div></section>" +

      /* ---- actions ---- */
      '<div class="sheet-actions">' +
      '<button class="btn primary" data-act="track-all" data-sheet="' +
      esc(sh.id) +
      '">Add all of these to my applications</button>' +
      '<button class="btn ghost" data-act="print">' +
      esc(label("printSave", "Print or save as PDF")) +
      "</button>" +
      '<button class="btn ghost" data-act="export-csv" data-sheet="' +
      esc(sh.id) +
      '">Download as a spreadsheet</button>' +
      "</div>"
    );
  }

  function phoneLink(phone, small) {
    var parts = phoneParts(phone);
    var out = "";
    if (parts.number) {
      out +=
        '<a class="phone' +
        (small ? " sm" : "") +
        '" href="tel:' +
        esc(tel(parts.number)) +
        '"><span aria-hidden="true">&#9742;</span>' +
        '<span><span class="sr-only">Call </span>' +
        esc(parts.number) +
        "</span></a>";
    }
    if (parts.note) {
      out += '<span class="phone-note">' + rich(parts.note) + "</span>";
    }
    return out;
  }

  function scriptBox(text) {
    if (!text) return "";
    return (
      '<div class="script">' +
      '<p class="script-t">' +
      esc(label("whatToSay", "What to say when they answer")) +
      "</p>" +
      '<p class="script-text">' +
      esc(text) +
      "</p>" +
      '<button class="btn ghost sm copy" data-act="copy" data-text="' +
      esc(text) +
      '">Copy these words</button></div>'
    );
  }

  function orgCard(sh, org, i) {
    var done = store.isCalled(sh.id, org.id);
    var cid = "org-" + sh.id + "-" + org.id;

    return (
      '<article class="org' +
      (done ? " done" : "") +
      '" id="' +
      esc(cid) +
      '">' +
      '<div class="org-head">' +
      '<label class="check org-check">' +
      '<input type="checkbox" data-act="called" data-sheet="' +
      esc(sh.id) +
      '" data-org="' +
      esc(org.id) +
      '"' +
      (done ? " checked" : "") +
      ' aria-label="' +
      esc(label("markCalled", "Mark as called") + ": " + org.name) +
      '" /><span class="cl" aria-hidden="true">Called</span></label>' +
      "<div>" +
      '<p class="org-name">' +
      esc(org.name) +
      "</p>" +
      '<p class="org-what">' +
      rich(org.plainWhat) +
      "</p>" +
      '<div class="contact-row">' +
      phoneLink(org.phone, true) +
      '<span class="chip ' +
      (org.moneyType && /free/i.test(org.moneyType) ? "blue" : "gold") +
      '">' +
      esc(org.maxAmount || org.moneyType || "") +
      "</span>" +
      "</div></div>" +
      '<button class="org-toggle" data-act="toggle-org" data-target="' +
      esc(cid) +
      '" aria-expanded="false" aria-controls="' +
      esc(cid) +
      '-d">' +
      '<span aria-hidden="true">&#9662;</span>' +
      '<span class="sr-only">Show the details for ' +
      esc(org.name) +
      "</span></button>" +
      "</div>" +

      '<div class="org-detail" id="' +
      esc(cid) +
      '-d" hidden>' +
      '<dl class="facts">' +
      fact(label("whoFor", "Who this is for"), org.whoQualifies) +
      fact(label("whereTheyHelp", "Where they help"), org.area) +
      fact(label("datesMatter", "When to apply"), org.whenToApply) +
      fact(label("freeStuff", "What you get free"), org.freeServices) +
      fact(label("moneyAvailable", "Kind of help"), org.moneyType) +
      fact(label("howMuch", "How much"), org.maxAmount) +
      "</dl>" +
      callout("blue", label("beforeCall", "Before you call"), org.beforeYouCall) +
      scriptBox(org.script) +
      '<div class="contact-row" style="margin-top:14px">' +
      (org.url
        ? '<a class="btn ghost sm" href="' +
          esc(org.url) +
          '" target="_blank" rel="noopener">Their website</a>'
        : "") +
      (org.email
        ? '<a class="btn ghost sm" href="mailto:' +
          esc(org.email) +
          '">Email them</a>'
        : "") +
      '<button class="btn ghost sm" data-act="track-one" data-sheet="' +
      esc(sh.id) +
      '" data-org="' +
      esc(org.id) +
      '">' +
      esc(label("addToTracker", "Add to my applications")) +
      "</button></div>" +
      (org.address
        ? '<p class="tiny muted" style="margin:12px 0 0">' +
          esc(org.address) +
          "</p>"
        : "") +
      "</div></article>"
    );
  }

  function fact(term, value) {
    if (!value) return "";
    return (
      '<div class="fact"><dt>' +
      esc(term) +
      "</dt><dd>" +
      esc(value) +
      "</dd></div>"
    );
  }

  /* ======================================================================
     MY APPLICATIONS — the tracker
     ====================================================================== */

  function tracker(filter) {
    var s = store.state;
    var meta = s.trackerMeta;
    var c = store.copy;
    var i;

    if (!s.tracker.length) {
      return (
        pageHead("My applications", "Who you are following up with", "") +
        emptyState(c.empty.applications, "go-sheets")
      );
    }

    var rows = s.tracker.filter(function (r) {
      if (filter === "open")
        return r.status !== "got-help" && r.status !== "said-no";
      if (filter === "overdue") return store.isOverdue(r);
      if (filter === "won") return r.status === "got-help";
      return true;
    });

    var overdue = s.tracker.filter(store.isOverdue).length;

    var html = "";
    for (i = 0; i < rows.length; i++) html += trackRow(rows[i], meta);
    if (!rows.length) {
      html =
        '<div class="empty"><p style="margin-bottom:0">Nothing in this list right now.</p></div>';
    }

    return (
      pageHead(
        "My applications",
        "Who you called, <em>and what happened next.</em>",
        meta.intro
      ) +
      (overdue
        ? callout(
            "red",
            overdue === 1
              ? "1 follow-up is past its date"
              : overdue + " follow-ups are past their date",
            meta.nudges[0]
          )
        : "") +
      '<div class="filters" role="group" aria-label="Filter applications">' +
      tFilter("all", "All", filter) +
      tFilter("open", "Still working on", filter) +
      tFilter("overdue", "Needs a follow-up", filter) +
      tFilter("won", "Got help", filter) +
      "</div>" +
      html
    );
  }

  function tFilter(key, text, active) {
    return (
      '<button data-act="filter-t" data-filter="' +
      key +
      '" aria-pressed="' +
      (active === key ? "true" : "false") +
      '">' +
      esc(text) +
      "</button>"
    );
  }

  function trackRow(r, meta) {
    var i;
    var sm = statusMeta(r.status);
    var overdue = store.isOverdue(r);
    var editing = editState();

    var opts = "";
    var statuses = store.copy.statuses;
    for (i = 0; i < statuses.length; i++) {
      opts +=
        '<option value="' +
        esc(statuses[i].key) +
        '"' +
        (statuses[i].key === r.status ? " selected" : "") +
        ">" +
        esc(statuses[i].label) +
        "</option>";
    }

    var checks = "";
    var doneCount = 0;
    for (i = 0; i < meta.checklist.length; i++) {
      var step = meta.checklist[i];
      var isDone = (r.done || []).indexOf(step.key) !== -1;
      if (isDone) doneCount++;
      checks +=
        '<label class="check"><input type="checkbox" data-act="step" data-row="' +
        esc(r.id) +
        '" data-step="' +
        esc(step.key) +
        '"' +
        (isDone ? " checked" : "") +
        ' /><span>' +
        esc(step.label) +
        "</span></label>";
    }
    var pct = Math.round((doneCount / meta.checklist.length) * 100);

    var nudge = "";
    for (i = 0; i < meta.nextActions.length; i++) {
      if (meta.nextActions[i].status === r.status) {
        nudge = meta.nextActions[i].nudge;
        break;
      }
    }
    if (!nudge) nudge = sm.line;

    return (
      '<article class="track' +
      (overdue ? " overdue" : "") +
      '">' +
      '<div class="track-head"><div>' +
      '<p class="track-name">' +
      esc(r.org) +
      "</p>" +
      '<p class="track-src">From: ' +
      esc(r.sheet) +
      "</p></div>" +
      '<div><label class="sr-only" for="st-' +
      esc(r.id) +
      '">Where you are up to with ' +
      esc(r.org) +
      "</label>" +
      '<select class="select status-select status-' +
      esc(r.status) +
      '" id="st-' +
      esc(r.id) +
      '" data-act="status" data-row="' +
      esc(r.id) +
      '">' +
      opts +
      "</select></div></div>" +

      '<div class="contact-row" style="margin-top:12px">' +
      phoneLink(r.phone, true) +
      (r.email
        ? '<a class="btn ghost sm" href="mailto:' +
          esc(r.email) +
          '">Write to them</a>'
        : "") +
      (r.url
        ? '<a class="btn ghost sm" href="' +
          esc(r.url) +
          '" target="_blank" rel="noopener">Their website</a>'
        : "") +
      (editing.row === r.id && editing.field === "date"
        ? '<span class="inline-edit"><label class="sr-only" for="fu-' +
          esc(r.id) +
          '">Follow up with ' +
          esc(r.org) +
          ' on this date</label><input class="input" type="date" id="fu-' +
          esc(r.id) +
          '" value="' +
          esc(r.followUp || store.todayISO()) +
          '" />' +
          '<button class="btn primary sm" data-act="save-date" data-row="' +
          esc(r.id) +
          '">Save the date</button>' +
          '<button class="linkbtn" data-act="cancel-edit">Cancel</button></span>'
        : (r.followUp
            ? '<span class="chip ' +
              (overdue ? "red" : "") +
              '">Follow up: ' +
              esc(fmtDate(r.followUp)) +
              "</span>"
            : "") +
          '<button class="linkbtn" data-act="edit-date" data-row="' +
          esc(r.id) +
          '">' +
          (r.followUp ? "Change the date" : "Set a follow-up date") +
          "</button>") +
      "</div>" +
      (r.address
        ? '<p class="track-address">' +
          (looksPostal(r.address) ? '<span aria-hidden="true">&#9993;</span> ' : "") +
          rich(r.address) +
          "</p>"
        : "") +

      (nudge
        ? '<p class="track-nudge' +
          (overdue ? " warn" : "") +
          '"><span aria-hidden="true">&#9830;</span><span>' +
          esc(nudge) +
          "</span></p>"
        : "") +

      (editing.row === r.id && editing.field === "note"
        ? '<div class="inline-edit block"><label class="sr-only" for="nt-' +
          esc(r.id) +
          '">Your note about ' +
          esc(r.org) +
          '</label><textarea class="textarea" id="nt-' +
          esc(r.id) +
          '" placeholder="Who you spoke to, what they asked for, anything you want to remember.">' +
          esc(r.note || "") +
          "</textarea>" +
          '<span class="btn-row"><button class="btn primary sm" data-act="save-note" data-row="' +
          esc(r.id) +
          '">Save my note</button>' +
          '<button class="linkbtn" data-act="cancel-edit">Cancel</button></span></div>'
        : r.note
        ? '<p class="track-note">' + esc(r.note) + "</p>"
        : "") +

      '<div class="track-checks">' +
      checks +
      '<div class="progress-mini"><div class="track-bar"><i style="width:' +
      pct +
      '%"></i></div><span>' +
      doneCount +
      " of " +
      meta.checklist.length +
      " done</span></div></div>" +

      '<div class="btn-row" style="margin-top:12px">' +
      (r.script
        ? '<button class="btn ghost sm" data-act="copy" data-text="' +
          esc(r.script) +
          '">Copy what to say</button>'
        : "") +
      '<button class="linkbtn" data-act="edit-note" data-row="' +
      esc(r.id) +
      '">' +
      (r.note ? "Change my note" : "Add a note") +
      "</button>" +
      (editing.row === r.id && editing.field === "remove"
        ? ""
        : '<button class="linkbtn" data-act="edit-remove" data-row="' +
          esc(r.id) +
          '" style="color:var(--ink-soft)">Remove</button>') +
      "</div>" +
      (editing.row === r.id && editing.field === "remove"
        ? '<div class="confirm-row"><span>Take <b>' +
          esc(r.org) +
          "</b> off this list? Your call sheet keeps it.</span>" +
          '<span class="btn-row"><button class="btn sm" data-act="confirm-remove" data-row="' +
          esc(r.id) +
          '">Yes, remove it</button>' +
          '<button class="btn ghost sm" data-act="cancel-edit">Keep it</button></span></div>'
        : "") +
      "</article>"
    );
  }

  /* ======================================================================
     Fallback
     ====================================================================== */

  function notFound(what) {
    return (
      '<div class="empty"><div class="q" aria-hidden="true">?</div>' +
      "<h2>We could not find that " +
      esc(what) +
      "</h2>" +
      "<p>It may have been removed. Everything else is still here.</p>" +
      '<button class="btn primary" data-act="go" data-to="home">Go back to the start</button></div>'
    );
  }

  /* ======================================================================
     Export
     ====================================================================== */

  global.LZ = global.LZ || {};
  global.LZ.views = {
    home: home,
    ask: ask,
    questions: questions,
    thread: thread,
    build: build,
    generating: generating,
    sheets: sheets,
    sheet: sheet,
    tracker: tracker,
    esc: esc,
    initials: initials,
    fmtDate: fmtDate,
  };
})(window);

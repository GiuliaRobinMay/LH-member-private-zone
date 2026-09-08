/* ==================================================================
   views.js — the screens of My Lesko Zone.

   A page, not a widget: a header with the nav, a split hero card
   (colour on the left, what you can do on the right), and below it
   the work — the conversations, one conversation, the call sheets.
   The split card, the big type, the hairline rules and the roomy
   spacing come from the Mighty pricing page Giulia sent; the colours
   stay Lesko Help's own.

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

  /** Pull the dialable number out of a phone field that may be prose. */
  function phoneNumber(raw) {
    var s = String(raw || "").trim();
    if (!s) return "";
    var shortCode = s.match(/^(2-?1-?1|9-?8-?8)\b/);
    if (shortCode) return shortCode[0];
    var m = s.match(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    return m ? m[0].trim() : "";
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

  /** The date a thing happened, the way a person says it. */
  function niceDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    var now = new Date();
    var oneDay = 86400000;
    var startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (d.getTime() >= startToday) return "Today";
    if (d.getTime() >= startToday - oneDay) return "Yesterday";
    return fmtDate(iso);
  }

  /** "3d", "1mo", "2y" — the way a messages list says it. */
  function shortAgo(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var s = Math.max(0, (Date.now() - then) / 1000);
    if (s < 60) return "now";
    var m = Math.round(s / 60);
    if (m < 60) return m + "m";
    var h = Math.round(m / 60);
    if (h < 24) return h + "h";
    var d = Math.round(h / 24);
    if (d < 30) return d + "d";
    var mo = Math.round(d / 30);
    if (mo < 12) return mo + "mo";
    return Math.round(mo / 12) + "y";
  }

  /** Attachment chips on a team answer — files the coach sent along. */
  function fileChips(list) {
    if (!list || !list.length) return "";
    return (
      '<span class="file-chips">' +
      list
        .map(function (f) {
          var isXls = /excel|xls|sheet/i.test(f.kind || "");
          return (
            '<button type="button" class="file-chip" data-act="demo-file" data-name="' +
            esc(f.name) + '">' +
            '<span class="f-ico' + (isXls ? " xls" : "") + '" aria-hidden="true">' +
            esc(isXls ? "XLS" : "PDF") + "</span>" +
            '<span class="f-name">' + esc(f.name) +
            '<span class="f-size">' + esc((f.kind || "") + (f.size ? " · " + f.size : "")) +
            "</span></span></button>"
          );
        })
        .join("") +
      "</span>"
    );
  }

  /* ---------------------------------------------------------- coaches */

  var GENERIC = "Lesko Help Team";

  /** A coach's face: the illustrated mock-up portrait, with their real
      photo laid over it when it loads (it is removed if it cannot). */
  function avatar(name, cls) {
    var photos = global.LZ_SEED.teamPhotos || {};
    var art = global.LZ_SEED.teamArt || {};
    var who = name || GENERIC;
    var src = photos[who] || "";
    var svg = art[who] || art[GENERIC] || "";
    return (
      '<span class="' + cls + '" aria-hidden="true">' +
      (svg
        ? '<img class="art" src="data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '" alt="">'
        : '<span class="ini">' + esc(String(who).trim().charAt(0).toUpperCase()) + "</span>") +
      (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") +
      "</span>"
    );
  }

  /** The coach who last answered this conversation, if any. */
  function lastTeam(q) {
    for (var i = q.messages.length - 1; i >= 0; i--) {
      if (q.messages[i].role === "team") return q.messages[i].name;
    }
    return "";
  }

  function lastAt(q) {
    var m = q.messages[q.messages.length - 1];
    return (m && m.createdAt) || q.createdAt;
  }

  /* ------------------------------------------------------------- nav */

  /** The dropdown in the page header — the aspects of the zone. */
  function menu(active) {
    var n = store.counts();
    var items = [
      { act: "ask-open", label: "Ask a grant coach" },
      { to: "chats", label: "My conversations", badge: n.unread },
      { to: "sheets", label: "My call sheets", count: n.sheets },
    ];
    return (
      '<div class="dd">' +
      '<button type="button" class="dd-btn" data-act="dd-toggle" aria-haspopup="menu" ' +
      'aria-expanded="false">Menu <span aria-hidden="true">&#9662;</span></button>' +
      '<div class="dd-menu" role="menu" hidden>' +
      items
        .map(function (it) {
          return (
            '<button type="button" role="menuitem" class="dd-item' +
            (it.to && it.to === active ? " on" : "") + '" data-act="' +
            (it.act || "go") + '"' + (it.to ? ' data-to="' + it.to + '"' : "") + ">" +
            it.label +
            (it.badge
              ? '<span class="bub">' + it.badge + '<span class="sr-only"> new answers</span></span>'
              : it.count
              ? '<span class="dd-count">' + it.count + "</span>"
              : "") +
            "</button>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  /* -------------------------------------------------- the hero card */

  /** The split card at the top: what the zone holds for this member on
      the colour side, what they can do with it on the white side. */
  function hero() {
    var n = store.counts();
    var team = global.LZ_SEED.team || [];

    var coaches = team
      .map(function (name) {
        return (
          '<span class="coach">' + avatar(name, "coach-ava") +
          '<span class="coach-name">' + esc(name.split(" ")[0]) + "</span></span>"
        );
      })
      .join("");

    var promises = [
      "A real person reads it and writes back to you",
      "Every answer stays here, in one private place",
      "They send the numbers and the words to say",
    ]
      .map(function (line) {
        return (
          '<li><span class="tick" aria-hidden="true">&#10003;</span>' +
          esc(line) + "</li>"
        );
      })
      .join("");

    return (
      '<section class="hero">' +
      '<div class="hero-figure">' +
      '<div class="hero-mid">' +
      '<p class="hero-kicker">your private zone</p>' +
      '<p class="hero-number">' + n.questions + "</p>" +
      '<p class="hero-note">conversations with your grant coaches</p>' +
      "</div>" +
      '<div class="hero-stats">' +
      '<div class="stat"><p class="stat-label">Call sheets</p>' +
      '<p class="stat-value">' + n.sheets + "</p></div>" +
      '<div class="stat"><p class="stat-label">New answers</p>' +
      '<p class="stat-value">' + n.unread + "</p></div>" +
      "</div>" +
      "</div>" +

      '<div class="hero-panel">' +
      '<p class="field-label">Your grant coaches</p>' +
      '<div class="coaches">' + coaches + "</div>" +
      '<div class="plan-card">' +
      '<div class="plan-head">' +
      "<h3>When you ask</h3>" +
      '<p class="plan-price">free<span>always</span></p>' +
      "</div>" +
      '<ul class="plan-list">' + promises + "</ul>" +
      "</div>" +
      '<button type="button" class="btn-wide" data-act="ask-open">Ask a grant coach</button>' +
      "</div>" +
      "</section>" +
      '<p class="hero-foot">*Your coaches are ' +
      esc(team.join(", ").replace(/,([^,]*)$/, " and$1")) +
      ". Answers usually come back within a day.</p>"
    );
  }

  /* ------------------------------------------- the conversation rows */

  function rows(activeId) {
    return store.state.questions
      .map(function (q) {
        var who = lastTeam(q);
        /* the person first, then what the conversation was about */
        var name = who
          ? esc(who)
          : '<span class="m-wait">Waiting for a reply</span>';
        return (
          '<button class="mrow' + (q.unread ? " unread" : "") +
          (q.id === activeId ? " on" : "") +
          '" data-act="thread" data-id="' + esc(q.id) + '">' +
          avatar(who || GENERIC, "m-ava") +
          '<span class="m-main">' +
          '<span class="m-title">' + name + "</span>" +
          '<span class="m-sub">' + esc(q.subject) + "</span>" +
          "</span>" +
          '<span class="m-when">' + esc(shortAgo(lastAt(q))) +
          (q.unread ? '<span class="m-dot"><span class="sr-only">new answer</span></span>' : "") +
          "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  function emptyList() {
    return (
      '<div class="m-empty"><b>No conversations yet</b>' +
      "Ask a grant coach anything &mdash; money for bills, your business, " +
      "school, whatever is going on.</div>"
    );
  }

  /* ================================================ HOME: hero + list */

  function chats() {
    var list = rows("");
    return (
      '<section class="panel">' +
      hero() +
      '<div class="card">' +
      '<div class="card-head"><h2>My conversations</h2>' +
      '<p class="card-note">' + store.counts().questions + " in all</p></div>" +
      '<div class="msgbox"><div class="msglist" id="chat-body">' +
      (list || emptyList()) + "</div>" +
      '<div class="msg-cta">' +
      '<button type="button" class="pill-cta" data-act="ask-open">Ask a grant coach ' +
      '<span aria-hidden="true">&#10148;</span></button>' +
      "</div></div></div>" +
      "</section>"
    );
  }

  /** The pop-up where a question is written: ZIP, state, and room to
      really describe what is going on. */
  function askModal() {
    return (
      '<div class="overlay" id="ask-modal" role="dialog" aria-modal="true" aria-labelledby="am-title">' +
      '<form class="modal" id="ask-form" novalidate>' +
      '<div class="modal-head">' +
      '<h3 id="am-title">Ask a grant coach</h3>' +
      '<button type="button" class="modal-x" data-act="ask-close" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div class="field-row two">' +
      '<div class="field"><label class="field-label" for="am-zip">ZIP code</label>' +
      '<input id="am-zip" inputmode="numeric" autocomplete="postal-code" placeholder="14604"></div>' +
      '<div class="field"><label class="field-label" for="am-state">State</label>' +
      '<input id="am-state" autocomplete="address-level1" placeholder="New York"></div>' +
      "</div>" +
      '<div class="field">' +
      '<label class="field-label" for="am-body">Describe what you need</label>' +
      '<textarea id="am-body" rows="7" placeholder="Take your time. What is going on, what you have already tried, and what would help. Your own words are perfect &mdash; spelling doesn&rsquo;t matter."></textarea>' +
      '<div class="mic-row" id="mic-row" hidden>' +
      '<button type="button" class="mic-btn" id="mic-btn">' +
      '<span class="mic-dot" aria-hidden="true"></span>Speak it instead</button>' +
      '<span class="mic-note" id="mic-note"></span>' +
      "</div>" +
      '<p class="hint">Private &mdash; only you and your grant coaches can see this.</p>' +
      "</div>" +
      '<p class="form-error" id="am-error"></p>' +
      '<div class="form-actions">' +
      '<button class="btn-wide" type="submit">Send my question</button>' +
      "</div></form></div>"
    );
  }

  /* ============================ ONE CONVERSATION: list beside the chat */

  function thread(id) {
    var q = store.getQuestion(id);
    if (!q) return notFound("conversation", "chats");

    var who = lastTeam(q);

    var msgs = q.messages
      .map(function (m) {
        var isTeam = m.role === "team";
        return (
          '<div class="brow ' + (isTeam ? "team" : "me") + '">' +
          (isTeam ? avatar(m.name, "b-ava") : "") +
          '<div class="bubble">' +
          (isTeam && m.name !== who ? '<span class="b-who">' + esc(m.name) + "</span>" : "") +
          rich(m.body) +
          (isTeam ? fileChips(m.attachments) : "") +
          "</div></div>"
        );
      })
      .join("");

    var waitingNote =
      q.status === "waiting"
        ? '<p class="quiet">Your question is with your coach &mdash; answers usually come back within a day or two.</p>'
        : "";

    return (
      '<section class="panel">' +
      '<div class="ws">' +
      '<aside class="ws-list">' +
      '<div class="card-head"><h2>My conversations</h2></div>' +
      '<div class="msglist">' + rows(q.id) + "</div>" +
      "</aside>" +
      '<div class="ws-main">' +
      '<div class="chat-head">' +
      '<button class="chat-back" data-act="go" data-to="chats" aria-label="Back">&larr;</button>' +
      avatar(who || GENERIC, "chat-ava") +
      '<span class="chat-name">' +
      '<span class="ch-title">' + esc(who || "Your grant coach") + "</span>" +
      '<span class="ch-sub">' + esc(q.subject) + "</span>" +
      "</span></div>" +
      '<div class="chat-body" id="chat-body">' +
      '<div class="day-mark">' + esc(niceDate(q.createdAt)) + "</div>" +
      msgs +
      feedbackBlock(q) +
      '<div id="typing-slot"></div>' +
      waitingNote +
      "</div>" +
      '<form class="chat-foot" id="reply-form">' +
      '<div class="compose">' +
      '<label class="sr-only" for="reply-input">Write back</label>' +
      '<textarea id="reply-input" rows="1" placeholder="Write back&hellip;"></textarea>' +
      '<button class="ask-btn" type="submit" data-id="' + esc(q.id) + '">Send</button>' +
      "</div></form>" +
      "</div></div>" +
      "</section>"
    );
  }

  /** "Was this helpful?" under the coach's answer. */
  function feedbackBlock(q) {
    if (q.status !== "answered") return "";

    if (q.feedback && q.feedback.val) {
      return (
        '<div class="feedback done"><span aria-hidden="true">&#10003;</span> ' +
        "Thank you for your feedback — your coach reads every one.</div>"
      );
    }

    var explaining = global.LZ.ui && global.LZ.ui.explain === q.id;
    if (explaining) {
      return (
        '<div class="feedback">' +
        '<span class="fb-q">What was missing? Tell us and your coach will try again.</span>' +
        '<form class="compose" id="fb-form" style="margin:8px 0 0">' +
        '<label class="sr-only" for="fb-note">What was missing?</label>' +
        '<textarea id="fb-note" rows="1" placeholder="Tell us in your own words&hellip;"></textarea>' +
        '<button class="ask-btn" type="submit" data-act="fb-send" data-id="' + esc(q.id) +
        '">Send</button>' +
        "</form></div>"
      );
    }

    return (
      '<div class="feedback">' +
      '<span class="fb-q">Was this answer helpful?</span>' +
      '<button class="btn-quiet" data-act="fb-yes" data-id="' + esc(q.id) +
      '">Yes</button>' +
      '<button class="btn-quiet" data-act="fb-no" data-id="' + esc(q.id) +
      '">Not yet</button>' +
      "</div>"
    );
  }

  /** The animated "your coach is typing" bubble, injected by app.js. */
  function typingBubble() {
    var who = (global.LZ_SEED.autoReply || {}).name || GENERIC;
    return (
      '<div class="brow team typing">' +
      avatar(who, "b-ava") +
      '<div class="bubble" aria-label="Your coach is typing">' +
      '<span class="d"></span><span class="d"></span><span class="d"></span>' +
      "</div></div>"
    );
  }

  /* ========================================= MY CALL SHEETS (the list) */

  function sheets() {
    var list = store.state.sheets;

    var out = list
      .map(function (sh) {
        var called = (sh.called || []).length;
        var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;
        var bits = [place, sh.orgs.length + " places"];
        if (called) bits.push(called + " called");
        return (
          '<button class="mrow noava" data-act="sheet" data-id="' + esc(sh.id) + '">' +
          '<span class="m-main">' +
          '<span class="m-title">' + esc(sh.title) + "</span>" +
          '<span class="m-sub">' + esc(bits.join(" · ")) + "</span>" +
          "</span>" +
          '<span class="m-when">' + esc(shortAgo(sh.createdAt)) + "</span>" +
          "</button>"
        );
      })
      .join("");

    var empty =
      '<div class="m-empty"><b>No call sheets yet</b>' +
      "Every call sheet your coach makes for you is kept here, for good.</div>";

    return (
      '<section class="panel">' +
      '<div class="card">' +
      '<div class="card-head"><h2>My call sheets</h2>' +
      '<p class="card-note">' + list.length + " in all</p></div>" +
      '<div class="msglist plain">' + (out || empty) + "</div>" +
      "</div></section>"
    );
  }

  /* ------------------------------------- one call sheet: the work list */

  function sheet(id) {
    var sh = store.getSheet(id);
    if (!sh) return notFound("call sheet", "sheets");

    var out = sh.orgs.map(function (o) {
      return workRow(sh, o);
    }).join("");

    var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;

    return (
      '<section class="panel">' +
      '<div class="card">' +
      '<div class="card-head sheet-head">' +
      '<button class="chat-back" data-act="go" data-to="sheets" aria-label="Back">&larr;</button>' +
      "<span><h2>" + esc(sh.title) + "</h2>" +
      '<p class="card-note">' + esc(niceDate(sh.createdAt)) + " &nbsp;&middot;&nbsp; " +
      esc(place) + "</p></span>" +
      '<button class="btn-quiet" data-act="export-csv" data-sheet="' + esc(sh.id) +
      '">&#11015; Download</button>' +
      "</div>" +
      '<div class="work">' + out + "</div>" +
      "</div></section>"
    );
  }

  function workRow(sh, org) {
    var done = store.isCalled(sh.id, org.id);
    var when = store.calledOn(sh.id, org.id);
    var note = store.orgNote(sh.id, org.id);
    var num = phoneNumber(org.phone);
    var rid = "wrow-" + sh.id + "-" + org.id;

    var contacts = [];
    if (num) {
      contacts.push(
        '<a class="w-tel" href="tel:' + esc(tel(num)) + '">&#9742; ' + esc(num) + "</a>"
      );
    }
    if (org.email) {
      contacts.push('<a href="mailto:' + esc(org.email) + '">&#9993; Email</a>');
    }
    if (org.url) {
      contacts.push(
        '<a href="' + esc(org.url) + '" target="_blank" rel="noopener">&#127760; Website</a>'
      );
    }

    return (
      '<div class="wrow' + (done ? " done" : "") + '" id="' + esc(rid) + '">' +
      '<label class="called-box">' +
      '<input type="checkbox" data-act="called" data-sheet="' + esc(sh.id) +
      '" data-org="' + esc(org.id) + '"' + (done ? " checked" : "") +
      ' aria-label="Called: ' + esc(org.name) + '">' +
      '<span class="cl" aria-hidden="true">Called</span></label>' +
      "<div>" +
      '<p class="org-name">' + esc(org.name) + "</p>" +
      '<p class="w-contacts">' + contacts.join('<span class="w-sep">&middot;</span>') + "</p>" +
      '<span class="w-called" data-slot="called">' +
      (when ? "&#10003; Called " + esc(niceDate(when)) : "") +
      "</span>" +
      '<div class="w-note" data-slot="note">' +
      (note ? '<p class="w-note-text">&#128221; ' + esc(note) + "</p>" : "") +
      "</div>" +
      "</div>" +
      '<button class="linklike w-note-btn" data-act="org-note" data-sheet="' + esc(sh.id) +
      '" data-org="' + esc(org.id) + '">' +
      (note ? "Edit note" : "+ Note") +
      "</button>" +
      "</div>"
    );
  }

  /* --------------------------------------------------------- fallback */

  function notFound(what, backTo) {
    return (
      '<section class="panel"><div class="card">' +
      '<div class="m-empty"><b>We could not find that ' + esc(what) + "</b>" +
      '<button class="btn-wide" data-act="go" data-to="' + esc(backTo) +
      '" style="max-width:260px;margin:14px auto 0">Go back</button></div>' +
      "</div></section>"
    );
  }

  /* ----------------------------------------------------------- export */

  global.LZ = global.LZ || {};
  global.LZ.views = {
    menu: menu,
    chats: chats,
    askModal: askModal,
    thread: thread,
    typingBubble: typingBubble,
    sheets: sheets,
    sheet: sheet,
    workRow: workRow,
    niceDate: niceDate,
    esc: esc,
  };
})(window);

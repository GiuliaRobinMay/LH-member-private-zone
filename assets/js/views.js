/* ==================================================================
   views.js — the screens of My Lesko Zone.

   Two split tabs — Ask a question · Create my call sheet — each with
   a small ☰ that opens its list. Forms submit with a red button on
   the right. A call sheet opens straight into the working list:
   called-tick, phone, email, website, a note, and the date.
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

  /** Attachment chips on a team answer — files the team sent along. */
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

  function privateLine() {
    return (
      '<p class="private-line"><span aria-hidden="true">&#128274;</span>' +
      "<span>Private — only you and the Lesko Help team can see this.</span></p>"
    );
  }

  /* ==================================== CHAT WITH A TEAM MEMBER (chat) */

  /** A team member's face: their real photo when it loads, otherwise a
      coloured circle with their initial — like every chat app. */
  function avatar(name, cls) {
    var photos = global.LZ_SEED.teamPhotos || {};
    var src = photos[name] || "";
    var initial = String(name || "?").trim().charAt(0).toUpperCase() || "?";
    var tone = "t" + ((initial.charCodeAt(0) % 3) + 1);
    return (
      '<span class="' + cls + " " + tone + '" aria-hidden="true">' +
      '<span class="ini">' + esc(initial) + "</span>" +
      (src
        ? '<img src="' + esc(src) + '" alt="" loading="lazy" onerror="this.remove()">'
        : "") +
      "</span>"
    );
  }

  /** The navy band at the top of the chat window — same as the other
      Lesko chat apps: the team's face, LESKO HELP over the room name. */
  function chatHead(opts) {
    opts = opts || {};
    return (
      '<div class="chat-head">' +
      (opts.back
        ? '<button class="chat-back" data-act="go" data-to="' + esc(opts.back) +
          '" aria-label="Back to my conversations">&larr;</button>'
        : "") +
      avatar("Lesko Help Team", "chat-ava") +
      '<span class="chat-name"><span class="ch-over">Lesko Help</span>' +
      '<span class="ch-title">Chat with a Team Member</span></span>' +
      (opts.right || '<span class="chat-priv">&#128274; Private</span>') +
      "</div>"
    );
  }

  function questionRows() {
    return store.state.questions
      .map(function (q) {
        var dot = q.unread ? "new" : q.status === "answered" ? "" : "waiting";
        var st = q.unread
          ? '<span class="st-new">New answer</span>'
          : q.status === "answered"
          ? '<span class="st-ok">Answered &#10003;</span>'
          : '<span class="st-wait">No answer yet</span>';
        return (
          '<button class="convo' + (q.unread ? " unread" : "") +
          '" data-act="thread" data-id="' + esc(q.id) + '">' +
          '<span class="c-dot ' + dot + '" aria-hidden="true"></span>' +
          "<span>" +
          '<span class="c-subj">' + esc(q.subject) + "</span>" +
          '<span class="c-meta">' + st + "</span>" +
          "</span>" +
          '<span class="c-when">' + esc(niceDate(q.createdAt)) + "</span></button>"
        );
      })
      .join("");
  }

  /* The tab opens on a fresh chat — a greeting from the team and the bar
     to start. Earlier conversations live behind ☰ (My questions). */
  function ask() {
    var first = esc((store.member.name || "").split(" ")[0]);

    return (
      '<section class="panel">' +
      '<div class="chat blank">' +
      chatHead() +
      '<div class="chat-body" id="chat-body">' +
      '<div class="brow team">' +
      avatar("Lesko Help Team", "b-ava") +
      '<div class="bubble"><span class="b-who">Lesko Help team</span>' +
      "How can we help, " + first + "? Tell us what is going on in your own " +
      "words &mdash; as much detail as you like, and where you are, so we can " +
      "find help near you. A real person on the team reads it and answers " +
      "you right here.</div></div>" +
      "</div>" +
      '<div class="chat-foot">' +
      '<div class="compose">' +
      '<button type="button" class="compose-fake" data-act="ask-open">Describe what you need&hellip;</button>' +
      '<button type="button" class="ask-btn" data-act="ask-open">Ask</button>' +
      "</div></div>" +
      "</div>" +
      privateLine() +
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
      '<h3 id="am-title">Ask a Team Member</h3>' +
      '<button type="button" class="modal-x" data-act="ask-close" aria-label="Close">&times;</button>' +
      "</div>" +
      '<div class="field-row two">' +
      '<div class="field"><label for="am-zip">ZIP code</label>' +
      '<input id="am-zip" inputmode="numeric" autocomplete="postal-code" placeholder="14604"></div>' +
      '<div class="field"><label for="am-state">State</label>' +
      '<input id="am-state" autocomplete="address-level1" placeholder="New York"></div>' +
      "</div>" +
      '<div class="field">' +
      '<label for="am-body">Describe what you need</label>' +
      '<textarea id="am-body" rows="7" placeholder="Take your time. What is going on, what you have already tried, and what would help. Your own words are perfect &mdash; spelling doesn&rsquo;t matter."></textarea>' +
      "</div>" +
      '<p class="form-error" id="am-error"></p>' +
      '<div class="form-actions">' +
      '<button class="btn red big" type="submit">Send my question</button>' +
      "</div></form></div>"
    );
  }

  /* ============================================== MY QUESTIONS (list) */

  function questions() {
    var qs = store.state.questions;
    if (!qs.length) {
      return (
        '<section class="panel"><div class="card empty-note">' +
        '<div class="q" aria-hidden="true">?</div>' +
        "<h3>No questions yet</h3>" +
        '<button class="btn red" data-act="go" data-to="ask">Ask your first question</button>' +
        "</div></section>"
      );
    }

    return (
      '<section class="panel">' +
      '<div class="convos">' + questionRows() + "</div>" +
      privateLine() +
      "</section>"
    );
  }

  /* ---------------------------------------------------- one thread */

  function thread(id) {
    var q = store.getQuestion(id);
    if (!q) return notFound("conversation", "questions");

    var msgs = q.messages
      .map(function (m) {
        var isTeam = m.role === "team";
        return (
          '<div class="brow ' + (isTeam ? "team" : "me") + '">' +
          (isTeam ? avatar(m.name, "b-ava") : "") +
          '<div class="bubble">' +
          (isTeam ? '<span class="b-who">' + esc(m.name) + " &middot; Lesko Help</span>" : "") +
          rich(m.body) +
          (isTeam ? fileChips(m.attachments) : "") +
          "</div></div>" +
          '<div class="bmeta' + (isTeam ? " team" : "") + '">' +
          esc(store.ago(m.createdAt) || m.ago) + "</div>"
        );
      })
      .join("");

    var waitingNote =
      q.status === "waiting"
        ? '<p class="private-line" style="margin:4px 2px 0"><span aria-hidden="true">&#8987;</span>' +
          "<span>Your question is with the team — answers usually come back within a day or two.</span></p>"
        : "";

    return (
      '<section class="panel">' +
      '<div class="chat">' +
      chatHead({
        back: "ask",
        right: '<span class="chat-when">' + esc(niceDate(q.createdAt)) + "</span>",
      }) +
      '<div class="chat-body" id="chat-body">' +
      msgs +
      feedbackBlock(q) +
      '<div id="typing-slot"></div>' +
      waitingNote +
      "</div>" +
      '<form class="chat-foot" id="reply-form">' +
      '<div class="compose">' +
      '<label class="sr-only" for="reply-input">Write back</label>' +
      '<textarea id="reply-input" rows="1" placeholder="Write back&hellip;"></textarea>' +
      '<button class="ask-btn" type="submit" data-id="' + esc(q.id) +
      '">Send</button>' +
      "</div></form>" +
      "</div>" +
      "</section>"
    );
  }

  /** "Was this helpful?" under the team's answer. */
  function feedbackBlock(q) {
    if (q.status !== "answered") return "";

    if (q.feedback && q.feedback.val) {
      return (
        '<div class="feedback done"><span aria-hidden="true">&#10003;</span> ' +
        "Thank you for your feedback — the team reads every one.</div>"
      );
    }

    var explaining = global.LZ.ui && global.LZ.ui.explain === q.id;
    if (explaining) {
      return (
        '<div class="feedback">' +
        '<span class="fb-q">What was missing? Tell us and the team will try again.</span>' +
        '<form class="compose" id="fb-form" style="margin:8px 0 0">' +
        '<label class="sr-only" for="fb-note">What was missing?</label>' +
        '<textarea id="fb-note" rows="1" placeholder="Tell us in your own words&hellip;"></textarea>' +
        '<button class="send" type="submit" data-act="fb-send" data-id="' + esc(q.id) +
        '" aria-label="Send feedback">&#8593;</button>' +
        "</form></div>"
      );
    }

    return (
      '<div class="feedback">' +
      '<span class="fb-q">Was this answer helpful?</span>' +
      '<button class="btn ghost" data-act="fb-yes" data-id="' + esc(q.id) +
      '">&#128077; Yes</button>' +
      '<button class="btn ghost" data-act="fb-no" data-id="' + esc(q.id) +
      '">&#128078; Not yet</button>' +
      "</div>"
    );
  }

  /** The animated "the team is typing" bubble, injected by app.js. */
  function typingBubble() {
    var who = (global.LZ_SEED.autoReply || {}).name || "Lesko Help Team";
    return (
      '<div class="brow team typing">' +
      avatar(who, "b-ava") +
      '<div class="bubble" aria-label="The team is typing">' +
      '<span class="d"></span><span class="d"></span><span class="d"></span>' +
      "</div></div>"
    );
  }

  /* ========================================= CREATE MY CALL SHEET (form) */

  function build() {
    var topics = store.copy.topics || [];
    var opts = '<option value="">Choose one&hellip;</option>';
    topics.forEach(function (t) {
      opts += '<option value="' + esc(t.key) + '">' + esc(t.label) + "</option>";
    });

    return (
      '<section class="panel">' +
      '<form class="form-card" id="build-form" novalidate>' +
      '<div class="field">' +
      '<label for="b-topic">What do you need help with?</label>' +
      '<select id="b-topic">' + opts + "</select></div>" +
      '<div class="field-row three">' +
      '<div class="field"><label for="b-zip">ZIP code</label>' +
      '<input id="b-zip" inputmode="numeric" autocomplete="postal-code" placeholder="14604"></div>' +
      '<div class="field"><label for="b-city">City</label>' +
      '<input id="b-city" autocomplete="address-level2" placeholder="Rochester"></div>' +
      '<div class="field"><label for="b-state">State</label>' +
      '<input id="b-state" autocomplete="address-level1" placeholder="New York"></div>' +
      "</div>" +
      '<div class="field">' +
      '<label for="b-problem">Tell us what&rsquo;s going on</label>' +
      '<textarea id="b-problem" rows="4" placeholder="Your own words are perfect — spelling doesn&rsquo;t matter."></textarea>' +
      "</div>" +
      '<p class="form-error" id="build-error"></p>' +
      '<div class="form-actions">' +
      '<button class="btn red big" type="submit">Create my call sheet</button>' +
      "</div></form>" +
      privateLine() +
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

  /* ============================================= MY CALL SHEETS (list) */

  function sheets() {
    var list = store.state.sheets;
    if (!list.length) {
      return (
        '<section class="panel"><div class="card empty-note">' +
        '<div class="q" aria-hidden="true">?</div>' +
        "<h3>No call sheets yet</h3>" +
        '<button class="btn red" data-act="go" data-to="build">Create your first call sheet</button>' +
        "</div></section>"
      );
    }

    var rows = list
      .map(function (sh) {
        var called = (sh.called || []).length;
        var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;
        return (
          '<button class="convo" data-act="sheet" data-id="' + esc(sh.id) + '">' +
          '<span class="c-dot' + (called ? "" : " waiting") + '" aria-hidden="true"></span>' +
          "<span>" +
          '<span class="c-subj">' + esc(sh.title) + "</span>" +
          '<span class="c-meta">' + esc(place) + " &nbsp;&middot;&nbsp; " +
          sh.orgs.length + " places" +
          (called
            ? ' &nbsp;&middot;&nbsp; <span class="st-ok">' + called + " called &#10003;</span>"
            : "") +
          "</span></span>" +
          '<span class="c-when">' + esc(niceDate(sh.createdAt)) + "</span></button>"
        );
      })
      .join("");

    return (
      '<section class="panel">' +
      '<div class="convos">' + rows + "</div>" +
      privateLine() +
      "</section>"
    );
  }

  /* ------------------------------------- one call sheet: the work list */

  function sheet(id) {
    var sh = store.getSheet(id);
    if (!sh) return notFound("call sheet", "sheets");

    var rows = sh.orgs.map(function (o) {
      return workRow(sh, o);
    }).join("");

    return (
      '<section class="panel">' +
      '<div class="thread-head">' +
      '<button class="backlink" data-act="go" data-to="sheets" style="margin:0">&larr; My call sheets</button>' +
      '<span class="c-when">' + esc(niceDate(sh.createdAt)) + "</span>" +
      "</div>" +
      '<div class="w-titlebar">' +
      '<h2 class="sheet-title" style="margin:0">' + esc(sh.title) + "</h2>" +
      '<button class="btn ghost" data-act="export-csv" data-sheet="' + esc(sh.id) +
      '">&#11015; Download</button>' +
      "</div>" +
      '<div class="work">' + rows + "</div>" +
      "</section>"
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
      '<section class="panel"><div class="card empty-note">' +
      '<div class="q" aria-hidden="true">?</div>' +
      "<h3>We could not find that " + esc(what) + "</h3>" +
      '<button class="btn red" data-act="go" data-to="' + esc(backTo) + '">Go back</button>' +
      "</div></section>"
    );
  }

  /* ----------------------------------------------------------- export */

  global.LZ = global.LZ || {};
  global.LZ.views = {
    ask: ask,
    askModal: askModal,
    questions: questions,
    thread: thread,
    typingBubble: typingBubble,
    build: build,
    sheets: sheets,
    generating: generating,
    sheet: sheet,
    workRow: workRow,
    niceDate: niceDate,
    esc: esc,
  };
})(window);

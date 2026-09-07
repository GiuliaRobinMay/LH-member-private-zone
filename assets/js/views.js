/* ==================================================================
   views.js — the screens of My Lesko Zone.

   One window, like the Messages panel inside Mighty. The first thing
   a member sees is the list of their conversations — the team member's
   face, the title, their name, how long ago — with a red pill to ask a
   new question. A conversation is a chat: the member in blue on the
   right, the team's photo and answer on the left. The dropdown at the
   right of the navy band moves between the aspects of the zone:
   the chat and the call sheets.
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

  function firstName(name) {
    return String(name || "").trim().split(" ")[0];
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

  /* ------------------------------------------------------------ team */

  var GENERIC = "Lesko Help Team";

  /** A team member's face: their real photo when it loads, otherwise a
      coloured circle with their initial — like every chat app. The
      generic team account shows the Lesko question mark. */
  function avatar(name, cls) {
    var photos = global.LZ_SEED.teamPhotos || {};
    var team = global.LZ_SEED.team || [];
    var who = name || GENERIC;
    var src = photos[who] || "";
    var generic = who === GENERIC;
    var initial = generic ? "?" : String(who).trim().charAt(0).toUpperCase() || "?";
    var at = team.indexOf(who);
    var tone = generic ? "mark" : "t" + ((at < 0 ? 0 : at) % 4 + 1);
    return (
      '<span class="' + cls + " " + tone + '" aria-hidden="true">' +
      '<span class="ini">' + esc(initial) + "</span>" +
      (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") +
      "</span>"
    );
  }

  /** The team member who last answered this conversation, if any. */
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

  /* ------------------------------------------------- the navy band */

  /** The dropdown at the right: the aspects of the zone. */
  function menu(active) {
    var n = store.counts();
    var items = [
      { to: "chats", label: "Chat with a Team Member", badge: n.unread, count: 0 },
      { to: "sheets", label: "My call sheets", badge: 0, count: n.sheets },
    ];
    return (
      '<div class="dd">' +
      '<button type="button" class="dd-btn" data-act="dd-toggle" aria-haspopup="menu" ' +
      'aria-expanded="false">Menu <span aria-hidden="true">&#9662;</span>' +
      (n.unread ? '<span class="dd-dot" aria-hidden="true"></span>' : "") +
      "</button>" +
      '<div class="dd-menu" role="menu" hidden>' +
      items
        .map(function (it) {
          return (
            '<button type="button" role="menuitem" class="dd-item' +
            (it.to === active ? " on" : "") + '" data-act="go" data-to="' + it.to + '">' +
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

  function chatHead(opts) {
    return (
      '<div class="chat-head">' +
      (opts.back
        ? '<button class="chat-back" data-act="go" data-to="' + esc(opts.back) +
          '" aria-label="Back">&larr;</button>'
        : "") +
      avatar(opts.who || GENERIC, "chat-ava") +
      '<span class="chat-name"><span class="ch-over">Lesko Help</span>' +
      '<span class="ch-title">' + esc(opts.title) + "</span></span>" +
      menu(opts.active) +
      "</div>"
    );
  }

  /* ============================== CHAT WITH A TEAM MEMBER: the list */

  function chats() {
    var qs = store.state.questions;

    var rows = qs
      .map(function (q) {
        var who = lastTeam(q);
        var sub = q.unread
          ? '<span class="st-new">New answer from ' + esc(firstName(who)) + "</span>"
          : who
          ? esc(who)
          : '<span class="st-wait">No answer yet</span>';
        return (
          '<button class="mrow' + (q.unread ? " unread" : "") +
          '" data-act="thread" data-id="' + esc(q.id) + '">' +
          avatar(who || GENERIC, "m-ava") +
          '<span class="m-main">' +
          '<span class="m-title">' + esc(q.subject) + "</span>" +
          '<span class="m-sub">' + sub + "</span>" +
          "</span>" +
          '<span class="m-when">' + esc(shortAgo(lastAt(q))) + "</span>" +
          "</button>"
        );
      })
      .join("");

    var empty =
      '<div class="m-empty"><b>No conversations yet</b>' +
      "Ask us anything &mdash; money for bills, your business, school, whatever " +
      "is going on. A real person on the team answers, usually within a day.</div>";

    return (
      '<section class="panel">' +
      '<div class="chat">' +
      chatHead({ title: "Chat with a Team Member", active: "chats" }) +
      '<div class="msgbox">' +
      '<div class="msglist" id="chat-body">' + (rows || empty) + "</div>" +
      '<div class="msg-cta">' +
      '<button type="button" class="pill-cta" data-act="ask-open">Ask us a question ' +
      '<span aria-hidden="true">&#10148;</span></button>' +
      "</div></div></div>" +
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
      '<h3 id="am-title">Ask us a question</h3>' +
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

  /* ------------------------------------------- one conversation */

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
        back: "chats",
        who: who || GENERIC,
        title: who || "Lesko Help team",
        active: "chats",
      }) +
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
    var who = (global.LZ_SEED.autoReply || {}).name || GENERIC;
    return (
      '<div class="brow team typing">' +
      avatar(who, "b-ava") +
      '<div class="bubble" aria-label="The team is typing">' +
      '<span class="d"></span><span class="d"></span><span class="d"></span>' +
      "</div></div>"
    );
  }

  /* ============================================= MY CALL SHEETS (list) */

  function sheets() {
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

    var empty =
      '<div class="m-empty"><b>No call sheets yet</b>' +
      "Every call sheet the team makes for you is kept here, for good.</div>";

    return (
      '<section class="panel">' +
      '<div class="chat">' +
      chatHead({ title: "My call sheets", active: "sheets" }) +
      '<div class="chat-body grow">' +
      (rows ? '<div class="convos">' + rows + "</div>" : empty) +
      "</div></div>" +
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

    var place = [sh.city, sh.state].filter(Boolean).join(", ") || sh.zip;

    return (
      '<section class="panel">' +
      '<div class="chat">' +
      chatHead({ back: "sheets", title: sh.title, active: "sheets" }) +
      '<div class="chat-body grow">' +
      '<div class="w-titlebar">' +
      '<span class="c-when">' + esc(niceDate(sh.createdAt)) + " &nbsp;&middot;&nbsp; " +
      esc(place) + "</span>" +
      '<button class="btn ghost" data-act="export-csv" data-sheet="' + esc(sh.id) +
      '">&#11015; Download</button>' +
      "</div>" +
      '<div class="work">' + rows + "</div>" +
      "</div></div>" +
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

/* ==================================================================
   store.js — all state for My Lesko Zone.

   This is a MOCK-UP. There is no server and no database. Everything
   the member does is kept in this browser's localStorage so the demo
   survives a refresh, and "Start the demo over" reseeds it.
   ================================================================== */

(function (global) {
  "use strict";

  var KEY = "lesko-zone.v2";

  /* ---------------------------------------------------------- helpers */

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function uid(prefix) {
    return (
      prefix + "-" + Date.now().toString(36) + "-" +
      Math.random().toString(36).slice(2, 7)
    );
  }

  /** Human "3 days ago" from an ISO date. */
  function ago(iso) {
    if (!iso) return "";
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var mins = Math.round((Date.now() - then) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + (mins === 1 ? " minute ago" : " minutes ago");
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + (hrs === 1 ? " hour ago" : " hours ago");
    var days = Math.round(hrs / 24);
    if (days < 31) return days + (days === 1 ? " day ago" : " days ago");
    var months = Math.round(days / 30);
    if (months < 12) return months + (months === 1 ? " month ago" : " months ago");
    return Math.round(months / 12) + " year ago";
  }

  function shorten(text, n) {
    var s = String(text || "").replace(/\s+/g, " ").trim();
    if (s.length <= n) return s;
    return s.slice(0, n - 1).replace(/[\s,.;:]+$/, "") + "…";
  }

  /* ------------------------------------------------------------ state */

  var state = null;

  function fresh() {
    var seed = clone(global.LZ_SEED);
    return {
      version: 2,
      member: seed.member,
      questions: seed.threads,
      sheets: seed.callSheets,
      copy: seed.microcopy,
    };
  }

  function load() {
    var raw = null;
    try {
      raw = global.localStorage.getItem(KEY);
    } catch (e) {
      /* private mode / storage blocked — fall through to seed */
    }
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.version === 2 && parsed.sheets) {
          // Copy always comes from the seed, so editing seed.js shows up
          // without clearing storage.
          parsed.copy = clone(global.LZ_SEED).microcopy;
          return parsed;
        }
      } catch (e) {
        /* corrupt — fall through to seed */
      }
    }
    return fresh();
  }

  function save() {
    try {
      global.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or blocked — the demo still works this session */
    }
  }

  /* -------------------------------------------------------- questions */

  function addQuestion(fields) {
    var nowISO = new Date().toISOString();
    var thread = {
      id: uid("q"),
      subject: shorten(fields.body, 68),
      topic: fields.topic || "",
      status: "waiting",
      location: fields.location || "",
      createdAt: nowISO,
      ago: "just now",
      isNew: true,
      messages: [
        {
          role: "member",
          name: state.member.name,
          roleLabel: "",
          body: fields.body,
          createdAt: nowISO,
          ago: "just now",
        },
      ],
    };
    state.questions.unshift(thread);
    save();
    return thread;
  }

  function addReply(threadId, body) {
    var t = getQuestion(threadId);
    if (!t) return null;
    var nowISO = new Date().toISOString();
    t.messages.push({
      role: "member",
      name: state.member.name,
      roleLabel: "",
      body: body,
      createdAt: nowISO,
      ago: "just now",
    });
    t.status = "waiting";
    save();
    return t;
  }

  /** Simulated team answer — in the real product this arrives from the
      team's question-answering dashboard. */
  function simulateAnswer(threadId) {
    var t = getQuestion(threadId);
    if (!t) return null;
    var responder = global.LZ_SEED.autoReply;
    t.messages.push({
      role: "team",
      name: responder.name,
      roleLabel: responder.roleLabel,
      body: responder.body.replace(/\{name\}/g, state.member.name.split(" ")[0]),
      attachments: responder.attachments ? clone(responder.attachments) : [],
      createdAt: new Date().toISOString(),
      ago: "just now",
    });
    t.status = "answered";
    save();
    return t;
  }

  function getQuestion(id) {
    for (var i = 0; i < state.questions.length; i++) {
      if (state.questions[i].id === id) return state.questions[i];
    }
    return null;
  }

  function markRead(threadId) {
    var t = getQuestion(threadId);
    if (t && t.unread) {
      t.unread = false;
      save();
    }
  }

  /** The "we have your question" note is shown once, then retired. */
  function clearNew(threadId) {
    var t = getQuestion(threadId);
    if (t && t.isNew) {
      t.isNew = false;
      save();
    }
  }

  /* ------------------------------------------------------ call sheets */

  function getSheet(id) {
    for (var i = 0; i < state.sheets.length; i++) {
      if (state.sheets[i].id === id) return state.sheets[i];
    }
    return null;
  }

  /**
   * Build a new call sheet from the member's inputs.
   *
   * MOCK-UP: the research is simulated. We take the prepared sheet that
   * best matches the chosen topic and re-address it with the member's own
   * words and place. In the real product this is where the AI research
   * call goes.
   */
  function buildSheet(input) {
    var library = global.LZ_SEED.callSheets;
    var map = global.LZ_SEED.topicMap || {};
    var base = null;
    var i;

    var wanted = input.topicKey;
    if (map[wanted]) {
      for (i = 0; i < library.length; i++) {
        if (library[i].id === map[wanted]) base = library[i];
      }
    }
    if (!base) {
      for (i = 0; i < library.length; i++) {
        if (library[i].topicKey === wanted) base = library[i];
      }
    }
    if (!base) base = library[0];

    var sheet = clone(base);
    var first = state.member.name.split(" ")[0];

    /* Label the sheet with the topic the member actually chose. */
    var topics = (state.copy && state.copy.topics) || [];
    for (i = 0; i < topics.length; i++) {
      if (topics[i].key === wanted) {
        sheet.topic = topics[i].label;
        sheet.topicKey = topics[i].key;
      }
    }

    sheet.id = uid("cs");
    sheet.createdAt = new Date().toISOString();
    sheet.ago = "just now";
    sheet.memberName = first;
    sheet.city = input.city || sheet.city;
    sheet.state = input.state || sheet.state;
    sheet.zip = input.zip || sheet.zip;
    sheet.problem = input.problem || sheet.problem;
    sheet.called = [];

    var place = [sheet.city, sheet.state].filter(Boolean).join(", ") || sheet.zip;

    sheet.opening = openingFor(first, place, sheet, input);
    sheet.firstCall.why = personalise(sheet.firstCall.why, first, place, base);
    sheet.firstCall.whatToSay = personalise(sheet.firstCall.whatToSay, first, place, base);
    for (i = 0; i < sheet.orgs.length; i++) {
      sheet.orgs[i].script = personalise(sheet.orgs[i].script, first, place, base);
    }

    state.sheets.unshift(sheet);
    save();
    return sheet;
  }

  /** Open with the member's actual words, so the sheet is visibly theirs. */
  function openingFor(first, place, sheet, input) {
    var said = String(input.problem || "").replace(/\s+/g, " ").trim();
    if (said.length > 190) {
      said = said.slice(0, 189).replace(/[\s,.;:]+$/, "") + "…";
    }
    return (
      "Here is what I found for you, " + first + ". You told me: “" + said +
      "” So I went looking for help with " + (sheet.topic || "").toLowerCase() +
      " near " + place + ". Below are " + sheet.orgs.length +
      " places that can help, with the phone numbers and the words to say when " +
      "they pick up. Start with the first one — that is the call that matters most."
    );
  }

  /** Swap the prepared sheet's member name and place for this member's. */
  function personalise(text, first, place, base) {
    var out = String(text || "");
    if (base.memberName) out = out.split(base.memberName).join(first);

    var basePlace = [base.city, base.state].filter(Boolean).join(", ");
    var city = place.split(",")[0].trim();

    if (basePlace && place && basePlace !== place) out = out.split(basePlace).join(place);
    if (base.city && city && base.city !== city) out = out.split(base.city).join(city);

    return out.replace(/\s{2,}/g, " ").trim();
  }

  /** Tick / untick "I called them" on a call sheet row. */
  function toggleCalled(sheetId, orgId) {
    var s = getSheet(sheetId);
    if (!s) return false;
    if (!s.called) s.called = [];
    var at = s.called.indexOf(orgId);
    if (at === -1) s.called.push(orgId);
    else s.called.splice(at, 1);
    save();
    return s.called.indexOf(orgId) !== -1;
  }

  function isCalled(sheetId, orgId) {
    var s = getSheet(sheetId);
    return !!(s && s.called && s.called.indexOf(orgId) !== -1);
  }

  /* ---------------------------------------------------- badge counts */

  function counts() {
    var unread = 0;
    for (var i = 0; i < state.questions.length; i++) {
      if (state.questions[i].unread) unread++;
    }
    return {
      questions: state.questions.length,
      unread: unread,
      sheets: state.sheets.length,
    };
  }

  /* -------------------------------------------------------- lifecycle */

  function reset() {
    try {
      global.localStorage.removeItem(KEY);
    } catch (e) {
      /* nothing to clear */
    }
    state = fresh();
    save();
  }

  function init() {
    state = load();
    return state;
  }

  /* ----------------------------------------------------------- export */

  global.LZ = global.LZ || {};
  global.LZ.store = {
    init: init,
    save: save,
    reset: reset,
    get state() {
      return state;
    },
    get copy() {
      return state.copy;
    },
    get member() {
      return state.member;
    },
    ago: ago,
    uid: uid,
    shorten: shorten,

    addQuestion: addQuestion,
    addReply: addReply,
    simulateAnswer: simulateAnswer,
    getQuestion: getQuestion,
    markRead: markRead,
    clearNew: clearNew,

    getSheet: getSheet,
    buildSheet: buildSheet,
    toggleCalled: toggleCalled,
    isCalled: isCalled,

    counts: counts,
  };
})(window);

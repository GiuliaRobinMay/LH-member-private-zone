/* ==========================================================================
   store.js — all app state for My Lesko Zone.

   This is a MOCK-UP. There is no server and no database. Everything the member
   does is kept in this browser's localStorage so the demo survives a refresh,
   and "Start the demo over" puts it back to the seeded state.
   ========================================================================== */

(function (global) {
  "use strict";

  var KEY = "lesko-zone.v1";

  /* --- helpers ---------------------------------------------------------- */

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function uid(prefix) {
    return (
      prefix +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 7)
    );
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  /** Human "3 days ago" from an ISO date, for seeded and new content alike. */
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

  /* --- state ------------------------------------------------------------ */

  var state = null;

  function fresh() {
    var seed = clone(global.LZ_SEED);
    return {
      version: 1,
      member: seed.member,
      questions: seed.threads,
      sheets: seed.callSheets,
      tracker: seed.tracker.rows,
      copy: seed.microcopy,
      trackerMeta: {
        intro: seed.tracker.intro,
        checklist: seed.tracker.checklist,
        nextActions: seed.tracker.nextActions,
        nudges: seed.tracker.nudges,
      },
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
        if (parsed && parsed.version === 1 && parsed.sheets) {
          // Copy and tracker metadata always come from the seed so that
          // editing seed.js is reflected without clearing storage.
          var seed = clone(global.LZ_SEED);
          parsed.copy = seed.microcopy;
          parsed.trackerMeta = {
            intro: seed.tracker.intro,
            checklist: seed.tracker.checklist,
            nextActions: seed.tracker.nextActions,
            nudges: seed.tracker.nudges,
          };
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
      /* Storage full or blocked. The demo still works for this session. */
    }
  }

  /* --- questions -------------------------------------------------------- */

  /**
   * Post a new private question. Returns the new thread.
   * The team reply is simulated later by `simulateAnswer`.
   */
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

  /** Add the member's own follow-up message to an existing thread. */
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

  /**
   * Simulated team answer. In the real product this arrives from the
   * question-answering dashboard when a team member replies.
   */
  function simulateAnswer(threadId) {
    var t = getQuestion(threadId);
    if (!t) return null;
    var nowISO = new Date().toISOString();
    var responder = global.LZ_SEED.autoReply;
    t.messages.push({
      role: "team",
      name: responder.name,
      roleLabel: responder.roleLabel,
      body: responder.body.replace(/\{name\}/g, state.member.name.split(" ")[0]),
      createdAt: nowISO,
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

  function shorten(text, n) {
    var s = String(text || "").replace(/\s+/g, " ").trim();
    if (s.length <= n) return s;
    return s.slice(0, n - 1).replace(/[\s,.;:]+$/, "") + "…";
  }

  /* --- call sheets ------------------------------------------------------ */

  function getSheet(id) {
    for (var i = 0; i < state.sheets.length; i++) {
      if (state.sheets[i].id === id) return state.sheets[i];
    }
    return null;
  }

  /**
   * Build a new call sheet from the member's inputs.
   *
   * MOCK-UP BEHAVIOUR: the research itself is simulated. We take the seeded
   * sheet that best matches the chosen topic, then re-personalise it with the
   * member's own words and location so the demo reads as if it were made for
   * them. In the real product this is where the AI research call goes.
   */
  function buildSheet(input) {
    var library = global.LZ_SEED.callSheets;
    var map = global.LZ_SEED.topicMap || {};
    var base = null;
    var i;

    /* Every topic in the picker resolves to a prepared sheet — its own where
       one exists, otherwise the nearest neighbour — so no choice ever returns
       something unrelated. */
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

    /* The sheet is labelled with the topic the member actually chose. */
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
    sheet.isNew = true;
    sheet.memberName = first;
    sheet.city = input.city || sheet.city;
    sheet.state = input.state || sheet.state;
    sheet.zip = input.zip || sheet.zip;
    sheet.problem = input.problem || sheet.problem;
    sheet.called = [];

    var place = [sheet.city, sheet.state].filter(Boolean).join(", ") || sheet.zip;

    // Re-address the sheet to this member and this place. The opening is
    // rebuilt from their actual words rather than reused, so a sheet always
    // opens by talking about the thing they typed.
    sheet.opening = openingFor(first, place, sheet, input);
    sheet.firstCall.why = personalise(sheet.firstCall.why, first, place, base);
    sheet.firstCall.whatToSay = personalise(
      sheet.firstCall.whatToSay,
      first,
      place,
      base
    );
    for (i = 0; i < sheet.orgs.length; i++) {
      sheet.orgs[i].script = personalise(sheet.orgs[i].script, first, place, base);
    }

    state.sheets.unshift(sheet);
    save();
    return sheet;
  }

  /**
   * Write the opening paragraph from what this member actually typed, so the
   * sheet always begins by talking about their situation and not the seeded
   * example's.
   */
  function openingFor(first, place, sheet, input) {
    var said = String(input.problem || "").replace(/\s+/g, " ").trim();
    if (said.length > 190) {
      said = said.slice(0, 189).replace(/[\s,.;:]+$/, "") + "…";
    }
    var topic = (sheet.topic || "").toLowerCase();
    return (
      "Here is what I found for you, " +
      first +
      ". You told me: “" +
      said +
      "” So I went looking for help with " +
      topic +
      " near " +
      place +
      ". Below are " +
      sheet.orgs.length +
      " places that can help, with the phone numbers and the words to say when " +
      "they pick up. Start with the first one — that is the call that matters most."
    );
  }

  /** Swap the seeded member's name, place and ZIP for this member's. */
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

  function deleteSheet(id) {
    state.sheets = state.sheets.filter(function (s) {
      return s.id !== id;
    });
    state.tracker = state.tracker.filter(function (r) {
      return r.sheetId !== id;
    });
    save();
  }

  /* --- tracker ---------------------------------------------------------- */

  function inTracker(orgName) {
    for (var i = 0; i < state.tracker.length; i++) {
      if (state.tracker[i].org === orgName) return true;
    }
    return false;
  }

  /** Add one organisation from a call sheet onto the applications tracker. */
  function addToTracker(sheet, org) {
    if (inTracker(org.name)) return null;
    var row = {
      id: uid("tr"),
      org: org.name,
      sheet: sheet.title,
      sheetId: sheet.id,
      orgId: org.id,
      phone: org.phone || "",
      email: org.email || "",
      address: org.address || "",
      url: org.url || "",
      script: org.script || "",
      status: "not-started",
      done: [],
      note: "",
      followUp: "",
      addedAt: new Date().toISOString(),
    };
    state.tracker.unshift(row);
    save();
    return row;
  }

  /** Add every organisation on a sheet that isn't already tracked. */
  function addSheetToTracker(sheet) {
    var added = 0;
    for (var i = 0; i < sheet.orgs.length; i++) {
      if (addToTracker(sheet, sheet.orgs[i])) added++;
    }
    return added;
  }

  function getTrackerRow(id) {
    for (var i = 0; i < state.tracker.length; i++) {
      if (state.tracker[i].id === id) return state.tracker[i];
    }
    return null;
  }

  function setStatus(rowId, status) {
    var r = getTrackerRow(rowId);
    if (!r) return;
    r.status = status;
    save();
  }

  function toggleStep(rowId, stepKey) {
    var r = getTrackerRow(rowId);
    if (!r) return false;
    if (!r.done) r.done = [];
    var at = r.done.indexOf(stepKey);
    if (at === -1) r.done.push(stepKey);
    else r.done.splice(at, 1);
    save();
    return r.done.indexOf(stepKey) !== -1;
  }

  function setNote(rowId, note) {
    var r = getTrackerRow(rowId);
    if (!r) return;
    r.note = note;
    save();
  }

  function setFollowUp(rowId, date) {
    var r = getTrackerRow(rowId);
    if (!r) return;
    r.followUp = date;
    save();
  }

  function removeTrackerRow(id) {
    state.tracker = state.tracker.filter(function (r) {
      return r.id !== id;
    });
    save();
  }

  function isOverdue(row) {
    if (!row.followUp) return false;
    if (row.status === "got-help" || row.status === "said-no") return false;
    return row.followUp < todayISO();
  }

  /* --- counts for the nav badges ---------------------------------------- */

  function counts() {
    var unanswered = 0;
    var i;
    for (i = 0; i < state.questions.length; i++) {
      if (state.questions[i].status === "answered") {
        // A thread counts as "new for me" only until it has been opened.
        if (state.questions[i].unread) unanswered++;
      }
    }
    var overdue = 0;
    for (i = 0; i < state.tracker.length; i++) {
      if (isOverdue(state.tracker[i])) overdue++;
    }
    var openApps = 0;
    for (i = 0; i < state.tracker.length; i++) {
      if (
        state.tracker[i].status !== "got-help" &&
        state.tracker[i].status !== "said-no"
      )
        openApps++;
    }
    return {
      questions: state.questions.length,
      newAnswers: unanswered,
      sheets: state.sheets.length,
      tracker: state.tracker.length,
      overdue: overdue,
      openApps: openApps,
      gotHelp: state.tracker.filter(function (r) {
        return r.status === "got-help";
      }).length,
    };
  }

  /** The "we have your question" note is shown once, then retired. */
  function clearNew(threadId) {
    var t = getQuestion(threadId);
    if (t && t.isNew) {
      t.isNew = false;
      save();
    }
  }

  function markRead(threadId) {
    var t = getQuestion(threadId);
    if (t && t.unread) {
      t.unread = false;
      save();
    }
  }

  /* --- lifecycle -------------------------------------------------------- */

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

  /* --- export ----------------------------------------------------------- */

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
    todayISO: todayISO,
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
    deleteSheet: deleteSheet,
    toggleCalled: toggleCalled,
    isCalled: isCalled,

    addToTracker: addToTracker,
    addSheetToTracker: addSheetToTracker,
    inTracker: inTracker,
    getTrackerRow: getTrackerRow,
    setStatus: setStatus,
    toggleStep: toggleStep,
    setNote: setNote,
    setFollowUp: setFollowUp,
    removeTrackerRow: removeTrackerRow,
    isOverdue: isOverdue,

    counts: counts,
  };
})(window);

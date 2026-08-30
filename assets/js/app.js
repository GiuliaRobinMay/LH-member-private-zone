/* ==========================================================================
   app.js — routing, navigation and every interaction in My Lesko Zone.

   Hash routing is used deliberately: the mock-up has to work when the file is
   opened straight from disk and when it is dropped into an iframe inside a
   Mighty Networks space.
   ========================================================================== */

(function (global) {
  "use strict";

  var store = global.LZ.store;
  var views = global.LZ.views;
  var esc = views.esc;

  var main = document.getElementById("main");
  var toastEl = document.getElementById("toast");

  /* The five member-facing places, plus home. Keys are canonical and are what
     the seed's microcopy is normalised to. */
  var NAV = ["home", "ask", "build", "questions", "sheets", "tracker"];

  /* Views that appear in the mobile tab bar (home lives in the top bar). */
  var TABS = ["ask", "build", "questions", "sheets", "tracker"];

  var ui = { qFilter: "all", tFilter: "all", editing: {} };
  global.LZ.ui = ui;
  var toastTimer = null;
  var pendingAnswer = null;
  var firstRender = true;

  /* ======================================================================
     Chrome — sidebar, tab bar, member chip
     ====================================================================== */

  function navMeta(key) {
    var list = store.copy.nav;
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i];
    }
    return { key: key, label: key, desc: "", icon: "?" };
  }

  function badgeFor(key, counts) {
    if (key === "questions" && counts.newAnswers > 0) return counts.newAnswers;
    if (key === "tracker" && counts.overdue > 0) return counts.overdue;
    return 0;
  }

  function renderChrome(active) {
    var counts = store.counts();
    var i, key, meta, badge;

    /* --- sidebar --- */
    var side = "";
    for (i = 0; i < NAV.length; i++) {
      key = NAV[i];
      meta = navMeta(key);
      badge = badgeFor(key, counts);
      side +=
        '<button class="nav-item" data-act="go" data-to="' +
        key +
        '"' +
        (active === key ? ' aria-current="page"' : "") +
        ">" +
        '<span class="nav-ico" aria-hidden="true">' +
        esc(meta.icon || "?") +
        "</span><span>" +
        '<span class="nav-label">' +
        esc(meta.label) +
        (badge
          ? '<span class="nav-count">' +
            badge +
            '<span class="sr-only"> new</span></span>'
          : "") +
        "</span>" +
        '<span class="nav-desc">' +
        esc(meta.desc) +
        "</span></span></button>";
    }
    document.getElementById("side-nav").innerHTML = side;

    /* --- mobile tab bar --- */
    var tabs = "";
    for (i = 0; i < TABS.length; i++) {
      key = TABS[i];
      meta = navMeta(key);
      badge = badgeFor(key, counts);
      tabs +=
        '<button class="tab" data-act="go" data-to="' +
        key +
        '"' +
        (active === key ? ' aria-current="page"' : "") +
        ">" +
        '<span class="ti" aria-hidden="true">' +
        esc(meta.icon || "?") +
        "</span>" +
        '<span class="tl">' +
        esc(meta.short || meta.label) +
        "</span>" +
        (badge
          ? '<span class="tab-count">' +
            badge +
            '<span class="sr-only"> new</span></span>'
          : "") +
        "</button>";
    }
    document.getElementById("tabbar").innerHTML = tabs;
  }

  function renderStaticChrome() {
    var c = store.copy;
    var m = store.member;

    document.getElementById("app-name").textContent = c.app.name;
    document.getElementById("app-promise").textContent = c.app.promise;
    document.getElementById("member-name").textContent = m.name;
    document.getElementById("member-meta").textContent = m.location;
    document.getElementById("member-avatar").textContent = views.initials(m.name);
    document.getElementById("member-avatar-m").textContent = views.initials(m.name);
    document.getElementById("foot-signoff").textContent = c.footer.signoff;
    document.getElementById("foot-line").textContent = c.footer.line;
    document.title = c.app.name;

    /* A real, obvious Home button on small screens — this audience needs the
       way back to be spelled out, not implied by a logo. */
    var bar = document.querySelector(".topbar");
    if (bar && !bar.querySelector("[data-act='go']")) {
      var b = document.createElement("button");
      b.className = "btn ghost sm";
      b.setAttribute("data-act", "go");
      b.setAttribute("data-to", "home");
      b.textContent = "Home";
      bar.insertBefore(b, bar.lastElementChild);
    }
  }

  /* ======================================================================
     Router
     ====================================================================== */

  function parseHash() {
    var h = (global.location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { name: parts[0] || "home", id: parts[1] || null };
  }

  function go(to, id) {
    global.location.hash = "/" + to + (id ? "/" + id : "");
  }

  function route() {
    var r = parseHash();
    var html;

    switch (r.name) {
      case "ask":
        html = views.ask();
        break;
      case "questions":
        html = views.questions(ui.qFilter);
        break;
      case "thread":
        store.markRead(r.id);
        html = views.thread(r.id);
        break;
      case "build":
        html = views.build();
        break;
      case "sheets":
        html = views.sheets();
        break;
      case "sheet":
        html = views.sheet(r.id);
        break;
      case "tracker":
        html = views.tracker(ui.tFilter);
        break;
      default:
        r.name = "home";
        html = views.home();
    }

    main.innerHTML = html;
    renderChrome(activeNavFor(r.name));
    global.scrollTo(0, 0);

    /* Move focus into the new screen so screen readers and keyboards land in
       the content that just changed — but not on the very first paint, where
       stealing focus would drop the visitor into the middle of the page. */
    if (firstRender) firstRender = false;
    else main.focus({ preventScroll: true });

    afterRender(r);
  }

  /** Which nav item lights up for a given view. */
  function activeNavFor(name) {
    if (name === "thread") return "questions";
    if (name === "sheet") return "sheets";
    return name;
  }

  function afterRender(r) {
    if (r.name === "build") wireBuildForm();
    if (r.name === "ask") wireAskForm();
    if (r.name === "thread") {
      wireReplyForm();
      // Shown on the first view of a brand new question, then retired.
      store.clearNew(r.id);
    }
  }

  /* ======================================================================
     Toast
     ====================================================================== */

  /** Toasts are one line; longer confirmations are shown in the page. */
  function firstSentence(text) {
    var m = String(text || "").match(/^[^.!?]*[.!?]/);
    return m ? m[0].trim() : String(text || "").slice(0, 70);
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3600);
  }

  /* ======================================================================
     Ask a question
     ====================================================================== */

  function wireAskForm() {
    var form = document.getElementById("ask-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = document.getElementById("ask-body").value.trim();
      var err = document.getElementById("ask-error");
      if (!body) {
        err.style.display = "block";
        document.getElementById("ask-body").focus();
        return;
      }
      err.style.display = "none";

      var thread = store.addQuestion({
        body: body,
        topic: document.getElementById("ask-topic").value,
        location: document.getElementById("ask-location").value.trim(),
      });

      toast(firstSentence(store.copy.ask.confirm));
      go("thread", thread.id);

      /* Simulate the team picking the question up from their dashboard. */
      if (pendingAnswer) clearTimeout(pendingAnswer);
      pendingAnswer = setTimeout(function () {
        store.simulateAnswer(thread.id);
        thread.unread = true;
        store.save();
        var here = parseHash();
        if (here.name === "thread" && here.id === thread.id) {
          store.markRead(thread.id);
          route();
          toast("The Lesko Help team replied to your question.");
        } else {
          renderChrome(activeNavFor(here.name));
          toast("The Lesko Help team replied to your question.");
        }
      }, 6000);
    });
  }

  function wireReplyForm() {
    var form = document.getElementById("reply-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = document.getElementById("reply-body");
      var body = box.value.trim();
      if (!body) {
        box.focus();
        return;
      }
      var id = form.querySelector("button[data-id]").getAttribute("data-id");
      store.addReply(id, body);
      route();
      toast("Sent. The team will reply right here.");
    });
  }

  /* ======================================================================
     Build a call sheet
     ====================================================================== */

  function wireBuildForm() {
    var form = document.getElementById("build-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var topicKey = document.getElementById("topic-key").value;
      var zipVisible = !document.getElementById("loc-zip").hidden;
      var zip = document.getElementById("f-zip").value.trim();
      var city = document.getElementById("f-city").value.trim();
      var st = document.getElementById("f-state").value.trim();
      var problem = document.getElementById("f-problem").value.trim();
      var err = document.getElementById("build-error");

      var missing = [];
      if (!topicKey) missing.push("pick what kind of help you need");
      if (zipVisible ? !zip : !(city && st))
        missing.push(zipVisible ? "add your ZIP code" : "add your city and state");
      if (!problem) missing.push("tell us what is going on in your own words");

      if (missing.length) {
        err.textContent =
          "Almost there — please " + missing.join(", and ") + ".";
        err.style.display = "block";
        err.scrollIntoView({ block: "center", behavior: "smooth" });
        return;
      }
      err.style.display = "none";

      runGeneration({
        topicKey: topicKey,
        zip: zip,
        city: city || cityFromZip(zip),
        state: st || stateFromZip(zip),
        problem: problem,
      });
    });
  }

  /* A tiny ZIP lookup so the demo can show a real place name. Mock-up only —
     the real product resolves this properly. */
  var ZIPS = {
    "14604": ["Rochester", "New York"],
    "91302": ["Calabasas", "California"],
    "73110": ["Midwest City", "Oklahoma"],
    "77044": ["Houston", "Texas"],
    "83702": ["Boise", "Idaho"],
  };

  function cityFromZip(z) {
    return ZIPS[z] ? ZIPS[z][0] : "";
  }

  function stateFromZip(z) {
    return ZIPS[z] ? ZIPS[z][1] : "";
  }

  function runGeneration(input) {
    main.innerHTML = views.generating();
    global.scrollTo(0, 0);

    var msgs = store.copy.callsheet.progress;
    var msgEl = document.getElementById("progress-msg");
    var barEl = document.getElementById("progress-bar");
    var i = 0;

    function tick() {
      if (i < msgs.length) {
        msgEl.textContent = msgs[i];
        barEl.style.width = Math.round(((i + 1) / msgs.length) * 100) + "%";
        i++;
        setTimeout(tick, 1150);
      } else {
        var sheet = store.buildSheet(input);
        go("sheet", sheet.id);
        toast("Your call sheet is ready. It is saved in My call sheets.");
      }
    }
    setTimeout(tick, 260);
  }

  /* ======================================================================
     Spreadsheet export — keeps the habit members already have
     ====================================================================== */

  function exportCsv(sheetId) {
    var sh = store.getSheet(sheetId);
    if (!sh) return;

    var cols = [
      "Called",
      "Name of Organization",
      "Website",
      "Contact Email Address",
      "Contact Phone Number",
      "Contact Information",
      "Eligibility Requirements",
      "Area Requirements",
      "Dates of Eligibility",
      "Description of Services Available",
      "Dollar Value of Free Services",
      "Grants or Loans Available",
      "Max Amount of Grants or Loans",
      "Important Things to Consider Before Applying",
      "30 Second Call Script",
    ];

    function q(v) {
      return '"' + String(v === null || v === undefined ? "" : v).replace(/"/g, '""') + '"';
    }

    var lines = [cols.map(q).join(",")];
    for (var i = 0; i < sh.orgs.length; i++) {
      var o = sh.orgs[i];
      lines.push(
        [
          store.isCalled(sh.id, o.id) ? "Yes" : "No",
          o.name,
          o.url,
          o.email || "",
          o.phone,
          o.address || "",
          o.whoQualifies,
          o.area,
          o.whenToApply,
          o.plainWhat,
          o.freeServices,
          o.moneyType,
          o.maxAmount,
          o.beforeYouCall,
          o.script,
        ]
          .map(q)
          .join(",")
      );
    }

    var name =
      "Lesko-Call-Sheet-" +
      sh.topic.replace(/[^a-z0-9]+/gi, "-") +
      "-" +
      (sh.zip || sh.city || "").replace(/[^a-z0-9]+/gi, "-") +
      ".csv";

    var blob = new Blob(["﻿" + lines.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1500);
    toast("Downloading your call sheet as a spreadsheet.");
  }

  /* ======================================================================
     Copy to clipboard, with a fallback for older browsers
     ====================================================================== */

  function copyText(text) {
    function done() {
      toast("Copied. You can paste it anywhere.");
    }
    if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (e) {
        toast("Select the words and copy them by hand.");
      }
      document.body.removeChild(ta);
    }
  }

  /** Put the cursor straight into whatever just opened for editing. */
  function focusEdit() {
    var el = document.querySelector(".inline-edit .input, .inline-edit .textarea");
    if (el) {
      el.focus();
      if (el.setSelectionRange && el.value) {
        try {
          el.setSelectionRange(el.value.length, el.value.length);
        } catch (e) {
          /* date inputs do not support selection */
        }
      }
    }
  }

  /** Two-tap confirmation for the one destructive control. */
  var resetTimer = null;
  function armReset(btn) {
    var all = document.querySelectorAll("[data-act='reset']");
    for (var i = 0; i < all.length; i++) {
      all[i].removeAttribute("data-armed");
      if (all[i].dataset.label) all[i].textContent = all[i].dataset.label;
    }
    btn.dataset.label = btn.dataset.label || btn.textContent.trim();
    btn.setAttribute("data-armed", "yes");
    btn.textContent = "Tap again to start over";
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      btn.removeAttribute("data-armed");
      btn.textContent = btn.dataset.label;
    }, 5000);
  }

  /* ======================================================================
     Delegated interaction
     ====================================================================== */

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");

    switch (act) {
      case "go":
        go(t.getAttribute("data-to"));
        break;

      case "go-ask":
        go("ask");
        break;

      case "go-build":
        go("build");
        break;

      case "go-sheets":
        go("sheets");
        break;

      case "thread":
        go("thread", t.getAttribute("data-id"));
        break;

      case "sheet":
        go("sheet", t.getAttribute("data-id"));
        break;

      case "filter-q":
        ui.qFilter = t.getAttribute("data-filter");
        route();
        break;

      case "filter-t":
        ui.tFilter = t.getAttribute("data-filter");
        route();
        break;

      case "pick-topic": {
        var all = document.querySelectorAll("[data-act='pick-topic']");
        for (var i = 0; i < all.length; i++)
          all[i].setAttribute("aria-pressed", "false");
        t.setAttribute("aria-pressed", "true");
        document.getElementById("topic-key").value = t.getAttribute("data-key");
        break;
      }

      case "loc-mode": {
        var mode = t.getAttribute("data-mode");
        var btns = document.querySelectorAll("[data-act='loc-mode']");
        for (var j = 0; j < btns.length; j++)
          btns[j].setAttribute(
            "aria-pressed",
            btns[j].getAttribute("data-mode") === mode ? "true" : "false"
          );
        document.getElementById("loc-zip").hidden = mode !== "zip";
        document.getElementById("loc-city").hidden = mode !== "city";
        break;
      }

      case "toggle-org": {
        var detail = document.getElementById(
          t.getAttribute("data-target") + "-d"
        );
        var open = detail.hidden;
        detail.hidden = !open;
        t.setAttribute("aria-expanded", open ? "true" : "false");
        t.querySelector("span[aria-hidden]").innerHTML = open
          ? "&#9652;"
          : "&#9662;";
        break;
      }

      case "copy":
        copyText(t.getAttribute("data-text"));
        break;

      case "print":
        global.print();
        break;

      case "export-csv":
        exportCsv(t.getAttribute("data-sheet"));
        break;

      case "track-one": {
        var sh = store.getSheet(t.getAttribute("data-sheet"));
        if (!sh) break;
        var orgId = t.getAttribute("data-org");
        var org = null;
        for (var k = 0; k < sh.orgs.length; k++)
          if (sh.orgs[k].id === orgId) org = sh.orgs[k];
        if (!org) break;
        if (store.addToTracker(sh, org)) {
          toast(org.name + " is now on your applications list.");
        } else {
          toast(org.name + " is already on your applications list.");
        }
        renderChrome(activeNavFor(parseHash().name));
        break;
      }

      case "track-all": {
        var s2 = store.getSheet(t.getAttribute("data-sheet"));
        if (!s2) break;
        var n = store.addSheetToTracker(s2);
        toast(
          n === 0
            ? "They are all on your applications list already."
            : n === 1
            ? "1 place added to your applications list."
            : n + " places added to your applications list."
        );
        renderChrome(activeNavFor(parseHash().name));
        break;
      }

      /* --- inline editing, no browser dialogs -------------------------- */

      case "edit-note":
      case "edit-date":
      case "edit-remove":
        ui.editing = {
          row: t.getAttribute("data-row"),
          field: act.replace("edit-", ""),
        };
        route();
        focusEdit();
        break;

      case "cancel-edit":
        ui.editing = {};
        route();
        break;

      case "save-note": {
        var noteRow = t.getAttribute("data-row");
        var box = document.getElementById("nt-" + noteRow);
        store.setNote(noteRow, box ? box.value.trim() : "");
        ui.editing = {};
        route();
        toast("Note saved.");
        break;
      }

      case "save-date": {
        var dateRow = t.getAttribute("data-row");
        var field = document.getElementById("fu-" + dateRow);
        store.setFollowUp(dateRow, field ? field.value : "");
        ui.editing = {};
        route();
        toast("We will remind you on that day.");
        break;
      }

      case "confirm-remove": {
        var gone = store.getTrackerRow(t.getAttribute("data-row"));
        var goneName = gone ? gone.org : "That one";
        store.removeTrackerRow(t.getAttribute("data-row"));
        ui.editing = {};
        route();
        toast(goneName + " is off your applications list.");
        break;
      }

      /* Reset asks for a second tap rather than a browser dialog, which the
         embedded viewers block. */
      case "reset": {
        if (t.getAttribute("data-armed") === "yes") {
          store.reset();
          ui.editing = {};
          go("home");
          route();
          toast("The demo is back to how it started.");
          break;
        }
        armReset(t);
        break;
      }
    }
  });

  /* --- checkboxes and selects (change, not click) --- */

  document.addEventListener("change", function (e) {
    if (!e.target || !e.target.closest) return;
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");

    if (act === "called") {
      var on = store.toggleCalled(
        t.getAttribute("data-sheet"),
        t.getAttribute("data-org")
      );
      var card = t.closest(".org");
      if (card) card.classList.toggle("done", on);
      if (on) toast("Ticked off. Well done — that is the hard part.");
    }

    if (act === "status") {
      store.setStatus(t.getAttribute("data-row"), t.value);
      route();
    }

    if (act === "step") {
      store.toggleStep(t.getAttribute("data-row"), t.getAttribute("data-step"));
      route();
    }
  });

  /* ======================================================================
     Start
     ====================================================================== */

  global.addEventListener("hashchange", route);

  store.init();
  renderStaticChrome();
  if (!global.location.hash) global.location.hash = "/home";
  route();

  /* A quiet way to reset the demo before showing it to someone. */
  global.LZ.resetDemo = function () {
    store.reset();
    route();
  };
})(window);

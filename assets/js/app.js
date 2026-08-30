/* ==================================================================
   app.js — tabs, routing and every interaction in My Lesko Zone.

   Hash routing on purpose: the widget has to work opened straight
   from disk and inside a Mighty Networks iframe, and a member can be
   deep-linked back to one question or one call sheet.
   ================================================================== */

(function (global) {
  "use strict";

  var store = global.LZ.store;
  var views = global.LZ.views;

  var face = document.getElementById("face");
  var toastEl = document.getElementById("toast");

  /* The four faces behind the tab row. */
  var TABS = [
    { key: "ask", label: "Ask" },
    { key: "questions", label: "My questions" },
    { key: "build", label: "Call sheet" },
    { key: "sheets", label: "My sheets" },
  ];

  var toastTimer = null;
  var pendingAnswer = null;
  var resetTimer = null;

  /* ------------------------------------------------------------- tabs */

  function renderTabs(active) {
    var n = store.counts();
    var html = TABS.map(function (t, i) {
      var bub = "";
      if (t.key === "questions") {
        bub = n.unread
          ? '<span class="bub">' + n.unread + '<span class="sr-only"> new answers</span></span>'
          : n.questions
          ? '<span class="bub quiet">' + n.questions + "</span>"
          : "";
      }
      if (t.key === "sheets" && n.sheets) {
        bub = '<span class="bub quiet">' + n.sheets + "</span>";
      }
      return (
        '<button class="tab' + (active === t.key ? " active" : "") +
        '" role="tab" aria-selected="' + (active === t.key ? "true" : "false") +
        '" data-act="go" data-to="' + t.key + '">' +
        "0" + (i + 1) + " &middot; " + t.label + bub + "</button>"
      );
    }).join("");
    document.getElementById("tabbar").innerHTML = html;
  }

  /* ----------------------------------------------------------- router */

  function parseHash() {
    var h = (global.location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { name: parts[0] || "ask", id: parts[1] || null };
  }

  function go(to, id) {
    global.location.hash = "/" + to + (id ? "/" + id : "");
  }

  function activeTabFor(name) {
    if (name === "thread") return "questions";
    if (name === "sheet") return "sheets";
    return name;
  }

  var firstRender = true;

  function route() {
    var r = parseHash();
    var html;

    switch (r.name) {
      case "questions":
        html = views.questions();
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
      default:
        r.name = "ask";
        html = views.ask();
    }

    face.innerHTML = html;
    renderTabs(activeTabFor(r.name));

    if (firstRender) {
      firstRender = false;
    } else {
      global.scrollTo(0, 0);
    }

    if (r.name === "ask") wireAskForm();
    if (r.name === "build") wireBuildForm();
    if (r.name === "thread") {
      wireReplyForm();
      store.clearNew(r.id);
    }
  }

  /* ------------------------------------------------------------ toast */

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.hidden = true;
    }, 3400);
  }

  /** Toasts are one line; longer confirmations live in the page. */
  function firstSentence(text) {
    var m = String(text || "").match(/^[^.!?]*[.!?]/);
    return m ? m[0].trim() : String(text || "").slice(0, 70);
  }

  /* --------------------------------------------------- ask a question */

  function wireAskForm() {
    var form = document.getElementById("ask-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = document.getElementById("ask-body").value.trim();
      var err = document.getElementById("ask-error");
      if (!body) {
        err.classList.add("show");
        document.getElementById("ask-body").focus();
        return;
      }
      err.classList.remove("show");

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
        var here = parseHash();
        if (here.name === "thread" && here.id === thread.id) {
          store.markRead(thread.id);
          route();
        } else {
          thread.unread = true;
          store.save();
          renderTabs(activeTabFor(here.name));
        }
        toast("The Lesko Help team replied to your question.");
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
      store.addReply(form.querySelector("button[data-id]").getAttribute("data-id"), body);
      route();
      toast("Sent. The team will reply right here.");
    });
  }

  /* ------------------------------------------------ build a call sheet */

  /* A tiny ZIP lookup so the demo can show a real place name. */
  var ZIPS = {
    "14604": ["Rochester", "New York"],
    "91302": ["Calabasas", "California"],
    "73110": ["Midwest City", "Oklahoma"],
    "77044": ["Houston", "Texas"],
    "83702": ["Boise", "Idaho"],
  };

  function wireBuildForm() {
    var form = document.getElementById("build-form");
    if (!form) return;

    /* Show what the chosen topic covers, in one small line. */
    var select = document.getElementById("b-topic");
    var desc = document.getElementById("topic-desc");
    select.addEventListener("change", function () {
      var opt = select.options[select.selectedIndex];
      desc.textContent = (opt && opt.getAttribute("data-desc")) || "";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var topicKey = select.value;
      var zip = document.getElementById("b-zip").value.trim();
      var cityRaw = document.getElementById("b-city").value.trim();
      var problem = document.getElementById("b-problem").value.trim();
      var err = document.getElementById("build-error");

      var missing = [];
      if (!topicKey) missing.push("pick what kind of help you need");
      if (!zip && !cityRaw) missing.push("add your ZIP code or your city");
      if (!problem) missing.push("tell us what is going on in your own words");

      if (missing.length) {
        err.textContent = "Almost there — please " + missing.join(", and ") + ".";
        err.classList.add("show");
        return;
      }
      err.classList.remove("show");

      var city = "";
      var state = "";
      if (cityRaw) {
        var parts = cityRaw.split(",");
        city = parts[0].trim();
        state = (parts[1] || "").trim();
      } else if (ZIPS[zip]) {
        city = ZIPS[zip][0];
        state = ZIPS[zip][1];
      }

      runGeneration({
        topicKey: topicKey,
        zip: zip,
        city: city,
        state: state,
        problem: problem,
      });
    });
  }

  function runGeneration(input) {
    face.innerHTML = views.generating();
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
        setTimeout(tick, 1050);
      } else {
        var sheet = store.buildSheet(input);
        go("sheet", sheet.id);
        toast("Your call sheet is ready — it is saved under My call sheets.");
      }
    }
    setTimeout(tick, 250);
  }

  /* ------------------------------------------- spreadsheet export
     Keeps the original 14 research columns, plus Called. */

  function exportCsv(sheetId) {
    var sh = store.getSheet(sheetId);
    if (!sh) return;

    var cols = [
      "Called", "Name of Organization", "Website", "Contact Email Address",
      "Contact Phone Number", "Contact Information", "Eligibility Requirements",
      "Area Requirements", "Dates of Eligibility",
      "Description of Services Available", "Dollar Value of Free Services",
      "Grants or Loans Available", "Max Amount of Grants or Loans",
      "Important Things to Consider Before Applying", "30 Second Call Script",
    ];

    function q(v) {
      return '"' + String(v === null || v === undefined ? "" : v).replace(/"/g, '""') + '"';
    }

    var lines = [cols.map(q).join(",")];
    sh.orgs.forEach(function (o) {
      lines.push(
        [
          store.isCalled(sh.id, o.id) ? "Yes" : "No",
          o.name, o.url, o.email || "", o.phone, o.address || "",
          o.whoQualifies, o.area, o.whenToApply, o.plainWhat,
          o.freeServices, o.moneyType, o.maxAmount, o.beforeYouCall, o.script,
        ].map(q).join(",")
      );
    });

    var name =
      "Lesko-Call-Sheet-" +
      sh.topic.replace(/[^a-z0-9]+/gi, "-") + "-" +
      (sh.zip || sh.city || "").replace(/[^a-z0-9]+/gi, "-") + ".csv";

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

  /* ------------------------------------------------ copy to clipboard */

  function copyText(text) {
    function done() {
      toast("Copied. Paste it anywhere.");
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
    if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* --------------------------------- two-tap reset (no browser dialogs) */

  function armReset(btn) {
    btn.dataset.label = btn.dataset.label || btn.textContent.trim();
    btn.setAttribute("data-armed", "yes");
    btn.textContent = "Tap again to start over";
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      btn.removeAttribute("data-armed");
      btn.textContent = btn.dataset.label;
    }, 5000);
  }

  /* ------------------------------------------- delegated interaction */

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");

    switch (act) {
      case "go":
        go(t.getAttribute("data-to"));
        break;

      case "thread":
        go("thread", t.getAttribute("data-id"));
        break;

      case "sheet":
        go("sheet", t.getAttribute("data-id"));
        break;

      case "toggle-org": {
        var detail = document.getElementById(t.getAttribute("data-target") + "-d");
        var open = detail.hidden;
        detail.hidden = !open;
        t.setAttribute("aria-expanded", open ? "true" : "false");
        t.querySelector("span[aria-hidden]").innerHTML = open ? "&#9652;" : "&#9662;";
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

      case "reset": {
        if (t.getAttribute("data-armed") === "yes") {
          store.reset();
          go("ask");
          route();
          toast("The demo is back to how it started.");
          t.removeAttribute("data-armed");
          t.textContent = t.dataset.label;
          break;
        }
        armReset(t);
        break;
      }
    }
  });

  document.addEventListener("change", function (e) {
    if (!e.target || !e.target.closest) return;
    var t = e.target.closest("[data-act]");
    if (!t) return;

    if (t.getAttribute("data-act") === "called") {
      var on = store.toggleCalled(
        t.getAttribute("data-sheet"),
        t.getAttribute("data-org")
      );
      var card = t.closest(".org");
      if (card) card.classList.toggle("done", on);
      if (on) toast("Ticked off. Well done — that is the hard part.");
    }
  });

  /* ------------------------------------------------------------ start */

  global.addEventListener("hashchange", route);

  store.init();
  var footLine = document.getElementById("foot-line");
  if (store.copy.footer && store.copy.footer.signoff) {
    footLine.textContent = "Lesko Help · " + store.copy.footer.signoff.toLowerCase();
  }
  if (!global.location.hash) global.location.hash = "/ask";
  route();

  /* A quiet way to reset the demo before showing it to someone. */
  global.LZ.resetDemo = function () {
    store.reset();
    route();
  };
})(window);

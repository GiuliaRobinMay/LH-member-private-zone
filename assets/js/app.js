/* ==================================================================
   app.js — two tabs, a chat, a call sheet builder.

   Hash routing on purpose: the widget works opened straight from
   disk and inside a Mighty Networks iframe, and a member can be
   deep-linked back to one conversation or one call sheet.
   ================================================================== */

(function (global) {
  "use strict";

  var store = global.LZ.store;
  var views = global.LZ.views;

  var face = document.getElementById("face");
  var toastEl = document.getElementById("toast");

  var toastTimer = null;
  var pendingAnswer = null;
  var typingTimer = null;
  var resetTimer = null;

  /* ------------------------------------------------------------- tabs */

  function renderTabs(active) {
    var n = store.counts();
    var qBub = n.unread
      ? '<span class="bub">' + n.unread + '<span class="sr-only"> new answers</span></span>'
      : "";
    document.getElementById("tabbar").innerHTML =
      '<button class="tab' + (active === "q" ? " active" : "") +
      '" role="tab" aria-selected="' + (active === "q") +
      '" data-act="go" data-to="q">&#128172; Questions' + qBub + "</button>" +
      '<button class="tab' + (active === "build" ? " active" : "") +
      '" role="tab" aria-selected="' + (active === "build") +
      '" data-act="go" data-to="build">&#128203; Call sheets</button>';
  }

  /* ----------------------------------------------------------- router */

  function parseHash() {
    var h = (global.location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { name: parts[0] || "q", id: parts[1] || null };
  }

  function go(to, id) {
    global.location.hash = "/" + to + (id ? "/" + id : "");
  }

  function activeTabFor(name) {
    return name === "thread" || name === "q" ? "q" : "build";
  }

  var firstRender = true;

  function route() {
    var r = parseHash();
    var html;

    switch (r.name) {
      case "thread":
        store.markRead(r.id);
        html = views.thread(r.id);
        break;
      case "build":
        html = views.build();
        break;
      case "sheet":
        html = views.sheet(r.id);
        break;
      default:
        r.name = "q";
        html = views.chat();
    }

    face.innerHTML = html;
    renderTabs(activeTabFor(r.name));

    if (firstRender) firstRender = false;
    else global.scrollTo(0, 0);

    if (r.name === "q") wireCompose("new-q", "q-input", onNewQuestion);
    if (r.name === "thread") {
      wireCompose("reply-form", "reply-input", onReply);
      store.clearNew(r.id);
    }
    if (r.name === "build") wireBuildForm();
  }

  /* ------------------------------------------------------------ toast */

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.hidden = true;
    }, 3200);
  }

  /* ------------------------------------------------------------- chat */

  /** Compose bars submit on the button and on Enter (Shift+Enter = newline). */
  function wireCompose(formId, inputId, onSend) {
    var form = document.getElementById(formId);
    if (!form) return;
    var input = document.getElementById(inputId);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });

    /* grow with the text, like every chat input */
    input.addEventListener("input", function () {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 140) + "px";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = input.value.trim();
      if (!body) {
        input.focus();
        return;
      }
      onSend(body, form);
    });
  }

  function onNewQuestion(body) {
    var thread = store.addQuestion({ body: body, topic: "", location: "" });
    go("thread", thread.id);
    scheduleTeamReply(thread);
  }

  function onReply(body, form) {
    var id = form.querySelector("button[data-id]").getAttribute("data-id");
    store.addReply(id, body);
    route();
  }

  /** Typing dots after a moment, then the team's answer — like a real chat. */
  function scheduleTeamReply(thread) {
    if (pendingAnswer) clearTimeout(pendingAnswer);
    if (typingTimer) clearTimeout(typingTimer);

    typingTimer = setTimeout(function () {
      var slot = document.getElementById("typing-slot");
      var here = parseHash();
      if (slot && here.name === "thread" && here.id === thread.id) {
        slot.innerHTML = views.typingBubble();
        slot.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }, 1400);

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
        toast("The Lesko Help team replied to your question.");
      }
    }, 5200);
  }

  /* ------------------------------------------------ build a call sheet */

  /* A tiny ZIP lookup so the demo shows a real place name. */
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

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var topicKey = document.getElementById("b-topic").value;
      var where = document.getElementById("b-where").value.trim();
      var problem = document.getElementById("b-problem").value.trim();
      var err = document.getElementById("build-error");

      var missing = [];
      if (!topicKey) missing.push("pick what you need help with");
      if (!where) missing.push("say where you are");
      if (!problem) missing.push("tell us what is going on");

      if (missing.length) {
        err.textContent = "Almost there — please " + missing.join(", and ") + ".";
        err.classList.add("show");
        return;
      }
      err.classList.remove("show");

      /* One location box: a 5-digit ZIP, or "City, State", or just a city. */
      var zip = "";
      var city = "";
      var state = "";
      var zipMatch = where.match(/\b\d{5}\b/);
      if (zipMatch) {
        zip = zipMatch[0];
        if (ZIPS[zip]) {
          city = ZIPS[zip][0];
          state = ZIPS[zip][1];
        }
        var remainder = where.replace(zip, "").replace(/[,\s]+/g, " ").trim();
        if (remainder && !city) city = remainder;
      } else {
        var parts = where.split(",");
        city = parts[0].trim();
        state = (parts[1] || "").trim();
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
        setTimeout(tick, 1000);
      } else {
        var sheet = store.buildSheet(input);
        go("sheet", sheet.id);
        toast("Saved under Call sheets — it is yours for good.");
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
          go("q");
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
  if (!global.location.hash) global.location.hash = "/q";
  route();

  /* A quiet way to reset the demo before showing it to someone. */
  global.LZ.resetDemo = function () {
    store.reset();
    route();
  };
})(window);

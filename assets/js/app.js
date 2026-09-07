/* ==================================================================
   app.js — one window: the conversations, a chat, the call sheets.

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
  global.LZ.ui = { explain: null };
  var pendingAnswer = null;
  var typingTimer = null;
  var resetTimer = null;

  /* ----------------------------------------------------------- router */

  function parseHash() {
    var h = (global.location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { name: parts[0] || "chats", id: parts[1] || null };
  }

  function go(to, id) {
    global.location.hash = "/" + to + (id ? "/" + id : "");
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
      case "sheets":
        html = views.sheets();
        break;
      case "sheet":
        html = views.sheet(r.id);
        break;
      default:
        r.name = "chats";
        html = views.chats();
    }

    face.innerHTML = html;

    if (firstRender) firstRender = false;
    else global.scrollTo(0, 0);

    closeAskModal();
    if (r.name === "thread") {
      wireCompose("reply-form", "reply-input", onReply);
      scrollChatDown();
      var fb = document.getElementById("fb-form");
      if (fb) {
        wireCompose("fb-form", "fb-note", function (text) {
          store.setFeedback(r.id, "no", text);
          global.LZ.ui.explain = null;
          route();
          toast("Thank you — the team will take another look.");
        });
      }
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
    }, 3200);
  }

  /* --------------------------------------------- the dropdown menu */

  function closeMenus() {
    var menus = document.querySelectorAll(".dd-menu");
    for (var i = 0; i < menus.length; i++) menus[i].hidden = true;
    var btns = document.querySelectorAll(".dd-btn");
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute("aria-expanded", "false");
  }

  function toggleMenu(btn) {
    var menu = btn.parentNode.querySelector(".dd-menu");
    var wasHidden = menu.hidden;
    closeMenus();
    if (wasHidden) {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  }

  /* ------------------------------------------------------------- chat */

  /** The messages scroll inside the chat window, like every chat app. */
  function scrollChatDown() {
    var body = document.getElementById("chat-body");
    if (body) body.scrollTop = body.scrollHeight;
  }

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

  /* ---- the pop-up where a new question is written (no browser dialogs:
          it is our own overlay, so it works inside an embed) */

  function openAskModal() {
    closeAskModal();
    var root = document.createElement("div");
    root.id = "modal-root";
    root.innerHTML = views.askModal();
    document.body.appendChild(root);

    var form = document.getElementById("ask-form");
    var body = document.getElementById("am-body");
    body.focus();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = body.value.trim();
      var err = document.getElementById("am-error");
      if (!text) {
        err.textContent = "Tell us what is going on — a few lines is plenty.";
        err.classList.add("show");
        body.focus();
        return;
      }
      var zip = document.getElementById("am-zip").value.trim();
      var st = document.getElementById("am-state").value.trim();
      var thread = store.addQuestion({
        body: text,
        topic: "",
        location: [zip, st].filter(Boolean).join(", "),
      });
      closeAskModal();
      go("thread", thread.id);
      scheduleTeamReply(thread);
    });

    /* tap outside the card, or Escape, to put it away */
    root.querySelector(".overlay").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) closeAskModal();
    });
  }

  function closeAskModal() {
    var root = document.getElementById("modal-root");
    if (root) root.parentNode.removeChild(root);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAskModal();
      closeMenus();
    }
  });

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
        scrollChatDown();
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
        /* the list and the menu badge show the new answer straight away */
        if (here.name === "chats" || here.name === "sheets") route();
        toast("The Lesko Help team replied to your question.");
      }
    }, 5200);
  }

  /* A photo that cannot load (outside images are blocked in some
     previews) quietly gives way to the coloured initial under it. */
  document.addEventListener(
    "error",
    function (e) {
      var img = e.target;
      if (!img || img.tagName !== "IMG" || !img.parentNode) return;
      if (/\b(chat-ava|b-ava|m-ava)\b/.test(img.parentNode.className || "")) {
        img.parentNode.removeChild(img);
      }
    },
    true
  );

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

  /* ------------------------------------------ per-row notes on a sheet */

  function openNoteEditor(btn) {
    var sheetId = btn.getAttribute("data-sheet");
    var orgId = btn.getAttribute("data-org");
    var row = document.getElementById("wrow-" + sheetId + "-" + orgId);
    if (!row) return;
    var slot = row.querySelector('[data-slot="note"]');
    var current = store.orgNote(sheetId, orgId);

    slot.innerHTML =
      '<div class="w-note-edit">' +
      '<label class="sr-only" for="ne-input">Your note</label>' +
      '<input id="ne-input" type="text" value="' + views.esc(current) +
      '" placeholder="Who you spoke to, what they said…">' +
      '<button type="button" class="btn red" id="ne-save">Save</button>' +
      "</div>";
    btn.hidden = true;

    var input = slot.querySelector("#ne-input");
    var saveBtn = slot.querySelector("#ne-save");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    function saveNote() {
      var text = input.value.trim();
      store.setOrgNote(sheetId, orgId, text);
      slot.innerHTML = text
        ? '<p class="w-note-text">&#128221; ' + views.esc(text) + "</p>"
        : "";
      btn.hidden = false;
      btn.textContent = text ? "Edit note" : "+ Note";
      if (text) toast("Note saved.");
    }

    saveBtn.addEventListener("click", saveNote);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        saveNote();
      }
    });
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

    /* a tap anywhere outside the dropdown puts it away */
    if (!e.target.closest(".dd")) closeMenus();

    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");

    switch (act) {
      case "go":
        go(t.getAttribute("data-to"));
        break;

      case "dd-toggle":
        toggleMenu(t);
        break;

      case "thread":
        go("thread", t.getAttribute("data-id"));
        break;

      case "sheet":
        go("sheet", t.getAttribute("data-id"));
        break;

      case "export-csv":
        exportCsv(t.getAttribute("data-sheet"));
        break;

      case "ask-open":
        closeMenus();
        openAskModal();
        break;

      case "ask-close":
        closeAskModal();
        break;

      case "demo-file":
        toast("Demo — in the real zone this opens " + (t.getAttribute("data-name") || "the file") + ".");
        break;

      case "fb-yes":
        store.setFeedback(t.getAttribute("data-id"), "yes", "");
        route();
        toast("Thank you — good to know it helped.");
        break;

      case "fb-no":
        global.LZ.ui.explain = t.getAttribute("data-id");
        route();
        var fbBox = document.getElementById("fb-note");
        if (fbBox) fbBox.focus();
        break;

      case "org-note": {
        openNoteEditor(t);
        break;
      }

      case "reset": {
        if (t.getAttribute("data-armed") === "yes") {
          store.reset();
          go("chats");
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
      var sheetId = t.getAttribute("data-sheet");
      var orgId = t.getAttribute("data-org");
      var on = store.toggleCalled(sheetId, orgId);
      var row = t.closest(".wrow");
      if (row) {
        row.classList.toggle("done", on);
        var slot = row.querySelector('[data-slot="called"]');
        if (slot) {
          slot.innerHTML = on
            ? "&#10003; Called " + views.esc(views.niceDate(store.calledOn(sheetId, orgId)))
            : "";
        }
      }
      if (on) toast("Ticked off. Well done — that is the hard part.");
    }
  });

  /* ------------------------------------------------------------ start */

  global.addEventListener("hashchange", route);

  store.init();
  if (!global.location.hash) global.location.hash = "/chats";
  route();

  /* A quiet way to reset the demo before showing it to someone. */
  global.LZ.resetDemo = function () {
    store.reset();
    route();
  };
})(window);

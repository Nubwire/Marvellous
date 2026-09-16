/* Marvellous Entertainment — site behaviour
   Small, dependency-free. Everything degrades gracefully without JS. */

(function () {
  "use strict";

  /* ----------------------------------------------------- mobile nav -- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* -------------------------------------------- session board filter -- */
  var tabs = document.querySelectorAll(".venue-tab");
  var rows = document.querySelectorAll(".session-row");

  if (tabs.length && rows.length) {
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener("click", function () {
        var venue = tab.dataset.venue;

        Array.prototype.forEach.call(tabs, function (t) {
          t.setAttribute("aria-selected", String(t === tab));
        });

        Array.prototype.forEach.call(rows, function (row) {
          var match = venue === "all" || row.dataset.venue === venue;
          row.hidden = !match;
        });

        var shown = document.querySelectorAll(".session-row:not([hidden])").length;
        var empty = document.querySelector(".board-empty");
        if (empty) empty.hidden = shown > 0;
      });
    });
  }

  /* ---------------------------------------------- today's date label -- */
  var dateEl = document.querySelector("[data-today]");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }

  /* ----------------------------------------------------- footer year -- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------- forms -- */
  /* No form endpoint is wired up yet. Until one is (see README), submitting
     shows a clear confirmation instead of failing silently. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-demo-form]"), function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-status");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-status form-note";
        note.setAttribute("role", "status");
        form.appendChild(note);
      }
      note.textContent =
        "Thanks — this form isn't connected to an inbox yet. Email hello@marvellousentertainment.com.au in the meantime.";
      form.reset();
    });
  });
})();

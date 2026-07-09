(function () {
  "use strict";

  function normalize(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function pathPrefix() {
    var segs = window.location.pathname.split("/").filter(Boolean);
    var isFile = segs.length > 0 && /\.[a-z0-9]+$/i.test(segs[segs.length - 1]);
    var depth = isFile ? segs.length - 1 : segs.length;
    return depth > 0 ? new Array(depth + 1).join("../") : "";
  }

  function init() {
    var toggle = document.querySelector("[data-search-toggle]");
    var panel = document.querySelector("[data-search-panel]");
    var input = document.querySelector("[data-search-input]");
    var results = document.querySelector("[data-search-results]");
    if (!toggle || !panel || !input || !results) return;
    if (typeof SUMIFLUID_SEARCH_INDEX === "undefined") return;

    var index = SUMIFLUID_SEARCH_INDEX.map(function (e) {
      return {
        title: e.title,
        url: e.url,
        category: e.category,
        description: e.description,
        image: e.image,
        haystack: normalize(e.title + " " + e.category + " " + e.description)
      };
    });

    var prefix = pathPrefix();
    var open = false;

    function openPanel() {
      open = true;
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      setTimeout(function () { input.focus(); }, 10);
    }

    function closePanel() {
      open = false;
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      if (open) { closePanel(); } else { openPanel(); }
    });

    panel.addEventListener("click", function (e) {
      if (e.target === panel) closePanel();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) closePanel();
    });

    function render(query) {
      var q = normalize(query.trim());
      if (q.length < 2) {
        results.innerHTML = "";
        results.classList.remove("has-results");
        return;
      }
      var terms = q.split(/\s+/);
      var matches = index.filter(function (e) {
        return terms.every(function (t) { return e.haystack.indexOf(t) !== -1; });
      }).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<p class="search-empty">Sin resultados para "' + query.replace(/</g, "&lt;") + '".</p>';
        results.classList.add("has-results");
        return;
      }

      results.innerHTML = matches.map(function (m) {
        return (
          '<a class="search-result" href="' + prefix + m.url + '">' +
            '<span class="search-result-thumb"><img src="' + prefix + m.image + '" alt="" loading="lazy"></span>' +
            '<span class="search-result-body">' +
              '<span class="search-result-cat mono">' + m.category + '</span>' +
              '<span class="search-result-title">' + m.title + '</span>' +
              '<span class="search-result-desc">' + m.description + '</span>' +
            '</span>' +
          '</a>'
        );
      }).join("");
      results.classList.add("has-results");
    }

    var timer;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      var val = input.value;
      timer = setTimeout(function () { render(val); }, 100);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = results.querySelector(".search-result");
        if (first) window.location.href = first.getAttribute("href");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

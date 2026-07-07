(function () {
  "use strict";

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-nav-links]");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.textContent = "☰";
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- active nav link ---------- */
  function initActiveLink() {
    var file = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
    document.querySelectorAll("[data-nav-links] a[data-key]").forEach(function (a) {
      if (a.getAttribute("data-key") === file) a.classList.add("active");
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(el);
    });

    // safety net: reveal everything after 6s regardless
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }, 6000);
  }

  /* ---------- hero carousel ---------- */
  function initHeroCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var slides = root.querySelectorAll("[data-slide]");
    var dots = root.querySelectorAll("[data-dot]");
    var prevBtn = root.querySelector("[data-hc-prev]");
    var nextBtn = root.querySelector("[data-hc-next]");
    var progress = root.querySelector("[data-hc-progress]");
    if (!slides.length) return;

    var idx = 0;
    var timer = null;
    var progressStart = null;
    var progressRaf = null;
    var AUTOPLAY_MS = 6000;

    function render() {
      slides.forEach(function (s, si) { s.classList.toggle("is-active", si === idx); });
      dots.forEach(function (d, di) {
        d.classList.toggle("is-active", di === idx);
        d.setAttribute("aria-selected", di === idx ? "true" : "false");
      });
    }

    function go(i) {
      idx = (i + slides.length) % slides.length;
      render();
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }

    function stopProgress() {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      progressRaf = null;
      progressStart = null;
      if (progress) progress.style.width = "0%";
    }

    function tickProgress(ts) {
      if (!progressStart) progressStart = ts;
      var p = Math.min((ts - progressStart) / AUTOPLAY_MS, 1);
      if (progress) progress.style.width = (p * 100) + "%";
      if (p < 1) progressRaf = requestAnimationFrame(tickProgress);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      stopProgress();
    }

    function start() {
      stop();
      if (reduced) return;
      progressStart = null;
      progressRaf = requestAnimationFrame(tickProgress);
      timer = setInterval(function () { next(); progressStart = null; }, AUTOPLAY_MS);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });
    dots.forEach(function (d, di) {
      d.addEventListener("click", function () { go(di); start(); });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    var touchStartX = null;
    root.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); start(); }
      touchStartX = null;
    }, { passive: true });

    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); start(); }
      if (e.key === "ArrowLeft") { prev(); start(); }
    });

    render();
    start();
  }

  /* ---------- number counters ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = reduced ? 1 : 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      els.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- brand marquee: duplicate track for seamless loop ---------- */
  function initMarquee() {
    var track = document.querySelector("[data-marquee]");
    if (!track || track.dataset.marqueeBound) return;
    track.dataset.marqueeBound = "1";
    track.innerHTML += track.innerHTML;
  }

  /* ---------- sticky nav shrink on scroll ---------- */
  function initNavScroll() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }, { passive: true });
  }

  /* ---------- year in footer ---------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initActiveLink, "initActiveLink");
    safe(initHeroCarousel, "initHeroCarousel");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initMarquee, "initMarquee");
    safe(initNavScroll, "initNavScroll");
    safe(initYear, "initYear");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

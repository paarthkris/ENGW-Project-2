/* =========================================================================
   main.js — boot -> enter transition, tab switching, hash routing,
   and back-button support (Back from the site returns to the boot screen).
   Original code. No external dependencies.
   ========================================================================= */
(function () {
  const boot = document.getElementById("boot");
  const site = document.getElementById("site");
  const goBtn = document.getElementById("go-btn");
  const tabLinks = Array.from(document.querySelectorAll("nav.tabs a"));
  const sections = Array.from(document.querySelectorAll("section.tab"));
  const validTabs = sections.map((s) => s.id);

  let entered = false;

  function enterSite(pushHistory) {
    if (entered) return;
    entered = true;
    boot.classList.add("hidden");
    document.body.classList.add("entered");
    site.classList.add("visible");
    if (pushHistory !== false) {
      // Push a history entry so the browser Back button returns to the boot
      // screen instead of leaving the site.
      const hash = location.hash || "#home";
      history.pushState({ entered: true }, "", hash);
    }
    routeFromHash();
    const active = document.querySelector("nav.tabs a.active");
    if (active) active.focus();
  }

  function exitToBoot() {
    if (!entered) return;
    entered = false;
    boot.classList.remove("hidden");
    document.body.classList.remove("entered");
    site.classList.remove("visible");
    window.scrollTo({ top: 0 });
  }

  function showTab(id) {
    if (!validTabs.includes(id)) id = validTabs[0];
    sections.forEach((s) => s.classList.toggle("active", s.id === id));
    tabLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + id)
    );
    if (entered) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function routeFromHash() {
    const id = (location.hash || "").replace(/^#/, "");
    showTab(id || validTabs[0]);
  }

  // --- events ---
  if (goBtn) goBtn.addEventListener("click", function () { enterSite(); });

  // Enter / Space / G on the boot screen enters the site
  document.addEventListener("keydown", function (e) {
    if (!entered && (e.key === "Enter" || e.key === " " || e.key === "g" || e.key === "G")) {
      e.preventDefault();
      enterSite();
    }
  });

  // Tab clicks: mark history entries as "inside the site" so Back walks
  // through tabs and finally lands on the boot screen.
  tabLinks.forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const id = a.getAttribute("href").replace(/^#/, "");
      if (!entered) enterSite();
      if (("#" + id) !== location.hash) {
        history.pushState({ entered: true }, "", "#" + id);
      }
      showTab(id);
    });
  });

  // Back/forward: states tagged {entered:true} are inside the site;
  // anything else (the initial entry) is the boot screen.
  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.entered) {
      if (!entered) enterSite(false);
      routeFromHash();
    } else {
      exitToBoot();
    }
  });

  // Deep links (e.g. #context-memo): pre-select the tab; boot still shows.
  routeFromHash();
})();

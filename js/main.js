/* =========================================================================
   main.js — boot -> enter transition, tab switching, hash routing.
   Original code. No external dependencies.
   ========================================================================= */
(function () {
  const boot = document.getElementById("boot");
  const site = document.getElementById("site");
  const goBtn = document.getElementById("go-btn");
  const skipBtn = document.getElementById("skip-boot");
  const tabLinks = Array.from(document.querySelectorAll("nav.tabs a"));
  const sections = Array.from(document.querySelectorAll("section.tab"));
  const validTabs = sections.map((s) => s.id);

  let entered = false;

  function enterSite() {
    if (entered) return;
    entered = true;
    boot.classList.add("hidden");
    document.body.classList.add("entered");
    site.classList.add("visible");
    // dim the rain (handled by CSS body.entered), route to current hash
    routeFromHash();
    // move focus to the active tab for keyboard users
    const active = document.querySelector("nav.tabs a.active");
    if (active) active.focus();
  }

  function showTab(id) {
    if (!validTabs.includes(id)) id = validTabs[0];
    sections.forEach((s) => s.classList.toggle("active", s.id === id));
    tabLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + id)
    );
    // scroll content area to top on tab change
    if (entered) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function routeFromHash() {
    const id = (location.hash || "").replace(/^#/, "");
    showTab(id || validTabs[0]);
  }

  // --- events ---
  if (goBtn) goBtn.addEventListener("click", enterSite);
  if (skipBtn) skipBtn.addEventListener("click", enterSite);

  // Enter / Space / any letter key on the boot screen enters the site
  document.addEventListener("keydown", function (e) {
    if (!entered && (e.key === "Enter" || e.key === " " || e.key === "g" || e.key === "G")) {
      e.preventDefault();
      enterSite();
    }
  });

  // Tab clicks update the hash; hashchange drives the actual switch
  tabLinks.forEach((a) => {
    a.addEventListener("click", function () {
      // let the default hash change happen; if already entered nothing else needed
      if (!entered) enterSite();
    });
  });

  window.addEventListener("hashchange", function () {
    if (!entered) enterSite();
    else routeFromHash();
  });

  // If someone lands with a deep link (e.g. #context-memo), still show boot
  // first, but pre-select the right tab so it's ready on enter.
  routeFromHash();
})();

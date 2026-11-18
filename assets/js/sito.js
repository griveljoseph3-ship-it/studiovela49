/* =====================================================================
   StudioVela49 — funzioni del sito (nessuna libreria)
   1. Menu su telefono e tendina "Servizi"
   2. Testata che cambia scorrendo + indicatore di scorrimento (G → A4)
   3. Animazioni all'ingresso (IntersectionObserver)
   4. Modulo preventivo: controlli, invio (Web3Forms / Formspree) o email già compilata
   5. Mappa caricata solo al clic
   Con "riduci movimento" le animazioni non partono e tutto resta visibile.
   ===================================================================== */
(function () {
  "use strict";
  var doc = document.documentElement;
  var ridotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. MENU ---------- */
  var bottone = document.querySelector(".menu-pulsante");
  var nav = document.getElementById("nav");
  function apriMenu(aperto) {
    if (!bottone || !nav) return;
    bottone.setAttribute("aria-expanded", String(aperto));
    bottone.querySelector(".sr").textContent = aperto ? bottone.dataset.chiudi : bottone.dataset.apri;
    nav.classList.toggle("aperta", aperto);
    document.body.classList.toggle("menu-aperto", aperto);
  }
  if (bottone && nav) {
    bottone.addEventListener("click", function () { apriMenu(bottone.getAttribute("aria-expanded") !== "true"); });
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function () { apriMenu(false); });
  }
  var tendina = document.querySelector(".nav__apri");
  function chiudiTendina() { if (tendina) tendina.setAttribute("aria-expanded", "false"); }
  if (tendina) {
    tendina.addEventListener("click", function (e) {
      e.stopPropagation();
      tendina.setAttribute("aria-expanded", String(tendina.getAttribute("aria-expanded") !== "true"));
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".nav__gruppo") && window.innerWidth >= 1100) chiudiTendina(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (tendina && tendina.getAttribute("aria-expanded") === "true") { chiudiTendina(); tendina.focus(); return; }
    if (nav && nav.classList.contains("aperta")) { apriMenu(false); bottone.focus(); }
  });

  /* ---------- 2. TESTATA E AVANZAMENTO ---------- */
  var testata = document.querySelector(".testata");
  var barraAv = document.querySelector(".avanzamento span");
  var inAttesa = false;
  function aggiorna() {
    inAttesa = false;
    var y = window.scrollY, max = doc.scrollHeight - window.innerHeight;
    if (testata) testata.classList.toggle("scorsa", y > 8);
    if (barraAv) barraAv.style.setProperty("--p", max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
  }
  window.addEventListener("scroll", function () { if (!inAttesa) { inAttesa = true; requestAnimationFrame(aggiorna); } }, { passive: true });
  aggiorna();

  /* ---------- 3. ANIMAZIONI ---------- */
  var elementi = document.querySelectorAll("[data-rivela], .apertura, .passo");
  if (ridotto || !("IntersectionObserver" in window)) {
    elementi.forEach(function (el) { el.classList.add("visibile"); });
  } else {
    var osservatore = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add("visibile"); osservatore.unobserve(v.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    elementi.forEach(function (el) { osservatore.observe(el); });
    // il titolo della prima schermata entra subito
    document.querySelectorAll("h1[data-rivela]").forEach(function (el) { requestAnimationFrame(function () { el.classList.add("visibile"); }); });
  }

  /* ---------- 4. MODULO PREVENTIVO ---------- */
  document.querySelectorAll("form[data-modulo]").forEach(function (form) {
    var errore = form.querySelector(".modulo__errore");
    var tipo = form.dataset.modulo;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // antispam: il campo nascosto deve restare vuoto
      var trappola = form.querySelector(".trappola input");
      if (trappola && trappola.value) return;
      var primo = null;
      form.querySelectorAll("[required]").forEach(function (c) {
        var ok = c.type === "checkbox" ? c.checked : c.checkValidity() && c.value.trim() !== "";
        c.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok && !primo) primo = c;
      });
      if (primo) { errore.hidden = false; primo.focus(); return; }
      errore.hidden = true;
      var dati = new FormData(form);
      var bottoneInvio = form.querySelector("[type=submit]");

      if (tipo === "mailto") {
        var righe = [];
        ["nome", "email", "telefono", "servizio", "immobile", "comune", "messaggio"].forEach(function (k) {
          var c = form.elements[k]; if (!c || !c.value) return;
          var etichetta = form.querySelector('label[for="' + c.id + '"]');
          var valore = c.tagName === "SELECT" ? c.options[c.selectedIndex].text : c.value;
          righe.push((etichetta ? etichetta.textContent.replace("*", "").trim() : k) + ": " + valore);
        });
        var href = "mailto:" + form.dataset.email + "?subject=" + encodeURIComponent(form.dataset.oggetto) + "&body=" + encodeURIComponent(righe.join("\n"));
        window.location.href = href;
        setTimeout(function () { window.location.href = form.dataset.grazie + "?email=1"; }, 1200);
        return;
      }
      if (tipo === "netlify") { form.submit(); return; }
      bottoneInvio.disabled = true;
      fetch(form.action, { method: "POST", body: dati, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); window.location.href = form.dataset.grazie; })
        .catch(function () { bottoneInvio.disabled = false; errore.hidden = false; errore.textContent = errore.textContent; });
    });
    form.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid") === "true") e.target.setAttribute("aria-invalid", "false"); });
  });
  // pagina Grazie dopo l'email già compilata
  if (location.search.indexOf("email=1") > -1) {
    var m = document.querySelector(".messaggio__mail"); if (m) m.hidden = false;
  }

  /* ---------- 5. MAPPA AL CLIC ---------- */
  document.querySelectorAll("[data-mappa-carica]").forEach(function (b) {
    b.addEventListener("click", function () {
      var box = b.closest(".mappa");
      var f = document.createElement("iframe");
      f.src = box.dataset.mappa; f.title = box.dataset.titolo; f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      box.innerHTML = ""; box.appendChild(f); f.focus();
    });
  });
})();

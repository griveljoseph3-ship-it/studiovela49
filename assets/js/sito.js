/* =====================================================================
   FUNZIONI DEL SITO  —  non serve modificare questo file
   1. Menu a tendina su telefono
   2. Banner cookie (consenso valido 6 mesi, come chiede il Garante)
   3. Mappa di Google caricata solo dopo il consenso
   4. Galleria con foto a tutto schermo
   5. Filtri del catalogo prodotti
   6. Evidenzia il giorno di oggi negli orari
   7. Testata trasparente sopra la grande immagine, solida scorrendo
   8. Elementi che compaiono mentre si scorre
   9. Profondità 3D: montagne a strati, parallasse, carte che si inclinano
   10. Carosello delle recensioni
   11. Video di sfondo (caricato solo dopo la pagina, mai su telefono)
   12. Piccola "onda" quando si tocca un pulsante
   Gli effetti si spengono da dati-cliente.js (sezione "effetti") e da soli
   se il visitatore ha chiesto al telefono/computer di ridurre le animazioni.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. MENU SU TELEFONO ---------- */
  var bottoneMenu = document.querySelector(".menu-pulsante");
  var nav = document.getElementById("menu-principale");
  if (bottoneMenu && nav) {
    var etichetta = bottoneMenu.querySelector(".sr");
    var impostaMenu = function (aperto) {
      bottoneMenu.setAttribute("aria-expanded", String(aperto));
      nav.classList.toggle("aperto", aperto);
      document.body.classList.toggle("menu-aperto", aperto);
      if (etichetta) etichetta.textContent = aperto ? bottoneMenu.dataset.chiudi : bottoneMenu.dataset.apri;
    };
    bottoneMenu.addEventListener("click", function () {
      impostaMenu(bottoneMenu.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) impostaMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("aperto")) { impostaMenu(false); bottoneMenu.focus(); }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function () { impostaMenu(false); });
  }

  /* ---------- 2. CONSENSO COOKIE ---------- */
  var CHIAVE = "consenso-cookie";
  var DURATA = 182 * 24 * 60 * 60 * 1000; // circa 6 mesi
  var banner = document.getElementById("cookie-banner");

  function leggiConsenso() {
    try {
      var c = JSON.parse(localStorage.getItem(CHIAVE));
      if (c && typeof c.mappe === "boolean" && Date.now() - c.data < DURATA) return c;
    } catch (e) { /* memoria non disponibile */ }
    return null;
  }
  function salvaConsenso(mappe) {
    try { localStorage.setItem(CHIAVE, JSON.stringify({ mappe: mappe, data: Date.now() })); } catch (e) { /* ignora */ }
  }
  function mostraBanner(visibile) {
    if (!banner) return;
    banner.hidden = !visibile;
    document.body.classList.toggle("cookie-visibile", visibile);
  }

  if (banner) {
    if (!leggiConsenso()) mostraBanner(true);
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cookie]");
      if (!b) return;
      var accetta = b.dataset.cookie === "accetta";
      var prima = leggiConsenso();
      salvaConsenso(accetta);
      mostraBanner(false);
      if (accetta) caricaMappe();
      else if (prima && prima.mappe) location.reload(); // toglie la mappa già caricata
    });
  }
  document.querySelectorAll("[data-cookie-preferenze]").forEach(function (b) {
    b.addEventListener("click", function () {
      mostraBanner(true);
      var primo = banner && banner.querySelector("[data-cookie]");
      if (primo) primo.focus();
    });
  });

  /* ---------- 3. MAPPA DI GOOGLE ---------- */
  function caricaMappe() {
    document.querySelectorAll("[data-mappa]").forEach(function (box) {
      if (box.querySelector("iframe")) return;
      var f = document.createElement("iframe");
      f.src = box.dataset.mappa;
      f.title = box.dataset.titolo || "Google Maps";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.setAttribute("allowfullscreen", "");
      box.innerHTML = "";
      box.appendChild(f);
    });
  }
  var consenso = leggiConsenso();
  if (consenso && consenso.mappe) caricaMappe();
  document.querySelectorAll("[data-mappa-carica]").forEach(function (b) {
    b.addEventListener("click", function () {
      salvaConsenso(true);
      mostraBanner(false);
      caricaMappe();
    });
  });

  /* ---------- 4. GALLERIA A TUTTO SCHERMO ---------- */
  var dialogo = document.querySelector(".lightbox");
  var voci = Array.prototype.slice.call(document.querySelectorAll(".galleria__voce"));
  if (dialogo && voci.length && typeof dialogo.showModal === "function") {
    var foto = dialogo.querySelector(".lightbox__img");
    var didascalia = dialogo.querySelector(".lightbox__didascalia");
    var contatore = dialogo.querySelector(".lightbox__contatore");
    var attuale = 0, ultimoLink = null, inizioX = null;

    var mostra = function (i) {
      attuale = (i + voci.length) % voci.length;
      var v = voci[attuale];
      foto.src = v.getAttribute("href");
      foto.alt = v.dataset.didascalia || "";
      didascalia.textContent = v.dataset.didascalia || "";
      contatore.textContent = (attuale + 1) + " / " + voci.length;
      // precarica la successiva
      var succ = new Image();
      succ.src = voci[(attuale + 1) % voci.length].getAttribute("href");
    };
    voci.forEach(function (v, i) {
      v.addEventListener("click", function (e) {
        e.preventDefault();
        ultimoLink = v;
        mostra(i);
        dialogo.showModal();
        document.body.classList.add("lightbox-aperta");
      });
    });
    dialogo.querySelector(".lightbox__chiudi").addEventListener("click", function () { dialogo.close(); });
    dialogo.querySelector(".lightbox__prec").addEventListener("click", function () { mostra(attuale - 1); });
    dialogo.querySelector(".lightbox__succ").addEventListener("click", function () { mostra(attuale + 1); });
    dialogo.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mostra(attuale - 1);
      if (e.key === "ArrowRight") mostra(attuale + 1);
    });
    dialogo.addEventListener("click", function (e) { if (e.target === dialogo) dialogo.close(); });
    dialogo.addEventListener("close", function () {
      document.body.classList.remove("lightbox-aperta");
      if (ultimoLink) ultimoLink.focus();
    });
    // scorrimento col dito
    dialogo.addEventListener("touchstart", function (e) { inizioX = e.touches[0].clientX; }, { passive: true });
    dialogo.addEventListener("touchend", function (e) {
      if (inizioX === null) return;
      var dx = e.changedTouches[0].clientX - inizioX;
      if (Math.abs(dx) > 50) mostra(attuale + (dx < 0 ? 1 : -1));
      inizioX = null;
    });
  }

  /* ---------- 5. FILTRI DEL CATALOGO ---------- */
  document.querySelectorAll(".filtri").forEach(function (gruppo) {
    var catalogo = gruppo.parentElement.querySelector("[data-catalogo]");
    if (!catalogo) return;
    gruppo.addEventListener("click", function (e) {
      var b = e.target.closest(".filtro");
      if (!b) return;
      gruppo.querySelectorAll(".filtro").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var f = b.dataset.filtro;
      catalogo.querySelectorAll("[data-categoria]").forEach(function (p) {
        p.hidden = !(f === "*" || p.dataset.categoria === f);
      });
    });
  });

  /* ---------- 6. GIORNO DI OGGI NEGLI ORARI (ora italiana) ---------- */
  try {
    var nomeGiorno = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Europe/Rome" }).format(new Date());
    var numero = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[nomeGiorno];
    document.querySelectorAll('.orari tr[data-giorno="' + numero + '"]').forEach(function (r) { r.classList.add("oggi"); });
  } catch (e) { /* browser molto vecchio: nessun evidenziamento */ }

  /* ---------- Evita doppio invio del modulo ---------- */
  document.querySelectorAll("form[data-netlify]").forEach(function (f) {
    f.addEventListener("submit", function () {
      var b = f.querySelector('button[type="submit"]');
      if (b) setTimeout(function () { b.disabled = true; }, 0);
    });
  });

  /* =================================================================
     EFFETTI
     ================================================================= */
  var radice = document.documentElement;
  var ridotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var con3d = radice.getAttribute("data-3d") === "si" && !ridotto;
  var conAnimazioni = radice.getAttribute("data-animazioni") === "si" && !ridotto;
  var puntatoreFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var tutti = function (sel, dentro) { return Array.prototype.slice.call((dentro || document).querySelectorAll(sel)); };

  /* ---------- 7. TESTATA TRASPARENTE ---------- */
  var testata = document.querySelector("[data-testata]");
  var testataSopra = testata && testata.classList.contains("testata--sopra");

  /* ---------- 8. COMPARSA MENTRE SI SCORRE ---------- */
  var daRivelare = tutti("[data-rivela]");
  if (conAnimazioni && "IntersectionObserver" in window) {
    var osservaComparsa = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add("visibile"); osservaComparsa.unobserve(v.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    daRivelare.forEach(function (el) { osservaComparsa.observe(el); });
  } else {
    daRivelare.forEach(function (el) { el.classList.add("visibile"); });
  }
  radice.setAttribute("data-pronto", "");

  /* ---------- 9. PROFONDITÀ 3D ---------- */
  var hero = document.querySelector("[data-hero]");
  var strati = hero ? tutti(".strato", hero) : [];
  var heroTesto = hero && hero.querySelector(".hero__testo");
  var lenti = tutti("[data-p]").filter(function (el) { return !el.classList.contains("strato") && !el.classList.contains("hero__testo"); });
  var inclinabili = tutti("[data-tilt]");
  var mouse = { x: 0, y: 0, mx: 0, my: 0 };
  var inAttesa = false;

  // Carte che si inclinano seguendo il mouse (computer)
  var forzaTilt = function (el) { return el.getAttribute("data-tilt") === "lieve" ? 0.6 : 1; };
  if (con3d && puntatoreFine) {
    inclinabili.forEach(function (el) {
      var f = forzaTilt(el);
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add("inclinato");
        el.style.setProperty("--ry", ((x - 0.5) * 9 * f).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - y) * 9 * f).toFixed(2) + "deg");
        el.style.setProperty("--lx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--ly", (y * 100).toFixed(1) + "%");
        el.style.setProperty("--luce", "1");
      });
      el.addEventListener("pointerleave", function () {
        el.classList.remove("inclinato");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--luce", "0");
      });
    });
    if (hero) {
      hero.addEventListener("pointermove", function (e) {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        richiedi();
      });
      hero.addEventListener("pointerleave", function () { mouse.x = 0; mouse.y = 0; richiedi(); });
    }
  }

  // Sul telefono: le carte visibili si inclinano appena mentre si scorre
  var visibiliTilt = [];
  if (con3d && !puntatoreFine && "IntersectionObserver" in window) {
    var osservaTilt = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        var i = visibiliTilt.indexOf(v.target);
        if (v.isIntersecting && i < 0) visibiliTilt.push(v.target);
        if (!v.isIntersecting && i >= 0) visibiliTilt.splice(i, 1);
      });
      richiedi();
    });
    inclinabili.forEach(function (el) { osservaTilt.observe(el); });
  }

  function aggiorna() {
    inAttesa = false;
    var sy = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    if (testataSopra) testata.classList.toggle("solida", sy > 40);
    if (!con3d) return;

    // Montagne a strati (o foto) della grande immagine
    if (hero && sy < hero.offsetHeight * 1.1) {
      mouse.mx += (mouse.x - mouse.mx) * 0.07;
      mouse.my += (mouse.y - mouse.my) * 0.07;
      strati.forEach(function (s) {
        var p = parseFloat(s.getAttribute("data-p")) || 0, m = parseFloat(s.getAttribute("data-m")) || 0;
        s.style.transform = "translate3d(" + (-mouse.mx * m).toFixed(2) + "px," + (sy * p + -mouse.my * m * 0.4).toFixed(2) + "px,0)";
      });
      if (heroTesto) {
        heroTesto.style.transform = "translate3d(0," + (sy * 0.22).toFixed(1) + "px,0)";
        heroTesto.style.opacity = Math.max(0, 1 - sy / (hero.offsetHeight * 0.75)).toFixed(3);
      }
      if (Math.abs(mouse.x - mouse.mx) > 0.002 || Math.abs(mouse.y - mouse.my) > 0.002) richiedi();
    }

    // Altri elementi che scorrono più lenti o più veloci
    lenti.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = parseFloat(el.getAttribute("data-p")) || 0;
      var limite = r.height * 0.1;
      var y = Math.max(-limite, Math.min(limite, (r.top + r.height / 2 - vh / 2) * -p));
      el.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
    });

    // Telefono: leggera inclinazione legata allo scorrimento
    visibiliTilt.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2)));
      el.style.setProperty("--rx", (d * 5 * forzaTilt(el)).toFixed(2) + "deg");
    });
  }
  function richiedi() {
    if (!inAttesa) { inAttesa = true; window.requestAnimationFrame(aggiorna); }
  }
  window.addEventListener("scroll", richiedi, { passive: true });
  window.addEventListener("resize", richiedi);
  richiedi();

  /* ---------- 10. CAROSELLO DELLE RECENSIONI ---------- */
  tutti("[data-carosello]").forEach(function (car) {
    var sezione = car.closest("section") || car;
    var binario = car.querySelector(".carosello__binario");
    var voci = binario.children;
    var punti = tutti(".carosello__punti span", car);
    var bPrec = sezione.querySelector('[data-car="prec"]');
    var bSucc = sezione.querySelector('[data-car="succ"]');
    var bPausa = sezione.querySelector('[data-car="pausa"]');
    var fermoUtente = false, sopra = false, visibile = false, timer = null;
    var passo = function () { return voci[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(binario).columnGap) || 0); };
    var indice = function () { return Math.round(binario.scrollLeft / passo()); };
    var allaFine = function () { return binario.scrollLeft + binario.clientWidth >= binario.scrollWidth - 4; };
    var vai = function (i) {
      var n = voci.length;
      i = (i + n) % n;
      binario.scrollTo({ left: i * passo(), behavior: ridotto ? "auto" : "smooth" });
    };
    var ciclo = function () {
      clearInterval(timer);
      if (!conAnimazioni || fermoUtente) return;
      timer = setInterval(function () {
        if (visibile && !sopra && !document.hidden) vai(allaFine() ? 0 : indice() + 1);
      }, 6500);
    };
    if (bPrec) bPrec.addEventListener("click", function () { vai(allaFine() && indice() === 0 ? voci.length - 1 : indice() - 1); ciclo(); });
    if (bSucc) bSucc.addEventListener("click", function () { vai(allaFine() ? 0 : indice() + 1); ciclo(); });
    if (bPausa) {
      if (!conAnimazioni) bPausa.hidden = true;
      bPausa.addEventListener("click", function () {
        fermoUtente = !fermoUtente;
        bPausa.setAttribute("aria-pressed", String(fermoUtente));
        bPausa.setAttribute("aria-label", fermoUtente ? bPausa.dataset.riproduci : bPausa.dataset.pausa);
        ciclo();
      });
    }
    binario.addEventListener("scroll", function () {
      var i = allaFine() ? punti.length - 1 : indice();
      punti.forEach(function (p, k) { p.classList.toggle("attivo", k === i); });
    }, { passive: true });
    sezione.addEventListener("pointerenter", function () { sopra = true; });
    sezione.addEventListener("pointerleave", function () { sopra = false; });
    sezione.addEventListener("focusin", function () { sopra = true; });
    sezione.addEventListener("focusout", function () { sopra = false; });
    binario.addEventListener("touchstart", function () { fermoUtente = true; ciclo(); }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (v) { visibile = v[0].isIntersecting; }).observe(car);
    } else { visibile = true; }
    ciclo();
  });

  /* ---------- 11. VIDEO DI SFONDO ---------- */
  var connessione = navigator.connection || {};
  if (hero && hero.getAttribute("data-video") && !ridotto && window.innerWidth >= 768 && !connessione.saveData) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        var v = document.createElement("video");
        var bottone = hero.querySelector(".hero__video-pulsante");
        v.className = "hero__video";
        v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
        v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
        v.src = hero.getAttribute("data-video");
        hero.querySelector(".hero__strati").insertAdjacentElement("afterend", v);
        v.addEventListener("playing", function () { v.classList.add("pronto"); if (bottone) bottone.hidden = false; }, { once: true });
        var avvio = v.play();
        if (avvio && avvio.catch) avvio.catch(function () { /* il browser ha bloccato l'avvio: resta l'immagine */ });
        if (bottone) bottone.addEventListener("click", function () {
          var inPausa = !v.paused;
          if (inPausa) v.pause(); else v.play();
          bottone.setAttribute("aria-pressed", String(inPausa));
          bottone.setAttribute("aria-label", inPausa ? bottone.dataset.riproduci : bottone.dataset.pausa);
        });
      }, 400);
    });
  }

  /* ---------- 12. ONDA SUI PULSANTI ---------- */
  if (conAnimazioni) {
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".pulsante");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var onda = document.createElement("span");
      onda.className = "onda";
      onda.style.left = (e.clientX - r.left) + "px";
      onda.style.top = (e.clientY - r.top) + "px";
      b.appendChild(onda);
      setTimeout(function () { onda.remove(); }, 700);
    });
  }
})();

/* =====================================================================
   MOTORE DEL SITO  —  NON SERVE MODIFICARE QUESTO FILE
   =====================================================================
   Netlify lo esegue a ogni pubblicazione (vedi netlify.toml).
   Legge dati-cliente.js e i file in lingue/, poi crea nella cartella
   dist/ tutte le pagine HTML in tutte le lingue, più sitemap.xml,
   robots.txt, _redirects e _headers.
   Usa solo Node.js, senza librerie esterne.
   ===================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");

const RADICE = __dirname;
const USCITA = path.join(RADICE, "dist");
const C = require("./dati-cliente.js");
const VERSIONE = Date.now().toString(36); // evita che il browser usi CSS/JS vecchi
const avvisi = [];
const STILI = require("./motore/stili.js");
const DISEGNI = require("./motore/disegni.js");
const segnapostoUsati = [];

/* ---------------------------------------------------------------
   STRUMENTI DI BASE
   --------------------------------------------------------------- */
const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const togliHtml = (s) => String(s ?? "").replace(/<[^>]*>/g, "");
const sitoUrl = C.sitoUrl.replace(/\/+$/, "");
const assoluto = (p) => sitoUrl + p;
const slug = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function scriviFile(relativo, contenuto) {
  const dest = path.join(USCITA, relativo);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, contenuto);
}

/* Sostituisce {nome}, {citta}... in tutti i testi di una lingua */
function sostituisciSegnaposto(valore, tok) {
  if (typeof valore === "string") return valore.replace(/\{(\w+)\}/g, (m, k) => (k in tok ? tok[k] : m));
  if (Array.isArray(valore)) return valore.map((v) => sostituisciSegnaposto(v, tok));
  if (valore && typeof valore === "object") {
    const out = {};
    for (const k of Object.keys(valore)) out[k] = sostituisciSegnaposto(valore[k], tok);
    return out;
  }
  return valore;
}

/* Se in una lingua manca un testo, usa quello della lingua principale e avvisa */
function completaConPrincipale(base, lingua, percorso = "") {
  if (lingua === undefined) {
    avvisi.push(`Testo mancante "${percorso}": uso quello della lingua principale.`);
    return base;
  }
  if (Array.isArray(base) || typeof base !== "object" || base === null) return lingua;
  const out = { ...lingua };
  for (const k of Object.keys(base)) out[k] = completaConPrincipale(base[k], lingua[k], percorso ? `${percorso}.${k}` : k);
  return out;
}

/* Legge larghezza e altezza delle foto (JPG, PNG, WebP, SVG) */
const cacheDimensioni = {};
function dimensioni(file) {
  if (file in cacheDimensioni) return cacheDimensioni[file];
  const p = path.join(RADICE, "assets", "img", file);
  let d = null;
  if (!fs.existsSync(p)) {
    avvisi.push(`FOTO MANCANTE: assets/img/${file}`);
  } else {
    const b = fs.readFileSync(p);
    try {
      if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
        d = { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
      } else if (b[0] === 0xff && b[1] === 0xd8) {
        let i = 2;
        while (i < b.length - 9) {
          if (b[i] !== 0xff) { i++; continue; }
          const m = b[i + 1];
          if (m === 0xff) { i++; continue; }
          if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
            d = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
            break;
          }
          i += 2 + b.readUInt16BE(i + 2);
        }
      } else if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
        const t = b.toString("ascii", 12, 16);
        if (t === "VP8 ") d = { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
        if (t === "VP8L") { const n = b.readUInt32LE(21); d = { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
        if (t === "VP8X") d = { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
      } else if (file.endsWith(".svg")) {
        const s = b.toString("utf8");
        const vb = s.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
        if (vb) d = { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
      }
    } catch (e) { /* foto illeggibile: si va avanti senza dimensioni */ }
  }
  cacheDimensioni[file] = d;
  return d;
}

/* ---------------------------------------------------------------
   STILE SCELTO (motore/stili.js) + ritocchi facoltativi di dati-cliente.js
   --------------------------------------------------------------- */
const nomeStile = STILI[C.stile] ? C.stile : "alpino-elegante";
if (!STILI[C.stile]) avvisi.push(`Stile "${C.stile}" sconosciuto: uso "alpino-elegante". Stili disponibili: ${Object.keys(STILI).join(", ")}.`);
const STILE = STILI[nomeStile];
const pieno = (v) => typeof v === "string" && v.trim() !== "";
const T0 = C.tema || {};
const TEMA = {
  colori: { ...STILE.colori, ...Object.fromEntries(Object.entries(T0.colori || {}).filter(([, v]) => pieno(v))) },
  titoli: pieno(T0.caratteri?.titoli) ? T0.caratteri.titoli : STILE.caratteri.titoli,
  testo: pieno(T0.caratteri?.testo) ? T0.caratteri.testo : STILE.caratteri.testo,
  fileCaratteri: (T0.fileCaratteri && T0.fileCaratteri.length) ? T0.fileCaratteri : STILE.fileCaratteri,
  raggio: pieno(T0.arrotondamento) ? T0.arrotondamento : STILE.arrotondamento,
};
const EFFETTI = { profondita3d: C.effetti?.profondita3d !== false, animazioni: C.effetti?.animazioni !== false };

/* ---------------------------------------------------------------
   FOTO: se il file esiste si usa, altrimenti si disegna un segnaposto
   nei colori dello stile e nelle proporzioni del posto.
   [larghezza, altezza, disegno]
   --------------------------------------------------------------- */
const POSTI = {
  hero: [2000, 1250, "paesaggio"], heroTelefono: [900, 1400, "paesaggio"],
  chiSiamo: [1200, 1500, "camino"], chiSiamo2: [800, 800, "vino"],
  sfondoContatti: [2000, 1250, "sfondo"], offerta: [1200, 1500, "tavola"],
  camera: [1200, 800, "interno"], prodotto: [800, 800, "prodotto"],
  "g-grande": [1400, 1400, "paesaggio"], "g-alta": [800, 1600, "paesaggio"],
  "g-larga": [1600, 800, "paesaggio"], "g-normale": [1000, 1000, "paesaggio"],
};
const esiste = (file) => !!file && fs.existsSync(path.join(RADICE, "assets", "img", file));
function foto(file, posto, scena) {
  if (!file) return null;
  if (esiste(file)) {
    const d = dimensioni(file);
    return { src: `/assets/img/${file}`, w: d && d.w, h: d && d.h, vera: true };
  }
  const [w, h, sc] = POSTI[posto] || [1200, 900, "paesaggio"];
  const rel = `assets/img/segnaposto/${slug(file.replace(/\.[a-z0-9]+$/i, ""))}-${w}x${h}.svg`;
  if (!fs.existsSync(path.join(USCITA, rel))) {
    scriviFile(rel, DISEGNI.segnaposto(STILE.scena, scena || sc, w, h, file));
    segnapostoUsati.push(`${file}  →  ${w} × ${h} px`);
  }
  return { src: "/" + rel, w, h, vera: false, nome: file };
}

/* Etichetta dei segnaposto: piccola, in un angolo, uguale su ogni schermo (HTML, non dentro il disegno) */
function etichettaFoto(file, posto, classe = "") {
  if (!file || esiste(file) || C.etichetteSegnaposto === false) return "";
  const [w, h] = POSTI[posto] || [1200, 900];
  return `<span class="segnaposto${classe ? " " + classe : ""}" aria-hidden="true"><b>FOTO SEGNAPOSTO</b>${esc(file)} · ${w} × ${h} px</span>`;
}

/* Versione leggera facoltativa: se esiste assets/img/piccole/<stesso nome>, telefoni e schermi piccoli
   scaricano quella (srcset) e la foto grande resta per gli schermi ampi e per l'ingrandimento della galleria. */
const LARGHEZZE = {
  "g-grande": "(max-width: 859px) 100vw, 690px", "g-larga": "(max-width: 859px) 100vw, 690px",
  "g-alta": "(max-width: 859px) 50vw, 340px", "g-normale": "(max-width: 859px) 50vw, 340px",
  offerta: "(max-width: 759px) 92vw, 620px", camera: "(max-width: 759px) 92vw, 620px", chiSiamo: "(max-width: 759px) 85vw, 480px",
};
function srcsetPiccola(file, f, posto) {
  const piccola = `piccole/${file}`;
  if (!f.vera || !f.w || !LARGHEZZE[posto] || !esiste(piccola)) return "";
  const d = dimensioni(piccola);
  if (!d || d.w >= f.w) return "";
  return ` srcset="/assets/img/${esc(piccola)} ${d.w}w, ${esc(f.src)} ${f.w}w" sizes="${LARGHEZZE[posto]}"`;
}

function img(file, alt, { posto = "", scena = "", classe = "", subito = false, senzaEtichetta = false } = {}) {
  const f = foto(file, posto, scena);
  if (!f) return "";
  return `<img src="${esc(f.src)}"${srcsetPiccola(file, f, posto)} alt="${esc(alt)}"`
    + (f.w ? ` width="${f.w}" height="${f.h}"` : "")
    + (subito ? ` fetchpriority="high"` : ` loading="lazy"`)
    + ` decoding="async"`
    + (classe ? ` class="${classe}"` : "") + `>`
    + (f.vera || senzaEtichetta ? "" : etichettaFoto(file, posto));
}

/* ---------------------------------------------------------------
   ICONE (disegni SVG semplici). Nomi utilizzabili nei punti di forza:
   montagna, foglia, fuoco, cuore, stella, posizione, orologio, telefono,
   email, whatsapp, persone, letto, attrezzi, premio, sole, neve, check, globo
   --------------------------------------------------------------- */
const ICONE = {
  telefono: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 9.5c.3 1.6 1.4 3.1 3 4l1.2-1 1.8.8-.4 1.5c-2.9.2-6.2-3-6.1-6l1.5-.4.8 1.8z"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  posizione: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  orologio: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  montagna: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  foglia: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  fuoco: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  cuore: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
  stella: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  freccia: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  chiudi: '<path d="M18 6 6 18M6 6l12 12"/>',
  sinistra: '<path d="m15 18-6-6 6-6"/>',
  destra: '<path d="m9 18 6-6-6-6"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  globo: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  persone: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  letto: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  attrezzi: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  premio: '<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>',
  sole: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  neve: '<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07M9 3l3 3 3-3M9 21l3-3 3 3M3 9l3 3-3 3M21 9l-3 3 3 3"/>',
};
function icona(nome, classe = "icona") {
  const p = ICONE[nome] || ICONE.check;
  return `<svg class="${classe}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${p}</svg>`;
}

/* ---------------------------------------------------------------
   CARICAMENTO DELLE LINGUE
   --------------------------------------------------------------- */
if (!Array.isArray(C.lingue) || C.lingue.length === 0) throw new Error("In dati-cliente.js manca l'elenco delle lingue.");
const PRINCIPALE = C.lingue[0];
const A = C.attivita, I = C.indirizzo;
const indirizzoCompleto = `${I.via}, ${I.cap} ${I.citta} (${I.provincia})`;
const testi = {};
let testoPrincipale = null;

for (const lingua of C.lingue) {
  const file = path.join(RADICE, "lingue", `${lingua.codice}.js`);
  if (!fs.existsSync(file)) throw new Error(`Manca il file lingue/${lingua.codice}.js (lingua indicata in dati-cliente.js).`);
  let t = require(file);
  if (testoPrincipale) t = completaConPrincipale(testoPrincipale, t, lingua.codice);
  const data = new Date(C.privacyAggiornata + "T12:00:00");
  const tok = {
    nome: A.nome, citta: I.citta, telefono: C.contatti.telefonoVisibile, email: C.contatti.email,
    indirizzo: indirizzoCompleto, ragioneSociale: A.ragioneSociale, piva: A.partitaIva,
    data: isNaN(data) ? C.privacyAggiornata : data.toLocaleDateString(lingua.codice, { day: "numeric", month: "long", year: "numeric" }),
  };
  testi[lingua.codice] = sostituisciSegnaposto(t, tok);
  if (!testoPrincipale) testoPrincipale = t;
}

/* Controllo: i prezzi devono essere uguali in tutte le lingue */
function controllaPrezzi() {
  const tp = testi[PRINCIPALE.codice];
  const elenchi = (t) => ({
    menu: (t.menu?.categorie || []).flatMap((c) => c.piatti || []),
    camere: t.camere?.elenco || [],
    catalogo: t.catalogo?.prodotti || [],
    listino: t.listino?.voci || [],
  });
  const base = elenchi(tp);
  for (const l of C.lingue.slice(1)) {
    const altro = elenchi(testi[l.codice]);
    for (const k of Object.keys(base)) {
      if (!C.sezioni[k]) continue;
      if (base[k].length !== altro[k].length) avvisi.push(`Sezione "${k}": in ${l.codice}.js ci sono ${altro[k].length} voci, in ${PRINCIPALE.codice}.js ${base[k].length}.`);
      base[k].forEach((v, i) => {
        const a = altro[k][i];
        if (a && v.prezzo && a.prezzo && v.prezzo.replace(/[^\d.,]/g, "") !== a.prezzo.replace(/[^\d.,]/g, ""))
          avvisi.push(`Prezzo diverso in "${k}" voce ${i + 1}: ${PRINCIPALE.codice}="${v.prezzo}" / ${l.codice}="${a.prezzo}".`);
      });
    }
    const n = (testi[l.codice].galleria?.descrizioni || []).length;
    if (n !== C.galleria.length) avvisi.push(`Galleria: ${C.galleria.length} foto ma ${n} descrizioni in ${l.codice}.js.`);
  }
  if ((tp.galleria?.descrizioni || []).length !== C.galleria.length)
    avvisi.push(`Galleria: ${C.galleria.length} foto ma ${(tp.galleria?.descrizioni || []).length} descrizioni in ${PRINCIPALE.codice}.js.`);
}
controllaPrezzi();

/* ---------------------------------------------------------------
   INDIRIZZI DELLE PAGINE
   --------------------------------------------------------------- */
const PAGINE_MENU = ["home", "chiSiamo", "servizi", "galleria", "contatti"];
const PAGINE_INDICIZZATE = ["home", "chiSiamo", "servizi", "galleria", "contatti", "privacy"];

function url(lingua, chiave) {
  const s = testi[lingua.codice].pagine[chiave].percorso;
  let p = "/";
  if (lingua.cartella) p += lingua.cartella + "/";
  if (s) p += s + "/";
  return p;
}

const telLink = () => `tel:${C.contatti.telefono.replace(/\s+/g, "")}`;
const waLink = (msg) => `https://wa.me/${C.contatti.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
const mailLink = (oggetto, corpo) => {
  const q = [];
  if (oggetto) q.push("subject=" + encodeURIComponent(oggetto));
  if (corpo) q.push("body=" + encodeURIComponent(corpo));
  return `mailto:${C.contatti.email}${q.length ? "?" + q.join("&") : ""}`;
};
const linkEsterno = (href, contenuto, t, classe = "") =>
  `<a href="${esc(href)}"${classe ? ` class="${classe}"` : ""} target="_blank" rel="noopener">${contenuto}<span class="sr">${esc(t.ui.linkEsterno)}</span></a>`;

/* ---------------------------------------------------------------
   PEZZI RIUTILIZZATI
   --------------------------------------------------------------- */
const GIORNI = ["lun", "mar", "mer", "gio", "ven", "sab", "dom"];
const GIORNI_JS = { lun: 1, mar: 2, mer: 3, gio: 4, ven: 5, sab: 6, dom: 0 };
const GIORNI_SCHEMA = { lun: "Monday", mar: "Tuesday", mer: "Wednesday", gio: "Thursday", ven: "Friday", sab: "Saturday", dom: "Sunday" };

function tabellaOrari(t) {
  const righe = GIORNI.map((g) => {
    const fasce = C.orari[g] || [];
    const testo = fasce.length ? fasce.map((f) => esc(f.replace("-", "–"))).join("<br>") : esc(t.ui.chiuso);
    return `<tr data-giorno="${GIORNI_JS[g]}"><th scope="row">${esc(t.ui.giorni[g])}</th><td>${testo}</td></tr>`;
  }).join("");
  return `<table class="orari"><caption class="sr">${esc(t.ui.orari)}</caption><tbody>${righe}</tbody></table>`;
}

/* Pulsanti Chiama / WhatsApp / Email (+ link esterno) */
function azioniContatto(t, { messaggio = "", oggetto = "", linkEst = "" } = {}) {
  const P = C.prenotazione;
  const out = [];
  if (P.telefono) out.push(`<a class="pulsante" href="${esc(telLink())}">${icona("telefono")}${esc(t.ui.chiama)}</a>`);
  if (P.whatsapp && C.contatti.whatsapp) out.push(linkEsterno(waLink(messaggio), `${icona("whatsapp")}${esc(t.ui.whatsapp)}`, t, "pulsante pulsante--wa"));
  if (P.email) out.push(`<a class="pulsante pulsante--chiaro" href="${esc(mailLink(oggetto))}">${icona("email")}${esc(t.ui.email)}</a>`);
  if (linkEst) out.push(linkEsterno(linkEst, `${esc(t.ui.prenota)}${icona("freccia")}`, t, "pulsante pulsante--chiaro"));
  return `<div class="azioni">${out.join("")}</div>`;
}

function social(t, classe = "social") {
  const nomi = { instagram: "Instagram", facebook: "Facebook", tripadvisor: "Tripadvisor", google: "Google", booking: "Booking.com" };
  const voci = Object.entries(C.social || {}).filter(([, v]) => v);
  if (!voci.length) return "";
  return `<ul class="${classe}">` + voci.map(([k, v]) =>
    `<li><a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${esc(nomi[k] || k)} ${esc(t.ui.linkEsterno)}">${icona(ICONE[k] ? k : "globo")}</a></li>`).join("") + `</ul>`;
}

function intestazionePagina(etichetta, titolo, intro, extra = "") {
  return `<header class="testa-pagina"><div class="contenitore stretto">`
    + (etichetta ? `<p class="etichetta">${etichetta}</p>` : "")
    + `<h1 class="titolo-pagina">${titoloAnimato(titolo)}</h1>` + (intro ? `<p class="intro intro--entra">${intro}</p>` : "")
    + `</div>${extra ? `<div class="contenitore">${extra}</div>` : ""}<div class="testa-pagina__creste" aria-hidden="true" data-p="0.1">${profiloCreste("testa")}</div></header>`;
}

function datiStrutturati() {
  const s = {
    "@context": "https://schema.org",
    "@type": A.tipoSchema || "LocalBusiness",
    name: A.nome,
    url: sitoUrl + "/",
    image: [C.immagini.anteprimaSocial, C.immagini.hero].filter(esiste).map((f) => assoluto("/assets/img/" + f)),
    telephone: C.contatti.telefono,
    email: C.contatti.email,
    address: { "@type": "PostalAddress", streetAddress: I.via, postalCode: I.cap, addressLocality: I.citta, addressRegion: I.provincia, addressCountry: I.nazione },
    geo: { "@type": "GeoCoordinates", latitude: I.latitudine, longitude: I.longitudine },
    openingHoursSpecification: GIORNI.flatMap((g) => (C.orari[g] || []).map((f) => {
      const [apre, chiude] = f.split("-");
      return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${GIORNI_SCHEMA[g]}`, opens: apre.trim(), closes: chiude.trim() };
    })),
  };
  if (A.fasciaPrezzo) s.priceRange = A.fasciaPrezzo;
  if (A.cucina) s.servesCuisine = A.cucina.split(",").map((x) => x.trim());
  if (A.partitaIva) s.vatID = A.partitaIva;
  const same = Object.values(C.social || {}).filter(Boolean);
  if (same.length) s.sameAs = same;
  if (C.sezioni.menu && ["Restaurant", "CafeOrCoffeeShop", "BarOrPub", "FoodEstablishment"].includes(s["@type"])) {
    s.hasMenu = assoluto(url(PRINCIPALE, "servizi") + "#menu");
    s.acceptsReservations = true;
  }
  return `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`;
}

/* ---------------------------------------------------------------
   STRUTTURA COMUNE DI OGNI PAGINA (testa, menu, piede)
   --------------------------------------------------------------- */
/* Profilo di montagne decorativo (testate delle pagine e footer) */
function profiloCreste(seme) {
  const r = DISEGNI.casuale("profilo-" + seme);
  const w = 1600, h = 160;
  const a = DISEGNI.percorso(DISEGNI.cresta(r, w, h * 0.75, h * 0.6, 5), w, h);
  const b = DISEGNI.percorso(DISEGNI.cresta(r, w, h * 0.95, h * 0.45, 7), w, h);
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" focusable="false"><path d="${a}" class="cresta-lontana"/><path d="${b}" class="cresta-vicina"/></svg>`;
}

function css_tema() {
  const c = TEMA.colori;
  const font = TEMA.fileCaratteri.map((f) =>
    `@font-face{font-family:'${f.nome}';src:url('/assets/font/${f.file}') format('woff2');font-weight:${f.peso || "400"};font-style:normal;font-display:swap}`).join("");
  return font + `:root{color-scheme:${STILE.schema};--primario:${c.primario};--su-primario:${c.suPrimario || "#ffffff"};--primario-scuro:${c.primarioScuro};--su-scuro:${c.suScuro || "#f5f2ec"};--accento:${c.accento};--accento-su-scuro:${c.accentoSuScuro || c.accento};--sfondo:${c.sfondo};--sfondo-alt:${c.sfondoAlt};--superficie:${c.superficie || c.sfondo};--testo:${c.testo};--testo-soft:${c.testoSoft};--bordo:${c.bordo};--font-titoli:${TEMA.titoli};--font-testo:${TEMA.testo};--raggio:${TEMA.raggio};--peso-titoli:${STILE.pesoTitoli || 600}}`;
}

function pagina(lingua, chiave, corpo, { noindex = false, schema = false, file = null } = {}) {
  const t = testi[lingua.codice];
  const p = t.pagine[chiave];
  const nome = A.nome;
  const titolo = chiave === "home" ? togliHtml(p.titolo) : `${togliHtml(p.titolo)} | ${nome}`;
  const indicizzata = PAGINE_INDICIZZATE.includes(chiave) && !noindex;
  const qui = chiave === "errore" ? null : url(lingua, chiave);
  const og = C.immagini.anteprimaSocial;
  const dOg = dimensioni(og);

  const alternate = indicizzata
    ? C.lingue.map((l) => `<link rel="alternate" hreflang="${l.codice}" href="${assoluto(url(l, chiave))}">`).join("\n")
      + `\n<link rel="alternate" hreflang="x-default" href="${assoluto(url(PRINCIPALE, chiave))}">`
    : "";

  const precarica = TEMA.fileCaratteri.map((f) =>
    `<link rel="preload" href="/assets/font/${f.file}" as="font" type="font/woff2" crossorigin>`).join("\n");

  const head = `<!doctype html>
<html lang="${lingua.codice}" data-stile="${nomeStile}" data-3d="${EFFETTI.profondita3d ? "si" : "no"}" data-animazioni="${EFFETTI.animazioni ? "si" : "no"}">
<head>
<meta charset="utf-8">
<script>(function(d){d.classList.add("js");setTimeout(function(){if(!d.hasAttribute("data-pronto"))d.classList.add("mostra-tutto")},3000)})(document.documentElement)</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titolo)}</title>
<meta name="description" content="${esc(togliHtml(p.descrizione))}">
${(C.demo || !indicizzata) ? '<meta name="robots" content="noindex, follow">' : ""}
${qui ? `<link rel="canonical" href="${assoluto(qui)}">` : ""}
${alternate}
<meta name="theme-color" content="${esc(TEMA.colori.sfondo)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(nome)}">
<meta property="og:title" content="${esc(titolo)}">
<meta property="og:description" content="${esc(togliHtml(p.descrizione))}">
${qui ? `<meta property="og:url" content="${assoluto(qui)}">` : ""}
<meta property="og:image" content="${assoluto("/assets/img/" + og)}">
${dOg ? `<meta property="og:image:width" content="${dOg.w}">\n<meta property="og:image:height" content="${dOg.h}">` : ""}
<meta property="og:image:alt" content="${esc(nome)}">
<meta property="og:locale" content="${lingua.locale}">
${C.lingue.filter((l) => l !== lingua).map((l) => `<meta property="og:locale:alternate" content="${l.locale}">`).join("\n")}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${precarica}
<link rel="stylesheet" href="/assets/css/stile.css?v=${VERSIONE}">
<style>${css_tema()}</style>
<script src="/assets/js/sito.js?v=${VERSIONE}" defer></script>
${schema ? datiStrutturati() : ""}
</head>`.replace(/\n{2,}/g, "\n");

  // Menu di navigazione
  const voci = PAGINE_MENU.map((k) => {
    const attuale = k === chiave ? ` aria-current="page"` : "";
    return `<li><a href="${url(lingua, k)}"${attuale}>${esc(t.pagine[k].menu)}</a></li>`;
  }).join("");
  const selettore = C.lingue.length > 1
    ? `<ul class="lingue" aria-label="${esc(t.ui.lingua)}">` + C.lingue.map((l) => {
        const dest = chiave === "errore" ? url(l, "home") : url(l, chiave);
        const attuale = l === lingua ? ` aria-current="true"` : "";
        return `<li><a href="${dest}" hreflang="${l.codice}" lang="${l.codice}"${attuale}><abbr title="${esc(l.nome)}">${l.codice.toUpperCase()}</abbr></a></li>`;
      }).join("") + `</ul>`
    : "";
  if (C.immagini.logo && !esiste(C.immagini.logo)) avvisi.push(`Logo non trovato: assets/img/${C.immagini.logo} (mostro il nome scritto).`);
  const logo = esiste(C.immagini.logo) ? img(C.immagini.logo, nome, { subito: true, classe: "logo__img" }) : esc(nome);

  const testata = `<a class="salta" href="#contenuto">${esc(t.ui.saltaAlContenuto)}</a>
<header class="testata${chiave === "home" ? " testata--sopra" : ""}" data-testata>
${C.demo ? `<div class="demo">${esc(t.ui.demo)}</div>` : ""}
<div class="contenitore testata__riga">
<a class="logo" href="${url(lingua, "home")}">${logo}</a>
<button class="menu-pulsante" type="button" aria-expanded="false" aria-controls="menu-principale" data-apri="${esc(t.ui.menuApri)}" data-chiudi="${esc(t.ui.menuChiudi)}"><span class="sr">${esc(t.ui.menuApri)}</span><span class="hamburger" aria-hidden="true"></span></button>
<nav id="menu-principale" class="nav" aria-label="Menu">
<ul class="nav__lista">${voci}</ul>
${selettore}
<a class="pulsante pulsante--piccolo nav__cta" href="${url(lingua, "contatti")}">${esc(t.ui.contattaci)}</a>
</nav>
</div>
</header>`;

  const anno = new Date().getFullYear();
  const firma = C.firma && C.firma.testo
    ? (C.firma.link ? linkEsterno(C.firma.link, esc(C.firma.testo), t) : esc(C.firma.testo)) : "";
  const piede = `<footer class="piede">
<div class="piede__cresta" aria-hidden="true">${profiloCreste("piede")}</div>
<div class="contenitore">
<div class="piede__cta" data-rivela="su">
<p class="piede__frase">${chiave === "home" ? t.chiSiamo.finaleTitolo : t.home.contattiTitolo}</p>
<a class="pulsante pulsante--grande pulsante--su-scuro" href="${url(lingua, "contatti")}">${esc(t.ui.contattaci)}${icona("freccia")}</a>
</div>
<div class="piede__griglia">
<div class="piede__marchio">
<p class="piede__nome">${esc(nome)}</p>
<p class="piede__motto">${t.home.heroSottotitolo}</p>
${social(t)}
</div>
<div>
<p class="piede__titolo">${esc(t.pagine.contatti.menu)}</p>
<ul class="piede__lista">
<li><a href="${esc(telLink())}">${icona("telefono")}${esc(C.contatti.telefonoVisibile)}</a></li>
${C.contatti.whatsapp ? `<li>${linkEsterno(waLink(""), `${icona("whatsapp")}${esc(t.ui.whatsapp)}`, t)}</li>` : ""}
<li><a href="mailto:${esc(C.contatti.email)}">${icona("email")}${esc(C.contatti.email)}</a></li>
<li class="piede__indirizzo">${icona("posizione")}<span>${esc(I.via)}<br>${esc(I.cap)} ${esc(I.citta)} (${esc(I.provincia)})</span></li>
</ul>
</div>
<div>
<p class="piede__titolo">${esc(t.ui.orari)}</p>
${tabellaOrari(t)}
</div>
<div>
<p class="piede__titolo">${esc(t.ui.scopriDiPiu)}</p>
<ul class="piede__lista">${PAGINE_MENU.map((k) => `<li><a href="${url(lingua, k)}">${esc(t.pagine[k].menu)}</a></li>`).join("")}</ul>
</div>
</div>
<div class="piede__fondo">
<p>© ${anno} ${esc(A.ragioneSociale)}${A.partitaIva ? ` · ${esc(t.ui.partitaIva)} ${esc(A.partitaIva)}` : ""}${A.cin ? ` · ${esc(t.ui.cin)} ${esc(A.cin)}` : ""}</p>
<p><a href="${url(lingua, "privacy")}">${esc(t.pagine.privacy.menu)}</a> · <button type="button" class="link-pulsante" data-cookie-preferenze>${esc(t.ui.preferenzeCookie)}</button></p>
${firma ? `<p class="piede__firma">${firma}</p>` : ""}
</div>
</div>
</footer>
<div class="cookie" id="cookie-banner" role="region" aria-label="Cookie" hidden>
<p class="cookie__testo">${esc(t.cookie.testo)} <a href="${url(lingua, "privacy")}">${esc(t.cookie.info)}</a></p>
<div class="cookie__azioni">
<button type="button" class="pulsante pulsante--chiaro" data-cookie="rifiuta">${esc(t.cookie.rifiuta)}</button>
<button type="button" class="pulsante pulsante--chiaro" data-cookie="accetta">${esc(t.cookie.accetta)}</button>
</div>
<button type="button" class="cookie__x" data-cookie="rifiuta" aria-label="${esc(t.ui.chiudi)}">${icona("chiudi")}</button>
</div>
${C.sezioni.whatsappFisso && C.contatti.whatsapp ? `<a class="wa-fisso" href="${esc(waLink(""))}" target="_blank" rel="noopener" aria-label="${esc(t.ui.whatsappFisso)} ${esc(t.ui.linkEsterno)}">${icona("whatsapp")}</a>` : ""}`;

  const html = `${head}
<body class="pagina-${chiave}">
${testata}
<main id="contenuto">
${corpo}
</main>
${piede}
</body>
</html>
`;
  scriviFile(file || path.join(qui, "index.html"), html);
}

/* ---------------------------------------------------------------
   SEZIONI DI SETTORE
   --------------------------------------------------------------- */
const SEZIONI = {
  menu(t) {
    const m = t.menu;
    const categorie = m.categorie.map((c, i) => `<div class="menu-categoria" data-rivela="su" style="--ritardo:${(i % 2) * 120}ms">
<h3>${c.nome}</h3>
<ul class="menu-lista">${c.piatti.map((p) => `<li class="piatto">
<p class="piatto__riga"><span class="piatto__nome">${p.nome}${p.veg ? ' <span class="piatto__tag">V</span>' : ""}</span><span class="piatto__linea" aria-hidden="true"></span><span class="piatto__prezzo">${esc(p.prezzo)}</span></p>
${p.descrizione ? `<p class="piatto__desc">${p.descrizione}</p>` : ""}
</li>`).join("")}</ul>
</div>`).join("");
    return `<div class="intestazione intestazione--centro" data-rivela="su"><p class="etichetta">${String(1).padStart(2, "0")}</p><h2>${m.titolo}</h2><p>${m.intro}</p></div>
<div class="menu-carta">
<div class="menu-griglia">${categorie}</div>
<p class="nota">${[m.legenda, m.nota].filter(Boolean).join(" · ")}</p>
</div>
<div class="riquadro-azione" data-rivela="prospettiva">
<div><h3>${m.prenotaTitolo}</h3><p>${m.prenotaTesto}</p></div>
${azioniContatto(t, { messaggio: m.messaggioWhatsapp, oggetto: m.oggettoEmail, linkEst: C.prenotazione.linkEsterno })}
</div>`;
  },

  camere(t) {
    const c = t.camere;
    const schede = c.elenco.map((r, i) => {
      const link = C.disponibilitaCamere.linkEsterno
        ? linkEsterno(C.disponibilitaCamere.linkEsterno, `${esc(c.pulsante)}${icona("freccia")}`, t, "pulsante")
        : `<a class="pulsante" href="${esc(mailLink(c.oggettoEmail.replace("{camera}", togliHtml(r.nome)), c.corpoEmail.replace("{camera}", togliHtml(r.nome))))}">${esc(c.pulsante)}${icona("freccia")}</a>`;
      return `<article class="camera${i % 2 ? " camera--inversa" : ""}">
<div class="camera__media" data-rivela="prospettiva"><div class="cornice cornice--3d" data-tilt>${img(r.foto, togliHtml(r.nome), { posto: "camera", scena: ["interno", "camino", "terrazza"][i % 3], classe: "cornice__img" })}</div></div>
<div class="camera__testo" data-rivela="su" style="--ritardo:120ms">
<p class="etichetta">${icona("persone")}${r.ospiti}</p>
<h3 class="titolo-medio">${r.nome}</h3>
<p>${r.descrizione}</p>
<ul class="chip-lista">${(r.dotazioni || []).map((d) => `<li>${icona("check")}${d}</li>`).join("")}</ul>
<div class="camera__piede"><p class="prezzo">${esc(r.prezzo)}</p>${link}</div>
</div>
</article>`;
    }).join("");
    return `<div class="intestazione intestazione--centro" data-rivela="su"><h2>${c.titolo}</h2><p>${c.intro}</p></div>
<div class="camere">${schede}</div>
${c.nota ? `<p class="nota nota--centro">${c.nota}</p>` : ""}`;
  },

  catalogo(t) {
    const c = t.catalogo;
    const categorie = [...new Set(c.prodotti.map((p) => p.categoria).filter(Boolean))];
    const filtri = categorie.length > 1
      ? `<div class="filtri" role="group" aria-label="${esc(c.titolo)}">
<button type="button" class="filtro" data-filtro="*" aria-pressed="true">${esc(c.tutti)}</button>
${categorie.map((k) => `<button type="button" class="filtro" data-filtro="${slug(k)}" aria-pressed="false">${esc(k)}</button>`).join("")}
</div>` : "";
    const schede = c.prodotti.map((p, i) => `<article class="scheda prodotto" data-categoria="${slug(p.categoria || "")}" data-rivela="prospettiva" style="--ritardo:${(i % 3) * 90}ms">
<div class="scheda__tilt" data-tilt>
<div class="cornice">${img(p.foto, togliHtml(p.nome), { posto: "prodotto", scena: i % 2 ? "vino" : "prodotto", classe: "cornice__img" })}</div>
<div class="scheda__corpo">
${p.categoria ? `<p class="scheda__categoria">${esc(p.categoria)}</p>` : ""}
<h3>${p.nome}</h3>
${p.descrizione ? `<p>${p.descrizione}</p>` : ""}
<div class="scheda__piede"><p class="prezzo">${esc(p.prezzo)}</p>
${C.contatti.whatsapp
  ? linkEsterno(waLink(c.messaggioWhatsapp.replace("{prodotto}", togliHtml(p.nome))), `${icona("whatsapp")}${esc(c.pulsante)}`, t, "pulsante pulsante--piccolo pulsante--chiaro")
  : `<a class="pulsante pulsante--piccolo pulsante--chiaro" href="${esc(mailLink(togliHtml(p.nome)))}">${icona("email")}${esc(c.pulsante)}</a>`}
</div>
</div>
</div>
</article>`).join("");
    return `<div class="intestazione intestazione--centro" data-rivela="su"><h2>${c.titolo}</h2><p>${c.intro}</p></div>
${filtri}
<div class="griglia-prodotti" data-catalogo>${schede}</div>
${c.nota ? `<p class="nota nota--centro">${c.nota}</p>` : ""}`;
  },

  listino(t) {
    const l = t.listino;
    return `<div class="intestazione intestazione--centro" data-rivela="su"><h2>${l.titolo}</h2><p>${l.intro}</p></div>
<ul class="listino">${l.voci.map((v, i) => `<li class="listino__voce" data-rivela="su" style="--ritardo:${i * 80}ms">
<span class="listino__numero" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
<div><h3>${v.nome}</h3>${v.descrizione ? `<p>${v.descrizione}</p>` : ""}</div>
<div class="listino__lato">${v.durata ? `<p class="listino__durata">${icona("orologio")}${esc(v.durata)}</p>` : ""}<p class="prezzo">${esc(v.prezzo)}</p></div>
</li>`).join("")}</ul>
${l.nota ? `<p class="nota nota--centro">${l.nota}</p>` : ""}
<div class="riquadro-azione" data-rivela="prospettiva"><div><h3>${t.home.contattiTitolo}</h3><p>${t.home.contattiTesto}</p></div>${azioniContatto(t, { messaggio: "", oggetto: togliHtml(l.titolo) })}</div>`;
  },

  faq(t) {
    const f = t.faq;
    return `<div class="faq-griglia">
<div class="intestazione" data-rivela="su"><h2>${f.titolo}</h2></div>
<div class="faq" data-rivela="su" style="--ritardo:120ms">${f.domande.map((d) => `<details><summary>${d.domanda}</summary><div class="faq__risposta"><p>${d.risposta}</p></div></details>`).join("")}</div>
</div>`;
  },
};
const sezioniAttive = () => (C.ordineSezioni || Object.keys(SEZIONI)).filter((k) => C.sezioni[k] && SEZIONI[k]);

/* Titolo diviso in parole, per l'animazione d'entrata */
const titoloAnimato = (testo) => togliHtml(testo).split(/\s+/).filter(Boolean)
  .map((p, i) => `<span class="parola"><span style="--i:${i}">${esc(p)}</span></span>`).join(" ");

/* ---------------------------------------------------------------
   LE PAGINE
   --------------------------------------------------------------- */
function paginaHome(lingua) {
  const t = testi[lingua.codice], h = t.home;
  const attive = sezioniAttive();

  // Grande immagine: foto vera (con eventuale versione per telefono) oppure montagne disegnate a strati
  let sfondoHero;
  if (esiste(C.immagini.hero)) {
    const fotoHero = img(C.immagini.hero, "", { subito: true, classe: "hero__img" });
    sfondoHero = `<div class="strato strato--foto" data-p="0.35" data-m="10">`
      + (esiste(C.immagini.heroTelefono) ? `<picture><source media="(max-width: 700px)" srcset="/assets/img/${esc(C.immagini.heroTelefono)}">${fotoHero}</picture>` : fotoHero)
      + `</div>`;
  } else {
    const nota = `${C.immagini.hero || "hero.jpg"}  →  2000 × 1250 px (facoltativa: ora ci sono le montagne disegnate a strati)`;
    if (!segnapostoUsati.includes(nota)) segnapostoUsati.unshift(nota);
    sfondoHero = DISEGNI.stratiPaesaggio(STILE.scena, 1600, 1000, "hero-" + A.nome, "h")
      .map((s, i) => `<svg class="strato strato--${i}" data-p="${s.p}" data-m="${s.m}" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">${s.html}</svg>`).join("");
  }
  const video = C.immagini.heroVideo && fs.existsSync(path.join(RADICE, "assets", "video", C.immagini.heroVideo))
    ? ` data-video="/assets/video/${esc(C.immagini.heroVideo)}"` : "";
  if (C.immagini.heroVideo && !video) avvisi.push(`Video non trovato: assets/video/${C.immagini.heroVideo}`);
  const primaSezione = attive[0] ? `${url(lingua, "servizi")}#${attive[0]}` : url(lingua, "servizi");

  const punti = h.puntiForza.map((p, i) => `<li class="punto" data-rivela="prospettiva" style="--ritardo:${i * 110}ms">
<span class="punto__numero" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
<div class="punto__corpo">${icona(p.icona, "icona punto__icona")}<h3>${p.titolo}</h3><p>${p.testo}</p></div>
</li>`).join("");

  const sceneOfferta = ["tavola", "interno", "vino"];
  const offerta = h.anteprima.map((a, i) => {
    const href = url(lingua, "servizi") + (a.ancora && attive.includes(a.ancora) ? `#${a.ancora}` : "");
    return `<article class="offerta__riga${i % 2 ? " offerta__riga--inversa" : ""}">
<div class="offerta__media" data-rivela="prospettiva">
<a class="cornice cornice--3d" href="${href}" tabindex="-1" aria-hidden="true" data-tilt>${img(a.foto, "", { posto: "offerta", scena: sceneOfferta[i % 3], classe: "cornice__img" })}</a>
<span class="offerta__numero" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
</div>
<div class="offerta__testo" data-rivela="su" style="--ritardo:150ms">
<p class="etichetta">${String(i + 1).padStart(2, "0")} / ${String(h.anteprima.length).padStart(2, "0")}</p>
<h3 class="titolo-grande">${a.titolo}</h3>
<p class="intro">${a.testo}</p>
<a class="link-freccia" href="${href}">${esc(t.ui.scopriDiPiu)}<span class="sr">: ${esc(togliHtml(a.titolo))}</span>${icona("freccia")}</a>
</div>
</article>`;
  }).join("");

  const recensioni = C.sezioni.recensioni && h.recensioni?.length ? `<section class="sezione sezione--alt recensioni-sezione" aria-labelledby="t-recensioni">
<div class="contenitore">
<div class="recensioni-testa" data-rivela="su">
<h2 id="t-recensioni">${h.recensioniTitolo}</h2>
<div class="carosello__controlli">
<button type="button" class="tondo" data-car="prec" aria-label="${esc(t.ui.recPrecedente)}">${icona("sinistra")}</button>
<button type="button" class="tondo" data-car="pausa" aria-pressed="false" aria-label="${esc(t.ui.pausa)}" data-pausa="${esc(t.ui.pausa)}" data-riproduci="${esc(t.ui.riproduci)}"><span class="icona-pausa" aria-hidden="true"></span></button>
<button type="button" class="tondo" data-car="succ" aria-label="${esc(t.ui.recSuccessiva)}">${icona("destra")}</button>
</div>
</div>
<div class="carosello" data-carosello>
<ul class="carosello__binario" tabindex="0" aria-label="${esc(t.ui.recensioni)}">${h.recensioni.map((r, i) => `<li class="recensione" data-tilt="lieve" aria-label="${i + 1} / ${h.recensioni.length}">
<span class="recensione__virgolette" aria-hidden="true">“</span>
<blockquote><p>${r.testo}</p></blockquote>
<div class="recensione__piede">
<p class="stelle" role="img" aria-label="${esc(t.ui.stelle.replace("{n}", r.stelle))}">${Array.from({ length: 5 }, (_, k) => icona("stella", k < r.stelle ? "stella piena" : "stella")).join("")}</p>
<p class="recensione__autore"><strong>${r.autore}</strong>${r.provenienza ? ` · ${r.provenienza}` : ""}${r.fonte ? `<br><span>${r.fonte}</span>` : ""}</p>
</div>
</li>`).join("")}</ul>
<div class="carosello__punti" aria-hidden="true">${h.recensioni.map((_, i) => `<span${i === 0 ? ' class="attivo"' : ""}></span>`).join("")}</div>
</div>
</div>
</section>` : "";

  const sfondoContatti = C.immagini.sfondoContatti
    ? `<div class="contatti-hero__sfondo" data-p="0.15">${img(C.immagini.sfondoContatti, "", { posto: "sfondoContatti", classe: "contatti-hero__img", senzaEtichetta: true })}</div>${etichettaFoto(C.immagini.sfondoContatti, "sfondoContatti", "segnaposto--angolo")}` : "";

  const corpo = `<section class="hero"${video} data-hero>
<div class="hero__strati">${sfondoHero}</div>
<div class="hero__velo"></div>
<div class="contenitore hero__testo" data-p="-0.12">
<p class="etichetta etichetta--hero"><span class="hero__linea" aria-hidden="true"></span>${h.heroEtichetta}</p>
<h1 class="hero__titolo">${titoloAnimato(h.heroTitolo)}</h1>
<p class="hero__sottotitolo">${h.heroSottotitolo}</p>
<div class="azioni hero__azioni">
<a class="pulsante pulsante--grande pulsante--hero" href="${url(lingua, "contatti")}">${h.pulsantePrincipale}${icona("freccia")}</a>
<a class="pulsante pulsante--grande pulsante--trasparente" href="${primaSezione}">${h.pulsanteSecondario}</a>
</div>
</div>
<a class="hero__scorri" href="#scopri"><span class="hero__scorri-testo">${esc(t.ui.scorri)}</span><span class="hero__scorri-linea" aria-hidden="true"></span></a>
${video ? `<button type="button" class="hero__video-pulsante tondo" hidden aria-pressed="false" aria-label="${esc(t.ui.pausa)}" data-pausa="${esc(t.ui.pausa)}" data-riproduci="${esc(t.ui.riproduci)}"><span class="icona-pausa" aria-hidden="true"></span></button>` : ""}
</section>
<section class="sezione punti-sezione" id="scopri" aria-labelledby="t-punti">
<div class="contenitore punti-griglia">
<div class="punti-testa" data-rivela="su">
<p class="etichetta">${esc(A.nome)}</p>
<h2 id="t-punti" class="titolo-grande">${h.puntiForzaTitolo}</h2>
${h.puntiForzaIntro ? `<p class="intro">${h.puntiForzaIntro}</p>` : ""}
</div>
<ol class="punti">${punti}</ol>
</div>
</section>
<section class="sezione offerta" aria-labelledby="t-offerta">
<div class="contenitore">
<div class="intestazione intestazione--centro" data-rivela="su"><h2 id="t-offerta" class="titolo-grande">${h.anteprimaTitolo}</h2><p class="intro">${h.anteprimaIntro}</p></div>
${offerta}
</div>
</section>
${recensioni}
<section class="contatti-hero" aria-labelledby="t-contatti">
${sfondoContatti}
<div class="contatti-hero__velo"></div>
<div class="contenitore contatti-hero__griglia">
<div class="contatti-hero__testo" data-rivela="su">
<h2 id="t-contatti" class="titolo-grande">${h.contattiTitolo}</h2>
<p class="intro">${h.contattiTesto}</p>
${azioniContatto(t, { messaggio: t.menu?.messaggioWhatsapp || "" })}
</div>
<div class="vetro" data-rivela="prospettiva" style="--ritardo:150ms">
<p class="info-riga">${icona("posizione")}<span><strong>${esc(t.ui.indirizzo)}</strong><br>${esc(indirizzoCompleto)}</span></p>
<div class="info-riga">${icona("orologio")}<div><strong>${esc(t.ui.orari)}</strong>${tabellaOrari(t)}</div></div>
</div>
</div>
</section>`;
  pagina(lingua, "home", corpo, { schema: true });
}

function paginaChiSiamo(lingua) {
  const t = testi[lingua.codice], c = t.chiSiamo;
  const primo = c.numeri && c.numeri[0];
  const corpo = `<section class="sezione chi-testa">
<div class="contenitore due-colonne">
<div class="chi-testa__testo">
<p class="etichetta">${c.etichetta}</p>
<h1 class="titolo-pagina">${titoloAnimato(c.titolo)}</h1>
<p class="intro" data-rivela="su">${c.intro}</p>
</div>
<div class="collage" data-rivela="prospettiva">
<div class="cornice cornice--3d collage__principale" data-tilt>${img(C.immagini.chiSiamo, togliHtml(c.titolo), { posto: "chiSiamo", subito: true, classe: "cornice__img" })}</div>
${C.immagini.chiSiamo2 ? `<div class="cornice collage__secondaria" data-p="-0.08">${img(C.immagini.chiSiamo2, "", { posto: "chiSiamo2", classe: "cornice__img" })}</div>` : ""}
${primo ? `<p class="collage__bollo" aria-hidden="true"><span>${primo.valore}</span>${primo.etichetta}</p>` : ""}
</div>
</div>
</section>
<section class="sezione sezione--alt">
<div class="contenitore stretto testo-lungo racconto">
${c.paragrafi.map((p, i) => `<p data-rivela="su" style="--ritardo:${i * 80}ms">${p}</p>`).join("\n")}
</div>
<figure class="contenitore citazione" data-rivela="prospettiva"><blockquote><p>“${c.citazione.testo}”</p></blockquote><figcaption>— ${c.citazione.autore}</figcaption></figure>
</section>
<section class="sezione">
<div class="contenitore">
<ul class="numeri">${c.numeri.map((n, i) => `<li data-rivela="prospettiva" style="--ritardo:${i * 100}ms"><span class="numeri__valore">${n.valore}</span><span class="numeri__etichetta">${n.etichetta}</span></li>`).join("")}</ul>
<div class="riquadro-azione" data-rivela="prospettiva">
<div><h2>${c.finaleTitolo}</h2><p>${c.finaleTesto}</p></div>
<div class="azioni"><a class="pulsante" href="${url(lingua, "contatti")}">${esc(t.ui.contattaci)}${icona("freccia")}</a></div>
</div>
</div>
</section>`;
  pagina(lingua, "chiSiamo", corpo);
}

function paginaServizi(lingua) {
  const t = testi[lingua.codice], s = t.servizi;
  const attive = sezioniAttive();
  const indice = attive.length > 1
    ? `<nav class="indice" aria-label="${esc(togliHtml(s.titolo))}"><ul>${attive.map((k, i) => `<li><a href="#${k}"><span aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${t[k].titolo}</a></li>`).join("")}</ul></nav>` : "";
  const sezioni = attive.map((k, i) =>
    `<section id="${k}" class="sezione sezione--ancora sezione--${k}${i % 2 === 1 ? " sezione--alt" : ""}"><div class="contenitore">${SEZIONI[k](t)}</div></section>`).join("\n");
  const corpo = intestazionePagina(s.etichetta, s.titolo, s.intro, indice) + sezioni;
  pagina(lingua, "servizi", corpo);
}

/* Griglia della galleria: grande, verticale, orizzontale, normale (si ripete ogni 9 foto) */
const SCHEMA_GALLERIA = ["g-grande", "g-alta", "g-normale", "g-normale", "g-normale", "g-larga", "g-alta", "g-larga", "g-normale"];
// 9 disegni diversi, scelti perché due caselle vicine non siano mai dello stesso tipo
const SCENE_GALLERIA = ["paesaggio", "piste", "vino", "camino", "tavola", "terrazza", "interno", "paesaggio", "prodotto"];

function paginaGalleria(lingua) {
  const t = testi[lingua.codice], g = t.galleria;
  const voci = C.galleria.map((f, i) => {
    const alt = (g.descrizioni && g.descrizioni[i]) || "";
    const posto = SCHEMA_GALLERIA[i % 9];
    const ff = foto(f, posto, SCENE_GALLERIA[i % 9]);
    return `<li class="galleria__cella ${posto}" data-rivela="scala" style="--ritardo:${(i % 3) * 80}ms"><a class="galleria__voce" data-tilt="lieve" href="${esc(ff.src)}" data-indice="${i}" data-didascalia="${esc(alt)}" aria-label="${esc(t.ui.ingrandisci)}: ${esc(alt)}">${img(f, alt, { posto, scena: SCENE_GALLERIA[i % 9], subito: i === 0 })}<span class="galleria__didascalia" aria-hidden="true">${esc(alt)}</span></a></li>`;
  }).join("");
  const corpo = intestazionePagina(g.etichetta, g.titolo, g.intro) + `<section class="sezione sezione--compatta">
<div class="contenitore contenitore--largo">
<ul class="galleria">${voci}</ul>
</div>
</section>
<dialog class="lightbox" aria-label="${esc(g.titolo)}">
<figure class="lightbox__figura"><img class="lightbox__img" src="data:," alt=""><figcaption class="lightbox__didascalia"></figcaption></figure>
<p class="lightbox__contatore" aria-live="polite"></p>
<button type="button" class="lightbox__btn lightbox__chiudi" aria-label="${esc(t.ui.chiudi)}">${icona("chiudi")}</button>
<button type="button" class="lightbox__btn lightbox__prec" aria-label="${esc(t.ui.precedente)}">${icona("sinistra")}</button>
<button type="button" class="lightbox__btn lightbox__succ" aria-label="${esc(t.ui.successiva)}">${icona("destra")}</button>
</dialog>`;
  pagina(lingua, "galleria", corpo);
}

function paginaContatti(lingua) {
  const t = testi[lingua.codice], c = t.contatti, f = t.form;
  const linkPrivacy = `<a href="${url(lingua, "privacy")}" target="_blank">${esc(f.privacyLink)}</a>`;
  const mappaUrl = `https://maps.google.com/maps?q=${encodeURIComponent(I.ricercaMappa || indirizzoCompleto)}&z=15&output=embed`;
  const mappsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(I.ricercaMappa || indirizzoCompleto)}`;
  const corpo = intestazionePagina(c.etichetta, c.titolo, c.intro) + `<section class="sezione sezione--compatta">
<div class="contenitore contatti-griglia">
<div class="riquadro">
<h2>${f.titolo}</h2>
<form class="form" name="contatti" method="POST" action="${url(lingua, "grazie")}" data-netlify="true" netlify-honeypot="bot-field">
<input type="hidden" name="form-name" value="contatti">
<input type="hidden" name="lingua" value="${lingua.codice}">
<p class="nascosto" aria-hidden="true"><label>Non compilare questo campo <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
<p class="nota">${esc(f.obbligatori)}</p>
<div class="campo"><label for="f-nome">${esc(f.nome)} *</label><input id="f-nome" name="nome" type="text" autocomplete="name" required maxlength="120"></div>
<div class="campo-doppio">
<div class="campo"><label for="f-email">${esc(f.email)} *</label><input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
<div class="campo"><label for="f-tel">${esc(f.telefono)} <span class="facoltativo">(${esc(f.facoltativo)})</span></label><input id="f-tel" name="telefono" type="tel" autocomplete="tel" maxlength="40"></div>
</div>
<div class="campo"><label for="f-motivo">${esc(f.motivo)}</label><select id="f-motivo" name="motivo">${f.motivi.map((m) => `<option>${esc(m)}</option>`).join("")}</select></div>
<div class="campo"><label for="f-msg">${esc(f.messaggio)} *</label><textarea id="f-msg" name="messaggio" rows="6" required maxlength="4000"></textarea></div>
<div class="campo campo--check"><input id="f-privacy" name="privacy" type="checkbox" value="si" required><label for="f-privacy">${esc(f.privacy).replace("{linkPrivacy}", linkPrivacy)} *</label></div>
<button class="pulsante pulsante--grande" type="submit">${esc(f.invia)}${icona("freccia")}</button>
</form>
</div>
<div class="riquadro riquadro--info">
<h2>${c.infoTitolo}</h2>
${azioniContatto(t, { messaggio: "" })}
<p class="info-riga">${icona("posizione")}<span><strong>${esc(t.ui.indirizzo)}</strong><br>${esc(indirizzoCompleto)}<br>${linkEsterno(mappsLink, esc(t.ui.indicazioni), t)}</span></p>
<p class="info-riga">${icona("telefono")}<span><a href="${esc(telLink())}">${esc(C.contatti.telefonoVisibile)}</a></span></p>
<p class="info-riga">${icona("email")}<span><a href="mailto:${esc(C.contatti.email)}">${esc(C.contatti.email)}</a></span></p>
<div class="info-riga">${icona("orologio")}<div><strong>${esc(t.ui.orari)}</strong>${tabellaOrari(t)}</div></div>
${social(t)}
</div>
</div>
</section>
<section class="sezione sezione--alt" aria-labelledby="t-mappa">
<div class="contenitore">
<div class="intestazione"><h2 id="t-mappa">${c.mappaTitolo}</h2></div>
<div class="mappa" data-mappa="${esc(mappaUrl)}" data-titolo="${esc(t.mappa.titolo)}">
<div class="mappa__segnaposto">
${icona("posizione", "icona mappa__icona")}
<p>${esc(t.mappa.testo)}</p>
<button type="button" class="pulsante" data-mappa-carica>${esc(t.mappa.pulsante)}</button>
${linkEsterno(mappsLink, esc(t.mappa.apriInMaps), t, "link-semplice")}
</div>
</div>
</div>
</section>`;
  pagina(lingua, "contatti", corpo, { schema: true });
}

function paginaPrivacy(lingua) {
  const t = testi[lingua.codice], p = t.privacy;
  const corpo = intestazionePagina("", p.titolo, esc(p.aggiornamento)) + `<section class="sezione sezione--compatta">
<div class="contenitore stretto testo-lungo">
${p.sezioni.map((s) => `<h2>${s.titolo}</h2>\n<p>${s.testo}</p>`).join("\n")}
<p><button type="button" class="pulsante pulsante--chiaro" data-cookie-preferenze>${esc(t.ui.preferenzeCookie)}</button></p>
</div>
</section>`;
  pagina(lingua, "privacy", corpo);
}

function paginaMessaggio(lingua, chiave, dati, file) {
  const t = testi[lingua.codice];
  const corpo = `<section class="sezione messaggio">
<div class="contenitore stretto">
${icona(chiave === "grazie" ? "check" : "montagna", "icona messaggio__icona")}
<h1>${dati.titolo}</h1>
<p class="intro">${dati.testo}</p>
<div class="azioni azioni--centro">
<a class="pulsante" href="${url(lingua, "home")}">${esc(dati.torna)}</a>
${chiave === "errore" ? `<a class="pulsante pulsante--chiaro" href="${url(lingua, "contatti")}">${esc(t.pagine.contatti.menu)}</a>` : ""}
</div>
</div>
</section>`;
  pagina(lingua, chiave, corpo, { noindex: true, file });
}

/* ---------------------------------------------------------------
   FILE PER GOOGLE E NETLIFY
   --------------------------------------------------------------- */
function fileTecnici() {
  const oggi = new Date().toISOString().slice(0, 10);
  const urls = PAGINE_INDICIZZATE.map((k) => C.lingue.map((l) => `<url>
<loc>${assoluto(url(l, k))}</loc>
<lastmod>${oggi}</lastmod>
${C.lingue.map((x) => `<xhtml:link rel="alternate" hreflang="${x.codice}" href="${assoluto(url(x, k))}"/>`).join("\n")}
<xhtml:link rel="alternate" hreflang="x-default" href="${assoluto(url(PRINCIPALE, k))}"/>
</url>`).join("\n")).join("\n");
  scriviFile("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
  scriviFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${assoluto("/sitemap.xml")}\n`);

  // Pagina 404 nella lingua giusta per ogni cartella
  const redirects = C.lingue.filter((l) => l.cartella).map((l) => `/${l.cartella}/*  /${l.cartella}/404.html  404`).join("\n");
  scriviFile("_redirects", `# Generato da build.js\n${redirects}\n`);

  scriviFile("_headers", `# Generato da build.js
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
${C.demo ? "  X-Robots-Tag: noindex\n" : ""}
/assets/font/*
  Cache-Control: public, max-age=31536000, immutable
/assets/css/*
  Cache-Control: public, max-age=31536000, immutable
/assets/js/*
  Cache-Control: public, max-age=31536000, immutable
`);

  const c = TEMA.colori;
  const iniziale = esc(Array.from(A.nome.trim())[0] || "•");
  scriviFile("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${c.primarioScuro}"/><text x="32" y="45" font-family="Georgia, serif" font-size="38" text-anchor="middle" fill="${c.accentoSuScuro || c.accento}">${iniziale}</text></svg>`);
}

/* ---------------------------------------------------------------
   AVVIO
   --------------------------------------------------------------- */
fs.rmSync(USCITA, { recursive: true, force: true });
fs.mkdirSync(USCITA, { recursive: true });
fs.cpSync(path.join(RADICE, "assets"), path.join(USCITA, "assets"), { recursive: true });

for (const lingua of C.lingue) {
  const t = testi[lingua.codice];
  paginaHome(lingua);
  paginaChiSiamo(lingua);
  paginaServizi(lingua);
  paginaGalleria(lingua);
  paginaContatti(lingua);
  paginaPrivacy(lingua);
  paginaMessaggio(lingua, "grazie", t.grazie);
  paginaMessaggio(lingua, "errore", t.errore, path.join(lingua.cartella || "", "404.html"));
}
fileTecnici();

const nPagine = C.lingue.length * 8;
console.log(`\n✔ Sito "${A.nome}" generato in dist/: ${nPagine} pagine in ${C.lingue.length} lingue (${C.lingue.map((l) => l.codice).join(", ")}).`);
console.log(`  Stile: ${nomeStile}  ·  3D: ${EFFETTI.profondita3d ? "acceso" : "spento"}  ·  animazioni: ${EFFETTI.animazioni ? "accese" : "spente"}`);
console.log(`  Sezioni attive: ${sezioniAttive().join(", ") || "nessuna"}${C.demo ? "  ·  MODALITÀ DEMO (non indicizzato)" : ""}`);
if (segnapostoUsati.length) {
  console.log(`\n▢ ${segnapostoUsati.length} foto ancora da caricare in assets/img/ (ora c'è un disegno segnaposto):`);
  for (const f of segnapostoUsati) console.log("  - " + f);
}
if (avvisi.length) {
  console.log(`\n⚠ ${avvisi.length} avvisi da controllare:`);
  for (const a of [...new Set(avvisi)]) console.log("  - " + a);
}

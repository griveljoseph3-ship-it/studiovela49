/* =====================================================================
   MOTORE DEL SITO StudioVela49  —  di solito non serve modificarlo
   =====================================================================
   Legge dati-cliente.js e i testi in lingue/ (it.js, en.js, fr.js)
   e crea in dist/ tutte le pagine HTML in tutte le lingue, più
   sitemap.xml, robots.txt, _redirects (Netlify), .htaccess (Aruba)
   e i rimandi dai vecchi indirizzi .php.
   Solo Node.js (20 o più), nessuna libreria.

   Variabili facoltative (le usa netlify.toml):
     PERCORSO_BASE=""   sito nella cartella principale del dominio
     SITO_URL="https://www.studiovela49.it"
     ANTEPRIMA=false    toglie il "noindex" (solo quando è il sito vero)
   ===================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");

const RADICE = __dirname;
const USCITA = path.join(RADICE, "dist");
const C = require("./dati-cliente.js");
const LOGO = require("./motore/logo-tracciati.json");
const FOTO = JSON.parse(fs.readFileSync(path.join(RADICE, "assets/img/foto/indice.json"), "utf8"));
const VERSIONE = Date.now().toString(36);
const avvisi = [];

const env = process.env;
const BASE = (env.PERCORSO_BASE ?? C.percorsoBase ?? "").replace(/\/+$/, "");
const SITO = (env.SITO_URL || C.sitoUrl).replace(/\/+$/, "");
const ANTEPRIMA = env.ANTEPRIMA ? env.ANTEPRIMA !== "false" : C.anteprima !== false;

/* ---------- strumenti ---------- */
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const testo = (s) => String(s ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const senzaDC = (s) => testo(s).replace(/\s*\[DA CONFERMARE[^\]]*\]\s*/g, " ").trim();
// Il segnaposto [DA CONFERMARE] diventa un'etichetta ben visibile
const fmt = (s) => String(s ?? "").replace(/\[DA CONFERMARE([^\]]*)\]/g, '<mark class="dc">[DA CONFERMARE$1]</mark>');
const asset = (p) => `${BASE}/assets/${p}?v=${VERSIONE}`;
const assetFisso = (p) => `${BASE}/assets/${p}`;
const assoluto = (p) => SITO + p;
const pad = (n) => String(n).padStart(2, "0");

function scrivi(rel, contenuto) {
  const dest = path.join(USCITA, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, contenuto);
}

/* ---------- testi ---------- */
const PRINCIPALE = C.lingue[0];
const T = {};
for (const l of C.lingue) T[l.codice] = require(`./lingue/${l.codice}.js`);

// Indirizzo di una pagina in una lingua
function url(lingua, chiave) {
  const p = T[lingua.codice].pagine[chiave];
  if (!p) throw new Error(`Pagina "${chiave}" mancante in lingue/${lingua.codice}.js`);
  return `${BASE}/${lingua.cartella ? lingua.cartella + "/" : ""}${p.percorso}`;
}

const SERVIZI = ["ape", "diagnosi", "solare", "bonus", "condominio", "antincendio", "studi"];
const PRIVATI = ["ape", "diagnosi", "solare", "bonus"];
const PROFESSIONISTI = ["condominio", "antincendio", "studi"];
const INDICIZZATE = ["home", "servizi", ...SERVIZI, "chiSiamo", "contatti", "privacy", "cookie", "crediti"];

/* ---------- icone (poche, a linea) ---------- */
const ICONE = {
  telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.6L3 21l1.9-5.7A8.4 8.4 0 1 1 21 11.5z"/>',
  modulo: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  freccia: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  giu: '<path d="m6 9 6 6 6-6"/>',
  posizione: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  esterno: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
};
const icona = (n, cl = "icona") => `<svg class="${cl}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONE[n]}</svg>`;

/* ---------- logotipo (vettoriale, nessun font da caricare) ---------- */
const COLORI_SEGNO = ["#0B6B3A", "#6DB04B", "#F2C230", "#E2672E"];
const segno = COLORI_SEGNO.map((c, i) => { const y = 3 + i * 7.5, h = 5.5, l = 11 + i * 5; return `<path fill="${c}" d="M0 ${y}h${l}l${h / 2} ${h / 2}-${h / 2} ${h / 2}H0z"/>`; }).join("");
const logo = () => `<svg class="logo__svg" viewBox="0 0 ${40 + LOGO.larghezza} 36" aria-hidden="true" focusable="false">${segno}<g transform="translate(40 0)"><path class="logo__testo" d="${LOGO.studio}"/><path class="logo__testo" d="${LOGO.vela}"/><path class="logo__49" d="${LOGO.n49}"/></g></svg>`;

/* ---------- foto: <picture> AVIF → WebP → JPG ---------- */
function foto(nome, alt, { sizes = "100vw", subito = false, classe = "", rivela = true } = {}) {
  const f = FOTO[nome];
  if (!f) { avvisi.push(`Foto sconosciuta: ${nome}`); return ""; }
  const set = (ext) => f.larghezze.map((w) => `${assetFisso(`img/foto/${nome}-${w}.${ext}`)} ${w}w`).join(", ");
  const media = f.larghezze[Math.min(1, f.larghezze.length - 1)];
  return `<picture class="foto${classe ? " " + classe : ""}"${rivela && !subito ? " data-rivela=\"foto\"" : ""}>`
    + `<source type="image/avif" srcset="${set("avif")}" sizes="${sizes}">`
    + `<source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">`
    + `<img src="${assetFisso(`img/foto/${nome}-${media}.jpg`)}" srcset="${set("jpg")}" sizes="${sizes}" alt="${esc(alt)}" width="${f.w}" height="${f.h}"`
    + (subito ? ` fetchpriority="high"` : ` loading="lazy"`) + ` decoding="async"></picture>`;
}

/* ---------- la scala energetica: il segno grafico del sito ---------- */
const CLASSI = ["A4", "A3", "A2", "A1", "B", "C", "D", "E", "F", "G"];
// Scala completa A4→G (illustrazione APE). evidenzia = classe con la freccia
function scala({ evidenzia = "", etichetta = "", classe = "" } = {}) {
  return `<div class="scala ${classe}" data-rivela="barre"${etichetta ? ` role="img" aria-label="${esc(etichetta)}"` : ' aria-hidden="true"'}>
${CLASSI.map((k, i) => `<div class="scala__riga${k === evidenzia ? " scala__riga--qui" : ""}" style="--i:${i}"><span class="scala__barra c-${k}" style="--l:${34 + i * 7.3}%"><b>${k}</b></span>${k === evidenzia ? '<span class="scala__freccia"></span>' : ""}</div>`).join("")}
</div>`;
}
// Divisore: dieci trattini che si riempiono in sequenza
const divisore = (cl = "") => `<div class="divisore ${cl}" data-rivela="barre" aria-hidden="true">${CLASSI.map((k, i) => `<span class="c-${k}" style="--i:${i}"></span>`).join("")}</div>`;

/* Titolo con le parole che salgono da una maschera */
const titolo = (tag, html, { id = "", classe = "" } = {}) => {
  const parole = fmt(html).split(/(\s+|<br>)/).filter((p) => p.trim() !== "");
  let i = 0;
  const dentro = parole.map((p) => p === "<br>" ? "<br>" : p.startsWith("<mark") || p.includes("<") ? p : `<span class="w"><span style="--i:${i++}">${p}</span></span>`).join(" ");
  return `<${tag}${id ? ` id="${id}"` : ""} class="titolo-entra${classe ? " " + classe : ""}" data-rivela="titolo">${dentro}</${tag}>`;
};
const eti = (s) => s ? `<p class="eti">${fmt(s)}</p>` : "";
const pulsante = (href, s, cl = "") => `<a class="pulsante${cl ? " " + cl : ""}" href="${href}">${fmt(s)}${icona("freccia")}</a>`;
const linkFreccia = (href, s) => `<a class="link-freccia" href="${href}">${fmt(s)}${icona("freccia")}</a>`;

/* ---------- contatti ---------- */
const K = C.contatti;
const telLink = `tel:${K.telefono}`;
const waLink = (t) => `https://wa.me/${K.whatsapp}?text=${encodeURIComponent(t.ui.whatsappMessaggio)}`;
const I = C.indirizzo;
const indirizzo = `${I.via}, ${I.cap} ${I.citta} (${I.provincia})`;
const mappaRicerca = encodeURIComponent(`${I.via}, ${I.cap} ${I.citta}`);

/* ---------- modulo preventivo ---------- */
function modulo(lingua, { servizio = "", id = "modulo", titoloForm = "" } = {}) {
  const t = T[lingua.codice], f = t.form, M = C.modulo;
  const chiave = (M.chiave || "").trim();
  const servizioAttivo = chiave && !chiave.includes("DA CONFERMARE") ? M.servizio : "mailto";
  const grazie = assoluto(url(lingua, "grazie"));
  let azione = `mailto:${K.email}`, extra = "", attr = ` enctype="text/plain"`;
  let trappola = "sito_web";
  if (servizioAttivo === "web3forms") {
    azione = "https://api.web3forms.com/submit"; attr = "";
    extra = `<input type="hidden" name="access_key" value="${esc(chiave)}"><input type="hidden" name="redirect" value="${esc(grazie)}"><input type="hidden" name="subject" value="${esc(f.oggettoEmail)}">`;
    trappola = "botcheck";
  } else if (servizioAttivo === "formspree") {
    azione = `https://formspree.io/f/${esc(chiave)}`; attr = ""; trappola = "_gotcha";
    extra = `<input type="hidden" name="_subject" value="${esc(f.oggettoEmail)}">`;
  } else if (servizioAttivo === "netlify") {
    azione = url(lingua, "grazie"); attr = ` data-netlify="true" netlify-honeypot="${trappola}"`;
    extra = `<input type="hidden" name="form-name" value="preventivo">`;
  }
  const p = `${id}-`;
  const opz = (lista, scelto) => lista.map(([v, l]) => `<option value="${esc(v)}"${v === scelto ? " selected" : ""}>${esc(l)}</option>`).join("");
  const linkPriv = `<a href="${url(lingua, "privacy")}">${esc(f.privacyLink)}</a>`;
  return `<form class="modulo" id="${id}" name="preventivo" method="post" action="${azione}"${attr} data-modulo="${servizioAttivo}" data-grazie="${url(lingua, "grazie")}" data-email="${esc(K.email)}" data-oggetto="${esc(f.oggettoEmail)}" novalidate>
${titoloForm ? `<h2 class="modulo__titolo">${fmt(titoloForm)}</h2>` : ""}
${extra}<input type="hidden" name="lingua" value="${lingua.codice}">
<div class="trappola" aria-hidden="true"><label for="${p}${trappola}">${esc(f.trappola)}</label><input id="${p}${trappola}" name="${trappola}" type="text" tabindex="-1" autocomplete="off"></div>
<div class="modulo__griglia">
<div class="campo"><label for="${p}nome">${esc(f.nome)} <span aria-hidden="true">*</span></label><input id="${p}nome" name="nome" type="text" autocomplete="name" required maxlength="120"></div>
<div class="campo"><label for="${p}email">${esc(f.email)} <span aria-hidden="true">*</span></label><input id="${p}email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
<div class="campo"><label for="${p}tel">${esc(f.telefono)}</label><input id="${p}tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel" maxlength="40"></div>
<div class="campo"><label for="${p}servizio">${esc(f.servizio)} <span aria-hidden="true">*</span></label><div class="seleziona"><select id="${p}servizio" name="servizio" required><option value="">${esc(f.scegli)}</option>${opz(f.servizi, servizio)}</select>${icona("giu")}</div></div>
<div class="campo"><label for="${p}immobile">${esc(f.immobile)}</label><div class="seleziona"><select id="${p}immobile" name="immobile"><option value="">${esc(f.scegli)}</option>${opz(f.immobili, "")}</select>${icona("giu")}</div></div>
<div class="campo"><label for="${p}comune">${esc(f.comune)}</label><input id="${p}comune" name="comune" type="text" autocomplete="address-level2" maxlength="80"></div>
<div class="campo campo--pieno"><label for="${p}msg">${esc(f.messaggio)}</label><textarea id="${p}msg" name="messaggio" rows="4" maxlength="4000" placeholder="${esc(f.messaggioAiuto)}"></textarea></div>
<div class="campo campo--pieno campo--check"><input id="${p}privacy" name="privacy" type="checkbox" value="si" required><label for="${p}privacy">${f.privacy.replace("{link}", linkPriv)} <span aria-hidden="true">*</span></label></div>
</div>
<p class="modulo__errore" role="alert" hidden>${esc(f.errore)}</p>
<div class="modulo__invio"><button class="pulsante" type="submit">${esc(f.invia)}${icona("freccia")}</button><p class="nota">${esc(f.obbligatori)}${servizioAttivo === "mailto" ? ` ${esc(f.notaMail)}` : ""}</p></div>
</form>`;
}

/* ---------- FAQ ---------- */
const faq = (voci) => `<div class="faq">${voci.map((v) => `<details class="faq__voce"><summary><span>${fmt(v.d)}</span><span class="faq__segno" aria-hidden="true"></span></summary><div class="faq__risposta"><p>${fmt(v.r)}</p></div></details>`).join("")}</div>`;

/* ---------- dati strutturati ---------- */
function schemaStudio(lingua) {
  const t = T[lingua.codice];
  return {
    "@type": "ProfessionalService", "@id": SITO + BASE + "/#studio", name: C.studio.nome, legalName: C.studio.ragioneSociale,
    description: senzaDC(t.pagine.home.descrizione), url: assoluto(url(lingua, "home")), image: assoluto(assetFisso("img/og-image.jpg")),
    logo: assoluto(assetFisso("img/logo.svg")), telephone: K.telefono, email: K.email, vatID: "IT" + C.studio.partitaIva, foundingDate: C.studio.fondazione,
    address: { "@type": "PostalAddress", streetAddress: I.via, postalCode: I.cap, addressLocality: I.citta, addressRegion: I.provincia, addressCountry: "IT" },
    areaServed: { "@type": "City", name: "Torino" },
    founder: { "@id": SITO + BASE + "/#lombardo" },
    knowsLanguage: C.lingue.map((l) => l.codice),
  };
}
function schemaPersona(lingua) {
  const t = T[lingua.codice];
  return { "@type": "Person", "@id": SITO + BASE + "/#lombardo", name: "Natale Lombardo", honorificPrefix: "Ing.", jobTitle: t.chiSiamo.ruolo,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Politecnico di Torino" }, worksFor: { "@id": SITO + BASE + "/#studio" },
    image: assoluto(assetFisso("img/foto/ing-natale-lombardo-280.jpg")) };
}
const schemaFaq = (voci) => ({ "@type": "FAQPage", mainEntity: voci.map((v) => ({ "@type": "Question", name: senzaDC(v.d), acceptedAnswer: { "@type": "Answer", text: senzaDC(v.r) } })) });
function schemaBriciole(lingua, chiave) {
  const t = T[lingua.codice];
  const voci = [["home", t.ui.home]];
  if (SERVIZI.includes(chiave)) voci.push(["servizi", t.pagine.servizi.menu]);
  voci.push([chiave, t.pagine[chiave].menu]);
  return { "@type": "BreadcrumbList", itemListElement: voci.map(([k, n], i) => ({ "@type": "ListItem", position: i + 1, name: senzaDC(n), item: assoluto(url(lingua, k)) })) };
}

/* ---------- briciole visibili ---------- */
function briciole(lingua, chiave) {
  const t = T[lingua.codice];
  const voci = [[url(lingua, "home"), t.ui.home]];
  if (SERVIZI.includes(chiave)) voci.push([url(lingua, "servizi"), t.pagine.servizi.menu]);
  return `<nav class="briciole" aria-label="${esc(t.ui.briciole)}"><ol>${voci.map(([h, n]) => `<li><a href="${h}">${esc(n)}</a></li>`).join("")}<li aria-current="page">${esc(t.pagine[chiave].menu)}</li></ol></nav>`;
}

/* ---------- intestazione, piede, barra mobile ---------- */
function intestazione(lingua, chiave) {
  const t = T[lingua.codice];
  const attuale = (k) => k === chiave ? ' aria-current="page"' : "";
  const lingue = C.lingue.map((l) => `<a href="${url(l, chiave)}" hreflang="${l.codice}" lang="${l.codice}"${l === lingua ? ' aria-current="true"' : ""}><span class="sr">${esc(l.nome)}</span><span aria-hidden="true">${l.codice.toUpperCase()}</span></a>`).join("");
  const voceServizio = (k) => `<li><a href="${url(lingua, k)}"${attuale(k)}>${esc(t.pagine[k].menu)}</a></li>`;
  return `<a class="salta" href="#contenuto">${esc(t.ui.salta)}</a>
<div class="avanzamento" aria-hidden="true"><span></span></div>
<header class="testata${chiave === "home" ? " testata--sopra" : ""}">
<div class="testata__dentro">
<a class="logo" href="${url(lingua, "home")}" aria-label="StudioVela49 — ${esc(t.ui.home)}">${logo()}</a>
<nav class="nav" id="nav" aria-label="${esc(t.ui.menu)}">
<ul class="nav__lista">
<li class="nav__gruppo"><button type="button" class="nav__apri" aria-expanded="false" aria-controls="nav-servizi">${esc(t.pagine.servizi.menu)}${icona("giu")}</button>
<div class="nav__pannello" id="nav-servizi">
<div><p class="eti">${esc(t.ui.privati)}</p><ul>${PRIVATI.map(voceServizio).join("")}</ul></div>
<div><p class="eti">${esc(t.ui.professionisti)}</p><ul>${PROFESSIONISTI.map(voceServizio).join("")}</ul></div>
<p class="nav__tutti"><a href="${url(lingua, "servizi")}"${attuale("servizi")}>${esc(t.ui.tuttiServizi)}</a></p>
</div></li>
<li><a href="${url(lingua, "bonus")}"${attuale("bonus")}>${esc(t.pagine.bonus.menuBreve || t.pagine.bonus.menu)}</a></li>
<li><a href="${url(lingua, "condominio")}"${attuale("condominio")}>${esc(t.pagine.condominio.menuBreve || t.pagine.condominio.menu)}</a></li>
<li><a href="${url(lingua, "chiSiamo")}"${attuale("chiSiamo")}>${esc(t.pagine.chiSiamo.menu)}</a></li>
<li><a href="${url(lingua, "contatti")}"${attuale("contatti")}>${esc(t.pagine.contatti.menu)}</a></li>
</ul>
<div class="nav__lingue" role="group" aria-label="${esc(t.ui.lingua)}">${lingue}</div>
<p class="nav__telefono"><a href="${telLink}">${icona("telefono")}${esc(K.telefonoVisibile)}</a></p>
</nav>
<a class="pulsante pulsante--piccolo testata__cta" href="${url(lingua, "contatti")}#modulo">${esc(t.ui.richiediPreventivo)}</a>
<button type="button" class="menu-pulsante" aria-expanded="false" aria-controls="nav" data-apri="${esc(t.ui.apriMenu)}" data-chiudi="${esc(t.ui.chiudiMenu)}"><span class="sr">${esc(t.ui.apriMenu)}</span><span class="menu-pulsante__linee" aria-hidden="true"></span></button>
</div>
</header>`;
}

function barraMobile(lingua, ancora) {
  const t = T[lingua.codice];
  return `<nav class="barra" aria-label="${esc(t.ui.contattoRapido)}">
<a href="${telLink}">${icona("telefono")}<span>${esc(t.ui.chiama)}</span></a>
${C.whatsappAttivo ? `<a href="${waLink(t)}" rel="noopener" target="_blank">${icona("whatsapp")}<span>${esc(t.ui.whatsapp)}<span class="sr"> (${esc(t.ui.nuovaFinestra)})</span></span></a>` : ""}
<a class="barra__principale" href="${ancora}">${icona("modulo")}<span>${esc(t.ui.preventivo)}</span></a>
</nav>`;
}

function piede(lingua) {
  const t = T[lingua.codice];
  const voce = (k) => `<li><a href="${url(lingua, k)}">${esc(t.pagine[k].menu)}</a></li>`;
  return `<footer class="piede">
<div class="contenitore">
${divisore("divisore--piede")}
<div class="piede__griglia">
<div class="piede__studio">
<a class="logo logo--chiaro" href="${url(lingua, "home")}" aria-label="StudioVela49 — ${esc(t.ui.home)}">${logo()}</a>
<p>${esc(t.ui.piedeFrase)}</p>
<p class="piede__contatti"><a href="${telLink}">${esc(K.telefonoVisibile)}</a><br><a href="mailto:${K.email}">${K.email}</a></p>
<address>${esc(I.via)}<br>${esc(I.cap)} ${esc(I.citta)} (${esc(I.provincia)})</address>
</div>
<div><h2 class="eti">${esc(t.ui.privati)}</h2><ul>${PRIVATI.map(voce).join("")}</ul></div>
<div><h2 class="eti">${esc(t.ui.professionisti)}</h2><ul>${PROFESSIONISTI.map(voce).join("")}</ul></div>
<div><h2 class="eti">${esc(t.ui.studio)}</h2><ul>${["chiSiamo", "contatti", "servizi"].map(voce).join("")}</ul></div>
</div>
<div class="piede__fondo">
<p>© ${new Date().getFullYear()} ${esc(C.studio.ragioneSociale)} · ${esc(t.ui.piva)} ${C.studio.partitaIva}</p>
<ul class="piede__legali">${["privacy", "cookie", "crediti"].map(voce).join("")}</ul>
<p>${esc(C.firma)}</p>
</div>
</div>
</footer>`;
}

/* ---------- la pagina intera ---------- */
function pagina(lingua, chiave, corpo, { schemi = [], file = "", noindex = false, ancora = "" } = {}) {
  const t = T[lingua.codice], m = t.pagine[chiave];
  const titoloPag = senzaDC(m.titolo), descr = senzaDC(m.descrizione);
  const robots = ANTEPRIMA || noindex ? "noindex, nofollow" : "index, follow";
  const indicizzata = INDICIZZATE.includes(chiave);
  const alternate = indicizzata ? C.lingue.map((l) => `<link rel="alternate" hreflang="${l.codice}" href="${assoluto(url(l, chiave))}">`).join("\n")
    + `\n<link rel="alternate" hreflang="x-default" href="${assoluto(url(PRINCIPALE, chiave))}">` : "";
  const grafo = { "@context": "https://schema.org", "@graph": [schemaStudio(lingua), ...(chiave !== "home" && indicizzata ? [schemaBriciole(lingua, chiave)] : []), ...schemi] };
  const html = `<!doctype html>
<html lang="${lingua.codice}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titoloPag)}</title>
<meta name="description" content="${esc(descr)}">
<meta name="robots" content="${robots}">
${indicizzata ? `<link rel="canonical" href="${assoluto(url(lingua, chiave))}">\n${alternate}` : ""}
<meta name="theme-color" content="#0E2233">
<meta property="og:type" content="website">
<meta property="og:site_name" content="StudioVela49">
<meta property="og:locale" content="${lingua.locale}">
<meta property="og:title" content="${esc(titoloPag)}">
<meta property="og:description" content="${esc(descr)}">
<meta property="og:url" content="${assoluto(url(lingua, chiave))}">
<meta property="og:image" content="${assoluto(assetFisso("img/og-image.jpg"))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${assetFisso("img/favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${assetFisso("img/apple-touch-icon.png")}">
<link rel="preload" href="${assetFisso("font/instrument-sans.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${assetFisso("font/inter.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset("css/stile.css")}">
<script>document.documentElement.classList.add("js")</script>
<script type="application/ld+json">${JSON.stringify(grafo).replace(/</g, "\\u003c")}</script>
</head>
<body class="p-${chiave}">
${intestazione(lingua, chiave)}
<main id="contenuto" tabindex="-1">
${corpo}
</main>
${piede(lingua)}
${barraMobile(lingua, ancora || `${url(lingua, "contatti")}#modulo`)}
<script src="${asset("js/sito.js")}" defer></script>
</body>
</html>
`;
  scrivi(file || path.join(url(lingua, chiave).slice(BASE.length + 1), "index.html"), html);
}

/* ---------- blocchi condivisi ---------- */
// I due appartamenti: APE uguale, diagnosi diversa (home e pagina Diagnosi)
function confronto(lingua, { grande = false } = {}) {
  const c = T[lingua.codice].confronto;
  const casa = (k, consumo) => `<figure class="casa" style="--consumo:${consumo}">
<svg class="casa__disegno" viewBox="0 0 160 120" aria-hidden="true" focusable="false"><path class="casa__muro" d="M14 112V44L80 8l66 36v68z"/><rect class="casa__finestra" x="34" y="54" width="28" height="24"/><rect class="casa__finestra" x="98" y="54" width="28" height="24"/><rect class="casa__porta" x="68" y="78" width="24" height="34"/>${k === "a" ? '<circle class="casa__persona" cx="44" cy="96" r="5"/><circle class="casa__persona" cx="116" cy="96" r="5"/><path class="casa__calore" d="M40 40c4-6-4-8 0-14M120 40c4-6-4-8 0-14"/>' : '<circle class="casa__persona casa__persona--via" cx="116" cy="96" r="5"/>'}</svg>
<figcaption><strong>${fmt(c[k].nome)}</strong><span>${fmt(c[k].chi)}</span></figcaption>
<dl class="casa__dati">
<div><dt>${fmt(c.ape)}</dt><dd><span class="classe c-D">D</span><span class="sr">${esc(c.stessaClasse)}</span></dd></div>
<div><dt>${fmt(c.reale)}</dt><dd><span class="consumo" data-rivela="barre"><span style="--i:2"></span></span><span class="consumo__testo">${fmt(c[k].consumo)}</span></dd></div>
</dl>
</figure>`;
  return `<div class="confronto${grande ? " confronto--grande" : ""}">
<p class="confronto__esempio eti">${fmt(c.esempio)}</p>
<div class="confronto__case">${casa("a", 0.92)}<span class="confronto__vs" aria-hidden="true">≠</span>${casa("b", 0.34)}</div>
<p class="confronto__nota">${fmt(c.nota)}</p>
</div>`;
}

// Chiamata finale con modulo, uguale per struttura ma sempre ultima della pagina
function finale(lingua, { servizio = "", titoloSez, frase, fotoNome = "torino-mole", alt = "" }) {
  const t = T[lingua.codice];
  return `<section class="finale" aria-labelledby="t-finale">
<div class="finale__foto">${foto(fotoNome, alt || t.alt[fotoNome], { sizes: "(min-width: 960px) 40vw, 100vw" })}</div>
<div class="finale__testo">
${titolo("h2", titoloSez, { id: "t-finale", classe: "h2" })}
<p class="intro">${fmt(frase)}</p>
<ul class="finale__rapidi"><li><a href="${telLink}">${icona("telefono")}${esc(K.telefonoVisibile)}</a></li><li><a href="mailto:${K.email}">${icona("email")}${K.email}</a></li></ul>
</div>
<div class="finale__modulo">${modulo(lingua, { servizio })}</div>
</section>`;
}

/* =====================================================================
   PAGINE
   ===================================================================== */
function paginaHome(lingua) {
  const t = T[lingua.codice], h = t.home;
  const colonna = (k, scuro) => {
    const g = h.pubblici[k];
    return `<div class="pubblico${scuro ? " pubblico--scuro" : ""}" data-rivela="su">
${eti(g.eti)}
<h2 class="h2">${fmt(g.titolo)}</h2>
<p class="intro">${fmt(g.frase)}</p>
<ul class="pubblico__voci">${g.voci.map((v) => `<li><a href="${url(lingua, v)}"><span>${esc(t.pagine[v].menu)}</span>${icona("freccia")}</a></li>`).join("")}</ul>
${pulsante(url(lingua, g.cta[0]) + (g.cta[0] === "contatti" ? "#modulo" : ""), g.cta[1], scuro ? "" : "pulsante--inchiostro")}
</div>`;
  };
  const schede = h.griglia.schede.map((s, i) => `<li class="scheda scheda--${s.forma}" data-rivela="su" style="--ritardo:${(i % 3) * 90}ms">
<a href="${url(lingua, s.k)}">
${s.foto ? foto(s.foto, t.alt[s.foto], { sizes: "(min-width: 960px) 50vw, 100vw", rivela: false }) : ""}
<span class="scheda__testo"><span class="scheda__pubblico">${esc(s.k && PRIVATI.includes(s.k) ? t.ui.privati : t.ui.professionisti)}</span><span class="scheda__titolo">${esc(t.pagine[s.k].menu)}</span><span class="scheda__frase">${fmt(s.frase)}</span><span class="scheda__vai" aria-hidden="true">${icona("freccia")}</span></span>
</a></li>`).join("");
  const corpo = `<section class="apertura" aria-labelledby="t-apertura">
<div class="apertura__foto">${foto("torino-tetti", t.alt["torino-tetti"], { subito: true, sizes: "100vw" })}</div>
<div class="apertura__testo contenitore">
${eti(h.apertura.eti)}
${titolo("h1", h.apertura.titolo, { id: "t-apertura", classe: "h1" })}
<p class="intro">${fmt(h.apertura.frase)}</p>
${pulsante(`${url(lingua, "contatti")}#modulo`, h.apertura.cta)}
</div>
<div class="apertura__scala" aria-hidden="true">${CLASSI.map((k, i) => `<span class="c-${k}" style="--i:${i}"></span>`).join("")}</div>
</section>

<section class="pubblici" aria-label="${esc(t.ui.perChi)}">
${colonna("privati", false)}
${colonna("professionisti", true)}
</section>

<section class="sezione contenitore" aria-labelledby="t-servizi">
<div class="testa testa--lato">
<div>${eti(h.griglia.eti)}${titolo("h2", h.griglia.titolo, { id: "t-servizi", classe: "h2" })}</div>
<p class="intro">${fmt(h.griglia.frase)}</p>
</div>
<ul class="bento">${schede}</ul>
</section>

<section class="sezione sezione--carta2 passi-sezione" aria-labelledby="t-passi">
<div class="contenitore">
${eti(h.passi.eti)}
${titolo("h2", h.passi.titolo, { id: "t-passi", classe: "h2" })}
<ol class="passi">${h.passi.voci.map((v, i) => `<li class="passo" data-rivela="su" style="--ritardo:${i * 120}ms">
<span class="passo__numero" aria-hidden="true">${pad(i + 1)}</span>
<span class="passo__barra c-${["E", "B", "A4"][i]}" data-rivela="barre"><span style="--i:${i}"></span></span>
<h3 class="h3">${fmt(v.titolo)}</h3>
<p>${fmt(v.testo)}</p>
</li>`).join("")}</ol>
</div>
</section>

<section class="sezione contenitore confronto-sezione" aria-labelledby="t-confronto">
<div class="testa testa--centro">
${eti(h.confronto.eti)}
${titolo("h2", h.confronto.titolo, { id: "t-confronto", classe: "h2" })}
<p class="intro">${fmt(h.confronto.frase)}</p>
</div>
${confronto(lingua)}
<p class="centro">${linkFreccia(url(lingua, "diagnosi"), h.confronto.link)}</p>
</section>

<section class="diviso" aria-labelledby="t-perche">
<div class="diviso__foto">${foto("progetto-tavolo", t.alt["progetto-tavolo"], { sizes: "(min-width: 960px) 50vw, 100vw" })}</div>
<div class="diviso__testo">
${eti(h.perche.eti)}
${titolo("h2", h.perche.titolo, { id: "t-perche", classe: "h2" })}
<ol class="motivi">${h.perche.voci.map((v, i) => `<li data-rivela="su"><span class="motivi__n" aria-hidden="true">${pad(i + 1)}</span><div><h3 class="h3">${fmt(v.titolo)}</h3><p>${fmt(v.testo)}</p></div></li>`).join("")}</ol>
</div>
</section>

<section class="valori" aria-labelledby="t-valori">
<div class="contenitore">
<h2 id="t-valori" class="eti eti--chiara">${fmt(h.valori.eti)}</h2>
<ul class="valori__parole">${h.valori.parole.map((p, i) => `<li data-rivela="su" style="--ritardo:${i * 100}ms"><span class="valori__n" aria-hidden="true">${pad(i + 1)}</span>${fmt(p)}</li>`).join("")}</ul>
<p class="valori__frase">${fmt(h.valori.frase)}</p>
</div>
</section>

<section class="sezione persona contenitore stretto" aria-labelledby="t-persona">
<div class="persona__ritratto" data-rivela="su">${foto("ing-natale-lombardo", t.alt["ing-natale-lombardo"], { sizes: "160px", rivela: false })}</div>
${eti(h.persona.eti)}
${titolo("h2", h.persona.titolo, { id: "t-persona", classe: "h2" })}
<p class="intro">${fmt(h.persona.testo)}</p>
${linkFreccia(url(lingua, "chiSiamo"), h.persona.link)}
</section>

<section class="sezione sezione--carta2" aria-labelledby="t-faq">
<div class="contenitore faq-griglia">
<div class="faq-griglia__testa">${eti(h.faq.eti)}${titolo("h2", h.faq.titolo, { id: "t-faq", classe: "h2" })}</div>
${faq(h.faq.voci)}
</div>
</section>

${finale(lingua, { titoloSez: h.finale.titolo, frase: h.finale.frase })}`;
  pagina(lingua, "home", corpo, { schemi: [schemaPersona(lingua), schemaFaq(h.faq.voci)], ancora: "#modulo" });
}

function paginaServizi(lingua) {
  const t = T[lingua.codice], s = t.servizi;
  const classePer = { ape: "A4", diagnosi: "A2", solare: "B", bonus: "C", condominio: "D", antincendio: "F", studi: "G" };
  const riga = (k, i) => `<li class="indice__riga" data-rivela="su"><a href="${url(lingua, k)}">
<span class="indice__n">${pad(i + 1)}</span>
<span class="indice__nome">${esc(t.pagine[k].menu)}</span>
<span class="indice__frase">${fmt(t[k].riassunto)}</span>
<span class="indice__classe c-${classePer[k]}" aria-hidden="true"></span>
${icona("freccia")}</a></li>`;
  const corpo = `<section class="testa-pagina contenitore">
${briciole(lingua, "servizi")}
${titolo("h1", s.titolo, { classe: "h1" })}
<p class="intro">${fmt(s.frase)}</p>
</section>
<section class="sezione sezione--stretta contenitore" aria-labelledby="t-privati">
<h2 id="t-privati" class="indice__gruppo">${esc(t.ui.privati)}<span>${fmt(s.privati)}</span></h2>
<ol class="indice">${PRIVATI.map(riga).join("")}</ol>
<h2 class="indice__gruppo">${esc(t.ui.professionisti)}<span>${fmt(s.professionisti)}</span></h2>
<ol class="indice" start="5">${PROFESSIONISTI.map((k, i) => riga(k, i + 4)).join("")}</ol>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-altri">
<div class="contenitore altri">
<h2 id="t-altri" class="h3">${fmt(s.altriTitolo)}</h2>
<ul class="etichette">${s.altri.map((a) => `<li>${fmt(a)}</li>`).join("")}</ul>
<p class="nota">${fmt(s.altriNota)}</p>
</div>
</section>
${finale(lingua, { titoloSez: s.finaleTitolo, frase: s.finaleFrase, fotoNome: "torino-panorama" })}`;
  pagina(lingua, "servizi", corpo);
}

const schemaServizio = (lingua, k) => ({ "@type": "Service", name: senzaDC(T[lingua.codice].pagine[k].menu), description: senzaDC(T[lingua.codice].pagine[k].descrizione),
  provider: { "@id": SITO + BASE + "/#studio" }, areaServed: { "@type": "City", name: "Torino" }, url: assoluto(url(lingua, k)) });

// Elenco numerato semplice (riusato con layout diversi via classe)
const elenco = (voci, cl) => `<ol class="${cl}">${voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 80}ms"><span class="${cl}__n" aria-hidden="true">${pad(i + 1)}</span><div><h3 class="h3">${fmt(v.titolo)}</h3>${v.testo ? `<p>${fmt(v.testo)}</p>` : ""}</div></li>`).join("")}</ol>`;

function paginaApe(lingua) {
  const t = T[lingua.codice], p = t.ape;
  const corpo = `<section class="ap-ape contenitore">
<div class="ap-ape__testo">
${briciole(lingua, "ape")}
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta)}
</div>
${scala({ evidenzia: "", etichetta: p.scalaAlt, classe: "scala--grande" })}
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-quando">
<div class="contenitore">
${eti(p.quando.eti)}${titolo("h2", p.quando.titolo, { id: "t-quando", classe: "h2" })}
<ul class="quattro">${p.quando.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 90}ms"><span class="quattro__segno c-${["A2", "C", "E", "G"][i]}" aria-hidden="true"></span><h3 class="h3">${fmt(v.titolo)}</h3><p>${fmt(v.testo)}</p></li>`).join("")}</ul>
</div>
</section>
<section class="dichiarazione" aria-labelledby="t-sopralluogo">
<div class="contenitore">
${eti(p.sopralluogo.eti)}
${titolo("h2", p.sopralluogo.titolo, { id: "t-sopralluogo", classe: "dichiarazione__testo" })}
<p class="intro">${fmt(p.sopralluogo.frase)}</p>
</div>
</section>
<section class="sezione contenitore due" aria-labelledby="t-preparare">
<div>${eti(p.preparare.eti)}${titolo("h2", p.preparare.titolo, { id: "t-preparare", classe: "h2" })}<p>${fmt(p.preparare.frase)}</p></div>
<ul class="spunte">${p.preparare.voci.map((v) => `<li data-rivela="su">${fmt(v)}</li>`).join("")}</ul>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-faq">
<div class="contenitore faq-griglia"><div class="faq-griglia__testa">${titolo("h2", t.ui.faq, { id: "t-faq", classe: "h2" })}</div>${faq(p.faq)}</div>
</section>
${finale(lingua, { servizio: "ape", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "torino-tetti" })}`;
  pagina(lingua, "ape", corpo, { schemi: [schemaServizio(lingua, "ape"), schemaFaq(p.faq)], ancora: "#modulo" });
}

function paginaDiagnosi(lingua) {
  const t = T[lingua.codice], p = t.diagnosi;
  const corpo = `<section class="ap-diagnosi contenitore">
${briciole(lingua, "diagnosi")}
<div class="ap-diagnosi__testa">
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
</div>
${confronto(lingua, { grande: true })}
<p class="centro">${pulsante("#modulo", p.cta)}</p>
</section>
<section class="diviso diviso--inverso" aria-labelledby="t-ottieni">
<div class="diviso__foto">${foto("termocamera", t.alt.termocamera, { sizes: "(min-width: 960px) 50vw, 100vw" })}</div>
<div class="diviso__testo">
${eti(p.ottieni.eti)}${titolo("h2", p.ottieni.titolo, { id: "t-ottieni", classe: "h2" })}
${elenco(p.ottieni.voci, "motivi")}
</div>
</section>
<section class="citazione contenitore stretto">
<blockquote data-rivela="su"><p>${fmt(p.citazione)}</p></blockquote>
${divisore()}
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-faq">
<div class="contenitore faq-griglia"><div class="faq-griglia__testa">${titolo("h2", t.ui.faq, { id: "t-faq", classe: "h2" })}</div>${faq(p.faq)}</div>
</section>
${finale(lingua, { servizio: "diagnosi", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "valvola" })}`;
  pagina(lingua, "diagnosi", corpo, { schemi: [schemaServizio(lingua, "diagnosi"), schemaFaq(p.faq)], ancora: "#modulo" });
}

function paginaSolare(lingua) {
  const t = T[lingua.codice], p = t.solare;
  const corpo = `<section class="ap-solare">
<div class="ap-solare__testo contenitore">
${briciole(lingua, "solare")}
<p class="ap-solare__numero" aria-hidden="true">${esc(p.numero)}<small>${esc(p.unita)}</small></p>
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta)}
</div>
<div class="ap-solare__foto">${foto("fotovoltaico-tetto", t.alt["fotovoltaico-tetto"], { subito: true, sizes: "(min-width: 960px) 40vw, 100vw" })}</div>
</section>
<section class="sezione contenitore" aria-labelledby="t-fasi">
${eti(p.fasi.eti)}${titolo("h2", p.fasi.titolo, { id: "t-fasi", classe: "h2" })}
<ol class="linea-tempo">${p.fasi.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 120}ms"><span class="linea-tempo__punto c-${["E", "C", "A1", "A4"][i]}" aria-hidden="true"></span><p class="eti">${pad(i + 1)}</p><h3 class="h3">${fmt(v.titolo)}</h3><p>${fmt(v.testo)}</p></li>`).join("")}</ol>
</section>
<section class="riquadro-scuro" aria-labelledby="t-dogane">
<div class="contenitore riquadro-scuro__griglia">
<div>${eti(p.dogane.eti)}${titolo("h2", p.dogane.titolo, { id: "t-dogane", classe: "h2" })}<p class="intro">${fmt(p.dogane.frase)}</p></div>
<ul class="spunte spunte--chiare">${p.dogane.voci.map((v) => `<li>${fmt(v)}</li>`).join("")}</ul>
</div>
</section>
<section class="sezione contenitore foto-larga" aria-label="${esc(t.alt["casa-fotovoltaico"])}">
${foto("casa-fotovoltaico", t.alt["casa-fotovoltaico"], { sizes: "(min-width: 1320px) 1320px, 100vw" })}
</section>
${finale(lingua, { servizio: "solare", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "ingegnere-pannelli" })}`;
  pagina(lingua, "solare", corpo, { schemi: [schemaServizio(lingua, "solare")], ancora: "#modulo" });
}

function paginaBonus(lingua) {
  const t = T[lingua.codice], p = t.bonus;
  const corpo = `<section class="ap-bonus">
<div class="contenitore">
${briciole(lingua, "bonus")}
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta, "pulsante--inchiostro")}
</div>
</section>
<section class="sezione contenitore" aria-labelledby="t-come">
<div class="testa testa--lato"><div>${eti(p.come.eti)}${titolo("h2", p.come.titolo, { id: "t-come", classe: "h2" })}</div><p class="intro">${fmt(p.come.frase)}</p></div>
<ol class="percorso">${p.come.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 100}ms"><span class="percorso__n">${pad(i + 1)}</span><h3 class="h3">${fmt(v.titolo)}</h3><p>${fmt(v.testo)}</p></li>`).join("")}</ol>
</section>
<section class="diviso" aria-labelledby="t-quali">
<div class="diviso__foto">${foto("cappotto", t.alt.cappotto, { sizes: "(min-width: 960px) 50vw, 100vw" })}</div>
<div class="diviso__testo">
${eti(p.quali.eti)}${titolo("h2", p.quali.titolo, { id: "t-quali", classe: "h2" })}
<p>${fmt(p.quali.frase)}</p>
<ul class="etichette">${p.quali.voci.map((v) => `<li>${fmt(v)}</li>`).join("")}</ul>
<p class="nota">${fmt(p.quali.nota)}</p>
</div>
</section>
<section class="parcella contenitore stretto" aria-labelledby="t-parcella">
${divisore()}
${titolo("h2", p.parcella.titolo, { id: "t-parcella", classe: "h2" })}
<p class="intro">${fmt(p.parcella.frase)}</p>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-faq">
<div class="contenitore faq-griglia"><div class="faq-griglia__testa">${titolo("h2", t.ui.faq, { id: "t-faq", classe: "h2" })}</div>${faq(p.faq)}</div>
</section>
${finale(lingua, { servizio: "bonus", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "torino-tetti" })}`;
  pagina(lingua, "bonus", corpo, { schemi: [schemaServizio(lingua, "bonus"), schemaFaq(p.faq)], ancora: "#modulo" });
}

function paginaCondominio(lingua) {
  const t = T[lingua.codice], p = t.condominio;
  const corpo = `<section class="ap-condominio">
<div class="ap-condominio__foto">${foto("condominio-facciate", t.alt["condominio-facciate"], { subito: true, sizes: "(min-width: 960px) 50vw, 100vw" })}</div>
<div class="ap-condominio__testo">
${briciole(lingua, "condominio")}
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta)}
</div>
</section>
<section class="sezione contenitore" aria-labelledby="t-schema">
<div class="testa testa--centro">${eti(p.schema.eti)}${titolo("h2", p.schema.titolo, { id: "t-schema", classe: "h2" })}</div>
<div class="hub" data-rivela="su">
<p class="hub__nodo">${fmt(p.schema.amministratore)}</p>
<span class="hub__linea" aria-hidden="true"></span>
<p class="hub__nodo hub__nodo--centro">${logo()}<span class="sr">StudioVela49</span></p>
<span class="hub__linea" aria-hidden="true"></span>
<ul class="hub__rami">${p.schema.altri.map((a) => `<li>${fmt(a)}</li>`).join("")}</ul>
</div>
<p class="centro nota">${fmt(p.schema.nota)}</p>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-cosa">
<div class="contenitore">
${eti(p.cosa.eti)}${titolo("h2", p.cosa.titolo, { id: "t-cosa", classe: "h2" })}
<ul class="griglia-2">${p.cosa.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${(i % 2) * 100}ms"><h3 class="h3">${fmt(v.titolo)}</h3><p>${fmt(v.testo)}</p></li>`).join("")}</ul>
</div>
</section>
<section class="citazione contenitore stretto">
<blockquote data-rivela="su"><p>${fmt(p.citazione)}</p></blockquote>
</section>
${finale(lingua, { servizio: "condominio", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "condominio-balconi" })}`;
  pagina(lingua, "condominio", corpo, { schemi: [schemaServizio(lingua, "condominio")], ancora: "#modulo" });
}

function paginaAntincendio(lingua) {
  const t = T[lingua.codice], p = t.antincendio;
  const corpo = `<section class="ap-incendio">
<div class="contenitore ap-incendio__griglia">
<div class="ap-incendio__testo">
${briciole(lingua, "antincendio")}
${eti(p.eti)}
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta)}
</div>
<div class="ap-incendio__foto">${foto("estintore", t.alt.estintore, { subito: true, sizes: "(min-width: 960px) 26vw, 60vw" })}</div>
</div>
</section>
<section class="sezione contenitore due" aria-labelledby="t-cosa">
<div>${titolo("h2", p.cosa.titolo, { id: "t-cosa", classe: "h2" })}${p.cosa.testi.map((x) => `<p>${fmt(x)}</p>`).join("")}</div>
${elenco(p.cosa.voci, "piccoli")}
</section>
${finale(lingua, { servizio: "antincendio", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "progetto-tavolo" })}`;
  pagina(lingua, "antincendio", corpo, { schemi: [schemaServizio(lingua, "antincendio")], ancora: "#modulo" });
}

function paginaStudi(lingua) {
  const t = T[lingua.codice], p = t.studi;
  const corpo = `<section class="ap-studi contenitore">
${briciole(lingua, "studi")}
<div class="ap-studi__griglia">
<div class="ap-studi__testa">
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
${pulsante("#modulo", p.cta)}
</div>
<ol class="sommario">${p.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 60}ms"><span class="sommario__n">${pad(i + 1)}</span><span class="sommario__nome">${fmt(v)}</span></li>`).join("")}</ol>
</div>
</section>
<section class="diviso" aria-labelledby="t-come">
<div class="diviso__foto">${foto("ingegneri-progetto", t.alt["ingegneri-progetto"], { sizes: "(min-width: 960px) 50vw, 100vw" })}</div>
<div class="diviso__testo">
${eti(p.come.eti)}${titolo("h2", p.come.titolo, { id: "t-come", classe: "h2" })}
${p.come.testi.map((x) => `<p>${fmt(x)}</p>`).join("")}
<p class="nota">${fmt(p.come.nota)}</p>
</div>
</section>
${finale(lingua, { servizio: "studi", titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "torino-panorama" })}`;
  pagina(lingua, "studi", corpo, { schemi: [schemaServizio(lingua, "studi")], ancora: "#modulo" });
}

function paginaChiSiamo(lingua) {
  const t = T[lingua.codice], p = t.chiSiamo;
  const corpo = `<section class="ap-chi">
<div class="ap-chi__foto">${foto("torino-panorama", t.alt["torino-panorama"], { subito: true, sizes: "100vw" })}</div>
<div class="contenitore ap-chi__testo">
${briciole(lingua, "chiSiamo")}
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
</div>
</section>
<section class="sezione contenitore profilo" aria-labelledby="t-profilo">
<div class="profilo__ritratto">${foto("ing-natale-lombardo", t.alt["ing-natale-lombardo"], { sizes: "160px", rivela: false })}<p><strong>Ing. Natale Lombardo</strong><br>${esc(p.ruolo)}</p></div>
<div class="profilo__testo">
${titolo("h2", p.profilo.titolo, { id: "t-profilo", classe: "h2" })}
${p.profilo.testi.map((x) => `<p>${fmt(x)}</p>`).join("")}
</div>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-tappe">
<div class="contenitore">
${eti(p.tappe.eti)}${titolo("h2", p.tappe.titolo, { id: "t-tappe", classe: "h2" })}
<ol class="tappe">${p.tappe.voci.map((v, i) => `<li data-rivela="su" style="--ritardo:${i * 90}ms"><span class="tappe__anno">${fmt(v.anno)}</span><span class="tappe__barra c-${CLASSI[9 - i * 3] || "A4"}" aria-hidden="true"></span><p>${fmt(v.testo)}</p></li>`).join("")}</ol>
</div>
</section>
<section class="sezione contenitore due" aria-labelledby="t-titoli">
<div>${eti(p.titoli.eti)}${titolo("h2", p.titoli.titolo, { id: "t-titoli", classe: "h2" })}</div>
<ul class="spunte">${p.titoli.voci.map((v) => `<li data-rivela="su">${fmt(v)}</li>`).join("")}</ul>
</section>
<section class="valori valori--compatti" aria-labelledby="t-valori">
<div class="contenitore">
<h2 id="t-valori" class="eti eti--chiara">${fmt(t.home.valori.eti)}</h2>
<ul class="valori__parole">${t.home.valori.parole.map((x, i) => `<li data-rivela="su" style="--ritardo:${i * 100}ms"><span class="valori__n" aria-hidden="true">${pad(i + 1)}</span>${fmt(x)}</li>`).join("")}</ul>
</div>
</section>
<section class="sezione contenitore due" aria-labelledby="t-rete">
<div>${titolo("h2", p.rete.titolo, { id: "t-rete", classe: "h2" })}<p>${fmt(p.rete.testo)}</p></div>
<div><p class="eti">${fmt(p.rete.strumentiEti)}</p><ul class="etichette">${p.rete.strumenti.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul></div>
</section>
${finale(lingua, { titoloSez: p.finaleTitolo, frase: p.finaleFrase, fotoNome: "torino-mole" })}`;
  pagina(lingua, "chiSiamo", corpo, { schemi: [schemaPersona(lingua)], ancora: "#modulo" });
}

function paginaContatti(lingua) {
  const t = T[lingua.codice], p = t.contatti;
  const mappa = `https://maps.google.com/maps?q=${mappaRicerca}&z=16&output=embed&hl=${lingua.codice}`;
  const mappaLink = `https://www.google.com/maps/search/?api=1&query=${mappaRicerca}`;
  const corpo = `<section class="ap-contatti contenitore">
<div class="ap-contatti__testa">
${briciole(lingua, "contatti")}
${titolo("h1", p.titolo, { classe: "h1" })}
<p class="intro">${fmt(p.frase)}</p>
</div>
<div class="ap-contatti__griglia">
${modulo(lingua, { titoloForm: p.moduloTitolo })}
<aside class="recapiti" aria-label="${esc(p.recapiti)}">
<p class="recapiti__grande"><a href="${telLink}">${icona("telefono")}${esc(K.telefonoVisibile)}</a></p>
${C.whatsappAttivo ? `<p><a href="${waLink(t)}" rel="noopener" target="_blank">${icona("whatsapp")}${esc(t.ui.whatsappScrivi)}<span class="sr"> (${esc(t.ui.nuovaFinestra)})</span></a> ${fmt("[DA CONFERMARE]")}</p>` : ""}
<p><a href="mailto:${K.email}">${icona("email")}${K.email}</a></p>
<dl class="recapiti__dati">
<div><dt>${esc(t.ui.indirizzo)}</dt><dd>${esc(I.via)}<br>${esc(I.cap)} ${esc(I.citta)} (${esc(I.provincia)})</dd></div>
<div><dt>${esc(t.ui.orari)}</dt><dd>${fmt(p.orari)}</dd></div>
<div><dt>${esc(t.ui.comeArrivare)}</dt><dd>${fmt(p.arrivare)}</dd></div>
<div><dt>${esc(t.ui.piva)}</dt><dd>${C.studio.partitaIva}</dd></div>
</dl>
</aside>
</div>
</section>
<section class="sezione sezione--carta2" aria-labelledby="t-mappa">
<div class="contenitore">
<h2 id="t-mappa" class="h3">${fmt(p.mappaTitolo)}</h2>
<div class="mappa" data-mappa="${esc(mappa)}" data-titolo="${esc(p.mappaTitolo)}">
<div class="mappa__vuota">
${icona("posizione", "icona mappa__icona")}
<p>${fmt(p.mappaTesto)}</p>
<p><button type="button" class="pulsante pulsante--inchiostro" data-mappa-carica>${esc(p.mappaPulsante)}</button></p>
<p><a href="${mappaLink}" rel="noopener" target="_blank">${esc(p.mappaApri)}${icona("esterno")}<span class="sr"> (${esc(t.ui.nuovaFinestra)})</span></a></p>
</div>
</div>
</div>
</section>`;
  pagina(lingua, "contatti", corpo, { ancora: "#modulo" });
}

function paginaTesto(lingua, chiave) {
  const t = T[lingua.codice], p = t[chiave];
  const corpo = `<section class="testa-pagina contenitore stretto">
${briciole(lingua, chiave)}
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
${p.aggiornamento ? `<p class="nota">${fmt(p.aggiornamento)}</p>` : ""}
</section>
<section class="sezione sezione--stretta contenitore stretto testo-lungo">
${p.sezioni.map((s) => `<h2>${fmt(s.titolo)}</h2>\n${[].concat(s.testo).map((x) => x.startsWith("<") ? fmt(x) : `<p>${fmt(x)}</p>`).join("\n")}`).join("\n")}
</section>`;
  pagina(lingua, chiave, corpo);
}

function paginaCrediti(lingua) {
  const t = T[lingua.codice], p = t.crediti;
  const righe = C.creditiFoto.map((c) => `<tr><td>${foto(c.nome, "", { sizes: "96px", rivela: false })}</td><td>${esc(t.alt[c.nome])}</td><td>${esc(c.autore)}</td><td><a href="${c.fonte}" rel="noopener" target="_blank">Pexels${icona("esterno")}<span class="sr"> (${esc(t.ui.nuovaFinestra)})</span></a></td></tr>`).join("");
  const corpo = `<section class="testa-pagina contenitore stretto">
${briciole(lingua, "crediti")}
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
<p class="intro">${fmt(p.frase)}</p>
</section>
<section class="sezione sezione--stretta contenitore stretto">
<div class="tabella-scorre" tabindex="0" role="region" aria-label="${esc(p.titolo)}"><table class="crediti"><thead><tr><th scope="col"><span class="sr">${esc(p.colFoto)}</span></th><th scope="col">${esc(p.colSoggetto)}</th><th scope="col">${esc(p.colAutore)}</th><th scope="col">${esc(p.colFonte)}</th></tr></thead><tbody>${righe}</tbody></table></div>
<p class="nota">${fmt(p.nota)}</p>
<h2 class="h3">${fmt(p.fontTitolo)}</h2>
<p>${fmt(p.font)}</p>
</section>`;
  pagina(lingua, "crediti", corpo);
}

function paginaMessaggio(lingua, chiave, file) {
  const t = T[lingua.codice], p = t[chiave];
  const corpo = `<section class="messaggio contenitore stretto">
${scala({ evidenzia: chiave === "grazie" ? "A4" : "G", classe: "scala--mini" })}
${titolo("h1", p.titolo, { classe: "h1 h1--medio" })}
<p class="intro">${fmt(p.frase)}</p>
${p.mail ? `<p class="nota messaggio__mail" hidden>${fmt(p.mail)}</p>` : ""}
${p.altro ? `<p class="nota">${p.altro}</p>` : ""}
<p class="messaggio__azioni">${pulsante(url(lingua, "home"), p.torna)} ${linkFreccia(url(lingua, "servizi"), t.ui.tuttiServizi)}</p>
</section>`;
  pagina(lingua, chiave, corpo, { noindex: true, file });
}

/* =====================================================================
   FILE TECNICI: sitemap, robots, redirect dai vecchi indirizzi
   ===================================================================== */
function fileTecnici() {
  const oggi = new Date().toISOString().slice(0, 10);
  const voci = INDICIZZATE.map((k) => C.lingue.map((l) => `<url><loc>${assoluto(url(l, k))}</loc><lastmod>${oggi}</lastmod>
${C.lingue.map((x) => `<xhtml:link rel="alternate" hreflang="${x.codice}" href="${assoluto(url(x, k))}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${assoluto(url(PRINCIPALE, k))}"/></url>`).join("\n")).join("\n");
  scrivi("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${voci}\n</urlset>\n`);
  // In anteprima Google non deve indicizzare: lo dice già il meta "noindex" (robots.txt deve lasciarlo leggere)
  scrivi("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITO}${BASE}/sitemap.xml\n`);

  // Vecchi indirizzi del sito 2012 → nuove pagine
  const vecchi = Object.entries(C.vecchiIndirizzi).map(([da, k]) => [da, url(PRINCIPALE, k)]);
  const lingue404 = C.lingue.filter((l) => l.cartella).map((l) => `${BASE}/${l.cartella}/*  ${BASE}/${l.cartella}/404.html  404`).join("\n");
  scrivi("_redirects", `# Generato da build.js (Netlify)\n${vecchi.map(([da, a]) => `${BASE}${da}  ${a}  301`).join("\n")}\n${lingue404}\n`);
  scrivi(".htaccess", `# Generato da build.js (hosting Apache, es. Aruba)
ErrorDocument 404 ${BASE}/404.html
<IfModule mod_rewrite.c>
RewriteEngine On
${vecchi.map(([da, a]) => `RewriteRule ^${da.replace(/^\//, "").replace(/\./g, "\\.").replace(/\/$/, "/?")}$ ${a} [R=301,L]`).join("\n")}
</IfModule>
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType font/woff2 "access plus 1 year"
ExpiresByType image/avif "access plus 1 year"
ExpiresByType image/webp "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
</IfModule>
${ANTEPRIMA ? '<IfModule mod_headers.c>\nHeader set X-Robots-Tag "noindex"\n</IfModule>\n' : ""}`);
  scrivi("_headers", `# Generato da build.js (Netlify)
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
${ANTEPRIMA ? "  X-Robots-Tag: noindex\n" : ""}/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);
  // Su GitHub Pages non esistono redirect veri: una piccola pagina che rimanda
  for (const [da, a] of vecchi) {
    if (da === "/" ) continue;
    const dest = da.endsWith("/") ? path.join(da, "index.html") : path.join(da, "index.html");
    scrivi(dest.replace(/^\//, ""), `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="${assoluto(a)}"><meta http-equiv="refresh" content="0; url=${a}"><title>StudioVela49</title></head><body><p><a href="${a}">StudioVela49</a></p></body></html>\n`);
  }
  scrivi(".nojekyll", "");
}

/* =====================================================================
   AVVIO
   ===================================================================== */
fs.rmSync(USCITA, { recursive: true, force: true });
fs.mkdirSync(USCITA, { recursive: true });
fs.cpSync(path.join(RADICE, "assets"), path.join(USCITA, "assets"), { recursive: true, filter: (s) => !s.endsWith("indice.json") });

for (const lingua of C.lingue) {
  paginaHome(lingua);
  paginaServizi(lingua);
  paginaApe(lingua);
  paginaDiagnosi(lingua);
  paginaSolare(lingua);
  paginaBonus(lingua);
  paginaCondominio(lingua);
  paginaAntincendio(lingua);
  paginaStudi(lingua);
  paginaChiSiamo(lingua);
  paginaContatti(lingua);
  paginaTesto(lingua, "privacy");
  paginaTesto(lingua, "cookie");
  paginaCrediti(lingua);
  paginaMessaggio(lingua, "grazie");
  paginaMessaggio(lingua, "errore", path.join(lingua.cartella || "", "404.html"));
}
fileTecnici();

// Elenco dei [DA CONFERMARE] rimasti nei testi (per ricordarli)
let dc = 0;
for (const l of C.lingue) dc += (JSON.stringify(T[l.codice]).match(/DA CONFERMARE/g) || []).length;
console.log(`✔ StudioVela49 generato in dist/: ${C.lingue.length * 16} pagine in ${C.lingue.map((l) => l.codice).join(", ")}`);
console.log(`  Percorso base: "${BASE || "/"}"  ·  indirizzo: ${SITO}${BASE}/  ·  ${ANTEPRIMA ? "ANTEPRIMA (noindex)" : "sito pubblico (indicizzabile)"}`);
console.log(`  Segnaposto [DA CONFERMARE] nei testi: ${dc} (elenco in docs/DA-CONFERMARE.md)`);
if (avvisi.length) { console.log(`⚠ ${avvisi.length} avvisi:`); for (const a of new Set(avvisi)) console.log("  - " + a); }

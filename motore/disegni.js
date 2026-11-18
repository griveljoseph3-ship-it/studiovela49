/* =====================================================================
   DISEGNI AUTOMATICI  —  parte del motore, non serve modificarlo
   =====================================================================
   1. Le montagne a strati della grande immagine in Home (quando non c'è
      una foto vera): ogni strato si muove a una velocità diversa.
   2. I segnaposto delle foto mancanti: paesaggio, interno (camera),
      tavola (piatti) e prodotto, nei colori dello stile scelto e nelle
      proporzioni del posto in cui vanno.
   Ogni disegno è sempre uguale per lo stesso nome di file (non cambia
   a ogni pubblicazione).
   ===================================================================== */
"use strict";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const n = (v) => (Math.round(v * 10) / 10).toString();

function hash(s) {
  let h = 2166136261;
  for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function casuale(seme) {
  let a = hash(seme);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Profilo di una cresta: alcune cime principali + dettagli sempre più piccoli */
function cresta(r, w, base, amp, cime = 4) {
  // alterna selle (basse) e cime (alte), poi aggiunge dettagli sempre più piccoli
  let pts = [];
  const passi = cime * 2 + 1;
  for (let i = 0; i <= passi; i++) {
    const x = -w * 0.05 + (w * 1.1 * i) / passi + (r() - 0.5) * (w / passi) * 0.5;
    const alto = i % 2 === 1 ? 0.62 + 0.38 * r() : 0.08 + 0.28 * r();
    pts.push([x, base - amp * alto]);
  }
  let d = amp * 0.3;
  for (let l = 0; l < 6; l++) {
    const nuovi = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      nuovi.push([(x0 + x1) / 2, Math.min(base + amp * 0.1, (y0 + y1) / 2 + (r() - 0.5) * d)], pts[i]);
    }
    pts = nuovi;
    d *= 0.55;
  }
  return pts;
}
const percorso = (pts, w, h) => `M${n(-w * 0.05)},${n(h)} L` + pts.map((p) => `${n(p[0])},${n(p[1])}`).join(" L") + ` L${n(w * 1.05)},${n(h)} Z`;
function altezzaA(pts, x) {
  for (let i = 1; i < pts.length; i++) {
    if (pts[i][0] >= x) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
    }
  }
  return pts[pts.length - 1][1];
}

/* ---------- PAESAGGIO: restituisce gli strati separati ---------- */
function stratiPaesaggio(S, w, h, seme, id = "p") {
  const r = casuale(seme);
  const strati = [];

  // 0. cielo, stelle, sole
  let cielo = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.cielo[0]}"/><stop offset=".72" stop-color="${S.cielo[1]}"/><stop offset="1" stop-color="${S.nebbia}"/></linearGradient>`
    + `<radialGradient id="${id}s"><stop offset="0" stop-color="${S.sole}" stop-opacity=".55"/><stop offset="1" stop-color="${S.sole}" stop-opacity="0"/></radialGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}c)"/>`;
  if (S.stelle) {
    let stelle = "";
    for (let i = 0; i < 70; i++) stelle += `<circle cx="${n(r() * w)}" cy="${n(r() * h * 0.42)}" r="${n(0.6 + r() * 1.3)}" opacity="${n(0.25 + r() * 0.6)}"/>`;
    cielo += `<g fill="#fff">${stelle}</g>`;
  }
  const sx = w * (0.58 + r() * 0.24), sy = h * (0.2 + r() * 0.1), sr = Math.min(w, h) * 0.055;
  cielo += `<circle cx="${n(sx)}" cy="${n(sy)}" r="${n(sr * 4)}" fill="url(#${id}s)"/><circle cx="${n(sx)}" cy="${n(sy)}" r="${n(sr)}" fill="${S.sole}"/>`;
  strati.push({ html: cielo, p: 0.5, m: 4 });

  // 1-2. creste lontane innevate
  const livelli = [
    { base: 0.5, amp: 0.3, cime: 4 },
    { base: 0.64, amp: 0.22, cime: 5 },
  ];
  livelli.forEach((L, i) => {
    const pts = cresta(r, w, h * L.base, h * L.amp, L.cime);
    const minY = Math.min(...pts.map((p) => p[1]));
    const g = `${id}n${i}`;
    // neve: forma irregolare ritagliata sulla sagoma della cresta
    const banda = h * L.amp * (i ? 0.28 : 0.42);
    let neve = `M${n(-w * 0.05)},${n(minY - h * 0.1)}`;
    for (let x = -w * 0.05; x <= w * 1.05; x += w / 60) neve += ` L${n(x)},${n(minY + banda * (0.45 + 0.75 * r()))}`;
    neve += ` L${n(w * 1.05)},${n(minY - h * 0.1)} Z`;
    let html = `<defs><clipPath id="${g}"><path d="${percorso(pts, w, h * 1.2)}"/></clipPath></defs>`
      + `<path d="${percorso(pts, w, h * 1.2)}" fill="${S.creste[i]}"/>`
      + `<path d="${neve}" fill="${S.neve}" clip-path="url(#${g})" opacity="${i ? 0.85 : 1}"/>`;
    if (i === 1) html += `<defs><linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.nebbia}" stop-opacity="0"/><stop offset=".5" stop-color="${S.nebbia}" stop-opacity=".55"/><stop offset="1" stop-color="${S.nebbia}" stop-opacity="0"/></linearGradient></defs><rect y="${n(h * 0.6)}" width="${w}" height="${n(h * 0.22)}" fill="url(#${id}f)"/>`;
    strati.push({ html, p: i ? 0.32 : 0.42, m: i ? 10 : 7 });
  });

  // 3. cresta vicina con bosco
  const vicina = cresta(r, w, h * 0.78, h * 0.13, 6);
  let alberi = "";
  for (let x = -w * 0.02; x < w * 1.04; x += w * (0.008 + r() * 0.014)) {
    const y = altezzaA(vicina, x) + h * 0.012;
    const a = h * (0.03 + r() * 0.035);
    alberi += `M${n(x)},${n(y - a)} L${n(x - a * 0.32)},${n(y + 2)} L${n(x + a * 0.32)},${n(y + 2)} Z `;
  }
  strati.push({ html: `<path d="${percorso(vicina, w, h * 1.2)}" fill="${S.creste[2]}"/><path d="${alberi}" fill="${S.creste[2]}"/>`, p: 0.2, m: 16 });

  // 4. primo piano
  const primo = cresta(r, w, h * 0.93, h * 0.07, 3);
  strati.push({ html: `<path d="${percorso(primo, w, h * 1.2)}" fill="${S.creste[3]}"/>`, p: 0.08, m: 24 });
  return strati;
}

/* ---------- SCENE PER I SEGNAPOSTO ---------- */
function scenaPaesaggio(S, w, h, seme) {
  return stratiPaesaggio(S, w, h, seme, "q" + (hash(seme) % 99999)).map((s) => s.html).join("");
}

function scenaInterno(S, w, h, seme) {
  const r = casuale(seme), id = "i" + (hash(seme) % 99999);
  const fx = w * (0.55 + r() * 0.06), fy = h * 0.12, fw = w * 0.34, fh = h * 0.46;
  let assi = "";
  for (let x = 0; x < w; x += w / 9) assi += `<line x1="${n(x)}" y1="${n(h * 0.74)}" x2="${n(x - w * 0.04)}" y2="${n(h)}"/>`;
  return `<defs><linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.parete[0]}"/><stop offset="1" stop-color="${S.parete[1]}"/></linearGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}m)"/>`
    + `<rect y="${n(h * 0.74)}" width="${w}" height="${n(h * 0.26)}" fill="${S.legno}"/>`
    + `<g stroke="#000" stroke-opacity=".14" stroke-width="${n(w * 0.003)}">${assi}</g>`
    + `<svg x="${n(fx)}" y="${n(fy)}" width="${n(fw)}" height="${n(fh)}" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${scenaPaesaggio(S, 400, 300, seme + "f")}</svg>`
    + `<rect x="${n(fx)}" y="${n(fy)}" width="${n(fw)}" height="${n(fh)}" fill="none" stroke="${S.legno}" stroke-width="${n(w * 0.014)}"/>`
    + `<line x1="${n(fx + fw / 2)}" y1="${n(fy)}" x2="${n(fx + fw / 2)}" y2="${n(fy + fh)}" stroke="${S.legno}" stroke-width="${n(w * 0.009)}"/>`
    + `<polygon points="${n(fx)},${n(fy + fh)} ${n(fx + fw)},${n(fy + fh)} ${n(fx + fw * 0.7)},${n(h)} ${n(fx - fw * 0.5)},${n(h)}" fill="#fff" opacity=".07"/>`
    + `<ellipse cx="${n(w * 0.3)}" cy="${n(h * 0.86)}" rx="${n(w * 0.26)}" ry="${n(h * 0.06)}" fill="${S.tessuto}" opacity=".35"/>`
    + `<rect x="${n(w * 0.05)}" y="${n(h * 0.4)}" width="${n(w * 0.045)}" height="${n(h * 0.38)}" rx="${n(w * 0.008)}" fill="${S.legno}"/>`
    + `<rect x="${n(w * 0.07)}" y="${n(h * 0.56)}" width="${n(w * 0.44)}" height="${n(h * 0.2)}" rx="${n(w * 0.015)}" fill="${S.piatto}"/>`
    + `<rect x="${n(w * 0.22)}" y="${n(h * 0.6)}" width="${n(w * 0.29)}" height="${n(h * 0.16)}" rx="${n(w * 0.012)}" fill="${S.tessuto}" opacity=".9"/>`
    + `<rect x="${n(w * 0.1)}" y="${n(h * 0.5)}" width="${n(w * 0.1)}" height="${n(h * 0.08)}" rx="${n(w * 0.02)}" fill="${S.piatto}" stroke="#000" stroke-opacity=".08"/>`
    + `<rect x="${n(w * 0.22)}" y="${n(h * 0.5)}" width="${n(w * 0.1)}" height="${n(h * 0.08)}" rx="${n(w * 0.02)}" fill="${S.tessuto}" opacity=".75"/>`;
}

function scenaTavola(S, w, h, seme) {
  const r = casuale(seme), id = "t" + (hash(seme) % 99999), m = Math.min(w, h);
  let venature = "";
  for (let i = 0; i < 7; i++) {
    const y = r() * h;
    venature += `<path d="M0,${n(y)} C${n(w * 0.3)},${n(y + (r() - 0.5) * h * 0.1)} ${n(w * 0.6)},${n(y + (r() - 0.5) * h * 0.1)} ${n(w)},${n(y)}" />`;
  }
  let piatti = "";
  const pos = [[0.36, 0.42, 0.25], [0.72, 0.62, 0.19], [0.24, 0.8, 0.13]];
  pos.forEach(([px, py, pr], k) => {
    const cx = w * (px + (r() - 0.5) * 0.05), cy = h * (py + (r() - 0.5) * 0.05), rr = m * pr;
    piatti += `<circle cx="${n(cx + rr * 0.06)}" cy="${n(cy + rr * 0.1)}" r="${n(rr)}" fill="#000" opacity=".22"/>`
      + `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(rr)}" fill="${S.piatto}"/>`
      + `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(rr * 0.74)}" fill="none" stroke="#000" stroke-opacity=".07" stroke-width="${n(rr * 0.03)}"/>`;
    for (let j = 0; j < (k === 2 ? 2 : 4); j++) {
      const a = r() * Math.PI * 2, d = r() * rr * 0.32;
      piatti += `<ellipse cx="${n(cx + Math.cos(a) * d)}" cy="${n(cy + Math.sin(a) * d)}" rx="${n(rr * (0.16 + r() * 0.14))}" ry="${n(rr * (0.12 + r() * 0.12))}" fill="${S.cibo[Math.floor(r() * S.cibo.length)]}" transform="rotate(${n(r() * 180)} ${n(cx)} ${n(cy)})"/>`;
    }
  });
  return `<defs><radialGradient id="${id}g" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="${S.tavolo[0]}"/><stop offset="1" stop-color="${S.tavolo[1]}"/></radialGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}g)"/>`
    + `<g fill="none" stroke="#000" stroke-opacity=".08" stroke-width="${n(m * 0.004)}">${venature}</g>`
    + `<rect x="${n(w * 0.55)}" y="${n(h * 0.08)}" width="${n(m * 0.34)}" height="${n(m * 0.34)}" rx="${n(m * 0.01)}" fill="${S.tessuto}" opacity=".85" transform="rotate(14 ${n(w * 0.7)} ${n(h * 0.25)})"/>`
    + piatti
    + `<circle cx="${n(w * 0.84)}" cy="${n(h * 0.24)}" r="${n(m * 0.07)}" fill="none" stroke="${S.piatto}" stroke-opacity=".6" stroke-width="${n(m * 0.008)}"/>`
    + `<rect x="${n(w * 0.06)}" y="${n(h * 0.2)}" width="${n(m * 0.014)}" height="${n(m * 0.32)}" rx="${n(m * 0.007)}" fill="${S.piatto}" opacity=".8"/>`;
}

function scenaProdotto(S, w, h, seme) {
  const r = casuale(seme), id = "o" + (hash(seme) % 99999), m = Math.min(w, h);
  const ripiano = h * 0.74;
  const tipi = ["vaso", "bottiglia", "forma", "vaso", "bottiglia"];
  const scelta = [tipi[Math.floor(r() * 5)], tipi[Math.floor(r() * 5)], tipi[Math.floor(r() * 5)]];
  let oggetti = "";
  scelta.forEach((t, k) => {
    const cx = w * (0.26 + k * 0.24), s = m * (0.85 + r() * 0.3);
    const col = S.cibo[Math.floor(r() * S.cibo.length)];
    oggetti += `<ellipse cx="${n(cx)}" cy="${n(ripiano)}" rx="${n(s * 0.12)}" ry="${n(s * 0.02)}" fill="#000" opacity=".25"/>`;
    if (t === "vaso") {
      oggetti += `<rect x="${n(cx - s * 0.09)}" y="${n(ripiano - s * 0.24)}" width="${n(s * 0.18)}" height="${n(s * 0.24)}" rx="${n(s * 0.03)}" fill="${col}"/>`
        + `<rect x="${n(cx - s * 0.095)}" y="${n(ripiano - s * 0.285)}" width="${n(s * 0.19)}" height="${n(s * 0.05)}" rx="${n(s * 0.01)}" fill="${S.tessuto}"/>`
        + `<rect x="${n(cx - s * 0.06)}" y="${n(ripiano - s * 0.17)}" width="${n(s * 0.12)}" height="${n(s * 0.08)}" fill="${S.piatto}" opacity=".9"/>`;
    } else if (t === "bottiglia") {
      oggetti += `<path d="M${n(cx - s * 0.06)},${n(ripiano)} V${n(ripiano - s * 0.28)} Q${n(cx - s * 0.06)},${n(ripiano - s * 0.34)} ${n(cx - s * 0.02)},${n(ripiano - s * 0.37)} V${n(ripiano - s * 0.46)} H${n(cx + s * 0.02)} V${n(ripiano - s * 0.37)} Q${n(cx + s * 0.06)},${n(ripiano - s * 0.34)} ${n(cx + s * 0.06)},${n(ripiano - s * 0.28)} V${n(ripiano)} Z" fill="${S.creste[2]}"/>`
        + `<rect x="${n(cx - s * 0.025)}" y="${n(ripiano - s * 0.49)}" width="${n(s * 0.05)}" height="${n(s * 0.04)}" fill="${S.tessuto}"/>`
        + `<rect x="${n(cx - s * 0.05)}" y="${n(ripiano - s * 0.2)}" width="${n(s * 0.1)}" height="${n(s * 0.09)}" fill="${S.piatto}" opacity=".9"/>`;
    } else {
      oggetti += `<rect x="${n(cx - s * 0.13)}" y="${n(ripiano - s * 0.12)}" width="${n(s * 0.26)}" height="${n(s * 0.1)}" fill="${col}"/>`
        + `<ellipse cx="${n(cx)}" cy="${n(ripiano - s * 0.12)}" rx="${n(s * 0.13)}" ry="${n(s * 0.035)}" fill="${S.cibo[2]}"/>`
        + `<ellipse cx="${n(cx)}" cy="${n(ripiano - s * 0.02)}" rx="${n(s * 0.13)}" ry="${n(s * 0.035)}" fill="${col}"/>`;
    }
  });
  return `<defs><radialGradient id="${id}g" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="${S.parete[0]}"/><stop offset="1" stop-color="${S.parete[1]}"/></radialGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}g)"/>`
    + `<rect y="${n(ripiano)}" width="${w}" height="${n(h * 0.035)}" fill="${S.legno}"/>`
    + `<rect y="${n(ripiano + h * 0.035)}" width="${w}" height="${n(h * 0.03)}" fill="#000" opacity=".12"/>`
    + oggetti;
}

/* ---------------------------------------------------------------
   QUATTRO DISEGNI NUOVI: vino e formaggi, camino, piste da sci, terrazza
   --------------------------------------------------------------- */

/* tavolo scuro con venature (sfondo di "vino") */
function fondoTavolo(S, w, h, id, r) {
  const m = Math.min(w, h);
  let venature = "";
  for (let i = 0; i < 6; i++) {
    const y = r() * h;
    venature += `<path d="M0,${n(y)} C${n(w * 0.3)},${n(y + (r() - 0.5) * h * 0.1)} ${n(w * 0.6)},${n(y + (r() - 0.5) * h * 0.1)} ${n(w)},${n(y)}"/>`;
  }
  return `<defs><radialGradient id="${id}g" cx=".4" cy=".3" r=".95"><stop offset="0" stop-color="${S.tavolo[0]}"/><stop offset="1" stop-color="${S.tavolo[1]}"/></radialGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}g)"/><g fill="none" stroke="#000" stroke-opacity=".08" stroke-width="${n(m * 0.004)}">${venature}</g>`;
}

function bottiglia(S, x, y, s, col) {
  return `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(s * 0.11)}" ry="${n(s * 0.018)}" fill="#000" opacity=".28"/>`
    + `<path d="M${n(x - s * 0.07)},${n(y)} V${n(y - s * 0.34)} Q${n(x - s * 0.07)},${n(y - s * 0.42)} ${n(x - s * 0.025)},${n(y - s * 0.47)} V${n(y - s * 0.6)} H${n(x + s * 0.025)} V${n(y - s * 0.47)} Q${n(x + s * 0.07)},${n(y - s * 0.42)} ${n(x + s * 0.07)},${n(y - s * 0.34)} V${n(y)} Z" fill="${col}"/>`
    + `<rect x="${n(x - s * 0.03)}" y="${n(y - s * 0.64)}" width="${n(s * 0.06)}" height="${n(s * 0.05)}" fill="${S.tessuto}"/>`
    + `<rect x="${n(x - s * 0.07)}" y="${n(y - s * 0.26)}" width="${n(s * 0.14)}" height="${n(s * 0.14)}" fill="${S.piatto}" opacity=".92"/>`
    + `<rect x="${n(x - s * 0.05)}" y="${n(y - s * 0.34)}" width="${n(s * 0.012)}" height="${n(s * 0.3)}" fill="#fff" opacity=".18"/>`;
}

function calice(S, x, y, s, id) {
  const gr = s * 0.1, gh = s * 0.17;
  const coppa = `M${n(x - gr)},${n(y - s * 0.34)} C${n(x - gr)},${n(y - s * 0.22)} ${n(x - gr * 0.6)},${n(y - s * 0.17)} ${n(x)},${n(y - s * 0.17)} C${n(x + gr * 0.6)},${n(y - s * 0.17)} ${n(x + gr)},${n(y - s * 0.22)} ${n(x + gr)},${n(y - s * 0.34)} Z`;
  return `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(s * 0.09)}" ry="${n(s * 0.014)}" fill="#000" opacity=".28"/>`
    + `<defs><clipPath id="${id}"><path d="${coppa}"/></clipPath></defs>`
    + `<path d="${coppa}" fill="${S.piatto}" opacity=".22"/>`
    + `<rect x="${n(x - gr)}" y="${n(y - s * 0.27)}" width="${n(gr * 2)}" height="${n(gh)}" fill="${S.cibo[3]}" clip-path="url(#${id})"/>`
    + `<rect x="${n(x - s * 0.006)}" y="${n(y - s * 0.17)}" width="${n(s * 0.012)}" height="${n(s * 0.16)}" fill="${S.piatto}" opacity=".7"/>`
    + `<ellipse cx="${n(x)}" cy="${n(y - s * 0.005)}" rx="${n(s * 0.065)}" ry="${n(s * 0.011)}" fill="${S.piatto}" opacity=".7"/>`
    + `<path d="M${n(x - gr * 0.7)},${n(y - s * 0.32)} q${n(-gr * 0.1)},${n(gh * 0.5)} ${n(gr * 0.25)},${n(gh * 0.85)}" stroke="#fff" stroke-opacity=".35" stroke-width="${n(s * 0.008)}" fill="none"/>`;
}

function formaggioRotondo(S, x, y, rx, t, r) {
  let buchi = "";
  for (let i = 0; i < 4; i++) buchi += `<ellipse cx="${n(x + (r() - 0.5) * rx * 1.2)}" cy="${n(y + (r() - 0.5) * rx * 0.3)}" rx="${n(rx * (0.05 + r() * 0.06))}" ry="${n(rx * 0.03)}" fill="${S.cibo[0]}" opacity=".55"/>`;
  return `<ellipse cx="${n(x + rx * 0.05)}" cy="${n(y + t + rx * 0.06)}" rx="${n(rx)}" ry="${n(rx * 0.28)}" fill="#000" opacity=".25"/>`
    + `<path d="M${n(x - rx)},${n(y)} v${n(t)} a${n(rx)},${n(rx * 0.28)} 0 0 0 ${n(rx * 2)},0 v${n(-t)} Z" fill="${S.cibo[2]}"/>`
    + `<path d="M${n(x - rx)},${n(y)} v${n(t)} a${n(rx)},${n(rx * 0.28)} 0 0 0 ${n(rx * 2)},0 v${n(-t)} Z" fill="#000" opacity=".12"/>`
    + `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(rx * 0.28)}" fill="${S.cibo[2]}"/>${buchi}`;
}

function spicchio(S, x, y, L, H) {
  const dx = L * 0.28, dy = L * 0.14;
  return `<polygon points="${n(x)},${n(y)} ${n(x + L)},${n(y)} ${n(x + L)},${n(y - H)}" fill="${S.cibo[2]}"/>`
    + `<polygon points="${n(x)},${n(y)} ${n(x + L)},${n(y - H)} ${n(x + L + dx)},${n(y - H - dy)} ${n(x + dx)},${n(y - dy)}" fill="${S.cibo[2]}" opacity=".78"/>`
    + `<polygon points="${n(x + L)},${n(y)} ${n(x + L + dx)},${n(y - dy)} ${n(x + L + dx)},${n(y - H - dy)} ${n(x + L)},${n(y - H)}" fill="#000" opacity=".16"/>`
    + `<circle cx="${n(x + L * 0.62)}" cy="${n(y - H * 0.22)}" r="${n(L * 0.045)}" fill="${S.cibo[0]}" opacity=".5"/>`
    + `<circle cx="${n(x + L * 0.82)}" cy="${n(y - H * 0.5)}" r="${n(L * 0.03)}" fill="${S.cibo[0]}" opacity=".5"/>`;
}

function uva(S, x, y, s, r) {
  let acini = "";
  const righe = 5;
  for (let i = 0; i < righe; i++) for (let j = 0; j < righe - i; j++) {
    const cx = x + (j - (righe - i - 1) / 2) * s * 0.058 + (r() - 0.5) * s * 0.01, cy = y + i * s * 0.05;
    acini += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(s * 0.032)}" fill="${S.cibo[3]}"/><circle cx="${n(cx - s * 0.01)}" cy="${n(cy - s * 0.011)}" r="${n(s * 0.008)}" fill="#fff" opacity=".35"/>`;
  }
  return `<path d="M${n(x)},${n(y - s * 0.04)} q${n(s * 0.02)},${n(-s * 0.06)} ${n(s * 0.07)},${n(-s * 0.07)}" stroke="${S.cibo[1]}" stroke-width="${n(s * 0.012)}" fill="none"/>`
    + `<ellipse cx="${n(x + s * 0.06)}" cy="${n(y - s * 0.075)}" rx="${n(s * 0.04)}" ry="${n(s * 0.022)}" fill="${S.cibo[1]}"/>${acini}`;
}

function scenaVino(S, w, h, seme) {
  const r = casuale(seme), id = "v" + (hash(seme) % 99999), m = Math.min(w, h);
  const bx = w * 0.5, by = h * 0.74, bw = Math.min(w * 0.42, m * 0.64), bh = m * 0.15;
  const tagliere = `<ellipse cx="${n(bx + bw * 0.05)}" cy="${n(by + bh * 0.9)}" rx="${n(bw)}" ry="${n(bh * 0.75)}" fill="#000" opacity=".3"/>`
    + `<rect x="${n(bx - bw)}" y="${n(by - bh)}" width="${n(bw * 2)}" height="${n(bh * 2)}" rx="${n(bh * 0.9)}" fill="${S.legno}"/>`
    + `<rect x="${n(bx - bw * 0.96)}" y="${n(by - bh * 0.92)}" width="${n(bw * 1.92)}" height="${n(bh * 1.84)}" rx="${n(bh * 0.8)}" fill="#fff" opacity=".07"/>`
    + `<circle cx="${n(bx + bw * 0.86)}" cy="${n(by)}" r="${n(bh * 0.18)}" fill="#000" opacity=".35"/>`;
  return fondoTavolo(S, w, h, id, r)
    + bottiglia(S, w * 0.2, h * 0.7, m * 1.15, S.creste[2])
    + bottiglia(S, w * 0.31, h * 0.66, m * 0.95, S.creste[3])
    + calice(S, w * 0.8, h * 0.66, m * 1.2, id + "c")
    + tagliere
    + formaggioRotondo(S, bx - bw * 0.42, by - bh * 0.42, bw * 0.34, bh * 0.6, r)
    + spicchio(S, bx + bw * 0.02, by + bh * 0.25, bw * 0.46, bh * 0.7)
    + uva(S, bx + bw * 0.6, by - bh * 0.5, m * 0.6, r)
    + `<rect x="${n(w * 0.06)}" y="${n(h * 0.06)}" width="${n(m * 0.3)}" height="${n(m * 0.3)}" rx="${n(m * 0.01)}" fill="${S.tessuto}" opacity=".8" transform="rotate(${n(-12 + r() * 8)} ${n(w * 0.06 + m * 0.15)} ${n(h * 0.06 + m * 0.15)})"/>`;
}

function scenaCamino(S, w, h, seme) {
  const r = casuale(seme), id = "k" + (hash(seme) % 99999), m = Math.min(w, h);
  const cx = w * (0.46 + r() * 0.08), base = h * 0.8;
  const fw = Math.min(w * 0.8, m * 1.0), fh = Math.min(h * 0.66, m * 0.74);
  const ow = fw * 0.56, oh = fh * 0.58;
  let pietre = "";
  const rh = fh / 9;
  for (let k = 0; k < 9; k++) {
    let x = cx - fw / 2 - (k % 2) * fw * 0.05;
    while (x < cx + fw / 2) {
      const lw = fw * (0.1 + r() * 0.08);
      pietre += `<rect x="${n(x)}" y="${n(base - fh + k * rh)}" width="${n(lw * 0.96)}" height="${n(rh * 0.9)}" rx="${n(rh * 0.2)}" fill="${S.creste[1]}" opacity="${n(0.7 + r() * 0.3)}"/>`;
      x += lw;
    }
  }
  const fiamma = (x, hh, ww, col, o) => `<path d="M${n(x - ww)},${n(base)} C${n(x - ww * 1.1)},${n(base - hh * 0.5)} ${n(x - ww * 0.2)},${n(base - hh * 0.6)} ${n(x)},${n(base - hh)} C${n(x + ww * 0.1)},${n(base - hh * 0.6)} ${n(x + ww * 1.1)},${n(base - hh * 0.45)} ${n(x + ww)},${n(base)} Z" fill="${col}" opacity="${o}"/>`;
  return `<defs><linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.parete[0]}"/><stop offset="1" stop-color="${S.parete[1]}"/></linearGradient>`
    + `<radialGradient id="${id}l" cx="${n(cx / w)}" cy="${n((base - oh * 0.3) / h)}" r=".75"><stop offset="0" stop-color="${S.cibo[0]}" stop-opacity=".55"/><stop offset=".5" stop-color="${S.cibo[0]}" stop-opacity=".12"/><stop offset="1" stop-color="${S.cibo[0]}" stop-opacity="0"/></radialGradient></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}m)"/>`
    + `<rect y="${n(base)}" width="${w}" height="${n(h - base)}" fill="${S.legno}"/>`
    + `<rect x="${n(cx - fw / 2)}" y="${n(base - fh)}" width="${n(fw)}" height="${n(fh)}" fill="${S.creste[2]}"/>${pietre}`
    + `<path d="M${n(cx - ow / 2)},${n(base)} V${n(base - oh * 0.75)} Q${n(cx - ow / 2)},${n(base - oh)} ${n(cx)},${n(base - oh)} Q${n(cx + ow / 2)},${n(base - oh)} ${n(cx + ow / 2)},${n(base - oh * 0.75)} V${n(base)} Z" fill="${S.etichetta}"/>`
    + fiamma(cx - ow * 0.12, oh * 0.55, ow * 0.18, S.cibo[0], 0.95)
    + fiamma(cx + ow * 0.1, oh * 0.68, ow * 0.2, S.cibo[0], 0.95)
    + fiamma(cx - ow * 0.01, oh * 0.45, ow * 0.13, S.cibo[2], 0.95)
    + `<rect x="${n(cx - ow * 0.4)}" y="${n(base - oh * 0.1)}" width="${n(ow * 0.8)}" height="${n(oh * 0.1)}" rx="${n(oh * 0.05)}" fill="${S.legno}"/>`
    + `<rect x="${n(cx - ow * 0.3)}" y="${n(base - oh * 0.19)}" width="${n(ow * 0.6)}" height="${n(oh * 0.1)}" rx="${n(oh * 0.05)}" fill="${S.legno}" stroke="#000" stroke-opacity=".25"/>`
    + `<rect x="${n(cx - fw * 0.585)}" y="${n(base - fh - m * 0.045)}" width="${n(fw * 1.17)}" height="${n(m * 0.06)}" rx="${n(m * 0.01)}" fill="${S.legno}"/>`
    + `<rect x="${n(cx - fw * 0.3)}" y="${n(base - fh - m * 0.145)}" width="${n(m * 0.03)}" height="${n(m * 0.1)}" fill="${S.piatto}"/>`
    + `<circle cx="${n(cx - fw * 0.3 + m * 0.015)}" cy="${n(base - fh - m * 0.16)}" r="${n(m * 0.014)}" fill="${S.cibo[2]}"/>`
    + `<rect x="${n(cx + fw * 0.22)}" y="${n(base - fh - m * 0.19)}" width="${n(m * 0.07)}" height="${n(m * 0.145)}" rx="${n(m * 0.02)}" fill="${S.tessuto}"/>`
    + `<ellipse cx="${n(cx)}" cy="${n(base + (h - base) * 0.45)}" rx="${n(fw * 0.5)}" ry="${n((h - base) * 0.3)}" fill="${S.tessuto}" opacity=".5"/>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}l)"/>`;
}

function scenaPiste(S, w, h, seme) {
  const r = casuale(seme), id = "s" + (hash(seme) % 99999), m = Math.min(w, h);
  const lontane = cresta(r, w, h * 0.5, h * 0.3, 4);
  const minY = Math.min(...lontane.map((p) => p[1]));
  const lato = r() < 0.5 ? 1 : 0;
  // linea della pista: da un lato in alto verso il lato opposto in basso
  const y0 = h * (0.5 + r() * 0.06), y1 = h * (0.78 + r() * 0.06);
  const pista = `M-10,${n(y0)} C${n(w * 0.3)},${n(y0 - h * 0.04)} ${n(w * 0.55)},${n(y1 - h * 0.18)} ${n(w + 10)},${n(y1)} L${n(w + 10)},${n(h + 10)} L-10,${n(h + 10)} Z`;
  let tracce = "";
  for (let k = 0; k < 5; k++) {
    const t = 0.12 + k * 0.16 + r() * 0.04;
    tracce += `<path d="M${n(w * t * 0.2)},${n(y0 + (h - y0) * (0.2 + k * 0.17))} C${n(w * 0.3)},${n(y0 + (h - y0) * (0.12 + k * 0.17))} ${n(w * 0.6)},${n(y1 - h * 0.1 + (h - y1) * (0.2 + k * 0.2))} ${n(w)},${n(y1 + (h - y1) * (0.1 + k * 0.2))}" />`;
  }
  let alberi = "";
  for (let i = 0; i < 26; i++) {
    const x = r() * w, ybase = y0 + (y1 - y0) * (x / w) - h * 0.1 + r() * h * 0.05;
    const a = h * (0.05 + r() * 0.05);
    alberi += `M${n(x)},${n(ybase - a)} L${n(x - a * 0.3)},${n(ybase)} L${n(x + a * 0.3)},${n(ybase)} Z `;
  }
  // funivia: cavo e due piloni
  const ca = [-10, h * 0.14], cb = [w + 10, h * 0.34];
  const gx = w * (0.35 + r() * 0.3), gy = ca[1] + (cb[1] - ca[1]) * ((gx - ca[0]) / (cb[0] - ca[0]));
  const sciatore = (x, y, s, col) => `<g stroke-linecap="round"><path d="M${n(x - s * 0.5)},${n(y + s * 0.08)} L${n(x + s * 0.55)},${n(y - s * 0.02)}" stroke="#1b1b1b" stroke-width="${n(s * 0.05)}"/><path d="M${n(x - s * 0.05)},${n(y)} L${n(x + s * 0.02)},${n(y - s * 0.5)}" stroke="${col}" stroke-width="${n(s * 0.2)}"/><circle cx="${n(x + s * 0.05)}" cy="${n(y - s * 0.66)}" r="${n(s * 0.11)}" fill="${S.piatto}"/><path d="M${n(x + s * 0.1)},${n(y - s * 0.4)} L${n(x + s * 0.5)},${n(y + s * 0.05)}" stroke="#1b1b1b" stroke-width="${n(s * 0.025)}"/></g>`;
  return `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.cielo[0]}"/><stop offset=".75" stop-color="${S.cielo[1]}"/></linearGradient>`
    + `<linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.neve}"/><stop offset="1" stop-color="${S.nebbia}"/></linearGradient>`
    + `<clipPath id="${id}k"><path d="${percorso(lontane, w, h * 1.2)}"/></clipPath></defs>`
    + `<rect width="${w}" height="${h}" fill="url(#${id}c)"/>`
    + `<circle cx="${n(lato ? w * 0.78 : w * 0.22)}" cy="${n(h * 0.2)}" r="${n(m * 0.06)}" fill="${S.sole}"/>`
    + `<path d="${percorso(lontane, w, h * 1.2)}" fill="${S.creste[0]}"/>`
    + `<rect x="0" y="${n(minY)}" width="${w}" height="${n(h * 0.14)}" fill="${S.neve}" clip-path="url(#${id}k)" opacity=".92"/>`
    + `<path d="${percorso(cresta(r, w, h * 0.66, h * 0.16, 5), w, h * 1.2)}" fill="${S.creste[1]}"/>`
    + `<path d="${alberi}" fill="${S.creste[3]}"/>`
    + `<path d="${pista}" fill="url(#${id}n)"/>`
    + `<g fill="none" stroke="${S.creste[0]}" stroke-opacity=".35" stroke-width="${n(m * 0.004)}">${tracce}</g>`
    + `<path d="M${n(ca[0])},${n(ca[1])} L${n(cb[0])},${n(cb[1])}" stroke="${S.creste[3]}" stroke-width="${n(m * 0.004)}"/>`
    + `<path d="M${n(gx)},${n(gy)} v${n(m * 0.05)}" stroke="${S.creste[3]}" stroke-width="${n(m * 0.004)}"/><rect x="${n(gx - m * 0.035)}" y="${n(gy + m * 0.05)}" width="${n(m * 0.07)}" height="${n(m * 0.05)}" rx="${n(m * 0.008)}" fill="${S.tessuto}"/>`
    + sciatore(w * 0.28, y0 + (h - y0) * 0.42, m * 0.2, S.tessuto)
    + sciatore(w * 0.62, y1 - h * 0.04 + (h - y1) * 0.2, m * 0.26, S.cibo[3]);
}

function scenaTerrazza(S, w, h, seme) {
  const r = casuale(seme), id = "z" + (hash(seme) % 99999), m = Math.min(w, h);
  const sfondo = scenaPaesaggio(S, w, h * 0.75, seme + "v");
  const dy = h * 0.72;
  let assi = "";
  for (let k = 0; k <= 11; k++) { const x = (w * k) / 11; assi += `<line x1="${n(w / 2 + (x - w / 2) * 0.62)}" y1="${n(dy)}" x2="${n(x - (w / 2 - x) * 0.08)}" y2="${n(h)}"/>`; }
  let balaustra = "";
  const passi = Math.max(6, Math.round(w / (m * 0.12)));
  for (let k = 0; k <= passi; k++) balaustra += `<rect x="${n((w * k) / passi - m * 0.008)}" y="${n(dy - m * 0.14)}" width="${n(m * 0.016)}" height="${n(m * 0.14)}" fill="${S.legno}"/>`;
  const tx = w * (0.55 + r() * 0.15), ty = h * 0.86, tr = m * 0.15;
  const sedia = (x, verso) => `<rect x="${n(x - m * 0.05)}" y="${n(ty - m * 0.1)}" width="${n(m * 0.1)}" height="${n(m * 0.014)}" rx="${n(m * 0.006)}" fill="${S.tessuto}"/><rect x="${n(x - m * 0.05 + (verso > 0 ? m * 0.086 : 0))}" y="${n(ty - m * 0.22)}" width="${n(m * 0.014)}" height="${n(m * 0.126)}" fill="${S.tessuto}"/><path d="M${n(x - m * 0.04)},${n(ty - m * 0.086)} L${n(x - m * 0.05)},${n(ty + m * 0.02)} M${n(x + m * 0.04)},${n(ty - m * 0.086)} L${n(x + m * 0.05)},${n(ty + m * 0.02)}" stroke="${S.legno}" stroke-width="${n(m * 0.012)}"/>`;
  return `<svg x="0" y="0" width="${w}" height="${n(h * 0.75)}" viewBox="0 0 ${w} ${n(h * 0.75)}" preserveAspectRatio="xMidYMid slice">${sfondo}</svg>`
    + `<defs><linearGradient id="${id}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.legno}"/><stop offset="1" stop-color="${S.tavolo[1]}"/></linearGradient></defs>`
    + `<rect y="${n(dy)}" width="${w}" height="${n(h - dy)}" fill="url(#${id}d)"/>`
    + `<g stroke="#000" stroke-opacity=".2" stroke-width="${n(m * 0.003)}">${assi}</g>`
    + `<rect x="0" y="${n(dy - m * 0.15)}" width="${w}" height="${n(m * 0.02)}" fill="${S.legno}"/>` + balaustra
    + `<rect x="0" y="${n(dy - m * 0.022)}" width="${w}" height="${n(m * 0.022)}" fill="${S.legno}"/>`
    + sedia(tx - tr * 1.6, 1) + sedia(tx + tr * 1.6, -1)
    + `<ellipse cx="${n(tx)}" cy="${n(ty + m * 0.07)}" rx="${n(tr * 1.35)}" ry="${n(m * 0.025)}" fill="#000" opacity=".25"/>`
    + `<rect x="${n(tx - m * 0.012)}" y="${n(ty - m * 0.06)}" width="${n(m * 0.024)}" height="${n(m * 0.12)}" fill="${S.legno}"/>`
    + `<ellipse cx="${n(tx)}" cy="${n(ty - m * 0.07)}" rx="${n(tr)}" ry="${n(tr * 0.3)}" fill="${S.piatto}"/>`
    + `<ellipse cx="${n(tx - tr * 0.35)}" cy="${n(ty - m * 0.085)}" rx="${n(m * 0.025)}" ry="${n(m * 0.01)}" fill="${S.cibo[3]}"/><ellipse cx="${n(tx + tr * 0.3)}" cy="${n(ty - m * 0.08)}" rx="${n(m * 0.025)}" ry="${n(m * 0.01)}" fill="${S.cibo[2]}"/>`
    + `<rect x="${n(w * 0.06)}" y="${n(dy - m * 0.13)}" width="${n(m * 0.09)}" height="${n(m * 0.13)}" rx="${n(m * 0.012)}" fill="${S.tessuto}"/><circle cx="${n(w * 0.06 + m * 0.045)}" cy="${n(dy - m * 0.17)}" r="${n(m * 0.05)}" fill="${S.cibo[1]}"/><circle cx="${n(w * 0.06 + m * 0.02)}" cy="${n(dy - m * 0.145)}" r="${n(m * 0.032)}" fill="${S.cibo[1]}" opacity=".8"/>`;
}

/* ---------------------------------------------------------------
   VARIAZIONE: colore, specchio e inquadratura cambiano per ogni foto
   così due segnaposto vicini non sono mai uguali
   --------------------------------------------------------------- */
function rgbDaHex(hex) { const h = hex.replace("#", ""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); }
function ruota(hex, dh, dl, ds) {
  if (typeof hex !== "string" || hex[0] !== "#" || hex.length !== 7) return hex;
  const [R, G, B] = rgbDaHex(hex);
  const mx = Math.max(R, G, B), mn = Math.min(R, G, B), l = (mx + mn) / 2;
  let hh = 0, s = 0;
  if (mx !== mn) {
    const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    hh = mx === R ? (G - B) / d + (G < B ? 6 : 0) : mx === G ? (B - R) / d + 2 : (R - G) / d + 4; hh *= 60;
  }
  hh = (hh + dh + 360) % 360; s = Math.max(0, Math.min(1, s + ds)); const L = Math.max(0.04, Math.min(0.96, l + dl));
  const q = L < 0.5 ? L * (1 + s) : L + s - L * s, p = 2 * L - q;
  const f = (t) => { t = (t + 360) % 360; const v = t < 60 ? p + (q - p) * t / 60 : t < 180 ? q : t < 240 ? p + (q - p) * (240 - t) / 60 : p; return Math.round(v * 255).toString(16).padStart(2, "0"); };
  return "#" + f(hh + 120) + f(hh) + f(hh - 120);
}
function variaPalette(S, r) {
  const dh = (r() - 0.5) * 34, dl = (r() - 0.5) * 0.1, ds = (r() - 0.5) * 0.12;
  const c = (x) => (Array.isArray(x) ? x.map((y) => ruota(y, dh, dl, ds)) : ruota(x, dh, dl, ds));
  return { ...S, cielo: c(S.cielo), creste: c(S.creste), nebbia: c(S.nebbia), parete: c(S.parete), legno: c(S.legno), tavolo: c(S.tavolo), tessuto: c(S.tessuto), cibo: c(S.cibo) };
}

/* Sfondo calmo per le fasce con testo sopra (contatti): montagne morbide in tre strati, senza dettagli.
   Resta pulito anche quando viene ritagliato stretto su telefono. */
function mescola(a, b, t) {
  const A = rgbDaHex(a), B = rgbDaHex(b);
  return "#" + A.map((v, i) => Math.round((v + (B[i] - v) * t) * 255).toString(16).padStart(2, "0")).join("");
}
function scenaSfondo(S, w, h, seme) {
  const r = casuale(seme), id = "f" + (hash(seme) % 99999);
  const strati = [
    { picchi: [0.12, 0.3, 0.5, 0.72, 0.9], base: 0.6, amp: 0.3, colore: S.creste[0], nebbia: 0.45, neve: true },
    { picchi: [0.2, 0.42, 0.62, 0.84], base: 0.7, amp: 0.22, colore: S.creste[1], nebbia: 0.3, neve: false },
    { picchi: [0.06, 0.34, 0.56, 0.78, 0.98], base: 0.82, amp: 0.13, colore: S.creste[2], nebbia: 0.12, neve: false },
  ];
  let defs = `<linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.cielo[0]}"/><stop offset=".7" stop-color="${S.cielo[1]}"/><stop offset="1" stop-color="${S.nebbia}"/></linearGradient>`
    + `<radialGradient id="${id}s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${S.sole}" stop-opacity=".3"/><stop offset="1" stop-color="${S.sole}" stop-opacity="0"/></radialGradient>`;
  let corpo = `<rect width="${w}" height="${h}" fill="url(#${id}c)"/><circle cx="${n(w * (0.46 + r() * 0.08))}" cy="${n(h * 0.3)}" r="${n(h * 0.42)}" fill="url(#${id}s)"/>`;
  strati.forEach((L, k) => {
    const base = h * L.base, amp = h * L.amp;
    const pts = [[-w * 0.05, base]];
    L.picchi.forEach((px, i) => {
      const x = w * (px + (r() - 0.5) * 0.04), alto = amp * (0.72 + r() * 0.28);
      const xv = i === 0 ? w * 0.0 : (w * (L.picchi[i - 1] + px)) / 2;
      if (i > 0) pts.push([xv, base - amp * (0.05 + r() * 0.2)]);
      pts.push([x, base - alto]);
    });
    pts.push([w * 1.05, base]);
    const sotto = mescola(L.colore, S.nebbia, L.nebbia);
    defs += `<linearGradient id="${id}m${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.colore}"/><stop offset="1" stop-color="${sotto}"/></linearGradient>`;
    corpo += `<path d="M${n(-w * 0.05)},${n(h)} L${pts.map((p) => `${n(p[0])},${n(p[1])}`).join(" L")} L${n(w * 1.05)},${n(h)} Z" fill="url(#${id}m${k})"/>`;
    if (L.neve) {
      for (let i = 1; i < pts.length - 1; i++) {
        if (pts[i][1] > base - amp * 0.6) continue;
        const [x, y] = pts[i], a = pts[i - 1], b = pts[i + 1], t = 0.26;
        const lx = x + (a[0] - x) * t, ly = y + (a[1] - y) * t, rx = x + (b[0] - x) * t, ry = y + (b[1] - y) * t;
        corpo += `<polygon points="${n(lx)},${n(ly)} ${n(x)},${n(y)} ${n(rx)},${n(ry)} ${n((x + rx) / 2 + (lx - x) * 0.2)},${n(Math.max(ly, ry) + h * 0.012)}" fill="${S.neve}" opacity=".78"/>`;
      }
    }
  });
  corpo += `<path d="M0,${n(h)} V${n(h * 0.9)} C${n(w * 0.25)},${n(h * 0.86)} ${n(w * 0.45)},${n(h * 0.93)} ${n(w * 0.7)},${n(h * 0.89)} S${n(w * 0.95)},${n(h * 0.9)} ${n(w)},${n(h * 0.88)} V${n(h)} Z" fill="${S.creste[3]}"/>`;
  return `<defs>${defs}</defs>${corpo}`;
}

const SCENE = { paesaggio: scenaPaesaggio, interno: scenaInterno, tavola: scenaTavola, prodotto: scenaProdotto, vino: scenaVino, camino: scenaCamino, piste: scenaPiste, terrazza: scenaTerrazza, sfondo: scenaSfondo };

/* Segnaposto: solo il disegno. L'etichetta con nome e misura la scrive il motore in HTML
   (così resta piccola e uguale su ogni schermo, qualunque sia il ritaglio). */
function segnaposto(S, scena, w, h, file) {
  // sfondo calmo: sempre nei colori dello stile, senza variazioni, zoom o specchio
  if (scena === "sfondo") return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${scenaSfondo(S, w, h, "sfondo-" + file)}</svg>`;
  const r = casuale(file + scena + "variazione");
  const P = variaPalette(S, r);
  const corpo = (SCENE[scena] || scenaPaesaggio)(P, w, h, file + scena);
  const specchio = r() < 0.5;
  const z = 1 + r() * 0.42, fx = 0.15 + r() * 0.7, fy = 0.15 + r() * 0.7;
  const tx = -(z - 1) * w * fx, ty = -(z - 1) * h * fy;
  const dentro = specchio ? `<g transform="translate(${w} 0) scale(-1 1)">${corpo}</g>` : corpo;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><g transform="translate(${n(tx)} ${n(ty)}) scale(${n(z * 100) / 100})">${dentro}</g></svg>`;
}

module.exports = { stratiPaesaggio, segnaposto, casuale, cresta, percorso };

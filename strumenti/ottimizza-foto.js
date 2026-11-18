/* =====================================================================
   OTTIMIZZA LE FOTO  —  si usa solo quando cambiano le foto
   =====================================================================
   Prende le foto originali da materiale/ e crea in assets/img/foto/
   le versioni leggere (AVIF, WebP, JPG) in più larghezze, tutte con
   lo stesso trattamento colore (leggermente fredde, ombre blu inchiostro)
   così sembrano un unico servizio fotografico.

   Serve la libreria "sharp" (NON serve per generare il sito):
     npm i --no-save sharp   poi   node strumenti/ottimizza-foto.js
   Il risultato va salvato su GitHub: build.js usa i file già pronti.
   ===================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const RADICE = path.join(__dirname, "..");
const LIBERE = path.join(RADICE, "materiale", "foto-libere");
const USCITA = path.join(RADICE, "assets", "img", "foto");
const LARGHEZZE = [480, 800, 1200, 1800];

// nome nel sito  ←  file originale
const FOTO = {
  "fotovoltaico-tetto": "01-fotovoltaico-tetto.jpg",
  "casa-fotovoltaico": "02-casa-legno-fotovoltaico.jpg",
  "ingegnere-pannelli": "03-ingegnere-pannelli-solari.jpg",
  "ingegneri-progetto": "04-ingegneri-progetto.jpg",
  "termocamera": "05-termocamera.jpg",
  "condominio-facciate": "06-condominio-facciate.jpg",
  "condominio-balconi": "07-condominio-balconi.jpg",
  "progetto-tavolo": "08-progetto-tavolo.jpg",
  "torino-tetti": "09-torino-tetti.jpg",
  "torino-mole": "10-torino-mole-notte.jpg",
  "valvola": "11-valvola-termostatica.jpg",
  "estintore": "12-estintore.jpg",
  "cappotto": "13-isolamento-cappotto.jpg",
  "torino-panorama": "14-torino-panorama.jpg",
};

// Trattamento colore comune: meno saturazione, ombre sollevate verso il blu inchiostro
async function tratta(input) {
  const base = sharp(input).rotate().modulate({ saturation: 0.8, brightness: 1.01 });
  const { width, height } = await base.clone().metadata().then(async () => {
    const m = await sharp(input).metadata(); return { width: m.width, height: m.height };
  });
  const velo = await sharp({ create: { width, height, channels: 4, background: { r: 14, g: 34, b: 51, alpha: 0.55 } } }).png().toBuffer();
  const buf = await base.composite([{ input: velo, blend: "screen" }]).toBuffer();
  return { buf, width, height };
}

async function salva(buf, nome, larghezze, w0, h0) {
  const dims = {};
  for (const w of larghezze.filter((x) => x <= w0)) {
    const h = Math.round((h0 * w) / w0);
    const r = sharp(buf).resize(w, h);
    await r.clone().avif({ quality: 50, effort: 6 }).toFile(path.join(USCITA, `${nome}-${w}.avif`));
    await r.clone().webp({ quality: 72 }).toFile(path.join(USCITA, `${nome}-${w}.webp`));
    await r.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(path.join(USCITA, `${nome}-${w}.jpg`));
    dims[w] = h;
  }
  return dims;
}

(async () => {
  fs.mkdirSync(USCITA, { recursive: true });
  const indice = {};
  for (const [nome, file] of Object.entries(FOTO)) {
    const { buf, width, height } = await tratta(path.join(LIBERE, file));
    await salva(buf, nome, LARGHEZZE, width, height);
    indice[nome] = { w: width, h: height, larghezze: LARGHEZZE.filter((x) => x <= width) };
    console.log("✔", nome);
  }
  // Ritratto dell'ingegnere: 280 px, solo in piccolo. Nessun velo, solo una lieve desaturazione.
  const rit = path.join(RADICE, "materiale", "foto-originali", "ing-natale-lombardo.jpg");
  const m = await sharp(rit).metadata();
  const rb = await sharp(rit).modulate({ saturation: 0.9 }).toBuffer();
  await salva(rb, "ing-natale-lombardo", [m.width], m.width, m.height);
  indice["ing-natale-lombardo"] = { w: m.width, h: m.height, larghezze: [m.width] };
  fs.writeFileSync(path.join(USCITA, "indice.json"), JSON.stringify(indice, null, 2) + "\n");
  console.log("Fatto: assets/img/foto/indice.json");
})();

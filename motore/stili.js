/* =====================================================================
   I TRE STILI PRONTI  —  parte del motore, di solito non si tocca
   =====================================================================
   Si sceglie lo stile in dati-cliente.js con:  stile: "alpino-elegante"
   Ogni stile definisce colori, caratteri, angoli e i colori dei disegni
   segnaposto ("scena"). Per piccoli ritocchi a un solo cliente usa la
   sezione "tema" di dati-cliente.js, non questo file.

   Significato dei colori:
   primario        pulsanti e link
   suPrimario      testo scritto SOPRA un pulsante
   primarioScuro   fasce scure e footer
   suScuro         testo scritto sopra le fasce scure
   accento         etichette, numeri, stelle, dettagli
   accentoSuScuro  accento usato sopra le fasce scure
   sfondo / sfondoAlt / superficie   pagina, sezioni alternate, riquadri
   testo / testoSoft / bordo
   ===================================================================== */

module.exports = {
  "alpino-elegante": {
    descrizione: "Scuro e raffinato: hotel e ristoranti di livello",
    schema: "dark",
    colori: {
      primario: "#c9a66b", suPrimario: "#14191b", primarioScuro: "#090c0e", suScuro: "#ece6da",
      accento: "#d2b07a", accentoSuScuro: "#d2b07a",
      sfondo: "#0e1315", sfondoAlt: "#141b1e", superficie: "#182125",
      testo: "#ece6da", testoSoft: "#a9b0aa", bordo: "#2a3438",
    },
    caratteri: { titoli: "'Cormorant Garamond', 'Times New Roman', Georgia, serif", testo: "'Jost', system-ui, -apple-system, 'Segoe UI', sans-serif" },
    fileCaratteri: [
      { nome: "Cormorant Garamond", file: "cormorant.woff2", peso: "400 700" },
      { nome: "Jost", file: "jost.woff2", peso: "300 700" },
    ],
    arrotondamento: "3px",
    pesoTitoli: 500,
    scena: {
      cielo: ["#0a1216", "#33434c"], sole: "#e9d4a8", stelle: true,
      creste: ["#4a5a63", "#2e3c44", "#1b262c", "#0d1418"], neve: "#e6e1d6", nebbia: "#3a4a52",
      parete: ["#2c2621", "#1a1612"], legno: "#4e3a2a", tavolo: ["#2b241d", "#15110d"],
      tessuto: "#c9a66b", piatto: "#ebe4d6", cibo: ["#b06a3b", "#7d8c4a", "#c9a66b", "#8c3b2f"], etichetta: "#090c0e",
    },
  },

  "moderno-minimal": {
    descrizione: "Chiaro e pulito: negozi, uffici e servizi",
    schema: "light",
    colori: {
      primario: "#1b2b28", suPrimario: "#ffffff", primarioScuro: "#0f1816", suScuro: "#f5f6f4",
      accento: "#b4420e", accentoSuScuro: "#f2a27c",
      sfondo: "#ffffff", sfondoAlt: "#f3f4f2", superficie: "#ffffff",
      testo: "#111615", testoSoft: "#59615e", bordo: "#e4e7e5",
    },
    caratteri: { titoli: "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif", testo: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif" },
    fileCaratteri: [
      { nome: "Manrope", file: "manrope.woff2", peso: "400 800" },
      { nome: "Inter", file: "inter.woff2", peso: "400 700" },
    ],
    arrotondamento: "10px",
    pesoTitoli: 700,
    scena: {
      cielo: ["#5d7581", "#c9d6db"], sole: "#f4f6f6", stelle: false,
      creste: ["#a9bbc2", "#7f949c", "#52666e", "#2b3a40"], neve: "#ffffff", nebbia: "#dfe7ea",
      parete: ["#eceeec", "#d6dad8"], legno: "#b9a68e", tavolo: ["#e6e6e2", "#cdcdc7"],
      tessuto: "#b4420e", piatto: "#ffffff", cibo: ["#d98b4f", "#8fa35a", "#e3c16f", "#b4420e"], etichetta: "#111615",
    },
  },

  "caldo-rustico": {
    descrizione: "Legno e toni caldi: rifugi, agriturismi e artigiani",
    schema: "light",
    colori: {
      primario: "#7b3b1a", suPrimario: "#ffffff", primarioScuro: "#33200f", suScuro: "#f8efe2",
      accento: "#8f4f17", accentoSuScuro: "#e3a965",
      sfondo: "#f6efe4", sfondoAlt: "#ece0cc", superficie: "#fbf7f0",
      testo: "#2a1f17", testoSoft: "#665243", bordo: "#dccbb2",
    },
    caratteri: { titoli: "'Fraunces', Georgia, 'Times New Roman', serif", testo: "'Nunito Sans', system-ui, -apple-system, 'Segoe UI', sans-serif" },
    fileCaratteri: [
      { nome: "Fraunces", file: "fraunces.woff2", peso: "400 700" },
      { nome: "Nunito Sans", file: "nunito-sans.woff2", peso: "400 800" },
    ],
    arrotondamento: "18px",
    pesoTitoli: 600,
    scena: {
      cielo: ["#a8643a", "#f1d2a8"], sole: "#fff1d6", stelle: false,
      creste: ["#c39a80", "#946a52", "#62432f", "#38251a"], neve: "#fcf3e6", nebbia: "#f0d3b2",
      parete: ["#e8d3b5", "#cfae86"], legno: "#7a4b2a", tavolo: ["#8a5a36", "#5a381f"],
      tessuto: "#c45a2a", piatto: "#fbf5ea", cibo: ["#c2702f", "#7f8f3c", "#e0b45a", "#9b3424"], etichetta: "#33200f",
    },
  },
};

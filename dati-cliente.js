/* =====================================================================
   DATI DEL CLIENTE — StudioVela49
   =====================================================================
   Qui ci sono i dati che NON dipendono dalla lingua. I testi sono in
   lingue/it.js, en.js, fr.js.
   Regole: cambia solo quello che sta tra le virgolette "...",
   non cancellare virgole o parentesi. true = acceso, false = spento.
   ===================================================================== */
module.exports = {

  /* ---------------------------------------------------------------
     DOVE VIVE IL SITO
     percorsoBase: la sottocartella dell'indirizzo.
       "/studiovela49"  → anteprima su GitHub Pages
       ""               → dominio vero (www.studiovela49.it)
     (Netlify lo imposta da solo a "" con netlify.toml)
     --------------------------------------------------------------- */
  percorsoBase: "/studiovela49",
  sitoUrl: "https://griveljoseph3-ship-it.github.io",

  // true = anteprima: Google NON indicizza ("noindex" su tutte le pagine).
  // Mettere false solo quando il sito va sul dominio vero.
  anteprima: true,

  /* ---------------------------------------------------------------
     LO STUDIO
     --------------------------------------------------------------- */
  studio: {
    nome: "StudioVela49",
    ragioneSociale: "StudioVela49 — Ing. Natale Lombardo",
    partitaIva: "10354130014",
    fondazione: "2010",
  },

  contatti: {
    telefono: "+393392709272",            // per il link "chiama"
    telefonoVisibile: "+39 339 270 9272",
    whatsapp: "393392709272",              // [DA CONFERMARE] il cellulare ha WhatsApp?
    email: "info@studiovela49.it",
  },
  // Pulsante WhatsApp nella barra del telefono e nei contatti. false = nascosto
  whatsappAttivo: true,

  indirizzo: {
    via: "Via V. Vela, 49",
    cap: "10128",
    citta: "Torino",
    provincia: "TO",
  },

  /* ---------------------------------------------------------------
     MODULO PREVENTIVO
     servizio: "web3forms" | "formspree" | "netlify" | "mailto"
     chiave:   la chiave di Web3Forms (access key) o il codice del
               modulo Formspree (es. "xyzabcd").
     Finché la chiave è vuota o "[DA CONFERMARE]", il modulo apre
     l'email già compilata verso contatti.email.
     --------------------------------------------------------------- */
  modulo: {
    servizio: "web3forms",
    chiave: "[DA CONFERMARE]",
  },

  /* ---------------------------------------------------------------
     LINGUE (la prima è la principale)
     --------------------------------------------------------------- */
  lingue: [
    { codice: "it", cartella: "", locale: "it_IT", nome: "Italiano" },
    { codice: "en", cartella: "en", locale: "en_GB", nome: "English" },
    { codice: "fr", cartella: "fr", locale: "fr_FR", nome: "Français" },
  ],

  /* ---------------------------------------------------------------
     VECCHI INDIRIZZI del sito 2012 → nuova pagina (redirect 301)
     --------------------------------------------------------------- */
  vecchiIndirizzi: {
    "/index.php": "home",
    "/attivita/certificazioni_energetiche.php": "ape",
    "/attivita/diagnosi_energetiche.php": "diagnosi",
    "/attivita/impianti_solari.php": "solare",
    "/attivita/pratiche.php": "bonus",
    "/attivita/consulenza_progettazione_sostenibile.php": "studi",
    "/attivita/assistenza_amministratori_condominiali.php": "condominio",
    "/attivita/sicurezza_antincendio.php": "antincendio",
    "/info/chi_siamo.php": "chiSiamo",
    "/info/dove_siamo.php": "contatti",
    "/info/contatti.php": "contatti",
    "/info/link_utili.php": "servizi",
    "/info/curiosita.php": "home",
    "/news/": "home",
  },

  /* ---------------------------------------------------------------
     CREDITI DELLE FOTO (licenza Pexels) — vedi materiale/foto-libere/CREDITI.md
     --------------------------------------------------------------- */
  creditiFoto: [
    { nome: "fotovoltaico-tetto", autore: "Kabiur Rahman Riyad", fonte: "https://www.pexels.com/photo/solar-panel-on-rooftop-13223714/" },
    { nome: "casa-fotovoltaico", autore: "Robert Senz", fonte: "https://www.pexels.com/photo/wooden-house-with-solar-panels-on-roof-15319513/" },
    { nome: "ingegnere-pannelli", autore: "ThisIsEngineering", fonte: "https://www.pexels.com/photo/engineer-standing-among-solar-panels-19895867/" },
    { nome: "ingegneri-progetto", autore: "ThisIsEngineering", fonte: "https://www.pexels.com/photo/men-in-white-shirts-talking-about-project-19895868/" },
    { nome: "termocamera", autore: "cottonbro studio", fonte: "https://www.pexels.com/photo/man-behind-thermal-camera-7859781/" },
    { nome: "condominio-facciate", autore: "Grisha Besko", fonte: "https://www.pexels.com/photo/facade-of-tall-apartment-buildings-with-balconies-17095292/" },
    { nome: "condominio-balconi", autore: "Zeynep Öngel", fonte: "https://www.pexels.com/photo/facade-of-a-modern-apartment-building-with-balconies-in-city-20115862/" },
    { nome: "progetto-tavolo", autore: "Gustavo Fring", fonte: "https://www.pexels.com/photo/architect-working-on-a-project-6285159/" },
    { nome: "torino-tetti", autore: "Lulo", fonte: "https://www.pexels.com/photo/buildings-with-roof-tiles-in-a-city-7785642/" },
    { nome: "torino-mole", autore: "Stefano Parisi", fonte: "https://www.pexels.com/photo/mole-antonelliana-over-turin-buildings-at-night-10619684/" },
    { nome: "valvola", autore: "BOOM Photography", fonte: "https://www.pexels.com/photo/hand-of-a-person-turning-the-radiator-valve-12644994/" },
    { nome: "estintore", autore: "Jakub Zerdzicki", fonte: "https://www.pexels.com/photo/red-fire-extinguisher-on-concrete-wall-33533879/" },
    { nome: "cappotto", autore: "Erik Mclean", fonte: "https://www.pexels.com/photo/unrecognizable-worker-insulating-with-stone-wool-6124239/" },
    { nome: "torino-panorama", autore: "C1 Superstar", fonte: "https://www.pexels.com/photo/scenic-aerial-view-of-turin-cityscape-32457640/" },
  ],

  firma: "Sito realizzato da Joseph Grivel",
  privacyAggiornata: "18/11/2026",
};

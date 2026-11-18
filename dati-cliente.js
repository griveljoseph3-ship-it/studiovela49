/* =====================================================================
   DATI DEL CLIENTE  —  IL FILE CHE CAMBI PER OGNI NUOVO SITO
   =====================================================================
   Qui ci sono tutti i dati che NON dipendono dalla lingua:
   nome, contatti, indirizzo, orari, social, colori, caratteri,
   sezioni da accendere/spegnere e lingue del sito.

   I TESTI (titoli, descrizioni, piatti, camere, FAQ...) stanno invece
   nei file della cartella  lingue/  (it.js, en.js, fr.js).

   REGOLE PER NON ROMPERE NIENTE
   - Cambia solo quello che sta tra le virgolette "...".
   - Non cancellare virgole, parentesi { } [ ] o due punti.
   - true = acceso, false = spento (senza virgolette).
   - Dopo ogni modifica, Netlify ricostruisce il sito da solo
     (se c'è un errore, lo trovi nel "Deploy log" di Netlify).
   ===================================================================== */

module.exports = {

  /* ---------------------------------------------------------------
     0. MODALITÀ DIMOSTRAZIONE
     true  = mostra la striscia "Sito di esempio" e dice a Google
             di NON indicizzare il sito (usalo per la demo).
     false = sito vero di un cliente: Google lo indicizza.
     --------------------------------------------------------------- */
  demo: true,

  // Etichetta "FOTO SEGNAPOSTO · nome.jpg · misura" sui disegni che sostituiscono le foto mancanti.
  // true = utile mentre prepari il sito di un cliente; false = i disegni restano ma senza etichetta.
  etichetteSegnaposto: false,

  /* ---------------------------------------------------------------
     1. L'ATTIVITÀ
     --------------------------------------------------------------- */
  attivita: {
    nome: "Maison Aurore",                 // nome mostrato ovunque nel sito
    ragioneSociale: "Maison Aurore s.n.c. (attività di esempio)", // nome legale, va nel footer e nella privacy
    partitaIva: "IT00000000000",           // OBBLIGATORIA per legge nel sito di un'azienda italiana
    // Tipo di attività per Google (schema.org). Scegline uno:
    // Restaurant, Hotel, BedAndBreakfast, Store, AutoRepair, ExerciseGym,
    // SkiResort, SportsActivityLocation, ProfessionalService, LocalBusiness
    tipoSchema: "Restaurant",
    fasciaPrezzo: "€€",                    // €, €€, €€€ (per Google)
    cucina: "Valdostana, Alpina",          // solo ristoranti/rifugi; altrimenti lascia ""
    cin: "IT007022A1XXXXXXXX",             // solo strutture ricettive (hotel, B&B, case vacanza): Codice Identificativo Nazionale, va mostrato per legge. "" = non mostrato
  },

  /* ---------------------------------------------------------------
     2. INDIRIZZO DEL SITO (senza la barra / finale)
     Serve per Google, la mappa del sito e le anteprime social.
     Mettilo appena conosci il dominio (es. "https://www.rifugiobianco.it").
     --------------------------------------------------------------- */
  sitoUrl: "https://sito-base.netlify.app",

  /* ---------------------------------------------------------------
     3. CONTATTI
     --------------------------------------------------------------- */
  contatti: {
    telefono: "+390165000000",             // per il link "chiama": prefisso +39, senza spazi
    telefonoVisibile: "+39 0165 000 000",  // come lo legge il visitatore
    whatsapp: "393330000000",              // numero WhatsApp: 39 + numero, senza + e senza spazi. "" = nessun WhatsApp
    email: "info@maisonaurore.example",
  },

  /* ---------------------------------------------------------------
     4. INDIRIZZO FISICO
     Per latitudine/longitudine: apri Google Maps, tasto destro
     sul punto esatto, clicca sui numeri in alto per copiarli.
     --------------------------------------------------------------- */
  indirizzo: {
    via: "Strada di Esempio 12",
    cap: "11013",
    citta: "Courmayeur",
    provincia: "AO",
    regione: "Valle d'Aosta",
    nazione: "IT",
    latitudine: 45.7967,
    longitudine: 6.9686,
    ricercaMappa: "Courmayeur, AO",        // cosa cerca la mappa di Google (di solito: via + città)
  },

  /* ---------------------------------------------------------------
     5. ORARI
     Per ogni giorno: elenco di fasce "apertura-chiusura".
     []                                = chiuso
     ["09:00-18:00"]                   = orario continuato
     ["12:00-14:30", "19:00-22:00"]    = pranzo e cena
     --------------------------------------------------------------- */
  orari: {
    lun: [],
    mar: ["12:00-14:30", "19:00-22:00"],
    mer: ["12:00-14:30", "19:00-22:00"],
    gio: ["12:00-14:30", "19:00-22:00"],
    ven: ["12:00-14:30", "19:00-22:30"],
    sab: ["12:00-15:00", "19:00-22:30"],
    dom: ["12:00-15:00"],
  },

  /* ---------------------------------------------------------------
     6. SOCIAL E PROFILI ESTERNI
     Incolla il link completo. "" = l'icona non viene mostrata.
     --------------------------------------------------------------- */
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tripadvisor: "",
    google: "",        // link alla scheda Google Maps dell'attività (per le recensioni)
    booking: "",
  },

  /* ---------------------------------------------------------------
     7. PULSANTI DI PRENOTAZIONE / DISPONIBILITÀ
     Nessuna prenotazione online vera: i pulsanti aprono
     telefono, WhatsApp, email o un link esterno.
     --------------------------------------------------------------- */
  prenotazione: {
    telefono: true,       // mostra "Chiama"
    whatsapp: true,       // mostra "WhatsApp" (solo se c'è il numero sopra)
    email: true,          // mostra "Email"
    linkEsterno: "",      // es. link TheFork / Booking. "" = nessuno
  },
  disponibilitaCamere: {
    linkEsterno: "",      // es. link Booking.com della struttura. "" = il pulsante apre un'email già compilata
  },

  /* ---------------------------------------------------------------
     8. SEZIONI DI SETTORE (pagina Servizi)
     Accendi (true) solo quelle che servono al cliente.
     Ristorante/rifugio: menu  ·  Hotel/B&B: camere
     Negozio/artigiano: catalogo  ·  Officina/palestra/scuola sci/guide/uffici: listino + faq
     --------------------------------------------------------------- */
  sezioni: {
    menu: true,
    camere: true,
    catalogo: true,
    listino: false,
    faq: true,
    recensioni: true,          // recensioni in Home (usa SOLO recensioni vere del cliente!)
    whatsappFisso: true,       // pulsante verde WhatsApp sempre visibile in basso a destra
  },
  // Ordine in cui le sezioni compaiono nella pagina Servizi
  ordineSezioni: ["menu", "camere", "catalogo", "listino", "faq"],

  /* ---------------------------------------------------------------
     9. FOTO PRINCIPALI (file dentro assets/img/)
     Se una foto non c'è ancora, il sito mostra al suo posto un disegno
     segnaposto nei colori dello stile, con scritto il nome del file e la
     misura giusta. Appena carichi la foto con quel nome, il disegno sparisce.
     Misure di ogni posto: vedi COME-PERSONALIZZARE.md, punto 3.
     --------------------------------------------------------------- */
  immagini: {
    logo: "",                         // logo (meglio SVG o PNG trasparente, alto ~80 px). "" = mostra il nome scritto
    hero: "hero.jpg",                 // grande foto in cima alla Home (orizzontale, 2000x1250). Se manca: montagne disegnate a strati
    heroTelefono: "hero-telefono.jpg",// versione verticale per telefono (900x1400). Se manca: usa quella sopra
    heroVideo: "",                    // video di sfondo leggero in assets/video/ (MP4, max 15 secondi, sotto 4 MB). "" = nessun video
    chiSiamo: "chi-siamo.jpg",        // verticale 1200x1500
    chiSiamo2: "chi-siamo-2.jpg",     // quadrata 800x800, appoggiata sopra la prima. "" = nessuna
    sfondoContatti: "contatti.jpg",   // sfondo della fascia contatti in Home (orizzontale 2000x1250). "" = nessuna
    anteprimaSocial: "og-image.jpg",  // 1200x630: appare quando il link viene condiviso su WhatsApp/Facebook
  },
  // Foto della pagina Galleria, in ordine. Le descrizioni sono nei file lingua (galleria.descrizioni)
  // La griglia alterna riquadri grandi, verticali e orizzontali: l'ordine conta (vedi COME-PERSONALIZZARE.md).
  galleria: [
    "galleria-1.jpg", "galleria-2.jpg", "galleria-3.jpg",
    "galleria-4.jpg", "galleria-5.jpg", "galleria-6.jpg",
    "galleria-7.jpg", "galleria-8.jpg", "galleria-9.jpg",
  ],

  /* ---------------------------------------------------------------
     10. STILE  —  UNA PAROLA CAMBIA L'ASPETTO DI TUTTO IL SITO
     "alpino-elegante"  scuro e raffinato   (hotel, ristoranti di livello)
     "moderno-minimal"  chiaro e pulito      (negozi, uffici, servizi)
     "caldo-rustico"    legno e toni caldi   (rifugi, agriturismi, artigiani)
     --------------------------------------------------------------- */
  stile: "alpino-elegante",

  // EFFETTI: true = acceso, false = spento.
  // Se il visitatore ha chiesto al telefono di ridurre le animazioni, si spengono comunque da soli.
  effetti: {
    profondita3d: true,   // montagne a strati che si muovono, carte che si inclinano, entrate in prospettiva
    animazioni: true,     // elementi che compaiono scorrendo, animazione del titolo
  },

  /* PERSONALIZZAZIONE FINE (facoltativa)
     Lascia "" per usare i valori dello stile scelto sopra.
     Compila solo quello che vuoi cambiare, es. primario: "#8a1c1c".
     Regola d'oro: testo e sfondo devono avere forte contrasto (vedi guida). */
  tema: {
    colori: {
      primario: "",          // pulsanti e link
      primarioScuro: "",     // fasce scure e footer
      accento: "",           // etichette, stelle, numeri, dettagli
      sfondo: "",            // sfondo della pagina
      sfondoAlt: "",         // sfondo delle sezioni alternate
      testo: "",             // testo normale
      testoSoft: "",         // testo secondario
      bordo: "",             // linee e bordi sottili
    },
    caratteri: {
      titoli: "",            // es. "'Playfair Display', Georgia, serif"
      testo: "",
    },
    // File dei caratteri in assets/font/ (da https://gwfh.mranftl.com/fonts). [] = quelli dello stile
    fileCaratteri: [],
    arrotondamento: "",      // angoli: "0px" squadrati ... "24px" molto tondi. "" = quello dello stile
  },

  /* ---------------------------------------------------------------
     11. LINGUE
     La PRIMA è la lingua principale (sta nella cartella principale).
     Per aggiungerne una: copia lingue/en.js in lingue/de.js,
     traducilo e aggiungi qui una riga come le altre.
     --------------------------------------------------------------- */
  lingue: [
    { codice: "it", cartella: "",   locale: "it_IT", nome: "Italiano" },
    { codice: "en", cartella: "en", locale: "en_GB", nome: "English" },
    { codice: "fr", cartella: "fr", locale: "fr_FR", nome: "Français" },
  ],

  /* ---------------------------------------------------------------
     12. FIRMA NEL FOOTER (la tua pubblicità!)
     --------------------------------------------------------------- */
  firma: {
    testo: "Sito realizzato da Joseph",
    link: "",   // il tuo sito o profilo Instagram. "" = solo testo
  },

  /* ---------------------------------------------------------------
     13. DATA DELL'INFORMATIVA PRIVACY (anno-mese-giorno)
     Aggiornala solo quando cambi davvero il testo della privacy.
     --------------------------------------------------------------- */
  privacyAggiornata: "2026-10-23",
};

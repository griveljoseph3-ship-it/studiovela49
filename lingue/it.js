/* =====================================================================
   TESTI IN ITALIANO
   =====================================================================
   Qui c'è tutto quello che il visitatore LEGGE in questa lingua.
   - Cambia solo il testo tra le virgolette "...".
   - Se nel testo ti serve una virgoletta, usa quella tipografica ’ o “ ”.
   - Puoi usare <strong>parola</strong> per il grassetto.
   - Queste parole tra graffe vengono sostituite in automatico con i dati
     di dati-cliente.js:  {nome}  {citta}  {telefono}  {email}
     {indirizzo}  {ragioneSociale}  {piva}
   - "percorso" è il pezzo di indirizzo della pagina (es. /chi-siamo/):
     solo lettere minuscole, numeri e trattini, niente spazi.
   - Le parti delle sezioni spente in dati-cliente.js (es. listino)
     possono restare qui: semplicemente non vengono mostrate.
   ===================================================================== */

module.exports = {

  /* ---------- NOMI DELLE PAGINE, INDIRIZZI E TESTI PER GOOGLE ----------
     titolo      = il titolo che appare su Google e nella scheda del browser (max ~60 caratteri)
     descrizione = la frase sotto il titolo su Google (circa 140-160 caratteri)
     menu        = la voce nel menu del sito                                   */
  pagine: {
    home:     { percorso: "",               menu: "Home",      titolo: "{nome} – Ristorante, camere e bottega a {citta}", descrizione: "Cucina valdostana, camere con vista sul Monte Bianco e prodotti tipici a {citta}. Dal 1962 una casa di famiglia ai piedi delle Alpi." },
    chiSiamo: { percorso: "chi-siamo",      menu: "Chi siamo", titolo: "Chi siamo – La nostra storia dal 1962", descrizione: "Tre generazioni, una vecchia grange in legno e pietra e la passione per la cucina di montagna: scopri la storia di {nome} a {citta}." },
    servizi:  { percorso: "servizi",        menu: "Servizi",   titolo: "Menu, camere e bottega", descrizione: "Il menu con i piatti della tradizione valdostana, le camere con vista sul Monte Bianco e i prodotti tipici della nostra bottega a {citta}." },
    galleria: { percorso: "galleria",       menu: "Galleria",  titolo: "Galleria fotografica", descrizione: "Le foto di {nome}: la sala, le camere, i piatti e le montagne di {citta} in ogni stagione." },
    contatti: { percorso: "contatti",       menu: "Contatti",  titolo: "Contatti, orari e come arrivare", descrizione: "Telefono, WhatsApp, email, orari di apertura e mappa per raggiungere {nome} a {citta}. Scrivici per prenotare o chiedere informazioni." },
    privacy:  { percorso: "privacy-cookie", menu: "Privacy e cookie", titolo: "Privacy e cookie", descrizione: "Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito di {nome}." },
    grazie:   { percorso: "grazie",         menu: "Grazie",    titolo: "Messaggio inviato", descrizione: "Grazie per averci scritto." },
    errore:   { percorso: "",               menu: "Errore",    titolo: "Pagina non trovata", descrizione: "La pagina che cerchi non esiste." },
  },

  /* ---------- PICCOLI TESTI DELL'INTERFACCIA ---------- */
  ui: {
    saltaAlContenuto: "Vai al contenuto",
    menuApri: "Apri il menu",
    menuChiudi: "Chiudi il menu",
    lingua: "Lingua",
    chiama: "Chiama",
    whatsapp: "WhatsApp",
    email: "Email",
    contattaci: "Contattaci",
    scopriDiPiu: "Scopri di più",
    indirizzo: "Indirizzo",
    orari: "Orari",
    chiuso: "Chiuso",
    oggi: "Oggi",
    giorni: { lun: "Lunedì", mar: "Martedì", mer: "Mercoledì", gio: "Giovedì", ven: "Venerdì", sab: "Sabato", dom: "Domenica" },
    indicazioni: "Indicazioni stradali",
    seguici: "Seguici",
    partitaIva: "P.IVA",
    cin: "CIN",
    preferenzeCookie: "Preferenze cookie",
    chiudi: "Chiudi",
    precedente: "Foto precedente",
    successiva: "Foto successiva",
    ingrandisci: "Apri la foto a tutto schermo",
    stelle: "{n} stelle su 5",
    whatsappFisso: "Scrivici su WhatsApp",
    demo: "Sito di esempio",
    linkEsterno: "(si apre in una nuova scheda)",
    prenota: "Prenota",
    scorri: "Scorri",
    pausa: "Metti in pausa",
    riproduci: "Riprendi",
    recPrecedente: "Recensione precedente",
    recSuccessiva: "Recensione successiva",
    recensioni: "Recensioni",
  },

  /* ---------- BANNER COOKIE E MAPPA ---------- */
  cookie: {
    testo: "Usiamo solo cookie tecnici. Con il tuo consenso carichiamo anche la mappa di Google, che può usare cookie di terze parti.",
    accetta: "Accetta",
    rifiuta: "Rifiuta",
    info: "Leggi l'informativa",
  },
  mappa: {
    titolo: "Mappa di Google con la posizione di {nome}",
    testo: "La mappa è fornita da Google e viene caricata solo con il tuo consenso.",
    pulsante: "Mostra la mappa",
    apriInMaps: "Apri in Google Maps",
  },

  /* ---------- HOME ---------- */
  home: {
    heroEtichetta: "{citta} · Valle d'Aosta",
    heroTitolo: "{nome}",
    heroSottotitolo: "Cucina valdostana, camere con vista sul Monte Bianco e una piccola bottega di prodotti di montagna. Dal 1962.",
    pulsantePrincipale: "Contattaci",
    pulsanteSecondario: "Scopri il menu",
    puntiForzaTitolo: "Perché sceglierci",
    puntiForzaIntro: "Da tre generazioni accogliamo chi arriva in montagna come si accoglie un amico: con un piatto caldo, una camera silenziosa e il tempo per godersi il panorama.",
    puntiForza: [
      { icona: "montagna", titolo: "Vista sul Monte Bianco", testo: "Dalla sala e da ogni camera si vedono le cime più alte d'Europa." },
      { icona: "foglia",   titolo: "Prodotti del territorio", testo: "Fontina, lardo, mieli e vini da oltre 40 piccoli produttori della Valle." },
      { icona: "fuoco",    titolo: "Cucina di famiglia",      testo: "Ricette della nonna, cotte piano sul fuoco a legna come una volta." },
      { icona: "posizione",titolo: "A due passi dal centro",  testo: "10 minuti a piedi da via Roma, con parcheggio privato gratuito." },
    ],
    anteprimaTitolo: "Cosa offriamo",
    anteprimaIntro: "Tre modi per vivere la montagna: a tavola, in camera e portandola a casa.",
    anteprima: [
      { titolo: "La cucina",  testo: "Piatti della tradizione valdostana preparati con ingredienti di stagione.", foto: "anteprima-1.jpg", ancora: "menu" },
      { titolo: "Le camere",  testo: "Tre camere in legno di larice, tutte con vista sulle montagne e colazione inclusa.", foto: "anteprima-2.jpg", ancora: "camere" },
      { titolo: "La bottega", testo: "Formaggi, salumi e liquori dei produttori che serviamo ogni giorno a tavola.", foto: "anteprima-3.jpg", ancora: "catalogo" },
    ],
    recensioniTitolo: "Dicono di noi",
    recensioni: [
      { testo: "La migliore zuppa valpellinentze mai mangiata. Personale gentilissimo e una vista che toglie il fiato.", autore: "Giulia R.", provenienza: "Torino", stelle: 5, fonte: "Recensione di esempio" },
      { testo: "Camera pulita e calda, colazione abbondante con torte fatte in casa. Torneremo per la stagione sciistica!", autore: "Marc D.", provenienza: "Lyon", stelle: 5, fonte: "Recensione di esempio" },
      { testo: "Atmosfera di famiglia vera. Abbiamo portato a casa fontina e génépy dalla bottega: ottimi.", autore: "Sarah T.", provenienza: "London", stelle: 4, fonte: "Recensione di esempio" },
    ],
    contattiTitolo: "Vieni a trovarci",
    contattiTesto: "Per prenotare un tavolo o una camera chiamaci, scrivici su WhatsApp o mandaci un'email: rispondiamo in giornata.",
  },

  /* ---------- CHI SIAMO ---------- */
  chiSiamo: {
    etichetta: "La nostra storia",
    titolo: "Una casa di famiglia ai piedi del Monte Bianco",
    intro: "Nel 1962 nonna Aurore trasformò il vecchio granaio di famiglia in una piccola locanda per gli alpinisti di passaggio. Oggi la terza generazione porta avanti la stessa idea: accogliere chi arriva come si accoglie un amico.",
    paragrafi: [
      "La casa è una grange del Settecento in pietra e legno di larice, restaurata mantenendo travi, pavimenti e la grande stufa in pietra ollare che scalda ancora la sala.",
      "In cucina usiamo quasi solo prodotti della Valle d'Aosta: la fontina degli alpeggi di Val Ferret, il lardo di Arnad, le verdure dell'orto dietro casa. Il menu cambia con le stagioni, perché in montagna è la natura a decidere.",
      "Al piano di sopra ci sono tre camere, ognuna dedicata a una montagna che si vede dalla finestra. E all'ingresso una piccola bottega, dove trovi i prodotti che serviamo a tavola.",
    ],
    citazione: { testo: "In montagna si diventa amici in fretta: basta un piatto caldo e una finestra sulle cime.", autore: "Aurore, fondatrice" },
    numeri: [
      { valore: "1962", etichetta: "anno di apertura" },
      { valore: "3",    etichetta: "generazioni in cucina" },
      { valore: "40+",  etichetta: "produttori locali" },
      { valore: "3",    etichetta: "camere con vista" },
    ],
    finaleTitolo: "Vuoi conoscerci di persona?",
    finaleTesto: "Passa a trovarci o scrivici: saremo felici di consigliarti un piatto, una camera o una passeggiata.",
  },

  /* ---------- PAGINA SERVIZI ---------- */
  servizi: {
    etichetta: "{nome}",
    titolo: "Cucina, camere e bottega",
    intro: "Tutto quello che puoi trovare da noi: scegli la sezione che ti interessa.",
  },

  /* ---------- SEZIONE: MENU (ristoranti, rifugi) ---------- */
  menu: {
    titolo: "Il menu",
    intro: "Piatti della tradizione valdostana, preparati ogni giorno con ingredienti di stagione.",
    categorie: [
      { nome: "Antipasti", piatti: [
        { nome: "Tagliere della Valle", descrizione: "Lardo di Arnad DOP, mocetta, boudin, fontina DOP e miele di castagno", prezzo: "€ 16" },
        { nome: "Tomini al forno", descrizione: "Con miele di montagna e noci tostate", prezzo: "€ 12", veg: true },
      ]},
      { nome: "Primi", piatti: [
        { nome: "Zuppa alla valpellinentze", descrizione: "Pane nero, cavolo verza, fontina e brodo di carne", prezzo: "€ 15" },
        { nome: "Gnocchi di patate al ragù di cervo", descrizione: "Gnocchi fatti a mano, ragù cotto per sei ore", prezzo: "€ 17" },
        { nome: "Polenta concia", descrizione: "Polenta di mais macinato a pietra, fontina e burro di malga", prezzo: "€ 14", veg: true },
      ]},
      { nome: "Secondi", piatti: [
        { nome: "Carbonade valdostana", descrizione: "Manzo cotto nel vino rosso con spezie, servito con polenta", prezzo: "€ 22" },
        { nome: "Costoletta alla valdostana", descrizione: "Vitello impanato con fontina e prosciutto crudo", prezzo: "€ 24" },
        { nome: "Trota di torrente alle erbe", descrizione: "Con patate di montagna al forno", prezzo: "€ 21" },
      ]},
      { nome: "Dolci", piatti: [
        { nome: "Panna cotta al génépy", descrizione: "Con frutti di bosco", prezzo: "€ 7", veg: true },
        { nome: "Monte Bianco", descrizione: "Purea di castagne e panna montata", prezzo: "€ 8", veg: true },
      ]},
    ],
    legenda: "V = piatto vegetariano",
    nota: "Coperto € 3. Informazioni sugli allergeni disponibili su richiesta al personale.",
    prenotaTitolo: "Prenota un tavolo",
    prenotaTesto: "Consigliata la prenotazione, soprattutto nei fine settimana e in alta stagione.",
    messaggioWhatsapp: "Ciao! Vorrei prenotare un tavolo da {nome}.",
    oggettoEmail: "Prenotazione tavolo",
  },

  /* ---------- SEZIONE: CAMERE (hotel, B&B, rifugi) ---------- */
  camere: {
    titolo: "Le camere",
    intro: "Tre camere calde e silenziose, arredate in legno di larice. Colazione con torte fatte in casa inclusa.",
    elenco: [
      { nome: "Camera Dente del Gigante", foto: "camera-1.jpg", descrizione: "Camera matrimoniale con grande finestra sul Monte Bianco.", ospiti: "2 ospiti", dotazioni: ["Vista Monte Bianco", "Bagno privato", "Wi-Fi", "Colazione inclusa"], prezzo: "da € 140 / notte" },
      { nome: "Suite Grandes Jorasses", foto: "camera-2.jpg", descrizione: "Suite su due livelli con zona giorno, ideale per famiglie.", ospiti: "fino a 4 ospiti", dotazioni: ["Soggiorno", "Vasca da bagno", "Wi-Fi", "Colazione inclusa"], prezzo: "da € 220 / notte" },
      { nome: "Camera Val Ferret", foto: "camera-3.jpg", descrizione: "Camera matrimoniale con balcone privato sul bosco.", ospiti: "2 ospiti", dotazioni: ["Balcone", "Bagno privato", "Wi-Fi", "Colazione inclusa"], prezzo: "da € 160 / notte" },
    ],
    pulsante: "Verifica disponibilità",
    oggettoEmail: "Richiesta disponibilità – {camera}",
    corpoEmail: "Buongiorno, vorrei sapere se la {camera} è disponibile.\nDate di arrivo e partenza: \nNumero di ospiti: \n",
    nota: "Imposta di soggiorno esclusa. Check-in dalle 15:00, check-out entro le 10:30.",
  },

  /* ---------- SEZIONE: CATALOGO (negozi, artigiani) ---------- */
  catalogo: {
    titolo: "La bottega",
    intro: "I prodotti dei nostri fornitori di fiducia, da portare a casa o regalare.",
    tutti: "Tutti",
    prodotti: [
      { nome: "Fontina DOP d'alpeggio", categoria: "Formaggi", prezzo: "€ 24 / kg", foto: "prodotto-1.jpg", descrizione: "Stagionata almeno 5 mesi in grotta." },
      { nome: "Lardo di Arnad DOP", categoria: "Salumi", prezzo: "€ 9 / 200 g", foto: "prodotto-2.jpg", descrizione: "Aromatizzato con erbe di montagna." },
      { nome: "Mocetta", categoria: "Salumi", prezzo: "€ 8 / 150 g", foto: "prodotto-3.jpg", descrizione: "Salume tipico, essiccato all'aria di montagna." },
      { nome: "Génépy artigianale", categoria: "Liquori", prezzo: "€ 22 / 50 cl", foto: "prodotto-4.jpg", descrizione: "Liquore d'erbe alpine, ricetta di famiglia." },
      { nome: "Miele millefiori di montagna", categoria: "Dolci", prezzo: "€ 9 / 500 g", foto: "prodotto-5.jpg", descrizione: "Raccolto sopra i 1.500 metri." },
      { nome: "Tegole valdostane", categoria: "Dolci", prezzo: "€ 7 / 200 g", foto: "prodotto-6.jpg", descrizione: "Biscotti sottili alle mandorle e nocciole." },
    ],
    pulsante: "Chiedi informazioni",
    messaggioWhatsapp: "Ciao! Vorrei informazioni su: {prodotto}",
    nota: "Prezzi IVA inclusa. Vendita solo in negozio: nessun pagamento online.",
  },

  /* ---------- SEZIONE: LISTINO (officine, palestre, scuole sci, guide, uffici) ---------- */
  listino: {
    titolo: "Esperienze e servizi",
    intro: "Organizziamo per i nostri ospiti alcune esperienze con partner di fiducia.",
    voci: [
      { nome: "Cena degustazione", descrizione: "Sei portate con abbinamento di vini valdostani", durata: "3 ore", prezzo: "€ 75 a persona" },
      { nome: "Ciaspolata con guida", descrizione: "Escursione con le racchette da neve in Val Ferret, attrezzatura inclusa", durata: "mezza giornata", prezzo: "€ 55 a persona" },
      { nome: "Transfer da/per Aosta", descrizione: "Servizio navetta su prenotazione", durata: "45 minuti", prezzo: "€ 60 a tratta" },
    ],
    nota: "Prezzi indicativi, da confermare al momento della prenotazione.",
  },

  /* ---------- SEZIONE: DOMANDE FREQUENTI ---------- */
  faq: {
    titolo: "Domande frequenti",
    domande: [
      { domanda: "Serve prenotare?", risposta: "Per il ristorante è consigliato, soprattutto il sabato e in alta stagione. Per le camere sì, sempre." },
      { domanda: "Avete piatti vegetariani o senza glutine?", risposta: "Sì: nel menu i piatti vegetariani sono segnati con la V. Per intolleranze e celiachia avvisaci quando prenoti." },
      { domanda: "C'è il parcheggio?", risposta: "Sì, abbiamo un parcheggio privato gratuito per i clienti del ristorante e delle camere." },
      { domanda: "Gli animali sono ammessi?", risposta: "I cani di piccola taglia sono i benvenuti in sala e in una delle camere, su richiesta." },
      { domanda: "Come si arriva senza auto?", risposta: "Dal centro di {citta} sono 10 minuti a piedi; in inverno passa qui davanti lo skibus gratuito." },
    ],
  },

  /* ---------- GALLERIA ---------- */
  galleria: {
    etichetta: "{nome}",
    titolo: "Galleria",
    intro: "Uno sguardo alla casa, alla cucina e alle montagne che ci circondano. Tocca una foto per ingrandirla.",
    // Una descrizione per ogni foto, nello STESSO ORDINE delle foto in dati-cliente.js.
    // Le descrizioni qui sotto raccontano le foto della demo (vedi FOTO-CREDITI.md).
    // Quando cambi le foto, RISCRIVILE: servono anche come testo alternativo per chi non vede l'immagine.
    descrizioni: [
      "Il Monte Bianco riflesso in un lago d'alta quota",
      "La seggiovia sopra le piste innevate",
      "Un tagliere di formaggi valdostani con un calice di rosso",
      "Il camino in pietra della sala, acceso nelle sere d'inverno",
      "La tavola in legno apparecchiata per la cena",
      "La terrazza con vista sulle montagne",
      "Una camera con la finestra sulle cime",
      "I boschi di larici in autunno, sopra la valle",
      "I vasetti di miele di montagna sugli scaffali della bottega",
    ],
  },

  /* ---------- CONTATTI ---------- */
  contatti: {
    etichetta: "{nome}",
    titolo: "Contatti",
    intro: "Chiamaci, scrivici su WhatsApp o compila il modulo: ti rispondiamo entro un giorno.",
    infoTitolo: "Dove siamo e quando",
    mappaTitolo: "Come arrivare",
  },

  /* ---------- MODULO CONTATTI ---------- */
  form: {
    titolo: "Scrivici un messaggio",
    nome: "Nome e cognome",
    email: "Email",
    telefono: "Telefono",
    facoltativo: "facoltativo",
    motivo: "Motivo del messaggio",
    motivi: ["Informazioni", "Prenotazione tavolo", "Disponibilità camere", "Bottega e prodotti", "Altro"],
    messaggio: "Messaggio",
    privacy: "Ho letto l'{linkPrivacy} e acconsento al trattamento dei miei dati per ricevere una risposta.",
    privacyLink: "informativa privacy",
    invia: "Invia messaggio",
    obbligatori: "I campi con * sono obbligatori.",
  },

  /* ---------- PAGINA DI RINGRAZIAMENTO ---------- */
  grazie: {
    titolo: "Grazie, messaggio ricevuto!",
    testo: "Ti risponderemo il prima possibile, di solito entro un giorno. Se è urgente, chiamaci.",
    torna: "Torna alla home",
  },

  /* ---------- PAGINA DI ERRORE 404 ---------- */
  errore: {
    titolo: "Pagina non trovata",
    testo: "Il link potrebbe essere sbagliato o la pagina è stata spostata.",
    torna: "Torna alla home",
  },

  /* ---------- PRIVACY E COOKIE ----------
     Modello conforme a GDPR (Reg. UE 2016/679), D.Lgs. 196/2003 e
     Linee guida cookie del Garante (10/06/2021). Va comunque verificato
     per ogni cliente: il responsabile legale è il cliente (titolare).   */
  privacy: {
    titolo: "Privacy e cookie",
    aggiornamento: "Ultimo aggiornamento: {data}",
    sezioni: [
      { titolo: "1. Chi tratta i tuoi dati", testo: "Il titolare del trattamento è <strong>{ragioneSociale}</strong>, {indirizzo}, P.IVA {piva}. Per qualsiasi domanda sui tuoi dati puoi scrivere a <a href=\"mailto:{email}\">{email}</a>." },
      { titolo: "2. Quali dati raccogliamo", testo: "<strong>Dati di navigazione:</strong> per funzionare e per sicurezza, il server che ospita il sito registra dati tecnici come indirizzo IP, data e ora della visita e pagine richieste.<br><strong>Dati che ci invii:</strong> se compili il modulo contatti raccogliamo nome, email, telefono (facoltativo) e il testo del messaggio. Se ci scrivi via email, telefono o WhatsApp trattiamo i dati che ci comunichi." },
      { titolo: "3. Perché li usiamo e su quale base", testo: "Usiamo i dati per rispondere alle tue richieste di informazioni, preventivi o prenotazioni (art. 6.1.b GDPR, misure precontrattuali richieste da te) e per proteggere il sito da abusi (art. 6.1.f GDPR, legittimo interesse). La mappa di Google viene caricata solo con il tuo consenso (art. 6.1.a GDPR). Non usiamo i tuoi dati per pubblicità e non li vendiamo." },
      { titolo: "4. È obbligatorio darci i dati?", testo: "No, ma senza nome, email e messaggio non possiamo risponderti." },
      { titolo: "5. Per quanto tempo li conserviamo", testo: "I messaggi ricevuti dal sito vengono conservati per il tempo necessario a gestire la richiesta e comunque non oltre 24 mesi, salvo obblighi di legge (per esempio fiscali) se la richiesta diventa un contratto." },
      { titolo: "6. A chi vengono comunicati", testo: "I dati possono essere trattati da fornitori che ci aiutano a gestire il sito, nominati responsabili del trattamento: <strong>Netlify, Inc.</strong> (ospitalità del sito e ricezione dei messaggi del modulo). Se accetti la mappa, <strong>Google</strong> riceve alcuni dati come titolare autonomo. Se ci scrivi su WhatsApp, il servizio è gestito da WhatsApp/Meta. Netlify e Google possono trasferire dati negli Stati Uniti sulla base del Data Privacy Framework UE-USA o delle Clausole Contrattuali Standard approvate dalla Commissione Europea." },
      { titolo: "7. I tuoi diritti", testo: "Puoi chiedere in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne l'uso, riceverli in formato portabile, opporti al trattamento e revocare il consenso (artt. 15-22 GDPR), scrivendo a <a href=\"mailto:{email}\">{email}</a>. Hai anche il diritto di presentare reclamo al Garante per la protezione dei dati personali (<a href=\"https://www.garanteprivacy.it\" rel=\"noopener\" target=\"_blank\">www.garanteprivacy.it</a>)." },
      { titolo: "8. Cookie e strumenti simili", testo: "<strong>Strumenti tecnici (sempre attivi):</strong> il sito salva nel tuo browser solo la tua scelta sui cookie, per 6 mesi. Non serve il consenso. Non usiamo cookie di profilazione né statistiche.<br><strong>Servizi di terze parti (solo con consenso):</strong> nella pagina Contatti, la mappa di Google Maps viene caricata solo se clicchi “Accetta” o “Mostra la mappa”. Google può allora installare cookie e raccogliere dati secondo la propria <a href=\"https://policies.google.com/privacy?hl=it\" rel=\"noopener\" target=\"_blank\">informativa</a>.<br><strong>Link esterni:</strong> i link a Instagram, Facebook o WhatsApp non caricano nulla finché non ci clicchi." },
      { titolo: "9. Come cambiare la tua scelta", testo: "Puoi cambiare idea quando vuoi con il link “Preferenze cookie” in fondo a ogni pagina, oppure cancellando i dati di navigazione dal tuo browser." },
    ],
  },
};

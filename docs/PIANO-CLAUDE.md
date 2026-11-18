# Piano di lavoro — nuovo sito StudioVela49

> Documento per Claude (Claude Code). Leggilo tutto prima di scrivere codice.
> Proprietario del progetto: **Joseph Grivel** (web designer, non programmatore: spiega in italiano semplice).
> Cliente: **Ing. Natale Lombardo — StudioVela49**, Via V. Vela 49, 10128 Torino.

---

## 0. In una frase

Trasformare un sito del 2012, non adatto al telefono e pieno di testi lunghi e scaduti, in un **sito vetrina moderno, pulito e affidabile per uno studio di ingegneria energetica di Torino**, costruito per far arrivare **richieste di preventivo**, in **italiano, inglese e francese**.

## 1. Situazione

- Il cliente ha accettato il lavoro il 18/11/2026 per **500 €** ("dargli un'immagine nuova e svecchiarlo"). Se il risultato è buono, presenterà Joseph ad altri professionisti: **questo sito è anche il nostro biglietto da visita**.
- Nelle email Joseph ha promesso: sito **pensato per il telefono**, **in italiano, inglese e francese**, **chiaro su tutti i servizi** (APE, diagnosi, solare, pratiche/detrazioni, amministratori di condominio, antincendio), una pagina **"Bonus e detrazioni"** e un modulo **"Richiedi un preventivo"**.
- Joseph ha chiesto al cliente logo, foto, eventuali modifiche ai testi, telefono/indirizzo/orari. **Il materiale non è ancora arrivato**: questa prima versione usa i dati del sito attuale e segna tutto il resto con **[DA CONFERMARE]**.
- Si fa prima il **sito base**. Le funzioni in più (sezione 10) si propongono dopo, a pagamento.

## 2. Cosa c'è nel repository

| Percorso | Contenuto |
|---|---|
| `/` (radice) | Il **sito base** di Joseph: generatore Node senza librerie (`build.js` → `dist/`), testi in `lingue/it.js`, `en.js`, `fr.js`, dati in `dati-cliente.js`, stili in `motore/stili.js` e `assets/css/stile.css`, funzioni in `assets/js/sito.js`. Oggi contiene l'esempio inventato "Maison Aurore" (ristorante). Leggi `README-SITO-BASE.md` e `COME-PERSONALIZZARE.md`. |
| `materiale/contenuti-sito-attuale.md` | **Tutti i testi e i dati veri** del sito attuale, già riassunti servizio per servizio, più l'elenco di cosa è rotto o scaduto. È la tua unica fonte di contenuti. |
| `materiale/foto-originali/` | Le foto del sito attuale (le più grandi disponibili, max 300×330 px) + `LEGGIMI.md` con cosa si può riusare. Utile davvero solo il ritratto `ing-natale-lombardo.jpg`. |
| `materiale/foto-libere/` | 14 foto Pexels ad alta risoluzione (2400 px) + `CREDITI.md`. |
| `materiale/documenti/` | PDF informativo sulle pratiche doganali per il fotovoltaico (listino vecchio, da non pubblicare). |
| `materiale/screenshot-sito-attuale/` | Com'è il sito oggi su computer e telefono (il "prima"). |

## 3. Tecnica

1. **Parti dal sito base**, che ha già: 3 lingue con `hreflang`, sitemap, robots, pagine privacy/cookie/404/grazie, banner cookie, menu da telefono, font ospitati sul sito.
2. **Puoi modificare tutto**, anche `build.js`, `motore/`, CSS e JS: il sito base è pensato per ristoranti e qui servono pagine servizi, un modulo preventivo e layout nuovi. Togli tutto ciò che riguarda Maison Aurore (menu, camere, catalogo, foto demo).
3. **Niente framework pesanti.** HTML, CSS e JS semplici generati da `build.js`. Per le animazioni CSS + `IntersectionObserver`; una libreria piccola solo se serve davvero.
4. **GitHub Pages:** il sito sarà su `https://griveljoseph3-ship-it.github.io/studiovela49/`, cioè **in una sottocartella**. Oggi il sito base usa percorsi che iniziano con `/` (es. `/assets/...`), che lì si romperebbero. Aggiungi in `dati-cliente.js` un'impostazione `percorsoBase` (`"/studiovela49"` per l'anteprima, `""` per il dominio vero) e usala in tutti i link, CSS, JS, sitemap, canonical e `hreflang`.
5. Aggiungi `.github/workflows/pages.yml`: su ogni push a `main` esegue `node build.js` e pubblica `dist/` con `actions/upload-pages-artifact` + `actions/deploy-pages`. Attiva Pages con *Source: GitHub Actions* (`gh api -X POST repos/griveljoseph3-ship-it/studiovela49/pages -f build_type=workflow`); se non hai il permesso, scrivi a Joseph i clic esatti.
6. Tieni `netlify.toml` funzionante: il sito definitivo potrebbe andare su Netlify o sull'hosting Aruba del cliente.
7. Mentre è un'anteprima: `noindex` su tutte le pagine (modalità `demo`), ma **senza** la striscia "sito dimostrativo" (è un cliente vero). Quando si passa al dominio vero si toglie il `noindex`.

## 4. Pubblico e obiettivo

Due pubblici diversi, da servire entrambi già dalla home:

- **Privati** (chi vende o affitta casa, chi vuole risparmiare in bolletta o fare lavori con i bonus): cercano "APE Torino", "certificazione energetica per vendere casa", "diagnosi energetica", "fotovoltaico", "bonus casa". Vogliono capire **cosa serve, quanto tempo ci vuole, chi viene a casa**, e chiedere un preventivo dal telefono in 1 minuto.
- **Professionisti** (amministratori di condominio, studi tecnici, titolari di attività soggette ad antincendio, proprietari di impianti fotovoltaici oltre 20 kWp): vogliono un **riferimento tecnico unico e affidabile** e le competenze (abilitazioni, iscrizioni).

**Obiettivo misurabile:** da ogni pagina, in un tocco, si deve arrivare a **chiamare**, **scrivere su WhatsApp** [DA CONFERMARE se il cellulare ha WhatsApp] o **compilare il modulo preventivo**.

## 5. Pagine (sito base)

Ogni pagina esiste in `/`, `/en/`, `/fr/`. Gli slug vanno tradotti (es. `/servizi/certificazione-energetica-ape/`, `/en/services/energy-performance-certificate/`, `/fr/services/diagnostic-de-performance-energetique/`).

| # | Pagina | Contenuto essenziale | Azione principale |
|---|---|---|---|
| 1 | **Home** | Apertura forte (Torino + energia), i 4 valori dello studio, servizi divisi **Privati / Professionisti**, perché sceglierci (sopralluogo sempre, un unico riferimento, ingegnere iscritto all'Ordine e abilitato antincendio), come funziona in 3 passi, chi è l'ing. Lombardo, FAQ brevi, modulo. | Richiedi un preventivo |
| 2 | **Servizi** (panoramica) | Tutti i servizi, raggruppati per pubblico. | Apri il servizio |
| 3 | **Certificazione energetica (APE)** | Quando serve (vendita, affitto, nuova costruzione, ristrutturazione), validità 10 anni, "sempre con sopralluogo", cosa preparare, FAQ. | Preventivo APE |
| 4 | **Diagnosi energetica** | Differenza APE/diagnosi con l'esempio dei due appartamenti, cosa si ottiene (punti deboli, interventi, costi-benefici). | Prenota un sopralluogo |
| 5 | **Impianti solari** | Fotovoltaico e solare termico: fattibilità, scelta, pratiche e incentivi; pratiche doganali per impianti oltre 20 kWp. Niente dati GSE del 2012. | Valuta il tuo impianto |
| 6 | **Bonus e detrazioni** (promessa nell'email) | Lo studio segue la pratica, l'APE post intervento, la scelta dell'intervento e il confronto dei preventivi; le parcelle sono detraibili. **Nessuna percentuale o scadenza** senza conferma: "le regole cambiano spesso, verifichiamo noi quali bonus valgono per il tuo caso". | Verifica il tuo bonus |
| 7 | **Amministratori di condominio** | Interlocutore unico, presenza in assemblea, contabilizzazione del calore, confronto preventivi. | Fissa un incontro |
| 8 | **Prevenzione incendi** | Professionista antincendio abilitato dal Ministero: SCIA, progetti, pratiche per le attività soggette. 3-4 frasi, niente articoli di legge. | Richiedi una consulenza |
| 9 | **Per studi tecnici** | Collaborazioni: progettazione sostenibile, bandi, rilievi, catasto, Legge 10, pratiche doganali. | Proponi una collaborazione |
| 10 | **Chi siamo** | Lo studio (dal 2010), l'ing. Natale Lombardo, formazione e competenze vere (dal CV), collaboratori esterni, i 4 valori. | Contattaci |
| 11 | **Contatti** | Modulo preventivo completo, telefono, email, indirizzo, mappa leggera, come arrivare (metro Vinzaglio), orari [DA CONFERMARE]. | Invia richiesta |
| — | Privacy, Cookie, Grazie, 404 | Dal sito base, adattate. Privacy secondo **GDPR** (non D.Lgs. 196/2003), titolare StudioVela49, P.IVA. | — |

**Non nel sito base:** News, Curiosità, Link utili (oggi vuote o vecchie). Diventano extra (sezione 10). Servizi minori (catasto, rilievi, linee vita anticaduta) vanno in una riga "Altri servizi" su Servizi e Chi siamo.

## 6. Direzione di design

**Parole chiave:** moderno, pulito, tecnico ma umano, affidabile, luminoso. Riferimento di qualità: siti di studi di architettura/ingegneria e di aziende energy-tech premium. **Non** il solito sito "pannelli solari e prato verde".

- **Palette (proposta):** blu inchiostro profondo (`#0E2233` circa) per testi e sezioni scure, bianco caldo/carta (`#F6F4EF`) come sfondo, **un solo accento energetico** ambra/sole (`#F2A541` circa) per pulsanti e dettagli. Verdi/gialli/rossi **solo** dentro il motivo della scala energetica. Contrasto AA ovunque.
- **Motivo grafico distintivo:** la **scala delle classi energetiche** (barre A4→G) usata come elemento visivo: divisori, indicatore di scorrimento, grafica dell'APE, sfondo dei numeri. Deve essere riconoscibile e coerente, non decorazione a caso.
- **Tipografia:** due font ospitati sul sito (licenza OFL): un sans-serif geometrico di carattere per i titoli grandi (es. Manrope, già nel sito base, o Space Grotesk / Instrument Sans) e un sans-serif molto leggibile per il testo (es. Inter, già presente). Titoli grandi, testo breve, molta aria.
- **Foto:** poche e grandi, con lo stesso trattamento colore (leggermente freddo e desaturato, ombre blu) così sembrano un unico servizio fotografico. Foto Torino (`09`, `10`, `14`) per l'identità locale. Ritratto dell'ingegnere piccolo e curato (è 280 px). **Mai** presentare persone delle foto Pexels come lo staff o i lavori dello studio.
- **Logo:** non esiste. Crea un **logotipo SVG semplice** ("StudioVela49" + piccolo segno, es. la "V" o la barra della classe energetica) e segnalo come proposta [DA CONFERMARE].
- **Ogni sezione con un layout diverso** (lezione del sito 4810: lì il primo design era "tutto uguale" ed è stato bocciato). Due sezioni consecutive non devono mai avere la stessa struttura. Esempi da alternare:
  - apertura a tutto schermo con foto e titolo enorme;
  - due colonne "Privati / Professionisti" a contrasto (chiaro/scuro);
  - griglia asimmetrica dei servizi (una scheda grande, altre piccole);
  - "come funziona" con **numeri giganti** 01-02-03 in orizzontale;
  - confronto **APE vs diagnosi** con i due appartamenti affiancati;
  - sezione divisa con immagine fissa e testo che scorre;
  - fascia scura con citazione/valori;
  - FAQ a fisarmonica pulita.
- Anche **ogni pagina servizio ha un'apertura diversa** (non lo stesso modello col testo cambiato), pur dentro lo stesso stile.
- **Movimento:** sobrio ed elegante. Titoli che entrano, barre della scala energetica che si riempiono, foto che si rivelano. Sempre leggero e **spento con `prefers-reduced-motion`**.

## 7. Conversione

- **Barra fissa in basso su telefono:** Chiama · WhatsApp [DA CONFERMARE] · Preventivo. Su computer pulsante "Richiedi un preventivo" sempre visibile nell'intestazione.
- **Un solo pulsante principale per schermata**, con testo d'azione specifico ("Richiedi il preventivo per l'APE", non "Scopri di più").
- **Modulo preventivo** (in Contatti e, versione corta, in fondo alle pagine servizio):
  - campi: Nome*, Email*, Telefono, Servizio* (menu: APE, Diagnosi, Solare, Bonus e detrazioni, Condominio, Antincendio, Studi tecnici, Altro), Tipo di immobile (appartamento, casa, condominio, attività), Comune, Messaggio, consenso privacy* (GDPR);
  - antispam con campo nascosto (honeypot), niente captcha fastidiosi;
  - invio: GitHub Pages non ha server. Usa **Formspree o Web3Forms** con l'indirizzo di destinazione `info@studiovela49.it`, lasciando la chiave in `dati-cliente.js` come `[DA CONFERMARE]`. Finché manca, il modulo apre l'email già compilata (mailto) e lo dice chiaramente. Se si pubblica su Netlify, supporta anche Netlify Forms;
  - dopo l'invio, pagina "Grazie" con tempi di risposta [DA CONFERMARE].
- **Elementi di fiducia veri:** iscrizione all'Ordine degli Ingegneri di Torino, certificatore della Regione Piemonte, Professionista antincendio abilitato, laurea al Politecnico, dal 2010, sopralluogo sempre. **Niente** recensioni, loghi di clienti, numeri ("+500 pratiche") o anni di esperienza inventati: se servono, metti uno spazio con [DA CONFERMARE].

## 8. Testi

- Riscrivi i testi del sito attuale (`materiale/contenuti-sito-attuale.md`) **più corti, chiari e utili**: frasi brevi, "tu"/"voi" coerente (proposta: **"tu"** per i privati nelle frasi d'azione, tono professionale; segnalo come scelta da confermare).
- Togli: riferimenti a leggi vecchie, dati del 2012, detrazioni fino al 2014, Skype, "Lorem ipsum", refusi.
- Esempio del tono giusto:
  - ❌ "La certificazione energetica attesta la prestazione o rendimento energetico di un edificio, cioè il fabbisogno annuo di energia necessaria per soddisfare i servizi di climatizzazione…"
  - ✅ "Devi vendere o affittare casa? Ti serve l'APE. Veniamo a vedere l'immobile, misuriamo, e in pochi giorni hai il certificato valido 10 anni." (tempi [DA CONFERMARE])
- **Inglese e francese**: traduzioni scritte bene, naturali, non parola per parola. Termini corretti: EN "Energy Performance Certificate (APE)", FR "attestation / diagnostic de performance énergétique (APE)". Spiega che lo studio lavora a Torino.

## 9. Qualità (criteri di accettazione)

- **Telefono prima di tutto:** controllo visivo a **390 px** e **1440 px** di ogni pagina, più 320 px per lo scorrimento laterale (non deve esserci mai).
- **Lighthouse** su telefono: Prestazioni **> 90**, Accessibilità **100** (minimo 95), Buone pratiche e SEO **100**. CLS **0**.
- **Accessibilità:** contrasto AA, tutto usabile da tastiera, focus visibile, testi alternativi in 3 lingue, etichette nei campi del modulo, zoom con le dita permesso.
- **SEO locale:**
  - titolo e descrizione unici per pagina e lingua (es. "Certificazione energetica APE a Torino | StudioVela49");
  - dati strutturati JSON-LD: `ProfessionalService` (o `LocalBusiness`) con nome, indirizzo, telefono, email, P.IVA (`vatID`), `areaServed` Torino [DA CONFERMARE l'area], `founder`/`Person` Natale Lombardo, `Service` per ogni servizio, `FAQPage` dove ci sono FAQ, `BreadcrumbList`;
  - `hreflang` IT/EN/FR + `x-default`, canonical, sitemap, Open Graph con immagine 1200×630;
  - redirect dai vecchi indirizzi (`/attivita/certificazioni_energetiche.php` → nuova pagina APE, ecc.) in `_redirects` e `.htaccess` per quando si va sul dominio vero.
- **Foto:** AVIF/WebP + JPG, misure responsive, `width`/`height` sempre, caricamento lento sotto la piega. Nessuna immagine originale sgranata in grande.
- **Nessun dato inventato.** Tutto ciò che manca è `[DA CONFERMARE]` nel sito e in `docs/DA-CONFERMARE.md`.

### Elenco iniziale [DA CONFERMARE]
1. Orari dello studio e se si riceve solo su appuntamento.
2. Il cellulare +39 339 270 9272 ha WhatsApp? Esiste un telefono fisso? Il fax è ancora attivo?
3. Logo (se esiste) e foto vere: studio, ingegnere in alta risoluzione, lavori fatti.
4. Zona servita (solo Torino? provincia? Piemonte?).
5. Servizi ancora attivi oggi (es. pratiche doganali, solare termico, linee vita, catasto).
6. Quali bonus/detrazioni segue oggi lo studio.
7. Tempi medi per un APE e per una diagnosi; prezzi o "a partire da" (se vuole pubblicarli).
8. Numeri di iscrizione (Ordine, albo certificatori, elenco antincendio).
9. Collaboratori da nominare o no.
10. Pagine Facebook/LinkedIn ancora attive.
11. Chiave Formspree/Web3Forms e indirizzo che riceve le richieste.
12. Tono "tu" o "Lei".
13. Recensioni Google vere (testo e nome), se vuole mostrarle.
14. Dominio e hosting finale (oggi studiovela49.it su Aruba) e chi gestisce il DNS.

## 10. Extra da proporre dopo (NON nel sito base)

Da tenere fuori dal lavoro attuale; Joseph li proporrà come aggiunte a pagamento. Il sito base deve però essere pronto ad accoglierli (struttura dati pulita, componenti riutilizzabili).

| Extra | Cosa fa | Perché conviene al cliente |
|---|---|---|
| Preventivo online guidato | Domande passo passo (tipo immobile, m², motivo dell'APE) e stima di prezzo indicativa | Più richieste e già qualificate |
| Blog "News e incentivi" | Articoli brevi su bonus, scadenze, obblighi (ritorna la sezione Curiosità) | Visibilità su Google e autorevolezza |
| Calendario prenotazione sopralluogo | Prenotazione online di sopralluoghi o call (Cal.com / Calendly) | Meno telefonate, più appuntamenti |
| Area riservata condomini | Accesso per amministratori/condomini a documenti, verbali tecnici, scadenze | Fidelizza gli amministratori |
| Simulatore risparmio fotovoltaico | Stima produzione e rientro dell'investimento | Contatti dai privati interessati al solare |
| Casi studio / lavori fatti | Schede prima/dopo con foto vere | Prova concreta della qualità |
| Recensioni Google sul sito | Mostrare le recensioni vere + invito a lasciarne | Fiducia |
| Profilo Google Business ottimizzato | Scheda Maps completa, foto, categorie, post | Più chiamate da "APE vicino a me" |
| Newsletter | Avvisi su nuovi bonus e scadenze | Contatto ricorrente con i clienti |
| WhatsApp Business / chat | Risposte rapide e messaggi automatici | Risposta più veloce |
| Statistiche e cookie avanzati | GA4 o Plausible con banner conforme | Sapere da dove arrivano i clienti |
| Messa online sul dominio | Migrazione su studiovela49.it, email, redirect, Search Console | Passaggio senza perdere posizioni su Google |

## 11. Modo di lavorare

1. Leggi questo piano, `materiale/contenuti-sito-attuale.md`, `materiale/foto-libere/CREDITI.md`, `materiale/foto-originali/LEGGIMI.md` e il codice del sito base.
2. Scrivi `docs/DESIGN.md` (palette, font, spaziature, layout per sezione, regole foto) **prima** del codice.
3. Lavora direttamente su `main`. **Fai commit e push spesso** (dopo ogni passo importante: design system, home, ogni gruppo di pagine, traduzioni, controlli). Se la sessione si interrompe, il lavoro deve essere già su GitHub.
4. Aggiorna `README.md` con: come provare il sito, come cambiare un testo, come pubblicare.
5. Alla fine: pubblica su GitHub Pages, verifica che il link funzioni davvero, e consegna come richiesto in `docs/PROMPT-CLAUDE.md`.

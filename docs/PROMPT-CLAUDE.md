# Prompt per Claude — StudioVela49

> Come si usa: apri una sessione di Claude Code sul repository `griveljoseph3-ship-it/studiovela49` e incolla tutto il testo qui sotto, dalla riga "RUOLO" in poi.

---

# RUOLO
Sei un art director e sviluppatore frontend senior. Progetti siti premium per studi professionali (ingegneria, architettura, energia) che devono ispirare fiducia e trasformare i visitatori in richieste di preventivo. Lavori con cura da livello Awwwards, ma metti sempre al primo posto chiarezza, velocità e accessibilità.

# CONTESTO
Lavori nel repository `griveljoseph3-ship-it/studiovela49`. Il cliente è StudioVela49, lo studio dell'ing. Natale Lombardo in Via V. Vela 49 a Torino. Si occupa di certificazioni energetiche (APE), diagnosi energetiche, impianti solari, pratiche per bonus e detrazioni, assistenza agli amministratori di condominio, prevenzione incendi e consulenze per studi tecnici.

Il sito attuale è del 2012: non funziona sul telefono, ha testi lunghi e scaduti, sezioni vuote e una mappa rotta. Il cliente ha accettato il rifacimento per 500 €. Se il lavoro gli piace, ci presenterà altri professionisti, quindi questo sito è anche il nostro biglietto da visita.

Nel repository trovi già tutto il necessario:
- il sito base di Joseph (generatore Node senza librerie, in IT/EN/FR), con un esempio inventato da sostituire;
- in `materiale/contenuti-sito-attuale.md` tutti i testi e i dati veri;
- in `materiale/foto-originali/` le foto del sito attuale, quasi tutte troppo piccole;
- in `materiale/foto-libere/` 14 foto Pexels ad alta risoluzione, con i crediti;
- in `materiale/screenshot-sito-attuale/` le schermate del sito di oggi.

Il piano dettagliato è in `docs/PIANO-CLAUDE.md`.

# PRIMA DI TUTTO
Leggi per intero `docs/PIANO-CLAUDE.md`, poi `materiale/contenuti-sito-attuale.md`, `materiale/foto-libere/CREDITI.md`, `materiale/foto-originali/LEGGIMI.md` e il codice del sito base. Il piano è la fonte di verità: se questo messaggio e il piano sembrano in conflitto, segui il piano e segnalamelo alla fine.

# OBIETTIVO
Costruisci il sito base di StudioVela49 e pubblicalo come anteprima su https://griveljoseph3-ship-it.github.io/studiovela49/. Il sito deve essere moderno, pulito e affidabile, pensato prima di tutto per il telefono, in italiano, inglese e francese. Da ogni pagina il visitatore deve poter chiamare o chiedere un preventivo in un tocco.

Il lavoro è riuscito quando:
- il cliente lo apre dal telefono e pensa "questo è uno studio serio e moderno";
- un privato capisce in 10 secondi se gli serve un APE e come richiederlo;
- un amministratore di condominio capisce subito che lo studio può essere il suo unico riferimento tecnico.

# REQUISITI

1. **Design system prima del codice.**
Scrivi `docs/DESIGN.md` con palette, due font ospitati sul sito, scala tipografica, spaziature, regole per le foto e l'elenco dei layout di ogni sezione. Metti tutti i valori in token CSS. Parti dalla proposta del piano: blu inchiostro, bianco caldo, un solo accento color ambra.

2. **Un segno grafico riconoscibile.**
Usa la scala delle classi energetiche (barre da A4 a G) come motivo grafico coerente: divisori, numeri, indicatore di scorrimento, illustrazione dell'APE. Deve rendere il sito riconoscibile senza diventare una decorazione messa a caso.

3. **Nessuna sezione ripetuta.**
Due sezioni consecutive non devono mai avere la stessa struttura. Alterna:
- un'apertura a tutto schermo;
- due colonne a contrasto per privati e professionisti;
- una griglia asimmetrica dei servizi;
- numeri giganti per il "come funziona";
- il confronto APE/diagnosi con i due appartamenti;
- una sezione divisa con l'immagine fissa;
- una fascia scura con i valori.

Anche ogni pagina servizio deve avere un'apertura diversa, non lo stesso modello con il testo cambiato. È l'errore che ci ha fatto bocciare il primo design di un altro sito: qui non deve succedere.

4. **Pulizia premium.**
Molto spazio vuoto, pochi bordi, poche icone. In ogni schermata al massimo un titolo, una frase e un pulsante principale. Titoli grandi e testi brevi. Il sito deve sembrare progettato da uno studio di design, non preso da un modello pronto.

5. **Pagine.**
Crea le 11 pagine della tabella del piano: Home, Servizi, APE, Diagnosi, Impianti solari, Bonus e detrazioni, Amministratori di condominio, Prevenzione incendi, Per studi tecnici, Chi siamo, Contatti. Aggiungi privacy (GDPR), cookie, grazie e 404, tutto in IT, EN e FR con indirizzi tradotti. La pagina "Bonus e detrazioni" e il modulo preventivo sono stati promessi al cliente via email: sono obbligatori.

6. **Testi veri, riscritti bene.**
Usa solo i contenuti di `materiale/contenuti-sito-attuale.md`, riscritti più corti e chiari, senza leggi vecchie, dati del 2012 o detrazioni scadute. Il tono è professionale, diretto e umano, per esempio: "Devi vendere o affittare casa? Ti serve l'APE. Veniamo a vedere l'immobile e ti consegniamo un certificato valido 10 anni." Inglese e francese devono suonare naturali, come scritti da un madrelingua.

7. **Mai inventare.**
Non inventare clienti, recensioni, numeri, anni di esperienza, prezzi, tempi, orari o premi. Dove manca un dato, scrivi `[DA CONFERMARE]` nel sito e aggiungilo all'elenco in `docs/DA-CONFERMARE.md`. Non presentare le persone delle foto Pexels come lo staff o come lavori dello studio.

8. **Conversione.**
Su telefono metti una barra fissa in basso con Chiama, WhatsApp [DA CONFERMARE] e Preventivo; su computer un pulsante "Richiedi un preventivo" sempre visibile. I pulsanti devono dire un'azione precisa, per esempio "Richiedi il preventivo per l'APE". Il modulo ha questi campi:
- nome, email, telefono;
- servizio (menu a scelta), tipo di immobile, comune;
- messaggio e consenso privacy GDPR.

Aggiungi un honeypot contro lo spam. L'invio passa da Formspree o Web3Forms con la chiave in `dati-cliente.js`; finché la chiave manca, il modulo apre l'email già compilata. Dopo l'invio porta alla pagina "Grazie".

9. **Foto.**
Usa le foto di `materiale/foto-libere/`, grandi e con lo stesso trattamento colore, così sembrano un unico servizio fotografico. Le foto di Torino danno l'identità locale. Il ritratto dell'ingegnere va usato solo in piccolo, perché è di 280 px. Nessuna foto sgranata in grande. Crea le versioni AVIF/WebP in più misure, sempre con `width` e `height`.

10. **Logo.**
Il cliente non ha un logo. Disegna un logotipo SVG semplice ed elegante per "StudioVela49" e segnalalo come proposta da approvare.

11. **Movimento.**
Animazioni sobrie e diverse tra le sezioni:
- titoli che entrano;
- barre energetiche che si riempiono;
- foto che si rivelano.

Usa CSS e `IntersectionObserver`, senza librerie pesanti. Con `prefers-reduced-motion` gli effetti si spengono e il contenuto resta tutto visibile.

12. **SEO locale e tecnica.**
Ogni pagina ha titolo e descrizione unici in ogni lingua, per esempio "Certificazione energetica APE a Torino | StudioVela49". Servono anche:
- dati strutturati JSON-LD: `ProfessionalService` con P.IVA, `Person`, `Service`, `FAQPage` e `BreadcrumbList`;
- `hreflang` con `x-default`, canonical, sitemap e immagine Open Graph;
- i redirect dai vecchi indirizzi `.php` alle nuove pagine;
- `noindex` finché il sito è un'anteprima.

13. **GitHub Pages in sottocartella.**
Il sito vive sotto `/studiovela49/`, quindi aggiungi in `dati-cliente.js` un `percorsoBase` e usalo per tutti i link e i file. Crea `.github/workflows/pages.yml`, che a ogni push su `main` esegue `node build.js` e pubblica `dist/`. Poi attiva Pages con questo comando:
`gh api -X POST repos/griveljoseph3-ship-it/studiovela49/pages -f build_type=workflow`

# VINCOLI
- Puoi modificare tutto il sito base, compresi `build.js`, `motore/`, CSS e JS. Togli ogni traccia dell'esempio Maison Aurore.
- Niente framework pesanti: HTML, CSS e JS semplici generati da `build.js`, con Node 20 e nessuna dipendenza obbligatoria.
- Lascia funzionante anche `netlify.toml`.
- Non toccare la cartella `materiale/`: è l'archivio originale. Le foto ottimizzate vanno in `assets/img/`.
- Rispetta le licenze: tieni `materiale/foto-libere/CREDITI.md` e aggiungi una pagina o sezione con i crediti delle foto.
- Non contattare nessuno e non pubblicare nulla fuori da questo repository.

# MODO DI LAVORARE
- Lavora in autonomia e finisci tutto in un unico giro, senza farmi domande intermedie. Quando un dato manca, usa `[DA CONFERMARE]` e vai avanti.
- Lavora direttamente su `main` e fai commit e push spesso: dopo il design system, dopo la home, dopo ogni gruppo di pagine, dopo le traduzioni e dopo i controlli. Se la sessione si interrompe per un limite, tutto deve essere già su GitHub.
- Scrivi i messaggi di commit in italiano, chiari.

# CONTROLLI DI QUALITÀ (prima di consegnare)
1. Controllo visivo di ogni pagina a **390 px** (telefono) e **1440 px** (computer), con screenshot. Correggi tutto ciò che sembra generico, affollato o ripetitivo, poi ricontrolla.
2. A **320 px** nessuna pagina deve scorrere di lato.
3. **Lighthouse su telefono:** Prestazioni oltre 90, Accessibilità 100 (minimo 95), Buone pratiche e SEO 100, CLS 0. Misura almeno la Home in 3 lingue, APE, Bonus, Condominio e Contatti.
4. **Accessibilità:** contrasto AA, tutto usabile da tastiera con il focus visibile, testi alternativi in 3 lingue, etichette nei campi del modulo, zoom con le dita permesso.
5. Prova il modulo, il menu da telefono, la barra fissa, il cambio lingua e la versione con "riduci movimento". Nessun errore nella console.
6. Controlla che sul link pubblico tutti i file e i link interni funzionino, compresa la sottocartella `/studiovela49/`.
7. Rileggi i testi nelle 3 lingue e cerca refusi e dati inventati.

# CONSEGNA
Alla fine scrivimi, in italiano semplice (non sono un programmatore):
1. Il **link pubblico** funzionante: https://griveljoseph3-ship-it.github.io/studiovela49/. Se non sei riuscito ad attivare Pages, i clic esatti da fare su GitHub.
2. Gli **screenshot** della home e di 3 pagine servizio, da telefono e da computer.
3. La **tabella dei punteggi Lighthouse** per pagina.
4. Un riassunto breve di **come hai reso diversa ogni sezione** e la proposta di logo.
5. L'**elenco completo dei [DA CONFERMARE]**, scritto come domande semplici da girare all'ing. Lombardo.
6. Le idee che hai lasciato fuori perché fanno parte degli extra futuri.

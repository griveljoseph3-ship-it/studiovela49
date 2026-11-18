# Come personalizzare il sito base

Questa guida ti spiega come trasformare il sito base nel sito di un nuovo cliente.
Non serve saper programmare: cambi testi tra virgolette, salvi, e Netlify fa il resto.

---

## 0. Come funziona (in 30 secondi)

```
dati-cliente.js   →  nome, contatti, orari, social, STILE, effetti 3D, sezioni accese/spente, lingue
lingue/it.js      →  tutti i testi in italiano (anche menu, camere, prodotti, FAQ, privacy)
lingue/en.js      →  tutti i testi in inglese
lingue/fr.js      →  tutti i testi in francese
assets/img/       →  le foto            assets/video/  →  l'eventuale video di sfondo
build.js e motore/ →  il "motore": NON toccarli (motore/stili.js contiene i 3 stili pronti)
```

Quando carichi le modifiche su GitHub, Netlify esegue `build.js`, che crea tutte le pagine
in tutte le lingue (con titoli Google, anteprime social, mappa del sito ecc.).

**Importante:** se apri i file HTML con doppio clic sul computer NON vedi il sito.
Il sito si vede su Netlify, dopo la pubblicazione.

### Regole d'oro per non rompere niente
- Cambia **solo** il testo tra le virgolette `"..."`.
- Non cancellare virgole `,`, parentesi `{ } [ ]` o due punti `:`.
- Se nel testo ti serve un apostrofo va benissimo (`l'attività`). Se ti servono le virgolette, usa quelle “curve”.
- `true` = acceso, `false` = spento (senza virgolette).
- Se qualcosa va storto, su Netlify vai su **Deploys → (l'ultimo) → Deploy log**: trovi scritto l'errore e la riga.
  Il sito online resta quello vecchio finché l'errore non è corretto, quindi il cliente non vede mai un sito rotto.

---

## 1. Cosa cambiare per un nuovo cliente (lista di controllo)

### In `dati-cliente.js`
| Sezione | Cosa fare |
|---|---|
| `demo` | Metti **`false`** per un cliente vero (altrimenti Google non lo indicizza e compare la striscia “sito dimostrativo”). |
| `attivita` | Nome, ragione sociale, **Partita IVA (obbligatoria per legge)**, tipo di attività per Google, fascia prezzo, tipo di cucina. Per hotel/B&B/case vacanza: il **CIN** (obbligatorio da mostrare). |
| `sitoUrl` | Il dominio vero del cliente, es. `https://www.rifugiobianco.it` (senza `/` finale). |
| `contatti` | Telefono (due versioni: per il link e per la lettura), numero WhatsApp, email. |
| `indirizzo` | Via, CAP, città, coordinate (da Google Maps: tasto destro sul punto → clicca i numeri). |
| `orari` | Le fasce orarie di ogni giorno. `[]` = chiuso. |
| `social` | I link completi. Lascia `""` per nascondere un'icona. |
| `prenotazione` | Quali pulsanti mostrare (Chiama / WhatsApp / Email) ed eventuale link esterno (TheFork, ecc.). |
| `sezioni` | Accendi le sezioni del settore del cliente (vedi punto 4). |
| `immagini` e `galleria` | I nomi dei file delle foto (vedi punto 3) ed eventuale video. |
| `stile` | Una parola: `alpino-elegante`, `moderno-minimal` o `caldo-rustico` (vedi punto 2). |
| `effetti` | 3D e animazioni accesi o spenti (vedi punto 2). |
| `tema` | Solo se vuoi ritoccare un colore o un font dello stile. Di solito resta tutto `""`. |
| `firma` | Il tuo nome/link in fondo al sito. |

### Nei file `lingue/it.js`, `en.js`, `fr.js`
Riscrivi i testi in quest'ordine: `pagine` (titoli e descrizioni per Google), `home`, `chiSiamo`,
le sezioni accese (`menu`, `camere`, `catalogo`, `listino`, `faq`), `galleria.descrizioni`, `contatti`.
La privacy di solito non va toccata: nome, indirizzo, P.IVA ed email si aggiornano da soli.

**Parole automatiche:** nei testi puoi scrivere `{nome}`, `{citta}`, `{telefono}`, `{email}`, `{indirizzo}`:
vengono sostituite in automatico. Così se cambi il nome in `dati-cliente.js`, cambia ovunque.

**Prezzi:** sono scritti in ogni file lingua. Se cambi un prezzo in `it.js`, cambialo anche in `en.js` e `fr.js`.
Se ti dimentichi, il motore lo segnala nel Deploy log con un avviso “Prezzo diverso…”.

### Le foto
Vedi il **punto 3**: c'è la tabella con il nome e la misura di ogni foto.

### Recensioni
Usa **solo recensioni vere** del cliente (copiate da Google, TripAdvisor, Booking) e scrivi la fonte nel campo `fonte`.
Pubblicare recensioni inventate è vietato dal Codice del Consumo. Se il cliente non ne ha, metti `recensioni: false` in `sezioni`.

---

## 2. Lo stile, gli effetti 3D e il video

### Scegliere lo stile (una parola)
In `dati-cliente.js`, sezione **10**:

```js
stile: "alpino-elegante",
```

| Stile | Aspetto | Per chi |
|---|---|---|
| `alpino-elegante` | Scuro, oro, titoli eleganti, pulsanti squadrati | Hotel, ristoranti di livello, spa |
| `moderno-minimal` | Bianco, pulito, titoli moderni, linee nette | Negozi, uffici, officine, palestre, scuole sci |
| `caldo-rustico` | Carta, legno, toni caldi, foto con bordo chiaro | Rifugi, agriturismi, B&B di montagna, artigiani |

Cambiando la parola cambiano insieme colori, caratteri, angoli, ombre e anche i colori dei disegni segnaposto.
Scrivila esattamente così, con il trattino. Se sbagli, il sito usa `alpino-elegante` e il Deploy log te lo segnala.

### Ritoccare un colore o un font (facoltativo)
Nella sezione `tema` tutto è `""` = “usa quello dello stile”. Compila **solo** quello che vuoi cambiare:

```js
tema: {
  colori: {
    primario: "#8a1c1c",   // es. il rosso del logo del cliente per pulsanti e link
    accento: "",           // vuoto = resta quello dello stile
    ...
  },
```

- **Regola di leggibilità:** controlla la coppia testo/sfondo su <https://webaim.org/resources/contrastchecker/>:
  deve risultare **almeno 4.5:1** (scritta “Pass” su “WCAG AA”). Nello stile `alpino-elegante` lo sfondo è scuro,
  quindi `primario` e `accento` devono essere **chiari** (oro, crema); negli altri due devono essere **scuri**.
- Il colore del cliente funziona meglio come `primario` (pulsanti). Lascia stare `sfondo` e `testo`, se non sei sicuro.
- `arrotondamento`: `"0px"` = angoli squadrati, `"24px"` = molto tondi.

**Un font diverso:** scarica il file `.woff2` (set *latin*) da <https://gwfh.mranftl.com/fonts>, mettilo in `assets/font/` e scrivi:
```js
caratteri: { titoli: "'Playfair Display', Georgia, serif", testo: "'Inter', system-ui, sans-serif" },
fileCaratteri: [
  { nome: "Playfair Display", file: "playfair.woff2", peso: "400 700" },
  { nome: "Inter", file: "inter.woff2", peso: "400 700" },
],
```
I font stanno sul sito del cliente e non vengono scaricati da Google: è la scelta corretta per la privacy.

### Accendere o spegnere il 3D e le animazioni
```js
effetti: {
  profondita3d: true,   // montagne a strati che si muovono, carte che si inclinano col mouse, entrate in prospettiva
  animazioni: true,     // elementi che compaiono scorrendo, animazione del titolo, carosello che scorre da solo
},
```
- `profondita3d: false` → il sito resta animato ma “piatto”: niente movimento degli strati e niente inclinazioni.
- `animazioni: false` → tutto fermo e già visibile (utile per uffici o clienti molto sobri).
- Sul telefono il movimento del mouse diventa una leggera inclinazione mentre si scorre.
- Se il visitatore ha attivato **“Riduci movimento”** sul telefono o sul computer, gli effetti si spengono da soli.

### Il video di sfondo (facoltativo)
1. Prepara un video **muto**, **corto** (8–15 secondi, che giri in loop), orizzontale, **MP4**, sotto **4 MB**.
   Per alleggerirlo: <https://www.freeconvert.com/video-compressor> oppure HandBrake (preset “Web”, 1280×720).
2. Crea la cartella `assets/video/` e mettici il file, es. `assets/video/montagne.mp4`.
3. In `dati-cliente.js`: `heroVideo: "montagne.mp4",`

Come si comporta (per tenere il sito veloce):
- il video parte **solo dopo** che la pagina si è caricata: prima si vede la foto (o le montagne disegnate);
- **non** viene caricato sul telefono, con il risparmio dati attivo o con “Riduci movimento”;
- in basso a destra compare il pulsante **pausa**, obbligatorio per l'accessibilità.

Se il file non c'è, il Deploy log scrive `Video non trovato` e il sito funziona lo stesso senza video.

---

## 3. Dove va ogni foto (nomi e misure)

**Regola semplice:** se una foto non c'è, al suo posto il sito mostra un **disegno segnaposto** nei colori dello stile,
con scritto il **nome del file** e la **misura giusta**. Basta caricare in `assets/img/` una foto con **quel nome**
e il disegno sparisce. Il Deploy log elenca sempre le foto ancora mancanti (`▢ … foto ancora da caricare`).

I segnaposto sono otto disegni diversi (montagne, camera, piatti, vini e formaggi, camino, piste da sci, terrazza, barattoli)
e ognuno cambia colore, specchio e inquadratura da una casella all'altra: così nella galleria non ci sono due immagini uguali vicine.
L'etichetta con nome e misura è piccola e sta in un angolo, uguale su ogni schermo: si accende e si spegne con
`etichetteSegnaposto` in `dati-cliente.js` (`true` mentre prepari il sito di un cliente, `false` per nasconderla).

**La demo ha già 25 foto vere** (da Pexels, licenza gratuita anche per uso commerciale): l'elenco con fotografo e link
è in [`FOTO-CREDITI.md`](FOTO-CREDITI.md). Per un cliente **sostituiscile con le sue foto** (stessi nomi file):
se cancelli una foto, al suo posto torna il disegno segnaposto.
Lo sfondo della fascia contatti è un disegno a parte, di sole montagne morbide nei colori dello stile: resta pulito anche su telefono.

| Posto nel sito | Nome del file (dove si cambia) | Misura consigliata | Forma |
|---|---|---|---|
| Grande immagine in cima alla Home | `hero.jpg` (dati-cliente → `immagini.hero`) | 2000 × 1250 | orizzontale |
| La stessa, versione telefono | `hero-telefono.jpg` (`immagini.heroTelefono`) | 900 × 1400 | verticale |
| Home, “Cosa offriamo” (3 foto) | `anteprima-1/2/3.jpg` (lingue → `home.anteprima`) | 1200 × 1500 | verticale 4:5 |
| Home, sfondo della fascia contatti | `contatti.jpg` (`immagini.sfondoContatti`) | 2000 × 1250 | orizzontale |
| Chi siamo, foto grande | `chi-siamo.jpg` (`immagini.chiSiamo`) | 1200 × 1500 | verticale 4:5 |
| Chi siamo, foto piccola sovrapposta | `chi-siamo-2.jpg` (`immagini.chiSiamo2`) | 800 × 800 | quadrata |
| Servizi, camere | `camera-1/2/3.jpg` (lingue → `camere.elenco`) | 1200 × 800 | orizzontale 3:2 |
| Servizi, prodotti | `prodotto-1…6.jpg` (lingue → `catalogo.prodotti`) | 800 × 800 | quadrata |
| Galleria | `galleria-1…9.jpg` (`galleria`) | vedi sotto | mista |
| Anteprima quando si condivide il link | `og-image.jpg` (`immagini.anteprimaSocial`) | 1200 × 630 | orizzontale |
| Logo (facoltativo) | es. `logo.svg` (`immagini.logo`) | alto ~80 px | trasparente |

**Galleria a mosaico.** La griglia ripete questo schema ogni 9 foto, quindi l'ordine conta:

| Posizione | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Riquadro | grande | verticale | normale | normale | normale | orizzontale | verticale | orizzontale | normale |
| Misura | 1400×1400 | 800×1600 | 1000×1000 | 1000×1000 | 1000×1000 | 1600×800 | 800×1600 | 1600×800 | 1000×1000 |

Metti al posto 1 la foto più bella (è l'unica della galleria che si carica subito, le altre si caricano scorrendo); ai posti 2 e 7 foto verticali; ai posti 6 e 8 panorami.
Le foto vengono comunque ritagliate per riempire il riquadro, quindi tieni il soggetto al centro.

**Didascalie della galleria.** Le nove descrizioni nei file `lingue/it.js`, `en.js` e `fr.js` (`galleria.descrizioni`)
raccontano le **foto della demo** (1 Monte Bianco nel lago, 2 seggiovia, 3 vino e formaggi, 4 camino, 5 tavola, 6 terrazza, 7 camera, 8 boschi di larici, 9 miele).
Servono anche come testo alternativo per chi non vede l'immagine e come didascalia a schermo intero:
**quando metti le foto del cliente, riscrivile in tutte e tre le lingue**, nello stesso ordine delle foto.

**Prima di caricarle:**
1. Rinomina con nomi semplici: minuscole, senza spazi né accenti.
2. Alleggeriscile su <https://squoosh.app>: misura della tabella, formato **JPG** o **WebP**, qualità 75.
   Obiettivo: **sotto 300 KB** ciascuna (le due grandi della Home sotto 400 KB).
3. Puoi usare nomi diversi da quelli della tabella: basta scrivere il nuovo nome nel posto indicato tra parentesi.

Larghezza e altezza vengono lette in automatico, così la pagina non “salta” mentre carica.

**Versione leggera per i telefoni (facoltativa, ma rende il sito più veloce).** Per le foto della galleria,
di “Cosa offriamo”, delle camere e di Chi siamo puoi mettere una seconda copia **più piccola, con lo stesso nome**,
nella cartella `assets/img/piccole/` (larga circa 600–800 px, sotto i 100 KB). Il sito la fa scaricare
a telefoni e schermi normali e tiene quella grande per gli schermi ad alta definizione e per l'ingrandimento in galleria.
Se la cartella o la foto piccola non c'è, si usa semplicemente quella grande.

---

## 4. Come attivare o togliere una sezione di settore

In `dati-cliente.js`, sezione **8**:

```js
sezioni: {
  menu: true,        // ristoranti e rifugi: piatti, prezzi, pulsante "Prenota"
  camere: true,      // hotel e B&B: camere con foto, servizi e "Verifica disponibilità"
  catalogo: false,   // negozi e artigiani: prodotti con foto, categorie e prezzi
  listino: false,    // officine, palestre, scuole sci, guide, uffici: listino servizi
  faq: true,         // domande frequenti (va bene per tutti)
  recensioni: true,  // recensioni in Home
  whatsappFisso: true, // pulsante verde WhatsApp sempre visibile
},
ordineSezioni: ["menu", "camere", "catalogo", "listino", "faq"],
```

- `true` mostra la sezione, `false` la toglie da tutte le lingue.
- `ordineSezioni` decide l'ordine nella pagina Servizi.
- I testi di ogni sezione sono nei file lingua (`menu: {...}`, `camere: {...}` ecc.). Se la sezione è spenta, i testi possono restare lì.
- Se attivi più di una sezione, in cima alla pagina Servizi compaiono i pulsanti per saltare a ciascuna.

**Combinazioni consigliate**

| Cliente | Sezioni da accendere | `tipoSchema` | `stile` consigliato |
|---|---|---|---|
| Ristorante elegante | menu, faq | `Restaurant` | `alpino-elegante` |
| Trattoria / rifugio | menu, camere, faq | `Restaurant` o `Hotel` | `caldo-rustico` |
| Hotel | camere, faq | `Hotel` | `alpino-elegante` |
| B&B / agriturismo | camere, faq | `BedAndBreakfast` | `caldo-rustico` |
| Negozio | catalogo, faq | `Store` | `moderno-minimal` |
| Artigiano | catalogo, faq | `Store` | `caldo-rustico` |
| Officina | listino, faq | `AutoRepair` | `moderno-minimal` |
| Palestra | listino, faq | `ExerciseGym` | `moderno-minimal` |
| Scuola sci / guide alpine | listino, faq | `SportsActivityLocation` | `moderno-minimal` o `alpino-elegante` |
| Ufficio / studio | listino, faq | `ProfessionalService` | `moderno-minimal` |

Ricordati anche di cambiare il nome della voce di menu “Servizi” e i testi della pagina in `pagine.servizi` e `servizi`
(es. “Menu” per un ristorante, “Camere” per un B&B, “Prodotti” per un negozio).

**Per aggiungere o togliere un piatto, una camera o un prodotto:** copia un blocco `{ ... },` intero, incollalo sotto e
cambia i testi. Fai la stessa cosa in tutti i file lingua, nello **stesso ordine**.

**Icone disponibili per i punti di forza in Home** (campo `icona`):
`montagna, foglia, fuoco, cuore, stella, posizione, orologio, telefono, email, whatsapp, persone, letto, attrezzi, premio, sole, neve, check, globo`.

---

## 5. Come aggiungere una lingua (l'extra da 50 €)

Esempio: tedesco.

1. Nella cartella `lingue/` copia `en.js` e chiama la copia `de.js`.
2. Traduci i testi di `de.js`. Traduci anche i `percorso` delle pagine (es. `"uber-uns"`, `"kontakt"`):
   solo lettere minuscole senza accenti, numeri e trattini.
3. In `dati-cliente.js`, sezione **11. LINGUE**, aggiungi una riga:
   ```js
   { codice: "de", cartella: "de", locale: "de_DE", nome: "Deutsch" },
   ```
4. Carica su GitHub. Il motore crea da solo: le 8 pagine in `/de/`, il pulsante **DE** nel selettore,
   i collegamenti tra le lingue per Google (hreflang), la mappa del sito e la pagina 404 in tedesco.

Se ti dimentichi di tradurre qualche testo, il sito funziona lo stesso: usa il testo italiano e
nel Deploy log trovi l'elenco dei testi mancanti (`Testo mancante "de.home..."`).

Codici utili: tedesco `de`/`de_DE`, spagnolo `es`/`es_ES`, olandese `nl`/`nl_NL`, portoghese `pt`/`pt_PT`.

Per **togliere** una lingua basta cancellare la sua riga in `dati-cliente.js`.

---

## 6. Pubblicare su Netlify (la prima volta per ogni cliente)

1. Su GitHub crea un nuovo repository per il cliente e caricaci tutti i file di questa cartella
   (oppure usa questo repository come “Template”: *Settings → Template repository*).
2. Su <https://app.netlify.com>: **Add new site → Import an existing project → GitHub** → scegli il repository.
   Netlify legge `netlify.toml` da solo: non devi impostare niente.
3. **Attiva i moduli:** *Site configuration → Forms → Enable form detection*, poi fai un nuovo deploy
   (*Deploys → Trigger deploy*). Senza questo passaggio il form non riceve messaggi.
4. **Fai arrivare i messaggi al cliente:** *Site configuration → Forms → Form notifications → Add notification → Email notification*,
   modulo `contatti`, email del cliente.
5. **Dominio:** *Domain management → Add a domain*. Poi aggiorna `sitoUrl` in `dati-cliente.js`.
6. Prova il form dal telefono e controlla che il messaggio arrivi (anche nella cartella spam la prima volta).
7. Registra il sito su **Google Search Console** e invia la mappa del sito: `https://dominio-cliente.it/sitemap.xml`.

La protezione antispam è già attiva: un campo nascosto che solo i robot compilano, più il filtro antispam automatico di Netlify.
I messaggi segnati come spam li trovi in *Forms → Spam submissions*.

---

## 7. Prima di consegnare: lista di controllo

- [ ] `demo: false`
- [ ] `sitoUrl` con il dominio vero
- [ ] Partita IVA, ragione sociale, indirizzo corretti (e CIN per le strutture ricettive)
- [ ] Stile scelto e, se serve, colore del cliente in `tema.colori.primario` (contrasto controllato)
- [ ] Nessuna foto segnaposto rimasta: il Deploy log non deve più mostrare `▢ … foto ancora da caricare`
- [ ] Provato il sito sul telefono, sia con il 3D sia scorrendo velocemente
- [ ] Recensioni vere, con la fonte
- [ ] Titolo e descrizione di ogni pagina scritti per quel cliente, in tutte le lingue
- [ ] Ristoranti: frase sugli allergeni presente nella nota del menu
- [ ] Form provato: il messaggio arriva al cliente
- [ ] Mappa: compare dopo “Accetta” e punta al posto giusto
- [ ] Deploy log senza avvisi `⚠`
- [ ] Il cliente ha letto la pagina Privacy: il **responsabile** di quei dati è lui. Il testo è un modello corretto
      per un sito vetrina come questo; se il cliente aggiunge strumenti (Google Analytics, Facebook Pixel, newsletter,
      prenotazioni online) va aggiornato, e per casi particolari è meglio farlo controllare da un consulente privacy.

# Design system — StudioVela49

> Scritto prima del codice. Tutti i valori qui sotto esistono come **token CSS** in cima a `assets/css/stile.css` (`:root { --… }`).
> Se cambi un colore o una misura, cambialo lì: il resto del sito lo segue.

## 1. Idea in una riga

**Uno studio tecnico che si legge come una buona etichetta energetica:** chiaro, ordinato, con un solo colore che salta all'occhio (l'ambra) e la scala delle classi A4→G come firma grafica.

Parole chiave: moderno · pulito · tecnico ma umano · affidabile · luminoso.
Da evitare: "pannelli solari e prato verde", icone ovunque, schede tutte uguali, ombre pesanti, gradienti decorativi.

## 2. Palette

| Token | Valore | Uso |
|---|---|---|
| `--inchiostro` | `#0E2233` | Testo principale, fasce scure, footer |
| `--inchiostro-2` | `#16324A` | Superfici dentro le fasce scure |
| `--carta` | `#F6F4EF` | Sfondo della pagina (bianco caldo) |
| `--carta-2` | `#ECE8DF` | Sezioni alternate, campi del modulo |
| `--bianco` | `#FFFFFF` | Schede, modulo |
| `--testo-soft` | `#4A5866` | Testo secondario su chiaro (contrasto 6,6:1) |
| `--linea` | `#D9D4C8` | Linee sottili (mai bordi pesanti) |
| `--ambra` | `#F2A541` | **Unico accento**: pulsante principale, dettagli, testo su scuro (7,9:1) |
| `--ambra-testo` | `#8C5300` | Ambra leggibile su chiaro (link evidenziati, 5,7:1) |
| `--su-scuro` | `#E8ECEF` / `--su-scuro-soft` `#A9B7C4` | Testo sulle fasce scure (7,9:1) |

**Regola:** verdi, gialli e rossi compaiono **solo** dentro la scala energetica. Mai un pulsante verde, mai un titolo rosso.

### Scala energetica (motivo grafico)

| Classe | Colore | Etichetta |
|---|---|---|
| A4 | `#0B6B3A` | bianco (6,6:1) |
| A3 | `#18834A` | bianco (4,8:1) |
| A2 | `#3C9A4E` | inchiostro (4,6:1) |
| A1 | `#6DB04B` | inchiostro |
| B | `#A6C63E` | inchiostro |
| C | `#DCD43A` | inchiostro |
| D | `#F2C230` | inchiostro |
| E | `#EF9B32` | inchiostro |
| F | `#E2672E` | inchiostro (4,8:1) |
| G | `#C9352C` | bianco (5,2:1) |

## 3. Caratteri (ospitati sul sito, licenza OFL)

- **Instrument Sans** (variabile, peso 400-700, larghezza 75-100): titoli, numeri giganti, logotipo. Titoli grandi con interlinea stretta (1,02) e spaziatura leggermente negativa (-0,02em).
- **Inter** (variabile, peso 100-900): testo, moduli, interfaccia. Interlinea 1,6.
- File: `assets/font/instrument-sans.woff2` (57 kB), `assets/font/inter.woff2` (48 kB), solo alfabeto latino (copre italiano e francese). Precaricati, `font-display: swap`.

## 4. Scala tipografica (fluida, da 320 a 1440 px)

| Token | Telefono → Computer | Uso |
|---|---|---|
| `--t-mega` | 64 → 200 px | Numeri giganti (01 02 03, "1.100") |
| `--t-1` | 40 → 96 px | Titolo d'apertura (uno per pagina) |
| `--t-2` | 32 → 60 px | Titolo di sezione |
| `--t-3` | 22 → 30 px | Titolo di scheda |
| `--t-intro` | 18 → 22 px | La frase sotto il titolo |
| `--t-base` | 16 → 17 px | Testo |
| `--t-small` | 14 px | Note, etichette |
| `--t-eti` | 12,5 px maiuscolo, spaziato 0,14em | Etichette sopra i titoli |

## 5. Spaziature e griglia

- Unità 8 px: `--s-1` 8 · `--s-2` 16 · `--s-3` 24 · `--s-4` 32 · `--s-5` 48 · `--s-6` 64 · `--s-7` 96 · `--s-8` 144.
- Sezioni: `--sezione` = 96 px su telefono, 160 px su computer (clamp). Molta aria: è la prima cosa che rende "premium".
- Contenitore massimo 1320 px, margini laterali `--margine` = 20 → 56 px.
- Griglia a 12 colonne su computer, 1 colonna su telefono (pensato **prima** per il telefono).
- Angoli: `--raggio` 4 px (quasi squadrati: tecnico, preciso). Pulsanti a pillola (999 px) per riconoscerli subito.
- Bordi: quasi mai. Le separazioni si fanno con spazio, cambio di fondo o la linea-scala.

## 6. Regole per le foto

1. **Stesso trattamento colore per tutte** (`strumenti/ottimizza-foto.js`): saturazione 80 %, ombre sollevate verso il blu inchiostro (velo `#0E2233` in modalità *screen*). Così 14 foto di autori diversi sembrano un unico servizio.
2. **Poche e grandi.** Al massimo una foto per schermata. Niente gallerie.
3. **Torino per l'identità locale:** tetti (`torino-tetti`) nell'apertura della Home, panorama in Chi siamo, Mole di notte nella chiamata finale.
4. **Persone delle foto Pexels:** mai presentate come staff o lavori dello studio. Testi alternativi descrittivi ("Termocamera puntata su una parete"), mai "il nostro tecnico".
5. **Ritratto dell'ing. Lombardo** (280×329 px): solo in piccolo, massimo 160 px di lato a schermo, in un riquadro tondo.
6. Formati AVIF → WebP → JPG con `<picture>`, larghezze 480/800/1200/1800, sempre `width` e `height` (CLS 0). Solo la foto d'apertura si carica subito; le altre con `loading="lazy"`.
7. Le foto entrano con una **rivelazione a tendina** (maschera che si apre dal basso), mai con zoom pesanti.

## 7. Il segno grafico: la scala energetica

Un solo componente (`scala`) usato con coerenza, mai a caso:

| Dove | Come |
|---|---|
| **Logotipo** | Quattro barre a gradini (come l'etichetta APE) accanto a "StudioVela**49**" |
| **Indicatore di scorrimento** | Linea sottile in alto che si riempie scorrendo: parte da G (rosso) e arriva ad A4 (verde). Leggere la pagina "migliora la classe". |
| **Divisori** | Dieci trattini colorati, sottilissimi, che si riempiono in sequenza quando entrano nello schermo |
| **Numeri giganti** (come funziona) | Ogni numero ha sotto una barra di classe che si allunga |
| **Illustrazione APE** | Scala completa A4→G con la freccia della classe; le barre si riempiono una per una |
| **Confronto APE/diagnosi** | Due appartamenti uguali: stessa classe sull'APE, consumi reali diversi nella diagnosi |

## 8. Pulsanti e conversione

- **Un solo pulsante principale per schermata** (ambra, testo inchiostro). Il secondario è un link sottolineato.
- Testi d'azione precisi: "Richiedi il preventivo per l'APE", "Prenota il sopralluogo", "Fissa un incontro". Mai "Scopri di più".
- **Telefono:** barra fissa in basso con *Chiama · WhatsApp · Preventivo* (altezza 64 px, sopra l'area sicura dell'iPhone).
- **Computer:** pulsante "Richiedi un preventivo" sempre visibile nell'intestazione.

## 9. Movimento

| Effetto | Dove | Come |
|---|---|---|
| Titoli che entrano | Titoli d'apertura e di sezione | Righe che salgono da una maschera (600 ms, `cubic-bezier(.2,.7,.2,1)`) |
| Barre che si riempiono | Scala energetica, divisori, numeri | `transform: scaleX()` in sequenza (60 ms tra una barra e l'altra) |
| Foto che si rivelano | Foto grandi | `clip-path` dal basso verso l'alto (900 ms) |
| Testo che appare | Paragrafi e schede | Dissolvenza + 16 px di salita |

Solo CSS + `IntersectionObserver` (nessuna libreria). Con **`prefers-reduced-motion: reduce`** ogni effetto è spento e tutto il contenuto è visibile da subito. Senza JavaScript il contenuto è comunque visibile (gli stati nascosti esistono solo con la classe `js` sull'`<html>`).

## 10. Layout delle sezioni (nessuna struttura ripetuta di seguito)

### Home
1. **Apertura a tutto schermo** — foto dei tetti di Torino, titolo enorme in basso a sinistra, una frase, un pulsante. La scala di scorrimento parte qui.
2. **Due colonne a contrasto** — *Privati* su carta chiara / *Professionisti* su inchiostro. Ognuna con le sue 3-4 voci e il suo pulsante.
3. **Griglia asimmetrica dei servizi** — scheda grande con foto (APE) + schede piccole di testo, alcune doppie in altezza.
4. **Come funziona** — tre numeri giganti 01 02 03 in orizzontale, ognuno con la sua barra di classe.
5. **Confronto APE / diagnosi** — i due appartamenti affiancati (illustrazione SVG), le barre cambiano.
6. **Sezione divisa con immagine fissa** — foto ferma a sinistra (computer), a destra scorrono i 5 motivi per sceglierci.
7. **Fascia scura con i valori** — quattro parole enormi, una per riga: Professionalità, Trasparenza, Disponibilità, Concretezza.
8. **Chi c'è dietro** — ritratto piccolo e tondo, centrato, due frasi, link a Chi siamo.
9. **Domande frequenti** — fisarmonica pulita su due colonne (titolo fermo a sinistra).
10. **Chiamata finale con modulo** — foto della Mole di notte sfumata a sinistra, modulo corto a destra.

### Pagine servizio (ognuna con un'apertura diversa)
| Pagina | Apertura |
|---|---|
| APE | **Tipografica + scala**: titolo a sinistra, a destra la scala A4→G che si riempie |
| Diagnosi | **Il confronto è l'apertura**: i due appartamenti occupano la prima schermata |
| Impianti solari | **Numero gigante**: "1.100–1.600 kWh/m²" con la foto verticale del tetto |
| Bonus e detrazioni | **Dichiarazione su fondo ambra**: "Le regole cambiano spesso. Verifichiamo noi." |
| Amministratori di condominio | **Foto verticale a metà schermo** delle facciate + schema "un solo riferimento" |
| Prevenzione incendi | **Fascia scura** con l'estintore stretto e verticale |
| Per studi tecnici | **Indice numerato** delle collaborazioni, come un sommario di progetto |
| Servizi (panoramica) | **Elenco a righe** diviso Privati / Professionisti, con la classe a lato |
| Chi siamo | **Panorama di Torino** a tutta larghezza, titolo sopra la foto in basso |
| Contatti | **Il modulo è l'apertura**: nessuna foto, il modulo subito |

## 11. Logotipo (proposta da approvare)

`assets/img/logo.svg` e `logo-chiaro.svg`: quattro barre a gradini (verde → ambra) + "Studio**Vela**49" in Instrument Sans, con il "49" in ambra. Il segno da solo diventa l'icona del sito (`favicon.svg`). **Da approvare con il cliente.**

## 12. Accessibilità

Contrasto AA ovunque (valori sopra), focus visibile (anello ambra 3 px con contorno inchiostro), tutto usabile da tastiera, link "Vai al contenuto", etichette su ogni campo, zoom libero, destinazioni di tocco ≥ 44 px, lingua dichiarata su ogni pagina.

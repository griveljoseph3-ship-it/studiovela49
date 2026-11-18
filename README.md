# StudioVela49 — sito dell'ing. Natale Lombardo

Sito vetrina in italiano, inglese e francese. HTML, CSS e JavaScript semplici, generati da `build.js` (Node 20, nessuna libreria).

**Anteprima:** https://griveljoseph3-ship-it.github.io/studiovela49/ (non indicizzata da Google finché `anteprima: true`).

## Dove sta cosa

| File | Cosa contiene |
|---|---|
| `dati-cliente.js` | Telefono, email, indirizzo, P. IVA, WhatsApp acceso/spento, chiave del modulo, percorso base, vecchi indirizzi |
| `lingue/it.js`, `en.js`, `fr.js` | **Tutti i testi**, titoli e descrizioni per Google, testi alternativi delle foto |
| `assets/css/stile.css` | Stile. I colori e le misure sono in cima (token) |
| `assets/js/sito.js` | Menu, animazioni, modulo, mappa |
| `assets/img/` | Logo (`logo.svg`), icona, immagine per i social, foto ottimizzate in `foto/` |
| `build.js` | Il motore che crea il sito in `dist/` |
| `docs/DESIGN.md` | Design system: palette, caratteri, regole, layout di ogni sezione |
| `docs/DA-CONFERMARE.md` | Le domande da fare al cliente |
| `materiale/` | Archivio originale (non si tocca) |

## Come provarlo sul computer

```
node build.js
npx serve dist        (oppure un qualsiasi server nella cartella dist/)
```
In locale il sito chiede la sottocartella `/studiovela49/`. Per provarlo nella cartella principale: `PERCORSO_BASE="" node build.js`.

## Come cambiare un testo

1. Apri `lingue/it.js` (poi `en.js` e `fr.js`) e cerca la frase.
2. Cambia solo quello che sta tra le virgolette.
3. Salva e fai commit su `main`: il sito si ripubblica da solo in circa un minuto.

Per togliere un **[DA CONFERMARE]**: sostituiscilo con il dato vero in tutte e tre le lingue.

## Come si pubblica

- **GitHub Pages (anteprima):** ogni push su `main` avvia `.github/workflows/pages.yml`, che esegue `node build.js` e pubblica `dist/`.
- **Netlify:** `netlify.toml` genera il sito senza sottocartella (`PERCORSO_BASE=""`). Supporta anche Netlify Forms (`modulo.servizio: "netlify"`).
- **Hosting Apache (Aruba):** carica il contenuto di `dist/`. C'è già `.htaccess` con i redirect dai vecchi indirizzi `.php`.

### Quando si passa al dominio vero (studiovela49.it)
In `dati-cliente.js`: `percorsoBase: ""`, `sitoUrl: "https://www.studiovela49.it"`, `anteprima: false`. Poi ricostruisci.

## Modulo preventivo

Senza chiave apre l'email già compilata verso info@studiovela49.it. Per l'invio vero:
1. Crea una chiave gratuita su https://web3forms.com con l'email che deve ricevere le richieste.
2. In `dati-cliente.js` → `modulo: { servizio: "web3forms", chiave: "LA-CHIAVE" }`.
(Per Formspree: `servizio: "formspree"` e come chiave il codice del modulo.)

## Foto

Le foto ottimizzate (AVIF, WebP, JPG in più misure, stesso trattamento colore) si creano con
`npm i --no-save sharp && node strumenti/ottimizza-foto.js`. Crediti in `materiale/foto-libere/CREDITI.md` e nella pagina "Crediti foto" del sito.

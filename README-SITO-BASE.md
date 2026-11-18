# Sito base — siti per piccole attività

Sito vetrina pronto all'uso: 5 pagine + privacy, ringraziamento e 404, in italiano, inglese e francese.
Tre stili pronti (`alpino-elegante`, `moderno-minimal`, `caldo-rustico`), effetti di profondità 3D e animazioni
spegnibili, segnaposto disegnati in automatico per le foto mancanti.
HTML, CSS e JavaScript semplici, senza framework né librerie. Netlify lo genera a ogni pubblicazione.

- **Esempio incluso:** *Maison Aurore*, ristorante con camere e bottega a Courmayeur (attività inventata).
- **Per personalizzarlo:** leggi [COME-PERSONALIZZARE.md](COME-PERSONALIZZARE.md).
- **Per un nuovo cliente con Claude:** usa [PROMPT-NUOVO-CLIENTE.md](PROMPT-NUOVO-CLIENTE.md).

## Struttura

```
dati-cliente.js   dati del cliente, stile, effetti, sezioni accese, lingue  ← si modifica
lingue/*.js       tutti i testi, una lingua per file                     ← si modifica
assets/img/       foto                                                   ← si modifica
assets/css/       stile          assets/js/   funzioni (menu, cookie, galleria…)
assets/font/      font ospitati sul sito (Cormorant Garamond, Jost, Manrope, Inter, Fraunces, Nunito Sans — licenza OFL)
build.js          genera il sito in dist/ (lo esegue Netlify)
motore/           i tre stili (stili.js) e i disegni automatici (disegni.js)
netlify.toml      configurazione di Netlify
```

Per provarlo sul computer (serve Node.js, facoltativo): `node build.js`, poi apri un server nella cartella `dist/`.

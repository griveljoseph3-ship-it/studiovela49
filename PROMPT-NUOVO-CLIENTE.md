# Prompt per un nuovo cliente

**Come si usa:**
1. Per ogni cliente crea un nuovo repository GitHub partendo da questo (copia o “Use this template”).
2. Apri una sessione di Claude Code su **quel** repository.
3. Copia tutto il blocco qui sotto, compila i campi tra `[parentesi quadre]`
   (se non sai qualcosa scrivi `NON LO SO`: Claude lascerà un segnaposto e te lo segnalerà).
4. Allega le foto del cliente, se le hai (oppure caricale prima in `assets/img/`).
5. Invia.

Più informazioni vere dai, meno testo “inventato” ci sarà da correggere.

---

```text
Adatta questo sito base a un nuovo cliente. Prima di iniziare leggi COME-PERSONALIZZARE.md,
dati-cliente.js e lingue/it.js, e rispetta la struttura esistente: modifica solo dati-cliente.js,
i file in lingue/ e le foto in assets/img/. Non toccare build.js, stile.css o sito.js,
a meno che io lo chieda espressamente qui sotto.

=== DATI DELL'ATTIVITÀ ===
Nome dell'attività: [es. Rifugio Monte Bianco]
Settore: [ristorante / rifugio / hotel / B&B / negozio / artigiano / officina / palestra / scuola sci / guida alpina / ufficio]
Ragione sociale: [es. Rossi Mario s.r.l.]
Partita IVA: [IT...]
CIN (solo hotel, B&B, case vacanza): [...]
Indirizzo completo: [via, numero, CAP, città, provincia]
Coordinate Google Maps (facoltative): [45.79..., 6.97...]
Telefono: [...]
WhatsApp: [numero oppure "nessuno"]
Email: [...]
Dominio del sito: [es. https://www.rifugiomontebianco.it oppure "non ancora"]
Instagram: [link o "nessuno"]
Facebook: [link o "nessuno"]
TripAdvisor / Google / Booking: [link o "nessuno"]
Link esterno per prenotare (TheFork, Booking...): [link o "nessuno"]

=== ORARI ===
Lunedì: [es. chiuso]
Martedì: [es. 12:00-14:30 e 19:00-22:00]
Mercoledì: [...]
Giovedì: [...]
Venerdì: [...]
Sabato: [...]
Domenica: [...]
Note (chiusure stagionali, ferie): [...]

=== CONTENUTI ===
Storia / chi sono (anche appunti disordinati, li sistemi tu): [...]
3 o 4 punti di forza: [...]
Servizi / piatti / camere / prodotti con PREZZI (incolla il listino o il menu così com'è): [...]
Domande frequenti dei clienti: [...]
Recensioni VERE (testo, nome, provenienza, stelle, fonte), oppure "nessuna": [...]
Tono di voce: [es. familiare e caldo / elegante / tecnico e diretto / sportivo]

=== STILE ===
Stile del sito: [alpino-elegante / moderno-minimal / caldo-rustico / "scegli tu in base al settore"]
Effetti 3D: [sì / no]   Animazioni: [sì / no]
Video di sfondo: [nome del file in assets/video/ oppure "nessuno"]
Colore del cliente da usare per i pulsanti (facoltativo): [es. #8a1c1c oppure "quello dello stile"]
Logo: [nome del file in assets/img/ oppure "nessuno, usa il nome scritto"]
Stile: [es. moderno e minimal / caldo e rustico / lussuoso]

=== FOTO ===
[elenco dei file caricati in assets/img/ con una breve descrizione di ciascuno,
 oppure "nessuna foto: lascia i segnaposto"]

=== LINGUE ===
Lingue: [italiano, inglese, francese] [+ eventuale lingua extra: ...]

=== ISTRUZIONI PER CLAUDE ===
1. Imposta demo: false in dati-cliente.js (a meno che io scriva qui "lascia demo").
2. Compila dati-cliente.js con i dati sopra, scegli il tipoSchema giusto per il settore
   e accendi solo le sezioni adatte (menu, camere, catalogo, listino, faq).
3. Imposta "stile" ed "effetti" in dati-cliente.js. Non modificare motore/stili.js: se serve il
   colore del cliente, mettilo solo in tema.colori.primario e controlla che il contrasto con lo
   sfondo dello stile sia almeno 4.5:1 (nello stile alpino-elegante lo sfondo è scuro).
4. Riscrivi TUTTI i testi in lingue/it.js per questo cliente, compresi titoli e descrizioni
   per Google di ogni pagina (titolo max 60 caratteri, descrizione 140-160 caratteri,
   con città e settore). Rinomina la voce di menu "Servizi" in modo adatto al settore.
5. Traduci in modo naturale (non letterale) in en.js e fr.js (e nelle lingue extra),
   con gli stessi prezzi e nello stesso ordine. Traduci anche i "percorso" delle pagine.
6. Non inventare mai: prezzi, recensioni, premi, numeri, certificazioni o servizi che non
   ti ho dato. Se un'informazione manca, metti un segnaposto chiaro tipo [DA COMPLETARE]
   e aggiungilo alla lista finale.
7. Per le foto: segui la tabella del punto 3 di COME-PERSONALIZZARE.md (nomi e misure di ogni
   posto, ordine della galleria). Collega quelle che ho caricato al posto giusto con descrizioni
   (alt) utili in tutte le lingue; dove mancano lascia i segnaposto automatici e dimmi quali sono.
8. Esegui node build.js: non devono esserci errori né avvisi ⚠ (l'elenco ▢ delle foto mancanti è normale). Poi controlla che non ci
   siano link rotti, che il form punti alla pagina di ringraziamento in ogni lingua e che
   le pagine si vedano bene a larghezza telefono.
9. Salva tutto con un commit e fai il push sul repository.
10. Alla fine dammi: un riassunto breve di cosa hai cambiato, la lista dei [DA COMPLETARE],
    e i passaggi da fare su Netlify (form detection, notifiche email, dominio).
```

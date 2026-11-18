# Da confermare con l'ing. Lombardo

Sul sito ogni dato mancante è segnato con l'etichetta **[DA CONFERMARE]** (tratteggiata, color ambra).
Quando arriva la risposta: cambia il testo in `lingue/it.js`, `en.js`, `fr.js` (cerca "DA CONFERMARE") oppure in `dati-cliente.js`.

## Domande da girare al cliente

### Contatti e studio
1. **Orari:** in che giorni e a che ore è aperto lo studio? Si riceve solo su appuntamento?
2. **WhatsApp:** il cellulare +39 339 270 9272 ha WhatsApp? Se no, togliamo il pulsante (`whatsappAttivo: false`).
3. **Altri numeri:** c'è un telefono fisso? Il fax 011 0206273 è ancora attivo? (Per ora non è sul sito.)
4. **Come arrivare:** oltre alla metro Vinzaglio, quali linee di autobus passano vicino oggi? (Quelle del vecchio sito sono del 2012.)
5. **Zona servita:** lavorate solo a Torino o anche in provincia / in tutto il Piemonte?
6. **Social:** la pagina Facebook e il profilo LinkedIn sono ancora attivi? Volete i link sul sito?

### Iscrizioni e persone
7. **Numeri di iscrizione:** Ordine degli Ingegneri di Torino, elenco dei certificatori energetici della Regione Piemonte, elenco dei professionisti antincendio del Ministero.
8. **Collaboratori esterni:** volete nominarli (catasto, rilievi, linee vita)?
9. **Foto vera dell'ingegnere** in alta risoluzione (almeno 1200 px) e, se ci sono, foto dello studio o di lavori fatti (con il permesso dei clienti).

### Servizi
10. **Servizi ancora attivi:** pratiche con l'Agenzia delle Dogane per fotovoltaico oltre 20 kWp, solare termico, linee vita, catasto, rilievi, progettazione e direzione lavori?
11. **Bonus e detrazioni:** quali seguite oggi (Ecobonus, Bonus ristrutturazione, Conto Termico, altri)?
12. **Incentivi per il solare** che seguite oggi.
13. **APE – documenti:** cosa deve preparare il cliente prima del sopralluogo? (Sul sito: dati catastali, planimetria, libretto dell'impianto, lavori recenti.)
14. **Tempi:** in quanti giorni consegnate di solito un APE e una diagnosi? In quanto tempo rispondete a una richiesta di preventivo?
15. **Prezzi:** volete pubblicare prezzi o "a partire da"? (Oggi il sito dice solo "preventivo su misura".)
16. **Studi tecnici:** come funzionano di solito le collaborazioni (a progetto, a parcella…)?

### Sito, modulo e privacy
17. **Logo:** vi piace la proposta (quattro barre della scala energetica + "StudioVela49" con il 49 in ambra)? O avete un logo?
18. **Tono:** va bene il "tu" con i privati o preferite il "Lei"?
19. **Modulo preventivo:** a quale indirizzo devono arrivare le richieste (info@studiovela49.it?). Serve creare l'account Web3Forms (gratuito) con quell'email e mettere la chiave in `dati-cliente.js` → `modulo.chiave`. Finché manca, il modulo apre l'email già compilata.
20. **Privacy:** per quanto tempo conservate le richieste che non diventano lavori (proposta: 24 mesi)? Il testo della privacy va riletto dal cliente o dal suo consulente.
21. **Recensioni Google:** ci sono recensioni vere che volete mostrare (testo e nome)?
22. **Dominio e hosting:** il sito andrà su studiovela49.it (oggi su Aruba)? Chi gestisce il DNS?

## Elenco tecnico (dove compare sul sito)

| Dato | Pagine | File |
|---|---|---|
| Tempi di risposta | Home (come funziona), Grazie | `lingue/*.js` → `home.passi`, `grazie` |
| Numeri di iscrizione | Home (perché sceglierci), Chi siamo | `home.perche`, `chiSiamo.titoli` |
| Prezzi e tempi | Home FAQ, APE FAQ | `home.faq`, `ape.faq` |
| Zona servita | Home FAQ | `home.faq` |
| Tempi di consegna APE | APE (apertura) | `ape.frase` |
| Documenti da preparare | APE | `ape.preparare` |
| Altri servizi attivi | Servizi | `servizi.altriNota` |
| Incentivi solare, pratiche doganali | Impianti solari | `solare.fasi`, `solare.dogane` |
| Bonus seguiti | Bonus e detrazioni | `bonus.quali.nota` |
| Collaborazioni | Per studi tecnici | `studi.come.nota` |
| Collaboratori | Chi siamo | `chiSiamo.rete` |
| Orari, linee bus, WhatsApp | Contatti | `contatti.orari`, `contatti.arrivare`, `dati-cliente.js` |
| Conservazione dati, servizio del modulo | Privacy, Cookie | `privacy`, `cookie` |
| Chiave del modulo | tutte le pagine con modulo | `dati-cliente.js` → `modulo` |
| Logo | tutte | `assets/img/logo.svg` |

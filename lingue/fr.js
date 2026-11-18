/* =====================================================================
   TESTI IN FRANCESE  (stessa struttura di it.js: vedi le istruzioni lì)
   I prezzi devono essere uguali a quelli di it.js:
   il motore ti avvisa se non lo sono.
   ===================================================================== */

module.exports = {

  pagine: {
    home:     { percorso: "",                       menu: "Accueil",      titolo: "{nome} – Restaurant, chambres et boutique à {citta}", descrizione: "Cuisine valdôtaine, chambres avec vue sur le Mont-Blanc et produits du terroir à {citta}. Une maison de famille au pied des Alpes depuis 1962." },
    chiSiamo: { percorso: "a-propos",               menu: "Qui sommes-nous", titolo: "Qui sommes-nous – Notre histoire depuis 1962", descrizione: "Trois générations, une ancienne grange en bois et en pierre et la passion de la cuisine de montagne : découvrez l'histoire de {nome} à {citta}." },
    servizi:  { percorso: "services",               menu: "Services",     titolo: "Menu, chambres et boutique", descrizione: "Notre menu de plats traditionnels valdôtains, nos chambres face au Mont-Blanc et les produits du terroir de notre boutique à {citta}." },
    galleria: { percorso: "galerie",                menu: "Galerie",      titolo: "Galerie photos", descrizione: "Les photos de {nome} : la salle, les chambres, nos plats et les montagnes de {citta} en toute saison." },
    contatti: { percorso: "contact",                menu: "Contact",      titolo: "Contact, horaires et accès", descrizione: "Téléphone, WhatsApp, e-mail, horaires d'ouverture et plan d'accès pour rejoindre {nome} à {citta}. Écrivez-nous pour réserver ou vous renseigner." },
    privacy:  { percorso: "confidentialite-cookies", menu: "Confidentialité et cookies", titolo: "Confidentialité et cookies", descrizione: "Informations sur le traitement des données personnelles et l'utilisation des cookies sur le site de {nome}." },
    grazie:   { percorso: "merci",                  menu: "Merci",        titolo: "Message envoyé", descrizione: "Merci de nous avoir écrit." },
    errore:   { percorso: "",                       menu: "Erreur",       titolo: "Page introuvable", descrizione: "La page que vous cherchez n'existe pas." },
  },

  ui: {
    saltaAlContenuto: "Aller au contenu",
    menuApri: "Ouvrir le menu",
    menuChiudi: "Fermer le menu",
    lingua: "Langue",
    chiama: "Appeler",
    whatsapp: "WhatsApp",
    email: "E-mail",
    contattaci: "Nous contacter",
    scopriDiPiu: "En savoir plus",
    indirizzo: "Adresse",
    orari: "Horaires",
    chiuso: "Fermé",
    oggi: "Aujourd'hui",
    giorni: { lun: "Lundi", mar: "Mardi", mer: "Mercredi", gio: "Jeudi", ven: "Vendredi", sab: "Samedi", dom: "Dimanche" },
    indicazioni: "Itinéraire",
    seguici: "Suivez-nous",
    partitaIva: "N° TVA",
    cin: "CIN",
    preferenzeCookie: "Préférences cookies",
    chiudi: "Fermer",
    precedente: "Photo précédente",
    successiva: "Photo suivante",
    ingrandisci: "Ouvrir la photo en plein écran",
    stelle: "{n} étoiles sur 5",
    whatsappFisso: "Écrivez-nous sur WhatsApp",
    demo: "Site d’exemple",
    linkEsterno: "(s'ouvre dans un nouvel onglet)",
    prenota: "Réserver",
    scorri: "Défiler",
    pausa: "Mettre en pause",
    riproduci: "Reprendre",
    recPrecedente: "Avis précédent",
    recSuccessiva: "Avis suivant",
    recensioni: "Avis",
  },

  cookie: {
    testo: "Nous utilisons uniquement des cookies techniques. Avec votre accord, nous chargeons aussi la carte Google, qui peut utiliser des cookies tiers.",
    accetta: "Accepter",
    rifiuta: "Refuser",
    info: "Lire la politique",
  },
  mappa: {
    titolo: "Carte Google indiquant l'emplacement de {nome}",
    testo: "La carte est fournie par Google et ne se charge qu'avec votre accord.",
    pulsante: "Afficher la carte",
    apriInMaps: "Ouvrir dans Google Maps",
  },

  home: {
    heroEtichetta: "{citta} · Vallée d'Aoste",
    heroTitolo: "{nome}",
    heroSottotitolo: "Cuisine valdôtaine, chambres avec vue sur le Mont-Blanc et une petite boutique de produits de montagne. Depuis 1962.",
    pulsantePrincipale: "Nous contacter",
    pulsanteSecondario: "Voir le menu",
    puntiForzaTitolo: "Pourquoi nous choisir",
    puntiForzaIntro: "Depuis trois générations, nous accueillons ceux qui montent à la montagne comme on accueille un ami : avec un plat chaud, une chambre au calme et le temps de profiter de la vue.",
    puntiForza: [
      { icona: "montagna", titolo: "Vue sur le Mont-Blanc",  testo: "Depuis la salle et chaque chambre, on voit les plus hauts sommets d'Europe." },
      { icona: "foglia",   titolo: "Produits du terroir",    testo: "Fontina, lard, miels et vins de plus de 40 petits producteurs de la vallée." },
      { icona: "fuoco",    titolo: "Cuisine de famille",     testo: "Les recettes de grand-mère, mijotées au feu de bois comme autrefois." },
      { icona: "posizione",titolo: "À deux pas du centre",   testo: "À 10 minutes à pied de la via Roma, avec parking privé gratuit." },
    ],
    anteprimaTitolo: "Ce que nous proposons",
    anteprimaIntro: "Trois façons de vivre la montagne : à table, dans votre chambre et en l'emportant chez vous.",
    anteprima: [
      { titolo: "La cuisine",  testo: "Plats traditionnels valdôtains préparés avec des produits de saison.", foto: "anteprima-1.jpg", ancora: "menu" },
      { titolo: "Les chambres", testo: "Trois chambres en mélèze, toutes avec vue sur les montagnes et petit-déjeuner inclus.", foto: "anteprima-2.jpg", ancora: "camere" },
      { titolo: "La boutique", testo: "Fromages, charcuteries et liqueurs des producteurs que nous servons chaque jour à table.", foto: "anteprima-3.jpg", ancora: "catalogo" },
    ],
    recensioniTitolo: "Ils parlent de nous",
    recensioni: [
      { testo: "La meilleure soupe valpellinentze que j'aie jamais mangée. Personnel adorable et vue à couper le souffle.", autore: "Giulia R.", provenienza: "Turin", stelle: 5, fonte: "Avis d'exemple" },
      { testo: "Chambre propre et chaleureuse, petit-déjeuner copieux avec gâteaux maison. Nous reviendrons pour la saison de ski !", autore: "Marc D.", provenienza: "Lyon", stelle: 5, fonte: "Avis d'exemple" },
      { testo: "Une vraie ambiance familiale. Nous avons rapporté de la fontina et du génépi de la boutique : excellents.", autore: "Sarah T.", provenienza: "Londres", stelle: 4, fonte: "Avis d'exemple" },
    ],
    contattiTitolo: "Venez nous voir",
    contattiTesto: "Pour réserver une table ou une chambre, appelez-nous, écrivez-nous sur WhatsApp ou par e-mail : nous répondons dans la journée.",
  },

  chiSiamo: {
    etichetta: "Notre histoire",
    titolo: "Une maison de famille au pied du Mont-Blanc",
    intro: "En 1962, grand-mère Aurore a transformé le vieux grenier familial en une petite auberge pour les alpinistes de passage. Aujourd'hui, la troisième génération perpétue la même idée : accueillir chacun comme un ami.",
    paragrafi: [
      "La maison est une grange du XVIIIe siècle en pierre et en mélèze, restaurée en conservant les poutres, les planchers et le grand poêle en pierre ollaire qui chauffe encore la salle.",
      "En cuisine, nous utilisons presque uniquement des produits de la Vallée d'Aoste : la fontina des alpages du Val Ferret, le lard d'Arnad, les légumes du potager derrière la maison. Le menu suit les saisons, car en montagne c'est la nature qui décide.",
      "À l'étage se trouvent trois chambres, chacune dédiée à un sommet visible depuis sa fenêtre. Et à l'entrée, une petite boutique propose les produits que nous servons à table.",
    ],
    citazione: { testo: "En montagne, on devient vite amis : il suffit d'un plat chaud et d'une fenêtre sur les sommets.", autore: "Aurore, fondatrice" },
    numeri: [
      { valore: "1962", etichetta: "année d'ouverture" },
      { valore: "3",    etichetta: "générations en cuisine" },
      { valore: "40+",  etichetta: "producteurs locaux" },
      { valore: "3",    etichetta: "chambres avec vue" },
    ],
    finaleTitolo: "Envie de nous rencontrer ?",
    finaleTesto: "Passez nous voir ou écrivez-nous : nous serons ravis de vous conseiller un plat, une chambre ou une balade.",
  },

  servizi: {
    etichetta: "{nome}",
    titolo: "Cuisine, chambres et boutique",
    intro: "Tout ce que vous trouverez chez nous : choisissez la rubrique qui vous intéresse.",
  },

  menu: {
    titolo: "Le menu",
    intro: "Plats traditionnels valdôtains, préparés chaque jour avec des produits de saison.",
    categorie: [
      { nome: "Entrées", piatti: [
        { nome: "Planche de la Vallée", descrizione: "Lard d'Arnad AOP, mocetta, boudin, fontina AOP et miel de châtaignier", prezzo: "€ 16" },
        { nome: "Tomini au four", descrizione: "Au miel de montagne et aux noix grillées", prezzo: "€ 12", veg: true },
      ]},
      { nome: "Premiers plats", piatti: [
        { nome: "Soupe valpellinentze", descrizione: "Pain de seigle, chou de Milan, fontina et bouillon de viande", prezzo: "€ 15" },
        { nome: "Gnocchis de pommes de terre au ragoût de cerf", descrizione: "Gnocchis faits main, ragoût mijoté six heures", prezzo: "€ 17" },
        { nome: "Polenta concia", descrizione: "Polenta moulue à la meule, fontina et beurre d'alpage", prezzo: "€ 14", veg: true },
      ]},
      { nome: "Plats principaux", piatti: [
        { nome: "Carbonade valdôtaine", descrizione: "Bœuf mijoté au vin rouge et aux épices, servi avec de la polenta", prezzo: "€ 22" },
        { nome: "Côtelette à la valdôtaine", descrizione: "Veau pané à la fontina et au jambon cru", prezzo: "€ 24" },
        { nome: "Truite de torrent aux herbes", descrizione: "Avec pommes de terre de montagne au four", prezzo: "€ 21" },
      ]},
      { nome: "Desserts", piatti: [
        { nome: "Panna cotta au génépi", descrizione: "Aux fruits des bois", prezzo: "€ 7", veg: true },
        { nome: "Mont-Blanc", descrizione: "Purée de châtaignes et crème fouettée", prezzo: "€ 8", veg: true },
      ]},
    ],
    legenda: "V = plat végétarien",
    nota: "Couvert 3 €. Informations sur les allergènes disponibles sur demande auprès du personnel.",
    prenotaTitolo: "Réserver une table",
    prenotaTesto: "Réservation conseillée, surtout le week-end et en haute saison.",
    messaggioWhatsapp: "Bonjour ! Je voudrais réserver une table chez {nome}.",
    oggettoEmail: "Réservation de table",
  },

  camere: {
    titolo: "Les chambres",
    intro: "Trois chambres chaleureuses et calmes, meublées en mélèze. Petit-déjeuner avec gâteaux maison inclus.",
    elenco: [
      { nome: "Chambre Dent du Géant", foto: "camera-1.jpg", descrizione: "Chambre double avec grande fenêtre sur le Mont-Blanc.", ospiti: "2 personnes", dotazioni: ["Vue Mont-Blanc", "Salle de bain privée", "Wi-Fi", "Petit-déjeuner inclus"], prezzo: "dès € 140 / nuit" },
      { nome: "Suite Grandes Jorasses", foto: "camera-2.jpg", descrizione: "Suite sur deux niveaux avec coin salon, idéale pour les familles.", ospiti: "jusqu'à 4 personnes", dotazioni: ["Salon", "Baignoire", "Wi-Fi", "Petit-déjeuner inclus"], prezzo: "dès € 220 / nuit" },
      { nome: "Chambre Val Ferret", foto: "camera-3.jpg", descrizione: "Chambre double avec balcon privé donnant sur la forêt.", ospiti: "2 personnes", dotazioni: ["Balcon", "Salle de bain privée", "Wi-Fi", "Petit-déjeuner inclus"], prezzo: "dès € 160 / nuit" },
    ],
    pulsante: "Vérifier les disponibilités",
    oggettoEmail: "Demande de disponibilité – {camera}",
    corpoEmail: "Bonjour, je voudrais savoir si la {camera} est disponible.\nDates d'arrivée et de départ : \nNombre de personnes : \n",
    nota: "Taxe de séjour non incluse. Arrivée à partir de 15 h, départ avant 10 h 30.",
  },

  catalogo: {
    titolo: "La boutique",
    intro: "Les produits de nos fournisseurs de confiance, à emporter ou à offrir.",
    tutti: "Tous",
    prodotti: [
      { nome: "Fontina AOP d'alpage", categoria: "Fromages", prezzo: "€ 24 / kg", foto: "prodotto-1.jpg", descrizione: "Affinée au moins 5 mois en grotte." },
      { nome: "Lard d'Arnad AOP", categoria: "Charcuterie", prezzo: "€ 9 / 200 g", foto: "prodotto-2.jpg", descrizione: "Aromatisé aux herbes de montagne." },
      { nome: "Mocetta", categoria: "Charcuterie", prezzo: "€ 8 / 150 g", foto: "prodotto-3.jpg", descrizione: "Charcuterie typique, séchée à l'air de la montagne." },
      { nome: "Génépi artisanal", categoria: "Liqueurs", prezzo: "€ 22 / 50 cl", foto: "prodotto-4.jpg", descrizione: "Liqueur d'herbes alpines, recette de famille." },
      { nome: "Miel toutes fleurs de montagne", categoria: "Douceurs", prezzo: "€ 9 / 500 g", foto: "prodotto-5.jpg", descrizione: "Récolté au-dessus de 1 500 mètres." },
      { nome: "Tuiles valdôtaines", categoria: "Douceurs", prezzo: "€ 7 / 200 g", foto: "prodotto-6.jpg", descrizione: "Biscuits fins aux amandes et noisettes." },
    ],
    pulsante: "Demander des infos",
    messaggioWhatsapp: "Bonjour ! Je voudrais des informations sur : {prodotto}",
    nota: "Prix TTC. Vente uniquement en boutique : aucun paiement en ligne.",
  },

  listino: {
    titolo: "Expériences et services",
    intro: "Avec des partenaires de confiance, nous organisons quelques expériences pour nos hôtes.",
    voci: [
      { nome: "Dîner dégustation", descrizione: "Six plats accordés avec des vins valdôtains", durata: "3 heures", prezzo: "€ 75 par personne" },
      { nome: "Randonnée en raquettes guidée", descrizione: "Sortie en raquettes au Val Ferret, matériel inclus", durata: "demi-journée", prezzo: "€ 55 par personne" },
      { nome: "Transfert depuis/vers Aoste", descrizione: "Navette sur réservation", durata: "45 minutes", prezzo: "€ 60 le trajet" },
    ],
    nota: "Prix indicatifs, à confirmer lors de la réservation.",
  },

  faq: {
    titolo: "Questions fréquentes",
    domande: [
      { domanda: "Faut-il réserver ?", risposta: "Pour le restaurant, c'est conseillé, surtout le samedi et en haute saison. Pour les chambres, toujours." },
      { domanda: "Proposez-vous des plats végétariens ou sans gluten ?", risposta: "Oui : les plats végétariens sont signalés par un V sur le menu. En cas d'intolérance ou de maladie cœliaque, prévenez-nous lors de la réservation." },
      { domanda: "Y a-t-il un parking ?", risposta: "Oui, nous disposons d'un parking privé gratuit pour les clients du restaurant et des chambres." },
      { domanda: "Les animaux sont-ils acceptés ?", risposta: "Les chiens de petite taille sont les bienvenus en salle et dans l'une des chambres, sur demande." },
      { domanda: "Comment venir sans voiture ?", risposta: "À 10 minutes à pied du centre de {citta} ; en hiver, le skibus gratuit s'arrête juste devant." },
    ],
  },

  galleria: {
    etichetta: "{nome}",
    titolo: "Galerie",
    intro: "Un aperçu de la maison, de la cuisine et des montagnes qui nous entourent. Touchez une photo pour l'agrandir.",
    // Una descrizione per ogni foto, nello STESSO ORDINE delle foto in dati-cliente.js.
    // Le descrizioni qui sotto raccontano le foto della demo (vedi FOTO-CREDITI.md).
    // Quando cambi le foto, RISCRIVILE: servono anche come testo alternativo per chi non vede l'immagine.
    descrizioni: [
      "Le Mont-Blanc se reflétant dans un lac d’altitude",
      "Le télésiège au-dessus des pistes enneigées",
      "Une planche de fromages valdôtains et un verre de vin rouge",
      "La cheminée en pierre de la salle, allumée les soirs d'hiver",
      "La table en bois dressée pour le dîner",
      "La terrasse avec vue sur les montagnes",
      "Une chambre avec sa fenêtre sur les sommets",
      "Les forêts de mélèzes en automne, au-dessus de la vallée",
      "Les pots de miel de montagne sur les étagères de la boutique",
    ],
  },

  contatti: {
    etichetta: "{nome}",
    titolo: "Contact",
    intro: "Appelez-nous, écrivez-nous sur WhatsApp ou remplissez le formulaire : nous répondons sous 24 heures.",
    infoTitolo: "Où et quand",
    mappaTitolo: "Comment venir",
  },

  form: {
    titolo: "Écrivez-nous",
    nome: "Nom et prénom",
    email: "E-mail",
    telefono: "Téléphone",
    facoltativo: "facultatif",
    motivo: "Objet du message",
    motivi: ["Informations", "Réservation de table", "Disponibilité des chambres", "Boutique et produits", "Autre"],
    messaggio: "Message",
    privacy: "J'ai lu la {linkPrivacy} et j'accepte le traitement de mes données afin de recevoir une réponse.",
    privacyLink: "politique de confidentialité",
    invia: "Envoyer le message",
    obbligatori: "Les champs marqués d'un * sont obligatoires.",
  },

  grazie: {
    titolo: "Merci, message bien reçu !",
    testo: "Nous vous répondrons dès que possible, en général sous 24 heures. En cas d'urgence, appelez-nous.",
    torna: "Retour à l'accueil",
  },

  errore: {
    titolo: "Page introuvable",
    testo: "Le lien est peut-être erroné ou la page a été déplacée.",
    torna: "Retour à l'accueil",
  },

  privacy: {
    titolo: "Confidentialité et cookies",
    aggiornamento: "Dernière mise à jour : {data}",
    sezioni: [
      { titolo: "1. Qui traite vos données", testo: "Le responsable du traitement est <strong>{ragioneSociale}</strong>, {indirizzo}, N° TVA {piva}. Pour toute question sur vos données, écrivez à <a href=\"mailto:{email}\">{email}</a>." },
      { titolo: "2. Quelles données nous collectons", testo: "<strong>Données de navigation :</strong> pour fonctionner et pour des raisons de sécurité, le serveur qui héberge le site enregistre des données techniques comme l'adresse IP, la date et l'heure de la visite et les pages demandées.<br><strong>Données que vous nous envoyez :</strong> si vous remplissez le formulaire de contact, nous collectons votre nom, votre e-mail, votre téléphone (facultatif) et votre message. Si vous nous écrivez par e-mail, téléphone ou WhatsApp, nous traitons les données que vous nous communiquez." },
      { titolo: "3. Pourquoi nous les utilisons et sur quelle base", testo: "Nous utilisons vos données pour répondre à vos demandes d'informations, de devis ou de réservation (art. 6.1.b RGPD, mesures précontractuelles prises à votre demande) et pour protéger le site contre les abus (art. 6.1.f RGPD, intérêt légitime). La carte Google n'est chargée qu'avec votre consentement (art. 6.1.a RGPD). Nous n'utilisons pas vos données à des fins publicitaires et ne les vendons jamais." },
      { titolo: "4. Suis-je obligé de fournir mes données ?", testo: "Non, mais sans votre nom, votre e-mail et votre message, nous ne pouvons pas vous répondre." },
      { titolo: "5. Combien de temps nous les conservons", testo: "Les messages reçus via le site sont conservés le temps nécessaire au traitement de votre demande et au maximum 24 mois, sauf obligations légales (par exemple fiscales) si la demande aboutit à un contrat." },
      { titolo: "6. À qui elles sont communiquées", testo: "Vos données peuvent être traitées par des prestataires qui nous aident à gérer le site, désignés comme sous-traitants : <strong>Netlify, Inc.</strong> (hébergement du site et réception des messages du formulaire). Si vous acceptez la carte, <strong>Google</strong> reçoit certaines données en tant que responsable de traitement indépendant. Si vous nous écrivez sur WhatsApp, le service est géré par WhatsApp/Meta. Netlify et Google peuvent transférer des données vers les États-Unis sur la base du Data Privacy Framework UE-États-Unis ou des Clauses Contractuelles Types approuvées par la Commission européenne." },
      { titolo: "7. Vos droits", testo: "Vous pouvez à tout moment demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur utilisation, leur portabilité, vous opposer au traitement et retirer votre consentement (art. 15 à 22 RGPD) en écrivant à <a href=\"mailto:{email}\">{email}</a>. Vous avez également le droit d'introduire une réclamation auprès de l'autorité italienne de protection des données (<a href=\"https://www.garanteprivacy.it\" rel=\"noopener\" target=\"_blank\">www.garanteprivacy.it</a>)." },
      { titolo: "8. Cookies et technologies similaires", testo: "<strong>Outils techniques (toujours actifs) :</strong> le site enregistre uniquement votre choix concernant les cookies dans votre navigateur, pendant 6 mois. Aucun consentement n'est nécessaire. Nous n'utilisons ni cookies de profilage ni statistiques.<br><strong>Services tiers (uniquement avec consentement) :</strong> sur la page Contact, Google Maps ne se charge que si vous cliquez sur « Accepter » ou « Afficher la carte ». Google peut alors déposer des cookies et collecter des données selon sa propre <a href=\"https://policies.google.com/privacy?hl=fr\" rel=\"noopener\" target=\"_blank\">politique de confidentialité</a>.<br><strong>Liens externes :</strong> les liens vers Instagram, Facebook ou WhatsApp ne chargent rien tant que vous ne cliquez pas dessus." },
      { titolo: "9. Comment modifier votre choix", testo: "Vous pouvez changer d'avis à tout moment grâce au lien « Préférences cookies » en bas de chaque page, ou en effaçant les données de votre navigateur." },
    ],
  },
};

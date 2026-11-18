/* =====================================================================
   TESTI IN INGLESE  (stessa struttura di it.js: vedi le istruzioni lì)
   I prezzi devono essere uguali a quelli di it.js:
   il motore ti avvisa se non lo sono.
   ===================================================================== */

module.exports = {

  pagine: {
    home:     { percorso: "",                menu: "Home",     titolo: "{nome} – Restaurant, rooms & local shop in {citta}", descrizione: "Traditional Aosta Valley cooking, rooms with Mont Blanc views and local mountain produce in {citta}. A family home at the foot of the Alps since 1962." },
    chiSiamo: { percorso: "about",           menu: "About us", titolo: "About us – Our story since 1962", descrizione: "Three generations, an old wood-and-stone barn and a passion for mountain food: discover the story of {nome} in {citta}." },
    servizi:  { percorso: "services",        menu: "Services", titolo: "Menu, rooms and local shop", descrizione: "Our menu of traditional Aosta Valley dishes, rooms overlooking Mont Blanc and the local produce sold in our shop in {citta}." },
    galleria: { percorso: "gallery",         menu: "Gallery",  titolo: "Photo gallery", descrizione: "Photos of {nome}: the dining room, the bedrooms, our dishes and the mountains of {citta} in every season." },
    contatti: { percorso: "contact",         menu: "Contact",  titolo: "Contact, opening hours and directions", descrizione: "Phone, WhatsApp, email, opening hours and a map to find {nome} in {citta}. Get in touch to book or ask for information." },
    privacy:  { percorso: "privacy-cookies", menu: "Privacy & cookies", titolo: "Privacy & cookies", descrizione: "Information on how the {nome} website processes personal data and uses cookies." },
    grazie:   { percorso: "thank-you",       menu: "Thank you", titolo: "Message sent", descrizione: "Thank you for getting in touch." },
    errore:   { percorso: "",                menu: "Error",    titolo: "Page not found", descrizione: "The page you are looking for does not exist." },
  },

  ui: {
    saltaAlContenuto: "Skip to content",
    menuApri: "Open menu",
    menuChiudi: "Close menu",
    lingua: "Language",
    chiama: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    contattaci: "Contact us",
    scopriDiPiu: "Find out more",
    indirizzo: "Address",
    orari: "Opening hours",
    chiuso: "Closed",
    oggi: "Today",
    giorni: { lun: "Monday", mar: "Tuesday", mer: "Wednesday", gio: "Thursday", ven: "Friday", sab: "Saturday", dom: "Sunday" },
    indicazioni: "Get directions",
    seguici: "Follow us",
    partitaIva: "VAT no.",
    cin: "CIN",
    preferenzeCookie: "Cookie preferences",
    chiudi: "Close",
    precedente: "Previous photo",
    successiva: "Next photo",
    ingrandisci: "Open photo full screen",
    stelle: "{n} out of 5 stars",
    whatsappFisso: "Message us on WhatsApp",
    demo: "Example website",
    linkEsterno: "(opens in a new tab)",
    prenota: "Book",
    scorri: "Scroll",
    pausa: "Pause",
    riproduci: "Play",
    recPrecedente: "Previous review",
    recSuccessiva: "Next review",
    recensioni: "Reviews",
  },

  cookie: {
    testo: "We only use technical cookies. With your consent we also load Google Maps, which may use third-party cookies.",
    accetta: "Accept",
    rifiuta: "Reject",
    info: "Read the policy",
  },
  mappa: {
    titolo: "Google map showing the location of {nome}",
    testo: "The map is provided by Google and only loads with your consent.",
    pulsante: "Show the map",
    apriInMaps: "Open in Google Maps",
  },

  home: {
    heroEtichetta: "{citta} · Aosta Valley",
    heroTitolo: "{nome}",
    heroSottotitolo: "Aosta Valley cooking, rooms overlooking Mont Blanc and a small shop of mountain produce. Since 1962.",
    pulsantePrincipale: "Contact us",
    pulsanteSecondario: "See the menu",
    puntiForzaTitolo: "Why choose us",
    puntiForzaIntro: "For three generations we have welcomed mountain visitors the way you welcome a friend: with a hot meal, a quiet room and time to enjoy the view.",
    puntiForza: [
      { icona: "montagna", titolo: "Mont Blanc views",     testo: "From the dining room and every bedroom you can see the highest peaks in Europe." },
      { icona: "foglia",   titolo: "Local produce",        testo: "Fontina, lardo, honey and wine from more than 40 small producers in the valley." },
      { icona: "fuoco",    titolo: "Family cooking",       testo: "Grandma's recipes, slowly cooked on a wood fire just like in the old days." },
      { icona: "posizione",titolo: "Close to the centre",  testo: "A 10-minute walk from Via Roma, with free private parking." },
    ],
    anteprimaTitolo: "What we offer",
    anteprimaIntro: "Three ways to enjoy the mountains: at the table, in your room and by taking them home.",
    anteprima: [
      { titolo: "Our kitchen", testo: "Traditional Aosta Valley dishes made with seasonal ingredients.", foto: "anteprima-1.jpg", ancora: "menu" },
      { titolo: "Our rooms",   testo: "Three larch-wood rooms, all with mountain views and breakfast included.", foto: "anteprima-2.jpg", ancora: "camere" },
      { titolo: "Our shop",    testo: "Cheese, cured meats and liqueurs from the producers we serve every day.", foto: "anteprima-3.jpg", ancora: "catalogo" },
    ],
    recensioniTitolo: "What our guests say",
    recensioni: [
      { testo: "The best valpellinentze soup I've ever had. Lovely staff and a breathtaking view.", autore: "Giulia R.", provenienza: "Turin", stelle: 5, fonte: "Sample review" },
      { testo: "Clean, cosy room and a generous breakfast with homemade cakes. We'll be back for the ski season!", autore: "Marc D.", provenienza: "Lyon", stelle: 5, fonte: "Sample review" },
      { testo: "A real family atmosphere. We took fontina and génépy home from the shop: excellent.", autore: "Sarah T.", provenienza: "London", stelle: 4, fonte: "Sample review" },
    ],
    contattiTitolo: "Come and visit us",
    contattiTesto: "To book a table or a room, call us, send a WhatsApp message or an email: we reply the same day.",
  },

  chiSiamo: {
    etichetta: "Our story",
    titolo: "A family home at the foot of Mont Blanc",
    intro: "In 1962 grandma Aurore turned the family's old granary into a small inn for passing mountaineers. Today the third generation carries on the same idea: welcoming every guest like a friend.",
    paragrafi: [
      "The house is an 18th-century barn of stone and larch wood, restored while keeping the beams, the floors and the large soapstone stove that still heats the dining room.",
      "In the kitchen we use almost only Aosta Valley produce: fontina from the Val Ferret summer pastures, lardo from Arnad, vegetables from the garden behind the house. The menu follows the seasons, because in the mountains nature decides.",
      "Upstairs there are three bedrooms, each named after a mountain you can see from its window. And by the entrance there is a small shop selling the products we serve at the table.",
    ],
    citazione: { testo: "In the mountains you make friends quickly: all it takes is a hot meal and a window on the peaks.", autore: "Aurore, founder" },
    numeri: [
      { valore: "1962", etichetta: "year we opened" },
      { valore: "3",    etichetta: "generations in the kitchen" },
      { valore: "40+",  etichetta: "local producers" },
      { valore: "3",    etichetta: "rooms with a view" },
    ],
    finaleTitolo: "Would you like to meet us?",
    finaleTesto: "Drop by or write to us: we'll be happy to suggest a dish, a room or a walk.",
  },

  servizi: {
    etichetta: "{nome}",
    titolo: "Kitchen, rooms and shop",
    intro: "Everything you can find at our place: choose the section you are interested in.",
  },

  menu: {
    titolo: "Our menu",
    intro: "Traditional Aosta Valley dishes, prepared every day with seasonal ingredients.",
    categorie: [
      { nome: "Starters", piatti: [
        { nome: "Valley platter", descrizione: "Lardo d'Arnad PDO, mocetta, boudin, fontina PDO and chestnut honey", prezzo: "€ 16" },
        { nome: "Baked tomini cheese", descrizione: "With mountain honey and toasted walnuts", prezzo: "€ 12", veg: true },
      ]},
      { nome: "First courses", piatti: [
        { nome: "Valpellinentze soup", descrizione: "Rye bread, savoy cabbage, fontina and meat broth", prezzo: "€ 15" },
        { nome: "Potato gnocchi with venison ragù", descrizione: "Handmade gnocchi, ragù slow-cooked for six hours", prezzo: "€ 17" },
        { nome: "Polenta concia", descrizione: "Stone-ground polenta with fontina and alpine butter", prezzo: "€ 14", veg: true },
      ]},
      { nome: "Main courses", piatti: [
        { nome: "Carbonade valdostana", descrizione: "Beef stewed in red wine and spices, served with polenta", prezzo: "€ 22" },
        { nome: "Aosta Valley-style cutlet", descrizione: "Breaded veal with fontina and cured ham", prezzo: "€ 24" },
        { nome: "Mountain-stream trout with herbs", descrizione: "With oven-roasted mountain potatoes", prezzo: "€ 21" },
      ]},
      { nome: "Desserts", piatti: [
        { nome: "Génépy panna cotta", descrizione: "With wild berries", prezzo: "€ 7", veg: true },
        { nome: "Mont Blanc", descrizione: "Chestnut purée and whipped cream", prezzo: "€ 8", veg: true },
      ]},
    ],
    legenda: "V = vegetarian dish",
    nota: "Cover charge € 3. Allergen information available from our staff on request.",
    prenotaTitolo: "Book a table",
    prenotaTesto: "Booking is recommended, especially at weekends and in high season.",
    messaggioWhatsapp: "Hello! I would like to book a table at {nome}.",
    oggettoEmail: "Table booking",
  },

  camere: {
    titolo: "Our rooms",
    intro: "Three warm, quiet rooms furnished in larch wood. Breakfast with homemade cakes included.",
    elenco: [
      { nome: "Dente del Gigante room", foto: "camera-1.jpg", descrizione: "Double room with a large window facing Mont Blanc.", ospiti: "2 guests", dotazioni: ["Mont Blanc view", "Private bathroom", "Wi-Fi", "Breakfast included"], prezzo: "from € 140 / night" },
      { nome: "Grandes Jorasses suite", foto: "camera-2.jpg", descrizione: "Two-level suite with a living area, ideal for families.", ospiti: "up to 4 guests", dotazioni: ["Living room", "Bathtub", "Wi-Fi", "Breakfast included"], prezzo: "from € 220 / night" },
      { nome: "Val Ferret room", foto: "camera-3.jpg", descrizione: "Double room with a private balcony overlooking the forest.", ospiti: "2 guests", dotazioni: ["Balcony", "Private bathroom", "Wi-Fi", "Breakfast included"], prezzo: "from € 160 / night" },
    ],
    pulsante: "Check availability",
    oggettoEmail: "Availability request – {camera}",
    corpoEmail: "Hello, I would like to know if the {camera} is available.\nArrival and departure dates: \nNumber of guests: \n",
    nota: "Tourist tax not included. Check-in from 3 pm, check-out by 10:30 am.",
  },

  catalogo: {
    titolo: "Our shop",
    intro: "Products from our trusted suppliers, to take home or give as a gift.",
    tutti: "All",
    prodotti: [
      { nome: "Alpine fontina PDO", categoria: "Cheese", prezzo: "€ 24 / kg", foto: "prodotto-1.jpg", descrizione: "Aged in caves for at least 5 months." },
      { nome: "Lardo d'Arnad PDO", categoria: "Cured meats", prezzo: "€ 9 / 200 g", foto: "prodotto-2.jpg", descrizione: "Flavoured with mountain herbs." },
      { nome: "Mocetta", categoria: "Cured meats", prezzo: "€ 8 / 150 g", foto: "prodotto-3.jpg", descrizione: "Traditional cured meat, air-dried in the mountains." },
      { nome: "Artisan génépy", categoria: "Liqueurs", prezzo: "€ 22 / 50 cl", foto: "prodotto-4.jpg", descrizione: "Alpine herb liqueur, family recipe." },
      { nome: "Mountain wildflower honey", categoria: "Sweets", prezzo: "€ 9 / 500 g", foto: "prodotto-5.jpg", descrizione: "Harvested above 1,500 metres." },
      { nome: "Tegole valdostane", categoria: "Sweets", prezzo: "€ 7 / 200 g", foto: "prodotto-6.jpg", descrizione: "Thin almond and hazelnut biscuits." },
    ],
    pulsante: "Ask for info",
    messaggioWhatsapp: "Hello! I would like some information about: {prodotto}",
    nota: "Prices include VAT. In-store sales only: no online payments.",
  },

  listino: {
    titolo: "Experiences and services",
    intro: "Together with trusted partners, we organise a few experiences for our guests.",
    voci: [
      { nome: "Tasting dinner", descrizione: "Six courses paired with Aosta Valley wines", durata: "3 hours", prezzo: "€ 75 per person" },
      { nome: "Guided snowshoe hike", descrizione: "Snowshoe excursion in Val Ferret, equipment included", durata: "half day", prezzo: "€ 55 per person" },
      { nome: "Transfer to/from Aosta", descrizione: "Shuttle service on request", durata: "45 minutes", prezzo: "€ 60 one way" },
    ],
    nota: "Indicative prices, to be confirmed when booking.",
  },

  faq: {
    titolo: "Frequently asked questions",
    domande: [
      { domanda: "Do I need to book?", risposta: "For the restaurant it is recommended, especially on Saturdays and in high season. For the rooms, always." },
      { domanda: "Do you have vegetarian or gluten-free dishes?", risposta: "Yes: vegetarian dishes are marked with a V on the menu. For intolerances and coeliac disease, please let us know when booking." },
      { domanda: "Is there parking?", risposta: "Yes, we have free private parking for restaurant and room guests." },
      { domanda: "Are pets allowed?", risposta: "Small dogs are welcome in the dining room and in one of the rooms, on request." },
      { domanda: "How can I get there without a car?", risposta: "It's a 10-minute walk from the centre of {citta}; in winter the free ski bus stops right outside." },
    ],
  },

  galleria: {
    etichetta: "{nome}",
    titolo: "Gallery",
    intro: "A glimpse of the house, the kitchen and the mountains around us. Tap a photo to enlarge it.",
    // Una descrizione per ogni foto, nello STESSO ORDINE delle foto in dati-cliente.js.
    // Le descrizioni qui sotto raccontano le foto della demo (vedi FOTO-CREDITI.md).
    // Quando cambi le foto, RISCRIVILE: servono anche come testo alternativo per chi non vede l'immagine.
    descrizioni: [
      "Mont Blanc reflected in a high-altitude lake",
      "The chairlift above the snowy slopes",
      "A board of Aosta Valley cheeses with a glass of red wine",
      "The stone fireplace in the dining room, lit on winter evenings",
      "The wooden table laid for dinner",
      "The terrace overlooking the mountains",
      "A bedroom with its window on the peaks",
      "The larch woods in autumn, above the valley",
      "Jars of mountain honey on the shop shelves",
    ],
  },

  contatti: {
    etichetta: "{nome}",
    titolo: "Contact",
    intro: "Call us, message us on WhatsApp or fill in the form: we'll reply within one day.",
    infoTitolo: "Where and when",
    mappaTitolo: "How to get here",
  },

  form: {
    titolo: "Send us a message",
    nome: "Full name",
    email: "Email",
    telefono: "Phone",
    facoltativo: "optional",
    motivo: "Subject",
    motivi: ["Information", "Table booking", "Room availability", "Shop and products", "Other"],
    messaggio: "Message",
    privacy: "I have read the {linkPrivacy} and agree to the processing of my data in order to receive a reply.",
    privacyLink: "privacy policy",
    invia: "Send message",
    obbligatori: "Fields marked with * are required.",
  },

  grazie: {
    titolo: "Thank you, message received!",
    testo: "We'll get back to you as soon as possible, usually within one day. If it's urgent, please call us.",
    torna: "Back to home page",
  },

  errore: {
    titolo: "Page not found",
    testo: "The link may be wrong or the page may have been moved.",
    torna: "Back to home page",
  },

  privacy: {
    titolo: "Privacy & cookies",
    aggiornamento: "Last updated: {data}",
    sezioni: [
      { titolo: "1. Who processes your data", testo: "The data controller is <strong>{ragioneSociale}</strong>, {indirizzo}, VAT no. {piva}. For any question about your data, write to <a href=\"mailto:{email}\">{email}</a>." },
      { titolo: "2. What data we collect", testo: "<strong>Browsing data:</strong> to work properly and for security reasons, the server hosting this website records technical data such as IP address, date and time of the visit and pages requested.<br><strong>Data you send us:</strong> if you fill in the contact form we collect your name, email, phone number (optional) and message. If you write to us by email, phone or WhatsApp, we process the data you share with us." },
      { titolo: "3. Why we use it and on what legal basis", testo: "We use your data to answer your requests for information, quotes or bookings (art. 6(1)(b) GDPR, pre-contractual steps taken at your request) and to protect the website from abuse (art. 6(1)(f) GDPR, legitimate interest). Google Maps is only loaded with your consent (art. 6(1)(a) GDPR). We do not use your data for advertising and we never sell it." },
      { titolo: "4. Do I have to give you my data?", testo: "No, but without your name, email and message we cannot reply to you." },
      { titolo: "5. How long we keep it", testo: "Messages received through the website are kept for as long as needed to handle your request and in any case no longer than 24 months, unless the law requires otherwise (for example for tax purposes) if the request leads to a contract." },
      { titolo: "6. Who we share it with", testo: "Your data may be processed by providers who help us run the website, appointed as data processors: <strong>Netlify, Inc.</strong> (website hosting and contact form). If you accept the map, <strong>Google</strong> receives some data as an independent controller. If you write to us on WhatsApp, the service is run by WhatsApp/Meta. Netlify and Google may transfer data to the United States under the EU-US Data Privacy Framework or the Standard Contractual Clauses approved by the European Commission." },
      { titolo: "7. Your rights", testo: "You can ask at any time to access, correct or delete your data, restrict its use, receive it in a portable format, object to its processing and withdraw your consent (arts. 15-22 GDPR) by writing to <a href=\"mailto:{email}\">{email}</a>. You also have the right to lodge a complaint with the Italian Data Protection Authority (<a href=\"https://www.garanteprivacy.it\" rel=\"noopener\" target=\"_blank\">www.garanteprivacy.it</a>)." },
      { titolo: "8. Cookies and similar technologies", testo: "<strong>Technical tools (always on):</strong> the website only stores your cookie choice in your browser, for 6 months. No consent is needed. We use no profiling or analytics cookies.<br><strong>Third-party services (only with consent):</strong> on the Contact page, Google Maps is only loaded if you click “Accept” or “Show the map”. Google may then set cookies and collect data according to its own <a href=\"https://policies.google.com/privacy?hl=en\" rel=\"noopener\" target=\"_blank\">privacy policy</a>.<br><strong>External links:</strong> links to Instagram, Facebook or WhatsApp load nothing until you click them." },
      { titolo: "9. How to change your choice", testo: "You can change your mind at any time using the “Cookie preferences” link at the bottom of every page, or by clearing your browser data." },
    ],
  },
};

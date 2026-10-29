// I settori del menu newsletter: il nome è anche il valore inviato, perché su
// Mailchimp diventa il campo "Settore" e il tag omonimo (pages/api/subscribe.js).
// Sono i tag di settore del pubblico "All contacts": un nome nuovo qui crea un
// tag nuovo su Mailchimp. Fornitori e Consulenti fornitori restano fuori dal
// menu: sono elenchi interni.
export const newsletterGroups = [
  {id: 'Altro', name: 'Altro'},
  {id: 'Ristorante', name: 'Ristorante'},
  {id: 'Gastronomia', name: 'Gastronomia'},
  {id: 'Pizzeria', name: 'Pizzeria'},
  {id: 'Pasticceria', name: 'Pasticceria'},
  {id: 'Gelateria', name: 'Gelateria'},
  {
    id: 'Hotel - Sala Ricevimenti - B&B',
    name: 'Hotel - Sala Ricevimenti - B&B',
  },
  {id: 'Enti-PA', name: 'Enti-PA'},
  {id: 'Supermercati ed Alimentari', name: 'Supermercati ed Alimentari'},
  {id: 'Villaggio Turistico', name: 'Villaggio Turistico'},
  {id: 'Macelleria', name: 'Macelleria'},
  {id: 'Panificio', name: 'Panificio'},
  {id: 'Bar', name: 'Bar'},
  {id: 'Agriturismo', name: 'Agriturismo'},
  {id: 'Caseificio', name: 'Caseificio'},
  {id: 'Pub', name: 'Pub'},
  {id: 'Vineria', name: 'Vineria'},
  {id: 'Pescheria', name: 'Pescheria'},
  {id: 'Pastificio', name: 'Pastificio'},
  {id: 'Industrie', name: 'Industrie'},
  {id: 'No food', name: 'No food'},
  {id: 'Braceria', name: 'Braceria'},
  {id: 'Privato', name: 'Privato'},
]

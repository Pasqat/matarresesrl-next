import {newsletterGroups} from '../data/newsletter-groups'

// I settori del menu newsletter. Prima arrivavano da MailerLite a ogni build;
// ora la newsletter è su Mailchimp e la lista è fissa (data/newsletter-groups.js).
async function getGroups() {
  return newsletterGroups
}

export {getGroups}
